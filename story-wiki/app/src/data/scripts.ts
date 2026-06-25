export type ScriptStatus = 'draft' | 'in-progress' | 'completed';
export type ScriptGenre = 'sci-fi' | 'drama' | 'thriller' | 'horror' | 'fantasy' | 'spy-thriller';
export type ScriptContentMode = 'screenplay' | 'treatment';

export interface Script {
  slug: string;
  title: string;
  genre: ScriptGenre;
  status: ScriptStatus;
  project: string;        // related story/project name
  linkedSlugs: string[];  // wiki page slugs
  synopsis: string;
  content: string;        // screenplay text (unused when contentMode is 'treatment')
  contentMode?: ScriptContentMode;  // default: 'screenplay'
  proseSlug?: string;     // links to ProseWork slug in prose-generated.ts
}

export const genreLabels: Record<ScriptGenre, string> = {
  'sci-fi': 'Sci-Fi',
  drama: 'Drama',
  thriller: 'Thriller',
  horror: 'Horror',
  fantasy: 'Fantasy',
  'spy-thriller': 'Spy Thriller',
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

export const allGenres: ScriptGenre[] = ['sci-fi', 'drama', 'thriller', 'horror', 'fantasy', 'spy-thriller'];

export const allStatuses: ScriptStatus[] = ['draft', 'in-progress', 'completed'];

export const scripts: Script[] = [
  {
    slug: '007-spy-treatment',
    title: '007: Spy Continue',
    genre: 'spy-thriller',
    status: 'in-progress',
    project: '007-Spy',
    linkedSlugs: ['007-spy', '007-spy-world', '007-spy-timeline'],
    synopsis: 'A former Indian intelligence operative — erased by the state, presumed dead across three continents — resurfaces from the margins of the world to protect the one person who still remembers his name, before the people who buried him find out he\'s still breathing.',
    content: `# Act 1: Origins & Recruitment

### Sequence 1: Childhood & Early Trauma
**Scene 1: Village Life Before Chaos**
- Description: Peaceful rural India, children playing, protagonist as a young boy.
- Camera: Wide establishing shots, slow pan across village.
- AI Prompt: “Peaceful Indian village morning, children playing, rural homes, sunlight, cinematic style.”
- Tools: MidJourney (background), Nano Banana (protagonist)

**Scene 2: Attack on Village**
- Description: Sudden fire and explosions, villagers fleeing, protagonist hiding.
- Camera: Shaky handheld, close-ups of flames and debris.
- AI Prompt: “Village under attack, fire and chaos, people running, protagonist hiding, cinematic intensity.”
- Tools: Higgsfield (action), Perplexity (short dramatic clip)

**Scene 3: Escape and Survival**
- Description: Protagonist alone in wilderness, wounded, evading enemies.
- Camera: Tracking shots through forest, low angles, suspenseful tension.
- AI Prompt: “Young man wounded, running through dense forest at dusk, shadows, tense atmosphere.”
- Tools: Higgsfield, Nano Banana

### Sequence 2: Teenage Years & College
**Scene 4: College Arrival**
- Description: Protagonist at campus, meeting male and female friends.
- Camera: Medium shots, campus life, close-ups on interactions.
- AI Prompt: “University campus, young adults walking, protagonist observing, male and female friends introduced, bright sunny day.”
- Tools: Nano Banana, MidJourney

**Scene 5: College Romance Scenes**
- Description: Subtle interactions, laughs, shared moments between protagonist & female friend.
- Camera: Close-ups, over-the-shoulder, tracking dialogue.
- AI Prompt: “College romance, smiling couple, subtle gestures, warm lighting, cinematic style.”
- Tools: Nano Banana

**Scene 6: War Recruitment Call**
- Description: Draft notice, emotional farewell to female friend, training begins.
- Camera: Medium shots, montage of preparation.
- AI Prompt: “Young men receiving military draft call, emotional goodbyes, protagonist preparing for war.”
- Tools: Perplexity, Nano Banana

**Scene 7: First Combat Mission**
- Description: Battlefield scenes, brotherhood bond with male friend.
- Camera: Wide shots, intense action, explosions.
- AI Prompt: “Battlefield action, young soldiers fighting, explosion, camaraderie, cinematic realism.”
- Tools: Higgsfield

**Scene 8: Male Friend’s Sacrifice**
- Description: Heroic death of male friend, protagonist in shock.
- Camera: Slow-motion, close-ups of emotional reactions.
- AI Prompt: “Soldier sacrifices himself in battlefield explosion, protagonist witnessing, tears, dramatic lighting.”
- Tools: Perplexity, Nano Banana

**Scene 9: RAW Recruitment Offer**
- Description: Secretive recruitment, identity erased, protagonist signs up.
- Camera: Tight shots of briefings, ominous lighting.
- AI Prompt: “Confidential RAW recruitment office, high-security briefing, protagonist accepting mission, shadows and suspense.”
- Tools: Higgsfield, Nano Banana

---

## Act 2: Adulthood Missions

### Sequence 3: Early RAW Operations
**Scene 10: Training Montage**
- Description: Combat, stealth, hand-to-hand, gun exercises.
- Camera: Dynamic montage, multiple angles, quick cuts.
- AI Prompt: “Intense combat training montage, young agent learning hand-to-hand and firearms, cinematic style.”
- Tools: Nano Banana, Perplexity

**Scene 11: Middle East Mission Briefing**
- Description: Protagonist analyzing maps, high-stakes planning.
- Camera: Overhead map shots, close-ups on protagonist’s face.
- AI Prompt: “Military briefing room, agent planning covert operation, maps, tense atmosphere.”
- Tools: MidJourney (background), Nano Banana (characters)

**Scene 12: Execution of Covert Mission**
- Description: Desert terrain, stealth infiltration, firefights.
- Camera: Tracking shots, aerial drone views.
- AI Prompt: “Covert mission in Middle East desert, night infiltration, stealth and combat, cinematic action.”
- Tools: Higgsfield, Perplexity

**Scene 13: Betrayal / Ambush**
- Description: Enemy traps, protagonist escapes.
- Camera: Close-ups, handheld shaky shots, tension.
- AI Prompt: “Ambush in desert, protagonist narrowly escapes, explosions, cinematic suspense.”
- Tools: Higgsfield, Nano Banana

### Sequence 4: International Connections
**Scene 14: American Marshal Introduction**
- Description: Battleship, protagonist helps Stallone-inspired character.
- Camera: Wide shots of battleship, close-ups on heroic rescue.
- AI Prompt: “US battleship, American marshal rescued by protagonist, cinematic heroism, ocean background.”
- Tools: Higgsfield, Nano Banana

**Scene 15: Return Favor Setup**
- Description: Marshal in office, secret assistance planning.
- Camera: Medium shots, tense dialogue, high-ranking office.
- AI Prompt: “High-ranking US officer planning secret assistance, protagonist visible in background, cinematic suspense.”
- Tools: Nano Banana, MidJourney

**Scene 16: Protagonist Rogue in America**
- Description: Underground movement, avoiding nations.
- Camera: Urban night shots, shadows, surveillance cameras.
- AI Prompt: “Protagonist moving through underground America, avoiding detection, night city streets, cinematic noir.”
- Tools: Higgsfield, MidJourney

**Scene 17: Capture by US Government**
- Description: High-security prison, interrogation.
- Camera: Tight cell shots, low lighting, tension.
- AI Prompt: “Protagonist captured by US authorities, interrogation room, tense atmosphere, cinematic lighting.”
- Tools: Higgsfield, Nano Banana

**Scene 18: Mafia Extradition Arrival**
- Description: Indian mafia in American prison, observing protagonist.
- Camera: Close-ups, slow pan on mafia figure, tense atmosphere.
- AI Prompt: “Powerful Indian mafia in American prison, watching protagonist, cinematic shadows, tense vibe.”
- Tools: Nano Banana, Higgsfield

### Sequence 5: Prison Tensions
**Scene 19: Initial Prison Observation**
- Description: Subtle power dynamics, protagonist blending in.
- Camera: Wide shots of cell blocks, medium shots for confrontations.
- AI Prompt: “High-security prison interior, protagonist observing, mafia noticing, tense atmosphere.”
- Tools: Higgsfield, Nano Banana

**Scene 20: Prison Riot / Strength Test**
- Description: Clashes among prisoners, protagonist shows skill.
- Camera: Fast cuts, close-ups of physical confrontations.
- AI Prompt: “Prison riot, protagonist demonstrating combat skills, mafia noticing, cinematic tension.”
- Tools: Higgsfield, Perplexity

**Scene 21: Information Exchange with Mafia**
- Description: Secret conversation, alliance formed.
- Camera: Medium shots, shadows, low lighting.
- AI Prompt: “Secretive prison exchange between protagonist and mafia, tense plotting, cinematic shadows.”
- Tools: Nano Banana

**Scene 22: Legal Bail / Illusion of Freedom**
- Description: Staged courtroom release, secret communication.
- Camera: Wide courtroom shots, subtle focus on protagonist.
- AI Prompt: “Courtroom scene, staged bail release, subtle hints of secret escape, cinematic tension.”
- Tools: Perplexity, Nano Banana

---

## Act 3: London Shadows

### Sequence 6: Female Friend’s Life in London
**Scene 23: Female Friend’s Arrival in London**
- Description: She works undercover, blending into global investigative work.
- Camera: Wide aerial establishing of London; medium shots of her moving through crowded streets.
- AI Prompt: “London cityscape, MI6-style atmosphere, Indian intelligence agent undercover, modern espionage vibe.”
- Tools: MidJourney (city), Nano Banana (character)

**Scene 24: Indian Officer Begins Suspicions**
- Description: Officer digging into her past, noticing college overlap with protagonist.
- Camera: Medium close-ups of officer reading files, over-the-shoulder shots on documents.
- AI Prompt: “Government office, officer reviewing redacted files, suspicious expression, cinematic suspense.”
- Tools: Perplexity (short narrative clip), MidJourney

**Scene 25: Yacht Party Setup**
- Description: Glamorous yacht party filled with diplomats; secretly set up as trap.
- Camera: Wide glamorous establishing shot, slow pan to hidden basement goons.
- AI Prompt: “Luxury yacht party on Thames, diplomats mingling, hidden danger below deck.”
- Tools: MidJourney (luxury yacht), Higgsfield (tension build-up)

**Scene 26: Yacht Collapse Begins**
- Description: Chaos as yacht leans, female friend in danger.
- Camera: Handheld shots, tilted frames, water splashing.
- AI Prompt: “Luxury yacht suddenly topples, panic, passengers screaming, cinematic action.”
- Tools: Higgsfield, Perplexity

**Scene 27: Protagonist Secretly Intervenes**
- Description: He eliminates goons, rescues her unseen, jumps into river.
- Camera: Close-ups of silent takedowns, POV through protagonist’s eyes, underwater escape.
- AI Prompt: “Espionage-style stealth kills, protagonist disguised, river escape, female survivor confused.”
- Tools: Higgsfield (stealth fight), Nano Banana (character movements)

---

### Sequence 7: Tension Escalates
**Scene 28: Officer Tightens Investigation**
- Description: Gives her redacted files that hint towards protagonist’s survival.
- Camera: Close-ups on her reading, eyes widening in disbelief.
- AI Prompt: “Female officer reading secret file, shocked expression, cinematic dramatic lighting.”
- Tools: Nano Banana, MidJourney

**Scene 29: Her Suspicion Grows**
- Description: She recognizes behavioral patterns; emotional internal struggle.
- Camera: Soft lighting, over-the-shoulder diary-style shots.
- AI Prompt: “Female protagonist in candlelit room, reviewing notes, connecting dots, deep in thought.”
- Tools: Perplexity (emotional clip), Nano Banana

---

## Act 4: Breakout & Reunion

### Sequence 8: RAW London Building Assault
**Scene 30: Protagonist Plans Infiltration**
- Description: Silent prep, weapons ready, urban shadow infiltration.
- Camera: Tracking low-light shots, montage of gear-up.
- AI Prompt: “Espionage infiltration at night, London RAW building, protagonist gearing up with weapons.”
- Tools: Higgsfield, MidJourney

**Scene 31: Silent Entry**
- Description: Initial stealth takedowns, floor by floor.
- Camera: Low-angle shots, dark corners, muffled sounds.
- AI Prompt: “Dark espionage sequence, protagonist silently taking down guards, cinematic noir.”
- Tools: Higgsfield, Nano Banana

**Scene 32: Chaotic Inner Assault**
- Description: From stealth to open firefights in inner layers.
- Camera: Rapid cuts, explosions, handheld camera style.
- AI Prompt: “Intense gunfight inside high-security building, explosions, chaos, cinematic action.”
- Tools: Higgsfield (combat), Perplexity (explosive clip)

**Scene 33: Reunion with Female Friend**
- Description: He reaches her; she points gun at him, torn between duty and emotion.
- Camera: Extreme close-ups, shaky cam, protagonist walking into gunpoint.
- AI Prompt: “Woman pointing gun at man she thought dead, disbelief, cinematic close-up.”
- Tools: Nano Banana, Higgsfield

**Scene 34: Trust Test**
- Description: Protagonist pushes her back against wall, puts gun to his own forehead.
- Camera: Tight claustrophobic shots, emotional tension.
- AI Prompt: “Tense standoff, woman against wall, man pressing gun to own forehead, cinematic drama.”
- Tools: Perplexity (emotional), Nano Banana

**Scene 35: Officer Watches on CCTV**
- Description: Indian officer doubts himself watching feed, cuts connection.
- Camera: Split-screen style—control room vs live CCTV.
- AI Prompt: “Government officer in dark CCTV room, suspicious, switching off monitors.”
- Tools: MidJourney, Perplexity

**Scene 36: Building Detonation Trick**
- Description: Protagonist disables CCTV/detonation, escapes with her, detonates remotely later.
- Camera: Wide shot of explosion from outside, cut to shadows disappearing.
- AI Prompt: “Massive London government building explosion, fiery blast, two shadows vanish into night.”
- Tools: Higgsfield (explosion), Perplexity (destruction clip)

---

### Cliffhanger Ending
**Scene 37: Aftermath**
- Description: World assumes they are dead; intelligence agencies scramble.
- Camera: News broadcasts, cutaway montages, city panic.
- AI Prompt: “Global news coverage montage, breaking news of blast, agencies in confusion.”
- Tools: Perplexity (montage), MidJourney

**Scene 38: Shadow Flight**
- Description: Protagonist and female friend boarding secret jet, destination unknown.
- Camera: Low-lit runway shots, silhouettes boarding plane.
- AI Prompt: “Two silhouettes boarding secret jet at night, cinematic mystery, noir style.”
- Tools: Nano Banana, MidJourney

**Scene 39: Final Cliffhanger**
- Description: No answer where they are heading—Russia, China, Iran, or elsewhere.
- Camera: Wide aerial shot of plane disappearing into stormy sky.
- AI Prompt: “Shadow plane flying into storm clouds at night, destination unknown, cinematic cliffhanger.”
- Tools: Higgsfield, Perplexity`,
    contentMode: 'screenplay',
    proseSlug: '007-spy-treatment',
  },
  {
    slug: 'the-lost-cafe-draft',
    title: 'The Lost Café',
    genre: 'thriller',
    status: 'draft',
    project: 'The Lost Cafe',
    linkedSlugs: ['the-lost-cafe', 'memory-and-alternate-realities', 'love-and-loss'],
    synopsis: 'A man paralyzed by grief for five years begins experiencing vivid dreams of a happier alternate life. But the connection is bidirectional—and the alternate life can reach him too.',
    content: `FADE IN:

EXT. CITY STREET — DAY (PRESENT REALITY)

Gray skies. Drizzling rain. The city feels muted, almost entirely drained of color. 

ARIAN (32) walks with his head down. Shoulders slumped. He wears a faded coat that has seen better days. Every step looks heavy, tied down by an invisible weight.

SUPER: "IT HAS BEEN FIVE YEARS."

INT. ARIAN's APARTMENT — NIGHT

Arian sits on a worn-out couch. The apartment is messy, stacked with unopened mail and stale takeout boxes. He stares at a blank television screen.

He closes his eyes.

FADE TO:

INT. A BRIGHT KITCHEN — MORNING (DREAM / ALTERNATE REALITY)

Sunlight streams through large windows. The smell of fresh coffee fills the room. 

Arian (Alternate) is at the stove, laughing. He looks healthier. Alive. 

At the table sits MAYA (30), vibrant and smiling, holding a mug.

MAYA
You're going to burn the eggs again, aren't you?

ARIAN (ALT)
(grinning)
I call it 'caramelized', actually. It's a culinary technique.

They share a warm, lingering look. The air is thick with deep, comfortable love.

SMASH CUT TO:

INT. ARIAN's APARTMENT — NIGHT (PRESENT REALITY)

Arian jolts awake, gasping for air. The desolate silence of his real apartment crashes down on him. 

He rubs his chest, feeling a phantom ache. 

ARIAN
(whispering)
Maya...

---

ACT ONE

INT. THERAPIST'S OFFICE — DAY

Arian sits across from DR. ELLIS (50s, patient but firm). 

DR. ELLIS
The dreams are getting more vivid, Arian. You've been stuck in this cycle for five years. 

ARIAN
It doesn't feel like a dream, Doc. It feels... continuous. Like I'm just looking through a window into a life where I didn't let her get into that car.

DR. ELLIS
Grief creates powerful illusions. Your mind is trying to give you the closure you couldn't get in reality.

ARIAN
(shaking his head)
Yesterday, in the dream, I burned my hand on the stove. 

Arian rolls up his sleeve. There is a fresh, red burn mark on his wrist.

Dr. Ellis stares at it, hiding her shock.

DR. ELLIS
A psychosomatic response. It happens in extreme PTSD cases.

ARIAN
I can feel her, Doc. I can feel the warmth of the coffee mug. I can smell the rain on her jacket. It's real.

---

INT. ARIAN'S APARTMENT / BEDROOM — NIGHT

Arian lies in bed, staring at the ceiling. He closes his eyes, trying to force the sleep, force the connection.

FADE TO:

EXT. THE LOST CAFE — EVENING (ALTERNATE REALITY)

A cozy, warmly lit cafe on a bustling street. Rain taps against the window, but inside, it's safe. 

Arian (Alt) and Maya sit in a booth. They are arguing, but it's low-stakes, domestic. 

MAYA
You can't just quit your job without a backup plan, Arian. 

ARIAN (ALT)
I'm suffocating there, Maya! I need to do something that actually matters.

As Arian (Alt) speaks, he suddenly FREEZES. His eyes glaze over.

For a brief, terrifying second, our Arian's consciousness bleeds into Arian (Alt). 

Arian (Alt) looks around the cafe, panicked, breathing heavily. He looks at Maya as if he hasn't seen her in five years.

ARIAN (ALT / OUR ARIAN)
(voice breaking)
Maya...? You're here. You're actually here.

Maya looks confused, then concerned.

MAYA
What is wrong with you?

Suddenly, Arian (Alt) blinks rapidly. Our Arian's consciousness snaps back out. Arian (Alt) shakes his head, disoriented, having no memory of the last thirty seconds.

ARIAN (ALT)
I... I'm sorry. I just zoned out. What was I saying?

Maya looks at him, deeply unsettled. The crack between realities has opened.

---

ACT TWO

INT. ARIAN'S APARTMENT — MORNING (PRESENT REALITY)

Arian wakes up. He feels different. Energized, but deeply terrified. 

He goes to his bathroom mirror. Leans in close. 

He splashes water on his face. When he looks up—

The reflection is NOT moving with him. 

The reflection—Arian (Alt)—is staring back at him with pure hatred.

REFLECTION (ARIAN ALT)
Stay out of my head. You're ruining my life.

Our Arian stumbles backward, crashing into the shower door. Heart pounding. He looks back at the mirror. It's just a normal reflection again.

---

EXT. CITY STREET — DAY (PRESENT REALITY)

Arian walks quickly, looking over his shoulder. The gray world around him seems to glitch. 

Neon signs flicker with colors from the alternate reality. A passing stranger momentarily wears Maya's face. 

The boundaries are collapsing. 

INT. THERAPIST'S OFFICE — DAY

Arian paces frantically. 

ARIAN
He's angry. The other me. He doesn't want me there. Our argument... my intrusion caused a fight between him and Maya. 

DR. ELLIS
Arian, listen to yourself. You are externalizing your own guilt and anger onto a fabricated version of yourself.

ARIAN
NO! You don't understand! He's fighting back!

Arian suddenly clutches his head, dropping to his knees. 

FADE TO:

INT. ARIAN (ALT)'S APARTMENT — NIGHT (ALTERNATE REALITY)

Arian (Alt) is pacing, furious. Maya is packing a bag.

MAYA
I can't do this anymore, Arian. The mood swings, the memory lapses... you're obsessing over this dark feeling, this presence you claim is in your head. It's destroying us.

ARIAN (ALT)
(desperate)
Maya, please. It's not me! It's HIM! He's poison, and he's leaking into my mind—

MAYA
Listen to yourself! You need help. Real help. I'm going to my sister's.

She walks out the door. 

Arian (Alt) stands alone in the sudden silence. His sadness rapidly hardens into a cold, murderous resolve.

He looks into the hallway mirror. 

ARIAN (ALT)
(to the mirror)
You took her from me. You jealous, broken parasite. If you want to switch places so badly... come and get me.

---

ACT THREE

[WRITER'S NOTE: DRAFT ENDS HERE - CLIMAX PENDING.
To be developed: The confrontation across dimensions. Does our Arian let go to save the alternate Maya's relationship? Or does the alternate Arian try to permanently force our Arian into submission?]`,
  }
];export const scriptsBySlug = new Map<string, Script>(scripts.map(s => [s.slug, s]));
