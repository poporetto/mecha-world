// Civilian shelters — the thing the campaign is actually defending.
//
// They cannot be hurt by the player: only kaiju standing over one grind it
// down. Lose a single shelter and the run is over, so a boss that slips past
// you and settles on a ward is a timer, not a nuisance.

import * as THREE from 'three';
import { SHELTER_SITES } from '../core/worldgen';

const MAX_HP = 100;
const THREAT_RANGE = 46;   // a kaiju this close is attacking the shelter
const DPS = 5.2;           // integrity lost per second while it stands there
const DRONE_RANGE = 26;
const DRONE_DPS = 1.6;

export interface Shelter {
  name: string;
  pos: THREE.Vector3;
  hp: number;
  /** true while something hostile is close enough to be hurting it */
  underAttack: boolean;
  ring: THREE.Mesh;
  /** How many people are inside, and how many it can hold. */
  people: number;
  capacity: number;
}

// A ward needs enough room to absorb a few destroyed buildings before it
// becomes a campaign-level failure. The original 120-person limit could be
// exceeded during ordinary combat well before the player had a fair chance to
// respond.
const BASE_CAPACITY = 300;

export class ShelterManager {
  group = new THREE.Group();
  shelters: Shelter[] = [];
  /** Set once a shelter has been lost — the run is over. */
  lost: Shelter | null = null;

  constructor(groundAt: (x: number, z: number) => number) {
    for (const site of SHELTER_SITES) {
      const y = groundAt(site.x, site.z);
      // a marker ring so the ward reads as protected ground from the air
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(15, 17.5, 40),
        new THREE.MeshBasicMaterial({
          color: 0x5cf2a0, transparent: true, opacity: 0.42,
          side: THREE.DoubleSide, depthWrite: false,
        })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(site.x, y + 0.4, site.z);
      this.group.add(ring);
      this.shelters.push({
        name: site.name,
        pos: new THREE.Vector3(site.x, y, site.z),
        hp: MAX_HP,
        underAttack: false,
        ring,
        people: 0,
        capacity: BASE_CAPACITY,
      });
    }
  }

  /** Weakest shelter, for the HUD readout. */
  get weakest(): Shelter {
    return this.shelters.reduce((a, b) => (a.hp <= b.hp ? a : b));
  }

  get anyUnderAttack(): Shelter | null {
    return this.shelters.find((s) => s.underAttack) ?? null;
  }

  /** The ward closest to bursting, for the HUD. */
  get fullest(): Shelter {
    return this.shelters.reduce((a, b) =>
      a.people / a.capacity >= b.people / b.capacity ? a : b);
  }

  /** Take in evacuees. Returns a shelter if one has just overflowed. */
  admit(counts: number[]): Shelter | null {
    let burst: Shelter | null = null;
    for (let i = 0; i < counts.length && i < this.shelters.length; i++) {
      if (counts[i] <= 0) continue;
      const s = this.shelters[i];
      s.people += counts[i];
      if (s.people > s.capacity && !burst) burst = s;
    }
    return burst;
  }

  /**
   * Kotetsu is a mechanic before he is a gunner. While he is deployed he
   * quietly extends the wards, which is the only thing keeping the population
   * ahead of the demolition.
   */
  expand(dt: number): void {
    for (const s of this.shelters) {
      if (s.hp > 0) s.capacity += dt * 3.2;
    }
  }

  /**
   * Grind down any shelter with a kaiju sitting on it. Returns a shelter if
   * one has just fallen this frame.
   */
  update(
    dt: number,
    time: number,
    bossPos: THREE.Vector3 | null,
    dronePositions: THREE.Vector3[],
  ): Shelter | null {
    let justLost: Shelter | null = null;

    for (const s of this.shelters) {
      if (s.hp <= 0) continue;
      let dps = 0;
      if (bossPos && bossPos.distanceTo(s.pos) < THREAT_RANGE) dps += DPS;
      for (const d of dronePositions) {
        if (d.distanceTo(s.pos) < DRONE_RANGE) dps += DRONE_DPS;
      }
      s.underAttack = dps > 0;
      if (dps > 0) {
        s.hp = Math.max(0, s.hp - dps * dt);
        if (s.hp === 0) justLost = s;
      }

      // ring reads green when safe, pulsing red while something is on it
      const mat = s.ring.material as THREE.MeshBasicMaterial;
      if (s.underAttack) {
        mat.color.setHex(0xff4d4d);
        mat.opacity = 0.4 + Math.sin(time * 9) * 0.28;
      } else {
        const frac = s.hp / MAX_HP;
        mat.color.setHex(frac > 0.5 ? 0x5cf2a0 : 0xffc44f);
        mat.opacity = 0.42;
      }
    }

    if (justLost && !this.lost) this.lost = justLost;
    return justLost;
  }

  /** Slow self-repair while nothing is attacking, so a run stays winnable. */
  mend(dt: number): void {
    for (const s of this.shelters) {
      if (s.hp > 0 && !s.underAttack) s.hp = Math.min(MAX_HP, s.hp + dt * 0.9);
    }
  }

  /**
   * Jotetsu's Digger reinforces damaged wards and steadily moves sheltered
   * civilians into freshly rebuilt housing. Returns the ward being serviced.
   */
  reconstruct(dt: number): Shelter {
    const target = this.shelters.reduce((a, b) => {
      const aNeed = (MAX_HP - a.hp) + (a.people / a.capacity) * 70;
      const bNeed = (MAX_HP - b.hp) + (b.people / b.capacity) * 70;
      return aNeed >= bNeed ? a : b;
    });
    if (!target.underAttack && target.hp > 0) {
      target.hp = Math.min(MAX_HP, target.hp + dt * 2.4);
    }
    // Roughly 13 people per minute are rehoused from the ward being serviced.
    target.people = Math.max(0, target.people - dt * 0.22);
    return target;
  }

  reset(): void {
    this.lost = null;
    for (const s of this.shelters) {
      s.hp = MAX_HP;
      s.underAttack = false;
      s.people = 0;
      s.capacity = BASE_CAPACITY;
    }
  }
}
