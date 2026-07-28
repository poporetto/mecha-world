// The campaign script. Ten chapters, one per boss, delivered as radio traffic
// from Command while you fight. Kept as pure data so game.ts only has to fire
// the right beat at the right moment.

export interface Line {
  who: string;
  text: string;
}

export interface Chapter {
  no: number;
  title: string;
  /** Played when the kaiju appears. */
  brief: Line[];
  /** Played once it goes down. */
  debrief: Line[];
}

export const AYA = 'AYA · COMMAND';
export const KUROSAWA = 'DR. KUROSAWA';
export const KUROKI = 'KUROKI'; // the pilot — you

export const PROLOGUE: Line[] = [
  { who: AYA, text: 'Kuroki — fourteen hours ago the bay split open. Something came through.' },
  { who: AYA, text: 'Every defence line we had is gone. You are what is left.' },
  { who: KUROSAWA, text: 'The unit is a prototype. Untested. I am sorry — there was no time.' },
  { who: KUROKI, text: 'It will hold. It has to.' },
  { who: AYA, text: 'Neo Tokyo is still full of people. Keep it standing.' },
];

export const CHAPTERS: Chapter[] = [
  {
    no: 1,
    title: 'FIRST CONTACT',
    brief: [
      { who: AYA, text: 'Contact in the eastern wards. It is tearing through the district.' },
      { who: AYA, text: 'Designation GORGOSAUR. Get close and do not let it reach the shelters.' },
      { who: KUROKI, text: 'Understood. Moving in.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'The carcass is venting plasma. I can route that into your rifle.' },
      { who: AYA, text: 'One down. Command is calling it a miracle. I am calling it a start.' },
    ],
  },
  {
    no: 2,
    title: 'THE SKY OPENS',
    brief: [
      { who: AYA, text: 'Airborne signature. It has been circling since dawn — waiting.' },
      { who: AYA, text: 'MISSILE MAW. You cannot out-run it on the ground.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'Its thrust core is intact. Bolt it to your boots and you will fly properly.' },
      { who: AYA, text: 'They are not attacking at random. They are pushing inland. Together.' },
    ],
  },
  {
    no: 3,
    title: 'BENEATH THE STREETS',
    brief: [
      { who: KUROSAWA, text: 'Seismic readings all along the subway line. Something is under you.' },
      { who: AYA, text: 'VOLT SERPENT. Watch the strikes — it lights up before it hits.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'I can weaponise the discharge. Call it a nova pulse.' },
      { who: KUROSAWA, text: 'Pilot… its spine had a seam. A machined seam.' },
    ],
  },
  {
    no: 4,
    title: 'THE MACHINE IN THE MONSTER',
    brief: [
      { who: AYA, text: 'This one is walking straight up the boulevard. No stealth. No fear.' },
      { who: AYA, text: 'IRON COLOSSUS. Armour plating we cannot identify.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'It is not armour. It is fabrication. These things are being BUILT.' },
      { who: KUROKI, text: 'Then somebody is aiming them at us.' },
      { who: AYA, text: 'Built by whom? …Salvage the plating. We will need it.' },
    ],
  },
  {
    no: 5,
    title: 'WHAT CIRCLES ABOVE',
    brief: [
      { who: KUROSAWA, text: 'It has been mapping us. Flight paths in a perfect survey grid.' },
      { who: AYA, text: 'SKY REAVER. It is scouting for something. Bring it down.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'Its spine houses a rail accelerator. That is yours now.' },
      { who: AYA, text: 'Its logs point back to the bay. To the rift.' },
    ],
  },
  {
    no: 6,
    title: 'BLADE AND BONE',
    brief: [
      { who: AYA, text: 'Fast mover, closing on the old quarter. Do not let it flank you.' },
      { who: AYA, text: 'CRIMSON MANTIS. It hunts like it was taught to.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'The scythe alloy holds an edge better than anything we make. Take both.' },
      { who: AYA, text: 'Casualty reports are dropping. People are starting to believe again.' },
    ],
  },
  {
    no: 7,
    title: 'THE GROUND BREAKS',
    brief: [
      { who: KUROSAWA, text: 'Magma surge under the western hills. It is coming up through the rock.' },
      { who: AYA, text: 'MAGMA GOLEM. Heavy, slow, and it will bury you if it lands a slam.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'I can replicate that shockwave through your legs. Try not to stand near anything.' },
      { who: AYA, text: 'The rift is widening. Whatever is sending them is running out of patience.' },
    ],
  },
  {
    no: 8,
    title: 'FROM BELOW',
    brief: [
      { who: AYA, text: 'It burrows. No visual, no warning — just tremors, then it is on top of you.' },
      { who: AYA, text: 'DEEP MAW. Keep moving. Please keep moving.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'Head-mounted repeaters recovered. Small calibre, very fast.' },
      { who: KUROSAWA, text: 'I have decoded a fragment of its control signal. It is a countdown.' },
    ],
  },
  {
    no: 9,
    title: 'THE CITY BURNS',
    brief: [
      { who: KUROSAWA, text: 'The countdown ended. This is what it was waiting for.' },
      { who: AYA, text: 'CINDER WYRM. It is torching the wards faster than we can evacuate.' },
    ],
    debrief: [
      { who: KUROKI, text: 'How many were still in those wards?' },
      { who: AYA, text: 'Fires are contained. Barely. We lost three districts.' },
      { who: KUROSAWA, text: 'Take its igniter. And pilot — the rift is opening fully. One signature left.' },
    ],
  },
  {
    no: 10,
    title: 'WHAT CAME THROUGH FIRST',
    brief: [
      { who: KUROSAWA, text: 'This is the one that opened the bay. Everything else was an escort.' },
      { who: AYA, text: 'TIDE LEVIATHAN. If it reaches the mainland there is nothing after it.' },
      { who: AYA, text: 'Kuroki… whatever happens out there. Thank you.' },
      { who: KUROKI, text: 'Save it for when I am back.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'The rift is collapsing. You did it. You actually did it.' },
      { who: AYA, text: 'Neo Tokyo is still standing. Because you kept it standing.' },
      { who: KUROKI, text: 'The city held. That is enough for today.' },
    ],
  },
];

export const EPILOGUE: Line[] = [
  { who: KUROSAWA, text: 'The tear is sealed — but the seam never fully closed.' },
  { who: KUROSAWA, text: 'Smaller fractures are opening across the districts. They will keep coming.' },
  { who: AYA, text: 'Then we keep flying. Stay sharp out there, Kuroki.' },
  { who: KUROKI, text: 'Same as always. Call it in when you see one.' },
];

/** Endless-mode chatter once the campaign is finished. */
export const ENDLESS_LINES: Line[] = [
  { who: AYA, text: 'Another fracture. Another contact. You know the drill.' },
  { who: KUROSAWA, text: 'Signature matches an earlier specimen. Stronger, though.' },
  { who: AYA, text: 'Shelters are holding. Go buy them some more time.' },
  { who: KUROSAWA, text: 'Every one you put down slows the spread. Keep going.' },
  { who: AYA, text: 'The city is watching you on every screen it has left.' },
];

// ---------------------------------------------------------------- reactions
// Short reactive lines. These fire off what the player actually does, so
// Command feels like it is watching the fight rather than reading a script.
// Keyed by event; the game picks one at random and rate-limits them.

export const BARKS: Record<string, Line[]> = {
  lowHealth: [
    { who: AYA, text: 'Kuroki, your integrity is critical. Break off and find salvage.' },
    { who: AYA, text: 'I am watching your armour readings drop. Please disengage.' },
    { who: KUROSAWA, text: 'The frame will not take another hit like that. Be careful.' },
  ],
  repaired: [
    { who: KUROSAWA, text: 'Good — that salvage is patching the frame nicely.' },
    { who: AYA, text: 'Integrity coming back up. That is a relief.' },
  ],
  died: [
    { who: AYA, text: 'We lost your signal, Kuroki. Do not do that to me again.' },
    { who: KUROKI, text: 'Still here. Give me a target.' },
    { who: KUROSAWA, text: 'Emergency reconstruction complete. Half integrity. It is all I could manage.' },
  ],
  bigCombo: [
    { who: AYA, text: 'Look at you, Kuroki. The whole command deck just went quiet.' },
    { who: AYA, text: 'That is the cleanest run of hits I have seen from anyone.' },
    { who: KUROSAWA, text: 'The suit is performing beyond spec. You are performing beyond spec.' },
  ],
  weakPoint: [
    { who: KUROSAWA, text: 'Direct hit on the core — that is where they are vulnerable.' },
    { who: AYA, text: 'Its readings just dropped through the floor. Keep hitting that spot.' },
  ],
  planeDown: [
    { who: AYA, text: 'That was a civilian airliner, Kuroki. Watch your fire.' },
    { who: KUROKI, text: '…That one is on me.' },
    { who: AYA, text: 'We had people on that aircraft. Please be careful up there.' },
  ],
  buildingDown: [
    { who: AYA, text: 'That block was evacuated — but try to leave the city something to rebuild.' },
    { who: KUROSAWA, text: 'Structural collapse logged. The insurers are going to hate you.' },
  ],
  heavyDestruction: [
    { who: AYA, text: 'You are levelling the district faster than the kaiju is.' },
    { who: AYA, text: 'Reminder that we are supposed to be defending Neo Tokyo.' },
  ],
  bossHurt: [
    { who: AYA, text: 'It is faltering. Finish it.' },
    { who: KUROSAWA, text: 'Vitals collapsing. One more push should do it.' },
  ],
  bossFar: [
    { who: AYA, text: 'Target is a long way out. Follow the marker — I will keep it lit for you.' },
    { who: KUROSAWA, text: 'It is heading away from the shelters, at least. Run it down.' },
  ],
  droneSwarm: [
    { who: AYA, text: 'Multiple small contacts converging on you. Watch your back.' },
    { who: KUROSAWA, text: 'The drones are herding you. Do not let them box you in.' },
  ],
  idle: [
    { who: AYA, text: 'Sensors are quiet. Use it — check your armour while you can.' },
    { who: AYA, text: 'The shelters are asking about you. I told them Kuroki is still out here.' },
    { who: KUROSAWA, text: 'Reactor is holding steady. Whatever you are doing, keep doing it.' },
    { who: AYA, text: 'It is strange, seeing the city this still.' },
  ],
};
