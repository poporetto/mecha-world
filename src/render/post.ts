// Final-image pipeline. On High the scene renders into an HDR, multisampled
// target and a single OutputPass applies tone mapping and the sRGB transform
// to the whole frame at once. On Low it renders straight to the screen exactly
// as it always has, which is what phones get by default.
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

export type GraphicsQuality = 'high' | 'low';

export class PostFX {
  private composer: EffectComposer | null = null;
  private quality: GraphicsQuality = 'low';

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
      return;
    }
    // Khronos PBR Neutral: near-identity through the mids, so the authored
    // pastel palette keeps its hue and saturation, with a soft shoulder that
    // brings sun-blown white concrete back from clipping. ACES would pull the
    // whole city toward a desaturated orange.
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    // HDR so later passes (bloom) can see values above 1, and multisampled:
    // a composer target has no MSAA by default, and voxel edges are all
    // straight lines that alias badly without it.
    const target = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      samples: 4,
    });
    const composer = new EffectComposer(this.renderer, target);
    composer.addPass(new RenderPass(this.scene, this.camera));
    composer.addPass(new OutputPass());
    this.composer = composer;
  }

  /** CSS pixels — the composer applies the renderer's pixel ratio itself. */
  setSize(w: number, h: number): void {
    this.composer?.setSize(w, h);
  }

  render(): void {
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }

  private dispose(): void {
    if (!this.composer) return;
    this.composer.renderTarget1.dispose();
    this.composer.renderTarget2.dispose();
    for (const p of this.composer.passes) p.dispose?.();
    this.composer = null;
  }
}
