// Synthesized sound effects — pure WebAudio, no asset files.

class Sfx {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private beamOsc: OscillatorNode | null = null;
  private beamGain: GainNode | null = null;

  // must be called from a user gesture (deploy click)
  ensure(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.4;
    this.master.connect(this.ctx.destination);
  }

  private noiseBuffer(dur: number): AudioBuffer {
    const ctx = this.ctx!;
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  private env(gain: GainNode, t0: number, peak: number, dur: number): void {
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  }

  laser(): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'square';
    o.frequency.setValueAtTime(950, t);
    o.frequency.exponentialRampToValueAtTime(180, t + 0.16);
    const g = ctx.createGain();
    this.env(g, t, 0.25, 0.18);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.2);
  }

  swing(): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.35);
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(300, t);
    f.frequency.exponentialRampToValueAtTime(1400, t + 0.18);
    f.frequency.exponentialRampToValueAtTime(400, t + 0.32);
    f.Q.value = 2.5;
    const g = ctx.createGain();
    this.env(g, t, 0.5, 0.34);
    src.connect(f).connect(g).connect(this.master);
    src.start(t);
  }

  explode(size: number, vol = 1): void {
    if (!this.ctx || vol <= 0) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const dur = 0.35 + size * 0.45;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer(dur);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(900 + size * 600, t);
    f.frequency.exponentialRampToValueAtTime(80, t + dur);
    const g = ctx.createGain();
    this.env(g, t, (0.25 + size * 0.45) * vol, dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t);
    // sub thump
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(90, t);
    o.frequency.exponentialRampToValueAtTime(28, t + 0.3);
    const g2 = ctx.createGain();
    this.env(g2, t, (0.4 + size * 0.3) * vol, 0.32);
    o.connect(g2).connect(this.master);
    o.start(t);
    o.stop(t + 0.35);
  }

  thud(): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(120, t);
    o.frequency.exponentialRampToValueAtTime(35, t + 0.25);
    const g = ctx.createGain();
    this.env(g, t, 0.5, 0.28);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.3);
  }

  rocket(vol = 1): void {
    if (!this.ctx || vol <= 0.04) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.5);
    const f = ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 900;
    const g = ctx.createGain();
    this.env(g, t, 0.22 * vol, 0.5);
    src.connect(f).connect(g).connect(this.master);
    src.start(t);
  }

  roar(): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 1.1);
    const vib = ctx.createOscillator();
    vib.frequency.value = 9;
    const vibGain = ctx.createGain();
    vibGain.gain.value = 22;
    vib.connect(vibGain).connect(o.frequency);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 500;
    const g = ctx.createGain();
    this.env(g, t, 0.55, 1.15);
    o.connect(f).connect(g).connect(this.master);
    o.start(t); vib.start(t);
    o.stop(t + 1.2); vib.stop(t + 1.2);
  }

  jingle(): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    [523, 659, 784, 1047].forEach((freq, i) => {
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = freq;
      const g = ctx.createGain();
      this.env(g, t + i * 0.12, 0.3, 0.5);
      o.connect(g).connect(this.master);
      o.start(t + i * 0.12);
      o.stop(t + i * 0.12 + 0.55);
    });
  }

  beamOn(): void {
    if (!this.ctx || this.beamOsc) return;
    const ctx = this.ctx, t = ctx.currentTime;
    this.beamOsc = ctx.createOscillator();
    this.beamOsc.type = 'sawtooth';
    this.beamOsc.frequency.value = 70;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 13;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 14;
    lfo.connect(lfoGain).connect(this.beamOsc.frequency);
    lfo.start(t);
    this.beamGain = ctx.createGain();
    this.beamGain.gain.setValueAtTime(0.0001, t);
    this.beamGain.gain.exponentialRampToValueAtTime(0.3, t + 0.08);
    this.beamOsc.connect(this.beamGain).connect(this.master);
    this.beamOsc.start(t);
    (this.beamOsc as any)._lfo = lfo;
  }

  beamOff(): void {
    if (!this.ctx || !this.beamOsc) return;
    const t = this.ctx.currentTime;
    this.beamGain!.gain.cancelScheduledValues(t);
    this.beamGain!.gain.setValueAtTime(this.beamGain!.gain.value, t);
    this.beamGain!.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    this.beamOsc.stop(t + 0.15);
    ((this.beamOsc as any)._lfo as OscillatorNode).stop(t + 0.15);
    this.beamOsc = null;
    this.beamGain = null;
  }
}

export const sfx = new Sfx();
