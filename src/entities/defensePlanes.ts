// Neo Tokyo Defence Force interceptor wing. These are fragile allied units:
// they contribute steady chip damage during boss encounters, but committed
// attack runs expose them to the monster and destroyed aircraft take a long
// time to replace.

import * as THREE from 'three';
import type { Monster } from './monsters';

const WING_SIZE = 3;
const RESPAWN_MIN = 26;
const RESPAWN_JITTER = 10;

interface Fighter {
  group: THREE.Group;
  alive: boolean;
  respawnT: number;
  fireT: number;
  dangerT: number;
  orbit: number;
  slot: number;
}

interface Tracer {
  mesh: THREE.Mesh;
  life: number;
}

export interface DefenseWingEvents {
  hits: Array<{ at: THREE.Vector3; damage: number }>;
  crashes: THREE.Vector3[];
  respawned: number;
}

function part(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({
      color, emissive, emissiveIntensity: emissive ? 2.1 : 0,
      metalness: 0.38, roughness: 0.36, flatShading: true,
    })
  );
  mesh.castShadow = true;
  return mesh;
}

function buildFighter(): THREE.Group {
  const g = new THREE.Group();
  const HULL = 0xbac3cf, DARK = 0x252b34, BLUE = 0x3588b8, RED = 0xd94148;

  // Long stepped fuselage and pointed radome, nose +Z.
  const body = part(2.2, 1.55, 8.2, HULL);
  const spine = part(1.35, 0.65, 7.4, 0xdbe1e8); spine.position.y = 0.92;
  const nose1 = part(1.75, 1.25, 2.3, HULL); nose1.position.set(0, -0.05, 5.1);
  const nose2 = part(1.15, 0.82, 1.7, HULL); nose2.position.set(0, -0.18, 7.0);
  const noseTip = part(0.48, 0.42, 1.0, DARK); noseTip.position.set(0, -0.23, 8.3);
  const canopy = part(1.25, 0.72, 2.2, BLUE, 0x0b2d48); canopy.position.set(0, 1.18, 2.1); canopy.rotation.x = -0.12;
  const tail = part(1.55, 1.15, 2.4, HULL); tail.position.set(0, 0.35, -5.0);
  g.add(body, spine, nose1, nose2, noseTip, canopy, tail);

  for (const side of [-1, 1]) {
    // Swept delta wing in three narrowing courses.
    for (let i = 0; i < 3; i++) {
      const wing = part(2.7, 0.36, 5.1 - i * 1.1, i === 2 ? RED : HULL);
      wing.position.set(side * (2.3 + i * 2.35), -0.15 + i * 0.05, -0.7 - i * 1.2);
      g.add(wing);
    }
    const tailplane = part(2.4, 0.3, 2.7, HULL);
    tailplane.position.set(side * 2.1, 0.5, -5.25);
    g.add(tailplane);
    const intake = part(0.85, 0.85, 1.45, DARK);
    intake.position.set(side * 1.3, -0.5, 1.0);
    const missile = part(0.28, 0.28, 2.1, 0xe7e9eb);
    missile.position.set(side * 4.2, -0.65, -0.8);
    const missileTip = part(0.18, 0.18, 0.45, RED);
    missileTip.position.set(side * 4.2, -0.65, 0.47);
    g.add(intake, missile, missileTip);
  }

  for (const x of [-0.65, 0.65]) {
    const exhaust = part(0.72, 0.72, 0.65, DARK); exhaust.position.set(x, -0.25, -6.25);
    const flame = part(0.36, 0.36, 1.6, 0x72d9ff, 0x168cff); flame.position.set(x, -0.25, -7.35);
    g.add(exhaust, flame);
  }
  for (let i = 0; i < 3; i++) {
    const fin = part(0.38, 1.5, 2.8 - i * 0.55, i === 2 ? RED : HULL);
    fin.position.set(0, 1.45 + i * 1.2, -4.55 - i * 0.35);
    g.add(fin);
  }
  g.scale.setScalar(0.72);
  return g;
}

export class DefenseWing {
  group = new THREE.Group();
  private fighters: Fighter[] = [];
  private tracers: Tracer[] = [];

  constructor() {
    for (let i = 0; i < WING_SIZE; i++) {
      const group = buildFighter();
      group.visible = false;
      this.group.add(group);
      this.fighters.push({
        group, alive: false,
        respawnT: 2.5 + i * 2.2, fireT: 0.7 + i * 0.3,
        dangerT: 1.2, orbit: i * Math.PI * 2 / WING_SIZE, slot: i,
      });
    }
  }

  update(dt: number, t: number, center: THREE.Vector3, monster: Monster | null): DefenseWingEvents {
    const events: DefenseWingEvents = { hits: [], crashes: [], respawned: 0 };
    this.updateTracers(dt);
    for (const f of this.fighters) {
      if (!f.alive) {
        f.respawnT -= dt;
        if (f.respawnT <= 0 && monster && !monster.dying) {
          this.deploy(f, center);
          events.respawned++;
        }
        continue;
      }
      if (!monster || monster.dying) {
        // Hold a distant patrol above Terra-Armor between contacts.
        f.orbit += dt * 0.16;
        this.flyToward(f, center.x + Math.sin(f.orbit) * 70, center.y + 38, center.z + Math.cos(f.orbit) * 70, dt);
        continue;
      }

      f.orbit += dt * (0.42 + f.slot * 0.025);
      const radius = 38 + f.slot * 7;
      const target = monster.group.position;
      const tx = target.x + Math.sin(f.orbit) * radius;
      const tz = target.z + Math.cos(f.orbit) * radius;
      const ty = Math.max(target.y + monster.centerY + 18 + f.slot * 5, 28);
      this.flyToward(f, tx, ty, tz, dt);

      f.fireT -= dt;
      if (f.fireT <= 0 && f.group.position.distanceTo(target) < 105) {
        f.fireT = 0.85 + Math.random() * 0.55;
        const at = target.clone();
        at.y += monster.centerY + (Math.random() - 0.5) * 5;
        this.fireTracer(f.group.position, at);
        events.hits.push({ at, damage: 1.5 });
      }

      // Low attack runs are dangerous. A telegraphed boss attack guarantees
      // a hit; otherwise the wing still takes occasional anti-air attrition.
      f.dangerT -= dt;
      const dangerRange = monster.hitRadius + 32;
      if (f.dangerT <= 0 && f.group.position.distanceTo(target) < dangerRange) {
        f.dangerT = 1.1 + Math.random() * 0.8;
        if (monster.threatening || Math.random() < 0.48) {
          f.group.rotation.z += (Math.random() - 0.5) * 0.35;
          // Interceptors are conventional aircraft facing kaiju-scale force:
          // one clean hit tears the airframe apart.
          this.destroy(f, events);
        }
      }
      // Subtle engine vibration keeps formation flight from looking frozen.
      f.group.position.y += Math.sin(t * 15 + f.slot * 2.1) * 0.025;
    }
    return events;
  }

  reset(): void {
    for (const f of this.fighters) {
      f.alive = false; f.group.visible = false;
      f.respawnT = 2.5 + f.slot * 2.2;
    }
    for (const tracer of this.tracers) this.group.remove(tracer.mesh);
    this.tracers.length = 0;
  }

  private deploy(f: Fighter, center: THREE.Vector3): void {
    f.alive = true; f.group.visible = true;
    f.fireT = 0.4 + Math.random() * 0.7; f.dangerT = 1.2;
    f.group.position.set(center.x - 130 - f.slot * 15, center.y + 45 + f.slot * 4, center.z - 110);
    f.group.rotation.set(0, 0, 0);
  }

  private destroy(f: Fighter, events: DefenseWingEvents): void {
    events.crashes.push(f.group.position.clone());
    f.alive = false; f.group.visible = false;
    f.respawnT = RESPAWN_MIN + Math.random() * RESPAWN_JITTER;
  }

  private flyToward(f: Fighter, x: number, y: number, z: number, dt: number): void {
    const dx = x - f.group.position.x, dy = y - f.group.position.y, dz = z - f.group.position.z;
    const d = Math.max(1, Math.hypot(dx, dy, dz));
    const speed = 38;
    f.group.position.x += dx / d * speed * dt;
    f.group.position.y += dy / d * speed * dt;
    f.group.position.z += dz / d * speed * dt;
    const desired = Math.atan2(dx, dz);
    let turn = desired - f.group.rotation.y;
    while (turn > Math.PI) turn -= Math.PI * 2;
    while (turn < -Math.PI) turn += Math.PI * 2;
    f.group.rotation.y += turn * Math.min(1, dt * 3.4);
    f.group.rotation.z = THREE.MathUtils.lerp(f.group.rotation.z, -turn * 0.75, Math.min(1, dt * 3));
    f.group.rotation.x = THREE.MathUtils.lerp(f.group.rotation.x, THREE.MathUtils.clamp(-dy / d, -0.22, 0.22), Math.min(1, dt * 3));
  }

  private fireTracer(from: THREE.Vector3, to: THREE.Vector3): void {
    const dir = to.clone().sub(from);
    const len = dir.length();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.24, len),
      new THREE.MeshBasicMaterial({ color: 0x7fe8ff, transparent: true, opacity: 0.9, toneMapped: false })
    );
    mesh.position.copy(from).lerp(to, 0.5);
    mesh.lookAt(to);
    this.group.add(mesh);
    this.tracers.push({ mesh, life: 0.11 });
  }

  private updateTracers(dt: number): void {
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const tracer = this.tracers[i];
      tracer.life -= dt;
      (tracer.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, tracer.life / 0.11);
      if (tracer.life > 0) continue;
      this.group.remove(tracer.mesh);
      tracer.mesh.geometry.dispose();
      (tracer.mesh.material as THREE.Material).dispose();
      this.tracers.splice(i, 1);
    }
  }
}
