// First-run onboarding. The suit carries a weapon wheel, a dash, lock-on,
// rocket boots, a charged rifle, missiles and six unlockable abilities, and
// until now a new pilot met all of it at once behind a keys list on the title
// card. This gates the first kaiju behind three things you have to actually
// do, narrated by the two voices already on the channel in chapter one —
// Hinata does not join until chapter two, so she cannot be the teacher.
//
// Pure state machine: game.ts feeds it a snapshot each frame and reacts to
// what comes back. It never touches the world itself.

import { AYA, KUROSAWA, type Line } from './story';

export interface TutorialSnapshot {
  /** Metres travelled on the ground since the run began. */
  walked: number;
  /** Height above whatever the pilot is standing over. */
  altitude: number;
  /** Blocks the player has personally wrecked. */
  wrecked: number;
  /** True while the boots are burning. */
  flying: boolean;
}

export interface TutorialStep {
  id: string;
  /** Shown on the objective line for the whole step. */
  objective: string;
  /** Fired over comms when the step begins. */
  say: Line[];
  /** Toast headline and subtitle when the step is cleared. */
  cleared: [string, string];
  /** Reads the snapshot the step started from and the current one. */
  done: (from: TutorialSnapshot, now: TutorialSnapshot) => boolean;
  /**
   * Seconds before a nudge is repeated for a pilot who is not moving. A
   * tutorial that says something once and then goes quiet is how players get
   * stuck without knowing what they are stuck on.
   */
  nudge?: Line;
}

/** Distances are deliberately short — this is orientation, not a fetch quest. */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'move',
    objective: 'Get moving — walk clear of the launch deck',
    say: [
      { who: AYA, text: 'Kuroki, the frame is live. Walk it. I need to see the legs answer before you go anywhere near the water.' },
      { who: KUROSAWA, text: 'Left stick, or the arrow keys — it does not care which. Hold the boost to run.' },
    ],
    cleared: ['LOCOMOTION NOMINAL', 'The legs answer. Kurosawa is delighted.'],
    done: (from, now) => now.walked - from.walked >= 60,
    nudge: { who: AYA, text: 'Kuroki. Move the suit. Any direction.' },
  },
  {
    id: 'strike',
    objective: 'Cut something — test the saber on the condemned block',
    say: [
      { who: KUROSAWA, text: 'Now the arm. There is a condemned block right in front of you — the ward cleared it out this morning. Take it down.' },
      { who: AYA, text: 'It is empty, Kuroki. Nobody is in it. Swing.' },
    ],
    cleared: ['WEAPON HOT', 'The beam saber cuts anything the city is made of.'],
    done: (from, now) => now.wrecked - from.wrecked >= 45,
    nudge: { who: KUROSAWA, text: 'The saber. Attack while you are stood against it — it will come apart.' },
  },
  {
    id: 'fly',
    objective: 'Get airborne — hold jump to burn the rocket boots',
    say: [
      { who: KUROSAWA, text: 'Last thing. The boots. Hold the jump — do not tap it, hold it — and the frame will climb.' },
      { who: AYA, text: 'You will need the height. The things coming through the bay do not stay on the ground.' },
    ],
    cleared: ['BOOTS NOMINAL', 'Altitude is the whole fight. Use it.'],
    done: (_from, now) => now.altitude >= 34,
    nudge: { who: KUROSAWA, text: 'Hold the jump down, Kuroki. It is a throttle, not a button.' },
  },
];

export const TUTORIAL_CLEARED: Line[] = [
  { who: AYA, text: 'That is the check done. Kuroki — sonar just lit up under the bay.' },
  { who: KUROSAWA, text: 'It is big. It is very big. I am so sorry.' },
  { who: AYA, text: 'Go. Everything you just did, you are about to need all of it.' },
];

export class Tutorial {
  private index = 0;
  private from: TutorialSnapshot | null = null;
  private stepT = 0;
  private nudged = 0;
  complete = false;
  /** Set on the frame a step is cleared, for game.ts to toast and clear. */
  justCleared: [string, string] | null = null;
  /** Lines to speak this frame, if any. */
  pending: Line[] | null = null;

  get step(): TutorialStep | null {
    return this.complete ? null : TUTORIAL_STEPS[this.index] ?? null;
  }

  update(dt: number, now: TutorialSnapshot): void {
    this.justCleared = null;
    this.pending = null;
    if (this.complete) return;
    const step = TUTORIAL_STEPS[this.index];
    if (!step) { this.complete = true; this.pending = TUTORIAL_CLEARED; return; }

    if (this.from === null) {
      // first frame of the step: snapshot the baseline and brief it
      this.from = { ...now };
      this.stepT = 0;
      this.nudged = 0;
      this.pending = step.say;
      return;
    }

    this.stepT += dt;
    if (step.done(this.from, now)) {
      this.justCleared = step.cleared;
      this.index++;
      this.from = null;
      if (this.index >= TUTORIAL_STEPS.length) {
        this.complete = true;
        this.pending = TUTORIAL_CLEARED;
      }
      return;
    }

    // A stuck pilot gets told again, twice, then left alone.
    if (this.nudged < 2 && this.stepT > 18 + this.nudged * 22 && step.nudge) {
      this.nudged++;
      this.pending = [step.nudge];
    }
  }
}
