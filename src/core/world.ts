// Chunk store + block queries + voxel destruction + DDA raycast.
// Pure logic, no rendering — designed so it can run on any platform later.

import { B, isSolid } from './blocks';
import { CS, H, generateChunkData } from './worldgen';

export interface RayHit {
  x: number; y: number; z: number; // block coords
  px: number; py: number; pz: number; // hit point
  dist: number;
}

export interface DestroyResult {
  count: number;
  ids: number[]; // sample of destroyed block ids (for debris colors)
  dirty: Set<string>;
  cx: number; cy: number; cz: number;
}

export class World {
  chunks = new Map<string, Uint8Array>();

  key(cx: number, cz: number): string {
    return cx + ',' + cz;
  }

  getChunk(cx: number, cz: number): Uint8Array {
    const k = this.key(cx, cz);
    let c = this.chunks.get(k);
    if (!c) {
      c = generateChunkData(cx, cz);
      this.chunks.set(k, c);
    }
    return c;
  }

  hasChunk(cx: number, cz: number): boolean {
    return this.chunks.has(this.key(cx, cz));
  }

  getBlock(x: number, y: number, z: number): number {
    if (y < 0) return B.Dirt; // bedrock — nothing falls through
    if (y >= H) return B.Air;
    const cx = Math.floor(x / CS), cz = Math.floor(z / CS);
    const c = this.getChunk(cx, cz);
    const lx = x - cx * CS, lz = z - cz * CS;
    return c[(y * CS + lz) * CS + lx];
  }

  setBlock(x: number, y: number, z: number, id: number): void {
    if (y < 0 || y >= H) return;
    const cx = Math.floor(x / CS), cz = Math.floor(z / CS);
    const c = this.getChunk(cx, cz);
    const lx = x - cx * CS, lz = z - cz * CS;
    c[(y * CS + lz) * CS + lx] = id;
  }

  // Chunk keys a block edit dirties (its own chunk + any bordering neighbor).
  dirtyKeysFor(x: number, z: number): string[] {
    const cx = Math.floor(x / CS), cz = Math.floor(z / CS);
    const keys = [this.key(cx, cz)];
    const lx = x - cx * CS, lz = z - cz * CS;
    if (lx === 0) keys.push(this.key(cx - 1, cz));
    if (lx === CS - 1) keys.push(this.key(cx + 1, cz));
    if (lz === 0) keys.push(this.key(cx, cz - 1));
    if (lz === CS - 1) keys.push(this.key(cx, cz + 1));
    return keys;
  }

  solidAt(x: number, y: number, z: number): boolean {
    return isSolid(this.getBlock(Math.floor(x), Math.floor(y), Math.floor(z)));
  }

  // Standing height (top of highest solid block + 1) scanning down from `from`.
  groundHeight(x: number, z: number, from = H - 1): number {
    const bx = Math.floor(x), bz = Math.floor(z);
    for (let y = Math.min(from, H - 1); y >= 0; y--) {
      if (isSolid(this.getBlock(bx, y, bz))) return y + 1;
    }
    return 0;
  }

  destroySphere(px: number, py: number, pz: number, r: number): DestroyResult {
    const dirty = new Set<string>();
    const ids: number[] = [];
    let count = 0;
    const r2 = r * r;
    const x0 = Math.floor(px - r), x1 = Math.ceil(px + r);
    const y0 = Math.max(1, Math.floor(py - r)), y1 = Math.min(H - 1, Math.ceil(py + r));
    const z0 = Math.floor(pz - r), z1 = Math.ceil(pz + r);
    for (let y = y0; y <= y1; y++) {
      for (let z = z0; z <= z1; z++) {
        for (let x = x0; x <= x1; x++) {
          const dx = x + 0.5 - px, dy = y + 0.5 - py, dz = z + 0.5 - pz;
          if (dx * dx + dy * dy + dz * dz > r2) continue;
          const id = this.getBlock(x, y, z);
          if (id === B.Air || id === B.Water) continue;
          this.setBlock(x, y, z, B.Air);
          count++;
          if (ids.length < 6) ids.push(id);
          const cx = Math.floor(x / CS), cz = Math.floor(z / CS);
          dirty.add(this.key(cx, cz));
          // faces on chunk borders belong to neighbor meshes too
          const lx = x - cx * CS, lz = z - cz * CS;
          if (lx === 0) dirty.add(this.key(cx - 1, cz));
          if (lx === CS - 1) dirty.add(this.key(cx + 1, cz));
          if (lz === 0) dirty.add(this.key(cx, cz - 1));
          if (lz === CS - 1) dirty.add(this.key(cx, cz + 1));
        }
      }
    }
    return { count, ids, dirty, cx: px, cy: py, cz: pz };
  }

  // Structural collapse: after a destruction at (px,py,pz), find connected
  // groups of blocks near the blast that no longer reach the ground and cut
  // them loose. Returns their blocks (for a falling mesh) + dirtied chunks.
  collapseScan(px: number, py: number, pz: number, r: number): { blocks: [number, number, number, number][]; dirty: Set<string> } | null {
    const BOUND = 48; // horizontal search limit from blast center
    const COMP_CAP = 22000; // truly huge components count as supported (bail)
    const visited = new Set<string>();
    const out: [number, number, number, number][] = [];
    const dirty = new Set<string>();

    const R = Math.ceil(r) + 1;
    const cx0 = Math.floor(px), cy0 = Math.floor(py), cz0 = Math.floor(pz);

    for (let sy = Math.max(1, cy0 - R); sy <= Math.min(H - 1, cy0 + R + 1); sy++) {
      for (let sz = cz0 - R; sz <= cz0 + R; sz++) {
        for (let sx = cx0 - R; sx <= cx0 + R; sx++) {
          if (!isSolid(this.getBlock(sx, sy, sz))) continue;
          const skey = sx + ',' + sy + ',' + sz;
          if (visited.has(skey)) continue;

          // BFS this component
          const comp: [number, number, number][] = [];
          const queue: [number, number, number][] = [[sx, sy, sz]];
          visited.add(skey);
          let supported = false;
          while (queue.length > 0) {
            const [x, y, z] = queue.pop()!;
            comp.push([x, y, z]);
            if (comp.length > COMP_CAP) { supported = true; break; }
            if (y <= 1) { supported = true; } // resting on the ground layer
            if (Math.abs(x - cx0) > BOUND || Math.abs(z - cz0) > BOUND) {
              supported = true; // reached search limit — assume anchored
              continue;
            }
            const neighbors: [number, number, number][] = [
              [x + 1, y, z], [x - 1, y, z], [x, y + 1, z], [x, y - 1, z], [x, y, z + 1], [x, y, z - 1],
            ];
            for (const [nx, ny, nz] of neighbors) {
              if (ny < 1 || ny >= H) continue;
              const nkey = nx + ',' + ny + ',' + nz;
              if (visited.has(nkey)) continue;
              if (!isSolid(this.getBlock(nx, ny, nz))) continue;
              visited.add(nkey);
              queue.push([nx, ny, nz]);
            }
          }

          if (!supported && comp.length >= 4 && out.length + comp.length <= 22000) {
            for (const [x, y, z] of comp) {
              const id = this.getBlock(x, y, z);
              out.push([x, y, z, id]);
              this.setBlock(x, y, z, B.Air);
              const ccx = Math.floor(x / CS), ccz = Math.floor(z / CS);
              dirty.add(this.key(ccx, ccz));
              const lx = x - ccx * CS, lz = z - ccz * CS;
              if (lx === 0) dirty.add(this.key(ccx - 1, ccz));
              if (lx === CS - 1) dirty.add(this.key(ccx + 1, ccz));
              if (lz === 0) dirty.add(this.key(ccx, ccz - 1));
              if (lz === CS - 1) dirty.add(this.key(ccx, ccz + 1));
            }
          }
        }
      }
    }
    return out.length > 0 ? { blocks: out, dirty } : null;
  }

  // Foundation collapse: flood the whole connected structure touched by the
  // blast and compare its ground footings to how many vertical columns it has.
  // A sound building foots nearly every column on the ground; once the base is
  // gutted most columns hang in the air, so the whole thing topples even if a
  // stray corner still stands. Bounded by a box + block cap around the blast.
  foundationScan(px: number, pz: number, bandTop: number): { blocks: [number, number, number, number][]; dirty: Set<string> } | null {
    const BOUND = 26; // horizontal reach — one building, not the block
    const CAP = 20000;
    const cx = Math.floor(px), cz = Math.floor(pz);
    const seedTop = Math.min(H - 1, Math.max(4, Math.round(bandTop)) + 2);

    // seed from solid blocks standing just above the blast band
    const visited = new Set<string>();
    const queue: [number, number, number][] = [];
    for (let dx = -6; dx <= 6; dx++) {
      for (let dz = -6; dz <= 6; dz++) {
        for (let dy = 0; dy <= 4; dy++) {
          const x = cx + dx, y = seedTop + dy, z = cz + dz;
          if (y >= H || !isSolid(this.getBlock(x, y, z))) continue;
          const k = x + ',' + y + ',' + z;
          if (!visited.has(k)) { visited.add(k); queue.push([x, y, z]); }
        }
      }
    }
    if (queue.length === 0) return null;

    // flood the full connected component (up, down, sideways) within bounds
    const comp: [number, number, number][] = [];
    const columns = new Set<number>(); // distinct (x,z) the structure occupies
    const footed = new Set<number>();  // distinct (x,z) still resting on ground
    let anchored = false;
    while (queue.length > 0) {
      const [x, y, z] = queue.pop()!;
      comp.push([x, y, z]);
      if (comp.length > CAP) { anchored = true; break; }
      const col = x * 8192 + z;
      columns.add(col);
      // count the COLUMN once, not every block in it — counting blocks double
      // counted y=1 and y=2 and made the support ratio exceed 1.
      if (y <= 2) footed.add(col);
      if (Math.abs(x - cx) > BOUND || Math.abs(z - cz) > BOUND) { anchored = true; continue; }
      const nb: [number, number, number][] = [
        [x + 1, y, z], [x - 1, y, z], [x, y + 1, z], [x, y - 1, z], [x, y, z + 1], [x, y, z - 1],
      ];
      for (const [nx, ny, nz] of nb) {
        if (ny < 1 || ny >= H) continue;
        const nk = nx + ',' + ny + ',' + nz;
        if (visited.has(nk) || !isSolid(this.getBlock(nx, ny, nz))) continue;
        visited.add(nk);
        queue.push([nx, ny, nz]);
      }
    }
    // Stable if it runs off to a neighbour. Otherwise judge it on how much of
    // its footprint still reaches the ground: a real structure fails well
    // before every last column is gone, so ~30% of footings lost brings it
    // down. Voxel buildings here are solid, so a stricter bar meant a player
    // could never realistically topple one.
    if (anchored || comp.length < 12) return null;
    if (footed.size > columns.size * 0.7) return null;

    // critically undermined — the whole component comes down
    const out: [number, number, number, number][] = [];
    const dirty = new Set<string>();
    for (const [x, y, z] of comp) {
      const id = this.getBlock(x, y, z);
      out.push([x, y, z, id]);
      this.setBlock(x, y, z, B.Air);
      const ccx = Math.floor(x / CS), ccz = Math.floor(z / CS);
      dirty.add(this.key(ccx, ccz));
      const lx = x - ccx * CS, lz = z - ccz * CS;
      if (lx === 0) dirty.add(this.key(ccx - 1, ccz));
      if (lx === CS - 1) dirty.add(this.key(ccx + 1, ccz));
      if (lz === 0) dirty.add(this.key(ccx, ccz - 1));
      if (lz === CS - 1) dirty.add(this.key(ccx, ccz + 1));
    }
    return { blocks: out, dirty };
  }

  // Voxel DDA raycast. dir must be normalized.
  raycast(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxDist: number): RayHit | null {
    let x = Math.floor(ox), y = Math.floor(oy), z = Math.floor(oz);
    const stepX = dx > 0 ? 1 : -1, stepY = dy > 0 ? 1 : -1, stepZ = dz > 0 ? 1 : -1;
    const tDeltaX = dx !== 0 ? Math.abs(1 / dx) : Infinity;
    const tDeltaY = dy !== 0 ? Math.abs(1 / dy) : Infinity;
    const tDeltaZ = dz !== 0 ? Math.abs(1 / dz) : Infinity;
    let tMaxX = dx !== 0 ? (dx > 0 ? (x + 1 - ox) : (ox - x)) * tDeltaX : Infinity;
    let tMaxY = dy !== 0 ? (dy > 0 ? (y + 1 - oy) : (oy - y)) * tDeltaY : Infinity;
    let tMaxZ = dz !== 0 ? (dz > 0 ? (z + 1 - oz) : (oz - z)) * tDeltaZ : Infinity;
    let t = 0;
    for (let i = 0; i < 512 && t <= maxDist; i++) {
      if (y >= 0 && y < H && isSolid(this.getBlock(x, y, z))) {
        return { x, y, z, px: ox + dx * t, py: oy + dy * t, pz: oz + dz * t, dist: t };
      }
      if (tMaxX < tMaxY && tMaxX < tMaxZ) {
        t = tMaxX; tMaxX += tDeltaX; x += stepX;
      } else if (tMaxY < tMaxZ) {
        t = tMaxY; tMaxY += tDeltaY; y += stepY;
      } else {
        t = tMaxZ; tMaxZ += tDeltaZ; z += stepZ;
      }
    }
    return null;
  }
}
