// Support frames that fight alongside the player. Deliberately the opposite
// of the hero suit: short, wide and heavy where that one is tall and lean.
// Big shoulders, stubby legs, a slab shield on one arm, shoulder cannon on
// the other.
//
// Hinata's TSUBAKI is the one of these. It takes a palette so other frames
// can reuse the chassis later. It tags along near the player, plants itself
// when something is in range and puts fire on it. It cannot die; it is
// company, not an extra health bar.

import * as THREE from 'three';
import { World } from '../core/world';

export interface AllyPalette {
  main: number;  // shoulders, shins, skirt
  trim: number;  // chest shells, head
  metal: number;
  glass: number;
}

/** Hinata's frame: bright red, loud and eager like its pilot. */
export const TSUBAKI: AllyPalette = {
  main: 0xe0403c, trim: 0xf6efe0, metal: 0x8d949f, glass: 0x7fd8e8,
};

const DARK = 0x2f333b;

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
}

export interface AllyCtx {
  world: World;
  playerPos: THREE.Vector3;
  /** Nearest hostile to shoot at, if any. */
  target: THREE.Vector3 | null;
  fire: (from: THREE.Vector3, toward: THREE.Vector3) => void;
}

export class Ally {
  group = new THREE.Group();
  active = false;
  private legL: THREE.Group;
  private legR: THREE.Group;
  private torso: THREE.Group;
  private cannon: THREE.Mesh;
  private yaw = 0;
  private fireT = 2;
  private bob = 0;

  constructor(private pal: AllyPalette = TSUBAKI) {
    const ORANGE = pal.main, CREAM = pal.trim, STEEL = pal.metal, GLASS = pal.glass;
    const g = this.group;
    g.scale.setScalar(2.0);

    // stubby legs — short, wide, planted far apart
    this.legL = this.makeLeg(-0.62);
    this.legR = this.makeLeg(0.62);
    g.add(this.legL, this.legR);

    // wide low pelvis
    const pelvis = box(1.5, 0.5, 1.0, CREAM);
    pelvis.position.y = 1.35;
    const skirt = box(1.7, 0.42, 1.15, ORANGE);
    skirt.position.y = 1.05;
    g.add(pelvis, skirt);

    this.torso = new THREE.Group();
    this.torso.position.y = 1.6;
    g.add(this.torso);

    // barrel chest, wider than it is tall
    const chest = box(1.9, 1.0, 1.25, ORANGE);
    chest.position.y = 0.55;
    const belly = box(1.5, 0.4, 1.1, CREAM);
    belly.position.y = -0.05;
    const vent = box(0.9, 0.22, 0.1, DARK);
    vent.position.set(0, 0.75, 0.65);
    const core = box(0.34, 0.34, 0.14, GLASS, 0x2b6f7a);
    core.position.set(0, 0.42, 0.66);
    this.torso.add(chest, belly, vent, core);

    // oversized round shoulders
    for (const side of [-1, 1]) {
      const pad = box(0.86, 0.8, 0.94, ORANGE);
      pad.position.set(side * 1.28, 0.72, 0);
      const cap = box(0.9, 0.2, 0.98, CREAM);
      cap.position.set(side * 1.28, 1.16, 0);
      const trim = box(0.14, 0.5, 0.6, STEEL);
      pad.position.y = 0.72;
      trim.position.set(side * 1.74, 0.72, 0);
      this.torso.add(pad, cap, trim);
      // short thick arms
      const upper = box(0.5, 0.62, 0.55, CREAM);
      upper.position.set(side * 1.28, 0.05, 0);
      const fist = box(0.6, 0.44, 0.62, STEEL);
      fist.position.set(side * 1.28, -0.42, 0.05);
      this.torso.add(upper, fist);
    }

    // slab shield on the left, shoulder cannon on the right
    const shield = box(0.22, 1.5, 1.25, CREAM);
    shield.position.set(-1.85, 0.2, 0.1);
    const shieldBar = box(0.1, 1.5, 0.3, ORANGE);
    shieldBar.position.set(-1.97, 0.2, 0.1);
    this.torso.add(shield, shieldBar);

    this.cannon = box(0.46, 0.46, 1.5, STEEL);
    this.cannon.position.set(1.3, 1.28, 0.35);
    const muzzle = box(0.3, 0.3, 0.28, DARK);
    muzzle.position.set(1.3, 1.28, 1.2);
    this.torso.add(this.cannon, muzzle);

    // small head sunk between the shoulders
    const head = box(0.62, 0.48, 0.6, CREAM);
    head.position.y = 1.32;
    const visor = box(0.5, 0.16, 0.1, GLASS, 0x2b6f7a);
    visor.position.set(0, 1.34, 0.32);
    const horn = box(0.1, 0.34, 0.1, ORANGE);
    horn.position.set(0, 1.66, 0.16);
    this.torso.add(head, visor, horn);

    g.visible = false;
  }

  private makeLeg(x: number): THREE.Group {
    const CREAM = this.pal.trim, ORANGE = this.pal.main, STEEL = this.pal.metal;
    const leg = new THREE.Group();
    leg.position.set(x, 1.3, 0);
    const thigh = box(0.66, 0.6, 0.72, CREAM);
    thigh.position.y = -0.34;
    const shin = box(0.78, 0.6, 0.84, ORANGE);
    shin.position.y = -0.92;
    const foot = box(0.94, 0.3, 1.15, STEEL);
    foot.position.set(0, -1.32, 0.16);
    leg.add(thigh, shin, foot);
    return leg;
  }

  /** Bring the frame into the fight beside the player. */
  deploy(at: THREE.Vector3): void {
    this.active = true;
    this.group.visible = true;
    this.group.position.copy(at);
    this.fireT = 1.5;
  }

  retire(): void {
    this.active = false;
    this.group.visible = false;
  }

  update(dt: number, t: number, ctx: AllyCtx): void {
    if (!this.active) return;
    const pos = this.group.position;

    // hold station off the player's shoulder rather than crowding them
    const want = ctx.playerPos.clone();
    want.x += Math.sin(t * 0.25) * 4 - 13;
    want.z += Math.cos(t * 0.25) * 4 + 9;
    const dx = want.x - pos.x, dz = want.z - pos.z;
    const dist = Math.hypot(dx, dz);
    const speed = Math.min(26, 6 + dist * 0.9);
    if (dist > 3) {
      pos.x += (dx / dist) * speed * dt;
      pos.z += (dz / dist) * speed * dt;
    }
    // settle onto whatever it is standing on
    const gy = ctx.world.groundHeight(pos.x, pos.z, 60);
    pos.y += ((gy > 40 ? 0 : gy) - pos.y) * Math.min(1, dt * 4);

    // face the target if there is one, otherwise the way it is walking
    const look = ctx.target ?? want;
    const want2 = Math.atan2(look.x - pos.x, look.z - pos.z);
    let d = want2 - this.yaw;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    this.yaw += d * Math.min(1, dt * 4);
    this.group.rotation.y = this.yaw;

    // heavy waddle: short strides, lots of body roll
    const moving = dist > 3;
    this.bob += dt * (moving ? 9 : 1.6);
    const swing = moving ? 0.5 : 0.06;
    this.legL.rotation.x = Math.sin(this.bob) * swing;
    this.legR.rotation.x = -Math.sin(this.bob) * swing;
    this.group.rotation.z = Math.sin(this.bob) * (moving ? 0.06 : 0.015);
    this.torso.position.y = 1.6 + Math.abs(Math.sin(this.bob)) * (moving ? 0.1 : 0.03);

    // put rounds downrange
    this.fireT -= dt;
    if (ctx.target && this.fireT <= 0) {
      this.fireT = 1.1 + Math.random() * 0.7;
      const from = pos.clone();
      from.y += 2.6 * 2.0;
      this.cannon.position.z = 0.05; // recoil, eased back below
      ctx.fire(from, ctx.target);
    }
    this.cannon.position.z += (0.35 - this.cannon.position.z) * Math.min(1, dt * 6);
  }
}
