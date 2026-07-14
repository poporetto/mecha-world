// The player mecha: blocky original design (white/teal/ember — deliberately
// not a Gundam clone), with animated walk cycle, saber swing and cannon arm.

import * as THREE from 'three';

const ARMOR = 0xe9eaf0;
const ARMOR2 = 0xc7ccd8;
const ACCENT = 0x18b8a8; // teal
const EMBER = 0xff7a2f; // orange
const JOINT = 0x2b2e36;
const VISOR = 0x37e9ff;

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
  return m;
}

export class MechaModel {
  group = new THREE.Group();
  private legL: THREE.Group;
  private legR: THREE.Group;
  private armL: THREE.Group;
  private armR: THREE.Group;
  private torso: THREE.Group;
  saberBlade: THREE.Mesh;
  cannonTip = new THREE.Object3D();
  private thrusterL: THREE.Mesh;
  private thrusterR: THREE.Mesh;

  swingT = -1; // 0..1 while swinging
  aiming = false;

  constructor() {
    const g = this.group;

    // legs (pivot at hip, y=2.1)
    this.legL = this.makeLeg(-0.55);
    this.legR = this.makeLeg(0.55);
    g.add(this.legL, this.legR);

    // torso group (pivot at hip)
    this.torso = new THREE.Group();
    this.torso.position.y = 2.1;
    g.add(this.torso);

    const chest = box(1.7, 1.15, 1.0, ARMOR);
    chest.position.y = 0.75;
    const belly = box(1.1, 0.5, 0.8, JOINT);
    belly.position.y = 0.1;
    const chestCore = box(0.5, 0.4, 0.15, EMBER, EMBER);
    chestCore.position.set(0, 0.8, 0.52);
    const backpack = box(1.2, 0.9, 0.45, ARMOR2);
    backpack.position.set(0, 0.8, -0.65);
    this.thrusterL = box(0.3, 0.5, 0.3, EMBER, EMBER);
    this.thrusterL.position.set(-0.35, 0.25, -0.7);
    this.thrusterL.visible = false;
    this.thrusterR = this.thrusterL.clone();
    this.thrusterR.position.x = 0.35;
    this.torso.add(chest, belly, chestCore, backpack, this.thrusterL, this.thrusterR);

    // head: angular with cyan visor band and swept side fins (no V-fin)
    const head = new THREE.Group();
    head.position.y = 1.6;
    const skull = box(0.62, 0.55, 0.6, ARMOR);
    const visor = box(0.64, 0.16, 0.2, VISOR, VISOR);
    visor.position.set(0, 0.06, 0.24);
    const crest = box(0.16, 0.34, 0.5, ACCENT);
    crest.position.set(0, 0.4, -0.05);
    const finL = box(0.08, 0.4, 0.34, ACCENT);
    finL.position.set(-0.38, 0.12, -0.12);
    finL.rotation.z = 0.35;
    const finR = finL.clone();
    finR.position.x = 0.38;
    finR.rotation.z = -0.35;
    head.add(skull, visor, crest, finL, finR);
    this.torso.add(head);

    // shoulders + arms
    this.armL = this.makeArm(-1.15, true); // cannon arm
    this.armR = this.makeArm(1.15, false); // saber arm
    this.torso.add(this.armL, this.armR);

    // saber blade (hidden until swing)
    this.saberBlade = box(0.18, 2.9, 0.18, VISOR, VISOR);
    this.saberBlade.position.set(0, -2.6, 0);
    this.saberBlade.visible = false;
    this.armR.add(this.saberBlade);
  }

  private makeLeg(x: number): THREE.Group {
    const leg = new THREE.Group();
    leg.position.set(x, 2.1, 0);
    const thigh = box(0.55, 1.0, 0.6, ARMOR2);
    thigh.position.y = -0.55;
    const knee = box(0.4, 0.25, 0.45, JOINT);
    knee.position.y = -1.1;
    const shin = box(0.5, 0.85, 0.55, ARMOR);
    shin.position.y = -1.6;
    const foot = box(0.6, 0.25, 0.95, ACCENT);
    foot.position.set(0, -2.0, 0.15);
    leg.add(thigh, knee, shin, foot);
    return leg;
  }

  private makeArm(x: number, cannon: boolean): THREE.Group {
    const arm = new THREE.Group();
    arm.position.set(x, 1.15, 0);
    const pauldron = box(0.7, 0.55, 0.75, ACCENT);
    pauldron.position.y = 0.1;
    const upper = box(0.42, 0.8, 0.45, ARMOR2);
    upper.position.y = -0.55;
    const fore = box(0.48, 0.85, 0.5, ARMOR);
    fore.position.y = -1.35;
    arm.add(pauldron, upper, fore);
    if (cannon) {
      const barrel = box(0.3, 0.7, 0.3, JOINT);
      barrel.position.set(0, -1.95, 0.05);
      const muzzle = box(0.2, 0.15, 0.2, VISOR, VISOR);
      muzzle.position.set(0, -2.32, 0.05);
      this.cannonTip.position.set(0, -2.4, 0.05);
      arm.add(barrel, muzzle, this.cannonTip);
    } else {
      const fist = box(0.45, 0.4, 0.45, JOINT);
      fist.position.y = -1.9;
      arm.add(fist);
    }
    return arm;
  }

  setThrusters(on: boolean): void {
    this.thrusterL.visible = on;
    this.thrusterR.visible = on;
  }

  animate(t: number, speed: number, grounded: boolean, dt: number): void {
    const walk = Math.min(1, speed / 8);
    const ph = t * 9;
    if (grounded && walk > 0.05) {
      this.legL.rotation.x = Math.sin(ph) * 0.7 * walk;
      this.legR.rotation.x = Math.sin(ph + Math.PI) * 0.7 * walk;
      this.armL.rotation.x = Math.sin(ph + Math.PI) * 0.45 * walk;
      this.group.position.y += Math.abs(Math.sin(ph)) * 0.08 * walk;
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

    // saber swing: raise, slash across, recover
    if (this.swingT >= 0) {
      this.swingT += dt / 0.42;
      const s = this.swingT;
      this.saberBlade.visible = true;
      if (s < 0.3) {
        const k = s / 0.3;
        this.armR.rotation.x = -2.4 * k;
        this.armR.rotation.z = -0.4 * k;
      } else if (s < 0.65) {
        const k = (s - 0.3) / 0.35;
        this.armR.rotation.x = -2.4 + 3.1 * k;
        this.armR.rotation.z = -0.4 + 0.9 * k;
        this.torso.rotation.y = -0.5 * k;
      } else if (s < 1) {
        const k = (s - 0.65) / 0.35;
        this.armR.rotation.x = 0.7 * (1 - k);
        this.armR.rotation.z = 0.5 * (1 - k);
        this.torso.rotation.y = -0.5 * (1 - k);
      } else {
        this.swingT = -1;
        this.saberBlade.visible = false;
        this.armR.rotation.set(0, 0, 0);
        this.torso.rotation.y = 0;
      }
    } else if (this.aiming) {
      this.armL.rotation.x = -Math.PI / 2;
    } else if (grounded && walk > 0.05) {
      // walking arm handled above
      this.armR.rotation.x = Math.sin(t * 9) * 0.45 * walk;
    }
  }

  startSwing(): boolean {
    if (this.swingT >= 0 && this.swingT < 0.7) return false;
    this.swingT = 0;
    return true;
  }
}
