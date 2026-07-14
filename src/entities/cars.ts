// City traffic: little cars that cruise the road grid, turn at intersections,
// and floor it when something explodes nearby. Like citizens, they can't be
// destroyed — only spooked.

import * as THREE from 'three';
import { hash2 } from '../core/noise';
import { World } from '../core/world';
import { roadInfo } from '../core/worldgen';

const COUNT = 18;
const DESPAWN_R = 120;
const CELL = 26;
const PAINT = [0xf2a5a5, 0xa5c4f2, 0xfafafa, 0x9a9cb0, 0xf8dfa2, 0xa8e6e2, 0xf6c2dd, 0xc2eab2];

interface Car {
  group: THREE.Group;
  pos: THREE.Vector3;
  dir: THREE.Vector3; // axis-aligned unit vector
  baseSpeed: number;
  panicT: number;
  lastCell: string;
  swerve: number; // current lateral offset
  swerveTarget: number;
}

function makeCar(seed: number): THREE.Group {
  const g = new THREE.Group();
  const paint = PAINT[Math.floor(hash2(seed, 4) * PAINT.length)];
  const mat = (c: number, e = 0) =>
    new THREE.MeshLambertMaterial({ color: c, emissive: e, emissiveIntensity: e ? 1 : 0 });
  const isTaxi = hash2(seed, 5) < 0.2;
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.55, 3.4), mat(isTaxi ? 0xf7c948 : paint));
  body.position.y = 0.55;
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.7), mat(0x9ed4f2));
  cabin.position.set(0, 1.05, -0.2);
  const grill = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.1), mat(0x23262b));
  grill.position.set(0, 0.5, 1.72);
  const lightL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.08), mat(0xfff2b0, 0xfff2b0));
  lightL.position.set(-0.55, 0.68, 1.72);
  const lightR = lightL.clone();
  lightR.position.x = 0.55;
  g.add(body, cabin, grill, lightL, lightR);
  for (const [wx, wz] of [[-0.85, 1.1], [0.85, 1.1], [-0.85, -1.1], [0.85, -1.1]]) {
    const wheel = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.55, 0.7), mat(0x1c1e24));
    wheel.position.set(wx, 0.28, wz);
    g.add(wheel);
  }
  if (isTaxi) {
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.4), mat(0xe84040));
    sign.position.set(0, 1.4, -0.2);
    g.add(sign);
  }
  return g;
}

export class CarManager {
  group = new THREE.Group();
  private cars: Car[] = [];
  private seed = 1;

  constructor(private world: World) {}

  update(dt: number, playerPos: THREE.Vector3): void {
    while (this.cars.length < COUNT) {
      const car = this.trySpawn(playerPos);
      if (!car) break;
      this.cars.push(car);
    }

    for (let i = this.cars.length - 1; i >= 0; i--) {
      const c = this.cars[i];
      if (c.pos.distanceTo(playerPos) > DESPAWN_R) {
        this.group.remove(c.group);
        this.cars.splice(i, 1);
        continue;
      }

      c.panicT -= dt;
      let speed = c.panicT > 0 ? c.baseSpeed * 2.2 : c.baseSpeed;

      // don't run over the giant robot: brake behind it, swerve past it
      const toP = playerPos.clone().sub(c.pos);
      const aheadDist = toP.x * c.dir.x + toP.z * c.dir.z;
      const lateral = toP.x * c.dir.z - toP.z * c.dir.x; // signed side offset
      if (aheadDist > 0 && aheadDist < 14 && Math.abs(lateral) < 4.5) {
        c.swerveTarget = lateral > 0 ? -3 : 3; // swerve to the free side
        if (aheadDist < 7) speed = Math.max(0, speed * ((aheadDist - 3) / 4)); // brake
      } else {
        c.swerveTarget = 0;
      }
      c.swerve += (c.swerveTarget - c.swerve) * Math.min(1, dt * 3);

      // occasionally turn at intersections (each intersection decided once)
      const cellKey = Math.floor(c.pos.x / CELL) + ',' + Math.floor(c.pos.z / CELL);
      if (roadInfo(Math.floor(c.pos.x), Math.floor(c.pos.z)) === 3 && cellKey !== c.lastCell) {
        c.lastCell = cellKey;
        const r = Math.random();
        if (r < 0.35) {
          const turned = new THREE.Vector3(c.dir.z, 0, -c.dir.x);
          if (r < 0.175) turned.negate();
          c.dir.copy(turned);
        }
      }

      // stay on roads: if the column ahead isn't road (or is blocked), turn
      const ahead = c.pos.clone().addScaledVector(c.dir, 2.6);
      const ax = Math.floor(ahead.x), az = Math.floor(ahead.z);
      const blocked = roadInfo(ax, az) === 0 ||
        this.world.solidAt(ax + 0.5, this.world.groundHeight(c.pos.x, c.pos.z, 6) + 0.5, az + 0.5);
      if (blocked) {
        // try left, right, then reverse
        const left = new THREE.Vector3(c.dir.z, 0, -c.dir.x);
        const right = left.clone().negate();
        const ok = (d: THREE.Vector3) =>
          roadInfo(Math.floor(c.pos.x + d.x * 2.6), Math.floor(c.pos.z + d.z * 2.6)) !== 0;
        if (ok(left)) c.dir.copy(left);
        else if (ok(right)) c.dir.copy(right);
        else c.dir.negate();
      } else {
        c.pos.addScaledVector(c.dir, speed * dt);
      }

      const gh = this.world.groundHeight(c.pos.x, c.pos.z, 6);
      c.pos.y = gh;
      c.group.position.copy(c.pos);
      // swerve is a visual lateral offset perpendicular to travel
      c.group.position.x += c.dir.z * c.swerve;
      c.group.position.z += -c.dir.x * c.swerve;
      c.group.rotation.y = Math.atan2(c.dir.x, c.dir.z) - c.swerve * 0.12;
    }
  }

  scare(point: THREE.Vector3, radius: number): void {
    for (const c of this.cars) {
      if (c.pos.distanceTo(point) < radius) c.panicT = 3;
    }
  }

  private trySpawn(playerPos: THREE.Vector3): Car | null {
    for (let attempt = 0; attempt < 14; attempt++) {
      const a = Math.random() * Math.PI * 2;
      const r = 25 + Math.random() * 75;
      const x = Math.floor(playerPos.x + Math.sin(a) * r);
      const z = Math.floor(playerPos.z + Math.cos(a) * r);
      const info = roadInfo(x, z);
      if (info !== 1 && info !== 2) continue;
      if (this.world.groundHeight(x, z, 6) > 2) continue;

      const sign = Math.random() < 0.5 ? 1 : -1;
      const dir = info === 1 ? new THREE.Vector3(0, 0, sign) : new THREE.Vector3(sign, 0, 0);
      // snap into a lane: right-hand side of the 5-wide road for this direction
      const cellBase = (v: number) => Math.floor(v / CELL) * CELL;
      const lane = sign > 0 ? 1.2 : 3.8;
      const pos = info === 1
        ? new THREE.Vector3(cellBase(x) + lane, 1, z + 0.5)
        : new THREE.Vector3(x + 0.5, 1, cellBase(z) + (sign > 0 ? 3.8 : 1.2));

      const seed = this.seed++;
      const group = makeCar(seed);
      this.group.add(group);
      return {
        group,
        pos,
        dir,
        baseSpeed: 7 + Math.random() * 4,
        panicT: 0,
        lastCell: '',
        swerve: 0,
        swerveTarget: 0,
      };
    }
    return null;
  }
}
