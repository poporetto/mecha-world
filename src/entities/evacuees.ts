// Civilians displaced by the fighting.
//
// Every building that comes down turns into people on the street, and those
// people run to the nearest shelter and go inside. That is the cost of
// levelling a block: the wards fill up. Fill one past capacity and the run
// ends just as surely as losing one.
//
// They use the same little person model as the street civilians, with the
// same arms-up flee animation, so a crowd streaming toward a ward reads as
// the people who were already living there.

import * as THREE from 'three';
import { World } from '../core/world';
import { makePerson } from './npcs';

const MAX_ACTIVE = 46;  // matches the street population, so the city stays cheap
const SPEED = 7.5;
const ARRIVE = 17;      // close enough to count as inside

interface Walker {
  group: THREE.Group;
  armL: THREE.Mesh;
  armR: THREE.Mesh;
  pos: THREE.Vector3;
  target: THREE.Vector3;
  shelter: number; // index into the shelter list
  phase: number;
}

export class EvacueeManager {
  group = new THREE.Group();
  private walkers: Walker[] = [];
  private pool: Walker[] = [];
  private seed = 1;

  /** Total who have reached a ward and gone inside, per shelter index. */
  arrived: number[] = [];

  constructor(shelterCount: number) {
    this.arrived = new Array(shelterCount).fill(0);
  }

  get walking(): number {
    return this.walkers.length;
  }

  private take(): Walker {
    const reused = this.pool.pop();
    if (reused) {
      reused.group.visible = true;
      this.group.add(reused.group);
      return reused;
    }
    const { group, armL, armR } = makePerson(this.seed++);
    // scaled up so they read against a mecha rather than vanishing
    group.scale.setScalar(3.2);
    this.group.add(group);
    return {
      group, armL, armR,
      pos: new THREE.Vector3(),
      target: new THREE.Vector3(),
      shelter: 0,
      phase: Math.random() * 10,
    };
  }

  private release(w: Walker): void {
    this.group.remove(w.group);
    w.group.visible = false;
    this.pool.push(w);
  }

  /**
   * A building came down here — turn the rubble into people heading for
   * cover. `weight` scales roughly with how much was destroyed.
   */
  displace(at: THREE.Vector3, weight: number, shelters: (THREE.Vector3 | null)[], world: World): void {
    if (shelters.length === 0) return;
    const n = Math.min(6, 1 + Math.floor(weight));
    for (let i = 0; i < n; i++) {
      if (this.walkers.length >= MAX_ACTIVE) break;
      // Nearest ward wins — people run for the cover they can see. Retired
      // wards come through as null and are skipped, but keep their slot so
      // the indices stay aligned with `arrived` and the manager's admit().
      let best = -1, bestD = Infinity;
      for (let s = 0; s < shelters.length; s++) {
        const site = shelters[s];
        if (!site) continue;
        const d = site.distanceToSquared(at);
        if (d < bestD) { bestD = d; best = s; }
      }
      if (best < 0) return; // nowhere left to run to
      const target = shelters[best]!;
      const a = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 10;
      const x = at.x + Math.sin(a) * r, z = at.z + Math.cos(a) * r;
      const w = this.take();
      w.pos.set(x, world.groundHeight(x, z, 60), z);
      w.target = target;
      w.shelter = best;
      w.phase = Math.random() * 10;
      this.walkers.push(w);
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
        this.release(w);
        this.walkers.splice(i, 1);
        continue;
      }
      w.pos.x += (dx / d) * SPEED * dt;
      w.pos.z += (dz / d) * SPEED * dt;
      w.pos.y += (world.groundHeight(w.pos.x, w.pos.z, 60) - w.pos.y) * Math.min(1, dt * 6);

      w.group.position.copy(w.pos);
      w.group.position.y += Math.abs(Math.sin(t * 16 + w.phase)) * 0.2; // hurried bob
      w.group.rotation.y = Math.atan2(dx, dz);
      // arms up, same as the street civilians do when they are fleeing
      w.armL.rotation.x = Math.PI - 0.3 + Math.sin(t * 14 + w.phase) * 0.2;
      w.armR.rotation.x = Math.PI - 0.3 - Math.sin(t * 14 + w.phase) * 0.2;
    }
    return reached;
  }

  reset(): void {
    for (const w of this.walkers) this.release(w);
    this.walkers.length = 0;
    this.arrived.fill(0);
  }
}
