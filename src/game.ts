// Game orchestrator: scene, camera, input, combat, projectiles, boss cycle.

import * as THREE from 'three';
import { B } from './core/blocks';
import { World } from './core/world';
import { ChunkManager } from './render/chunkManager';
import { Player } from './entities/player';
import { NpcManager } from './entities/npcs';
import { CinderWyrm, CrimsonMantis, DeepMaw, IronColossus, Kaiju, MagmaGolem, Monster, MonsterCtx, Reward, RocketBeast, SkyReaver, TideLeviathan, VoltSerpent } from './entities/monsters';
import { FireManager } from './fx/fire';
import { FloodManager } from './fx/flood';
import { CarManager } from './entities/cars';
import { Plane, PlaneManager } from './entities/planes';
import { DroneManager } from './entities/drones';
import { TrafficManager } from './entities/traffic';
import { RepairManager } from './core/repair';
import { Debris } from './fx/debris';
import { buildFallingChunk, FallingChunk, updateFallingChunk } from './fx/collapse';
import { Explosions } from './fx/explosions';
import { Sky } from './fx/sky';
import { sfx } from './fx/sound';
import { BARKS, CHAPTERS, ENDLESS_LINES, EPILOGUE, MONSTER_BARKS, PROLOGUE } from './core/story';
import { Hud, WEAPONS, WeaponId } from './ui/hud';
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
  private planes = new PlaneManager();
  private drones = new DroneManager();
  private traffic = new TrafficManager();
  private ridingPlane: Plane | null = null;
  private hud = new Hud();
  private touch: TouchControls | null = null;

  private keys = new Set<string>();
  private mouseDown = [false, false, false];
  private drag: { x: number; y: number; sx: number; sy: number; button: number; moved: boolean } | null = null;
  private lastCollapseScan = 0;
  // Sites awaiting a structural re-check. A blast that undermines a building
  // often lands inside the scan throttle; without this the structure could be
  // left standing with no support until something happened to hit it again.
  private collapseQueue: THREE.Vector3[] = [];
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
  private fire = new FireManager();
  private flood = new FloodManager();
  private repair: RepairManager;
  private hemi: THREE.HemisphereLight;
  private sun: THREE.DirectionalLight;
  private novaCooldown = 0;
  private quakeCooldown = 0;
  private missileCooldown = 0;
  private chargeT = 0; // how long R has been held
  private charging = false;
  private power = 1;
  private powerLevel = 1;
  // saber/rifle/missiles ship with the mecha; the rest are earned from bosses
  private unlockedWeapons = new Set<WeaponId>(['saber', 'rifle', 'missiles']);
  private selectedWeapon: WeaponId = 'saber';
  private railCooldown = 0;
  private vulcanCooldown = 0;
  private streamCooldown = 0; // flamer / aqua tick rate
  private attackHeld = false; // A held down (sustained weapons)
  private pickups: { mesh: THREE.Mesh; spin: number; life: number }[] = [];
  private deaths = 0;
  private taughtWeakPoint = false;
  private campaignOver = false;
  // reactive radio chatter, rate-limited so Command never talks over itself
  private barkT = 0;
  private lastBark = '';
  private idleChatterT = 30;
  private blocksWrecked = 0;
  private monsterBarkT = 0;   // gap between remarks about the current kaiju
  private monsterBarkFor = ''; // which kaiju those remarks are about
  private paused = false;

  private monster: Monster | null = null;
  private bossIndex = 0; // progression through the campaign bosses
  private bossTimer = 14;
  private wave = 0;
  private score = 0;
  private combo = 1;
  private comboTimer = 0;
  private shake = 0; // camera shake magnitude, decays
  private slowmo = 0; // seconds of slow-motion remaining
  private lockOn = false; // lock-on targets the boss
  private dashT = 0; // dash cooldown
  private comboWindow = 0; // time left to chain the next saber hit
  private comboStep = 0; // 0..2 in the saber combo
  private clock = new THREE.Clock();
  private time = 0;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // cap DPR: phones report 3+ which tanks the frame rate on a full-screen voxel scene
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(this.renderer.domElement);

    // far plane reaches past the fog so the Mount Fuji backdrop stays visible
    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.2, 1600);

    // sky, fog, lights — pastel day, drives the day/night cycle each frame
    this.scene.background = new THREE.Color(0xa5d5f5);
    // fog is set from the real view distance once chunks exist, below
    this.scene.fog = new THREE.Fog(0xc3e4f8, 165, 420);
    this.hemi = new THREE.HemisphereLight(0xe6f6ff, 0x8a9a86, 1.25);
    this.sun = new THREE.DirectionalLight(0xfff4dd, 1.35);
    this.sun.position.set(0.6, 1, 0.35);
    this.scene.add(this.hemi, this.sun);
    this.sky = new Sky();
    this.scene.add(this.sky.group);

    this.chunks = new ChunkManager(this.world, this.scene, isTouchDevice());
    // fade out just short of the drawn edge so the boundary is never visible
    this.scene.fog.near = this.chunks.viewDistance * 0.55;
    this.scene.fog.far = this.chunks.viewDistance * 1.5;

    this.player = new Player(this.world);
    this.player.respawn();
    this.scene.add(this.player.model.group);

    this.npcs = new NpcManager(this.world);
    this.cars = new CarManager(this.world);
    this.repair = new RepairManager(this.world);
    this.scene.add(this.npcs.group, this.cars.group, this.debris.mesh, this.explosions.group, this.fire.group);
    this.scene.add(this.planes.group, this.drones.group, this.traffic.group);


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
        onAttackDown: () => this.attackDown(),
        onAttackUp: () => this.attackUp(),
        onNova: () => this.novaPulse(),
        onQuake: () => this.quakeSlam(),
        onWheel: () => this.hud.toggleWheel(),
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

    this.hud.bindWeaponWheel((w) => this.selectWeapon(w));
    this.hud.bindPause(() => this.setPaused(false), () => this.restart());

    // ?debug (or ?all) unlocks every ability/weapon up front for testing;
    // real players keep the defeat-a-boss-to-unlock progression
    const params = new URLSearchParams(location.search);
    if (params.has('debug') || params.has('all')) {
      this.unlockEverything();
    } else {
      // reveal the weapons the mecha ships with (the rest stay locked)
      for (const w of this.unlockedWeapons) this.hud.unlockWeapon(w);
      this.selectWeapon('saber');
    }

    this.hud.showStart(() => {
      sfx.ensure();
      sfx.startMusic();
      // open on the story, then hand control over
      void this.hud.showCard(
        'PROLOGUE',
        'THE BAY SPLIT OPEN',
        'Fourteen hours ago something came through the water.<br/>' +
        'The defence line is gone. The shelters are full.<br/><br/>' +
        'You are the last mobile suit standing.'
      ).then(() => {
        this.started = true;
        if (!this.touch) this.renderer.domElement.requestPointerLock();
        this.hud.say(PROLOGUE);
        this.hud.setObjective('Hold Neo Tokyo');
      });
    }, this.touch !== null);

    this.renderer.setAnimationLoop(() => this.frame());
  }

  // ------------------------------------------------------------------ input

  private bindInput(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
      // a story card is modal: swallow input so dismissing it cannot also
      // jump, attack or switch weapons
      if (this.hud.cardOpen) return;
      this.keys.add(e.code);
      if (e.code === 'KeyF') this.fireLaser();
      if (e.code === 'KeyT') this.fireMissiles();
      if (e.code === 'KeyQ') this.novaPulse();
      if (e.code === 'KeyC' && !e.repeat) this.dash();
      if ((e.code === 'KeyL' || e.code === 'Tab') && !e.repeat) { e.preventDefault(); this.toggleLockOn(); }
      // A: main attack — fires the selected weapon (hold to charge the rifle)
      if (e.code === 'KeyA' && !e.repeat) this.attackDown();
      // number keys pick a weapon directly
      // number keys 1..7 pick a weapon directly (locked ones are ignored)
      if (e.code.startsWith('Digit')) {
        const n = Number(e.code.slice(5)) - 1;
        if (n >= 0 && n < WEAPONS.length) this.selectWeapon(WEAPONS[n].id);
      }
      if (e.code === 'KeyG') this.quakeSlam();
      if (e.code === 'Escape' && this.started) this.setPaused(!this.paused);
      // R: begin charging (release fires); e.repeat guards the auto-repeat
      if (e.code === 'KeyR' && !e.repeat && this.started) { this.charging = true; this.chargeT = 0; }
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      if (e.code === 'KeyR' && this.charging) this.releaseCharge();
      if (e.code === 'KeyA') this.attackUp();
    });
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.renderer.domElement;
    });
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      if (!this.started) return;
      this.mouseDown[e.button] = true;
      if (e.button === 1) { this.toggleLockOn(); return; } // middle-click locks on
      if (this.locked) {
        // pointer locked: LMB fires the selected weapon, RMB the beam rifle
        if (e.button === 0) this.attackDown();
        if (e.button === 2) this.fireLaser();
      } else {
        // unlocked: could be a click (attack) or a drag (rotate camera)
        this.drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, button: e.button, moved: false };
      }
    });
    window.addEventListener('mouseup', (e) => {
      this.mouseDown[e.button] = false;
      if (this.locked && e.button === 0) this.attackUp(); // release charged rifle
      if (this.drag && e.button === this.drag.button) {
        if (!this.drag.moved && this.started) {
          // plain click: attack and (re)acquire pointer lock for mouse-look
          this.renderer.domElement.requestPointerLock();
          if (e.button === 0) { this.attackDown(); this.attackUp(); }
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
    // lock-on: every weapon routes through here, so they all track the boss
    if (this.lockOn && this.monster && !this.monster.dying) {
      _v.copy(this.monster.group.position);
      _v.y += 14;
      const from = this.player.pos.clone();
      from.y += 6.6;
      return _v.sub(from).normalize();
    }
    return new THREE.Vector3(
      -Math.sin(this.camYaw) * Math.cos(this.camPitch),
      -Math.sin(this.camPitch) * 0.6 + 0.05,
      -Math.cos(this.camYaw) * Math.cos(this.camPitch)
    ).normalize();
  }

  private toggleLockOn(): void {
    // can only lock while a live boss exists
    if (!this.lockOn && (!this.monster || this.monster.dying)) return;
    this.lockOn = !this.lockOn;
    this.hud.setLockOn(this.lockOn);
  }

  // Quick evasive dash in the current movement (or facing) direction.
  private dash(): void {
    if (this.dashT > 0 || !this.started) return;
    this.dashT = 0.9;
    const right = this.keys.has('KeyD') || this.keys.has('ArrowRight');
    const left = this.keys.has('ArrowLeft');
    const back = this.keys.has('KeyS') || this.keys.has('ArrowDown');
    const fwd = this.keys.has('KeyW') || this.keys.has('ArrowUp');
    let mx = (right ? 1 : 0) - (left ? 1 : 0);
    let mz = (fwd ? 1 : 0) - (back ? 1 : 0);
    if (this.touch) { mx += this.touch.moveX; mz += this.touch.moveZ; }
    let dir: THREE.Vector3;
    if (mx !== 0 || mz !== 0) {
      const len = Math.hypot(mx, mz), nx = mx / len, nz = mz / len;
      const sin = Math.sin(this.camYaw), cos = Math.cos(this.camYaw);
      dir = new THREE.Vector3(nx * cos - nz * sin, 0, nx * -sin - nz * cos);
    } else {
      dir = new THREE.Vector3(Math.sin(this.player.yaw), 0, Math.cos(this.player.yaw));
    }
    this.player.dash(dir);
    this.player.model.dashT = 0.3; // forward lunge pose
    this.explosions.boom(this.player.pos.clone().setY(this.player.pos.y + 3), 3);
    sfx.rocket(0.6); // whoosh
  }

  private swingSaber(): void {
    // Work out which link of the combo this is BEFORE starting the swing, so
    // the model can play the matching arc: horizontal, reverse, then overhead.
    const step = this.comboWindow > 0 ? (this.comboStep + 1) % 3 : 0;
    if (!this.player.model.startSwing(step)) return;
    this.comboStep = step;
    // twin sabers keep the combo window open longer, so chains are easier
    this.comboWindow = this.player.abilities.blades ? 1.0 : 0.7;
    // aim toward the boss when locked on, else where the camera looks
    if (this.lockOn && this.monster && !this.monster.dying) {
      const d = this.monster.group.position;
      this.player.yaw = Math.atan2(d.x - this.player.pos.x, d.z - this.player.pos.z);
    } else {
      this.player.yaw = this.camYaw + Math.PI;
    }
    sfx.swing();
    setTimeout(() => {
      const dir = this.aimDir();
      // 3rd hit is a heavier, wider finisher
      const finisher = step === 2;
      const arcs = finisher ? [-0.7, -0.35, 0, 0.35, 0.7] : [-0.45, 0, 0.45];
      const reach = finisher ? 11 : 9;
      for (const ang of arcs) {
        const cos = Math.cos(ang), sin = Math.sin(ang);
        const d = new THREE.Vector3(dir.x * cos - dir.z * sin, dir.y, dir.x * sin + dir.z * cos);
        const p = this.player.pos.clone().addScaledVector(d, reach);
        p.y += 5.6;
        this.destroyAt(p, finisher ? 5.2 : 4.4, finisher ? 0.5 : 0.25);
      }
      const pc = this.player.pos.clone().addScaledVector(dir, reach);
      pc.y += 5.6;
      // twin sabers cut ~60% deeper
      const blades = this.player.abilities.blades ? 1.6 : 1;
      const dmg = (finisher ? 26 : 12 + step * 4) * this.power * blades;
      if (this.hitMonster(pc, finisher ? 14 : 11, dmg) && finisher) this.shake = Math.max(this.shake, 0.8);
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

  // ---- weapon selection + unified attack button (A / on-screen ATTACK) ----

  selectWeapon(w: WeaponId): void {
    if (!this.unlockedWeapons.has(w)) return; // not earned yet
    this.selectedWeapon = w;
    this.hud.setWeapon(w);
    this.touch?.setWeapon(w);
  }

  // main attack pressed: melee/missiles fire at once; rifle starts charging;
  // flamer/aqua are held streams handled per-frame in updateStreams()
  private attackDown(): void {
    if (!this.started) return;
    const w = this.selectedWeapon;
    if (w === 'saber') this.swingSaber();
    else if (w === 'missiles') this.fireMissiles();
    else if (w === 'railgun') this.fireRailgun();
    else if (w === 'flamer' || w === 'aqua' || w === 'vulcan') this.attackHeld = true;
    else { this.charging = true; this.chargeT = 0; }
  }

  private attackUp(): void {
    this.attackHeld = false;
    if (this.selectedWeapon === 'rifle' && this.charging) this.releaseCharge();
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

  // Railgun (Sky Reaver): instant hitscan lance that punches through the city
  // in a straight line. Slow to cycle, but it carves a tunnel and hits hard.
  private fireRailgun(): void {
    if (this.railCooldown > 0 || !this.started) return;
    this.railCooldown = 1.6;
    sfx.zap(1);
    this.player.yaw = this.camYaw + Math.PI;
    this.player.model.group.rotation.y = this.player.yaw;
    const dir = this.aimDir();
    const from = new THREE.Vector3();
    this.player.model.fireRifle(from);

    const RANGE = 150;
    // tracer beam, fades out over a moment
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 1.1, RANGE),
      new THREE.MeshBasicMaterial({
        color: 0xbfe8ff, transparent: true, opacity: 0.9,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
    );
    beam.position.copy(from).addScaledVector(dir, RANGE / 2);
    beam.lookAt(from.clone().addScaledVector(dir, RANGE));
    this.scene.add(beam);
    const fade = { t: 0.32 };
    const tick = () => {
      fade.t -= 0.016;
      (beam.material as THREE.MeshBasicMaterial).opacity = Math.max(0, fade.t / 0.32) * 0.9;
      if (fade.t > 0) requestAnimationFrame(tick);
      else { this.scene.remove(beam); beam.geometry.dispose(); (beam.material as THREE.Material).dispose(); }
    };
    tick();

    // bore a channel of craters along the ray and damage anything in the line
    for (let d = 6; d < RANGE; d += 5) {
      const p = from.clone().addScaledVector(dir, d);
      if (p.y < 0.5) break;
      this.destroyAt(p, 3.4, 0.3);
    }
    this.hitMonsterRay(from, dir, RANGE, 55 * this.power);
    this.shake = Math.max(this.shake, 0.7);
  }

  // Head vulcans (Deep Maw): rapid low-damage chatter, great for chewing
  // through walls and staggering a boss up close.
  private fireVulcan(): void {
    if (this.vulcanCooldown > 0 || !this.started) return;
    this.vulcanCooldown = 0.08;
    this.player.yaw = this.camYaw + Math.PI;
    this.player.model.group.rotation.y = this.player.yaw;
    const dir = this.aimDir();
    // slight spread so the stream sprays
    dir.x += (Math.random() - 0.5) * 0.06;
    dir.y += (Math.random() - 0.5) * 0.04;
    dir.z += (Math.random() - 0.5) * 0.06;
    dir.normalize();
    const from = this.player.pos.clone();
    from.y += 9.6; // head height — these are the head-mounted guns
    from.addScaledVector(dir, 2);
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.18, 1.1),
      new THREE.MeshBasicMaterial({ color: 0xfff3b0 })
    );
    mesh.position.copy(from);
    mesh.lookAt(from.clone().add(dir));
    this.scene.add(mesh);
    this.projectiles.push({ pos: from, vel: dir.multiplyScalar(95), life: 1.2, kind: 'laser', mesh, dmg: 3 * this.power });
    if (Math.random() < 0.35) sfx.laser();
  }

  // Flamer (Cinder Wyrm) / Aqua blaster (Tide Leviathan): held cone streams
  // that reuse the world fire and flood systems the bosses use against you.
  private updateStreams(dt: number): void {
    const w = this.selectedWeapon;
    const streaming = this.attackHeld && (w === 'flamer' || w === 'aqua');
    this.player.model.aiming = streaming || this.player.model.aiming;
    if (this.attackHeld && w === 'vulcan') this.fireVulcan();
    if (!streaming) return;

    this.streamCooldown -= dt;
    if (this.streamCooldown > 0) return;
    this.streamCooldown = 0.09;

    this.player.yaw = this.camYaw + Math.PI;
    const dir = this.aimDir();
    const from = this.player.pos.clone();
    from.y += 7;
    // walk out along the aim until we hit something, then apply at the end
    const hit = this.world.raycast(from.x, from.y, from.z, dir.x, dir.y, dir.z, 46);
    const dist = hit ? hit.dist : 46;
    const end = from.clone().addScaledVector(dir, dist);

    if (w === 'flamer') {
      this.fire.igniteSphere(this.world, end.x, end.y, end.z, 4);
      this.explosions.boom(end, 3);
      this.hitMonsterRay(from, dir, dist + 6, 5 * this.power);
      sfx.rocket(0.5);
    } else {
      const dirty = this.flood.floodSphere(this.world, end.x, end.z, 5);
      this.chunks.markDirty(dirty);
      this.hitMonsterRay(from, dir, dist + 6, 4 * this.power);
      // knock out any fires the stream sweeps over
      this.fire.douse(end.x, end.z, 6);
      sfx.rocket(0.35);
    }
  }

  // Quake slam (Magma Golem): a ground pound that ruptures a ring of street.
  private quakeSlam(): void {
    if (!this.player.abilities.quake || this.quakeCooldown > 0 || !this.started) return;
    this.quakeCooldown = 7;
    const c = this.player.pos.clone();
    c.y += 1;
    sfx.explode(1, 1);
    this.shake = Math.max(this.shake, 1.1);
    this.explosions.boom(c, 16);
    // rupture two rings of pavement outward from the impact
    for (const [radius, count] of [[11, 10], [19, 14]] as const) {
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const p = c.clone();
        p.x += Math.sin(a) * radius;
        p.z += Math.cos(a) * radius;
        p.y = this.world.groundHeight(p.x, p.z, 40) + 1;
        this.destroyAt(p, 5, 0.4);
      }
    }
    if (this.monster && !this.monster.dying) {
      const d = this.monster.group.position.distanceTo(this.player.pos);
      if (d < 40) this.monster.takeDamage(60 * this.power);
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

  // Every sphere-shaped hit funnels through here, so wiring the swarm in once
  // means all weapons damage drones without touching each weapon.
  private hitMonster(p: THREE.Vector3, radius: number, dmg: number): boolean {
    let hit = false;
    this.killDrones(this.drones.damageSphere(p, radius, dmg));
    this.notePlanesDowned(this.planes.damageSphere(p, radius, dmg));
    const m = this.monster;
    if (m && !m.dying) {
      _v.copy(m.group.position);
      _v.y += 14;
      if (_v.distanceTo(p) < radius + m.hitRadius) {
        const bonus = this.weakPointBonus(p);
        if (bonus > 1) this.bark('weakPoint');
        m.takeDamage(dmg * bonus);
        this.debris.burst(p, [15], 6);
        this.addScore(Math.round(dmg * 2), true);
        this.hud.popDamage(dmg * bonus);
        hit = true;
      }
    }
    return hit;
  }

  // Award score + drop a repair cell for each drone destroyed.
  private killDrones(spots: THREE.Vector3[]): void {
    for (const at of spots) {
      this.explosions.boom(at, 4);
      this.debris.burst(at, [6, 12], 8);
      this.addScore(120, true);
      sfx.explode(0.25, 1 - Math.min(1, at.distanceTo(this.player.pos) / 120));
      // most wrecks leave salvage the player can fly through to repair
      if (Math.random() < 0.55) this.spawnPickup(at);
    }
  }

  private hitMonsterRay(from: THREE.Vector3, dir: THREE.Vector3, maxDist: number, dmg: number): void {
    this.killDrones(this.drones.damageRay(from, dir, maxDist, dmg));
    this.notePlanesDowned(this.planes.damageRay(from, dir, maxDist, dmg));
    const m = this.monster;
    if (!m || m.dying) return;
    _v.copy(m.group.position);
    _v.y += 14;
    const toM = _v.clone().sub(from);
    const along = toM.dot(dir);
    if (along < 0 || along > maxDist) return;
    const perp = toM.sub(dir.clone().multiplyScalar(along)).length();
    if (perp < m.hitRadius) {
      m.takeDamage(dmg);
      this.addScore(Math.round(dmg * 2), true);
      this.hud.popDamage(dmg);
    }
  }

  // Award points with the current combo multiplier and refresh the combo.
  private addScore(base: number, bumpCombo = false): void {
    if (bumpCombo) {
      this.combo = Math.min(9, this.combo + 1);
      this.comboTimer = 3.5;
    } else if (this.comboTimer <= 0) {
      this.combo = 1;
    }
    this.score += Math.round(base * this.combo);
    this.hud.setScore(this.score, this.combo);
  }

  private destroyAt(p: THREE.Vector3, r: number, shake: number): void {
    const res = this.world.destroySphere(p.x, p.y, p.z, r);
    if (res.count > 0) {
      this.score += res.count; // raw points for rubble, no combo bump
      this.hud.setScore(this.score, this.combo);
      if (shake > 0.25) this.shake = Math.max(this.shake, Math.min(1.4, shake));
      this.chunks.markDirty(res.dirty);
      this.repair.noteDamage(res.dirty, this.time);
      this.blocksWrecked += res.count;
      this.debris.burst(p, res.ids, Math.min(26, 6 + res.count / 3));
      if (res.count > 4) this.explosions.boom(p, Math.min(9, 2 + r));
      // explosion loudness falls off with distance from the player
      const vol = 1 - Math.min(1, p.distanceTo(this.player.pos) / 110);
      if (vol > 0.04 && this.time - this.lastBoomSound > 0.09) {
        this.lastBoomSound = this.time;
        sfx.explode(Math.min(1, res.count / 60), vol);
      }
      if (res.count >= 4) this.checkCollapse(p, r);
      else if (res.count > 0) this.queueCollapse(p);
    }
    this.npcs.scare(p, 34);
    this.cars.scare(p, 34);
  }

  /** Queue a site so it is re-examined even if the immediate scan is throttled. */
  private queueCollapse(p: THREE.Vector3): void {
    for (const q of this.collapseQueue) {
      if (q.distanceToSquared(p) < 100) return; // already covered nearby
    }
    if (this.collapseQueue.length < 24) this.collapseQueue.push(p.clone());
  }

  /** Work through queued sites once the throttle allows, one per tick. */
  private drainCollapseQueue(): void {
    if (this.collapseQueue.length === 0) return;
    if (this.time - this.lastCollapseScan < 0.2) return;
    const p = this.collapseQueue.shift()!;
    this.checkCollapse(p, 6);
  }

  // Anything the blast disconnected from the ground breaks off and falls.
  private checkCollapse(p: THREE.Vector3, r: number): void {
    // the flood fill can walk a whole building — don't run it every beam tick
    if (this.time - this.lastCollapseScan < 0.15) { this.queueCollapse(p); return; }
    this.lastCollapseScan = this.time;
    // fully-disconnected chunks first, then foundation failure (a gutted base
    // topples the tower even if a stray column still stands)
    let cut = this.world.collapseScan(p.x, p.y, p.z, r);
    if (!cut && p.y < 26) cut = this.world.foundationScan(p.x, p.z, p.y + r);
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
    if (cut.blocks.length > 1500) this.bark('buildingDown');
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

  // Land on / ride the airliners. Called after the player has moved: if the
  // mecha is descending onto a deck it snaps on top and rides along; jumping
  // or walking off the edge releases it.
  private updatePlaneRiding(jump: boolean): void {
    const p = this.player;
    if (this.ridingPlane) {
      const deck = this.ridingPlane.group.position.y + this.ridingPlane.deckY;
      const stillOn = this.planes.deckUnder(p.pos.x, p.pos.y, p.pos.z, 2.5) === this.ridingPlane;
      // jumping or stepping off the wing drops you back into open air
      if (jump && p.vel.y > 0) { this.ridingPlane = null; p.onPlatform = false; return; }
      if (!stillOn) { this.ridingPlane = null; p.onPlatform = false; return; }
      p.pos.y = deck;
      p.vel.y = 0;
      p.grounded = true;
      p.onPlatform = true;
      return;
    }
    // only catch a deck while falling, so you can still fly up past a plane
    if (p.vel.y > 0) { p.onPlatform = false; return; }
    const hit = this.planes.deckUnder(p.pos.x, p.pos.y, p.pos.z, 2.5);
    if (!hit) { p.onPlatform = false; return; }
    this.ridingPlane = hit;
    p.pos.y = hit.group.position.y + hit.deckY;
    p.vel.y = 0;
    p.grounded = true;
    p.onPlatform = true;
    this.hud.toast('AIRBORNE', 'Standing on a passing airliner', 2.5);
  }

  private notePlanesDowned(downed: Plane[]): void {
    for (const p of downed) {
      this.addScore(400, true);
      this.hud.toast('AIRLINER HIT', 'It is going down — clear the impact zone', 3);
      this.bark('planeDown', true);
      const at = p.group.position.clone();
      const vol = 1 - Math.min(1, at.distanceTo(this.player.pos) / 150);
      // engine blows out: fireball, torn hull plating, black smoke
      this.explosions.boom(at, 13);
      this.debris.burst(at, [16, 6, 12], 26);
      this.explosions.smokePuff(at, 9, 10, true);
      this.shake = Math.max(this.shake, 0.6);
      sfx.explode(0.7, vol);
      // riding the plane you just shot down? you go with it
      if (this.ridingPlane === p) this.ridingPlane = null;
    }
  }

  // Thick black smoke and shedding debris follow a stricken airliner down.
  private trailCrashingPlanes(dt: number): void {
    for (const p of this.planes.planes) {
      if (!p.crashing) continue;
      p.smokeT -= dt;
      if (p.smokeT > 0) continue;
      p.smokeT = 0.05;
      const at = p.group.position.clone();
      this.explosions.smokePuff(at, 7, 3, true);
      // licks of flame around the wreck
      if (Math.random() < 0.5) this.explosions.boom(at, 3.5);
      if (Math.random() < 0.3) this.debris.burst(at, [16, 12], 4);
    }
  }

  // A downed airliner ploughs a burning furrow through the city.
  private planeCrash(c: { at: THREE.Vector3; heading: number }): void {
    const fwd = new THREE.Vector3(Math.sin(c.heading), 0, Math.cos(c.heading));
    sfx.explode(1, 1 - Math.min(1, c.at.distanceTo(this.player.pos) / 200));
    this.shake = Math.max(this.shake, 1.5);
    // gouge a trench along the direction of travel, biggest at the impact
    for (let i = 0; i < 7; i++) {
      const p = c.at.clone().addScaledVector(fwd, i * 9);
      p.y = this.world.groundHeight(p.x, p.z, 60) + 2;
      this.destroyAt(p, i === 0 ? 13 : 10 - i * 0.7, 0.6);
      this.explosions.boom(p, 12 - i);
      // rolling black smoke column + scattered wreckage down the furrow
      this.explosions.smokePuff(p, 12 - i, 12 - i, true);
      this.debris.burst(p, [16, 6, 12, 20], 30 - i * 2);
      // burning fuel spreads from the wreck
      this.fire.igniteSphere(this.world, p.x, p.y, p.z, 7);
    }
    // a tall pall of smoke hangs over the crash site
    for (let k = 0; k < 6; k++) {
      const up = c.at.clone();
      up.y = this.world.groundHeight(up.x, up.z, 60) + 6 + k * 5;
      this.explosions.smokePuff(up, 10, 6, true);
    }
    this.npcs.scare(c.at, 90);
    this.cars.scare(c.at, 90);
    // caught in the fireball
    if (c.at.distanceTo(this.player.pos) < 26) this.damagePlayer(28);
    this.addScore(800, true);
    this.hud.toast('AIRLINER DOWN', 'Wreckage burning in the streets', 3.5);
  }

  // Feed the radar and the off-screen boss pointer. Contacts are rotated into
  // view space so the map reads relative to where the camera is looking.
  private updateRadar(): void {
    const RANGE = 320;
    // Project a world offset into radar space, where up = the way the camera
    // is looking. Player forward is (-sin, -cos) and right is (cos, -sin), so
    // screenX is the right component and screenY the negated forward one.
    // (This previously used -camYaw, which mirrored every contact.)
    const sin = Math.sin(this.camYaw), cos = Math.cos(this.camYaw);
    const rot = (dx: number, dz: number) => ({
      dx: dx * cos - dz * sin,
      dz: dx * sin + dz * cos,
    });
    const contacts: { dx: number; dz: number; kind: 'boss' | 'drone' | 'pickup' }[] = [];

    if (this.monster && !this.monster.dying) {
      const m = this.monster.group.position;
      const r = rot(m.x - this.player.pos.x, m.z - this.player.pos.z);
      contacts.push({ ...r, kind: 'boss' });
    }
    for (const d of this.drones.group.children) {
      const r = rot(d.position.x - this.player.pos.x, d.position.z - this.player.pos.z);
      if (Math.hypot(r.dx, r.dz) < RANGE * 1.4) contacts.push({ ...r, kind: 'drone' });
    }
    for (const p of this.pickups) {
      const r = rot(p.mesh.position.x - this.player.pos.x, p.mesh.position.z - this.player.pos.z);
      if (Math.hypot(r.dx, r.dz) < RANGE) contacts.push({ ...r, kind: 'pickup' });
    }
    this.hud.setRadar(contacts, this.camYaw, RANGE);

    // Arrow: only while a boss is alive and not already comfortably in view.
    if (!this.monster || this.monster.dying) {
      this.hud.setBossPointer(null);
      return;
    }
    const m = this.monster.group.position;
    _v.set(m.x, m.y + 14, m.z);
    const dist = Math.hypot(m.x - this.player.pos.x, m.z - this.player.pos.z);
    const ndc = _v.clone().project(this.camera);
    const inView = ndc.z < 1 && Math.abs(ndc.x) < 0.72 && Math.abs(ndc.y) < 0.72;
    if (inView) {
      this.hud.setBossPointer(null);
      return;
    }
    // bearing relative to the camera's facing, 0 = straight ahead
    const world = Math.atan2(m.x - this.player.pos.x, m.z - this.player.pos.z);
    let bearing = world - (this.camYaw + Math.PI);
    while (bearing > Math.PI) bearing -= Math.PI * 2;
    while (bearing < -Math.PI) bearing += Math.PI * 2;
    this.hud.setBossPointer(bearing, dist);
  }

  /**
   * Radio traffic after a kill. The final chapter rolls straight into the
   * epilogue and hands the player over to endless mode.
   */
  private playDebrief(): void {
    const done = this.bossIndex - 1; // index of the chapter just cleared
    const ch = CHAPTERS[done];
    if (!ch) return;
    this.hud.say(ch.debrief);
    if (done === CHAPTERS.length - 1 && !this.campaignOver) {
      this.campaignOver = true;
      this.hud.setObjective('The rift is sealed — hold the line');
      // let the debrief play, then close the story out
      setTimeout(() => {
        void this.hud.showCard(
          'EPILOGUE',
          'NEO TOKYO STANDS',
          'The bay is quiet for the first time in weeks.<br/>' +
          'The rift is closed — but the seam it tore is still there,<br/>' +
          'and the fractures are spreading.<br/><br/>' +
          '<b>Endless deployment begins now.</b>'
        ).then(() => this.hud.say(EPILOGUE));
      }, 7000);
    }
  }

  /**
   * Fire a reactive line from Command. Rate-limited, never repeats the same
   * trigger twice in a row, and yields to whatever story beat is already
   * playing so briefings are never talked over.
   */
  private bark(key: string, urgent = false): void {
    if (!this.started || this.hud.cardOpen) return;
    if (this.barkT > 0 && !urgent) return;
    if (key === this.lastBark && !urgent) return;
    if (this.hud.busy && !urgent) return; // a scripted beat is mid-flight
    const pool = BARKS[key];
    if (!pool || pool.length === 0) return;
    this.barkT = urgent ? 9 : 16;
    this.lastBark = key;
    this.idleChatterT = 34;
    this.hud.say([pool[Math.floor(Math.random() * pool.length)]]);
  }

  /** One remark about the named kaiju, if we have any written for it. */
  private sayAbout(name: string): void {
    if (this.hud.busy || this.hud.cardOpen) return;
    const pool = MONSTER_BARKS[name];
    if (!pool || pool.length === 0) return;
    this.hud.say([pool[Math.floor(Math.random() * pool.length)]]);
    this.barkT = Math.max(this.barkT, 8); // don't stack with a generic bark
  }

  /** Watch the fight and let Command comment on it. */
  private updateChatter(dt: number): void {
    this.barkT -= dt;
    this.idleChatterT -= dt;

    const hpFrac = this.player.hp / this.player.maxHp;
    if (hpFrac > 0 && hpFrac < 0.28) this.bark('lowHealth');
    if (this.combo >= 5) this.bark('bigCombo');
    if (this.drones.count >= 6) this.bark('droneSwarm');

    if (this.monster && !this.monster.dying) {
      if (this.monster.hp / this.monster.maxHp < 0.2) this.bark('bossHurt');
      const d = this.monster.group.position.distanceTo(this.player.pos);
      if (d > 320) this.bark('bossFar');

      // Aya editorialising about whatever is currently wrecking her city
      if (this.monster.name !== this.monsterBarkFor) {
        this.monsterBarkFor = this.monster.name;
        this.monsterBarkT = 12; // let the chapter briefing land first
      }
      this.monsterBarkT -= dt;
      if (this.monsterBarkT <= 0) {
        this.monsterBarkT = 20 + Math.random() * 14;
        this.sayAbout(this.monster.name);
      }
    } else {
      this.monsterBarkFor = '';
    }

    // Aya scolds early, then loses patience entirely if you keep wrecking.
    if (this.blocksWrecked > 700 && this.blocksWrecked <= 2600) this.bark('cityDamage');
    if (this.blocksWrecked > 2600) {
      this.blocksWrecked = 0;
      this.bark('heavyDestruction');
    }

    // quiet stretch with nothing happening
    if (this.idleChatterT <= 0 && !this.monster && this.drones.count === 0) {
      this.idleChatterT = 45;
      this.bark('idle');
    }
  }

  // ------------------------------------------------------------ pause / run

  private setPaused(on: boolean): void {
    this.paused = on;
    this.hud.setPaused(on, { score: this.score, wave: this.wave, deaths: this.deaths });
    if (on) {
      this.attackHeld = false;
      this.charging = false;
      this.keys.clear(); // don't resume with keys stuck down
      if (document.pointerLockElement) document.exitPointerLock();
    } else if (!this.touch) {
      this.renderer.domElement.requestPointerLock();
    }
  }

  /** Reset the run in place — no page reload, world and progress cleared. */
  private restart(): void {
    // clear entities
    if (this.monster) {
      this.scene.remove(this.monster.group);
      if (this.monster instanceof VoltSerpent) this.monster.removeSegmentsFrom(this.scene);
      this.monster = null;
    }
    this.hud.hideBoss();
    for (const p of this.projectiles) {
      this.scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      (p.mesh.material as THREE.Material).dispose();
    }
    this.projectiles.length = 0;
    for (const f of this.falling) { this.scene.remove(f.mesh); f.mesh.geometry.dispose(); }
    this.falling.length = 0;
    for (const p of this.pickups) {
      this.scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      (p.mesh.material as THREE.Material).dispose();
    }
    this.pickups.length = 0;

    // reset progression
    this.score = 0;
    this.combo = 1;
    this.comboTimer = 0;
    this.wave = 0;
    this.deaths = 0;
    this.bossIndex = 0;
    this.bossTimer = 14;
    this.powerLevel = 1;
    this.power = 1;
    this.drones.target = 3;
    this.unlockedWeapons = new Set<WeaponId>(['saber', 'rifle', 'missiles']);
    this.player.abilities = {
      beam: false, boots: true, thrust: false, nova: false,
      shield: false, blades: false, quake: false,
    };
    this.player.respawn();
    this.ridingPlane = null;
    this.slowmo = 0;
    this.shake = 0;

    this.barkT = 0;
    this.lastBark = '';
    this.blocksWrecked = 0;
    this.monsterBarkFor = '';
    this.hud.closeCard();
    this.hud.clearComms();
    this.campaignOver = false;
    this.hud.resetUnlocks();
    this.hud.setScore(0, 1);
    this.hud.setWave(0);
    this.hud.setObjective('Explore Neo Tokyo — something big is coming');
    this.selectWeapon('saber');
    this.setPaused(false);
    this.hud.toast('REDEPLOYED', 'New run — the city is whole again', 3);
  }

  // ---- repair salvage: the only mid-fight way to get health back --------

  private spawnPickup(at: THREE.Vector3): void {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 2.2, 2.2),
      new THREE.MeshBasicMaterial({ color: 0x5cf2a0, transparent: true, opacity: 0.9 })
    );
    mesh.position.copy(at);
    this.scene.add(mesh);
    this.pickups.push({ mesh, spin: 1 + Math.random(), life: 26 });
  }

  private updatePickups(dt: number): void {
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      p.life -= dt;
      p.mesh.rotation.y += p.spin * dt;
      p.mesh.rotation.x += p.spin * 0.4 * dt;
      // sink to the ground and bob so they are reachable on foot
      const gy = this.world.groundHeight(p.mesh.position.x, p.mesh.position.z, 60) + 2.5;
      p.mesh.position.y += (gy - p.mesh.position.y) * Math.min(1, dt * 2.2);
      p.mesh.position.y += Math.sin(this.time * 3 + i) * 0.02;
      // fade out in the last couple of seconds
      (p.mesh.material as THREE.MeshBasicMaterial).opacity = p.life < 2 ? p.life / 2 * 0.9 : 0.9;

      const grabbed = p.mesh.position.distanceTo(this.player.pos) < 9;
      if (grabbed) {
        this.player.heal(18);
        this.hud.toast('+18 REPAIR', 'Salvage recovered', 1.2);
        this.bark('repaired');
        sfx.jingle();
        this.addScore(40, false);
      }
      if (grabbed || p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
        this.pickups.splice(i, 1);
      }
    }
  }

  // Boss weak point: the glowing core sits high on the back, so flanking and
  // aiming beats parking in front with lock-on held.
  private weakPointBonus(p: THREE.Vector3): number {
    const m = this.monster;
    if (!m) return 1;
    m.corePos(_v);
    // tight radius: the core has to actually be what you hit
    return _v.distanceTo(p) < 8 ? 2.5 : 1;
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
        igniteAt: (p, r) => { this.fire.igniteSphere(this.world, p.x, p.y, p.z, r); },
        floodAt: (p, r) => {
          const dirty = this.flood.floodSphere(this.world, p.x, p.z, r);
          if (dirty.size) this.chunks.markDirty(dirty);
        },
      };
      this.monster.update(dt, this.time, ctx);
      this.hud.setBossHP(this.monster.hp / this.monster.maxHp);

      if (this.monster.dying && this.monster.hp <= 0 && !this.monster.dead) {
        // reward is granted once, at the start of the death animation
        if ((this.monster as any)._rewarded !== true) {
          (this.monster as any)._rewarded = true;
          this.hud.hideBoss();
          // big kill bonus (scaled by wave), a slow-mo beat and a heavy shake
          this.addScore(1000 + this.wave * 250, true);
          this.slowmo = 1.1;
          this.shake = 1.4;
          this.explosions.boom(this.monster.group.position.clone().setY(this.monster.group.position.y + 14), 16);
          this.grantReward(this.monster.reward);
          this.playDebrief();
        }
      }
      if (this.monster.dead) {
        this.scene.remove(this.monster.group);
        if (this.monster instanceof VoltSerpent) this.monster.removeSegmentsFrom(this.scene);
        this.monster = null;
        this.bossTimer = 25;
        sfx.setMusicIntensity(0);
        // don't stomp the campaign-complete objective set by the epilogue
        if (!this.campaignOver) this.hud.setObjective('Clear the drones — next contact inbound');
      }
      return;
    }

    this.bossTimer -= dt;
    if (this.bossTimer > 0) return;

    // Bosses land somewhere out in the world rather than always the same
    // distance away — sometimes right on top of you, sometimes a hunt across
    // the districts. The minimap arrow is what makes the far ones findable.
    const a = Math.random() * Math.PI * 2;
    const roll = Math.random();
    const d = roll < 0.3 ? 90 + Math.random() * 40      // close: immediate fight
      : roll < 0.7 ? 180 + Math.random() * 120          // mid: short trek
      : 340 + Math.random() * 260;                      // far: a real hunt
    const x = this.player.pos.x + Math.sin(a) * d;
    const z = this.player.pos.z + Math.cos(a) * d;

    const campaign: Array<{ make: (x: number, z: number) => Monster; toast: [string, string] }> = [
      { make: (x2, z2) => new Kaiju(x2, z2), toast: ['⚠ KAIJU SIGNAL ⚠', 'GORGOSAUR is tearing through the city. Defeat it to learn the BEAM.'] },
      { make: (x2, z2) => new RocketBeast(x2, z2), toast: ['⚠ AIRBORNE THREAT ⚠', 'MISSILE MAW inbound. Defeat it for OVERDRIVE THRUSTERS.'] },
      { make: (x2, z2) => new VoltSerpent(x2, z2), toast: ['⚠ SEISMIC WEAVE ⚠', 'VOLT SERPENT surfacing. Defeat it to learn the NOVA PULSE.'] },
      { make: (x2, z2) => new IronColossus(x2, z2), toast: ['⚠ HEAVY FOOTFALLS ⚠', 'IRON COLOSSUS approaching. Defeat it to earn the AEGIS SHIELD.'] },
      { make: (x2, z2) => new SkyReaver(x2, z2), toast: ['⚠ SHADOW OVERHEAD ⚠', 'SKY REAVER circling above. Defeat it to salvage its RAILGUN.'] },
      { make: (x2, z2) => new CrimsonMantis(x2, z2), toast: ['⚠ RAPID MOVEMENT ⚠', 'CRIMSON MANTIS closing fast. Defeat it to earn TWIN SABERS.'] },
      { make: (x2, z2) => new MagmaGolem(x2, z2), toast: ['⚠ MOLTEN MASS ⚠', 'MAGMA GOLEM erupting. Defeat it to learn the QUAKE SLAM.'] },
      { make: (x2, z2) => new DeepMaw(x2, z2), toast: ['⚠ TREMORS ⚠', 'DEEP MAW burrowing below. Defeat it to mount HEAD VULCANS.'] },
      { make: (x2, z2) => new CinderWyrm(x2, z2), toast: ['⚠ FIRESTORM ⚠', 'CINDER WYRM torching the district. Defeat it to claim its FLAMETHROWER.'] },
      { make: (x2, z2) => new TideLeviathan(x2, z2), toast: ['⚠ FLOOD WARNING ⚠', 'TIDE LEVIATHAN surfacing. Defeat it to claim its AQUA BLASTER.'] },
    ];

    this.wave++;
    this.hud.setWave(this.wave);
    // the swarm thickens as the campaign progresses
    this.drones.target = Math.min(10, 3 + Math.floor(this.wave * 0.7));
    if (this.bossIndex < campaign.length) {
      const chapterNo = this.bossIndex;
      const entry = campaign[this.bossIndex++];
      this.monster = entry.make(x, z);
      const ch = CHAPTERS[chapterNo];
      // title card first, then Command talks you through the contact
      void this.hud.showCard(
        `CHAPTER ${ch.no}`,
        ch.title,
        `A new signature has broken through.<br/>Neo Tokyo is counting on you.`
      ).then(() => this.hud.say(ch.brief));
    } else {
      // endless mode: any boss, scaled up each wave; reward = repairs + power
      const pool = [Kaiju, RocketBeast, VoltSerpent, IronColossus, SkyReaver, CrimsonMantis, MagmaGolem, DeepMaw, CinderWyrm, TideLeviathan];
      const M = pool[Math.floor(Math.random() * pool.length)];
      const m = new M(x, z);
      m.maxHp = m.hp = Math.round(m.maxHp * (1.3 + this.powerLevel * 0.2 + (this.wave - campaign.length) * 0.15));
      m.reward = 'repair';
      this.monster = m;
      this.hud.toast('⚠ WAVE ' + this.wave + ' ⚠', m.name + ' detected.', 3);
      this.hud.say([ENDLESS_LINES[this.wave % ENDLESS_LINES.length]]);
    }
    if (this.monster instanceof VoltSerpent) this.monster.addSegmentsTo(this.scene);
    this.scene.add(this.monster.group);
    this.hud.showBoss(this.monster.name);
    this.hud.setObjective('Destroy ' + this.monster.name);
    sfx.roar();
    // teach the weak point once, after the boss intro toast has had its time
    if (!this.taughtWeakPoint) {
      this.taughtWeakPoint = true;
      setTimeout(() => {
        if (this.monster && !this.monster.dying) {
          this.hud.toast('WEAK POINT: DORSAL CORE', 'Strike high on its back for 2.5x damage', 4);
        }
      }, 5200);
    }
    sfx.setMusicIntensity(1);
  }

  // DEBUG helper: hand the player every ability + weapon up front
  private unlockEverything(): void {
    const a = this.player.abilities;
    a.beam = a.boots = a.thrust = a.nova = a.shield = a.blades = a.quake = true;
    this.hud.unlock('beam', '<b>E (hold)</b> PLASMA BEAM');
    this.hud.unlock('boots', '<b>SPACE</b> OVERDRIVE THRUSTERS');
    this.hud.unlock('nova', '<b>Q</b> NOVA PULSE');
    this.hud.unlock('shield', 'AEGIS SHIELD 50%');
    this.hud.unlock('quake', '<b>G</b> QUAKE SLAM');
    this.hud.unlock('blades', 'TWIN SABERS');
    this.touch?.unlock('beam');
    this.touch?.unlock('nova');
    this.touch?.unlock('quake');
    for (const w of WEAPONS) {
      this.unlockedWeapons.add(w.id);
      this.hud.unlockWeapon(w.id);
    }
    this.selectWeapon('saber');
  }

  // Unlock a wheel weapon and immediately equip it so the reward is obvious.
  private grantWeapon(w: WeaponId, title: string, sub: string): void {
    this.unlockedWeapons.add(w);
    this.hud.unlockWeapon(w);
    this.touch?.unlockWeapon(w);
    this.selectWeapon(w);
    this.hud.toast(title, sub, 5);
  }

  private grantReward(reward: Reward): void {
    sfx.jingle();
    switch (reward) {
      case 'beam':
        this.player.abilities.beam = true;
        this.touch?.unlock('beam');
        this.hud.unlock('beam', '<b>E (hold)</b> PLASMA BEAM');
        this.hud.toast('BEAM UNLOCKED', 'Hold E to fire the plasma beam', 5);
        break;
      case 'thrust':
        this.player.abilities.thrust = true;
        this.hud.unlock('boots', '<b>SPACE</b> OVERDRIVE THRUSTERS');
        this.hud.toast('OVERDRIVE THRUSTERS', 'Your boots climb higher and sprint faster', 5);
        break;
      case 'nova':
        this.player.abilities.nova = true;
        this.touch?.unlock('nova');
        this.hud.unlock('nova', '<b>Q</b> NOVA PULSE');
        this.hud.toast('NOVA PULSE UNLOCKED', 'Press Q for a devastating shockwave', 5);
        break;
      case 'shield':
        this.player.abilities.shield = true;
        this.hud.unlock('shield', 'AEGIS SHIELD 50%');
        this.hud.toast('AEGIS SHIELD ONLINE', 'All damage is halved', 5);
        break;
      case 'blades':
        this.player.abilities.blades = true;
        this.hud.unlock('blades', 'TWIN SABERS');
        this.hud.toast('TWIN SABERS EQUIPPED', 'Saber combos swing faster and cut deeper', 5);
        break;
      case 'quake':
        this.player.abilities.quake = true;
        this.touch?.unlock('quake');
        this.hud.unlock('quake', '<b>G</b> QUAKE SLAM');
        this.hud.toast('QUAKE SLAM UNLOCKED', 'Press G to rupture the ground around you', 5);
        break;
      case 'railgun':
        this.grantWeapon('railgun', 'RAILGUN ACQUIRED', 'Weapon 4 · a piercing lance that bores through city blocks');
        break;
      case 'vulcan':
        this.grantWeapon('vulcan', 'HEAD VULCANS ONLINE', 'Weapon 5 · hold ATTACK for rapid-fire chatter');
        break;
      case 'flamer':
        this.grantWeapon('flamer', 'FLAMETHROWER SALVAGED', 'Weapon 6 · hold ATTACK to set the city ablaze');
        break;
      case 'aqua':
        this.grantWeapon('aqua', 'AQUA BLASTER SALVAGED', 'Weapon 7 · hold ATTACK to flood streets and douse fires');
        break;
      default:
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
    this.player.model.flinchT = 0.22; // visible recoil from the hit
    this.hud.damageFlash();
    sfx.thud();
    if (this.player.hp <= 0) {
      // dying costs the run: the combo breaks, score is docked, and the mecha
      // comes back only partly repaired, so attrition actually matters
      this.deaths++;
      const lost = Math.round(this.score * 0.25);
      this.score = Math.max(0, this.score - lost);
      this.combo = 1;
      this.comboTimer = 0;
      this.hud.setScore(this.score, this.combo);
      this.player.respawn();
      this.player.hp = Math.round(this.player.maxHp * 0.5);
      this.slowmo = 0.8;
      this.shake = 1.2;
      this.hud.toast('MECHA DOWN', `-${lost} score · combo lost · redeployed at 50% integrity`, 4);
    }
  }

  // ------------------------------------------------------------------ frame

  private frame(): void {
    const rawDt = Math.min(0.05, this.clock.getDelta());
    if (this.paused) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    // slow-motion scales the whole simulation; its own timer uses raw time
    if (this.slowmo > 0) this.slowmo -= rawDt;
    const dt = this.slowmo > 0 ? rawDt * 0.35 : rawDt;

    this.time += dt;
    this.laserCooldown -= dt;
    this.novaCooldown -= dt;
    this.missileCooldown -= dt;
    this.railCooldown -= dt;
    this.vulcanCooldown -= dt;
    this.quakeCooldown -= dt;
    this.dashT -= dt;
    this.comboWindow -= dt;
    if (this.charging) this.chargeT += dt;
    // drop lock-on when the boss is gone
    if (this.lockOn && (!this.monster || this.monster.dying)) { this.lockOn = false; this.hud.setLockOn(false); }
    // combo decay + camera-shake decay run on real time
    this.shake = Math.max(0, this.shake - rawDt * 2.2);
    if (this.comboTimer > 0) {
      this.comboTimer -= rawDt;
      if (this.comboTimer <= 0 && this.combo > 1) { this.combo = 1; this.hud.setScore(this.score, this.combo); }
    }

    let jump = false;
    if (this.started) {
      // A is the attack button now, so left-strafe is ArrowLeft (or Q-less); D/right still work
      const right = this.keys.has('KeyD') || this.keys.has('ArrowRight');
      const left = this.keys.has('ArrowLeft');
      const back = this.keys.has('KeyS') || this.keys.has('ArrowDown');
      const fwd = this.keys.has('KeyW') || this.keys.has('ArrowUp');
      let mx = (right ? 1 : 0) - (left ? 1 : 0);
      let mz = (fwd ? 1 : 0) - (back ? 1 : 0);
      jump = this.keys.has('Space');
      let boost = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
      if (this.touch) {
        mx += this.touch.moveX;
        mz += this.touch.moveZ;
        jump = jump || this.touch.jump;
        boost = boost || this.touch.boost;
      }
      // riding a plane: carry the mecha along with the deck before it moves
      if (this.ridingPlane) {
        this.player.pos.x += this.ridingPlane.dx;
        this.player.pos.z += this.ridingPlane.dz;
      }
      this.player.update(dt, mx, mz, this.camYaw, jump, boost);
    } else {
      this.player.update(dt, 0, 0, this.camYaw, false, false);
    }
    const crashes = this.planes.update(dt, this.player.pos,
      (x, z) => this.world.groundHeight(x, z, 60));
    this.trailCrashingPlanes(dt);
    for (const c of crashes) this.planeCrash(c);
    this.updatePlaneRiding(jump);

    this.chunks.update(this.player.pos.x, this.player.pos.z);
    this.traffic.update(dt, this.time, this.player.pos,
      (x, z) => this.world.groundHeight(x, z, 40),
      (x, z) => {
        for (let y = 1; y <= 5; y++) if (this.world.getBlock(x, y, z) === B.Pole) return true;
        return false;
      });

    // NPCs flee from the monster and the player's destruction
    const threats: THREE.Vector3[] = [];
    if (this.monster && !this.monster.dying) threats.push(this.monster.group.position);
    this.npcs.update(dt, this.player.pos, threats, this.time);
    this.cars.update(dt, this.player.pos);

    this.updateBosses(dt);
    this.drones.update(dt, this.time, {
      world: this.world,
      playerPos: this.player.pos,
      damagePlayer: (a) => this.damagePlayer(a),
      destroyAt: (p, r, sh) => this.destroyAt(p, r, sh),
    });
    this.updateBeam(dt);
    this.updateStreams(dt);
    this.updateProjectiles(dt);
    this.updateFalling(dt);
    this.drainCollapseQueue();
    this.updatePickups(dt);
    this.debris.update(dt);
    this.explosions.update(dt);
    this.updateFire(dt);
    const fl = this.flood.update(dt, this.world);
    if (fl) this.chunks.markDirty(fl.dirty);

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
    // switch the city lights on as the sun goes down
    this.chunks.nightAmount.value = Math.max(0, Math.min(1, 1 - skyState.sunIntensity / 0.75));
    this.updateChatter(dt);
    this.updateRadar();
    this.hud.setHP(this.player.hp / this.player.maxHp);
    this.hud.update(dt);

    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
  }

  // burn tick: consumed blocks puff to debris + dirty their chunks; a fire
  // that eats through a building's base can undermine it into a collapse
  private updateFire(dt: number): void {
    const res = this.fire.update(dt, this.world);
    if (!res) return;
    if (res.dirty.size) {
      this.chunks.markDirty(res.dirty);
      this.repair.noteDamage(res.dirty, this.time);
    }
    let lowest: [number, number, number] | null = null;
    for (const b of res.destroyed) {
      if (Math.random() < 0.5) this.debris.burst(new THREE.Vector3(b[0] + 0.5, b[1] + 0.5, b[2] + 0.5), [12], 3);
      if (!lowest || b[1] < lowest[1]) lowest = b;
    }
    // a low burnt-out block may have gutted the foundation
    if (lowest && lowest[1] < 10) {
      _v.set(lowest[0] + 0.5, lowest[1] + 0.5, lowest[2] + 0.5);
      this.checkCollapse(_v, 5);
    }
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
    // additive shake — jitter the final camera position, never the input yaw/pitch
    if (this.shake > 0.01) {
      const s = this.shake * 1.6;
      this.camera.position.x += (Math.random() - 0.5) * s;
      this.camera.position.y += (Math.random() - 0.5) * s;
      this.camera.position.z += (Math.random() - 0.5) * s;
    }
    this.camera.lookAt(pivot);
  }
}
