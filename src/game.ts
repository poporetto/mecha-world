// Game orchestrator: scene, camera, input, combat, projectiles, boss cycle.

import * as THREE from 'three';
import { World } from './core/world';
import { ChunkManager } from './render/chunkManager';
import { Player } from './entities/player';
import { NpcManager } from './entities/npcs';
import { CrimsonMantis, DeepMaw, IronColossus, Kaiju, MagmaGolem, Monster, MonsterCtx, Reward, RocketBeast, SkyReaver, VoltSerpent } from './entities/monsters';
import { CarManager } from './entities/cars';
import { RepairManager } from './core/repair';
import { Debris } from './fx/debris';
import { buildFallingChunk, FallingChunk, updateFallingChunk } from './fx/collapse';
import { Explosions } from './fx/explosions';
import { Sky } from './fx/sky';
import { sfx } from './fx/sound';
import { Hud } from './ui/hud';
import { isTouchDevice, TouchControls } from './ui/touch';

interface Projectile {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  kind: 'laser' | 'rocket' | 'boulder' | 'missile' | 'charge';
  mesh: THREE.Mesh;
  dmg?: number; // override damage / blast radius for player weapons
}

const _v = new THREE.Vector3();

export class Game {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private world = new World();
  private chunks: ChunkManager;
  private player: Player;
  private npcs: NpcManager;
  private cars: CarManager;
  private debris = new Debris();
  private hud = new Hud();
  private touch: TouchControls | null = null;

  private keys = new Set<string>();
  private mouseDown = [false, false, false];
  private drag: { x: number; y: number; sx: number; sy: number; button: number; moved: boolean } | null = null;
  private lastCollapseScan = 0;
  private camYaw = 0;
  private camPitch = 0.32;
  private locked = false;
  private started = false;

  private projectiles: Projectile[] = [];
  private laserCooldown = 0;
  private beamMesh: THREE.Mesh;
  private beamTick = 0;
  private beamActive = false;
  private sky: Sky;
  private falling: FallingChunk[] = [];
  private lastBoomSound = 0;
  private explosions = new Explosions();
  private repair: RepairManager;
  private hemi: THREE.HemisphereLight;
  private sun: THREE.DirectionalLight;
  private novaCooldown = 0;
  private missileCooldown = 0;
  private chargeT = 0; // how long R has been held
  private charging = false;
  private power = 1;
  private powerLevel = 1;

  private monster: Monster | null = null;
  private bossIndex = 0; // progression through the campaign bosses
  private bossTimer = 14;
  private clock = new THREE.Clock();
  private time = 0;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // cap DPR: phones report 3+ which tanks the frame rate on a full-screen voxel scene
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 500);

    // sky, fog, lights — pastel day, drives the day/night cycle each frame
    this.scene.background = new THREE.Color(0xa5d5f5);
    this.scene.fog = new THREE.Fog(0xc3e4f8, 110, 280);
    this.hemi = new THREE.HemisphereLight(0xe6f6ff, 0x8a9a86, 1.25);
    this.sun = new THREE.DirectionalLight(0xfff4dd, 1.35);
    this.sun.position.set(0.6, 1, 0.35);
    this.scene.add(this.hemi, this.sun);
    this.sky = new Sky();
    this.scene.add(this.sky.group);

    this.chunks = new ChunkManager(this.world, this.scene);
    this.player = new Player(this.world);
    this.player.respawn();
    this.scene.add(this.player.model.group);

    this.npcs = new NpcManager(this.world);
    this.cars = new CarManager(this.world);
    this.repair = new RepairManager(this.world);
    this.scene.add(this.npcs.group, this.cars.group, this.debris.mesh, this.explosions.group);


    // beam (unlockable): a long emissive box scaled to hit distance
    this.beamMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.7, 1),
      new THREE.MeshBasicMaterial({ color: 0x39e6e0, transparent: true, opacity: 0.85 })
    );
    this.beamMesh.visible = false;
    this.scene.add(this.beamMesh);

    this.bindInput();
    if (isTouchDevice()) {
      this.touch = new TouchControls(document.getElementById('hud')!, {
        onSaber: () => { if (this.started) this.swingSaber(); },
        onLaser: () => this.fireLaser(),
        onMissile: () => this.fireMissiles(),
        onNova: () => this.novaPulse(),
        onLook: (dx, dy) => {
          this.camYaw -= dx * 0.006;
          this.camPitch = Math.max(-0.5, Math.min(1.2, this.camPitch + dy * 0.005));
        },
      });
    }
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    (window as any).__game = this; // debug handle

    this.hud.showStart(() => {
      this.started = true;
      sfx.ensure();
      sfx.startMusic();
      if (!this.touch) this.renderer.domElement.requestPointerLock();
      this.hud.toast('DEPLOYED', 'Explore Neo Tokyo. Something big is coming…', 4);
    }, this.touch !== null);

    this.renderer.setAnimationLoop(() => this.frame());
  }

  // ------------------------------------------------------------------ input

  private bindInput(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
      this.keys.add(e.code);
      if (e.code === 'KeyF') this.fireLaser();
      if (e.code === 'KeyT') this.fireMissiles();
      if (e.code === 'KeyQ') this.novaPulse();
      // R: begin charging (release fires); e.repeat guards the auto-repeat
      if (e.code === 'KeyR' && !e.repeat && this.started) { this.charging = true; this.chargeT = 0; }
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      if (e.code === 'KeyR' && this.charging) this.releaseCharge();
    });
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.renderer.domElement;
    });
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      if (!this.started) return;
      this.mouseDown[e.button] = true;
      if (this.locked) {
        // pointer locked: instant attacks, mouse-look already active
        if (e.button === 0) this.swingSaber();
        if (e.button === 2) this.fireLaser();
      } else {
        // unlocked: could be a click (attack) or a drag (rotate camera)
        this.drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, button: e.button, moved: false };
      }
    });
    window.addEventListener('mouseup', (e) => {
      this.mouseDown[e.button] = false;
      if (this.drag && e.button === this.drag.button) {
        if (!this.drag.moved && this.started) {
          // plain click: attack and (re)acquire pointer lock for mouse-look
          this.renderer.domElement.requestPointerLock();
          if (e.button === 0) this.swingSaber();
          if (e.button === 2) this.fireLaser();
        }
        this.drag = null;
      }
    });
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('mousemove', (e) => {
      if (this.locked) {
        this.camYaw -= e.movementX * 0.0026;
        this.camPitch = Math.max(-0.5, Math.min(1.2, this.camPitch + e.movementY * 0.0022));
      } else if (this.drag) {
        // drag-to-rotate works without pointer lock
        const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y;
        if (Math.abs(e.clientX - this.drag.sx) + Math.abs(e.clientY - this.drag.sy) > 5) this.drag.moved = true;
        this.camYaw -= dx * 0.005;
        this.camPitch = Math.max(-0.5, Math.min(1.2, this.camPitch + dy * 0.004));
        this.drag.x = e.clientX;
        this.drag.y = e.clientY;
      }
    });
  }

  // ----------------------------------------------------------------- combat

  private aimDir(): THREE.Vector3 {
    return new THREE.Vector3(
      -Math.sin(this.camYaw) * Math.cos(this.camPitch),
      -Math.sin(this.camPitch) * 0.6 + 0.05,
      -Math.cos(this.camYaw) * Math.cos(this.camPitch)
    ).normalize();
  }

  private swingSaber(): void {
    if (!this.player.model.startSwing()) return;
    this.player.yaw = this.camYaw + Math.PI; // face where the camera looks
    sfx.swing();
    setTimeout(() => {
      // horizontal slash: carve a flat arc across the aim direction
      const dir = this.aimDir();
      for (const ang of [-0.45, 0, 0.45]) {
        const cos = Math.cos(ang), sin = Math.sin(ang);
        const d = new THREE.Vector3(dir.x * cos - dir.z * sin, dir.y, dir.x * sin + dir.z * cos);
        const p = this.player.pos.clone().addScaledVector(d, 9);
        p.y += 5.6;
        this.destroyAt(p, 4.4, 0.25);
      }
      const pc = this.player.pos.clone().addScaledVector(dir, 9);
      pc.y += 5.6;
      this.hitMonster(pc, 11, 12 * this.power);
    }, 190);
  }

  private fireLaser(): void {
    if (this.laserCooldown > 0 || !this.started) return;
    this.laserCooldown = 0.22;
    sfx.laser();
    this.player.yaw = this.camYaw + Math.PI;
    this.player.model.group.rotation.y = this.player.yaw; // face target this frame
    const dir = this.aimDir();
    // bolt leaves the beam rifle's muzzle, arm raised in a firing pose
    const from = new THREE.Vector3();
    this.player.model.fireRifle(from);
    from.addScaledVector(dir, 1.2);
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.3, 2.2),
      new THREE.MeshBasicMaterial({ color: 0xffb0e8 })
    );
    mesh.position.copy(from);
    mesh.lookAt(from.clone().add(dir));
    this.scene.add(mesh);
    this.projectiles.push({ pos: from, vel: dir.multiplyScalar(70), life: 2.5, kind: 'laser', mesh });
  }

  // Homing micro-missile volley: four rockets that fan out then curve onto
  // the locked boss (or fly straight if there's none). Default weapon on T.
  private fireMissiles(): void {
    if (this.missileCooldown > 0 || !this.started) return;
    this.missileCooldown = 1.4;
    sfx.rocket(1);
    this.player.yaw = this.camYaw + Math.PI;
    this.player.model.group.rotation.y = this.player.yaw;
    const dir = this.aimDir();
    const base = this.player.pos.clone();
    base.y += 7;
    for (let i = 0; i < 4; i++) {
      const spread = (i - 1.5) * 0.28;
      const cos = Math.cos(spread), sin = Math.sin(spread);
      const d = new THREE.Vector3(dir.x * cos - dir.z * sin, dir.y + 0.15, dir.x * sin + dir.z * cos).normalize();
      const from = base.clone().addScaledVector(d, 4);
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.35, 1.2),
        new THREE.MeshBasicMaterial({ color: 0xfff0a0 })
      );
      mesh.position.copy(from);
      mesh.lookAt(from.clone().add(d));
      this.scene.add(mesh);
      this.projectiles.push({ pos: from, vel: d.multiplyScalar(34), life: 3, kind: 'missile', mesh, dmg: 9 * this.power });
    }
  }

  // Charged rifle: hold R to build up, release for a fat high-damage lance.
  private releaseCharge(): void {
    this.charging = false;
    if (!this.started) return;
    const c = Math.min(1, this.chargeT / 1.1); // 0..1
    if (c < 0.25) { this.fireLaser(); return; } // a tap is just a normal shot
    sfx.laser();
    this.player.yaw = this.camYaw + Math.PI;
    this.player.model.group.rotation.y = this.player.yaw;
    const dir = this.aimDir();
    const from = new THREE.Vector3();
    this.player.model.fireRifle(from);
    from.addScaledVector(dir, 1.5);
    const size = 0.4 + c * 0.9;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(size, size, 2.6 + c * 2),
      new THREE.MeshBasicMaterial({ color: 0xbfe8ff })
    );
    mesh.position.copy(from);
    mesh.lookAt(from.clone().add(dir));
    this.scene.add(mesh);
    this.explosions.boom(from.clone(), 2 + c * 2);
    this.projectiles.push({ pos: from, vel: dir.multiplyScalar(85), life: 2.5, kind: 'charge', mesh, dmg: (14 + c * 40) * this.power });
  }

  private fireRocket(from: THREE.Vector3, toward: THREE.Vector3): void {
    sfx.rocket(1 - Math.min(1, from.distanceTo(this.player.pos) / 130));
    const dir = toward.clone().sub(from).normalize();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 1.4),
      new THREE.MeshBasicMaterial({ color: 0xff7a2f })
    );
    mesh.position.copy(from);
    mesh.lookAt(toward);
    this.scene.add(mesh);
    this.projectiles.push({ pos: from.clone(), vel: dir.multiplyScalar(26), life: 6, kind: 'rocket', mesh });
  }

  // AoE shockwave unlocked by defeating the Volt Serpent
  private novaPulse(): void {
    if (!this.player.abilities.nova || this.novaCooldown > 0 || !this.started) return;
    this.novaCooldown = 6;
    const c = this.player.pos.clone();
    c.y += 4;
    this.explosions.boom(c, 14);
    sfx.explode(1, 1);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const p = c.clone();
      p.x += Math.sin(a) * 10;
      p.z += Math.cos(a) * 10;
      this.destroyAt(p, 4.5, 0.3);
    }
    if (this.monster && !this.monster.dying) {
      const d = this.monster.group.position.distanceTo(this.player.pos);
      if (d < 34) this.monster.takeDamage(45 * this.power);
    }
  }

  // Volt Serpent lightning: a bright column + crack of thunder
  private zapAt(p: THREE.Vector3): void {
    const bolt = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 60, 1.2),
      new THREE.MeshBasicMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    bolt.position.set(p.x, p.y + 30, p.z);
    this.scene.add(bolt);
    setTimeout(() => {
      this.scene.remove(bolt);
      bolt.geometry.dispose();
      (bolt.material as THREE.Material).dispose();
    }, 140);
    this.explosions.boom(p, 5);
    sfx.zap(1 - Math.min(1, p.distanceTo(this.player.pos) / 130));
  }

  private throwBoulder(from: THREE.Vector3, toward: THREE.Vector3): void {
    const dir = toward.clone().sub(from);
    const dist = dir.length();
    dir.normalize();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 2.4, 2.4),
      new THREE.MeshLambertMaterial({ color: 0x8d939e })
    );
    mesh.position.copy(from);
    mesh.rotation.set(Math.random() * 3, Math.random() * 3, 0);
    this.scene.add(mesh);
    // lob in an arc: forward speed + upward kick, boulder gravity pulls it down
    const vel = dir.multiplyScalar(Math.min(30, dist * 0.45));
    vel.y += 14;
    this.projectiles.push({ pos: from.clone(), vel, life: 8, kind: 'boulder', mesh });
    sfx.rocket(1 - Math.min(1, from.distanceTo(this.player.pos) / 130));
  }

  private updateBeam(dt: number): void {
    const active = this.player.abilities.beam && (this.keys.has('KeyE') || this.touch?.beam === true) && this.started;
    this.player.model.aiming = active;
    this.beamMesh.visible = active;
    if (active !== this.beamActive) {
      this.beamActive = active;
      if (active) sfx.beamOn();
      else sfx.beamOff();
    }
    if (!active) return;
    this.player.yaw = this.camYaw + Math.PI;
    const dir = this.aimDir();
    const from = this.player.pos.clone();
    from.y += 7;
    const hit = this.world.raycast(from.x, from.y, from.z, dir.x, dir.y, dir.z, 90);
    const dist = hit ? hit.dist : 90;
    this.beamMesh.position.copy(from).addScaledVector(dir, dist / 2);
    this.beamMesh.scale.set(1, 1, dist);
    this.beamMesh.lookAt(from.clone().addScaledVector(dir, dist + 1));
    const pulse = 0.8 + Math.sin(this.time * 40) * 0.2;
    (this.beamMesh.material as THREE.MeshBasicMaterial).opacity = pulse;

    this.beamTick -= dt;
    if (this.beamTick <= 0) {
      this.beamTick = 0.12;
      const end = from.clone().addScaledVector(dir, dist);
      if (hit) this.destroyAt(end, 3, 0.15);
      this.hitMonsterRay(from, dir, dist + 8, 6 * this.power);
    }
  }

  private hitMonster(p: THREE.Vector3, radius: number, dmg: number): boolean {
    const m = this.monster;
    if (!m || m.dying) return false;
    _v.copy(m.group.position);
    _v.y += 14;
    if (_v.distanceTo(p) < radius + m.hitRadius) {
      m.takeDamage(dmg);
      this.debris.burst(p, [15], 6);
      return true;
    }
    return false;
  }

  private hitMonsterRay(from: THREE.Vector3, dir: THREE.Vector3, maxDist: number, dmg: number): void {
    const m = this.monster;
    if (!m || m.dying) return;
    _v.copy(m.group.position);
    _v.y += 14;
    const toM = _v.clone().sub(from);
    const along = toM.dot(dir);
    if (along < 0 || along > maxDist) return;
    const perp = toM.sub(dir.clone().multiplyScalar(along)).length();
    if (perp < m.hitRadius) m.takeDamage(dmg);
  }

  private destroyAt(p: THREE.Vector3, r: number, _shake: number): void {
    const res = this.world.destroySphere(p.x, p.y, p.z, r);
    if (res.count > 0) {
      this.chunks.markDirty(res.dirty);
      this.repair.noteDamage(res.dirty, this.time);
      this.debris.burst(p, res.ids, Math.min(26, 6 + res.count / 3));
      if (res.count > 4) this.explosions.boom(p, Math.min(9, 2 + r));
      // explosion loudness falls off with distance from the player
      const vol = 1 - Math.min(1, p.distanceTo(this.player.pos) / 110);
      if (vol > 0.04 && this.time - this.lastBoomSound > 0.09) {
        this.lastBoomSound = this.time;
        sfx.explode(Math.min(1, res.count / 60), vol);
      }
      if (res.count >= 6) this.checkCollapse(p, r);
    }
    this.npcs.scare(p, 34);
    this.cars.scare(p, 34);
  }

  // Anything the blast disconnected from the ground breaks off and falls.
  private checkCollapse(p: THREE.Vector3, r: number): void {
    // the flood fill can walk a whole building — don't run it every beam tick
    if (this.time - this.lastCollapseScan < 0.25) return;
    this.lastCollapseScan = this.time;
    // fully-disconnected chunks first, then foundation failure (a gutted base
    // topples the tower even if a stray column still stands)
    let cut = this.world.collapseScan(p.x, p.y, p.z, r);
    if (!cut && p.y < 16) cut = this.world.foundationScan(p.x, p.z, p.y + r);
    if (!cut) return;
    this.chunks.markDirty(cut.dirty);
    this.repair.noteDamage(cut.dirty, this.time);
    if (this.falling.length >= 7) {
      // too many falling pieces already — turn this one straight into rubble
      this.debris.burst(p, cut.blocks.slice(0, 6).map((b) => b[3]), 30);
      return;
    }
    const groundY = this.world.groundHeight(p.x, p.z, 40);
    const chunk = buildFallingChunk(cut.blocks, groundY);
    this.scene.add(chunk.mesh);
    this.falling.push(chunk);
  }

  private updateFalling(dt: number): void {
    for (let i = this.falling.length - 1; i >= 0; i--) {
      const f = this.falling[i];
      if (!updateFallingChunk(f, dt)) continue;
      // impact: the piece shatters into debris and dust
      const at = f.mesh.position.clone();
      at.y = f.groundY + 1;
      this.debris.burst(at, f.sampleIds, Math.min(40, 10 + f.blockCount / 8));
      this.explosions.boom(at, Math.min(12, 4 + f.blockCount / 60));
      const vol = 1 - Math.min(1, at.distanceTo(this.player.pos) / 130);
      if (vol > 0.04) sfx.explode(Math.min(1, f.blockCount / 150), vol);
      this.npcs.scare(at, 40);
      this.cars.scare(at, 40);
      this.scene.remove(f.mesh);
      f.mesh.geometry.dispose();
      this.falling.splice(i, 1);
    }
  }

  // ------------------------------------------------------------ boss cycle

  private updateBosses(dt: number): void {
    if (this.monster) {
      const ctx: MonsterCtx = {
        world: this.world,
        playerPos: this.player.pos,
        destroyAt: (p, r, s) => this.destroyAt(p, r, s),
        damagePlayer: (a) => this.damagePlayer(a),
        fireRocket: (f, t) => this.fireRocket(f, t),
        throwBoulder: (f, t) => this.throwBoulder(f, t),
        zapAt: (p) => this.zapAt(p),
      };
      this.monster.update(dt, this.time, ctx);
      this.hud.setBossHP(this.monster.hp / this.monster.maxHp);

      if (this.monster.dying && this.monster.hp <= 0 && !this.monster.dead) {
        // reward is granted once, at the start of the death animation
        if ((this.monster as any)._rewarded !== true) {
          (this.monster as any)._rewarded = true;
          this.hud.hideBoss();
          this.grantReward(this.monster.reward);
        }
      }
      if (this.monster.dead) {
        this.scene.remove(this.monster.group);
        if (this.monster instanceof VoltSerpent) this.monster.removeSegmentsFrom(this.scene);
        this.monster = null;
        this.bossTimer = 25;
        sfx.setMusicIntensity(0);
      }
      return;
    }

    this.bossTimer -= dt;
    if (this.bossTimer > 0) return;

    const a = Math.random() * Math.PI * 2;
    const d = 100;
    const x = this.player.pos.x + Math.sin(a) * d;
    const z = this.player.pos.z + Math.cos(a) * d;

    const campaign: Array<{ make: (x: number, z: number) => Monster; toast: [string, string] }> = [
      { make: (x2, z2) => new Kaiju(x2, z2), toast: ['⚠ KAIJU SIGNAL ⚠', 'GORGOSAUR is tearing through the city. Defeat it to learn the BEAM.'] },
      { make: (x2, z2) => new RocketBeast(x2, z2), toast: ['⚠ AIRBORNE THREAT ⚠', 'MISSILE MAW inbound. Defeat it to earn ROCKET BOOTS.'] },
      { make: (x2, z2) => new VoltSerpent(x2, z2), toast: ['⚠ SEISMIC WEAVE ⚠', 'VOLT SERPENT surfacing. Defeat it to learn the NOVA PULSE.'] },
      { make: (x2, z2) => new IronColossus(x2, z2), toast: ['⚠ HEAVY FOOTFALLS ⚠', 'IRON COLOSSUS approaching. Defeat it to earn the AEGIS SHIELD.'] },
      { make: (x2, z2) => new SkyReaver(x2, z2), toast: ['⚠ SHADOW OVERHEAD ⚠', 'SKY REAVER circling above. Watch for its strafing dives.'] },
      { make: (x2, z2) => new CrimsonMantis(x2, z2), toast: ['⚠ RAPID MOVEMENT ⚠', 'CRIMSON MANTIS closing fast. Keep your distance from its scythes.'] },
      { make: (x2, z2) => new MagmaGolem(x2, z2), toast: ['⚠ MOLTEN MASS ⚠', 'MAGMA GOLEM erupting. Dodge its ground slams.'] },
      { make: (x2, z2) => new DeepMaw(x2, z2), toast: ['⚠ TREMORS ⚠', 'DEEP MAW burrowing below. It strikes from underground — keep moving.'] },
    ];

    if (this.bossIndex < campaign.length) {
      const entry = campaign[this.bossIndex++];
      this.monster = entry.make(x, z);
      this.hud.toast(entry.toast[0], entry.toast[1], 5);
    } else {
      // endless mode: any boss, scaled up each power level; reward = repairs + power
      const pool = [Kaiju, RocketBeast, VoltSerpent, IronColossus, SkyReaver, CrimsonMantis, MagmaGolem, DeepMaw];
      const M = pool[Math.floor(Math.random() * pool.length)];
      const m = new M(x, z);
      m.maxHp = m.hp = Math.round(m.maxHp * (1.3 + this.powerLevel * 0.2));
      m.reward = 'repair';
      this.monster = m;
      this.hud.toast('⚠ NEW CONTACT ⚠', m.name + ' detected. Defeat it for repairs and a power boost.', 4);
    }
    if (this.monster instanceof VoltSerpent) this.monster.addSegmentsTo(this.scene);
    this.scene.add(this.monster.group);
    this.hud.showBoss(this.monster.name);
    sfx.roar();
    sfx.setMusicIntensity(1);
  }

  private grantReward(reward: Reward): void {
    sfx.jingle();
    if (reward === 'beam') {
      this.player.abilities.beam = true;
      this.touch?.unlock('beam');
      this.hud.unlock('beam', '<b>E (hold)</b> PLASMA BEAM');
      this.hud.toast('BEAM UNLOCKED', 'Hold E to fire the plasma beam', 5);
    } else if (reward === 'boots') {
      this.player.abilities.boots = true;
      this.hud.unlock('boots', '<b>SPACE (hold)</b> ROCKET BOOTS');
      this.hud.toast('ROCKET BOOTS UNLOCKED', 'Hold SPACE in the air to fly', 5);
    } else if (reward === 'nova') {
      this.player.abilities.nova = true;
      this.touch?.unlock('nova');
      this.hud.unlock('nova', '<b>Q</b> NOVA PULSE');
      this.hud.toast('NOVA PULSE UNLOCKED', 'Press Q for a devastating shockwave', 5);
    } else if (reward === 'shield') {
      this.player.abilities.shield = true;
      this.hud.unlock('shield', 'AEGIS SHIELD 50%');
      this.hud.toast('AEGIS SHIELD ONLINE', 'All damage is halved', 5);
    } else {
      this.player.heal(100);
      this.powerLevel++;
      this.power = 1 + (this.powerLevel - 1) * 0.25;
      this.hud.setPowerLevel(this.powerLevel);
      this.hud.toast('POWER LEVEL ' + this.powerLevel, 'Weapons upgraded · full repairs delivered', 4);
    }
  }

  private damagePlayer(amount: number): void {
    if (this.player.abilities.shield) {
      amount *= 0.5;
      // shield shimmer
      const flash = this.player.pos.clone();
      flash.y += 5;
      this.explosions.boom(flash, 3);
    }
    this.player.damage(amount);
    this.hud.damageFlash();
    sfx.thud();
    if (this.player.hp <= 0) {
      this.player.respawn();
      this.hud.toast('MECHA DOWN', 'Recovered and redeployed at base', 4);
    }
  }

  // ------------------------------------------------------------------ frame

  private frame(): void {
    const dt = Math.min(0.05, this.clock.getDelta());
    this.time += dt;
    this.laserCooldown -= dt;
    this.novaCooldown -= dt;
    this.missileCooldown -= dt;
    if (this.charging) this.chargeT += dt;

    if (this.started) {
      const right = this.keys.has('KeyD') || this.keys.has('ArrowRight');
      const left = this.keys.has('KeyA') || this.keys.has('ArrowLeft');
      const back = this.keys.has('KeyS') || this.keys.has('ArrowDown');
      const fwd = this.keys.has('KeyW') || this.keys.has('ArrowUp');
      let mx = (right ? 1 : 0) - (left ? 1 : 0);
      let mz = (fwd ? 1 : 0) - (back ? 1 : 0);
      let jump = this.keys.has('Space');
      let boost = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
      if (this.touch) {
        mx += this.touch.moveX;
        mz += this.touch.moveZ;
        jump = jump || this.touch.jump;
        boost = boost || this.touch.boost;
      }
      this.player.update(dt, mx, mz, this.camYaw, jump, boost);
    } else {
      this.player.update(dt, 0, 0, this.camYaw, false, false);
    }

    this.chunks.update(this.player.pos.x, this.player.pos.z);

    // NPCs flee from the monster and the player's destruction
    const threats: THREE.Vector3[] = [];
    if (this.monster && !this.monster.dying) threats.push(this.monster.group.position);
    this.npcs.update(dt, this.player.pos, threats, this.time);
    this.cars.update(dt, this.player.pos);

    this.updateBosses(dt);
    this.updateBeam(dt);
    this.updateProjectiles(dt);
    this.updateFalling(dt);
    this.debris.update(dt);
    this.explosions.update(dt);

    // townspeople rebuild the city while things are quiet
    const rep = this.repair.update(dt, this.time, this.player.pos.x, this.player.pos.z);
    if (rep) {
      this.chunks.markDirty(rep.dirty);
      for (const site of rep.startedSites) this.npcs.spawnWorkers(site.x, site.z);
      // sparkle on a few freshly restored blocks
      for (let i = 0; i < Math.min(3, rep.restored.length); i++) {
        const b = rep.restored[Math.floor(Math.random() * rep.restored.length)];
        this.debris.burst(new THREE.Vector3(b.x + 0.5, b.y + 1, b.z + 0.5), [18], 2);
      }
    }

    // day/night cycle drives sky, fog and lights
    const skyState = this.sky.update(dt, this.time, this.player.pos, this.camera);
    (this.scene.background as THREE.Color).copy(skyState.skyColor);
    (this.scene.fog as THREE.Fog).color.copy(skyState.fogColor);
    this.sun.intensity = skyState.sunIntensity;
    this.sun.position.copy(skyState.sunDir);
    this.hemi.intensity = skyState.hemiIntensity;
    this.hud.setHP(this.player.hp / this.player.maxHp);
    this.hud.update(dt);

    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
  }

  private updateProjectiles(dt: number): void {
    const playerShot = (k: Projectile['kind']) => k === 'laser' || k === 'missile' || k === 'charge';
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      if (p.kind === 'rocket') p.vel.y -= 2 * dt;
      if (p.kind === 'boulder') {
        p.vel.y -= 16 * dt;
        p.mesh.rotation.x += dt * 3;
        p.mesh.rotation.z += dt * 2;
      }
      if (p.kind === 'missile') {
        // steer toward the boss: bend velocity toward the target each frame
        const m = this.monster;
        if (m && !m.dying) {
          _v.copy(m.group.position); _v.y += 14;
          _v.sub(p.pos).normalize();
          const speed = p.vel.length();
          p.vel.lerp(_v.multiplyScalar(speed), Math.min(1, dt * 2.5));
          p.vel.setLength(Math.min(52, speed + 40 * dt)); // accelerate
        }
        p.mesh.lookAt(p.pos.clone().add(p.vel));
      }
      p.pos.addScaledVector(p.vel, dt);
      p.mesh.position.copy(p.pos);

      let boom = false;
      if (this.world.solidAt(p.pos.x, p.pos.y, p.pos.z) || p.pos.y < 0.2) boom = true;
      if (playerShot(p.kind)) {
        const hitR = p.kind === 'charge' ? 4 : 2;
        if (this.hitMonster(p.pos, hitR, (p.dmg ?? 7) * (p.kind === 'laser' ? this.power : 1))) boom = true;
      } else if (p.pos.distanceTo(this.player.pos) < (p.kind === 'boulder' ? 8 : 7)) {
        // only enemy ordnance hurts the player
        boom = true;
        this.damagePlayer(p.kind === 'boulder' ? 22 : 16);
      }
      if (boom) {
        const r = p.kind === 'charge' ? 4.5 : p.kind === 'laser' ? 2.4 : p.kind === 'missile' ? 3 : p.kind === 'boulder' ? 5 : 3.6;
        this.destroyAt(p.pos, r, 0.2);
      }
      if (boom || p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
        this.projectiles.splice(i, 1);
      }
    }
  }

  private updateCamera(): void {
    const pivot = this.player.pos.clone();
    pivot.y += 9.9;
    const dist = 28;
    const dir = new THREE.Vector3(
      Math.sin(this.camYaw) * Math.cos(this.camPitch),
      Math.sin(this.camPitch),
      Math.cos(this.camYaw) * Math.cos(this.camPitch)
    );
    // keep the camera out of buildings
    const hit = this.world.raycast(pivot.x, pivot.y, pivot.z, dir.x, dir.y, dir.z, dist);
    const d = hit ? Math.max(3.5, hit.dist - 0.8) : dist;
    this.camera.position.copy(pivot).addScaledVector(dir, d);
    this.camera.lookAt(pivot);
  }
}
