// Voxel debris particles via a single InstancedMesh pool.

import * as THREE from 'three';
import { BLOCK_COLORS } from '../core/blocks';

const MAX = 500;

interface Particle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  size: number;
  color: THREE.Color;
}

const dummy = new THREE.Object3D();

export class Debris {
  mesh: THREE.InstancedMesh;
  private particles: Particle[] = [];

  constructor() {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshLambertMaterial();
    this.mesh = new THREE.InstancedMesh(geo, mat, MAX);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    // touching instanceColor once allocates the attribute
    this.mesh.setColorAt(0, new THREE.Color(1, 1, 1));
  }

  burst(p: THREE.Vector3, blockIds: number[], n: number): void {
    for (let i = 0; i < n; i++) {
      if (this.particles.length >= MAX) this.particles.shift();
      const id = blockIds[i % Math.max(1, blockIds.length)] ?? 6;
      this.particles.push({
        pos: p.clone().add(new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3)),
        vel: new THREE.Vector3((Math.random() - 0.5) * 12, Math.random() * 12 + 3, (Math.random() - 0.5) * 12),
        life: 1 + Math.random() * 0.8,
        size: 0.25 + Math.random() * 0.45,
        color: new THREE.Color(BLOCK_COLORS[id] ?? 0x999999),
      });
    }
  }

  /** Directional hot-metal contact sparks. Reuses the bounded debris pool so
   * repeated beam/vulcan hits cannot create unbounded meshes or draw calls. */
  sparks(p: THREE.Vector3, away: THREE.Vector3, n = 10, hot = false): void {
    const direction = away.lengthSq() > 0.001 ? away.clone().normalize() : new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < n; i++) {
      if (this.particles.length >= MAX) this.particles.shift();
      const speed = 9 + Math.random() * (hot ? 20 : 13);
      const spread = new THREE.Vector3(
        (Math.random() - 0.5) * 1.1,
        Math.random() * 0.75,
        (Math.random() - 0.5) * 1.1,
      );
      const vel = direction.clone().multiplyScalar(speed).addScaledVector(spread, speed * 0.72);
      vel.y += 3 + Math.random() * 8;
      this.particles.push({
        pos: p.clone().add(new THREE.Vector3(
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.2,
        )),
        vel,
        life: 0.28 + Math.random() * (hot ? 0.5 : 0.3),
        size: 0.1 + Math.random() * (hot ? 0.22 : 0.14),
        color: new THREE.Color(Math.random() < 0.28 ? 0xffffff : hot ? 0xff7a20 : 0xffcf55),
      });
    }
  }

  update(dt: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0 || p.pos.y < -2) {
        this.particles.splice(i, 1);
        continue;
      }
      p.vel.y -= 28 * dt;
      p.pos.addScaledVector(p.vel, dt);
    }
    this.mesh.count = this.particles.length;
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const s = p.size * Math.min(1, p.life);
      dummy.position.copy(p.pos);
      dummy.scale.setScalar(s);
      dummy.rotation.set(p.life * 3, p.life * 5, 0);
      dummy.updateMatrix();
      this.mesh.setMatrixAt(i, dummy.matrix);
      this.mesh.setColorAt(i, p.color);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }
}
