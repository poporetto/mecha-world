// Day/night cycle: orbiting sun + moon, sky/fog color blending, drifting
// voxel clouds. game.ts applies the returned light parameters each frame.

import * as THREE from 'three';
import { RIFT_SITE } from '../core/worldgen';

const CYCLE = 300; // seconds for a full day
// Where the sky goes as the seam takes over. Deliberately desaturated and
// dark: near the rift it should read as colour draining out of the world
// rather than as a different time of day.
const RIFT_SKY = new THREE.Color(0x1a0f2b);
const RIFT_FOG = new THREE.Color(0x3a1f52);
const DAY_SKY = new THREE.Color(0xa5d5f5);
const DAY_FOG = new THREE.Color(0xc3e4f8);
const DUSK_SKY = new THREE.Color(0xf2b48c);
const DUSK_FOG = new THREE.Color(0xf6cba4);
const NIGHT_SKY = new THREE.Color(0x101832);
const NIGHT_FOG = new THREE.Color(0x1b2544);

export interface SkyState {
  sunDir: THREE.Vector3;
  sunIntensity: number;
  hemiIntensity: number;
  skyColor: THREE.Color;
  fogColor: THREE.Color;
}

interface Cloud {
  group: THREE.Group;
  speed: number;
}

interface Bird {
  group: THREE.Group;
  wingL: THREE.Mesh;
  wingR: THREE.Mesh;
  center: THREE.Vector3; // flock circling center (relative to player)
  radius: number;
  angle: number;
  speed: number;
  height: number;
  flap: number;
}

const _sky = new THREE.Color();
const _fog = new THREE.Color();

export class Sky {
  group = new THREE.Group();
  private sun: THREE.Group;
  private fuji: THREE.Group;
  private rift: THREE.Group;
  private moon: THREE.Mesh;
  private clouds: Cloud[] = [];
  private birds: Bird[] = [];
  private birdMat = new THREE.MeshLambertMaterial({ color: 0x2c3038 });
  private cloudMat: THREE.MeshLambertMaterial;
  private ash: THREE.Points;
  private ashPos: Float32Array;
  private state: SkyState = {
    sunDir: new THREE.Vector3(0.6, 1, 0.35).normalize(),
    sunIntensity: 1.3,
    hemiIntensity: 1.2,
    skyColor: _sky,
    fogColor: _fog,
  };

  // A distant snow-capped cone that rides with the player, so it always sits
  // on the horizon well beyond the fog rather than being a place you reach.
  private buildFuji(): THREE.Group {
    const g = new THREE.Group();
    const ROCK = 0x6d7fa0;   // hazy blue-grey at distance
    const SNOW = 0xf2f7ff;
    const STEPS = 15;
    const H = 250, R = 400;
    for (let i = 0; i < STEPS; i++) {
      const t = i / STEPS;
      const y = t * H;
      const r = R * (1 - t) * (1 - t * 0.15);
      const band = H * (1 / STEPS) + 1;
      const snowy = t > 0.68;
      const mat = new THREE.MeshBasicMaterial({
        color: snowy ? SNOW : ROCK, fog: false,
        transparent: true, opacity: 0.92,
      });
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.86, r, band, 7, 1), mat);
      ring.position.y = y + band / 2;
      g.add(ring);
    }
    // shallow crater notch at the summit
    const crater = new THREE.Mesh(
      new THREE.CylinderGeometry(R * 0.12, R * 0.16, 10, 7),
      new THREE.MeshBasicMaterial({ color: 0xd8e2f0, fog: false })
    );
    crater.position.y = H + 2;
    g.add(crater);
    g.renderOrder = -1;
    return g;
  }

  /**
   * The tear. Unlike Fuji this sits at a fixed world position — it is a place
   * you walk to, not scenery — but it is drawn without fog and tall enough to
   * clear the skyline, so it is on the horizon from the first chapter and
   * grows the whole way in.
   */
  private buildRift(): THREE.Group {
    const g = new THREE.Group();
    const H = 430;
    // a ragged vertical slash: stacked slabs of decreasing width, jittered
    // sideways so the edge reads as torn rather than cut
    for (let i = 0; i < 26; i++) {
      const t = i / 25;
      // widest at a third height, tapering to nothing at both ends
      const taper = Math.sin(Math.pow(t, 0.8) * Math.PI);
      const w = 4 + taper * 30;
      const band = H / 26 + 2;
      // Draw back to front: the dark sheath has to be added first or the
      // bright core blends over it and the whole tear washes out against a
      // daylight sky.
      const sheath = new THREE.Mesh(
        new THREE.BoxGeometry(w + 22 + taper * 34, band, 1),
        new THREE.MeshBasicMaterial({
          color: 0x150720, fog: false, transparent: true, opacity: 0.55 + taper * 0.4,
          depthWrite: false,
        })
      );
      const jitter = Math.sin(i * 2.3) * 9;
      sheath.position.set(jitter, t * H, -3);
      const core = new THREE.Mesh(
        new THREE.BoxGeometry(w, band, 1),
        new THREE.MeshBasicMaterial({
          color: 0xc79bff, fog: false, transparent: true, opacity: 0.5 + taper * 0.45,
          depthWrite: false,
        })
      );
      core.position.set(jitter, t * H, 0);
      // a thin white-hot filament down the middle of the tear
      const filament = new THREE.Mesh(
        new THREE.BoxGeometry(Math.max(1.6, w * 0.22), band, 1),
        new THREE.MeshBasicMaterial({
          color: 0xfdf4ff, fog: false, transparent: true, opacity: 0.5 + taper * 0.45,
          depthWrite: false,
        })
      );
      filament.position.set(jitter, t * H, 1.5);
      g.add(sheath, core, filament);
    }
    g.renderOrder = -1;
    return g;
  }

  constructor() {
    this.fuji = this.buildFuji();
    this.group.add(this.fuji);
    this.rift = this.buildRift();
    this.rift.position.set(RIFT_SITE.x, 0, RIFT_SITE.z);
    this.group.add(this.rift);
    this.sun = new THREE.Group();
    const core = new THREE.Mesh(
      new THREE.CircleGeometry(22, 24),
      new THREE.MeshBasicMaterial({ color: 0xfff6c8, fog: false })
    );
    const halo = new THREE.Mesh(
      new THREE.CircleGeometry(44, 24),
      new THREE.MeshBasicMaterial({ color: 0xfff0b0, fog: false, transparent: true, opacity: 0.28, depthWrite: false })
    );
    halo.position.z = -0.5;
    this.sun.add(core, halo);
    this.group.add(this.sun);

    this.moon = new THREE.Mesh(
      new THREE.CircleGeometry(16, 24),
      new THREE.MeshBasicMaterial({ color: 0xe8ecff, fog: false, transparent: true, opacity: 0.9 })
    );
    this.group.add(this.moon);

    this.cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, fog: false, transparent: true, opacity: 0.92 });
    // Fine ash becomes visible as the line approaches the seam. Keeping it as
    // one Points draw call adds atmosphere without multiplying scene objects.
    this.ashPos = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i++) {
      this.ashPos[i * 3] = (Math.random() - 0.5) * 180;
      this.ashPos[i * 3 + 1] = Math.random() * 90;
      this.ashPos[i * 3 + 2] = (Math.random() - 0.5) * 180;
    }
    const ashGeo = new THREE.BufferGeometry();
    ashGeo.setAttribute('position', new THREE.BufferAttribute(this.ashPos, 3));
    this.ash = new THREE.Points(ashGeo, new THREE.PointsMaterial({
      color: 0xd7c9e0, size: 0.65, transparent: true, opacity: 0,
      depthWrite: false, blending: THREE.NormalBlending,
    }));
    this.group.add(this.ash);
    for (let i = 0; i < 16; i++) {
      const g = new THREE.Group();
      const puffs = 3 + Math.floor(Math.random() * 4);
      let cx = 0;
      for (let p = 0; p < puffs; p++) {
        const w = 10 + Math.random() * 16;
        const h = 2.5 + Math.random() * 2.5;
        const d = 8 + Math.random() * 12;
        const puff = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.cloudMat);
        puff.position.set(cx, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 8);
        g.add(puff);
        cx += w * 0.55;
      }
      g.position.set((Math.random() - 0.5) * 600, 105 + Math.random() * 45, (Math.random() - 0.5) * 600);
      this.group.add(g);
      this.clouds.push({ group: g, speed: 1.2 + Math.random() * 1.8 });
    }

    // small flocks of birds circling over the city
    for (let f = 0; f < 3; f++) {
      const center = new THREE.Vector3((Math.random() - 0.5) * 160, 0, (Math.random() - 0.5) * 160);
      const n = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const g = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 1.4), this.birdMat);
        const wingL = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 0.7), this.birdMat);
        wingL.geometry.translate(-1, 0, 0);
        const wingR = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 0.7), this.birdMat);
        wingR.geometry.translate(1, 0, 0);
        g.add(body, wingL, wingR);
        this.group.add(g);
        this.birds.push({
          group: g, wingL, wingR, center,
          radius: 14 + Math.random() * 18,
          angle: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 0.25,
          height: 38 + Math.random() * 22,
          flap: Math.random() * 10,
        });
      }
    }
  }

  // time in seconds; starts mid-morning
  update(dt: number, time: number, center: THREE.Vector3, camera: THREE.Camera, corruption = 0): SkyState {
    const phase = ((time / CYCLE) + 0.22) % 1; // 0..1, sunrise near 0
    const theta = phase * Math.PI * 2;
    const elev = Math.sin(theta); // >0 day, <0 night
    const sunDir = this.state.sunDir;
    sunDir.set(Math.cos(theta) * 0.9, elev, 0.35).normalize();

    // blend sky/fog: day -> dusk -> night on sun elevation
    if (elev > 0.25) {
      _sky.copy(DAY_SKY);
      _fog.copy(DAY_FOG);
    } else if (elev > 0) {
      const k = elev / 0.25;
      _sky.lerpColors(DUSK_SKY, DAY_SKY, k);
      _fog.lerpColors(DUSK_FOG, DAY_FOG, k);
    } else if (elev > -0.2) {
      const k = -elev / 0.2;
      _sky.lerpColors(DUSK_SKY, NIGHT_SKY, k);
      _fog.lerpColors(DUSK_FOG, NIGHT_FOG, k);
    } else {
      _sky.copy(NIGHT_SKY);
      _fog.copy(NIGHT_FOG);
    }

    // The seam bleeds over the top of the day/night cycle: near the rift it is
    // always the same dim violet whatever the sun is doing.
    if (corruption > 0.001) {
      _sky.lerp(RIFT_SKY, corruption);
      _fog.lerp(RIFT_FOG, corruption);
    }

    let day = Math.max(0, Math.min(1, elev * 3 + 0.2)); // 0 night .. 1 day
    // the sun stops reaching the ground as the seam takes over
    day *= 1 - corruption * 0.75;
    this.state.sunIntensity = 0.05 + day * 1.3;
    this.state.hemiIntensity = 0.38 + day * 0.9;

    // position sun and moon; hide whichever is below the horizon
    this.sun.position.copy(center).addScaledVector(sunDir, 430);
    this.sun.visible = elev > -0.06;
    this.sun.lookAt(camera.position);
    this.moon.position.copy(center).addScaledVector(sunDir, -430);
    this.moon.visible = elev < 0.06;
    this.moon.lookAt(camera.position);

    // Fuji sits far to the north-west, always the same distance away
    this.fuji.position.set(center.x - 620, -168, center.z - 880);
    this.fuji.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const mat = m.material as THREE.MeshBasicMaterial;
        const base = mat.userData.base ?? (mat.userData.base = mat.color.clone());
        mat.color.copy(base).multiplyScalar(0.3 + day * 0.7);
      }
    });

    // The tear pulses, slowly and out of time with anything else, and burns
    // brighter the closer you get.
    const beat = 0.86 + Math.sin(time * 0.7) * 0.07 + Math.sin(time * 2.3) * 0.03;
    this.rift.scale.set(1 + corruption * 0.35, beat, 1);
    // Billboard it. The tear is built from flat slabs, so without this it
    // thins to nothing when approached from the side — and a hole in the
    // world should look the same from every angle anyway.
    this.rift.rotation.y = Math.atan2(
      camera.position.x - this.rift.position.x,
      camera.position.z - this.rift.position.z,
    );
    this.rift.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const mat = m.material as THREE.MeshBasicMaterial;
        const base = mat.userData.baseOpacity ?? (mat.userData.baseOpacity = mat.opacity);
        mat.opacity = Math.min(1, base * (0.75 + corruption * 0.6) * beat);
      }
    });

    // clouds dim at night
    this.cloudMat.color.setScalar(0.35 + day * 0.65);

    const ashMat = this.ash.material as THREE.PointsMaterial;
    ashMat.opacity = Math.max(0, (corruption - 0.08) * 0.8);
    this.ash.visible = ashMat.opacity > 0.01;
    this.ash.position.set(center.x, center.y, center.z);
    if (this.ash.visible) {
      for (let i = 0; i < this.ashPos.length; i += 3) {
        this.ashPos[i] += dt * (1.4 + corruption * 2.2);
        this.ashPos[i + 1] -= dt * (2.1 + (i % 7) * 0.08);
        if (this.ashPos[i] > 90) this.ashPos[i] = -90;
        if (this.ashPos[i + 1] < 0) this.ashPos[i + 1] = 90;
      }
      (this.ash.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    }

    for (const c of this.clouds) {
      c.group.position.x += c.speed * dt;
      if (c.group.position.x - center.x > 330) c.group.position.x -= 660;
      if (c.group.position.x - center.x < -330) c.group.position.x += 660;
      if (c.group.position.z - center.z > 330) c.group.position.z -= 660;
      if (c.group.position.z - center.z < -330) c.group.position.z += 660;
    }

    // birds circle their flock center; hide them at night (they roost)
    const birdsVisible = day > 0.25;
    for (const b of this.birds) {
      b.group.visible = birdsVisible;
      if (!birdsVisible) continue;
      b.angle += b.speed * dt;
      b.flap += dt * (7 + b.speed * 6);
      const x = center.x + b.center.x + Math.sin(b.angle) * b.radius;
      const z = center.z + b.center.z + Math.cos(b.angle) * b.radius;
      b.group.position.set(x, b.height + Math.sin(b.angle * 3) * 2, z);
      // face along the circle tangent
      b.group.rotation.y = b.angle + Math.PI / 2;
      const w = Math.sin(b.flap) * 0.6;
      b.wingL.rotation.z = w;
      b.wingR.rotation.z = -w;
    }
    return this.state;
  }
}
