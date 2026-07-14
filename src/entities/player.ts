// Player controller: third-person movement, voxel AABB collision, abilities.

import * as THREE from 'three';
import { World } from '../core/world';
import { MechaModel } from './mecha';

const HALF = 0.85; // half-width of collision box
const HEIGHT = 4.3;
const GRAVITY = 32;
const JUMP_V = 13;
const WALK = 10;
const RUN = 16;
const FLY_V = 11;

export interface Abilities {
  beam: boolean;
  boots: boolean;
}

export class Player {
  model = new MechaModel();
  pos = new THREE.Vector3(2.5, 2, 2.5);
  vel = new THREE.Vector3();
  yaw = 0; // facing of the model
  grounded = false;
  hp = 100;
  maxHp = 100;
  abilities: Abilities = { beam: false, boots: false };
  private animT = 0;

  constructor(private world: World) {}

  respawn(): void {
    this.pos.set(2.5, this.world.groundHeight(2.5, 2.5) + 1, 2.5);
    this.vel.set(0, 0, 0);
    this.hp = this.maxHp;
  }

  update(dt: number, moveX: number, moveZ: number, camYaw: number, jump: boolean, run: boolean): void {
    // desired horizontal velocity in camera space
    const speed = run ? RUN : WALK;
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

    if (this.abilities.boots && jump && !this.grounded) {
      this.vel.y = Math.min(this.vel.y + 80 * dt, FLY_V);
      this.model.setThrusters(true);
    } else {
      this.model.setThrusters(this.abilities.boots && jump);
      this.vel.y -= GRAVITY * dt;
    }
    if (jump && this.grounded) {
      this.vel.y = JUMP_V;
      this.grounded = false;
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
    this.model.animate(this.animT, hspeed, this.grounded, dt);
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

  damage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount);
  }

  heal(amount: number): void {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }
}
