// Floodwater simulation. The aqua blaster drops shallow water that spreads
// outward across open ground and slowly drains away, leaving puddles. Water
// sits as Puddle blocks (non-solid) one layer above the ground surface.

import { B } from '../core/blocks';
import { World } from '../core/world';

const CAP = 900; // max live water cells
const DRAIN = 9; // seconds a puddle lasts before drying
const SPREAD_EVERY = 0.4;

interface Cell {
  x: number; y: number; z: number;
  age: number;
  spreadT: number;
}

export interface FloodResult {
  dirty: Set<string>;
}

export class FloodManager {
  private cells = new Map<string, Cell>();

  get count(): number {
    return this.cells.size;
  }

  private key(x: number, y: number, z: number): string {
    return x + ',' + y + ',' + z;
  }

  // Place water on the ground surface within a radius (aqua blaster splash).
  floodSphere(world: World, px: number, pz: number, r: number): Set<string> {
    const dirty = new Set<string>();
    const x0 = Math.floor(px - r), x1 = Math.ceil(px + r);
    const z0 = Math.floor(pz - r), z1 = Math.ceil(pz + r);
    const r2 = r * r;
    for (let z = z0; z <= z1; z++) {
      for (let x = x0; x <= x1; x++) {
        const dx = x + 0.5 - px, dz = z + 0.5 - pz;
        if (dx * dx + dz * dz > r2) continue;
        this.wet(world, x, z, dirty);
      }
    }
    return dirty;
  }

  // Put a puddle just above the ground column at (x,z) if there's room.
  private wet(world: World, x: number, z: number, dirty: Set<string>): boolean {
    if (this.cells.size >= CAP) return false;
    const gy = world.groundHeight(x, z, 40);
    if (gy < 1 || gy > 40) return false; // skip rooftops / voids
    const above = world.getBlock(x, gy, z);
    if (above !== B.Air) return false; // occupied
    const k = this.key(x, gy, z);
    if (this.cells.has(k)) return false;
    world.setBlock(x, gy, z, B.Puddle);
    this.cells.set(k, { x, y: gy, z, age: 0, spreadT: SPREAD_EVERY * Math.random() });
    for (const d of world.dirtyKeysFor(x, z)) dirty.add(d);
    return true;
  }

  update(dt: number, world: World): FloodResult | null {
    if (this.cells.size === 0) return null;
    const dirty = new Set<string>();
    const spawn: [number, number][] = [];

    for (const [k, c] of this.cells) {
      // gone (overwritten by terrain edits) — forget it
      if (world.getBlock(c.x, c.y, c.z) !== B.Puddle) { this.cells.delete(k); continue; }
      c.age += dt;
      c.spreadT -= dt;
      if (c.spreadT <= 0 && this.cells.size < CAP) {
        c.spreadT = SPREAD_EVERY;
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const d = dirs[(Math.random() * 4) | 0];
        spawn.push([c.x + d[0], c.z + d[1]]);
      }
      if (c.age >= DRAIN) {
        if (world.getBlock(c.x, c.y, c.z) === B.Puddle) world.setBlock(c.x, c.y, c.z, B.Air);
        for (const dk of world.dirtyKeysFor(c.x, c.z)) dirty.add(dk);
        this.cells.delete(k);
      }
    }
    for (const [x, z] of spawn) this.wet(world, x, z, dirty);

    return dirty.size > 0 ? { dirty } : null;
  }
}
