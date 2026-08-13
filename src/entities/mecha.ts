// TERRA-ARMOR: Neo Tokyo's original close-combat defence frame. Its visual
// language is white ceramic armour, red impact plating, cyan optics and a
// green plasma edge over a compact dark mechanical skeleton.

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const MECHA_SCALE = 2.2;
export const MECHA_NAME = 'TERRA-ARMOR';

const WHITE = 0xf4f5f8;
const RED = 0xe13b30;
const CYAN = 0x28dff2;
const JOINT = 0x3a3d45;
const DARK = 0x23262b;
const SABER = 0x63ff83;
const CRIMSON = 0xff2448;
const STEEL = 0x89919d;

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity: emissive ? 1.35 : 0,
      metalness: color === JOINT || color === DARK || color === STEEL ? 0.55 : 0.12,
      roughness: color === WHITE ? 0.32 : 0.42,
      flatShading: true,
    })
  );
}

// A small layered plate makes the construction feel manufactured rather than
// like a single voxel. Keep it boxy so it belongs in the world aesthetic.
function plate(w: number, h: number, d: number, color = WHITE): THREE.Mesh {
  const mesh = box(w, h, d, color);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function material(color: number, emissive = 0): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: emissive ? 1.65 : 0,
    metalness: color === JOINT || color === DARK || color === STEEL ? 0.62 : 0.18,
    roughness: color === WHITE ? 0.28 : 0.38,
    flatShading: true,
  });
}

function finished(geometry: THREE.BufferGeometry, color: number, emissive = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, material(color, emissive));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** Eight-sided tapered armour block. Unlike a scaled cube it has a deliberate
 * mechanical silhouette from front, side and rear views. */
function frustum(
  bottomW: number, topW: number, h: number,
  bottomD: number, topD: number, color = WHITE
): THREE.Mesh {
  // Four discrete courses reproduce the stepped taper of a high-detail voxel
  // build. The silhouette changes by small increments instead of one huge box
  // or a smooth diagonal polygon.
  const courses = 4;
  const pieces: THREE.BufferGeometry[] = [];
  for (let i = 0; i < courses; i++) {
    const t = (i + 0.5) / courses;
    const w = THREE.MathUtils.lerp(bottomW, topW, t);
    const d = THREE.MathUtils.lerp(bottomD, topD, t);
    const piece = new THREE.BoxGeometry(w, h / courses * 1.015, d);
    piece.translate(0, -h / 2 + h * t, 0);
    pieces.push(piece);
  }
  return finished(mergeGeometries(pieces, false), color);
}

function cylinder(radius: number, h: number, color: number, _sides = 16): THREE.Mesh {
  const pieces: THREE.BufferGeometry[] = [];
  const core = new THREE.BoxGeometry(radius * 1.45, h, radius * 1.45);
  pieces.push(core);
  for (const [x, z] of [[-0.72, 0], [0.72, 0], [0, -0.72], [0, 0.72]]) {
    const tooth = new THREE.BoxGeometry(radius * 0.58, h * 0.82, radius * 0.58);
    tooth.translate(x * radius, 0, z * radius);
    pieces.push(tooth);
  }
  return finished(mergeGeometries(pieces, false), color);
}

function capsule(radius: number, straight: number, color: number): THREE.Mesh {
  const pieces: THREE.BufferGeometry[] = [];
  const levels = 5;
  const total = straight + radius * 2;
  for (let i = 0; i < levels; i++) {
    const edge = Math.abs(i - (levels - 1) / 2) / ((levels - 1) / 2);
    const width = radius * 2 * (1 - edge * 0.24);
    const piece = new THREE.BoxGeometry(width, total / levels * 1.02, width);
    piece.translate(0, -total / 2 + total * (i + 0.5) / levels, 0);
    pieces.push(piece);
  }
  return finished(mergeGeometries(pieces, false), color);
}

function sphere(radius: number, color: number, emissive = 0): THREE.Mesh {
  const pieces: THREE.BufferGeometry[] = [];
  const core = new THREE.BoxGeometry(radius * 1.42, radius * 1.42, radius * 1.42);
  pieces.push(core);
  const capSize = radius * 0.76;
  for (const [x, y, z] of [
    [-0.7, 0, 0], [0.7, 0, 0], [0, -0.7, 0],
    [0, 0.7, 0], [0, 0, -0.7], [0, 0, 0.7],
  ]) {
    const cap = new THREE.BoxGeometry(capSize, capSize, capSize);
    cap.translate(x * radius, y * radius, z * radius);
    pieces.push(cap);
  }
  return finished(mergeGeometries(pieces, false), color, emissive);
}

function addMirrored(parent: THREE.Object3D, source: THREE.Object3D): THREE.Object3D {
  const mirror = source.clone();
  mirror.position.x *= -1;
  mirror.rotation.z *= -1;
  parent.add(source, mirror);
  return mirror;
}

export class MechaModel {
  group = new THREE.Group();
  private legL: THREE.Group;
  private legR: THREE.Group;
  private armL: THREE.Group;
  private armR: THREE.Group;
  private elbowL!: THREE.Group;
  private elbowR!: THREE.Group;
  private torso: THREE.Group;
  private head: THREE.Group;
  saberBlade: THREE.Mesh;
  private saberGlow!: THREE.Mesh;
  private saberTrails: THREE.Mesh[] = [];
  private crimsonEmitter!: THREE.Mesh;
  private crimsonEdge = false;
  private aegisParts: THREE.Object3D[] = [];
  private aegisBarrier!: THREE.Mesh;
  private aegisEnabled = false;
  private aegisPulseT = 0;
  private thrusterL: THREE.Mesh;
  private thrusterR: THREE.Mesh;
  private dashJetL: THREE.Group;
  private dashJetR: THREE.Group;

  swingT = -1; // 0..1 while swinging
  /** 0 horizontal, 1 reverse horizontal, 2 overhead finisher */
  private swingStyle = 0;
  /** A chained strike starts from the previous follow-through instead of
   * visibly returning all the way to the neutral standing guard. */
  private chainedSwing = false;
  aiming = false;
  // knee pivots, so the walk cycle can bend rather than swing rigidly
  private kneeL!: THREE.Group;
  private kneeR!: THREE.Group;
  // one-shot animation triggers, set by the game and decayed in animate()
  landT = 0;    // squash on touchdown
  flinchT = 0;  // recoil from taking a hit
  recoilT = 0;  // rifle kick
  dashT = 0;    // dash lunge pose
  private prevYaw = 0;
  private bank = 0;   // smoothed lean into turns
  private lean = 0;   // smoothed forward lean with speed
  private wasAirborne = false;
  flying = false; // thrusters lit — drives the streamlined flight pose
  private muzzle!: THREE.Mesh;
  private aimT = 0; // rifle raised briefly after each shot

  constructor() {
    const g = this.group;
    g.scale.setScalar(MECHA_SCALE);

    // The turnaround has long legs, a narrow waist and compact torso. Keeping
    // those ratios here is what prevents the frame reading as a blocky mascot.
    this.legL = this.makeLeg(-0.37);
    this.legR = this.makeLeg(0.37);
    this.kneeL = (this.legL as THREE.Group & { lower: THREE.Group }).lower;
    this.kneeR = (this.legR as THREE.Group & { lower: THREE.Group }).lower;
    g.add(this.legL, this.legR);

    const makeDashJet = (x: number): THREE.Group => {
      const jet = new THREE.Group();
      jet.position.set(x, 0.48, -0.42);
      const core = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.16, 2.1),
        new THREE.MeshBasicMaterial({ color: 0xbff7ff, toneMapped: false })
      );
      core.position.z = -1.05;
      const halo = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.42, 2.5),
        new THREE.MeshBasicMaterial({ color: 0x168cff, transparent: true, opacity: 0.48,
          blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
      );
      halo.position.z = -1.2;
      const light = new THREE.PointLight(0x249dff, 7, 7, 2);
      light.position.z = -0.65;
      jet.add(halo, core, light);
      jet.visible = false;
      g.add(jet);
      return jet;
    };
    this.dashJetL = makeDashJet(-0.37);
    this.dashJetR = makeDashJet(0.37);

    // Narrow mechanical pelvis, red belt clasp, and four independent skirt
    // plates reproduce the front/rear pattern without a single large cube.
    const hipCore = cylinder(0.48, 0.34, DARK, 12);
    hipCore.position.y = 2.08;
    hipCore.rotation.z = Math.PI / 2;
    const belt = frustum(0.82, 0.76, 0.2, 0.5, 0.46, DARK);
    belt.position.y = 2.08;
    const buckle = plate(0.26, 0.2, 0.11, RED);
    buckle.position.set(0, 2.08, 0.34);
    const buckleLight = plate(0.1, 0.1, 0.025, 0xffdc69);
    buckleLight.position.set(0, 2.08, 0.405);
    g.add(hipCore, belt, buckle, buckleLight);

    for (const side of [-1, 1]) {
      const hipBlock = frustum(0.25, 0.28, 0.24, 0.22, 0.25, WHITE);
      hipBlock.position.set(side * 0.31, 2.08, 0.27);
      const hipLamp = plate(0.075, 0.075, 0.025, 0xffd34e);
      hipLamp.position.set(side * 0.31, 2.08, 0.405);
      g.add(hipBlock, hipLamp);
    }

    for (const side of [-1, 1]) {
      const frontSkirt = frustum(0.22, 0.32, 0.55, 0.12, 0.16, WHITE);
      frontSkirt.position.set(side * 0.25, 1.8, 0.36);
      frontSkirt.rotation.z = side * -0.08;
      frontSkirt.rotation.x = 0.12;
      const sideSkirt = frustum(0.16, 0.23, 0.48, 0.4, 0.33, WHITE);
      sideSkirt.position.set(side * 0.55, 1.83, -0.01);
      sideSkirt.rotation.z = side * -0.14;
      const rearSkirt = frustum(0.23, 0.3, 0.5, 0.12, 0.16, WHITE);
      rearSkirt.position.set(side * 0.24, 1.82, -0.36);
      rearSkirt.rotation.x = -0.12;
      g.add(frontSkirt, sideSkirt, rearSkirt);
    }

    this.torso = new THREE.Group();
    this.torso.position.y = 2.25;
    g.add(this.torso);

    // Ribbed black abdomen and a tapered white thoracic shell.
    const spine = capsule(0.27, 0.30, DARK);
    spine.position.y = 0.34;
    spine.scale.z = 0.62;
    this.torso.add(spine);
    for (const y of [0.18, 0.34, 0.5]) {
      const rib = cylinder(0.30, 0.06, STEEL, 12);
      rib.position.y = y;
      rib.scale.z = 0.60;
      this.torso.add(rib);
    }
    // White shell over the back of the abdomen: the frame should be glimpsed
    // at the joints, not run as a dark column the length of the spine.
    const lumbarShell = frustum(0.44, 0.36, 0.46, 0.20, 0.16, WHITE);
    lumbarShell.position.set(0, 0.36, -0.20);
    this.torso.add(lumbarShell);
    const chestCore = frustum(1.1, 1.48, 0.92, 0.62, 0.7, WHITE);
    chestCore.position.y = 1.03;
    this.torso.add(chestCore);
    // Sloped clavicle rails give the upper body the raised, angular shoulder
    // line visible in the action references.
    for (const side of [-1, 1]) {
      const clavicle = frustum(0.24, 0.44, 0.18, 0.5, 0.62, WHITE);
      clavicle.position.set(side * 0.52, 1.52, 0.13);
      clavicle.rotation.z = side * -0.28;
      clavicle.rotation.x = -0.08;
      const abdomenAccent = frustum(0.1, 0.16, 0.3, 0.08, 0.11, RED);
      abdomenAccent.position.set(side * 0.42, 0.67, 0.37);
      abdomenAccent.rotation.z = side * -0.18;
      this.torso.add(clavicle, abdomenAccent);
    }

    // Layered red butterfly chest motif from the front turnaround.
    for (const side of [-1, 1]) {
      const pectoral = frustum(0.44, 0.54, 0.33, 0.09, 0.12, RED);
      pectoral.position.set(side * 0.34, 1.27, 0.540);
      pectoral.rotation.z = side * 0.22;
      const lowerPec = frustum(0.23, 0.30, 0.17, 0.06, 0.08, RED);
      lowerPec.position.set(side * 0.31, 0.99, 0.535);
      lowerPec.rotation.z = side * -0.22;
      const whiteEdge = frustum(0.18, 0.28, 0.48, 0.08, 0.1, WHITE);
      whiteEdge.position.set(side * 0.72, 1.13, 0.46);
      whiteEdge.rotation.z = side * -0.12;
      this.torso.add(pectoral, lowerPec, whiteEdge);
    }
    const sternum = frustum(0.46, 0.54, 0.74, 0.17, 0.21, WHITE);
    sternum.position.set(0, 1.15, 0.50);
    const sternumRed = frustum(0.09, 0.16, 0.3, 0.058, 0.092, RED);
    sternumRed.position.set(0, 1.08, 0.596);
    this.torso.add(sternum, sternumRed);
    // Narrow stepped side ribs preserve the reference's sharp chest wedge
    // when the model is viewed in profile.
    for (const side of [-1, 1]) {
      const sideRib = frustum(0.08, 0.13, 0.66, 0.4, 0.52, WHITE);
      sideRib.position.set(side * 0.78, 1.08, -0.01);
      sideRib.rotation.z = side * -0.08;
      const sideCut = plate(0.055, 0.25, 0.38, DARK);
      sideCut.position.set(side * 0.84, 0.78, -0.03);
      this.torso.add(sideRib, sideCut);
    }

    // Raised white collar with a black neck ring.
    const neck = cylinder(0.27, 0.31, JOINT, 16);
    neck.position.y = 1.74;
    const collarL = frustum(0.28, 0.48, 0.22, 0.46, 0.54, WHITE);
    collarL.position.set(-0.43, 1.62, 0);
    collarL.rotation.z = -0.12;
    addMirrored(this.torso, collarL);
    // small gold intake under the collar — a reference detail that was missing
    const collarVent = plate(0.3, 0.09, 0.06, 0xffdc69);
    collarVent.position.set(0, 1.5, 0.5);
    const collarVentRim = plate(0.36, 0.05, 0.05, DARK);
    collarVentRim.position.set(0, 1.44, 0.5);
    this.torso.add(neck, collarVent, collarVentRim);

    // Compact reference-accurate rear pack: dark central machinery, white
    // cover panels and two lower nozzles visible from the back/side views.
    const backpack = frustum(0.66, 0.76, 0.7, 0.22, 0.27, DARK);
    backpack.position.set(0, 1.06, -0.5);
    const packCover = frustum(0.52, 0.58, 0.48, 0.1, 0.13, WHITE);
    packCover.position.set(0, 1.13, -0.66);
    const packInset = plate(0.24, 0.28, 0.045, DARK);
    packInset.position.set(0, 1.1, -0.75);
    // The dark pack core must not read as a tall black rectangle in profile.
    // Small white side casings leave only a narrow machinery seam exposed.
    const packSideL = frustum(0.06, 0.08, 0.62, 0.34, 0.28, WHITE);
    packSideL.position.set(-0.46, 1.08, -0.57);
    const packSideR = packSideL.clone();
    packSideR.position.x = 0.46;
    this.torso.add(backpack, packCover, packInset, packSideL, packSideR);
    this.thrusterL = cylinder(0.14, 0.42, 0xffb054, 14);
    this.thrusterL.position.set(-0.25, 0.65, -0.69);
    const burnerMaterial = this.thrusterL.material as THREE.MeshStandardMaterial;
    burnerMaterial.emissive.setHex(0xff6b24);
    burnerMaterial.emissiveIntensity = 4.5;
    burnerMaterial.toneMapped = false;
    const flameCore = new THREE.Mesh(
      new THREE.BoxGeometry(0.13, 0.82, 0.13),
      new THREE.MeshBasicMaterial({
        color: 0xfff0a6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    );
    flameCore.position.y = -0.48;
    const flameHalo = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 1.05, 0.36),
      new THREE.MeshBasicMaterial({
        color: 0xff5a1f,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    );
    flameHalo.position.y = -0.5;
    const burnerLight = new THREE.PointLight(0xff6a2a, 9, 7, 2);
    burnerLight.position.set(0, -0.62, 0);
    this.thrusterL.add(flameHalo, flameCore, burnerLight);
    this.thrusterL.visible = false;
    this.thrusterR = this.thrusterL.clone();
    this.thrusterR.position.x = 0.34;
    this.thrusterR.position.x = 0.25;
    this.torso.add(this.thrusterL, this.thrusterR);

    // Side-profile-led helmet. Front is +Z and rear is -Z. The silhouette is
    // assembled in short voxel courses so the profile reads as a compact dome,
    // not a long rectangular head.
    this.head = new THREE.Group();
    this.head.position.y = 1.93;
    // The reference helmet is compact relative to the shoulder armour; keeping
    // the underlying voxels slightly compressed vertically prevents the long
    // face/neck seen in the rejected in-game profile.
    this.head.scale.set(0.95, 0.75, 0.84);
    const headCore = plate(0.46, 0.38, 0.42, DARK);
    headCore.position.set(0, 0.01, -0.03);

    // Four progressively smaller crown courses reproduce the rounded stair-step
    // dome in the supplied side view. Each upper course also retreats rearward.
    const crownLower = plate(0.56, 0.099, 0.5, WHITE);
    crownLower.position.set(0, 0.1995, -0.03);
    const crownMid = plate(0.54, 0.09, 0.46, WHITE);
    crownMid.position.set(0, 0.2895, -0.06);
    const crownHigh = plate(0.46, 0.081, 0.38, WHITE);
    crownHigh.position.set(0, 0.34, -0.1);
    const crownTop = plate(0.34, 0.072, 0.28, WHITE);
    crownTop.position.set(0, 0.405, -0.13);
    const rearShell = plate(0.56, 0.34, 0.13, WHITE);
    rearShell.position.set(0, 0.12, -0.27);

    // The brow projects only a little beyond the dome. The eye sits inside a
    // black socket instead of protruding as a turquoise block.
    const browBase = plate(0.58, 0.1, 0.2, WHITE);
    browBase.position.set(0, 0.2, 0.25);
    const browTip = plate(0.5, 0.08, 0.14, WHITE);
    browTip.position.set(0, 0.155, 0.38);
    const visorMask = plate(0.58, 0.17, 0.12, DARK);
    visorMask.position.set(0, 0.045, 0.35);
    const visorRows: THREE.Mesh[] = [];
    const visorSpecs = [
      { w: 0.18, h: 0.05, y: 0.078, x: 0.095 },
      { w: 0.15, h: 0.045, y: 0.032, x: 0.075 },
      { w: 0.11, h: 0.038, y: -0.008, x: 0.055 },
    ];
    for (const spec of visorSpecs) {
      for (const side of [-1, 1]) {
        const row = plate(spec.w, spec.h, 0.04, CYAN);
        (row.material as THREE.MeshStandardMaterial).emissive.setHex(CYAN);
        (row.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.9;
        row.position.set(side * spec.x, spec.y, 0.426);
        visorRows.push(row);
      }
    }

    // Short, tightly layered face. The previous jaw hung too far below the
    // visor and made the helmet look like a long animal muzzle.
    const noseBridge = plate(0.3, 0.09, 0.12, WHITE);
    noseBridge.position.set(0, -0.035, 0.43);
    const mouth = plate(0.27, 0.085, 0.13, WHITE);
    mouth.position.set(0, -0.125, 0.385);
    const jaw = plate(0.3, 0.1, 0.18, WHITE);
    jaw.position.set(0, -0.215, 0.29);
    const chin = plate(0.17, 0.08, 0.12, WHITE);
    chin.position.set(0, -0.29, 0.29);
    const neckGap = plate(0.46, 0.09, 0.38, DARK);
    neckGap.position.set(0, -0.29, -0.005);

    this.head.add(
      headCore, rearShell, crownLower, crownMid, crownHigh, crownTop,
      browBase, browTip, visorMask, ...visorRows,
      noseBridge, mouth, jaw, chin, neckGap
    );

    // The visible side is made from several small plates. There is deliberately
    // no full-height temple slab: that was the large blank rectangle which made
    // the old render diverge from the reference.
    for (const side of [-1, 1]) {
      const upperTemple = plate(0.035, 0.18, 0.21, WHITE);
      upperTemple.position.set(side * 0.301, 0.145, 0.115);
      const rearTemple = plate(0.035, 0.25, 0.2, WHITE);
      rearTemple.position.set(side * 0.301, 0.065, -0.155);
      const lowerTemple = plate(0.035, 0.12, 0.23, WHITE);
      lowerTemple.position.set(side * 0.301, -0.105, 0.01);
      const cheek = plate(0.035, 0.17, 0.2, WHITE);
      cheek.position.set(side * 0.301, -0.135, 0.245);
      const eyeSocket = plate(0.035, 0.18, 0.22, DARK);
      eyeSocket.position.set(side * 0.321, 0.04, 0.35);
      const earDark = plate(0.04, 0.17, 0.115, DARK);
      earDark.position.set(side * 0.322, 0.04, -0.285);
      const ear = plate(0.035, 0.115, 0.065, WHITE);
      ear.position.set(side * 0.344, 0.04, -0.285);
      this.head.add(
        upperTemple, rearTemple, lowerTemple, cheek, eyeSocket, earDark, ear
      );

    }

    // Rear black cavity and camera remain visible behind the white shell.
    const rearMask = plate(0.34, 0.22, 0.08, DARK);
    rearMask.position.set(0, -0.12, -0.405);
    const rearCam = plate(0.16, 0.07, 0.04, RED);
    rearCam.position.set(0, 0.14, -0.405);
    this.head.add(rearMask, rearCam);

    // Thick stepped antennae rise from the rear temple and sweep backward.
    // Using discrete blocks preserves the voxel reference and avoids the thin,
    // misplaced red spike seen in the previous render.
    for (const side of [-1, 1]) {
      const horn = new THREE.Group();
      // Compact five-course antennae: tall enough to frame the crown, with a
      // restrained outward V and almost no rear rake, matching the turnaround.
      for (let i = 0; i < 5; i++) {
        const t = i / 4;
        const segment = plate(0.095 - t * 0.015, 0.11, 0.095 - t * 0.015, RED);
        segment.position.set(side * i * 0.018, i * 0.105, -i * 0.014);
        horn.add(segment);
      }
      // Identical mount depth and mirrored lateral placement keep the red
      // antennae perfectly symmetrical from the front and rear.
      horn.position.set(side * 0.23, 0.35, -0.245);
      horn.rotation.z = side * -0.12;
      horn.rotation.x = 0.03;
      this.head.add(horn);
    }
    this.torso.add(this.head);

    this.armL = this.makeArm(-0.9, true);
    this.armR = this.makeArm(0.9, false);
    this.elbowL = (this.armL as THREE.Group & { lower: THREE.Group }).lower;
    this.elbowR = (this.armR as THREE.Group & { lower: THREE.Group }).lower;
    this.torso.add(this.armL, this.armR);

    // Voxel hilt and beam match the block-built reference.
    const hilt = cylinder(0.1, 0.48, STEEL, 14);
    hilt.position.set(0, -1.01, 0.22);
    this.elbowR.add(hilt);
    this.saberBlade = finished(new THREE.BoxGeometry(0.13, 3.15, 0.13), SABER, SABER);
    this.saberBlade.position.set(0, -2.82, 0.22);
    this.saberBlade.visible = false;
    this.saberGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 3.2, 0.3),
      new THREE.MeshBasicMaterial({ color: SABER, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    this.saberBlade.add(this.saberGlow);
    // A short fan of translucent blade echoes turns the animated joint motion
    // into a readable cutting arc. They are parented to the forearm rather
    // than the blade so each echo can lag at a different angle.
    for (let i = 0; i < 4; i++) {
      const trail = new THREE.Mesh(
        new THREE.BoxGeometry(0.08 + i * 0.045, 3.08, 0.09),
        new THREE.MeshBasicMaterial({
          color: SABER, transparent: true, opacity: 0,
          blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
        })
      );
      trail.position.set(0, -2.82, 0.22);
      trail.visible = false;
      this.elbowR.add(trail);
      this.saberTrails.push(trail);
    }
    // The upgrade remains visible even while the blade is retracted: a red
    // emitter cage locks around the original hilt.
    this.crimsonEmitter = cylinder(0.145, 0.18, CRIMSON, 12);
    this.crimsonEmitter.position.set(0, -1.23, 0.22);
    const emitterMat = this.crimsonEmitter.material as THREE.MeshStandardMaterial;
    emitterMat.emissive.setHex(0x8e061d);
    emitterMat.emissiveIntensity = 2.2;
    this.crimsonEmitter.visible = false;
    this.elbowR.add(this.crimsonEmitter);
    this.elbowR.add(this.saberBlade);
    this.buildAegisArmor();

    this.aegisBarrier = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.35, 1),
      new THREE.MeshBasicMaterial({
        color: 0x45eaff, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, wireframe: true,
        toneMapped: false,
      })
    );
    this.aegisBarrier.position.y = 2.45;
    this.aegisBarrier.scale.set(0.72, 1.18, 0.72);
    this.aegisBarrier.visible = false;
    this.group.add(this.aegisBarrier);
  }

  /** Toggle the earned weapon skin without replacing the existing rig. */
  setCrimsonEdge(on: boolean): void {
    this.crimsonEdge = on;
    this.crimsonEmitter.visible = on;
    const bladeMat = this.saberBlade.material as THREE.MeshStandardMaterial;
    bladeMat.color.setHex(on ? CRIMSON : SABER);
    bladeMat.emissive.setHex(on ? 0xff0b32 : SABER);
    bladeMat.emissiveIntensity = on ? 3.6 : 1.65;
    bladeMat.toneMapped = !on;
    const glowMat = this.saberGlow.material as THREE.MeshBasicMaterial;
    glowMat.color.setHex(on ? 0xff163d : SABER);
    glowMat.opacity = on ? 0.58 : 0.35;
    for (const trail of this.saberTrails) {
      (trail.material as THREE.MeshBasicMaterial).color.setHex(on ? 0xff1744 : SABER);
    }
  }

  /** Show the physical Aegis reinforcement kit earned with the shield. */
  setAegisArmor(on: boolean): void {
    this.aegisEnabled = on;
    for (const part of this.aegisParts) part.visible = on;
    if (!on) {
      this.aegisPulseT = 0;
      this.aegisBarrier.visible = false;
    }
  }

  /** Briefly flare the projected shield through the physical armor seams. */
  pulseAegis(): void {
    if (!this.aegisEnabled) return;
    this.aegisPulseT = 0.34;
    this.aegisBarrier.visible = true;
  }

  private buildAegisArmor(): void {
    const add = (parent: THREE.Object3D, part: THREE.Object3D) => {
      part.visible = false;
      parent.add(part);
      this.aegisParts.push(part);
      return part;
    };

    // Split chest carapace preserves the red Terra-Armor emblem beneath it.
    for (const side of [-1, 1]) {
      const chest = frustum(0.42, 0.62, 0.72, 0.14, 0.2, WHITE);
      chest.position.set(side * 0.53, 1.13, 0.67);
      chest.rotation.z = side * -0.17;
      add(this.torso, chest);
      const chestRim = plate(0.12, 0.56, 0.08, CYAN);
      chestRim.position.set(side * 0.29, 1.12, 0.79);
      chestRim.rotation.z = side * -0.1;
      const rimMat = chestRim.material as THREE.MeshStandardMaterial;
      rimMat.emissive.setHex(0x087d9d);
      rimMat.emissiveIntensity = 1.8;
      add(this.torso, chestRim);

      const shoulder = frustum(0.66, 0.46, 0.24, 0.76, 0.58, WHITE);
      shoulder.position.set(side * 0.08, 0.6, -0.02);
      shoulder.rotation.z = side * -0.1;
      add(side < 0 ? this.armL : this.armR, shoulder);

      const forearm = frustum(0.46, 0.36, 0.58, 0.16, 0.12, WHITE);
      forearm.position.set(side * 0.05, -0.42, 0.42);
      add(side < 0 ? this.elbowL : this.elbowR, forearm);

      const thigh = frustum(0.45, 0.33, 0.62, 0.14, 0.1, WHITE);
      thigh.position.set(side * 0.04, -0.48, 0.46);
      add(side < 0 ? this.legL : this.legR, thigh);

      const shin = frustum(0.5, 0.36, 0.66, 0.16, 0.11, WHITE);
      shin.position.set(side * 0.04, -0.55, 0.48);
      add(side < 0 ? this.kneeL : this.kneeR, shin);
    }

    const aegisCore = plate(0.26, 0.32, 0.1, CYAN);
    aegisCore.position.set(0, 1.2, 0.81);
    const coreMat = aegisCore.material as THREE.MeshStandardMaterial;
    coreMat.emissive.setHex(CYAN);
    coreMat.emissiveIntensity = 2.5;
    add(this.torso, aegisCore);

    // Rear stabilisers make the upgrade readable from the normal chase camera.
    for (const side of [-1, 1]) {
      const fin = frustum(0.13, 0.2, 0.74, 0.42, 0.3, WHITE);
      fin.position.set(side * 0.62, 1.15, -0.74);
      fin.rotation.z = side * -0.18;
      fin.rotation.x = -0.1;
      add(this.torso, fin);
    }
  }

  // The leg is two pivots: a hip group, and a knee group holding everything
  // below it, so the walk cycle can actually flex rather than swing rigidly.
  private makeLeg(x: number): THREE.Group {
    const leg = new THREE.Group();
    leg.position.set(x, 2.08, 0);
    const hipJoint = sphere(0.25, JOINT);
    const thighCore = capsule(0.2, 0.72, JOINT);
    thighCore.position.y = -0.58;
    const thighFront = frustum(0.34, 0.42, 0.92, 0.27, 0.35, WHITE);
    thighFront.position.set(0, -0.53, 0.14);
    const thighSideL = frustum(0.09, 0.14, 0.74, 0.31, 0.38, WHITE);
    thighSideL.position.set(-0.22, -0.53, -0.01);
    const thighSideR = thighSideL.clone();
    thighSideR.position.x = 0.22;
    const thighRed = frustum(0.2, 0.28, 0.22, 0.08, 0.1, RED);
    thighRed.position.set(x < 0 ? -0.16 : 0.16, -0.73, 0.31);
    const kneePad = frustum(0.3, 0.38, 0.35, 0.12, 0.18, RED);
    kneePad.position.set(x < 0 ? -0.1 : 0.1, -1.18, 0.3);
    // Rear armour. The white plating only covered the front and sides, so from
    // behind the legs read as the bare charcoal frame — the reference keeps
    // them white from every angle.
    const thighRear = frustum(0.30, 0.38, 0.86, 0.24, 0.31, WHITE);
    thighRear.position.set(0, -0.55, -0.16);
    const thighRearVent = plate(0.16, 0.30, 0.04, DARK);
    thighRearVent.position.set(0, -0.62, -0.32);
    leg.add(hipJoint, thighCore, thighFront, thighSideL, thighSideR, thighRed, kneePad,
            thighRear, thighRearVent);

    const lower = new THREE.Group();
    lower.position.y = -1.2;
    const knee = cylinder(0.25, 0.42, JOINT, 14);
    knee.rotation.z = Math.PI / 2;
    const calfCore = capsule(0.18, 0.77, JOINT);
    calfCore.position.y = -0.62;
    const shin = frustum(0.43, 0.34, 1.04, 0.36, 0.27, WHITE);
    shin.position.set(0, -0.61, 0.08);
    const shinInset = plate(0.15, 0.45, 0.035, DARK);
    shinInset.position.set(0, -0.58, 0.3);
    const shinBlade = frustum(0.22, 0.31, 0.75, 0.1, 0.14, WHITE);
    shinBlade.position.set(0, -0.53, 0.35);
    // Thin red trim only. Full red shin and calf blocks made the legs read
    // red-based; the reference keeps them white below the knee cap.
    const shinRed = frustum(0.07, 0.10, 0.26, 0.06, 0.075, RED);
    shinRed.position.set(x < 0 ? -0.19 : 0.19, -0.30, 0.42);
    const calfRed = frustum(0.05, 0.07, 0.30, 0.07, 0.10, RED);
    calfRed.position.set(x < 0 ? 0.27 : -0.27, -0.62, -0.17);
    const ankle = cylinder(0.18, 0.28, JOINT, 12);
    ankle.position.y = -1.27;
    ankle.rotation.z = Math.PI / 2;
    const heel = frustum(0.41, 0.32, 0.31, 0.48, 0.42, WHITE);
    heel.position.set(0, -1.34, -0.08);
    const foot = frustum(0.51, 0.43, 0.28, 0.82, 0.67, WHITE);
    foot.position.set(0, -1.48, 0.17);
    const sole = plate(0.55, 0.1, 0.86, RED);
    sole.position.set(0, -1.63, 0.18);
    const toe = frustum(0.53, 0.43, 0.19, 0.34, 0.49, RED);
    toe.position.set(0, -1.48, 0.56);
    const calfRear = frustum(0.36, 0.29, 0.94, 0.30, 0.23, WHITE);
    calfRear.position.set(0, -0.63, -0.14);
    const calfVent = plate(0.18, 0.34, 0.04, DARK);
    calfVent.position.set(0, -0.52, -0.30);
    lower.add(knee, calfCore, shin, shinInset, shinBlade, shinRed, calfRed, ankle, heel, foot, sole, toe,
              calfRear, calfVent);
    leg.add(lower);
    (leg as THREE.Group & { lower: THREE.Group }).lower = lower;
    return leg;
  }

  private makeArm(x: number, rifle: boolean): THREE.Group {
    const arm = new THREE.Group();
    arm.position.set(x, 1.3, 0);
    const shoulderJoint = sphere(0.29, JOINT);
    // Three layers create the red-edged rounded pauldron in the reference.
    const pauldron = frustum(0.60, 0.77, 0.46, 0.52, 0.65, WHITE);
    pauldron.scale.set(1, 1, 1);
    pauldron.position.set(x > 0 ? 0.05 : -0.05, 0.19, 0);
    pauldron.rotation.z = x > 0 ? -0.08 : 0.08;
    // thinner red outer cheek: in the reference the pauldron reads white with
    // a red edge, not a red block with white behind it
    const outerCap = sphere(0.37, RED);
    outerCap.scale.set(0.15, 0.70, 0.42);
    outerCap.position.set(x > 0 ? 0.525 : -0.525, 0.17, 0);
    const topInset = frustum(0.42, 0.3, 0.14, 0.6, 0.5, WHITE);
    topInset.position.set(0, 0.4, 0);
    topInset.rotation.x = -0.1;
    // single red cap sitting across the whole top surface of the pauldron
    const capBrow = frustum(0.51, 0.66, 0.14, 0.27, 0.34, RED);
    capBrow.position.set(x > 0 ? 0.05 : -0.05, 0.41, 0.02);
    capBrow.rotation.z = x > 0 ? -0.06 : 0.06;
    // From the right side the pauldron is a red outer frame around a recessed
    // charcoal panel, with a white lower cheek rather than a solid red slab.
    const shoulderInset = plate(0.045, 0.22, 0.23, 0x090a0d);
    shoulderInset.position.set(x > 0 ? 0.535 : -0.535, 0.07, -0.015);
    const shoulderLower = plate(0.052, 0.17, 0.3, WHITE);
    shoulderLower.position.set(x > 0 ? 0.55 : -0.55, -0.145, 0.015);
    const rimFront = plate(0.055, 0.34, 0.1, RED);
    rimFront.position.set(x > 0 ? 0.565 : -0.565, 0.1, 0.21);
    const rimRear = rimFront.clone();
    rimRear.position.z = -0.21;
    const upperCore = capsule(0.18, 0.5, JOINT);
    upperCore.position.y = -0.5;
    const upperFront = frustum(0.31, 0.38, 0.62, 0.27, 0.33, WHITE);
    upperFront.position.set(0, -0.49, 0.08);
    const upperRed = frustum(0.05, 0.08, 0.22, 0.06, 0.075, RED);
    upperRed.position.set(x > 0 ? 0.23 : -0.23, -0.56, 0.21);
    const upperRear = frustum(0.27, 0.34, 0.58, 0.24, 0.29, WHITE);
    upperRear.position.set(0, -0.49, -0.10);
    const elbowJoint = cylinder(0.21, 0.38, DARK, 14);
    elbowJoint.position.y = -0.91;
    elbowJoint.rotation.z = Math.PI / 2;

    // Independent elbow pivot. Everything below the joint is local to this
    // group so hands and weapons naturally follow forearm articulation.
    const lower = new THREE.Group();
    lower.position.y = -0.91;
    const foreCore = capsule(0.17, 0.56, JOINT);
    foreCore.position.y = -0.43;
    const fore = frustum(0.36, 0.28, 0.78, 0.38, 0.29, WHITE);
    fore.position.set(0, -0.42, 0.04);
    const foreGuard = frustum(0.13, 0.17, 0.24, 0.08, 0.10, RED);
    foreGuard.position.set(0, -0.34, 0.27);
    const fist = sphere(0.21, JOINT);
    fist.position.y = -0.91;
    fist.scale.set(0.9, 1.05, 0.9);
    lower.add(foreCore, fore, foreGuard, fist);
    arm.add(
      shoulderJoint, pauldron, outerCap, topInset, upperCore, upperFront,
      capBrow, shoulderInset, shoulderLower, rimFront, rimRear,
      upperRed, upperRear, elbowJoint, lower
    );
    if (rifle) {
      // Gameplay shots originate from a concealed palm emitter so no rifle
      // breaks the supplied turnaround's clean left-arm silhouette.
      this.muzzle = sphere(0.05, 0xffb0e8, 0xffb0e8);
      this.muzzle.position.set(0, -1.07, 0.1);
      this.muzzle.visible = false;
      lower.add(this.muzzle);
    }
    (arm as THREE.Group & { lower: THREE.Group }).lower = lower;
    return arm;
  }

  setThrusters(on: boolean): void {
    this.thrusterL.visible = on;
    this.thrusterR.visible = on;
    this.flying = on;
  }

  setDashThrusters(on: boolean): void {
    this.dashJetL.visible = on;
    this.dashJetR.visible = on;
  }

  private flickerThrusters(t: number): void {
    if (!this.thrusterL.visible) return;
    const s = 0.85 + Math.abs(Math.sin(t * 31)) * 0.5;
    this.thrusterL.scale.set(1, s, 1);
    this.thrusterR.scale.set(1, 1.35 - (s - 0.85), 1);
  }

  animate(t: number, speed: number, grounded: boolean, dt: number): void {
    this.flickerThrusters(t);
    if (this.dashJetL.visible) {
      const s = 0.82 + Math.abs(Math.sin(t * 43)) * 0.5;
      this.dashJetL.scale.set(1, 1, s);
      this.dashJetR.scale.set(1, 1, 1.32 - (s - 0.82));
    }

    // decay the one-shot triggers
    this.landT = Math.max(0, this.landT - dt);
    this.flinchT = Math.max(0, this.flinchT - dt);
    this.recoilT = Math.max(0, this.recoilT - dt);
    this.dashT = Math.max(0, this.dashT - dt);
    this.aegisPulseT = Math.max(0, this.aegisPulseT - dt);
    if (this.aegisBarrier.visible) {
      const life = this.aegisPulseT / 0.34;
      const flare = Math.sin(Math.max(0, life) * Math.PI);
      const barrierMat = this.aegisBarrier.material as THREE.MeshBasicMaterial;
      barrierMat.opacity = flare * 0.48;
      const swell = 1 + (1 - life) * 0.12;
      this.aegisBarrier.scale.set(0.72 * swell, 1.18 * swell, 0.72 * swell);
      this.aegisBarrier.rotation.y += dt * 1.8;
      this.aegisBarrier.rotation.x = Math.sin(t * 2.4) * 0.04;
      if (this.aegisPulseT <= 0) this.aegisBarrier.visible = false;
    }

    // landing squash: fire when we touch down after being airborne
    if (grounded && this.wasAirborne) this.landT = 0.18;
    this.wasAirborne = !grounded;

    // Lean: pitch forward with speed, bank into turns. Both are smoothed so
    // the mecha settles rather than snapping between poses.
    let dYaw = this.group.rotation.y - this.prevYaw;
    while (dYaw > Math.PI) dYaw -= Math.PI * 2;
    while (dYaw < -Math.PI) dYaw += Math.PI * 2;
    this.prevYaw = this.group.rotation.y;
    const run = Math.min(1, speed / 20);
    const targetLean = grounded
      ? run * 0.2 + this.dashT * 0.9
      : (this.flying ? 0.38 : 0.16);
    const targetBank = Math.max(-0.32, Math.min(0.32, -dYaw * 7));
    this.lean += (targetLean - this.lean) * Math.min(1, dt * 7);
    this.bank += (targetBank - this.bank) * Math.min(1, dt * 6);

    const walk = Math.min(1, speed / 9);
    // stride quickens with speed; a run reads faster than a walk
    const ph = t * (7 + run * 5);

    if (grounded && walk > 0.05) {
      // Weighted heel-to-toe walk: the planted knee never locks perfectly,
      // the passing foot tucks up, and shoulders counter-rotate against hips.
      const sL = Math.sin(ph), sR = Math.sin(ph + Math.PI);
      this.legL.rotation.x = sL * 0.66 * walk;
      this.legR.rotation.x = sR * 0.66 * walk;
      this.kneeL.rotation.x = (0.18 + Math.max(0, -sL) * 1.22) * walk;
      this.kneeR.rotation.x = (0.18 + Math.max(0, -sR) * 1.22) * walk;
      this.armL.rotation.x = sR * 0.48 * walk;
      this.armR.rotation.x = sL * 0.36 * walk + 0.08;
      this.elbowL.rotation.x = -(0.16 + Math.max(0, sR) * 0.34) * walk;
      this.elbowR.rotation.x = -(0.2 + Math.max(0, sL) * 0.28) * walk;
      this.legL.rotation.z = -0.025 * walk;
      this.legR.rotation.z = 0.025 * walk;
      this.armL.rotation.z = -0.04;
      this.armR.rotation.z = 0.04;
      this.group.position.y += (0.055 + Math.abs(Math.sin(ph)) * 0.11) * walk;
      this.torso.rotation.y = -sL * 0.13 * walk;
      this.torso.rotation.z = -sL * 0.035 * walk;
      this.head.rotation.y = sL * 0.06 * walk;
      this.head.rotation.z = sL * 0.025 * walk;
    } else if (!grounded) {
      // Flight mirrors the reference: one leg drives long through the thrust
      // line while the other tucks high, with arms separated for balance.
      const bob = Math.sin(t * 5.5);
      const yaw2 = Math.sin(t * 2.3);
      if (this.flying) {
        this.legL.rotation.x = -0.88 + bob * 0.05;
        this.kneeL.rotation.x = 1.65 + bob * 0.08;
        this.legR.rotation.x = 0.18 - bob * 0.035;
        this.kneeR.rotation.x = 0.2 + bob * 0.025;
        this.legL.rotation.z = 0.12;
        this.legR.rotation.z = -0.05;
        this.armL.rotation.x = -0.45 + bob * 0.05;
        this.armR.rotation.x = 0.22 - bob * 0.04;
        this.armL.rotation.z = -0.34;
        this.armR.rotation.z = 0.24;
        this.elbowL.rotation.x = -(0.82 + bob * 0.05);
        this.elbowR.rotation.x = -(0.34 - bob * 0.03);
        this.torso.rotation.y = yaw2 * 0.07;
        this.torso.rotation.z = -0.08 + yaw2 * 0.025;
        this.head.rotation.x = -0.18;
        this.head.rotation.y = -yaw2 * 0.06;
        this.head.rotation.z = 0.05;
        this.group.position.y += bob * 0.055;
      } else {
        // free fall / jump arc: legs part, arms come up for balance
        this.legL.rotation.x = -0.22 + bob * 0.08;
        this.legR.rotation.x = 0.3 - bob * 0.08;
        this.kneeL.rotation.x = 0.82;
        this.kneeR.rotation.x = 0.32;
        this.legL.rotation.z = 0;
        this.legR.rotation.z = 0;
        this.armL.rotation.x = -0.12;
        this.armR.rotation.x = -0.06;
        this.armL.rotation.z = -0.34;  // arms out wide for balance
        this.armR.rotation.z = 0.34;
        this.elbowL.rotation.x = -0.48;
        this.elbowR.rotation.x = -0.42;
        this.torso.rotation.y *= 0.85;
        this.head.rotation.x = -0.08;
        this.head.rotation.y *= 0.82;
        this.head.rotation.z *= 0.82;
      }
    } else {
      // Neutral ready stance: feet apart, knees unlocked, elbows relaxed and
      // weight biased subtly from one leg to the other. Exponential blending
      // lets every action settle here without snapping to a rigid T-pose.
      const settle = 1 - Math.exp(-dt * 8);
      const breath = Math.sin(t * 1.55);
      const weight = Math.sin(t * 0.68);
      this.legL.rotation.x = THREE.MathUtils.lerp(this.legL.rotation.x, -0.045 + weight * 0.008, settle);
      this.legR.rotation.x = THREE.MathUtils.lerp(this.legR.rotation.x, -0.025 - weight * 0.008, settle);
      this.kneeL.rotation.x = THREE.MathUtils.lerp(this.kneeL.rotation.x, 0.17 - weight * 0.018, settle);
      this.kneeR.rotation.x = THREE.MathUtils.lerp(this.kneeR.rotation.x, 0.2 + weight * 0.018, settle);
      this.legL.rotation.z = THREE.MathUtils.lerp(this.legL.rotation.z, -0.055, settle);
      this.legR.rotation.z = THREE.MathUtils.lerp(this.legR.rotation.z, 0.055, settle);
      this.armL.rotation.x = THREE.MathUtils.lerp(this.armL.rotation.x, 0.055 + breath * 0.018, settle);
      this.armR.rotation.x = THREE.MathUtils.lerp(this.armR.rotation.x, 0.035 - breath * 0.014, settle);
      this.armL.rotation.z = THREE.MathUtils.lerp(this.armL.rotation.z, -0.08, settle);
      this.armR.rotation.z = THREE.MathUtils.lerp(this.armR.rotation.z, 0.08, settle);
      this.elbowL.rotation.x = THREE.MathUtils.lerp(this.elbowL.rotation.x, -0.24, settle);
      this.elbowR.rotation.x = THREE.MathUtils.lerp(this.elbowR.rotation.x, -0.28, settle);
      this.torso.rotation.y = THREE.MathUtils.lerp(this.torso.rotation.y, weight * 0.018, settle);
      this.torso.rotation.z = THREE.MathUtils.lerp(this.torso.rotation.z, -weight * 0.012, settle);
      this.head.rotation.x = THREE.MathUtils.lerp(this.head.rotation.x, -0.018, settle);
      this.head.rotation.y = THREE.MathUtils.lerp(this.head.rotation.y, -weight * 0.02, settle);
      this.head.rotation.z = THREE.MathUtils.lerp(this.head.rotation.z, weight * 0.008, settle);
      this.torso.position.y = THREE.MathUtils.lerp(
        this.torso.position.y,
        2.25 + breath * 0.012,
        settle
      );
    }

    // Landing: a light weight-absorb, not a jump crouch. Just enough give in
    // the knees to sell the impact, then straight back to a standing posture.
    if (this.landT > 0) {
      const k = this.landT / 0.18;          // 1 -> 0
      const absorb = Math.sin(k * Math.PI) * 0.28;
      this.kneeL.rotation.x += absorb;
      this.kneeR.rotation.x += absorb;
      this.legL.rotation.x += absorb * 0.25;
      this.legR.rotation.x += absorb * 0.25;
      this.group.position.y -= absorb * 0.62;
    }

    this.group.rotation.z = this.bank;
    this.torso.rotation.x = this.lean + (this.flinchT > 0 ? -Math.sin(this.flinchT / 0.22 * Math.PI) * 0.28 : 0);

    // Shoulder yaw and forearm roll are reserved for weapon actions. Blend
    // them home independently from the locomotion pose so the saber never
    // leaves an arm twisted after a combo is interrupted by movement.
    if (this.swingT < 0) {
      const unwind = 1 - Math.exp(-dt * 11);
      this.armL.rotation.y = THREE.MathUtils.lerp(this.armL.rotation.y, 0, unwind);
      this.armR.rotation.y = THREE.MathUtils.lerp(this.armR.rotation.y, 0, unwind);
      this.elbowL.rotation.y = THREE.MathUtils.lerp(this.elbowL.rotation.y, 0, unwind);
      this.elbowR.rotation.y = THREE.MathUtils.lerp(this.elbowR.rotation.y, 0, unwind);
      this.elbowL.rotation.z = THREE.MathUtils.lerp(this.elbowL.rotation.z, 0, unwind);
      this.elbowR.rotation.z = THREE.MathUtils.lerp(this.elbowR.rotation.z, 0, unwind);
    }

    // Saber swing. Three phases with real easing: a deliberate wind-up, an
    // explosive strike that decelerates through the arc, then a settle. The
    // blade extends as it ignites and retracts on the way out, and the hips
    // and shoulders drive the motion rather than the arm alone.
    if (this.swingT >= 0) {
      // Slightly longer than the old snap-cut: the eye can read preparation,
      // contact and recovery as three distinct beats.
      this.swingT += dt / 0.62;
      const s = this.swingT;
      const style = this.swingStyle;
      const overhead = style === 2;
      const diagonal = style === 0;
      const horizontal = style === 1;
      const dir = style === 1 ? -1 : 1; // style 1 comes back the other way

      this.saberBlade.visible = true;
      // ignition: the blade shoots out, then draws back at the end
      const ignite = s < 0.14 ? s / 0.14 : s > 0.86 ? Math.max(0, (1 - s) / 0.14) : 1;
      const bladeWidth = this.crimsonEdge ? 1.28 : 1;
      this.saberBlade.scale.set(bladeWidth, Math.max(0.05, ignite), bladeWidth);
      this.saberBlade.position.y = -2.82 + (1 - ignite) * 1.58;
      const trailLife = s > 0.2 && s < 0.74
        ? Math.sin(((s - 0.2) / 0.54) * Math.PI)
        : 0;
      for (let i = 0; i < this.saberTrails.length; i++) {
        const trail = this.saberTrails[i];
        const trailMat = trail.material as THREE.MeshBasicMaterial;
        trail.visible = trailLife > 0.01;
        trailMat.opacity = trailLife * (0.24 - i * 0.035) * (this.crimsonEdge ? 1.45 : 1);
        trail.position.y = this.saberBlade.position.y;
        trail.scale.set(bladeWidth, Math.max(0.05, ignite), bladeWidth);
        const trailDir = style === 1 ? -1 : 1;
        trail.rotation.z = horizontal
          ? trailDir * (0.015 + i * 0.025) * trailLife
          : trailDir * (0.055 + i * 0.065) * trailLife;
        trail.rotation.y = -trailDir * i * 0.035 * trailLife;
      }

      if (s < 0.34) {
        // WIND UP — ease out, so it snaps back then hangs for anticipation
        const k = 1 - (1 - s / 0.34) * (1 - s / 0.34);
        if (overhead) {
          this.armR.rotation.x = THREE.MathUtils.lerp(0.035, -2.2, k);
          this.armR.rotation.z = THREE.MathUtils.lerp(0.08, 0.14, k);
          // The free hand braces the chest instead of pretending to grip a
          // two-handed weapon that is physically attached to the right wrist.
          this.armL.rotation.x = THREE.MathUtils.lerp(0.055, -0.78, k);
          this.armL.rotation.z = THREE.MathUtils.lerp(-0.08, 0.24, k);
          this.elbowR.rotation.x = THREE.MathUtils.lerp(-0.28, -1.02, k);
          this.elbowL.rotation.x = THREE.MathUtils.lerp(-0.24, -0.92, k);
          this.armR.rotation.y = -0.12 * k;
          this.armL.rotation.y = 0.22 * k;
          this.elbowR.rotation.y = 0.18 * k;
          this.elbowL.rotation.y = -0.18 * k;
          this.elbowR.rotation.z = -0.1 * k;
          this.elbowL.rotation.z = 0.05 * k;
          this.torso.rotation.y = 0.22 * k;
          this.torso.rotation.x = this.lean - 0.15 * k;
        } else {
          this.armR.rotation.x = THREE.MathUtils.lerp(
            this.chainedSwing ? -0.72 : 0.035,
            diagonal ? -1.48 : -1.38,
            k,
          );
          // The reverse cut chambers with the saber almost level at shoulder
          // height. A large Z rotation is required because the blade extends
          // down the forearm's local Y axis.
          // A level cut is a shoulder YAW with the arm held out in front, not
          // a roll. Rolling the shoulder to 1.34 swung the whole arm across
          // the chest and buried it in the torso; z now only holds the arm
          // clear of the ribs and the arc comes from rotation.y below.
          this.armR.rotation.z = THREE.MathUtils.lerp(
            0.08,
            horizontal ? -0.18 : -0.48 * dir,
            k,
          );
          // The support arm closes into a compact guard without crossing
          // unrealistically through the chest.
          this.armL.rotation.x = THREE.MathUtils.lerp(0.055, -0.62, k);
          this.armL.rotation.z = THREE.MathUtils.lerp(-0.08, 0.18 * dir, k);
          // Chambered with a real bend — the blade sits back beside the head,
          // not on the end of a locked-out arm.
          // For a LEVEL cut the elbow must not fold on X. With the upper arm
          // held out forward, elbow X pitches the forearm — and therefore the
          // blade, which runs down the forearm's -Y — towards the floor: the
          // cut measured 49-82 degrees off horizontal, a pendulum rather than
          // a slash. The fold moves to Z, which swings the forearm sideways
          // in the horizontal plane and keeps the blade level all the way.
          this.elbowR.rotation.x = THREE.MathUtils.lerp(-0.28, horizontal ? -0.06 : -1.02, k);
          this.elbowL.rotation.x = THREE.MathUtils.lerp(-0.24, -0.78, k);
          // Draw the weapon behind the shoulder and across the body. Shoulder
          // yaw creates the broad arc; forearm roll keeps the blade edge
          // aligned instead of letting it paddle flat through the target.
          this.armR.rotation.y = (horizontal ? 0 : -0.54 * dir) * k;
          this.armL.rotation.y = 0.18 * dir * k;
          this.elbowR.rotation.y = (horizontal ? -0.08 : 0.38 * dir) * k;
          this.elbowL.rotation.y = -0.2 * dir * k;
          // chambered across the body: forearm folded to the left, blade level
          this.elbowR.rotation.z = (horizontal ? -0.62 : -0.13 * dir) * k;
          this.elbowL.rotation.z = 0.08 * dir * k;
          this.torso.rotation.y = (horizontal ? -0.30 : 0.58 * dir) * k;
          this.torso.rotation.x = this.lean - (diagonal ? 0.16 : 0.06) * k;
        }
        this.torso.rotation.z = -0.12 * k * dir;
        this.head.rotation.y = -0.2 * k * dir;
        // Load the rear leg while keeping both feet under the centre of mass.
        this.legL.rotation.x = THREE.MathUtils.lerp(-0.045, -0.12 * dir, k);
        this.legR.rotation.x = THREE.MathUtils.lerp(-0.025, 0.12 * dir, k);
        this.legL.rotation.z = THREE.MathUtils.lerp(-0.055, -0.11, k);
        this.legR.rotation.z = THREE.MathUtils.lerp(0.055, 0.11, k);
        this.kneeL.rotation.x = THREE.MathUtils.lerp(0.17, dir > 0 ? 0.36 : 0.58, k);
        this.kneeR.rotation.x = THREE.MathUtils.lerp(0.2, dir > 0 ? 0.58 : 0.36, k);
      } else if (s < 0.64) {
        // STRIKE — front-loaded curve: explosive, then decelerating
        const t = (s - 0.34) / 0.30;
        const k = 1 - Math.pow(1 - t, 3);
        if (overhead) {
          this.armR.rotation.x = -2.2 + 2.78 * k;
          this.armR.rotation.z = 0.14 - 0.3 * k;
          this.armL.rotation.x = THREE.MathUtils.lerp(-0.78, -0.5, k);
          this.armL.rotation.z = THREE.MathUtils.lerp(0.24, 0.12, k);
          // The elbows extend through impact, then retain a safe amount of bend.
          this.elbowR.rotation.x = -(1.02 - 0.74 * k);
          this.elbowL.rotation.x = THREE.MathUtils.lerp(-0.92, -0.62, k);
          this.armR.rotation.y = THREE.MathUtils.lerp(-0.12, 0.18, k);
          this.armL.rotation.y = THREE.MathUtils.lerp(0.22, -0.08, k);
          this.elbowR.rotation.y = THREE.MathUtils.lerp(0.18, -0.1, k);
          this.elbowL.rotation.y = THREE.MathUtils.lerp(-0.12, 0.08, k);
          this.elbowR.rotation.z = THREE.MathUtils.lerp(-0.1, 0.08, k);
          this.elbowL.rotation.z = THREE.MathUtils.lerp(0.08, -0.05, k);
          this.torso.rotation.y = 0.22 - 0.38 * k;
          this.torso.rotation.x = this.lean - 0.15 + 0.49 * k;
        } else {
          // Link one descends shoulder-to-hip; link two travels level back
          // across the body. Their distinct blade planes make the combination
          // readable even from the chase camera.
          this.armR.rotation.x = diagonal
            ? THREE.MathUtils.lerp(-1.48, -0.88, k)
            : THREE.MathUtils.lerp(-1.38, -1.46, k);
          // stays outboard through the finish so the upper arm rides beside
          // the ribs instead of inside them
          this.armR.rotation.z = horizontal
            ? THREE.MathUtils.lerp(-0.18, 0.18, k)
            : (-0.48 + 1.26 * k) * dir;
          this.armL.rotation.x = -0.62 - 0.08 * k;
          this.armL.rotation.z = (0.18 + 0.10 * k) * dir;
          // The elbow opens through contact but never locks straight; a
          // fully extended arm is what made the cut read as stiff.
          // The forearm wraps on the follow-through rather than straightening
          // out — a level cut finishes with the hand past the far shoulder and
          // the elbow still bent, not with a locked arm pointing across.
          // stays out of the vertical plane so the blade never dips
          this.elbowR.rotation.x = horizontal
            ? THREE.MathUtils.lerp(-0.06, -0.1, k)
            : -(1.02 - 0.68 * k);
          this.elbowL.rotation.x = -(0.78 - 0.18 * k);
          // The sweep itself: shoulder yaw carries the blade across the front
          // in a level plane, clear of the chest the whole way.
          // A level cut travels because the HIPS turn, not because the arm
          // folds across the chest. Driving the whole arc from the shoulder
          // walked the elbow to the body centreline, which is what read as
          // the arm passing through the torso; the shoulder now stops short
          // and the torso yaw below covers the rest of the distance.
          // Link two now cuts OUTWARD — chambered across the chest, opening
          // to the right — instead of starting outboard and sweeping inward
          // through the body. Same level blade plane, same readable arc, but
          // the arm is travelling away from the torso the whole way rather
          // than into it.
          // Kept inside a forward cone. At -0.75 the arm carried on past the
          // right shoulder and the cut finished beside the body, then swung
          // behind on the recovery — a slash the player could not see.
          // The sweep is carried by the hips and the elbow fold, not shoulder
          // yaw: with the arm pointing forward, yaw acts on almost nothing and
          // the cut degenerated into a thrust.
          this.armR.rotation.y = horizontal
            ? 0
            : THREE.MathUtils.lerp(-0.54, 0.82, k) * dir;
          this.armL.rotation.y = THREE.MathUtils.lerp(0.18, -0.16, k) * dir;
          this.elbowR.rotation.y = horizontal
            ? THREE.MathUtils.lerp(-0.08, 0.08, k)
            : THREE.MathUtils.lerp(0.38, -0.28, k) * dir;
          this.elbowL.rotation.y = THREE.MathUtils.lerp(-0.2, 0.16, k) * dir;
          // the fold releases through the cut, level the whole way: a whip
          this.elbowR.rotation.z = horizontal
            ? THREE.MathUtils.lerp(-0.62, 0.62, k)
            : THREE.MathUtils.lerp(-0.13, 0.12, k) * dir;
          this.elbowL.rotation.z = THREE.MathUtils.lerp(0.08, -0.07, k) * dir;
          this.torso.rotation.y = horizontal
            ? THREE.MathUtils.lerp(-0.30, 0.36, k)
            : (0.58 - 1.25 * k) * dir;
          this.torso.rotation.x = diagonal
            ? this.lean - 0.16 + 0.42 * k
            : this.lean - 0.06 + 0.18 * k;
        }
        this.torso.rotation.z = (-0.12 + 0.28 * k) * dir;
        this.head.rotation.y = (-0.2 + 0.34 * k) * dir;
        // Transfer weight from the loaded rear leg into the front knee.
        this.legL.rotation.x = (-0.12 + 0.22 * k) * dir;
        this.legR.rotation.x = (0.12 - 0.22 * k) * dir;
        this.legL.rotation.z = -0.11;
        this.legR.rotation.z = 0.11;
        const kneeLStart = dir > 0 ? 0.36 : 0.58;
        const kneeRStart = dir > 0 ? 0.58 : 0.36;
        const kneeLEnd = dir > 0 ? 0.66 : 0.3;
        const kneeREnd = dir > 0 ? 0.3 : 0.66;
        this.kneeL.rotation.x = THREE.MathUtils.lerp(kneeLStart, kneeLEnd, k);
        this.kneeR.rotation.x = THREE.MathUtils.lerp(kneeRStart, kneeREnd, k);
      } else if (s < 1) {
        // FOLLOW THROUGH — drift a little further, then ease back to guard
        const t = (s - 0.64) / 0.36;
        const k = t * t * (3 - 2 * t); // smoothstep settle
        const over = Math.sin(t * Math.PI) * 0.12; // slight overswing
        if (overhead) {
          this.armR.rotation.x = THREE.MathUtils.lerp(0.58 + over, 0.035, k);
          this.armR.rotation.z = THREE.MathUtils.lerp(-0.16, 0.08, k);
          this.armL.rotation.x = THREE.MathUtils.lerp(-0.5, 0.055, k);
          this.armL.rotation.z = THREE.MathUtils.lerp(0.12, -0.08, k);
          this.elbowR.rotation.x = THREE.MathUtils.lerp(-0.28, -0.28, k);
          this.elbowL.rotation.x = THREE.MathUtils.lerp(-0.42, -0.24, k);
          this.armR.rotation.y = THREE.MathUtils.lerp(0.18, 0, k);
          this.armL.rotation.y = THREE.MathUtils.lerp(-0.12, 0, k);
          this.elbowR.rotation.y = THREE.MathUtils.lerp(-0.1, 0, k);
          this.elbowL.rotation.y = THREE.MathUtils.lerp(0.08, 0, k);
          this.elbowR.rotation.z = THREE.MathUtils.lerp(0.08, 0, k);
          this.elbowL.rotation.z = THREE.MathUtils.lerp(-0.05, 0, k);
          this.torso.rotation.x = this.lean + 0.34 * (1 - k);
        } else {
          const followX = diagonal ? -0.88 : horizontal ? -1.46 : 0.12;
          const recoverX = this.chainedSwing ? -0.72 : 0.035;
          this.armR.rotation.x = THREE.MathUtils.lerp(followX - over, recoverX, k);
          this.armR.rotation.z = THREE.MathUtils.lerp(
            horizontal ? 0.18 : 0.78 * dir,
            0.08,
            k,
          );
          this.armL.rotation.x = THREE.MathUtils.lerp(-0.7, 0.055, k);
          this.armL.rotation.z = THREE.MathUtils.lerp(0.28 * dir, -0.08, k);
          this.elbowR.rotation.x = THREE.MathUtils.lerp(horizontal ? -0.1 : -0.34, -0.28, k);
          this.elbowL.rotation.x = THREE.MathUtils.lerp(-0.56, -0.24, k);
          this.armR.rotation.y = THREE.MathUtils.lerp(horizontal ? 0 : 0.82 * dir, 0, k);
          this.armL.rotation.y = THREE.MathUtils.lerp(-0.42 * dir, 0, k);
          this.elbowR.rotation.y = THREE.MathUtils.lerp(-0.28 * dir, 0, k);
          this.elbowL.rotation.y = THREE.MathUtils.lerp(0.16 * dir, 0, k);
          this.elbowR.rotation.z = THREE.MathUtils.lerp(horizontal ? 0.62 : 0.12 * dir, 0, k);
          this.elbowL.rotation.z = THREE.MathUtils.lerp(-0.07 * dir, 0, k);
          this.torso.rotation.x = this.lean + 0.2 * (1 - k);
        }
        this.torso.rotation.y = (overhead ? -0.16 : horizontal ? 0.36 : -0.67 * dir) * (1 - k);
        this.torso.rotation.z = 0.16 * dir * (1 - k);
        this.legL.rotation.x = THREE.MathUtils.lerp(dir > 0 ? 0.1 : -0.1, -0.045, k);
        this.legR.rotation.x = THREE.MathUtils.lerp(dir > 0 ? -0.1 : 0.1, -0.025, k);
        this.kneeL.rotation.x = THREE.MathUtils.lerp(dir > 0 ? 0.66 : 0.3, 0.17, k);
        this.kneeR.rotation.x = THREE.MathUtils.lerp(dir > 0 ? 0.3 : 0.66, 0.2, k);
        this.legL.rotation.z = THREE.MathUtils.lerp(-0.11, -0.055, k);
        this.legR.rotation.z = THREE.MathUtils.lerp(0.11, 0.055, k);
        this.head.rotation.y = (overhead ? 0.06 : 0.14 * dir) * (1 - k);
      } else {
        this.swingT = -1;
        this.chainedSwing = false;
        this.saberBlade.visible = false;
        const bladeWidth = this.crimsonEdge ? 1.28 : 1;
        this.saberBlade.scale.set(bladeWidth, 1, bladeWidth);
        this.saberBlade.position.y = -2.82;
        for (const trail of this.saberTrails) trail.visible = false;
      }
    } else if (grounded && walk > 0.05) {
      this.armR.rotation.x = Math.sin(ph) * 0.42 * walk;
    }

    // rifle arm levels at the target while beaming or just after a shot,
    // with a sharp kick back on the shot itself
    this.aimT -= dt;
    if (this.aiming || this.aimT > 0) {
      const kick = this.recoilT > 0 ? Math.sin(this.recoilT / 0.18 * Math.PI) * 0.5 : 0;
      this.armL.rotation.x = -Math.PI / 2 + kick;
      this.armL.rotation.z = -0.16;
      this.elbowL.rotation.x = -(0.12 + kick * 0.22);
      this.armR.rotation.x = 0.28;
      this.armR.rotation.z = 0.2;
      this.elbowR.rotation.x = -0.48;
      this.legL.rotation.x = 0.3;
      this.kneeL.rotation.x = 1.02;
      this.legR.rotation.x = -0.16;
      this.kneeR.rotation.x = 0.34;
      this.legL.rotation.z = -0.13;
      this.legR.rotation.z = 0.13;
      this.torso.rotation.y += 0.18 + kick * 0.12;
      this.torso.rotation.x += 0.1;
      this.head.rotation.y = -0.12;
      this.head.rotation.x = -0.05;
    }
  }

  // Raise the rifle for a shot and report the muzzle's world position.
  // Forces a matrix update so the very first shot spawns at the muzzle.
  fireRifle(out: THREE.Vector3): void {
    this.aimT = 0.3;
    this.recoilT = 0.18; // kick, played out in animate()
    this.armL.rotation.x = -Math.PI / 2;
    this.group.updateMatrixWorld(true);
    this.muzzle.getWorldPosition(out);
  }

  startSwing(style = 0, chained = false): boolean {
    if (this.swingT >= 0 && this.swingT < 0.7) return false;
    this.chainedSwing = chained;
    this.swingT = 0;
    this.swingStyle = style % 3;
    return true;
  }
}
