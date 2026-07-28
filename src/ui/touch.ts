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
  onQuake: () => void;
  onWheel: () => void;
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
  private quakeBtn: HTMLElement;

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
        .tc-btns { position:absolute; right:calc(14px + env(safe-area-inset-right));
                   bottom:calc(78px + env(safe-area-inset-bottom)); display:grid;
                   grid-template-columns:repeat(2, 62px); gap:10px; justify-items:end; }
        .tc-btn { width:62px; height:62px; border-radius:50%; border:2px solid #3a5a7a;
                  background:#0a1626cc; color:#eaf6ff; font-size:11px; letter-spacing:1px;
                  display:flex; align-items:center; justify-content:center; text-align:center;
                  text-shadow:0 1px 2px #000; touch-action:none; }
        .tc-btn.big { width:78px; height:78px; border-color:#39e6e0; font-size:12px; }
        .tc-btn.held { background:#39e6e055; border-color:#39e6e0; }
        .tc-btn.hidden { display:none; }
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
        .tc-on .start h1 { font-size:30px !important; letter-spacing:6px !important; }
        .tc-on .start h2 { font-size:12px !important; letter-spacing:4px !important; }
        .tc-on .start .keys { font-size:11px !important; padding:0 16px; }
      </style>
      <div class="tc-stick" id="tc-stick"><div class="tc-knob" id="tc-knob"></div></div>
      <div class="tc-hint" id="tc-hint">DRAG<br/>TO MOVE</div>
      <div class="tc-btns">
        <div class="tc-btn hidden" id="tc-nova">NOVA</div>
        <div class="tc-btn hidden" id="tc-quake">QUAKE</div>
        <div class="tc-btn hidden" id="tc-beam">BEAM</div>
        <div class="tc-btn" id="tc-wheel">⚔<br/>WEAPON</div>
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
    this.quakeBtn = this.layer.querySelector('#tc-quake')!;

    this.bindButtons();
    this.bindTouches();
  }

  unlock(key: 'beam' | 'nova' | 'quake'): void {
    const btn = key === 'beam' ? this.beamBtn : key === 'nova' ? this.novaBtn : this.quakeBtn;
    btn?.classList.remove('hidden');
  }

  // wheel weapons are earned from bosses; nothing to reveal on the pad itself
  // (the radial wheel handles that) — kept so game.ts can call it uniformly
  unlockWeapon(_w: WeaponId): void {}

  setWeapon(w: WeaponId): void {
    const meta = WEAPONS.find((x) => x.id === w)!;
    const atk = this.layer.querySelector('#tc-attack') as HTMLElement | null;
    if (atk) atk.innerHTML = meta.icon + '<br/>' + meta.label;
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
    tap('tc-wheel', () => this.cb.onWheel());
    tap('tc-nova', () => this.cb.onNova());
    tap('tc-quake', () => this.cb.onQuake());
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
