// Explosion visuals: an expanding additive flash sphere + a plume of smoke
// puffs (instanced boxes that rise, tumble and shrink away).

import * as THREE from 'three';

const MAX_SMOKE = 300;

interface Flash {
  mesh: THREE.Mesh;
  life: number;
  maxLife: number;
  size: number;
}

interface Puff {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  gray: number;
}

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();
const flashGeo = new THREE.SphereGeometry(1, 12, 10);

export class Explosions {
  group = new THREE.Group();
  private flashes: Flash[] = [];
  private smoke: THREE.InstancedMesh;
  private puffs: Puff[] = [];

  constructor() {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
    this.smoke = new THREE.InstancedMesh(geo, mat, MAX_SMOKE);
    this.smoke.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.smoke.count = 0;
    this.smoke.frustumCulled = false;
    this.smoke.setColorAt(0, new THREE.Color(1, 1, 1));
    this.group.add(this.smoke);
  }

  boom(p: THREE.Vector3, radius: number): void {
    // fireball flash
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffb26a,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(flashGeo, mat);
    mesh.position.copy(p);
    mesh.scale.setScalar(radius * 0.3);
    this.group.add(mesh);
    this.flashes.push({ mesh, life: 0.28, maxLife: 0.28, size: radius });

    // smoke plume
    const n = Math.min(14, 5 + Math.floor(radius * 2));
    for (let i = 0; i < n; i++) {
      if (this.puffs.length >= MAX_SMOKE) this.puffs.shift();
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * radius * 0.7;
      this.puffs.push({
        pos: new THREE.Vector3(p.x + Math.sin(a) * r, p.y + (Math.random() - 0.4) * radius * 0.5, p.z + Math.cos(a) * r),
        vel: new THREE.Vector3((Math.random() - 0.5) * 3, 2.5 + Math.random() * 3.5, (Math.random() - 0.5) * 3),
        life: 0,
        maxLife: 1.1 + Math.random() * 0.9,
        size: 1.2 + Math.random() * radius * 0.5,
        gray: 0.35 + Math.random() * 0.4,
      });
    }
  }

  update(dt: number): void {
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      f.life -= dt;
      if (f.life <= 0) {
        this.group.remove(f.mesh);
        (f.mesh.material as THREE.Material).dispose();
        this.flashes.splice(i, 1);
        continue;
      }
      const k = 1 - f.life / f.maxLife;
      f.mesh.scale.setScalar(f.size * (0.3 + k * 1.4));
      (f.mesh.material as THREE.MeshBasicMaterial).opacity = 0.95 * (1 - k);
    }

    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const s = this.puffs[i];
      s.life += dt;
      if (s.life >= s.maxLife) this.puffs.splice(i, 1);
    }
    this.smoke.count = this.puffs.length;
    for (let i = 0; i < this.puffs.length; i++) {
      const s = this.puffs[i];
      const k = s.life / s.maxLife;
      s.pos.addScaledVector(s.vel, dt);
      s.vel.multiplyScalar(1 - dt * 0.6);
      const scale = s.size * (0.6 + k * 0.9) * (k > 0.75 ? (1 - k) / 0.25 : 1);
      dummy.position.copy(s.pos);
      dummy.scale.setScalar(Math.max(0.01, scale));
      dummy.rotation.set(k * 2 + i, k * 3, 0);
      dummy.updateMatrix();
      this.smoke.setMatrixAt(i, dummy.matrix);
      const g = s.gray * (1 - k * 0.4);
      tmpColor.setRGB(g, g, g * 1.05);
      this.smoke.setColorAt(i, tmpColor);
    }
    this.smoke.instanceMatrix.needsUpdate = true;
    if (this.smoke.instanceColor) this.smoke.instanceColor.needsUpdate = true;
  }
}
