// Voxel sculpting for creatures.
//
// The bosses were assemblies of large axis-aligned boxes, which read as toy
// robots: a crate torso, crate legs, a tail of stepped crates. Real monster
// silhouettes are made of masses that blend into one another — a pear-shaped
// torso, a neck that grows out of the shoulders, a tail that tapers to a
// point. This builds those shapes from signed-distance primitives and then
// rasterises them back onto a voxel lattice at roughly the city's grain, so
// the bosses keep the voxel look but stop being boxes.
//
//   * Masses (`add`) are smooth-unioned, which is what turns lumps into
//     anatomy: a thigh flows into a hip instead of being bolted onto it.
//   * Accents (`hard`) — teeth, claws, plates, horns — union with a hard
//     edge so they stay crisp.
//   * Cuts (`cut`) carve eye sockets and the like.
//
// Only the sign of the field decides a voxel, so primitives only need to be
// distances near the surface; non-uniform squashing of a primitive is fine.
// Meshing matches the chunk mesher: exposed faces only, per-vertex ambient
// occlusion from the 8-cell ring each face looks into, quads split along the
// diagonal that keeps the dark corner on it. Colour is painted per voxel from
// the primitive that owns it and the surface normal (for countershading),
// with deterministic noise so a boss looks the same on every spawn.

import * as THREE from 'three';

export type V3 = [number, number, number];

export interface Prim {
  /** Approximate signed distance; negative inside. */
  d(x: number, y: number, z: number): number;
  min: V3;
  max: V3;
  /** Palette slot the painter receives for voxels this primitive owns. */
  paint: number;
}

// ---------------------------------------------------------------- primitives

export function ellipsoid(c: V3, r: V3, paint: number): Prim {
  return {
    paint,
    min: [c[0] - r[0], c[1] - r[1], c[2] - r[2]],
    max: [c[0] + r[0], c[1] + r[1], c[2] + r[2]],
    d(x, y, z) {
      // Inigo Quilez's bound for an ellipsoid: exact sign, good near surface
      const px = (x - c[0]) / r[0], py = (y - c[1]) / r[1], pz = (z - c[2]) / r[2];
      const k0 = Math.hypot(px, py, pz);
      const k1 = Math.hypot(px / r[0], py / r[1], pz / r[2]);
      return k1 === 0 ? -Math.min(r[0], r[1], r[2]) : (k0 * (k0 - 1)) / k1;
    },
  };
}

export function sphere(c: V3, r: number, paint: number): Prim {
  return ellipsoid(c, [r, r, r], paint);
}

/** A capsule from a (radius ra) to b (radius rb): limbs, necks, horns. */
export function cone(a: V3, b: V3, ra: number, rb: number, paint: number): Prim {
  const bax = b[0] - a[0], bay = b[1] - a[1], baz = b[2] - a[2];
  const l2 = bax * bax + bay * bay + baz * baz || 1e-6;
  const rr = ra - rb;
  const a2 = l2 - rr * rr;
  const il2 = 1 / l2;
  const R = Math.max(ra, rb);
  return {
    paint,
    min: [Math.min(a[0], b[0]) - R, Math.min(a[1], b[1]) - R, Math.min(a[2], b[2]) - R],
    max: [Math.max(a[0], b[0]) + R, Math.max(a[1], b[1]) + R, Math.max(a[2], b[2]) + R],
    d(x, y, z) {
      // Quilez's round cone, exact
      const pax = x - a[0], pay = y - a[1], paz = z - a[2];
      const yy = pax * bax + pay * bay + paz * baz;
      const zz = yy - l2;
      const qx = pax * l2 - bax * yy, qy = pay * l2 - bay * yy, qz = paz * l2 - baz * yy;
      const x2 = qx * qx + qy * qy + qz * qz;
      const y2 = yy * yy * l2;
      const z2 = zz * zz * l2;
      const k = Math.sign(rr) * rr * rr * x2;
      if (Math.sign(zz) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - rb;
      if (Math.sign(yy) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - ra;
      return (Math.sqrt(x2 * a2 * il2) + yy * rr) * il2 - ra;
    },
  };
}

/** Consecutive tapered capsules through a list of points: tails, spines. */
export function chain(points: V3[], radii: number[], paint: number): Prim[] {
  const out: Prim[] = [];
  for (let i = 0; i < points.length - 1; i++) out.push(cone(points[i], points[i + 1], radii[i], radii[i + 1], paint));
  return out;
}

/** Rounded box, for armour plates and other made things. */
export function roundBox(c: V3, half: V3, round: number, paint: number): Prim {
  return {
    paint,
    min: [c[0] - half[0] - round, c[1] - half[1] - round, c[2] - half[2] - round],
    max: [c[0] + half[0] + round, c[1] + half[1] + round, c[2] + half[2] + round],
    d(x, y, z) {
      const qx = Math.abs(x - c[0]) - half[0], qy = Math.abs(y - c[1]) - half[1], qz = Math.abs(z - c[2]) - half[2];
      const ox = Math.max(qx, 0), oy = Math.max(qy, 0), oz = Math.max(qz, 0);
      return Math.hypot(ox, oy, oz) + Math.min(Math.max(qx, qy, qz), 0) - round;
    },
  };
}

/** Squash or stretch a primitive about a point (e.g. a capsule into a blade). */
export function squash(p: Prim, about: V3, s: V3): Prim {
  const ext = (i: 0 | 1 | 2, v: number) => about[i] + (v - about[i]) / s[i];
  return {
    paint: p.paint,
    min: [Math.min(ext(0, p.min[0]), ext(0, p.max[0])), Math.min(ext(1, p.min[1]), ext(1, p.max[1])), Math.min(ext(2, p.min[2]), ext(2, p.max[2]))],
    max: [Math.max(ext(0, p.min[0]), ext(0, p.max[0])), Math.max(ext(1, p.min[1]), ext(1, p.max[1])), Math.max(ext(2, p.min[2]), ext(2, p.max[2]))],
    d: (x, y, z) => p.d(about[0] + (x - about[0]) * s[0], about[1] + (y - about[1]) * s[1], about[2] + (z - about[2]) * s[2]),
  };
}

/**
 * A blade: the side profile of a round cone from `base` to `tip`, extruded to
 * a constant thickness across x. Plates, fins and sails. A squashed cone
 * thins toward its tip along with its profile and, once thinner than a
 * voxel, falls between lattice columns and disappears.
 */
export function blade(base: V3, tip: V3, rBase: number, rTip: number, thick: number, paint: number): Prim {
  const profile = cone(base, tip, rBase, rTip, paint);
  const h = thick / 2;
  const dy = tip[1] - base[1];
  const axisX = (y: number) => base[0] + (tip[0] - base[0]) * Math.max(0, Math.min(1, dy ? (y - base[1]) / dy : 0));
  return {
    paint,
    min: [Math.min(base[0], tip[0]) - h, profile.min[1], profile.min[2]],
    max: [Math.max(base[0], tip[0]) + h, profile.max[1], profile.max[2]],
    d(x, y, z) {
      const ax = axisX(y);
      return Math.max(profile.d(ax, y, z), Math.abs(x - ax) - h);
    },
  };
}

/**
 * A fin in any orientation: the profile of a round cone from `base` to `tip`
 * in the plane through that axis, extruded to a constant thickness along
 * `normal` (made perpendicular to the axis). Side fins, frills, sails.
 */
export function fin(base: V3, tip: V3, rBase: number, rTip: number, thick: number, normal: V3, paint: number): Prim {
  const profile = cone(base, tip, rBase, rTip, paint);
  const ax = tip[0] - base[0], ay = tip[1] - base[1], az = tip[2] - base[2];
  const al = Math.hypot(ax, ay, az) || 1;
  const ux = ax / al, uy = ay / al, uz = az / al;
  // Gram-Schmidt the normal against the axis
  const dn = normal[0] * ux + normal[1] * uy + normal[2] * uz;
  let nx = normal[0] - dn * ux, ny = normal[1] - dn * uy, nz = normal[2] - dn * uz;
  const nl = Math.hypot(nx, ny, nz) || 1;
  nx /= nl; ny /= nl; nz /= nl;
  const h = thick / 2;
  return {
    paint,
    min: [profile.min[0] - h, profile.min[1] - h, profile.min[2] - h],
    max: [profile.max[0] + h, profile.max[1] + h, profile.max[2] + h],
    d(x, y, z) {
      const off = (x - base[0]) * nx + (y - base[1]) * ny + (z - base[2]) * nz;
      return Math.max(profile.d(x - off * nx, y - off * ny, z - off * nz), Math.abs(off) - h);
    },
  };
}

/** Craggy rock: the surface pushed in and out by smooth noise. */
export function rough(p: Prim, amp: number, freq: number, seed: number): Prim {
  return {
    paint: p.paint,
    min: [p.min[0] - amp, p.min[1] - amp, p.min[2] - amp],
    max: [p.max[0] + amp, p.max[1] + amp, p.max[2] + amp],
    d: (x, y, z) => p.d(x, y, z) + (noise3(x * freq, y * freq, z * freq, seed) - 0.5) * amp * 2,
  };
}

/** Left/right pairs: returns the primitive and its mirror across x = 0. */
export function mirrorX(prims: Prim[]): Prim[] {
  const out = [...prims];
  for (const p of prims) {
    out.push({
      paint: p.paint,
      min: [-p.max[0], p.min[1], p.min[2]],
      max: [-p.min[0], p.max[1], p.max[2]],
      d: (x, y, z) => p.d(-x, y, z),
    });
  }
  return out;
}

// --------------------------------------------------------------------- noise

const fract = (v: number) => v - Math.floor(v);
const hash = (x: number, y: number, z: number, s: number) =>
  fract(Math.sin(x * 127.1 + y * 311.7 + z * 74.7 + s * 19.19) * 43758.5453);
/** Smooth 3D value noise, 0..1 — for mottling at the scale of a few voxels. */
export function noise3(x: number, y: number, z: number, seed = 0): number {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const fx = x - ix, fy = y - iy, fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy), uz = fz * fz * (3 - 2 * fz);
  const l = (a: number, b: number, t: number) => a + (b - a) * t;
  const h = (dx: number, dy: number, dz: number) => hash(ix + dx, iy + dy, iz + dz, seed);
  return l(
    l(l(h(0, 0, 0), h(1, 0, 0), ux), l(h(0, 1, 0), h(1, 1, 0), ux), uy),
    l(l(h(0, 0, 1), h(1, 0, 1), ux), l(h(0, 1, 1), h(1, 1, 1), ux), uy),
    uz,
  );
}

// ------------------------------------------------------------------ sculpting

export interface Painter {
  /**
   * Colour for one surface voxel. `slot` is the owning primitive's paint
   * slot, `p` the voxel centre, `n` the outward surface normal there.
   * Return a hex colour (sRGB, as everywhere else in the codebase).
   */
  (slot: number, p: V3, n: V3): number;
}

export interface SculptSpec {
  /** Voxel edge in model units. */
  cell: number;
  /** Smooth-union radius for the masses. */
  blend: number;
  add: Prim[];
  hard?: Prim[];
  cut?: Prim[];
  paint: Painter;
  seed?: number;
}

const smin = (a: number, b: number, k: number): number => {
  if (k <= 0) return Math.min(a, b);
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
};

/**
 * A primitive further than this outside its own bounds cannot change the
 * sign of the field, its smooth blend, or which primitive owns a voxel, so
 * the field skips it. Without this every voxel paid for every primitive.
 */
const near = (p: Prim, x: number, y: number, z: number, m: number): boolean =>
  x > p.min[0] - m && x < p.max[0] + m && y > p.min[1] - m && y < p.max[1] + m && z > p.min[2] - m && z < p.max[2] + m;

/** The primitives a field is evaluated over (all of a spec's, or one slab's). */
interface Field { add: Prim[]; hard: Prim[]; cut: Prim[]; blend: number; cell: number }
const fieldOf = (spec: SculptSpec): Field =>
  ({ add: spec.add, hard: spec.hard ?? [], cut: spec.cut ?? [], blend: spec.blend, cell: spec.cell });

// evalField's result, kept in module scope: it runs once per voxel per
// sample and an object per call was a measurable share of a boss's build
let fieldSlot = 0;

/** Field value at a point, and (in fieldSlot) which primitive owns it. */
function evalField(f: Field, x: number, y: number, z: number): number {
  const m = f.blend + f.cell * 2;
  let d = Infinity, best = Infinity, slot = 0;
  for (const p of f.add) {
    if (!near(p, x, y, z, m)) continue;
    const v = p.d(x, y, z);
    d = d === Infinity ? v : smin(d, v, f.blend);
    if (v < best) { best = v; slot = p.paint; }
  }
  for (const p of f.hard) {
    if (!near(p, x, y, z, m)) continue;
    const v = p.d(x, y, z);
    if (v < d) d = v;
    // accents win ownership wherever they are solid, so a claw stays claw-
    // coloured right up to where it meets the hide
    if (v <= 0 && v < best + f.cell) { best = v; slot = p.paint; }
  }
  for (const p of f.cut) if (near(p, x, y, z, m)) d = Math.max(d, -p.d(x, y, z));
  fieldSlot = slot;
  return d;
}

/** Only the primitives that can matter within a slab of z. */
function slab(f: Field, z0: number, z1: number): Field {
  const m = f.blend + f.cell * 2;
  const keep = (p: Prim) => p.max[2] + m > z0 && p.min[2] - m < z1;
  return { add: f.add.filter(keep), hard: f.hard.filter(keep), cut: f.cut.filter(keep), blend: f.blend, cell: f.cell };
}

/** ...and within one row of y inside that slab. */
function row(f: Field, y: number): Field {
  const m = f.blend + f.cell * 2;
  const keep = (p: Prim) => p.max[1] + m > y && p.min[1] - m < y;
  return { add: f.add.filter(keep), hard: f.hard.filter(keep), cut: f.cut.filter(keep), blend: f.blend, cell: f.cell };
}

/** Centre of the lattice cell containing v, so a part lands on whole voxels. */
export const onLattice = (v: number, cell: number): number => (Math.floor(v / cell) + 0.5) * cell;

/**
 * First point where a ray from `from` along `dir` enters a sculpt, or null.
 * Accents and attachments use it to sit on the hide instead of being placed
 * by hand and ending up buried in it or floating off it.
 */
export function surfaceHit(spec: SculptSpec, from: V3, dir: V3, range = 120, step = 0): V3 | null {
  const f = fieldOf(spec);
  const l = Math.hypot(dir[0], dir[1], dir[2]) || 1;
  const dx = dir[0] / l, dy = dir[1] / l, dz = dir[2] / l;
  for (let t = 0; t < range;) {
    const x = from[0] + dx * t, y = from[1] + dy * t, z = from[2] + dz * t;
    const d = evalField(f, x, y, z);
    if (d <= 0) return [x, y, z];
    // A fixed step marches lattice centres. Otherwise sphere-trace: the
    // field is a distance bound, halved because squashed primitives can
    // overstate it, and empty space reads as one long stride.
    t += step > 0 ? step : Math.max(0.02, Math.min(d === Infinity ? 1 : d * 0.5, 1));
  }
  return null;
}

/** Height of a sculpt's surface above (x, z), or NaN if the column is empty. */
export function surfaceY(spec: SculptSpec, x: number, z: number, top = 60): number {
  const hit = surfaceHit(spec, [x, top, z], [0, -1, 0], top * 2);
  return hit ? hit[1] : NaN;
}

/**
 * The part of `p` that lies within `depth` under a sculpt's surface: cracks,
 * veins and inlays. As a cut it opens a channel in the hide only that deep;
 * with `inside` it is the matching fill, flush with the surface, to light.
 */
export function inShell(spec: SculptSpec, p: Prim, depth: number, inside: boolean, paint = p.paint): Prim {
  const f = fieldOf(spec);
  return {
    paint, min: p.min, max: p.max,
    d(x, y, z) {
      const s = evalField(f, x, y, z);
      const d = Math.max(p.d(x, y, z), -s - depth);
      return inside ? Math.max(d, s) : d;
    },
  };
}

// face table shared with the chunk mesher's conventions
const FACES: { d: V3; v: V3[] }[] = [
  { d: [1, 0, 0], v: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] },
  { d: [-1, 0, 0], v: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]] },
  { d: [0, 1, 0], v: [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]] },
  { d: [0, -1, 0], v: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] },
  { d: [0, 0, 1], v: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]] },
  { d: [0, 0, -1], v: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]] },
];
/**
 * Softer than the city's [0.56, 0.73, 0.87, 1]: a curved flank is a staircase
 * of voxel steps, and at full strength every step drew its own dark crease,
 * which read as triangles all over the hide rather than as form.
 */
const AO_CURVE = [0.68, 0.8, 0.9, 1.0];
/**
 * For each face and corner: offsets (from the cell the face looks into) of
 * the two edge neighbours and the diagonal in that layer.
 */
const CORNER_OFFSETS: V3[][][] = FACES.map((f) => {
  const [ta, tb] = [0, 1, 2].filter((a) => f.d[a] === 0);
  return f.v.map((v) => {
    const A: V3 = [0, 0, 0], Bv: V3 = [0, 0, 0];
    A[ta] = v[ta] === 1 ? 1 : -1;
    Bv[tb] = v[tb] === 1 ? 1 : -1;
    return [A, Bv, [A[0] + Bv[0], A[1] + Bv[1], A[2] + Bv[2]]];
  });
});

/** Rasterise a sculpt into a mesh-ready geometry (model units, local space). */
export function sculpt(spec: SculptSpec): THREE.BufferGeometry {
  const cell = spec.cell;
  const all = [...spec.add, ...(spec.hard ?? [])];
  const lo: V3 = [Infinity, Infinity, Infinity], hi: V3 = [-Infinity, -Infinity, -Infinity];
  for (const p of all) for (let i = 0; i < 3; i++) { lo[i] = Math.min(lo[i], p.min[i]); hi[i] = Math.max(hi[i], p.max[i]); }
  const pad = spec.blend + cell * 2;
  // snap the grid to a global lattice so parts share one voxel grain
  const ox = Math.floor((lo[0] - pad) / cell) * cell;
  const oy = Math.floor((lo[1] - pad) / cell) * cell;
  const oz = Math.floor((lo[2] - pad) / cell) * cell;
  const nx = Math.ceil((hi[0] + pad - ox) / cell) + 1;
  const ny = Math.ceil((hi[1] + pad - oy) / cell) + 1;
  const nz = Math.ceil((hi[2] + pad - oz) / cell) + 1;
  const idx = (i: number, j: number, k: number) => (k * ny + j) * nx + i;
  const solid = new Uint8Array(nx * ny * nz);
  const owner = new Uint8Array(nx * ny * nz);

  // Each voxel only tests the primitives whose bounds reach its row. The
  // rows are kept for the paint pass below: a primitive outside a row's
  // margin cannot change the field near that row's surface either.
  const field = fieldOf(spec);
  const rows: (Field | null)[] = new Array(nz * ny).fill(null);
  for (let k = 0; k < nz; k++) {
    const z = oz + (k + 0.5) * cell;
    const zs = slab(field, z, z);
    if (!zs.add.length && !zs.hard.length) continue;
    for (let j = 0; j < ny; j++) {
      const y = oy + (j + 0.5) * cell;
      const f = row(zs, y);
      if (!f.add.length && !f.hard.length) continue;
      rows[k * ny + j] = f;
      for (let i = 0; i < nx; i++) {
        const x = ox + (i + 0.5) * cell;
        if (evalField(f, x, y, z) <= 0) { const n = idx(i, j, k); solid[n] = 1; owner[n] = fieldSlot; }
      }
    }
  }
  const at = (i: number, j: number, k: number) =>
    i < 0 || j < 0 || k < 0 || i >= nx || j >= ny || k >= nz ? 0 : solid[idx(i, j, k)];

  const pos: number[] = [], nor: number[] = [], col: number[] = [], ind: number[] = [];
  const c = new THREE.Color();
  const e = cell * 0.5;
  const seed = spec.seed ?? 1;
  const ao = [1, 1, 1, 1];

  for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    if (!solid[idx(i, j, k)]) continue;
    let painted = false;
    let r = 0, g = 0, b = 0;
    for (let fi = 0; fi < 6; fi++) {
      const f = FACES[fi];
      if (at(i + f.d[0], j + f.d[1], k + f.d[2])) continue;
      if (!painted) {
        painted = true;
        const px = ox + (i + 0.5) * cell, py = oy + (j + 0.5) * cell, pz = oz + (k + 0.5) * cell;
        // outward normal of the whole field, for countershading
        const rf = rows[k * ny + j] ?? field;
        const gx = evalField(rf, px + e, py, pz) - evalField(rf, px - e, py, pz);
        const gy = evalField(rf, px, py + e, pz) - evalField(rf, px, py - e, pz);
        const gz = evalField(rf, px, py, pz + e) - evalField(rf, px, py, pz - e);
        const gl = Math.hypot(gx, gy, gz) || 1;
        c.setHex(spec.paint(owner[idx(i, j, k)], [px, py, pz], [gx / gl, gy / gl, gz / gl]));
        // the same faint per-voxel variation the city blocks carry
        const jit = 0.93 + 0.07 * hash(i, j, k, seed);
        r = c.r * jit; g = c.g * jit; b = c.b * jit;
      }
      // AO from the cells around the face, in the layer it looks into
      const bi = i + f.d[0], bj = j + f.d[1], bk = k + f.d[2];
      for (let q = 0; q < 4; q++) {
        const [A, Bv, D] = CORNER_OFFSETS[fi][q];
        const e1 = at(bi + A[0], bj + A[1], bk + A[2]);
        const e2 = at(bi + Bv[0], bj + Bv[1], bk + Bv[2]);
        // two solid edges seal the corner regardless of the diagonal
        const cr = e1 && e2 ? 1 : at(bi + D[0], bj + D[1], bk + D[2]);
        ao[q] = AO_CURVE[3 - (e1 + e2 + cr)];
      }
      const base = pos.length / 3;
      for (let q = 0; q < 4; q++) {
        const v = f.v[q];
        pos.push(ox + (i + v[0]) * cell, oy + (j + v[1]) * cell, oz + (k + v[2]) * cell);
        nor.push(f.d[0], f.d[1], f.d[2]);
        col.push(r * ao[q], g * ao[q], b * ao[q]);
      }
      if (ao[0] + ao[2] > ao[1] + ao[3]) ind.push(base + 1, base + 2, base + 3, base + 1, base + 3, base);
      else ind.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  geo.setIndex(ind);
  geo.computeBoundingSphere();
  geo.computeBoundingBox();
  return geo;
}

// --------------------------------------------------------------------- cache

const cache = new Map<string, THREE.BufferGeometry>();
/**
 * Sculpt once per key and share the geometry. Act II reuses five bosses and
 * each sculpt costs a few milliseconds; instances never modify the shared
 * geometry (corruption clones before it tints).
 */
export function sculpted(key: string, spec: () => SculptSpec): THREE.BufferGeometry {
  let g = cache.get(key);
  if (!g) { g = sculpt(spec()); cache.set(key, g); }
  return g;
}

/** A lit, vertex-coloured material for a sculpted part. One per instance. */
export function hideMaterial(roughness = 0.78, metalness = 0.04): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness, metalness });
  // marks sculpted hide, which takes boss state tints at reduced strength
  m.userData.hide = true;
  return m;
}
