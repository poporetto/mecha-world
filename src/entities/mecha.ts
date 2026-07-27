// Hero mobile suit: a deliberately bold, original super-robot silhouette with
// white ceramic armour, primary-colour blocks, a V-fin and oversized gear.

import * as THREE from 'three';

export const MECHA_SCALE = 2.2;

const WHITE = 0xf4f5f8;
const BLUE = 0x2b5fc7;
const RED = 0xd8352a;
const YELLOW = 0xf7c948;
const JOINT = 0x3a3d45;
const DARK = 0x23262b;
const SABER = 0xff8ad8; // pink beam
const EYE = 0xf7e06a;
const STEEL = 0x89919d;

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
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

export class MechaModel {
  group = new THREE.Group();
  private legL: THREE.Group;
  private legR: THREE.Group;
  private armL: THREE.Group;
  private armR: THREE.Group;
  private torso: THREE.Group;
  saberBlade: THREE.Mesh;
  private thrusterL: THREE.Mesh;
  private thrusterR: THREE.Mesh;

  swingT = -1; // 0..1 while swinging
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

    this.legL = this.makeLeg(-0.48);
    this.legR = this.makeLeg(0.48);
    this.kneeL = (this.legL as THREE.Group & { lower: THREE.Group }).lower;
    this.kneeR = (this.legR as THREE.Group & { lower: THREE.Group }).lower;
    g.add(this.legL, this.legR);

    // hip / abdomen with skirt armor plates
    const pelvis = plate(1.02, 0.52, 0.78, WHITE);
    pelvis.position.y = 2.0;
    const crotch = box(0.45, 0.5, 0.5, RED);
    crotch.position.set(0, 1.95, 0.28);
    // yellow V mark on the front skirt, the RX-78 waist emblem
    const vMarkL = box(0.3, 0.08, 0.06, YELLOW);
    vMarkL.position.set(-0.12, 2.06, 0.52);
    vMarkL.rotation.z = -0.5;
    const vMarkR = vMarkL.clone();
    vMarkR.position.x = 0.12;
    vMarkR.rotation.z = 0.5;
    g.add(vMarkL, vMarkR);
    const skirtF = box(0.95, 0.5, 0.14, WHITE);
    skirtF.position.set(0, 1.78, 0.46);
    skirtF.rotation.x = 0.18;
    const skirtB = box(0.95, 0.5, 0.14, WHITE);
    skirtB.position.set(0, 1.78, -0.46);
    skirtB.rotation.x = -0.18;
    const skirtL = box(0.16, 0.55, 0.6, WHITE);
    skirtL.position.set(-0.62, 1.78, 0);
    skirtL.rotation.z = -0.2;
    const skirtR = skirtL.clone();
    skirtR.position.x = 0.62;
    skirtR.rotation.z = 0.2;
    g.add(pelvis, crotch, skirtF, skirtB, skirtL, skirtR);
    // Three separated front-apron plates create a more commanding waistline.
    for (const x of [-0.43, 0, 0.43]) {
      const apron = plate(x === 0 ? 0.3 : 0.34, 0.48, 0.12, WHITE);
      apron.position.set(x, 1.7, 0.56);
      apron.rotation.x = 0.22;
      g.add(apron);
    }

    this.torso = new THREE.Group();
    this.torso.position.y = 2.25;
    g.add(this.torso);

    // chest: blue plate over white core, yellow vents, red abdomen
    const abdomen = box(0.95, 0.5, 0.75, RED);
    abdomen.position.y = 0.25;
    const chest = plate(1.75, 1.05, 1.05, BLUE);
    chest.position.y = 1.0;
    const chestTop = box(1.3, 0.35, 1.1, BLUE);
    chestTop.position.set(0, 1.55, 0.05);
    const ventL = box(0.42, 0.3, 0.12, YELLOW);
    ventL.position.set(-0.42, 1.18, 0.56);
    const ventR = ventL.clone();
    ventR.position.x = 0.42;
    const cockpit = box(0.3, 0.3, 0.14, RED);
    cockpit.position.set(0, 0.72, 0.56);
    // white collar plates flanking the neck
    const collarL = box(0.35, 0.18, 0.7, WHITE);
    collarL.position.set(-0.55, 1.78, 0.05);
    const collarR = collarL.clone();
    collarR.position.x = 0.55;
    this.torso.add(collarL, collarR);
    // White pectoral shells and blue centre keel: a recognisable heroic chest.
    const chestShellL = plate(0.55, 0.62, 0.14, WHITE);
    chestShellL.position.set(-0.52, 1.1, 0.58);
    chestShellL.rotation.z = 0.12;
    const chestShellR = chestShellL.clone();
    chestShellR.position.x = 0.52;
    chestShellR.rotation.z = -0.12;
    const chestKeel = plate(0.22, 0.72, 0.16, BLUE);
    chestKeel.position.set(0, 1.12, 0.62);
    this.torso.add(chestShellL, chestShellR, chestKeel);

    // backpack with twin thrusters
    const backpack = box(1.15, 0.95, 0.5, RED);
    backpack.position.set(0, 1.0, -0.72);
    // twin beam-saber hilts racked on top of the backpack
    const hiltRackL = box(0.13, 0.6, 0.13, 0x8a8d96);
    hiltRackL.position.set(-0.4, 1.7, -0.75);
    hiltRackL.rotation.x = -0.15;
    const hiltRackR = hiltRackL.clone();
    hiltRackR.position.x = 0.4;
    this.torso.add(hiltRackL, hiltRackR);
    this.thrusterL = box(0.28, 0.55, 0.28, 0xffb054, 0xff8a2f);
    this.thrusterL.position.set(-0.34, 0.45, -0.78);
    this.thrusterL.visible = false;
    this.thrusterR = this.thrusterL.clone();
    this.thrusterR.position.x = 0.34;
    this.torso.add(abdomen, chest, chestTop, ventL, ventR, cockpit, backpack, this.thrusterL, this.thrusterR);

    // Head, built to the RX-78-2 face: white helmet with a centre ridge, a
    // recessed black mask carrying angled eyes, a slatted mouth vent, cheek
    // ducts, a forehead jewel, and the yellow V-fin antenna above it.
    const head = new THREE.Group();
    head.position.y = 2.34;
    // Gundam proportion: the head is small but not a pinhead — this brings the
    // figure to roughly 7.5 heads tall, the classic heroic mobile-suit ratio.
    head.scale.setScalar(1.52);

    // helmet shell + crown ridge running front to back
    const helmet = plate(0.62, 0.46, 0.58, WHITE);
    helmet.position.y = 0.04;
    const crown = plate(0.2, 0.1, 0.56, WHITE);
    crown.position.set(0, 0.29, -0.01);
    const browGuard = plate(0.56, 0.1, 0.12, WHITE);
    browGuard.position.set(0, 0.16, 0.28);

    // recessed dark mask: the whole face sits inside this
    const mask = box(0.44, 0.34, 0.14, DARK);
    mask.position.set(0, -0.04, 0.28);

    // eyes: angled slabs, brighter and larger than a plain dot
    const eyeL = box(0.14, 0.075, 0.05, EYE, EYE);
    eyeL.position.set(-0.115, 0.035, 0.35);
    eyeL.rotation.z = 0.3; // outer corner tilts up
    const eyeR = box(0.14, 0.075, 0.05, EYE, EYE);
    eyeR.position.set(0.115, 0.035, 0.35);
    eyeR.rotation.z = -0.3;

    // mouth vent: a dark recess with vertical grille slats
    const vent = box(0.26, 0.11, 0.05, 0x15171c);
    vent.position.set(0, -0.16, 0.34);
    head.add(vent);
    for (let i = 0; i < 4; i++) {
      const slat = box(0.025, 0.1, 0.03, 0xa9adb8);
      slat.position.set(-0.09 + i * 0.06, -0.16, 0.36);
      head.add(slat);
    }
    // white pointed chin below the vent
    const chin = plate(0.2, 0.09, 0.14, WHITE);
    chin.position.set(0, -0.25, 0.3);

    // cheek armour flanking the mask, with a dark duct on each side
    const cheekL = plate(0.11, 0.32, 0.22, WHITE);
    cheekL.position.set(-0.27, -0.05, 0.26);
    const cheekR = cheekL.clone();
    cheekR.position.x = 0.27;
    const ductL = box(0.04, 0.16, 0.1, JOINT);
    ductL.position.set(-0.32, -0.05, 0.3);
    const ductR = ductL.clone();
    ductR.position.x = 0.32;

    // forehead jewel where the V-fin roots
    const jewel = box(0.11, 0.11, 0.07, RED, 0x551111);
    jewel.position.set(0, 0.21, 0.33);

    // V-fin: two broad yellow blades sweeping up and outward
    const finL = box(0.34, 0.075, 0.11, YELLOW);
    finL.geometry.translate(-0.17, 0, 0);
    finL.position.set(-0.03, 0.25, 0.31);
    finL.rotation.z = -0.62;
    const finR = box(0.34, 0.075, 0.11, YELLOW);
    finR.geometry.translate(0.17, 0, 0);
    finR.position.set(0.03, 0.25, 0.31);
    finR.rotation.z = 0.62;

    // side sensor pods ("ears") with white caps
    const earL = box(0.09, 0.22, 0.22, JOINT);
    earL.position.set(-0.33, -0.01, 0.02);
    const earR = earL.clone();
    earR.position.x = 0.33;
    const earCapL = plate(0.05, 0.14, 0.14, WHITE);
    earCapL.position.set(-0.38, -0.01, 0.02);
    const earCapR = earCapL.clone();
    earCapR.position.x = 0.38;

    // thin comms antenna and the rear sensor camera
    const antenna = box(0.035, 0.46, 0.035, JOINT);
    antenna.position.set(-0.35, 0.36, 0.02);
    antenna.rotation.z = 0.16;
    const rearCam = box(0.18, 0.09, 0.06, RED);
    rearCam.position.set(0, 0.12, -0.3);

    head.add(
      helmet, crown, browGuard, mask, eyeL, eyeR, chin,
      cheekL, cheekR, ductL, ductR, jewel, finL, finR,
      earL, earR, earCapL, earCapR, antenna, rearCam
    );
    this.torso.add(head);

    this.armL = this.makeArm(-1.25, true); // rifle arm
    this.armR = this.makeArm(1.25, false); // saber arm
    this.torso.add(this.armL, this.armR);

    // saber hilt always in the right fist; pink blade ignites on swing
    const hilt = box(0.14, 0.55, 0.14, 0x8a8d96);
    hilt.position.set(0, -2.05, 0.3);
    this.armR.add(hilt);
    this.saberBlade = box(0.2, 3.4, 0.2, SABER, SABER);
    this.saberBlade.position.set(0, -3.9, 0.3);
    this.saberBlade.visible = false;
    // soft additive glow sleeve around the blade
    const glow = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 3.5, 0.42),
      new THREE.MeshBasicMaterial({ color: SABER, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    this.saberBlade.add(glow);
    this.armR.add(this.saberBlade);
  }

  // The leg is two pivots: a hip group, and a knee group holding everything
  // below it, so the walk cycle can actually flex rather than swing rigidly.
  private makeLeg(x: number): THREE.Group {
    const leg = new THREE.Group();
    leg.position.set(x, 2.1, 0);
    const thigh = plate(0.5, 1.12, 0.6, WHITE);
    thigh.position.y = -0.56;
    const kneePad = box(0.54, 0.4, 0.18, WHITE);
    kneePad.position.set(0, -1.14, 0.36);
    leg.add(thigh, kneePad);

    const lower = new THREE.Group();
    lower.position.y = -1.16; // knee pivot
    const knee = box(0.46, 0.3, 0.54, JOINT);
    const shin = plate(0.64, 1.12, 0.72, WHITE);
    shin.position.y = -0.62;
    const ankle = box(0.36, 0.22, 0.42, JOINT);
    ankle.position.y = -1.24;
    const foot = box(0.78, 0.34, 1.24, RED);
    foot.position.set(0, -1.12, 0.2);
    // white ankle guard plate over the red foot, RX-78 style
    const ankleGuard = box(0.8, 0.26, 0.56, WHITE);
    ankleGuard.position.set(0, -0.94, 0.38);
    // Raised shin blade, side verniers and split toe cap improve the read at a distance.
    const shinBlade = plate(0.48, 0.76, 0.14, WHITE);
    shinBlade.position.set(0, -0.58, 0.43);
    const calfL = plate(0.11, 0.52, 0.22, STEEL);
    calfL.position.set(-0.37, -0.56, -0.12);
    const calfR = calfL.clone();
    calfR.position.x = 0.37;
    const toe = plate(0.6, 0.14, 0.38, RED);
    toe.position.set(0, -1.14, 0.82);
    lower.add(knee, shin, ankle, foot, ankleGuard, shinBlade, calfL, calfR, toe);
    leg.add(lower);
    (leg as THREE.Group & { lower: THREE.Group }).lower = lower;
    return leg;
  }

  private makeArm(x: number, rifle: boolean): THREE.Group {
    const arm = new THREE.Group();
    arm.position.set(x * 1.02, 1.26, 0);
    // RX-78 shoulders are large squared blocks that flare past the chest
    const pauldron = plate(0.8, 0.66, 0.84, WHITE);
    pauldron.position.set(0, 0.1, 0);
    const pauldronFace = plate(0.14, 0.54, 0.74, WHITE);
    pauldronFace.position.set(x > 0 ? 0.44 : -0.44, 0.1, 0);
    const pauldronVent = box(0.09, 0.14, 0.42, YELLOW);
    pauldronVent.position.set(x > 0 ? 0.5 : -0.5, 0.26, 0);
    arm.add(pauldronFace, pauldronVent);
    // RX-78 upper arms are white with dark joint rings
    const upper = box(0.42, 0.75, 0.46, WHITE);
    upper.position.y = -0.52;
    const shoulderRing = box(0.46, 0.16, 0.5, JOINT);
    shoulderRing.position.y = -0.18;
    arm.add(shoulderRing);
    const elbow = box(0.36, 0.2, 0.4, DARK);
    elbow.position.y = -0.95;
    const fore = box(0.5, 0.85, 0.54, WHITE);
    fore.position.y = -1.42;
    // Add a shoulder cap and edge plate; the asymmetrical loadout remains readable.
    const shoulderCap = plate(0.86, 0.18, 0.88, WHITE);
    shoulderCap.position.set(0, 0.44, 0);
    const foreGuard = plate(0.34, 0.45, 0.12, WHITE);
    foreGuard.position.set(0, -1.4, 0.34);
    arm.add(pauldron, shoulderCap, upper, elbow, fore, foreGuard);
    if (rifle) {
      // beam rifle held under the forearm
      const body = box(0.34, 0.9, 0.42, DARK);
      body.position.set(0, -1.95, 0.1);
      const scope = box(0.14, 0.2, 0.5, JOINT);
      scope.position.set(0, -1.7, 0.35);
      const sensor = box(0.1, 0.12, 0.1, YELLOW, YELLOW);
      sensor.position.set(0, -1.7, 0.62);
      arm.add(sensor);
      this.muzzle = box(0.16, 0.35, 0.16, 0xffb0e8, 0xffb0e8);
      this.muzzle.position.set(0, -2.45, 0.1);
      arm.add(body, scope, this.muzzle);
      const barrel = box(0.2, 0.7, 0.2, DARK);
      barrel.position.set(0, -2.72, 0.1);
      const rifleStock = box(0.22, 0.36, 0.46, STEEL);
      rifleStock.position.set(0, -1.55, -0.18);
      arm.add(barrel, rifleStock);
      // shield strapped to the outside of the rifle arm
      const shield = plate(0.14, 2.15, 1.1, RED);
      shield.position.set(-0.42, -1.35, 0);
      const shieldTrim = box(0.06, 2.15, 0.2, WHITE);
      shieldTrim.position.set(-0.5, -1.35, 0);
      const crossV = box(0.06, 0.85, 0.2, YELLOW);
      crossV.position.set(-0.51, -1.3, 0);
      const crossH = box(0.06, 0.2, 0.7, YELLOW);
      crossH.position.set(-0.51, -1.3, 0);
      arm.add(shield, shieldTrim, crossV, crossH);
    } else {
      const fist = box(0.46, 0.42, 0.46, JOINT);
      fist.position.y = -1.95;
      arm.add(fist);
    }
    return arm;
  }

  setThrusters(on: boolean): void {
    this.thrusterL.visible = on;
    this.thrusterR.visible = on;
    this.flying = on;
  }

  private flickerThrusters(t: number): void {
    if (!this.thrusterL.visible) return;
    const s = 0.85 + Math.abs(Math.sin(t * 31)) * 0.5;
    this.thrusterL.scale.set(1, s, 1);
    this.thrusterR.scale.set(1, 1.35 - (s - 0.85), 1);
  }

  animate(t: number, speed: number, grounded: boolean, dt: number): void {
    this.flickerThrusters(t);

    // decay the one-shot triggers
    this.landT = Math.max(0, this.landT - dt);
    this.flinchT = Math.max(0, this.flinchT - dt);
    this.recoilT = Math.max(0, this.recoilT - dt);
    this.dashT = Math.max(0, this.dashT - dt);

    // landing squash: fire when we touch down after being airborne
    if (grounded && this.wasAirborne) this.landT = 0.26;
    this.wasAirborne = !grounded;

    // Lean: pitch forward with speed, bank into turns. Both are smoothed so
    // the mecha settles rather than snapping between poses.
    let dYaw = this.group.rotation.y - this.prevYaw;
    while (dYaw > Math.PI) dYaw -= Math.PI * 2;
    while (dYaw < -Math.PI) dYaw += Math.PI * 2;
    this.prevYaw = this.group.rotation.y;
    const run = Math.min(1, speed / 20);
    const targetLean = grounded ? run * 0.2 + this.dashT * 0.9 : 0.16;
    const targetBank = Math.max(-0.32, Math.min(0.32, -dYaw * 7));
    this.lean += (targetLean - this.lean) * Math.min(1, dt * 7);
    this.bank += (targetBank - this.bank) * Math.min(1, dt * 6);

    const walk = Math.min(1, speed / 9);
    // stride quickens with speed; a run reads faster than a walk
    const ph = t * (7 + run * 5);

    if (grounded && walk > 0.05) {
      // Walk cycle: hips swing, knees flex on the back-swing so the foot
      // lifts instead of dragging, and the body rises on each push-off.
      const sL = Math.sin(ph), sR = Math.sin(ph + Math.PI);
      this.legL.rotation.x = sL * 0.72 * walk;
      this.legR.rotation.x = sR * 0.72 * walk;
      // A knee only folds backwards. The mecha faces +Z, so the shin swings
      // toward -Z, which is POSITIVE rotation.x — never negative.
      this.kneeL.rotation.x = Math.max(0, -sL) * 1.15 * walk;
      this.kneeR.rotation.x = Math.max(0, -sR) * 1.15 * walk;
      this.armL.rotation.x = sR * 0.42 * walk;
      this.legL.rotation.z = this.legR.rotation.z = 0;
      this.armL.rotation.z = this.armR.rotation.z = 0;
      this.group.position.y += Math.abs(Math.sin(ph)) * 0.14 * walk;
      // subtle counter-rotation of the torso against the legs
      this.torso.rotation.y = -sL * 0.1 * walk;
    } else if (!grounded) {
      // Flight: under thrust the mecha streamlines — legs together and swept
      // back with the knees folded, arms tucked in, body pitched forward and
      // riding a slow thruster wobble. Falling is a looser, more upright pose.
      const bob = Math.sin(t * 5.5);
      const yaw2 = Math.sin(t * 2.3);
      if (this.flying) {
        const hipBack = -0.5 + bob * 0.05;   // legs trail behind
        this.legL.rotation.x = hipBack;
        this.legR.rotation.x = hipBack - 0.08;
        this.kneeL.rotation.x = 0.72 + bob * 0.06; // folded, correct direction
        this.kneeR.rotation.x = 0.6 + bob * 0.06;
        this.legL.rotation.z = 0.06;   // ankles drawn together
        this.legR.rotation.z = -0.06;
        this.armL.rotation.x = -0.5 + bob * 0.05;
        this.armR.rotation.x = -0.42 - bob * 0.05;
        this.armL.rotation.z = 0.16;   // arms tucked to the body
        this.armR.rotation.z = -0.16;
        this.torso.rotation.y = yaw2 * 0.05;
        this.group.position.y += bob * 0.06; // thruster hover wobble
      } else {
        // free fall / jump arc: legs part, arms come up for balance
        this.legL.rotation.x = -0.22 + bob * 0.08;
        this.legR.rotation.x = 0.3 - bob * 0.08;
        this.kneeL.rotation.x = 0.5;
        this.kneeR.rotation.x = 0.18;
        this.legL.rotation.z = 0;
        this.legR.rotation.z = 0;
        this.armL.rotation.x = -0.35;
        this.armR.rotation.x = -0.28;
        this.armL.rotation.z = 0.22;
        this.armR.rotation.z = -0.22;
        this.torso.rotation.y *= 0.85;
      }
    } else {
      // idle: settle the limbs, breathe, and sway gently
      this.legL.rotation.x *= 0.82;
      this.legR.rotation.x *= 0.82;
      this.kneeL.rotation.x *= 0.82;
      this.kneeR.rotation.x *= 0.82;
      this.armL.rotation.x = Math.sin(t * 1.5) * 0.05;
      this.legL.rotation.z = this.legR.rotation.z = 0;
      this.armL.rotation.z = this.armR.rotation.z = 0;
      this.torso.rotation.y = Math.sin(t * 0.8) * 0.03;
      this.torso.position.y = 2.25 + Math.sin(t * 1.6) * 0.02; // breathing
    }

    // landing squash: compress the stance, then spring back
    if (this.landT > 0) {
      const k = this.landT / 0.26;          // 1 -> 0
      const squash = Math.sin(k * Math.PI) * 0.5;
      this.kneeL.rotation.x += squash;
      this.kneeR.rotation.x += squash;
      this.legL.rotation.x += squash * 0.45;
      this.legR.rotation.x += squash * 0.45;
      this.group.position.y -= squash * 0.35;
    }

    this.group.rotation.z = this.bank;
    this.torso.rotation.x = this.lean + (this.flinchT > 0 ? -Math.sin(this.flinchT / 0.22 * Math.PI) * 0.28 : 0);

    // saber swing: arm levels out forward, torso whips a horizontal slash
    if (this.swingT >= 0) {
      this.swingT += dt / 0.45;
      const s = this.swingT;
      this.saberBlade.visible = true;
      this.armR.rotation.z = 0;
      if (s < 0.25) {
        // wind up: raise arm to horizontal, twist torso right, coil the legs
        const k = s / 0.25;
        this.armR.rotation.x = -1.5 * k;
        this.torso.rotation.y = 0.9 * k;
        this.torso.rotation.z = -0.18 * k;
      } else if (s < 0.6) {
        // slash: sweep torso hard left, blade carves a flat arc
        const k = (s - 0.25) / 0.35;
        this.armR.rotation.x = -1.5;
        this.torso.rotation.y = 0.9 - 2.1 * k;
        this.torso.rotation.z = -0.18 + 0.34 * k;
      } else if (s < 1) {
        // recover
        const k = (s - 0.6) / 0.4;
        this.armR.rotation.x = -1.5 * (1 - k);
        this.torso.rotation.y = -1.2 * (1 - k);
        this.torso.rotation.z = 0.16 * (1 - k);
      } else {
        this.swingT = -1;
        this.saberBlade.visible = false;
        this.armR.rotation.set(0, 0, 0);
        this.torso.rotation.y = 0;
        this.torso.rotation.z = 0;
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
      this.torso.rotation.y += kick * 0.12;
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

  startSwing(): boolean {
    if (this.swingT >= 0 && this.swingT < 0.7) return false;
    this.swingT = 0;
    return true;
  }
}
