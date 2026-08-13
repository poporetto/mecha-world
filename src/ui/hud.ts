// DOM overlay HUD: health, boss bar, ability chips, toasts, start screen.

// The weapon roster, shared with game.ts. Order sets both the number-key
// binding (1..n) and the position around the radial wheel.
export const WEAPONS = [
  { id: 'saber', icon: '⚔', label: 'SABER' },
  { id: 'rifle', icon: '🔫', label: 'RIFLE' },
  { id: 'railgun', icon: '⚡', label: 'RAILGUN' },
  { id: 'vulcan', icon: '💥', label: 'VULCAN' },
  { id: 'flamer', icon: '🔥', label: 'FLAMER' },
  { id: 'aqua', icon: '💧', label: 'AQUA' },
] as const;

export type WeaponId = (typeof WEAPONS)[number]['id'];

/** What a radar blip represents. */
export type RadarKind = 'boss' | 'drone' | 'pickup' | 'shelter' | 'shelterHit';

export type Difficulty = 'story' | 'normal' | 'veteran';

/**
 * What each preset actually changes. The Revenant in particular is tuned for
 * someone who has played the whole campaign; a first-timer needs a way past
 * it that is not "get better or stop playing".
 */
export const DIFFICULTY: Record<Difficulty, {
  label: string; blurb: string; incoming: number; tempo: number; bossHp: number;
}> = {
  story: { label: 'STORY', blurb: 'For the campaign, not the challenge', incoming: 0.55, tempo: 0.84, bossHp: 0.82 },
  normal: { label: 'NORMAL', blurb: 'The fight as it was designed', incoming: 1, tempo: 1, bossHp: 1 },
  veteran: { label: 'VETERAN', blurb: 'They hit harder and move sooner', incoming: 1.4, tempo: 1.12, bossHp: 1.18 },
};

export interface GameSettings {
  difficulty: Difficulty;
  music: number;
  effects: number;
  shake: number;
  sensitivity: number;
  subtitles: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

/** Characters a degraded transmission resolves through before it settles. */
const STATIC = '▓▒░#%&/\\|=+*<>';

export class Hud {
  // --- radio traffic -------------------------------------------------------
  private commsQueue: { who: string; text: string }[] = [];
  private typed = 0;      // characters revealed so far
  /** True while the current line is arriving on Rei's dead channel. */
  private bled = false;
  private bledT = 0;
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
        .boss-state { min-height:14px; margin-top:5px; color:#ffb4c0; font-size:9px;
                      letter-spacing:3px; text-shadow:0 1px 3px #000; }
        .boss.open .boss-state { color:#7ff0ff; }
        .boss.enraged .boss-state { color:#ff786f; animation:openPulse .45s ease-in-out infinite alternate; }
        .boss-track { position:relative; height:12px; background:#0009; border:1px solid #ff5a5a66; border-radius:6px; overflow:hidden; }
        .boss-fill { height:100%; background:linear-gradient(90deg,#ff3b3b,#ff9a3b); transition:width .15s, background .25s; }
        /* the track itself reacts, so the fight state is readable even when
           the bar is nearly empty and there is no fill left to colour */
        .boss.enraged .boss-track { border-color:#ff3b5c; box-shadow:0 0 16px #ff3b5c66; }
        .boss.open .boss-track { border-color:#7ff0ff; box-shadow:0 0 20px #4de2ff88; }
        /* Sits on top of the track rather than below it — the objective line
           lives directly under the bar and cannot be pushed around. */
        .boss-open { display:none; position:absolute; inset:0; line-height:12px;
                     color:#eaffff; font-size:9px; letter-spacing:4px; font-weight:700;
                     text-shadow:0 0 6px #003a4a, 0 1px 2px #000;
                     animation:openPulse .5s ease-in-out infinite alternate; }
        .boss.open .boss-open { display:block; }
        @keyframes openPulse { from { opacity:.6; } to { opacity:1; } }
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
        .target-lock { position:absolute; width:68px; height:68px; margin:-34px; display:none;
                       pointer-events:none; border:2px solid #ff6680; border-radius:50%;
                       box-shadow:0 0 15px #ff4d6a88, inset 0 0 12px #ff4d6a33;
                       transition:left .06s linear,top .06s linear,border-color .12s,box-shadow .12s;
                       animation:lockSpin 5s linear infinite; }
        .target-lock::before,.target-lock::after { content:''; position:absolute; background:#ff8da0; }
        .target-lock::before { width:86px; height:2px; left:-11px; top:31px; }
        .target-lock::after { width:2px; height:86px; left:31px; top:-11px; }
        .target-lock .target-data { position:absolute; top:72px; left:50%; transform:translateX(-50%);
                                   white-space:nowrap; color:#ffc1cb; font-size:9px; letter-spacing:2px;
                                   text-shadow:0 1px 4px #000; animation:lockSpinReverse 5s linear infinite; }
        .target-lock.evade { border-color:#ffcf4f; box-shadow:0 0 22px #ff8a2f; }
        .target-lock.evade::before,.target-lock.evade::after { background:#ffcf4f; }
        .target-lock.open { border-color:#58f4ff; box-shadow:0 0 25px #39e6e0; }
        .target-lock.open::before,.target-lock.open::after { background:#58f4ff; }
        @keyframes lockSpin { to { transform:rotate(360deg); } }
        @keyframes lockSpinReverse { to { transform:translateX(-50%) rotate(-360deg); } }
        .critical-state { position:absolute; inset:0; pointer-events:none; opacity:0;
                          box-shadow:inset 0 0 120px 24px #d5072d99;
                          background:radial-gradient(circle,transparent 54%,#8d001733 100%);
                          transition:opacity .3s; }
        .critical-state.on { animation:criticalPulse 1.05s ease-in-out infinite; }
        .critical-label { position:absolute; left:24px; top:43px; color:#ff8b9e; font-size:9px;
                          letter-spacing:3px; opacity:0; text-shadow:0 0 8px #ff2049; }
        .critical-label.on { opacity:1; animation:criticalText .7s ease-in-out infinite alternate; }
        @keyframes criticalPulse { 0%,100% { opacity:.24; } 50% { opacity:.62; } }
        @keyframes criticalText { to { color:#fff; } }
        .evade-flash { position:absolute; left:50%; top:42%; transform:translate(-50%,-50%);
                       color:#eaffff; font-size:28px; font-weight:800; letter-spacing:9px;
                       text-shadow:0 0 18px #39e6e0,0 2px 5px #000; opacity:0; pointer-events:none; }
        @keyframes perfectEvade { 0% { opacity:0; transform:translate(-50%,-40%) scale(.7); }
                                  20%,65% { opacity:1; transform:translate(-50%,-50%) scale(1); }
                                  100% { opacity:0; transform:translate(-50%,-70%) scale(1.08); } }
        .vig { position:absolute; inset:0; box-shadow:inset 0 0 140px #ff2020; opacity:0; transition:opacity .4s; }
        .impact-flash { position:absolute; inset:0; pointer-events:none; opacity:0;
                        background:radial-gradient(circle at center,transparent 42%,#ffcf7a33 70%,#ff713366 100%);
                        mix-blend-mode:screen; }
        .impact-flash.weak {
          background:radial-gradient(circle at center,transparent 32%,#fff3a855 62%,#39e6e099 100%);
        }
        @keyframes impact-hit {
          0% { opacity:.95; transform:scale(1.035); }
          100% { opacity:0; transform:scale(1); }
        }
        .boss-intro { position:absolute; inset:0; display:flex; flex-direction:column;
                      align-items:center; justify-content:center; pointer-events:none; opacity:0;
                      background:linear-gradient(180deg,transparent 20%,#02050acc 46%,#02050acc 58%,transparent 82%); }
        .boss-intro.show { animation:boss-reveal 3s ease-in-out both; }
        .boss-intro .threat { color:#ff6f61; font-size:12px; letter-spacing:9px; }
        .boss-intro .name { color:#fff; font-size:clamp(34px,6vw,76px); font-weight:800;
                            letter-spacing:12px; margin:8px 0; text-shadow:0 0 28px #ff3b3baa; }
        .boss-intro .subtitle { color:#ffd4c7; font-size:13px; letter-spacing:3px; max-width:760px; text-align:center; }
        @keyframes boss-reveal {
          0% { opacity:0; transform:scale(1.08); }
          14%,72% { opacity:1; transform:scale(1); }
          100% { opacity:0; transform:scale(.98); }
        }
        .start { position:absolute; inset:0; background:linear-gradient(90deg,#030815d9 0%,#07101abb 47%,#030815d9 100%),
                 url('/title-screen.png') center/cover no-repeat; display:flex; flex-direction:column;
                 align-items:center; justify-content:center; pointer-events:auto; cursor:pointer; }
        .start h1 { color:#fff; font-size:52px; letter-spacing:14px; margin:0 0 6px; text-shadow:0 0 30px #39e6e0; }
        .start h2 { color:#ff4fa3; font-size:15px; letter-spacing:8px; margin:0 0 34px; font-weight:400; }
        .start .keys { color:#9fc4e8; font-size:13px; line-height:2.1; letter-spacing:1px; text-align:center; }
        .start .keys b { color:#7fdcff; }
        .start .go.resume { border-color:#ffd86a; color:#ffe9b0; box-shadow:0 0 26px #ffd86a33; margin-top:30px; }
        .start .go.resume:hover { background:#3a3213; }
        /* Pushed well clear of CONTINUE — these two sat close enough that a
           slightly low click on the resume button started a new run instead,
           which wipes the checkpoint. */
        .start .go + .go { margin-top:42px; font-size:12px; opacity:.75; letter-spacing:3px; }
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
                 width:min(760px, 80vw); background:#06121fee; border:1px solid #39e6e088;
                 border-left:4px solid #39e6e0; border-radius:6px; padding:12px 18px 14px;
                 box-shadow:0 6px 26px #0009; display:none; }
        .comms.show { display:block; }
        .comms-row { display:flex; align-items:center; gap:16px; }
        .comms-avatar { width:92px; height:92px; flex:0 0 92px; object-fit:cover; object-position:center;
                         border:1px solid #7fdcffaa; border-radius:50%; box-shadow:0 0 14px #39e6e066; }
        .comms-copy { min-width:0; flex:1; }
        .comms-who { color:#39e6e0; font-size:11px; letter-spacing:3px; margin-bottom:6px; }
        /* the pilot's own replies read back warm, so the exchange is legible */
        .comms.self { border-color:#ffcf4f88; border-left-color:#ffcf4f; }
        .comms.self .comms-who { color:#ffcf4f; }
        /* A transmission coming out of the seam. Rei's channel is three years
           dead, so it reads as something being pulled through rather than
           spoken: violet, unstable, and never quite locked. */
        .comms.bled { border-color:#8a5cff88; box-shadow:0 0 30px #6a2fbf44, inset 0 0 40px #2a0f4566; }
        .comms.bled .comms-who { color:#c79bff; }
        .comms.bled .comms-who::after { content:' · SIGNAL UNVERIFIED'; color:#8a5cff88; letter-spacing:2px; }
        .comms.bled .comms-text { color:#e8dbff; text-shadow:0 0 10px #8a5cff66; }
        .comms.bled .comms-avatar { filter:grayscale(.75) contrast(1.15) brightness(.72); }
        .comms.bled .comms-next { color:#c79bffaa; }
        /* a slow band of interference crawling down the panel */
        .comms.bled::after { content:''; position:absolute; inset:0; pointer-events:none; border-radius:inherit;
          background:linear-gradient(180deg, transparent 0%, #b078ff22 46%, #ffffff18 50%, #b078ff22 54%, transparent 100%);
          background-size:100% 260%; animation:bleed 3.4s linear infinite; }
        @keyframes bleed { from { background-position:0 -130%; } to { background-position:0 130%; } }
        .comms-text { color:#e8f4ff; font-size:16px; line-height:1.6; letter-spacing:.4px;
                      min-height:2.8em; }
        .comms-next { position:absolute; right:14px; bottom:8px; color:#7fdcff99;
                      font-size:10px; letter-spacing:2px; }
        /* On touch the bottom of the screen belongs to the joystick and the
           action buttons, so radio traffic moves up under the objective bar
           and stops short of the radar rather than hiding behind controls. */
        .tc-on .comms { left:10px; right:134px; bottom:auto; top:116px;
                        width:auto; transform:none; padding:10px 14px 12px; }
        .tc-on .comms-avatar { width:52px; height:52px; flex-basis:52px; }
        .tc-on .comms-text { font-size:13px; min-height:2.2em; }
        .tc-on .comms-who { font-size:9.5px; letter-spacing:2px; }
        /* The panel above already keeps radio traffic clear of the pad. It
           also has to be a tap target, because touch has no Enter key to
           hurry the radio with. */
        .tc-on .comms { pointer-events:auto; cursor:pointer; }
        .tc-on .comms-next { right:12px; bottom:6px; font-size:8.5px; letter-spacing:2px; }
        /* touch already has its own WEAPON button on the pad — the desktop
           dial would only collide with the radar */
        /* The phone top band has to hold five things in the space the desktop
           gives to two, so it is laid out as explicit rows rather than left
           to overlap: integrity and score share row one, the boss bar takes
           row two full width, the objective row three, radar below that. */
        .tc-on .hud-bar { left:10px; top:6px; width:118px; }
        .tc-on .hud-label { font-size:8px; letter-spacing:1.2px; margin-bottom:2px; }
        .tc-on .hud-track { height:8px; border-radius:4px; }
        /* Wave and score share one line so the block stays short enough to
           clear the boss bar; the combo drops below so a long "x9 COMBO"
           cannot widen the row into the integrity bar on the far side. */
        .tc-on .scorebox { left:auto; right:10px; top:6px; text-align:right; }
        .tc-on .score-wave { display:inline; font-size:9px; letter-spacing:1.5px; margin-right:5px; }
        .tc-on .score-val { display:inline; font-size:17px; line-height:1; }
        .tc-on .score-combo { display:block; font-size:11px; height:auto; line-height:1.25; }
        .tc-on .boss { width:92vw; top:44px; }
        .tc-on .boss-name { font-size:10px; letter-spacing:3px; margin-bottom:3px; }
        .tc-on .obj { top:84px; font-size:10px; letter-spacing:1.5px; padding:4px 12px;
                      max-width:74vw; overflow:hidden; text-overflow:ellipsis; }
        /* a smaller dial on touch, so dialogue has room beside it */
        .tc-on .minimap { width:112px; height:112px; right:10px; top:112px; }
        /* The boss reveal is a full-screen overlay and was never scaled for a
           phone: at clamp(34px,6vw,76px) with 12px letter-spacing, a name like
           TIDE LEVIATHAN is ~450px wide on a 390px screen, so it ran off both
           edges and sat on top of the objective and the radio panel. */
        /* Only appears below 25% integrity, which is why the layout audit
           never caught it: at its desktop position it lands straight on the
           boss name. Tucked under the compacted integrity bar instead. */
        .tc-on .critical-label { left:10px; top:32px; font-size:7.5px; letter-spacing:.8px; }
        .tc-on .boss-intro { padding:0 16px; }
        .tc-on .boss-intro .threat { font-size:9px; letter-spacing:clamp(2px,1.4vw,6px); }
        .tc-on .boss-intro .name { font-size:clamp(19px,6.4vw,34px);
                                   letter-spacing:clamp(1px,1vw,5px); margin:5px 0;
                                   max-width:100%; overflow-wrap:anywhere; }
        .tc-on .boss-intro .subtitle { font-size:10.5px; letter-spacing:1.4px;
                                       max-width:100%; line-height:1.5; }
        /* Landscape phones are short and wide. Everything moves up and the
           radio narrows so it clears the radar — these have to come after the
           portrait .tc-on rules or equal specificity lets those win. */
        @media (orientation:landscape) and (max-height:520px) {
          /* the top band is one row in landscape: integrity left, score right,
             boss between them — so it has to be narrow enough to fit */
          .tc-on .boss { top:8px; width:min(440px, 44vw); }
          .tc-on .boss-name { font-size:9px; margin-bottom:2px; }
          .tc-on .obj { top:58px; }
          .tc-on .minimap { width:104px; height:104px; top:58px; }
          .tc-on .comms { top:86px; right:164px; }
          .tc-on .comms-avatar { width:40px; height:40px; flex-basis:40px; }
          .tc-on .comms-text { font-size:12px; min-height:1.9em; }
        }
        .tc-on .mm-label { font-size:8px; bottom:2px; }
        @media (max-width:600px) { .comms { width:calc(100vw - 30px); bottom:96px; padding:9px 12px 12px; }
          .comms-avatar { width:44px; height:44px; flex-basis:44px; } .comms-text { font-size:13px; }
          .comms-who { font-size:9px; letter-spacing:2px; } }
        /* full-screen story card for the prologue / chapter titles / ending */
        .card { position:absolute; inset:0; background:#04070d; display:none;
                flex-direction:column; align-items:center; justify-content:center;
                pointer-events:auto; z-index:40; text-align:center; padding:0 8vw; }
        .card.show { display:flex; }
        .card .ch { color:#39e6e0; font-size:13px; letter-spacing:8px; margin-bottom:10px; }
        /* a loss should not read like a chapter break */
        .card.over { background:#120608; }
        .card.over .ch { color:#ff6b7f; }
        .card.over h1 { color:#ffd9df; text-shadow:0 0 26px #ff4d6aaa; }
        .card.over .go { border-color:#ff6b7faa; background:#2a0d13aa;
                         animation:overGlow 1.7s ease-in-out infinite; }
        @keyframes overGlow {
          0%,100% { color:#ffc2cc; text-shadow:0 0 8px #ff4d6a99;
                    box-shadow:0 0 14px #ff4d6a44; border-color:#ff6b7f66; }
          50%     { color:#ffffff; text-shadow:0 0 14px #ff8fa3,0 0 30px #ff4d6acc;
                    box-shadow:0 0 34px #ff4d6a99,0 0 62px #ff4d6a44; border-color:#ff9bb0cc; }
        }
        .card h1 { color:#fff; font-size:clamp(26px,5vw,46px); letter-spacing:10px; margin:0 0 26px;
                   text-shadow:0 0 26px #39e6e0aa; }
        .card .body { color:#cfe3f5; font-size:15px; line-height:2; letter-spacing:1px;
                      max-width:640px; }
        /* the continue prompt should glow enough to read as the way out */
        .card .go { margin-top:36px; color:#d6f7ff; font-size:13px; letter-spacing:5px;
                    padding:10px 26px; border:1px solid #39e6e0aa; border-radius:4px;
                    background:#0a2029aa; animation:goGlow 1.7s ease-in-out infinite; }
        @keyframes goGlow {
          0%, 100% { color:#bfeef7;
                     text-shadow:0 0 8px #39e6e0aa;
                     box-shadow:0 0 14px #39e6e044, inset 0 0 12px #39e6e015;
                     border-color:#39e6e066; }
          50%      { color:#ffffff;
                     text-shadow:0 0 14px #7ffcff, 0 0 30px #39e6e0cc;
                     box-shadow:0 0 34px #39e6e099, 0 0 62px #39e6e044, inset 0 0 18px #39e6e033;
                     border-color:#7ffcffcc; }
        }
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
        .settings { width:min(620px,88vw); margin:12px 0 4px; padding:14px 18px;
                    border:1px solid #31516d; border-radius:6px; background:#08111dcc; }
        .settings-title { color:#7fdcff; font-size:10px; letter-spacing:4px; margin-bottom:10px; text-align:center; }
        .settings-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 20px; }
        .difficulty { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:14px; }
        .diff { display:flex; flex-direction:column; gap:3px; padding:8px 6px; cursor:pointer;
                border:1px solid #31516d; border-radius:8px; background:#0a1622; font:inherit; text-align:center; }
        .diff-name { color:#b9d6ed; font-size:11px; letter-spacing:3px; }
        .diff-blurb { color:#6f92b3; font-size:9px; letter-spacing:.5px; line-height:1.4; }
        .diff:hover { border-color:#4d7ea6; }
        .diff.on { border-color:#39e6e0; background:#0d2733; box-shadow:0 0 18px #39e6e033; }
        .diff.on .diff-name { color:#7fdcff; }
        .setting { display:grid; grid-template-columns:110px 1fr 34px; align-items:center; gap:8px;
                   color:#b9d6ed; font-size:10px; letter-spacing:1px; }
        .setting input[type=range] { width:100%; accent-color:#39e6e0; }
        .setting output { color:#7fdcff; text-align:right; }
        .setting.toggle { grid-template-columns:1fr auto; cursor:pointer; }
        .setting.toggle input { accent-color:#39e6e0; }
        .hc-on .boss-track, .hc-on .hud-track { border-color:#fff; }
        .hc-on .hud-label, .hc-on .hint { color:#fff; text-shadow:0 1px 4px #000,0 0 4px #000; }
        .subtitles-off #comms { display:none !important; }
        .reduced-motion *, .reduced-motion *::before, .reduced-motion *::after {
          animation-duration:.001ms !important; animation-iteration-count:1 !important; transition-duration:.001ms !important;
        }
        .shield-flash { position:absolute; inset:0; pointer-events:none; opacity:0;
                        border:5px solid #67e8ff; box-shadow:inset 0 0 90px #31cfff88; }
        .shield-flash.on { animation:shieldHit .32s ease-out both; }
        @keyframes shieldHit { 0%{opacity:.9;transform:scale(.985)} 100%{opacity:0;transform:scale(1)} }
        /* three blurbs side by side at phone width wrap to four lines each and
           push the sliders off the panel; the labels alone still read */
        @media(max-width:650px){ .diff-blurb{display:none} .diff{padding:10px 4px}
                                 .settings-grid{grid-template-columns:1fr}.settings{max-height:42vh;overflow:auto}.pkeys{display:none} }
        .perf { position:absolute; right:14px; bottom:14px; display:none; pointer-events:none;
                font:11px/1.55 ui-monospace,Menlo,monospace; color:#9fe8c4; white-space:pre;
                text-shadow:0 1px 3px #000; letter-spacing:.5px; }
        .perf.on { display:block; }
        .perf b { color:#ffd06a; font-weight:400; }
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
        /* development tool: only revealed when bindChapterDebug is called,
           which now happens solely under ?debug */
        .debug-btn { display:none; position:absolute; right:24px; top:142px; pointer-events:auto; cursor:pointer; z-index:35;
                     color:#ffd86a; background:#17150dcc; border:1px solid #ffd86a99;
                     border-radius:4px; padding:7px 10px; font-size:9px; letter-spacing:2px; }
        .debug-btn:hover { background:#3a3213; box-shadow:0 0 14px #ffd86a55; }
        .dash-action { display:none; position:absolute; right:24px; top:182px; width:74px; height:42px;
                       pointer-events:auto; cursor:pointer; z-index:18; border-radius:5px;
                       border:1px solid #58c8ff; color:#eaffff; background:#09233ddd;
                       font-size:10px; letter-spacing:2px; box-shadow:0 0 15px #168cff44; }
        .dash-action.ready { display:block; }
        .dash-action:active { background:#168cff; transform:scale(.96); }
        .tc-on .dash-action { display:none !important; }
        .debug-panel { position:absolute; right:108px; top:60px; width:250px; padding:12px;
                       display:none; pointer-events:auto; z-index:36; background:#080d16f2;
                       border:1px solid #ffd86a88; border-radius:6px; box-shadow:0 8px 28px #000b; }
        .debug-panel.open { display:block; }
        .debug-title { color:#ffd86a; font-size:10px; letter-spacing:3px; margin-bottom:9px; }
        .debug-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:6px; }
        .debug-ch { cursor:pointer; color:#eaf6ff; background:#111d2c; border:1px solid #3a5a7a;
                    border-radius:3px; padding:7px 5px; font-size:9px; letter-spacing:1px; }
        .debug-ch:hover { border-color:#ffd86a; color:#ffd86a; }
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
        <div class="boss-track">
          <div class="boss-fill" id="bossfill" style="width:100%"></div>
          <div class="boss-open">OPENING · STRIKE THE CORE</div>
        </div>
        <div class="boss-state" id="boss-state"></div>
      </div>
      <div class="chips">
        <div class="chip" id="chip-weapon"><b>A</b> SABER · <b>E</b> RIFLE · <b>1-6</b> to switch</div>
        <div class="chip" id="chip-boots"><b>SPACE (hold)</b> ROCKET BOOTS</div>
        <div class="chip locked" id="chip-beam"><b>E</b> BEAM — ???</div>
        <div class="chip locked" id="chip-nova"><b>Q</b> NOVA — ???</div>
        <div class="chip locked" id="chip-blades">CRIMSON EDGE — ???</div>
        <div class="chip" id="chip-power" style="display:none"></div>
      </div>
      <div class="perf" id="perf"></div>
      <div class="toast" id="toast"><h1 id="toast-h"></h1><p id="toast-p"></p></div>
      <div class="impact-flash" id="impact-flash"></div>
      <div class="critical-state" id="critical-state"></div>
      <div class="critical-label" id="critical-label">⚠ INTEGRITY CRITICAL</div>
      <div class="evade-flash" id="evade-flash">PERFECT EVADE</div>
      <div class="target-lock" id="target-lock"><div class="target-data" id="target-data"></div></div>
      <div class="boss-intro" id="boss-intro">
        <div class="threat" id="boss-intro-threat">HOSTILE SIGNATURE</div>
        <div class="name" id="boss-intro-name"></div>
        <div class="subtitle" id="boss-intro-sub"></div>
      </div>
      <div class="cross"></div>
      <button class="debug-btn" id="debug-btn" type="button">DEBUG</button>
      <button class="dash-action" id="dash-action" type="button"><b>C</b> DASH</button>
      <div class="debug-panel" id="debug-panel">
        <div class="debug-title">JUMP TO CHAPTER</div>
        <div class="debug-grid" id="debug-grid"></div>
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
        <div class="comms-next" id="comms-next">ENTER ▸ SKIP</div>
      </div>
      <div class="card" id="card">
        <div class="ch" id="card-ch"></div>
        <h1 id="card-title"></h1>
        <div class="body" id="card-body"></div>
        <div class="go">CLICK TO CONTINUE</div>
      </div>
      <div class="vig" id="vig"></div>
      <div class="shield-flash" id="shield-flash"></div>
      <div class="pause" id="pause">
        <h1>PAUSED</h1>
        <div class="stats" id="pause-stats"></div>
        <div class="pbtn" id="p-resume">RESUME</div>
        <div class="pbtn" id="p-restart">RESTART RUN</div>
        <div class="settings">
          <div class="settings-title">SYSTEM CONFIGURATION</div>
          <div class="difficulty" id="set-difficulty">
            ${(Object.keys(DIFFICULTY) as Difficulty[]).map((d) =>
              `<button type="button" class="diff" data-diff="${d}">
                 <span class="diff-name">${DIFFICULTY[d].label}</span>
                 <span class="diff-blurb">${DIFFICULTY[d].blurb}</span>
               </button>`).join('')}
          </div>
          <div class="settings-grid">
            <label class="setting">MUSIC <input id="set-music" type="range" min="0" max="100"/><output id="out-music"></output></label>
            <label class="setting">EFFECTS <input id="set-effects" type="range" min="0" max="100"/><output id="out-effects"></output></label>
            <label class="setting">CAMERA SHAKE <input id="set-shake" type="range" min="0" max="100"/><output id="out-shake"></output></label>
            <label class="setting">LOOK SPEED <input id="set-sensitivity" type="range" min="40" max="160"/><output id="out-sensitivity"></output></label>
            <label class="setting toggle">SUBTITLES <input id="set-subtitles" type="checkbox"/></label>
            <label class="setting toggle">HIGH CONTRAST <input id="set-contrast" type="checkbox"/></label>
            <label class="setting toggle">REDUCED MOTION <input id="set-motion" type="checkbox"/></label>
          </div>
        </div>
        <div class="pkeys">
          <b>ARROWS / WASD</b> move &nbsp; <b>SHIFT</b> boost &nbsp; <b>SPACE</b> jump / fly &nbsp; <b>C</b> dash<br/>
          <b>A</b> or <b>click</b> saber &nbsp; <b>E (hold)</b> ranged &nbsp; <b>1-6</b> switch &nbsp; <b>Q</b> nova pulse<br/>
          <b>L</b> or <b>middle-click</b> lock on &nbsp; <b>ESC</b> pause
        </div>
      </div>
      <div class="hint">ARROWS / WASD move · SHIFT boost · SPACE rise · X descend · C dash<br/>A / click attack · F Crimson Breaker · L or middle-click lock-on</div>
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
      blades: document.getElementById('chip-blades')!,
    };

  }

  bindDash(cb: () => void): void {
    document.getElementById('dash-action')!.addEventListener('click', (e) => {
      e.stopPropagation();
      cb();
    });
  }

  unlockDash(): void {
    document.getElementById('dash-action')!.classList.add('ready');
  }

  /** The E slot shows what it currently holds: RIFLE until the beam lands. */
  setRangedSlot(label: string): void {
    this.rangedLabel = label;
    this.paintWeaponChip();
  }

  // The wheel is gone; weapons are earned and equipped directly, so there is
  // nothing to reveal. Kept so game.ts can call it uniformly for every reward.
  unlockWeapon(_w: WeaponId): void {}

  setScore(score: number, combo: number): void {
    document.getElementById('score-val')!.textContent = score.toLocaleString();
    const c = document.getElementById('score-combo')!;
    c.textContent = combo > 1 ? '×' + combo + ' COMBO' : '';
    c.style.transform = combo > 1 ? 'scale(1.15)' : 'scale(1)';
    setTimeout(() => (c.style.transform = 'scale(1)'), 90);
  }

  /** Re-lock every earned ability and weapon, for a fresh run. */
  resetUnlocks(): void {
    document.getElementById('dash-action')!.classList.remove('ready');
    const labels: Record<string, string> = {
      beam: '<b>E</b> BEAM — ???',
      nova: '<b>Q</b> NOVA — ???',
      blades: 'CRIMSON EDGE — ???',
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

  bindSettings(settings: GameSettings, onChange: (settings: GameSettings) => void): void {
    const ranges: Array<[keyof GameSettings, string, number]> = [
      ['music', 'music', 100], ['effects', 'effects', 100], ['shake', 'shake', 100],
      ['sensitivity', 'sensitivity', 100],
    ];
    const emit = (): void => {
      for (const [key, id, scale] of ranges) {
        const input = document.getElementById('set-' + id) as HTMLInputElement;
        (settings as any)[key] = Number(input.value) / scale;
        document.getElementById('out-' + id)!.textContent = Math.round(Number(input.value)) + '%';
      }
      settings.subtitles = (document.getElementById('set-subtitles') as HTMLInputElement).checked;
      settings.highContrast = (document.getElementById('set-contrast') as HTMLInputElement).checked;
      settings.reducedMotion = (document.getElementById('set-motion') as HTMLInputElement).checked;
      this.root.classList.toggle('subtitles-off', !settings.subtitles);
      this.root.classList.toggle('hc-on', settings.highContrast);
      this.root.classList.toggle('reduced-motion', settings.reducedMotion);
      onChange({ ...settings });
    };
    for (const [key, id, scale] of ranges) {
      const input = document.getElementById('set-' + id) as HTMLInputElement;
      input.value = String(Math.round((settings[key] as number) * scale));
      input.addEventListener('input', emit);
    }
    (document.getElementById('set-subtitles') as HTMLInputElement).checked = settings.subtitles;
    (document.getElementById('set-contrast') as HTMLInputElement).checked = settings.highContrast;
    (document.getElementById('set-motion') as HTMLInputElement).checked = settings.reducedMotion;
    for (const id of ['set-subtitles', 'set-contrast', 'set-motion']) {
      document.getElementById(id)!.addEventListener('change', emit);
    }
    const diffButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>('#set-difficulty .diff')
    );
    const paintDifficulty = (): void => {
      for (const b of diffButtons) b.classList.toggle('on', b.dataset.diff === settings.difficulty);
    };
    for (const b of diffButtons) {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        settings.difficulty = b.dataset.diff as Difficulty;
        paintDifficulty();
        emit();
      });
    }
    paintDifficulty();
    emit();
  }

  bindChapterDebug(chapters: { no: number; title: string }[], onJump: (index: number) => void): void {
    const panel = document.getElementById('debug-panel')!;
    const button = document.getElementById('debug-btn')!;
    button.style.display = 'block'; // hidden in CSS until a debug build asks
    const grid = document.getElementById('debug-grid')!;
    grid.innerHTML = chapters.map((ch, index) =>
      `<button class="debug-ch" type="button" data-ch="${index}">CH ${ch.no}<br/>${ch.title}</button>`
    ).join('');
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    grid.querySelectorAll<HTMLButtonElement>('.debug-ch').forEach((chapterButton) => {
      chapterButton.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.remove('open');
        onJump(Number(chapterButton.dataset.ch));
      });
    });
  }

  /**
   * Queue radio lines. They type out one at a time and auto-advance, so the
   * player can keep fighting while Command talks.
   */
  say(lines: { who: string; text: string }[]): void {
    this.commsQueue.push(...lines);
  }

  /**
   * Advance the radio by one line. The campaign carries roughly fourteen
   * minutes of scripted dialogue and none of it could be hurried, which is
   * indefensible on a replay and painful on a first run if you already read
   * quickly. One press completes the line being typed; a second drops it and
   * moves on, so holding the key runs the whole conversation out.
   */
  skipLine(): void {
    const line = this.commsQueue[0];
    if (!line) return;
    // A line that has not begun typing yet has no DOM state to complete, and
    // updateComms would re-initialise it on the next frame and undo the skip.
    // Let it start; the following press will take it.
    if (!this.commsOn) return;
    if (this.typed < line.text.length) {
      // finish revealing this one rather than skipping what has not been read
      this.typed = line.text.length;
      document.getElementById('comms-text')!.textContent = line.text;
      this.holdT = 0.35; // brief beat so a held key does not blur past it
      return;
    }
    this.commsQueue.shift();
    this.commsOn = false;
    this.typed = 0;
    this.holdT = 0;
    if (this.commsQueue.length === 0) {
      document.getElementById('comms')!.classList.remove('show');
    }
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
    this.bled = false;
    const box = document.getElementById('comms')!;
    box.classList.remove('show');
    box.classList.remove('bled');
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
        : line.who.includes('KUROKI') ? 'kuroki-pilot'
        : line.who.includes('HINATA') ? 'hinata-pilot'
        : line.who.includes('JOTETSU') ? 'jotetsu-engineer'
        : line.who.includes('KOTETSU') ? 'kotetsu-support'
        : line.who.includes('REI') ? 'rei-memorial'
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
      // anything arriving on Rei's channel is coming through the seam
      this.bled = line.who.includes('REI');
      box.classList.toggle('bled', this.bled);
      box.classList.add('show');
    }
    const line = this.commsQueue[0];
    if (!line) { this.commsOn = false; box.classList.remove('show'); return; }

    if (this.typed < line.text.length) {
      if (this.bled) {
        // A dead channel does not type evenly. It stalls, then arrives in a
        // rush, and the leading edge is still resolving into characters.
        this.bledT -= dt;
        if (this.bledT <= 0) {
          // Averages out near the normal 46 characters a second, but arrives
          // in uneven bursts — a stall then a rush, rather than simply slower.
          this.bledT = 0.03 + Math.random() * 0.17;
          this.typed += 2 + Math.floor(Math.random() * 8);
        }
        const n = Math.min(line.text.length, Math.floor(this.typed));
        const solid = line.text.slice(0, Math.max(0, n - 2));
        // the last couple of characters flicker through static before settling
        const edge = line.text.slice(Math.max(0, n - 2), n)
          .split('')
          .map((c) => (c === ' ' ? c : Math.random() < 0.5 ? c : STATIC[Math.floor(Math.random() * STATIC.length)]))
          .join('');
        document.getElementById('comms-text')!.textContent = solid + edge;
      } else {
        this.typed += dt * 46; // characters per second
        document.getElementById('comms-text')!.textContent =
          line.text.slice(0, Math.floor(this.typed));
      }
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

  /**
   * Terminal game-over screen. Unlike a story card this does not let you
   * carry on where you were — the only way out is a fresh campaign, so it
   * asks for a deliberate press rather than any key.
   */
  showGameOver(heading: string, title: string, body: string): Promise<void> {
    const card = document.getElementById('card')!;
    document.getElementById('card-ch')!.textContent = heading;
    document.getElementById('card-title')!.textContent = title;
    document.getElementById('card-body')!.innerHTML =
      body + '<br/><br/><span style="color:#ff9bb0">CAMPAIGN OVER</span>';
    document.querySelector('.card .go')!.textContent =
      this.isTouch ? 'TAP TO RESTART FROM CHAPTER 1' : 'PRESS SPACE TO RESTART FROM CHAPTER 1';
    card.classList.add('show', 'over');
    this.cardOpen = true;

    return new Promise((resolve) => {
      const done = () => {
        card.removeEventListener('click', done);
        window.removeEventListener('keydown', onKey, true);
        card.classList.remove('show', 'over');
        this.cardOpen = false;
        resolve();
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.code !== 'Space' && e.code !== 'Enter') return;
        e.preventDefault();
        done();
      };
      card.addEventListener('click', done);
      window.addEventListener('keydown', onKey, true);
    });
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
    contacts: { dx: number; dz: number; kind: RadarKind }[],
    camYaw: number,
    range: number,
  ): void {
    const map = document.getElementById('minimap')!;
    // the dial shrinks on touch, so derive the geometry from its real size
    const size = map.clientWidth || 168;
    const C = size / 2;
    const R = size * 0.46; // usable radius in px
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
      const px = C + (c.dx / range) * R * k;
      const py = C + (c.dz / range) * R * k;
      const boss = c.kind === 'boss';
      const shelter = c.kind === 'shelter' || c.kind === 'shelterHit';
      const size = boss ? 13 : shelter ? 11 : c.kind === 'pickup' ? 7 : 8;
      el.style.display = 'block';
      el.style.left = px + 'px';
      el.style.top = py + 'px';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      // shelters read as square wards, everything else as round contacts
      el.style.borderRadius = shelter ? '2px' : '50%';
      el.style.background = boss ? '#ff5a52'
        : c.kind === 'shelterHit' ? '#ff4d4d'
        : c.kind === 'shelter' ? '#5cf2a0'
        : c.kind === 'pickup' ? '#5cf2a0' : '#ffb454';
      el.style.boxShadow = boss ? '0 0 10px #ff5a52'
        : c.kind === 'shelterHit' ? '0 0 12px #ff4d4d' : 'none';
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
      el.style.left = (C + Math.sin(ang) * (C * 0.83)) + 'px';
      el.style.top = (C - Math.cos(ang) * (C * 0.83)) + 'px';
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

  /**
   * Frame-budget overlay, toggled with F3. Shipping without one means the
   * only way to notice a hitch is to feel it, which is not a measurement.
   */
  togglePerf(): boolean {
    const el = document.getElementById('perf')!;
    const on = el.classList.toggle('on');
    return on;
  }

  get perfOn(): boolean {
    return document.getElementById('perf')!.classList.contains('on');
  }

  setPerf(html: string): void {
    document.getElementById('perf')!.innerHTML = html;
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

  popDamage(dmg: number, punish = false): void {
    const el = document.getElementById('dmgpop')!;
    el.textContent = punish ? '-' + Math.round(dmg) + '!' : '-' + Math.round(dmg);
    // a punish hit reads cyan and lands bigger than an ordinary one
    el.style.color = punish ? '#7ff0ff' : '';
    el.style.textShadow = punish ? '0 0 18px #4de2ff' : '';
    el.style.animation = 'none';
    void el.offsetWidth; // restart the animation
    el.style.animation = punish ? 'dmgpop .75s ease-out' : 'dmgpop .6s ease-out';
  }

  impactFeedback(weakPoint: boolean, strength = 1): void {
    const el = document.getElementById('impact-flash')!;
    el.classList.toggle('weak', weakPoint);
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = `impact-hit ${Math.max(0.12, 0.2 + strength * 0.05)}s ease-out`;
  }

  showBossIntro(name: string, subtitle: string): void {
    const el = document.getElementById('boss-intro')!;
    document.getElementById('boss-intro-name')!.textContent = name;
    document.getElementById('boss-intro-sub')!.textContent = subtitle;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  private rangedLabel = 'RIFLE';
  private meleeLabel = 'SABER';

  /**
   * The chip is the only weapon readout now that the radial and its floating
   * button are gone: what A swings, what E holds, and how to change the first.
   */
  private paintWeaponChip(): void {
    const chip = document.getElementById('chip-weapon');
    if (chip) {
      chip.innerHTML = `<b>A</b> ${this.meleeLabel} · <b>E</b> ${this.rangedLabel} · <b>1-6</b> to switch`;
    }
  }

  setWeapon(w: WeaponId, upgradedLabel?: string): void {
    const meta = WEAPONS.find((x) => x.id === w)!;
    this.meleeLabel = upgradedLabel ?? meta.label;
    this.paintWeaponChip();
  }

  /**
   * @param resume  If a checkpoint exists, its chapter number and title, plus
   *                the callback to pick up from it. The campaign runs to the
   *                better part of an hour, so losing it to a closed tab is
   *                not something a player should ever have to discover.
   */
  showStart(
    onStart: () => void,
    isTouch = false,
    resume?: { chapter: number; title: string; onResume: () => void },
  ): void {
    this.isTouch = isTouch;
    if (isTouch) {
      // no keyboard to hurry the radio with, so the panel itself is the button
      document.getElementById('comms-next')!.textContent = 'TAP ▸ SKIP';
      const box = document.getElementById('comms')!;
      const skip = (e: Event) => { e.preventDefault(); e.stopPropagation(); this.skipLine(); };
      box.addEventListener('touchstart', skip, { passive: false });
      box.addEventListener('click', skip);
    }
    const el = document.createElement('div');
    el.className = 'start';
    const keys = isTouch
      ? `<b>D-PAD / LEFT SIDE</b> move &nbsp; <b>RIGHT SIDE</b> drag to look around<br/>
         <b>SABER / RIFLE</b> attack &nbsp; <b>JUMP (hold)</b> fly with rocket boots<br/>`
      : `<b>ARROW KEYS / WASD</b> move &nbsp; <b>SHIFT</b> boost &nbsp; <b>SPACE</b> jump<br/>
         <b>A / LEFT CLICK</b> attack &nbsp; <b>R (hold)</b> charge the rifle<br/>`;
    el.innerHTML = `
      <h1>MECHA CITY</h1>
      <h2>NEO TOKYO · TERRA-ARMOR DEPLOYMENT</h2>
      <div class="keys">
        ${keys}
        Everything breaks. Citizens can't be hurt — but they will run.<br/>
        Hunt the monsters. Every boss you defeat teaches you a new power.
      </div>
      ${resume ? `<div class="go resume" id="go-resume">CONTINUE · CHAPTER ${resume.chapter} — ${resume.title}</div>` : ''}
      <div class="go" id="go-new">${resume ? 'START A NEW RUN' : `${isTouch ? 'TAP' : 'CLICK'} TO DEPLOY`}</div>
    `;
    const begin = (fn: () => void) => { el.remove(); fn(); };
    if (resume) {
      el.querySelector('#go-resume')!.addEventListener('click', (e) => {
        e.stopPropagation();
        begin(resume.onResume);
      });
      el.querySelector('#go-new')!.addEventListener('click', (e) => {
        e.stopPropagation();
        begin(onStart);
      });
    } else {
      el.addEventListener('click', () => begin(onStart));
    }
    this.root.appendChild(el);
  }

  dismissStart(): void {
    this.root.querySelector('.start')?.remove();
  }

  setHP(frac: number): void {
    this.hpFill.style.width = Math.max(0, frac * 100) + '%';
    this.hpFill.style.background = frac < 0.3
      ? 'linear-gradient(90deg,#ff3b3b,#ff9a3b)'
      : 'linear-gradient(90deg,#26e0a8,#7fdcff)';
    const critical = frac > 0 && frac <= 0.25;
    document.getElementById('critical-state')!.classList.toggle('on', critical);
    document.getElementById('critical-label')!.classList.toggle('on', critical);
  }

  setTargetLock(
    visible: boolean,
    x = 0,
    y = 0,
    distance = 0,
    state: 'track' | 'evade' | 'open' = 'track',
  ): void {
    const el = document.getElementById('target-lock')!;
    el.style.display = visible ? 'block' : 'none';
    if (!visible) return;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.classList.toggle('evade', state === 'evade');
    el.classList.toggle('open', state === 'open');
    document.getElementById('target-data')!.textContent =
      state === 'open' ? `PUNISH · ${Math.round(distance)}m`
      : state === 'evade' ? `EVADE · ${Math.round(distance)}m`
      : `LOCK · ${Math.round(distance)}m`;
  }

  perfectEvade(): void {
    const el = document.getElementById('evade-flash')!;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'perfectEvade 1.05s ease-out';
  }

  showBoss(name: string): void {
    this.bossWrap.style.display = 'block';
    this.bossName.textContent = '⚠ ' + name + ' ⚠';
  }

  /**
   * The boss bar carries the state of the fight, not just a number: it shifts
   * colour as the boss changes gear, and flares cyan with an OPENING prompt
   * whenever the boss is caught in a punish window.
   */
  setBossHP(frac: number, phase: 1 | 2 | 3 = 1, open = false): void {
    this.bossFill.style.width = Math.max(0, frac * 100) + '%';
    this.bossFill.style.background = open
      ? 'linear-gradient(90deg,#7ff0ff,#4de2ff)'
      : phase === 3 ? 'linear-gradient(90deg,#ff3b5c,#ff8a3d)'
      : phase === 2 ? 'linear-gradient(90deg,#ff7a3d,#ffc44f)'
      : 'linear-gradient(90deg,#ff4d6a,#ff9bb0)';
    this.bossWrap.classList.toggle('open', open);
    this.bossWrap.classList.toggle('enraged', !open && phase === 3);
    document.getElementById('boss-state')!.textContent = open
      ? 'CORE EXPOSED · COUNTERATTACK'
      : phase === 3 ? 'PHASE III · ENRAGED'
      : phase === 2 ? 'PHASE II · ESCALATING'
      : 'PHASE I · ENGAGED';
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

  unlock(key: 'beam' | 'boots' | 'nova' | 'blades', label: string): void {
    const chip = this.chips[key];
    if (!chip) return;
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

  shieldFlash(): void {
    const el = document.getElementById('shield-flash')!;
    el.classList.remove('on');
    void el.offsetWidth;
    el.classList.add('on');
  }

  update(dt: number): void {
    this.updateComms(dt);
    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) this.toastEl.style.opacity = '0';
    }
  }
}
