// Synthesized sound effects — pure WebAudio, no asset files.

export type MusicMode = 'intro' | 'explore' | 'boss' | 'revenant';

class Sfx {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private beamOsc: OscillatorNode | null = null;
  private beamGain: GainNode | null = null;

  // ------- background music (procedural, scheduled ahead in small windows)
  private musicGain: GainNode | null = null;
  /** Pads and melody go through this: gentle lowpass, then reverb + dry. */
  private musicVoice: AudioNode | null = null;
  private musicWet: GainNode | null = null;
  private musicTimer: number | null = null;
  /** Panners reused per voice role so the mix has width without churn. */
  private panL: StereoPannerNode | null = null;
  private panR: StereoPannerNode | null = null;
  private nextBarTime = 0;
  private barIndex = 0;
  private musicMode: MusicMode = 'intro';
  private requestedMode: MusicMode = 'intro';
  private sfxVolume = 0.4;
  private musicVolume = 0.145;
  private lowHealth = false;

  // must be called from a user gesture (deploy click)
  ensure(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.sfxVolume;
    this.master.connect(this.ctx.destination);
  }

  /**
   * A synthetic room. Exponentially decaying noise, slightly different per
   * channel so the tail is stereo — cheaper and smaller than shipping an
   * impulse response file, and this score only needs space, not a real hall.
   */
  private reverbImpulse(seconds: number, decay: number): AudioBuffer {
    const ctx = this.ctx!;
    const n = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < n; i++) {
        // a touch of early smear on the front so it does not sound like a gate
        const t = i / n;
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * (t < 0.02 ? t / 0.02 : 1);
      }
    }
    return buf;
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

  impact(strength = 1, weakPoint = false): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const hit = ctx.createBufferSource();
    hit.buffer = this.noiseBuffer(0.14);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = weakPoint ? 1800 : 720;
    filter.Q.value = weakPoint ? 1.8 : 0.8;
    const gain = ctx.createGain();
    this.env(gain, t, Math.min(0.65, 0.22 + strength * 0.25), 0.13);
    hit.connect(filter).connect(gain).connect(this.master);
    hit.start(t);

    const body = ctx.createOscillator();
    body.type = 'triangle';
    body.frequency.setValueAtTime(weakPoint ? 240 : 105, t);
    body.frequency.exponentialRampToValueAtTime(42, t + 0.16);
    const bodyGain = ctx.createGain();
    this.env(bodyGain, t, Math.min(0.55, 0.18 + strength * 0.22), 0.18);
    body.connect(bodyGain).connect(this.master);
    body.start(t);
    body.stop(t + 0.2);
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

  // Adaptive score. Every mode shares the scheduler, but has its own tempo,
  // harmony, rhythm and instrumentation so transitions feel musical rather
  // than like the same loop merely playing faster.
  startMusic(mode: MusicMode = 'intro'): void {
    if (!this.ctx) return;
    if (this.musicTimer !== null) {
      this.requestedMode = mode;
      return;
    }
    this.musicMode = this.requestedMode = mode;
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = this.musicVolume;
    this.musicGain.connect(this.ctx.destination);

    // Every note used to run bare into the output, which is why the score read
    // as a chiptune: raw oscillators with no room around them. Pads and melody
    // now go through a soft lowpass into a parallel reverb, so chords bloom and
    // decay instead of stopping dead at the end of the bar.
    const ctx = this.ctx;
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 3200;
    tone.Q.value = 0.4;
    const dry = ctx.createGain();
    dry.gain.value = 0.78;
    const wet = ctx.createGain();
    wet.gain.value = 0.42;
    const verb = ctx.createConvolver();
    verb.buffer = this.reverbImpulse(2.6, 2.4);
    tone.connect(dry).connect(this.musicGain);
    tone.connect(verb).connect(wet).connect(this.musicGain);
    this.musicVoice = tone; // entry point for every musical (non-drum) voice
    this.musicWet = wet;
    this.panL = ctx.createStereoPanner();
    this.panL.pan.value = -0.35;
    this.panL.connect(tone);
    this.panR = ctx.createStereoPanner();
    this.panR.pan.value = 0.35;
    this.panR.connect(tone);
    this.nextBarTime = this.ctx.currentTime + 0.1;
    this.barIndex = 0;
    // lookahead scheduler: top up whenever less than 2 bars are queued
    this.musicTimer = window.setInterval(() => this.scheduleMusic(), 250);
  }

  setMusicIntensity(v: number): void {
    this.setMusicMode(v > 0.5 ? 'boss' : 'explore');
  }

  setMusicMode(mode: MusicMode): void {
    this.requestedMode = mode;
  }

  setVolumes(music: number, effects: number): void {
    this.musicVolume = Math.max(0, Math.min(1, music)) * 0.24;
    this.sfxVolume = Math.max(0, Math.min(1, effects)) * 0.65;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.sfxVolume, t, 0.04);
    if (this.musicGain) {
      const duck = this.lowHealth ? 0.72 : 1;
      this.musicGain.gain.setTargetAtTime(this.musicVolume * duck, t, 0.18);
    }
  }

  setLowHealth(on: boolean): void {
    if (this.lowHealth === on) return;
    this.lowHealth = on;
    if (!this.ctx || !this.musicGain) return;
    this.musicGain.gain.setTargetAtTime(this.musicVolume * (on ? 0.72 : 1), this.ctx.currentTime, 0.35);
    if (on) this.warningPulse();
  }

  footstep(weight = 1): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(72, t);
    o.frequency.exponentialRampToValueAtTime(32, t + 0.12);
    const g = ctx.createGain();
    this.env(g, t, 0.18 * weight, 0.14);
    o.connect(g).connect(this.master); o.start(t); o.stop(t + 0.16);
  }

  servo(vol = 1): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = 'triangle';
    o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(420, t + 0.09);
    const g = ctx.createGain(); this.env(g, t, 0.06 * vol, 0.1);
    o.connect(g).connect(this.master); o.start(t); o.stop(t + 0.12);
  }

  bossStinger(dark = false): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = dark ? [55, 77.78, 58.27] : [73.42, 110, 146.83];
    notes.forEach((f, i) => this.note(f, t + i * 0.13, 0.75, dark ? 'sawtooth' : 'triangle', 0.18, this.master));
    this.drum(t, 0.28, false, this.master);
  }

  phaseStinger(final = false): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [146.83, 174.61, final ? 293.66 : 220].forEach((f, i) =>
      this.note(f, t + i * 0.08, 0.4, 'sawtooth', 0.12, this.master));
  }

  victoryStinger(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [220, 277.18, 329.63, 440].forEach((f, i) =>
      this.note(f, t + i * 0.14, 0.65, 'triangle', 0.16, this.master));
  }

  private warningPulse(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    for (let i = 0; i < 2; i++) this.note(82.41, t + i * 0.22, 0.12, 'square', 0.06, this.master);
  }

  private scheduleMusic(): void {
    const ctx = this.ctx!;
    const barLen = this.barLength(this.musicMode);
    while (this.nextBarTime < ctx.currentTime + barLen * 2) {
      // Quantize score changes to bar lines: no chopped notes or abrupt tempo
      // jumps, but the new encounter identity arrives within one phrase.
      if (this.musicMode !== this.requestedMode) {
        this.musicMode = this.requestedMode;
        this.barIndex = 0;
      }
      const activeLen = this.barLength(this.musicMode);
      this.scheduleBar(this.nextBarTime, activeLen);
      this.nextBarTime += activeLen;
      this.barIndex++;
    }
  }

  private barLength(mode: MusicMode): number {
    if (mode === 'boss') return 1.35;
    if (mode === 'revenant') return 1.72;
    if (mode === 'intro') return 2.4;
    return 2.05;
  }

  /**
   * `attack` is what separates a pad from a pluck. Everything used to reach
   * full level in 40ms regardless of role, so sustained chords started with
   * the same click as a lead note and the whole score read as one instrument.
   * `detune` in cents thickens a voice against its own unison.
   */
  private note(
    freq: number, t: number, dur: number, type: OscillatorType, peak: number, out: AudioNode,
    attack = 0.04, detune = 0,
  ): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    if (detune) o.detune.value = detune;
    const g = ctx.createGain();
    const a = Math.min(attack, dur * 0.5);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    // hold briefly at level, then a long tail — an instant decay from the peak
    // is why sustained notes sounded like they were being switched off
    g.gain.setValueAtTime(peak, t + Math.min(dur * 0.55, a + dur * 0.3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.08);
  }

  private drum(t: number, peak: number, bright: boolean, out: GainNode): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer(bright ? 0.11 : 0.2);
    const filter = ctx.createBiquadFilter();
    filter.type = bright ? 'highpass' : 'lowpass';
    filter.frequency.value = bright ? 2600 : 240;
    const gain = ctx.createGain();
    this.env(gain, t, peak, bright ? 0.1 : 0.18);
    src.connect(filter).connect(gain).connect(out);
    src.start(t);
  }

  private scheduleBar(t: number, barLen: number): void {
    const out = this.musicGain!;
    const mode = this.musicMode;
    const progressions: Record<MusicMode, number[][]> = {
      // Open fifths and a rising answer: a deployment theme, not combat music.
      intro: [[146.83, 220, 293.66], [174.61, 261.63, 349.23], [196, 293.66, 392], [220, 329.63, 440]],
      // Dreamy minor city patrol.
      explore: [[220, 261.63, 329.63], [174.61, 220, 261.63], [130.81, 196, 261.63], [196, 246.94, 293.66]],
      // Tense D-minor combat movement with a dominant turnaround.
      boss: [[146.83, 174.61, 220], [116.54, 146.83, 174.61], [130.81, 164.81, 196], [138.59, 174.61, 207.65]],
      // TA-00 uses semitone tension and hollow tritones instead of heroic harmony.
      revenant: [[110, 155.56, 164.81], [103.83, 146.83, 155.56], [92.5, 130.81, 138.59], [110, 155.56, 164.81]],
    };
    const chords = progressions[mode];
    const chord = chords[this.barIndex % 4];
    const combat = mode === 'boss';
    const dark = mode === 'revenant';
    const intro = mode === 'intro';
    // Musical voices go through the tone/reverb bus; drums stay dry and
    // forward so the rhythm keeps its edge in a wash of reverb.
    const voice: AudioNode = this.musicVoice ?? out;
    const wide = this.barIndex % 2 === 0 ? (this.panL ?? voice) : (this.panR ?? voice);
    // Eight bars, not four: the second half re-voices the same progression an
    // octave apart and drops a beat, so the loop stops announcing itself every
    // four bars the way it did when the only cycle was the chord table.
    const phrase = Math.floor(this.barIndex / 4) % 2 === 1;

    // The Revenant loses the warm upper octave and gains detuned saw voices;
    // bosses get brass-like saw reinforcement; intro stays broad and clean.
    for (const f of chord) {
      // pads swell over a third of the bar and ring past its end
      this.note(f, t, barLen * 1.6, dark ? 'sawtooth' : 'triangle',
        dark ? 0.025 : 0.042, voice, barLen * 0.3);
      this.note(f, t, barLen * 1.6, dark ? 'sawtooth' : 'triangle',
        dark ? 0.018 : 0.03, wide, barLen * 0.34, dark ? 9 : 5);
      if (!dark) {
        this.note(f * 2.003, t, barLen * 1.35, 'sine',
          (intro ? 0.04 : 0.025) * (phrase ? 1.25 : 1), voice, barLen * 0.4);
      }
      if (combat) this.note(f * 0.997, t, barLen * 0.72, 'sawtooth', 0.025, voice, 0.02);
    }
    // Bass rhythm is the main intensity carrier. Kept dry — reverb on a low
    // sine is just mud.
    const root = chord[0] / 2;
    this.note(root, t, barLen * (dark ? 1.15 : 0.9), dark ? 'triangle' : 'sine',
      dark ? 0.14 : 0.11, out, 0.03);
    if (combat) {
      // the eighth bar of the phrase drops the third beat: a breath, and the
      // downbeat that follows it lands much harder for costing nothing
      const beats = phrase && this.barIndex % 4 === 3 ? [0, 0.25, 0.75] : [0, 0.25, 0.5, 0.75];
      for (const beat of beats) {
        this.note(root, t + barLen * beat, barLen * 0.18, 'sawtooth', 0.055, out, 0.012);
        this.drum(t + barLen * beat, beat === 0 ? 0.12 : 0.07, false, out);
      }
      this.drum(t + barLen * 0.5, 0.07, true, out);
      if (phrase) this.drum(t + barLen * 0.875, 0.05, true, out);
    } else if (dark) {
      this.drum(t, 0.11, false, out);
      this.drum(t + barLen * 0.75, 0.045, true, out);
    } else {
      // a soft pulse on the downbeat so exploration has a floor to sit on
      this.drum(t, 0.05, false, out);
    }
    // Melodic motion: spacious intro, light exploration, frantic boss ostinato,
    // and an intentionally incomplete Revenant pulse that never resolves.
    // Melody: real motifs with rests in them. The old line was degree i % 3
    // across every step of every bar — no phrasing, no silence, and after two
    // loops the ear had nothing left to find.
    const MOTIFS: Record<MusicMode, (number | null)[][]> = {
      intro:    [[0, null, 1, 2], [2, 1, null, 0]],
      explore:  [[0, null, 2, 1, null], [2, 1, null, 0, null]],
      boss:     [[0, 2, 1, 2, 0, null, 1, 2], [0, 1, 2, null, 2, 1, 0, null]],
      revenant: [[0, null, 2], [2, null, 1]],
    };
    const motif = MOTIFS[mode][phrase ? 1 : 0];
    for (let i = 0; i < motif.length; i++) {
      const degree = motif[i];
      if (degree === null) continue; // the rest is the point
      const octave = combat ? 2 : intro && i === motif.length - 1 ? 4 : phrase ? 4 : 2;
      const f = chord[degree] * octave;
      const accent = i === 0 ? 1.25 : 1;
      this.note(f, t + (i / motif.length) * barLen, dark ? 0.62 : combat ? 0.26 : 0.44,
        dark ? 'sine' : 'triangle',
        (combat ? 0.062 : dark ? 0.035 : 0.04) * accent,
        i % 2 === 0 ? (this.panR ?? voice) : (this.panL ?? voice),
        combat ? 0.015 : 0.06);
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
