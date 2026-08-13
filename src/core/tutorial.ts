// First-run onboarding. The suit carries a weapon wheel, a dash, lock-on,
// lift jets, a charged rifle and several unlockable abilities, and until now
// a new pilot met all of it at once behind a keys list on the title card.
// This gates the first kaiju behind the two things that are not discoverable
// on their own — that the saber cuts the city, and that jump is a throttle —
// narrated by the two voices already on the channel in chapter one. Hinata
// does not join until chapter two, so she cannot be the teacher.
//
// Pure state machine: game.ts feeds it a snapshot each frame and reacts to
// what comes back. It never touches the world itself.

import { AYA, KUROSAWA, type Line } from './story';

export interface TutorialSnapshot {
  /** Height above whatever the pilot is standing over. */
  altitude: number;
  /** Blocks the player has personally wrecked. */
  wrecked: number;
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

/**
 * Two beats, not three. Walking is the one thing nobody needs taught — a
 * player who has reached the deploy button will move — so the check that
 * mattered least came out, and each remaining step briefs in a single line.
 */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'strike',
    objective: 'Cut the marked block — hold A or click',
    say: [
      { who: KUROSAWA, text: 'Frame is live. That block ahead is condemned and empty — put the saber through it.' },
    ],
    cleared: ['WEAPON HOT', 'The saber cuts anything the city is made of.'],
    done: (from, now) => now.wrecked - from.wrecked >= 30,
    nudge: { who: KUROSAWA, text: 'Stand against it and attack, Kuroki. It will come apart.' },
  },
  {
    id: 'fly',
    objective: 'Get airborne — hold jump to climb',
    say: [
      { who: AYA, text: 'Now get off the ground. Hold the jump — hold it, do not tap — and stay up. The things coming through the bay do not stay down here.' },
    ],
    cleared: ['LIFT JETS NOMINAL', 'Altitude is the whole fight. Use it.'],
    done: (_from, now) => now.altitude >= 26,
    nudge: { who: AYA, text: 'Hold the jump down. It is a throttle, not a button.' },
  },
];

export const TUTORIAL_CLEARED: Line[] = [
  { who: AYA, text: 'Check done. Kuroki — sonar just lit up under the bay.' },
  { who: KUROSAWA, text: 'It is big. I am so sorry.' },
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
