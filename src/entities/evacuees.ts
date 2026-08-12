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
import { isOpenStreet } from '../core/worldgen';
import { makePerson } from './npcs';

const MAX_ACTIVE = 46;  // matches the street population, so the city stays cheap
const SPEED = 7.5;
const ARRIVE = 17;      // close enough to count as inside
const MAX_STEP = 0.72;  // civilians can step onto kerbs, never onto structures

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
      // A collapsed tower can report a point high inside its footprint. Search
      // outward for an actual street spawn so nobody materialises on rubble or
      // a surviving roof course.
      let x = at.x, z = at.z;
      for (let attempt = 0; attempt < 16; attempt++) {
        const a = Math.random() * Math.PI * 2;
        const r = 7 + Math.random() * 18;
        const sx = at.x + Math.sin(a) * r, sz = at.z + Math.cos(a) * r;
        if (!isOpenStreet(Math.floor(sx), Math.floor(sz))) continue;
        x = sx; z = sz;
        break;
      }
      const w = this.take();
      w.pos.set(x, world.groundHeight(x, z, 6), z);
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
      const desired = Math.atan2(dx, dz);
      const stride = SPEED * dt;
      // Try forward first, then progressively wider street-level detours. A
      // candidate is valid only if it remains on a generated road and the
      // terrain change is a human-sized step. Crucially, groundHeight is
      // capped just above the walker's feet, so skyscraper roofs are invisible
      // to pedestrian navigation.
      const steering = [0, 0.42, -0.42, 0.82, -0.82, 1.25, -1.25, Math.PI];
      let moved = false;
      for (const offset of steering) {
        const a = desired + offset + Math.sin(w.phase) * 0.035;
        const nx = w.pos.x + Math.sin(a) * stride;
        const nz = w.pos.z + Math.cos(a) * stride;
        if (!isOpenStreet(Math.floor(nx), Math.floor(nz))) continue;
        const ceiling = Math.max(3, Math.ceil(w.pos.y + MAX_STEP + 0.2));
        const gh = world.groundHeight(nx, nz, ceiling);
        if (Math.abs(gh - w.pos.y) > MAX_STEP) continue;
        if (world.getBlock(Math.floor(nx), Math.max(0, gh - 1), Math.floor(nz)) === 4) continue;
        w.pos.set(nx, gh, nz);
        moved = true;
        break;
      }
      if (!moved) w.phase += 0.6; // vary the next detour instead of hopping

      w.group.position.copy(w.pos);
      w.group.position.y += Math.abs(Math.sin(t * 16 + w.phase)) * 0.2; // hurried bob
      w.group.rotation.y = desired;
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
