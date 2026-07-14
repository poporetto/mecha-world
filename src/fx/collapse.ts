// Builds a single mesh out of a cut-loose block component so it can fall
// as one crumbling piece, then updates its physics until impact.

import * as THREE from 'three';
import { BLOCK_COLORS } from '../core/blocks';
import { hash3 } from '../core/noise';

const FACES: { d: [number, number, number]; s: number; v: number[][] }[] = [
  { d: [1, 0, 0], s: 0.8, v: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] },
  { d: [-1, 0, 0], s: 0.8, v: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]] },
  { d: [0, 1, 0], s: 1.0, v: [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]] },
  { d: [0, -1, 0], s: 0.5, v: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] },
  { d: [0, 0, 1], s: 0.7, v: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]] },
  { d: [0, 0, -1], s: 0.7, v: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]] },
];

const col = new THREE.Color();
const material = new THREE.MeshLambertMaterial({ vertexColors: true });

export interface FallingChunk {
  mesh: THREE.Mesh;
  vel: number;
  spin: number;
  bottomY: number; // world y of the lowest block at spawn
  groundY: number; // where it lands
  blockCount: number;
  sampleIds: number[];
}

export function buildFallingChunk(blocks: [number, number, number, number][], groundY: number): FallingChunk {
  let minX = Infinity, minY = Infinity, minZ = Infinity, maxX = -Infinity, maxZ = -Infinity;
  const inSet = new Set<string>();
  for (const [x, y, z] of blocks) {
    inSet.add(x + ',' + y + ',' + z);
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (x > maxX) maxX = x;
    if (z > maxZ) maxZ = z;
  }
  const ox = (minX + maxX + 1) / 2, oz = (minZ + maxZ + 1) / 2;

  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const sampleIds: number[] = [];

  for (const [x, y, z, id] of blocks) {
    if (sampleIds.length < 6) sampleIds.push(id);
    for (const f of FACES) {
      if (inSet.has((x + f.d[0]) + ',' + (y + f.d[1]) + ',' + (z + f.d[2]))) continue;
      const base = positions.length / 3;
      col.setHex(BLOCK_COLORS[id] ?? 0x999999);
      const shade = f.s * (0.92 + 0.08 * hash3(x, y, z));
      for (const v of f.v) {
        positions.push(x - ox + v[0], y - minY + v[1], z - oz + v[2]);
        normals.push(f.d[0], f.d[1], f.d[2]);
        colors.push(Math.min(1, col.r * shade), Math.min(1, col.g * shade), Math.min(1, col.b * shade));
      }
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);

  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(ox, minY, oz);
  return {
    mesh,
    vel: 0,
    spin: (Math.random() - 0.5) * 0.35,
    bottomY: minY,
    groundY,
    blockCount: blocks.length,
    sampleIds,
  };
}

// Returns true when the chunk has landed (caller removes it + spawns dust).
export function updateFallingChunk(f: FallingChunk, dt: number): boolean {
  f.vel += 22 * dt;
  f.mesh.position.y -= f.vel * dt;
  f.mesh.rotation.z += f.spin * dt;
  f.mesh.rotation.x += f.spin * 0.6 * dt;
  return f.mesh.position.y <= f.groundY;
}
