// DOM overlay HUD: health, boss bar, ability chips, toasts, start screen.

// The weapon roster, shared with game.ts. Order sets both the number-key
// binding (1..n) and the position around the radial wheel.
export const WEAPONS = [
  { id: 'saber', icon: '⚔', label: 'SABER' },
  { id: 'rifle', icon: '🔫', label: 'RIFLE' },
  { id: 'missiles', icon: '🚀', label: 'MISSILES' },
  { id: 'railgun', icon: '⚡', label: 'RAILGUN' },
  { id: 'vulcan', icon: '💥', label: 'VULCAN' },
  { id: 'flamer', icon: '🔥', label: 'FLAMER' },
  { id: 'aqua', icon: '💧', label: 'AQUA' },
] as const;

export type WeaponId = (typeof WEAPONS)[number]['id'];

export class Hud {
  // --- radio traffic -------------------------------------------------------
  private commsQueue: { who: string; text: string }[] = [];
  private typed = 0;      // characters revealed so far
  private holdT = 0;      // seconds to linger once a line is fully typed
  private commsOn = false;
  private isTouch = false;
  /** True while a full-screen story card is up — game input is suspended. */
  cardOpen = false;

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
  private onSelectWeapon: (w: WeaponId) => void = () => {};

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
        .chips { position:absolute; left:24px; bottom:18px; display:flex; gap:7px; flex-wrap:wrap;
                 max-width:min(62vw, 760px); }
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
        .hint { position:absolute; right:24px; bottom:18px; width:250px; color:#8fb4d8cc; font-size:10.5px;
                letter-spacing:.6px; text-align:right; line-height:1.8; text-shadow:0 1px 2px #000; }
        /* persistent objective, so the player always knows the current goal */
        .obj { position:absolute; top:76px; left:50%; transform:translateX(-50%); text-align:center;
               background:#0a1626bb; border:1px solid #7fdcff55; border-radius:20px; padding:6px 18px;
               color:#eaf6ff; font-size:12px; letter-spacing:2.5px; text-shadow:0 1px 3px #000;
               white-space:nowrap; }
        .obj b { color:#ffcf4f; }
        /* radio traffic from Command — speaker tag + typed-out line */
        .comms { position:absolute; left:50%; bottom:110px; transform:translateX(-50%);
                 width:min(660px, 76vw); background:#06121fee; border:1px solid #39e6e088;
                 border-left:4px solid #39e6e0; border-radius:6px; padding:12px 18px 14px;
                 box-shadow:0 6px 26px #0009; display:none; }
        .comms.show { display:block; }
        .comms-row { display:flex; align-items:flex-start; gap:12px; }
        .comms-avatar { width:58px; height:58px; flex:0 0 58px; object-fit:cover; object-position:center;
                         border:1px solid #7fdcffaa; border-radius:50%; box-shadow:0 0 14px #39e6e066; }
        .comms-copy { min-width:0; flex:1; }
        .comms-who { color:#39e6e0; font-size:11px; letter-spacing:3px; margin-bottom:6px; }
        /* the pilot's own replies read back warm, so the exchange is legible */
        .comms.self { border-color:#ffcf4f88; border-left-color:#ffcf4f; }
        .comms.self .comms-who { color:#ffcf4f; }
        .comms-text { color:#e8f4ff; font-size:15px; line-height:1.55; letter-spacing:.4px;
                      min-height:2.6em; }
        .comms-next { position:absolute; right:14px; bottom:8px; color:#7fdcff99;
                      font-size:10px; letter-spacing:2px; }
        @media (max-width:600px) { .comms { width:calc(100vw - 30px); bottom:96px; padding:9px 12px 12px; }
          .comms-avatar { width:44px; height:44px; flex-basis:44px; } .comms-text { font-size:13px; }
          .comms-who { font-size:9px; letter-spacing:2px; } }
        /* full-screen story card for the prologue / chapter titles / ending */
        .card { position:absolute; inset:0; background:#04070d; display:none;
                flex-direction:column; align-items:center; justify-content:center;
                pointer-events:auto; z-index:40; text-align:center; padding:0 8vw; }
        .card.show { display:flex; }
        .card .ch { color:#39e6e0; font-size:13px; letter-spacing:8px; margin-bottom:10px; }
        .card h1 { color:#fff; font-size:clamp(26px,5vw,46px); letter-spacing:10px; margin:0 0 26px;
                   text-shadow:0 0 26px #39e6e0aa; }
        .card .body { color:#cfe3f5; font-size:15px; line-height:2; letter-spacing:1px;
                      max-width:640px; }
        .card .go { margin-top:34px; color:#8fb4d8; font-size:12px; letter-spacing:4px;
                    animation:pulse 1.8s infinite; }
        .minimap { position:absolute; right:24px; top:150px; width:168px; height:168px;
                   border-radius:50%; background:#08111ecc; border:2px solid #7fdcff55;
                   overflow:hidden; box-shadow:0 2px 14px #0007; }
        .mm-dot { position:absolute; border-radius:50%; transform:translate(-50%,-50%); }
        .mm-me { width:9px; height:9px; background:#7fdcff; box-shadow:0 0 8px #39e6e0;
                 left:50%; top:50%; }
        /* the view wedge never moves — up is always where you are looking */
        .mm-cone { position:absolute; left:50%; top:50%; width:0; height:0;
                   border-left:26px solid transparent; border-right:26px solid transparent;
                   border-bottom:74px solid #7fdcff1c;
                   margin-left:-26px; margin-top:-74px; }
        .mm-ring { position:absolute; left:50%; top:50%; border-radius:50%;
                   border:1px solid #7fdcff22; transform:translate(-50%,-50%); }
        .mm-fwd { position:absolute; left:50%; top:6px; transform:translateX(-50%);
                  color:#7fdcff; font-size:9px; letter-spacing:2px; font-weight:700; }
        /* compass ring turns with your heading so world north stays true */
        .mm-compass { position:absolute; inset:0; }
        .mm-card { position:absolute; left:50%; top:50%; width:0; height:0;
                   color:#ffcf4f; font-size:10px; font-weight:700; letter-spacing:1px; }
        .mm-card span { position:absolute; transform:translate(-50%,-50%); }
        .mm-label { position:absolute; left:0; right:0; bottom:4px; text-align:center;
                    color:#8fb4d8; font-size:9px; letter-spacing:2px; }
        /* off-screen boss pointer that hugs the edge of the view */
        .bossarrow { position:absolute; left:50%; top:50%; width:0; height:0; display:none;
                     border-left:15px solid transparent; border-right:15px solid transparent;
                     border-bottom:30px solid #ff5a7a; filter:drop-shadow(0 0 8px #ff5a7a);
                     transform-origin:50% 50%; }
        .bossdist { position:absolute; color:#ff9bb0; font-size:12px; font-weight:700;
                    letter-spacing:1px; text-shadow:0 1px 4px #000; display:none;
                    transform:translate(-50%,-50%); }
        .pause { position:absolute; inset:0; background:#060a14ee; display:none; flex-direction:column;
                 align-items:center; justify-content:center; pointer-events:auto; z-index:30; }
        .pause.open { display:flex; }
        .pause h1 { color:#fff; font-size:40px; letter-spacing:12px; margin:0 0 4px; text-shadow:0 0 26px #39e6e0; }
        .pause .stats { color:#9fc4e8; font-size:13px; letter-spacing:3px; margin-bottom:26px; }
        .pause .stats b { color:#7fdcff; }
        .pbtn { color:#fff; font-size:14px; letter-spacing:4px; border:1px solid #39e6e0; background:#0a1626;
                padding:11px 34px; border-radius:4px; margin:6px; cursor:pointer; min-width:220px; text-align:center; }
        .pbtn:hover { background:#12283f; box-shadow:0 0 18px #39e6e055; }
        .pkeys { margin-top:24px; color:#8fb4d8; font-size:11.5px; letter-spacing:1px; line-height:2;
                 text-align:center; max-width:520px; }
        .pkeys b { color:#7fdcff; }
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
        .wseg { position:absolute; width:96px; height:96px; margin:-48px; left:50%; top:50%; border-radius:50%;
                background:#0e1c30ee; border:2px solid #3a5a7a; color:#eaf6ff; cursor:pointer;
                display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px;
                font-size:11px; letter-spacing:1px; transition:border-color .1s, box-shadow .1s; }
        .wseg:hover, .wseg.sel { border-color:#39e6e0; box-shadow:0 0 22px #39e6e055; }
        /* weapons stay dimmed until their boss is defeated */
        .wseg.locked { opacity:.28; filter:grayscale(1); pointer-events:none; }
        .wseg .ico { font-size:26px; }
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
      <div class="obj" id="obj">OBJECTIVE · <b>Explore Neo Tokyo</b></div>
      <div class="boss" id="boss">
        <div class="boss-name" id="bossname"></div>
        <div class="boss-track"><div class="boss-fill" id="bossfill" style="width:100%"></div></div>
      </div>
      <div class="chips">
        <div class="chip" id="chip-weapon"><b>A</b> ATTACK · <b>1-7</b> or WHEEL to switch</div>
        <div class="chip" id="chip-boots"><b>SPACE (hold)</b> ROCKET BOOTS</div>
        <div class="chip locked" id="chip-beam"><b>E</b> BEAM — ???</div>
        <div class="chip locked" id="chip-nova"><b>Q</b> NOVA — ???</div>
        <div class="chip locked" id="chip-quake"><b>G</b> QUAKE — ???</div>
        <div class="chip locked" id="chip-blades">TWIN SABERS — ???</div>
        <div class="chip locked" id="chip-shield">SHIELD — ???</div>
        <div class="chip" id="chip-power" style="display:none"></div>
      </div>
      <div class="toast" id="toast"><h1 id="toast-h"></h1><p id="toast-p"></p></div>
      <div class="cross"></div>
      <div class="wbtn" id="wbtn"><b id="wbtn-ico">⚔</b><span id="wbtn-name">SABER</span></div>
      <div class="wheel" id="wheel">
        <div class="wheel-ring">${WEAPONS.map((w, i) => {
          const a = (i / WEAPONS.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.round(Math.cos(a) * 118), y = Math.round(Math.sin(a) * 118);
          return `<div class="wseg locked" id="w-${w.id}" style="transform:translate(${x}px,${y}px)">
                    <span class="ico">${w.icon}</span>${w.label}</div>`;
        }).join('')}</div>
        <div class="wheel-title">SELECT WEAPON</div>
      </div>
      <div class="minimap" id="minimap">
        <div class="mm-ring" style="width:56px;height:56px"></div>
        <div class="mm-ring" style="width:112px;height:112px"></div>
        <div class="mm-cone"></div>
        <div class="mm-compass" id="mm-compass">
          <div class="mm-card" id="mm-n"><span>N</span></div>
          <div class="mm-card" id="mm-e"><span>E</span></div>
          <div class="mm-card" id="mm-s"><span>S</span></div>
          <div class="mm-card" id="mm-w"><span>W</span></div>
        </div>
        <div class="mm-dot mm-me"></div>
        <div class="mm-fwd">▲ FWD</div>
        <div class="mm-label">RADAR</div>
      </div>
      <div class="bossarrow" id="bossarrow"></div>
      <div class="bossdist" id="bossdist"></div>
      <div class="comms" id="comms">
        <div class="comms-row">
          <img class="comms-avatar" id="comms-avatar" src="/portraits/aya-command.png" alt="" />
          <div class="comms-copy"><div class="comms-who" id="comms-who"></div>
          <div class="comms-text" id="comms-text"></div></div>
        </div>
        <div class="comms-next">TRANSMISSION</div>
      </div>
      <div class="card" id="card">
        <div class="ch" id="card-ch"></div>
        <h1 id="card-title"></h1>
        <div class="body" id="card-body"></div>
        <div class="go">CLICK TO CONTINUE</div>
      </div>
      <div class="vig" id="vig"></div>
      <div class="pause" id="pause">
        <h1>PAUSED</h1>
        <div class="stats" id="pause-stats"></div>
        <div class="pbtn" id="p-resume">RESUME</div>
        <div class="pbtn" id="p-restart">RESTART RUN</div>
        <div class="pkeys">
          <b>ARROWS / WASD</b> move &nbsp; <b>SHIFT</b> boost &nbsp; <b>SPACE</b> jump / fly &nbsp; <b>C</b> dash<br/>
          <b>A</b> or <b>click</b> attack &nbsp; <b>1-7</b> switch weapon &nbsp; <b>E</b> beam &nbsp; <b>Q</b> nova &nbsp; <b>G</b> quake<br/>
          <b>L</b> or <b>middle-click</b> lock on &nbsp; <b>ESC</b> pause
        </div>
      </div>
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
      quake: document.getElementById('chip-quake')!,
      blades: document.getElementById('chip-blades')!,
    };
    this.wheel = document.getElementById('wheel')!;

    // wheel button toggles the radial; each segment picks a weapon + closes
    document.getElementById('wbtn')!.addEventListener('click', (e) => {
      e.stopPropagation();
      this.wheel.classList.toggle('open');
    });
    for (const w of WEAPONS) {
      document.getElementById('w-' + w.id)!.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onSelectWeapon(w.id);
        this.wheel.classList.remove('open');
      });
    }
    this.wheel.addEventListener('click', () => this.wheel.classList.remove('open'));
  }

  bindWeaponWheel(cb: (w: WeaponId) => void): void {
    this.onSelectWeapon = cb;
  }

  // reveal a weapon in the wheel once its boss has been beaten
  unlockWeapon(w: WeaponId): void {
    document.getElementById('w-' + w)!.classList.remove('locked');
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

  /** Re-lock every earned ability and weapon, for a fresh run. */
  resetUnlocks(): void {
    const labels: Record<string, string> = {
      beam: '<b>E</b> BEAM — ???',
      nova: '<b>Q</b> NOVA — ???',
      quake: '<b>G</b> QUAKE — ???',
      blades: 'TWIN SABERS — ???',
      shield: 'SHIELD — ???',
    };
    for (const k of Object.keys(labels)) {
      const chip = this.chips[k];
      if (!chip) continue;
      chip.classList.add('locked');
      chip.innerHTML = labels[k];
      chip.style.borderColor = '';
    }
    // boots are standard equipment again, not the overdrive upgrade
    const boots = this.chips.boots;
    if (boots) {
      boots.classList.remove('locked');
      boots.innerHTML = '<b>SPACE (hold)</b> ROCKET BOOTS';
      boots.style.borderColor = '';
    }
    for (const w of WEAPONS) {
      const seg = document.getElementById('w-' + w.id)!;
      const starter = w.id === 'saber' || w.id === 'rifle' || w.id === 'missiles';
      seg.classList.toggle('locked', !starter);
    }
    const pwr = document.getElementById('chip-power')!;
    pwr.style.display = 'none';
  }

  /** Show or hide the pause overlay, with a summary of the run so far. */
  setPaused(on: boolean, stats?: { score: number; wave: number; deaths: number }): void {
    const el = document.getElementById('pause')!;
    el.classList.toggle('open', on);
    if (on && stats) {
      document.getElementById('pause-stats')!.innerHTML =
        `SCORE <b>${stats.score.toLocaleString()}</b> &nbsp;·&nbsp; WAVE <b>${stats.wave}</b> &nbsp;·&nbsp; LOSSES <b>${stats.deaths}</b>`;
    }
  }

  bindPause(onResume: () => void, onRestart: () => void): void {
    document.getElementById('p-resume')!.addEventListener('click', onResume);
    document.getElementById('p-restart')!.addEventListener('click', onRestart);
  }

  /**
   * Queue radio lines. They type out one at a time and auto-advance, so the
   * player can keep fighting while Command talks.
   */
  say(lines: { who: string; text: string }[]): void {
    this.commsQueue.push(...lines);
  }

  /** True while scripted dialogue is still playing — barks defer to it. */
  get busy(): boolean {
    return this.commsQueue.length > 0;
  }

  /** Drop anything still queued (used when a run restarts). */
  /** Force any open card shut (used when a run restarts). */
  closeCard(): void {
    document.getElementById('card')!.classList.remove('show');
    this.cardOpen = false;
  }

  clearComms(): void {
    this.commsQueue.length = 0;
    this.typed = 0;
    this.holdT = 0;
    this.commsOn = false;
    document.getElementById('comms')!.classList.remove('show');
  }

  private updateComms(dt: number): void {
    const box = document.getElementById('comms')!;
    if (!this.commsOn) {
      if (this.commsQueue.length === 0) return;
      this.commsOn = true;
      this.typed = 0;
      this.holdT = 0;
      const line = this.commsQueue[0];
      const avatar = document.getElementById('comms-avatar') as HTMLImageElement;
      const portrait = line.who.includes('KUROSAWA') ? 'dr-kurosawa'
        : line.who.includes('KUROKI') ? 'kuroki'
        : 'aya-command';
      // a missing portrait should collapse the slot, not show a broken image
      avatar.onerror = () => { avatar.style.display = 'none'; };
      avatar.style.display = '';
      avatar.src = `/portraits/${portrait}.png`;
      avatar.alt = line.who;
      document.getElementById('comms-who')!.textContent = line.who;
      document.getElementById('comms-text')!.textContent = '';
      // the pilot's own transmissions read back warm
      box.classList.toggle('self', line.who.includes('KUROKI'));
      box.classList.add('show');
    }
    const line = this.commsQueue[0];
    if (!line) { this.commsOn = false; box.classList.remove('show'); return; }

    if (this.typed < line.text.length) {
      this.typed += dt * 46; // characters per second
      document.getElementById('comms-text')!.textContent =
        line.text.slice(0, Math.floor(this.typed));
      // linger longer on longer lines so there is time to read
      this.holdT = 1.1 + line.text.length * 0.028;
    } else {
      this.holdT -= dt;
      if (this.holdT <= 0) {
        this.commsQueue.shift();
        this.commsOn = false;
        if (this.commsQueue.length === 0) box.classList.remove('show');
      }
    }
  }

  /** Full-screen story card. Resolves once the player clicks through. */
  showCard(chapter: string, title: string, body: string): Promise<void> {
    const card = document.getElementById('card')!;
    document.getElementById('card-ch')!.textContent = chapter;
    document.getElementById('card-title')!.textContent = title;
    document.getElementById('card-body')!.innerHTML = body;
    // The cursor is hidden under pointer lock, so a key press is the reliable
    // way off a card mid-game; tapping is what mobile has.
    document.querySelector('.card .go')!.textContent =
      this.isTouch ? 'TAP TO CONTINUE' : 'PRESS SPACE TO CONTINUE';
    card.classList.add('show');
    this.cardOpen = true;

    return new Promise((resolve) => {
      const done = () => {
        card.removeEventListener('click', done);
        window.removeEventListener('keydown', onKey, true);
        card.classList.remove('show');
        this.cardOpen = false;
        resolve();
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.code !== 'Space' && e.code !== 'Enter' && e.code !== 'Escape') return;
        e.preventDefault();
        done();
      };
      card.addEventListener('click', done);
      window.addEventListener('keydown', onKey, true);
    });
  }

  // ------------------------------------------------------------------ radar

  private blips: HTMLElement[] = [];

  /**
   * Draw the radar. `contacts` are world-space offsets relative to the player,
   * already rotated into view space by the caller. `camYaw` orients the cone.
   */
  setRadar(
    contacts: { dx: number; dz: number; kind: 'boss' | 'drone' | 'pickup' }[],
    camYaw: number,
    range: number,
  ): void {
    const map = document.getElementById('minimap')!;
    const R = 78; // usable radius in px
    // reuse blip elements so we are not churning DOM every frame
    while (this.blips.length < contacts.length) {
      const el = document.createElement('div');
      el.className = 'mm-dot';
      map.appendChild(el);
      this.blips.push(el);
    }
    for (let i = 0; i < this.blips.length; i++) {
      const el = this.blips[i];
      const c = contacts[i];
      if (!c) { el.style.display = 'none'; continue; }
      // clamp far contacts to the rim so they still show a bearing
      const d = Math.hypot(c.dx, c.dz);
      const k = d > range ? range / d : 1;
      const px = 84 + (c.dx / range) * R * k;
      const py = 84 + (c.dz / range) * R * k;
      const boss = c.kind === 'boss';
      const size = boss ? 13 : c.kind === 'pickup' ? 7 : 8;
      el.style.display = 'block';
      el.style.left = px + 'px';
      el.style.top = py + 'px';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.background = boss ? '#ff5a52' : c.kind === 'pickup' ? '#5cf2a0' : '#ffb454';
      el.style.boxShadow = boss ? '0 0 10px #ff5a52' : 'none';
      el.style.opacity = d > range ? '0.65' : '1';
    }
    // World north sits at `camYaw` clockwise from the top of the radar, so the
    // four cardinals orbit the rim as you turn while staying upright.
    const marks: [string, number][] = [
      ['mm-n', 0], ['mm-e', Math.PI / 2], ['mm-s', Math.PI], ['mm-w', -Math.PI / 2],
    ];
    for (const [id, offset] of marks) {
      const ang = camYaw + offset;
      const el = document.getElementById(id) as HTMLElement;
      el.style.left = (84 + Math.sin(ang) * 70) + 'px';
      el.style.top = (84 - Math.cos(ang) * 70) + 'px';
    }
  }

  /**
   * Point the on-screen arrow at the boss. `screen` is its projected position
   * in normalised device coords; `onScreen` false means clamp to the edge.
   */
  setBossPointer(bearing: number | null, distance = 0): void {
    const arrow = document.getElementById('bossarrow') as HTMLElement;
    const label = document.getElementById('bossdist') as HTMLElement;
    if (bearing === null) {
      arrow.style.display = 'none';
      label.style.display = 'none';
      return;
    }
    // ride an ellipse just inside the viewport edge, pointing outward
    const rx = window.innerWidth * 0.36, ry = window.innerHeight * 0.34;
    const x = window.innerWidth / 2 + Math.sin(bearing) * rx;
    const y = window.innerHeight / 2 - Math.cos(bearing) * ry;
    arrow.style.display = 'block';
    arrow.style.left = x + 'px';
    arrow.style.top = y + 'px';
    arrow.style.transform = `translate(-50%,-50%) rotate(${bearing + Math.PI}rad)`;
    label.style.display = 'block';
    label.style.left = x + 'px';
    label.style.top = (y + 34) + 'px';
    label.textContent = Math.round(distance) + 'm';
  }

  /** The always-visible goal line under the boss bar. */
  setObjective(text: string): void {
    document.getElementById('obj')!.innerHTML = 'OBJECTIVE · <b>' + text + '</b>';
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

  setWeapon(w: WeaponId): void {
    const meta = WEAPONS.find((x) => x.id === w)!;
    document.getElementById('wbtn-ico')!.textContent = meta.icon;
    document.getElementById('wbtn-name')!.textContent = meta.label;
    for (const x of WEAPONS) {
      document.getElementById('w-' + x.id)!.classList.toggle('sel', x.id === w);
    }
  }

  showStart(onStart: () => void, isTouch = false): void {
    this.isTouch = isTouch;
    const el = document.createElement('div');
    el.className = 'start';
    const keys = isTouch
      ? `<b>D-PAD / LEFT SIDE</b> move &nbsp; <b>RIGHT SIDE</b> drag to look around<br/>
         <b>SABER / RIFLE</b> attack &nbsp; <b>JUMP (hold)</b> fly with rocket boots<br/>`
      : `<b>ARROW KEYS / WASD</b> move &nbsp; <b>SHIFT</b> boost &nbsp; <b>SPACE</b> jump<br/>
         <b>LEFT CLICK</b> beam saber &nbsp; <b>R (hold)</b> charge rifle &nbsp; <b>T</b> missiles<br/>`;
    el.innerHTML = `
      <h1>MECHA CITY</h1>
      <h2>NEO TOKYO · THE LAST SORTIE OF KUROKI</h2>
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

  unlock(key: 'beam' | 'boots' | 'nova' | 'shield' | 'quake' | 'blades', label: string): void {
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
    this.updateComms(dt);
    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) this.toastEl.style.opacity = '0';
    }
  }
}
