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
}

export const BLOCK_COLORS: number[] = [];
BLOCK_COLORS[B.Road] = 0x4c4d56;
BLOCK_COLORS[B.Sidewalk] = 0xb4b4bc;
BLOCK_COLORS[B.Grass] = 0x62c14f;
BLOCK_COLORS[B.Water] = 0x3fa2ec;
BLOCK_COLORS[B.Dirt] = 0x8a6544;
BLOCK_COLORS[B.WallGray] = 0xd9dadf;
BLOCK_COLORS[B.WallTan] = 0xf0ddb2;
BLOCK_COLORS[B.WallBrick] = 0xd08a66;
BLOCK_COLORS[B.Window] = 0x3f74ad;
BLOCK_COLORS[B.WindowLit] = 0xffe28a;
BLOCK_COLORS[B.Glass] = 0x9ed4f2;
BLOCK_COLORS[B.Roof] = 0x777988;
BLOCK_COLORS[B.Trunk] = 0x8a5c3a;
BLOCK_COLORS[B.Leaves] = 0x4fa843;
BLOCK_COLORS[B.Red] = 0xe8442f;
BLOCK_COLORS[B.White] = 0xfafafc;
BLOCK_COLORS[B.NeonPink] = 0xff4fa3;
BLOCK_COLORS[B.NeonCyan] = 0x39e6e0;
BLOCK_COLORS[B.Sand] = 0xe8d9a4;
BLOCK_COLORS[B.Plaza] = 0xd4d6dd;

export function isSolid(id: number): boolean {
  return id !== B.Air && id !== B.Water;
}
