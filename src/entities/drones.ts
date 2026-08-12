// Hostile drone swarms. Unlike the single boss, these keep coming: they fill
// the lulls between kaiju, give the rapid-fire weapons something to chew on,
// and drop repair cells when killed so HP becomes a resource you can manage.

import * as THREE from 'three';
import { World } from '../core/world';

export interface DroneCtx {
  world: World;
  playerPos: THREE.Vector3;
  damagePlayer: (amount: number) => void;
  destroyAt: (p: THREE.Vector3, r: number, shake: number) => void;
}

interface Drone {
  group: THREE.Group;
  rotor: THREE.Mesh;
  body: THREE.Mesh; // flashes red when hit
  hp: number;
  vel: THREE.Vector3;
  // orbit the player at a preferred radius/height, then dart in to strike
  orbitA: number;
  radius: number;
  height: number;
  strikeT: number;
  diving: boolean;
  flashT: number;
}

const HOVER_HP = 14;
const _v = new THREE.Vector3();
const _w = new THREE.Vector3();

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
}

export class DroneManager {
  group = new THREE.Group();
  private drones: Drone[] = [];
  private spawnT = 3;
  /** How many drones should be circling — raised as waves progress. */
  target = 3;

  get count(): number {
    return this.drones.length;
  }

  private build(): Drone {
    const g = new THREE.Group();
    const HULL = 0x5a616e;
    const TRIM = 0xef6a6a;

    const body = box(2.6, 1.2, 2.6, HULL);
    const eye = box(1.1, 0.45, 0.3, 0xff4d4d, 0xff2222);
    eye.position.set(0, 0.1, 1.4);
    const eyeL = box(0.34, 0.28, 0.18, 0xff2727, 0xff0000);
    eyeL.position.set(-0.78, 0.02, 1.38);
    const eyeR = eyeL.clone(); eyeR.position.x = 0.78;
    const skirt = box(2.2, 0.5, 2.2, TRIM);
    skirt.position.y = -0.75;
    // The swarm now reads as a biomechanical hunting insect rather than a
    // floating box: layered carapace, recessed face, feeding mandibles and a
    // visible hot underbelly preserve its silhouette without adding hit cost.
    const crown = box(2.15, 0.42, 1.85, 0x747d8d);
    crown.position.set(0, 0.78, -0.05);
    crown.rotation.x = -0.08;
    const face = box(1.75, 0.72, 0.48, 0x252933);
    face.position.set(0, -0.12, 1.48);
    const gullet = box(0.74, 0.34, 0.36, 0x7d1820, 0xff192d);
    gullet.position.set(0, -0.48, 1.7);
    const abdomen = box(1.55, 0.85, 1.85, 0x343943);
    abdomen.position.set(0, -0.75, -1.35);
    const abdomenGlow = box(0.72, 0.3, 1.25, 0xef6a6a, 0x8b1018);
    abdomenGlow.position.set(0, -1.18, -1.3);
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        const fang = box(0.18, 0.22, 0.72 + i * 0.12, 0xcbd0d8);
        fang.position.set(side * (0.28 + i * 0.3), -0.52, 1.82 + i * 0.1);
        fang.rotation.x = -0.36;
        fang.rotation.y = side * (0.12 + i * 0.08);
        g.add(fang);
      }
      const brow = box(0.92, 0.2, 0.42, TRIM);
      brow.position.set(side * 0.62, 0.34, 1.52);
      brow.rotation.z = side * -0.16;
      g.add(brow);
    }
    // four stubby arms with a spinning rotor disc on top
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
      const arm = box(1.5, 0.3, 0.5, HULL);
      arm.position.set(dx * 1.5, 0.35, dz * 1.5);
      arm.rotation.y = Math.atan2(dx, dz);
      g.add(arm);
      const pod = box(0.7, 0.5, 0.7, 0x2f333c);
      pod.position.set(dx * 2.1, 0.35, dz * 2.1);
      g.add(pod);
      const claw = box(0.22, 1.15, 0.22, 0x242830);
      claw.position.set(dx * 2.24, -0.42, dz * 2.24);
      claw.rotation.x = dz * 0.24;
      claw.rotation.z = dx * -0.24;
      g.add(claw);
    }
    for (const side of [-1, 1]) {
      const mandible = box(0.28, 0.34, 1.5, TRIM);
      mandible.position.set(side * 0.75, -0.35, 1.65);
      mandible.rotation.y = side * -0.24;
      const fin = box(0.2, 1.25, 0.7, 0x2f333c);
      fin.position.set(side * 1.1, 0.75, -0.55);
      fin.rotation.z = side * -0.45;
      g.add(mandible, fin);
    }
    const rotor = box(5.6, 0.12, 0.5, 0xb9c0cc);
    rotor.position.y = 0.95;
    g.add(body, eye, eyeL, eyeR, skirt, crown, face, gullet, abdomen, abdomenGlow, rotor);
    g.scale.setScalar(1.6);

    return {
      group: g, rotor, body, hp: HOVER_HP,
      vel: new THREE.Vector3(),
      orbitA: Math.random() * Math.PI * 2,
      radius: 26 + Math.random() * 24,
      height: 14 + Math.random() * 16,
      strikeT: 2 + Math.random() * 4,
      diving: false,
      flashT: 0,
    };
  }

  private spawn(ctx: DroneCtx): void {
    const d = this.build();
    // arrive from off to one side, at altitude
    const a = Math.random() * Math.PI * 2;
    d.group.position.set(
      ctx.playerPos.x + Math.sin(a) * 90,
      ctx.world.groundHeight(ctx.playerPos.x, ctx.playerPos.z, 60) + d.height + 10,
      ctx.playerPos.z + Math.cos(a) * 90
    );
    this.group.add(d.group);
    this.drones.push(d);
  }

  update(dt: number, t: number, ctx: DroneCtx): void {
    this.spawnT -= dt;
    if (this.spawnT <= 0 && this.drones.length < this.target) {
      this.spawnT = 1.6;
      this.spawn(ctx);
    }

    for (let i = this.drones.length - 1; i >= 0; i--) {
      const d = this.drones[i];
      d.rotor.rotation.y += dt * 26;
      if (d.flashT > 0) {
        d.flashT -= dt;
        const mat = d.body.material as THREE.MeshLambertMaterial;
        mat.emissive.setHex(d.flashT > 0 ? 0xff3333 : 0x000000);
      }

      const gy = ctx.world.groundHeight(d.group.position.x, d.group.position.z, 60);
      if (d.diving) {
        // committed dive: drive straight at where the player was
        d.group.position.addScaledVector(d.vel, dt);
        d.group.rotation.x = -0.5;
        const near = d.group.position.distanceTo(ctx.playerPos) < 11;
        if (near || d.group.position.y < gy + 3) {
          // slam: hurt the player if close, scar the ground either way
          if (near) ctx.damagePlayer(7);
          const at = d.group.position.clone();
          ctx.destroyAt(at, 3, 0.15);
          d.diving = false;
          d.strikeT = 3 + Math.random() * 3;
          d.group.rotation.x = 0;
        }
        continue;
      }

      // hover-orbit the player, bobbing
      d.orbitA += dt * 0.5;
      const tx = ctx.playerPos.x + Math.sin(d.orbitA) * d.radius;
      const tz = ctx.playerPos.z + Math.cos(d.orbitA) * d.radius;
      const ty = gy + d.height + Math.sin(t * 1.7 + d.orbitA) * 2;
      d.group.position.x += (tx - d.group.position.x) * Math.min(1, dt * 1.1);
      d.group.position.z += (tz - d.group.position.z) * Math.min(1, dt * 1.1);
      d.group.position.y += (ty - d.group.position.y) * Math.min(1, dt * 1.4);
      // face the player
      d.group.rotation.y = Math.atan2(
        ctx.playerPos.x - d.group.position.x,
        ctx.playerPos.z - d.group.position.z
      );

      d.strikeT -= dt;
      if (d.strikeT <= 0) {
        d.diving = true;
        _v.copy(ctx.playerPos).sub(d.group.position).normalize();
        d.vel.copy(_v).multiplyScalar(38);
      }
    }
  }

  /** Damage drones inside a sphere. Returns the positions of any that died. */
  damageSphere(p: THREE.Vector3, radius: number, dmg: number): THREE.Vector3[] {
    const killed: THREE.Vector3[] = [];
    for (let i = this.drones.length - 1; i >= 0; i--) {
      const d = this.drones[i];
      if (d.group.position.distanceTo(p) > radius + 3.5) continue;
      d.hp -= dmg;
      d.flashT = 0.1;
      if (d.hp <= 0) {
        killed.push(d.group.position.clone());
        this.remove(i);
      }
    }
    return killed;
  }

  /** Damage drones along a ray (railgun / beam / vulcan tracers). */
  damageRay(from: THREE.Vector3, dir: THREE.Vector3, maxDist: number, dmg: number): THREE.Vector3[] {
    const killed: THREE.Vector3[] = [];
    for (let i = this.drones.length - 1; i >= 0; i--) {
      const d = this.drones[i];
      _v.copy(d.group.position).sub(from);
      const along = _v.dot(dir);
      if (along < 0 || along > maxDist) continue;
      // distance from the drone to the ray line (_v is consumed here)
      _w.copy(dir).multiplyScalar(along);
      const perp = _v.sub(_w).length();
      if (perp > 5) continue;
      d.hp -= dmg;
      d.flashT = 0.1;
      if (d.hp <= 0) {
        killed.push(d.group.position.clone());
        this.remove(i);
      }
    }
    return killed;
  }

  private remove(i: number): void {
    const d = this.drones[i];
    this.group.remove(d.group);
    d.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      }
    });
    this.drones.splice(i, 1);
  }
}
