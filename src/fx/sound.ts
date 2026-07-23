// Synthesized sound effects — pure WebAudio, no asset files.

class Sfx {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private beamOsc: OscillatorNode | null = null;
  private beamGain: GainNode | null = null;

  // ------- background music (procedural, scheduled ahead in small windows)
  private musicGain: GainNode | null = null;
  private musicTimer: number | null = null;
  private nextBarTime = 0;
  private barIndex = 0;
  private intensity = 0; // 0 calm exploration, 1 boss fight

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

  zap(vol = 1): void {
    if (!this.ctx || vol <= 0.04) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(2400, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.22);
    const g = ctx.createGain();
    this.env(g, t, 0.35 * vol, 0.24);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.26);
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.2);
    const f = ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 2000;
    const g2 = ctx.createGain();
    this.env(g2, t, 0.25 * vol, 0.18);
    src.connect(f).connect(g2).connect(this.master);
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

  // ------------------------------------------------------------- music

  // Chill pastel-city loop: pad chords + soft bass + sparkly arpeggio.
  // Intensity (boss fights) speeds the arp, adds a driving pulse bass.
  startMusic(): void {
    if (!this.ctx || this.musicTimer !== null) return;
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.16;
    this.musicGain.connect(this.ctx.destination);
    this.nextBarTime = this.ctx.currentTime + 0.1;
    this.barIndex = 0;
    // lookahead scheduler: top up whenever less than 2 bars are queued
    this.musicTimer = window.setInterval(() => this.scheduleMusic(), 250);
  }

  setMusicIntensity(v: number): void {
    this.intensity = Math.max(0, Math.min(1, v));
  }

  private scheduleMusic(): void {
    const ctx = this.ctx!;
    const barLen = 2.0 - this.intensity * 0.5; // bars shorten when fighting
    while (this.nextBarTime < ctx.currentTime + barLen * 2) {
      this.scheduleBar(this.nextBarTime, barLen);
      this.nextBarTime += barLen;
      this.barIndex++;
    }
  }

  private note(freq: number, t: number, dur: number, type: OscillatorType, peak: number, out: GainNode): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private scheduleBar(t: number, barLen: number): void {
    const out = this.musicGain!;
    // i–VI–III–VII in A minor: dreamy, loops seamlessly
    const chords = [
      [220.0, 261.63, 329.63], // Am
      [174.61, 220.0, 261.63], // F
      [130.81, 196.0, 261.63], // C  (low voicing)
      [196.0, 246.94, 293.66], // G
    ];
    const chord = chords[this.barIndex % 4];
    const hi = this.intensity;

    // pad: two soft triangle voices per chord tone
    for (const f of chord) {
      this.note(f, t, barLen * 1.05, 'triangle', 0.05 + hi * 0.02, out);
      this.note(f * 2.003, t, barLen * 1.05, 'sine', 0.03, out);
    }
    // bass: root an octave down; pulses on half-bar when intense
    const root = chord[0] / 2;
    this.note(root, t, barLen * 0.9, 'sine', 0.12, out);
    if (hi > 0.3) {
      this.note(root, t + barLen / 2, barLen * 0.35, 'sawtooth', 0.05 * hi, out);
      this.note(root, t + barLen * 0.75, barLen * 0.2, 'sawtooth', 0.05 * hi, out);
    }
    // arpeggio: plucked chord tones, denser when intense
    const steps = hi > 0.3 ? 8 : 4;
    for (let i = 0; i < steps; i++) {
      const f = chord[i % 3] * (i % 3 === 0 && i > 0 ? 4 : 2);
      this.note(f, t + (i / steps) * barLen, 0.22, 'triangle', 0.045 + hi * 0.03, out);
    }
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
