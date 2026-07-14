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
BLOCK_COLORS[B.Road] = 0x3c3d44;
BLOCK_COLORS[B.Sidewalk] = 0x9d9da4;
BLOCK_COLORS[B.Grass] = 0x4f9448;
BLOCK_COLORS[B.Water] = 0x2f7fd6;
BLOCK_COLORS[B.Dirt] = 0x6b4f35;
BLOCK_COLORS[B.WallGray] = 0xbdbdc2;
BLOCK_COLORS[B.WallTan] = 0xd3c4a8;
BLOCK_COLORS[B.WallBrick] = 0xa06a56;
BLOCK_COLORS[B.Window] = 0x2b4f74;
BLOCK_COLORS[B.WindowLit] = 0xffd97a;
BLOCK_COLORS[B.Glass] = 0x86b9dd;
BLOCK_COLORS[B.Roof] = 0x565760;
BLOCK_COLORS[B.Trunk] = 0x6e4a2f;
BLOCK_COLORS[B.Leaves] = 0x3e7c39;
BLOCK_COLORS[B.Red] = 0xd93a2b;
BLOCK_COLORS[B.White] = 0xf2f2f4;
BLOCK_COLORS[B.NeonPink] = 0xff4fa3;
BLOCK_COLORS[B.NeonCyan] = 0x39e6e0;
BLOCK_COLORS[B.Sand] = 0xd9cb9a;
BLOCK_COLORS[B.Plaza] = 0xc6c8ce;

export function isSolid(id: number): boolean {
  return id !== B.Air && id !== B.Water;
}
