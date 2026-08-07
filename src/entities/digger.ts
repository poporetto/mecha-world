// DIGGER — Jotetsu's lightweight reconstruction frame.
//
// Unlike the combat frames it is tall, narrow and lightly armoured. Its
// tracked legs carry a rotating excavator torso, twin rebuilding manipulators
// and a compact material hopper. It patrols damaged shelters and construction
// sites instead of engaging monsters.

import * as THREE from 'three';
import { World } from '../core/world';

const YELLOW = 0xe3ad35;
const CREAM = 0xe6e1cf;
const STEEL = 0x59636b;
const DARK = 0x252b30;
const GLASS = 0x70dce8;

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({
      color, emissive, emissiveIntensity: emissive ? 1.5 : 0,
      metalness: color === STEEL || color === DARK ? 0.72 : 0.22,
      roughness: 0.4, flatShading: true,
    }),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export interface DiggerCtx {
  world: World;
  playerPos: THREE.Vector3;
  workTarget: THREE.Vector3 | null;
}

export class Digger {
  group = new THREE.Group();
  active = false;
  private yaw = 0;
  private armL = new THREE.Group();
  private armR = new THREE.Group();
  private beacon: THREE.Mesh;

  constructor() {
    const g = this.group;
    g.scale.setScalar(1.75);

    // Narrow tracked feet keep the support unit readable without giving it
    // Kotetsu's broad tank silhouette.
    for (const side of [-1, 1]) {
      const track = box(0.62, 0.55, 2.25, DARK);
      track.position.set(side * 0.58, 0.36, 0);
      for (let i = 0; i < 3; i++) {
        const wheel = box(0.38, 0.38, 0.18, STEEL);
        wheel.position.set(side * 0.9, 0.36, -0.68 + i * 0.68);
        g.add(wheel);
      }
      const shin = box(0.42, 1.45, 0.55, CREAM);
      shin.position.set(side * 0.58, 1.25, 0);
      const shinRam = box(0.18, 0.9, 0.18, YELLOW);
      shinRam.position.set(side * 0.58, 1.3, 0.34);
      g.add(track, shin, shinRam);
    }

    const hip = box(1.3, 0.42, 0.9, STEEL);
    hip.position.y = 2.0;
    const waist = box(0.72, 0.7, 0.65, DARK);
    waist.position.y = 2.5;
    const torso = box(1.15, 1.55, 0.9, YELLOW);
    torso.position.y = 3.55;
    const chest = box(0.7, 0.75, 0.16, CREAM);
    chest.position.set(0, 3.65, 0.52);
    const chestWindow = box(0.36, 0.24, 0.08, GLASS, 0x277785);
    chestWindow.position.set(0, 3.82, 0.63);
    const chestVent = box(0.46, 0.12, 0.08, DARK);
    chestVent.position.set(0, 3.45, 0.63);
    const rollCage = box(1.42, 0.16, 1.0, STEEL);
    rollCage.position.set(0, 4.22, 0);
    g.add(hip, waist, torso, chest, chestWindow, chestVent, rollCage);

    const head = box(0.58, 0.52, 0.58, CREAM);
    head.position.y = 4.7;
    const visor = box(0.48, 0.16, 0.08, GLASS, 0x277785);
    visor.position.set(0, 4.72, 0.33);
    const jaw = box(0.36, 0.18, 0.18, DARK);
    jaw.position.set(0, 4.48, 0.24);
    const headGuardL = box(0.12, 0.46, 0.66, YELLOW);
    headGuardL.position.set(-0.4, 4.7, 0);
    const headGuardR = headGuardL.clone();
    headGuardR.position.x = 0.4;
    this.beacon = box(0.16, 0.18, 0.16, 0xff6a32, 0xff3218);
    this.beacon.position.set(0, 5.08, 0);
    g.add(head, visor, jaw, headGuardL, headGuardR, this.beacon);

    // Long, slim articulated construction arms. One carries a bucket, the
    // other a bright welding/reconstruction tool.
    for (const side of [-1, 1]) {
      const arm = side < 0 ? this.armL : this.armR;
      arm.position.set(side * 0.78, 4.0, 0);
      const upper = box(0.34, 1.35, 0.38, YELLOW);
      upper.position.y = -0.58;
      const upperRail = box(0.14, 1.05, 0.46, CREAM);
      upperRail.position.set(side * 0.16, -0.58, 0);
      const elbow = box(0.42, 0.38, 0.42, STEEL);
      elbow.position.y = -1.28;
      const fore = box(0.3, 1.15, 0.34, CREAM);
      fore.position.set(0, -1.88, 0.18);
      const hose = box(0.1, 1.1, 0.1, DARK);
      hose.position.set(-side * 0.21, -1.85, 0.08);
      arm.add(upper, upperRail, elbow, fore, hose);
      if (side < 0) {
        const bucket = box(0.72, 0.5, 0.7, DARK);
        bucket.position.set(0, -2.55, 0.35);
        bucket.rotation.x = 0.35;
        arm.add(bucket);
      } else {
        const welder = box(0.28, 0.62, 0.3, GLASS, 0x277785);
        welder.position.set(0, -2.55, 0.32);
        arm.add(welder);
      }
      g.add(arm);
    }

    const hopper = box(1.0, 1.35, 0.7, STEEL);
    hopper.position.set(0, 3.45, -0.82);
    const hopperLip = box(1.18, 0.18, 0.86, YELLOW);
    hopperLip.position.set(0, 4.1, -0.82);
    const exhaustL = box(0.18, 0.8, 0.18, DARK);
    exhaustL.position.set(-0.62, 3.8, -0.82);
    const exhaustR = exhaustL.clone();
    exhaustR.position.x = 0.62;
    g.add(hopper, hopperLip, exhaustL, exhaustR);
    g.visible = false;
  }

  deploy(at: THREE.Vector3): void {
    this.active = true;
    this.group.visible = true;
    this.group.position.copy(at);
  }

  retire(): void {
    this.active = false;
    this.group.visible = false;
  }

  update(dt: number, t: number, ctx: DiggerCtx): void {
    if (!this.active) return;
    const pos = this.group.position;
    const target = ctx.workTarget ?? ctx.playerPos;
    const dx = target.x - pos.x;
    const dz = target.z - pos.z;
    const dist = Math.hypot(dx, dz);
    if (dist > 10) {
      const speed = Math.min(7, 2.5 + dist * 0.025);
      const nx = pos.x + dx / dist * speed * dt;
      const nz = pos.z + dz / dist * speed * dt;
      const gy = ctx.world.groundHeight(pos.x, pos.z, 6);
      const ngy = ctx.world.groundHeight(nx, nz, 6);
      if (ngy <= gy + 1.2) {
        pos.x = nx;
        pos.z = nz;
      }
      const wantYaw = Math.atan2(dx, dz);
      let turn = wantYaw - this.yaw;
      while (turn > Math.PI) turn -= Math.PI * 2;
      while (turn < -Math.PI) turn += Math.PI * 2;
      this.yaw += turn * Math.min(1, dt * 1.8);
    }
    this.group.rotation.y = this.yaw;
    const ground = ctx.world.groundHeight(pos.x, pos.z, 6);
    pos.y += (ground - pos.y) * Math.min(1, dt * 5);

    const working = dist < 28;
    const motion = working ? Math.sin(t * 4.2) * 0.3 : Math.sin(t * 1.8) * 0.06;
    this.armL.rotation.x = -0.18 + motion;
    this.armR.rotation.x = -0.18 - motion;
    (this.beacon.material as THREE.MeshLambertMaterial).emissiveIntensity =
      working ? 1.5 + Math.sin(t * 8) * 0.5 : 0.35;
  }
}
