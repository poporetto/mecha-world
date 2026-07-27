// Builds one merged BufferGeometry per chunk with only visible faces,
// per-face vertex colors (block color * directional shade * per-voxel jitter).

import * as THREE from 'three';
import { B, BLOCK_COLORS, isSolid } from '../core/blocks';
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

const col = new THREE.Color();

export function buildChunkGeometry(world: World, cx: number, cz: number): THREE.BufferGeometry | null {
  const chunk = world.getChunk(cx, cz);
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const glows: number[] = []; // 1 for self-lit blocks, so they emit at night
  const indices: number[] = [];
  const ox = cx * CS, oz = cz * CS;

  for (let y = 0; y < H; y++) {
    for (let lz = 0; lz < CS; lz++) {
      for (let lx = 0; lx < CS; lx++) {
        const id = chunk[(y * CS + lz) * CS + lx];
        if (id === B.Air) continue;
        const wx = ox + lx, wz = oz + lz;
        for (const f of FACES) {
          const nx = lx + f.d[0], ny = y + f.d[1], nz = lz + f.d[2];
          let nid: number;
          if (nx < 0 || nx >= CS || nz < 0 || nz >= CS) {
            nid = world.getBlock(wx + f.d[0], ny, wz + f.d[2]);
          } else if (ny < 0) {
            nid = B.Dirt;
          } else if (ny >= H) {
            nid = B.Air;
          } else {
            nid = chunk[(ny * CS + nz) * CS + nx];
          }
          const visible = id === B.Water
            ? nid === B.Air
            : id === B.Puddle
            ? nid === B.Air // puddles only show faces against open air
            : (nid === B.Air || nid === B.Water || nid === B.Puddle);
          if (!visible) continue;

          const base = positions.length / 3;
          const bright = id === B.NeonCyan || id === B.NeonPink || id === B.WindowLit
            || id === B.Lantern || id === B.LightRed || id === B.LightAmber
            || id === B.LightGreen;
          const jitter = 0.92 + 0.08 * hash3(wx, y, wz);
          col.setHex(BLOCK_COLORS[id]);
          const shade = (bright ? 1.15 : f.s) * jitter;
          const r = Math.min(1, col.r * shade), g = Math.min(1, col.g * shade), b = Math.min(1, col.b * shade);
          const glow = bright ? 1 : 0;
          for (const v of f.v) {
            positions.push(lx + v[0], y + v[1], lz + v[2]);
            normals.push(f.d[0], f.d[1], f.d[2]);
            colors.push(r, g, b);
            glows.push(glow);
          }
          indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
        }
      }
    }
  }

  if (positions.length === 0) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute('aGlow', new THREE.Float32BufferAttribute(glows, 1));
  geo.setIndex(indices);
  return geo;
}
