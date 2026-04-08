export type ScriptStatus = 'draft' | 'in-progress' | 'completed';
export type ScriptGenre = 'sci-fi' | 'drama' | 'thriller' | 'horror' | 'fantasy';

export interface Script {
  slug: string;
  title: string;
  genre: ScriptGenre;
  status: ScriptStatus;
  project: string; // related story/project name
  linkedSlugs: string[]; // wiki page slugs
  synopsis: string;
  content: string; // the actual script text
}

export const genreLabels: Record<ScriptGenre, string> = {
  'sci-fi': 'Sci-Fi',
  drama: 'Drama',
  thriller: 'Thriller',
  horror: 'Horror',
  fantasy: 'Fantasy',
};

export const statusLabels: Record<ScriptStatus, string> = {
  draft: 'Draft',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const statusColors: Record<ScriptStatus, string> = {
  draft: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  'in-progress': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  completed: 'text-primary bg-primary/10 border-primary/30',
};

export const scripts: Script[] = [
  {
    slug: 'the-last-signal-screenplay',
    title: 'The Last Signal',
    genre: 'sci-fi',
    status: 'completed',
    project: 'The Last Signal',
    linkedSlugs: ['the-last-signal', 'kael-voss', 'station-erebus', 'isolation'],
    synopsis: 'A lonely communications officer on a dying space station receives an impossible transmission from a civilization that went silent centuries ago.',
    content: `FADE IN:

INT. STATION EREBUS — COMMUNICATIONS BAY — NIGHT (CYCLE 4,217)

The room hums with the low drone of decaying machinery. Banks of monitors cast pale blue light across the face of KAEL VOSS (34), hollow-eyed, unshaven, wearing a patched jumpsuit. He sits alone among dozens of empty workstations.

A coffee mug reads: "I SURVIVED THE OORT CLOUD (barely)."

KAEL
(into recorder)
Station log, day four-thousand-two-hundred-and-seventeen. Signal sweep complete. Nothing. Again.

He reaches for the console. His fingers hover over the SHUTDOWN sequence.

Beat.

A PING. Faint. Almost imperceptible.

Kael freezes.

KAEL (CONT'D)
What the—

He pulls up the frequency analyzer. A waveform blooms across the screen — complex, layered, unlike anything in the database.

KAEL (CONT'D)
(whispering)
That's not noise. That's structured.

He leans in, eyes wide. The signal PULSES — rhythmic, almost like breathing.

COMPUTER (V.O.)
Warning: Signal origin does not match any catalogued source. Estimated origin point: Sector 7-G. Status: Quarantined space. No transmissions recorded for three hundred twelve years.

KAEL
Three hundred twelve years...

He pulls up historical records. A name appears on screen: THE ECHOVEIL CIVILIZATION.

KAEL (CONT'D)
They've been dead for three centuries. Who's sending this?

---

ACT ONE — RECEPTION

---

INT. STATION EREBUS — KAEL'S QUARTERS — LATER

A cramped room. Photos pinned to the wall — a woman laughing, a child on someone's shoulders. Kael sits on his bunk, staring at a portable terminal.

The signal plays on loop, visualized as a spiraling helix.

KAEL
(to himself)
Pattern recognition says it's language. But whose?

He pulls up the decryption suite. Begins running analysis.

MONTAGE — Kael works through station "night." Coffee. Equations. Dead ends. He slams the desk. Tries again.

Finally — a FRAGMENT resolves.

ON SCREEN: "WE REMEMBER YOU"

Kael stares.

KAEL (CONT'D)
That's... that's not possible.

---

INT. COMMUNICATIONS BAY — CONTINUOUS

Kael rushes back. He adjusts the antenna array, boosting reception.

More fragments decode:

"WE REMEMBER YOU"
"THE SILENCE WAS NOT OURS"
"COME HOME"

KAEL
Home? I don't— I've never—

The signal SURGES. Lights flicker. The station groans.

COMPUTER (V.O.)
Power fluctuation detected. Signal strength exceeding receiver capacity.

KAEL
Don't lose it! Reroute auxiliary power to comms array!

COMPUTER (V.O.)
Rerouting. Warning: life support will operate at sixty percent capacity.

KAEL
(without hesitation)
Do it.

---

ACT TWO — TRANSLATION

---

INT. COMMUNICATIONS BAY — DAYS LATER

Kael hasn't slept. Screens covered in decoded fragments. He's connected the signal patterns to musical notation, mathematical sequences, and — disturbingly — his own journal entries from years ago.

KAEL
(pacing)
The harmonic structure matches entries from my personal logs. Dated... three years before I was posted here.

He stops.

KAEL (CONT'D)
How would they know what I wrote?

He sits. Pulls up a comparison. Side by side — the signal's mathematical backbone and the rhythm of his own writing. They're nearly identical.

KAEL (CONT'D)
(quietly)
It's not a message to me. It's a message from me.

---

INT. KAEL'S QUARTERS — NIGHT

Kael sits in the dark. The photos on the wall catch faint light.

KAEL
(into recorder)
Day four-thousand-two-hundred-and-twenty-three. I've decoded approximately forty percent of the signal. I don't know how to say this in a way that won't sound insane. The signal... contains my memories. Not metaphorically. Literally. Moments I haven't thought about in years — encoded, restructured, broadcast back to me from dead space.

He pauses.

KAEL (CONT'D)
Either I'm losing my mind, or the Echoveil didn't die. They became something else. Something that listens. Something that remembers.

---

ACT THREE — RESPONSE

---

INT. COMMUNICATIONS BAY — DAY

The full signal is decoded. On the main screen: a complete message, rendered in English.

ON SCREEN:

"Kael. We are what remains when a civilization chooses memory over matter. We heard you across the silence. Your loneliness resonated at our frequency. We offer you what we offered ourselves — dissolution into permanence. You will not die. You will be remembered. Perfectly. Forever. All you must do is answer."

Kael reads it three times.

A cursor blinks at the bottom: TRANSMIT RESPONSE? Y/N

KAEL
(to no one)
If I answer... do I stop being me?

Long silence. The station creaks.

KAEL (CONT'D)
Or do I finally start?

He looks at the photos. The woman. The child.

KAEL (CONT'D)
I remember you. That's enough.

He reaches for the console. His hand trembles.

CLOSE ON: His finger presses Y.

The signal EXPLODES outward. Light floods the station. Kael closes his eyes.

SMASH CUT TO:

EXT. SPACE — STATION EREBUS — CONTINUOUS

The station goes dark. Drifts silently.

Then — from deep within — a single PULSE of green light. It ripples outward, faster than light, into the void.

FADE TO BLACK.

TITLE CARD: "The Echoveil Frequency has been active for 312 years. In that time, it has received 7 responses."

TITLE CARD: "Kael's was the last."

FADE OUT.`,
  },
  {
    slug: 'verdant-protocol-pilot',
    title: 'The Verdant Protocol — Pilot',
    genre: 'sci-fi',
    status: 'in-progress',
    project: 'The Verdant Protocol',
    linkedSlugs: ['the-verdant-protocol', 'dr-lian-zhao', 'eden-7', 'humanity-vs-nature'],
    synopsis: 'A botanist discovers that the alien ecosystem she was sent to study has been studying humanity right back — and it has opinions.',
    content: `COLD OPEN

FADE IN:

EXT. EDEN-7 — LANDING ZONE ALPHA — DAWN

An alien sunrise. Twin suns bleeding orange and violet across a sky thick with bioluminescent spores. The landscape is impossibly green — trees with translucent bark, flowers that pulse with internal light, vines that move like sleeping limbs.

A research shuttle sits in a clearing, scorched earth beneath it. The only mark humanity has made on this world.

DR. LIAN ZHAO (38), sharp-eyed, deliberate in her movements, steps out in a biosuit. She carries a specimen case and speaks into her collar mic.

LIAN
Survey log, day one. Eden-7 is... more than the probes suggested. Biomass density exceeds projections by a factor of twelve. The air filtration reads clean but I'm keeping the suit sealed.

She kneels beside a cluster of luminous fungi. They PULSE brighter as she approaches.

LIAN (CONT'D)
(noticing)
Reactive bioluminescence. Proximity triggered.

She reaches out. The fungi lean toward her hand — all of them, simultaneously.

LIAN (CONT'D)
(pulling back)
Coordinated response. Noted.

She stands. Looks out at the vast, breathing forest.

LIAN (CONT'D)
(quietly)
It's watching me.

TITLE CARD: THE VERDANT PROTOCOL

---

ACT ONE

INT. RESEARCH SHUTTLE — DAY 7

The shuttle interior is now a makeshift lab. Specimens line every surface — soil samples, leaf pressings, fluid extracts. Holographic displays show molecular structures that don't follow Earth biochemistry.

Lian is in a video call with DIRECTOR HAHN (55), bureaucratic, impatient.

HAHN
Seven days, Zhao. Where's the viability report?

LIAN
Director, standard protocols don't apply here. This ecosystem doesn't operate on any model we've—

HAHN
The colonization committee needs a yes or a no. Can we terraform Eden-7?

LIAN
(carefully)
The question isn't whether we can. It's whether we should.

HAHN
That's not what you were sent to determine.

LIAN
With respect, sir — this biosphere shows signs of coordinated intelligence. The root networks alone—

HAHN
Intelligence. In plants.

LIAN
In the ecosystem as a whole. It's not individual organisms. It's the entire network acting as a single entity.

HAHN
Give me data, not poetry. You have fourteen days.

The call ends. Lian exhales.

She turns to her displays. One shows a map of root networks beneath the surface — vast, interconnected, pulsing with electrical signals.

LIAN
(to herself)
You're not just growing. You're thinking.

---

EXT. EDEN-7 — THE DEEP GROVE — DAY 12

Lian walks deeper into the forest than she's gone before. The trees here are massive — trunks like cathedrals, canopy blocking the suns. Everything glows.

She stops at a clearing. In the center: a STRUCTURE. Organic, grown not built — arches of living wood forming a chamber. Inside, bioluminescent patterns cover every surface.

LIAN
(breathless)
That's not random. Those are patterns. Repeating structures.

She scans them. Her device BEEPS in confusion.

LIAN (CONT'D)
The patterns... they're mathematical. Prime sequences. Fibonacci spirals. And—

She freezes.

ON SCREEN: The patterns include a DOUBLE HELIX. Human DNA.

LIAN (CONT'D)
(whispering)
You've been studying us too.

The chamber PULSES. A deep, subsonic HUM fills the air. The ground vibrates beneath her feet.

Every plant in the grove turns toward her.

LIAN (CONT'D)
I hear you.

SMASH TO BLACK.

END OF COLD OPEN / TO BE CONTINUED

---

[WRITER'S NOTE: Episode continues with Lian discovering the Verdant Network's attempt at communication through chemical signals that interface directly with human neurotransmitters. The ethical conflict: does she report this to Director Hahn, knowing it would either halt colonization or — worse — accelerate weaponization of the network?]`,
  },
  {
    slug: 'cartographers-paradox-script',
    title: "The Cartographer's Paradox",
    genre: 'thriller',
    status: 'draft',
    project: "The Cartographer's Paradox",
    linkedSlugs: ['the-cartographers-paradox', 'maren-sol', 'the-folded-city', 'identity'],
    synopsis: "A cartographer discovers her maps are creating the territory — and someone is using her gift to reshape reality itself.",
    content: `FADE IN:

INT. MAREN'S APARTMENT — NIGHT

A cluttered studio apartment. Every wall covered in MAPS — hand-drawn, obsessively detailed. Cities that don't exist. Coastlines that curve wrong. Mountains where there should be plains.

MAREN SOL (29) sits at a drafting table under a single lamp. Ink-stained fingers. Red eyes. She's been working for hours.

She draws a street. A small lane branching off a boulevard she invented yesterday.

MAREN
(muttering)
Silk Street. Between the Cathedral of Echoes and the Night Market. Width: four meters. Cobblestone. Gas lamps.

She finishes the line. Sits back.

Her phone BUZZES. A news alert.

ON PHONE: "MYSTERIOUS STREET APPEARS OVERNIGHT IN PRAGUE'S OLD TOWN — 'Silk Street' baffles city officials. No construction permits filed."

Maren stares at the phone. Then at her map.

MAREN (CONT'D)
No. No, no, no.

She grabs her laptop. Searches "Silk Street Prague." Photos flood in — a cobblestone lane, gas lamps, exactly four meters wide. Between a cathedral and a market.

Exactly as she drew it.

MAREN (CONT'D)
(panicking)
This isn't— I made this up. I made it up.

She looks at the wall of maps. Dozens of invented places.

MAREN (CONT'D)
(horrified whisper)
How many of these are real now?

---

TITLE CARD: THE CARTOGRAPHER'S PARADOX

---

ACT ONE — THE MAP IS NOT THE TERRITORY

INT. UNIVERSITY OF AMSTERDAM — GEOGRAPHY DEPARTMENT — DAY

Maren teaches a lecture to bored undergraduates. Her subject: the history of cartographic errors.

MAREN
In 1925, Otto G. Lindberg created a fictional town called "Agloe" and placed it on a map of New York State as a copyright trap. Years later, someone built a general store at those exact coordinates and named it — you guessed it — Agloe.

She clicks to the next slide.

MAREN (CONT'D)
The map created the territory. Lindberg's fiction became fact because people trusted the map more than the empty field in front of them.

She pauses. The words hang.

MAREN (CONT'D)
(quietly, to herself)
And what if it wasn't trust? What if the map... insisted?

STUDENT
Sorry, Professor Sol — what was that?

MAREN
(recovering)
Nothing. Assignment's on the portal. Dismissed.

---

INT. MAREN'S OFFICE — CONTINUOUS

Maren locks the door. Pulls out a notebook filled with coordinates. Every place she's ever invented — cross-referenced with real-world locations.

She opens Google Earth. Types in coordinates from a map she drew six months ago — a fictional island off the coast of Norway.

The satellite image loads.

THE ISLAND IS THERE.

Small. Rocky. Exactly the shape she drew.

MAREN
(staring)
It wasn't there before. I checked. It wasn't there.

Her phone rings. Unknown number.

MAREN (CONT'D)
Hello?

VOICE (O.S.)
(calm, precise)
Ms. Sol. We've been watching your work with great interest. The places you create — they're remarkable.

MAREN
Who is this?

VOICE (O.S.)
Someone who understands what you can do. And someone who'd like to commission a map.

MAREN
I don't take commissions.

VOICE (O.S.)
Not even for a city that doesn't exist yet? One that, once you draw it... will?

Long silence.

VOICE (O.S.) (CONT'D)
Think about it. We'll be in touch.

The line goes dead.

Maren sits in the dark office, surrounded by maps of impossible places that have become terribly, undeniably real.

FADE TO BLACK.

---

[DRAFT NOTES: Act Two explores the shadowy organization ("The Surveyors") who have been tracking cartographers with reality-altering abilities throughout history. Maren discovers she's not the first — but the previous ones all disappeared after drawing a specific map: "The Complete City." Act Three: Maren must choose between destroying her gift or drawing the map that could reshape the world — knowing it might unmake her in the process.]`,
  },
  {
    slug: 'silence-between-short',
    title: 'The Silence Between — Short Film',
    genre: 'drama',
    status: 'completed',
    project: 'The Silence Between',
    linkedSlugs: ['isolation', 'kael-voss'],
    synopsis: 'A meditation on loneliness and connection — two strangers share a radio frequency across impossible distance, never knowing if the other is real.',
    content: `FADE IN:

EXT. ARCTIC RESEARCH STATION — NIGHT

Endless white. A small station, half-buried in snow. Wind howls. A single window glows amber.

SUPER: "SVALBARD — 78°N"

INT. ARCTIC STATION — RADIO ROOM — CONTINUOUS

EMIL (45), bearded, weathered, sits before an old shortwave radio. The room is warm — books, coffee, a worn photograph of a family.

He turns the dial. Static. He does this every night.

EMIL
(into mic)
This is Echo-November-Four. Broadcasting on 7.185 megahertz. Is anyone there?

Static.

EMIL (CONT'D)
Day two hundred and twelve. Still here. Still listening.

He reaches for his coffee.

A VOICE crackles through. Faint. Female.

YARA (V.O.)
(through static)
...hello? Is someone...

Emil nearly drops the mug.

EMIL
Yes! Yes, this is Echo-November-Four. I can hear you. Who is this?

YARA (V.O.)
(clearer now)
I'm... my name is Yara. I'm at a research station. I didn't think anyone was on this frequency.

EMIL
Where are you?

YARA (V.O.)
Antarctica. Concordia Station.

Emil laughs — genuine, surprised.

EMIL
You're at the bottom of the world. I'm at the top.

YARA (V.O.)
(a smile in her voice)
Then we're as far apart as two people can be.

Beat.

EMIL
And yet here we are. On the same frequency.

---

MONTAGE — OVER WEEKS

Emil and Yara talk. Every night. Same time.

— They share what they ate for dinner (both: rehydrated soup, different brands).
— They describe their windows (his: snow; hers: ice).
— They argue about whether silence is peaceful or terrifying.
— They read to each other (he reads Chekhov; she reads Mary Oliver).

---

INT. ARCTIC STATION — RADIO ROOM — NIGHT

EMIL
Do you ever wonder if I'm real?

YARA (V.O.)
Every night.

EMIL
And?

YARA (V.O.)
I decided it doesn't matter. Real or not — you're the only voice I have. That makes you real enough.

EMIL
(quietly)
You too.

Silence. But not empty. Full.

---

INT. ARCTIC STATION — RADIO ROOM — LATER (WEEKS ON)

Emil sits at the radio. Turns the dial to 7.185.

EMIL
Yara? It's Emil. You there?

Static.

EMIL (CONT'D)
Yara?

Nothing. He waits. An hour. Two.

Nothing.

---

MONTAGE — DAYS

Emil calls every night. No answer.

He checks satellite weather — massive storm over Antarctica. Concordia Station: no contact.

He sits. Waits. Calls. Waits.

---

INT. ARCTIC STATION — RADIO ROOM — NIGHT (DAY 7 OF SILENCE)

Emil at the radio. Eyes closed.

EMIL
(into mic)
Day seven. I don't know if you can hear me. I don't know if you're alright. But I'm going to keep talking. Because that's what we do. We send signals into the silence and we hope.

He pauses.

EMIL (CONT'D)
I hope you're warm, Yara. I hope you're reading Mary Oliver and drinking bad coffee and looking out at the ice and knowing that someone at the top of the world is thinking about you.

Beat.

EMIL (CONT'D)
Goodnight.

He turns off the mic. Sits in silence.

Then — barely audible — a CLICK. A breath.

YARA (V.O.)
(faint, exhausted)
...goodnight, Emil.

Emil's eyes fill. He doesn't respond. He doesn't need to.

FADE TO BLACK.

TITLE CARD: "The average distance between Svalbard and Concordia Station is 15,950 kilometers."

TITLE CARD: "On shortwave radio, that distance is one turn of a dial."

FADE OUT.`,
  },
  {
    slug: 'folded-city-episode-1',
    title: 'The Folded City — Episode 1: Orientation',
    genre: 'fantasy',
    status: 'draft',
    project: "The Cartographer's Paradox",
    linkedSlugs: ['the-cartographers-paradox', 'maren-sol', 'the-folded-city'],
    synopsis: "A new resident arrives in a city that exists in multiple dimensions simultaneously — and discovers the rules of reality are more like suggestions.",
    content: `COLD OPEN

INT. APARTMENT — UNKNOWN LOCATION — ???

A bare room. White walls. A single door. No windows.

SUKI TANAKA (26) wakes up on the floor. She's wearing clothes she doesn't recognize — a tailored coat, boots that fit perfectly, a watch that runs backwards.

She stands. Checks her pockets. Finds a single item: a CARD.

ON CARD: "Welcome to the Folded City. Your orientation begins now. Please proceed through the door. Do not look behind you."

SUKI
(reading)
"Do not look behind you." Right. Because that's not ominous at all.

She tries the door. It opens onto—

EXT. THE FOLDED CITY — STREET LEVEL — CONTINUOUS

—a street that shouldn't exist. Buildings rise at impossible angles. A river flows UPWARD along a wall. The sky is layered — three different skies stacked like transparencies, each with its own weather.

People walk by as if this is normal. Some of them walk on the walls. One woman strolls casually across the ceiling of a bridge.

SUKI (CONT'D)
(stunned)
What. The. Actual—

A MAN appears beside her. THE GUIDE (ageless, impeccably dressed, speaks like a museum docent who's done this tour ten thousand times).

GUIDE
Suki Tanaka. Welcome. I'm your orientation guide. Please try not to look directly at the Inversion District — your eyes aren't calibrated yet.

SUKI
My eyes aren't— Where am I?

GUIDE
The Folded City. A place that exists in the creases of other places. Think of reality as a piece of paper. Most cities exist on the surface. We exist in the folds.

SUKI
That's insane.

GUIDE
(pleasantly)
That's geometry. Shall we begin the tour?

TITLE CARD: THE FOLDED CITY — EPISODE 1: ORIENTATION

---

ACT ONE — THE RULES (SUCH AS THEY ARE)

EXT. CENTRAL PLAZA — CONTINUOUS

The Guide walks. Suki follows, overwhelmed. The plaza is circular — or appears to be. When Suki walks its perimeter, she ends up on a different level.

GUIDE
Rule one: space is a suggestion. Streets may rearrange based on foot traffic patterns, emotional resonance of pedestrians, and the current phase of the Underlayer.

SUKI
The Underlayer?

GUIDE
The city beneath the city. Every fold has two sides. You're on the Overlayer now. The Underlayer is... different.

SUKI
Different how?

GUIDE
(pause)
Quieter. We'll get to that.

They pass a building that appears to be a library — but the books are floating, rearranging themselves on shelves that extend into dimensions Suki can't quite perceive.

GUIDE (CONT'D)
Rule two: objects have memory. Everything in the Folded City remembers where it's been and who's touched it. That coat you're wearing? It's had forty-seven previous owners. It remembers all of them.

Suki looks at the coat with new unease.

SUKI
Can it... think?

GUIDE
Not think, exactly. But it has preferences. If it starts pulling you in a direction — follow it. It usually knows best.

---

EXT. THE THRESHOLD MARKET — LATER

An open-air market where vendors sell things that don't quite make sense: bottled memories, maps of places that move, clocks that tell you when instead of what time.

GUIDE
Rule three: commerce here is based on significance, not currency. You trade in meaning. A childhood memory is worth more than gold. A genuine secret can buy you a house.

SUKI
What if you run out of memories?

GUIDE
(gently)
Then you become part of the city. The buildings need residents. The streets need walkers. The folds need weight.

Suki stops.

SUKI
You're saying people become... architecture?

GUIDE
Only the ones who stay too long and give too much. Most residents maintain a healthy balance.

SUKI
And the ones who don't?

The Guide points to a building with a particularly beautiful facade. Carved into the stone, almost invisible — a FACE. Eyes open. Mouth frozen mid-word.

GUIDE
She was a poet. Gave away every verse she'd ever written for a view of the Seventh Sky. Beautiful view, by the way. But the last poem was her name. After that...

He gestures at the building.

GUIDE (CONT'D)
Rule four: never trade your name. Everything else is negotiable.

SMASH TO BLACK.

[DRAFT — Episodes 2-6 outlined. Episode 2: Suki discovers the Underlayer and meets its inhabitants — people who chose to live in the folds' shadow. Episode 3: Her coat leads her to a door that opens onto her own past.]`,
  },
];

export const scriptsBySlug = new Map(scripts.map(s => [s.slug, s]));

export const allGenres: ScriptGenre[] = ['sci-fi', 'drama', 'thriller', 'horror', 'fantasy'];
export const allStatuses: ScriptStatus[] = ['draft', 'in-progress', 'completed'];