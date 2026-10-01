// HDR emitters, switched centrally.
//
// Bloom only picks up pixels brighter than 1.0, and measured in the scene
// buffer nothing in this game was: sunlit concrete sits around 0.6-0.7, night
// windows top out at 0.88, and every beam, thruster and eye was a plain
// colour at or below 1. So nothing could glow. Rather than edit every site
// that builds an effect, the material shaders are patched once:
//
//   * unlit materials that are additive, or flagged with userData.glow, have
//     their output scaled by EMITTER_GAIN — beams, thruster flames, dash
//     jets, muzzle flashes, explosions, the sun's disc, the rift's core;
//   * every lit material's emissive term is scaled by EMISSIVE_GAIN — eyes,
//     cores, the visor, hit flashes and telegraph tints.
//
// Both gains are 1 on Low, which makes the patch an exact no-op there.

import * as THREE from 'three';

/** Shared uniforms: one object each, referenced by every patched program. */
export const EMITTER_GAIN = { value: 1 };
export const EMISSIVE_GAIN = { value: 1 };
/**
 * The city's lit windows and neon get their own, much gentler gain. Driven by
 * the emissive gain they sat at ~2.0 and covered 7% of a night frame, and the
 * whole skyline bloomed into fog. Just over the threshold, each one carries
 * a faint halo and the beams and eyes keep the real glow.
 */
export const CITY_GLOW_GAIN = { value: 1 };

/**
 * An unlit material is a light source if it is additive, explicitly flagged,
 * or takes part in fog. The last rule is a property of this codebase rather
 * than of three: every backdrop element (Fuji, clouds, haze, moon, stars) is
 * built with fog:false so it sits behind the fog, and every fog-enabled
 * unlit material is an effect — beams, bolts, flames, rings, pickups, nav
 * lights. The backdrop pieces that should glow (sun disc, rift) use glow().
 */
const isEmitter = (m: THREE.Material): boolean =>
  m.blending === THREE.AdditiveBlending || m.userData.glow === true
  || (m as THREE.MeshBasicMaterial).fog === true;

let installed = false;

export function installHdrMaterials(): void {
  if (installed) return;
  installed = true;

  const basic = THREE.MeshBasicMaterial.prototype as THREE.Material;
  basic.onBeforeCompile = function (this: THREE.Material, shader) {
    if (!isEmitter(this)) return;
    shader.uniforms.uEmitterGain = EMITTER_GAIN;
    shader.fragmentShader = 'uniform float uEmitterGain;\n' + shader.fragmentShader.replace(
      '#include <opaque_fragment>',
      'outgoingLight *= uEmitterGain;\n#include <opaque_fragment>',
    );
  };
  // Programs are cached by source; emitters and non-emitters must not share.
  // Keep the default's onBeforeCompile source in the key, so an instance
  // with its own patch never shares a compiled program with a plain one.
  basic.customProgramCacheKey = function (this: THREE.Material) {
    return (isEmitter(this) ? 'hdr-emitter|' : 'hdr-plain|') + this.onBeforeCompile.toString();
  };

  for (const proto of [THREE.MeshLambertMaterial.prototype, THREE.MeshStandardMaterial.prototype]) {
    const p = proto as THREE.Material;
    p.onBeforeCompile = function (shader) {
      shader.uniforms.uEmissiveGain = EMISSIVE_GAIN;
      shader.fragmentShader = 'uniform float uEmissiveGain;\n' + shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\ntotalEmissiveRadiance *= uEmissiveGain;',
      );
    };
    p.customProgramCacheKey = function (this: THREE.Material) {
      return 'hdr-emissive|' + this.onBeforeCompile.toString();
    };
  }
}

/** Flag a non-additive unlit material as a light source so it can bloom. */
export function glow<M extends THREE.Material>(m: M): M {
  m.userData.glow = true;
  m.needsUpdate = true;
  return m;
}
