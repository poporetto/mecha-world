// Airliners cruising slowly over Neo Tokyo. They double as moving platforms:
// the mecha can land on the fuselage/wing deck and ride along.

import * as THREE from 'three';

const COUNT = 4;
const SPAN = 620; // how far a plane travels before wrapping around the player

export interface Plane {
  group: THREE.Group;
  heading: number; // radians, direction of travel
  speed: number;
  deckY: number; // world y of the walkable top surface
  halfLen: number; // along the fuselage
  halfWide: number; // across the wings
  dx: number; // movement applied this frame (platform carry)
  dz: number;
}

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
}

// A chunky voxel airliner, nose pointing +Z (the group's heading direction).
function buildPlane(): { group: THREE.Group; deckY: number; halfLen: number; halfWide: number } {
  const g = new THREE.Group();
  const WHITE = 0xfafbff;
  const GREY = 0xd4d8e4;
  const BLUE = 0x8fbfe8;
  const RED = 0xef8378;
  const DARK = 0x3a3f4a;

  const LEN = 74, R = 5.5; // fuselage length / radius
  // fuselage: a flat-topped tube so there is a real deck to stand on
  const body = box(R * 2, R * 1.7, LEN, WHITE);
  body.position.y = 0;
  const belly = box(R * 1.7, R * 0.9, LEN * 0.96, GREY);
  belly.position.y = -R * 0.9;
  // nose cone + tail taper
  const nose = box(R * 1.4, R * 1.2, 8, WHITE);
  nose.position.set(0, -0.3, LEN / 2 + 3.5);
  const cockpit = box(R * 1.1, 1.4, 3, DARK);
  cockpit.position.set(0, 1.2, LEN / 2 + 1.5);
  const tailCone = box(R * 1.3, R * 1.2, 8, WHITE);
  tailCone.position.set(0, 1.2, -LEN / 2 - 3);
  g.add(body, belly, nose, cockpit, tailCone);

  // cabin window stripe down both flanks
  for (let i = 0; i < 16; i++) {
    const z = -LEN / 2 + 6 + i * 4.2;
    for (const side of [-1, 1]) {
      const win = box(0.4, 0.8, 2.2, BLUE, 0x223344);
      win.position.set(side * (R + 0.05), 1.1, z);
      g.add(win);
    }
  }
  // livery stripe
  const stripe = box(R * 2.02, 0.9, LEN * 0.9, RED);
  stripe.position.set(0, -1.6, 0);
  g.add(stripe);

  // wings: broad and flat — the widest part of the landing deck
  const WINGSPAN = 62;
  for (const side of [-1, 1]) {
    const wing = box(WINGSPAN / 2, 1.6, 20, WHITE);
    wing.geometry.translate((side * WINGSPAN) / 4, 0, 0);
    wing.position.set(0, -1.2, -2);
    g.add(wing);
    const tip = box(2, 3.5, 5, RED);
    tip.position.set(side * (WINGSPAN / 2 - 1), 1, -2);
    g.add(tip);
    // two engines slung under each wing
    for (const [ox, oz] of [[0.34, 3], [0.6, 1]] as const) {
      const eng = box(5, 5, 12, GREY);
      eng.position.set(side * WINGSPAN * ox, -4.2, oz);
      const intake = box(5.4, 5.4, 1.2, DARK);
      intake.position.set(side * WINGSPAN * ox, -4.2, oz + 6.2);
      g.add(eng, intake);
    }
  }

  // tail: vertical fin + horizontal stabilizers
  const fin = box(1.6, 16, 14, RED);
  fin.position.set(0, 11, -LEN / 2 + 2);
  g.add(fin);
  for (const side of [-1, 1]) {
    const stab = box(15, 1.2, 9, WHITE);
    stab.geometry.translate((side * 15) / 2, 0, 0);
    stab.position.set(0, 3, -LEN / 2 + 2);
    g.add(stab);
  }

  // deck sits on top of the fuselage; wings are slightly lower but the flat
  // deck band covers the whole silhouette so landings feel forgiving
  return { group: g, deckY: R * 0.85, halfLen: LEN / 2, halfWide: WINGSPAN / 2 };
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
      });
    }
  }

  update(dt: number, center: THREE.Vector3): void {
    for (const p of this.planes) {
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
