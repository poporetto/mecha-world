// Boss monsters. Defeating each one grants the player an upgrade.

import * as THREE from 'three';
import { World } from '../core/world';

// Every boss teaches something distinct: a wheel weapon or a passive/ability.
export type Reward =
  | 'beam' | 'thrust' | 'nova' | 'shield' | 'blades' | 'quake' // abilities
  | 'railgun' | 'vulcan' | 'flamer' | 'aqua' // wheel weapons
  | 'repair'; // endless mode: repairs + power level

export interface MonsterCtx {
  world: World;
  playerPos: THREE.Vector3;
  destroyAt: (p: THREE.Vector3, r: number, shake: number) => void;
  damagePlayer: (amount: number) => void;
  fireRocket?: (from: THREE.Vector3, toward: THREE.Vector3) => void;
  throwBoulder?: (from: THREE.Vector3, toward: THREE.Vector3) => void;
  zapAt?: (p: THREE.Vector3) => void;
  igniteAt?: (p: THREE.Vector3, r: number) => void; // flamethrower
  floodAt?: (p: THREE.Vector3, r: number) => void; // aqua blaster
}

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity: emissive ? 1 : 0 })
  );
}

/** 1 = opening, 2 = pressured, 3 = cornered and enraged. */
export type Phase = 1 | 2 | 3;

export abstract class Monster {
  group = new THREE.Group();
  hp: number;
  maxHp: number;
  dead = false; // true once death animation done (remove from scene)
  dying = false;

  /**
   * Fights escalate instead of running one loop until the HP bar empties.
   * Crossing 60% and 25% shifts the boss up a gear: it moves faster, attacks
   * come closer together, and it announces the change with a roar the player
   * has to respect. Individual bosses read `tempo` and `pace` rather than each
   * reimplementing the curve.
   */
  phase: Phase = 1;
  /** Set to the new phase for one frame on a transition, for the game to read. */
  phaseAnnounce: Phase | 0 = 0;
  /** Multiplies attack cadence — higher means attacks land closer together. */
  get tempo(): number {
    return this.phase === 1 ? 1 : this.phase === 2 ? 1.3 : 1.7;
  }
  /** Multiplies movement speed. */
  get pace(): number {
    return this.phase === 1 ? 1 : this.phase === 2 ? 1.18 : 1.42;
  }

  /**
   * Seconds left in a punish window. A boss that has just committed to a heavy
   * attack is open: the core is exposed, it cannot start another attack, and
   * everything hurts it more. This is what turns dodging into an opportunity
   * rather than just survival.
   */
  vulnT = 0;
  get vulnerable(): boolean {
    return this.vulnT > 0;
  }
  /** Damage multiplier applied to hits landed inside a punish window. */
  static readonly PUNISH = 1.9;

  protected deathT = 0;
  protected flashT = 0;
  private roarT = 0;
  /** Set while a heavy attack winds up — renders a warning tint so the
   *  player can read the tell and dash out of the way. */
  protected telegraph = false;
  private coreT = 0;
  private staggerT = 0;
  private staggerStrength = 0;
  /** Glowing dorsal core: the visible weak point. Local y is chosen so it
   *  sits high on the back once MONSTER_SCALE is applied. */
  weakCore!: THREE.Mesh;
  abstract name: string;
  abstract reward: Reward;
  hitRadius = 8;

  constructor(hp: number) {
    this.hp = hp;
    this.maxHp = hp;
  }

  /**
   * Apply damage. Returns what actually landed, which is more than was asked
   * for if the boss was caught inside a punish window — the caller needs the
   * real number for score and for the damage readout.
   */
  takeDamage(amount: number, _src?: string): number {
    if (this.dying) return 0;
    const dealt = this.vulnerable ? amount * Monster.PUNISH : amount;
    this.hp = Math.max(0, this.hp - dealt);
    this.flashT = 0.14;
    this.staggerT = Math.max(this.staggerT, 0.16);
    this.staggerStrength = Math.max(this.staggerStrength, Math.min(1, dealt / 42));
    if (this.hp <= 0) {
      this.dying = true;
      return dealt;
    }
    // gear changes at 60% and 25% — only ever upward
    const frac = this.hp / this.maxHp;
    const want: Phase = frac <= 0.25 ? 3 : frac <= 0.6 ? 2 : 1;
    if (want > this.phase) {
      this.phase = want;
      this.phaseAnnounce = want;
      this.roarT = 1.1;
      // the roar cancels whatever opening it had — no free damage off a tell
      this.vulnT = 0;
      this.onPhase(want);
    }
    return dealt;
  }

  /** Bosses override to swap in phase-specific behaviour. */
  protected onPhase(_p: Phase): void {}

  /**
   * Open the boss up. Call straight after committing to a heavy attack: it is
   * planted, the core is lit, and hits do PUNISH times damage until it
   * recovers.
   */
  protected openWindow(sec: number): void {
    this.vulnT = Math.max(this.vulnT, sec);
  }

  protected updateFlash(dt: number): void {
    this.coreT += dt;
    this.updateCore(this.coreT);
    this.flashT -= dt;
    this.vulnT = Math.max(0, this.vulnT - dt);
    this.roarT = Math.max(0, this.roarT - dt);
    this.staggerT = Math.max(0, this.staggerT - dt);
    const stagger = this.staggerT > 0
      ? Math.sin((this.staggerT / 0.16) * Math.PI) * this.staggerStrength
      : 0;
    // A punish window reads in the silhouette too: it sags, knees buckled,
    // so an open boss is recognisable from behind or at distance.
    const sag = this.vulnerable ? Math.min(1, this.vulnT * 2.5) * 0.06 : 0;
    // A roar swells it up to full height — the opposite shape, so the two
    // states can never be mistaken for one another.
    const swell = this.roarT > 0 ? Math.sin((this.roarT / 1.1) * Math.PI) * 0.07 : 0;
    // A short compression makes hits register on the entire silhouette while
    // preserving each boss's authored movement and heading.
    this.group.scale.set(
      MONSTER_SCALE * (1 + stagger * 0.018 + sag * 0.7 + swell),
      MONSTER_SCALE * (1 - stagger * 0.035 - sag + swell),
      MONSTER_SCALE * (1 + stagger * 0.018 + sag * 0.7 + swell),
    );
    if (this.staggerT === 0) this.staggerStrength = 0;
    const flash = this.flashT > 0;
    const roar = !flash && this.roarT > 0;
    const open = !flash && !roar && this.vulnerable;
    const warn = !flash && !roar && !open && this.telegraph;
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const mat = m.material as THREE.MeshLambertMaterial;
        // Not every material is lit. The Revenant is built from the player's
        // frame, which uses MeshBasicMaterial for the saber blade and the
        // thruster flames — those have no emissive to drive.
        if (!mat || !mat.emissive) return;
        if (flash) {
          mat.emissive.setHex(0xff2222);
          mat.emissiveIntensity = 0.8;
        } else if (roar) {
          // white-hot gear change, pulsing
          mat.emissive.setHex(0xfff0d0);
          mat.emissiveIntensity = 0.5 + Math.sin(this.coreT * 34) * 0.35;
        } else if (open) {
          mat.emissive.setHex(0x4de2ff); // cyan: hit it NOW
          mat.emissiveIntensity = 0.55 + Math.sin(this.coreT * 18) * 0.2;
        } else if (warn) {
          mat.emissive.setHex(0xffa32f); // amber wind-up
          mat.emissiveIntensity = 0.65;
        } else {
          mat.emissive.setHex(mat.userData.baseEmissive ?? 0);
          mat.emissiveIntensity = mat.userData.baseEmissive ? 1 : 0;
        }
      }
    });
  }

  /** Attach the glowing weak-point core. Call at the end of a boss ctor,
   *  before rememberEmissives() so its glow is preserved. */
  protected addCore(localY: number, localZ = -1.5): void {
    this.weakCore = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 2.6, 2.6),
      new THREE.MeshLambertMaterial({ color: 0xffe45c, emissive: 0xffc61a, emissiveIntensity: 1 })
    );
    this.weakCore.position.set(0, localY, localZ);
    this.group.add(this.weakCore);
  }

  /** World position of the weak point, for hit tests and aiming. */
  corePos(out: THREE.Vector3): THREE.Vector3 {
    if (this.weakCore) this.weakCore.getWorldPosition(out);
    else out.copy(this.group.position).setY(this.group.position.y + 24);
    return out;
  }

  protected updateCore(t: number): void {
    if (!this.weakCore) return;
    const mat = this.weakCore.material as THREE.MeshLambertMaterial;
    if (this.vulnerable) {
      // wide open: the core swells and flares cyan so it is unmissable
      this.weakCore.scale.setScalar(1.5 + Math.sin(t * 20) * 0.3);
      mat.color.setHex(0xbdf4ff);
      mat.emissive.setHex(0x4de2ff);
    } else {
      this.weakCore.scale.setScalar(0.85 + Math.sin(t * 6) * 0.15);
      mat.color.setHex(0xffe45c);
      mat.emissive.setHex(0xffc61a);
    }
  }

  protected rememberEmissives(): void {
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const mat = m.material as THREE.MeshLambertMaterial;
        // unlit materials (saber blade, thruster flames) have no emissive
        if (!mat || !mat.emissive) return;
        mat.userData.baseEmissive = mat.emissive.getHex() || 0;
      }
    });
  }

  protected updateDeath(dt: number): boolean {
    if (!this.dying) return false;
    this.deathT += dt;
    if (this.deathT < 1.6) {
      this.group.rotation.z = Math.min(Math.PI / 2, this.deathT * 1.4);
    } else {
      this.group.position.y -= dt * 2.5;
      if (this.deathT > 5) this.dead = true;
    }
    return true;
  }

  abstract update(dt: number, t: number, ctx: MonsterCtx): void;
}

// ------------------------------------------------------------------- Kaiju

export const MONSTER_SCALE = 2.2;

export class Kaiju extends Monster {
  name = 'GORGOSAUR';
  reward: Reward = 'beam';
  hitRadius = 19;
  private legL: THREE.Group;
  private legR: THREE.Group;
  private tail: THREE.Group;
  private heading = 0;
  private stompT = 0;
  private retargetT = 0;
  private target = new THREE.Vector3();

  constructor(x: number, z: number) {
    super(140);
    const BODY = 0x49534a; // charcoal green hide
    const BELLY = 0xb3ae95; // pale segmented underside
    const PLATE = 0xdfe9f0; // bone dorsal plates
    const CLAW = 0xe8e4d6;

    // torso: broad chest over a heavier gut, leaning slightly forward
    const chest = box(4.8, 4.2, 5.2, BODY);
    chest.position.set(0, 8.6, 0.8);
    const gut = box(4.4, 3.6, 4.8, BODY);
    gut.position.set(0, 6.2, -0.4);
    // stacked belly plates climbing the front
    for (let i = 0; i < 5; i++) {
      const seg = box(3.1 - i * 0.2, 0.8, 0.6, BELLY);
      seg.position.set(0, 5.2 + i * 1.05, 1.8 + i * 0.35);
      this.group.add(seg);
    }

    // neck, skull with heavy brow, snout, hinged jaw
    const neck = box(2.3, 2.4, 2.4, BODY);
    neck.position.set(0, 11.2, 2.6);
    const skull = box(2.7, 2.2, 3.4, BODY);
    skull.position.set(0, 12.4, 4.4);
    const brow = box(2.9, 0.7, 1.5, BODY);
    brow.position.set(0, 13.4, 4.7);
    const snout = box(1.9, 1.1, 2.4, BODY);
    snout.position.set(0, 12.0, 6.4);
    const jaw = box(1.7, 0.8, 2.8, BELLY);
    jaw.position.set(0, 11.0, 5.9);
    jaw.rotation.x = 0.22;
    const eyeL = box(0.45, 0.4, 0.4, 0xffa020, 0xffa020);
    eyeL.position.set(-1.05, 12.9, 5.5);
    const eyeR = eyeL.clone();
    eyeR.position.x = 1.05;
    this.group.add(neck, skull, brow, snout, jaw, eyeL, eyeR);
    // teeth along the snout edge
    for (let i = 0; i < 4; i++) {
      const tooth = box(0.24, 0.45, 0.24, CLAW);
      tooth.position.set(-0.62 + i * 0.41, 11.35, 7.35);
      this.group.add(tooth);
    }

    // three jagged rows of dorsal plates running down the spine
    for (let i = 0; i < 7; i++) {
      const h = 1.2 + Math.sin(i * 1.7) * 0.5 + (i === 3 ? 1.1 : 0);
      const mid = box(0.5, h, 1.1, PLATE);
      mid.position.set(0, 11.4 - i * 0.55 + h * 0.4, 2.6 - i * 1.7);
      mid.rotation.x = 0.35;
      this.group.add(mid);
      if (i < 6) {
        const sideL = box(0.4, h * 0.55, 0.8, PLATE);
        sideL.position.set(-1.25, 10.9 - i * 0.55, 1.8 - i * 1.7);
        sideL.rotation.x = 0.35;
        const sideR = sideL.clone();
        sideR.position.x = 1.25;
        this.group.add(sideL, sideR);
      }
    }

    // small clawed arms held in front of the chest
    for (const side of [-1, 1]) {
      const upper = box(1.0, 2.2, 1.0, BODY);
      upper.position.set(side * 2.7, 8.6, 2.2);
      upper.rotation.x = -0.5;
      const fore = box(0.85, 1.6, 0.85, BODY);
      fore.position.set(side * 2.7, 7.3, 3.1);
      this.group.add(upper, fore);
      for (let c = 0; c < 3; c++) {
        const claw = box(0.2, 0.55, 0.2, CLAW);
        claw.position.set(side * 2.7 - 0.25 + c * 0.25, 6.4, 3.3);
        this.group.add(claw);
      }
    }

    // legs: hip-pivoted groups with thigh, shin, foot, toe claws
    const makeLeg = (side: number): THREE.Group => {
      const leg = new THREE.Group();
      leg.position.set(side * 2.2, 6.4, -0.8);
      const thigh = box(2.3, 3.2, 3.0, BODY);
      thigh.position.y = -1.2;
      const shin = box(1.8, 2.8, 2.3, BODY);
      shin.position.set(0, -3.4, 0.2);
      const foot = box(2.2, 1.1, 3.1, BODY);
      foot.position.set(0, -5.0, 0.7);
      leg.add(thigh, shin, foot);
      for (let c = 0; c < 3; c++) {
        const claw = box(0.4, 0.5, 0.8, CLAW);
        claw.position.set(-0.7 + c * 0.7, -5.2, 2.4);
        leg.add(claw);
      }
      return leg;
    };
    this.legL = makeLeg(-1);
    this.legR = makeLeg(1);

    // long thick tail with bone spikes on top, drooping toward the tip
    this.tail = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const s = 2.4 - i * 0.33;
      const seg = box(s, s, 3, BODY);
      seg.position.set(0, 6.0 - i * 0.85, -4.8 - i * 2.5);
      this.tail.add(seg);
      if (i < 5) {
        const spike = box(0.4, 0.9 - i * 0.12, 0.7, PLATE);
        spike.position.set(0, 6.0 - i * 0.85 + s * 0.62, -4.8 - i * 2.5);
        spike.rotation.x = 0.4;
        this.tail.add(spike);
      }
    }

    this.group.add(chest, gut, this.legL, this.legR, this.tail);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(12.0);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    this.retargetT -= dt;
    if (this.retargetT <= 0) {
      // stalk the area around the player, plowing through the city
      const a = Math.random() * Math.PI * 2;
      this.target.set(ctx.playerPos.x + Math.sin(a) * 30, 0, ctx.playerPos.z + Math.cos(a) * 30);
      this.retargetT = 7 + Math.random() * 5;
    }
    const dx = this.target.x - this.group.position.x;
    const dz = this.target.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz);
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 1.5);
    this.group.rotation.y = this.heading;

    // rooted through a punish window: a committed stomp cannot be walked off
    if (dist > 4 && !this.vulnerable) {
      const speed = 4.5 * this.pace;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 12 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 3);

    // animate
    const gait = 4 * this.pace;
    this.legL.rotation.x = Math.sin(t * gait) * 0.5;
    this.legR.rotation.x = -Math.sin(t * gait) * 0.5;
    this.tail.rotation.y = Math.sin(t * 1.7) * 0.25;

    // stomp: carve the city under and ahead of it
    this.telegraph = this.stompT < 0.5 && this.stompT > 0;
    this.stompT -= dt;
    if (this.stompT <= 0 && !this.vulnerable) {
      this.stompT = 1.1 / this.tempo;
      const fwd = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
      const p = this.group.position.clone().addScaledVector(fwd, 11);
      p.y = this.group.position.y + 8;
      ctx.destroyAt(p, 8, 0.5);
      const feet = this.group.position.clone();
      feet.y += 2;
      ctx.destroyAt(feet, 6, 0.3);
      if (this.group.position.distanceTo(ctx.playerPos) < 20) {
        ctx.damagePlayer(14);
      }
      // now and then it overcommits and has to haul itself back upright.
      // Kept low: the stomp cycle is only ~1.1s, so a frequent window would
      // leave the campaign's first boss immobile for a third of the fight.
      if (Math.random() < 0.2) this.openWindow(1.2);
    }
  }
}

// ------------------------------------------------------------ Rocket beast

export class RocketBeast extends Monster {
  name = 'MISSILE MAW';
  reward: Reward = 'thrust';
  hitRadius = 15;
  private orbitA = Math.random() * Math.PI * 2;
  private fireT = 3;
  private salvo = 0;   // rockets left in the current burst
  private salvoT = 0;
  private podL: THREE.Mesh;
  private podR: THREE.Mesh;

  constructor(x: number, z: number) {
    super(160);
    const HULL = 0x5b4a9e;
    const DARK = 0x2c2a38;

    const body = box(4.5, 3.5, 5.5, HULL);
    body.position.y = 8;
    const head = box(2.6, 2, 2.8, DARK);
    head.position.set(0, 9.6, 3.4);
    const eye = box(1.8, 0.5, 0.3, 0xff3355, 0xff3355);
    eye.position.set(0, 9.8, 4.9);
    this.podL = box(1.6, 1.6, 3, DARK);
    this.podL.position.set(-3.2, 9.6, 0);
    this.podR = this.podL.clone();
    this.podR.position.x = 3.2;
    const tubesL = box(1.2, 1.2, 0.4, 0xff7a2f, 0xff7a2f);
    tubesL.position.set(-3.2, 9.6, 1.6);
    const tubesR = tubesL.clone();
    tubesR.position.x = 3.2;
    const legL = box(1.2, 5, 1.6, HULL);
    legL.position.set(-1.6, 4, 0);
    const legR = legL.clone();
    legR.position.x = 1.6;
    const jetL = box(0.9, 0.6, 0.9, 0x39e6e0, 0x39e6e0);
    jetL.position.set(-1.6, 1.2, 0);
    const jetR = jetL.clone();
    jetR.position.x = 1.6;
    this.group.add(body, head, eye, this.podL, this.podR, tubesL, tubesR, legL, legR, jetL, jetR);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(11.0);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    // hover-orbit around the player — stalls out while venting heat
    if (!this.vulnerable) {
      this.orbitA += dt * 0.15 * this.pace;
      const R = 34;
      const tx = ctx.playerPos.x + Math.sin(this.orbitA) * R;
      const tz = ctx.playerPos.z + Math.cos(this.orbitA) * R;
      this.group.position.x += (tx - this.group.position.x) * Math.min(1, dt * 0.8);
      this.group.position.z += (tz - this.group.position.z) * Math.min(1, dt * 0.8);
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 40);
    const targetY = gy + 9 + Math.sin(t * 1.3) * 2.5;
    this.group.position.y += (targetY - this.group.position.y) * Math.min(1, dt * 2);

    // face player
    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    this.group.rotation.y = Math.atan2(dx, dz);

    this.telegraph = this.fireT < 0.7 && this.fireT > 0;
    this.fireT -= dt;
    if (this.fireT <= 0 && ctx.fireRocket && !this.vulnerable) {
      this.fireT = 3.2 / this.tempo;
      const from = this.group.position.clone();
      from.y += 9.6 * MONSTER_SCALE;
      ctx.fireRocket(from, ctx.playerPos.clone().setY(ctx.playerPos.y + 2));
      // in the later gears it empties both pods in a salvo, then hangs there
      // venting heat with nothing left to shoot back with
      if (this.phase > 1) {
        this.salvo = this.phase === 3 ? 3 : 2;
        this.salvoT = 0.22;
      }
    }
    if (this.salvo > 0) {
      this.salvoT -= dt;
      if (this.salvoT <= 0 && ctx.fireRocket) {
        this.salvoT = 0.22;
        this.salvo--;
        const from = this.group.position.clone();
        from.y += 9.6 * MONSTER_SCALE;
        ctx.fireRocket(from, ctx.playerPos.clone().setY(ctx.playerPos.y + 2));
        if (this.salvo === 0) this.openWindow(1.9);
      }
    }
  }
}

// ------------------------------------------------------------ Volt Serpent

export class VoltSerpent extends Monster {
  name = 'VOLT SERPENT';
  reward: Reward = 'nova';
  hitRadius = 13;
  private segments: THREE.Group[] = [];
  private trail: THREE.Vector3[] = [];
  private trailT = 0;
  private zapT = 5;
  private heading = 0;

  constructor(x: number, z: number) {
    super(200);
    const SCALE1 = 0x8a6fd8; // violet
    const SCALE2 = 0xf8dfa2; // pale gold

    // head
    const head = new THREE.Group();
    const skull = box(3.2, 2.6, 4, SCALE1);
    skull.position.y = 3;
    const jaw = box(2.6, 0.8, 3.2, SCALE2);
    jaw.position.set(0, 1.8, 0.6);
    const eyeL = box(0.5, 0.5, 0.5, 0x39e6ff, 0x39e6ff);
    eyeL.position.set(-1.2, 3.6, 1.8);
    const eyeR = eyeL.clone();
    eyeR.position.x = 1.2;
    const hornL = box(0.5, 1.8, 0.5, 0xfff2b0, 0xfff2b0);
    hornL.position.set(-1.1, 5, -0.8);
    hornL.rotation.z = 0.3;
    const hornR = hornL.clone();
    hornR.position.x = 1.1;
    hornR.rotation.z = -0.3;
    head.add(skull, jaw, eyeL, eyeR, hornL, hornR);
    this.group.add(head);

    // body segments live directly in the scene-space group
    for (let i = 0; i < 8; i++) {
      const seg = new THREE.Group();
      const s = 2.6 - i * 0.22;
      const core = box(s, s, s + 0.8, i % 2 === 0 ? SCALE1 : SCALE2);
      core.position.y = s / 2 + 0.5;
      const spike = box(0.4, 1.2, 0.4, 0x39e6e0, 0x39e6e0);
      spike.position.y = s + 1;
      seg.add(core, spike);
      this.segments.push(seg);
    }
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(5.0);
    this.rememberEmissives();
  }

  // segments are children of group but positioned in group-local space
  // along a breadcrumb trail left by the head.
  addSegmentsTo(scene: THREE.Object3D): void {
    for (const s of this.segments) scene.add(s);
  }

  removeSegmentsFrom(scene: THREE.Object3D): void {
    for (const s of this.segments) scene.remove(s);
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) {
      // segments sink with the head
      for (const s of this.segments) s.position.y -= dt * 4;
      return;
    }

    // slither toward the player with a weaving sine
    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz) + Math.sin(t * 2.2) * 0.7;
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 2.5);
    this.group.rotation.y = this.heading;
    if (dist > 14 && !this.vulnerable) {
      const speed = 9 * this.pace;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 14 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 4);

    // breadcrumb trail for the body
    this.trailT -= dt;
    if (this.trailT <= 0) {
      this.trailT = 0.09;
      this.trail.unshift(this.group.position.clone());
      if (this.trail.length > 60) this.trail.pop();
    }
    for (let i = 0; i < this.segments.length; i++) {
      const target = this.trail[Math.min((i + 1) * 5, this.trail.length - 1)];
      if (target) {
        this.segments[i].position.copy(target);
        this.segments[i].position.y = target.y + Math.sin(t * 6 + i) * 0.4;
        this.segments[i].scale.setScalar(MONSTER_SCALE);
        const next = this.trail[Math.min(i * 5, this.trail.length - 1)];
        if (next) this.segments[i].lookAt(next.x, this.segments[i].position.y, next.z);
      }
    }

    // lightning strike at the player's position
    this.telegraph = this.zapT < 0.7 && this.zapT > 0;
    this.zapT -= dt;
    if (this.zapT <= 0 && dist < 70 && !this.vulnerable) {
      this.zapT = 4 / this.tempo;
      // enraged it forks the strike across a spread, but the discharge leaves
      // it earthed and twitching
      const bolts = this.phase === 3 ? 3 : 1;
      for (let i = 0; i < bolts; i++) {
        const strike = ctx.playerPos.clone();
        if (i > 0) {
          strike.x += (Math.random() - 0.5) * 26;
          strike.z += (Math.random() - 0.5) * 26;
        }
        if (ctx.zapAt) ctx.zapAt(strike);
        ctx.destroyAt(strike, 3.2, 0.3);
        if (ctx.playerPos.distanceTo(strike) < 8) ctx.damagePlayer(12);
      }
      if (bolts > 1) this.openWindow(1.6);
    }
  }
}

// ----------------------------------------------------------- Iron Colossus

export class IronColossus extends Monster {
  name = 'IRON COLOSSUS';
  reward: Reward = 'shield';
  hitRadius = 17;
  private armL: THREE.Mesh;
  private armR: THREE.Mesh;
  private legL: THREE.Mesh;
  private legR: THREE.Mesh;
  private throwT = 4;
  private stompT = 0;
  private heading = 0;

  constructor(x: number, z: number) {
    super(260);
    const IRON = 0x8d939e;
    const RUST = 0xb87e5e;
    const DARK = 0x3c4048;

    const torso = box(7, 6, 4.5, IRON);
    torso.position.y = 9;
    const plate = box(5.5, 4, 0.8, RUST);
    plate.position.set(0, 9, 2.4);
    const core = box(1.6, 1.6, 0.5, 0xffb054, 0xff8a2f);
    core.position.set(0, 9.5, 2.7);
    const head = box(2.2, 1.8, 2.2, DARK);
    head.position.set(0, 13, 0.8);
    const eye = box(1.6, 0.4, 0.3, 0xff3355, 0xff3355);
    eye.position.set(0, 13.2, 2);
    const shoulderL = box(3, 2.5, 3, RUST);
    shoulderL.position.set(-5, 11.5, 0);
    const shoulderR = shoulderL.clone();
    shoulderR.position.x = 5;
    this.armL = box(2.2, 6.5, 2.4, IRON);
    this.armL.position.set(-5.2, 7, 0);
    this.armR = this.armL.clone();
    this.armR.position.x = 5.2;
    const fistL = box(2.6, 2, 2.6, DARK);
    fistL.position.set(-5.2, 3.4, 0);
    const fistR = fistL.clone();
    fistR.position.x = 5.2;
    this.legL = box(2.6, 6, 3, DARK);
    this.legL.position.set(-2, 3, 0);
    this.legR = this.legL.clone();
    this.legR.position.x = 2;
    this.group.add(torso, plate, core, head, eye, shoulderL, shoulderR, this.armL, this.armR, fistL, fistR, this.legL, this.legR);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(13.0);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz);
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 1.2);
    this.group.rotation.y = this.heading;

    if (dist > 26 && !this.vulnerable) {
      const speed = 2.6 * this.pace;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 14 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 2.5);

    const gait = 2.2 * this.pace;
    this.legL.rotation.x = Math.sin(t * gait) * 0.3;
    this.legR.rotation.x = -Math.sin(t * gait) * 0.3;

    // slow devastating stomps
    this.telegraph = this.stompT < 0.6 && this.stompT > 0;
    this.stompT -= dt;
    if (this.stompT <= 0 && !this.vulnerable) {
      this.stompT = 1.6 / this.tempo;
      const feet = this.group.position.clone();
      feet.y += 2;
      ctx.destroyAt(feet, 7, 0.4);
      if (dist < 22) ctx.damagePlayer(16);
    }

    // hurl a boulder in a high arc
    this.telegraph = this.throwT < 0.8 && this.throwT > 0;
    this.throwT -= dt;
    if (this.throwT <= 0 && ctx.throwBoulder && dist < 90 && !this.vulnerable) {
      this.throwT = 5 / this.tempo;
      this.armR.rotation.x = -2.2; // wind-up pose, relaxes over time
      const from = this.group.position.clone();
      from.y += 13 * MONSTER_SCALE / 2.2 * 2.2;
      ctx.throwBoulder(from, ctx.playerPos.clone());
      // all that mass goes into the throw — it is wide open on the follow-through
      this.openWindow(2.2);
    }
    this.armR.rotation.x *= 1 - Math.min(1, dt * 2);
  }
}

// -------------------------------------------------------------- Sky Reaver

// Flying manta that circles high, then folds its wings and dives straight
// through the player's position, carving a trench where it strafes.
export class SkyReaver extends Monster {
  name = 'SKY REAVER';
  reward: Reward = 'railgun';
  hitRadius = 14;
  private wingL: THREE.Mesh;
  private wingR: THREE.Mesh;
  private orbitA = Math.random() * Math.PI * 2;
  private diveT = 6;
  private diving = false;
  private diveDir = new THREE.Vector3();
  private diveLife = 0;
  private strafeT = 0;

  constructor(x: number, z: number) {
    super(190);
    const HULL = 0x4a8a96; // teal
    const BELLY = 0xbfd8d2;

    const body = box(3.2, 1.6, 6.5, HULL);
    body.position.y = 8;
    const belly = box(2.6, 0.8, 5.5, BELLY);
    belly.position.y = 7.2;
    const head = box(1.8, 1.2, 2.2, HULL);
    head.position.set(0, 8.2, 4);
    const eye = box(1.4, 0.35, 0.3, 0xffe14f, 0xffe14f);
    eye.position.set(0, 8.4, 5.1);
    this.wingL = box(7, 0.4, 4, HULL);
    this.wingL.geometry.translate(-3.5, 0, 0);
    this.wingL.position.set(-1.4, 8.2, 0);
    this.wingR = box(7, 0.4, 4, HULL);
    this.wingR.geometry.translate(3.5, 0, 0);
    this.wingR.position.set(1.4, 8.2, 0);
    const tail = box(0.8, 0.5, 4, HULL);
    tail.position.set(0, 8, -5);
    const finT = box(0.4, 1.8, 1.6, BELLY);
    finT.position.set(0, 9, -5.5);
    this.group.add(body, belly, head, eye, this.wingL, this.wingR, tail, finT);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 26, z);
    this.addCore(9.5);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    if (this.diving) {
      this.diveLife -= dt;
      this.group.position.addScaledVector(this.diveDir, 34 * dt);
      // wings swept back during the dive
      this.wingL.rotation.z = 0.85;
      this.wingR.rotation.z = -0.85;
      this.strafeT -= dt;
      if (this.strafeT <= 0) {
        this.strafeT = 0.22;
        const p = this.group.position.clone();
        p.y = Math.max(2, p.y - 4);
        ctx.destroyAt(p, 4.5, 0.3);
        if (this.group.position.distanceTo(ctx.playerPos) < 16) ctx.damagePlayer(10);
      }
      const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 40);
      if (this.diveLife <= 0 || this.group.position.y < gy + 6) {
        this.diving = false;
        this.diveT = (5 + Math.random() * 3) / this.tempo;
        // pulling out of a dive costs it all its speed — this is the one
        // moment a flier is reachable, so it is a generous window
        this.openWindow(2.4);
      }
      return;
    }

    // high circling
    this.orbitA += dt * 0.35 * this.pace;
    const R = 46;
    const tx = ctx.playerPos.x + Math.sin(this.orbitA) * R;
    const tz = ctx.playerPos.z + Math.cos(this.orbitA) * R;
    this.group.position.x += (tx - this.group.position.x) * Math.min(1, dt * 1.2);
    this.group.position.z += (tz - this.group.position.z) * Math.min(1, dt * 1.2);
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 40);
    // it labours back up to altitude after a dive instead of snapping there,
    // which is what makes the punish window actually reachable
    const targetY = gy + (this.vulnerable ? 11 : 30) + Math.sin(t * 0.9) * 3;
    this.group.position.y += (targetY - this.group.position.y) * Math.min(1, dt * 1.5);

    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    this.group.rotation.y = Math.atan2(dx, dz);
    // slow wing flaps while circling
    this.wingL.rotation.z = Math.sin(t * 2.5) * 0.35;
    this.wingR.rotation.z = -Math.sin(t * 2.5) * 0.35;

    this.diveT -= dt;
    if (this.diveT <= 0) {
      this.diving = true;
      this.diveLife = 3.2;
      this.diveDir.copy(ctx.playerPos).sub(this.group.position);
      this.diveDir.y -= 4; // aim slightly below the cockpit
      this.diveDir.normalize();
    }
  }
}

// ----------------------------------------------------------- Crimson Mantis

// Fast ground predator: sprints at the player, then lunges with scythe arms.
export class CrimsonMantis extends Monster {
  name = 'CRIMSON MANTIS';
  reward: Reward = 'blades';
  hitRadius = 12;
  private scytheL: THREE.Group;
  private scytheR: THREE.Group;
  private legPhase = 0;
  private lungeT = 3;
  private slashT = -1; // 0..1 while slashing
  private combo = 0;   // swings left in the current flurry
  private heading = 0;

  constructor(x: number, z: number) {
    super(170);
    const SHELL = 0xc0433f; // crimson
    const PLATE = 0xf0c9b2;

    const thorax = box(2.4, 2.2, 4.5, SHELL);
    thorax.position.y = 7;
    const abdomen = box(2, 1.8, 3.5, PLATE);
    abdomen.position.set(0, 6.6, -3.5);
    abdomen.rotation.x = -0.25;
    const neck = box(1.2, 1.2, 1.6, SHELL);
    neck.position.set(0, 8.2, 2.6);
    const head = box(1.8, 1.4, 1.6, SHELL);
    head.position.set(0, 9, 3.6);
    const eyeL = box(0.55, 0.55, 0.4, 0x8effc0, 0x8effc0);
    eyeL.position.set(-0.65, 9.2, 4.3);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.65;
    const antL = box(0.15, 1.6, 0.15, PLATE);
    antL.position.set(-0.5, 10.2, 3.9);
    antL.rotation.z = 0.4;
    const antR = antL.clone();
    antR.position.x = 0.5;
    antR.rotation.z = -0.4;

    // scythe arms: upper arm + long curved blade
    const makeScythe = (side: number): THREE.Group => {
      const arm = new THREE.Group();
      arm.position.set(side * 1.4, 8, 2);
      const upper = box(0.6, 2.2, 0.6, SHELL);
      upper.position.y = -1;
      const blade = box(0.35, 3.6, 0.7, PLATE);
      blade.position.set(0, -2.2, 1);
      blade.rotation.x = 0.5;
      const tip = box(0.25, 1.2, 0.4, 0xffffff, 0x662222);
      tip.position.set(0, -3.8, 2);
      tip.rotation.x = 0.8;
      arm.add(upper, blade, tip);
      return arm;
    };
    this.scytheL = makeScythe(-1);
    this.scytheR = makeScythe(1);

    // four stilt legs
    for (let i = 0; i < 4; i++) {
      const leg = box(0.4, 6.5, 0.4, SHELL);
      leg.position.set(i % 2 === 0 ? -1.2 : 1.2, 3.4, i < 2 ? 1 : -2);
      leg.rotation.z = (i % 2 === 0 ? 1 : -1) * 0.25;
      this.group.add(leg);
    }
    this.group.add(thorax, abdomen, neck, head, eyeL, eyeR, antL, antR, this.scytheL, this.scytheR);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(9.0);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz);
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 3);
    this.group.rotation.y = this.heading;

    // sprint in, keep a slight standoff
    if (dist > 16 && !this.vulnerable) {
      const speed = 11 * this.pace;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
      this.legPhase += dt * 10 * this.pace;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 14 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 4);

    // idle sway + raised scythes
    const sway = Math.sin(t * 3) * 0.1;
    this.group.rotation.z = sway * 0.3;

    // slash attack when close
    if (this.slashT >= 0) {
      this.slashT += dt / 0.5;
      const s = Math.min(1, this.slashT);
      const swing = Math.sin(s * Math.PI) * 2.2;
      this.scytheL.rotation.x = -0.6 - swing;
      this.scytheR.rotation.x = -0.6 - swing;
      if (s > 0.45 && s < 0.6) {
        const p = this.group.position.clone();
        const fwd = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
        p.addScaledVector(fwd, 14);
        p.y += 6;
        ctx.destroyAt(p, 4, 0.25);
        if (dist < 26) ctx.damagePlayer(13);
      }
      if (this.slashT >= 1) {
        this.slashT = -1;
        this.combo--;
        if (this.combo > 0) {
          this.slashT = 0; // chain straight into the next swing
        } else {
          // scythes buried in the road at the end of a flurry
          this.openWindow(1.4);
        }
      }
    } else {
      this.scytheL.rotation.x = -0.6 + Math.sin(t * 2) * 0.1;
      this.scytheR.rotation.x = -0.6 - Math.sin(t * 2) * 0.1;
      this.lungeT -= dt;
      if (this.lungeT <= 0 && dist < 30 && !this.vulnerable) {
        this.lungeT = 2.2 / this.tempo;
        // one swing at first, a three-hit flurry once it is cornered
        this.combo = this.phase === 3 ? 3 : this.phase === 2 ? 2 : 1;
        this.slashT = 0;
      }
    }
  }
}

// -------------------------------------------------------------- Magma Golem

// Lava-cored brute: lumbers forward, slams the ground to send out a molten
// shockwave, and pelts the player with lobbed boulders.
export class MagmaGolem extends Monster {
  name = 'MAGMA GOLEM';
  reward: Reward = 'quake';
  hitRadius = 16;
  private armL: THREE.Mesh;
  private armR: THREE.Mesh;
  private legL: THREE.Mesh;
  private legR: THREE.Mesh;
  private core: THREE.Mesh;
  private slamT = 3;
  private throwT = 5;
  private heading = 0;

  constructor(x: number, z: number) {
    super(240);
    const ROCK = 0x5a4a44; // dark basalt
    const CRUST = 0x7a5348;
    const LAVA = 0xff7a2f;

    const torso = box(6, 5.5, 4, ROCK);
    torso.position.y = 9;
    // molten cracks (emissive plates) across the chest
    const crackL = box(1.2, 3.2, 0.4, LAVA, LAVA);
    crackL.position.set(-1.4, 9, 2.1);
    crackL.rotation.z = 0.3;
    const crackR = box(0.9, 2.4, 0.4, LAVA, LAVA);
    crackR.position.set(1.5, 8.4, 2.1);
    crackR.rotation.z = -0.2;
    this.core = box(1.8, 1.8, 0.6, 0xffd060, 0xffb020);
    this.core.position.set(0, 9.6, 2.2);
    const head = box(2.4, 2.0, 2.4, CRUST);
    head.position.set(0, 12.8, 0.4);
    const eyeL = box(0.6, 0.5, 0.3, LAVA, LAVA);
    eyeL.position.set(-0.6, 13, 1.6);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.6;
    const shoulderL = box(2.6, 2.6, 3.2, CRUST);
    shoulderL.position.set(-4.2, 11.5, 0);
    const shoulderR = shoulderL.clone();
    shoulderR.position.x = 4.2;
    this.armL = box(2.2, 6.5, 2.4, ROCK);
    this.armL.position.set(-4.4, 7.5, 0);
    this.armR = this.armL.clone();
    this.armR.position.x = 4.4;
    const fistL = box(3, 2.6, 3, CRUST);
    fistL.position.set(-4.4, 3.6, 0);
    const fistR = fistL.clone();
    fistR.position.x = 4.4;
    this.legL = box(2.6, 6, 3, ROCK);
    this.legL.position.set(-1.8, 3, 0);
    this.legR = this.legL.clone();
    this.legR.position.x = 1.8;
    this.group.add(torso, crackL, crackR, this.core, head, eyeL, eyeR, shoulderL, shoulderR,
      this.armL, this.armR, fistL, fistR, this.legL, this.legR);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(12.0);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz);
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 1.1);
    this.group.rotation.y = this.heading;

    if (dist > 22 && !this.vulnerable) {
      const speed = 3.4 * this.pace;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
      this.legL.rotation.x = Math.sin(t * 3 * this.pace) * 0.4;
      this.legR.rotation.x = -Math.sin(t * 3 * this.pace) * 0.4;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 14 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 2.5);
    // core pulses
    const pulse = 0.7 + Math.sin(t * 4) * 0.3;
    (this.core.material as THREE.MeshLambertMaterial).emissiveIntensity = pulse;

    // ground slam: both fists down, ring of destruction around the feet
    this.telegraph = this.slamT < 0.7 && this.slamT > 0;
    this.slamT -= dt;
    if (this.slamT <= 0 && dist < 40 && !this.vulnerable) {
      this.slamT = 3.5 / this.tempo;
      this.armL.rotation.x = 1.4;
      this.armR.rotation.x = 1.4;
      const c = this.group.position.clone();
      c.y += 2;
      ctx.destroyAt(c, 8, 0.5);
      // the shockwave ring widens as it heats up
      const spokes = this.phase === 3 ? 10 : 6;
      const reach = this.phase === 3 ? 20 : 14;
      for (let i = 0; i < spokes; i++) {
        const a = (i / spokes) * Math.PI * 2;
        const p = c.clone();
        p.x += Math.sin(a) * reach;
        p.z += Math.cos(a) * reach;
        ctx.destroyAt(p, 4, 0.3);
      }
      if (dist < 30) ctx.damagePlayer(18);
      // fists buried to the wrist in the road
      this.openWindow(1.8);
    }
    this.armL.rotation.x *= 1 - Math.min(1, dt * 2.5);
    this.armR.rotation.x *= 1 - Math.min(1, dt * 2.5);

    // lob a molten boulder at range
    this.telegraph = this.throwT < 0.8 && this.throwT > 0;
    this.throwT -= dt;
    if (this.throwT <= 0 && ctx.throwBoulder && dist > 24 && dist < 95 && !this.vulnerable) {
      this.throwT = 4.5 / this.tempo;
      const from = this.group.position.clone();
      from.y += 26;
      ctx.throwBoulder(from, ctx.playerPos.clone());
    }
  }
}

// ----------------------------------------------------------------- Deep Maw

// Burrowing worm: dives underground (only a dust mound shows), tracks the
// player, then erupts beneath them before submerging again.
export class DeepMaw extends Monster {
  name = 'DEEP MAW';
  reward: Reward = 'vulcan';
  hitRadius = 12;
  private segs: THREE.Mesh[] = [];
  private mouth: THREE.Group;
  private submerged = true;
  private phaseT = 2.5;
  private surfaceY = 0;

  constructor(x: number, z: number) {
    super(180);
    const HIDE = 0x6a7a5a; // mottled green-brown
    const RING = 0xcbd8b0;
    const MAW = 0xd8564e;

    this.mouth = new THREE.Group();
    // segmented body stacked upward from the mouth base
    for (let i = 0; i < 6; i++) {
      const s = 3.2 - i * 0.3;
      const seg = box(s, 2.2, s, i % 2 === 0 ? HIDE : RING);
      seg.position.y = 3 + i * 2.1;
      this.mouth.add(seg);
      this.segs.push(seg);
    }
    // maw: a ring of teeth around a red gullet at the top
    const gullet = box(2.4, 1.2, 2.4, MAW, 0x551111);
    gullet.position.y = 16;
    this.mouth.add(gullet);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const tooth = box(0.5, 1.6, 0.5, 0xf4f0e0);
      tooth.position.set(Math.sin(a) * 1.7, 16.6, Math.cos(a) * 1.7);
      this.mouth.add(tooth);
    }
    this.group.add(this.mouth);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(7.0);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.surfaceY = gy > 14 ? 0 : gy;
    this.phaseT -= dt;

    if (this.submerged) {
      // chase the player from just below ground; body hidden, mound only
      const dx = ctx.playerPos.x - this.group.position.x;
      const dz = ctx.playerPos.z - this.group.position.z;
      const d = Math.hypot(dx, dz);
      if (d > 2) {
        const speed = 13 * this.pace;
        this.group.position.x += (dx / d) * speed * dt;
        this.group.position.z += (dz / d) * speed * dt;
      }
      this.group.position.y = this.surfaceY - 30; // buried
      // churn a shallow dust mound where it travels
      if (Math.random() < 0.25) ctx.destroyAt(this.group.position.clone().setY(this.surfaceY + 1), 2.4, 0.15);
      if (this.phaseT <= 0 && d < 30) {
        this.submerged = false;
        this.phaseT = 3.5;
        // erupt: burst the ground open beneath it
        ctx.destroyAt(this.group.position.clone().setY(this.surfaceY + 2), 7, 0.5);
        if (d < 22) ctx.damagePlayer(20);
        // beached on the surface until it can worm back under — the whole
        // surfaced stretch is the punish
        this.openWindow(3.5);
      }
    } else {
      // surfaced: rear up, then dive back down
      const targetY = this.surfaceY;
      this.group.position.y += (targetY - this.group.position.y) * Math.min(1, dt * 6);
      // writhe
      for (let i = 0; i < this.segs.length; i++) {
        this.segs[i].position.x = Math.sin(t * 4 + i * 0.6) * 0.6;
        this.segs[i].position.z = Math.cos(t * 4 + i * 0.6) * 0.6;
      }
      if (this.phaseT <= 0) {
        this.submerged = true;
        // it stays under for less and less time as the fight turns
        this.phaseT = (2 + Math.random() * 1.5) / this.tempo;
      }
    }
  }
}

// --------------------------------------------------------------- Cinder Wyrm

// Fire drake: circles low and breathes a flamethrower cone that sets buildings
// ablaze and scorches the player. The fire keeps spreading after it moves on.
export class CinderWyrm extends Monster {
  name = 'CINDER WYRM';
  reward: Reward = 'flamer';
  hitRadius = 13;
  private wingL: THREE.Mesh;
  private wingR: THREE.Mesh;
  private maw: THREE.Mesh;
  private orbitA = Math.random() * Math.PI * 2;
  private breathT = 3;
  private breathing = 0; // seconds left in a breath

  constructor(x: number, z: number) {
    super(185);
    const SCALE = 0x8c2f24; // dark ember red
    const UNDER = 0xf0a24a; // glowing underscale
    const HORN = 0x3a2420;

    const body = box(3, 2.6, 6.5, SCALE);
    body.position.y = 8;
    const neck = box(1.8, 1.8, 2.4, SCALE);
    neck.position.set(0, 8.8, 4);
    const head = box(2.2, 1.8, 2.6, SCALE);
    head.position.set(0, 9.2, 6);
    this.maw = box(1.8, 0.9, 1.4, 0xffc65a, 0xff7a2f);
    this.maw.position.set(0, 8.7, 7.2);
    const eyeL = box(0.4, 0.4, 0.3, 0xffe14f, 0xffe14f);
    eyeL.position.set(-0.7, 9.6, 6.9);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.7;
    const hornL = box(0.35, 1.4, 0.35, HORN);
    hornL.position.set(-0.7, 10.4, 5.4);
    hornL.rotation.z = 0.35;
    const hornR = hornL.clone();
    hornR.position.x = 0.7;
    hornR.rotation.z = -0.35;
    const belly = box(2.2, 0.6, 5.5, UNDER, 0xff8a2f);
    belly.position.set(0, 6.7, 0.4);
    this.wingL = box(7, 0.3, 4.5, SCALE);
    this.wingL.geometry.translate(-3.5, 0, 0);
    this.wingL.position.set(-1.3, 9, 0);
    this.wingR = box(7, 0.3, 4.5, SCALE);
    this.wingR.geometry.translate(3.5, 0, 0);
    this.wingR.position.set(1.3, 9, 0);
    const tail = box(1.2, 1.2, 5, SCALE);
    tail.position.set(0, 7.8, -5.5);
    const tailTip = box(1.6, 0.4, 1.6, UNDER, 0xff8a2f);
    tailTip.position.set(0, 7.8, -8);
    this.group.add(body, neck, head, this.maw, eyeL, eyeR, hornL, hornR, belly, this.wingL, this.wingR, tail, tailTip);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 22, z);
    this.addCore(8.0);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    // circle the player at mid altitude — a spent drake coasts instead
    if (!this.vulnerable) {
      this.orbitA += dt * 0.3 * this.pace;
      const R = 40;
      const tx = ctx.playerPos.x + Math.sin(this.orbitA) * R;
      const tz = ctx.playerPos.z + Math.cos(this.orbitA) * R;
      this.group.position.x += (tx - this.group.position.x) * Math.min(1, dt * 1.1);
      this.group.position.z += (tz - this.group.position.z) * Math.min(1, dt * 1.1);
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 40);
    // it sinks toward the rooftops while refilling, which is the only time a
    // flier this high is reachable
    const targetY = gy + (this.vulnerable ? 9 : 20) + Math.sin(t * 0.8) * 3;
    this.group.position.y += (targetY - this.group.position.y) * Math.min(1, dt * 1.5);

    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    this.group.rotation.y = Math.atan2(dx, dz);
    this.wingL.rotation.z = Math.sin(t * 3) * 0.4;
    this.wingR.rotation.z = -Math.sin(t * 3) * 0.4;

    // flamethrower: sweep a line of fire from the maw toward the player
    this.telegraph = this.breathT < 0.8 && this.breathT > 0;
    this.breathT -= dt;
    if (this.breathT <= 0 && this.breathing <= 0 && !this.vulnerable) {
      // longer, hotter breaths as it burns down
      this.breathing = this.phase === 3 ? 2.6 : this.phase === 2 ? 2.0 : 1.6;
      this.breathT = (5 + Math.random() * 2) / this.tempo;
    }
    (this.maw.material as THREE.MeshLambertMaterial).emissiveIntensity = this.breathing > 0 ? 1.4 : 1;
    if (this.breathing > 0) {
      const wasBreathing = this.breathing;
      this.breathing -= dt;
      // out of breath: it has to glide and refill before it can burn again
      if (wasBreathing > 0 && this.breathing <= 0) this.openWindow(2.0);
      const from = this.group.position.clone();
      from.y += 8;
      const dir = ctx.playerPos.clone().setY(ctx.playerPos.y + 4).sub(from).normalize();
      // spray flame along the breath line
      for (let d = 8; d <= 46; d += 6) {
        const p = from.clone().addScaledVector(dir, d);
        if (ctx.igniteAt) ctx.igniteAt(p, 4);
        if (ctx.destroyAt && Math.random() < 0.15) ctx.destroyAt(p, 2, 0.1);
      }
      const tip = from.clone().addScaledVector(dir, from.distanceTo(ctx.playerPos));
      if (tip.distanceTo(ctx.playerPos) < 12) ctx.damagePlayer(14 * dt);
    }
  }
}

// ------------------------------------------------------------ Tide Leviathan

// Water titan: wades toward the player and fires its aqua blaster in bursts,
// which blows chunks out of buildings and leaves spreading floodwater behind.
export class TideLeviathan extends Monster {
  name = 'TIDE LEVIATHAN';
  reward: Reward = 'aqua';
  hitRadius = 16;
  private finL: THREE.Mesh;
  private finR: THREE.Mesh;
  private cannon: THREE.Mesh;
  private heading = 0;
  private fireT = 2.5;
  private burst = 0;
  private shotT = 0;

  constructor(x: number, z: number) {
    super(230);
    const HIDE = 0x2f6f8c; // deep teal
    const BELLY = 0xbfe6ee;
    const FIN = 0x4fa8c4;

    const torso = box(5, 5.5, 5, HIDE);
    torso.position.y = 9;
    const belly = box(3.6, 3.6, 4, BELLY);
    belly.position.set(0, 7.5, 1.4);
    const head = box(3, 2.6, 3, HIDE);
    head.position.set(0, 13, 1.2);
    const jaw = box(2.6, 0.9, 2.6, BELLY);
    jaw.position.set(0, 11.6, 1.8);
    const eyeL = box(0.5, 0.5, 0.4, 0x9ffcff, 0x9ffcff);
    eyeL.position.set(-0.9, 13.4, 2.5);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.9;
    const crest = box(0.4, 2.2, 2.6, FIN);
    crest.position.set(0, 14.6, 0.6);
    this.finL = box(0.5, 3.5, 3, FIN);
    this.finL.position.set(-2.8, 9.5, 0);
    this.finL.rotation.z = 0.4;
    this.finR = this.finL.clone();
    this.finR.position.x = 2.8;
    this.finR.rotation.z = -0.4;
    // aqua cannon mounted on the right arm
    const arm = box(1.8, 4.5, 1.8, HIDE);
    arm.position.set(3.2, 8, 1.5);
    this.cannon = box(1.6, 1.6, 3.2, 0x9ffcff, 0x2f9fd0);
    this.cannon.position.set(3.2, 6.5, 3.4);
    const legL = box(2, 5.5, 2.4, HIDE);
    legL.position.set(-1.6, 4, 0);
    const legR = legL.clone();
    legR.position.x = 1.6;
    this.group.add(torso, belly, head, jaw, eyeL, eyeR, crest, this.finL, this.finR, arm, this.cannon, legL, legR);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(9.0);
    this.rememberEmissives();
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    const dx = ctx.playerPos.x - this.group.position.x;
    const dz = ctx.playerPos.z - this.group.position.z;
    const dist = Math.hypot(dx, dz);
    const desired = Math.atan2(dx, dz);
    let dd = desired - this.heading;
    while (dd > Math.PI) dd -= Math.PI * 2;
    while (dd < -Math.PI) dd += Math.PI * 2;
    this.heading += dd * Math.min(1, dt * 1.3);
    this.group.rotation.y = this.heading;

    if (dist > 30 && !this.vulnerable) {
      const speed = 4 * this.pace;
      this.group.position.x += Math.sin(this.heading) * speed * dt;
      this.group.position.z += Math.cos(this.heading) * speed * dt;
    }
    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.group.position.y += ((gy > 14 ? 0 : gy) - this.group.position.y) * Math.min(1, dt * 2.5);
    this.finL.rotation.x = Math.sin(t * 2) * 0.2;
    this.finR.rotation.x = -Math.sin(t * 2) * 0.2;

    // aqua blaster: a rapid burst of water shots that flood where they land
    this.telegraph = this.fireT < 0.7 && this.fireT > 0;
    this.fireT -= dt;
    if (this.fireT <= 0 && this.burst <= 0 && !this.vulnerable) {
      this.burst = this.phase === 3 ? 2.0 : this.phase === 2 ? 1.6 : 1.2;
      this.shotT = 0;
      this.fireT = 4.5 / this.tempo;
    }
    (this.cannon.material as THREE.MeshLambertMaterial).emissiveIntensity = this.burst > 0 ? 1.5 : 1;
    if (this.burst > 0) {
      const wasBurst = this.burst;
      this.burst -= dt;
      // the cannon has to repressurise between bursts
      if (wasBurst > 0 && this.burst <= 0) this.openWindow(1.7);
      this.shotT -= dt;
      // A burst is five readable splashes, not a damage roll every render
      // frame. The previous frame-based check could land dozens of invisible
      // overlapping hits during one cannon animation.
      if (this.shotT <= 0) {
        this.shotT = 0.24;
        const target = ctx.playerPos.clone();
        target.x += (Math.random() - 0.5) * 24;
        target.z += (Math.random() - 0.5) * 24;
        if (ctx.floodAt) ctx.floodAt(target, 5);
        const targetGround = ctx.world.groundHeight(target.x, target.z, 20);
        ctx.destroyAt(target.clone().setY(targetGround + 4), 3.5, 0.2);
        // Only the initial high-pressure splash hurts. Standing in the
        // shallow water afterwards is safe for a sealed Terra-Armor.
        if (target.distanceTo(ctx.playerPos) < 6) ctx.damagePlayer(7);
      }
    }
  }
}
