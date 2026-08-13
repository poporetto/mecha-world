// REVENANT — TA-00. The dark Terra-Armor.
//
// Rei's frame, lost near the bay three years ago, that went into the seam and
// came back under power. It is not a copy of the player's suit: the player's
// suit is a copy of it. This is the first prototype.
//
// It is built from the same MechaModel the player drives, recoloured rather
// than rebuilt, because the whole point is that you are fighting your own
// silhouette. It mirrors the player's kit, it adapts to whatever weapon you
// lean on, and in its last quarter it stops fighting like a machine and starts
// flying the pattern Rei used to fly.

import * as THREE from 'three';
import { MechaModel } from './mecha';
import { Monster, MonsterCtx, MONSTER_SCALE, Phase, Reward } from './monsters';

/** Original palette of the player's frame, and what it becomes in the seam. */
const RECOLOR: Array<[number, number]> = [
  [0xf4f5f8, 0x1d1a24], // white armour -> near black
  [0xe13b30, 0x6d2352], // red trim -> deep violet
  [0x28dff2, 0xb078ff], // cyan optics -> rift violet
  [0x63ff83, 0xc79bff], // saber green -> the colour of the tear
  [0xff2448, 0xc79bff], // Crimson Edge -> rift blade
  [0x89919d, 0x4a4655], // steel
  [0x3a3d45, 0x25222c], // joints
  [0x23262b, 0x141118], // dark
  [0xffd34e, 0xd0a0ff], // hip lamps
  [0xffdc69, 0xd0a0ff], // legacy buckle light
];

/**
 * How much damage from one weapon it takes before that weapon is fully
 * learned. Low enough that leaning on a favourite is punished inside a single
 * phase, high enough that rotating two or three weapons never notices it.
 */
const ADAPT = 240;
/** Floor on the resistance multiplier — a learned weapon still does something. */
const MIN_MULT = 0.28;
/** How fast it forgets a weapon you have stopped using, per second. */
const FORGET = 9;

type State = 'stalk' | 'rush' | 'slash' | 'shoot' | 'recover';

export class Revenant extends Monster {
  name = 'REVENANT';
  reward: Reward = 'repair';
  hitRadius = 11;

  private model = new MechaModel();
  private inner = new THREE.Group();
  private yaw = 0;
  private state: State = 'stalk';
  private stateT = 1.2;
  private slashes = 0;
  private shots = 0;
  private shotT = 0;
  private vel = new THREE.Vector3();
  private orbitDir = Math.random() < 0.5 ? 1 : -1;
  private bob = 0;
  private plowT = 0;
  private corruption = new THREE.Group();

  /** Damage absorbed per weapon, which becomes resistance to it. */
  private learned = new Map<string, number>();
  /** Multiplier applied to the most recent hit — the game reads it for the HUD. */
  lastMult = 1;
  /** Set for one frame the first time a weapon is fully learned. */
  adaptedTo: string | null = null;
  private announced = new Set<string>();

  constructor(x: number, z: number) {
    super(900);

    // The base class scales the whole group by MONSTER_SCALE for kaiju. This
    // is a mecha, not a kaiju, so undo it and take back a little more than
    // the player's own size — it should read as the same frame, a head taller.
    this.inner.scale.setScalar(1.18 / MONSTER_SCALE);
    // It uses the same earned blade rig as Terra-Armor, but the seam has
    // overwritten the emitter and beam with its own rift colour.
    this.model.setCrimsonEdge(true);
    this.inner.add(this.model.group);
    this.buildCorruption();
    this.model.group.add(this.corruption);
    this.group.add(this.inner);

    const map = new Map(RECOLOR);
    this.model.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      // clone: the player's frame shares these materials and must not change
      const src = m.material as THREE.MeshLambertMaterial;
      const mat = src.clone();
      if (mat.color) {
        const to = map.get(mat.color.getHex());
        if (to !== undefined) mat.color.setHex(to);
        else mat.color.multiplyScalar(0.32);
      }
      // the saber blade and thruster flames are unlit and have no emissive
      if (mat.emissive && mat.emissive.getHex() !== 0) mat.emissive.setHex(0x7a3fd0);
      m.material = mat;
    });

    this.group.position.set(x, 0, z);
    // This frame is ~13 units tall, not thirty like a kaiju, so both the hit
    // centre and the core have to be brought down to match it. addCore works
    // in the group's local space, which the base class scales by
    // MONSTER_SCALE — 4.8 there puts the core high on the back rather than
    // hovering above its head.
    this.centerY = 6.5;
    this.addCore(4.8, -0.75);
    this.weakCore.scale.setScalar(0.42);
    this.rememberEmissives();
  }

  /**
   * Corruption is an overlay on the shared Terra-Armor skeleton, never a
   * replacement rig. That keeps every joint and authored pose identical while
   * making the prototype read as older, predatory and partially crystallised.
   */
  private buildCorruption(): void {
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x3c174c,
      emissive: 0x7b24a8,
      emissiveIntensity: 1.15,
      metalness: 0.48,
      roughness: 0.3,
      flatShading: true,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x100c15,
      metalness: 0.7,
      roughness: 0.34,
      flatShading: true,
    });
    const addShard = (
      x: number, y: number, z: number,
      sx: number, sy: number, sz: number,
      rx = 0, rz = 0, dark = false,
    ) => {
      const shard = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1.8, 4),
        dark ? darkMat : shardMat,
      );
      shard.position.set(x, y, z);
      shard.scale.set(sx, sy, sz);
      shard.rotation.set(rx, 0, rz);
      shard.castShadow = true;
      this.corruption.add(shard);
    };

    // Every shard now sits inside the frame's own silhouette. Four used to
    // break it — two crown thorns above the helmet and two shoulder growths
    // out past the pauldrons — which read as loose blocks floating beside the
    // machine rather than as corruption growing through it.
    // Back growths, tucked behind the shoulder line.
    addShard(-0.72, 3.75, -0.72, 0.3, 0.62, 0.3, -0.75, -0.28, true);
    addShard(0.58, 3.55, -0.78, 0.26, 0.5, 0.26, -0.68, 0.25);
    // Smaller outer-leg spurs keep the corruption visible in chase/profile.
    addShard(-0.67, 1.25, -0.05, 0.24, 0.42, 0.24, 0, -0.88);
    addShard(0.65, 0.72, -0.12, 0.2, 0.36, 0.2, 0, 0.9, true);
  }

  /**
   * Difficulty floor on the adaptive resistance. On Story the frame still
   * learns your weapons — the fight is unreadable otherwise — but it never
   * shrugs off as much, so a first-timer is not required to rotate the whole
   * arsenal perfectly to make progress. 0 leaves the tuned behaviour alone.
   */
  resistFloor = 0;

  /** Current resistance to a weapon, 1 = fresh, MIN_MULT = fully learned. */
  resistTo(src: string): number {
    const t = this.learned.get(src) ?? 0;
    const floor = Math.max(MIN_MULT, this.resistFloor);
    return Math.max(floor, 1 - (t / ADAPT) * (1 - floor));
  }

  /** How thoroughly it has learned a weapon, 0..1 — for the HUD readout. */
  adaptionTo(src: string): number {
    return Math.min(1, (this.learned.get(src) ?? 0) / ADAPT);
  }

  takeDamage(amount: number, src?: string): number {
    if (this.dying) return 0;
    let mult = 1;
    if (src) {
      mult = this.resistTo(src);
      this.learned.set(src, (this.learned.get(src) ?? 0) + amount);
      if (!this.announced.has(src) && this.adaptionTo(src) >= 0.85) {
        this.announced.add(src);
        this.adaptedTo = src;
      }
    }
    this.lastMult = mult;
    return super.takeDamage(amount * mult);
  }

  protected onPhase(p: Phase): void {
    // it recommits every time it is pushed back, and it stops holding range
    this.state = 'rush';
    this.stateT = 0.9;
    if (p === 3) this.orbitDir = Math.random() < 0.5 ? 1 : -1;
  }

  /** Phase 3 is the tell: it stops shooting and fights the way she flew. */
  get reiPattern(): boolean {
    return this.phase === 3;
  }

  update(dt: number, t: number, ctx: MonsterCtx): void {
    this.updateFlash(dt);
    if (this.updateDeath(dt)) return;

    // it forgets a weapon you stop hitting it with, so rotation is rewarded
    // continuously rather than once
    for (const [k, v] of this.learned) {
      const next = v - FORGET * dt;
      if (next <= 0) { this.learned.delete(k); this.announced.delete(k); }
      else this.learned.set(k, next);
    }

    const pos = this.group.position;
    const dx = ctx.playerPos.x - pos.x;
    const dz = ctx.playerPos.z - pos.z;
    const dist = Math.hypot(dx, dz);

    // always face the player — this thing never turns its back on you
    const want = Math.atan2(dx, dz);
    let d = want - this.yaw;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    this.yaw += d * Math.min(1, dt * (this.vulnerable ? 2 : 7));
    this.group.rotation.y = this.yaw;

    this.stateT -= dt;
    this.vel.multiplyScalar(Math.max(0, 1 - dt * 3.4));

    switch (this.state) {
      case 'stalk': this.stalk(dt, dist); break;
      case 'rush': this.rush(dt, dx, dz, dist); break;
      case 'slash': this.slash(dt, dist, ctx); break;
      case 'shoot': this.shoot(dt, ctx); break;
      case 'recover': if (this.stateT <= 0) this.pick(dist); break;
    }

    pos.x += this.vel.x * dt;
    pos.z += this.vel.z * dt;
    // Street level only. groundHeight scans DOWNWARD from the height it is
    // given, so searching from 40 made every rooftop read as ground: it would
    // step onto a tower, then onto a taller one, and climb the skyline until
    // it was out of reach entirely. Searching from just above street height
    // means towers are invisible to it and it walks through them instead.
    const gy = ctx.world.groundHeight(pos.x, pos.z, 14);
    const deck = gy > 14 ? 0 : gy;

    // It holds the deck unless you take the fight upward. It is a
    // Terra-Armor, so it has your thrusters — climbing does not escape it.
    // But it only ever rises to meet you, never above you, and it drops the
    // moment you come down, so it can never wander off into the sky on its
    // own the way it used to.
    const airborne = ctx.playerPos.y - deck > 16;
    const wantY = airborne ? Math.min(ctx.playerPos.y - 2, deck + 70) : deck;
    // slow to climb, quick to fall — it is heavier than you
    pos.y += (wantY - pos.y) * Math.min(1, dt * (wantY > pos.y ? 1.5 : 4));
    const lit = pos.y > deck + 4;
    this.model.setThrusters(lit);
    this.model.flying = lit;

    // drive the shared frame's own animation so it walks and swings like you
    this.bob += dt;
    const speed = Math.hypot(this.vel.x, this.vel.z);
    // Drive the exact same walk, flight, knee, elbow and weapon animation
    // branches as the player's Terra-Armor.
    this.model.animate(t, speed, !lit, dt);
    this.inner.position.y = Math.sin(this.bob * 3) * 0.06;
    this.corruption.rotation.y = Math.sin(t * 1.7) * 0.012;

    // Now that towers no longer stop it, it has to go through them visibly
    // rather than clipping. A charge carves its own corridor.
    this.plowT -= dt;
    if (speed > 14 && this.plowT <= 0) {
      this.plowT = 0.1;
      const through = pos.clone();
      through.y += 7;
      through.x += (this.vel.x / speed) * 9;
      through.z += (this.vel.z / speed) * 9;
      ctx.destroyAt(through, 7, 0.12);
    }
  }

  /** Circle at range, closing slowly. This is the only time it is readable. */
  private stalk(dt: number, dist: number): void {
    const ring = this.reiPattern ? 26 : 42;
    const push = dist > ring ? 1 : -0.55;
    const fwd = Math.sin(this.yaw), side = Math.cos(this.yaw);
    const sp = (this.reiPattern ? 21 : 15) * this.pace;
    this.vel.x += (fwd * push + side * this.orbitDir * 0.85) * sp * dt * 3;
    this.vel.z += (side * push - fwd * this.orbitDir * 0.85) * sp * dt * 3;
    this.telegraph = this.stateT < 0.45;
    if (this.stateT <= 0) this.pick(dist);
  }

  /** Closes the gap in one committed burst — the same dash the player has. */
  private rush(dt: number, dx: number, dz: number, dist: number): void {
    this.telegraph = false;
    if (dist > 1) {
      const sp = 78 * this.pace;
      this.vel.x += (dx / dist) * sp * dt * 4;
      this.vel.z += (dz / dist) * sp * dt * 4;
    }
    this.model.dashT = 0.2;
    if (this.stateT <= 0 || dist < 20) {
      this.state = 'slash';
      this.slashes = this.phase === 3 ? 4 : this.phase === 2 ? 3 : 2;
      this.stateT = 0;
    }
  }

  private slash(dt: number, dist: number, ctx: MonsterCtx): void {
    this.telegraph = false;
    if (this.stateT > 0) return;
    if (this.slashes <= 0) {
      // planted at the end of a flurry, exactly like the player's finisher
      this.state = 'recover';
      this.stateT = this.phase === 3 ? 0.75 : 1.15;
      this.openWindow(this.phase === 3 ? 0.85 : 1.3);
      return;
    }
    this.slashes--;
    this.stateT = 0.42 / this.tempo;
    this.model.startSwing(this.slashes === 0 ? 2 : this.slashes % 2);
    if (dist < 26) {
      ctx.damagePlayer(this.phase === 3 ? 15 : 11);
      // the blade wrecks whatever is behind you, same as yours does
      const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
      const p = this.group.position.clone().addScaledVector(fwd, 16);
      p.y += 6;
      ctx.destroyAt(p, 4.5, 0.25);
    }
  }

  /** Rifle bursts. It gives this up entirely once it is fighting like Rei. */
  private shoot(dt: number, ctx: MonsterCtx): void {
    this.telegraph = this.shots > 0 && this.shotT > 0.16;
    this.shotT -= dt;
    if (this.shotT > 0) return;
    if (this.shots <= 0) {
      this.state = 'recover';
      this.stateT = 0.8;
      this.openWindow(1.1);
      return;
    }
    this.shots--;
    this.shotT = 0.26 / this.tempo;
    const from = this.group.position.clone();
    from.y += 7.5;
    this.model.fireRifle(from);
    if (ctx.fireRocket) ctx.fireRocket(from, ctx.playerPos.clone().setY(ctx.playerPos.y + 3));
  }

  /** Choose the next move. Rei's pattern is all pressure and no standing off. */
  private pick(dist: number): void {
    if (this.reiPattern) {
      this.state = 'rush';
      this.stateT = 1.1;
      return;
    }
    const roll = Math.random();
    if (dist > 60 && roll < 0.55) {
      this.state = 'shoot';
      this.shots = this.phase === 2 ? 4 : 3;
      this.shotT = 0.2;
    } else if (roll < 0.75) {
      this.state = 'rush';
      this.stateT = 1.2;
    } else {
      this.state = 'stalk';
      this.stateT = 1.1 + Math.random() * 0.9;
      this.orbitDir = Math.random() < 0.5 ? 1 : -1;
    }
  }
}
