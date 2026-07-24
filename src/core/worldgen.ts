// Procedural Neo-Tokyo generator. Pure functions — the same (x,z) always
// yields the same column, which is what makes the world infinite: chunks are
// generated on demand as the player moves.

import { B } from './blocks';
import { fbm, hash2, hash3 } from './noise';

export const CS = 32; // chunk size (x,z)
export const H = 96; // world height

const CELL = 26; // city grid cell (road-to-road)
const ROAD_W = 5;

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

// ---------------------------------------------------------------- landmarks

interface Landmark {
  x: number;
  z: number;
  r: number; // half-size of cleared plaza square
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

export const LANDMARKS: Landmark[] = [
  { x: 55, z: -45, r: 17, build: buildTower },
  { x: -70, z: -100, r: 15, build: buildSpire },
  { x: 6, z: 58, r: 16, build: buildTorii },
  { x: -40, z: 70, r: 13, build: buildTemple },
];

// ------------------------------------------------------------- column logic

const enum ColKind { Road, Sidewalk, Park, Lot, Water, Bank, Landmark }

interface ColInfo {
  kind: ColKind;
  lm?: Landmark;
  lotX?: number;
  lotZ?: number;
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
  if (district < 0.34) return { kind: ColKind.Park, lotX, lotZ };
  return { kind: ColKind.Lot, lotX, lotZ };
}

interface LotParams {
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
  const district = fbm(cx * 0.005 + 31.7, cz * 0.005 - 12.3, 3);
  let height: number;
  let glassy = false;
  if (district > 0.62) {
    height = 26 + Math.floor(h1 * 30); // downtown towers
    glassy = h2 < 0.75;
  } else if (district > 0.47) {
    height = 10 + Math.floor(h1 * 16);
    glassy = h2 < 0.3;
  } else {
    height = 4 + Math.floor(h1 * 7); // low-rise sprawl
  }
  // mostly white towers with the occasional warm or blush facade
  const walls = [B.WallGray, B.WallGray, B.White, B.WallTan, B.WallGray, B.WallBrick];
  const wall = glassy ? B.Window : walls[Math.floor(h2 * 6) % 6];
  const inset = Math.floor(hash2(lotX + 17, lotZ - 61) * 3);
  let neon = 0;
  if (district > 0.48 && h2 > 0.2) neon = h1 > 0.5 ? B.NeonPink : B.NeonCyan;
  const awnings = [B.Red, B.Yellow, B.NeonCyan, B.NeonPink];
  const awning = awnings[Math.floor(hash2(lotX - 7, lotZ + 13) * 4) % 4];
  return { height, wall, glassy, inset, neon, awning };
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
        case ColKind.Sidewalk:
          setY(0, B.Sidewalk);
          // streetlamps: slim gray pole with a warm lamp on top
          if (hash2(x * 7 + 3, z * 7 - 9) < 0.012 && !isTreeAnchor(x, z)) {
            for (let y = 1; y <= 3; y++) setY(y, B.Roof);
            setY(4, B.WindowLit);
          }
          break;
        case ColKind.Landmark: {
          const lm = info.lm!;
          const nearTorii = lm === LANDMARKS[2];
          setY(0, nearTorii ? (Math.abs(z - lm.z) <= 1 ? B.Sand : B.Grass) : B.Plaza);
          lm.build(x - lm.x, z - lm.z, setY);
          break;
        }
        case ColKind.Park: {
          const path = hash2(info.lotX! + 5, info.lotZ! - 5) < 0.5;
          const lxm = mod(x, CELL), lzm = mod(z, CELL);
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
            // rooftop clutter: vents, AC boxes, the odd antenna mast
            if (topY === p.height) {
              const rh = hash3(x, p.height, z);
              if (rh < 0.05) setY(p.height + 1, B.Roof);
              if (rh < 0.014) setY(p.height + 2, B.WallGray);
              if (rh > 0.996) {
                for (let yy = 1; yy <= 4; yy++) setY(p.height + yy, B.Roof);
                setY(p.height + 5, B.Red);
              }
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
