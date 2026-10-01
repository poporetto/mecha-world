// Final-image pipeline. On High the scene renders into an HDR, multisampled
// target, picks up bloom and a finishing pass, and a single OutputPass
// applies tone mapping and the sRGB transform to the whole frame at once. On
// Low it renders straight to the screen exactly as it always has, which is
// what phones get by default.
//
// Why tone map in a pass rather than per material: the sky is a clear colour,
// and three.js never tone maps the clear colour. Fuji, the clouds, the haze
// ring and the stars are all matched to that colour by hand every frame, so
// tone mapping the materials but not the background would detach every one of
// them from the sky. Mapping the finished frame keeps them welded together.

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { CITY_GLOW_GAIN, EMISSIVE_GAIN, EMITTER_GAIN } from './hdr';

export type GraphicsQuality = 'high' | 'low';

/**
 * Lens finish, in linear HDR before tone mapping: a soft vignette to pull the
 * eye to the centre, a touch of saturation to counter the shoulder of the
 * tone curve, and radial chromatic aberration that is zero at rest and is
 * kicked by heavy impacts so a big hit shudders the lens, not just the camera.
 */
const FinishShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uVignette: { value: 0.32 },
    uSaturation: { value: 1.08 },
    uAberration: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uVignette, uSaturation, uAberration;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - 0.5;
      vec3 c;
      if (uAberration > 0.0001) {
        vec2 o = d * uAberration;
        c = vec3(texture2D(tDiffuse, vUv + o).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - o).b);
      } else {
        c = texture2D(tDiffuse, vUv).rgb;
      }
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(l), c, uSaturation);
      float v = smoothstep(0.85, 0.2, length(d * vec2(1.0, 0.8)));
      c *= mix(1.0 - uVignette, 1.0, v);
      gl_FragColor = vec4(c, 1.0);
    }
  `,
};

export class PostFX {
  private composer: EffectComposer | null = null;
  private quality: GraphicsQuality = 'low';
  private bloom: UnrealBloomPass | null = null;
  private finish: ShaderPass | null = null;
  /** Decaying lens kick from heavy impacts, 0..1. */
  private kick = 0;

  constructor(
    private renderer: THREE.WebGLRenderer,
    private scene: THREE.Scene,
    private camera: THREE.Camera,
  ) {}

  get high(): boolean {
    return this.quality === 'high';
  }

  setQuality(q: GraphicsQuality): void {
    if (q === this.quality && (q === 'low' || this.composer)) return;
    this.quality = q;
    this.dispose();
    if (q === 'low') {
      this.renderer.toneMapping = THREE.NoToneMapping;
      EMITTER_GAIN.value = 1;
      EMISSIVE_GAIN.value = 1;
      CITY_GLOW_GAIN.value = 1;
      return;
    }
    // Emitters go HDR so bloom can find them. Measured: nothing lit in the
    // city exceeds ~0.7 by day, so a 1.0 threshold leaves concrete alone and
    // only light sources clear it.
    EMITTER_GAIN.value = 2.6;
    EMISSIVE_GAIN.value = 2.4;
    // Windows stay just under the bloom threshold (measured ~0.88 at night).
    // They cover ~7% of a night frame; any gain that lifts them over it turns
    // the skyline into fog however the bloom is tuned.
    CITY_GLOW_GAIN.value = 1.0;
    // Khronos PBR Neutral: near-identity through the mids, so the authored
    // pastel palette keeps its hue and saturation, with a soft shoulder that
    // brings sun-blown white concrete back from clipping. ACES would pull the
    // whole city toward a desaturated orange.
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    // HDR so bloom can see values above 1, and multisampled: a composer
    // target has no MSAA by default, and voxel edges are all straight lines
    // that alias badly without it.
    const target = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      samples: 4,
    });
    const composer = new EffectComposer(this.renderer, target);
    composer.addPass(new RenderPass(this.scene, this.camera));
    const css = this.renderer.getSize(new THREE.Vector2());
    this.bloom = new UnrealBloomPass(new THREE.Vector2(css.x, css.y), 0.5, 0.38, 1.0);
    composer.addPass(this.bloom);
    this.finish = new ShaderPass(FinishShader);
    composer.addPass(this.finish);
    composer.addPass(new OutputPass());
    this.composer = composer;
  }

  /** CSS pixels — the composer applies the renderer's pixel ratio itself. */
  setSize(w: number, h: number): void {
    this.composer?.setSize(w, h);
  }

  /** A heavy hit: shudder the lens. Strength 0..1, takes the larger. */
  impact(strength: number): void {
    this.kick = Math.max(this.kick, Math.min(1, strength));
  }

  render(dt = 0): void {
    if (this.composer) {
      this.kick = Math.max(0, this.kick - dt * 3.2);
      if (this.finish) this.finish.uniforms.uAberration.value = this.kick * this.kick * 0.012;
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private dispose(): void {
    if (!this.composer) return;
    this.composer.renderTarget1.dispose();
    this.composer.renderTarget2.dispose();
    for (const p of this.composer.passes) p.dispose?.();
    this.composer = null;
    this.bloom = null;
    this.finish = null;
  }
}
