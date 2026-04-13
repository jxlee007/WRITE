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

export const allGenres: ScriptGenre[] = ['sci-fi', 'drama', 'thriller', 'horror', 'fantasy'];

export const allStatuses: ScriptStatus[] = ['draft', 'in-progress', 'completed'];

export const scripts: Script[] = [
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
];export const scriptsBySlug = scripts.reduce((acc, script) => { acc[script.slug] = script; return acc; }, {} as Record<string, Script>);
