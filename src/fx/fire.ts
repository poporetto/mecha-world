// Spreading fire simulation. Burning voxels flicker as emissive flames, creep
// to adjacent flammable blocks, and are consumed (destroyed) over a few
// seconds — a fire started at a building's base can eat its way up and topple
// it. Bounded by a hard cap on simultaneously burning cells.

import * as THREE from 'three';
import { isFlammable, isSolid } from '../core/blocks';
import { World } from '../core/world';

const CAP = 700; // max simultaneous burning voxels
const BURN_DUR = 3.2; // seconds a block burns before it's consumed
const SPREAD_EVERY = 0.35; // seconds between spread attempts per cell

interface Burn {
  x: number; y: number; z: number;
  age: number;
  spreadT: number;
}

export interface FireResult {
  dirty: Set<string>;
  destroyed: [number, number, number][]; // consumed blocks (world coords)
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _col = new THREE.Color();

export class FireManager {
  group = new THREE.Group();
  private fires = new Map<string, Burn>();
  private inst: THREE.InstancedMesh;
  private t = 0;

  constructor() {
    const geo = new THREE.BoxGeometry(0.85, 1.5, 0.85);
    geo.translate(0, 0.6, 0);
    // solid hot-orange flames read on any background; per-instance color adds
    // the yellow-to-red gradient and flicker
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.96, depthWrite: false,
      vertexColors: false,
    });
    this.inst = new THREE.InstancedMesh(geo, mat, CAP);
    this.inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.inst.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(CAP * 3), 3);
    this.inst.count = 0;
    this.inst.frustumCulled = false;
    this.group.add(this.inst);
  }

  get count(): number {
    return this.fires.size;
  }

  private key(x: number, y: number, z: number): string {
    return x + ',' + y + ',' + z;
  }

  private light(x: number, y: number, z: number): boolean {
    if (this.fires.size >= CAP) return false;
    const k = this.key(x, y, z);
    if (this.fires.has(k)) return false;
    this.fires.set(k, { x, y, z, age: 0, spreadT: SPREAD_EVERY * Math.random() });
    return true;
  }

  // Ignite flammable surface blocks within a radius (from a flamethrower hit).
  igniteSphere(world: World, px: number, py: number, pz: number, r: number): number {
    let n = 0;
    const x0 = Math.floor(px - r), x1 = Math.ceil(px + r);
    const y0 = Math.max(1, Math.floor(py - r)), y1 = Math.ceil(py + r);
    const z0 = Math.floor(pz - r), z1 = Math.ceil(pz + r);
    const r2 = r * r;
    for (let y = y0; y <= y1; y++) {
      for (let z = z0; z <= z1; z++) {
        for (let x = x0; x <= x1; x++) {
          const dx = x + 0.5 - px, dy = y + 0.5 - py, dz = z + 0.5 - pz;
          if (dx * dx + dy * dy + dz * dz > r2) continue;
          if (!isFlammable(world.getBlock(x, y, z))) continue;
          // only surface blocks catch (has an air/exposed neighbor)
          if (this.exposed(world, x, y, z) && this.light(x, y, z)) n++;
        }
      }
    }
    return n;
  }

  private exposed(world: World, x: number, y: number, z: number): boolean {
    return !isSolid(world.getBlock(x + 1, y, z)) || !isSolid(world.getBlock(x - 1, y, z))
      || !isSolid(world.getBlock(x, y + 1, z)) || !isSolid(world.getBlock(x, y - 1, z))
      || !isSolid(world.getBlock(x, y, z + 1)) || !isSolid(world.getBlock(x, y, z - 1));
  }

  update(dt: number, world: World): FireResult | null {
    if (this.fires.size === 0) { this.inst.count = 0; return null; }
    this.t += dt;
    const dirty = new Set<string>();
    const destroyed: [number, number, number][] = [];
    const spawn: [number, number, number][] = [];

    for (const [k, f] of this.fires) {
      f.age += dt;
      // if the block was already removed (collapse etc.), drop the fire
      if (!isFlammable(world.getBlock(f.x, f.y, f.z))) { this.fires.delete(k); continue; }

      // spread to a random flammable neighbor
      f.spreadT -= dt;
      if (f.spreadT <= 0 && this.fires.size < CAP) {
        f.spreadT = SPREAD_EVERY;
        const dirs = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
        const d = dirs[(Math.random() * 6) | 0];
        const nx = f.x + d[0], ny = f.y + d[1], nz = f.z + d[2];
        if (ny >= 1 && isFlammable(world.getBlock(nx, ny, nz)) && Math.random() < 0.6) {
          spawn.push([nx, ny, nz]);
        }
      }

      // consume the block once burnt through
      if (f.age >= BURN_DUR) {
        world.setBlock(f.x, f.y, f.z, 0);
        destroyed.push([f.x, f.y, f.z]);
        this.markDirty(world, f.x, f.y, f.z, dirty);
        this.fires.delete(k);
      }
    }
    for (const [x, y, z] of spawn) this.light(x, y, z);

    this.render();
    return destroyed.length > 0 || dirty.size > 0 ? { dirty, destroyed } : null;
  }

  private markDirty(world: World, x: number, y: number, z: number, dirty: Set<string>): void {
    for (const d of world.dirtyKeysFor(x, z)) dirty.add(d);
  }

  private render(): void {
    let i = 0;
    for (const f of this.fires.values()) {
      const flick = 0.7 + 0.5 * Math.abs(Math.sin(this.t * 13 + f.x * 1.7 + f.z));
      _p.set(f.x + 0.5, f.y, f.z + 0.5);
      _s.set(0.8 + Math.sin(this.t * 9 + f.x) * 0.2, flick, 0.8 + Math.cos(this.t * 8 + f.z) * 0.2);
      _m.compose(_p, _q, _s);
      this.inst.setMatrixAt(i, _m);
      // hotter (white-yellow) near the base, cooling to deep orange at the tip
      const heat = 0.5 + 0.5 * Math.abs(Math.sin(this.t * 16 + f.x * 2.3 + f.z * 1.1));
      _col.setRGB(1, 0.42 + heat * 0.5, 0.08 + heat * 0.25);
      this.inst.setColorAt(i, _col);
      if (++i >= CAP) break;
    }
    this.inst.count = i;
    this.inst.instanceMatrix.needsUpdate = true;
    if (this.inst.instanceColor) this.inst.instanceColor.needsUpdate = true;
  }
}
