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
  LightRed = 32,
  LightAmber = 33,
  LightGreen = 34,
  Pole = 35,
  Stone = 36,
  Snow = 37,
  Deck = 38,
  Crate = 39,
  CrateB = 40,
  Steel = 41,
  RoofTile = 42,   // blue-grey kawara tile, the standard suburban roof
  RoofTileB = 43,  // the browner tile you get on every third house
  BlockWall = 44,  // the low concrete-block wall around every garden
  Tarmac = 45,     // playground safety surface
}

export const BLOCK_COLORS: number[] = [];
// Cinematic anime-city palette. Strong value separation keeps roads, parks,
// water and architecture readable from the chase camera while the warm/cool
// shifts stop the voxel landscape looking like one uniformly pastel mass.
BLOCK_COLORS[B.Road] = 0x555c69;
BLOCK_COLORS[B.Sidewalk] = 0xc8cbd1;
BLOCK_COLORS[B.Grass] = 0x5f9a63;
BLOCK_COLORS[B.Water] = 0x4389b5;
BLOCK_COLORS[B.Dirt] = 0x9b7455;
BLOCK_COLORS[B.WallGray] = 0xdfe2e7;
BLOCK_COLORS[B.WallTan] = 0xe8ddc8;
BLOCK_COLORS[B.WallBrick] = 0xc88f82;
BLOCK_COLORS[B.Window] = 0x7195ad;
BLOCK_COLORS[B.WindowLit] = 0xfff0c6;
BLOCK_COLORS[B.Glass] = 0x8bb9ce;
BLOCK_COLORS[B.Roof] = 0x9ca5b2;
BLOCK_COLORS[B.Trunk] = 0x79543f;
BLOCK_COLORS[B.Leaves] = 0x477f52;
BLOCK_COLORS[B.Red] = 0xd65348; // tower red
BLOCK_COLORS[B.White] = 0xffffff;
BLOCK_COLORS[B.NeonPink] = 0xf6b1d5;
BLOCK_COLORS[B.NeonCyan] = 0xa9ece6;
BLOCK_COLORS[B.Sand] = 0xd8c792;
BLOCK_COLORS[B.Plaza] = 0xcfd3d9;
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
BLOCK_COLORS[B.LightRed] = 0xff5a52;
BLOCK_COLORS[B.LightAmber] = 0xffc44f;
BLOCK_COLORS[B.LightGreen] = 0x5ce67a;
BLOCK_COLORS[B.Pole] = 0x5b6070;
BLOCK_COLORS[B.Stone] = 0x6f7881;   // mountain rock
BLOCK_COLORS[B.Snow] = 0xfaFdff;    // summit snow
BLOCK_COLORS[B.Deck] = 0xc4a882;    // timber pier decking
BLOCK_COLORS[B.Crate] = 0xe08a6a;   // shipping containers
BLOCK_COLORS[B.CrateB] = 0x6fa8d0;
BLOCK_COLORS[B.Steel] = 0x7f8996;   // cranes and gantries
BLOCK_COLORS[B.Puddle] = 0x397ea8; // shallow water left by the aqua blaster
BLOCK_COLORS[B.RoofTile] = 0x53677d;  // slate-blue kawara
BLOCK_COLORS[B.RoofTileB] = 0x8b6658; // warm brown kawara
BLOCK_COLORS[B.BlockWall] = 0xdcd8cf; // pale cast concrete
BLOCK_COLORS[B.Tarmac] = 0xc9bfae;    // compacted playground dirt

export function isSolid(id: number): boolean {
  return id !== B.Air && id !== B.Water && id !== B.Puddle;
}

// Blocks that catch fire — building materials and vegetation, not stone/roads.
const FLAMMABLE = new Set<number>([
  B.WallGray, B.WallTan, B.WallBrick, B.Window, B.WindowLit, B.Roof,
  B.Trunk, B.Leaves, B.Sakura, B.SakuraTrunk, B.Wood, B.TempleRoof,
  B.Red, B.White, B.Yellow,
  // suburban housing burns as readily as anything else downtown
  B.RoofTile, B.RoofTileB,
]);

export function isFlammable(id: number): boolean {
  return FLAMMABLE.has(id);
}
