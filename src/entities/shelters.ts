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
  /**
   * Ceiling for Kotetsu's expansion. Per-shelter because the Act II staging
   * shelter is hardened and much larger — a single global cap would have him
   * quietly shrinking it back down to ward size.
   */
  maxCapacity: number;
  /**
   * Act II retires the outlying wards once their population has been moved
   * into the staging shelter. A retired ward is out of the run entirely — it
   * cannot be lost, filled or defended.
   */
  retired: boolean;
}

// A ward needs enough room to absorb a few destroyed buildings before it
// becomes a campaign-level failure. The original 120-person limit could be
// exceeded during ordinary combat well before the player had a fair chance to
// respond.
const BASE_CAPACITY = 300;
/** People filing back out of a ward per second while no kaiju is up. */
const DRAIN = 2.5;
/** However long Kotetsu works, a ward tops out here. */
const MAX_CAPACITY = 560;
/**
 * The Act II staging shelter is hardened and much larger, because it is
 * holding what is left of four wards and it is the only one left to lose.
 */
const STAGING_CAPACITY = 900;
/** Kotetsu can extend the staging shelter further than a city ward. */
const STAGING_MAX_CAPACITY = 1400;

export class ShelterManager {
  group = new THREE.Group();
  shelters: Shelter[] = [];
  /** Set once a shelter has been lost — the run is over. */
  lost: Shelter | null = null;

  constructor(private groundAt: (x: number, z: number) => number) {
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
        maxCapacity: MAX_CAPACITY,
        retired: false,
      });
    }
  }

  /** Wards still in the run. Never empty — the staging shelter always remains. */
  get active(): Shelter[] {
    return this.shelters.filter((s) => !s.retired);
  }

  /**
   * Positions for the evacuee crowd to run to, with retired wards left as
   * null so the array stays index-aligned with `arrived` and `admit`.
   */
  get targets(): (THREE.Vector3 | null)[] {
    return this.shelters.map((s) => (s.retired ? null : s.pos));
  }

  /** Weakest shelter, for the HUD readout. */
  get weakest(): Shelter {
    return this.active.reduce((a, b) => (a.hp <= b.hp ? a : b));
  }

  get anyUnderAttack(): Shelter | null {
    return this.shelters.find((s) => s.underAttack && !s.retired) ?? null;
  }

  /** The ward closest to bursting, for the HUD. */
  get fullest(): Shelter {
    return this.active.reduce((a, b) =>
      a.people / a.capacity >= b.people / b.capacity ? a : b);
  }

  /** Take in evacuees. Returns a shelter if one has just overflowed. */
  admit(counts: number[]): Shelter | null {
    let burst: Shelter | null = null;
    for (let i = 0; i < counts.length && i < this.shelters.length; i++) {
      if (counts[i] <= 0) continue;
      const s = this.shelters[i];
      if (s.retired) continue;
      s.people += counts[i];
      if (s.people > s.capacity && !burst) burst = s;
    }
    return burst;
  }

  /**
   * Act II: the outlying wards empty into a single hardened staging shelter
   * that moves up the line behind the player each chapter. This is what makes
   * leaving Neo Tokyo possible at all — without it, walking away from four
   * fixed wards is an automatic loss the moment a kaiju settles on one.
   *
   * Only a fraction of the population comes along. The rest are already on the
   * mainland; these are the ones who would not go.
   */
  consolidate(pos: THREE.Vector3, name: string): Shelter {
    const keep = this.shelters[0];
    // Idempotent: consolidating twice would take 45% of an already-reduced
    // population and quietly evaporate the survivors. Once the wards are in,
    // later chapters move the shelter with relocate() instead.
    if (this.active.length === 1) {
      this.relocate(pos, name);
      return keep;
    }
    let total = 0;
    for (const s of this.shelters) {
      total += s.people;
      if (s !== keep) {
        s.retired = true;
        s.underAttack = false;
        s.people = 0;
        s.ring.visible = false;
      }
    }
    keep.retired = false;
    keep.hp = MAX_HP;
    keep.capacity = STAGING_CAPACITY;
    keep.maxCapacity = STAGING_MAX_CAPACITY;
    keep.people = Math.min(total * 0.45, STAGING_CAPACITY * 0.5);
    this.relocate(pos, name);
    return keep;
  }

  /** Move the staging shelter up the line. Population and capacity come with it. */
  relocate(pos: THREE.Vector3, name: string): void {
    const s = this.shelters[0];
    s.name = name;
    s.pos.copy(pos);
    s.ring.visible = true;
    s.ring.position.set(pos.x, pos.y + 0.4, pos.z);
  }

  /**
   * With no kaiju in the sky, people start filing back out to what is left of
   * their block. Drones do not count — nobody stays underground over those.
   * This is the reward for killing a boss fast: the wards breathe again, and a
   * long clean stretch can undo a messy fight.
   */
  release(dt: number): void {
    for (const s of this.active) {
      if (s.hp > 0 && !s.underAttack && s.people > 0) {
        s.people = Math.max(0, s.people - dt * DRAIN);
      }
    }
  }

  /**
   * Kotetsu is a mechanic before he is a gunner. While he is deployed he
   * quietly extends the wards, which is the only thing keeping the population
   * ahead of the demolition. There is a ceiling: he can only bolt so many
   * frames onto a ward before it stops being a building. Without that cap a
   * long deployment makes overflow impossible and the fail state disappears.
   */
  expand(dt: number): void {
    for (const s of this.active) {
      if (s.hp > 0) s.capacity = Math.min(s.maxCapacity, s.capacity + dt * 3.2);
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

    for (const s of this.active) {
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
    for (const s of this.active) {
      if (s.hp > 0 && !s.underAttack) s.hp = Math.min(MAX_HP, s.hp + dt * 0.9);
    }
  }

  /**
   * Jotetsu's Digger reinforces damaged wards and steadily moves sheltered
   * civilians into freshly rebuilt housing. Returns the ward being serviced.
   */
  reconstruct(dt: number): Shelter {
    const target = this.active.reduce((a, b) => {
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
    // Act II moves and retires wards, so a restart has to put all four back
    // where they started rather than only clearing their counters.
    for (let i = 0; i < this.shelters.length; i++) {
      const s = this.shelters[i];
      const site = SHELTER_SITES[i];
      s.hp = MAX_HP;
      s.underAttack = false;
      s.people = 0;
      s.capacity = BASE_CAPACITY;
      s.maxCapacity = MAX_CAPACITY;
      s.retired = false;
      s.name = site.name;
      s.pos.set(site.x, this.groundAt(site.x, site.z), site.z);
      s.ring.visible = true;
      s.ring.position.set(s.pos.x, s.pos.y + 0.4, s.pos.z);
    }
  }
}
