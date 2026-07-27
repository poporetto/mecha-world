// Player controller: third-person movement, voxel AABB collision, abilities.

import * as THREE from 'three';
import { World } from '../core/world';
import { MechaModel } from './mecha';

const HALF = 1.7; // half-width of collision box
const HEIGHT = 9.3;
const GRAVITY = 34;
const JUMP_V = 17;
const WALK = 14;
const RUN = 23;
const FLY_V = 15;

export interface Abilities {
  beam: boolean;
  boots: boolean; // rocket boots — on from the start
  thrust: boolean; // overdrive: faster, higher flight
  nova: boolean;
  shield: boolean;
  blades: boolean; // twin sabers: faster, harder combo
  quake: boolean; // ground-slam shockwave
}

export class Player {
  model = new MechaModel();
  pos = new THREE.Vector3(2.5, 2, 2.5);
  vel = new THREE.Vector3();
  yaw = 0; // facing of the model
  grounded = false;
  /** True while standing on a moving platform (an airliner deck). The plane
   *  check runs after update(), so this carries over one frame and keeps the
   *  mecha in a standing pose instead of flipping to the flight animation. */
  onPlatform = false;
  hp = 100;
  maxHp = 100;
  // rocket boots ship with the mecha; everything else is earned from bosses
  abilities: Abilities = {
    beam: false, boots: true, thrust: false, nova: false,
    shield: false, blades: false, quake: false,
  };
  private animT = 0;
  private dashVel = new THREE.Vector3();
  private dashTime = 0;

  constructor(private world: World) {}

  respawn(): void {
    this.pos.set(2.5, this.world.groundHeight(2.5, 2.5) + 1, 2.5);
    this.vel.set(0, 0, 0);
    this.hp = this.maxHp;
  }

  update(dt: number, moveX: number, moveZ: number, camYaw: number, jump: boolean, run: boolean): void {
    // desired horizontal velocity in camera space
    // overdrive also makes the boost sprint noticeably quicker
    const speed = run ? (this.abilities.thrust ? RUN * 1.45 : RUN) : WALK;
    let vx = 0, vz = 0;
    if (moveX !== 0 || moveZ !== 0) {
      const len = Math.hypot(moveX, moveZ);
      const nx = moveX / len, nz = moveZ / len;
      const sin = Math.sin(camYaw), cos = Math.cos(camYaw);
      vx = (nx * cos - nz * sin) * speed;
      vz = (nx * -sin - nz * cos) * speed;
      const targetYaw = Math.atan2(vx, vz);
      let d = targetYaw - this.yaw;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      this.yaw += d * Math.min(1, dt * 12);
    }
    this.vel.x = vx;
    this.vel.z = vz;
    // dash impulse decays over its short lifetime, layered on top of input
    if (this.dashTime > 0) {
      this.dashTime -= dt;
      this.vel.x += this.dashVel.x;
      this.vel.z += this.dashVel.z;
      this.dashVel.multiplyScalar(Math.max(0, 1 - dt * 4));
    }

    // A deck counts as ground: you stand on it, and jumping lifts off it.
    const standing = this.grounded || this.onPlatform;
    if (this.abilities.boots && jump && !standing) {
      // overdrive thrusters climb harder and top out higher
      const climb = this.abilities.thrust ? 150 : 80;
      const top = this.abilities.thrust ? FLY_V * 1.9 : FLY_V;
      this.vel.y = Math.min(this.vel.y + climb * dt, top);
      this.model.setThrusters(true);
    } else {
      // never light the thrusters while planted on ground or a deck
      this.model.setThrusters(this.abilities.boots && jump && !standing);
      this.vel.y -= GRAVITY * dt;
    }
    if (jump && standing) {
      this.vel.y = JUMP_V;
      this.grounded = false;
      this.onPlatform = false; // released — the plane check will confirm
    }
    this.vel.y = Math.max(this.vel.y, -40);

    this.moveAxis(0, this.vel.x * dt);
    this.moveAxis(2, this.vel.z * dt);
    this.grounded = false;
    this.moveAxis(1, this.vel.y * dt);
    if (this.pos.y < 0.5) {
      this.pos.y = 0.5;
      this.vel.y = 0;
      this.grounded = true;
    }

    this.animT += dt;
    const hspeed = Math.hypot(this.vel.x, this.vel.z);
    this.model.group.position.copy(this.pos);
    this.model.group.rotation.y = this.yaw;
    this.model.animate(this.animT, hspeed, this.grounded || this.onPlatform, dt);
  }

  private collides(px: number, py: number, pz: number): boolean {
    const x0 = Math.floor(px - HALF), x1 = Math.floor(px + HALF);
    const y0 = Math.floor(py), y1 = Math.floor(py + HEIGHT - 0.01);
    const z0 = Math.floor(pz - HALF), z1 = Math.floor(pz + HALF);
    for (let y = y0; y <= y1; y++) {
      for (let z = z0; z <= z1; z++) {
        for (let x = x0; x <= x1; x++) {
          if (this.world.solidAt(x, y, z)) return true;
        }
      }
    }
    return false;
  }

  private moveAxis(axis: 0 | 1 | 2, delta: number): void {
    if (delta === 0) return;
    const p = this.pos;
    const key = axis === 0 ? 'x' : axis === 1 ? 'y' : 'z';
    p[key] += delta;
    if (!this.collides(p.x, p.y, p.z)) return;
    // step back to boundary
    if (axis === 1) {
      if (delta < 0) {
        p.y = Math.floor(p.y) + 1.001;
        this.grounded = true;
      } else {
        p.y = Math.floor(p.y + HEIGHT) - HEIGHT - 0.001;
      }
      this.vel.y = 0;
    } else {
      const sign = Math.sign(delta);
      if (sign > 0) p[key] = Math.floor(p[key] + HALF) - HALF - 0.001;
      else p[key] = Math.floor(p[key] - HALF) + 1 + HALF + 0.001;
      // auto step-up over 1-block curbs
      if (this.grounded && !this.collides(p.x + (axis === 0 ? delta : 0), p.y + 1.05, p.z + (axis === 2 ? delta : 0))) {
        const tryPos = p[key] + delta;
        const old = p[key];
        p[key] = tryPos;
        p.y += 1.05;
        if (this.collides(p.x, p.y, p.z)) {
          p[key] = old;
          p.y -= 1.05;
        }
      }
      if (axis === 0) this.vel.x = 0;
      else this.vel.z = 0;
    }
  }

  // Evasive burst: a decaying horizontal impulse layered on normal movement.
  dash(dir: THREE.Vector3): void {
    this.dashVel.set(dir.x, 0, dir.z).normalize().multiplyScalar(52);
    this.dashTime = 0.28;
    if (this.grounded) this.vel.y = 6;
    this.yaw = Math.atan2(dir.x, dir.z);
  }

  damage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount);
  }

  heal(amount: number): void {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }
}
