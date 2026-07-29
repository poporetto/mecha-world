// Civilians displaced by the fighting.
//
// Every building that comes down turns into people on the street, and those
// people walk to the nearest shelter and go inside. That is the cost of
// levelling a block: the wards fill up. Fill one past capacity and the run
// ends just as surely as losing one.

import * as THREE from 'three';
import { World } from '../core/world';

const MAX_ACTIVE = 90;   // walkers rendered at once
const SPEED = 7.5;
const ARRIVE = 17;       // close enough to count as inside

interface Walker {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  shelter: number;   // index into the shelter list
  phase: number;     // walk cycle offset
}

const dummy = new THREE.Object3D();
const tint = new THREE.Color();

export class EvacueeManager {
  group = new THREE.Group();
  private walkers: Walker[] = [];
  private mesh: THREE.InstancedMesh;

  /** Total who have reached a ward and gone inside, per shelter index. */
  arrived: number[] = [];

  constructor(shelterCount: number) {
    this.arrived = new Array(shelterCount).fill(0);
    // one squat box per person — they read as a crowd, not individuals
    const geo = new THREE.BoxGeometry(1.1, 2.4, 1.1);
    geo.translate(0, 1.2, 0);
    const mat = new THREE.MeshLambertMaterial({ vertexColors: false, color: 0xffffff });
    this.mesh = new THREE.InstancedMesh(geo, mat, MAX_ACTIVE);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX_ACTIVE * 3), 3);
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    this.group.add(this.mesh);
  }

  get walking(): number {
    return this.walkers.length;
  }

  /**
   * A building came down here — turn the rubble into people heading for
   * cover. `weight` scales roughly with how much was destroyed.
   */
  displace(at: THREE.Vector3, weight: number, shelters: THREE.Vector3[], world: World): void {
    if (shelters.length === 0) return;
    const n = Math.min(8, 1 + Math.floor(weight));
    for (let i = 0; i < n; i++) {
      if (this.walkers.length >= MAX_ACTIVE) break;
      // nearest ward wins — people run for the cover they can see
      let best = 0, bestD = Infinity;
      for (let s = 0; s < shelters.length; s++) {
        const d = shelters[s].distanceToSquared(at);
        if (d < bestD) { bestD = d; best = s; }
      }
      const a = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 9;
      const x = at.x + Math.sin(a) * r, z = at.z + Math.cos(a) * r;
      this.walkers.push({
        pos: new THREE.Vector3(x, world.groundHeight(x, z, 60), z),
        target: shelters[best],
        shelter: best,
        phase: Math.random() * 6,
      });
    }
  }

  /** Advance the crowd. Returns how many reached a ward this frame, by index. */
  update(dt: number, t: number, world: World): number[] {
    const reached = new Array(this.arrived.length).fill(0);

    for (let i = this.walkers.length - 1; i >= 0; i--) {
      const w = this.walkers[i];
      const dx = w.target.x - w.pos.x, dz = w.target.z - w.pos.z;
      const d = Math.hypot(dx, dz);
      if (d < ARRIVE) {
        this.arrived[w.shelter]++;
        reached[w.shelter]++;
        this.walkers.splice(i, 1);
        continue;
      }
      w.pos.x += (dx / d) * SPEED * dt;
      w.pos.z += (dz / d) * SPEED * dt;
      w.pos.y += (world.groundHeight(w.pos.x, w.pos.z, 60) - w.pos.y) * Math.min(1, dt * 6);
    }

    this.mesh.count = this.walkers.length;
    for (let i = 0; i < this.walkers.length; i++) {
      const w = this.walkers[i];
      dummy.position.copy(w.pos);
      dummy.rotation.y = Math.atan2(w.target.x - w.pos.x, w.target.z - w.pos.z);
      // little hurried bob so a crowd reads as moving
      dummy.position.y += Math.abs(Math.sin(t * 9 + w.phase)) * 0.35;
      dummy.updateMatrix();
      this.mesh.setMatrixAt(i, dummy.matrix);
      // a few coat colours so it is not a block of clones
      const c = (i * 37) % 4;
      tint.setHex(c === 0 ? 0xe8dcc8 : c === 1 ? 0xc9d6e8 : c === 2 ? 0xe8c8d0 : 0xd4e0c8);
      this.mesh.setColorAt(i, tint);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    return reached;
  }

  reset(): void {
    this.walkers.length = 0;
    this.arrived.fill(0);
    this.mesh.count = 0;
  }
}
