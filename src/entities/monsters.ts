// Boss monsters. Defeating each one grants the player an upgrade.

import * as THREE from 'three';
import {
  MAW_MUZZLES, mawBody, mawCore, mawGlow, mawMuzzleGlow,
  COLOSSUS_FIST, COLOSSUS_HIP, COLOSSUS_SHOULDER, colossusArm, colossusBody, colossusCore, colossusGlow, colossusLeg, colossusPlates,
  LEVIATHAN_FIN, LEVIATHAN_HIP, leviathanBody, leviathanCannonCore, leviathanCore, leviathanFin, leviathanGlow, leviathanLeg,
  WYRM_MOUTH, WYRM_WING_ROOT, wyrmBody, wyrmCore, wyrmEyes, wyrmThroat, wyrmWing,
  MAW_SEGMENTS, deepMawGullet, deepMawHead, deepMawSegment,
  GOLEM_FIST, GOLEM_HIP, GOLEM_SHOULDER, golemArm, golemArmLava, golemBody, golemCore, golemHeart, golemLava, golemLeg,
  MANTIS_HIPS, MANTIS_SCYTHE, mantisBody, mantisCore, mantisGlow, mantisLeg, mantisScythe,
  REAVER_WING_ROOT, reaverBody, reaverCore, reaverGlow, reaverWing,
  SERPENT_SEGMENTS, serpentCore, serpentSegmentSize, serpentHead, serpentHeadGlow, serpentSegment, serpentSegmentGlow,
  GORGOSAUR_CORE, GORGOSAUR_HIP, GORGOSAUR_JAW_HINGE, GORGOSAUR_MOUTH, GORGOSAUR_TAIL_ROOT,
  gorgosaurBody, gorgosaurEye, gorgosaurJaw, gorgosaurLeg, gorgosaurPlates, gorgosaurTail, gorgosaurTailPlates,
} from './bossModels';
import { hideMaterial, V3 } from '../render/voxelSculpt';
import { glow } from '../render/hdr';
import { World } from '../core/world';

// Every boss teaches something distinct: a wheel weapon or a passive/ability.
export type Reward =
  | 'beam' | 'thrust' | 'nova' | 'shield' | 'blades' | 'quake' // abilities
  | 'railgun' | 'vulcan' | 'flamer' | 'aqua' // wheel weapons
  | 'repair' // endless mode: repairs + power level
  | 'none'; // story rematches: recovery only, never duplicate upgrades

/** Shared up-axis for rotating muzzle offsets into world space. */
const _UP = new THREE.Vector3(0, 1, 0);

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
  /**
   * A sustained beam fired from a monster. Draws it, carves whatever it
   * crosses and damages the pilot if they are anywhere near the line — the
   * answer for a player who has simply flown out of reach.
   */
  monsterBeam?: (from: THREE.Vector3, toward: THREE.Vector3, dps: number, dt: number) => void;
}

/** A sculpted part with its own lit, vertex-coloured hide material. */
function hidePart(geo: THREE.BufferGeometry): THREE.Mesh {
  const m = new THREE.Mesh(geo, hideMaterial());
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** A sculpted light source (eyes, jets, bores): unlit, glows on High. */
function glowPart(geo: THREE.BufferGeometry): THREE.Mesh {
  return new THREE.Mesh(geo, glow(new THREE.MeshBasicMaterial({ vertexColors: true })));
}

function box(w: number, h: number, d: number, color: number, emissive = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({
      color, emissive,
      emissiveIntensity: emissive ? 1.15 : 0,
      roughness: emissive ? 0.34 : 0.7,
      metalness: emissive ? 0.22 : 0.08,
      flatShading: true,
    })
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
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
  // Open cores still reward a clean dodge, but no longer let late-game burst
  // weapons erase an entire phase during one vulnerability window.
  static readonly PUNISH = 1.4;

  protected deathT = 0;
  protected flashT = 0;
  private roarT = 0;
  /** Set while a heavy attack winds up — renders a warning tint so the
   *  player can read the tell and dash out of the way. */
  protected telegraph = false;
  /** Public combat-readability state used by the lock-on HUD and evasion. */
  get threatening(): boolean {
    return this.telegraph;
  }
  /**
   * A radial attack being wound up: its true reach in world units around the
   * boss, and how close it is to landing (0 at the start of the tell, 1 on
   * impact). Rebuilt every frame by the boss; null when nothing radial is
   * coming. Drawn on the ground so the pilot can see whether they are inside
   * it and which way is out — a dodge is only a skill if the attack can be read.
   */
  aoe: { radius: number; progress: number } | null = null;
  protected markAoe(radius: number, progress: number): void {
    this.aoe = { radius, progress: Math.max(0, Math.min(1, progress)) };
  }

  /** A frame-perfect evade converts the avoided attack into a short opening. */
  rewardEvade(sec = 1.15): void {
    if (!this.dying) this.openWindow(sec);
  }
  private coreT = 0;
  private staggerT = 0;
  private staggerStrength = 0;
  /** Glowing dorsal core: the visible weak point. Local y is chosen so it
   *  sits high on the back once MONSTER_SCALE is applied. */
  weakCore!: THREE.Mesh;
  /** Size of the core's pulse, so a boss can nest a smaller core in its anatomy. */
  protected coreScale = 1;
  abstract name: string;
  abstract reward: Reward;
  hitRadius = 8;
  /**
   * Height above the group origin used as the centre of the hit sphere.
   * The default suits a thirty-metre kaiju; anything shorter has to lower it
   * or its hitbox floats up into empty sky above its own head.
   */
  centerY = 14;

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
   * Is the pilot actually within reach of a ground melee?
   *
   * Several bosses gated their stomps and slashes on horizontal distance
   * alone, so a pilot hovering sixty metres up was still being hit by a
   * ground attack with nothing visibly connecting the two. Melee has to be
   * honest about height; reaching an airborne target is what a boss's ranged
   * option is for.
   */
  protected meleeReaches(playerPos: THREE.Vector3, horizontal: number, height = 22): boolean {
    const dx = playerPos.x - this.group.position.x;
    const dz = playerPos.z - this.group.position.z;
    if (Math.hypot(dx, dz) > horizontal) return false;
    return playerPos.y - this.group.position.y <= height;
  }

  /**
   * Open the boss up. Call straight after committing to a heavy attack: it is
   * planted, the core is lit, and hits do PUNISH times damage until it
   * recovers.
   */
  protected openWindow(sec: number): void {
    this.vulnT = Math.max(this.vulnT, sec);
  }

  protected updateFlash(dt: number): void {
    this.aoe = null; // the boss re-declares any footprint later this frame
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
    for (const root of this.roots()) root.traverse((o) => {
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
          return;
        }
        // Sculpted hide takes the state colours as a strong tint rather than
        // a flood: at full strength (x2.4 on High) every state turned the
        // whole boss into one flat coloured cut-out and the anatomy, which
        // is what tells you where to hit, disappeared. The shader also
        // scales the tint by the hide's own colour (hdr.ts).
        if (mat.userData.hide) mat.emissiveIntensity *= 0.6;
      }
    });
  }

  /** Attach the glowing weak-point core. Call at the end of a boss ctor,
   *  before rememberEmissives() so its glow is preserved. */
  protected addCore(localY: number, localZ = -1.5): void {
    this.weakCore = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 2.6, 2.6),
      new THREE.MeshStandardMaterial({
        color: 0xffe45c, emissive: 0xffc61a, emissiveIntensity: 1.55,
        roughness: 0.24, metalness: 0.24, flatShading: true,
      })
    );
    this.weakCore.castShadow = true;
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
      this.weakCore.scale.setScalar(this.coreScale * (1.5 + Math.sin(t * 20) * 0.3));
      mat.color.setHex(0xbdf4ff);
      mat.emissive.setHex(0x4de2ff);
    } else {
      this.weakCore.scale.setScalar(this.coreScale * (0.85 + Math.sin(t * 6) * 0.15));
      mat.color.setHex(0xffe45c);
      mat.emissive.setHex(0xffc61a);
    }
  }

  /**
   * Every scene root that belongs to this boss. Usually just the group; the
   * Volt Serpent's body segments live in the scene beside it, and tints,
   * corruption, shadows and rim light all have to reach them too.
   */
  roots(): THREE.Object3D[] {
    return [this.group];
  }

  /** One hit sphere: world centre and radius. */
  protected readonly hitBody = { c: new THREE.Vector3(), r: 0 };
  private readonly hitList: { c: THREE.Vector3; r: number }[] = [];

  /**
   * Where shots can land, as world-space spheres. Most bosses are one
   * sphere around their middle. Bosses with a long body add spheres along
   * it; on one sphere the Volt Serpent's body and the top half of the Deep
   * Maw, its open maw included, could not be hit at all.
   */
  hitSpheres(): readonly { c: THREE.Vector3; r: number }[] {
    this.hitBody.c.copy(this.group.position);
    this.hitBody.c.y += this.centerY;
    this.hitBody.r = this.hitRadius;
    this.hitList.length = 0;
    this.hitList.push(this.hitBody);
    this.addHitSpheres(this.hitList);
    return this.hitList;
  }

  /** Extra spheres for a long body; none by default. */
  protected addHitSpheres(_out: { c: THREE.Vector3; r: number }[]): void {}

  /** A pool of spheres for subclasses to fill, so hit tests allocate nothing. */
  protected readonly hitPool: { c: THREE.Vector3; r: number }[] = [];
  protected hitSphere(i: number): { c: THREE.Vector3; r: number } {
    while (this.hitPool.length <= i) this.hitPool.push({ c: new THREE.Vector3(), r: 0 });
    return this.hitPool[i];
  }

  /** The body's bounds in group space, measured once from its meshes. */
  private frameCenter: THREE.Vector3 | null = null;
  private frameRadius = 0;

  /**
   * Where a camera has to look to frame this boss (written to `out`, world
   * space) and the radius it has to fit. Measured from the body itself, not
   * a fixed height above the feet: a flier's body is twenty metres up and a
   * serpent's is at kerb height.
   */
  cinematicFocus(out: THREE.Vector3): number {
    if (!this.frameCenter) {
      this.group.updateMatrixWorld(true);
      const inv = this.group.matrixWorld.clone().invert();
      const rel = new THREE.Matrix4();
      const box = new THREE.Box3(), part = new THREE.Box3();
      this.group.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh || mesh === this.weakCore) return;
        if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
        rel.multiplyMatrices(inv, mesh.matrixWorld);
        box.union(part.copy(mesh.geometry.boundingBox!).applyMatrix4(rel));
      });
      const size = box.getSize(new THREE.Vector3());
      this.frameCenter = box.getCenter(new THREE.Vector3());
      // most of the bounding sphere: a long body's ends come toward the lens
      // in a three-quarter shot, so the length has to count in full
      this.frameRadius = size.length() * 0.5 * 0.85;
    }
    out.copy(this.frameCenter);
    this.group.localToWorld(out);
    return this.frameRadius * this.group.scale.x;
  }

  protected rememberEmissives(): void {
    for (const root of this.roots()) root.traverse((o) => {
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
  private jaw: THREE.Mesh;
  /**
   * The mouth beam. Gorgosaur was melee-only, which meant a pilot who simply
   * took off could not be touched by the campaign's first boss at all. It
   * charges visibly in the jaw, then fires a sustained lance that tracks the
   * player, so height stops being a free defence and starts being a position
   * you have to keep earning.
   */
  private beamT = 5;
  private beamFire = 0;
  private beamCharge = 0;

  /** Dorsal plates — a separate mesh so they can light up before the beam. */
  private plates: THREE.Mesh[] = [];

  constructor(x: number, z: number) {
    super(140);
    // Sculpted voxel anatomy (bossModels.ts) in place of the old crate
    // assembly. Pivots, hip positions, the jaw hinge, the beam origin and
    // the dorsal core all keep their meaning; only the meshes changed.
    const part = hidePart;

    const body = part(gorgosaurBody());
    this.group.add(body);

    // jaw hangs from a hinge at its back, so it opens like a jaw rather than
    // spinning about its own middle
    this.jaw = part(gorgosaurJaw());
    this.jaw.position.set(...GORGOSAUR_JAW_HINGE);
    this.jaw.rotation.x = 0.22;
    this.group.add(this.jaw);

    // glowing eyes, set into the hide under the brow ridge
    const eyeAt = gorgosaurEye();
    for (const side of [-1, 1]) {
      const eye = box(0.24, 0.3, 0.5, 0xffa020, 0xffa020);
      eye.position.set(side * eyeAt[0], eyeAt[1], eyeAt[2]);
      this.group.add(eye);
    }

    const plates = part(gorgosaurPlates());
    this.group.add(plates);
    this.plates.push(plates);

    // legs swing from the same hip pivots as before; the right leg is the
    // left one mirrored
    const makeLeg = (side: number): THREE.Group => {
      const leg = new THREE.Group();
      leg.position.set(side * GORGOSAUR_HIP[0], GORGOSAUR_HIP[1], GORGOSAUR_HIP[2]);
      const mesh = part(gorgosaurLeg());
      if (side > 0) mesh.scale.x = -1;
      leg.add(mesh);
      return leg;
    };
    this.legL = makeLeg(-1);
    this.legR = makeLeg(1);

    // The tail now pivots at its root. It used to be a group at the model
    // origin, so its sway swung the whole tail sideways from the middle of
    // the body instead of from the hips.
    this.tail = new THREE.Group();
    this.tail.position.set(...GORGOSAUR_TAIL_ROOT);
    const tailPlates = part(gorgosaurTailPlates());
    this.tail.add(part(gorgosaurTail()), tailPlates);
    this.plates.push(tailPlates);

    this.group.add(this.legL, this.legR, this.tail);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(GORGOSAUR_CORE[1], GORGOSAUR_CORE[2]);
    // nested between the plate rows rather than a crate on the back
    this.coreScale = 0.72;
    this.weakCore.scale.setScalar(this.coreScale);
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

    // Rooted through a punish window, and through the beam: a committed stomp
    // cannot be walked off, and a boss that strafes while firing a sustained
    // lance gives the pilot nowhere to stand.
    const beaming = this.beamCharge > 0 || this.beamFire > 0;
    if (dist > 4 && !this.vulnerable && !beaming) {
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
    if (this.telegraph && !beaming) this.markAoe(20, 1 - this.stompT / 0.5);
    this.stompT -= dt;
    if (this.stompT <= 0 && !this.vulnerable && !beaming) {
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

    this.updateMouthBeam(dt, ctx, dist);
  }

  /**
   * Charge, fire, recover. The charge is a long tell with the jaw hauled open
   * and the throat glowing, because a hitscan-ish beam with no warning is not
   * a fight, it is a tax. Firing roots it, and it is wide open afterwards.
   */
  /**
   * Blue charge glow on the dorsal plates, 0..1, running from the tail up to
   * the neck. Overrides the frame's tint.
   */
  private glowPlates(v: number): void {
    // plates[0] is the back and neck, plates[1] the tail
    const ramp = [Math.max(0, Math.min(1, v * 1.6 - 0.6)), Math.min(1, v * 1.6)];
    this.plates.forEach((p, i) => {
      const mat = p.material as THREE.MeshStandardMaterial;
      mat.emissive.setHex(0x3fb8ff);
      mat.emissiveIntensity = ramp[i] * 1.3;
    });
  }

  /** Turn the body toward the pilot at a fixed rate. Returns how far off it
   *  still is, in radians, so the caller can tell whether it has lined up. */
  private aimAt(target: THREE.Vector3, dt: number, rate: number): number {
    const want = Math.atan2(target.x - this.group.position.x, target.z - this.group.position.z);
    let d = want - this.heading;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    this.heading += Math.max(-rate * dt, Math.min(rate * dt, d));
    this.group.rotation.y = this.heading;
    return Math.abs(d);
  }

  private updateMouthBeam(dt: number, ctx: MonsterCtx, _dist: number): void {
    const mouth = new THREE.Vector3(...GORGOSAUR_MOUTH)
      .applyAxisAngle(_UP, this.heading)
      .multiplyScalar(MONSTER_SCALE)
      .add(this.group.position);

    if (this.beamFire > 0) {
      this.beamFire -= dt;
      this.jaw.rotation.x = 0.85;
      this.glowPlates(1);
      // The beam only ever leaves the mouth, straight ahead. It used to be
      // aimed at the pilot regardless of which way the head was pointing,
      // so it could fire sideways or out of the back of the skull. Now the
      // whole animal has to swing round to bring the muzzle onto you, and
      // it sweeps while firing — outrunning the turn is the counterplay.
      this.aimAt(ctx.playerPos, dt, 0.85 * this.pace);
      const forward = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
      // let the muzzle rise and fall toward the pilot's altitude
      const lift = ctx.playerPos.y - mouth.y;
      const flat = Math.hypot(ctx.playerPos.x - mouth.x, ctx.playerPos.z - mouth.z);
      forward.y = Math.max(-0.9, Math.min(1.1, flat > 1 ? lift / flat : 0));
      const aim = mouth.clone().addScaledVector(forward.normalize(), 200);
      ctx.monsterBeam?.(mouth, aim, 26, dt);
      if (this.beamFire <= 0) {
        this.beamCharge = 0;
        // committed and spent: the punish window is the reward for surviving
        this.openWindow(2.0);
        this.beamT = (this.phase === 3 ? 5.5 : this.phase === 2 ? 7 : 9) / this.tempo;
      }
      return;
    }

    if (this.beamCharge > 0) {
      this.beamCharge -= dt;
      this.telegraph = true;
      // the dorsal plates light up from the tail forward as it charges —
      // readable from behind and at distance, where the jaw is not
      this.glowPlates(1 - Math.max(0, this.beamCharge) / 1.1);
      // squares up on you while the throat lights, so the tell is also the aim
      this.aimAt(ctx.playerPos, dt, 1.7 * this.pace);
      this.jaw.rotation.x = 0.22 + (1 - Math.max(0, this.beamCharge) / 1.1) * 0.6;
      if (this.beamCharge <= 0) this.beamFire = this.phase === 3 ? 1.5 : 1.1;
      return;
    }

    this.jaw.rotation.x = 0.22;
    if (this.vulnerable) return; // not while it is reeling
    this.beamT -= dt;
    if (this.beamT <= 0) this.beamCharge = 1.1;
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
  /** Glowing plugs in the launch bores; they flare as a volley winds up. */
  private muzzleGlow: THREE.Mesh;
  /** Next launch tube, cycling left and right across both shoulders. */
  private muzzle = 0;

  constructor(x: number, z: number) {
    super(160);
    // Sculpted voxel anatomy (bossModels.ts): a hunched artillery beast with
    // launch tubes grown out of its shoulders, hovering on jets in its soles.
    this.group.add(hidePart(mawBody()), glowPart(mawGlow()));
    this.muzzleGlow = glowPart(mawMuzzleGlow());
    this.group.add(this.muzzleGlow);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    const core = mawCore();
    this.addCore(core[1], core[2]);
    this.coreScale = 0.7;
    this.weakCore.scale.setScalar(this.coreScale);
    this.rememberEmissives();
  }

  /** World position of the next launch tube's muzzle. */
  private nextMuzzle(): THREE.Vector3 {
    const m = MAW_MUZZLES[this.muzzle++ % MAW_MUZZLES.length];
    this.group.updateMatrixWorld();
    return this.group.localToWorld(new THREE.Vector3(m[0], m[1], m[2]));
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
    // the bores flare white-hot through the tell and while a salvo empties
    const hot = this.telegraph || this.salvo > 0;
    (this.muzzleGlow.material as THREE.MeshBasicMaterial).color.setScalar(hot ? 1.7 + Math.sin(t * 34) * 0.5 : 1);
    this.fireT -= dt;
    if (this.fireT <= 0 && ctx.fireRocket && !this.vulnerable) {
      this.fireT = 3.2 / this.tempo;
      ctx.fireRocket(this.nextMuzzle(), ctx.playerPos.clone().setY(ctx.playerPos.y + 2));
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
        ctx.fireRocket(this.nextMuzzle(), ctx.playerPos.clone().setY(ctx.playerPos.y + 2));
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

  /** Charge nodes: the head's (with the eyes), then one per segment. */
  private headGlow: THREE.Mesh;
  private segGlow: THREE.Mesh[] = [];

  constructor(x: number, z: number) {
    super(200);
    // Sculpted voxel anatomy (bossModels.ts): an armoured eel-dragon head
    // and a chain of tapering, finned body segments.
    this.group.add(hidePart(serpentHead()));
    this.headGlow = glowPart(serpentHeadGlow());
    this.group.add(this.headGlow);
    for (let i = 0; i < SERPENT_SEGMENTS; i++) {
      const seg = new THREE.Group();
      const glowMesh = glowPart(serpentSegmentGlow(i));
      seg.add(hidePart(serpentSegment(i)), glowMesh);
      this.segGlow.push(glowMesh);
      this.segments.push(seg);
    }
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    const core = serpentCore();
    this.addCore(core[1], core[2]);
    this.coreScale = 0.62;
    this.weakCore.scale.setScalar(this.coreScale);
    this.rememberEmissives();
  }

  roots(): THREE.Object3D[] {
    return [this.group, ...this.segments];
  }

  protected addHitSpheres(out: { c: THREE.Vector3; r: number }[]): void {
    // each body segment, around the middle of its ring
    this.segments.forEach((seg, i) => {
      const h = this.hitSphere(i);
      const sz = serpentSegmentSize(i);
      seg.localToWorld(h.c.set(0, sz * 0.58 + 0.5, 0));
      h.r = sz * 0.62 * MONSTER_SCALE;
      out.push(h);
    });
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
    // the wind-up: charge runs up the body node by node into the crown
    const charge = this.telegraph ? 1 - this.zapT / 0.7 : 0;
    (this.headGlow.material as THREE.MeshBasicMaterial).color.setScalar(1 + charge * 1.4);
    this.segGlow.forEach((m, i) => {
      const wave = this.telegraph ? Math.max(0, Math.sin(t * 16 + i * 0.95)) : 0;
      (m.material as THREE.MeshBasicMaterial).color.setScalar(1 + wave * 1.8);
    });
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
  private armL: THREE.Group;
  private armR: THREE.Group;
  private legL: THREE.Group;
  private legR: THREE.Group;
  private throwT = 4;
  private stompT = 0;
  private heading = 0;
  /**
   * A war of attrition, not a burst check. Three things make it one:
   *
   *  - plate armour blunts everything that is not landed inside a punish
   *    window, so raw damage-per-second cannot carry the fight;
   *  - it welds itself back together when left alone, so chipping at it from
   *    range and waiting is strictly losing ground;
   *  - each phase sheds plating, so the mitigation falls away as the fight
   *    wears on and persistence is what finally breaks it.
   */
  private plates: THREE.Mesh[] = [];
  private sinceHit = 0;
  /** Fraction of incoming damage that gets through the plate, by phase. */
  private get armor(): number {
    return this.phase === 3 ? 0.85 : this.phase === 2 ? 0.68 : 0.5;
  }

  constructor(x: number, z: number) {
    super(340);
    // Sculpted voxel anatomy (bossModels.ts): a welded-iron construct with a
    // furnace heart. Arms swing from the shoulder and legs from the hip, and
    // each fist is part of its arm, so a wind-up lifts the whole limb.
    this.group.add(hidePart(colossusBody()), glowPart(colossusGlow()));
    const limb = (geo: THREE.BufferGeometry, pivot: V3, side: number): THREE.Group => {
      const g = new THREE.Group();
      g.position.set(side * pivot[0], pivot[1], pivot[2]);
      const mesh = hidePart(geo);
      if (side > 0) mesh.scale.x = -1; // built as the left limb
      g.add(mesh);
      this.group.add(g);
      return g;
    };
    this.armL = limb(colossusArm(), COLOSSUS_SHOULDER, -1);
    this.armR = limb(colossusArm(), COLOSSUS_SHOULDER, 1);
    this.legL = limb(colossusLeg(), COLOSSUS_HIP, -1);
    this.legR = limb(colossusLeg(), COLOSSUS_HIP, 1);
    // rust plates bolted over the hide, each its own mesh so it can come off
    for (const { geo, mirror } of colossusPlates()) {
      const plate = hidePart(geo);
      if (mirror) plate.scale.x = -1;
      this.group.add(plate);
      this.plates.push(plate);
    }
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    const core = colossusCore();
    this.addCore(core[1], core[2]);
    this.coreScale = 0.75;
    this.weakCore.scale.setScalar(this.coreScale);
    this.rememberEmissives();
  }

  /** Plate turns most of a hit unless it is caught wide open. */
  takeDamage(amount: number, src?: string): number {
    if (this.dying) return 0;
    this.sinceHit = 0;
    return super.takeDamage(this.vulnerable ? amount : amount * this.armor, src);
  }

  /** Every gear change tears more plate off, so the armour thins as it goes. */
  protected onPhase(p: Phase): void {
    const shed = this.plates.splice(0, p === 3 ? this.plates.length : 2);
    for (const m of shed) {
      m.visible = false;
    }
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    // Welds itself shut when nobody is hurting it. Slow enough that it can
    // never out-heal real pressure, fast enough that backing off to plink at
    // it from range gives the ground back.
    this.sinceHit += dt;
    // It welds itself shut when nobody is hurting it, but only back up to the
    // gear it is currently in. At 11hp/s uncapped this out-healed a sustained
    // saber chain outright — that is not attrition, that is a fight you cannot
    // finish. Ground already taken never has to be taken twice: a phase
    // threshold crossed is a threshold kept.
    const ceiling = this.maxHp * (this.phase === 3 ? 0.25 : this.phase === 2 ? 0.6 : 1);
    if (this.sinceHit > 3.5 && this.hp < ceiling) {
      this.hp = Math.min(ceiling, this.hp + dt * 6);
    }

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
    const stride = Math.sin(t * gait);
    this.legL.rotation.x = stride * 0.3;
    this.legR.rotation.x = -stride * 0.3;
    // arms swing against the legs, heavy and short
    this.armL.rotation.x = -stride * 0.14;

    // slow devastating stomps
    // Both tells are combined below. This used to assign the stomp's tell
    // and then overwrite it with the throw's a few lines later, so the stomp
    // never showed a warning unless a throw happened to coincide.
    const stompTell = this.stompT < 0.6 && this.stompT > 0;
    if (stompTell) this.markAoe(22, 1 - this.stompT / 0.6);
    this.stompT -= dt;
    if (this.stompT <= 0 && !this.vulnerable) {
      this.stompT = 1.6 / this.tempo;
      const feet = this.group.position.clone();
      feet.y += 2;
      ctx.destroyAt(feet, 7, 0.4);
      if (this.meleeReaches(ctx.playerPos, 22, 26)) ctx.damagePlayer(16);
    }

    // hurl a boulder in a high arc
    this.telegraph = stompTell || (this.throwT < 0.8 && this.throwT > 0);
    this.throwT -= dt;
    if (this.throwT <= 0 && ctx.throwBoulder && dist < 90 && !this.vulnerable) {
      this.throwT = 5 / this.tempo;
      this.armR.rotation.x = -2.2; // wind-up pose, relaxes over time
      // the boulder leaves from the raised fist
      this.group.updateMatrixWorld(true);
      const from = this.armR.localToWorld(new THREE.Vector3(-COLOSSUS_FIST[0], COLOSSUS_FIST[1], COLOSSUS_FIST[2]));
      ctx.throwBoulder(from, ctx.playerPos.clone());
      // All that mass goes into the throw. The window is generous because it
      // is the only place real damage gets through the plate — the fight is
      // won by being there for every one of them.
      this.openWindow(3.4);
    }
    // the throwing arm comes back down into the swing
    this.armR.rotation.x += (stride * 0.14 - this.armR.rotation.x) * Math.min(1, dt * 2);
  }
}

// -------------------------------------------------------------- Sky Reaver

// Flying manta that circles high, then folds its wings and dives straight
// through the player's position, carving a trench where it strafes.
export class SkyReaver extends Monster {
  name = 'SKY REAVER';
  reward: Reward = 'railgun';
  hitRadius = 14;
  private wingL: THREE.Group;
  private wingR: THREE.Group;
  private orbitA = Math.random() * Math.PI * 2;
  private diveT = 6;
  private diving = false;
  private diveDir = new THREE.Vector3();
  private diveLife = 0;
  private strafeT = 0;

  constructor(x: number, z: number) {
    super(190);
    // Sculpted voxel anatomy (bossModels.ts): a wyvern-raptor on membrane
    // wings. Each wing is sculpted in its own root space, so it flaps and
    // folds about the shoulder without moving any shared geometry.
    this.group.add(hidePart(reaverBody()), glowPart(reaverGlow()));
    const wing = (side: number): THREE.Group => {
      const g = new THREE.Group();
      g.position.set(side * REAVER_WING_ROOT[0], REAVER_WING_ROOT[1], REAVER_WING_ROOT[2]);
      const mesh = hidePart(reaverWing());
      if (side > 0) mesh.scale.x = -1; // built as the left wing
      g.add(mesh);
      this.group.add(g);
      return g;
    };
    this.wingL = wing(-1);
    this.wingR = wing(1);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 26, z);
    const core = reaverCore();
    this.addCore(core[1], core[2]);
    this.coreScale = 0.5;
    this.weakCore.scale.setScalar(this.coreScale);
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
  /** Walking legs, left mid, right mid, left hind, right hind. */
  private legs: THREE.Group[] = [];
  private lungeT = 3;
  private slashT = -1; // 0..1 while slashing
  private combo = 0;   // swings left in the current flurry
  private heading = 0;
  // vertical answer: crouch, spring, strike, fall
  private pounceT = 0;
  private pounceWind = 0;
  private pounceHit = false;
  private crouchT = 0;
  private pounceFall = false;
  private pounceAim = new THREE.Vector3();

  constructor(x: number, z: number) {
    super(170);
    // Sculpted voxel anatomy (bossModels.ts): a praying mantis. The scythes
    // and the four walking legs each pivot where they meet the body.
    this.group.add(hidePart(mantisBody()), glowPart(mantisGlow()));
    const limb = (geo: THREE.BufferGeometry, at: V3, side: number): THREE.Group => {
      const g = new THREE.Group();
      g.position.set(side * at[0], at[1], at[2]);
      const mesh = hidePart(geo);
      if (side > 0) mesh.scale.x = -1; // built as the left limb
      g.add(mesh);
      this.group.add(g);
      return g;
    };
    this.scytheL = limb(mantisScythe(), MANTIS_SCYTHE, -1);
    this.scytheR = limb(mantisScythe(), MANTIS_SCYTHE, 1);
    for (const { at, hind } of MANTIS_HIPS) {
      for (const side of [-1, 1]) this.legs.push(limb(mantisLeg(hind), at, side));
    }
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    const core = mantisCore();
    this.addCore(core[1], core[2]);
    this.coreScale = 0.5;
    this.weakCore.scale.setScalar(this.coreScale);
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
    const deck = gy > 14 ? 0 : gy;

    // POUNCE. The mantis is the fast one, and its whole kit was ground melee,
    // so a pilot who took off simply could not be touched by it. It now
    // crouches, then throws itself up at an airborne target — the answer to
    // height is closing the distance, which is what this thing already is.
    const above = ctx.playerPos.y - deck;
    if (this.pounceT > 0) {
      this.pounceT -= dt;
      // A homing leap rather than a fixed arc: a fixed climb topped out around
      // twenty metres and simply could not touch anything higher, which is the
      // exact case this exists for. It commits to the position you were in
      // when it jumped, so moving is still the counterplay.
      const to = this.pounceAim.clone().sub(this.group.position);
      const len = to.length();
      if (len > 0.001) this.group.position.addScaledVector(to.divideScalar(len), Math.min(len, 62 * dt));
      if (this.group.position.distanceTo(ctx.playerPos) < 18 && !this.pounceHit) {
        this.pounceHit = true;
        ctx.damagePlayer(15);
      }
      if (this.pounceT <= 0) this.pounceFall = true;
    } else if (this.pounceFall) {
      // drop back to the street once the leap is spent
      this.group.position.y -= 46 * dt;
      if (this.group.position.y <= deck) { this.group.position.y = deck; this.pounceFall = false; }
    } else {
      this.group.position.y += (deck - this.group.position.y) * Math.min(1, dt * 4);
      this.crouchT -= dt;
      if (above > 18 && dist < 60 && !this.vulnerable && this.crouchT <= 0) {
        // a visible crouch first: a leap that lands with no tell is a tax
        this.crouchT = 0.5;
        this.pounceWind = 0.5;
      }
      if (this.pounceWind > 0) {
        this.pounceWind -= dt;
        if (this.pounceWind <= 0) {
          this.pounceT = 0.95;
          this.pounceHit = false;
          this.pounceAim.copy(ctx.playerPos);
          this.crouchT = (this.phase === 3 ? 2.4 : 3.4) / this.tempo;
        }
      }
    }

    // The tell is derived fresh every frame. The pounce used to set it and
    // nothing ever cleared it, so after the first leap the warning tint and
    // the danger ring stayed on for the rest of the fight; and the slashes
    // had no tell at all.
    this.telegraph = this.pounceWind > 0
      || (this.slashT < 0 && this.lungeT < 0.45 && this.lungeT > 0 && dist < 30 && !this.vulnerable);

    // idle sway + raised scythes
    const sway = Math.sin(t * 3) * 0.1;
    this.group.rotation.z = sway * 0.3;
    // an alternating gait while it runs: diagonal pairs step together, each
    // leg swinging fore and aft about its hip and lifting on the way forward
    this.legs.forEach((leg, i) => {
      const side = i % 2 ? 1 : -1;
      const ph = this.legPhase + (i === 0 || i === 3 ? 0 : Math.PI);
      leg.rotation.y = Math.sin(ph) * 0.32;
      leg.rotation.z = side * Math.max(0, Math.cos(ph)) * 0.12;
    });

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
        if (this.meleeReaches(ctx.playerPos, 26, 20)) ctx.damagePlayer(13);
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
  private armL: THREE.Group;
  private armR: THREE.Group;
  private legL: THREE.Group;
  private legR: THREE.Group;
  /** The molten heart in the chest; it pulses. */
  private core: THREE.Mesh;
  private slamT = 3;
  private throwT = 5;
  private heading = 0;

  constructor(x: number, z: number) {
    super(240);
    // Sculpted voxel anatomy (bossModels.ts): craggy basalt with lava in the
    // cracks of its crust. Arms pivot at the shoulder with the boulder fists
    // attached, legs at the hip.
    this.group.add(hidePart(golemBody()), glowPart(golemLava()));
    this.core = glowPart(golemHeart());
    this.group.add(this.core);
    const limb = (parts: THREE.Mesh[], pivot: V3, side: number): THREE.Group => {
      const g = new THREE.Group();
      g.position.set(side * pivot[0], pivot[1], pivot[2]);
      for (const mesh of parts) {
        if (side > 0) mesh.scale.x = -1; // built as the left limb
        g.add(mesh);
      }
      this.group.add(g);
      return g;
    };
    this.armL = limb([hidePart(golemArm()), glowPart(golemArmLava())], GOLEM_SHOULDER, -1);
    this.armR = limb([hidePart(golemArm()), glowPart(golemArmLava())], GOLEM_SHOULDER, 1);
    this.legL = limb([hidePart(golemLeg())], GOLEM_HIP, -1);
    this.legR = limb([hidePart(golemLeg())], GOLEM_HIP, 1);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    const core = golemCore();
    this.addCore(core[1], core[2]);
    this.coreScale = 0.7;
    this.weakCore.scale.setScalar(this.coreScale);
    this.rememberEmissives();
  }

  /** World position of the right fist, for throws. */
  private fistR(): THREE.Vector3 {
    this.group.updateMatrixWorld(true);
    return this.armR.localToWorld(new THREE.Vector3(-GOLEM_FIST[0], GOLEM_FIST[1], GOLEM_FIST[2]));
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
    (this.core.material as THREE.MeshBasicMaterial).color.setScalar(0.6 + pulse * 0.7);

    // ground slam: both fists down, ring of destruction around the feet
    // combined with the throw's tell below rather than overwritten by it
    const slamTell = this.slamT < 0.7 && this.slamT > 0 && dist < 40 && !this.vulnerable;
    if (slamTell) {
      this.markAoe(30, 1 - this.slamT / 0.7);
      // both fists haul up overhead through the tell...
      const lift = -2.5 * Math.min(1, (0.7 - this.slamT) / 0.45);
      this.armL.rotation.x = lift;
      this.armR.rotation.x = lift;
    }
    this.slamT -= dt;
    // Out of reach when the timer runs out, it waits with the tell re-armed.
    // It used to wait at zero, so stepping into range meant an instant slam
    // with no wind-up at all.
    if (this.slamT <= 0 && (dist >= 40 || this.vulnerable)) this.slamT = 0.7;
    if (this.slamT <= 0) {
      this.slamT = 3.5 / this.tempo;
      // ...and come down into the road in front of it
      this.armL.rotation.x = -0.35;
      this.armR.rotation.x = -0.35;
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
      if (this.meleeReaches(ctx.playerPos, 30, 26)) ctx.damagePlayer(18);
      // fists buried to the wrist in the road
      this.openWindow(1.8);
    }
    if (!slamTell) {
      this.armL.rotation.x *= 1 - Math.min(1, dt * 2.5);
      this.armR.rotation.x *= 1 - Math.min(1, dt * 2.5);
    }

    // lob a molten boulder at range
    this.telegraph = slamTell || (this.throwT < 0.8 && this.throwT > 0);
    this.throwT -= dt;
    if (this.throwT <= 0 && ctx.throwBoulder && dist > 24 && dist < 95 && !this.vulnerable) {
      this.throwT = 4.5 / this.tempo;
      // an overarm lob: the boulder leaves from the raised right fist
      this.armR.rotation.x = -2.3;
      ctx.throwBoulder(this.fistR(), ctx.playerPos.clone());
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
  /** The maw, which rides the top segment as it writhes. */
  private head: THREE.Group;
  private mouth: THREE.Group;
  private submerged = true;
  private phaseT = 2.5;
  private surfaceY = 0;
  private spitT = 2.5; // debris volley for targets it cannot reach

  constructor(x: number, z: number) {
    super(180);
    // Sculpted voxel anatomy (bossModels.ts): a lamprey-mouthed sandworm.
    // Each segment is its own mesh so the body can writhe, and the head
    // rides the top segment so the maw never tears away from the neck.
    this.mouth = new THREE.Group();
    for (let i = 0; i < MAW_SEGMENTS; i++) {
      const seg = hidePart(deepMawSegment(i));
      this.mouth.add(seg);
      this.segs.push(seg);
    }
    this.head = new THREE.Group();
    this.head.add(hidePart(deepMawHead()), glowPart(deepMawGullet()));
    this.mouth.add(this.head);
    this.group.add(this.mouth);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    this.addCore(7.0, -1.25);
    // the core rides its segment through the writhe
    this.segs[2].add(this.weakCore);
    this.coreScale = 0.6;
    this.weakCore.scale.setScalar(this.coreScale);
    this.rememberEmissives();
  }

  protected addHitSpheres(out: { c: THREE.Vector3; r: number }[]): void {
    if (this.submerged) return;
    // the body up the column, and the maw at the top of it
    this.segs.forEach((seg, i) => {
      const h = this.hitSphere(i);
      seg.localToWorld(h.c.set(0, 3 + i * 2.1, 0));
      h.r = (3.2 - i * 0.3) * 0.6 * MONSTER_SCALE;
      out.push(h);
    });
    const maw = this.hitSphere(this.segs.length);
    this.head.localToWorld(maw.c.set(0, 15.6, 0));
    maw.r = 2.1 * MONSTER_SCALE;
    out.push(maw);
  }

  cinematicFocus(out: THREE.Vector3): number {
    if (!this.submerged) return super.cinematicFocus(out);
    // still under the street: frame the ground it is about to come out of
    out.set(this.group.position.x, this.surfaceY + 8, this.group.position.z);
    return 16;
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    const gy = ctx.world.groundHeight(this.group.position.x, this.group.position.z, 20);
    this.surfaceY = gy > 14 ? 0 : gy;
    this.phaseT -= dt;
    this.telegraph = false; // re-derived below while it is still underground

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
      // buried. Thirty used to be the depth, but the worm is ~39 tall, so
      // its toothed maw rode through the streets seven metres above the
      // road while it was meant to be hidden under it.
      this.group.position.y = this.surfaceY - 42;
      // churn a shallow dust mound where it travels
      if (Math.random() < 0.25) ctx.destroyAt(this.group.position.clone().setY(this.surfaceY + 1), 2.4, 0.15);
      // It cannot bite what is in the air, so it throws the ground at it.
      this.spitT -= dt;
      if (this.spitT <= 0 && ctx.throwBoulder && d < 110
          && ctx.playerPos.y - this.surfaceY > 20) {
        this.spitT = (this.phase === 3 ? 2.2 : 3.2) / this.tempo;
        const from = this.group.position.clone().setY(this.surfaceY + 3);
        ctx.destroyAt(from, 4, 0.2);
        ctx.throwBoulder(from, ctx.playerPos.clone());
      }
      // The eruption is the attack, and it comes up under you; the last
      // 0.8s before it breaks the surface is its tell and its footprint.
      this.telegraph = this.phaseT < 0.8 && this.phaseT > 0 && d < 34;
      if (this.telegraph) this.markAoe(22, 1 - this.phaseT / 0.8);
      if (this.phaseT <= 0 && d < 30) {
        this.submerged = false;
        this.phaseT = 3.5;
        // erupt: burst the ground open beneath it
        ctx.destroyAt(this.group.position.clone().setY(this.surfaceY + 2), 7, 0.5);
        // measured from the SURFACE it bursts through, not from the body,
        // which is still thirty units underground at this instant
        if (d < 22 && ctx.playerPos.y - this.surfaceY <= 24) ctx.damagePlayer(20);
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
      this.head.position.x = Math.sin(t * 4 + this.segs.length * 0.6) * 0.6;
      this.head.position.z = Math.cos(t * 4 + this.segs.length * 0.6) * 0.6;
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
  private wingL: THREE.Group;
  private wingR: THREE.Group;
  /** The fire in its throat. */
  private maw: THREE.Mesh;
  private orbitA = Math.random() * Math.PI * 2;
  private breathT = 3;
  private breathing = 0; // seconds left in a breath

  constructor(x: number, z: number) {
    super(185);
    // Sculpted voxel anatomy (bossModels.ts): a fire drake. Its hide carries
    // a dim ember emissive, which the hide shader scales by the scale colour,
    // so the pale belly glows with heat and the dark back barely does.
    const body = hidePart(wyrmBody());
    (body.material as THREE.MeshStandardMaterial).emissive.setHex(0x5a2a10);
    this.group.add(body, glowPart(wyrmEyes()));
    this.maw = glowPart(wyrmThroat());
    this.group.add(this.maw);
    const wing = (side: number): THREE.Group => {
      const g = new THREE.Group();
      g.position.set(side * WYRM_WING_ROOT[0], WYRM_WING_ROOT[1], WYRM_WING_ROOT[2]);
      const mesh = hidePart(wyrmWing());
      if (side > 0) mesh.scale.x = -1; // built as the left wing
      g.add(mesh);
      this.group.add(g);
      return g;
    };
    this.wingL = wing(-1);
    this.wingR = wing(1);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 22, z);
    const core = wyrmCore();
    this.addCore(core[1], core[2]);
    this.coreScale = 0.55;
    this.weakCore.scale.setScalar(this.coreScale);
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
    // the throat fills with fire through the tell and roars through the breath
    const throat = this.breathing > 0 ? 2.2 + Math.sin(t * 30) * 0.4
      : this.telegraph ? 1 + (1 - this.breathT / 0.8) * 1.4 : 1;
    (this.maw.material as THREE.MeshBasicMaterial).color.setScalar(throat);
    if (this.breathing > 0) {
      const wasBreathing = this.breathing;
      this.breathing -= dt;
      // out of breath: it has to glide and refill before it can burn again
      if (wasBreathing > 0 && this.breathing <= 0) this.openWindow(2.0);
      // the breath leaves the mouth, not the middle of the body
      this.group.updateMatrixWorld(true);
      const from = this.group.localToWorld(new THREE.Vector3(...WYRM_MOUTH));
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
  private finL: THREE.Group;
  private finR: THREE.Group;
  private legL: THREE.Group;
  private legR: THREE.Group;
  /** The glowing water at the bottom of the cannon's bore. */
  private cannon: THREE.Mesh;
  private heading = 0;
  private fireT = 2.5;
  private burst = 0;
  private shotT = 0;

  constructor(x: number, z: number) {
    super(230);
    // Sculpted voxel anatomy (bossModels.ts): an amphibious sea titan with
    // a water cannon grown from its right forearm. Fins pivot where they
    // meet the body, legs at the hip.
    this.group.add(hidePart(leviathanBody()), glowPart(leviathanGlow()));
    this.cannon = glowPart(leviathanCannonCore());
    this.group.add(this.cannon);
    const limb = (geo: THREE.BufferGeometry, pivot: V3, side: number): THREE.Group => {
      const g = new THREE.Group();
      g.position.set(side * pivot[0], pivot[1], pivot[2]);
      const mesh = hidePart(geo);
      if (side > 0) mesh.scale.x = -1; // built as the left limb
      g.add(mesh);
      this.group.add(g);
      return g;
    };
    this.finL = limb(leviathanFin(), LEVIATHAN_FIN, -1);
    this.finR = limb(leviathanFin(), LEVIATHAN_FIN, 1);
    this.legL = limb(leviathanLeg(), LEVIATHAN_HIP, -1);
    this.legR = limb(leviathanLeg(), LEVIATHAN_HIP, 1);
    this.group.scale.setScalar(MONSTER_SCALE);
    this.group.position.set(x, 0, z);
    const core = leviathanCore();
    this.addCore(core[1], core[2]);
    this.coreScale = 0.65;
    this.weakCore.scale.setScalar(this.coreScale);
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
      // a heavy wading stride
      const stride = Math.sin(t * 2.4 * this.pace);
      this.legL.rotation.x = stride * 0.32;
      this.legR.rotation.x = -stride * 0.32;
    } else {
      this.legL.rotation.x *= 1 - Math.min(1, dt * 3);
      this.legR.rotation.x *= 1 - Math.min(1, dt * 3);
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
    // the bore brightens as it pressurises and blazes through the burst
    const bore = this.burst > 0 ? 2.2 + Math.sin(t * 26) * 0.4
      : this.telegraph ? 1 + (1 - this.fireT / 0.7) * 1.4 : 1;
    (this.cannon.material as THREE.MeshBasicMaterial).color.setScalar(bore);
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
