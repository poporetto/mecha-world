// Little citizens (and their dogs) who wander the streets and flee from
// destruction. They can never be harmed — only scared.

import * as THREE from 'three';
import { hash2 } from '../core/noise';
import { World } from '../core/world';
import { isOpenStreet } from '../core/worldgen';

const NPC_COUNT = 42;
const SPAWN_R = 70;
const DESPAWN_R = 110;
const SHIRT = [0xf2a5a5, 0xa5bdf2, 0x9fd9a8, 0xf8dfa2, 0xc9aee8, 0xa8e6e2, 0xf6c2dd, 0xc5c9d8];
const SKIN = [0xf2c9a5, 0xd9a878, 0xa8764f, 0xf5d9bd];

interface Npc {
  group: THREE.Group;
  armL: THREE.Mesh;
  armR: THREE.Mesh;
  pos: THREE.Vector3;
  dir: number;
  state: 'wander' | 'flee' | 'idle';
  timer: number;
  phase: number;
  pet?: THREE.Group;
  petPos?: THREE.Vector3;
  home?: THREE.Vector3; // workers stay near their repair site
  life?: number; // workers despawn when the job is done
}

export function makePerson(seed: number, worker = false): { group: THREE.Group; armL: THREE.Mesh; armR: THREE.Mesh } {
  const g = new THREE.Group();
  const shirt = worker ? 0xf28c3a : SHIRT[Math.floor(hash2(seed, 1) * SHIRT.length)];
  const skin = SKIN[Math.floor(hash2(seed, 2) * SKIN.length)];
  const pants = hash2(seed, 3) < 0.5 ? 0x2e3440 : 0x6b5d4f;
  const mat = (c: number) => new THREE.MeshLambertMaterial({ color: c });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.36, 0.2), mat(shirt));
  body.position.y = 0.5;
  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.32, 0.18), mat(pants));
  legs.position.y = 0.16;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), mat(skin));
  head.position.y = 0.8;
  const hair = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.24), mat(worker ? 0xf8dc4a : 0x2a2a2e));
  hair.position.y = 0.93; // workers get a yellow hard hat
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.34, 0.09), mat(shirt));
  armL.position.set(-0.23, 0.62, 0);
  armL.geometry.translate(0, -0.14, 0);
  const armR = armL.clone();
  armR.position.x = 0.23;
  g.add(body, legs, head, hair, armL, armR);
  return { group: g, armL, armR };
}

function makeDog(seed: number): THREE.Group {
  const g = new THREE.Group();
  const c = hash2(seed, 9) < 0.5 ? 0xc9a06a : 0x8a8d92;
  const mat = new THREE.MeshLambertMaterial({ color: c });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.4), mat);
  body.position.y = 0.2;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), mat);
  head.position.set(0, 0.32, 0.26);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.16), mat);
  tail.position.set(0, 0.3, -0.26);
  tail.rotation.x = -0.6;
  g.add(body, head, tail);
  return g;
}

export class NpcManager {
  group = new THREE.Group();
  private npcs: Npc[] = [];
  private seed = 1;

  constructor(private world: World) {}

  update(dt: number, playerPos: THREE.Vector3, threats: THREE.Vector3[], t: number): void {
    // keep population up
    while (this.npcs.length < NPC_COUNT) {
      const npc = this.trySpawn(playerPos);
      if (!npc) break;
      this.npcs.push(npc);
    }

    for (let i = this.npcs.length - 1; i >= 0; i--) {
      const n = this.npcs[i];
      const dp = n.pos.distanceTo(playerPos);
      if (dp > DESPAWN_R) {
        this.group.remove(n.group);
        if (n.pet) this.group.remove(n.pet);
        this.npcs.splice(i, 1);
        continue;
      }

      // threat check
      let nearest: THREE.Vector3 | null = null;
      let nd = 38;
      for (const th of threats) {
        const d = n.pos.distanceTo(th);
        if (d < nd) { nd = d; nearest = th; }
      }
      if (nearest && n.state !== 'flee') {
        n.state = 'flee';
        n.timer = 3 + Math.random() * 2;
        n.dir = Math.atan2(n.pos.x - nearest.x, n.pos.z - nearest.z);
      }

      // workers time out and head home once the site is repaired
      if (n.life !== undefined) {
        n.life -= dt;
        if (n.life <= 0) {
          this.group.remove(n.group);
          this.npcs.splice(i, 1);
          continue;
        }
      }

      n.timer -= dt;
      let speed = 0;
      if (n.state === 'flee') {
        speed = 5.5;
        if (nearest) n.dir = Math.atan2(n.pos.x - nearest.x, n.pos.z - nearest.z) + Math.sin(t * 3 + n.phase) * 0.3;
        if (n.timer <= 0) { n.state = 'wander'; n.timer = 2 + Math.random() * 4; }
      } else if (n.state === 'wander') {
        speed = 1.5;
        if (n.timer <= 0) {
          if (Math.random() < 0.3) { n.state = 'idle'; n.timer = 1 + Math.random() * 3; }
          else { n.dir += (Math.random() - 0.5) * 2; n.timer = 2 + Math.random() * 4; }
        }
        // workers orbit their site instead of drifting off
        if (n.home && n.pos.distanceTo(n.home) > 14) {
          n.dir = Math.atan2(n.home.x - n.pos.x, n.home.z - n.pos.z);
        }
      } else if (n.timer <= 0) {
        n.state = 'wander';
        n.timer = 2 + Math.random() * 4;
      }

      if (speed > 0) {
        const nx = n.pos.x + Math.sin(n.dir) * speed * dt;
        const nz = n.pos.z + Math.cos(n.dir) * speed * dt;
        const ceiling = Math.max(3, Math.ceil(n.pos.y + 0.9));
        const gh = this.world.groundHeight(nx, nz, ceiling);
        if (isOpenStreet(Math.floor(nx), Math.floor(nz)) && Math.abs(gh - n.pos.y) <= 0.72 &&
            this.world.getBlock(Math.floor(nx), Math.max(0, gh - 1), Math.floor(nz)) !== 4) {
          n.pos.x = nx;
          n.pos.z = nz;
          n.pos.y = gh;
        } else {
          n.dir += Math.PI * (0.5 + Math.random() * 0.5); // wall/water: turn
        }
      }

      n.group.position.copy(n.pos);
      n.group.rotation.y = n.dir;
      // animation: bob while walking, arms up while fleeing
      const bob = speed > 0 ? Math.abs(Math.sin(t * (n.state === 'flee' ? 16 : 8) + n.phase)) * 0.06 : 0;
      n.group.position.y += bob;
      if (n.state === 'flee') {
        n.armL.rotation.x = Math.PI - 0.3 + Math.sin(t * 14 + n.phase) * 0.2;
        n.armR.rotation.x = Math.PI - 0.3 - Math.sin(t * 14 + n.phase) * 0.2;
      } else {
        const sw = speed > 0 ? Math.sin(t * 8 + n.phase) * 0.5 : 0;
        n.armL.rotation.x = sw;
        n.armR.rotation.x = -sw;
      }

      // pet follows
      if (n.pet && n.petPos) {
        const target = new THREE.Vector3(
          n.pos.x - Math.sin(n.dir) * 0.9,
          0,
          n.pos.z - Math.cos(n.dir) * 0.9
        );
        n.petPos.x += (target.x - n.petPos.x) * Math.min(1, dt * 4);
        n.petPos.z += (target.z - n.petPos.z) * Math.min(1, dt * 4);
        // Dogs inherit the pedestrian's traversable level instead of sampling
        // rooftops independently while cutting the corner behind their owner.
        const petCeiling = Math.max(3, Math.ceil(n.pos.y + 0.9));
        const petGround = this.world.groundHeight(n.petPos.x, n.petPos.z, petCeiling);
        n.petPos.y = Math.abs(petGround - n.pos.y) <= 0.72 ? petGround : n.pos.y;
        n.pet.position.copy(n.petPos);
        n.pet.position.y += speed > 0 ? Math.abs(Math.sin(t * 12 + n.phase)) * 0.08 : 0;
        n.pet.rotation.y = Math.atan2(n.pos.x - n.petPos.x, n.pos.z - n.petPos.z);
      }
    }
  }

  // orange-vested repair crew that hangs around a rebuild site
  spawnWorkers(x: number, z: number, count = 2): void {
    for (let i = 0; i < count; i++) {
      const seed = this.seed++;
      const { group, armL, armR } = makePerson(seed, true);
      const px = x + (Math.random() - 0.5) * 8;
      const pz = z + (Math.random() - 0.5) * 8;
      const gh = this.world.groundHeight(px, pz, 12);
      if (gh > 6) continue;
      const npc: Npc = {
        group, armL, armR,
        pos: new THREE.Vector3(px, gh, pz),
        dir: Math.random() * Math.PI * 2,
        state: 'wander',
        timer: 1 + Math.random() * 2,
        phase: Math.random() * 10,
        home: new THREE.Vector3(x, 0, z),
        life: 40 + Math.random() * 15,
      };
      this.group.add(group);
      this.npcs.push(npc);
    }
  }

  scare(point: THREE.Vector3, radius: number): void {
    for (const n of this.npcs) {
      if (n.pos.distanceTo(point) < radius) {
        n.state = 'flee';
        n.timer = 3.5 + Math.random() * 2;
        n.dir = Math.atan2(n.pos.x - point.x, n.pos.z - point.z);
      }
    }
  }

  private trySpawn(playerPos: THREE.Vector3): Npc | null {
    for (let attempt = 0; attempt < 12; attempt++) {
      const a = Math.random() * Math.PI * 2;
      const r = 20 + Math.random() * (SPAWN_R - 20);
      const x = Math.floor(playerPos.x + Math.sin(a) * r);
      const z = Math.floor(playerPos.z + Math.cos(a) * r);
      if (!isOpenStreet(x, z)) continue;
      const gh = this.world.groundHeight(x, z, 12);
      if (gh > 4) continue;
      const seed = this.seed++;
      const { group, armL, armR } = makePerson(seed);
      const npc: Npc = {
        group, armL, armR,
        pos: new THREE.Vector3(x + 0.5, gh, z + 0.5),
        dir: Math.random() * Math.PI * 2,
        state: 'wander',
        timer: 2 + Math.random() * 3,
        phase: Math.random() * 10,
      };
      if (hash2(seed, 77) < 0.28) {
        npc.pet = makeDog(seed);
        npc.petPos = npc.pos.clone();
        this.group.add(npc.pet);
      }
      this.group.add(group);
      return npc;
    }
    return null;
  }
}
