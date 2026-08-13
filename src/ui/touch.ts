// Touch controls for mobile browsers: virtual joystick (left), drag-to-look
// (right), and action buttons. Instantiated only on coarse-pointer devices.

import { WEAPONS, WeaponId } from './hud';

export function isTouchDevice(): boolean {
  if (new URLSearchParams(location.search).has('touch')) return true; // preview on desktop
  return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
}

export interface TouchCallbacks {
  onAttackDown: () => void;
  onAttackUp: () => void;
  onNova: () => void;
  onDash: () => void;
  onLook: (dx: number, dy: number) => void;
}

const STICK_RADIUS = 52;

export class TouchControls {
  moveX = 0;
  moveZ = 0;
  jump = false;
  boost = false;
  beam = false;

  private layer: HTMLElement;
  private stickBase: HTMLElement;
  private stickKnob: HTMLElement;
  private moveId: number | null = null;
  private lookId: number | null = null;
  private moveOrigin = { x: 0, y: 0 };
  private lookLast = { x: 0, y: 0 };
  private beamBtn: HTMLElement;
  private novaBtn: HTMLElement;

  constructor(root: HTMLElement, private cb: TouchCallbacks) {
    this.layer = document.createElement('div');
    this.layer.innerHTML = `
      <style>
        .tc-layer { position:absolute; inset:0; pointer-events:auto; touch-action:none;
                    font-family:inherit; user-select:none; -webkit-user-select:none; }
        .tc-stick { position:absolute; width:${STICK_RADIUS * 2}px; height:${STICK_RADIUS * 2}px; border-radius:50%;
                    border:2px solid #7fdcff66; background:#0a162655; display:none;
                    transform:translate(-50%,-50%); pointer-events:none; }
        .tc-knob { position:absolute; width:44px; height:44px; border-radius:50%;
                   background:#7fdcffbb; box-shadow:0 0 12px #39e6e088;
                   transform:translate(-50%,-50%); pointer-events:none; display:none; }
        /* Thumb-shaped pad rather than a column. The old 2-wide stack ran
           310px up the screen — over a third of a phone — which put the
           abilities out of reach. Attack sits in the corner where the thumb
           rests; movement is one reach away; abilities are a strip on top.
           Rounded rectangles rather than circles: they carry a word legibly
           at this size, and they tile without the wasted gaps discs leave. */
        .tc-btns { position:absolute; right:calc(10px + env(safe-area-inset-right));
                   bottom:calc(14px + env(safe-area-inset-bottom)); display:grid;
                   grid-template-columns:70px 70px 92px;
                   grid-template-rows:44px 48px 58px;
                   grid-template-areas:
                     ".     nova  beam"
                     "dash  .     boost"
                     ".     jump  attack";
                   gap:7px; }
        .tc-btn { border-radius:13px; border:1px solid #4d76a0;
                  background:linear-gradient(180deg,#12263bd9,#0a1626e6);
                  color:#dfeeff; font-size:11px; font-weight:600; letter-spacing:1.2px;
                  display:flex; align-items:center; justify-content:center; text-align:center;
                  line-height:1.1; text-shadow:0 1px 2px #000a; touch-action:none;
                  box-shadow:0 1px 0 #ffffff14 inset, 0 2px 6px #0006; }
        /* situational abilities read quieter than the things used every second */
        .tc-btn.minor { font-size:9.5px; letter-spacing:1px; color:#a9c8e4;
                        border-color:#31536f; background:linear-gradient(180deg,#0e1e2fc4,#0a1626cc); }
        #tc-nova { grid-area:nova; } #tc-beam { grid-area:beam; }
        #tc-boost { grid-area:boost; } #tc-dash { grid-area:dash; }
        #tc-jump { grid-area:jump; } #tc-attack { grid-area:attack; }
        /* the primary action reads as the primary action */
        .tc-btn.big { border-color:#4fe6e0; color:#eaffff; font-size:12.5px; letter-spacing:1.6px;
                      background:linear-gradient(180deg,#12414ce0,#0a2630e6);
                      box-shadow:0 0 18px #39e6e03d, 0 1px 0 #ffffff1f inset, 0 2px 8px #0007; }
        .tc-btn.held { background:linear-gradient(180deg,#2ea9b0,#1d7f8a); border-color:#7ff5ef;
                       color:#f2ffff; box-shadow:0 0 22px #39e6e077; }
        .tc-btn.hidden { visibility:hidden; }
        /* Landscape phones are short. The portrait pad would take well over
           half the height, so it flattens into two rows and the abilities
           tuck in beside the movement keys instead of above them. */
        @media (orientation:landscape) and (max-height:520px) {
          .tc-btns { grid-template-columns:44px 48px 48px 64px;
                     grid-template-rows:44px 60px;
                     grid-template-areas:
                       ".    .     nova  beam"
                       "dash boost jump  attack";
                     gap:7px; bottom:calc(10px + env(safe-area-inset-bottom)); }
          .tc-btn { font-size:9px; }
          .tc-btn.big { font-size:10px; }
        }
        /* hint ring showing where the movement stick lives until first touch */
        .tc-hint { position:absolute; left:calc(64px + env(safe-area-inset-left));
                   bottom:calc(120px + env(safe-area-inset-bottom)); width:96px; height:96px;
                   margin:-48px 0 0 -48px; border-radius:50%; border:2px dashed #7fdcff33;
                   display:flex; align-items:center; justify-content:center;
                   color:#7fdcff66; font-size:10px; letter-spacing:1px; pointer-events:none; }
        .tc-hint.gone { display:none; }
        /* declutter the desktop HUD while touch controls are active */
        .tc-on .hint { display:none !important; }
        .tc-on .chips { display:none !important; }
        /* The title screen was laid out for a desktop width and ran off the
           side of a phone — the subtitle alone is 34 characters and clipped
           at both edges. Everything here scales with the viewport instead. */
        .tc-on .start { padding:0 18px; text-align:center; }
        .tc-on .start h1 { font-size:clamp(22px,8.5vw,34px) !important;
                           letter-spacing:clamp(3px,1.6vw,8px) !important; margin-bottom:4px !important; }
        .tc-on .start h2 { font-size:clamp(8px,2.7vw,12px) !important;
                           letter-spacing:clamp(1px,.9vw,4px) !important; margin-bottom:20px !important;
                           max-width:100%; }
        .tc-on .start .keys { font-size:clamp(9.5px,3vw,12px) !important; line-height:1.85;
                              padding:0; max-width:100%; }
        .tc-on .start .go { font-size:clamp(11px,3.2vw,14px); padding:12px 20px;
                            letter-spacing:clamp(2px,1vw,4px); max-width:calc(100vw - 44px); }
      </style>
      <div class="tc-stick" id="tc-stick"><div class="tc-knob" id="tc-knob"></div></div>
      <div class="tc-hint" id="tc-hint">DRAG<br/>TO MOVE</div>
      <div class="tc-btns">
        <div class="tc-btn minor hidden" id="tc-nova">NOVA</div>
        <div class="tc-btn minor" id="tc-beam">RIFLE</div>
        <div class="tc-btn hidden" id="tc-dash">DASH</div>
        <div class="tc-btn" id="tc-boost">BOOST</div>
        <div class="tc-btn" id="tc-jump">JUMP</div>
        <div class="tc-btn big" id="tc-attack">ATTACK</div>
      </div>
    `;
    this.layer.className = 'tc-layer';
    root.classList.add('tc-on');
    root.appendChild(this.layer);

    this.stickBase = this.layer.querySelector('#tc-stick')!;
    this.stickKnob = this.layer.querySelector('#tc-knob')!;
    this.beamBtn = this.layer.querySelector('#tc-beam')!;
    this.novaBtn = this.layer.querySelector('#tc-nova')!;

    this.bindButtons();
    this.bindTouches();
  }

  unlock(key: 'beam' | 'nova'): void {
    const btn = key === 'beam' ? this.beamBtn : this.novaBtn;
    btn?.classList.remove('hidden');
    // the ranged pad button is one slot that gets upgraded, not a new button
    if (key === 'beam') this.beamBtn.textContent = 'BEAM';
  }

  // weapons are earned from bosses and equipped straight away; nothing to
  // reveal on the pad itself — kept so game.ts can call it uniformly
  unlockWeapon(_w: WeaponId): void {}

  unlockDash(): void {
    this.layer.querySelector('#tc-dash')?.classList.remove('hidden');
  }

  setWeapon(w: WeaponId): void {
    const meta = WEAPONS.find((x) => x.id === w)!;
    const atk = this.layer.querySelector('#tc-attack') as HTMLElement | null;
    // Label only. The weapon icons are text-presentation emoji (U+2694 and
    // friends) with no glyph in the HUD font stack, so they drew as a tofu
    // box — which is what the stray "x" on the pad actually was.
    if (atk) atk.textContent = meta.label;
  }

  // hold buttons set a flag while pressed; tap buttons fire a callback
  private bindButtons(): void {
    const hold = (id: string, set: (v: boolean) => void) => {
      const el = this.layer.querySelector('#' + id)! as HTMLElement;
      el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.classList.add('held');
        set(true);
      });
      const off = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        el.classList.remove('held');
        set(false);
      };
      el.addEventListener('touchend', off);
      el.addEventListener('touchcancel', off);
    };
    const tap = (id: string, fn: () => void) => {
      const el = this.layer.querySelector('#' + id)! as HTMLElement;
      el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.classList.add('held');
        fn();
        setTimeout(() => el.classList.remove('held'), 120);
      });
    };
    tap('tc-nova', () => this.cb.onNova());
    tap('tc-dash', () => this.cb.onDash());
    // attack button: press fires / starts charge, release ends charge
    const atk = this.layer.querySelector('#tc-attack')! as HTMLElement;
    atk.addEventListener('touchstart', (e) => {
      e.preventDefault(); e.stopPropagation();
      atk.classList.add('held');
      this.cb.onAttackDown();
    });
    const atkUp = (e: Event) => {
      e.preventDefault(); e.stopPropagation();
      atk.classList.remove('held');
      this.cb.onAttackUp();
    };
    atk.addEventListener('touchend', atkUp);
    atk.addEventListener('touchcancel', atkUp);
    hold('tc-jump', (v) => (this.jump = v));
    hold('tc-boost', (v) => (this.boost = v));
    hold('tc-beam', (v) => (this.beam = v));
  }

  // left ~45% of the screen spawns the joystick; the rest drags the camera
  private bindTouches(): void {
    this.layer.addEventListener('touchstart', (e) => {
      e.preventDefault();
      for (const t of Array.from(e.changedTouches)) {
        if (t.clientX < window.innerWidth * 0.45 && this.moveId === null) {
          this.moveId = t.identifier;
          this.moveOrigin = { x: t.clientX, y: t.clientY };
          this.stickBase.style.left = t.clientX + 'px';
          this.stickBase.style.top = t.clientY + 'px';
          this.stickBase.style.display = 'block';
          this.stickKnob.style.display = 'block';
          this.layer.querySelector('#tc-hint')!.classList.add('gone');
          this.setKnob(0, 0);
        } else if (this.lookId === null) {
          this.lookId = t.identifier;
          this.lookLast = { x: t.clientX, y: t.clientY };
        }
      }
    });
    this.layer.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === this.moveId) {
          let dx = t.clientX - this.moveOrigin.x;
          let dy = t.clientY - this.moveOrigin.y;
          const len = Math.hypot(dx, dy);
          if (len > STICK_RADIUS) {
            dx *= STICK_RADIUS / len;
            dy *= STICK_RADIUS / len;
          }
          this.setKnob(dx, dy);
          // dead zone so a resting thumb doesn't creep
          this.moveX = Math.abs(dx) > 8 ? dx / STICK_RADIUS : 0;
          this.moveZ = Math.abs(dy) > 8 ? -dy / STICK_RADIUS : 0;
        } else if (t.identifier === this.lookId) {
          this.cb.onLook(t.clientX - this.lookLast.x, t.clientY - this.lookLast.y);
          this.lookLast = { x: t.clientX, y: t.clientY };
        }
      }
    });
    const end = (e: TouchEvent) => {
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === this.moveId) {
          this.moveId = null;
          this.moveX = 0;
          this.moveZ = 0;
          this.stickBase.style.display = 'none';
          this.stickKnob.style.display = 'none';
        } else if (t.identifier === this.lookId) {
          this.lookId = null;
        }
      }
    };
    this.layer.addEventListener('touchend', end);
    this.layer.addEventListener('touchcancel', end);
  }

  private setKnob(dx: number, dy: number): void {
    this.stickKnob.style.left = STICK_RADIUS + dx + 'px';
    this.stickKnob.style.top = STICK_RADIUS + dy + 'px';
  }
}
