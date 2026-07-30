// Procedural Neo-Tokyo generator. Pure functions — the same (x,z) always
// yields the same column, which is what makes the world infinite: chunks are
// generated on demand as the player moves.

import { B } from './blocks';
import { fbm, hash2, hash3 } from './noise';

export const CS = 32; // chunk size (x,z)
export const H = 96; // world height

export const CELL = 26; // city grid cell (road-to-road)
export const ROAD_W = 5;

// Region layout. The city sits around the origin; the land climbs into
// mountains to the west and falls away to the bay in the south-east.
const MOUNTAIN_X = -230;   // west of here the ground starts rising
const MOUNTAIN_RAMP = 190; // how far inland the range takes to reach full height
const OCEAN_Z = 205;       // south of here is open water
const SHORE_BAND = 34;     // width of the port/waterfront strip
const SUMMIT_Y = 54;       // levelled platform height for the mountain temple

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/**
 * Where the population is sheltering. Losing one of these ends the run.
 *
 * Spread right across the districts rather than clustered around the middle,
 * so holding the line is a real logistical problem and wrecking the outskirts
 * has consequences. Placed clear of the river channel, the mountain ramp and
 * the port strip, and kept off the north-east bearing so none of them sit in
 * the rift's corruption during Act I.
 */
export const SHELTER_SITES = [
  { x: 255, z: 55, name: 'EAST WARD' },
  { x: -155, z: 150, name: 'SOUTH WARD' },
  { x: 65, z: -110, name: 'RIVERSIDE' },
  { x: -30, z: -250, name: 'NORTH GATE' },
  { x: -200, z: -30, name: 'WEST RIDGE' },
];

/** Where the mecha deploys from and returns to. */
export const BASE_SITE = { x: 0, z: 0 };

/**
 * The tear itself, out past the bay. Act II is the walk to this point, so it
 * is deliberately far — roughly three times the width of the city core — and
 * it is rendered without fog so it stays on the horizon the whole way rather
 * than fading in at the last minute.
 */
export const RIFT_SITE = { x: 520, z: -560 };

/** How far the rift's influence reaches. Beyond this the city is untouched. */
const RIFT_REACH = 820;

/**
 * How far gone a point is, 0 (clean city) to 1 (the seam). This single scalar
 * drives the sky, the ground, enemy density and the music, so the approach is
 * felt continuously instead of stepping at chapter boundaries.
 */
export function corruptionAt(x: number, z: number): number {
  const d = Math.hypot(x - RIFT_SITE.x, z - RIFT_SITE.z);
  const t = Math.max(0, Math.min(1, 1 - d / RIFT_REACH));
  // eased so home base reads as completely clean and it ramps late
  return Math.pow(t, 1.6);
}

// ---------------------------------------------------------------- landmarks

interface Landmark {
  x: number;
  z: number;
  r: number; // half-size of cleared plaza square
  /** Surface under the landmark. Defaults to paved plaza. */
  ground?: (dx: number, dz: number) => number;
  build: (dx: number, dz: number, set: (y: number, id: number) => void) => void;
}

// Red lattice broadcast tower (Tokyo Tower homage)
function buildTower(dx: number, dz: number, set: (y: number, id: number) => void) {
  const HT = 62;
  for (let y = 1; y <= HT; y++) {
    const t = y / HT;
    const w = Math.max(2, Math.round(13 * (1 - t * t)));
    const ax = Math.abs(dx), az = Math.abs(dz);
    if (ax <= w && az <= w) {
      const onRing = ax === w || az === w;
      const corner = ax === w && az === w;
      const deckColor = y >= 24 && y <= 30 ? B.White : B.Red;
      if (onRing && (corner || y % 3 === 0 || mod(dx + dz + y, 4) === 0)) set(y, deckColor);
      // observation decks (solid)
      if (y >= 24 && y <= 27 && ax <= w && az <= w) set(y, B.White);
      if (y >= 45 && y <= 47 && ax <= w && az <= w) set(y, B.Red);
    }
  }
  if (dx === 0 && dz === 0) {
    for (let y = HT; y <= HT + 12; y++) set(y, y % 2 === 0 ? B.Red : B.White);
  }
}

// Tall white lattice spire (Skytree homage)
function buildSpire(dx: number, dz: number, set: (y: number, id: number) => void) {
  const HS = 78;
  const d = Math.sqrt(dx * dx + dz * dz);
  for (let y = 1; y <= HS; y++) {
    const t = y / HS;
    const r = 7.2 * (1 - t) + 2.2;
    if (Math.abs(d - r) < 0.75) {
      if (y % 2 === 0 || mod(dx * 3 + dz * 5 + y, 3) !== 0) {
        set(y, hash3(dx, y, dz) < 0.25 ? B.Glass : B.White);
      }
    }
    if (y >= 34 && y <= 37 && d <= r + 2) set(y, B.White);
    if (y >= 62 && y <= 64 && d <= r + 1.5) set(y, B.NeonCyan);
  }
  if (dx === 0 && dz === 0) {
    for (let y = HS; y <= HS + 14; y++) set(y, B.White);
  }
}

// Row of red torii gates in the park
function buildTorii(dx: number, dz: number, set: (y: number, id: number) => void) {
  for (let g = -1; g <= 1; g++) {
    const gx = g * 10;
    if (dz === 0 && (dx === gx - 3 || dx === gx + 3)) {
      for (let y = 1; y <= 7; y++) set(y, B.Red);
    }
    if (dz === 0 && dx >= gx - 4 && dx <= gx + 4) set(8, B.Red);
    if (dz === 0 && dx >= gx - 5 && dx <= gx + 5) set(9, B.Red);
  }
}

// Five-tier red pagoda on a stone base (Senso-ji / Toji homage)
function buildTemple(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);
  // stone podium
  if (ax <= 9 && az <= 9) set(1, B.Sidewalk);
  if (ax <= 8 && az <= 8) set(2, B.Wood);
  const tiers = 5;
  let y = 3;
  for (let t = 0; t < tiers; t++) {
    const body = 5 - t * 0.6;
    const eave = body + 1.6;
    const bh = 3; // body height per tier
    // wooden body: red pillars + white walls
    for (let by = 0; by < bh; by++) {
      if (ax <= body && az <= body) {
        const onEdge = ax >= body - 1 || az >= body - 1;
        set(y + by, onEdge ? B.Red : B.White);
      }
    }
    y += bh;
    // flared terracotta roof (one flat overhanging slab + upturned rim)
    if (ax <= eave && az <= eave) set(y, B.TempleRoof);
    if ((ax <= eave && az <= eave) && (ax >= eave - 1 || az >= eave - 1)) set(y + 1, B.TempleRoof);
    y += 1;
  }
  // golden finial spire
  if (dx === 0 && dz === 0) {
    for (let i = 0; i < 6; i++) set(y + i, B.Gold);
  }
}

// Hilltop shrine: torii approach, stone steps and a wide-eaved worship hall.
function buildShrine(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);
  // stone terrace, stepped up toward the hall
  if (ax <= 11 && az <= 11) set(1, B.Sidewalk);
  if (ax <= 9 && az <= 9) set(2, B.Sidewalk);
  // approach torii at the south edge
  if (dz >= 8 && dz <= 9) {
    if (dx === -3 || dx === 3) for (let y = 3; y <= 8; y++) set(y, B.Red);
    if (ax <= 4) set(9, B.Red);
    if (ax <= 5) set(10, B.Red);
  }
  // worship hall: wooden body, red posts, big terracotta roof
  if (ax <= 6 && az <= 5) {
    for (let y = 3; y <= 7; y++) {
      const post = (ax === 6 || az === 5) && mod(dx + dz, 3) === 0;
      set(y, post ? B.Red : B.Wood);
    }
  }
  if (ax <= 8 && az <= 7) set(8, B.TempleRoof);
  if (ax <= 7 && az <= 6) set(9, B.TempleRoof);
  if (ax <= 5 && az <= 4) set(10, B.TempleRoof);
  // gold ridge ornament
  if (az <= 1 && ax <= 4) set(11, B.Gold);
  // stone lanterns flanking the steps
  if ((dx === -7 || dx === 7) && dz === 6) {
    for (let y = 3; y <= 4; y++) set(y, B.Sidewalk);
    set(5, B.Lantern);
    set(6, B.Sidewalk);
  }
}

// Moated castle keep with stacked white tiers (Himeji / Edo castle homage).
function buildCastle(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);
  // sloped stone base
  for (let y = 1; y <= 6; y++) {
    const w = 13 - y;
    if (ax <= w && az <= w) set(y, B.Sidewalk);
  }
  // three white tiers, each with a dark tiled roof
  let y = 7;
  for (let t = 0; t < 3; t++) {
    const body = 8 - t * 2;
    for (let by = 0; by < 4; by++) {
      if (ax <= body && az <= body) {
        const wall = (ax >= body - 1 || az >= body - 1);
        set(y + by, wall ? B.White : B.WallGray);
      }
    }
    y += 4;
    const eave = body + 1.5;
    if (ax <= eave && az <= eave) set(y, B.TempleRoof);
    y += 1;
  }
  // golden roof ornaments
  if (ax <= 1 && az <= 1) { set(y, B.Gold); set(y + 1, B.Gold); }
}

// Rainbow Bridge: white double-deck suspension span on twin portal towers,
// with the coloured lighting strip that gives it its name.
function buildBayBridge(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);
  const TOWER = 11;   // towers stand this far either side of centre
  const TOP = 30;     // tower height
  const UPPER = 15;   // expressway deck
  const LOWER = 10;   // road + rail deck

  // both decks run the full span
  if (az <= 4) {
    set(LOWER, B.BridgeDeck);
    set(UPPER, B.BridgeDeck);
    if (az === 4) {
      set(LOWER + 1, B.White);
      set(UPPER + 1, B.White);
      // the rainbow strip along the outer edge
      const band = mod(Math.floor((dx + 90) / 5), 3);
      set(UPPER + 2, band === 0 ? B.NeonPink : band === 1 ? B.NeonCyan : B.Lantern);
    }
  }

  // portal towers: two legs joined by cross beams above the decks
  if (ax === TOWER && az <= 4) {
    for (let y = 1; y <= TOP; y++) set(y, B.White);
  }
  if (ax === TOWER && az <= 4 && (az === 4 || az === 0)) set(TOP, B.White);
  if (ax === TOWER) {
    // cross bracing between the legs
    if (az <= 4 && (Math.abs(UPPER + 6 - 0) >= 0)) { set(UPPER + 6, B.White); set(TOP - 2, B.White); }
  }

  // main cables sweeping between the towers and down to the anchorages
  if (az === 4 && ax <= TOWER) {
    const t = ax / TOWER;
    set(Math.round(TOP - (TOP - UPPER - 3) * (1 - t * t)), B.Steel);
  }
  // hangers dropping from the cable to the upper deck
  if (az === 4 && ax < TOWER && mod(dx, 3) === 0) {
    const t = ax / TOWER;
    const cable = Math.round(TOP - (TOP - UPPER - 3) * (1 - t * t));
    for (let y = UPPER + 2; y < cable; y++) set(y, B.Steel);
  }
  // piers carrying the deck down to the water
  if (az <= 3 && mod(dx, 9) === 0) for (let y = 1; y < LOWER; y++) set(y, B.WallGray);
}

// A pagoda perched on a levelled summit platform, reached by stone steps.
function buildSummitTemple(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);
  // carve a flat rock terrace out of the peak
  const base = SUMMIT_Y;
  for (let y = 0; y <= base; y++) {
    if (ax <= 12 && az <= 12) set(y, y === base ? B.Sidewalk : B.Stone);
  }
  // stone stair climbing the south face
  if (ax <= 2 && dz > 6) {
    for (let y = 0; y <= base; y++) set(y, B.Stone);
  }
  // torii at the head of the steps
  if (dz === 7 && (dx === -3 || dx === 3)) for (let y = 1; y <= 5; y++) set(base + y, B.Red);
  if (dz === 7 && ax <= 4) set(base + 6, B.Red);
  // three-tier pagoda on the terrace
  let y = base + 1;
  for (let t = 0; t < 3; t++) {
    const body = 4.5 - t * 0.8;
    for (let by = 0; by < 3; by++) {
      if (ax <= body && az <= body) {
        set(y + by, (ax >= body - 1 || az >= body - 1) ? B.Red : B.White);
      }
    }
    y += 3;
    const eave = body + 1.5;
    if (ax <= eave && az <= eave) set(y, B.TempleRoof);
    y += 1;
  }
  if (dx === 0 && dz === 0) for (let i = 0; i < 5; i++) set(y + i, B.Gold);
  // stone lanterns flanking the terrace
  if ((dx === -8 || dx === 8) && az <= 1) { set(base + 1, B.Stone); set(base + 2, B.Lantern); }
}

// Shibuya scramble: a wide crossing with diagonal stripes, ringed by towers
// wearing floor-to-roof screens and a curved glass department store.
function buildShibuya(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);

  // the crossing itself — straight bars plus the famous diagonals
  if (ax <= 11 && az <= 11) {
    const straight = (az <= 9 && mod(dx, 2) === 0 && ax > 5) || (ax <= 9 && mod(dz, 2) === 0 && az > 5);
    const diagonal = Math.abs(ax - az) <= 1 && mod(dx + dz, 2) === 0;
    set(0, straight || diagonal ? B.RoadLine : B.Road);
    return;
  }

  // ring of screen towers around the junction
  const block = ax > 12 && az > 12;
  if (block) {
    const lx = mod(dx + 100, 11), lz = mod(dz + 100, 11);
    if (lx < 9 && lz < 9) {
      const h = 20 + ((Math.abs(dx * 7 + dz * 3) % 5) * 6);
      const face = lx === 0 || lz === 0 || lx === 8 || lz === 8;
      for (let y = 1; y <= h; y++) {
        if (!face) { set(y, B.WallGray); continue; }
        // giant billboards on the lower storeys, windows above
        if (y < 14) {
          const band = Math.floor(y / 4);
          set(y, band % 3 === 0 ? B.NeonPink : band % 3 === 1 ? B.NeonCyan : B.WindowLit);
        } else {
          set(y, y % 4 === 1 ? B.WallGray : B.Window);
        }
      }
      set(h + 1, B.Roof);
      // rooftop signage catching the light
      if (lx === 4 && lz === 4) { set(h + 2, B.NeonPink); set(h + 3, B.NeonPink); }
    }
  }

  // curved glass department store on one corner
  const cx = dx + 15, cz = dz - 15;
  const rr = Math.sqrt(cx * cx + cz * cz);
  if (rr > 6 && rr < 8.5) {
    for (let y = 1; y <= 26; y++) set(y, y % 5 === 0 ? B.White : B.Glass);
    set(27, B.White);
  }
}

// Senso-ji at Asakusa: the Kaminarimon gate with its great red lantern, the
// Nakamise shopping street, the main hall, and the five-storey pagoda.
function buildAsakusa(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx);

  // Kaminarimon — the outer gate, at the south end of the approach
  if (dz >= 15 && dz <= 17) {
    if (ax === 6) for (let y = 1; y <= 11; y++) set(y, B.Red);
    if (ax <= 7) { set(12, B.Red); set(13, B.TempleRoof); }
    if (ax <= 8) set(14, B.TempleRoof);
    // the lantern hanging in the middle of the gate
    if (ax <= 2 && dz === 16) for (let y = 5; y <= 9; y++) set(y, ax <= 1 ? B.Red : B.Lantern);
  }

  // Nakamise-dori — a covered shopping lane running up to the temple
  if (dz > -2 && dz < 15 && ax <= 5) {
    set(0, B.Sidewalk);
    if (ax === 5) {
      for (let y = 1; y <= 4; y++) set(y, B.Wood);
      set(5, B.TempleRoof);
    }
    // paper lanterns strung along the lane
    if (ax === 4 && mod(dz, 3) === 0) set(4, B.Lantern);
  }

  // main hall on a raised stone platform
  if (ax <= 10 && dz >= -12 && dz <= -3) {
    set(1, B.Sidewalk);
    set(2, B.Wood);
    const wall = ax === 10 || dz === -12 || dz === -3;
    for (let y = 3; y <= 9; y++) set(y, wall ? B.Red : B.White);
    set(10, B.TempleRoof);
    if (ax <= 9 && dz >= -11 && dz <= -4) set(11, B.TempleRoof);
    if (ax <= 6 && dz >= -9 && dz <= -6) set(12, B.TempleRoof);
    if (ax <= 1 && dz >= -9 && dz <= -6) set(13, B.Gold);
  }

  // five-storey pagoda off to one side
  const px = dx + 14, pz = dz + 4;
  const pax = Math.abs(px), paz = Math.abs(pz);
  if (pax <= 6 && paz <= 6) {
    let y = 1;
    for (let t = 0; t < 5; t++) {
      const body = 3.4 - t * 0.4;
      for (let by = 0; by < 3; by++) {
        if (pax <= body && paz <= body) set(y + by, (pax >= body - 1 || paz >= body - 1) ? B.Red : B.White);
      }
      y += 3;
      const eave = body + 1.6;
      if (pax <= eave && paz <= eave) set(y, B.TempleRoof);
      y += 1;
    }
    if (pax === 0 && paz === 0) for (let i = 0; i < 5; i++) set(y + i, B.Gold);
  }
}

// Tokyo Station: long red-brick facade with domed pavilions at each end.
function buildStation(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);
  if (ax <= 20 && az <= 6) {
    const wall = az === 6 || ax === 20;
    for (let y = 1; y <= 9; y++) {
      // brick with pale stone banding and arched windows
      const band = y === 4 || y === 8;
      set(y, band ? B.White : (wall && mod(dx + y, 3) === 0 ? B.Window : B.WallBrick));
    }
    set(10, B.Roof);
  }
  // domed pavilions at both ends and over the centre
  for (const cx of [-14, 0, 14]) {
    const ox = dx - cx;
    const d = Math.sqrt(ox * ox + dz * dz);
    const big = cx === 0;
    const rad = big ? 7 : 5.5;
    if (d <= rad) {
      const dome = Math.round(Math.sqrt(Math.max(0, rad * rad - d * d)));
      for (let y = 10; y <= 10 + dome; y++) set(y, y === 10 + dome ? B.Roof : B.WallBrick);
      if (d < 1) set(11 + dome, B.Gold);
    }
  }
}

// HOME BASE — the launch pad the suit deploys from and returns to. A marked
// pad ringed with lights, a hangar with an open bay, a control tower and
// fuel drums.
export function buildBase(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);

  // circular landing pad with cross markings and a lit rim
  const d = Math.sqrt(dx * dx + dz * dz);
  if (d <= 13) {
    const ring = d > 11.4;
    const cross = (ax <= 1 && az <= 9) || (az <= 1 && ax <= 9);
    const inner = Math.abs(d - 7.5) < 0.7;
    set(0, ring || cross || inner ? B.RoadLine : B.Plaza);
    // pad edge lights
    if (ring && mod(Math.round(Math.atan2(dz, dx) * 8), 3) === 0) set(1, B.Lantern);
    return;
  }

  // hangar to the north: side walls, roof, and an open bay facing the pad
  if (dz < -14 && dz > -30 && ax <= 15) {
    const wall = ax === 15 || dz === -29;
    const bayMouth = dz === -15 && ax <= 9;
    if (!bayMouth) {
      for (let y = 1; y <= 13; y++) {
        if (wall) set(y, y % 5 === 0 ? B.Steel : B.WallGray);
        else if (dz === -15) set(y, y > 10 ? B.Steel : B.Air); // lintel over the mouth
      }
      if (ax <= 15) set(14, B.Roof);
      if (ax <= 15 && mod(dx, 4) === 0) set(15, B.Steel); // roof ribs
    }
    // service lighting inside the bay
    if (bayMouth && mod(dx, 4) === 0) set(12, B.Lantern);
  }

  // control tower on the east side, glazed cab on top
  const tx = dx - 20, tz = dz + 6;
  if (Math.abs(tx) <= 3 && Math.abs(tz) <= 3) {
    for (let y = 1; y <= 18; y++) set(y, B.WallGray);
    for (let y = 19; y <= 22; y++) set(y, B.Glass);
    set(23, B.Roof);
    if (tx === 0 && tz === 0) { set(24, B.Pole); set(25, B.LightRed); }
  }

  // fuel drums and crates along the west apron
  if (dx < -16 && dx > -26 && az < 10) {
    if (mod(dx, 3) === 0 && mod(dz, 4) === 0) {
      for (let y = 1; y <= 3; y++) set(y, B.Crate);
      set(4, B.Steel);
    }
  }
}

// CIVILIAN SHELTER — a hardened bunker the population is packed into. These
// are what the whole campaign is actually defending.
export function buildShelter(dx: number, dz: number, set: (y: number, id: number) => void) {
  const ax = Math.abs(dx), az = Math.abs(dz);

  // sloped blast berm around the structure
  if (ax <= 13 && az <= 13 && (ax > 9 || az > 9)) {
    const h = 13 - Math.max(ax, az);
    for (let y = 1; y <= Math.max(1, h); y++) set(y, B.Stone);
    return;
  }

  // main bunker: thick concrete, low and wide
  if (ax <= 9 && az <= 9) {
    for (let y = 1; y <= 7; y++) {
      const shell = ax === 9 || az === 9;
      set(y, shell ? B.WallGray : B.Plaza);
    }
    set(8, B.Steel);
    if (ax <= 7 && az <= 7) set(9, B.Steel);
    // green cross on the roof so it reads as a refuge from the air
    if ((ax <= 1 && az <= 5) || (az <= 1 && ax <= 5)) set(10, B.Grass);
    // lit vents and doorway
    if (az === 9 && ax <= 2) { set(1, B.Lantern); set(2, B.Lantern); }
    if (ax === 9 && mod(dz, 4) === 0) set(6, B.WindowLit);
  }
}

export const LANDMARKS: Landmark[] = [
  { x: 55, z: -45, r: 17, build: buildTower },
  { x: -70, z: -100, r: 15, build: buildSpire },
  { x: 6, z: 58, r: 16, build: buildTorii, ground: (_dx, dz) => (Math.abs(dz) <= 1 ? B.Sand : B.Grass) },
  { x: -40, z: 70, r: 13, build: buildTemple },
  { x: 96, z: 74, r: 14, build: buildShrine },
  { x: -128, z: 24, r: 16, build: buildCastle },
  { x: 120, z: -166, r: 14, build: buildBayBridge },
  { x: -152, z: -128, r: 13, build: buildTemple },
  { x: 150, z: 40, r: 14, build: buildShrine },
  { x: -352, z: -46, r: 15, build: buildSummitTemple },
  // iconic Tokyo, scattered across the districts
  { x: -96, z: -34, r: 24, build: buildShibuya, ground: () => B.Road },
  { x: 132, z: 118, r: 22, build: buildAsakusa, ground: () => B.Plaza },
  { x: -14, z: -118, r: 23, build: buildStation },
  { x: -190, z: 196, r: 26, build: buildBayBridge, ground: () => B.Water },
  // home base — the suit launches and redeploys from here
  { x: 0, z: 0, r: 30, build: buildBase },
  // civilian shelters, spread across the districts
  ...SHELTER_SITES.map((p) => ({ x: p.x, z: p.z, r: 15, build: buildShelter })),
];

// ------------------------------------------------------------- column logic

const enum ColKind { Road, Sidewalk, Park, Lot, Water, Bank, Landmark, Mountain, Ocean, Island, Port }

interface ColInfo {
  kind: ColKind;
  lm?: Landmark;
  lotX?: number;
  lotZ?: number;
}

// Mountain elevation west of the city — 0 in town, rising inland.
export function mountainHeight(x: number, z: number): number {
  if (x > MOUNTAIN_X) return 0;
  const into = Math.min(1, (MOUNTAIN_X - x) / MOUNTAIN_RAMP);
  const ridge = fbm(x * 0.0075 + 5.5, z * 0.0075 - 3.2, 4); // 0..1
  const detail = fbm(x * 0.03 - 12.1, z * 0.03 + 8.4, 2) * 0.18;
  const h = (10 + ridge * 70 + detail * 40) * into * into;
  return Math.round(h);
}

// Small islands scattered across the bay. Returns 0 for open water.
function islandHeight(x: number, z: number): number {
  if (z < OCEAN_Z) return 0;
  const n = fbm(x * 0.013 - 21.7, z * 0.013 + 44.3, 3);
  if (n < 0.66) return 0;
  return Math.round((n - 0.66) * 46); // gentle sandy mounds
}

// Sparse conifer anchors on the mid slopes — the tree line of the range.
function isConiferAnchor(x: number, z: number): boolean {
  const mh = mountainHeight(x, z);
  if (mh < 5 || mh > 48) return false;
  return hash2(x * 5 + 61, z * 5 - 17) < 0.014;
}

function riverCenter(x: number): number {
  return -170 + Math.round(28 * Math.sin(x * 0.011) + 14 * Math.sin(x * 0.027));
}

function columnInfo(x: number, z: number): ColInfo {
  for (const lm of LANDMARKS) {
    if (Math.abs(x - lm.x) <= lm.r && Math.abs(z - lm.z) <= lm.r) {
      return { kind: ColKind.Landmark, lm };
    }
  }
  // mountains take precedence over the street grid
  if (mountainHeight(x, z) > 0) return { kind: ColKind.Mountain };
  // the bay, its islands, and the port strip along the waterfront
  if (z >= OCEAN_Z) {
    return islandHeight(x, z) > 0 ? { kind: ColKind.Island } : { kind: ColKind.Ocean };
  }
  if (z >= OCEAN_Z - SHORE_BAND) return { kind: ColKind.Port };

  const rd = Math.abs(z - riverCenter(x));
  if (rd < 9) return { kind: ColKind.Water };
  if (rd < 12) return { kind: ColKind.Bank };

  const lx = mod(x, CELL), lz = mod(z, CELL);
  if (lx < ROAD_W || lz < ROAD_W) return { kind: ColKind.Road };
  if (lx === ROAD_W || lz === ROAD_W || lx === CELL - 1 || lz === CELL - 1) {
    return { kind: ColKind.Sidewalk };
  }
  const lotX = Math.floor(x / CELL), lotZ = Math.floor(z / CELL);
  const district = fbm(x * 0.005 + 31.7, z * 0.005 - 12.3, 3);
  if (district < 0.34) {
    // works yards are hard standing all the way through — a lawn in the
    // middle of a freight depot reads as a bug rather than a park
    const zone = zoneAt(lotX * CELL + CELL / 2, lotZ * CELL + CELL / 2);
    if (zone !== Zone.Industrial) return { kind: ColKind.Park, lotX, lotZ };
  }
  return { kind: ColKind.Lot, lotX, lotZ };
}

/**
 * District character. The old generator had one noise value and three height
 * bands, which meant every direction out of the city looked like the same
 * downtown forever. Zones give each area a job, and the core fades with
 * distance so the city genuinely thins into housing and then industry.
 */
const enum Zone { Core, Midrise, Residential, Lowrise, Industrial, Suburb }

/**
 * Satellite downtowns. Without these, pushing the core threshold up with
 * distance makes everything past the middle uniformly low — the city stops
 * repeating itself but goes flat instead, which is no better. Secondary
 * centres on a jittered lattice give the sprawl its own skylines to walk
 * toward, so the continuation stays worth crossing.
 */
function satelliteBoost(cx: number, cz: number): number {
  const S = 860; // spacing between centres
  const gx = Math.round(cx / S), gz = Math.round(cz / S);
  if (gx === 0 && gz === 0) return 0; // the real downtown owns the middle
  const jx = (hash2(gx * 13 + 1, gz * 7 - 5) - 0.5) * S * 0.45;
  const jz = (hash2(gx * 17 - 3, gz * 11 + 9) - 0.5) * S * 0.45;
  const d = Math.hypot(cx - (gx * S + jx), cz - (gz * S + jz));
  return Math.max(0, 1 - d / 230);
}

export function zoneAt(cx: number, cz: number): Zone {
  const r = Math.hypot(cx, cz);
  const district = fbm(cx * 0.005 + 31.7, cz * 0.005 - 12.3, 3);
  // a second, broader field so character does not track height
  const flavor = fbm(cx * 0.0031 - 88.1, cz * 0.0031 + 51.4, 3);
  const sat = satelliteBoost(cx, cz);
  // works and freight yards sit between the centres, never in one. Kept to a
  // narrower slice than before so the belt reads as a few depots rather than
  // a second city of sheds.
  if (r > 210 && flavor > 0.7 && sat < 0.3) return Zone.Industrial;
  // Downtown is a place, not a texture: the bar climbs as you leave the
  // middle, and drops again as you approach a satellite centre.
  const coreCut = 0.62 + Math.max(0, (r - 240) / 640) - sat * 0.62;
  if (district > coreCut) return Zone.Core;

  // Anywhere outside the inner districts and clear of a satellite centre is
  // house country. The suburbs used to only get whatever was left after the
  // apartment and low-rise bands had taken their share, which kept them to a
  // thin ring; now they claim most of the residential band out here too,
  // because past the commercial belt people live in houses, not blocks.
  const houseCountry = r > 95 && sat < 0.55;
  if (district > 0.47 - sat * 0.2) {
    if (flavor < 0.58) return houseCountry ? Zone.Suburb : Zone.Residential;
    return Zone.Midrise;
  }
  if (houseCountry && flavor > 0.05) return Zone.Suburb;
  return Zone.Lowrise;
}

interface LotParams {
  zone: Zone;
  height: number;
  wall: number;
  glassy: boolean;
  inset: number;
  neon: number; // 0 none, else neon block id
  awning: number; // street-level awning color for low-rise shops
}

function lotParams(lotX: number, lotZ: number): LotParams {
  const h1 = hash2(lotX * 3 + 7, lotZ * 5 - 3);
  const h2 = hash2(lotX - 91, lotZ + 44);
  const cx = lotX * CELL + CELL / 2, cz = lotZ * CELL + CELL / 2;
  const zone = zoneAt(cx, cz);
  let height: number;
  let glassy = false;
  switch (zone) {
    case Zone.Core:
      height = 26 + Math.floor(h1 * 30); // downtown towers
      glassy = h2 < 0.3; // fewer all-glass facades — mostly white towers
      break;
    case Zone.Midrise:
      height = 10 + Math.floor(h1 * 16);
      glassy = h2 < 0.12;
      break;
    case Zone.Residential:
      // apartment blocks: a narrow height band, so a street of them reads as
      // one estate built at one time rather than random sprawl
      height = 8 + Math.floor(h1 * 6);
      break;
    case Zone.Industrial:
      height = 5 + Math.floor(h1 * 5); // long low sheds
      break;
    default:
      height = 4 + Math.floor(h1 * 7); // low-rise sprawl
  }
  // mostly white towers with the occasional warm or blush facade
  const walls = [B.WallGray, B.WallGray, B.White, B.WallTan, B.WallGray, B.WallBrick];
  let wall = glassy ? B.Window : walls[Math.floor(h2 * 6) % 6];
  if (zone === Zone.Residential) wall = h2 < 0.5 ? B.WallTan : B.WallBrick;
  if (zone === Zone.Industrial) wall = h2 < 0.6 ? B.Steel : B.WallGray;
  // sheds fill their plot; towers step back off the pavement
  const inset = zone === Zone.Industrial ? 0 : Math.floor(hash2(lotX + 17, lotZ - 61) * 3);
  let neon = 0;
  if ((zone === Zone.Core || zone === Zone.Midrise) && h2 > 0.2) {
    neon = h1 > 0.5 ? B.NeonPink : B.NeonCyan;
  }
  const awnings = [B.Red, B.Yellow, B.NeonCyan, B.NeonPink];
  const awning = awnings[Math.floor(hash2(lotX - 7, lotZ + 13) * 4) % 4];
  return { zone, height, wall, glassy, inset, neon, awning };
}

/**
 * Where a suburban utility pole stands. Pure modular arithmetic on purpose —
 * neighbouring columns test this to work out whether a pole's crossarm
 * reaches them, the same way tree canopies are resolved, so it has to stay
 * cheap enough to call a handful of times per column.
 */
function isPoleAnchor(x: number, z: number): boolean {
  const lxm = mod(x, CELL), lzm = mod(z, CELL);
  if (lxm !== ROAD_W && lzm !== ROAD_W) return false;
  return mod(x * 2 + z, 13) === 0;
}

function isTreeAnchor(x: number, z: number): boolean {
  const info = columnInfo(x, z);
  if (info.kind === ColKind.Park) return hash2(x + 1000, z - 2000) < 0.035;
  if (info.kind === ColKind.Sidewalk) return hash2(x + 1000, z - 2000) < 0.012;
  if (info.kind === ColKind.Landmark && info.lm === LANDMARKS[2]) {
    return Math.abs(z - info.lm.z) > 2 && hash2(x + 1000, z - 2000) < 0.03;
  }
  return false;
}

function treeHeight(x: number, z: number): number {
  return 4 + Math.floor(hash2(x - 555, z + 777) * 3);
}

// Some park/riverbank trees bloom as cherry blossom instead of green.
function isSakura(x: number, z: number): boolean {
  return hash2(x + 313, z - 131) < 0.4;
}

// ------------------------------------------------------------ chunk builder

export function generateChunkData(cx: number, cz: number): Uint8Array {
  const data = new Uint8Array(CS * CS * H);
  const set = (lx: number, y: number, lz: number, id: number) => {
    if (y >= 0 && y < H) data[(y * CS + lz) * CS + lx] = id;
  };

  for (let lz = 0; lz < CS; lz++) {
    for (let lx = 0; lx < CS; lx++) {
      const x = cx * CS + lx;
      const z = cz * CS + lz;
      const info = columnInfo(x, z);
      const setY = (y: number, id: number) => set(lx, y, lz, id);

      // a road crossing the river becomes a vermilion bridge deck
      const onRoadLine = mod(x, CELL) < ROAD_W || mod(z, CELL) < ROAD_W;
      const overWater = info.kind === ColKind.Water || info.kind === ColKind.Bank;
      if (overWater && onRoadLine) {
        const DECK = 3;
        if (info.kind === ColKind.Water) setY(0, B.Water);
        else setY(0, B.Sand);
        // support pillars down into the water
        if (info.kind === ColKind.Water && mod(x, 4) === 0 && mod(z, 4) === 0) {
          for (let y = 1; y < DECK; y++) setY(y, B.BridgeDeck);
        }
        setY(DECK, B.BridgeDeck);
        // railings along the deck edges
        const lxm = mod(x, CELL), lzm = mod(z, CELL);
        const nsBridge = lxm < ROAD_W;
        const edge = nsBridge ? (lxm === 0 || lxm === ROAD_W - 1) : (lzm === 0 || lzm === ROAD_W - 1);
        if (edge) { setY(DECK + 1, B.BridgeDeck); setY(DECK + 2, B.Red); }
        continue;
      }

      switch (info.kind) {
        case ColKind.Water:
          setY(0, B.Water);
          break;

        case ColKind.Mountain: {
          // rock column up to the ridge line, with grass low down, bare stone
          // on the flanks and snow on the summits
          const mh = mountainHeight(x, z);
          for (let y = 0; y <= mh; y++) {
            let id: number = B.Stone;
            if (y === mh) {
              // band the surface by altitude, with a soft noisy tree line
              const band = fbm(x * 0.02 + 3.3, z * 0.02 - 7.7, 2) * 10;
              if (mh + band > 62) id = B.Snow;
              else if (mh + band < 26) id = B.Grass;
              else id = B.Stone;
            }
            setY(y, id);
          }
          // Conifers on the lower slopes. Built from a 5x5 neighbourhood scan
          // so each tree gets a real tapered canopy instead of a bare pole.
          for (let az = z - 2; az <= z + 2; az++) {
            for (let ax = x - 2; ax <= x + 2; ax++) {
              if (!isConiferAnchor(ax, az)) continue;
              const amh = mountainHeight(ax, az);
              const th = 5 + Math.floor(hash2(ax - 9, az + 4) * 5);
              const dx = Math.abs(x - ax), dz2 = Math.abs(z - az);
              const rad = Math.max(dx, dz2);
              if (rad === 0) for (let t = 1; t <= th; t++) setY(amh + t, B.Trunk);
              // cone: wide at the bottom, narrowing toward the tip
              for (let t = 0; t < 6; t++) {
                const ring = t < 2 ? 2 : t < 4 ? 1 : 0;
                if (rad <= ring) setY(amh + th - 2 + t, B.Leaves);
              }
            }
          }
          break;
        }

        case ColKind.Ocean:
          setY(0, B.Water);
          break;

        case ColKind.Island: {
          const ih = islandHeight(x, z);
          for (let y = 0; y <= ih; y++) {
            setY(y, y === ih && ih > 3 ? B.Grass : B.Sand);
          }
          // a lone pine or two on the bigger islands
          if (ih > 5 && hash2(x * 3 - 77, z * 3 + 22) < 0.09) {
            for (let t = 1; t <= 4; t++) setY(ih + t, B.Trunk);
            for (let t = 0; t < 3; t++) setY(ih + 5 + t, B.Leaves);
          }
          break;
        }

        case ColKind.Port: {
          // Waterfront: a quay along the shore, timber piers reaching into the
          // bay, stacked containers, and gantry cranes over the berths.
          const fromShore = OCEAN_Z - z; // 0 at the water, SHORE_BAND inland
          const pierSlot = mod(x, 42);
          const onPier = pierSlot < 9;
          if (fromShore <= 4 && onPier) {
            // pier decking on pilings out over the water
            setY(0, B.Water);
            if (mod(x, 3) === 0 && mod(z, 3) === 0) for (let y = 1; y <= 3; y++) setY(y, B.Trunk);
            setY(4, B.Deck);
          } else if (fromShore <= 4) {
            setY(0, B.Water);
          } else {
            setY(0, B.Plaza); // concrete quay
            // container stacks
            const bx = Math.floor(x / 6), bz = Math.floor(z / 6);
            if (mod(x, 6) < 5 && mod(z, 6) < 4 && hash2(bx + 3, bz - 8) < 0.3) {
              const stack = 1 + Math.floor(hash2(bx - 2, bz + 5) * 3);
              for (let y = 1; y <= stack * 2; y++) {
                setY(y, hash2(bx, bz + Math.floor((y - 1) / 2)) < 0.5 ? B.Crate : B.CrateB);
              }
            }
            // gantry cranes straddling the quay near the piers
            if (onPier && fromShore >= 6 && fromShore <= 8) {
              if (pierSlot === 0 || pierSlot === 8) {
                for (let y = 1; y <= 18; y++) setY(y, B.Steel);
              }
              if (fromShore === 7) setY(19, B.Steel);
            }
            // warehouses set back from the water
            if (fromShore > 14) {
              const wx = Math.floor(x / 22), wz = Math.floor(z / 14);
              if (mod(x, 22) < 18 && mod(z, 14) < 10 && hash2(wx + 11, wz - 4) < 0.55) {
                const perim = mod(x, 22) === 0 || mod(x, 22) === 17 || mod(z, 14) === 0 || mod(z, 14) === 9;
                for (let y = 1; y <= 7; y++) setY(y, perim ? B.WallGray : B.WallTan);
                setY(8, B.Roof);
              }
            }
          }
          break;
        }
        case ColKind.Bank:
          setY(0, B.Sand);
          break;
        case ColKind.Road: {
          const lxm = mod(x, CELL), lzm = mod(z, CELL);
          const ns = lxm < ROAD_W, ew = lzm < ROAD_W;
          let id: number = B.Road;
          if (ns && !ew) {
            if (lxm === 2 && mod(z, 6) < 3) id = B.RoadLine; // lane dashes
            if ((lzm >= 6 && lzm <= 7) || lzm >= CELL - 2) id = mod(x, 2) === 0 ? B.RoadLine : B.Road; // crosswalk
          } else if (ew && !ns) {
            if (lzm === 2 && mod(x, 6) < 3) id = B.RoadLine;
            if ((lxm >= 6 && lxm <= 7) || lxm >= CELL - 2) id = mod(z, 2) === 0 ? B.RoadLine : B.Road;
          }
          setY(0, id);
          break;
        }
        case ColKind.Sidewalk: {
          setY(0, B.Sidewalk);
          const lxm = mod(x, CELL), lzm = mod(z, CELL);

          // Concrete utility poles. Nothing says Japanese suburb more than
          // these: leaning slightly, far too many of them, a crossarm and a
          // transformer drum near the top. They stand on the kerb in place of
          // the downtown streetlamps.
          const subZone = zoneAt(Math.floor(x / CELL) * CELL + CELL / 2,
                                 Math.floor(z / CELL) * CELL + CELL / 2) === Zone.Suburb;
          if (subZone) {
            if (isPoleAnchor(x, z)) {
              for (let y = 1; y <= 8; y++) setY(y, B.BlockWall);
              setY(9, B.Steel);                                // crossarm centre
              if (hash2(x + 3, z - 3) < 0.4) setY(7, B.Steel); // transformer drum
              setY(10, B.Lantern);                             // the light on it
            } else {
              // a crossarm from the pole next door reaches over this column,
              // so the arms read as arms rather than single blocks
              for (let d = -1; d <= 1; d += 2) {
                if (isPoleAnchor(x + d, z) || isPoleAnchor(x, z + d)) setY(9, B.Steel);
              }
            }
            break;
          }
          // Streetlamps march along the kerb at a regular spacing so the roads
          // read as lit at night rather than randomly speckled.
          const onKerb = lxm === ROAD_W || lzm === ROAD_W;
          const spaced = mod(x + z * 3, 9) === 0;
          if (onKerb && spaced && !isTreeAnchor(x, z)) {
            for (let y = 1; y <= 5; y++) setY(y, B.Pole);
            setY(6, B.Roof);          // lamp housing
            setY(7, B.Lantern);       // the glowing head
          }
          // Traffic signals on the corner posts at each intersection. Which
          // lamp is lit alternates by axis so crossing streets disagree.
          // Only the post is baked here; the signal head itself is a live
          // mesh placed by TrafficManager so it can cycle through its phases.
          const corner = (lxm === ROAD_W && lzm === ROAD_W);
          if (corner) for (let y = 1; y <= 5; y++) setY(y, B.Pole);

          // Street furniture. Small, frequent and lit — a pavement with
          // vending machines and benches on it reads as lived in, and these
          // are the first things a stray shot takes out.
          if (!onKerb && !corner && !isTreeAnchor(x, z)) {
            const f = hash2(x * 7 - 19, z * 7 + 23);
            if (f < 0.02) {
              // vending machine bank, glowing at night
              setY(1, f < 0.01 ? B.Red : B.NeonCyan);
              setY(2, B.WindowLit);
            } else if (f < 0.032) {
              setY(1, B.Wood);          // bench
            } else if (f < 0.038) {
              // a paper lantern on a short post outside a shopfront
              setY(1, B.Pole);
              setY(2, B.Lantern);
            } else if (f > 0.995) {
              // bus shelter: a little roofed stand at the kerbside
              setY(1, B.Pole);
              setY(2, B.Pole);
              setY(3, B.NeonCyan);
            }
          }
          break;
        }
        case ColKind.Landmark: {
          const lm = info.lm!;
          const dx = x - lm.x, dz = z - lm.z;
          setY(0, lm.ground ? lm.ground(dx, dz) : B.Plaza);
          lm.build(dx, dz, setY);
          break;
        }
        case ColKind.Park: {
          const path = hash2(info.lotX! + 5, info.lotZ! - 5) < 0.5;
          const lxm = mod(x, CELL), lzm = mod(z, CELL);
          const suburban = zoneAt(info.lotX! * CELL + CELL / 2, info.lotZ! * CELL + CELL / 2) === Zone.Suburb;

          // A neighbourhood park in the suburbs is a small dirt lot with the
          // same four things in it everywhere in Japan: swings, a slide, a
          // climbing frame and a sandpit, with a wall round the outside.
          if (suburban && hash2(info.lotX! - 21, info.lotZ! + 33) < 0.55) {
            const inPark = lxm >= ROAD_W + 1 && lxm <= CELL - 2
                        && lzm >= ROAD_W + 1 && lzm <= CELL - 2;
            if (!inPark) { setY(0, B.Sidewalk); break; }
            setY(0, B.Tarmac);
            const edge = lxm === ROAD_W + 1 || lzm === ROAD_W + 1
                      || lxm === CELL - 2 || lzm === CELL - 2;
            if (edge && !(lxm === 13 || lzm === 13)) { setY(1, B.BlockWall); break; }

            // swing set: two A-frames and a top bar with two seats hanging
            if (lzm === 9 && lxm >= 8 && lxm <= 13) {
              if (lxm === 8 || lxm === 13) { for (let y = 1; y <= 4; y++) setY(y, B.Steel); }
              setY(4, B.Steel);
              if (lxm === 10 || lxm === 12) setY(2, B.Wood); // seats
            }
            // slide: steps up one side, a sloped chute down the other
            if (lzm === 14 && lxm >= 9 && lxm <= 14) {
              const stepUp = lxm - 9;
              const h = stepUp <= 2 ? 1 + stepUp : Math.max(1, 5 - (stepUp - 2));
              for (let y = 1; y <= h; y++) setY(y, lxm <= 11 ? B.Steel : B.Yellow);
            }
            // climbing frame: an open lattice cube
            if (lxm >= 17 && lxm <= 21 && lzm >= 16 && lzm <= 20) {
              const lat = (lxm === 17 || lxm === 21) || (lzm === 16 || lzm === 20);
              if (lat && mod(lxm + lzm, 2) === 0) for (let y = 1; y <= 4; y++) setY(y, B.Steel);
              if (lat) setY(4, B.Steel);
            }
            // sandpit in the corner
            if (lxm >= 8 && lxm <= 12 && lzm >= 18 && lzm <= 21) setY(0, B.Sand);
            // a bench and a water fountain by the gate
            if (lzm === 20 && lxm === 15) setY(1, B.Wood);
            if (lzm === 19 && lxm === 15) { setY(1, B.Steel); setY(2, B.NeonCyan); }
            // shade trees come from the usual park tree anchors below, which
            // already build a proper canopy — a hand-placed trunk here would
            // just be a bare pole
            break;
          }

          const onPath = path && (lxm === 13 || lzm === 13);
          setY(0, onPath ? B.Sand : B.Grass);
          if (!onPath) {
            const fh = hash2(x + 9, z + 9);
            if (fh < 0.05) setY(1, fh < 0.025 ? B.Flower : B.Yellow); // flower bushes
          }
          break;
        }
        case ColKind.Lot: {
          const p = lotParams(info.lotX!, info.lotZ!);
          const lxm = mod(x, CELL), lzm = mod(z, CELL);
          const lo = ROAD_W + 1 + p.inset, hi = CELL - 2 - p.inset;

          // A school takes a whole block, because that is how they are built:
          // one long concrete teaching wing along the street, a gymnasium, a
          // pool, and the big bare dirt ground that fills everything else.
          // Scattered roughly one block in twenty across the housing.
          const schoolZone = p.zone === Zone.Suburb || p.zone === Zone.Lowrise
                          || p.zone === Zone.Residential;
          if (schoolZone && hash2(info.lotX! * 17 - 5, info.lotZ! * 23 + 11) < 0.052) {
            const a = lxm - (ROAD_W + 1), b = lzm - (ROAD_W + 1);
            if (a < 0 || b < 0 || a > 18 || b > 18) { setY(0, B.Sidewalk); break; }

            // the packed-earth ground everything else sits on
            setY(0, B.Tarmac);

            // perimeter fence with a gate on the street side
            const fence = a === 0 || b === 0 || a === 18 || b === 18;
            const gate = b === 0 && a >= 8 && a <= 10;
            if (fence && !gate) {
              setY(1, B.BlockWall);
              if (mod(a + b, 3) !== 0) setY(2, B.Pole); // railings above the wall
              break;
            }

            // four-storey teaching wing running the width of the plot
            if (b >= 2 && b <= 6 && a >= 1 && a <= 17) {
              const outer = b === 2 || b === 6 || a === 1 || a === 17;
              for (let y = 1; y <= 12; y++) {
                // a continuous band of classroom windows on every floor
                const row = mod(y - 1, 3);
                const win = outer && row === 1;
                setY(y, win ? (hash3(x, y, z) < 0.4 ? B.WindowLit : B.Window) : B.WallGray);
              }
              setY(13, B.Roof);
              if (outer) setY(14, B.Roof); // parapet
              // a clock over the main entrance
              if (b === 2 && a === 9) setY(11, B.Gold);
              break;
            }

            // gymnasium: a hall with a shallow pitched roof
            if (b >= 13 && b <= 17 && a >= 1 && a <= 7) {
              const outer = b === 13 || b === 17 || a === 1 || a === 7;
              for (let y = 1; y <= 6; y++) {
                setY(y, outer ? (y === 3 && mod(a + b, 2) === 0 ? B.Window : B.WallTan) : B.Air);
              }
              const rise = Math.max(0, 2 - Math.abs(b - 15));
              for (let y = 7; y <= 7 + rise; y++) setY(y, B.RoofTile);
              break;
            }

            // the 25m pool, with a paved lip round it
            if (b >= 13 && b <= 16 && a >= 10 && a <= 16) {
              const lip = b === 13 || b === 16 || a === 10 || a === 16;
              setY(0, lip ? B.Plaza : B.Water);
              break;
            }

            // baseball backstop net at the far end of the ground
            if (b === 11 && a >= 9 && a <= 15) {
              for (let y = 1; y <= 5; y++) if (mod(a + y, 2) === 0) setY(y, B.Steel);
              setY(6, B.Steel);
              break;
            }
            break;
          }

          // Japanese suburbia is not one building per block — it is four or
          // more houses crammed onto it, each with a metre of garden and a
          // concrete-block wall between it and the next. So the lot gets
          // subdivided rather than built on as a single footprint.
          if (p.zone === Zone.Suburb) {
            const inLot = lxm >= ROAD_W + 1 && lxm <= CELL - 2
                       && lzm >= ROAD_W + 1 && lzm <= CELL - 2;
            if (!inLot) { setY(0, B.Sidewalk); break; }

            // which of the 2x2 plots, and where inside it
            const span = (CELL - 2) - (ROAD_W + 1) + 1; // ~20
            const half = Math.floor(span / 2);
            const px = lxm - (ROAD_W + 1), pz = lzm - (ROAD_W + 1);
            const plotX = px < half ? 0 : 1, plotZ = pz < half ? 0 : 1;
            const ix = px - plotX * half, iz = pz - plotZ * half;
            const hp = hash2(info.lotX! * 7 + plotX * 131, info.lotZ! * 11 + plotZ * 197);

            setY(0, B.Plaza); // concrete hardstanding and driveways

            // a low block wall on the plot boundary, with a gap for the gate
            const edge = ix === 0 || iz === 0 || ix === half - 1 || iz === half - 1;
            const gate = ix === Math.floor(half / 2) && iz === 0;
            if (edge && !gate) {
              setY(1, B.BlockWall);
              if (hp < 0.4) setY(2, B.BlockWall); // taller wall on some plots
            }

            // one in six plots is a garden or a car park rather than a house
            if (hp > 0.84) {
              if (!edge) {
                setY(0, hp > 0.93 ? B.Plaza : B.Grass);
                const gh = hash2(x * 3 + 5, z * 3 - 8);
                if (hp <= 0.93 && gh < 0.1) setY(1, gh < 0.05 ? B.Flower : B.Leaves);
              }
              break;
            }

            // the house: set back from the wall, two storeys, gable roof
            const b = 2; // garden margin inside the wall
            const inHouse = ix >= b && ix <= half - 1 - b && iz >= b && iz <= half - 1 - b;
            if (!inHouse) break;
            const storeys = hp < 0.22 ? 3 : 2;
            const wallY = 1 + storeys * 3;      // 7 or 10 blocks of wall
            const houseWall = hp < 0.5 ? B.WallGray : B.WallTan;
            for (let y = 1; y < wallY; y++) {
              // a window on each storey, and a door on the gate side
              const storeyRow = (y - 1) % 3;
              const isWin = storeyRow === 1 && mod(ix + iz, 2) === 0;
              setY(y, isWin ? (hash3(x, y, z) < 0.35 ? B.WindowLit : B.Window) : houseWall);
            }
            // Gable roof: ridge runs along one axis and the tile steps down to
            // the eaves, which is what makes these read as houses and not boxes.
            const tile = hp < 0.62 ? B.RoofTile : B.RoofTileB;
            const along = hp < 0.5;
            const acrossPos = along ? iz - b : ix - b;
            const acrossSpan = half - 1 - b * 2;
            const mid = acrossSpan / 2;
            const rise = Math.max(0, Math.round(mid - Math.abs(acrossPos - mid)));
            for (let y = wallY; y <= wallY + rise; y++) setY(y, tile);
            // eaves overhang by a block on the low sides
            if (rise === 0) setY(wallY, tile);
            break;
          }

          // A works yard is not a smaller office block. Half of them are open
          // ground stacked with containers and a gantry, the rest are long
          // windowless sheds — so freight districts read as freight.
          if (p.zone === Zone.Industrial) {
            const yard = hash2(info.lotX! + 29, info.lotZ! - 13) < 0.45;
            setY(0, B.Plaza);
            if (yard) {
              // container stacks in rows, with aisles between them
              const inYard = lxm >= lo + 1 && lxm <= hi - 1 && lzm >= lo + 1 && lzm <= hi - 1;
              if (inYard && mod(lxm, 4) < 3 && mod(lzm, 6) < 4) {
                const stack = 1 + Math.floor(hash2(x * 2 + 3, z * 2 - 7) * 3);
                for (let y = 1; y <= stack; y++) {
                  setY(y, hash3(x, y, z) < 0.5 ? B.Crate : B.CrateB);
                }
              }
              // a gantry crane straddling one side of the yard
              if (lzm === lo + 1 && mod(lxm, 5) === 0) {
                for (let y = 1; y <= 9; y++) setY(y, B.Steel);
              }
              if (lzm === lo + 1 && lxm >= lo && lxm <= hi) setY(10, B.Steel);
            } else {
              const wallCol = lxm === lo || lxm === hi || lzm === lo || lzm === hi;
              const inShed = lxm >= lo && lxm <= hi && lzm >= lo && lzm <= hi;
              if (inShed) {
                for (let y = 1; y < p.height; y++) {
                  if (wallCol) setY(y, y === 2 && mod(lxm + lzm, 7) === 0 ? B.Window : p.wall);
                }
                // shallow ridged roof, and a chimney on some of them
                setY(p.height, B.Roof);
                const ridge = Math.abs(lxm - (lo + hi) / 2) < 1.5;
                if (ridge) setY(p.height + 1, B.Roof);
                if (hash2(info.lotX! - 41, info.lotZ! + 7) < 0.3
                    && Math.abs(lxm - (lo + 3)) < 1 && Math.abs(lzm - (lo + 3)) < 1) {
                  for (let yy = 1; yy <= 10; yy++) setY(p.height + yy, B.WallGray);
                  setY(p.height + 11, B.Red);
                }
              }
            }
            break;
          }

          if (lxm >= lo && lxm <= hi && lzm >= lo && lzm <= hi) {
            setY(0, B.Plaza);
            // tall towers step back to a narrower upper tier
            const tall = p.height >= 30;
            const tierY = Math.floor(p.height * 0.66);
            const inner = lxm >= lo + 2 && lxm <= hi - 2 && lzm >= lo + 2 && lzm <= hi - 2;
            const topY = tall && !inner ? tierY : p.height;
            for (let y = 1; y < topY; y++) {
              const upperTier = tall && y > tierY;
              const perim = upperTier
                ? lxm === lo + 2 || lxm === hi - 2 || lzm === lo + 2 || lzm === hi - 2
                : lxm === lo || lxm === hi || lzm === lo || lzm === hi;
              let id: number = p.wall;
              if (perim) {
                if (p.glassy) {
                  id = y % 5 === 1 || mod(lxm + lzm, 5) === 0 ? B.WallGray : (hash3(x, y, z) < 0.22 ? B.WindowLit : B.Window);
                } else {
                  const isWindow = y % 4 !== 1 && mod(lxm + lzm, 3) !== 0;
                  id = isWindow ? (hash3(x, y, z) < 0.3 ? B.WindowLit : B.Window) : p.wall;
                }
                // colorful shop awnings above the ground floor of low-rises
                if (p.height < 14 && y === 2) id = p.awning;
              }
              setY(y, id);
            }
            {
              const perimTop = lxm === lo || lxm === hi || lzm === lo || lzm === hi;
              setY(topY, perimTop && p.neon ? p.neon : B.Roof);
            }
            // Rooftops matter more here than in most games because the
            // player flies: this is the surface they spend the fight looking
            // down at, so it gets water tanks, plant rooms, helipads and
            // masts rather than a flat lid.
            if (topY === p.height) {
              const rh = hash3(x, p.height, z);
              const cxm = Math.abs(lxm - (lo + hi) / 2), czm = Math.abs(lzm - (lo + hi) / 2);
              const midRoof = cxm <= 2.5 && czm <= 2.5;
              // helipad on the tallest towers: a pale disc with a marking
              const heli = p.height >= 34 && hash2(info.lotX! + 5, info.lotZ! - 9) < 0.3;
              if (heli && cxm <= 4 && czm <= 4) {
                const ring = cxm >= 3.5 || czm >= 3.5;
                setY(p.height, ring ? B.Yellow : B.Plaza);
                if (cxm <= 2 && (Math.abs(cxm - 2) < 0.6 || czm <= 0.6)) setY(p.height, B.White);
              } else if (midRoof && p.height >= 12
                         && hash2(info.lotX! - 3, info.lotZ! + 11) < 0.45) {
                // water tank up on short legs, the classic Tokyo roofline
                const legs = cxm >= 1.5 || czm >= 1.5;
                setY(p.height + 1, legs ? B.Steel : B.Air);
                for (let yy = 2; yy <= 4; yy++) setY(p.height + yy, B.Steel);
                setY(p.height + 5, B.Roof);
              } else {
                if (rh < 0.07) setY(p.height + 1, B.Roof);       // vents
                if (rh < 0.03) setY(p.height + 2, B.WallGray);   // AC plant
                if (rh < 0.008) setY(p.height + 3, B.Steel);
              }
              // aerial masts, mostly downtown
              if (rh > 0.994 && p.height >= 18) {
                for (let yy = 1; yy <= 5; yy++) setY(p.height + yy, B.Pole);
                setY(p.height + 6, B.LightRed);
              }
              // parapet around the edge so roofs have a lip, not a cliff
              const perimTop2 = lxm === lo || lxm === hi || lzm === lo || lzm === hi;
              if (perimTop2 && !p.neon && p.height >= 8) setY(p.height + 1, B.Roof);
            }
          } else {
            setY(0, B.Sidewalk);
          }
          break;
        }
      }

      // trees: check 5x5 neighborhood for anchors whose canopy reaches us
      for (let az = z - 2; az <= z + 2; az++) {
        for (let ax = x - 2; ax <= x + 2; ax++) {
          if (!isTreeAnchor(ax, az)) continue;
          const th = treeHeight(ax, az);
          const sakura = isSakura(ax, az);
          const trunkId = sakura ? B.SakuraTrunk : B.Trunk;
          const leafId = sakura ? B.Sakura : B.Leaves;
          const dx = Math.abs(x - ax), dz2 = Math.abs(z - az);
          if (dx === 0 && dz2 === 0) {
            for (let y = 1; y < th; y++) setY(y, trunkId);
          }
          if (!(dx === 2 && dz2 === 2)) {
            for (let y = th - 1; y <= th + 1; y++) {
              if (data[(Math.min(y, H - 1) * CS + lz) * CS + lx] === B.Air) setY(y, leafId);
            }
          }
          if (dx <= 1 && dz2 <= 1 && !(dx === 1 && dz2 === 1)) setY(th + 2, leafId);
        }
      }
    }
  }
  return data;
}

// True only where the generator actually bakes a signal post: a city-street
// corner. Mountains, the bay, the port, the river and landmark plazas all
// resolve to other column kinds and are excluded, so TrafficManager cannot
// plant signals out in the wilderness.
export function hasTrafficPost(x: number, z: number): boolean {
  if (mod(x, CELL) !== ROAD_W || mod(z, CELL) !== ROAD_W) return false;
  return columnInfo(x, z).kind === ColKind.Sidewalk;
}

// True for columns where ground level is walkable open street (NPC spawns).
export function isOpenStreet(x: number, z: number): boolean {
  const k = columnInfo(x, z).kind;
  return k === ColKind.Road || k === ColKind.Sidewalk || k === ColKind.Park;
}

// Road orientation for traffic: 0 = not a road, 1 = runs along z (north-south),
// 2 = runs along x (east-west), 3 = intersection.
export function roadInfo(x: number, z: number): 0 | 1 | 2 | 3 {
  if (columnInfo(x, z).kind !== ColKind.Road) return 0;
  const nsRoad = mod(x, CELL) < ROAD_W;
  const ewRoad = mod(z, CELL) < ROAD_W;
  if (nsRoad && ewRoad) return 3;
  return nsRoad ? 1 : 2;
}
