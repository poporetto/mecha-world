// Block ids and their base colors. Pure data — shared by worldgen, mesher, fx.

export const enum B {
  Air = 0,
  Road = 1,
  Sidewalk = 2,
  Grass = 3,
  Water = 4,
  Dirt = 5,
  WallGray = 6,
  WallTan = 7,
  WallBrick = 8,
  Window = 9,
  WindowLit = 10,
  Glass = 11,
  Roof = 12,
  Trunk = 13,
  Leaves = 14,
  Red = 15,
  White = 16,
  NeonPink = 17,
  NeonCyan = 18,
  Sand = 19,
  Plaza = 20,
  RoadLine = 21,
  Yellow = 22,
  Flower = 23,
  Sakura = 24,
  SakuraTrunk = 25,
  Wood = 26,
  TempleRoof = 27,
  Gold = 28,
  BridgeDeck = 29,
  Lantern = 30,
  Puddle = 31,
}

export const BLOCK_COLORS: number[] = [];
// soft pastel palette — bright, white Tokyo look (crisp white towers, pale
// blue-grey glass, red-and-white accents, cherry-blossom pink)
BLOCK_COLORS[B.Road] = 0x8a8d9e;
BLOCK_COLORS[B.Sidewalk] = 0xe4e5ec;
BLOCK_COLORS[B.Grass] = 0xa9e0a2;
BLOCK_COLORS[B.Water] = 0x9ed6f2;
BLOCK_COLORS[B.Dirt] = 0xcdaa88;
BLOCK_COLORS[B.WallGray] = 0xf8f9fc; // near-white concrete
BLOCK_COLORS[B.WallTan] = 0xfcf5e6; // warm off-white
BLOCK_COLORS[B.WallBrick] = 0xf6e2d7; // pale blush
BLOCK_COLORS[B.Window] = 0xd4e6f2; // very pale blue glass
BLOCK_COLORS[B.WindowLit] = 0xfff0c6;
BLOCK_COLORS[B.Glass] = 0xe4f2fb;
BLOCK_COLORS[B.Roof] = 0xe6e8f0;
BLOCK_COLORS[B.Trunk] = 0xbb9070;
BLOCK_COLORS[B.Leaves] = 0x9ad98d;
BLOCK_COLORS[B.Red] = 0xef8378; // tower red
BLOCK_COLORS[B.White] = 0xffffff;
BLOCK_COLORS[B.NeonPink] = 0xf6b1d5;
BLOCK_COLORS[B.NeonCyan] = 0xa9ece6;
BLOCK_COLORS[B.Sand] = 0xf6ecce;
BLOCK_COLORS[B.Plaza] = 0xeef0f6;
BLOCK_COLORS[B.RoadLine] = 0xfafafd;
BLOCK_COLORS[B.Yellow] = 0xf8dfa2;
BLOCK_COLORS[B.Flower] = 0xf8bcd8;
BLOCK_COLORS[B.Sakura] = 0xf7c4dd; // cherry blossom
BLOCK_COLORS[B.SakuraTrunk] = 0x9c7d78;
BLOCK_COLORS[B.Wood] = 0xd8b892;
BLOCK_COLORS[B.TempleRoof] = 0xd98a72; // terracotta tile
BLOCK_COLORS[B.Gold] = 0xf3cf7a;
BLOCK_COLORS[B.BridgeDeck] = 0xe08a7a; // vermilion bridge
BLOCK_COLORS[B.Lantern] = 0xffd9a8;
BLOCK_COLORS[B.Puddle] = 0x86c5e8; // shallow water left by the aqua blaster

export function isSolid(id: number): boolean {
  return id !== B.Air && id !== B.Water && id !== B.Puddle;
}

// Blocks that catch fire — building materials and vegetation, not stone/roads.
const FLAMMABLE = new Set<number>([
  B.WallGray, B.WallTan, B.WallBrick, B.Window, B.WindowLit, B.Roof,
  B.Trunk, B.Leaves, B.Sakura, B.SakuraTrunk, B.Wood, B.TempleRoof,
  B.Red, B.White, B.Yellow,
]);

export function isFlammable(id: number): boolean {
  return FLAMMABLE.has(id);
}
