// Sculpted voxel anatomy for the bosses. Each function returns a cached
// geometry in the same model space the old box-built parts used, so the
// pivots, hitboxes and weak points in monsters.ts keep working unchanged.

import * as THREE from 'three';
import {
  blade, chain, cone, ellipsoid, mirrorX, noise3, onLattice, Prim, SculptSpec, sculpted, sphere, squash, surfaceHit, surfaceY, V3,
} from '../render/voxelSculpt';

/** Roughly the city's voxel grain once MONSTER_SCALE (2.2) is applied. */
const CELL = 0.36;

const _a = new THREE.Color(), _b = new THREE.Color();
const mix = (a: number, b: number, t: number): number =>
  _a.setHex(a).lerp(_b.setHex(b), Math.max(0, Math.min(1, t))).getHex();
const scale = (c: number, k: number): number => _a.setHex(c).multiplyScalar(k).getHex();
const smooth = (e0: number, e1: number, x: number): number => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/**
 * Countershading, the way real animals are coloured: dark where the surface
 * faces the sky, pale where it faces the ground, with low-frequency mottling
 * so a big flank is not one flat colour. Weak on purpose — at fight distance
 * strong per-voxel variation turns into noise.
 */
function hide(back: number, belly: number, p: V3, n: V3, seed: number, bellyBias = 0): number {
  // the dark-to-pale line wanders in blotches, as on a real animal, rather
  // than running round the body like a paint line
  const wander = (noise3(p[0] * 1.1, p[1] * 1.1, p[2] * 1.1, seed + 7) - 0.5) * 0.7;
  const under = smooth(0.15, -0.6, n[1] - bellyBias + wander);
  const mottle = 0.84 + 0.16 * noise3(p[0] * 0.75, p[1] * 0.75, p[2] * 0.75, seed);
  return scale(mix(back, belly, under), mottle);
}

// ================================================================ GORGOSAUR
// A heavy theropod: pear-shaped torso, thick neck, reptile skull, small
// clawed arms, digitigrade legs and a long tail that tapers to a point, with
// three rows of bone plates down the spine that light up before the beam.

const G = {
  BACK: 0x2f3a33, BELLY: 0x9c977c, SCUTE: 0xb4ad8d, BROW: 0x262f29,
  PLATE: 0xd6dde2, PLATE_TIP: 0x9ec6dc, CLAW: 0xe6dfcb, TOOTH: 0xf1ece0, MOUTH: 0x5b2226,
};
enum GS { HIDE, BROW, CLAW, TOOTH, JAW, PLATE }

/** Mouth opening in model space — the beam leaves from here. */
export const GORGOSAUR_MOUTH: V3 = [0, 11.55, 7.35];
/**
 * Left-right eye position in model space, just proud of the hide under the
 * brow ridge. Found on the sculpt rather than typed in: a hand-placed eye
 * either sank into the skull or floated off it.
 */
let gorgosaurEyeMemo: V3 | null = null;
export function gorgosaurEye(): V3 {
  if (!gorgosaurEyeMemo) {
    // march voxel centres in from the side, so the eye sits on the face of
    // the voxel the mesh actually has there, not on the smooth field
    const c = (v: number) => (Math.floor(v / CELL) + 0.5) * CELL;
    const y = c(12.45), z = c(5.0);
    const hit = surfaceHit(gorgosaurBodySpec(), [c(5), y, z], [-1, 0, 0], 5, CELL);
    gorgosaurEyeMemo = [(hit ? hit[0] + CELL / 2 : 1.3) - 0.04, y, z];
  }
  return gorgosaurEyeMemo;
}
/** Hip pivots and tail root, matching the animated groups. */
export const GORGOSAUR_HIP: V3 = [2.2, 6.4, -0.8];
export const GORGOSAUR_TAIL_ROOT: V3 = [0, 6.25, -2.6];
/** Where the dorsal weak core sits, between the plate rows. */
export const GORGOSAUR_CORE: V3 = [0, 9.7, -1.55];

function gorgosaurPaint(slot: number, p: V3, n: V3): number {
  // a dark ring of skin around each eye, so the glow sits in a socket
  if (slot === GS.HIDE || slot === GS.BROW) {
    const e = gorgosaurEye();
    if (Math.hypot(Math.abs(p[0]) - e[0], p[1] - e[1], p[2] - e[2]) < 0.62) return scale(G.BROW, 0.7);
  }
  switch (slot) {
    case GS.BROW: return hide(G.BROW, G.BACK, p, n, 3);
    case GS.CLAW: return G.CLAW;
    case GS.TOOTH: return G.TOOTH;
    case GS.JAW: return n[1] > 0.45 ? G.MOUTH : hide(G.BACK, G.BELLY, p, n, 5, 0.25);
    case GS.PLATE: {
      // bone plates, bluing toward the tips
      const tip = smooth(0.0, 1.0, (p[1] - 9) / 4);
      return mix(G.PLATE, G.PLATE_TIP, tip * 0.7);
    }
    default: {
      // banded belly scutes down the front of the torso
      const front = n[2] > 0.25 && n[1] < 0.55 && Math.abs(p[0]) < 1.55 && p[1] > 5.2 && p[1] < 10.6 && p[2] > -0.5;
      if (front) {
        const band = Math.abs(((p[1] * 1.45) % 1) - 0.5) < 0.12 ? 0.82 : 1;
        return scale(G.SCUTE, band);
      }
      return hide(G.BACK, G.BELLY, p, n, 1, 0.2);
    }
  }
}

let gorgosaurBodyMemo: SculptSpec | null = null;
function gorgosaurBodySpec(): SculptSpec {
  if (gorgosaurBodyMemo) return gorgosaurBodyMemo;
  {
    const add: Prim[] = [
      // torso: chest over gut over hips, leaning forward
      ellipsoid([0, 9.1, 0.8], [2.45, 2.3, 2.35], GS.HIDE),
      ellipsoid([0, 7.3, 0.1], [2.6, 2.3, 2.5], GS.HIDE),
      ellipsoid([0, 6.6, -1.4], [2.35, 1.95, 2.25], GS.HIDE),
      // the neck grows out of the shoulders
      cone([0, 10.3, 1.4], [0, 11.9, 3.4], 1.8, 1.25, GS.HIDE),
      // skull, snout, cheek muscle
      ellipsoid([0, 12.45, 4.35], [1.42, 1.22, 1.65], GS.HIDE),
      cone([0, 12.2, 5.2], [0, 11.95, 7.15], 1.0, 0.68, GS.HIDE),
      ...mirrorX([
        ellipsoid([1.6, 9.65, 0.9], [1.2, 1.1, 1.2], GS.HIDE),      // shoulder
        ellipsoid([0.92, 12.0, 4.35], [0.55, 0.62, 0.8], GS.HIDE),  // cheek
        cone([0.84, 13.0, 4.4], [0.8, 12.86, 5.6], 0.38, 0.26, GS.BROW), // brow ridge over the eye
        // small clawed arms held in front of the chest
        cone([2.05, 9.3, 1.4], [2.55, 8.25, 2.35], 0.72, 0.55, GS.HIDE),
        cone([2.55, 8.25, 2.35], [2.35, 7.55, 3.25], 0.55, 0.45, GS.HIDE),
        ellipsoid([2.3, 7.35, 3.45], [0.46, 0.36, 0.46], GS.HIDE),
      ]),
    ];
    const hard: Prim[] = [];
    // hand claws and the upper tooth row
    for (let c = 0; c < 3; c++) {
      hard.push(...mirrorX([cone([2.08 + c * 0.22, 7.2, 3.72], [2.0 + c * 0.25, 6.8, 4.05], 0.13, 0.04, GS.CLAW)]));
    }
    for (let t = 0; t < 6; t++) {
      const z = 5.55 + t * 0.32, x = 0.52 - t * 0.035;
      hard.push(...mirrorX([cone([x, 11.6, z], [x, 11.18, z + 0.05], 0.12, 0.04, GS.TOOTH)]));
    }
    gorgosaurBodyMemo = { cell: CELL, blend: 0.9, add, hard, paint: gorgosaurPaint, seed: 11 };
    return gorgosaurBodyMemo;
  }
}

export function gorgosaurBody(): THREE.BufferGeometry {
  return sculpted('gorgosaur.body', gorgosaurBodySpec);
}

/** Lower jaw, in hinge space (hinge at the back of the jaw, at the origin). */
export const GORGOSAUR_JAW_HINGE: V3 = [0, 11.55, 4.5];
export function gorgosaurJaw(): THREE.BufferGeometry {
  return sculpted('gorgosaur.jaw', () => {
    const add: Prim[] = [
      squash(cone([0, -0.12, 0.15], [0, -0.05, 2.6], 0.72, 0.5, GS.JAW), [0, -0.1, 1.4], [1, 1.4, 1]),
      ...mirrorX([ellipsoid([0.6, -0.15, 0.4], [0.42, 0.5, 0.65], GS.JAW)]),
    ];
    const hard: Prim[] = [];
    for (let t = 0; t < 5; t++) {
      const z = 1.0 + t * 0.32, x = 0.45 - t * 0.035;
      hard.push(...mirrorX([cone([x, 0.0, z], [x, 0.36, z + 0.04], 0.11, 0.035, GS.TOOTH)]));
    }
    return { cell: CELL, blend: 0.5, add, hard, paint: gorgosaurPaint, seed: 13 };
  });
}

/** One leg, in hip-pivot space, built as the LEFT leg (outward is -x). */
export function gorgosaurLeg(): THREE.BufferGeometry {
  return sculpted('gorgosaur.leg', () => {
    const add: Prim[] = [
      // a thigh that sinks well up into the hip so the joint can swing
      ellipsoid([-0.25, -1.05, 0.15], [1.38, 2.1, 1.78], GS.HIDE),
      // digitigrade: the shin slopes back, the metatarsal comes forward
      cone([-0.15, -2.6, 0.55], [-0.05, -4.3, -0.35], 1.08, 0.78, GS.HIDE),
      cone([-0.05, -4.3, -0.35], [0, -5.7, 0.45], 0.78, 0.62, GS.HIDE),
      // the foot's sole sits on the ground, which is 6.4 below the hip
      ellipsoid([0, -5.94, 0.95], [0.98, 0.44, 1.28], GS.HIDE),
    ];
    const hard: Prim[] = [];
    for (let t = 0; t < 3; t++) {
      const x = -0.58 + t * 0.58;
      add.push(cone([x, -5.98, 1.55], [x * 1.12, -6.1, 2.32], 0.3, 0.2, GS.HIDE));
      hard.push(cone([x * 1.12, -6.05, 2.28], [x * 1.18, -6.3, 2.8], 0.17, 0.05, GS.CLAW));
    }
    return { cell: CELL, blend: 0.75, add, hard, paint: gorgosaurPaint, seed: 17 };
  });
}

/** Tail, in tail-root space: tapers to a point with a slight sideways curl. */
const TAIL_PATH: V3[] = [[0, 0, 0], [0, -0.4, -3.2], [0, -0.95, -6.6], [0.2, -1.45, -10.0], [0.45, -1.75, -13.2], [0.5, -1.85, -15.8]];
const TAIL_R = [1.9, 1.56, 1.16, 0.8, 0.48, 0.16];
export function gorgosaurTail(): THREE.BufferGeometry {
  return sculpted('gorgosaur.tail', () => ({
    cell: CELL, blend: 0.6, add: chain(TAIL_PATH, TAIL_R, GS.HIDE), paint: gorgosaurPaint, seed: 19,
  }));
}

/**
 * A leaf-shaped bone plate rising from `base`, tilted back along the spine:
 * `length` fore-and-aft at the root, `thick` side to side.
 */
function plate(base: V3, height: number, length: number, thick: number, lean: number, splay = 0): Prim {
  const tip: V3 = [base[0] + splay, base[1] + height, base[2] - height * lean];
  return blade(base, tip, length / 2, 0.1, Math.max(thick, CELL * 1.1), GS.PLATE);
}

/**
 * Dorsal plates: three rows down the neck and back, with a gap around the
 * weak core so it sits between them. Each plate is rooted a little under the
 * hide, found by marching down the body's own field. A separate mesh so the
 * plates can light up while the beam charges.
 */
export function gorgosaurPlates(): THREE.BufferGeometry {
  return sculpted('gorgosaur.plates', () => {
    const body = gorgosaurBodySpec();
    const hard: Prim[] = [];
    /** A plate rooted `sink` under the hide at (x, z); none off the edge. */
    const grow = (x: number, z: number, sink: number, mirror: boolean, make: (base: V3) => Prim) => {
      const y = surfaceY(body, x, z);
      if (Number.isNaN(y)) return;
      const p = make([x, y - sink, z]);
      hard.push(...(mirror ? mirrorX([p]) : [p]));
    };
    // z along the spine, plate height above the hide; the tail carries on
    // from the hips with its own row
    const spine: [number, number][] = [
      [3.1, 1.25], [2.3, 1.8], [1.45, 2.25], [0.55, 2.55],
      // the core sits around z -1.55
      [-2.55, 2.0],
    ];
    for (const [z, h] of spine) {
      grow(0, z, 0.35, false, (b) => plate(b, h + 0.35, 1.65, 0.72, 0.5));
      // side rows: smaller, staggered back and splayed outward
      grow(0.66, z - 0.4, 0.35, true, (b) => plate(b, h * 0.55 + 0.35, 1.1, 0.4, 0.45, 0.3));
    }
    // a pair of flanking plates either side of the core itself
    grow(0.8, GORGOSAUR_CORE[2], 0.35, true, (b) => plate(b, 1.5, 1.05, 0.4, 0.35, 0.4));
    return { cell: CELL, blend: 0, add: [], hard, paint: gorgosaurPaint, seed: 23 };
  });
}

/** Tail plates, in tail-root space, shrinking toward the tip. */
export function gorgosaurTailPlates(): THREE.BufferGeometry {
  return sculpted('gorgosaur.tailplates', () => {
    const hard: Prim[] = [];
    for (let i = 0; i < 5; i++) {
      const t = (i + 0.5) / 5;
      const seg = Math.min(TAIL_PATH.length - 2, Math.floor(t * (TAIL_PATH.length - 1)));
      const f = t * (TAIL_PATH.length - 1) - seg;
      const a = TAIL_PATH[seg], b = TAIL_PATH[seg + 1];
      const r = TAIL_R[seg] + (TAIL_R[seg + 1] - TAIL_R[seg]) * f;
      const base: V3 = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f + r * 0.7, a[2] + (b[2] - a[2]) * f];
      hard.push(plate(base, 1.75 - i * 0.27, 1.45 - i * 0.2, 0.6, 0.6));
    }
    return { cell: CELL, blend: 0, add: [], hard, paint: gorgosaurPaint, seed: 29 };
  });
}

// ============================================================== MISSILE MAW
// A hunched, armoured artillery beast that hovers on jets in its soles: a
// segmented carapace over a pale belly, a head sunk under a hooded crest
// with four red eyes and a fanged slot of a mouth, small grasping forelimbs,
// and clusters of bony launch tubes grown out of each shoulder. The tubes
// glow down their bores and every rocket leaves from one of them.

const M = {
  BACK: 0x413379, BELLY: 0xaea6c2, BROW: 0x2f2747, BONE: 0xd9cfb4, BONE_BAND: 0x7a705c,
  CLAW: 0xe8e2d0, MOUTH: 0x3a1420, NOZZLE: 0x26232f, SPIKE: 0x2a2440,
  EYE: 0xff3355, TUBE: 0xff7a2f, JET: 0x39e6e0,
};
enum MS { HIDE, BROW, BONE, CLAW, NOZZLE, SPIKE }

const L = (v: number) => onLattice(v, CELL);
/** Launch tubes, one side: axis (x, y) on lattice columns, pointing forward. */
const MAW_TUBES: [number, number][] = [[L(2.7), L(10.6)], [L(2.34), L(9.9)], [L(3.06), L(9.9)]];
const MAW_TUBE_BACK = -0.9, MAW_TUBE_FRONT = 1.8, MAW_TUBE_R = 0.46;
/** The glowing plug sits one voxel behind the bore. */
const MAW_PLUG_Z = L(0.95);
/**
 * Rocket muzzles in model space, alternating left and right so a salvo
 * ripples across both shoulders.
 */
export const MAW_MUZZLES: V3[] = MAW_TUBES.flatMap(([x, y]) => [
  [-x, y, MAW_TUBE_FRONT + MAW_TUBE_R] as V3, [x, y, MAW_TUBE_FRONT + MAW_TUBE_R] as V3,
]);
const MAW_MOUTH = { c: [0, 8.35, 4.95] as V3, r: [1.0, 0.32, 0.75] as V3 };
const MAW_FOOT: V3 = [2.0, L(2.4), 0.2];

function mawPaint(slot: number, p: V3, n: V3): number {
  switch (slot) {
    case MS.BROW: return hide(M.BROW, M.BACK, p, n, 31);
    case MS.CLAW: return M.CLAW;
    case MS.NOZZLE: return M.NOZZLE;
    case MS.SPIKE: return M.SPIKE;
    case MS.BONE: {
      // growth rings down each tube
      const ring = Math.abs(((p[2] + 4) * 1.6) % 1 - 0.5) < 0.14;
      return scale(ring ? M.BONE_BAND : M.BONE, 0.92 + 0.08 * noise3(p[0] * 2, p[1] * 2, p[2] * 2, 37));
    }
    default: {
      // the mouth: a dark throat wherever the slot was carved
      const mq = Math.hypot((p[0] - MAW_MOUTH.c[0]) / MAW_MOUTH.r[0], (p[1] - MAW_MOUTH.c[1]) / MAW_MOUTH.r[1], (p[2] - MAW_MOUTH.c[2]) / MAW_MOUTH.r[2]);
      if (mq < 1.9 && p[2] > 4.2) return M.MOUTH;
      const base = hide(M.BACK, M.BELLY, p, n, 33, 0.1);
      // carapace segments: dark seams across the back
      if (n[1] > 0.15 && p[2] < 2.4 && Math.abs(((p[2] + 8) / 1.15) % 1) < 0.17) return scale(base, 0.58);
      return base;
    }
  }
}

let mawBaseMemo: SculptSpec | null = null;
/** Everything but the cuts that depend on where the surface turned out to be. */
function mawBaseSpec(): SculptSpec {
  if (mawBaseMemo) return mawBaseMemo;
  const add: Prim[] = [
    // a hunched body: shoulder dome over chest over belly, a stub of a tail
    ellipsoid([0, 8.6, 0.8], [2.4, 1.9, 2.2], MS.HIDE),
    ellipsoid([0, 7.7, -1.4], [2.1, 1.7, 2.2], MS.HIDE),
    ellipsoid([0, 9.7, 0.0], [2.25, 1.25, 2.6], MS.HIDE),
    cone([0, 7.8, -2.6], [0, 7.0, -5.4], 1.4, 0.4, MS.HIDE),
    // head sunk low between the shoulders, under a hooded crest
    cone([0, 9.0, 2.0], [0, 8.9, 3.2], 1.3, 1.15, MS.HIDE),
    ellipsoid([0, 9.0, 3.8], [1.5, 1.25, 1.35], MS.HIDE),
    ellipsoid([0, 10.05, 3.35], [1.85, 0.5, 1.45], MS.BROW),
    ellipsoid([0, 8.0, 4.0], [1.3, 0.62, 1.25], MS.HIDE),
    ...mirrorX([
      // fleshy collars the launch tubes grow out of
      ellipsoid([2.65, 10.0, -0.6], [1.2, 1.05, 1.4], MS.HIDE),
      // heavy legs tucked up under it while it hovers: thigh forward,
      // shin folded back, the jetting foot hanging beneath
      ellipsoid([1.85, 6.4, -0.5], [1.15, 1.5, 1.45], MS.HIDE),
      cone([2.0, 5.6, 0.3], [2.05, 4.2, 1.25], 1.0, 0.8, MS.HIDE),
      cone([2.05, 4.2, 1.25], [2.0, MAW_FOOT[1] + 1.05, -0.2], 0.78, 0.55, MS.HIDE),
      ellipsoid([MAW_FOOT[0], MAW_FOOT[1] + 0.7, MAW_FOOT[2] + 0.15], [0.85, 0.5, 1.15], MS.HIDE),
      // grasping forelimbs held up in front of the chest, like a mantis's
      cone([2.2, 8.0, 1.9], [2.75, 6.7, 2.9], 0.8, 0.62, MS.HIDE),
      cone([2.75, 6.7, 2.9], [2.3, 7.2, 4.3], 0.6, 0.5, MS.HIDE),
      ellipsoid([2.2, 7.15, 4.65], [0.6, 0.48, 0.55], MS.HIDE),
    ]),
  ];
  const hard: Prim[] = [];
  for (const [x, y] of MAW_TUBES) {
    hard.push(...mirrorX([cone([x, y, MAW_TUBE_BACK], [x, y, MAW_TUBE_FRONT], MAW_TUBE_R, MAW_TUBE_R, MS.BONE)]));
  }
  for (let c = 0; c < 3; c++) {
    const dx = (c - 1) * 0.42;
    // hooked hand claws, and toe claws curling down off the hanging feet
    hard.push(...mirrorX([cone([2.2 + dx, 7.1, 5.05], [2.2 + dx * 1.2, 6.45, 5.45], 0.2, 0.05, MS.CLAW)]));
    hard.push(...mirrorX([cone([MAW_FOOT[0] + dx * 1.3, MAW_FOOT[1] + 0.6, MAW_FOOT[2] + 1.15], [MAW_FOOT[0] + dx * 1.5, MAW_FOOT[1] + 0.05, MAW_FOOT[2] + 1.55], 0.2, 0.05, MS.CLAW)]));
  }
  // jet nozzles in the soles
  hard.push(...mirrorX([cone([MAW_FOOT[0], MAW_FOOT[1] + 0.4, MAW_FOOT[2]], [MAW_FOOT[0], MAW_FOOT[1] - 0.15, MAW_FOOT[2]], 0.52, 0.6, MS.NOZZLE)]));
  // fangs on lattice columns so each one is at least a whole voxel
  for (let i = 0; i < 5; i++) {
    const x = L(-0.72 + i * 0.36), z = L(5.05);
    hard.push(cone([x, 8.7, z], [x, 8.1, z], 0.15, 0.05, MS.CLAW));
  }
  for (const x of [L(-0.5), L(0.5)]) hard.push(cone([x, 7.9, L(4.9)], [x, 8.45, L(4.9)], 0.14, 0.05, MS.CLAW));
  mawBaseMemo = { cell: CELL, blend: 0.85, add, hard, paint: mawPaint, seed: 41 };
  return mawBaseMemo;
}

/** Eye voxels: the first hide voxel on four rays in from the front of the head. */
let mawEyesMemo: V3[] | null = null;
function mawEyes(): V3[] {
  if (mawEyesMemo) return mawEyesMemo;
  const base = mawBaseSpec();
  const out: V3[] = [];
  // an inner pair and a higher, wider outer pair, arced under the hood
  for (const [x, y] of [[0.5, 9.2], [1.3, 9.5]] as [number, number][]) {
    const hit = surfaceHit(base, [L(x), L(y), L(8)], [0, 0, -1], 6, CELL);
    if (hit) out.push(hit, [-hit[0], hit[1], hit[2]]);
  }
  mawEyesMemo = out;
  return out;
}

/** Weak core, nested in the carapace between the shoulder tubes. */
export function mawCore(): V3 {
  const z = -1.0;
  return [0, surfaceY(mawBaseSpec(), 0, z) - 0.25, z];
}

export function mawBody(): THREE.BufferGeometry {
  return sculpted('maw.body', () => {
    const base = mawBaseSpec();
    // dorsal spikes down the carapace, clear of the core
    const hard = [...(base.hard ?? [])];
    for (const z of [1.5, 2.4, -2.3, -3.3]) {
      const y = surfaceY(base, 0, z);
      if (!Number.isNaN(y)) hard.push(cone([0, y - 0.3, z], [0, y + 0.85, z - 0.55], 0.36, 0.06, MS.SPIKE));
    }
    const cut: Prim[] = [
      ellipsoid(MAW_MOUTH.c, MAW_MOUTH.r, MS.HIDE),
      // eye sockets: exactly the voxels the glowing eyes fill
      ...mawEyes().map((e) => sphere(e, 0.2, MS.HIDE)),
    ];
    // bores down the launch tubes and the jet nozzles
    for (const [x, y] of MAW_TUBES) {
      // from just behind the plug's voxel, so the glow fills it, out past the tip
      cut.push(...mirrorX([cone([x, y, MAW_PLUG_Z - CELL * 0.3], [x, y, MAW_TUBE_FRONT + 1], 0.2, 0.2, MS.BONE)]));
    }
    cut.push(...mirrorX([cone([MAW_FOOT[0], MAW_FOOT[1] - 0.4, MAW_FOOT[2]], [MAW_FOOT[0], MAW_FOOT[1] + 0.1, MAW_FOOT[2]], 0.4, 0.4, MS.NOZZLE)]));
    return { ...base, hard, cut };
  });
}

/** Light sources that are not tinted by state: eyes and jets. */
export function mawGlow(): THREE.BufferGeometry {
  return sculpted('maw.glow', () => {
    const add: Prim[] = [
      ...mawEyes().map((e) => sphere(e, 0.2, 0)),
      ...mirrorX([ellipsoid(MAW_FOOT, [0.3, 0.2, 0.3], 1)]),
    ];
    return {
      cell: CELL, blend: 0, add,
      paint: (slot) => (slot === 0 ? M.EYE : M.JET),
      seed: 43,
    };
  });
}

/** The glowing plugs at the bottom of each launch bore; they flare to fire. */
export function mawMuzzleGlow(): THREE.BufferGeometry {
  return sculpted('maw.muzzles', () => ({
    cell: CELL, blend: 0,
    add: MAW_TUBES.flatMap(([x, y]) => mirrorX([sphere([x, y, MAW_PLUG_Z], 0.2, 0)])),
    paint: () => M.TUBE,
    seed: 47,
  }));
}

// ================================================================ PREWARM

/**
 * Every sculpted part, so they can be built before a boss arrives. A body
 * takes ~20ms to rasterise; built at spawn, a boss's parts together were a
 * visible hitch right as the fight began.
 */
const PARTS: (() => THREE.BufferGeometry)[] = [
  gorgosaurBody, gorgosaurJaw, gorgosaurLeg, gorgosaurTail, gorgosaurPlates, gorgosaurTailPlates,
  mawBody, mawGlow, mawMuzzleGlow,
];

/** Build the sculpts one per idle slot (the cache keeps them). */
export function prewarmBossModels(): void {
  const queue = [...PARTS];
  const idle: (cb: () => void) => void = typeof requestIdleCallback === 'function'
    ? (cb) => requestIdleCallback(cb, { timeout: 2000 })
    : (cb) => setTimeout(cb, 50);
  const next = () => {
    const build = queue.shift();
    if (!build) return;
    build();
    idle(next);
  };
  idle(next);
}
