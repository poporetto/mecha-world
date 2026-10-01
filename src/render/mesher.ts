// Builds one merged BufferGeometry per chunk with only visible faces,
// per-vertex colors (block color * directional shade * per-voxel jitter *
// ambient occlusion).

import * as THREE from 'three';
import { B, BLOCK_COLORS } from '../core/blocks';
import { hash3 } from '../core/noise';
import { CS, H } from '../core/worldgen';
import { World } from '../core/world';

// dir: [dx,dy,dz, shade, 4 corner offsets]
const FACES: { d: [number, number, number]; s: number; v: number[][] }[] = [
  { d: [1, 0, 0], s: 0.8, v: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] },
  { d: [-1, 0, 0], s: 0.8, v: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]] },
  { d: [0, 1, 0], s: 1.0, v: [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]] },
  { d: [0, -1, 0], s: 0.5, v: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] },
  { d: [0, 0, 1], s: 0.7, v: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]] },
  { d: [0, 0, -1], s: 0.7, v: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]] },
];

// ----------------------------------------------------------- padded volume
// The chunk plus a one-block border taken from its eight neighbours, copied
// into one array per build. Every face neighbour and every AO sample is at
// most one block outside the chunk, so with the border in place the hot loop
// is pure index arithmetic: no bounds checks, no branches, and no
// world.getBlock — which builds a string key and does a Map lookup per call,
// and was most of the cost of meshing a chunk edge.
const PW = CS + 2;            // padded width in x and z
const PA = PW * PW;           // one padded y-layer
const PAD = new Uint8Array(PA * (H + 2));
const pidx = (lx: number, y: number, lz: number): number => (y + 1) * PA + (lz + 1) * PW + (lx + 1);
const delta = (dx: number, dy: number, dz: number): number => dx + dz * PW + dy * PA;

function fillPad(world: World, cx: number, cz: number, chunk: Uint8Array): void {
  // y = -1 is bedrock under everything; y = H is open sky
  PAD.fill(B.Dirt, 0, PA);
  PAD.fill(B.Air, (H + 1) * PA);
  const n = (dx: number, dz: number) => world.getChunk(cx + dx, cz + dz);
  const west = n(-1, 0), east = n(1, 0), north = n(0, -1), south = n(0, 1);
  const nw = n(-1, -1), ne = n(1, -1), sw = n(-1, 1), se = n(1, 1);
  const at = (c: Uint8Array, lx: number, y: number, lz: number) => c[(y * CS + lz) * CS + lx];
  for (let y = 0; y < H; y++) {
    for (let lz = 0; lz < CS; lz++) {
      const src = (y * CS + lz) * CS;
      PAD.set(chunk.subarray(src, src + CS), pidx(0, y, lz));
      PAD[pidx(-1, y, lz)] = at(west, CS - 1, y, lz);
      PAD[pidx(CS, y, lz)] = at(east, 0, y, lz);
    }
    const rowN = (y * CS + (CS - 1)) * CS, rowS = (y * CS) * CS;
    PAD.set(north.subarray(rowN, rowN + CS), pidx(0, y, -1));
    PAD.set(south.subarray(rowS, rowS + CS), pidx(0, y, CS));
    PAD[pidx(-1, y, -1)] = at(nw, CS - 1, y, CS - 1);
    PAD[pidx(CS, y, -1)] = at(ne, 0, y, CS - 1);
    PAD[pidx(-1, y, CS)] = at(sw, CS - 1, y, 0);
    PAD[pidx(CS, y, CS)] = at(se, 0, y, 0);
  }
}

// ---------------------------------------------------------- per-face tables
/** Padded-index offset from a block to the neighbour each face looks at. */
const FACE_DELTA = FACES.map((f) => delta(f.d[0], f.d[1], f.d[2]));

/**
 * Per-vertex ambient occlusion, the standard voxel technique: each corner of
 * a face looks at the three blocks around it in the layer the face points
 * into — two edge neighbours and the diagonal — and darkens by how many are
 * solid. Corners where a wall meets a floor, ledges, the foot of every
 * building and the inside of every window recess pick up contact shading,
 * which is most of what makes a voxel city read as built rather than tiled.
 *
 * The 8 cells around the face's neighbour are sampled once per face; each
 * corner then reads its three from that ring.
 */
const RING: number[][] = FACES.map((f) => {
  const [ta, tb] = [0, 1, 2].filter((axis) => f.d[axis] === 0);
  const cells: number[] = [];
  for (const sb of [-1, 0, 1]) for (const sa of [-1, 0, 1]) {
    if (sa === 0 && sb === 0) continue;
    const o = [...f.d];
    o[ta] += sa; o[tb] += sb;
    cells.push(delta(o[0], o[1], o[2]));
  }
  return cells;
});
/** For each face corner, the ring slots of [edgeA, edgeB, diagonal]. */
const CORNER: number[][][] = FACES.map((f) => {
  const [ta, tb] = [0, 1, 2].filter((axis) => f.d[axis] === 0);
  const slot = (sa: number, sb: number) => {
    let i = 0;
    for (const b of [-1, 0, 1]) for (const a of [-1, 0, 1]) {
      if (a === 0 && b === 0) continue;
      if (a === sa && b === sb) return i;
      i++;
    }
    return -1;
  };
  return f.v.map((c) => {
    const sa = c[ta] === 1 ? 1 : -1, sb = c[tb] === 1 ? 1 : -1;
    return [slot(sa, 0), slot(0, sb), slot(sa, sb)];
  });
});
/** Brightness for 0..3 visible neighbours — 0 is a fully enclosed corner. */
const AO_CURVE = [0.56, 0.73, 0.87, 1.0];

/** What casts occlusion: anything solid. Water and puddles do not. */
const OCCLUDES = new Uint8Array(256);
for (let id = 1; id < 256; id++) OCCLUDES[id] = id === B.Water || id === B.Puddle ? 0 : 1;
/** Faces drawn against these neighbours (everything non-opaque). */
const SEE_THROUGH = new Uint8Array(256);
SEE_THROUGH[B.Air] = 1; SEE_THROUGH[B.Water] = 1; SEE_THROUGH[B.Puddle] = 1;
/** Self-lit blocks: brighter, glow at night, and take no contact shading. */
const BRIGHT = new Uint8Array(256);
for (const id of [B.NeonCyan, B.NeonPink, B.WindowLit, B.Lantern, B.LightRed, B.LightAmber, B.LightGreen]) BRIGHT[id] = 1;

// Linear-space block colours, built once from the sRGB palette the same way
// Color.setHex did per face before.
const COL_R = new Float32Array(256), COL_G = new Float32Array(256), COL_B = new Float32Array(256);
{
  const c = new THREE.Color();
  for (let id = 0; id < 256; id++) {
    if (BLOCK_COLORS[id] === undefined) continue;
    c.setHex(BLOCK_COLORS[id]);
    COL_R[id] = c.r; COL_G[id] = c.g; COL_B[id] = c.b;
  }
}

// ------------------------------------------------------------ output buffers
// Growable scratch reused across builds (meshing is synchronous), so a chunk
// costs one copy into right-sized arrays at the end instead of a stream of
// pushes into untyped arrays and a conversion.
let cap = 4096; // faces
let P = new Float32Array(cap * 12), N = new Float32Array(cap * 12);
let C = new Float32Array(cap * 12), G = new Float32Array(cap * 4), I = new Uint32Array(cap * 6);
function grow(): void {
  cap *= 2;
  const g = <T extends Float32Array | Uint32Array>(a: T, per: number): T => {
    const b = new (a.constructor as { new(n: number): T })(cap * per);
    b.set(a);
    return b;
  };
  P = g(P, 12); N = g(N, 12); C = g(C, 12); G = g(G, 4); I = g(I, 6);
}

const ring = new Uint8Array(8);
const ao = new Float32Array(4);

export function buildChunkGeometry(world: World, cx: number, cz: number): THREE.BufferGeometry | null {
  const chunk = world.getChunk(cx, cz);
  fillPad(world, cx, cz, chunk);
  const ox = cx * CS, oz = cz * CS;
  let faces = 0;

  for (let y = 0; y < H; y++) {
    for (let lz = 0; lz < CS; lz++) {
      let p = pidx(0, y, lz);
      for (let lx = 0; lx < CS; lx++, p++) {
        const id = PAD[p];
        if (id === B.Air) continue;
        const water = id === B.Water, puddle = id === B.Puddle;
        const bright = BRIGHT[id] === 1;
        const shaded = !bright && !water;
        let jitter = -1;
        for (let fi = 0; fi < 6; fi++) {
          const np = p + FACE_DELTA[fi];
          const nid = PAD[np];
          // water and puddles only show faces against open air
          const visible = water || puddle ? nid === B.Air : SEE_THROUGH[nid] === 1;
          if (!visible) continue;

          if (faces === cap) grow();
          if (jitter < 0) jitter = 0.92 + 0.08 * hash3(ox + lx, y, oz + lz);
          const f = FACES[fi];
          const shade = (bright ? 1.15 : f.s) * jitter;
          const r = Math.min(1, COL_R[id] * shade);
          const g = Math.min(1, COL_G[id] * shade);
          const b = Math.min(1, COL_B[id] * shade);

          if (shaded) {
            const rd = RING[fi];
            for (let k = 0; k < 8; k++) ring[k] = OCCLUDES[PAD[p + rd[k]]];
            const cn = CORNER[fi];
            for (let k = 0; k < 4; k++) {
              const e1 = ring[cn[k][0]], e2 = ring[cn[k][1]];
              // two solid edges seal the corner regardless of the diagonal
              const c = e1 && e2 ? 1 : ring[cn[k][2]];
              ao[k] = AO_CURVE[3 - (e1 + e2 + c)];
            }
          } else {
            ao[0] = ao[1] = ao[2] = ao[3] = 1;
          }

          const base = faces * 4;
          let o = faces * 12;
          for (let k = 0; k < 4; k++, o += 3) {
            const v = f.v[k];
            P[o] = lx + v[0]; P[o + 1] = y + v[1]; P[o + 2] = lz + v[2];
            N[o] = f.d[0]; N[o + 1] = f.d[1]; N[o + 2] = f.d[2];
            const a = ao[k];
            C[o] = r * a; C[o + 1] = g * a; C[o + 2] = b * a;
            G[base + k] = bright ? 1 : 0;
          }
          // Split each quad along the diagonal that keeps the darker corner on
          // it. Always splitting 0-2 makes AO show a hard triangular crease
          // whenever only one corner is occluded.
          const i = faces * 6;
          if (ao[0] + ao[2] > ao[1] + ao[3]) {
            I[i] = base + 1; I[i + 1] = base + 2; I[i + 2] = base + 3;
            I[i + 3] = base + 1; I[i + 4] = base + 3; I[i + 5] = base;
          } else {
            I[i] = base; I[i + 1] = base + 1; I[i + 2] = base + 2;
            I[i + 3] = base; I[i + 4] = base + 2; I[i + 5] = base + 3;
          }
          faces++;
        }
      }
    }
  }

  if (faces === 0) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(P.slice(0, faces * 12), 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(N.slice(0, faces * 12), 3));
  geo.setAttribute('color', new THREE.BufferAttribute(C.slice(0, faces * 12), 3));
  geo.setAttribute('aGlow', new THREE.BufferAttribute(G.slice(0, faces * 4), 1));
  geo.setIndex(new THREE.BufferAttribute(I.slice(0, faces * 6), 1));
  return geo;
}
