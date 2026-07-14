// City recovery: damaged chunks heal back toward their pristine generated
// state after a grace period, a few blocks at a time (bottom-up, like
// scaffolding going up). game.ts spawns worker NPCs at active sites.

import { B, isSolid } from './blocks';
import { CS, H, generateChunkData } from './worldgen';
import { World } from './world';

const GRACE = 22; // seconds after last damage before repairs begin
const BLOCKS_PER_TICK = 26;
const TICK = 0.45;

interface Site {
  cx: number;
  cz: number;
  pristine: Uint8Array;
  cursor: number; // linear scan index (y-major, so repairs rise bottom-up)
  skipped: boolean;
}

export interface RepairTickResult {
  dirty: Set<string>;
  restored: { x: number; y: number; z: number; id: number }[];
  startedSites: { x: number; z: number }[];
}

export class RepairManager {
  private damaged = new Map<string, number>(); // chunk key -> last damage time
  private sites = new Map<string, Site>();
  private tickT = 0;

  constructor(private world: World) {}

  noteDamage(keys: Iterable<string>, time: number): void {
    for (const k of keys) {
      this.damaged.set(k, time);
      this.sites.delete(k); // fresh damage restarts the site scan later
    }
  }

  update(dt: number, time: number, px: number, pz: number): RepairTickResult | null {
    this.tickT -= dt;
    if (this.tickT > 0) return null;
    this.tickT = TICK;

    const result: RepairTickResult = { dirty: new Set(), restored: [], startedSites: [] };

    // promote quiet damaged chunks to active repair sites (a couple at a time)
    for (const [key, t] of this.damaged) {
      if (this.sites.size >= 3) break;
      if (time - t < GRACE || this.sites.has(key)) continue;
      const [cx, cz] = key.split(',').map(Number);
      this.sites.set(key, { cx, cz, pristine: generateChunkData(cx, cz), cursor: 0, skipped: false });
      result.startedSites.push({ x: cx * CS + CS / 2, z: cz * CS + CS / 2 });
    }

    let budget = BLOCKS_PER_TICK;
    for (const [key, site] of this.sites) {
      if (budget <= 0) break;
      const chunk = this.world.getChunk(site.cx, site.cz);
      const total = CS * CS * H;
      while (site.cursor < total && budget > 0) {
        const i = site.cursor++;
        const cur = chunk[i];
        const want = site.pristine[i];
        if (cur === want || want === B.Air || cur !== B.Air) continue;
        const y = Math.floor(i / (CS * CS));
        const rem = i - y * CS * CS;
        const lz = Math.floor(rem / CS);
        const lx = rem - lz * CS;
        const wx = site.cx * CS + lx, wz = site.cz * CS + lz;
        // never rebuild right on top of the player
        const dx = wx - px, dz = wz - pz;
        if (dx * dx + dz * dz < 144) {
          site.skipped = true;
          continue;
        }
        if (!isSolid(want) && want !== B.Water) continue;
        this.world.setBlock(wx, y, wz, want);
        result.dirty.add(this.world.key(site.cx, site.cz));
        result.restored.push({ x: wx, y, z: wz, id: want });
        budget--;
      }
      if (site.cursor >= total) {
        this.sites.delete(key);
        if (site.skipped) {
          this.damaged.set(key, time); // come back for the skipped bits later
        } else {
          this.damaged.delete(key);
        }
      }
    }
    return result.dirty.size > 0 || result.startedSites.length > 0 ? result : null;
  }

  activeSiteCount(): number {
    return this.sites.size;
  }
}
