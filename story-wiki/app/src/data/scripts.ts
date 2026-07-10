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
    slug: 'civil-ser-vant-pilot-script',
    title: 'Civil Ser-vant: Transit Hub Encounter (Comic Story Beat)',
    genre: 'sci-fi',
    status: 'completed',
    project: 'Civil Ser-vant',
    linkedSlugs: ['civil-ser-vant'],
    synopsis: 'A youth awakening with experimental neural firmware steps out of a rusted service door into a mag-line platform, navigating the security patrols of an omnipresent AI mesh.',
    content: `# CIVIL: Pilot Episode Comic Story Beat

## "Transit Hub Encounter" — Acts, Panels & Motion Tags


***

## ACT I: AWAKENING & ARRIVAL (Pages 1–3)

### Beat 1.1 — Lab Exit (Page 1, Panels 1–3)

**Panel 1: Wide Establishing Shot**

- **Description:** The Awakened steps out of a rusted service door into the mag-line platform. Neon signs flicker; crowds flow like liquid metal.
- **Motion Tags:** \`CAMERA: Slow pan right following protagonist\` | \`CHARACTER: Staggered step, hand shielding eyes from neon glare\`
- **Camera Angle:** Low-angle worm's-eye view to emphasize vertical scale of Upstack architecture.
- **Speech Bubble:** None. Use internal monologue caption top-left: *"So much... order. Every movement tracked."*
- **Eye Flow:** Left-to-right sweep across panel, following protagonist's gaze upward to towering mag-lines.

![Act I Beat 1.1 Panel 1: Establishing Shot | w-full | center](../../../../../../assets/civil/A1-P1.png)

**Panel 2: Medium Shot — Protagonist's Face**

- **Description:** Close-up on Awakened's eyes, reflecting Decree overlay UI in irises.
- **Motion Tags:** \`CAMERA: Push-in zoom\` | \`CHARACTER: Eyes widen, pupils dilate as firmware flickers\`
- **Camera Angle:** Extreme close-up, slight Dutch tilt to convey disorientation.
- **Speech Bubble:** Assistant's encrypted text box (holographic style) bottom-right: \`"You're standing out. Move."\`
- **Eye Flow:** From eyes to text box, creating connection between perception and guidance.

![Act I Beat 1.1 Panel 2: Protagonist Face | 350px | center](../../../../../../assets/civil/A1-P2.png)

**Panel 3: Wide Shot — Platform Crowd**

- **Description:** AAA Triplets patrol overhead; citizens move in synchronized patterns. Awakened is small figure in lower third.
- **Motion Tags:** \`CAMERA: Static, slight vertical pan up to drones\` | \`CHARACTER: Awakened hunches shoulders, mimics crowd pace\`
- **Camera Angle:** High-angle bird's-eye view showing crowd flow patterns.
- **Speech Bubble:** Decree announcement banner across top: \`"DEVICE QUIET HOURS: 00:23 REMAINING"\`
- **Eye Flow:** Circular motion: protagonist → drones → crowd → back to protagonist.

![Act I Beat 1.1 Panel 3: Platform Crowd | w-full | center](../../../../../../assets/civil/A1-P3.png)

***

## ACT II: NAVIGATION & PERCEPTION (Pages 4–6)

### Beat 2.1 — Protocol Window Awareness (Page 4, Panels 1–3)

**Panel 1: Medium Shot — Awakened at Kiosk**

- **Description:** Awakened studies a weathered transit map; a CCC drone passes in background.
- **Motion Tags:** \`CAMERA: Slow zoom-out as drone approaches\` | \`CHARACTER: Fingers tracing map, head turning to track drone\`
- **Camera Angle:** Over-shoulder shot, slightly elevated to show both map and approaching threat.
- **Speech Bubble:** Internal monologue caption: \`"Patterns. I can see them now. Gaps in the rhythm."\`
- **Eye Flow:** Map → drone → Awakened's hand → back to map (puzzle-solving focus).

![Act II Beat 2.1 Panel 1: Awakened at Kiosk | 400px | center](../../../../../../assets/civil/A2-P1.png)

**Panel 2: Split Panel — Dual Perspective**

- **Description:** Left side: Awakened's POV showing patrol cycle timing. Right side: Overhead view of same cycle.
- **Motion Tags:** \`CAMERA: Split-screen wipe transition\` | \`CHARACTER: Awakened crouches slightly, preparing to move\`
- **Camera Angle:** Left: First-person POV with UI overlay. Right: Top-down schematic view.
- **Speech Bubble:** Assistant's text (smaller, urgent): \`"Now. The gap is now."\`
- **Eye Flow:** Left-to-right comparison, then down to Awakened's position.

![Act II Beat 2.1 Panel 2: Split Panel POV | w-full | center](../../../../../../assets/civil/A2-P2.png)

**Panel 3: Wide Action Shot — Movement**

- **Description:** Awakened darts through a narrow gap between two patrol drones, reaching the opposite platform.
- **Motion Tags:** \`CAMERA: Fast pan following movement\` | \`CHARACTER: Dynamic leap, coat billowing\`
- **Camera Angle:** Side-angle tracking shot, motion blur on drones.
- **Speech Bubble:** None. Use speed lines and motion blur.
- **Eye Flow:** Left-to-right chase motion, ending on Awakened's landing pose.

![Act II Beat 2.1 Panel 3: Wide Action Shot | w-full | center](../../../../../../assets/civil/A2-P3.png)

***

## ACT III: THE ENCOUNTER (Pages 7–9)

### Beat 3.1 — Craze Appears (Page 7, Panels 1–3)

**Panel 1: Wide Shot — Platform Benches**

- **Description:** Awakened approaches a corroded bench. Craze is already seated, appearing to doze, but eyes are slightly open.
- **Motion Tags:** \`CAMERA: Static, slow zoom-in on bench\` | \`CHARACTER: Craze's eyes track Awakened subtly\`
- **Camera Angle:** Eye-level shot, slightly off-center to create unease.
- **Speech Bubble:** None. Use subtle visual cue: Badge 007 glinting on sleeve.
- **Eye Flow:** Bench → Craze → Badge → Awakened's reaction.

![Act III Beat 3.1 Panel 1: Platform Benches | 400px | center](../../../../../../assets/civil/A3-P1.png)

**Panel 2: Medium Shot — Eye Contact**

- **Description:** Close-up on Awakened's face, then cut to Craze's face. Their eyes meet for a fraction of a second.
- **Motion Tags:** \`CAMERA: Quick cut between faces\` | \`CHARACTER: Both characters freeze momentarily\`
- **Camera Angle:** Alternating extreme close-ups, slight zoom on each face.
- **Speech Bubble:** Awakened internal monologue: \`"Someone's... looking at me. Not scanning. Seeing."\`
- **Eye Flow:** Awakened's eyes → Craze's eyes → back to Awakened (connection established).

![Act III Beat 3.1 Panel 2: Medium Shot Eye Contact | 350px | center](../../../../../../assets/civil/A3-P2.png)

**Panel 3: Wide Shot — The Nod**

- **Description:** Craze gives a nearly imperceptible nod, then returns gaze to crowd. Awakened is left confused.
- **Motion Tags:** \`CAMERA: Static, hold on nod\` | \`CHARACTER: Craze's head tilts 5 degrees, then returns to neutral\`
- **Camera Angle:** Slightly elevated, showing both characters in frame.
- **Speech Bubble:** Assistant's text (smaller, bottom): \`"Don't linger. Move with purpose."\`
- **Eye Flow:** Craze's nod → Awakened's confusion → Assistant's text (urgency).

![Act III Beat 3.1 Panel 3: Wide Shot The Nod | 400px | center](../../../../../../assets/civil/A3-P3.jpeg)

***

## ACT IV: EXIT & MYSTERY (Pages 10–11)

### Beat 4.1 — Departure (Page 10, Panels 1–2)

**Panel 1: Medium Shot — Awakened Exits**

- **Description:** Awakened walks away from bench, glancing back. Craze remains seated, now appearing to doze again.
- **Motion Tags:** \`CAMERA: Slow pan following Awakened's movement\` | \`CHARACTER: Awakened's head turns, shoulders tense\`
- **Camera Angle:** Rear-view tracking shot, shallow depth of field blurring Craze.
- **Speech Bubble:** Awakened internal monologue: \`"Who was that person? The way they moved..."\`
- **Eye Flow:** Forward motion of Awakened, background focus on Craze fading.

![Act IV Beat 4.1 Panel 1: Awakened Exits | 400px | center](../../../../../../assets/civil/A4-P1.jpg)

**Panel 2: Wide Shot — Platform Exit**

- **Description:** Awakened reaches the exit corridor. In the distance, Craze stands and walks into a side corridor, disappearing.
- **Motion Tags:** \`CAMERA: Wide static shot, split focus\` | \`CHARACTER: Craze's silhouette merges into shadows\`
- **Camera Angle:** Deep focus shot showing both foreground (Awakened) and background (Craze).
- **Speech Bubble:** None. Use motion lines and shadow effects.
- **Eye Flow:** Foreground to background, following Craze's exit.

![Act IV Beat 4.1 Panel 2: Platform Exit | w-full | center](../../../../../../assets/civil/A4-P2.png)

***

## Answers to Your Questions

### **WHAT - PANEL STRUCTURE TO USE ??**

**Recommended Structure:**

- **3-4 panels per page** for pacing balance between action and reflection.
- **Wide establishing shots** for world-building (Pages 1, 3, 10).
- **Medium shots** for character emotion and interaction (Pages 2, 4, 7).
- **Extreme close-ups** for pivotal moments (eye contact, badge reveal).
- **Split panels** for dual perspectives or time-compression (Page 4, Panel 2).

**Motion Tags Implementation:**

- Use \`CAMERA:\` tags for pan, zoom, tilt, and tracking movements.
- Use \`CHARACTER:\` tags for specific gestures, expressions, and movement timing.
- Combine tags for complex sequences (e.g., \`CAMERA: Pan + Zoom\` with \`CHARACTER: Leap\`).

***

### **WHEN & WHERE - CHARACTER WILL APPEAR ??**

**The Awakened:**

- **Page 1, Panel 1:** Emerges from service door (center-left).
- **Page 1, Panel 2:** Close-up face (center).
- **Page 1, Panel 3:** Small figure in crowd (lower third).
- **Page 2, Panel 1:** At kiosk (center-right).
- **Page 2, Panel 2:** Split-screen left side (POV).
- **Page 2, Panel 3:** Dynamic leap (center, moving right).
- **Page 3, Panel 1:** Approaching bench (center-left).
- **Page 3, Panel 2:** Close-up face (center).
- **Page 3, Panel 3:** Walking away (center, moving right).
- **Page 4, Panel 1:** Exiting corridor (center).

**Craze:**

- **Page 3, Panel 1:** Seated on bench (right side, background).
- **Page 3, Panel 2:** Close-up face (right side of split).
- **Page 3, Panel 3:** Nodding (right side of frame).
- **Page 4, Panel 2:** Standing and walking away (background, right side).

***

### **WHICH CAMERA ANGLES TO USE ??**

**Recommended Angles:**

- **Low-angle worm's-eye view** (Page 1, Panel 1): Emphasizes vertical scale and protagonist's smallness.
- **Extreme close-up Dutch tilt** (Page 1, Panel 2): Conveys disorientation and firmware activation.
- **High-angle bird's-eye view** (Page 1, Panel 3): Shows crowd patterns and systemic control.
- **Over-shoulder elevated** (Page 2, Panel 1): Shows both map and approaching threat.
- **First-person POV** (Page 2, Panel 2): Immersive puzzle-solving perspective.
- **Side-angle tracking** (Page 2, Panel 3): Dynamic action and movement.
- **Eye-level off-center** (Page 3, Panel 1): Creates unease and observation tension.
- **Alternating extreme close-ups** (Page 3, Panel 2): Intimate connection between characters.
- **Slightly elevated two-shot** (Page 3, Panel 3): Shows both characters and spatial relationship.
- **Rear-view tracking** (Page 4, Panel 1): Follows protagonist while keeping background in focus.
- **Deep focus wide shot** (Page 4, Panel 2): Shows both foreground and background action clearly.

***

### **WHERE - SPEECH BUBBLE WILL BE PLACED**

**Placement Rules:**

- **Internal monologue captions:** Top-left or top-right, outside panel borders, in smaller italicized font.
- **Assistant's encrypted messages:** Bottom-right, holographic style with glitch effects, connected to protagonist by thin line.
- **Decree announcements:** Top banner across panel, bold sans-serif, official-looking.
- **Character dialogue:** Standard placement near speaker's mouth, following reading order (left-to-right, top-to-bottom).
- **Sound effects:** Integrated into action (e.g., speed lines, motion blur) rather than separate bubbles.

**Specific Placements:**

- Page 1, Panel 1: Caption top-left.
- Page 1, Panel 2: Assistant text bottom-right.
- Page 1, Panel 3: Decree banner top.
- Page 2, Panel 1: Caption top-left.
- Page 2, Panel 2: Assistant text bottom-right.
- Page 2, Panel 3: No bubbles (action only).
- Page 3, Panel 1: No bubbles (visual only).
- Page 3, Panel 2: Caption top-left, then alternating.
- Page 3, Panel 3: Assistant text bottom.
- Page 4, Panel 1: Caption top-left.
- Page 4, Panel 2: No bubbles (visual only).

***

### **HOW EYE/ATTENTION WOULD FLOW THROUGH COMIC PANELS ??**

**Flow Design Principles:**

1. **Z-pattern reading** (left-to-right, top-to-bottom) for standard panels.
2. **Circular motion** for complex panels with multiple focal points.
3. **Diagonal tension** for action sequences.
4. **Convergence points** where multiple elements lead to a single focus.

**Specific Flow Paths:**

**Page 1:**

- Panel 1: Left (protagonist) → Right (mag-lines) → Up (architecture) → Down (back to protagonist) = **circular exploration**.
- Panel 2: Eyes → Caption → Assistant text = **vertical descent**.
- Panel 3: Protagonist → Drones → Crowd = **circular return**.

**Page 2:**

- Panel 1: Map → Drone → Hand = **triangular focus**.
- Panel 2: Left POV → Right schematic = **horizontal comparison**.
- Panel 3: Left-to-right chase = **linear momentum**.

**Page 3:**

- Panel 1: Bench → Craze → Badge = **triangular discovery**.
- Panel 2: Awakened → Craze → Awakened = **alternating connection**.
- Panel 3: Nod → Text = **vertical urgency**.

**Page 4:**

- Panel 1: Forward motion → Background = **depth layering**.
- Panel 2: Foreground → Background = **convergence on exit**.

***

## Summary: Story Beat Structure

**Total Pages:** 11
**Total Panels:** 24
**Reading Time:** ~8-10 minutes
**Key Moments:** Awakening, Decree awareness, Protocol Window mastery, Craze cameo, mystery exit.

**Motion Tags Summary:**

- **Camera movements:** Pan, zoom, tilt, tracking, split-screen, static hold.
- **Character movements:** Stagger, leap, crouch, nod, walk, turn.
- **Timing:** Slow pans for atmosphere, quick cuts for tension, static holds for pivotal moments.

**Eye Flow Summary:**

- **Act I:** Circular exploration → vertical descent → circular return.
- **Act II:** Triangular focus → horizontal comparison → linear momentum.
- **Act III:** Triangular discovery → alternating connection → vertical urgency.
- **Act IV:** Depth layering → convergence on exit.

This structure ensures readers experience the story as a **visual journey** rather than static images, with clear focal points and natural eye movement that mirrors the protagonist's emotional and physical journey.

`,
    contentMode: 'screenplay',
  },
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
