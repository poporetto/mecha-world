// Game orchestrator: scene, camera, input, combat, projectiles, boss cycle.

import * as THREE from 'three';
import { World } from './core/world';
import { ChunkManager } from './render/chunkManager';
import { Player } from './entities/player';
import { NpcManager } from './entities/npcs';
import { Kaiju, Monster, MonsterCtx, RocketBeast } from './entities/monsters';
import { CarManager } from './entities/cars';
import { Debris } from './fx/debris';
import { buildFallingChunk, FallingChunk, updateFallingChunk } from './fx/collapse';
import { Sky } from './fx/sky';
import { sfx } from './fx/sound';
import { Hud } from './ui/hud';

interface Projectile {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  kind: 'laser' | 'rocket';
  mesh: THREE.Mesh;
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

  private keys = new Set<string>();
  private mouseDown = [false, false, false];
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

  private monster: Monster | null = null;
  private bossPhase: 'pre-kaiju' | 'kaiju' | 'pre-rocket' | 'rocket' | 'endless' = 'pre-kaiju';
  private bossTimer = 14;
  private clock = new THREE.Clock();
  private time = 0;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 500);

    // sky, fog, lights — bright anime afternoon
    this.scene.background = new THREE.Color(0x7ec9f7);
    this.scene.fog = new THREE.Fog(0x9edcff, 110, 280);
    const hemi = new THREE.HemisphereLight(0xe6f6ff, 0x7a8a72, 1.25);
    const sun = new THREE.DirectionalLight(0xfff4dd, 1.35);
    sun.position.set(0.6, 1, 0.35);
    this.scene.add(hemi, sun);
    this.sky = new Sky(sun.position.clone().normalize());
    this.scene.add(this.sky.group);

    this.chunks = new ChunkManager(this.world, this.scene);
    this.player = new Player(this.world);
    this.player.respawn();
    this.scene.add(this.player.model.group);

    this.npcs = new NpcManager(this.world);
    this.cars = new CarManager(this.world);
    this.scene.add(this.npcs.group, this.cars.group, this.debris.mesh);

    // beam (unlockable): a long emissive box scaled to hit distance
    this.beamMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.7, 1),
      new THREE.MeshBasicMaterial({ color: 0x39e6e0, transparent: true, opacity: 0.85 })
    );
    this.beamMesh.visible = false;
    this.scene.add(this.beamMesh);

    this.bindInput();
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    (window as any).__game = this; // debug handle

    this.hud.showStart(() => {
      this.started = true;
      sfx.ensure();
      this.renderer.domElement.requestPointerLock();
      this.hud.toast('DEPLOYED', 'Explore Neo Tokyo. Something big is coming…', 4);
    });

    this.renderer.setAnimationLoop(() => this.frame());
  }

  // ------------------------------------------------------------------ input

  private bindInput(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
      this.keys.add(e.code);
      if (e.code === 'KeyF') this.fireLaser();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.renderer.domElement;
    });
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      if (!this.started) return;
      // attacks always fire — even while re-acquiring pointer lock
      if (!this.locked) this.renderer.domElement.requestPointerLock();
      this.mouseDown[e.button] = true;
      if (e.button === 0) this.swingSaber();
      if (e.button === 2) this.fireLaser();
    });
    window.addEventListener('mouseup', (e) => (this.mouseDown[e.button] = false));
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('mousemove', (e) => {
      if (!this.locked) return;
      this.camYaw -= e.movementX * 0.0026;
      this.camPitch = Math.max(-0.5, Math.min(1.2, this.camPitch + e.movementY * 0.0022));
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
        const p = this.player.pos.clone().addScaledVector(d, 7);
        p.y += 4.2;
        this.destroyAt(p, 3.6, 0.25);
      }
      const pc = this.player.pos.clone().addScaledVector(dir, 7);
      pc.y += 4.2;
      this.hitMonster(pc, 9, 12);
    }, 190);
  }

  private fireLaser(): void {
    if (this.laserCooldown > 0 || !this.started) return;
    this.laserCooldown = 0.22;
    sfx.laser();
    this.player.yaw = this.camYaw + Math.PI;
    const dir = this.aimDir();
    const from = this.player.pos.clone();
    from.y += 5;
    from.addScaledVector(dir, 3);
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.25, 1.6),
      new THREE.MeshBasicMaterial({ color: 0x39e6ff })
    );
    mesh.position.copy(from);
    mesh.lookAt(from.clone().add(dir));
    this.scene.add(mesh);
    this.projectiles.push({ pos: from, vel: dir.multiplyScalar(70), life: 2.5, kind: 'laser', mesh });
  }

  private fireRocket(from: THREE.Vector3, toward: THREE.Vector3): void {
    sfx.rocket();
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

  private updateBeam(dt: number): void {
    const active = this.player.abilities.beam && this.keys.has('KeyE') && this.started;
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
    from.y += 5.4;
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
      this.hitMonsterRay(from, dir, dist + 8, 6);
    }
  }

  private hitMonster(p: THREE.Vector3, radius: number, dmg: number): boolean {
    const m = this.monster;
    if (!m || m.dying) return false;
    _v.copy(m.group.position);
    _v.y += 11;
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
    _v.y += 11;
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
      this.debris.burst(p, res.ids, Math.min(26, 6 + res.count / 3));
      if (this.time - this.lastBoomSound > 0.09) {
        this.lastBoomSound = this.time;
        sfx.explode(Math.min(1, res.count / 60));
      }
      this.checkCollapse(p, r);
    }
    this.npcs.scare(p, 34);
    this.cars.scare(p, 34);
  }

  // Anything the blast disconnected from the ground breaks off and falls.
  private checkCollapse(p: THREE.Vector3, r: number): void {
    const cut = this.world.collapseScan(p.x, p.y, p.z, r);
    if (!cut) return;
    this.chunks.markDirty(cut.dirty);
    if (this.falling.length >= 5) {
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
      sfx.explode(Math.min(1, f.blockCount / 150));
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
        this.monster = null;
        this.bossTimer = this.bossPhase === 'kaiju' ? 22 : 35;
        this.bossPhase = this.bossPhase === 'kaiju' ? 'pre-rocket' : 'endless';
      }
      return;
    }

    this.bossTimer -= dt;
    if (this.bossTimer > 0) return;

    const a = Math.random() * Math.PI * 2;
    const d = 100;
    const x = this.player.pos.x + Math.sin(a) * d;
    const z = this.player.pos.z + Math.cos(a) * d;
    if (this.bossPhase === 'pre-kaiju') {
      this.monster = new Kaiju(x, z);
      this.bossPhase = 'kaiju';
      this.hud.toast('⚠ KAIJU SIGNAL ⚠', 'GORGOSAUR is tearing through the city. Defeat it to learn the BEAM.', 5);
    } else if (this.bossPhase === 'pre-rocket') {
      this.monster = new RocketBeast(x, z);
      this.bossPhase = 'rocket';
      this.hud.toast('⚠ AIRBORNE THREAT ⚠', 'MISSILE MAW inbound. Defeat it to earn ROCKET BOOTS.', 5);
    } else {
      // endless mode: alternate stronger bosses, reward = repairs
      const m = Math.random() < 0.5 ? new Kaiju(x, z) : new RocketBeast(x, z);
      m.maxHp = m.hp = Math.round(m.maxHp * 1.4);
      (m as any).reward = 'repair';
      this.monster = m;
      this.hud.toast('⚠ NEW CONTACT ⚠', m.name + ' detected. Defeat it for full repairs.', 4);
    }
    this.scene.add(this.monster.group);
    this.hud.showBoss(this.monster.name);
    sfx.roar();
  }

  private grantReward(reward: 'beam' | 'boots' | 'repair'): void {
    sfx.jingle();
    if (reward === 'beam') {
      this.player.abilities.beam = true;
      this.hud.unlock('beam', '<b>E (hold)</b> PLASMA BEAM');
      this.hud.toast('BEAM UNLOCKED', 'Hold E to fire the plasma beam', 5);
    } else if (reward === 'boots') {
      this.player.abilities.boots = true;
      this.hud.unlock('boots', '<b>SPACE (hold)</b> ROCKET BOOTS');
      this.hud.toast('ROCKET BOOTS UNLOCKED', 'Hold SPACE in the air to fly', 5);
    } else {
      this.player.heal(100);
      this.hud.toast('THREAT NEUTRALIZED', 'Full repairs delivered', 4);
    }
  }

  private damagePlayer(amount: number): void {
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

    if (this.started) {
      const right = this.keys.has('KeyD') || this.keys.has('ArrowRight');
      const left = this.keys.has('KeyA') || this.keys.has('ArrowLeft');
      const back = this.keys.has('KeyS') || this.keys.has('ArrowDown');
      const fwd = this.keys.has('KeyW') || this.keys.has('ArrowUp');
      const mx = (right ? 1 : 0) - (left ? 1 : 0);
      const mz = (fwd ? 1 : 0) - (back ? 1 : 0);
      this.player.update(dt, mx, mz, this.camYaw, this.keys.has('Space'), this.keys.has('ShiftLeft') || this.keys.has('ShiftRight'));
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
    this.sky.update(dt, this.player.pos, this.camera);
    this.hud.setHP(this.player.hp / this.player.maxHp);
    this.hud.update(dt);

    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
  }

  private updateProjectiles(dt: number): void {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      if (p.kind === 'rocket') p.vel.y -= 2 * dt;
      p.pos.addScaledVector(p.vel, dt);
      p.mesh.position.copy(p.pos);

      let boom = false;
      if (this.world.solidAt(p.pos.x, p.pos.y, p.pos.z) || p.pos.y < 0.2) boom = true;
      if (p.kind === 'laser' && this.hitMonster(p.pos, 2, 7)) boom = true;
      if (p.kind === 'rocket' && p.pos.distanceTo(this.player.pos) < 5.5) {
        boom = true;
        this.damagePlayer(16);
      }
      if (boom) {
        this.destroyAt(p.pos, p.kind === 'laser' ? 2.4 : 3.6, p.kind === 'laser' ? 0.12 : 0.35);
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
    pivot.y += 7.6;
    const dist = 22;
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
