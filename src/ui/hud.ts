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
  private wheel!: HTMLElement;
  private onSelectWeapon: (w: 'saber' | 'rifle' | 'missiles') => void = () => {};

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
        .scorebox { position:absolute; left:24px; top:60px; }
        .score-wave { color:#ffd0a0; font-size:12px; letter-spacing:3px; text-shadow:0 1px 3px #000; }
        .score-val { color:#fff; font-size:32px; font-weight:700; letter-spacing:2px; line-height:1.1;
                     text-shadow:0 0 12px #39e6e0aa, 0 2px 4px #000; font-variant-numeric:tabular-nums; }
        .score-combo { color:#ffcf4f; font-size:20px; font-weight:700; letter-spacing:1px; height:24px;
                       text-shadow:0 0 12px #ff8a2f, 0 2px 3px #000; transition:transform .1s; }
        .dmgpop { position:absolute; left:50%; top:38%; transform:translateX(-50%); color:#fff3a0;
                  font-size:30px; font-weight:800; text-shadow:0 0 10px #ff8a2f,0 2px 4px #000; opacity:0;
                  pointer-events:none; }
        @keyframes dmgpop { 0%{opacity:1;transform:translate(-50%,0) scale(1.1)} 100%{opacity:0;transform:translate(-50%,-40px) scale(.8)} }
        .wbtn { position:absolute; right:24px; top:60px; width:74px; height:74px; border-radius:50%;
                background:#0a1626cc; border:2px solid #7fdcff88; color:#eaf6ff; font-size:11px; letter-spacing:1px;
                display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px;
                pointer-events:auto; cursor:pointer; text-shadow:0 1px 2px #000; }
        .wbtn b { color:#7fdcff; font-size:12px; }
        .wheel { position:absolute; inset:0; display:none; align-items:center; justify-content:center;
                 background:#04060cbb; pointer-events:auto; z-index:20; }
        .wheel.open { display:flex; }
        .wheel-ring { position:relative; width:320px; height:320px; }
        .wseg { position:absolute; width:120px; height:120px; margin:-60px; left:50%; top:50%; border-radius:50%;
                background:#0e1c30ee; border:2px solid #3a5a7a; color:#eaf6ff; cursor:pointer;
                display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;
                font-size:13px; letter-spacing:2px; transition:transform .1s, border-color .1s; }
        .wseg:hover, .wseg.sel { border-color:#39e6e0; transform:scale(1.08); box-shadow:0 0 22px #39e6e055; }
        .wseg .ico { font-size:30px; }
        .wheel-title { position:absolute; left:50%; top:calc(50% + 180px); transform:translateX(-50%);
                       color:#bfe9ff; font-size:13px; letter-spacing:4px; text-shadow:0 1px 3px #000; }
      </style>
      <div class="hud-bar">
        <div class="hud-label">MECHA INTEGRITY</div>
        <div class="hud-track"><div class="hud-fill" id="hpfill" style="width:100%"></div></div>
      </div>
      <div class="scorebox">
        <div class="score-wave" id="score-wave">WAVE 0</div>
        <div class="score-val" id="score-val">0</div>
        <div class="score-combo" id="score-combo"></div>
      </div>
      <div class="dmgpop" id="dmgpop"></div>
      <div class="boss" id="boss">
        <div class="boss-name" id="bossname"></div>
        <div class="boss-track"><div class="boss-fill" id="bossfill" style="width:100%"></div></div>
      </div>
      <div class="chips">
        <div class="chip" id="chip-weapon"><b>A</b> ATTACK · <b>1/2/3</b> or WHEEL to switch</div>
        <div class="chip locked" id="chip-beam"><b>E</b> BEAM — defeat the kaiju</div>
        <div class="chip locked" id="chip-boots"><b>SPACE(hold)</b> ROCKET BOOTS — defeat Missile Maw</div>
        <div class="chip locked" id="chip-nova"><b>Q</b> NOVA — ???</div>
        <div class="chip locked" id="chip-shield">SHIELD — ???</div>
        <div class="chip" id="chip-power" style="display:none"></div>
      </div>
      <div class="toast" id="toast"><h1 id="toast-h"></h1><p id="toast-p"></p></div>
      <div class="cross"></div>
      <div class="wbtn" id="wbtn"><b id="wbtn-ico">⚔</b><span id="wbtn-name">SABER</span></div>
      <div class="wheel" id="wheel">
        <div class="wheel-ring">
          <div class="wseg" id="w-saber" style="transform:translate(0,-110px)"><span class="ico">⚔</span>SABER</div>
          <div class="wseg" id="w-rifle" style="transform:translate(95px,55px)"><span class="ico">🔫</span>RIFLE</div>
          <div class="wseg" id="w-missiles" style="transform:translate(-95px,55px)"><span class="ico">🚀</span>MISSILES</div>
        </div>
        <div class="wheel-title">SELECT WEAPON</div>
      </div>
      <div class="vig" id="vig"></div>
      <div class="hint">ARROWS / WASD move · SHIFT boost · SPACE jump · C dash<br/>A / click attack · L or middle-click lock-on · drag to rotate camera</div>
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
      nova: document.getElementById('chip-nova')!,
      shield: document.getElementById('chip-shield')!,
    };
    this.wheel = document.getElementById('wheel')!;

    // wheel button toggles the radial; each segment picks a weapon + closes
    document.getElementById('wbtn')!.addEventListener('click', (e) => {
      e.stopPropagation();
      this.wheel.classList.toggle('open');
    });
    const pick = (id: string, w: 'saber' | 'rifle' | 'missiles') => {
      document.getElementById(id)!.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onSelectWeapon(w);
        this.wheel.classList.remove('open');
      });
    };
    pick('w-saber', 'saber');
    pick('w-rifle', 'rifle');
    pick('w-missiles', 'missiles');
    this.wheel.addEventListener('click', () => this.wheel.classList.remove('open'));
  }

  bindWeaponWheel(cb: (w: 'saber' | 'rifle' | 'missiles') => void): void {
    this.onSelectWeapon = cb;
  }

  toggleWheel(): void {
    this.wheel.classList.toggle('open');
  }

  setScore(score: number, combo: number): void {
    document.getElementById('score-val')!.textContent = score.toLocaleString();
    const c = document.getElementById('score-combo')!;
    c.textContent = combo > 1 ? '×' + combo + ' COMBO' : '';
    c.style.transform = combo > 1 ? 'scale(1.15)' : 'scale(1)';
    setTimeout(() => (c.style.transform = 'scale(1)'), 90);
  }

  setWave(wave: number): void {
    document.getElementById('score-wave')!.textContent = 'WAVE ' + wave;
  }

  setLockOn(on: boolean): void {
    const c = document.querySelector('.cross') as HTMLElement;
    c.style.background = on ? '#ff5a7a' : '#7fdcffcc';
    c.style.boxShadow = on ? '0 0 10px #ff5a7a, 0 0 0 8px #ff5a7a33' : '0 0 6px #39e6e0';
    c.style.transform = on ? 'scale(1.6)' : 'scale(1)';
  }

  popDamage(dmg: number): void {
    const el = document.getElementById('dmgpop')!;
    el.textContent = '-' + Math.round(dmg);
    el.style.animation = 'none';
    void el.offsetWidth; // restart the animation
    el.style.animation = 'dmgpop .6s ease-out';
  }

  setWeapon(w: 'saber' | 'rifle' | 'missiles'): void {
    const meta = {
      saber: ['⚔', 'SABER'],
      rifle: ['🔫', 'RIFLE'],
      missiles: ['🚀', 'MISSILES'],
    }[w];
    document.getElementById('wbtn-ico')!.textContent = meta[0];
    document.getElementById('wbtn-name')!.textContent = meta[1];
    for (const k of ['saber', 'rifle', 'missiles']) {
      document.getElementById('w-' + k)!.classList.toggle('sel', k === w);
    }
  }

  showStart(onStart: () => void, isTouch = false): void {
    const el = document.createElement('div');
    el.className = 'start';
    const keys = isTouch
      ? `<b>D-PAD / LEFT SIDE</b> move &nbsp; <b>RIGHT SIDE</b> drag to look around<br/>
         <b>SABER / RIFLE</b> attack &nbsp; <b>JUMP (hold)</b> fly with rocket boots<br/>`
      : `<b>ARROW KEYS / WASD</b> move &nbsp; <b>SHIFT</b> boost &nbsp; <b>SPACE</b> jump<br/>
         <b>LEFT CLICK</b> beam saber &nbsp; <b>R (hold)</b> charge rifle &nbsp; <b>T</b> missiles<br/>`;
    el.innerHTML = `
      <h1>MECHA CITY</h1>
      <h2>NEO TOKYO · INFINITE VOXEL FRONTIER</h2>
      <div class="keys">
        ${keys}
        Everything breaks. Citizens can't be hurt — but they will run.<br/>
        Hunt the monsters. Every boss you defeat teaches you a new power.
      </div>
      <div class="go">${isTouch ? 'TAP' : 'CLICK'} TO DEPLOY</div>
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

  unlock(key: 'beam' | 'boots' | 'nova' | 'shield', label: string): void {
    const chip = this.chips[key];
    chip.classList.remove('locked');
    chip.innerHTML = label;
    chip.style.borderColor = '#39e6e0';
  }

  setPowerLevel(level: number): void {
    const chip = document.getElementById('chip-power')!;
    chip.style.display = 'block';
    chip.style.borderColor = '#f6b1d5';
    chip.innerHTML = `<b>PWR</b> Lv ${level}`;
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
