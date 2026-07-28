// The campaign script — radio traffic between the pilot and Command, played
// while you fight. Pure data; game.ts only decides when to fire a beat.
//
// Voices:
//   KUROKI    — brash, cocky, allergic to sincerity. Deflects with a joke,
//               then quietly asks whether the shelters are clear.
//   AYA       — his handler. Furious with him roughly every four minutes,
//               mostly because she cannot stand the thought of losing him.
//   KUROSAWA  — built the suit. Dry, delighted by data, hopeless at comfort.

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
export const REI = 'REI · MEMORIAL'; // Aya's late brother; heard only in archived recordings
export const HINATA = 'HINATA · PILOT'; // second unit, joins mid-campaign
export const KOTETSU = 'KOTETSU · SUPPORT'; // mechanic and mission-control ally

/** Chapter index (0-based) that Hinata's second unit first drops into the fight. */
export const HINATA_CHAPTER = 3;

export const PROLOGUE: Line[] = [
  { who: AYA, text: 'Kuroki, are you even listening? The bay tore open fourteen hours ago.' },
  { who: KUROKI, text: 'Heard you the first time. Big hole, big monsters, big hero. Got it.' },
  { who: AYA, text: 'Every defence line we had is GONE. This is not a joke!' },
  { who: KUROSAWA, text: 'The suit is a prototype. Untested. Please bring it back in one piece.' },
  { who: KUROKI, text: 'No promises on the suit. …The shelters. They full?' },
  { who: AYA, text: '…They are full.' },
  { who: AYA, text: 'Kuroki. This is not the last one. Do you understand me? Not again.' },
  { who: KUROKI, text: 'Then nothing gets past me. Launching.' },
];

export const CHAPTERS: Chapter[] = [
  {
    no: 1,
    title: 'FIRST CONTACT',
    brief: [
      { who: AYA, text: 'Contact in the eastern wards — it is tearing the district apart!' },
      { who: KUROKI, text: 'Finally. Thought I got dressed up for nothing.' },
      { who: AYA, text: 'Kuroki, I swear— just get between it and the shelters!' },
    ],
    debrief: [
      { who: KUROKI, text: 'One down. Did everyone see that, or should I go slower?' },
      { who: AYA, text: 'You took a hit you did NOT need to take, showing off like that.' },
      { who: KUROSAWA, text: 'The carcass is venting plasma. I can route it into your rifle.' },
      { who: AYA, text: '…Good work. Do not let it go to your head.' },
      { who: KUROKI, text: 'Too late.' },
    ],
  },
  {
    no: 2,
    title: 'THE SKY OPENS',
    brief: [
      { who: AYA, text: 'Airborne contact. It has circled since dawn — it was WAITING.' },
      { who: KUROKI, text: 'Patient. I respect that. Does not change how this ends.' },
      { who: AYA, text: 'You cannot outrun it on the ground. Please, for once, be careful.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'Thrust core intact! Bolt it to your boots and you will fly properly.' },
      { who: KUROKI, text: 'You are telling me I did all that WITHOUT proper boots?' },
      { who: AYA, text: 'They are not attacking at random. They are pushing inland. Together.' },
      { who: KUROKI, text: '…Yeah. I noticed that too.' },
    ],
  },
  {
    no: 3,
    title: 'BENEATH THE STREETS',
    brief: [
      { who: KUROSAWA, text: 'Seismic readings all down the subway line. It is underneath you.' },
      { who: KUROKI, text: 'Under me. Perfect. My favourite place for a two-hundred-tonne snake.' },
      { who: AYA, text: 'It lights up before it strikes. Watch for it. WATCH for it, Kuroki.' },
    ],
    debrief: [
      { who: KUROKI, text: 'Told you I would watch for it.' },
      { who: AYA, text: 'You watched for NONE of it! I have the damage readout right here!' },
      { who: AYA, text: '…That last turn. Where did you learn that?' },
      { who: KUROKI, text: 'You know exactly where.' },
      { who: KUROSAWA, text: 'I can weaponise the discharge. Call it a nova pulse.' },
      { who: KUROSAWA, text: 'Kuroki… its spine had a seam. A machined seam.' },
      { who: KUROKI, text: 'Say that again.' },
    ],
  },
  {
    no: 4,
    title: 'THE MACHINE IN THE MONSTER',
    brief: [
      { who: AYA, text: 'This one is walking straight up the boulevard. No stealth. No fear.' },
      { who: KUROKI, text: 'Something we have in common.' },
      { who: AYA, text: 'It has plating we cannot identify. And you are not going alone.' },
      { who: KUROKI, text: 'I work alone. You know I work alone.' },
      { who: AYA, text: 'Not any more. Kurosawa finished the second frame this morning.' },
      { who: KOTETSU, text: 'Second frame checks green. Hinata is eager. The frame is less eager.' },
      { who: HINATA, text: 'HINATA, dropping in! Hi! Oh wow, you are TALLER than the file said.' },
      { who: KUROKI, text: '…Aya. Who is this.' },
      { who: HINATA, text: 'Hinata! I am your wingman! Please look after me, senpai!' },
      { who: KUROKI, text: 'Do not call me that.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'It is not armour. It is fabrication. These things are being BUILT.' },
      { who: KUROKI, text: 'Then somebody is aiming them. At us. On purpose.' },
      { who: AYA, text: 'Built by WHO? Kurosawa, tell me you have something—' },
      { who: KUROSAWA, text: 'I have nothing. Salvage the plating. We will need it.' },
      { who: HINATA, text: 'I blocked four hits for you. Just so it is on the record.' },
      { who: KUROKI, text: 'Nobody asked you to.' },
      { who: AYA, text: 'Nobody ever has to ask her. That is rather the point.' },
    ],
  },
  {
    no: 5,
    title: 'WHAT CIRCLES ABOVE',
    brief: [
      { who: KUROSAWA, text: 'It has been mapping us. Flight paths in a perfect survey grid.' },
      { who: AYA, text: 'It is scouting. Something is using it to look at our city.' },
      { who: KUROKI, text: 'Then let us give it something to look at.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'Its spine houses a rail accelerator. That is yours now.' },
      { who: AYA, text: 'Its logs point back to the bay. All of them. To the rift.' },
      { who: KUROKI, text: 'So that is where this ends. Good. I hate loose ends.' },
      { who: AYA, text: 'You hate PAPERWORK. Which you still owe me, by the way.' },
    ],
  },
  {
    no: 6,
    title: 'BLADE AND BONE',
    brief: [
      { who: AYA, text: 'Fast mover closing on the old quarter — do not let it flank you!' },
      { who: KUROKI, text: 'Relax. Nothing out here is faster than me.' },
      { who: AYA, text: 'It hunts like it was TAUGHT to. Stop grinning and focus.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'That scythe alloy holds an edge better than anything we make. Take both.' },
      { who: KUROKI, text: 'Two swords. Now we are talking.' },
      { who: AYA, text: 'Casualty reports are dropping. People are starting to believe again.' },
      { who: AYA, text: 'They are painting your suit on the shelter walls. Do not tell him, doctor.' },
      { who: KUROKI, text: 'Too late. Heard it. I am going to be unbearable now.' },
      { who: AYA, text: 'They painted my brother up there too. Years ago. It is still there.' },
      { who: KUROKI, text: '…I know. I walk past it every morning.' },
    ],
  },
  {
    no: 7,
    title: 'THE GROUND BREAKS',
    brief: [
      { who: KUROSAWA, text: 'Magma surge under the western hills. It is coming up through the rock.' },
      { who: AYA, text: 'If it lands a slam it will BURY you. Do you understand me?' },
      { who: KUROKI, text: 'Loud and clear. You worry too much.' },
      { who: HINATA, text: 'She worries the correct amount, senpai.' },
      { who: AYA, text: 'Thank you, Hinata.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'I can push that shockwave through your legs. Do not stand near anything.' },
      { who: HINATA, text: 'Senpai, you took eleven hits I could have blocked. I counted!' },
      { who: KUROKI, text: 'Nobody asked you to count.' },
      { who: AYA, text: 'Your integrity dropped to nine percent out there. NINE, Kuroki.' },
      { who: KUROKI, text: 'Nine is still a number.' },
      { who: AYA, text: '…The rift is widening. Whatever is sending them is out of patience.' },
    ],
  },
  {
    no: 8,
    title: 'FROM BELOW',
    brief: [
      { who: AYA, text: 'It burrows. No visual, no warning — then it is on top of you.' },
      { who: HINATA, text: 'I will watch the ground! If it moves under you I will shout!' },
      { who: KUROKI, text: 'Stay behind me.' },
      { who: HINATA, text: 'Nope!' },
      { who: AYA, text: 'Keep moving. Kuroki. Please. Keep moving.' },
      { who: KUROKI, text: '…You never say please.' },
      { who: AYA, text: 'I said it once before. On a comm channel exactly like this one.' },
      { who: AYA, text: 'So humour me.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'Head repeaters recovered. Small calibre, very fast. You will like them.' },
      { who: KUROSAWA, text: 'I decoded part of its control signal. Kuroki — it is a countdown.' },
      { who: KUROKI, text: 'To what?' },
      { who: KUROSAWA, text: 'I do not know. But it is nearly finished.' },
    ],
  },
  {
    no: 9,
    title: 'THE CITY BURNS',
    brief: [
      { who: KUROSAWA, text: 'The countdown ended. THIS is what it was waiting for.' },
      { who: AYA, text: 'It is torching the wards faster than we can evacuate them!' },
      { who: KUROKI, text: 'How many are still down there?' },
      { who: AYA, text: 'Too many. GO!' },
      { who: HINATA, text: 'I will take the east wards! You take the fire!' },
      { who: KUROKI, text: 'Hinata — do not plant yourself in front of it. It is not worth—' },
      { who: HINATA, text: 'That is literally what the shield is for, senpai!' },
    ],
    debrief: [
      { who: KUROKI, text: 'Hinata. Report.' },
      { who: HINATA, text: '…Shield is slag and I cannot feel my left arm. But I am here!' },
      { who: KUROKI, text: '…Good.' },
      { who: HINATA, text: 'Was that concern? Aya, was that concern?' },
      { who: AYA, text: 'That was absolutely concern.' },
      { who: KUROKI, text: 'How many did we lose.' },
      { who: AYA, text: 'Kuroki—' },
      { who: KUROKI, text: 'How many, Aya.' },
      { who: AYA, text: '…Three districts. But thousands got out. Because you held the line.' },
      { who: KUROSAWA, text: 'Take its igniter. And — the rift is fully open. One signature left.' },
    ],
  },
  {
    no: 10,
    title: 'WHAT CAME THROUGH FIRST',
    brief: [
      { who: KUROSAWA, text: 'This is the one that opened the bay. Everything else was an escort.' },
      { who: AYA, text: 'If it reaches the mainland there is nothing after it. Nothing, Kuroki.' },
      { who: KUROKI, text: 'Then it does not reach the mainland.' },
      { who: HINATA, text: 'Senpai. I am on your wing. Say it properly this time.' },
      { who: KUROKI, text: '…Hinata. On my wing. Match my turns and do not fall behind.' },
      { who: HINATA, text: 'YES! Aya, he said it!' },
      { who: AYA, text: 'I heard. …Kuroki. Come back. That is an order.' },
      { who: KUROKI, text: 'You have never once made me follow one of those.' },
      { who: AYA, text: 'Then do it for me. I have buried one pilot I loved. I am not burying two.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'The rift is collapsing! You did it — you actually did it!' },
      { who: AYA, text: 'Kuroki? Kuroki, answer me. ANSWER ME.' },
      { who: KUROKI, text: '…Still here. Suit is a write-off though. Sorry, doc.' },
      { who: AYA, text: 'You absolute IDIOT. I thought— …I thought we lost you.' },
      { who: KUROKI, text: 'Not this time. I kept talking. Like you asked.' },
      { who: AYA, text: '…You did. You kept talking the whole way down.' },
      { who: HINATA, text: 'And I caught him! Tell them I caught him!' },
      { who: KUROKI, text: 'She caught me.' },
    ],
  },
];

export const EPILOGUE: Line[] = [
  { who: KUROSAWA, text: 'The tear is sealed — but the seam never fully closed.' },
  { who: KUROSAWA, text: 'Smaller fractures are opening across the districts. They will keep coming.' },
  { who: AYA, text: 'Then we keep flying. …And you keep coming back. Every time.' },
  { who: KUROKI, text: 'That is the arrangement.' },
  { who: AYA, text: 'That is the arrangement. Call it in when you see one.' },
];

/** Endless-mode chatter once the campaign is finished. */
export const ENDLESS_LINES: Line[] = [
  { who: AYA, text: 'Another fracture, another contact. You know the drill by now.' },
  { who: KUROSAWA, text: 'Signature matches an earlier specimen. Stronger, though. Much stronger.' },
  { who: AYA, text: 'Shelters are holding. Go buy them a little more time.' },
  { who: KUROKI, text: 'Same city. Same me. Should be over quickly.' },
  { who: AYA, text: 'One of these days that mouth is going to get you killed.' },
  { who: KUROSAWA, text: 'Every one you put down slows the spread. Keep going.' },
];

// ---------------------------------------------------------------- reactions
// Short reactive lines fired off what the player actually does, so Command
// feels like it is watching the fight rather than reading from a script.

export const BARKS: Record<string, Line[]> = {
  // Aya's least favourite thing about her favourite pilot
  cityDamage: [
    { who: AYA, text: 'HEY! Stop that! You are destroying the city!' },
    { who: AYA, text: 'KUROKI! That was a residential block!' },
    { who: AYA, text: 'Do you have ANY idea how long that took to build?!' },
    { who: AYA, text: 'We are DEFENDING Neo Tokyo. Defending! Say it with me!' },
    { who: KUROKI, text: 'It was in my way.' },
    { who: AYA, text: 'Everything is in your way!' },
  ],
  heavyDestruction: [
    { who: AYA, text: 'You are levelling the district faster than the kaiju is!' },
    { who: AYA, text: 'I genuinely cannot tell which one of you I am supposed to be tracking!' },
    { who: KUROSAWA, text: 'For the record, I am logging all of this.' },
    { who: KUROKI, text: 'Log it under "necessary".' },
    { who: AYA, text: 'I am logging it under KUROKI!' },
  ],
  buildingDown: [
    { who: AYA, text: 'That entire building just came down! Was that you?!' },
    { who: KUROKI, text: 'Structurally it was already unwell.' },
    { who: AYA, text: 'It was FINE until you leaned on it!' },
    { who: KUROSAWA, text: 'Collapse logged. The reconstruction office has stopped replying to me.' },
  ],
  planeDown: [
    { who: AYA, text: 'THAT WAS A PASSENGER FLIGHT! Watch your fire!' },
    { who: KUROKI, text: '…That one is on me.' },
    { who: AYA, text: 'Yes it is! Check your targets!' },
  ],
  lowHealth: [
    { who: AYA, text: 'Your integrity is critical — break off! BREAK OFF!' },
    { who: AYA, text: 'Kuroki, you are one hit from gone. Please. Fall back.' },
    { who: KUROKI, text: 'I have been worse.' },
    { who: AYA, text: 'You have NOT been worse!' },
    { who: KUROSAWA, text: 'The frame will not survive another impact. I am begging you.' },
  ],
  repaired: [
    { who: KUROSAWA, text: 'Good — that salvage is patching the frame nicely.' },
    { who: AYA, text: 'Integrity climbing. …Thank you for actually listening for once.' },
    { who: KUROKI, text: 'Do not get used to it.' },
  ],
  died: [
    { who: AYA, text: 'KUROKI! …Answer me. Answer me right now.' },
    { who: KUROKI, text: '…Still here. Mostly.' },
    { who: AYA, text: 'Do not EVER do that again!' },
    { who: AYA, text: 'I have sat through one silent channel already. I am not doing a second.' },
    { who: KUROSAWA, text: 'Emergency reconstruction complete. Half integrity — all I could manage.' },
  ],
  bigCombo: [
    { who: AYA, text: 'The whole command deck just went quiet watching you.' },
    { who: KUROKI, text: 'They should. I am magnificent.' },
    { who: AYA, text: 'And there it is. Ruined it.' },
    { who: KUROSAWA, text: 'You are performing beyond the suit rated limits. Please continue.' },
  ],
  weakPoint: [
    { who: KUROSAWA, text: 'Direct hit on the core! That is the weak point!' },
    { who: AYA, text: 'Its readings just fell off a cliff — keep hitting that spot!' },
    { who: KUROKI, text: 'Already ahead of you.' },
  ],
  bossHurt: [
    { who: AYA, text: 'It is faltering — finish it!' },
    { who: KUROKI, text: 'Say please.' },
    { who: AYA, text: 'FINISH IT!' },
  ],
  bossFar: [
    { who: AYA, text: 'Target is a long way out. Follow the marker, I will keep it lit.' },
    { who: KUROKI, text: 'You always know where I am going.' },
    { who: AYA, text: 'Someone has to. You certainly never do.' },
  ],
  droneSwarm: [
    { who: AYA, text: 'Multiple contacts converging — watch your back!' },
    { who: KUROSAWA, text: 'They are herding you. Do not let them box you in.' },
    { who: KUROKI, text: 'Let them come. Saves me the walk.' },
  ],
  hinataBanter: [
    { who: HINATA, text: 'Senpai! Look! I got one! Did you see it?' },
    { who: KUROKI, text: 'I saw it.' },
    { who: HINATA, text: 'You did not even turn around!' },
    { who: HINATA, text: 'I am keeping score, senpai. You are only four ahead.' },
    { who: KUROKI, text: 'I am eleven ahead.' },
    { who: HINATA, text: 'Four! I am counting the drones!' },
    { who: HINATA, text: 'Left side is clear, I am holding it. Go be dramatic somewhere else.' },
    { who: AYA, text: 'She is a better wingman than you deserve, Kuroki.' },
    { who: KUROKI, text: '…I know.' },
  ],
  hinataWorried: [
    { who: HINATA, text: 'Senpai, your armour is really low. Get behind the shield. GET BEHIND IT.' },
    { who: HINATA, text: 'I can take the hits! That is the whole point of me!' },
    { who: KUROKI, text: 'Not for you. Never for me.' },
    { who: HINATA, text: 'That is not how wingmen work!' },
  ],
  shelterAttacked: [
    { who: AYA, text: 'It is on a SHELTER, Kuroki! There are people under that!' },
    { who: AYA, text: 'Get it off the ward! Get it off RIGHT NOW!' },
    { who: HINATA, text: 'Senpai, it is standing on the shelter! Go, I will cover the drones!' },
    { who: KUROKI, text: 'I see it. Moving.' },
  ],
  shelterCritical: [
    { who: AYA, text: 'The shelter is caving in! KUROKI!' },
    { who: AYA, text: 'They cannot evacuate in time — you are the evacuation!' },
    { who: HINATA, text: 'It is going to break! SENPAI!' },
  ],
  shelterLost: [
    { who: AYA, text: '…The ward is gone. Kuroki. It is gone.' },
    { who: KUROKI, text: 'How many.' },
    { who: AYA, text: 'Do not ask me that. Please do not ask me that.' },
  ],
  idle: [
    { who: AYA, text: 'Sensors are quiet. Check your armour while you can.' },
    { who: AYA, text: 'The shelters keep asking about you. I keep telling them you are fine.' },
    { who: KUROKI, text: 'Am I fine?' },
    { who: AYA, text: 'No. But they do not need to know that.' },
    { who: KUROSAWA, text: 'Reactor is steady. Whatever you are doing, keep doing it.' },
    { who: AYA, text: 'It is strange, seeing the city this still.' },
    { who: KUROKI, text: '…It is worth keeping. The city. That is all I meant.' },
    { who: AYA, text: 'I know what you meant, Kuroki.' },
  ],
};

// ----------------------------------------------------------- monster gossip
// Aya cannot help editorialising about whatever is currently wrecking her
// city. Fired at intervals while a given kaiju is alive, keyed by its name.

export const MONSTER_BARKS: Record<string, Line[]> = {
  GORGOSAUR: [
    { who: AYA, text: 'Please do not let that thing near my apartment block! Quickly, Kuroki, beat it!' },
    { who: AYA, text: 'It just ate a bus shelter. An entire bus shelter. Why?' },
    { who: KUROKI, text: 'Roughage.' },
    { who: AYA, text: 'Look at the SIZE of those teeth. How is that even structurally possible?' },
    { who: KUROSAWA, text: 'Jaw pressure is off my scale. Do not let it close on you.' },
  ],
  'MISSILE MAW': [
    { who: AYA, text: 'It fires without aiming. It does not even LOOK. Who builds that?' },
    { who: KUROKI, text: 'Someone who does not pay for the ammunition.' },
    { who: AYA, text: 'Two more volleys inbound — Kuroki, MOVE!' },
    { who: KUROSAWA, text: 'Fascinating reload cycle. Terrible for everyone underneath it.' },
  ],
  'VOLT SERPENT': [
    { who: AYA, text: 'Yuck. That worm is far too slimy for my liking.' },
    { who: KUROKI, text: 'You are describing it like a menu item.' },
    { who: AYA, text: 'It is dripping on the ROAD, Kuroki! Someone has to clean that!' },
    { who: AYA, text: 'It went under again — I hate it when it does that. I HATE it.' },
  ],
  'IRON COLOSSUS': [
    { who: AYA, text: 'Every step it takes registers on the seismographs. Every single one.' },
    { who: KUROKI, text: 'Big and slow. My favourite combination.' },
    { who: AYA, text: 'It is slow until it is NOT. Stop standing in front of it!' },
    { who: KUROSAWA, text: 'The plating is bolted. Bolted! Somebody assembled this by hand.' },
  ],
  'SKY REAVER': [
    { who: AYA, text: 'It keeps circling my sector like it is choosing a table.' },
    { who: KUROKI, text: 'Tell it the kitchen is closed.' },
    { who: AYA, text: 'Incoming dive — pull up, PULL UP!' },
    { who: AYA, text: 'I do not like things that watch you before they attack.' },
  ],
  'CRIMSON MANTIS': [
    { who: AYA, text: 'Oh, I hate this one. Look at those arms. Look at them!' },
    { who: KUROKI, text: 'You said that about the worm too.' },
    { who: AYA, text: 'The worm was slimy! This one is POINTY! Different problems!' },
    { who: KUROSAWA, text: 'Its reflexes exceed yours by a comfortable margin. Sorry.' },
  ],
  'MAGMA GOLEM': [
    { who: AYA, text: 'It is melting the tram lines. The tram lines, Kuroki!' },
    { who: KUROKI, text: 'I will buy the city new trams.' },
    { who: AYA, text: 'With WHAT? You do not even do your paperwork!' },
    { who: KUROSAWA, text: 'Surface temperature is absurd. Do not touch it. Obviously.' },
  ],
  'DEEP MAW': [
    { who: AYA, text: 'I lost it on sensors again. I hate that. Keep moving, please keep moving.' },
    { who: KUROKI, text: 'Relax. I can feel it coming.' },
    { who: AYA, text: 'You CANNOT feel it coming, you are guessing!' },
    { who: AYA, text: 'Tremors under the eastern blocks — it is surfacing, brace!' },
  ],
  'CINDER WYRM': [
    { who: AYA, text: 'It is burning the market district. That is where I get my lunch!' },
    { who: KUROKI, text: 'Priorities, Aya.' },
    { who: AYA, text: 'THAT IS A PRIORITY!' },
    { who: AYA, text: 'Fire crews cannot get within two blocks of it. Put it out. Please.' },
  ],
  'TIDE LEVIATHAN': [
    { who: AYA, text: 'The whole bay is rising with it. It is dragging the sea inland.' },
    { who: KUROSAWA, text: 'Displacement readings like nothing on record. This is the source.' },
    { who: AYA, text: 'Kuroki, this is the one. Whatever you have left, use it now.' },
    { who: KUROKI, text: 'I always have something left.' },
  ],
};

// ------------------------------------------------------------- shared past
// Their history, released a fragment at a time during lulls in the fighting.
// Read in order it explains both of them: why he flies like he does not care
// whether he comes back, and why she cannot stand it when his signal drops.

export const MEMORIES: Line[][] = [
  [
    { who: AYA, text: 'You know you still fly exactly like you did in training.' },
    { who: KUROKI, text: 'Brilliantly?' },
    { who: AYA, text: 'Recklessly. I wrote it in every single report I filed on you.' },
    { who: KUROKI, text: 'And they promoted me anyway. Devastating for you, that.' },
  ],
  [
    { who: AYA, text: 'I outranked you, you know. Before all this.' },
    { who: KUROKI, text: 'You outflew me too. Once.' },
    { who: AYA, text: 'Twice.' },
    { who: KUROKI, text: '…Twice.' },
  ],
  [
    { who: KUROSAWA, text: 'Aya was in the seat before you, Kuroki. Did you know that?' },
    { who: AYA, text: 'Doctor.' },
    { who: KUROSAWA, text: 'Best reflex scores the programme ever recorded. It is in the file.' },
    { who: AYA, text: 'Doctor. Drop it.' },
  ],
  [
    { who: KUROKI, text: 'Do you ever miss it? Flying.' },
    { who: AYA, text: 'Every day.' },
    { who: KUROKI, text: 'Then why the command chair?' },
    { who: AYA, text: 'Because somebody has to be on the other end of the radio.' },
    { who: AYA, text: 'Nobody was on Rei\'s. Not really. Not in time.' },
  ],
  [
    { who: AYA, text: 'Rei used to fly the pattern you just pulled. Almost exactly.' },
    { who: KUROKI, text: 'I know. He taught it to me.' },
    { who: AYA, text: '…He taught it to me first. He taught me everything first.' },
    { who: KUROKI, text: 'He would. Older brothers are like that.' },
  ],
  [
    { who: KUROKI, text: 'You never ask about that day.' },
    { who: AYA, text: 'I was on comms that day, Kuroki. I do not need to ask.' },
    { who: AYA, text: 'I heard my brother go quiet. I do not need anybody to describe it to me.' },
  ],
  [
    { who: KUROKI, text: 'I was lead. I called the turn. He followed it.' },
    { who: AYA, text: 'I know exactly what you called. I was listening.' },
    { who: KUROKI, text: 'Then say it. Whatever it is you have not said for three years.' },
    { who: AYA, text: '…That I do not blame you. And that some mornings I do anyway.' },
    { who: AYA, text: 'Both of those are true. I have stopped trying to fix it.' },
  ],
  [
    { who: AYA, text: 'You think I shout because you break things.' },
    { who: KUROKI, text: 'I break a LOT of things.' },
    { who: AYA, text: 'I shout because the last time a signal went quiet on me it was my brother, and it stayed quiet.' },
    { who: KUROKI, text: '…' },
    { who: AYA, text: 'So keep talking out there. That is all I am asking.' },
  ],
  [
    { who: KUROKI, text: 'Aya. If this one goes badly—' },
    { who: AYA, text: 'No.' },
    { who: KUROKI, text: 'I am only saying—' },
    { who: AYA, text: 'I said NO. You come back. You always come back. That is the arrangement.' },
    { who: KUROKI, text: '…Understood, Commander.' },
  ],
  [
    { who: AYA, text: 'When this is over I am putting you back in front of a review board.' },
    { who: KUROKI, text: 'For what?' },
    { who: AYA, text: 'Everything! Pick anything from the last month!' },
    { who: AYA, text: '…And then I am buying you a drink. Do not read into that.' },
    { who: KUROKI, text: 'Reading into it heavily.' },
  ],
];

/** Later fragments — these only make sense once KOTETSU has joined. */
export const LATE_MEMORIES: Line[][] = [
  [
    { who: HINATA, text: 'Aya says you flew with someone before me.' },
    { who: KUROKI, text: 'Aya talks too much.' },
    { who: HINATA, text: 'She said he was better than you. She smiled when she said it.' },
    { who: KUROKI, text: '…He was her brother. Of course she smiled.' },
  ],
  [
    { who: HINATA, text: 'Senpai, why do you always put yourself between me and it?' },
    { who: KUROKI, text: 'Habit.' },
    { who: AYA, text: 'It is not habit.' },
    { who: KUROKI, text: 'Aya.' },
    { who: AYA, text: '…It is not habit, Hinata.' },
  ],
  [
    { who: HINATA, text: 'I read the report from three years ago. The whole thing.' },
    { who: KUROKI, text: 'Then you know I called the turn. And whose brother followed it.' },
    { who: HINATA, text: 'I know he followed it because he trusted you. Those are different sentences.' },
    { who: KUROKI, text: '…' },
    { who: HINATA, text: 'I am going to keep following them too, by the way. Just so you know.' },
  ],
];
