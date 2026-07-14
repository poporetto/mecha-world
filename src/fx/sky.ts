// Day/night cycle: orbiting sun + moon, sky/fog color blending, drifting
// voxel clouds. game.ts applies the returned light parameters each frame.

import * as THREE from 'three';

const CYCLE = 300; // seconds for a full day
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

const _sky = new THREE.Color();
const _fog = new THREE.Color();

export class Sky {
  group = new THREE.Group();
  private sun: THREE.Group;
  private moon: THREE.Mesh;
  private clouds: Cloud[] = [];
  private cloudMat: THREE.MeshLambertMaterial;
  private state: SkyState = {
    sunDir: new THREE.Vector3(0.6, 1, 0.35).normalize(),
    sunIntensity: 1.3,
    hemiIntensity: 1.2,
    skyColor: _sky,
    fogColor: _fog,
  };

  constructor() {
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
  }

  // time in seconds; starts mid-morning
  update(dt: number, time: number, center: THREE.Vector3, camera: THREE.Camera): SkyState {
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

    const day = Math.max(0, Math.min(1, elev * 3 + 0.2)); // 0 night .. 1 day
    this.state.sunIntensity = 0.05 + day * 1.3;
    this.state.hemiIntensity = 0.38 + day * 0.9;

    // position sun and moon; hide whichever is below the horizon
    this.sun.position.copy(center).addScaledVector(sunDir, 430);
    this.sun.visible = elev > -0.06;
    this.sun.lookAt(camera.position);
    this.moon.position.copy(center).addScaledVector(sunDir, -430);
    this.moon.visible = elev < 0.06;
    this.moon.lookAt(camera.position);

    // clouds dim at night
    this.cloudMat.color.setScalar(0.35 + day * 0.65);

    for (const c of this.clouds) {
      c.group.position.x += c.speed * dt;
      if (c.group.position.x - center.x > 330) c.group.position.x -= 660;
      if (c.group.position.x - center.x < -330) c.group.position.x += 660;
      if (c.group.position.z - center.z > 330) c.group.position.z -= 660;
      if (c.group.position.z - center.z < -330) c.group.position.z += 660;
    }
    return this.state;
  }
}
