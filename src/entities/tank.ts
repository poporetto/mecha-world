// KUROGANE — Kotetsu's mecha-tank.
//
// He is a support mechanic, not a pilot. Command put him in the only frame
// left, which is a tracked gun platform. It is slow, it hits like a falling
// building, and his aim is genuinely poor — shells drift wide and take the
// skyline with them. That collateral is the point, not a bug: he is a
// liability you are glad to have.

import * as THREE from 'three';
import { World } from '../core/world';

const HULL = 0x4d6472;
const PLATE = 0xd9e2e6;
const METAL = 0x7f8792;
const TRACK = 0x2b3138;
const GLASS = 0x8ef0c8;

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
}

export interface TankCtx {
  world: World;
  playerPos: THREE.Vector3;
  target: THREE.Vector3 | null;
  /** Lob a shell. `spread` is how far off-aim it already is. */
  fire: (from: THREE.Vector3, toward: THREE.Vector3) => void;
}

export class Tank {
  group = new THREE.Group();
  active = false;
  private turret: THREE.Group;
  private barrel: THREE.Mesh;
  private wheels: THREE.Mesh[] = [];
  private yaw = 0;
  private turretYaw = 0;
  private fireT = 4;

  /** How far his shots wander, in radians. He is not a good shot. */
  readonly spread = 0.16;

  constructor() {
    const g = this.group;
    g.scale.setScalar(2.0);

    // low wide hull sitting between two track units
    const hull = box(3.4, 1.1, 5.0, HULL);
    hull.position.y = 1.5;
    const glacis = box(3.2, 0.7, 1.4, PLATE);
    glacis.position.set(0, 1.4, 2.5);
    glacis.rotation.x = -0.4;
    const deck = box(3.0, 0.2, 4.2, PLATE);
    deck.position.y = 2.08;
    g.add(hull, glacis, deck);

    // tracks, with road wheels that spin while he trundles along
    for (const side of [-1, 1]) {
      const track = box(0.9, 1.5, 5.6, TRACK);
      track.position.set(side * 2.0, 0.9, 0);
      const guard = box(1.1, 0.25, 5.2, HULL);
      guard.position.set(side * 2.0, 1.75, 0);
      g.add(track, guard);
      for (let i = 0; i < 4; i++) {
        const w = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.5, 0.5, 8),
          new THREE.MeshLambertMaterial({ color: METAL })
        );
        w.rotation.z = Math.PI / 2;
        w.position.set(side * 2.0, 0.75, -1.9 + i * 1.25);
        g.add(w);
        this.wheels.push(w);
      }
    }

    // turret, offset so the huge gun looks like it barely fits
    this.turret = new THREE.Group();
    this.turret.position.y = 2.2;
    g.add(this.turret);
    const ring = box(2.2, 0.25, 2.2, METAL);
    const body = box(2.4, 1.1, 2.8, HULL);
    body.position.y = 0.65;
    const mantlet = box(1.2, 0.9, 0.7, PLATE);
    mantlet.position.set(0, 0.65, 1.5);
    const cupola = box(0.9, 0.5, 0.9, PLATE);
    cupola.position.set(-0.6, 1.35, -0.4);
    const vision = box(0.5, 0.2, 0.1, GLASS, 0x2b6f5a);
    vision.position.set(-0.6, 1.4, 0.06);
    // stowage: he is a mechanic, so the deck is covered in his kit
    const toolbox = box(0.9, 0.4, 0.7, 0xd8a24a);
    toolbox.position.set(0.8, 1.4, -0.9);
    const drum = box(0.55, 0.55, 0.55, 0xc9705a);
    drum.position.set(0.85, 1.45, 0.2);
    this.turret.add(ring, body, mantlet, cupola, vision, toolbox, drum);

    this.barrel = box(0.5, 0.5, 4.6, METAL);
    this.barrel.position.set(0, 0.65, 3.6);
    const brake = box(0.72, 0.72, 0.7, TRACK);
    brake.position.set(0, 0.65, 5.9);
    this.turret.add(this.barrel, brake);

    g.visible = false;
  }

  deploy(at: THREE.Vector3): void {
    this.active = true;
    this.group.visible = true;
    this.group.position.copy(at);
    this.fireT = 3;
  }

  retire(): void {
    this.active = false;
    this.group.visible = false;
  }

  update(dt: number, t: number, ctx: TankCtx): void {
    if (!this.active) return;
    const pos = this.group.position;

    // trundles after the player, well behind — this thing is slow
    const want = ctx.playerPos.clone();
    want.x += 22;
    want.z += 18;
    const dx = want.x - pos.x, dz = want.z - pos.z;
    const dist = Math.hypot(dx, dz);
    // A tracked support frame should never keep pace with a sprinting mecha.
    // It catches up eventually, but is deliberately far slower than Terra-Armor.
    const speed = Math.min(5, 1.4 + dist * 0.1);
    const moving = dist > 5;
    if (moving) {
      const groundY = ctx.world.groundHeight(pos.x, pos.z, 6);
      const nextX = pos.x + (dx / dist) * speed * dt;
      const nextZ = pos.z + (dz / dist) * speed * dt;
      const nextGroundY = ctx.world.groundHeight(nextX, nextZ, 6);
      // Do not treat a building wall as a ramp. The low scan only sees street
      // level terrain, and an upward step above one block is impassable.
      if (nextGroundY <= groundY + 1.1) {
        pos.x = nextX;
        pos.z = nextZ;
      }
      // hull turns slowly to face where it is going
      const wantYaw = Math.atan2(dx, dz);
      let d = wantYaw - this.yaw;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      this.yaw += d * Math.min(1, dt * 1.4);
    }
    this.group.rotation.y = this.yaw;

    const gy = ctx.world.groundHeight(pos.x, pos.z, 6);
    pos.y += (gy - pos.y) * Math.min(1, dt * 4);

    // road wheels spin with travel
    if (moving) for (const w of this.wheels) w.rotation.x += dt * 7;

    // turret tracks the target independently, and lazily
    if (ctx.target) {
      const wantT = Math.atan2(ctx.target.x - pos.x, ctx.target.z - pos.z) - this.yaw;
      let d = wantT - this.turretYaw;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      this.turretYaw += d * Math.min(1, dt * 1.1);
    }
    this.turret.rotation.y = this.turretYaw;

    // slow, heavy, wildly inaccurate fire
    this.fireT -= dt;
    if (ctx.target && this.fireT <= 0 && Math.abs(this.turretYaw) < Math.PI) {
      this.fireT = 3.4 + Math.random() * 1.8;
      const from = pos.clone();
      from.y += 2.85 * 2.0;
      this.barrel.position.z = 3.0; // recoil
      ctx.fire(from, ctx.target);
    }
    this.barrel.position.z += (3.6 - this.barrel.position.z) * Math.min(1, dt * 4);
  }
}
