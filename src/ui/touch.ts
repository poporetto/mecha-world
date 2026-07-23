// Touch controls for mobile browsers: virtual joystick (left), drag-to-look
// (right), and action buttons. Instantiated only on coarse-pointer devices.

export function isTouchDevice(): boolean {
  if (new URLSearchParams(location.search).has('touch')) return true; // preview on desktop
  return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
}

export interface TouchCallbacks {
  onSaber: () => void;
  onLaser: () => void;
  onNova: () => void;
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
  // D-pad state, combined with the joystick each change
  private stickX = 0;
  private stickZ = 0;
  private dpadX = 0;
  private dpadZ = 0;

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
        .tc-dpad { position:absolute; left:calc(16px + env(safe-area-inset-left));
                   bottom:calc(78px + env(safe-area-inset-bottom)); display:grid;
                   grid-template-columns:repeat(3, 54px); grid-template-rows:repeat(3, 54px); gap:4px; }
        .tc-dir { width:54px; height:54px; border-radius:12px; font-size:16px; color:#7fdcff; }
        /* declutter the desktop HUD while touch controls are active */
        .tc-on .hint { display:none !important; }
        .tc-on .chips { display:none !important; }
        .tc-on .start h1 { font-size:30px !important; letter-spacing:6px !important; }
        .tc-on .start h2 { font-size:12px !important; letter-spacing:4px !important; }
        .tc-on .start .keys { font-size:11px !important; padding:0 16px; }
      </style>
      <div class="tc-stick" id="tc-stick"><div class="tc-knob" id="tc-knob"></div></div>
      <div class="tc-dpad">
        <div></div><div class="tc-btn tc-dir" id="tc-up">▲</div><div></div>
        <div class="tc-btn tc-dir" id="tc-left">◀</div><div></div><div class="tc-btn tc-dir" id="tc-right">▶</div>
        <div></div><div class="tc-btn tc-dir" id="tc-down">▼</div><div></div>
      </div>
      <div class="tc-btns">
        <div class="tc-btn hidden" id="tc-nova">NOVA</div>
        <div class="tc-btn hidden" id="tc-beam">BEAM</div>
        <div class="tc-btn" id="tc-boost">BOOST</div>
        <div class="tc-btn" id="tc-laser">RIFLE</div>
        <div class="tc-btn" id="tc-jump">JUMP</div>
        <div class="tc-btn big" id="tc-saber">SABER</div>
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
    (key === 'beam' ? this.beamBtn : this.novaBtn).classList.remove('hidden');
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
    tap('tc-saber', () => this.cb.onSaber());
    tap('tc-laser', () => this.cb.onLaser());
    tap('tc-nova', () => this.cb.onNova());
    hold('tc-jump', (v) => (this.jump = v));
    hold('tc-boost', (v) => (this.boost = v));
    hold('tc-beam', (v) => (this.beam = v));
    // D-pad: hold to move; releasing one direction keeps the other axis
    hold('tc-up', (v) => { this.dpadZ = v ? 1 : 0; this.combine(); });
    hold('tc-down', (v) => { this.dpadZ = v ? -1 : 0; this.combine(); });
    hold('tc-left', (v) => { this.dpadX = v ? -1 : 0; this.combine(); });
    hold('tc-right', (v) => { this.dpadX = v ? 1 : 0; this.combine(); });
  }

  private combine(): void {
    this.moveX = Math.max(-1, Math.min(1, this.stickX + this.dpadX));
    this.moveZ = Math.max(-1, Math.min(1, this.stickZ + this.dpadZ));
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
          this.stickX = Math.abs(dx) > 8 ? dx / STICK_RADIUS : 0;
          this.stickZ = Math.abs(dy) > 8 ? -dy / STICK_RADIUS : 0;
          this.combine();
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
          this.stickX = 0;
          this.stickZ = 0;
          this.combine();
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
