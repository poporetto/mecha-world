// Sun shadows that ride with the pilot.
//
// One directional shadow map, a tight box around the player rather than the
// whole draw distance: the city is drawn ~190 units out, but what reads as
// "grounded" is the mecha's own shadow, the kaiju's, and the towers' shadows
// across the streets you are fighting in. A 200-unit square at 2048 gives
// about a tenth of a block per texel, which keeps voxel edges crisp.

import * as THREE from 'three';

const HALF = 100;          // half-width of the shadowed square, world units
const DISTANCE = 260;      // how far up-sun the light sits from the pilot
const MAP = 2048;
const TEXEL = (HALF * 2) / MAP;
/** Floor on the light's elevation — see update(). */
const MIN_ELEVATION = 0.28;

const _dir = new THREE.Vector3();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3();
const _fwd = new THREE.Vector3();
const _snap = new THREE.Vector3();
const WORLD_UP = new THREE.Vector3(0, 1, 0);

export class SunShadow {
  private on = false;

  constructor(
    private renderer: THREE.WebGLRenderer,
    private scene: THREE.Scene,
    private sun: THREE.DirectionalLight,
  ) {
    const s = sun.shadow;
    s.mapSize.set(MAP, MAP);
    const cam = s.camera as THREE.OrthographicCamera;
    cam.left = -HALF; cam.right = HALF; cam.top = HALF; cam.bottom = -HALF;
    cam.near = 1; cam.far = DISTANCE * 2;
    cam.updateProjectionMatrix();
    // Voxel faces are axis-aligned and huge relative to a texel, which is
    // the worst case for acne; a normal offset fixes it without the peter-
    // panning a large depth bias causes at the feet of the mecha.
    s.normalBias = 0.06;
    s.bias = -0.0004;
    // The palette is pastel and daylit. Full-strength shadows read as a
    // different, harsher game; three-quarters keeps the sky fill in them.
    s.intensity = 0.72;
    this.scene.add(sun.target);
  }

  get enabled(): boolean {
    return this.on;
  }

  setEnabled(on: boolean): void {
    if (on === this.on) return;
    this.on = on;
    this.renderer.shadowMap.enabled = on;
    this.renderer.shadowMap.type = THREE.PCFShadowMap; // PCFSoft is deprecated in r18x and falls back to this anyway
    this.sun.castShadow = on;
    // Shadow support is compiled into each material's program; force every
    // material to rebuild so the change applies without a reload.
    this.scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
      if (!m) return;
      for (const mat of Array.isArray(m) ? m : [m]) mat.needsUpdate = true;
    });
  }

  /**
   * Re-centre the shadow box on the pilot. `sunDir` points toward the sun.
   *
   * The light's elevation is floored rather than following the sun below the
   * horizon: at night the sky's "sun" points underground, and toggling
   * castShadow at dusk would recompile every material in the scene at once.
   * Floored, the light keeps casting from just above the horizon on the
   * sun's bearing, and the sky's tiny night intensity makes it invisible.
   * The floor also stops a low sun throwing shadows half a district long.
   */
  update(center: THREE.Vector3, sunDir: THREE.Vector3): void {
    _dir.copy(sunDir);
    const flat = Math.hypot(_dir.x, _dir.z) || 1;
    const y = Math.max(MIN_ELEVATION, _dir.y);
    const k = Math.sqrt(Math.max(0, 1 - y * y)) / flat;
    _dir.set(_dir.x * k, y, _dir.z * k).normalize();

    // Snap the box to whole shadow-map texels in the light's own frame.
    // Without this the shadow edges crawl and shimmer every frame you move.
    _fwd.copy(_dir).negate();
    _right.crossVectors(_fwd, WORLD_UP).normalize();
    _up.crossVectors(_right, _fwd).normalize();
    const r = Math.floor(center.dot(_right) / TEXEL) * TEXEL;
    const u = Math.floor(center.dot(_up) / TEXEL) * TEXEL;
    const f = center.dot(_fwd);
    _snap.copy(_right).multiplyScalar(r).addScaledVector(_up, u).addScaledVector(_fwd, f);

    this.sun.target.position.copy(_snap);
    this.sun.position.copy(_snap).addScaledVector(_dir, DISTANCE);
    this.sun.target.updateMatrixWorld();
  }
}

/**
 * Mark everything lit under an object as casting and receiving. Unlit
 * materials (thruster flames, beams, glows) are skipped: a flame that casts a
 * shadow reads as a solid object.
 */
export function castShadows(root: THREE.Object3D, receive = true): void {
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const mat = m.material as THREE.Material;
    if (!mat || (mat as THREE.MeshBasicMaterial).isMeshBasicMaterial) return;
    if (mat.transparent) return;
    m.castShadow = true;
    m.receiveShadow = receive;
  });
}
