// The player mecha, styled after the classic RX-78: white armor, blue chest,
// red abdomen/feet, yellow V-fin, pink beam saber. Scaled up hero-size.

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

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
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

  constructor() {
    const g = this.group;
    g.scale.setScalar(MECHA_SCALE);

    this.legL = this.makeLeg(-0.58);
    this.legR = this.makeLeg(0.58);
    g.add(this.legL, this.legR);

    // hip / abdomen with skirt armor plates
    const pelvis = box(1.25, 0.55, 0.85, WHITE);
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
    skirtL.position.set(-0.72, 1.78, 0);
    skirtL.rotation.z = -0.2;
    const skirtR = skirtL.clone();
    skirtR.position.x = 0.72;
    skirtR.rotation.z = 0.2;
    g.add(pelvis, crotch, skirtF, skirtB, skirtL, skirtR);

    this.torso = new THREE.Group();
    this.torso.position.y = 2.25;
    g.add(this.torso);

    // chest: blue plate over white core, yellow vents, red abdomen
    const abdomen = box(0.95, 0.5, 0.75, RED);
    abdomen.position.y = 0.25;
    const chest = box(1.75, 1.05, 1.05, BLUE);
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

    // head: white helmet, dark face, yellow eyes, red chin, yellow V-fin
    const head = new THREE.Group();
    head.position.y = 2.05;
    const helmet = box(0.6, 0.52, 0.58, WHITE);
    const face = box(0.44, 0.3, 0.18, DARK);
    face.position.set(0, -0.06, 0.26);
    const eyeL = box(0.13, 0.09, 0.06, EYE, EYE);
    eyeL.position.set(-0.11, 0.0, 0.36);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.11;
    const chin = box(0.16, 0.14, 0.12, RED);
    chin.position.set(0, -0.2, 0.32);
    const crest = box(0.12, 0.12, 0.08, RED);
    crest.position.set(0, 0.24, 0.32);
    // V-fin: two blades rising from the center jewel, forming a V
    const finL = box(0.6, 0.07, 0.1, YELLOW);
    finL.geometry.translate(-0.3, 0, 0);
    finL.position.set(0, 0.26, 0.3);
    finL.rotation.z = -0.55;
    const finR = box(0.6, 0.07, 0.1, YELLOW);
    finR.geometry.translate(0.3, 0, 0);
    finR.position.set(0, 0.26, 0.3);
    finR.rotation.z = 0.55;
    const earL = box(0.08, 0.2, 0.2, JOINT);
    earL.position.set(-0.34, -0.02, 0.05);
    const earR = earL.clone();
    earR.position.x = 0.34;
    // thin comms antenna off the left ear
    const antenna = box(0.04, 0.5, 0.04, JOINT);
    antenna.position.set(-0.36, 0.35, 0.05);
    antenna.rotation.z = 0.15;
    head.add(helmet, face, eyeL, eyeR, chin, crest, finL, finR, earL, earR, antenna);
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

  private makeLeg(x: number): THREE.Group {
    const leg = new THREE.Group();
    leg.position.set(x, 2.1, 0);
    const thigh = box(0.55, 0.95, 0.62, WHITE);
    thigh.position.y = -0.5;
    const knee = box(0.42, 0.28, 0.5, JOINT);
    knee.position.y = -1.05;
    const kneePad = box(0.48, 0.34, 0.16, WHITE);
    kneePad.position.set(0, -1.02, 0.32);
    leg.add(kneePad);
    const shin = box(0.58, 0.95, 0.66, WHITE);
    shin.position.y = -1.62;
    const ankle = box(0.34, 0.2, 0.4, JOINT);
    ankle.position.y = -2.14;
    const foot = box(0.62, 0.28, 1.05, RED);
    foot.position.set(0, -2.0, 0.18);
    // white ankle guard plate over the red foot, RX-78 style
    const ankleGuard = box(0.66, 0.22, 0.5, WHITE);
    ankleGuard.position.set(0, -1.86, 0.35);
    leg.add(thigh, knee, shin, ankle, foot, ankleGuard);
    return leg;
  }

  private makeArm(x: number, rifle: boolean): THREE.Group {
    const arm = new THREE.Group();
    arm.position.set(x, 1.35, 0);
    const pauldron = box(0.72, 0.55, 0.8, WHITE);
    pauldron.position.y = 0.08;
    const upper = box(0.42, 0.75, 0.46, JOINT);
    upper.position.y = -0.52;
    const elbow = box(0.36, 0.2, 0.4, DARK);
    elbow.position.y = -0.95;
    const fore = box(0.5, 0.85, 0.54, WHITE);
    fore.position.y = -1.42;
    arm.add(pauldron, upper, elbow, fore);
    if (rifle) {
      // beam rifle held under the forearm
      const body = box(0.28, 0.9, 0.34, DARK);
      body.position.set(0, -1.95, 0.1);
      const scope = box(0.14, 0.2, 0.5, JOINT);
      scope.position.set(0, -1.7, 0.35);
      const sensor = box(0.1, 0.12, 0.1, YELLOW, YELLOW);
      sensor.position.set(0, -1.7, 0.62);
      arm.add(sensor);
      const muzzle = box(0.16, 0.35, 0.16, 0x39e6ff, 0x39e6ff);
      muzzle.position.set(0, -2.45, 0.1);
      arm.add(body, scope, muzzle);
      // shield strapped to the outside of the rifle arm
      const shield = box(0.14, 1.9, 1.05, RED);
      shield.position.set(-0.42, -1.35, 0);
      const shieldTrim = box(0.06, 1.9, 0.2, WHITE);
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
  }

  private flickerThrusters(t: number): void {
    if (!this.thrusterL.visible) return;
    const s = 0.85 + Math.abs(Math.sin(t * 31)) * 0.5;
    this.thrusterL.scale.set(1, s, 1);
    this.thrusterR.scale.set(1, 1.35 - (s - 0.85), 1);
  }

  animate(t: number, speed: number, grounded: boolean, dt: number): void {
    this.flickerThrusters(t);
    const walk = Math.min(1, speed / 9);
    const ph = t * 8;
    if (grounded && walk > 0.05) {
      this.legL.rotation.x = Math.sin(ph) * 0.7 * walk;
      this.legR.rotation.x = Math.sin(ph + Math.PI) * 0.7 * walk;
      this.armL.rotation.x = Math.sin(ph + Math.PI) * 0.4 * walk;
      this.group.position.y += Math.abs(Math.sin(ph)) * 0.12 * walk;
    } else if (!grounded) {
      this.legL.rotation.x = 0.35;
      this.legR.rotation.x = -0.25;
      this.armL.rotation.x = -0.3;
    } else {
      this.legL.rotation.x *= 0.8;
      this.legR.rotation.x *= 0.8;
      this.armL.rotation.x = Math.sin(t * 1.5) * 0.05;
      this.torso.rotation.y = Math.sin(t * 0.8) * 0.03;
    }

    // saber swing: arm levels out forward, torso whips a horizontal slash
    if (this.swingT >= 0) {
      this.swingT += dt / 0.45;
      const s = this.swingT;
      this.saberBlade.visible = true;
      this.armR.rotation.z = 0;
      if (s < 0.25) {
        // wind up: raise arm to horizontal, twist torso right
        const k = s / 0.25;
        this.armR.rotation.x = -1.5 * k;
        this.torso.rotation.y = 0.9 * k;
      } else if (s < 0.6) {
        // slash: sweep torso hard left, blade carves a flat arc
        const k = (s - 0.25) / 0.35;
        this.armR.rotation.x = -1.5;
        this.torso.rotation.y = 0.9 - 2.1 * k;
      } else if (s < 1) {
        // recover
        const k = (s - 0.6) / 0.4;
        this.armR.rotation.x = -1.5 * (1 - k);
        this.torso.rotation.y = -1.2 * (1 - k);
      } else {
        this.swingT = -1;
        this.saberBlade.visible = false;
        this.armR.rotation.set(0, 0, 0);
        this.torso.rotation.y = 0;
      }
    } else if (this.aiming) {
      this.armL.rotation.x = -Math.PI / 2;
    } else if (grounded && walk > 0.05) {
      this.armR.rotation.x = Math.sin(t * 8) * 0.4 * walk;
    }
  }

  startSwing(): boolean {
    if (this.swingT >= 0 && this.swingT < 0.7) return false;
    this.swingT = 0;
    return true;
  }
}
