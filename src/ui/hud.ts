// DOM overlay HUD: health, boss bar, ability chips, toasts, start screen.

export class Hud {
  private root: HTMLElement;
  private hpFill!: HTMLElement;
  private bossWrap!: HTMLElement;
  private bossName!: HTMLElement;
  private bossFill!: HTMLElement;
  private toastEl!: HTMLElement;
  private vignette!: HTMLElement;
  private chips: Record<string, HTMLElement> = {};
  private toastTimer = 0;

  constructor() {
    this.root = document.getElementById('hud')!;
    this.root.innerHTML = `
      <style>
        .hud-bar { position:absolute; left:24px; top:20px; width:260px; }
        .hud-label { color:#cfe6ff; font-size:11px; letter-spacing:2px; margin-bottom:4px; text-shadow:0 1px 3px #000a; }
        .hud-track { height:14px; background:#0008; border:1px solid #7fdcff55; border-radius:7px; overflow:hidden; }
        .hud-fill { height:100%; background:linear-gradient(90deg,#26e0a8,#7fdcff); transition:width .15s; }
        .boss { position:absolute; top:26px; left:50%; transform:translateX(-50%); width:min(560px,60vw); display:none; text-align:center; }
        .boss-name { color:#ffd0d0; font-size:14px; letter-spacing:6px; margin-bottom:5px; text-shadow:0 1px 4px #000; }
        .boss-track { height:12px; background:#0009; border:1px solid #ff5a5a66; border-radius:6px; overflow:hidden; }
        .boss-fill { height:100%; background:linear-gradient(90deg,#ff3b3b,#ff9a3b); transition:width .15s; }
        .chips { position:absolute; left:24px; bottom:20px; display:flex; gap:8px; }
        .chip { padding:6px 10px; border-radius:6px; font-size:11px; letter-spacing:1px; color:#eaf6ff;
                background:#0a1626cc; border:1px solid #3a5a7a; text-shadow:0 1px 2px #000; }
        .chip.locked { opacity:.35; filter:grayscale(1); }
        .chip b { color:#7fdcff; }
        .toast { position:absolute; top:34%; left:50%; transform:translate(-50%,-50%); text-align:center;
                 opacity:0; transition:opacity .3s; }
        .toast h1 { color:#fff; font-size:34px; letter-spacing:8px; margin:0; text-shadow:0 0 18px #39e6e0, 0 2px 4px #000; }
        .toast p { color:#bfe9ff; font-size:14px; letter-spacing:3px; margin:8px 0 0; text-shadow:0 1px 3px #000; }
        .cross { position:absolute; left:50%; top:50%; width:6px; height:6px; margin:-3px; border-radius:50%;
                 background:#7fdcffcc; box-shadow:0 0 6px #39e6e0; }
        .vig { position:absolute; inset:0; box-shadow:inset 0 0 140px #ff2020; opacity:0; transition:opacity .4s; }
        .start { position:absolute; inset:0; background:#060a14ee; display:flex; flex-direction:column;
                 align-items:center; justify-content:center; pointer-events:auto; cursor:pointer; }
        .start h1 { color:#fff; font-size:52px; letter-spacing:14px; margin:0 0 6px; text-shadow:0 0 30px #39e6e0; }
        .start h2 { color:#ff4fa3; font-size:15px; letter-spacing:8px; margin:0 0 34px; font-weight:400; }
        .start .keys { color:#9fc4e8; font-size:13px; line-height:2.1; letter-spacing:1px; text-align:center; }
        .start .keys b { color:#7fdcff; }
        .start .go { margin-top:30px; color:#fff; font-size:14px; letter-spacing:4px; border:1px solid #39e6e0;
                     padding:10px 26px; border-radius:4px; animation:pulse 1.6s infinite; }
        @keyframes pulse { 50% { box-shadow:0 0 22px #39e6e088; } }
        .hint { position:absolute; right:24px; bottom:20px; color:#8fb4d8aa; font-size:11px; letter-spacing:1px;
                text-align:right; line-height:1.7; text-shadow:0 1px 2px #000; }
      </style>
      <div class="hud-bar">
        <div class="hud-label">MECHA INTEGRITY</div>
        <div class="hud-track"><div class="hud-fill" id="hpfill" style="width:100%"></div></div>
      </div>
      <div class="boss" id="boss">
        <div class="boss-name" id="bossname"></div>
        <div class="boss-track"><div class="boss-fill" id="bossfill" style="width:100%"></div></div>
      </div>
      <div class="chips">
        <div class="chip" id="chip-saber"><b>LMB</b> SABER</div>
        <div class="chip" id="chip-laser"><b>RMB</b> LASER</div>
        <div class="chip locked" id="chip-beam"><b>E</b> BEAM — defeat the kaiju</div>
        <div class="chip locked" id="chip-boots"><b>SPACE(hold)</b> ROCKET BOOTS — defeat Missile Maw</div>
      </div>
      <div class="toast" id="toast"><h1 id="toast-h"></h1><p id="toast-p"></p></div>
      <div class="cross"></div>
      <div class="vig" id="vig"></div>
      <div class="hint">WASD move · SHIFT boost · SPACE jump<br/>mouse look · click canvas to lock cursor</div>
    `;
    this.hpFill = document.getElementById('hpfill')!;
    this.bossWrap = document.getElementById('boss')!;
    this.bossName = document.getElementById('bossname')!;
    this.bossFill = document.getElementById('bossfill')!;
    this.toastEl = document.getElementById('toast')!;
    this.vignette = document.getElementById('vig')!;
    this.chips = {
      beam: document.getElementById('chip-beam')!,
      boots: document.getElementById('chip-boots')!,
    };
  }

  showStart(onStart: () => void): void {
    const el = document.createElement('div');
    el.className = 'start';
    el.innerHTML = `
      <h1>MECHA CITY</h1>
      <h2>NEO TOKYO · INFINITE VOXEL FRONTIER</h2>
      <div class="keys">
        <b>WASD</b> move &nbsp; <b>SHIFT</b> boost &nbsp; <b>SPACE</b> jump<br/>
        <b>LEFT CLICK</b> light saber &nbsp; <b>RIGHT CLICK / F</b> laser cannon<br/>
        Everything breaks. Citizens can't be hurt — but they will run.<br/>
        Hunt the monsters. Every boss you defeat teaches you a new power.
      </div>
      <div class="go">CLICK TO DEPLOY</div>
    `;
    el.addEventListener('click', () => {
      el.remove();
      onStart();
    });
    this.root.appendChild(el);
  }

  setHP(frac: number): void {
    this.hpFill.style.width = Math.max(0, frac * 100) + '%';
    this.hpFill.style.background = frac < 0.3
      ? 'linear-gradient(90deg,#ff3b3b,#ff9a3b)'
      : 'linear-gradient(90deg,#26e0a8,#7fdcff)';
  }

  showBoss(name: string): void {
    this.bossWrap.style.display = 'block';
    this.bossName.textContent = '⚠ ' + name + ' ⚠';
  }

  setBossHP(frac: number): void {
    this.bossFill.style.width = Math.max(0, frac * 100) + '%';
  }

  hideBoss(): void {
    this.bossWrap.style.display = 'none';
  }

  toast(title: string, sub: string, seconds = 3.5): void {
    (document.getElementById('toast-h')!).textContent = title;
    (document.getElementById('toast-p')!).textContent = sub;
    this.toastEl.style.opacity = '1';
    this.toastTimer = seconds;
  }

  unlock(key: 'beam' | 'boots', label: string): void {
    const chip = this.chips[key];
    chip.classList.remove('locked');
    chip.innerHTML = label;
    chip.style.borderColor = '#39e6e0';
  }

  damageFlash(): void {
    this.vignette.style.opacity = '1';
    setTimeout(() => (this.vignette.style.opacity = '0'), 250);
  }

  update(dt: number): void {
    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) this.toastEl.style.opacity = '0';
    }
  }
}
