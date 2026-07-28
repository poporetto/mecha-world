// Streams chunk meshes in around the player and rebuilds dirty (damaged) ones.

import * as THREE from 'three';
import { CS } from '../core/worldgen';
import { World } from '../core/world';
import { buildChunkGeometry } from './mesher';

// View distance in chunks (CS=32 units each). Cost scales with the SQUARE of
// this, so it is the main lever on frame rate: 6 draws ~169 chunks where 4
// drew ~81. Phones get the smaller ring since they cannot afford the fill.
const DESKTOP_VIEW = 6; // ~192 units of city
const MOBILE_VIEW = 4;  // ~128 units, the old distance

export class ChunkManager {
  private readonly meshR: number;
  private readonly dataR: number;
  private readonly dropR: number;

  private meshes = new Map<string, THREE.Mesh | null>();
  /** 0 by day, 1 at night — drives the window/neon glow in the shader. */
  nightAmount = { value: 0 };
  private material = this.makeMaterial();

  // Chunk faces marked aGlow (lit windows, neon, lanterns) emit a warm light
  // once night falls, so the city switches on instead of going flat dark.
  private makeMaterial(): THREE.MeshLambertMaterial {
    const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uNight = this.nightAmount;
      shader.vertexShader = 'attribute float aGlow;\nvarying float vGlow;\n' +
        shader.vertexShader.replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\n  vGlow = aGlow;'
        );
      shader.fragmentShader = 'uniform float uNight;\nvarying float vGlow;\n' +
        shader.fragmentShader.replace(
          '#include <emissivemap_fragment>',
          '#include <emissivemap_fragment>\n  totalEmissiveRadiance += vGlow * uNight * vec3(1.0, 0.84, 0.52);'
        );
    };
    return mat;
  }
  dirty = new Set<string>();

  constructor(private world: World, private scene: THREE.Scene, lowSpec = false) {
    this.meshR = lowSpec ? MOBILE_VIEW : DESKTOP_VIEW;
    this.dataR = this.meshR + 1;
    this.dropR = this.meshR + 2;
  }

  /** How far the city is drawn, in world units — used to match the fog. */
  get viewDistance(): number {
    return this.meshR * CS;
  }

  update(px: number, pz: number): void {
    const pcx = Math.floor(px / CS), pcz = Math.floor(pz / CS);

    // rebuild damaged chunks first (instant feedback on destruction)
    let rebuilds = 0;
    for (const key of this.dirty) {
      this.dirty.delete(key);
      const [cx, cz] = key.split(',').map(Number);
      if (Math.abs(cx - pcx) > this.meshR || Math.abs(cz - pcz) > this.meshR) continue;
      this.buildMesh(cx, cz);
      if (++rebuilds >= 6) break;
    }

    // stream new chunks, nearest first, small budget per frame
    let built = 0;
    for (let r = 0; r <= this.meshR && built < 3; r++) {
      for (let dz = -r; dz <= r && built < 3; dz++) {
        for (let dx = -r; dx <= r && built < 3; dx++) {
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
      for (let dz = -this.dataR; dz <= this.dataR; dz++) {
        for (let dx = -this.dataR; dx <= this.dataR; dx++) {
          this.world.getChunk(pcx + dx, pcz + dz);
        }
      }
    }

    // drop far meshes
    for (const [key, mesh] of this.meshes) {
      const [cx, cz] = key.split(',').map(Number);
      if (Math.abs(cx - pcx) > this.dropR || Math.abs(cz - pcz) > this.dropR) {
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
