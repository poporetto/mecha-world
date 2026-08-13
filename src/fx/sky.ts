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
const _WHITE = new THREE.Color(0xffffff);
const DAY_SKY = new THREE.Color(0xa5d5f5);
const DAY_FOG = new THREE.Color(0xc3e4f8);
const DUSK_SKY = new THREE.Color(0xf2b48c);
const DUSK_FOG = new THREE.Color(0xf6cba4);
const NIGHT_SKY = new THREE.Color(0x101832);
const NIGHT_FOG = new THREE.Color(0x1b2544);

/**
 * A cumulus built out of cubes on a lattice, the way a voxel game would draw
 * one. A single stretched box reads as a slab; what sells a cloud is the
 * stepped silhouette you get when you fill overlapping ellipsoid lobes with
 * same-sized cubes and let the edges fall where the lattice says they do.
 *
 * `cell` is the cube edge, `lobes` the blobs that make up the mass. Cubes are
 * merged into one geometry so a hundred-cube cloud is still one draw call.
 */
function voxelCloud(
  cell: number,
  lobes: { x: number; y: number; z: number; rx: number; ry: number; rz: number }[],
  mat: THREE.Material,
  seed = 1,
  /** Per-cube alpha from local height, baked into vertex colours. */
  fade?: (y: number) => number,
): THREE.Mesh {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const l of lobes) {
    minX = Math.min(minX, l.x - l.rx); maxX = Math.max(maxX, l.x + l.rx);
    minY = Math.min(minY, l.y - l.ry); maxY = Math.max(maxY, l.y + l.ry);
    minZ = Math.min(minZ, l.z - l.rz); maxZ = Math.max(maxZ, l.z + l.rz);
  }
  const geos: THREE.BufferGeometry[] = [];
  // one cube geometry, cloned and offset — cheaper than building each from new
  const unit = new THREE.BoxGeometry(cell * 1.02, cell * 1.02, cell * 1.02);
  const rnd = (a: number, b: number, c: number) => {
    const v = Math.sin(a * 12.9898 + b * 78.233 + c * 37.719 + seed * 4.1) * 43758.5453;
    return v - Math.floor(v);
  };
  const solid = (x: number, y: number, z: number): boolean => {
    let d = 0;
    for (const l of lobes) {
      const dx = (x - l.x) / l.rx, dy = (y - l.y) / l.ry, dz = (z - l.z) / l.rz;
      d = Math.max(d, 1 - (dx * dx + dy * dy + dz * dz));
    }
    // jitter the threshold so the rim crumbles instead of reading as a clean
    // ellipsoid staircase
    return d >= 0.06 + rnd(x, y, z) * 0.22;
  };
  for (let x = minX; x <= maxX; x += cell) {
    for (let y = minY; y <= maxY; y += cell) {
      for (let z = minZ; z <= maxZ; z += cell) {
        if (!solid(x, y, z)) continue;
        // shell only — a cube buried on all six sides is never seen, and
        // these clouds are semi-transparent so interiors would only muddy it
        if (solid(x + cell, y, z) && solid(x - cell, y, z)
         && solid(x, y + cell, z) && solid(x, y - cell, z)
         && solid(x, y, z + cell) && solid(x, y, z - cell)) continue;
        const g = unit.clone();
        g.translate(x, y, z);
        if (fade) {
          const a = fade((y - minY) / Math.max(1e-3, maxY - minY));
          if (a <= 0.02) { g.dispose(); continue; }
          const n = g.getAttribute('position').count;
          const col = new Float32Array(n * 4);
          for (let i = 0; i < n; i++) { col[i * 4] = 1; col[i * 4 + 1] = 1; col[i * 4 + 2] = 1; col[i * 4 + 3] = a; }
          g.setAttribute('color', new THREE.BufferAttribute(col, 4));
        }
        geos.push(g);
      }
    }
  }
  unit.dispose();
  const merged = mergeGeometries(geos);
  for (const g of geos) g.dispose();
  return new THREE.Mesh(merged, mat);
}

/** Minimal geometry merge — avoids pulling in the addons build. */
function mergeGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const out = new THREE.BufferGeometry();
  if (!geos.length) return out;
  let vTotal = 0, iTotal = 0;
  for (const g of geos) {
    vTotal += g.getAttribute('position').count;
    iTotal += g.getIndex()!.count;
  }
  const hasColor = !!geos[0].getAttribute('color');
  const pos = new Float32Array(vTotal * 3);
  const nor = new Float32Array(vTotal * 3);
  const col = hasColor ? new Float32Array(vTotal * 4) : null;
  const idx = new Uint32Array(iTotal);
  let vo = 0, io = 0;
  for (const g of geos) {
    const gp = g.getAttribute('position') as THREE.BufferAttribute;
    const gn = g.getAttribute('normal') as THREE.BufferAttribute;
    const gi = g.getIndex()!;
    pos.set(gp.array as Float32Array, vo * 3);
    nor.set(gn.array as Float32Array, vo * 3);
    if (col) col.set(g.getAttribute('color').array as Float32Array, vo * 4);
    for (let i = 0; i < gi.count; i++) idx[io + i] = gi.getX(i) + vo;
    vo += gp.count; io += gi.count;
  }
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  if (col) out.setAttribute('color', new THREE.BufferAttribute(col, 4));
  out.setIndex(new THREE.BufferAttribute(idx, 1));
  out.computeBoundingSphere();
  return out;
}

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
  private cloudMat: THREE.MeshBasicMaterial;
  private cirrusMat: THREE.MeshBasicMaterial;
  private ash: THREE.Points;
  /** Low cloud ring at the streaming edge, so the world does not just stop. */
  private haze!: THREE.Group;
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

    // A bank of cloud around the base. Fuji is pinned at y=-168 so its cone
    // reads correctly from the ground, but once the player is flying they can
    // see where it meets the sea and it looks like it is standing in the
    // water. Cloud hides the join the way haze does in every photograph of it.
    const cloudMat = () => new THREE.MeshBasicMaterial({
      color: 0xf2f6fb, fog: false, transparent: true, opacity: 0.85, depthWrite: false,
      vertexColors: true,
    });
    // The bank should thin out downwards rather than stop at a flat underside:
    // cloud sitting on a mountain's skirt dissolves into the haze below it.
    const underFade = (t: number) => Math.min(1, Math.pow(Math.max(0, t), 1.35) * 1.25 + 0.04);
    const CELL = R * 0.045;
    const bank = (i: number, count: number, phase: number, y: number, rad: number, span: number, seed: number) => {
      const a2 = (i / count) * Math.PI * 2 + phase;
      const rr = R * rad;
      const lobes = [];
      const n = 3;
      for (let l = 0; l < n; l++) {
        const mid = 1 - Math.abs(l - (n - 1) / 2) / n;
        lobes.push({
          x: (l - (n - 1) / 2) * span * 0.8, y: mid * span * 0.16, z: Math.sin(i + l) * span * 0.12,
          rx: span * 0.55, ry: span * (0.16 + mid * 0.12), rz: span * 0.30,
        });
      }
      const m = voxelCloud(CELL, lobes, cloudMat(), seed + i, underFade);
      m.position.set(Math.sin(a2) * rr, y, Math.cos(a2) * rr);
      m.rotation.y = -a2;
      g.add(m);
    };
    // Both bands sit down on the skirt — the mountain is 250 tall, so anything
    // above ~50 hangs across the cone instead of collaring its foot. The
    // radius tracks the cone: at this height it is still close to full width.
    for (let i = 0; i < 22; i++) {
      bank(i, 22, Math.sin(i * 3.1) * 0.18, 34 + Math.sin(i * 1.3) * 9,
           0.93 + Math.sin(i * 2.3) * 0.07, R * 0.30, 11);
    }
    // a second, lower and wider band so the waterline is fully occluded
    for (let i = 0; i < 16; i++) {
      bank(i, 16, 0.4, 12 + Math.sin(i * 2.1) * 6, 1.07 + Math.sin(i * 1.9) * 0.08, R * 0.38, 57);
    }
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

    // Same material as the Fuji banks: unlit and pale. A lit material makes
    // these read as dark olive slabs at night instead of cloud.
    this.cloudMat = new THREE.MeshBasicMaterial({
      color: 0xf2f6fb, fog: false, transparent: true, opacity: 0.85, depthWrite: false,
    });
    // High cirrus is barely there — at full opacity it reads as a second deck
    // of cumulus sitting impossibly high.
    this.cirrusMat = new THREE.MeshBasicMaterial({
      color: 0xf6f9ff, fog: false, transparent: true, opacity: 0.4, depthWrite: false,
    });
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
    // A real sky is not one kind of cloud scattered evenly at one height. It
    // is layered — flat sheets low down, heaped cumulus in the middle, torn
    // wisps up high — and it is clumped, with wide clear gaps between groups.
    // The old field was sixteen identical cumulus at uniformly random points
    // in one 45-unit altitude band, which is why it read as decoration rather
    // than weather.
    //
    // Clumping comes from picking a handful of weather centres and scattering
    // around them, so the gaps between groups are as much of the composition
    // as the clouds are.
    const centres = Array.from({ length: 4 }, () => ({
      x: (Math.random() - 0.5) * 620,
      z: (Math.random() - 0.5) * 620,
    }));
    type Kind = 'stratus' | 'cumulus' | 'cirrus';
    const plan: Kind[] = [
      'stratus', 'stratus', 'stratus', 'stratus', 'stratus',
      'cumulus', 'cumulus', 'cumulus', 'cumulus', 'cumulus', 'cumulus', 'cumulus',
      'cirrus', 'cirrus', 'cirrus', 'cirrus', 'cirrus', 'cirrus',
    ];
    for (let i = 0; i < plan.length; i++) {
      const kind = plan[i];
      const g = new THREE.Group();
      const lobes: { x: number; y: number; z: number; rx: number; ry: number; rz: number }[] = [];
      let cx = 0;
      let cell = 2.4;
      let y = 0;

      if (kind === 'stratus') {
        // wide, flat, low: a sheet with a soft ragged edge
        cell = 3.2;
        y = 74 + Math.random() * 16;
        const n = 4 + Math.floor(Math.random() * 3);
        for (let l = 0; l < n; l++) {
          const rx = 13 + Math.random() * 10;
          lobes.push({
            x: cx, y: (Math.random() - 0.5) * 3, z: (Math.random() - 0.5) * 14,
            rx, ry: 2.6 + Math.random() * 1.8, rz: 10 + Math.random() * 8,
          });
          cx += rx * 1.05;
        }
      } else if (kind === 'cumulus') {
        // heaped and tall, flat-bottomed: lobes rise towards the middle
        cell = 2.4;
        y = 106 + Math.random() * 40;
        const n = 3 + Math.floor(Math.random() * 3);
        for (let l = 0; l < n; l++) {
          const mid = 1 - Math.abs(l - (n - 1) / 2) / n;
          const rx = 7 + Math.random() * 6;
          lobes.push({
            // the base stays level and the mass piles upward, which is what
            // makes a cumulus read as a cumulus
            x: cx, y: mid * 5 + Math.random() * 1.5, z: (Math.random() - 0.5) * 5,
            rx, ry: 4 + mid * 7 + Math.random() * 2, rz: 6 + Math.random() * 4,
          });
          cx += rx * 1.15;
        }
      } else {
        // high, thin, stretched: torn streaks well above the cumulus deck
        cell = 2.8;
        y = 168 + Math.random() * 55;
        const n = 3 + Math.floor(Math.random() * 3);
        for (let l = 0; l < n; l++) {
          const rx = 16 + Math.random() * 14;
          lobes.push({
            x: cx, y: (Math.random() - 0.5) * 4, z: (Math.random() - 0.5) * 6,
            rx, ry: 1.7 + Math.random() * 1.2, rz: 3.5 + Math.random() * 3,
          });
          cx += rx * (0.85 + Math.random() * 0.4);
        }
      }

      const mat = kind === 'cirrus' ? this.cirrusMat : this.cloudMat;
      g.add(voxelCloud(cell, lobes, mat, i + 1));
      const c = centres[i % centres.length];
      // scatter tightly around a weather centre, not across the whole sky
      g.position.set(
        c.x + (Math.random() - 0.5) * 260,
        y,
        c.z + (Math.random() - 0.5) * 260,
      );
      g.rotation.y = Math.random() * Math.PI * 2;
      this.group.add(g);
      // One wind, and the higher layers ride it faster — that shear is most of
      // what makes a sky look alive rather than a slideshow.
      const shear = kind === 'cirrus' ? 2.4 : kind === 'cumulus' ? 1 : 0.55;
      this.clouds.push({ group: g, speed: (1.1 + Math.random() * 0.7) * shear });
    }

    // A ring of low cloud out at the streaming boundary. Terrain simply stops
    // being generated past the view distance, and from the air that edge is
    // visible as a hard rim of nothing — this gives the horizon something to
    // dissolve into, the same job the fog does at ground level.
    this.haze = new THREE.Group();
    for (let i = 0; i < 44; i++) {
      const a2 = (i / 44) * Math.PI * 2;
      const rr = 430 + Math.sin(i * 2.7) * 40;
      const bank = new THREE.Group();
      const lobes = [];
      for (let p = 0; p < 3; p++) {
        lobes.push({
          x: (p - 1) * 44, y: Math.sin(i * 2.1 + p) * 7, z: Math.sin(i + p * 2) * 12,
          rx: 34 + Math.sin(i + p) * 10, ry: 9 + Math.sin(i * 1.7 + p) * 4, rz: 22,
        });
      }
      bank.add(voxelCloud(10, lobes, new THREE.MeshBasicMaterial({
        color: 0xdceaf6, fog: false, transparent: true,
        opacity: 0.34 + Math.sin(i * 1.3) * 0.08, depthWrite: false,
      }), i + 101));
      bank.position.set(Math.sin(a2) * rr, 16 + Math.sin(i * 1.9) * 14, Math.cos(a2) * rr);
      bank.rotation.y = -a2;
      this.haze.add(bank);
    }
    this.haze.renderOrder = -1;
    this.group.add(this.haze);

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

    // clouds take the sky's own colour rather than darkening to grey, so at
    // night they read as pale cloud lit by the sky, not black slabs
    this.cloudMat.color.copy(_fog).lerp(_WHITE, 0.45 + day * 0.35);
    this.cirrusMat.color.copy(_fog).lerp(_WHITE, 0.55 + day * 0.3);

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

    // the boundary haze rides with the player and takes the sky's colour, so
    // it reads as distance rather than as a wall of white at dusk or night
    this.haze.position.set(center.x, 0, center.z);
    this.haze.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.color.copy(_fog).lerp(_sky, 0.35);
    });

    // A single prevailing wind, slightly off-axis so the drift is not a
    // perfectly straight line across the screen.
    const WIND_X = 0.94, WIND_Z = 0.34;
    for (const c of this.clouds) {
      c.group.position.x += c.speed * WIND_X * dt;
      c.group.position.z += c.speed * WIND_Z * dt;
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
