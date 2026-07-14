// Streams chunk meshes in around the player and rebuilds dirty (damaged) ones.

import * as THREE from 'three';
import { CS } from '../core/worldgen';
import { World } from '../core/world';
import { buildChunkGeometry } from './mesher';

const DATA_R = 5; // chunks of raw data kept generated
const MESH_R = 4; // chunks meshed & visible
const DROP_R = 6; // beyond this, meshes are disposed

export class ChunkManager {
  private meshes = new Map<string, THREE.Mesh | null>();
  private material = new THREE.MeshLambertMaterial({ vertexColors: true });
  dirty = new Set<string>();

  constructor(private world: World, private scene: THREE.Scene) {}

  update(px: number, pz: number): void {
    const pcx = Math.floor(px / CS), pcz = Math.floor(pz / CS);

    // rebuild damaged chunks first (instant feedback on destruction)
    let rebuilds = 0;
    for (const key of this.dirty) {
      this.dirty.delete(key);
      const [cx, cz] = key.split(',').map(Number);
      if (Math.abs(cx - pcx) > MESH_R || Math.abs(cz - pcz) > MESH_R) continue;
      this.buildMesh(cx, cz);
      if (++rebuilds >= 6) break;
    }

    // stream new chunks, nearest first, small budget per frame
    let built = 0;
    for (let r = 0; r <= MESH_R && built < 2; r++) {
      for (let dz = -r; dz <= r && built < 2; dz++) {
        for (let dx = -r; dx <= r && built < 2; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
          const cx = pcx + dx, cz = pcz + dz;
          if (this.meshes.has(this.world.key(cx, cz))) continue;
          this.buildMesh(cx, cz);
          built++;
        }
      }
    }

    // pre-generate data ring so mesh border queries don't cascade
    if (built > 0) {
      for (let dz = -DATA_R; dz <= DATA_R; dz++) {
        for (let dx = -DATA_R; dx <= DATA_R; dx++) {
          this.world.getChunk(pcx + dx, pcz + dz);
        }
      }
    }

    // drop far meshes
    for (const [key, mesh] of this.meshes) {
      const [cx, cz] = key.split(',').map(Number);
      if (Math.abs(cx - pcx) > DROP_R || Math.abs(cz - pcz) > DROP_R) {
        if (mesh) {
          this.scene.remove(mesh);
          mesh.geometry.dispose();
        }
        this.meshes.delete(key);
      }
    }
  }

  markDirty(keys: Iterable<string>): void {
    for (const k of keys) this.dirty.add(k);
  }

  private buildMesh(cx: number, cz: number): void {
    const key = this.world.key(cx, cz);
    const old = this.meshes.get(key);
    if (old) {
      this.scene.remove(old);
      old.geometry.dispose();
    }
    const geo = buildChunkGeometry(this.world, cx, cz);
    if (!geo) {
      this.meshes.set(key, null);
      return;
    }
    const mesh = new THREE.Mesh(geo, this.material);
    mesh.position.set(cx * CS, 0, cz * CS);
    mesh.frustumCulled = true;
    this.scene.add(mesh);
    this.meshes.set(key, mesh);
  }
}
