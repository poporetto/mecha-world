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

// Per-frame wall-clock budgets, in milliseconds. Cumulative: rebuilds get the
// first slice, streaming the next, and the data ring whatever is left. Sized
// so the whole streamer stays inside roughly a third of a 60fps frame.
const REBUILD_MS = 2.5;
const STREAM_MS = 4.5;
const TOTAL_MS = 5.5;

export class ChunkManager {
  /** Milliseconds the last update() spent — read by the perf overlay. */
  lastBudgetMs = 0;
  private ringCursor = 0;
  private readonly meshR: number;
  private readonly dataR: number;
  private readonly dropR: number;

  private meshes = new Map<string, THREE.Mesh | null>();
  /** 0 by day, 1 at night — drives the window/neon glow in the shader. */
  nightAmount = { value: 0 };
  private material = this.makeMaterial();

  // Chunk faces marked aGlow (lit windows, neon, lanterns) emit a warm light
  // once night falls, so the city switches on instead of going flat dark.
  private makeMaterial(): THREE.MeshStandardMaterial {
    // Standard lighting gives terrain proper sun-facing highlights and soft
    // shadowed sides. A fairly rough surface preserves the stylised voxel look
    // and avoids turning every city block into polished plastic.
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.82,
      metalness: 0.04,
    });
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
    // Everything below is on one wall-clock budget rather than a fixed count.
    // Measured on this machine a cold chunk costs 1.4ms to generate and 1.8ms
    // to mesh, so the old fixed quota — six rebuilds plus three new chunks —
    // could spend 20ms in a 16.6ms frame, and it did so exactly when the
    // player was moving fast enough to need the frames.
    const start = performance.now();
    const spent = (): number => performance.now() - start;
    this.lastBudgetMs = 0;

    // rebuild damaged chunks first (instant feedback on destruction)
    let rebuilds = 0;
    for (const key of this.dirty) {
      if (rebuilds >= 6 || spent() > REBUILD_MS) break;
      this.dirty.delete(key);
      const [cx, cz] = key.split(',').map(Number);
      if (Math.abs(cx - pcx) > this.meshR || Math.abs(cz - pcz) > this.meshR) continue;
      this.buildMesh(cx, cz);
      rebuilds++;
    }

    // stream new chunks, nearest first, until the budget is gone
    let built = 0;
    for (let r = 0; r <= this.meshR && built < 3; r++) {
      for (let dz = -r; dz <= r && built < 3; dz++) {
        for (let dx = -r; dx <= r && built < 3; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
          if (spent() > STREAM_MS) { r = this.meshR + 1; dz = r; break; }
          const cx = pcx + dx, cz = pcz + dz;
          if (this.meshes.has(this.world.key(cx, cz))) continue;
          this.buildMesh(cx, cz);
          built++;
        }
      }
    }

    // Pre-generate the data ring so mesh border queries do not cascade. This
    // used to run all (2*dataR+1)^2 chunks in one frame whenever anything
    // streamed: on cold ground that is 81 generations, measured at 118ms — a
    // seven-frame stall, and it landed precisely when crossing into new
    // territory. It now walks the ring a few chunks at a time and carries its
    // position between frames, so the work is spread instead of spiked.
    const span = this.dataR * 2 + 1;
    let scanned = 0;
    while (scanned < span * span && spent() < TOTAL_MS) {
      const i = this.ringCursor % (span * span);
      this.ringCursor = (this.ringCursor + 1) % (span * span);
      scanned++;
      const cx = pcx - this.dataR + (i % span);
      const cz = pcz - this.dataR + Math.floor(i / span);
      if (this.world.hasChunk(cx, cz)) continue;
      this.world.getChunk(cx, cz);
      break; // one cold generation per pass; the budget check gates the rest
    }
    this.lastBudgetMs = spent();

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

  /**
   * Has the chunk under this world position actually been meshed? A boss can
   * land past the streaming edge, where the ground it is standing on has not
   * been built yet and it appears to float over open sky.
   */
  isMeshed(x: number, z: number): boolean {
    return !!this.meshes.get(this.world.key(Math.floor(x / CS), Math.floor(z / CS)));
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
