// Game orchestrator: scene, camera, input, combat, projectiles, boss cycle.

import * as THREE from 'three';
import { B } from './core/blocks';
import { World } from './core/world';
import { corruptionAt, RIFT_SITE } from './core/worldgen';
import { Revenant } from './entities/revenant';
import { ChunkManager } from './render/chunkManager';
import { DASH_DURATION, Player } from './entities/player';
import { NpcManager } from './entities/npcs';
import { CinderWyrm, CrimsonMantis, DeepMaw, IronColossus, Kaiju, MagmaGolem, Monster, MonsterCtx, Phase, Reward, RocketBeast, SkyReaver, TideLeviathan, VoltSerpent } from './entities/monsters';
import { FireManager } from './fx/fire';
import { FloodManager } from './fx/flood';
import { CarManager } from './entities/cars';
import { Plane, PlaneManager } from './entities/planes';
import { DefenseWing } from './entities/defensePlanes';
import { DroneManager } from './entities/drones';
import { TrafficManager } from './entities/traffic';
import { Ally } from './entities/ally';
import { Tank } from './entities/tank';
import { Digger } from './entities/digger';
import { Shelter, ShelterManager } from './entities/shelters';
import { EvacueeManager } from './entities/evacuees';
import { RepairManager } from './core/repair';
import { Debris } from './fx/debris';
import { buildFallingChunk, FallingChunk, updateFallingChunk } from './fx/collapse';
import { Explosions } from './fx/explosions';
import { Sky } from './fx/sky';
import { sfx } from './fx/sound';
import { ACT2_START, AYA, AYA_HINATA, BARKS, CHAPTERS, Line, ENDLESS_LINES, EPILOGUE, HINATA_CHAPTER, JOTETSU_BARKS, JOTETSU_CHAPTER, KOTETSU_BARKS, KOTETSU_CHAPTER, LATE_MEMORIES, MEMORIES, MONSTER_BARKS, PROLOGUE, REVENANT_BEATS, RIFT_EPILOGUE } from './core/story';
import { Tutorial } from './core/tutorial';
import { GameSettings, Hud, RadarKind, WEAPONS, WeaponId, DIFFICULTY} from './ui/hud';
import { isTouchDevice, TouchControls } from './ui/touch';

interface Projectile {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  kind: 'laser' | 'rocket' | 'boulder' | 'charge' | 'ally' | 'shell';
  mesh: THREE.Mesh;
  dmg?: number; // override damage / blast radius for player weapons
}

/** A checkpoint, written at each chapter boundary. */
interface SaveData {
  v: 1;
  chapter: number;
  score: number;
  deaths: number;
  powerLevel: number;
  weapons: WeaponId[];
  abilities: Record<string, boolean>;
}

const _v = new THREE.Vector3();
/** Global outgoing balance modifiers, kept at the collision boundary so new
 * weapons and support shots inherit the intended campaign difficulty. */
const PLAYER_ATTACK_DAMAGE = 0.7;
/**
 * Support fire — Hinata's frame, Kotetsu's shells, the defence wing — is
 * meant to read as the city helping, not as a second player. At 0.5 the wing
 * and the allies were doing enough of the boss's health bar that a fight
 * could resolve itself while you watched. It is now nominal: visible, audible,
 * and worth almost nothing on the bar.
 */
const ALLY_ATTACK_DAMAGE = 0.14;
/** The defence wing is the most numerous of the three, so it is quieter still. */
const WING_ATTACK_DAMAGE = 0.08;
// Bosses are endurance encounters rather than oversized regular enemies.
// This is deliberately separate from drone/building damage so crowd-control
// weapons remain satisfying while single-target boss burst stays controlled.
// Dropped from 0.62: with the campaign HP curve and the punish windows the
// fights were still ending well before their third phase had anything to say.
// Only single-target boss damage moves — crowd control against drones and the
// city stays where it was, so the suit does not feel weaker to use.
const PLAYER_BOSS_DAMAGE = 0.40;
/** What a kaiju's palette drains toward after a long stay in the seam. */
const _riftTint = new THREE.Color(0x4a3060);

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
  private defenseWing = new DefenseWing();
  private defenseWingAnnounced = false;
  private defenseLossCursor = 0;
  private drones = new DroneManager();
  private traffic = new TrafficManager();
  private ally = new Ally();
  private tank = new Tank();
  private digger = new Digger();
  private shelters!: ShelterManager;
  private evacuees!: EvacueeManager;
  private lateMemoryIdx = 0;
  private ayaHinataIdx = 0;
  private kotetsuCursor = new Map<string, number>();
  private jotetsuCursor = new Map<string, number>();
  private mechanicT = 40;
  private diggerChatterT = 32;
  private supportArrivalChapter = -1;
  private supportArrivalArmed = false;
  private diggerWorkTarget: THREE.Vector3 | null = null;
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
  private chargeT = 0; // how long R has been held
  private charging = false;
  private power = 1;
  private powerLevel = 1;
  // saber and rifle ship with the mecha; the rest are earned from bosses
  private unlockedWeapons = new Set<WeaponId>(['saber', 'rifle']);
  private selectedWeapon: WeaponId = 'saber';
  private railCooldown = 0;
  private vulcanCooldown = 0;
  private streamCooldown = 0; // flamer / aqua tick rate
  private attackHeld = false; // A held down (sustained weapons)
  private pickups: { mesh: THREE.Mesh; spin: number; life: number }[] = [];
  private deaths = 0;
  private taughtWeakPoint = false;
  private campaignOver = false;
  private gameOver = false;
  // reactive radio chatter, rate-limited so Command never talks over itself
  private barkT = 0;
  private lastBark = '';
  private barkCursor = new Map<string, number>();
  private idleChatterT = 30;
  private supportCallT = 8;
  private blocksWrecked = 0;
  /** First-run onboarding; null on a resumed or already-taught run. */
  private tutorial: Tutorial | null = null;
  private tutWrecked = 0;
  private tutMarker: THREE.Mesh | null = null;
  /** Which tutorial step the HUD is currently showing. */
  private tutPainted: string | null = null;
  private monsterBarkT = 0;   // gap between remarks about the current kaiju
  private monsterBarkFor = ''; // which kaiju those remarks are about
  private memoryIdx = 0;       // next backstory fragment to surface
  private paused = false;

  private monster: Monster | null = null;
  private bossIndex = 0; // progression through the campaign bosses
  // Explicit checkpoint: zero-based index of the most recently defeated
  // campaign chapter. -1 means the campaign has not cleared Chapter 1 yet.
  private latestFinishedChapter = -1;
  private bossTimer = 14;
  /** 0 in the clean city, 1 at the seam. Recomputed each frame from position. */
  private corruption = 0;
  /** Act II: where the line currently is. Null for the whole of Act I. */
  private notedReiPattern = false;
  /** Which of the Revenant's mid-fight beats have already played. */
  private revenantBeats = new Set<string>();
  /** Swarm size for the current wave, before the lull's ramp is applied. */
  private droneBase = 3;
  private warnedContact = false;
  private lastSpawnFar = false;
  private wave = 0;
  private score = 0;
  private combo = 1;
  private comboTimer = 0;
  private shake = 0; // camera shake magnitude, decays
  /** Directional camera shove, world space. Decays; read by updateCamera. */
  private kick = new THREE.Vector3();
  /** Camera roll in radians — banking in turns, snapping on impacts. */
  private camRoll = 0;
  private rollTarget = 0;
  private slowmo = 0; // seconds of slow-motion remaining
  private hitStop = 0;
  private impactZoom = 0;
  /** Rate-limit impact smoke independently from sparks; automatic weapons can
   * hit many times per second but should create one readable damage plume. */
  private monsterSmokeT = 0;
  private dashCameraT = 0;
  private bossIntroT = 0;
  private readonly bossIntroDuration = 3;
  private lockOn = false; // lock-on targets the boss
  // Camera state is intentionally separate from the player transform. A
  // lightly sprung chase camera makes a 30-ton machine feel weighty while
  // still snapping inward quickly enough to stay out of buildings.
  private cameraPivot = new THREE.Vector3();
  private cameraChase = new THREE.Vector3();
  private cameraReady = false;
  private dashT = 0; // dash cooldown
  private dashFxT = 0;
  private evadeT = 0;
  private counterWindow = 0;
  private crimsonCooldown = 0;
  private redeploying = false;
  private chapterStartScore = 0;
  private chapterStartDeaths = 0;
  private chapterStartDamage = 0;
  private bossTelegraph = new THREE.Mesh(
    new THREE.RingGeometry(5.5, 7.3, 32),
    new THREE.MeshBasicMaterial({ color: 0xff5a35, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide })
  );
  private bossTelegraphCore = new THREE.Mesh(
    new THREE.RingGeometry(2.1, 2.75, 32),
    new THREE.MeshBasicMaterial({ color: 0xffb04a, transparent: true, opacity: 0.52, depthWrite: false, side: THREE.DoubleSide })
  );
  private evadeRewarded = false;
  private comboWindow = 0; // time left to chain the next saber hit
  private comboStep = 0; // 0..2 in the saber combo
  private clock = new THREE.Clock();
  // rolling one-second frame-time window for the F3 overlay
  private perfFrames = 0;
  private perfSum = 0;
  private perfWorst = 0;
  private perfWindow = 0;
  private time = 0;
  private footstepT = 0;
  private servoT = 0;
  private settings: GameSettings = {
    difficulty: 'normal',
    music: 0.62, effects: 0.68, shake: 0.85, sensitivity: 1,
    subtitles: true, highContrast: false, reducedMotion: false,
  };

  constructor() {
    try {
      const saved = JSON.parse(localStorage.getItem('mecha-city.settings.v1') ?? 'null');
      if (saved && typeof saved === 'object') this.settings = { ...this.settings, ...saved };
    } catch { /* settings are optional */ }
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
    this.shelters = new ShelterManager((x, z) => this.world.groundHeight(x, z, 60));
    this.scene.add(this.shelters.group);
    this.evacuees = new EvacueeManager(this.shelters.shelters.length);
    this.scene.add(this.evacuees.group);
    this.scene.add(this.npcs.group, this.cars.group, this.debris.mesh, this.explosions.group, this.fire.group);
    this.scene.add(this.planes.group, this.defenseWing.group, this.drones.group, this.traffic.group, this.ally.group, this.tank.group, this.digger.group);
    this.bossTelegraph.rotation.x = -Math.PI / 2;
    this.bossTelegraph.visible = false;
    this.scene.add(this.bossTelegraph);
    this.bossTelegraphCore.rotation.x = -Math.PI / 2;
    this.bossTelegraphCore.visible = false;
    this.scene.add(this.bossTelegraphCore);


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
        onCycleWeapon: () => this.cycleWeapon(),
        onDash: () => this.dash(),
        onLook: (dx, dy) => {
          this.camYaw -= dx * 0.006 * this.settings.sensitivity;
          this.camPitch = Math.max(-0.5, Math.min(1.2, this.camPitch + dy * 0.005 * this.settings.sensitivity));
        },
      });
    }
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    (window as any).__game = this; // debug handle

    this.hud.bindDash(() => this.dash());
    this.hud.bindPause(() => this.setPaused(false), () => this.restart());
    this.hud.bindSettings(this.settings, (settings) => {
      this.settings = settings;
      sfx.setVolumes(settings.music, settings.effects);
      try { localStorage.setItem('mecha-city.settings.v1', JSON.stringify(settings)); } catch { /* optional */ }
    });
    // ?debug (or ?all) unlocks every ability/weapon up front for testing;
    // real players keep the defeat-a-boss-to-unlock progression
    const params = new URLSearchParams(location.search);
    const debug = params.has('debug') || params.has('all');
    // The chapter jump is always available — it is the only practical way to
    // reach a late chapter for testing without playing the whole campaign.
    // NOTE: this means the DEBUG button is on the HUD of a shipped build. To
    // hide it before release, put `debug &&` back in front of this line.
    this.hud.bindChapterDebug(CHAPTERS, (chapter) => this.jumpToChapter(chapter));
    // Unlocking the whole kit is a separate concern from jumping chapters:
    // jumping to chapter 4 should give you chapter 4's loadout, not everything.
    if (debug) {
      this.unlockEverything();
    } else {
      // reveal the weapons the mecha ships with (the rest stay locked)
      for (const w of this.unlockedWeapons) this.hud.unlockWeapon(w);
      this.selectWeapon('saber');
    }

    this.hud.showStart(() => {
      sfx.ensure();
      sfx.startMusic('intro');
      // open on the story, then hand control over
      void this.hud.showCard(
        'PROLOGUE',
        'THE BAY SPLIT OPEN',
        'Fourteen hours ago something came through the water.<br/>' +
        'The defence line is gone. The shelters are full.<br/><br/>' +
        'You are the last Terra-Armor standing.'
      ).then(() => {
        sfx.setMusicMode('explore');
        this.started = true;
        if (!this.touch) this.renderer.domElement.requestPointerLock();
        this.hud.say(PROLOGUE);
        this.hud.setObjective('Hold Neo Tokyo');
        this.beginTutorial();
      });
    }, this.touch !== null, this.resumeOffer());

    this.renderer.setAnimationLoop(() => this.frame());
  }

  // ------------------------------------------------------------- checkpoints
  // The campaign is the better part of an hour. Losing it to a closed tab is
  // not something a player should ever have to find out about, so progress is
  // written at every chapter boundary and offered back on the start screen.

  private static readonly SAVE_KEY = 'mecha-city.progress.v1';

  private saveProgress(): void {
    if (this.campaignOver) { this.clearProgress(); return; }
    try {
      const data: SaveData = {
        v: 1,
        chapter: this.bossIndex,
        score: this.score,
        deaths: this.deaths,
        powerLevel: this.powerLevel,
        weapons: [...this.unlockedWeapons],
        abilities: { ...this.player.abilities },
      };
      localStorage.setItem(Game.SAVE_KEY, JSON.stringify(data));
    } catch {
      // private browsing or a full quota — progress is a courtesy, not a
      // requirement, so a failure here must never interrupt the run
    }
  }

  private loadProgress(): SaveData | null {
    try {
      const raw = localStorage.getItem(Game.SAVE_KEY);
      if (!raw) return null;
      const d = JSON.parse(raw) as SaveData;
      if (d?.v !== 1 || typeof d.chapter !== 'number') return null;
      if (d.chapter <= 0 || d.chapter >= CHAPTERS.length) return null;
      return d;
    } catch {
      return null;
    }
  }

  private clearProgress(): void {
    try { localStorage.removeItem(Game.SAVE_KEY); } catch { /* see above */ }
  }

  /** What the start screen should offer, if anything. */
  private resumeOffer(): { chapter: number; title: string; onResume: () => void } | undefined {
    const d = this.loadProgress();
    if (!d) return undefined;
    const ch = CHAPTERS[d.chapter];
    return {
      chapter: ch.no,
      title: ch.title,
      onResume: () => { sfx.ensure(); sfx.startMusic('explore'); this.resumeFrom(d); },
    };
  }

  /**
   * Pick the campaign back up. Deliberately not jumpToChapter: that is a debug
   * tool which unlocks everything, and a resumed run must give back exactly
   * what was actually earned and nothing more.
   */
  private resumeFrom(d: SaveData): void {
    this.hud.dismissStart();
    this.restart();
    this.started = true;
    this.bossIndex = d.chapter;
    this.latestFinishedChapter = d.chapter - 1;
    this.endTutorial(); // a resumed pilot is never taught
    this.wave = d.chapter;
    this.score = d.score;
    this.deaths = d.deaths;
    this.powerLevel = d.powerLevel ?? 1;
    // A resumed pilot needs a moment to read the HUD and reacquire controls;
    // do not drop the next contact on top of the deployment transition.
    this.bossTimer = 7;
    this.player.invulnT = 5;
    this.unlockedWeapons = new Set(d.weapons);
    this.player.abilities = { ...this.player.abilities, ...d.abilities };
    this.player.model.setCrimsonEdge(this.player.abilities.blades);
    this.player.model.setAegisArmor(this.player.abilities.shield);
    // Older checkpoints predate the separate dash flag; overdrive was already
    // the second-boss reward, so migrate those saves into the new ability.
    if (this.player.abilities.thrust) this.player.abilities.dash = true;
    for (const w of this.unlockedWeapons) {
      this.hud.unlockWeapon(w);
      this.touch?.unlockWeapon(w);
    }
    if (this.powerLevel > 1) this.hud.setPowerLevel(this.powerLevel);
    if (this.player.abilities.beam) this.hud.unlock('beam', '<b>E (hold)</b> PLASMA BEAM'); this.hud.setRangedSlot('PLASMA BEAM');
    if (this.player.abilities.thrust) this.hud.unlock('boots', '<b>SPACE</b> OVERDRIVE THRUSTERS');
    if (this.player.abilities.dash) { this.hud.unlockDash(); this.touch?.unlockDash(); }
    if (this.player.abilities.nova) this.hud.unlock('nova', this.novaLabel());
    if (this.player.abilities.blades) this.hud.unlock('blades', 'CRIMSON EDGE');
    if (this.player.abilities.quake) this.hud.unlock('nova', this.novaLabel());
    this.selectWeapon('saber');
    this.droneBase = Math.min(14, 4 + Math.floor(d.chapter * 0.75));
    this.drones.target = this.droneBase;
    this.deploySupportFromEarlierChapters(d.chapter);
    this.hud.setWave(d.chapter);
    this.hud.setScore(this.score, 1);
    if (!this.touch) this.renderer.domElement.requestPointerLock();
    const ch = CHAPTERS[d.chapter];
    this.hud.toast('RESUMING', `Chapter ${ch.no} · ${ch.title}`, 3.5);
    this.hud.setObjective('Reacquire systems — next contact inbound');
  }

  // ------------------------------------------------------------------ input

  private bindInput(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
      // a story card is modal: swallow input so dismissing it cannot also
      // jump, attack or switch weapons
      if (this.hud.cardOpen) return;
      this.keys.add(e.code);
      // Enter runs the radio on. It is not bound to anything in the fight, so
      // hurrying a conversation can never also make the mecha do something.
      if (e.code === 'Enter' || e.code === 'NumpadEnter') { this.hud.skipLine(); return; }
      if (e.code === 'KeyF') this.fireLaser();
      if (e.code === 'KeyQ') this.novaPulse();
      if (e.code === 'KeyC' && !e.repeat) this.dash();
      if ((e.code === 'KeyL' || e.code === 'Tab') && !e.repeat) { e.preventDefault(); this.toggleLockOn(); }
      // A: main attack — fires the selected weapon (hold to charge the rifle)
      if (e.code === 'KeyA' && !e.repeat) this.attackDown();
      if (e.code === 'KeyF' && !e.repeat) this.crimsonFinisher();
      // number keys pick a weapon directly
      // number keys 1..7 pick a weapon directly (locked ones are ignored)
      if (e.code.startsWith('Digit')) {
        const n = Number(e.code.slice(5)) - 1;
        if (n >= 0 && n < WEAPONS.length) this.selectWeapon(WEAPONS[n].id);
      }
      if (e.code === 'Escape' && this.started) this.setPaused(!this.paused);
      if (e.code === 'F3' && !e.repeat) { e.preventDefault(); this.hud.togglePerf(); }
      // R: begin charging (release fires); e.repeat guards the auto-repeat
      // E is the ranged slot. It holds the charged rifle until the Gorgosaur
      // falls, then the same key holds the plasma beam — one button that gets
      // better, rather than a second one appearing next to the first.
      if (e.code === 'KeyE' && !e.repeat && this.started && !this.player.abilities.beam) {
        this.charging = true;
        this.chargeT = 0;
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      if (e.code === 'KeyE' && this.charging) this.releaseCharge();
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
        this.camYaw -= e.movementX * 0.0026 * this.settings.sensitivity;
        this.camPitch = Math.max(-0.5, Math.min(1.2, this.camPitch + e.movementY * 0.0022 * this.settings.sensitivity));
      } else if (this.drag) {
        // drag-to-rotate works without pointer lock
        const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y;
        if (Math.abs(e.clientX - this.drag.sx) + Math.abs(e.clientY - this.drag.sy) > 5) this.drag.moved = true;
        this.camYaw -= dx * 0.005 * this.settings.sensitivity;
        this.camPitch = Math.max(-0.5, Math.min(1.2, this.camPitch + dy * 0.004 * this.settings.sensitivity));
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
      _v.y += this.monster.centerY;
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
    if (this.dashT > 0 || !this.started || !this.player.abilities.dash) return;
    this.dashT = DASH_DURATION;
    // A short invulnerability window makes the dash a deliberate defensive
    // verb. The reward is only granted if an attack actually intersects it.
    this.evadeT = 0.36;
    this.evadeRewarded = false;
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
    this.player.model.setDashThrusters(true);
    this.dashFxT = DASH_DURATION;
    this.dashCameraT = 0.3;
    this.shake = Math.max(this.shake, 0.18);
    this.explosions.boom(this.player.pos.clone().setY(this.player.pos.y + 3), 3);
    sfx.rocket(0.6); // whoosh
    this.rumble(150, 0.2, 0.38);
  }

  private swingSaber(): void {
    // Work out which link of the combo this is BEFORE starting the swing, so
    // the model can play the matching arc: descending diagonal, reverse
    // horizontal, then the committed vertical finisher.
    const chained = this.comboWindow > 0;
    const step = chained ? (this.comboStep + 1) % 3 : 0;
    if (!this.player.model.startSwing(step, chained)) return;
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
    const counter = this.counterWindow > 0;
    if (counter) {
      this.counterWindow = 0;
      this.hud.toast('REVERSAL', 'Perfect-evade counter · amplified strike', 1.5);
    }
    const aerial = !this.player.grounded && !this.player.onPlatform;
    const dashStrike = this.dashFxT > 0;
    sfx.swing();
    this.rumble(55, 0.08, 0.16);
    setTimeout(() => {
      const dir = this.aimDir();
      // 3rd hit is a heavier, wider finisher
      const finisher = step === 2;
      const arcs = finisher ? [-0.7, -0.35, 0, 0.35, 0.7] : [-0.45, 0, 0.45];
      const reach = (finisher ? 11 : 9) + (aerial ? 2 : 0) + (dashStrike ? 3 : 0);
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
      const technique = (counter ? 2.15 : 1) * (aerial ? 1.25 : 1) * (dashStrike ? 1.35 : 1);
      const dmg = (finisher ? 26 : 12 + step * 4) * this.power * blades * technique;
      if (this.hitMonster(pc, finisher ? 14 : 11, dmg, finisher ? 1.6 : 1.05) && finisher) {
        this.shake = Math.max(this.shake, 0.8);
      }
    }, 190);
  }

  /** Earned Crimson Edge technique: a committed charged overhead cleave. */
  private crimsonFinisher(): void {
    if (!this.started || !this.player.abilities.blades || this.crimsonCooldown > 0) return;
    if (!this.player.model.startSwing(2)) return;
    this.crimsonCooldown = 4.5;
    this.comboWindow = 0;
    this.hud.toast('CRIMSON BREAKER', 'Charged edge released', 1.25);
    sfx.swing();
    setTimeout(() => {
      if (!this.started) return;
      const dir = this.aimDir();
      const p = this.player.pos.clone().addScaledVector(dir, 14);
      p.y += 6;
      this.destroyAt(p, 7.5, 0.75);
      this.hitMonster(p, 16, 48 * this.power, 1.9, 'crimson-breaker');
      this.shake = Math.max(this.shake, 0.8);
      this.rumble(180, 0.45, 0.85);
    }, 220);
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

  /**
   * Advance to the next earned weapon, wrapping. With the radial wheel gone
   * this is the only way to change weapon on a phone (swipe up on ATTACK);
   * on a keyboard 1-6 still selects directly.
   */
  private cycleWeapon(): void {
    const owned = WEAPONS.filter((w) => this.unlockedWeapons.has(w.id));
    if (owned.length < 2) return;
    const at = owned.findIndex((w) => w.id === this.selectedWeapon);
    const next = owned[(at + 1) % owned.length];
    this.selectWeapon(next.id);
    this.hud.toast(next.label, 'Weapon equipped', 1.4);
  }

  selectWeapon(w: WeaponId): void {
    if (!this.unlockedWeapons.has(w)) return; // not earned yet
    this.selectedWeapon = w;
    this.hud.setWeapon(w, w === 'saber' && this.player.abilities.blades ? 'CRIMSON EDGE' : undefined);
    this.touch?.setWeapon(w);
  }

  // main attack pressed: melee fires at once; rifle starts charging;
  // flamer/aqua are held streams handled per-frame in updateStreams()
  private attackDown(): void {
    if (!this.started) return;
    const w = this.selectedWeapon;
    if (w === 'saber') this.swingSaber();
    else if (w === 'railgun') this.fireRailgun();
    else if (w === 'flamer' || w === 'aqua' || w === 'vulcan') this.attackHeld = true;
    else { this.charging = true; this.chargeT = 0; }
  }

  private attackUp(): void {
    this.attackHeld = false;
    if (this.selectedWeapon === 'rifle' && this.charging) this.releaseCharge();
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
  /** Chip text for the one AoE button, which the Golem's reward overcharges. */
  private novaLabel(): string {
    return this.player.abilities.quake
      ? '<b>Q</b> NOVA PULSE · OVERCHARGED'
      : '<b>Q</b> NOVA PULSE';
  }

  /**
   * The single area attack. The Volt Serpent grants the shockwave; the Magma
   * Golem's reward overcharges it, adding the outer ground rupture that used
   * to be a separate button on a separate key. Two near-identical AoE moves
   * cost the player a key and a HUD slot and gave them no new decision.
   */
  private novaPulse(): void {
    if (!this.player.abilities.nova || this.novaCooldown > 0 || !this.started) return;
    const heavy = this.player.abilities.quake;
    this.novaCooldown = heavy ? 7 : 6;
    const c = this.player.pos.clone();
    c.y += 4;
    this.explosions.boom(c, heavy ? 16 : 14);
    sfx.explode(1, 1);
    this.shake = Math.max(this.shake, heavy ? 1.1 : 0.6);
    const rings: [number, number][] = heavy
      ? [[10, 8], [19, 14]]   // overcharged: the shockwave plus a ruptured street
      : [[10, 8]];
    for (const [radius, count] of rings) {
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const p = c.clone();
        p.x += Math.sin(a) * radius;
        p.z += Math.cos(a) * radius;
        // the outer rupture follows the street surface; the inner ring is airborne
        if (radius > 12) p.y = this.world.groundHeight(p.x, p.z, 40) + 1;
        this.destroyAt(p, radius > 12 ? 5 : 4.5, radius > 12 ? 0.4 : 0.3);
      }
    }
    if (this.monster && !this.monster.dying) {
      const d = this.monster.group.position.distanceTo(this.player.pos);
      const reach = heavy ? 40 : 34;
      const dmg = (heavy ? 75 : 45) * this.power * PLAYER_ATTACK_DAMAGE * PLAYER_BOSS_DAMAGE;
      if (d < reach) this.monster.takeDamage(dmg, 'nova');
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
    // Before the beam is earned the same input charges the rifle, on the pad
    // as well as the keyboard.
    if (!this.player.abilities.beam && this.started) {
      const held = this.touch?.beam === true;
      if (held && !this.charging) { this.charging = true; this.chargeT = 0; }
      else if (!held && this.charging && this.touch) this.releaseCharge();
    }
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
      this.hitMonsterRay(from, dir, dist + 8, 6 * this.power, 'beam');
    }
  }

  // Every sphere-shaped hit funnels through here, so wiring the swarm in once
  // means all weapons damage drones without touching each weapon.
  /**
   * `src` names what dealt the damage. The Revenant learns whatever you lean
   * on, so it has to be able to tell a saber from a railgun. Equipped
   * weapons default to the current selection; abilities pass their own tag.
   */
  private hitMonster(
    p: THREE.Vector3, radius: number, dmg: number,
    impactScale = 0.7, src?: string, damageScale = PLAYER_ATTACK_DAMAGE,
  ): boolean {
    let hit = false;
    const scaledDamage = dmg * damageScale;
    const playerOwned = damageScale === PLAYER_ATTACK_DAMAGE;
    this.killDrones(this.drones.damageSphere(p, radius, scaledDamage));
    this.notePlanesDowned(this.planes.damageSphere(p, radius, scaledDamage));
    const m = this.monster;
    if (m && !m.dying) {
      _v.copy(m.group.position);
      _v.y += m.centerY;
      if (_v.distanceTo(p) < radius + m.hitRadius) {
        const bonus = this.weakPointBonus(p);
        if (bonus > 1) this.bark('weakPoint');
        // catching it mid-recovery is the big payoff, so the feedback for it
        // has to be louder than an ordinary weak-point hit
        const open = m.vulnerable;
        const dealt = m.takeDamage(scaledDamage * bonus * PLAYER_BOSS_DAMAGE, src ?? this.selectedWeapon);
        const big = bonus > 1 || open;
        const sparkAway = p.clone().sub(_v);
        this.debris.sparks(p, sparkAway, big ? 18 : 9, big || dealt >= 14);
        if (this.monsterSmokeT <= 0 && (big || dealt >= 10)) {
          this.monsterSmokeT = big ? 0.22 : 0.42;
          this.explosions.smokePuff(p.clone().addScaledVector(sparkAway.normalize(), 0.8), big ? 2.6 : 1.7, big ? 3 : 2, true);
        }
        const strength = Math.min(1.9, Math.max(0.25, dealt / 28) * impactScale);
        if (playerOwned) {
          this.hitStop = Math.max(this.hitStop, 0.012 + strength * 0.03 + (big ? 0.018 : 0) + (open ? 0.022 : 0));
          this.shake = Math.max(this.shake, 0.18 + strength * 0.34);
          this.impactZoom = Math.max(this.impactZoom, strength + (big ? 0.35 : 0));
          this.hud.impactFeedback(big, strength);
          // shove the camera along the line of the blow, into the target
          this.addKick(p.clone().sub(this.player.pos), strength * (open ? 2.6 : 1.7));
          sfx.impact(strength, big);
          this.rumble(big ? 135 : 80, Math.min(1, 0.22 + strength * 0.25), Math.min(1, 0.35 + strength * 0.38));
          this.addScore(Math.round(dealt * 2), true);
          this.hud.popDamage(dealt, open);
        }
        // Support impacts remain visible in-world without stealing the
        // player's camera, controller rumble, damage numbers or combo credit.
        this.debris.burst(p, [15], playerOwned ? (open ? 12 : 6) : 3);
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

  private hitMonsterRay(from: THREE.Vector3, dir: THREE.Vector3, maxDist: number, dmg: number, src?: string): void {
    const scaledDamage = dmg * PLAYER_ATTACK_DAMAGE;
    this.killDrones(this.drones.damageRay(from, dir, maxDist, scaledDamage));
    this.notePlanesDowned(this.planes.damageRay(from, dir, maxDist, scaledDamage));
    const m = this.monster;
    if (!m || m.dying) return;
    _v.copy(m.group.position);
    _v.y += m.centerY;
    const toM = _v.clone().sub(from);
    const along = toM.dot(dir);
    if (along < 0 || along > maxDist) return;
    const perp = toM.sub(dir.clone().multiplyScalar(along)).length();
    if (perp < m.hitRadius) {
      const open = m.vulnerable;
      const dealt = m.takeDamage(scaledDamage * PLAYER_BOSS_DAMAGE, src ?? this.selectedWeapon);
      const hitAt = from.clone().addScaledVector(dir, along);
      this.debris.sparks(hitAt, dir.clone().negate(), open ? 14 : 6, open || dealt >= 10);
      if (this.monsterSmokeT <= 0 && (open || dealt >= 10)) {
        this.monsterSmokeT = open ? 0.22 : 0.5;
        this.explosions.smokePuff(hitAt, open ? 2.4 : 1.5, open ? 3 : 1, true);
      }
      this.addScore(Math.round(dealt * 2), true);
      this.hud.popDamage(dealt, open);
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

  private destroyAt(p: THREE.Vector3, r: number, shake: number, credit = true): void {
    const res = this.world.destroySphere(p.x, p.y, p.z, r);
    if (res.count > 0) {
      // Collateral the boss causes is not the player's work, so it pays
      // nothing — otherwise standing still while a kaiju flattens a ward
      // would be a scoring strategy.
      if (credit) {
        this.score += res.count; // raw points for rubble, no combo bump
        this.hud.setScore(this.score, this.combo);
      }
      if (shake > 0.25) this.shake = Math.max(this.shake, Math.min(1.4, shake));
      this.chunks.markDirty(res.dirty);
      this.repair.noteDamage(res.dirty, this.time);
      this.blocksWrecked += res.count;
      if (credit) this.tutWrecked += res.count;
      // wrecking a block turns it into people who need somewhere to go
      if (res.count > 12) {
        this.evacuees.displace(
          p, res.count / 26,
          this.shelters.targets,
          this.world,
        );
      }
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
      if (f.blockCount > 260) {
        // Large structures do not disappear in a single clean pop: side bays
        // fail a beat apart, leaving smoke and occasional fires in the rubble.
        const left = at.clone().add(new THREE.Vector3(-4, 1.5, 2));
        const right = at.clone().add(new THREE.Vector3(4, 2.5, -2));
        this.explosions.boom(left, 5);
        this.explosions.boom(right, 4);
        this.explosions.smokePuff(at.clone().setY(at.y + 4), 8, 10, true);
        if (f.blockCount > 700) this.fire.igniteSphere(this.world, at.x, at.y, at.z, 4);
      }
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

  /** Keep Hinata alongside and let her put fire on whatever is closest. */
  private updateAlly(dt: number): void {
    if (!this.ally.active) return;
    // pick the nearest hostile: the boss if it is close, else a drone
    let target: THREE.Vector3 | null = null;
    let best = 190;
    if (this.monster && !this.monster.dying) {
      const d = this.monster.group.position.distanceTo(this.ally.group.position);
      if (d < best) { best = d; target = this.monster.group.position.clone().setY(this.monster.group.position.y + 14); }
    }
    for (const d of this.drones.group.children) {
      const dist = d.position.distanceTo(this.ally.group.position);
      if (dist < best) { best = dist; target = d.position.clone(); }
    }
    this.ally.update(dt, this.time, {
      world: this.world,
      playerPos: this.player.pos,
      target,
      fire: (from, toward) => this.allyShot(from, toward),
    });
  }

  /** Kotetsu trundling along behind, missing a lot. */
  private updateTank(dt: number): void {
    if (!this.tank.active) return;
    let target: THREE.Vector3 | null = null;
    let best = 230;
    if (this.monster && !this.monster.dying) {
      const d = this.monster.group.position.distanceTo(this.tank.group.position);
      if (d < best) { best = d; target = this.monster.group.position.clone().setY(this.monster.group.position.y + 14); }
    }
    for (const d of this.drones.group.children) {
      const dist = d.position.distanceTo(this.tank.group.position);
      if (dist < best) { best = dist; target = d.position.clone(); }
    }
    this.tank.update(dt, this.time, {
      world: this.world,
      playerPos: this.player.pos,
      target,
      fire: (from, toward) => this.tankShell(from, toward),
    });
  }

  /** Drop support units only after their chapter introduction has concluded. */
  private updateSupportArrivals(): void {
    if (!this.supportArrivalArmed || this.hud.busy || this.hud.cardOpen) return;
    const chapter = this.supportArrivalChapter;
    const deployed: string[] = [];
    if (chapter >= HINATA_CHAPTER && !this.ally.active) {
      const at = this.player.pos.clone();
      at.x -= 14;
      at.z += 10;
      at.y = this.world.groundHeight(at.x, at.z, 60);
      this.ally.deploy(at);
      deployed.push('TSUBAKI');
    }
    if (chapter >= KOTETSU_CHAPTER && !this.tank.active) {
      const at = this.player.pos.clone();
      at.x += 22;
      at.z += 18;
      at.y = this.world.groundHeight(at.x, at.z, 60);
      this.tank.deploy(at);
      deployed.push('KUROGANE');
    }
    if (chapter >= JOTETSU_CHAPTER && !this.digger.active) {
      const shelter = this.shelters.weakest;
      const at = shelter.pos.clone();
      at.x += 12;
      at.z += 10;
      at.y = this.world.groundHeight(at.x, at.z, 60);
      this.digger.deploy(at);
      deployed.push('DIGGER');
    }
    this.supportArrivalArmed = false;
    this.supportArrivalChapter = -1;
    if (deployed.length) this.hud.toast('SUPPORT DEPLOYED', `${deployed.join(' · ')} now operating in Neo Tokyo`, 4);
  }

  /**
   * A shell from KUROGANE. Heavy, slow, and thrown off aim on purpose —
   * Kotetsu is a mechanic who was handed a gun, and the misses are half the
   * reason Aya spends the campaign shouting.
   */
  private tankShell(from: THREE.Vector3, toward: THREE.Vector3): void {
    const dir = toward.clone().sub(from).normalize();
    // scatter the shot: he really cannot shoot
    const a = (Math.random() - 0.5) * this.tank.spread * 2;
    const b = (Math.random() - 0.5) * this.tank.spread;
    const cos = Math.cos(a), sin = Math.sin(a);
    dir.set(dir.x * cos - dir.z * sin, dir.y + b, dir.x * sin + dir.z * cos).normalize();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.7, 2.0),
      new THREE.MeshBasicMaterial({ color: 0xffe08a })
    );
    mesh.position.copy(from);
    mesh.lookAt(from.clone().add(dir));
    this.scene.add(mesh);
    this.projectiles.push({
      pos: from.clone(), vel: dir.multiplyScalar(54), life: 4,
      kind: 'shell', mesh, dmg: 36,
    });
    sfx.explode(0.45, 1 - Math.min(1, from.distanceTo(this.player.pos) / 140));
    // he knows. everyone knows.
    if (Math.random() < 0.3) this.sayKotetsu('missed');
  }

  /** One of Kotetsu's lines, cycled so they do not repeat. */
  private sayKotetsu(key: string): void {
    if (!this.started || this.hud.busy || this.hud.cardOpen || this.barkT > 0) return;
    const pool = KOTETSU_BARKS[key];
    if (!pool || pool.length === 0) return;
    const at = this.kotetsuCursor.get(key) ?? 0;
    this.kotetsuCursor.set(key, (at + 1) % pool.length);
    this.barkT = 14;
    this.hud.say([pool[at]]);
  }

  private sayJotetsu(key: string): void {
    if (!this.digger.active || !this.started || this.hud.busy || this.hud.cardOpen || this.barkT > 0) return;
    const pool = JOTETSU_BARKS[key];
    if (!pool || pool.length === 0) return;
    const at = this.jotetsuCursor.get(key) ?? 0;
    this.jotetsuCursor.set(key, (at + 1) % pool.length);
    this.barkT = 15;
    this.hud.say([pool[at]]);
  }

  /** A shell from TSUBAKI's shoulder cannon — hers, not the player's. */
  private allyShot(from: THREE.Vector3, toward: THREE.Vector3): void {
    const dir = toward.clone().sub(from).normalize();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.4, 1.5),
      new THREE.MeshBasicMaterial({ color: 0xffc46a })
    );
    mesh.position.copy(from);
    mesh.lookAt(toward);
    this.scene.add(mesh);
    this.projectiles.push({
      pos: from.clone(), vel: dir.multiplyScalar(78), life: 2.4,
      kind: 'ally', mesh, dmg: 7,
    });
    sfx.laser();
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
    const contacts: { dx: number; dz: number; kind: RadarKind }[] = [];

    if (this.monster && !this.monster.dying) {
      const m = this.monster.group.position;
      const r = rot(m.x - this.player.pos.x, m.z - this.player.pos.z);
      contacts.push({ ...r, kind: 'boss' });
    }
    for (const d of this.drones.group.children) {
      const r = rot(d.position.x - this.player.pos.x, d.position.z - this.player.pos.z);
      if (Math.hypot(r.dx, r.dz) < RANGE * 1.4) contacts.push({ ...r, kind: 'drone' });
    }
    // only wards still in the run — Act II retires the outlying ones, and a
    // blip for a ward that cannot be lost sends the player to defend nothing
    for (const s of this.shelters.active) {
      const r = rot(s.pos.x - this.player.pos.x, s.pos.z - this.player.pos.z);
      contacts.push({ ...r, kind: s.underAttack ? 'shelterHit' : 'shelter' });
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
    _v.set(m.x, m.y + this.monster.centerY, m.z);
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
    // A cleared chapter is the checkpoint. Written here, after the reward has
    // been granted, so a resumed run gets back the weapon it just earned.
    this.saveProgress();
    const earned = Math.max(0, this.score - this.chapterStartScore);
    const chapterDeaths = Math.max(0, this.deaths - this.chapterStartDeaths);
    const cityDamage = Math.max(0, this.blocksWrecked - this.chapterStartDamage);
    const integrity = Math.round(this.player.hp / this.player.maxHp * 100);
    const grade = chapterDeaths === 0 && integrity >= 75 && cityDamage < 180 ? 'S'
      : chapterDeaths === 0 && integrity >= 45 && cityDamage < 350 ? 'A'
      : chapterDeaths <= 1 ? 'B' : 'C';
    setTimeout(() => {
      if (this.hud.cardOpen) return;
      void this.hud.showCard(
        `CHAPTER ${ch.no} COMPLETE`, `COMBAT RANK · ${grade}`,
        `Score earned: <b>${earned.toLocaleString()}</b><br/>` +
        `Terra-Armor integrity: <b>${integrity}%</b><br/>` +
        `City blocks damaged: <b>${cityDamage}</b><br/>` +
        `Redeployments: <b>${chapterDeaths}</b>`
      );
    }, 1000);
    this.hud.say(ch.debrief);
    // The lull after a kill is the natural place for them to talk, so drip a
    // backstory scene here too rather than relying on the player idling.
    // Once KOTETSU has joined, her scenes get folded into the drip so the
    // later half of the story is about the three of them, not two.
    if (this.ally.active && this.lateMemoryIdx < LATE_MEMORIES.length && (done % 2 === 1)) {
      this.hud.say(LATE_MEMORIES[this.lateMemoryIdx++]);
      this.idleChatterT = 60;
    } else if (this.memoryIdx < MEMORIES.length) {
      this.hud.say(MEMORIES[this.memoryIdx++]);
      this.idleChatterT = 60; // don't stack idle chatter straight after
    }
    // End of Act I. The tear is sealed and the city is standing, but the seam
    // is still there — which is what sends them out to it.
    if (done === ACT2_START - 1) {
      this.hud.setObjective('The rift is sealed — hold the line');
      setTimeout(() => {
        void this.hud.showCard(
          'EPILOGUE',
          'NEO TOKYO STANDS',
          'The bay is quiet for the first time in weeks.<br/>' +
          'The rift is closed — but the seam it tore is still there,<br/>' +
          'and the fractures are spreading.<br/><br/>' +
          '<b>Sealing it from this side has stopped working.</b>'
        ).then(() => this.hud.say(EPILOGUE));
      }, 7000);
    }
    // End of Act II. This time it is actually over.
    if (done === CHAPTERS.length - 1 && !this.campaignOver) {
      this.campaignOver = true;
      this.hud.setObjective('The seam is gone — nothing left to hold');
      setTimeout(() => {
        void this.hud.showCard(
          'EPILOGUE',
          'THE SHELTERS ARE CLEAR',
          'The seam is gone. Not sealed — gone.<br/>' +
          'Rei closed it from the inside, three years late,<br/>' +
          'and she asked about the shelters first.<br/><br/>' +
          '<b>Endless deployment begins now.</b>'
        ).then(() => this.hud.say(RIFT_EPILOGUE));
      }, 9000);
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
    // Walk each pool in order rather than sampling, so a player never hears
    // the same line twice in a row out of a pool this large — and step over
    // anything said by a pilot who has not arrived yet. Hinata, Kotetsu and
    // Jotetsu have lines scattered through the general pools, and without
    // this Hinata cheerfully banters through Chapter 1, an hour before she
    // is introduced.
    let at = this.barkCursor.get(key) ?? Math.floor(Math.random() * pool.length);
    let line: Line | null = null;
    for (let i = 0; i < pool.length; i++) {
      const cand = pool[(at + i) % pool.length];
      if (this.hasJoined(cand.who)) { line = cand; at = (at + i + 1) % pool.length; break; }
    }
    if (!line) return; // nobody on this channel yet has anything to say
    this.barkCursor.set(key, at);
    this.barkT = urgent ? 9 : 16;
    this.lastBark = key;
    this.idleChatterT = 34;
    this.hud.say([line]);
  }

  /**
   * Whether a speaker is actually in the field yet. Support pilots are only
   * on comms once their frame has physically deployed, so a line of theirs
   * can never surface before their introduction.
   */
  private hasJoined(who: string): boolean {
    if (who.includes('HINATA')) return this.ally.active;
    if (who.includes('KOTETSU')) return this.tank.active;
    if (who.includes('JOTETSU')) return this.digger.active;
    return true; // Aya, Kurosawa, Kuroki and the archive are always available
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
    this.supportCallT -= dt;

    const hpFrac = this.player.hp / this.player.maxHp;
    if (hpFrac > 0 && hpFrac < 0.28) this.bark('lowHealth');
    if (this.combo >= 5) this.bark('bigCombo');
    if (this.ally.active) {
      if (hpFrac > 0 && hpFrac < 0.3) this.bark('hinataWorried');
      else if (this.drones.count > 0 && Math.random() < 0.02) this.bark('hinataBanter');
    }
    if (this.drones.count >= 6) this.bark('droneSwarm');

    if (this.monster && !this.monster.dying) {
      if (this.monster.hp / this.monster.maxHp < 0.2) this.bark('bossHurt');
      const d = this.monster.group.position.distanceTo(this.player.pos);
      if (d > 320) this.bark('bossFar');
      if (this.monster.vulnerable && this.supportCallT <= 0 && !this.hud.busy) {
        this.supportCallT = 18;
        if (this.ally.active) {
          this.hud.say([{ who: 'HINATA · PILOT', text: 'Core is open! I have your flank — go, senpai!' }]);
        } else if (this.tank.active) {
          this.hud.say([{ who: 'KOTETSU · SUPPORT', text: 'It stopped moving! Even I can hit that — probably!' }]);
        }
      }

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
    if (this.blocksWrecked > 700 && this.blocksWrecked <= 2600) {
      if (this.digger.active) this.sayJotetsu('damage');
      else this.bark('cityDamage');
    }
    if (this.blocksWrecked > 2600) {
      this.blocksWrecked = 0;
      if (this.digger.active) this.sayJotetsu('damage');
      else this.bark('heavyDestruction');
    }

    // Quiet stretch: use it to let their history out, a fragment at a time.
    // Only once the fighting has actually stopped, so it never lands mid-brawl.
    if (this.idleChatterT <= 0 && !this.monster && this.drones.count === 0) {
      this.idleChatterT = 45;
      // Most AYA_HINATA scenes are just the two of them, but one has a
      // Kotetsu line — and he joins a full chapter after she does, so a scene
      // is only eligible once everyone speaking in it has actually arrived.
      const nextScene = this.ayaHinataIdx < AYA_HINATA.length ? AYA_HINATA[this.ayaHinataIdx] : null;
      const sceneReady = !!nextScene && nextScene.every((l) => this.hasJoined(l.who));
      if (this.ally.active && sceneReady
          && this.memoryIdx % 2 === 1 && !this.hud.busy && !this.hud.cardOpen) {
        this.hud.say(AYA_HINATA[this.ayaHinataIdx++]);
        this.barkT = 20;
      } else if (this.memoryIdx < MEMORIES.length && !this.hud.busy && !this.hud.cardOpen) {
        this.hud.say(MEMORIES[this.memoryIdx++]);
        this.barkT = 20; // give the scene room to breathe
      } else {
        this.bark('idle');
      }
    }
  }

  /** Aya calls it out the moment something settles on a ward. */
  private warnShelters(): void {
    const hit = this.shelters.anyUnderAttack;
    if (hit) {
      this.hud.setObjective('DEFEND ' + hit.name + ' — ' + Math.round(hit.hp) + '%');
      this.bark(hit.hp < 40 ? 'shelterCritical' : 'shelterAttacked', hit.hp < 40);
      return;
    }
    // otherwise keep an eye on how full the wards are getting
    const full = this.shelters.fullest;
    const load = full.people / full.capacity;
    if (load > 0.6) {
      this.hud.setObjective(
        full.name + ' — ' + Math.round(full.people) + '/' + Math.round(full.capacity) + ' SHELTERED'
      );
      if (load > 0.8) this.bark('shelterFilling', load > 0.92);
    }
  }

  /** A ward is lost — either flattened or swamped. Either way the run ends. */
  private endRun(s: Shelter, cause: 'destroyed' | 'overfull'): void {
    this.gameOver = true;
    // Losing a ward outright is meant to be final — back to chapter one. The
    // checkpoint has to go with it, or reloading the page would quietly hand
    // the run back and make the loss meaningless.
    this.clearProgress();
    this.slowmo = 1.6;
    this.shake = 1.6;
    sfx.explode(1, 1);
    // drop whatever was queued — nothing matters now except this
    this.hud.clearComms();
    this.hud.say(cause === 'destroyed' ? BARKS.shelterLost : BARKS.shelterOverfull);
    const stats = `Score <b>${this.score.toLocaleString()}</b> · Wave <b>${this.wave}</b>`;
    void this.hud.showGameOver(
      cause === 'destroyed' ? 'THE LINE BROKE' : 'NO ROOM LEFT',
      cause === 'destroyed' ? s.name + ' IS GONE' : s.name + ' IS OVERWHELMED',
      cause === 'destroyed'
        ? `The shelter could not hold.<br/><br/>${stats}<br/><br/>Neo Tokyo needed you somewhere else.`
        : `Too many people, too little city left standing.<br/>` +
          `They had nowhere to put them.<br/><br/>${stats}`
    ).then(() => this.restart());
  }

  /** A full shelter rewinds to the most recently completed chapter checkpoint. */
  private retryLatestFinishedChapter(s: Shelter): void {
    // Preserve everything earned at the checkpoint. restart() restores the
    // damaged city but intentionally resets progression for a genuinely new
    // run, so checkpoint state is captured and reapplied around that reset.
    const finished = this.latestFinishedChapter;
    const chapter = Math.max(0, finished);
    const abilities = { ...this.player.abilities };
    const weapons = new Set(this.unlockedWeapons);
    const selectedWeapon = this.selectedWeapon;
    const powerLevel = this.powerLevel;
    const power = this.power;
    const memoryIdx = this.memoryIdx;
    const lateMemoryIdx = this.lateMemoryIdx;
    const ayaHinataIdx = this.ayaHinataIdx;
    const kotetsuCursor = new Map(this.kotetsuCursor);

    this.restart();
    this.latestFinishedChapter = finished;
    this.bossIndex = chapter;
    this.bossTimer = 2;
    this.wave = chapter;
    this.player.abilities = abilities;
    this.player.model.setCrimsonEdge(abilities.blades);
    this.player.model.setAegisArmor(abilities.shield);
    this.unlockedWeapons = weapons;
    this.powerLevel = powerLevel;
    this.power = power;
    this.memoryIdx = memoryIdx;
    this.lateMemoryIdx = lateMemoryIdx;
    this.ayaHinataIdx = ayaHinataIdx;
    this.kotetsuCursor = kotetsuCursor;

    // Restore the checkpoint loadout in both the model and the HUD without
    // replaying reward toasts.
    if (abilities.beam) this.hud.unlock('beam', '<b>E (hold)</b> PLASMA BEAM'); this.hud.setRangedSlot('PLASMA BEAM');
    if (abilities.thrust) this.hud.unlock('boots', '<b>SPACE</b> OVERDRIVE THRUSTERS');
    if (abilities.dash) { this.hud.unlockDash(); this.touch?.unlockDash(); }
    if (abilities.nova) this.hud.unlock('nova', this.novaLabel());
    if (abilities.quake) this.hud.unlock('nova', this.novaLabel());
    if (abilities.blades) this.hud.unlock('blades', 'CRIMSON EDGE');
    for (const weapon of weapons) {
      this.hud.unlockWeapon(weapon);
      this.touch?.unlockWeapon(weapon);
    }
    if (powerLevel > 1) this.hud.setPowerLevel(powerLevel);
    this.selectWeapon(weapons.has(selectedWeapon) ? selectedWeapon : 'saber');

    this.hud.setWave(this.wave);
    this.hud.setObjective(`RETRY CHAPTER ${chapter + 1} — EVACUATE ${s.name}`);
    this.hud.toast('SHELTER OVERFLOW', `Returning to Chapter ${chapter + 1}`, 3.5);
  }

  // ------------------------------------------------------------ pause / run

  private jumpToChapter(chapter: number): void {
    this.endTutorial();
    const index = Math.max(0, Math.min(CHAPTERS.length - 1, Math.floor(chapter)));
    this.hud.dismissStart();
    this.started = true;
    sfx.ensure();
    sfx.startMusic('explore');
    this.restart();
    // Give the loadout that chapter would actually have — the rewards of every
    // boss before it — rather than the whole kit. Jumping to chapter 4 to test
    // chapter 4 is useless if it hands you tools you would not have yet.
    const ORDER: Reward[] = [
      'beam', 'thrust', 'nova', 'shield', 'railgun',
      'blades', 'quake', 'vulcan', 'flamer', 'aqua',
    ];
    this.hud.suppressToasts = true;
    for (let i = 0; i < Math.min(index, ORDER.length); i++) this.grantReward(ORDER[i]);
    this.hud.suppressToasts = false;
    this.bossIndex = index;
    this.latestFinishedChapter = index - 1;
    this.wave = index;
    this.bossTimer = 0.2;
    this.droneBase = Math.min(14, 4 + Math.floor(index * 0.75));
    this.drones.target = this.droneBase;
    this.deploySupportFromEarlierChapters(index);
    this.hud.setWave(index);
    this.hud.setObjective(`DEBUG · Preparing Chapter ${index + 1}`);
    this.hud.toast('DEBUG CHAPTER JUMP', `Loading Chapter ${index + 1} · ${CHAPTERS[index].title}`, 2.5);
  }

  private deploySupportFromEarlierChapters(chapter: number): void {
    const deploy = (unit: Ally | Tank | Digger, x: number, z: number): void => {
      const at = this.player.pos.clone();
      at.x += x;
      at.z += z;
      at.y = this.world.groundHeight(at.x, at.z, 60);
      unit.deploy(at);
    };
    if (chapter > HINATA_CHAPTER) deploy(this.ally, -14, 10);
    if (chapter > KOTETSU_CHAPTER) deploy(this.tank, 22, 18);
    if (chapter > JOTETSU_CHAPTER) deploy(this.digger, 30, -16);
  }

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
    this.latestFinishedChapter = -1;
    this.bossTimer = 14;
    this.powerLevel = 1;
    this.power = 1;
    this.droneBase = 4;
    this.drones.target = this.droneBase;
    this.warnedContact = false;
    this.lastSpawnFar = false;
    this.notedReiPattern = false;
    this.revenantBeats.clear();
    this.unlockedWeapons = new Set<WeaponId>(['saber', 'rifle']);
    this.player.abilities = {
      beam: false, boots: true, thrust: false, dash: false, nova: false,
      shield: false, blades: false, quake: false,
    };
    this.player.model.setCrimsonEdge(false);
    this.player.model.setAegisArmor(false);
    this.player.respawn();
    this.ridingPlane = null;
    this.slowmo = 0;
    this.hitStop = 0;
    this.impactZoom = 0;
    this.dashCameraT = 0;
    this.dashT = 0;
    this.dashFxT = 0;
    this.player.model.setDashThrusters(false);
    this.defenseWing.reset();
    this.defenseWingAnnounced = false;
    this.defenseLossCursor = 0;
    this.evadeT = 0;
    this.evadeRewarded = false;
    this.counterWindow = 0;
    this.crimsonCooldown = 0;
    this.redeploying = false;
    this.kick.set(0, 0, 0);
    this.camRoll = 0;
    this.rollTarget = 0;
    this.bossIntroT = 0;
    this.shake = 0;
    this.cameraReady = false;

    this.barkT = 0;
    this.lastBark = '';
    this.barkCursor.clear();
    this.blocksWrecked = 0;
    this.monsterBarkFor = '';
    this.memoryIdx = 0;
    this.lateMemoryIdx = 0;
    this.ayaHinataIdx = 0;
    this.kotetsuCursor.clear();
    this.jotetsuCursor.clear();
    this.diggerChatterT = 32;
    this.ally.retire();
    this.tank.retire();
    this.digger.retire();
    this.supportArrivalChapter = -1;
    this.supportArrivalArmed = false;
    this.diggerWorkTarget = null;
    this.shelters.reset();
    this.evacuees.reset();
    this.gameOver = false;
    this.hud.closeCard();
    this.hud.clearComms();
    this.campaignOver = false;
    this.hud.resetUnlocks();
    this.hud.setRangedSlot('RIFLE');
    this.hud.setScore(0, 1);
    this.hud.setWave(0);
    this.hud.setObjective('Explore Neo Tokyo — something big is coming');
    this.selectWeapon('saber');
    this.beginTutorial();
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
    return _v.distanceTo(p) < 8 ? 2.1 : 1;
  }

  /**
   * A boss changing gear is a beat, not a stat change. It roars, the ground
   * shakes, the world slows for a moment, and the shockwave shoves the player
   * back — so the shift is felt before the health bar is read.
   */
  private announcePhase(phase: Phase): void {
    const m = this.monster;
    if (!m) return;
    m.phaseAnnounce = 0;
    if (phase === 1) return; // never announced: it is where every fight starts
    this.slowmo = phase === 3 ? 0.55 : 0.35;
    this.shake = phase === 3 ? 1.25 : 0.85;
    this.hitStop = Math.max(this.hitStop, 0.06);
    // TA-00 gets its own beat instead of the generic kaiju gear-change lines
    if (m instanceof Revenant) {
      sfx.phaseStinger(phase === 3);
      this.revenantBeat(phase);
      this.hud.toast(
        phase === 3 ? 'IT HAS WORKED IT OUT' : 'IT IS REMEMBERING',
        phase === 3
          ? 'TA-00 has stopped defending itself entirely.'
          : 'TA-00 is comparing what it sees against what it remembers.',
        3.5,
      );
      return;
    }
    sfx.explode(0.8, 1);
    sfx.phaseStinger(phase === 3);
    const at = m.group.position.clone().setY(m.group.position.y + 14);
    this.explosions.boom(at, phase === 3 ? 13 : 9);
    // the roar throws the player clear rather than damaging them — this is a
    // punctuation mark, not an unavoidable hit
    const away = this.player.pos.clone().sub(m.group.position).setY(0);
    const d = away.length();
    if (d > 0.001 && d < 70) {
      this.player.knockback(away, 30 + (1 - d / 70) * 34, 9);
      this.addKick(away, 4);
    }
    this.hud.toast(
      phase === 3 ? '⚠ ENRAGED ⚠' : 'IT IS CHANGING',
      phase === 3
        ? `${m.name} has nothing left to lose — it is faster and it is not stopping.`
        : `${m.name} is taking this seriously now.`,
      3,
    );
    this.bark(phase === 3 ? 'bossEnrage' : 'bossPhase', phase === 3);
  }

  /**
   * The Revenant's gear changes are story beats, not just stat changes. It
   * works out what has happened to it mid-fight, while the player is still
   * swinging — that is the fight, not a cutscene after it. The line jumps the
   * queue because nothing being said is more important than this.
   */
  private revenantBeat(phase: Phase): void {
    const key = phase === 3 ? 'phase3' : 'phase2';
    if (this.revenantBeats.has(key)) return;
    this.revenantBeats.add(key);
    this.hud.clearComms();
    this.hud.say(REVENANT_BEATS[key]);
  }

  /**
   * The gap between contacts used to be blank time with no information in it.
   * Now it counts down in the objective line and the swarm thickens as it
   * runs out, so the quiet reads as a build rather than an absence.
   */
  private warnNextContact(): void {
    if (this.campaignOver || this.monster || this.gameOver) return;
    const left = Math.max(0, this.bossTimer);
    // hold back the drones early in the lull, then pile them on
    const lean = left > 7 ? 0.55 : left > 3 ? 0.85 : 1.15;
    this.drones.target = Math.max(2, Math.round(this.droneBase * lean));
    if (left > 10) return; // let the shelters warning own the line until then
    if (this.shelters.anyUnderAttack) return;
    this.hud.setObjective(
      left > 3
        ? `NEXT CONTACT IN ${Math.ceil(left)}s — hold the line`
        : 'CONTACT IMMINENT — brace'
    );
    if (left <= 5 && !this.warnedContact) {
      this.warnedContact = true;
      this.bark('incoming', true);
    }
  }

  /**
   * The adaptation has to be legible or it just reads as damage numbers
   * quietly shrinking for no reason. The objective line carries how well it
   * has learned the weapon in your hands, and Command calls out each one it
   * finishes learning.
   */
  private updateRevenant(r: Revenant): void {
    const learned = r.adaptionTo(this.selectedWeapon);
    if (r.adaptedTo) {
      const w = WEAPONS.find((x) => x.id === r.adaptedTo);
      this.hud.toast('IT HAS LEARNED THAT', `${w?.label ?? r.adaptedTo.toUpperCase()} is barely scratching it now — switch.`, 3.5);
      this.bark('revenantAdapt', true);
      r.adaptedTo = null;
    }
    if (!this.shelters.anyUnderAttack && learned > 0.3) {
      const pct = Math.round(learned * 100);
      this.hud.setObjective(
        learned > 0.85
          ? `IT HAS READ YOUR ${(WEAPONS.find((x) => x.id === this.selectedWeapon)?.label ?? 'WEAPON')} — SWITCH`
          : `ADAPTING TO YOUR LOADOUT — ${pct}%`
      );
    }
    // once it drops ranged entirely, Aya recognises what she is watching
    if (r.reiPattern && !this.notedReiPattern) {
      this.notedReiPattern = true;
      this.bark('reiPattern', true);
    }
  }

  /**
   * Push the line toward the rift. The staging shelter comes up behind the
   * new front — close enough that it is still yours to lose, far enough back
   * that the fight is not standing on it — and the first advance is what
   * empties the four city wards into it.
   */
  private advanceLine(adv: { frac: number; name: string }): THREE.Vector3 {
    const front = new THREE.Vector3(RIFT_SITE.x * adv.frac, 0, RIFT_SITE.z * adv.frac);
    front.y = this.world.groundHeight(front.x, front.z, 90);

    // shelter sits a little way back down the road you came in on
    const back = Math.max(0, adv.frac - 0.11);
    const site = new THREE.Vector3(RIFT_SITE.x * back, 0, RIFT_SITE.z * back);
    site.y = this.world.groundHeight(site.x, site.z, 90);
    // consolidate() is idempotent, so later chapters just move the shelter
    this.shelters.consolidate(site, adv.name);
    this.hud.toast('THE LINE HAS MOVED', `${adv.name} — the shelter is behind you`, 4);
    return front;
  }

  /**
   * A kaiju that stayed in the seam. Bigger, already in second gear so it
   * never has an opening phase, and drained toward the violet of the rift.
   */
  private corruptMonster(m: Monster, amount: number): void {
    m.maxHp = m.hp = Math.round(m.maxHp * (1.35 + amount * 0.6));
    m.phase = 2; // it is past the stage where it was measuring you
    m.group.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshLambertMaterial;
      // desaturate toward the seam rather than simply tinting purple, so the
      // silhouette still reads as the kaiju you already know
      mat.color.lerp(_riftTint, 0.3 + amount * 0.34);
    });
  }

  /** Campaign-wide endurance curve. Player weapon options and support units
   * grow every few chapters, so boss durability must grow with that toolkit.
   * The shallow early ramp preserves the tutorial; Act II becomes the test. */
  private tuneCampaignBoss(m: Monster, chapter: number): void {
    // Act-II enemies receive an additional corruption multiplier below, so
    // use a restrained second-act curve instead of accidentally stacking two
    // full ramps. Revenant is the exception and earns final-boss endurance.
    const hpScale = m instanceof Revenant
      ? 1.68
      : chapter >= ACT2_START
        ? 1.18 + (chapter - ACT2_START) * 0.025
        : 1.14 + chapter * 0.035;
    m.maxHp = m.hp = Math.round(m.maxHp * hpScale * this.diff.bossHp);
    // Story raises the floor the Revenant's adaptive resistance can drag a
    // weapon down to, so the fight stops being a knowledge check.
    if (m instanceof Revenant) m.resistFloor = this.settings.difficulty === 'story' ? 0.55 : 0;
  }

  // ---------------------------------------------------------------- tutorial

  /**
   * Chapter one teaches. The first kaiju is held until the pilot has walked,
   * cut something and left the ground, so nobody meets a thirty-metre boss
   * having never pressed jump. Skipped entirely on a resumed run — a returning
   * pilot does not need to be told what the legs do.
   */
  private beginTutorial(): void {
    // Chapter one only, and only at the top of it. A pilot resuming from a
    // checkpoint — or jumping chapters in a debug build — already knows what
    // the saber and the jets do, and being told again mid-campaign gates
    // their next boss behind a lesson they finished hours ago.
    if (this.bossIndex > 0 || this.wave > 0 || this.latestFinishedChapter >= 0) {
      this.endTutorial();
      return;
    }
    this.tutorial = new Tutorial();
    this.tutPainted = null;
    // an empty sky for the lesson; the swarm resumes with the boss timer
    this.drones.target = 0;
    this.tutWrecked = 0;
    this.clearTutorialMarker();
  }

  /** Stop teaching and hand the world back — safe to call when none is running. */
  private endTutorial(): void {
    if (!this.tutorial) return;
    this.tutorial = null;
    this.tutPainted = null;
    this.clearTutorialMarker();
    this.drones.target = this.droneBase;
  }

  private clearTutorialMarker(): void {
    if (!this.tutMarker) return;
    this.scene.remove(this.tutMarker);
    this.tutMarker.geometry.dispose();
    (this.tutMarker.material as THREE.Material).dispose();
    this.tutMarker = null;
  }

  /**
   * Stand a translucent column over the tallest thing near the pilot so the
   * "cut something" step points at an actual building instead of asking them
   * to guess which of a hundred is the condemned one.
   */
  private markCondemnedBuilding(): void {
    // Nearest modest building, not the tallest one in range. Picking by height
    // chose a skyscraper and put a column of light 78 units up, well above the
    // eyeline of a pilot standing on the street being told to go hit it.
    let best: { x: number; z: number; h: number; d: number } | null = null;
    for (let i = 0; i < 40; i++) {
      const a2 = (i / 40) * Math.PI * 2;
      for (const d of [26, 40, 56]) {
        const x = Math.round(this.player.pos.x + Math.sin(a2) * d);
        const z = Math.round(this.player.pos.z + Math.cos(a2) * d);
        const h = this.world.groundHeight(x, z);
        // low enough to cut down, tall enough to be worth pointing at
        if (h >= 8 && h <= 26 && (!best || d < best.d)) best = { x, z, h, d };
      }
    }
    if (!best) return;
    // The column stands ON the ground and clears the roof, so it reads as a
    // beam over that building from anywhere, including right next to it.
    const tall = best.h + 14;
    // Additive, so it reads as a shaft of light rather than a grey box, and
    // bright enough to survive a daylight city. At the old 0.05-0.17 alpha it
    // was invisible against pale concrete — the objective said "the marked
    // block" and nothing on screen was marked.
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(9, tall, 9),
      new THREE.MeshBasicMaterial({
        color: 0xffc44f, transparent: true, opacity: 0.34, depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    mesh.position.set(best.x + 0.5, tall / 2, best.z + 0.5);
    this.scene.add(mesh);
    this.tutMarker = mesh;
  }

  private updateTutorial(dt: number): void {
    const t = this.tutorial;
    if (!t) return;

    const deck = this.world.groundHeight(this.player.pos.x, this.player.pos.z);
    t.update(dt, {
      altitude: this.player.pos.y - deck,
      wrecked: this.tutWrecked,
    });

    if (t.justCleared) {
      this.hud.toast(t.justCleared[0], t.justCleared[1], 3);
      sfx.jingle();
    }
    if (t.pending && !this.hud.cardOpen) this.hud.say(t.pending);

    // Track what has actually been PAINTED rather than diffing against the
    // step before update(). The first step is already current before the very
    // first update runs, so a before/after comparison never fired for it —
    // step one got no objective line and no marker over its target building,
    // which is most of the tutorial's instruction.
    const step = t.step;
    if (step && step.id !== this.tutPainted) {
      this.tutPainted = step.id;
      this.hud.setObjective(step.objective);
      this.clearTutorialMarker();
      if (step.id === 'strike') this.markCondemnedBuilding();
    }
    if (this.tutMarker) {
      // slow pulse so it reads as a marker and not as scenery
      const m = this.tutMarker.material as THREE.MeshBasicMaterial;
      m.opacity = 0.34 + Math.sin(this.time * 2.4) * 0.12;
    }
    if (t.complete) {
      this.endTutorial();
      this.hud.setObjective('Hold the line — first contact inbound');
      // enough of a beat for the sign-off to land before the kaiju does
      this.bossTimer = Math.max(this.bossTimer, 8);
    }
  }

  // ------------------------------------------------------------ rift breach

  /**
   * Every so often during a lull the seam opens over the city and throws a
   * squad through it. It gives the rift a presence in the moment-to-moment
   * game rather than only on the horizon and in the story, and it means a
   * quiet stretch can be interrupted by something other than the next boss.
   */
  private breachTimer = 70 + Math.random() * 50;
  private breachMouth: THREE.Vector3 | null = null;
  private breachSpawns = 0;
  private breachDrip = 0;

  private updateBreach(dt: number): void {
    // never during a boss, the tutorial, a story card or after the campaign
    if (this.tutorial || this.campaignOver || this.gameOver || this.paused) return;

    if (this.breachMouth) {
      this.breachDrip -= dt;
      if (this.breachDrip <= 0 && this.breachSpawns > 0 && this.sky.tearOpen > 0.45) {
        this.breachDrip = 0.42;
        this.breachSpawns--;
        // they fall out of the mouth, scattered a little so it reads as a
        // swarm being expelled rather than a queue
        this.drones.spawnAt(
          this.breachMouth.x + (Math.random() - 0.5) * 14,
          this.breachMouth.y + (Math.random() - 0.5) * 10,
          this.breachMouth.z + (Math.random() - 0.5) * 14,
        );
        this.explosions.boom(this.breachMouth.clone(), 5);
        sfx.zap(0.5);
      }
      if (!this.sky.tearActive) this.breachMouth = null;
      return;
    }

    if (this.monster) return; // the boss owns the moment
    this.breachTimer -= dt;
    if (this.breachTimer > 0) return;
    this.breachTimer = 95 + Math.random() * 70;

    // open it a little way off, high, in front of where the player is looking
    const a = this.camYaw + Math.PI + (Math.random() - 0.5) * 1.4;
    const d = 70 + Math.random() * 50;
    const x = this.player.pos.x + Math.sin(a) * d;
    const z = this.player.pos.z + Math.cos(a) * d;
    const gy = this.world.groundHeight(x, z, 60);
    this.breachMouth = this.sky.openTear(x, z, gy);
    this.breachSpawns = 3 + Math.floor(Math.random() * 3);
    this.breachDrip = 1.1;
    this.shake = Math.max(this.shake, 0.5);
    sfx.explode(0.6, 0.8);
    this.hud.toast('SEAM BREACH', 'The tear opened over the ward — contacts coming through', 4);
    if (!this.hud.busy) {
      this.hud.say([{
        who: AYA,
        text: 'Kuroki, the seam just opened over you. Whatever comes out of that, it did not walk here.',
      }]);
    }
  }

  // ------------------------------------------------------------ boss cycle

  /**
   * A thirty-metre kaiju should not be walking through office blocks as if
   * they were fog. Every few metres of travel it shoulders a hole through
   * whatever its body occupies — so the fight leaves a visible trail across
   * the ward and the player can read where the thing has been.
   */
  private plowBoss(m: Monster): void {
    if (m.dying || m.dead) return;
    const p = m.group.position;
    const from = this.bossPlowFrom;
    if (from.x === 0 && from.z === 0 && from.y === 0) { from.copy(p); return; }
    const moved = Math.hypot(p.x - from.x, p.z - from.z);
    if (moved < 3) return;
    from.copy(p);
    // Carve at chest height with a body-sized radius. Flyers cruising above
    // the skyline simply find nothing to hit and cost a single empty query.
    const r = Math.max(4, m.hitRadius * 0.5);
    this.plowPoint.set(p.x, p.y + m.centerY * 0.45, p.z);
    this.destroyAt(this.plowPoint, r, 0.18, false);
    // and a second, lower bite so it clears its own legs rather than
    // wading with its feet buried in masonry
    this.plowPoint.set(p.x, p.y + m.centerY * 0.12, p.z);
    this.destroyAt(this.plowPoint, r * 0.8, 0, false);
  }

  private bossPlowFrom = new THREE.Vector3();
  private plowPoint = new THREE.Vector3();

  /**
   * A boss that lands past the streaming edge stands on ground that has not
   * been meshed yet, so it reads as floating over open sky. Collar its ankles
   * in cloud until the terrain catches up. Deliberately ankle-height: the
   * body and head — the parts the player has to read to fight it — stay clear.
   */
  private veilBossFeet(m: Monster): void {
    const p = m.group.position;
    if (m.dying || m.dead || this.chunks.isMeshed(p.x, p.z)) {
      this.sky.hideFootCloud();
      return;
    }
    // knee height at the very most, and never above a third of the body
    const ankle = p.y + Math.min(6, m.centerY * 0.22);
    this.sky.showFootCloud(p.x, ankle, p.z, m.hitRadius * 0.9);
  }

  private updateBosses(dt: number): void {
    if (!this.monster) this.sky.hideFootCloud();
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
      // Difficulty tempo is applied as the boss's own clock rate, so windups,
      // cooldowns and movement all shift together and telegraphs stay
      // proportional to the attacks they precede.
      this.monster.update(dt * this.diff.tempo, this.time, ctx);
      this.plowBoss(this.monster);
      this.veilBossFeet(this.monster);
      this.hud.setBossHP(this.monster.hp / this.monster.maxHp, this.monster.phase, this.monster.vulnerable);
      if (this.monster.phaseAnnounce) this.announcePhase(this.monster.phaseAnnounce);
      if (this.monster instanceof Revenant) this.updateRevenant(this.monster);

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
          sfx.victoryStinger();
          if (this.ally.active && !this.hud.busy) {
            this.hud.say([{ who: 'HINATA · PILOT', text: 'Confirmed down! That was incredible, senpai!' }]);
          } else if (this.tank.active && !this.hud.busy) {
            this.hud.say([{ who: 'KOTETSU · SUPPORT', text: 'See? Perfect support fire. I definitely meant all of that.' }]);
          }
          const finishedChapter = this.bossIndex - 1;
          if (CHAPTERS[finishedChapter]) {
            this.latestFinishedChapter = Math.max(this.latestFinishedChapter, finishedChapter);
          }
          this.playDebrief();
        }
      }
      if (this.monster.dead) {
        this.scene.remove(this.monster.group);
        if (this.monster instanceof VoltSerpent) this.monster.removeSegmentsFrom(this.scene);
        this.monster = null;
        // A fixed 25s of nothing was the worst stretch in the game. The lull
        // is now short, and it only holds while the debrief is still talking
        // — see the hold below — so the pause is exactly as long as it needs
        // to be and never longer.
        this.bossTimer = 13;
        sfx.setMusicMode('explore');
        // don't stomp the campaign-complete objective set by the epilogue
        if (!this.campaignOver) this.hud.setObjective('Clear the drones — next contact inbound');
      }
      return;
    }

    // The countdown always runs — including under the debrief, which is long.
    // Holding the timer instead would make the real gap the debrief plus the
    // timer, which is how the dead air got there in the first place. Only the
    // spawn itself waits for comms to finish, so a kaiju never lands on top
    // of someone's sentence.
    // Nothing spawns while the tutorial is running: a first contact landing
    // mid-lesson is exactly the ambush this whole sequence exists to prevent.
    if (this.tutorial) { this.bossTimer = Math.max(this.bossTimer, 6); return; }
    this.bossTimer -= dt;
    this.warnNextContact();
    if (this.bossTimer > 0 || this.hud.busy || this.hud.cardOpen) return;

    // Bosses land somewhere out in the world rather than always the same
    // distance away — sometimes right on top of you, sometimes a hunt across
    // the districts. The minimap arrow is what makes the far ones findable.
    const a = Math.random() * Math.PI * 2;
    // Two long hunts in a row is where the pacing died: five minutes of
    // walking with nothing to fight. A far spawn now has to be followed by
    // something closer, and the far band only opens up once the overdrive
    // thrusters make crossing the city quick.
    const canRoam = this.player.abilities.thrust && !this.lastSpawnFar;
    const roll = Math.random();
    const far = canRoam && roll >= 0.78;
    const d = far ? 320 + Math.random() * 180             // far: a real hunt
      : roll < 0.42 ? 90 + Math.random() * 40             // close: immediate fight
      : 170 + Math.random() * 110;                        // mid: short trek
    this.lastSpawnFar = far;
    const x = this.player.pos.x + Math.sin(a) * d;
    const z = this.player.pos.z + Math.cos(a) * d;

    const campaign: Array<{ make: (x: number, z: number) => Monster; toast: [string, string] }> = [
      { make: (x2, z2) => new Kaiju(x2, z2), toast: ['⚠ KAIJU SIGNAL ⚠', 'GORGOSAUR is tearing through the city. Defeat it to learn the BEAM.'] },
      { make: (x2, z2) => new RocketBeast(x2, z2), toast: ['⚠ AIRBORNE THREAT ⚠', 'MISSILE MAW inbound. Defeat it for OVERDRIVE THRUSTERS.'] },
      { make: (x2, z2) => new VoltSerpent(x2, z2), toast: ['⚠ SEISMIC WEAVE ⚠', 'VOLT SERPENT surfacing. Defeat it to learn the NOVA PULSE.'] },
      { make: (x2, z2) => new IronColossus(x2, z2), toast: ['⚠ HEAVY FOOTFALLS ⚠', 'IRON COLOSSUS approaching. Plated — hit it when it is open, and do not let up.'] },
      { make: (x2, z2) => new SkyReaver(x2, z2), toast: ['⚠ SHADOW OVERHEAD ⚠', 'SKY REAVER circling above. Defeat it to salvage its RAILGUN.'] },
      { make: (x2, z2) => new CrimsonMantis(x2, z2), toast: ['⚠ RAPID MOVEMENT ⚠', 'CRIMSON MANTIS closing fast. Defeat it to forge the CRIMSON EDGE.'] },
      { make: (x2, z2) => new MagmaGolem(x2, z2), toast: ['⚠ MOLTEN MASS ⚠', 'MAGMA GOLEM erupting. Defeat it to overcharge the NOVA PULSE.'] },
      { make: (x2, z2) => new DeepMaw(x2, z2), toast: ['⚠ TREMORS ⚠', 'DEEP MAW burrowing below. Defeat it to mount HEAD VULCANS.'] },
      { make: (x2, z2) => new CinderWyrm(x2, z2), toast: ['⚠ FIRESTORM ⚠', 'CINDER WYRM torching the district. Defeat it to claim its FLAMETHROWER.'] },
      { make: (x2, z2) => new TideLeviathan(x2, z2), toast: ['⚠ FLOOD WARNING ⚠', 'TIDE LEVIATHAN surfacing. Defeat it to claim its AQUA BLASTER.'] },
      // Act II. These are the same ten kaiju that came through the seam the
      // first time, except they have been in there since — bigger, already in
      // second gear, and the colour bled out of them.
      { make: (x2, z2) => new IronColossus(x2, z2), toast: ['⚠ SEAM-TOUCHED ⚠', 'A COLOSSUS is holding the causeway. It has been in there a long time.'] },
      { make: (x2, z2) => new DeepMaw(x2, z2), toast: ['⚠ THE GROUND IS MOVING ⚠', 'Something is running under the shallows.'] },
      { make: (x2, z2) => new CrimsonMantis(x2, z2), toast: ['⚠ FAST MOVER ⚠', 'Contact on the dead ground — closing quickly.'] },
      { make: (x2, z2) => new SkyReaver(x2, z2), toast: ['⚠ OVERHEAD ⚠', 'It has been circling the approach since before you arrived.'] },
      { make: (x2, z2) => new MagmaGolem(x2, z2), toast: ['⚠ THE MOUTH ⚠', 'The seam is defending itself. Break through.'] },
      // TA-00. Not a kaiju and not corrupted — it is the frame that came first.
      { make: (x2, z2) => new Revenant(x2, z2), toast: ['⚠ TA-00 · REVENANT ⚠', 'It has your moveset and it learns. Do not lean on one weapon.'] },
    ];

    this.wave++;
    this.hud.setWave(this.wave);
    this.warnedContact = false;
    // the swarm thickens as the campaign progresses; the lull scales this up
    // and down around the countdown
    this.droneBase = Math.min(14, 4 + Math.floor(this.wave * 0.75));
    this.drones.target = this.droneBase;
    if (this.bossIndex < campaign.length) {
      const chapterNo = this.bossIndex;
      const entry = campaign[this.bossIndex++];
      // Act II stages the fight around a front line that walks toward the
      // rift, rather than around wherever the player happens to be standing.
      const adv = CHAPTERS[chapterNo]?.advance;
      let sx = x, sz = z;
      if (adv) {
        const at = this.advanceLine(adv);
        const ra = Math.random() * Math.PI * 2;
        const rd = 70 + Math.random() * 90;
        sx = at.x + Math.sin(ra) * rd;
        sz = at.z + Math.cos(ra) * rd;
      }
      this.monster = entry.make(sx, sz);
      this.bossPlowFrom.set(0, 0, 0); // first frame just seeds the plow origin
      this.tuneCampaignBoss(this.monster, chapterNo);
      this.chapterStartScore = this.score;
      this.chapterStartDeaths = this.deaths;
      this.chapterStartDamage = this.blocksWrecked;
      // Act II revisits already-defeated kaiju. They advance the story and
      // restore some integrity, but never replay an ability or weapon unlock.
      if (chapterNo >= ACT2_START && !(this.monster instanceof Revenant)) {
        this.monster.reward = 'none';
      }
      // the Revenant is not seam-rotted scenery; it arrives as itself
      if (adv && !(this.monster instanceof Revenant)) {
        this.corruptMonster(this.monster, adv.frac);
      }
      // Support frames are deliberately held outside the map until every
      // introduction line has finished. This makes their descent an arrival,
      // instead of having the units silently present before anyone speaks.
      if ((chapterNo >= HINATA_CHAPTER && !this.ally.active)
        || (chapterNo >= KOTETSU_CHAPTER && !this.tank.active)
        || (chapterNo >= JOTETSU_CHAPTER && !this.digger.active)) {
        this.supportArrivalChapter = chapterNo;
        this.supportArrivalArmed = false;
      }
      const ch = CHAPTERS[chapterNo];
      // title card first, then Command talks you through the contact
      void this.hud.showCard(
        `CHAPTER ${ch.no}`,
        ch.title,
        ch.cold
      ).then(() => {
        this.beginBossIntro(this.monster?.name ?? entry.toast[0], entry.toast[1]);
        this.hud.say(ch.brief);
        if (this.supportArrivalChapter === chapterNo) this.supportArrivalArmed = true;
      });
    } else {
      // endless mode: any boss, scaled up each wave; reward = repairs + power
      const pool = [Kaiju, RocketBeast, VoltSerpent, IronColossus, SkyReaver, CrimsonMantis, MagmaGolem, DeepMaw, CinderWyrm, TideLeviathan];
      const M = pool[Math.floor(Math.random() * pool.length)];
      const m = new M(x, z);
      m.maxHp = m.hp = Math.round(m.maxHp * (1.45 + this.powerLevel * 0.22 + (this.wave - campaign.length) * 0.17));
      m.reward = 'repair';
      this.monster = m;
      this.bossPlowFrom.set(0, 0, 0);
      this.hud.toast('⚠ WAVE ' + this.wave + ' ⚠', m.name + ' detected.', 3);
      this.beginBossIntro(m.name, 'Escalating hostile signature · endless deployment');
      this.hud.say([ENDLESS_LINES[this.wave % ENDLESS_LINES.length]]);
    }
    if (this.monster instanceof VoltSerpent) this.monster.addSegmentsTo(this.scene);
    this.scene.add(this.monster.group);
    this.hud.showBoss(this.monster.name);
    this.hud.setObjective('Destroy ' + this.monster.name);
    // teach the weak point once, after the boss intro toast has had its time
    if (!this.taughtWeakPoint) {
      this.taughtWeakPoint = true;
      setTimeout(() => {
        if (this.monster && !this.monster.dying) {
          this.hud.toast('WEAK POINT: DORSAL CORE', 'Strike high on its back for 2.1x damage', 4);
        }
      }, 5200);
    }
    sfx.setMusicMode(this.monster instanceof Revenant ? 'revenant' : 'boss');
    sfx.bossStinger(this.monster instanceof Revenant);
  }

  private beginBossIntro(name: string, subtitle: string): void {
    this.bossIntroT = this.bossIntroDuration;
    this.hud.showBossIntro(name, subtitle);
    this.shake = Math.max(this.shake, 0.3);
    sfx.roar();
  }

  // DEBUG helper: hand the player every ability + weapon up front
  private unlockEverything(): void {
    const a = this.player.abilities;
    a.beam = a.boots = a.thrust = a.dash = a.nova = a.shield = a.blades = a.quake = true;
    this.player.model.setCrimsonEdge(true);
    this.player.model.setAegisArmor(true);
    this.hud.unlockDash();
    this.touch?.unlockDash();
    this.hud.unlock('beam', '<b>E (hold)</b> PLASMA BEAM'); this.hud.setRangedSlot('PLASMA BEAM');
    this.hud.unlock('boots', '<b>SPACE</b> OVERDRIVE THRUSTERS');
    this.hud.unlock('nova', '<b>Q</b> NOVA PULSE');
    this.hud.unlock('nova', this.novaLabel());
    this.hud.unlock('blades', 'CRIMSON EDGE');
    this.touch?.unlock('beam');
    this.touch?.unlock('nova');
    for (const w of WEAPONS) {
      this.unlockedWeapons.add(w.id);
      this.hud.unlockWeapon(w.id);
    }
    this.selectWeapon('saber');
  }

  // Unlock a weapon and immediately equip it so the reward is obvious.
  private grantWeapon(w: WeaponId, title: string, sub: string): void {
    this.unlockedWeapons.add(w);
    this.hud.unlockWeapon(w);
    this.touch?.unlockWeapon(w);
    this.selectWeapon(w);
    this.hud.toast(title, sub, 5);
  }

  private grantReward(reward: Reward): void {
    if (reward === 'none') {
      this.player.heal(28);
      this.hud.toast('SALVAGE RECOVERED', 'Integrity restored · no duplicate upgrade', 3.5);
      return;
    }
    sfx.jingle();
    switch (reward) {
      case 'beam':
        this.player.abilities.beam = true;
        this.touch?.unlock('beam');
        this.hud.unlock('beam', '<b>E (hold)</b> PLASMA BEAM');
        this.hud.setRangedSlot('PLASMA BEAM');
        this.hud.toast('BEAM UNLOCKED', 'Hold E to fire the plasma beam', 5);
        break;
      case 'thrust':
        this.player.abilities.thrust = true;
        this.player.abilities.dash = true;
        this.hud.unlock('boots', '<b>SPACE</b> OVERDRIVE THRUSTERS');
        this.hud.unlockDash();
        this.touch?.unlockDash();
        this.hud.toast('OVERDRIVE DASH ONLINE', 'Press C or DASH for a blue-thruster evasive burst', 5);
        break;
      case 'nova':
        this.player.abilities.nova = true;
        this.touch?.unlock('nova');
        this.hud.unlock('nova', this.novaLabel());
        this.hud.toast('NOVA PULSE UNLOCKED', 'Press Q for a devastating shockwave', 5);
        break;
      case 'shield':
        // Passive: it costs no button and needs no chip cluttering the HUD.
        // The armour plates visibly deploy on the frame and the toast says so.
        this.player.abilities.shield = true;
        this.player.model.setAegisArmor(true);
        this.hud.toast('AEGIS ARMOR ONLINE', 'Reinforced plating deployed · incoming damage reduced by 35%', 5);
        break;
      case 'blades':
        this.player.abilities.blades = true;
        this.player.model.setCrimsonEdge(true);
        this.hud.unlock('blades', 'CRIMSON EDGE');
        this.selectWeapon('saber');
        this.hud.toast('CRIMSON EDGE FORGED', 'Red laser saber · 60% stronger strikes', 5);
        break;
      case 'quake':
        // Not a second button: the Golem's reward overcharges the pulse the
        // Serpent gave you. Two nearly identical AoE buttons on two keys was
        // the worst of both — more UI, no more depth.
        this.player.abilities.quake = true;
        if (!this.player.abilities.nova) { this.player.abilities.nova = true; this.touch?.unlock('nova'); }
        this.hud.unlock('nova', this.novaLabel());
        this.hud.toast('NOVA PULSE OVERCHARGED', 'The pulse now ruptures the ground it lands on', 5);
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

  /** The active difficulty preset's multipliers. */
  private get diff() { return DIFFICULTY[this.settings.difficulty]; }

  private damagePlayer(amount: number): void {
    if (this.redeploying) return;
    if (this.evadeT > 0) {
      if (!this.evadeRewarded) {
        this.evadeRewarded = true;
        this.slowmo = Math.max(this.slowmo, 0.5);
        this.impactZoom = Math.max(this.impactZoom, 0.75);
        this.shake = Math.max(this.shake, 0.32);
        this.monster?.rewardEvade(1.2);
        this.counterWindow = 1.5;
        this.addScore(180, true);
        this.hud.perfectEvade();
        sfx.impact(0.65, true);
      }
      return;
    }
    // Threat rises with the player's expanded toolkit. This applies to bosses,
    // drones and hazards uniformly, preventing support-heavy late chapters
    // from becoming safer than the opening act.
    const campaignThreat = 1 + Math.min(0.42, Math.max(0, this.bossIndex - 1) * 0.028);
    amount *= campaignThreat * this.diff.incoming;
    if (this.player.abilities.shield) {
      // Aegis is meaningful mitigation, not permanent half-damage immunity.
      amount *= 0.65;
      this.player.model.pulseAegis();
      // shield shimmer
      const flash = this.player.pos.clone();
      flash.y += 5;
      this.explosions.boom(flash, 3);
      this.hud.shieldFlash();
      sfx.impact(0.45, true);
      this.rumble(120, 0.3, 0.6);
    }
    this.player.damage(amount);
    this.player.model.flinchT = 0.22; // visible recoil from the hit
    this.hud.damageFlash();
    // knocked back from whatever hit you: the camera shoves away from the
    // source, so a hit off-screen still tells you which way to look
    const src = this.monster && !this.monster.dying ? this.monster.group.position : null;
    if (src) this.addKick(this.player.pos.clone().sub(src), Math.min(3.4, 0.9 + amount * 0.09));
    this.shake = Math.max(this.shake, Math.min(0.9, 0.25 + amount * 0.022));
    this.hitStop = Math.max(this.hitStop, Math.min(0.05, amount * 0.0022));
    sfx.thud();
    if (this.player.hp <= 0 && !this.redeploying) {
      // dying costs the run: the combo breaks, score is docked, and the mecha
      // comes back only partly repaired, so attrition actually matters
      this.deaths++;
      const lost = Math.round(this.score * 0.25);
      this.score = Math.max(0, this.score - lost);
      this.combo = 1;
      this.comboTimer = 0;
      this.hud.setScore(this.score, this.combo);
      this.redeploying = true;
      this.started = false;
      this.slowmo = 0.8;
      this.shake = 1.2;
      this.explosions.boom(this.player.pos.clone().setY(this.player.pos.y + 5), 12);
      this.hud.say([{ who: 'AYA · COMMAND', text: 'Terra-Armor signal lost! Recovery team, lock onto Kuroki’s beacon. Emergency frame inbound.' }]);
      setTimeout(() => {
        void this.hud.showCard(
          'TERRA-ARMOR DESTROYED',
          'EMERGENCY REDEPLOYMENT',
          `Combat score lost: <b>${lost.toLocaleString()}</b><br/>Combo chain terminated.<br/><br/>` +
          'Command has restored the latest frame backup at 50% integrity.'
        ).then(() => {
          this.player.respawn();
          this.player.hp = Math.round(this.player.maxHp * 0.5);
          this.player.invulnT = 3.5;
          this.redeploying = false;
          this.started = true;
          this.hud.toast('REDEPLOYED', 'Emergency invulnerability active', 2.5);
          if (!this.touch) this.renderer.domElement.requestPointerLock();
        });
      }, 700);
    }
  }

  // ------------------------------------------------------------------ frame

  private frame(): void {
    const frameStart = this.hud.perfOn ? performance.now() : 0;
    const rawDt = Math.min(0.05, this.clock.getDelta());
    // A full-screen story card takes the controls away, but the world used to
    // keep running underneath it — so a kaiju standing on you during a chapter
    // title chewed through your health while you could not move, dodge or
    // even see it. The card is modal for the simulation too now.
    if (this.paused || this.hud.cardOpen) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    // slow-motion scales the whole simulation; its own timer uses raw time
    if (this.slowmo > 0) this.slowmo -= rawDt;
    if (this.hitStop > 0) this.hitStop = Math.max(0, this.hitStop - rawDt);
    if (this.bossIntroT > 0) this.bossIntroT = Math.max(0, this.bossIntroT - rawDt);
    this.impactZoom = Math.max(0, this.impactZoom - rawDt * 4.2);
    this.monsterSmokeT = Math.max(0, this.monsterSmokeT - rawDt);
    this.dashCameraT = Math.max(0, this.dashCameraT - rawDt);
    this.player.invulnT = Math.max(0, this.player.invulnT - rawDt);
    const dt = this.hitStop > 0 ? 0
      : this.bossIntroT > 0 ? rawDt * 0.16
      : this.slowmo > 0 ? rawDt * 0.35
      : rawDt;

    this.time += dt;
    this.laserCooldown -= dt;
    this.novaCooldown -= dt;
    this.railCooldown -= dt;
    this.vulcanCooldown -= dt;
    this.crimsonCooldown -= dt;
    this.dashT = Math.max(0, this.dashT - rawDt);
    this.dashFxT = Math.max(0, this.dashFxT - rawDt);
    this.player.model.setDashThrusters(this.dashFxT > 0);
    this.evadeT = Math.max(0, this.evadeT - rawDt);
    this.counterWindow = Math.max(0, this.counterWindow - rawDt);
    this.comboWindow -= dt;
    if (this.charging) this.chargeT += dt;
    // drop lock-on when the boss is gone
    if (this.lockOn && (!this.monster || this.monster.dying)) { this.lockOn = false; this.hud.setLockOn(false); }
    // combo decay + camera-shake decay run on real time
    this.shake = Math.max(0, this.shake - rawDt * 2.2);
    // the directional shove springs back faster than the shake fades, so a
    // hit is a snap rather than a drift
    this.kick.multiplyScalar(Math.max(0, 1 - rawDt * 7));
    // Bank into hard turns: the camera leans with lateral movement, which is
    // most of why running fast in a good third-person game feels fast.
    const lateral = Math.hypot(this.player.vel.x, this.player.vel.z);
    if (lateral > 1) {
      const heading = Math.atan2(this.player.vel.x, this.player.vel.z);
      let off = heading - this.camYaw;
      while (off > Math.PI) off -= Math.PI * 2;
      while (off < -Math.PI) off += Math.PI * 2;
      const bankStrength = (!this.player.grounded && !this.player.onPlatform) ? 0.09 : 0.05;
      this.rollTarget += (Math.sin(off) * Math.min(1, lateral / 34) * bankStrength - this.rollTarget) * Math.min(1, rawDt * 3);
    } else {
      this.rollTarget *= Math.max(0, 1 - rawDt * 4);
    }
    this.camRoll += (this.rollTarget - this.camRoll) * Math.min(1, rawDt * 8);
    if (this.comboTimer > 0) {
      this.comboTimer -= rawDt;
      if (this.comboTimer <= 0 && this.combo > 1) { this.combo = 1; this.hud.setScore(this.score, this.combo); }
    }

    let jump = false;
    const wasStanding = this.player.grounded || this.player.onPlatform;
    const incomingFallSpeed = this.player.vel.y;
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
      const descend = this.keys.has('KeyX');
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
      this.player.update(dt, mx, mz, this.camYaw, jump, boost, descend);
    } else {
      this.player.update(dt, 0, 0, this.camYaw, false, false, false);
    }
    const standingNow = this.player.grounded || this.player.onPlatform;
    sfx.setLowHealth(this.player.hp > 0 && this.player.hp / this.player.maxHp <= 0.25);
    if (!wasStanding && standingNow && incomingFallSpeed < -7) {
      const weight = Math.min(1, Math.abs(incomingFallSpeed) / 28);
      this.shake = Math.max(this.shake, 0.28 + weight * 0.55);
      this.impactZoom = Math.max(this.impactZoom, 0.35 + weight * 0.35);
      this.explosions.boom(this.player.pos.clone().setY(this.player.pos.y + 0.6), 2.5 + weight * 2);
      sfx.thud();
    }
    // Mechanical cadence follows actual ground speed. A low sub impact gives
    // the frame mass; the quieter servo chirp fills the space between steps.
    const groundSpeed = Math.hypot(this.player.vel.x, this.player.vel.z);
    this.footstepT -= dt;
    this.servoT -= dt;
    if (standingNow && groundSpeed > 2 && this.footstepT <= 0) {
      const stride = groundSpeed > 24 ? 0.27 : groundSpeed > 11 ? 0.38 : 0.52;
      this.footstepT = stride;
      sfx.footstep(Math.min(1, 0.45 + groundSpeed / 30));
      if (this.servoT <= 0) { this.servoT = stride * 2; sfx.servo(0.7); }
      this.shake = Math.max(this.shake, 0.035 + Math.min(0.06, groundSpeed * 0.002));
    }
    const crashes = this.planes.update(dt, this.player.pos,
      (x, z) => this.world.groundHeight(x, z, 60));
    this.trailCrashingPlanes(dt);
    for (const c of crashes) this.planeCrash(c);
    this.updatePlaneRiding(jump);

    const wingEvents = this.defenseWing.update(dt, this.time, this.player.pos,
      this.monster && !this.monster.dying ? this.monster : null);
    if (wingEvents.respawned > 0 && !this.defenseWingAnnounced) {
      this.defenseWingAnnounced = true;
      this.hud.toast('N.T.D.F. DEFENSE WING', 'Allied interceptors commencing attack runs', 4);
      this.hud.say([{ who: 'DEFENSE LEAD', text: 'Terra-Armor, Defense Wing is on station. We will keep its attention off the shelters.' }]);
    }
    for (const hit of wingEvents.hits) {
      const monster = this.monster;
      if (!monster || monster.dying) break;
      monster.takeDamage(hit.damage * WING_ATTACK_DAMAGE, 'defense-wing');
      this.debris.burst(hit.at, [15], 2);
    }
    for (const at of wingEvents.crashes) {
      this.explosions.boom(at, 7);
      this.debris.burst(at, [6, 12, 15], 14);
      this.shake = Math.max(this.shake, at.distanceTo(this.player.pos) < 80 ? 0.3 : 0.12);
      sfx.explode(0.45, 1 - Math.min(1, at.distanceTo(this.player.pos) / 140));
      const ayaLosses = [
        'Interceptor lost! Their airframes cannot survive a direct hit — keep that monster occupied.',
        'Defense aircraft down. Search and rescue is moving, but replacement launch will take time.',
        'We just lost another pilot. Kuroki, break the monster’s attack pattern before the next run.',
        'One hit was all it took. Defense Wing, widen your spacing and stay out of its reach.',
      ];
      const line = ayaLosses[this.defenseLossCursor++ % ayaLosses.length];
      this.hud.say([{ who: 'AYA · COMMAND', text: line }]);
    }

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

    this.updateTutorial(dt);
    this.updateBreach(dt);
    this.updateBosses(dt);
    // Major attacks project a pulsing danger zone at Terra-Armor's current
    // position. This turns the existing animation tell into spatially useful
    // information without filling the HUD with another warning panel.
    if (this.monster && !this.monster.dying && this.monster.threatening) {
      this.bossTelegraph.visible = true;
      this.bossTelegraphCore.visible = true;
      const gy = this.world.groundHeight(this.player.pos.x, this.player.pos.z, 60);
      this.bossTelegraph.position.set(this.player.pos.x, gy + 0.18, this.player.pos.z);
      this.bossTelegraphCore.position.set(this.player.pos.x, gy + 0.2, this.player.pos.z);
      const pulse = 1 + Math.sin(this.time * 18) * 0.12;
      this.bossTelegraph.scale.setScalar(pulse);
      // Counter-rotate and contract the inner marker so the warning reads as
      // an imminent impact rather than a static selection circle.
      this.bossTelegraph.rotation.z += dt * 1.9;
      this.bossTelegraphCore.rotation.z -= dt * 3.2;
      this.bossTelegraphCore.scale.setScalar(1.35 - Math.sin(this.time * 18) * 0.2);
      (this.bossTelegraph.material as THREE.MeshBasicMaterial).opacity = 0.42 + Math.sin(this.time * 18) * 0.18;
      (this.bossTelegraphCore.material as THREE.MeshBasicMaterial).opacity = 0.46 + Math.sin(this.time * 22) * 0.16;
    } else {
      this.bossTelegraph.visible = false;
      this.bossTelegraphCore.visible = false;
    }
    // shelters: only kaiju hurt them, and losing one ends the run
    const dronePos = this.drones.group.children.map((d) => d.position);
    const bossPos = this.monster && !this.monster.dying ? this.monster.group.position : null;
    const fallen = this.shelters.update(dt, this.time, bossPos, dronePos);
    this.shelters.mend(dt);
    // no kaiju up means people start going home — drones alone don't keep
    // anyone underground, so clearing a boss fast is what buys ward space
    if (!bossPos) this.shelters.release(dt);
    // Kotetsu extends the wards while he is out there — he is a mechanic
    // first, and it is the only thing keeping capacity ahead of the rubble
    if (this.tank.active) {
      this.shelters.expand(dt);
      this.mechanicT -= dt;
      if (this.mechanicT <= 0) { this.mechanicT = 55; this.sayKotetsu('mechanic'); }
    }
    if (this.digger.active) {
      this.diggerWorkTarget = this.shelters.reconstruct(dt).pos;
      this.diggerChatterT -= dt;
      if (this.diggerChatterT <= 0) {
        this.diggerChatterT = 48 + Math.random() * 24;
        this.sayJotetsu(Math.random() < 0.55 ? 'repair' : 'kotetsu');
      }
    } else {
      this.diggerWorkTarget = null;
    }
    const reached = this.evacuees.update(dt, this.time, this.world);
    const burst = this.shelters.admit(reached);
    if (fallen && !this.gameOver) this.endRun(fallen, 'destroyed');
    else if (burst && !this.gameOver) this.retryLatestFinishedChapter(burst);
    this.warnShelters();

    this.updateAlly(dt);
    this.updateTank(dt);
    this.digger.update(dt, this.time, {
      world: this.world,
      playerPos: this.player.pos,
      workTarget: this.diggerWorkTarget,
    });
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
    // The Digger more than doubles reconstruction throughput while deployed.
    const rep = this.repair.update(
      dt, this.time, this.player.pos.x, this.player.pos.z,
      this.digger.active ? 2.25 : 1,
    );
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
    // how far into the seam the player currently is — drives the whole look
    this.corruption = corruptionAt(this.player.pos.x, this.player.pos.z);
    const skyState = this.sky.update(dt, this.time, this.player.pos, this.camera, this.corruption);
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
    this.updateSupportArrivals();

    this.updateCamera(rawDt);
    this.updateTargetLock();
    this.renderer.render(this.scene, this.camera);
    if (frameStart) this.samplePerf(performance.now() - frameStart, rawDt);
  }

  /**
   * One-second rolling window: mean and worst frame, plus what the chunk
   * streamer and the renderer are each costing. Worst frame is the number
   * that matters — a hitch while a boss is coming apart is what a player
   * actually feels, and a mean hides it completely.
   */
  private samplePerf(ms: number, rawDt: number): void {
    this.perfFrames++;
    this.perfSum += ms;
    this.perfWorst = Math.max(this.perfWorst, ms);
    this.perfWindow += rawDt;
    if (this.perfWindow < 1) return;
    const mean = this.perfSum / Math.max(1, this.perfFrames);
    const info = this.renderer.info;
    // over one 60fps frame gets highlighted; that is the whole point
    const budget = (v: number): string =>
      v > 16.6 ? `<b>${v.toFixed(1)}</b>` : v.toFixed(1);
    this.hud.setPerf(
      `fps  ${Math.round(this.perfFrames / this.perfWindow)}
` +
      `mean ${budget(mean)} ms
` +
      `worst ${budget(this.perfWorst)} ms
` +
      `chunks ${this.chunks.lastBudgetMs.toFixed(1)} ms
` +
      `draws ${info.render.calls}  tris ${(info.render.triangles / 1000).toFixed(0)}k`
    );
    this.perfFrames = 0;
    this.perfSum = 0;
    this.perfWorst = 0;
    this.perfWindow = 0;
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
    // friendly ordnance — the player's own plus KOTETSU's covering fire
    const playerShot = (k: Projectile['kind']) =>
      k === 'laser' || k === 'charge' || k === 'ally' || k === 'shell';
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      if (p.kind === 'rocket') p.vel.y -= 2 * dt;
      if (p.kind === 'boulder') {
        p.vel.y -= 16 * dt;
        p.mesh.rotation.x += dt * 3;
        p.mesh.rotation.z += dt * 2;
      }
      p.pos.addScaledVector(p.vel, dt);
      p.mesh.position.copy(p.pos);

      let boom = false;
      if (this.world.solidAt(p.pos.x, p.pos.y, p.pos.z) || p.pos.y < 0.2) boom = true;
      if (playerShot(p.kind)) {
        // Kotetsu's shells are artillery: the blast is the attack, not a
        // precision impact, so nearby bosses and drone packs take damage too.
        const hitR = p.kind === 'shell' ? 12 : p.kind === 'charge' ? 4 : 2;
        const allied = p.kind === 'ally' || p.kind === 'shell';
        const source = p.kind === 'ally' ? 'hinata-support'
          : p.kind === 'shell' ? 'kotetsu-support' : undefined;
        if (this.hitMonster(
          p.pos, hitR,
          (p.dmg ?? 7) * (p.kind === 'laser' ? this.power : 1),
          0.7, source, allied ? ALLY_ATTACK_DAMAGE : PLAYER_ATTACK_DAMAGE,
        )) boom = true;
      } else if (p.pos.distanceTo(this.player.pos) < (p.kind === 'boulder' ? 8 : 7)) {
        // only enemy ordnance hurts the player
        boom = true;
        this.damagePlayer(p.kind === 'boulder' ? 22 : 16);
      }
      if (boom) {
        const r = p.kind === 'shell' ? 10  // his misses take out whole blocks
          : p.kind === 'charge' ? 4.5 : p.kind === 'laser' ? 2.4
          : p.kind === 'boulder' ? 5 : 3.6;
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

  /**
   * Shove the camera along the line of a blow. Undirected jitter reads as
   * noise; a kick that travels in the direction the force went reads as
   * weight, and tells the player where the hit came from without a marker.
   */
  private addKick(dir: THREE.Vector3, amount: number): void {
    if (dir.lengthSq() < 1e-6) return;
    this.kick.addScaledVector(dir.clone().normalize(), amount);
    // clamped: sustained weapons call this many times a second and an
    // unbounded shove would leave the camera permanently displaced
    if (this.kick.length() > 4.5) this.kick.setLength(4.5);
    // roll away from the impact so the frame tilts with the blow
    this.rollTarget += (Math.random() < 0.5 ? -1 : 1) * amount * 0.012;
    this.rollTarget = THREE.MathUtils.clamp(this.rollTarget, -0.09, 0.09);
  }

  /** Optional controller tactility; silently degrades on keyboard-only devices. */
  private rumble(duration: number, weak: number, strong: number): void {
    const pads = navigator.getGamepads?.();
    if (!pads) return;
    type RumbleActuator = {
      playEffect: (type: string, options: {
        duration: number; weakMagnitude: number; strongMagnitude: number;
      }) => Promise<unknown>;
    };
    for (const pad of pads) {
      const actuator = (pad as Gamepad & { vibrationActuator?: RumbleActuator } | null)?.vibrationActuator;
      if (!actuator?.playEffect) continue;
      void actuator.playEffect('dual-rumble', {
        duration,
        weakMagnitude: THREE.MathUtils.clamp(weak, 0, 1),
        strongMagnitude: THREE.MathUtils.clamp(strong, 0, 1),
      }).catch(() => undefined);
      break;
    }
  }

  private updateCamera(rawDt: number): void {
    const pivot = this.player.pos.clone();
    pivot.y += 9.9;
    const speed = Math.hypot(this.player.vel.x, this.player.vel.z);
    const dashPull = this.dashCameraT > 0 ? Math.sin((this.dashCameraT / 0.3) * Math.PI) : 0;
    let cinematicBlend = 0;
    if (this.bossIntroT > 0 && this.monster && !this.monster.dying) {
      const progress = 1 - this.bossIntroT / this.bossIntroDuration;
      cinematicBlend = Math.sin(progress * Math.PI) * 0.92;
      _v.copy(this.monster.group.position);
      _v.y += this.monster.centerY;
      pivot.lerp(_v, cinematicBlend);
    }
    // When locked on, bias toward the space between Terra-Armor and the boss.
    // This keeps both silhouettes readable without stealing yaw control from
    // the player, and fades away naturally for distant targets.
    if (cinematicBlend < 0.01 && this.lockOn && this.monster && !this.monster.dying) {
      _v.copy(this.monster.group.position);
      _v.y += this.monster.centerY;
      const separation = _v.distanceTo(this.player.pos);
      const combatBlend = THREE.MathUtils.clamp((155 - separation) / 430, 0, 0.27);
      pivot.lerp(_v, combatBlend);
    }
    const dist = 28
      + Math.min(5, speed * 0.18)
      + dashPull * 4.5
      + cinematicBlend * 12
      - Math.min(4.2, this.impactZoom * 2.8);
    const targetFov = 65
      + Math.min(6, speed * 0.16)
      + dashPull * 3
      + cinematicBlend * 5
      - Math.min(5, this.impactZoom * 3.4);
    this.camera.fov += (targetFov - this.camera.fov) * (1 - Math.exp(-rawDt * 10));
    this.camera.updateProjectionMatrix();
    const dir = new THREE.Vector3(
      Math.sin(this.camYaw) * Math.cos(this.camPitch),
      Math.sin(this.camPitch),
      Math.cos(this.camYaw) * Math.cos(this.camPitch)
    );
    // keep the camera out of buildings
    const hit = this.world.raycast(pivot.x, pivot.y, pivot.z, dir.x, dir.y, dir.z, dist);
    const d = hit ? Math.max(3.5, hit.dist - 0.8) : dist;
    const desiredCamera = pivot.clone().addScaledVector(dir, d);
    if (!this.cameraReady) {
      this.cameraPivot.copy(pivot);
      this.cameraChase.copy(desiredCamera);
      this.cameraReady = true;
    } else {
      const pivotBlend = 1 - Math.exp(-rawDt * 11);
      // Occlusion gets a much firmer response so smoothing never lets the
      // viewpoint coast through a wall; open-air motion stays cinematic.
      const chaseBlend = 1 - Math.exp(-rawDt * (hit ? 24 : 7.5));
      this.cameraPivot.lerp(pivot, pivotBlend);
      this.cameraChase.lerp(desiredCamera, chaseBlend);
    }
    this.camera.position.copy(this.cameraChase);
    // directional shove first, so a blow reads as a push rather than static
    this.camera.position.add(this.kick);
    // additive shake — jitter the final camera position, never the input yaw/pitch
    if (this.shake > 0.01) {
      const s = this.shake * 1.6 * this.settings.shake * (this.settings.reducedMotion ? 0.2 : 1);
      this.camera.position.x += (Math.random() - 0.5) * s;
      this.camera.position.y += (Math.random() - 0.5) * s;
      this.camera.position.z += (Math.random() - 0.5) * s;
    }
    this.camera.lookAt(this.cameraPivot);
    // Roll last: lookAt zeroes it, so banking and impact tilt have to be
    // applied to the already-oriented camera.
    if (Math.abs(this.camRoll) > 0.0005) this.camera.rotateZ(this.camRoll);
  }

  private updateTargetLock(): void {
    const m = this.monster;
    if (!this.lockOn || !m || m.dying) {
      this.hud.setTargetLock(false);
      return;
    }
    _v.copy(m.group.position);
    _v.y += m.centerY;
    const distance = _v.distanceTo(this.player.pos);
    _v.project(this.camera);
    const visible = _v.z > -1 && _v.z < 1 && Math.abs(_v.x) < 1.1 && Math.abs(_v.y) < 1.1;
    if (!visible) {
      this.hud.setTargetLock(false);
      return;
    }
    const x = (_v.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-_v.y * 0.5 + 0.5) * window.innerHeight;
    const state = m.vulnerable ? 'open' : m.threatening ? 'evade' : 'track';
    this.hud.setTargetLock(true, x, y, distance, state);
  }
}
