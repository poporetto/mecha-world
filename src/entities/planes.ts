// Airliners cruising slowly over Neo Tokyo. They double as moving platforms:
// the mecha can land on the fuselage/wing deck and ride along.

import * as THREE from 'three';

const _v = new THREE.Vector3();
const _w = new THREE.Vector3();

const COUNT = 4;
const SPAN = 620; // how far a plane travels before wrapping around the player
const PLANE_HP = 90;
const RESPAWN_AFTER = 12; // seconds before a downed airliner is replaced

export interface Plane {
  group: THREE.Group;
  heading: number; // radians, direction of travel
  speed: number;
  deckY: number; // world y of the walkable top surface
  halfLen: number; // along the fuselage
  halfWide: number; // across the wings
  dx: number; // movement applied this frame (platform carry)
  dz: number;
  hp: number;
  crashing: boolean; // shot down: spiralling toward the ground
  fallVel: number;
  roll: number;
  smokeT: number;
}

/** Reported when a downed airliner hits the ground. */
export interface PlaneCrash {
  at: THREE.Vector3;
  heading: number;
}

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
}

/**
 * An octagonal prism built out of four overlapping slabs — a square, a second
 * square rolled 45 degrees, and the two together read as a chamfered tube.
 * Everything else on this aircraft is box-built, so a smooth 16-segment
 * cylinder for the nacelles stuck out as the one non-voxel part of the model.
 */
function voxelTube(r: number, len: number, color: number, hollow = false): THREE.Group {
  const g = new THREE.Group();
  const w = r * 2, thin = r * 0.83;
  for (const [sw, sh, roll] of [[w, thin, 0], [thin, w, 0], [w * 0.78, w * 0.78, Math.PI / 4]] as const) {
    const m = box(sw, sh, len, color);
    m.rotation.z = roll;
    g.add(m);
  }
  if (hollow) {
    // a darker inner bore so the intake reads as an opening, not a plug
    const bore = box(r * 1.05, r * 1.05, len * 0.9, 0x1b2028);
    g.add(bore);
  }
  return g;
}

// A detailed block-built wide-body airliner, nose pointing +Z. The collision
// deck remains intentionally forgiving, but the visible model follows real
// aircraft anatomy: pressure tube, tapered nose and tail, swept lifting
// surfaces, engine nacelles, cockpit glazing and navigation lights.
function buildPlane(): { group: THREE.Group; deckY: number; halfLen: number; halfWide: number } {
  const g = new THREE.Group();
  const WHITE = 0xfafbff;
  const GREY = 0xd4d8e4;
  const BLUE = 0x8fbfe8;
  const RED = 0xef8378;
  const DARK = 0x3a3f4a;
  const STEEL = 0x87909d;

  const LEN = 78, R = 5.4;
  const addCourse = (w: number, h: number, d: number, z: number, y = 0, color = WHITE) => {
    const m = box(w, h, d, color);
    m.position.set(0, y, z);
    g.add(m);
    return m;
  };

  // Main pressure vessel: narrower crown and belly courses create a rounded
  // cross-section while retaining a flat top that Terra-Armor can stand on.
  addCourse(9.7, 7.4, 54, 0, 0.15);
  addCourse(8.3, 1.8, 53, 0, 4.35, WHITE);
  addCourse(8.5, 2.1, 52, -0.2, -4.15, GREY);
  addCourse(6.5, 1.0, 49, -0.4, -5.45, DARK);

  // Five stepped forward courses form an aerodynamic radome instead of one
  // blunt cube. The lowest course projects furthest to suggest the nose droop.
  const noseCourses = [
    [9.4, 7.0, 5.0, 28.8, 0.05], [8.2, 6.2, 4.0, 33.2, -0.05],
    [6.7, 5.0, 3.2, 36.7, -0.25], [4.8, 3.6, 2.4, 39.5, -0.55],
    [2.7, 2.0, 1.6, 41.5, -0.85],
  ] as const;
  for (const [w, h, d, z, y] of noseCourses) addCourse(w, h, d, z, y);

  // The aft pressure body pinches upward into the tail cone.
  const tailCourses = [
    [9.0, 6.8, 5.0, -29, 0.25], [7.5, 5.6, 4.0, -33.4, 0.65],
    [5.8, 4.3, 3.2, -36.9, 1.1], [4.0, 3.0, 2.6, -39.8, 1.55],
    [2.2, 1.8, 2.0, -42.1, 1.95],
  ] as const;
  for (const [w, h, d, z, y] of tailCourses) addCourse(w, h, d, z, y);

  // Angled cockpit windshield, eyebrow frames and lower radome glazing.
  const cockpit = box(6.2, 1.35, 1.0, DARK);
  cockpit.position.set(0, 2.25, 35.5);
  cockpit.rotation.x = -0.12;
  g.add(cockpit);
  for (const side of [-1, 1]) {
    const windshield = box(2.45, 1.15, 0.28, 0x6dc8ec, 0x16374c);
    windshield.position.set(side * 1.45, 2.25, 36.08);
    windshield.rotation.z = side * -0.12;
    windshield.rotation.x = -0.12;
    const eyebrow = box(2.65, 0.22, 0.38, WHITE);
    eyebrow.position.set(side * 1.45, 3.05, 35.9);
    eyebrow.rotation.z = side * -0.1;
    g.add(windshield, eyebrow);
  }

  // cabin window stripe down both flanks
  for (let i = 0; i < 18; i++) {
    const z = -25.5 + i * 3.05;
    for (const side of [-1, 1]) {
      const win = box(0.3, 0.62, 1.28, BLUE, 0x223344);
      win.position.set(side * 4.98, 1.35, z);
      g.add(win);
    }
  }
  // Side-only livery stripes, doors, cargo holds and belly beacon.
  for (const side of [-1, 1]) {
    const stripe = box(0.22, 0.7, 51, RED);
    stripe.position.set(side * 4.96, -0.85, 0);
    g.add(stripe);
    for (const z of [-20, 21]) {
      const door = box(0.26, 3.0, 2.0, GREY);
      door.position.set(side * 5.04, 0.05, z);
      const handle = box(0.12, 0.18, 0.6, DARK);
      handle.position.set(side * 5.2, 0.7, z + 0.45);
      g.add(door, handle);
    }
    const cargo = box(0.2, 1.7, 8, DARK);
    cargo.position.set(side * 4.58, -3.3, -8);
    g.add(cargo);
  }
  const beacon = box(0.65, 0.35, 0.65, RED, 0xff1818);
  beacon.position.set(0, -5.95, -2);
  g.add(beacon);

  // Swept wings are built in narrowing chordwise courses. Each course moves
  // aft as it moves outward, producing a genuine leading/trailing edge sweep.
  const WINGSPAN = 62;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const chord = 19 - i * 2.0;
      const section = box(4.5, 1.05 - i * 0.08, chord, i === 6 ? RED : WHITE);
      section.position.set(side * (6.3 + i * 4.15), -1.15 + i * 0.08, -1.5 - i * 1.85);
      section.rotation.y = side * -0.018;
      g.add(section);
      const leading = box(4.2, 0.28, 0.55, GREY);
      leading.position.set(section.position.x, section.position.y + 0.12, section.position.z + chord / 2);
      g.add(leading);
    }
    const winglet = box(1.15, 5.2, 3.1, RED);
    winglet.position.set(side * 31, 1.3, -13.3);
    winglet.rotation.z = side * -0.2;
    g.add(winglet);

    // Four high-bypass turbofans. Round nacelles and visible fan hubs make the
    // propulsion immediately recognizable even from below.
    for (const [x, z, scale] of [[12.5, 2.1, 1], [21.5, -3.0, 0.88]] as const) {
      // Octagonal voxel nacelle: a cowling, a stepped-out intake lip and a
      // fan hub, all built from slabs like the rest of the airframe.
      const nacelle = voxelTube(2.5 * scale, 9.5, GREY);
      nacelle.position.set(side * x, -4.2, z);
      const intake = voxelTube(2.62 * scale, 0.85, DARK, true);
      intake.position.set(side * x, -4.2, z + 4.95);
      const fan = voxelTube(0.78 * scale, 0.8, STEEL);
      fan.position.set(side * x, -4.2, z + 5.33);
      const exhaust = box(2.7 * scale, 2.7 * scale, 0.7, DARK);
      exhaust.position.set(side * x, -4.2, z - 4.9);
      const pylon = box(1.1, 2.4, 3.8, GREY);
      pylon.position.set(side * x, -2.35, z - 0.3);
      pylon.rotation.x = -0.1;
      g.add(nacelle, intake, fan, exhaust, pylon);
    }
    const nav = box(0.65, 0.55, 1.0, side < 0 ? 0xff3030 : 0x37ff73, side < 0 ? 0xff1010 : 0x10ff45);
    nav.position.set(side * 31.4, 0.2, -12.0);
    g.add(nav);
  }

  // tail: vertical fin + horizontal stabilizers
  // Swept vertical stabilizer, dorsal fairing and segmented tailplanes.
  for (let i = 0; i < 5; i++) {
    const fin = box(1.15, 3.1, 9.5 - i * 1.45, i > 2 ? RED : WHITE);
    fin.position.set(0, 5.1 + i * 2.8, -32.2 - i * 1.05);
    g.add(fin);
  }
  const dorsal = box(1.8, 1.2, 11, GREY);
  dorsal.position.set(0, 5.3, -29.5);
  g.add(dorsal);
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const stab = box(3.7, 0.75, 8.5 - i * 1.2, i === 3 ? RED : WHITE);
      stab.position.set(side * (5.7 + i * 3.45), 3.0 + i * 0.08, -32.5 - i * 1.2);
      g.add(stab);
    }
  }

  // Retracted landing-gear doors and anti-collision light complete the belly.
  for (const side of [-1, 1]) {
    const gearDoor = box(1.6, 0.2, 5.4, DARK);
    gearDoor.position.set(side * 2.1, -5.7, -5.5);
    g.add(gearDoor);
  }
  const tailLight = box(0.5, 0.5, 0.55, WHITE, 0xffffff);
  tailLight.position.set(0, 2.1, -43.2);
  g.add(tailLight);

  // deck sits on top of the fuselage; wings are slightly lower but the flat
  // deck band covers the whole silhouette so landings feel forgiving
  g.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh) { mesh.castShadow = true; mesh.receiveShadow = true; }
  });
  return { group: g, deckY: R * 0.96, halfLen: LEN / 2, halfWide: WINGSPAN / 2 };
}

export class PlaneManager {
  group = new THREE.Group();
  planes: Plane[] = [];

  constructor() {
    for (let i = 0; i < COUNT; i++) {
      const { group, deckY, halfLen, halfWide } = buildPlane();
      const heading = Math.random() * Math.PI * 2;
      group.position.set(
        (Math.random() - 0.5) * SPAN,
        62 + Math.random() * 34,
        (Math.random() - 0.5) * SPAN
      );
      group.rotation.y = heading;
      this.group.add(group);
      this.planes.push({
        group, heading, deckY, halfLen, halfWide,
        speed: 4 + Math.random() * 3.5, // slow cruise
        dx: 0, dz: 0,
        hp: PLANE_HP, crashing: false, fallVel: 0, roll: 0, smokeT: 0,
      });
    }
  }

  /** Advance the fleet. Returns crash sites for any plane that hit the ground
   *  this frame so the caller can blow a hole in the city. */
  update(dt: number, center: THREE.Vector3, groundAt: (x: number, z: number) => number): PlaneCrash[] {
    const crashes: PlaneCrash[] = [];
    for (const p of this.planes) {
      if (p.crashing) {
        // stricken: nose over, roll, and accelerate into the city
        p.fallVel = Math.min(70, p.fallVel + 26 * dt);
        p.roll += dt * 1.6;
        p.speed = Math.max(0, p.speed - dt * 1.2);
        p.dx = Math.sin(p.heading) * p.speed * dt;
        p.dz = Math.cos(p.heading) * p.speed * dt;
        p.group.position.x += p.dx;
        p.group.position.z += p.dz;
        p.group.position.y -= p.fallVel * dt;
        p.group.rotation.z = Math.sin(p.roll) * 0.9;
        p.group.rotation.x = Math.min(1.1, p.fallVel / 55);
        p.smokeT -= dt;

        const gy = groundAt(p.group.position.x, p.group.position.z);
        if (p.group.position.y <= gy + 6) {
          crashes.push({ at: p.group.position.clone(), heading: p.heading });
          this.reset(p, center);
        }
        continue;
      }

      p.dx = Math.sin(p.heading) * p.speed * dt;
      p.dz = Math.cos(p.heading) * p.speed * dt;
      p.group.position.x += p.dx;
      p.group.position.z += p.dz;
      // wrap around the player so there is always traffic overhead
      const rx = p.group.position.x - center.x;
      const rz = p.group.position.z - center.z;
      if (rx > SPAN / 2) p.group.position.x -= SPAN;
      if (rx < -SPAN / 2) p.group.position.x += SPAN;
      if (rz > SPAN / 2) p.group.position.z -= SPAN;
      if (rz < -SPAN / 2) p.group.position.z += SPAN;
    }
    return crashes;
  }

  /** Put a fresh airliner back into the sky far from the player. */
  private reset(p: Plane, center: THREE.Vector3): void {
    const a = Math.random() * Math.PI * 2;
    p.heading = Math.random() * Math.PI * 2;
    p.group.position.set(
      center.x + Math.sin(a) * SPAN * 0.45,
      62 + Math.random() * 34,
      center.z + Math.cos(a) * SPAN * 0.45
    );
    p.group.rotation.set(0, p.heading, 0);
    p.hp = PLANE_HP;
    p.crashing = false;
    p.fallVel = 0;
    p.roll = 0;
    p.speed = 4 + Math.random() * 3.5;
  }

  /** Hit test a sphere against the fleet; returns planes newly shot down. */
  damageSphere(pt: THREE.Vector3, radius: number, dmg: number): Plane[] {
    const downed: Plane[] = [];
    for (const p of this.planes) {
      if (p.crashing) continue;
      if (!this.overlaps(p, pt, radius)) continue;
      p.hp -= dmg;
      if (p.hp <= 0) { p.crashing = true; downed.push(p); }
    }
    return downed;
  }

  /** Hit test a ray against the fleet (railgun / beam / tracers). */
  damageRay(from: THREE.Vector3, dir: THREE.Vector3, maxDist: number, dmg: number): Plane[] {
    const downed: Plane[] = [];
    for (const p of this.planes) {
      if (p.crashing) continue;
      _v.copy(p.group.position).sub(from);
      const along = _v.dot(dir);
      if (along < 0 || along > maxDist) continue;
      _w.copy(dir).multiplyScalar(along);
      if (_v.sub(_w).length() > p.halfWide * 0.55) continue;
      p.hp -= dmg;
      if (p.hp <= 0) { p.crashing = true; downed.push(p); }
    }
    return downed;
  }

  // Rough silhouette test: the fuselage spine or the wing box.
  private overlaps(p: Plane, pt: THREE.Vector3, radius: number): boolean {
    if (Math.abs(pt.y - p.group.position.y) > 10 + radius) return false;
    const ox = pt.x - p.group.position.x, oz = pt.z - p.group.position.z;
    const s = Math.sin(p.heading), c = Math.cos(p.heading);
    const lx = ox * c - oz * s;
    const lz = ox * s + oz * c;
    const onSpine = Math.abs(lx) <= 8 + radius && Math.abs(lz) <= p.halfLen + radius;
    const onWings = Math.abs(lx) <= p.halfWide + radius && lz >= -18 - radius && lz <= 12 + radius;
    return onSpine || onWings;
  }

  // The plane whose deck is directly under this point, within a vertical band.
  // `feetY` is the bottom of the mecha; `band` how far below to still catch.
  deckUnder(x: number, feetY: number, z: number, band: number): Plane | null {
    for (const p of this.planes) {
      const top = p.group.position.y + p.deckY;
      if (feetY < top - band || feetY > top + band + 3) continue;
      // rotate the world offset into the plane's local frame (nose = +z)
      const ox = x - p.group.position.x, oz = z - p.group.position.z;
      const s = Math.sin(p.heading), c = Math.cos(p.heading);
      const lx = ox * c - oz * s; // across the wings
      const lz = ox * s + oz * c; // along the fuselage
      // the deck is a cross: the fuselage spine plus the wing box
      const onSpine = Math.abs(lx) <= 7 && Math.abs(lz) <= p.halfLen;
      const onWings = Math.abs(lx) <= p.halfWide && lz >= -14 && lz <= 10;
      if (onSpine || onWings) return p;
    }
    return null;
  }
}
