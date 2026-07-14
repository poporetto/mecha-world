// Boss monsters. Defeating each one grants the player an upgrade.

import * as THREE from 'three';
import { World } from '../core/world';

export type Reward = 'beam' | 'boots' | 'nova' | 'shield' | 'repair';

export interface MonsterCtx {
  world: World;
  playerPos: THREE.Vector3;
  destroyAt: (p: THREE.Vector3, r: number, shake: number) => void;
  damagePlayer: (amount: number) => void;
  fireRocket?: (from: THREE.Vector3, toward: THREE.Vector3) => void;
  throwBoulder?: (from: THREE.Vector3, toward: THREE.Vector3) => void;
  zapAt?: (p: THREE.Vector3) => void;
}

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
}

export abstract class Monster {
  group = new THREE.Group();
  hp: number;
  maxHp: number;
  dead = false; // true once death animation done (remove from scene)
  dying = false;
  protected deathT = 0;
  protected flashT = 0;
  abstract name: string;
  abstract reward: Reward;
  hitRadius = 8;

  constructor(hp: number) {
    this.hp = hp;
    this.maxHp = hp;
  }

  takeDamage(amount: number): void {
    if (this.dying) return;
    this.hp = Math.max(0, this.hp - amount);
    this.flashT = 0.12;
    if (this.hp <= 0) this.dying = true;
  }

  protected updateFlash(dt: number): void {
    this.flashT -= dt;
    const flash = this.flashT > 0;
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const mat = m.material as THREE.MeshLambertMaterial;
        mat.emissive.setHex(flash ? 0xff2222 : (mat.userData.baseEmissive ?? 0));
        mat.emissiveIntensity = flash ? 0.8 : (mat.userData.baseEmissive ? 1 : 0);
      }
    });
  }

  protected rememberEmissives(): void {
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const mat = m.material as THREE.MeshLambertMaterial;
        mat.userData.baseEmissive = mat.emissive.getHex() || 0;
      }
    });
  }

  protected updateDeath(dt: number): boolean {
    if (!this.dying) return false;
    this.deathT += dt;
    if (this.deathT < 1.6) {
      this.group.rotation.z = Math.min(Math.PI / 2, this.deathT * 1.4);
    } else {
      this.group.position.y -= dt * 2.5;
      if (this.deathT > 5) this.dead = true;
    }
    return true;
  }

  abstract update(dt: number, t: number, ctx: MonsterCtx): void;
}

// ------------------------------------------------------------------- Kaiju

export const MONSTER_SCALE = 2.2;

export class Kaiju extends Monster {
  name = 'GORGOSAUR';
  reward: Reward = 'beam';
  hitRadius = 19;
  private legL: THREE.Mesh;
  private legR: THREE.Mesh;
  private tail: THREE.Group;
  private heading = 0;
  private stompT = 0;
  private retargetT = 0;
  private target = new THREE.Vector3();

  constructor(x: number, z: number) {
    super(140);
    const BODY = 0x50614a;
    const BELLY = 0x8a9478;
    const SPIKE = 0xd8e6ee;

    const body = box(5, 4.5, 8, BODY);
    body.position.set(0, 7, 0);
    const belly = box(4.2, 3, 6.5, BELLY);
    belly.position.set(0, 6, 0.5);
    const head = box(2.8, 2.6, 4, BODY);
    head.position.set(0, 10.5, 4.8);
    const jaw = box(2.2, 0.9, 3, BELLY);
    jaw.position.set(0, 9.2, 5.2);
    const eyeL = box(0.5, 0.5, 0.5, 0xffa020, 0xffa020);
    eyeL.position.set(-1.1, 11, 6.4);
    const eyeR = eyeL.clone();
    eyeR.position.x = 1.1;
    this.legL = box(1.8, 6, 2.4, BODY);
    this.legL.position.set(-2, 3, -1);
    this.legR = this.legL.clone();
    this.legR.position.x = 2;
    const armL = box(1, 2.6, 1, BODY);
    armL.position.set(-2.6, 8, 2.5);
    const armR = armL.clone();
    armR.position.x = 2.6;

    this.tail = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const seg = box(2.2 - i * 0.4, 2.2 - i * 0.4, 3, BODY);
      seg.position.set(0, 6.5 - i * 0.7, -5.5 - i * 2.6);
      this.tail.add(seg);
    }
    for (let i = 0; i < 5; i++) {
      const spike = box(0.7, 1.6 + (i === 2 ? 1 : 0), 0.9, SPIKE);
      spike.position.set(0, 9.8 + (i === 2 ? 0.5 : 0), 2.5 - i * 1.8);
      spike.rotation.x = 0.3;
      this.group.add(spike);
    }
    this.group.add(body, belly, head, jaw, eyeL, eyeR, this.legL, this.legR, armL, armR, this.tail);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    this.retargetT -= dt;
    if (this.retargetT <= 0) {
      // stalk the area around the player, plowing through the city
      const a = Math.random() * Math.PI * 2;
      this.target.set(ctx.playerPos.x + Math.sin(a) * 30, 0, ctx.playerPos.z + Math.cos(a) * 30);
      this.retargetT = 7 + Math.random() * 5;
    }
    const dx = this.target.x - this.group.position.x;
    const dz = this.target.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz);
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 1.5);
    this.group.rotation.y = this.heading;

    if (dist > 4) {
      const speed = 4.5;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 12 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 3);

    // animate
    this.legL.rotation.x = Math.sin(t * 4) * 0.5;
    this.legR.rotation.x = -Math.sin(t * 4) * 0.5;
    this.tail.rotation.y = Math.sin(t * 1.7) * 0.25;

    // stomp: carve the city under and ahead of it
    this.stompT -= dt;
    if (this.stompT <= 0) {
      this.stompT = 1.1;
      const fwd = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
      const p = this.group.position.clone().addScaledVector(fwd, 11);
      p.y = this.group.position.y + 8;
      ctx.destroyAt(p, 8, 0.5);
      const feet = this.group.position.clone();
      feet.y += 2;
      ctx.destroyAt(feet, 6, 0.3);
      if (this.group.position.distanceTo(ctx.playerPos) < 20) {
        ctx.damagePlayer(14);
      }
    }
  }
}

// ------------------------------------------------------------ Rocket beast

export class RocketBeast extends Monster {
  name = 'MISSILE MAW';
  reward: Reward = 'boots';
  hitRadius = 15;
  private orbitA = Math.random() * Math.PI * 2;
  private fireT = 3;
  private podL: THREE.Mesh;
  private podR: THREE.Mesh;

  constructor(x: number, z: number) {
    super(160);
    const HULL = 0x5b4a9e;
    const DARK = 0x2c2a38;

    const body = box(4.5, 3.5, 5.5, HULL);
    body.position.y = 8;
    const head = box(2.6, 2, 2.8, DARK);
    head.position.set(0, 9.6, 3.4);
    const eye = box(1.8, 0.5, 0.3, 0xff3355, 0xff3355);
    eye.position.set(0, 9.8, 4.9);
    this.podL = box(1.6, 1.6, 3, DARK);
    this.podL.position.set(-3.2, 9.6, 0);
    this.podR = this.podL.clone();
    this.podR.position.x = 3.2;
    const tubesL = box(1.2, 1.2, 0.4, 0xff7a2f, 0xff7a2f);
    tubesL.position.set(-3.2, 9.6, 1.6);
    const tubesR = tubesL.clone();
    tubesR.position.x = 3.2;
    const legL = box(1.2, 5, 1.6, HULL);
    legL.position.set(-1.6, 4, 0);
    const legR = legL.clone();
    legR.position.x = 1.6;
    const jetL = box(0.9, 0.6, 0.9, 0x39e6e0, 0x39e6e0);
    jetL.position.set(-1.6, 1.2, 0);
    const jetR = jetL.clone();
    jetR.position.x = 1.6;
    this.group.add(body, head, eye, this.podL, this.podR, tubesL, tubesR, legL, legR, jetL, jetR);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    // hover-orbit around the player
    this.orbitA += dt * 0.15;
    const R = 34;
    const tx = ctx.playerPos.x + Math.sin(this.orbitA) * R;
    const tz = ctx.playerPos.z + Math.cos(this.orbitA) * R;
    this.group.position.x += (tx - this.group.position.x) * Math.min(1, dt * 0.8);
    this.group.position.z += (tz - this.group.position.z) * Math.min(1, dt * 0.8);
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 40);
    const targetY = gy + 9 + Math.sin(t * 1.3) * 2.5;
    this.group.position.y += (targetY - this.group.position.y) * Math.min(1, dt * 2);

    // face player
    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    this.group.rotation.y = Math.atan2(dx, dz);

    this.fireT -= dt;
    if (this.fireT <= 0 && ctx.fireRocket) {
      this.fireT = 3.2;
      const from = this.group.position.clone();
      from.y += 9.6 * MONSTER_SCALE;
      ctx.fireRocket(from, ctx.playerPos.clone().setY(ctx.playerPos.y + 2));
    }
  }
}

// ------------------------------------------------------------ Volt Serpent

export class VoltSerpent extends Monster {
  name = 'VOLT SERPENT';
  reward: Reward = 'nova';
  hitRadius = 13;
  private segments: THREE.Group[] = [];
  private trail: THREE.Vector3[] = [];
  private trailT = 0;
  private zapT = 5;
  private heading = 0;

  constructor(x: number, z: number) {
    super(200);
    const SCALE1 = 0x8a6fd8; // violet
    const SCALE2 = 0xf8dfa2; // pale gold

    // head
    const head = new THREE.Group();
    const skull = box(3.2, 2.6, 4, SCALE1);
    skull.position.y = 3;
    const jaw = box(2.6, 0.8, 3.2, SCALE2);
    jaw.position.set(0, 1.8, 0.6);
    const eyeL = box(0.5, 0.5, 0.5, 0x39e6ff, 0x39e6ff);
    eyeL.position.set(-1.2, 3.6, 1.8);
    const eyeR = eyeL.clone();
    eyeR.position.x = 1.2;
    const hornL = box(0.5, 1.8, 0.5, 0xfff2b0, 0xfff2b0);
    hornL.position.set(-1.1, 5, -0.8);
    hornL.rotation.z = 0.3;
    const hornR = hornL.clone();
    hornR.position.x = 1.1;
    hornR.rotation.z = -0.3;
    head.add(skull, jaw, eyeL, eyeR, hornL, hornR);
    this.group.add(head);

    // body segments live directly in the scene-space group
    for (let i = 0; i < 8; i++) {
      const seg = new THREE.Group();
      const s = 2.6 - i * 0.22;
      const core = box(s, s, s + 0.8, i % 2 === 0 ? SCALE1 : SCALE2);
      core.position.y = s / 2 + 0.5;
      const spike = box(0.4, 1.2, 0.4, 0x39e6e0, 0x39e6e0);
      spike.position.y = s + 1;
      seg.add(core, spike);
      this.segments.push(seg);
    }
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.rememberEmissives();
  }

  // segments are children of group but positioned in group-local space
  // along a breadcrumb trail left by the head.
  addSegmentsTo(scene: THREE.Object3D): void {
    for (const s of this.segments) scene.add(s);
  }

  removeSegmentsFrom(scene: THREE.Object3D): void {
    for (const s of this.segments) scene.remove(s);
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) {
      // segments sink with the head
      for (const s of this.segments) s.position.y -= dt * 4;
      return;
    }

    // slither toward the player with a weaving sine
    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz) + Math.sin(t * 2.2) * 0.7;
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 2.5);
    this.group.rotation.y = this.heading;
    if (dist > 14) {
      const speed = 9;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 14 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 4);

    // breadcrumb trail for the body
    this.trailT -= dt;
    if (this.trailT <= 0) {
      this.trailT = 0.09;
      this.trail.unshift(this.group.position.clone());
      if (this.trail.length > 60) this.trail.pop();
    }
    for (let i = 0; i < this.segments.length; i++) {
      const target = this.trail[Math.min((i + 1) * 5, this.trail.length - 1)];
      if (target) {
        this.segments[i].position.copy(target);
        this.segments[i].position.y = target.y + Math.sin(t * 6 + i) * 0.4;
        this.segments[i].scale.setScalar(MONSTER_SCALE);
        const next = this.trail[Math.min(i * 5, this.trail.length - 1)];
        if (next) this.segments[i].lookAt(next.x, this.segments[i].position.y, next.z);
      }
    }

    // lightning strike at the player's position
    this.zapT -= dt;
    if (this.zapT <= 0 && dist < 70) {
      this.zapT = 4;
      const strike = ctx.playerPos.clone();
      if (ctx.zapAt) ctx.zapAt(strike);
      ctx.destroyAt(strike, 3.2, 0.3);
      if (ctx.playerPos.distanceTo(strike) < 8) ctx.damagePlayer(12);
    }
  }
}

// ----------------------------------------------------------- Iron Colossus

export class IronColossus extends Monster {
  name = 'IRON COLOSSUS';
  reward: Reward = 'shield';
  hitRadius = 17;
  private armL: THREE.Mesh;
  private armR: THREE.Mesh;
  private legL: THREE.Mesh;
  private legR: THREE.Mesh;
  private throwT = 4;
  private stompT = 0;
  private heading = 0;

  constructor(x: number, z: number) {
    super(260);
    const IRON = 0x8d939e;
    const RUST = 0xb87e5e;
    const DARK = 0x3c4048;

    const torso = box(7, 6, 4.5, IRON);
    torso.position.y = 9;
    const plate = box(5.5, 4, 0.8, RUST);
    plate.position.set(0, 9, 2.4);
    const core = box(1.6, 1.6, 0.5, 0xffb054, 0xff8a2f);
    core.position.set(0, 9.5, 2.7);
    const head = box(2.2, 1.8, 2.2, DARK);
    head.position.set(0, 13, 0.8);
    const eye = box(1.6, 0.4, 0.3, 0xff3355, 0xff3355);
    eye.position.set(0, 13.2, 2);
    const shoulderL = box(3, 2.5, 3, RUST);
    shoulderL.position.set(-5, 11.5, 0);
    const shoulderR = shoulderL.clone();
    shoulderR.position.x = 5;
    this.armL = box(2.2, 6.5, 2.4, IRON);
    this.armL.position.set(-5.2, 7, 0);
    this.armR = this.armL.clone();
    this.armR.position.x = 5.2;
    const fistL = box(2.6, 2, 2.6, DARK);
    fistL.position.set(-5.2, 3.4, 0);
    const fistR = fistL.clone();
    fistR.position.x = 5.2;
    this.legL = box(2.6, 6, 3, DARK);
    this.legL.position.set(-2, 3, 0);
    this.legR = this.legL.clone();
    this.legR.position.x = 2;
    this.group.add(torso, plate, core, head, eye, shoulderL, shoulderR, this.armL, this.armR, fistL, fistR, this.legL, this.legR);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz);
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 1.2);
    this.group.rotation.y = this.heading;

    if (dist > 26) {
      const speed = 2.6;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 14 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 2.5);

    this.legL.rotation.x = Math.sin(t * 2.2) * 0.3;
    this.legR.rotation.x = -Math.sin(t * 2.2) * 0.3;

    // slow devastating stomps
    this.stompT -= dt;
    if (this.stompT <= 0) {
      this.stompT = 1.6;
      const feet = this.group.position.clone();
      feet.y += 2;
      ctx.destroyAt(feet, 7, 0.4);
      if (dist < 22) ctx.damagePlayer(16);
    }

    // hurl a boulder in a high arc
    this.throwT -= dt;
    if (this.throwT <= 0 && ctx.throwBoulder && dist < 90) {
      this.throwT = 5;
      this.armR.rotation.x = -2.2; // wind-up pose, relaxes over time
      const from = this.group.position.clone();
      from.y += 13 * MONSTER_SCALE / 2.2 * 2.2;
      ctx.throwBoulder(from, ctx.playerPos.clone());
    }
    this.armR.rotation.x *= 1 - Math.min(1, dt * 2);
  }
}
