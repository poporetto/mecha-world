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
  /**
   * Act II only. Where the line has moved to, as a fraction of the way from
   * home base to the rift. The staging shelter relocates just behind it and
   * contacts drop around it, so each chapter is physically further in.
   */
  advance?: { frac: number; name: string };
}

/** Zero-based index of the first Act II chapter. */
export const ACT2_START = 10;

export const AYA = 'AYA · COMMAND';
export const KUROSAWA = 'DR. KUROSAWA';
export const KUROKI = 'KUROKI'; // the pilot — you
export const REI = 'REI · MEMORIAL'; // Aya's late sister; heard only in archived recordings
export const HINATA = 'HINATA · PILOT'; // second unit, joins mid-campaign
export const KOTETSU = 'KOTETSU · SUPPORT'; // mechanic and mission-control ally
export const JOTETSU = 'JOTETSU · ENGINEER'; // Kotetsu's older, much leaner brother

/** Zero-based campaign chapters where each ally enters the fight. */
export const HINATA_CHAPTER = 1;  // Chapter 2
export const KOTETSU_CHAPTER = 2; // Chapter 3
export const JOTETSU_CHAPTER = 3; // Chapter 4

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
      { who: AYA, text: 'And you are not going alone. Kurosawa cleared the second frame this morning.' },
      { who: HINATA, text: 'HINATA, dropping in! Hi! Oh wow, you are TALLER than the file said.' },
      { who: KUROKI, text: '…Aya. Who is this.' },
      { who: HINATA, text: 'Hinata! I am your wingman! Please look after me, senpai!' },
      { who: KUROKI, text: 'Do not call me that.' },
      { who: AYA, text: 'Second-frame descent cleared. Hinata — deploy now!' },
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
      { who: AYA, text: 'Heavy support is approaching from the south. Identify yourself.' },
      { who: KOTETSU, text: 'Kotetsu. Kurogane support tank. I brought shells, tools, and several bad ideas.' },
      { who: KUROKI, text: 'You know how to drive that thing?' },
      { who: KOTETSU, text: 'Drive, yes. Aim is currently more theoretical.' },
      { who: HINATA, text: 'Kotetsu fixes everything! Usually after he accidentally hits it.' },
      { who: AYA, text: 'Kurogane descent cleared. Kotetsu, deploy!' },
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
      { who: HINATA, text: 'I am on your wing, senpai. I will cover the east side.' },
      { who: JOTETSU, text: 'Jotetsu. Senior reconstruction engineer. Digger frame awaiting clearance.' },
      { who: KOTETSU, text: 'My older brother. He is friendlier than he sounds. Marginally.' },
      { who: JOTETSU, text: 'Kotetsu, you arrived one chapter ago and have already shelled a pharmacy.' },
      { who: KOTETSU, text: 'The monster moved.' },
      { who: JOTETSU, text: 'Of course it did. Even the monster understands what your aim means.' },
      { who: AYA, text: 'Enough. Jotetsu, repair the shelters. Digger deployment cleared.' },
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
      { who: KOTETSU, text: 'Kurogane is in position. I can miss it from here just as effectively.' },
      { who: JOTETSU, text: 'Three shelter blocks restored. Try not to demolish them again before lunch.' },
      { who: HINATA, text: 'No promises! Senpai is already doing the hero pose.' },
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
      { who: AYA, text: 'They painted my sister up there too. Years ago. It is still there.' },
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

  // ------------------------------------------------------------------ Act II
  // The campaign stops being a defence and becomes an advance. Every chapter
  // stages further from the city, and the thing waiting at the far end has
  // been listening to these people talk for three years.

  {
    no: 11,
    title: 'THE ROAD OUT',
    advance: { frac: 0.22, name: 'STAGING · THE CAUSEWAY' },
    brief: [
      { who: KUROSAWA, text: 'The seam is widening again. Sealing it from this side has stopped working.' },
      { who: AYA, text: 'So we stop sealing it from this side. Command has approved the advance.' },
      { who: KUROKI, text: 'We go to it.' },
      { who: AYA, text: 'We go to it. The wards are emptying into one staging shelter behind you — it moves as you move.' },
      { who: HINATA, text: 'Everyone we could not get onto the boats is in that shelter. Just so we are all clear.' },
      { who: KOTETSU, text: 'I reinforced it myself. It will hold. …It will hold if nothing sits on it.' },
      { who: AYA, text: 'Then nothing sits on it. Move out, Kuroki.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'Curious. There is a Terra-Armor signature inside the rift.' },
      { who: AYA, text: '…Say that again.' },
      { who: KUROSAWA, text: 'Debris, almost certainly. We lost a frame near the bay three years ago.' },
      { who: KUROSAWA, text: 'The seam has been pulling wreckage in since it opened. This will be some of it.' },
      { who: AYA, text: '…Understood. Log it and move on.' },
      { who: KUROKI, text: 'Aya.' },
      { who: AYA, text: 'Log it and move on, Kuroki.' },
    ],
  },
  {
    no: 12,
    title: 'WHAT THE TIDE LEFT',
    advance: { frac: 0.4, name: 'STAGING · THE SHALLOWS' },
    brief: [
      { who: AYA, text: 'City is behind you now. Everything ahead of this point is ours only while you are standing on it.' },
      { who: JOTETSU, text: 'I have moved the shelter up. Do not make me move it again under fire.' },
      { who: HINATA, text: 'Senpai, the ground out here is wrong. It is not burnt. It is just… less.' },
      { who: KUROSAWA, text: 'Matter nearest the seam is being unmade slowly. Do not stand still for long.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'The Terra-Armor signature has changed position.' },
      { who: AYA, text: 'Drift. The seam moves everything.' },
      { who: KUROSAWA, text: 'It moved four kilometres against the pull, Commander. That is not drift.' },
      { who: KUROSAWA, text: '…It is under power.' },
      { who: KOTETSU, text: 'Nothing has power after three years in there. Nothing.' },
      { who: AYA, text: '…' },
      { who: HINATA, text: 'Aya? You have gone quiet. You never go quiet.' },
    ],
  },
  {
    no: 13,
    title: 'DEAD GROUND',
    advance: { frac: 0.58, name: 'STAGING · DEAD GROUND' },
    brief: [
      { who: KUROSAWA, text: 'No terrain, no salvage, no life. This stretch has been inside the seam and come back out.' },
      { who: KUROKI, text: 'Kurosawa. The frame in there. Whose was it.' },
      { who: KUROSAWA, text: '…You know whose it was.' },
      { who: AYA, text: 'It was a prototype. It was the FIRST prototype. That is all it was.' },
      { who: KUROKI, text: 'Understood.' },
      { who: AYA, text: '…Contact inbound. Go.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'Something is bleeding onto our channel. Routing it through.' },
      { who: REI, text: '—get the shelters clear. I will catch up.' },
      { who: HINATA, text: 'Who was that? Aya, who was that?' },
      { who: REI, text: '—Kuroki? Kuroki, I have lost you on the turn. Say again.' },
      { who: KUROKI, text: '…That is the archive. That is the archived transmission.' },
      { who: KUROSAWA, text: 'It is not. The archive has four lines. This has said six.' },
      { who: AYA, text: '[TRANSMISSION ENDED]' },
      { who: HINATA, text: 'Aya cut the channel. …Aya has cut her own channel.' },
    ],
  },
  {
    no: 14,
    title: 'IT WILL NOT ENGAGE',
    advance: { frac: 0.76, name: 'STAGING · THE APPROACH' },
    brief: [
      { who: AYA, text: 'I am back on. I am fine. Do not ask.' },
      { who: KUROKI, text: 'I was not going to.' },
      { who: AYA, text: '…Thank you.' },
      { who: KUROSAWA, text: 'The Terra-Armor is holding station two kilometres out. It has matched your advance exactly.' },
      { who: AYA, text: 'It is escorting you. Whatever else it is, it is escorting you.' },
    ],
    debrief: [
      { who: HINATA, text: 'It watched the whole fight. It had a firing solution on me twice and it did not take it.' },
      { who: KOTETSU, text: 'Maybe it is out of ammunition.' },
      { who: HINATA, text: 'It is not out of ammunition, Kotetsu.' },
      { who: HINATA, text: 'It looked at you, senpai. The entire time. Only you.' },
      { who: KUROKI, text: '…I know.' },
      { who: AYA, text: 'Kuroki. Whatever is in that frame, it is not her. Do you understand me?' },
      { who: KUROKI, text: 'Say that again when your voice is steadier and I will believe you.' },
    ],
  },
  {
    no: 15,
    title: 'THE MOUTH',
    advance: { frac: 0.9, name: 'STAGING · THE MOUTH' },
    brief: [
      { who: KUROSAWA, text: 'This is the threshold. Past this the seam is not a place, it is a direction.' },
      { who: AYA, text: 'Three signatures converging on you. They are trying to keep you off the rift.' },
      { who: HINATA, text: 'Then they are about to be very disappointed. Senpai — on your wing.' },
      { who: KOTETSU, text: 'Shelter is as far forward as it goes. If we lose ground here, we lose it with people on it.' },
    ],
    debrief: [
      { who: KUROSAWA, text: 'The Terra-Armor is moving to intercept. It is coming to you.' },
      { who: AYA, text: 'All units break off. BREAK OFF.' },
      { who: REI, text: 'You called the turn.' },
      { who: KUROKI, text: '…' },
      { who: REI, text: 'I followed it. I followed it because it was you.' },
      { who: REI, text: 'Where were you?' },
      { who: AYA, text: 'Rei—' },
      { who: REI, text: 'Where WERE you?' },
      { who: KUROSAWA, text: 'It is powering weapons. Kuroki — it is powering weapons.' },
    ],
  },
  {
    no: 16,
    title: 'THE FIRST PROTOTYPE',
    advance: { frac: 0.98, name: 'STAGING · THE SEAM' },
    brief: [
      { who: KUROSAWA, text: 'Designation TA-00. That frame is not a copy of yours, Kuroki.' },
      { who: KUROSAWA, text: 'Yours is the copy of it. She flew the first one.' },
      { who: AYA, text: 'Doctor, I am asking you once. Is my sister in there.' },
      { who: KUROSAWA, text: '…Everything she was up to a particular moment is in there.' },
      { who: KUROSAWA, text: 'Nothing after it. The seam took an impression and it has been holding it since.' },
      { who: HINATA, text: 'So it does not know. It does not know that it—' },
      { who: AYA, text: 'It does not know.' },
      { who: KUROKI, text: 'Then I will tell it. Everyone off this channel except Aya.' },
      { who: HINATA, text: 'Senpai—' },
      { who: KUROKI, text: 'Hinata. Off the channel. Please.' },
    ],
    debrief: [
      { who: KUROKI, text: 'Rei. I did not leave.' },
      { who: REI, text: '…' },
      { who: KUROKI, text: 'I called the turn and you followed it and I came back for you.' },
      { who: KUROKI, text: 'I came back four times. There was nothing to come back to.' },
      { who: REI, text: 'That is not— I have been waiting. I have been waiting the whole time.' },
      { who: KUROKI, text: 'I know. I am sorry it was this long.' },
      { who: AYA, text: 'Rei. It is Aya.' },
      { who: REI, text: 'Aya? Aya, are the shelters clear? Tell me the shelters are clear.' },
      { who: AYA, text: '…The shelters are clear. Everyone got out. You did that.' },
      { who: AYA, text: 'You can stop now. You are allowed to stop.' },
      { who: REI, text: '…Good. That is good.' },
      { who: REI, text: 'Kuroki. Do not call that turn again.' },
      { who: KUROKI, text: 'I never have.' },
      { who: KUROSAWA, text: 'The seam is closing. It is closing from the inside — she is closing it.' },
      { who: AYA, text: 'Kuroki, GET OUT OF THERE.' },
      { who: KUROKI, text: '…Understood, Commander.' },
    ],
  },
];

/**
 * Beats that fire during the Revenant fight itself, at the two gear changes.
 * The realisation has to happen while the player is still swinging — it is
 * the fight, not a cutscene bolted onto the end of it.
 */
export const REVENANT_BEATS: Record<string, Line[]> = {
  // ~60% — the first crack. It notices the city is the wrong shape.
  phase2: [
    { who: REI, text: 'You have changed the approach. You never came in that low.' },
    { who: KUROKI, text: 'I learned it after.' },
    { who: REI, text: 'After what?' },
    { who: KUROKI, text: '…' },
    { who: REI, text: 'Kuroki. The bay. The bay is the wrong shape. Those towers are not— when did they build those?' },
    { who: KUROSAWA, text: 'It is comparing what it sees against what it remembers. Do not answer that.' },
    { who: AYA, text: 'Doctor, shut up.' },
    { who: REI, text: 'Aya. Aya, how long have I been out here?' },
  ],
  // ~25% — it works it out, and asks the only question it has ever had
  phase3: [
    { who: REI, text: 'I have been counting. I counted the whole time.' },
    { who: REI, text: 'I got to four hundred and something and then I started again.' },
    { who: AYA, text: 'Rei—' },
    { who: REI, text: 'Do not. I know what you are going to say and I do not want it yet.' },
    { who: REI, text: 'I want the shelters first. Tell me about the shelters.' },
    { who: HINATA, text: '…Senpai, I am so sorry. I am so sorry, I did not know.' },
    { who: REI, text: 'Who is that? Kuroki, who IS that?' },
    { who: KUROKI, text: 'That is my wing. You would like her.' },
    { who: REI, text: '…Then I have been gone a long time.' },
  ],
};

/** Played once the Revenant is down and the seam has closed for good. */
export const RIFT_EPILOGUE: Line[] = [
  { who: KUROSAWA, text: 'The seam is gone. Not sealed — gone. There is nothing there to reopen.' },
  { who: AYA, text: 'Casualty report is zero. First one I have ever filed.' },
  { who: HINATA, text: 'Senpai. Are you… is he alright? He has not said anything.' },
  { who: AYA, text: 'Give him a minute, Hinata.' },
  { who: KUROKI, text: '…She asked about the shelters. Three years in there and that is what she asked.' },
  { who: AYA, text: 'That is who she was. That is exactly who she was.' },
  { who: KUROKI, text: 'Yes. It was.' },
  { who: AYA, text: 'Come home, Kuroki. That is not an order.' },
  { who: KUROKI, text: 'I know. I am coming anyway.' },
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
    { who: AYA, text: 'Those were HOMES, Kuroki. People lived in those.' },
    { who: AYA, text: 'Every block you drop is another hundred people at a ward door!' },
    { who: AYA, text: 'The wards are filling up because of YOU, not the kaiju!' },
    { who: AYA, text: 'Stop. Just— stop swinging at things that are not the target!' },
    { who: AYA, text: 'That was a school! Tell me you did not just hit a school!' },
    { who: KUROKI, text: 'It was empty. They evacuated it on day one.' },
    { who: AYA, text: 'That is not the POINT and you know it is not the point!' },
    { who: AYA, text: 'I am watching the damage bill climb in real time.' },
    { who: AYA, text: 'You have cost this city more than the last three kaiju combined.' },
    { who: HINATA, text: 'Senpai, maybe fight it in the park? There is a park right there!' },
    { who: KUROKI, text: 'The park is full of trees.' },
    { who: HINATA, text: 'Trees grow BACK!' },
    { who: KOTETSU, text: 'Every building you drop is another week of my life. Just so you know.' },
    { who: AYA, text: 'Kuroki, I have the reconstruction office on the other line and they are CRYING.' },
    { who: AYA, text: 'One district. Give me ONE district you have not touched.' },
    { who: KUROKI, text: '…I will get back to you on that.' },
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
  // it has just changed gear — half warning, half respect
  bossPhase: [
    { who: AYA, text: 'Its output just jumped. Whatever it was doing before, that was not all of it.' },
    { who: KUROSAWA, text: 'It was measuring you. Now it has finished measuring.' },
    { who: KUROKI, text: 'Good. I was getting bored.' },
    { who: AYA, text: 'Pattern change — it is moving differently. Do not fight the old one.' },
    { who: KUROSAWA, text: 'That is not desperation. That is a second gear. Be careful.' },
    { who: AYA, text: 'Kuroki, it just stopped holding back. Please read that as the warning it is.' },
    { who: HINATA, text: 'Whoa — it got FAST. Captain, did you see that?' },
    { who: KUROKI, text: 'I saw it.' },
    { who: KOTETSU, text: 'It sped up. Wonderful. I could barely hit it at the old speed.' },
  ],
  // final quarter: it has nothing left to protect
  bossEnrage: [
    { who: AYA, text: 'It is dying and it knows it. That makes it more dangerous, not less.' },
    { who: KUROSAWA, text: 'A cornered animal spends everything. Do not trade blows now.' },
    { who: KUROKI, text: 'Then I will not miss.' },
    { who: AYA, text: 'Vitals critical — and it has stopped defending itself entirely. It is all attack now.' },
    { who: HINATA, text: 'It is throwing everything at you! Captain, break off, break off!' },
    { who: KUROKI, text: 'No. This is where it ends.' },
    { who: AYA, text: 'Last quarter. Whatever it does next, it only gets to do once.' },
    { who: KOTETSU, text: 'If it is going to explode, tell me BEFORE and not after.' },
  ],
  // the seconds before a new contact drops — the lull turning back into a fight
  incoming: [
    { who: AYA, text: 'New signature breaking atmosphere. Stand by, Kuroki.' },
    { who: KUROSAWA, text: 'Something is coming down. Get off the open ground.' },
    { who: AYA, text: 'Contact in seconds. Wherever you are standing, be somewhere better.' },
    { who: KUROKI, text: 'I am always somewhere better.' },
    { who: AYA, text: 'Second signature. That was a short rest, I am sorry.' },
    { who: HINATA, text: 'Another one?! Captain, I am with you — right behind you!' },
    { who: KOTETSU, text: 'Give me ten more seconds. Please. Ten.' },
    { who: AYA, text: 'You do not have ten. Nobody has ten.' },
    { who: KUROSAWA, text: 'They are coming faster than they used to. That means something.' },
  ],
  // it has finished reading a weapon and stopped being hurt by it
  revenantAdapt: [
    { who: KUROSAWA, text: 'It is compensating. Every hit you land teaches it the shape of that weapon.' },
    { who: AYA, text: 'Switch, Kuroki. Do not give it a pattern to read.' },
    { who: KUROSAWA, text: 'It learned that one. Use something it has not seen yet.' },
    { who: AYA, text: 'It is doing what you taught HER to do. Stop repeating yourself!' },
    { who: HINATA, text: 'Senpai, it is reading you! Change it up!' },
    { who: KUROSAWA, text: 'Its plating is reconfiguring mid-fight. Remarkable. Also very bad.' },
  ],
  // phase 3 — it stops fighting like a machine
  reiPattern: [
    { who: AYA, text: 'Kuroki. Kuroki, that is her approach. That is the pattern she flew.' },
    { who: KUROSAWA, text: 'It has abandoned ranged engagement entirely. That is not a system decision.' },
    { who: AYA, text: 'It is not calculating any more. It is just… coming at you.' },
    { who: KUROKI, text: 'I know the pattern. I taught her half of it.' },
    { who: AYA, text: 'And she taught you the other half. …Do not let that make you slow.' },
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
  shelterFilling: [
    { who: AYA, text: 'The wards are filling up fast. Where do you think these people are coming from?' },
    { who: KOTETSU, text: 'I am extending the frames as fast as I can weld.' },
    { who: AYA, text: 'Weld faster. Kuroki, STOP KNOCKING THINGS DOWN.' },
    { who: HINATA, text: 'There is a queue at the east ward door. A real queue.' },
    { who: AYA, text: 'If a ward overflows we have nowhere to put them. Nowhere, Kuroki.' },
  ],
  shelterOverfull: [
    { who: AYA, text: '…They could not get in. There was no room left.' },
    { who: KOTETSU, text: 'I ran out of ward to build. I am sorry. I ran out.' },
    { who: KUROKI, text: 'That one is on me. All of it is on me.' },
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
    { who: KUROKI, text: 'I know. She taught it to me.' },
    { who: AYA, text: '…She taught it to me first. She taught me everything first.' },
    { who: KUROKI, text: 'She would. Older sisters are like that.' },
  ],
  [
    { who: KUROKI, text: 'You never ask about that day.' },
    { who: AYA, text: 'I was on comms that day, Kuroki. I do not need to ask.' },
    { who: REI, text: '[ARCHIVED TRANSMISSION] Aya, get the shelters clear. I will catch up.' },
    { who: AYA, text: 'I heard my sister go quiet. I do not need anybody to describe it to me.' },
  ],
  [
    { who: KUROKI, text: 'I was lead. I called the turn. She followed it.' },
    { who: AYA, text: 'I know exactly what you called. I was listening.' },
    { who: KUROKI, text: 'Then say it. Whatever it is you have not said for three years.' },
    { who: AYA, text: '…That I do not blame you. And that some mornings I do anyway.' },
    { who: AYA, text: 'Both of those are true. I have stopped trying to fix it.' },
  ],
  [
    { who: AYA, text: 'You think I shout because you break things.' },
    { who: KUROKI, text: 'I break a LOT of things.' },
    { who: AYA, text: 'I shout because the last time a signal went quiet on me it was my sister, and it stayed quiet.' },
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
    { who: HINATA, text: 'She said Rei was better than you. She smiled when she said it.' },
    { who: KUROKI, text: 'Rei was her sister. And my wingwoman.' },
    { who: HINATA, text: 'And your ex. That part was not in the flight report.' },
    { who: KUROKI, text: 'That part is not for the flight report.' },
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
    { who: KUROKI, text: 'Then you know I called the turn. And whose sister followed it.' },
    { who: HINATA, text: 'I know she followed it because she trusted you. Those are different sentences.' },
    { who: KUROKI, text: '…' },
    { who: HINATA, text: 'I am going to keep following them too, by the way. Just so you know.' },
  ],
];

// ------------------------------------------------------------ the mechanic
// Kotetsu is not a pilot. He built half the hardware in this campaign and
// Command handed him a gun platform because there was nothing else left.

export const KOTETSU_BARKS: Record<string, Line[]> = {
  arrival: [
    { who: KOTETSU, text: 'KUROGANE rolling. Slowly. Everything about this is slow.' },
  ],
  missed: [
    { who: KOTETSU, text: '…That was close. To something. Not the target.' },
    { who: AYA, text: 'That was a BANK, Kotetsu!' },
    { who: KOTETSU, text: 'The bank was between me and the kaiju. Physics.' },
    { who: KOTETSU, text: 'In fairness nobody asked whether I could aim.' },
    { who: AYA, text: 'I ASSUMED, Kotetsu! I assumed!' },
    { who: HINATA, text: 'Kotetsu that was my side! That was MY side!' },
    { who: KOTETSU, text: 'Noted. Adjusting. Probably.' },
  ],
  hit: [
    { who: KOTETSU, text: 'Oh! That one connected. Nobody make a fuss.' },
    { who: HINATA, text: 'THAT WAS AMAZING! Do it again!' },
    { who: KOTETSU, text: 'I would rather not press my luck.' },
  ],
  mechanic: [
    { who: KOTETSU, text: 'Reinforcing the east ward while you two argue. Do carry on.' },
    { who: KOTETSU, text: 'I have extended the ward frames. They will hold more people now.' },
    { who: AYA, text: 'How much more?' },
    { who: KOTETSU, text: 'More than yesterday. Less than you would like.' },
    { who: KOTETSU, text: 'If you all stopped flattening buildings I would have less to do.' },
  ],
};

export const JOTETSU_BARKS: Record<string, Line[]> = {
  damage: [
    { who: JOTETSU, text: 'Kuroki, I rebuilt that façade twelve seconds ago. Your restraint remains inspiring.' },
    { who: JOTETSU, text: 'Another building. Excellent. I was worried my work queue might become manageable.' },
    { who: JOTETSU, text: 'Try aiming at the monster, Kuroki. The architecture has not declared war on you.' },
    { who: JOTETSU, text: 'I am beginning to understand why Aya always sounds exhausted.' },
  ],
  kotetsu: [
    { who: JOTETSU, text: 'Kotetsu, if you cannot hit the target, at least miss away from my construction site.' },
    { who: JOTETSU, text: 'My brother has turned incompetence into a weapons platform.' },
    { who: KOTETSU, text: 'Good to hear your personality survived the launch, brother.' },
    { who: JOTETSU, text: 'Somebody in this family had to bring standards.' },
  ],
  repair: [
    { who: JOTETSU, text: 'Ward integrity restored. You are welcome to preserve it this time.' },
    { who: JOTETSU, text: 'Housing block is open. Civilians are leaving the shelter in an orderly fashion — observe and learn.' },
  ],
};

// -------------------------------------------------------- Aya and Hinata
// They get on. Aya is warmer with Hinata than with anyone, which Kuroki has
// definitely noticed and will definitely not mention.

export const AYA_HINATA: Line[][] = [
  [
    { who: HINATA, text: 'Aya, can I ask you something? About senpai.' },
    { who: AYA, text: 'You can ask. He will not answer, but you can ask.' },
    { who: HINATA, text: 'Does he ever sleep?' },
    { who: AYA, text: 'No. I have three years of logs proving it.' },
  ],
  [
    { who: AYA, text: 'Hinata. Your shield took forty percent that pass. Are you all right?' },
    { who: HINATA, text: 'Totally fine! That is what it is for!' },
    { who: AYA, text: 'That is what he says. I do not like hearing it from you as well.' },
    { who: HINATA, text: '…Sorry, Aya.' },
    { who: AYA, text: 'Do not be sorry. Just be careful. One of you is enough.' },
  ],
  [
    { who: HINATA, text: 'You shout at him a lot.' },
    { who: AYA, text: 'He earns it a lot.' },
    { who: HINATA, text: 'You do not shout at me.' },
    { who: AYA, text: '…You listen the first time.' },
  ],
  [
    { who: HINATA, text: 'Aya, when this is over, can I buy you lunch?' },
    { who: AYA, text: 'Only if it is not in the market district. He levelled it.' },
    { who: KUROKI, text: 'That was the kaiju.' },
    { who: AYA, text: 'That was HALF the kaiju!' },
  ],
  [
    { who: AYA, text: 'You are good at this, Hinata. I do not say that often.' },
    { who: HINATA, text: 'You do not say it EVER, Aya!' },
    { who: AYA, text: 'Then treasure it.' },
    { who: KOTETSU, text: 'She has never said it to me.' },
    { who: AYA, text: 'You overslept.' },
  ],
];
