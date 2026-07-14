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
}

export const BLOCK_COLORS: number[] = [];
// soft pastel palette
BLOCK_COLORS[B.Road] = 0x73758a;
BLOCK_COLORS[B.Sidewalk] = 0xd2d3dd;
BLOCK_COLORS[B.Grass] = 0xa5dfa0;
BLOCK_COLORS[B.Water] = 0x9fd2f0;
BLOCK_COLORS[B.Dirt] = 0xc9a687;
BLOCK_COLORS[B.WallGray] = 0xe9e7f0;
BLOCK_COLORS[B.WallTan] = 0xf8ead0;
BLOCK_COLORS[B.WallBrick] = 0xeab49e;
BLOCK_COLORS[B.Window] = 0x9fc2e4;
BLOCK_COLORS[B.WindowLit] = 0xffedbb;
BLOCK_COLORS[B.Glass] = 0xcbe7f8;
BLOCK_COLORS[B.Roof] = 0xb3b5c8;
BLOCK_COLORS[B.Trunk] = 0xbb9070;
BLOCK_COLORS[B.Leaves] = 0x99d98f;
BLOCK_COLORS[B.Red] = 0xf0968a;
BLOCK_COLORS[B.White] = 0xfcfcff;
BLOCK_COLORS[B.NeonPink] = 0xf6b1d5;
BLOCK_COLORS[B.NeonCyan] = 0xa9ece6;
BLOCK_COLORS[B.Sand] = 0xf4e8c6;
BLOCK_COLORS[B.Plaza] = 0xe6e7ee;
BLOCK_COLORS[B.RoadLine] = 0xf6f6fa;
BLOCK_COLORS[B.Yellow] = 0xf8dfa2;
BLOCK_COLORS[B.Flower] = 0xf8bcd8;

export function isSolid(id: number): boolean {
  return id !== B.Air && id !== B.Water;
}
