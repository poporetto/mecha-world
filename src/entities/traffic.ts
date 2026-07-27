// Working traffic signals. Worldgen bakes the corner posts; this places live
// signal heads on the ones near the player and runs them through a real
// green -> amber -> red cycle, with crossing streets held out of phase.

import * as THREE from 'three';
import { CELL, ROAD_W } from '../core/worldgen';

const RANGE = 150;      // how far from the player signals are kept alive
const POST_TOP = 6;     // world y of the baked post's top
const GREEN = 7, AMBER = 2, RED = 9; // seconds per phase
const PERIOD = GREEN + AMBER + RED;

const OFF = 0x2b2f38;
const RED_ON = 0xff5a52, AMBER_ON = 0xffc44f, GREEN_ON = 0x5ce67a;

interface Signal {
  group: THREE.Group;
  lamps: THREE.Mesh[]; // [red, amber, green]
  /** true if this post serves the north-south axis */
  axis: boolean;
  key: string;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export class TrafficManager {
  group = new THREE.Group();
  private live = new Map<string, Signal>();
  private pool: Signal[] = [];
  private scanT = 0;

  private build(): Signal {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 3.2, 0.9),
      new THREE.MeshLambertMaterial({ color: 0x33383f })
    );
    housing.position.y = 1.6;
    g.add(housing);
    const lamps: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const lamp = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.7, 0.3),
        new THREE.MeshLambertMaterial({ color: OFF, emissive: 0x000000 })
      );
      lamp.position.set(0, 2.6 - i * 1.0, 0.55);
      g.add(lamp);
      lamps.push(lamp);
    }
    const hood = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.25, 1.2),
      new THREE.MeshLambertMaterial({ color: 0x22262c })
    );
    hood.position.y = 3.3;
    g.add(hood);
    return { group: g, lamps, axis: true, key: '' };
  }

  private acquire(): Signal {
    const s = this.pool.pop() ?? this.build();
    this.group.add(s.group);
    return s;
  }

  private release(s: Signal): void {
    this.group.remove(s.group);
    this.pool.push(s);
  }

  update(dt: number, time: number, playerPos: THREE.Vector3, groundAt: (x: number, z: number) => number): void {
    // Re-scan occasionally: signals are cheap but finding them is a grid walk.
    this.scanT -= dt;
    if (this.scanT <= 0) {
      this.scanT = 0.5;
      const wanted = new Set<string>();
      const x0 = Math.floor((playerPos.x - RANGE) / CELL) * CELL;
      const z0 = Math.floor((playerPos.z - RANGE) / CELL) * CELL;
      for (let x = x0; x <= playerPos.x + RANGE; x += CELL) {
        for (let z = z0; z <= playerPos.z + RANGE; z += CELL) {
          // corner posts sit where both axes are at the kerb
          const cx = x + (mod(ROAD_W - x, CELL));
          const cz = z + (mod(ROAD_W - z, CELL));
          if (Math.hypot(cx - playerPos.x, cz - playerPos.z) > RANGE) continue;
          const key = cx + ',' + cz;
          wanted.add(key);
          if (this.live.has(key)) continue;
          const s = this.acquire();
          s.key = key;
          // face the signal down the street it governs
          s.axis = mod(Math.floor(cx / CELL) + Math.floor(cz / CELL), 2) === 0;
          s.group.position.set(cx, Math.max(groundAt(cx, cz), POST_TOP), cz);
          s.group.rotation.y = s.axis ? 0 : Math.PI / 2;
          this.live.set(key, s);
        }
      }
      for (const [key, s] of this.live) {
        if (!wanted.has(key)) { this.release(s); this.live.delete(key); }
      }
    }

    // Advance the cycle. The two axes are offset by half a period so one
    // street is stopped while the other runs.
    for (const s of this.live.values()) {
      const t = mod(time + (s.axis ? 0 : PERIOD / 2), PERIOD);
      const phase = t < GREEN ? 2 : t < GREEN + AMBER ? 1 : 0; // 0 red,1 amber,2 green
      for (let i = 0; i < 3; i++) {
        const on = (i === 0 && phase === 0) || (i === 1 && phase === 1) || (i === 2 && phase === 2);
        const mat = s.lamps[i].material as THREE.MeshLambertMaterial;
        const lit = i === 0 ? RED_ON : i === 1 ? AMBER_ON : GREEN_ON;
        mat.color.setHex(on ? lit : OFF);
        mat.emissive.setHex(on ? lit : 0x000000);
        mat.emissiveIntensity = on ? 1 : 0;
      }
    }
  }
}
