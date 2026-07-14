# MECHA CITY — Neo Tokyo

An infinite, fully destructible voxel open world. You pilot a mecha through a
procedurally generated Tokyo-inspired city — carve through skyscrapers with a
light saber and laser cannon, scatter (unharmable) citizens and their dogs,
and hunt kaiju-class bosses. Every boss you defeat teaches you a new power.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## Controls

| Input | Action |
| --- | --- |
| WASD | move (SHIFT to boost) |
| Mouse | camera (click canvas to lock cursor) |
| Space | jump — **hold to fly** once Rocket Boots are unlocked |
| Left click | light saber swing |
| Right click / F | laser cannon |
| E (hold) | plasma beam — unlocked by defeating the kaiju |

## Progression

1. **GORGOSAUR** (kaiju) stomps through the city → defeat it to unlock the **Plasma Beam**.
2. **MISSILE MAW** (rocket beast) bombards you from the air → defeat it to unlock **Rocket Boots** (flight).
3. Endless mode: stronger bosses keep coming; each kill grants full repairs.

## Architecture

```
src/
  core/      platform-agnostic game logic (no DOM, no three.js)
    blocks.ts    block ids + colors
    noise.ts     deterministic hashing / value noise
    worldgen.ts  infinite Neo-Tokyo generator (districts, roads, river,
                 landmarks: red lattice tower, spire, torii gates)
    world.ts     chunk store, destruction, voxel raycast
  render/    three.js chunk meshing + streaming
  entities/  mecha model, player controller, NPCs, monsters
  fx/        instanced voxel debris
  ui/        DOM HUD (health, boss bar, unlocks, toasts)
  game.ts    orchestrator (input, combat, projectiles, boss cycle)
```

The world is deterministic: chunks are generated on demand from pure functions
of (x, z), so the city extends forever in every direction. Destruction edits
chunk data and remeshes only the affected chunks.

## Mobile roadmap (iOS / Android)

The build is Capacitor-ready (`base: './'`, self-contained bundle):

1. `npm i @capacitor/core @capacitor/cli && npx cap init && npx cap add ios android`
2. Add a touch input layer (virtual joystick + attack buttons) behind the same
   input interface the keyboard uses — `src/core` needs no changes.
3. Lower `MESH_R`/pixel ratio on mobile GPUs; consider greedy meshing.

## Ideas for next milestones

- More bosses/upgrades: shield generator, grappling hook, time-slow reactor
- Sound design (saber hum, kaiju roars, crumbling concrete)
- Day/night cycle with lit windows and neon signage at night
- Save/load (persist edited chunks + unlocks to IndexedDB)
- More landmark districts: crossing with giant video screens, stadium, harbor
