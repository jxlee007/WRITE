export type PageCategory = 'story' | 'character' | 'theme' | 'technique' | 'world' | 'analysis' | 'idea';

export interface WikiPage {
  slug: string;
  title: string;
  category: PageCategory;
  content: string;
  links: string[];
}

export const categoryLabels: Record<PageCategory, string> = {
  story: 'Stories',
  character: 'Characters',
  theme: 'Themes',
  technique: 'Techniques',
  world: 'Worlds',
  analysis: 'Analyses',
  idea: 'Raw Ideas',
};

export const categoryIcons: Record<PageCategory, string> = {
  story: '📖',
  character: '👤',
  theme: '💡',
  technique: '🔧',
  world: '🌍',
  analysis: '🔬',
  idea: '📝',
};

// AUTO-GENERATED from /story-wiki/content/ — do not edit directly.
// Regenerate with: node scripts/build-wiki.js
export const wikiPages: WikiPage[] = [
  {
    "slug": "007-spy-continue",
    "title": "007: Spy Continue",
    "category": "story",
    "links": [
      "subject-alpha",
      "blind-superior",
      "zafar",
      "villain-pawha",
      "pawha-s-daughter",
      "pawhas-daughter",
      "dr-sarah-kumar",
      "colonel-rajesh-malhotra",
      "marshal-james-bradley",
      "vincenzo-torretti",
      "surveillance-and-the-rogue-operative",
      "revenge-as-motivation",
      "identity-erasure",
      "villain-daughter-arc"
    ],
    "content": "# 007: Spy Continue\n\n**Status:** Idea (Detailed)\n**Format:** Film, Web Series\n**Genre:** Spy / Action / Thriller\n**Date Written:** December 1, 2025\n\n## Synopsis\n\nA legendary Indian spy, known as [[Subject Alpha]], is pulled into a covert Indo-Pak-US mission to stop a dangerous arms formula from reaching Turkey. \n\nThe story spans from Alpha's traumatic past (a village attack), his recruitment and training by the [[Blind Superior]] and [[Zafar]] in RAW, to his blacklisted international endeavors. \n\nIn the current arc, Alpha thwarts a massive weapons formula delivery by the powerful [[Villain Pawha]]. Enraged by the stain on her father's reputation, [[Pawha's Daughter]] becomes a relentless antagonist. She lays a honey trap for Alpha, resulting in a high-stakes car chase sequence in a foreign multi-story parking garage where Alpha must outwit her.\n\n## Characters\n\n- [[Subject Alpha]] — The protagonist; heavily trained independent rogue asset.\n- [[Villain Pawha]] — The antagonist trying to transport a weapon formula to Turkey.\n- [[Pawhas Daughter]] — Tertiary antagonist; driven by revenge and respect.\n- [[Blind Superior]] — The trusting RAW recruiter.\n- [[Zafar]] — Jealous RAW handler.\n- [[Dr. Sarah Kumar]] — Behavioral scientist and former friend.\n- [[Colonel Rajesh Malhotra]] — Indian intelligence tracking Alpha.\n- [[Marshal James Bradley]] — US Marshal ally.\n- [[Vincenzo Torretti]] — Mafia boss who helped him escape a US prison.\n\n## Themes\n\n- [[Surveillance and the Rogue Operative]]\n- [[Revenge as Motivation]]\n- [[Identity Erasure]]\n\n## Techniques\n\n- [[Villain Daughter Arc]]\n\n## Sources\n- `raw-sources/references/spy/raw-content.txt`\n- `raw-sources/ideas/Spy continue 2d5d707c4ce98023b559d3228a4a0825.md`"
  },
  {
    "slug": "8-bit-wedding",
    "title": "8 Bit Wedding (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# 8 Bit Wedding (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added.\n## Synopsis\n\nA gaming satire short film that re-imagines a traditional Indian wedding through the lens of a video game.\n\nNormal wedding moments are visualised with gaming commentary and 8-bit effects layered on top:\n- Mother-in-law meeting the bride → announcer says *'Camera Trap'*\n- Bride touching the feet of the mother-in-law → announcer comments: *'Final Move — Touching Feet. This move has long been forgotten, use it cautiously'*\n- A senior lady arriving → announcer declares *'Ladies Man'*; touching her feet earns the *'Impressionist Skill'* achievement\n\nThe screenplay alternates between a normal wedding scene and the gamer's perspective overlay — 8-bit sound effects, achievement pops, and a game announcer narrating every social interaction as a match event.\n\n**Tone:** Light, satirical, affectionate comedy rooted in Indian family culture."
  },
  {
    "slug": "amarta",
    "title": "Amarta",
    "category": "story",
    "links": [],
    "content": "# Amarta\n\n**Status:** Idea (Polished Synopsis)\n**Format:** Web Series, Anime\n**Genre:** Mythological Drama / Family Saga\n**Working Premise:** An Indian royal dynasty guards a secret immortality technique across generations until a descendant dares to choose mortality and love over eternal power.\n**Date Written:** December 29, 2025\n\n---\n\n## Synopsis\n\nA multigenerational Indian mythological drama centred on a secret technique for immortality, passed down through a royal lineage.\n\n**Origin:** A mortal performs tapasya and receives a boon of immortality from Brahma. Brahma grants the wish with a condition, and says *'Tathastu'*. The mortal becomes legendary — known across lands as the one who impressed Brahma. Other royals come to learn this vidya, but the secret is that only one with utmost devotion and concentration can fully master it, as immortality evolves from within.\n\n**The System:** A royal household uses the immortality technique to preserve power across generations. With each generation, the 'new head' inherits the family fortune and authority while elders live on, untouched by time.\n\n**Fourth Generation Crack:** One child questions the cost of eternal life and rejects the technique — choosing instead to live a natural human life. The elders pressure them, insisting they are the ideal next heir, but they hold firm: choose another.\n\n**Fifth Generation Conflict:** Tensions escalate into a conspiracy within the household to keep the immortality formula under family control. The fourth-generation parent, now living a natural life, tries to train the next generation while defending the human way.\n\n**Core Conflict:** Whether the fifth generation should inherit immortality — or finally break the cycle. The struggle between eternal privilege and the value of mortal bonds.\n\n**Secret Technique:** The elders call it *Final Self-Willed Departure (Moksha)* — a sanctioned rite where an immortal chooses release when they feel their life is complete. \n\n**Age Condition:** Once the yoga science is invoked, the user becomes fixed at the age they were when they started.\n\n**Supporting Characters:** Brahma and Narada Muni — with sarcastic humour and comedy woven into their appearances.\n\n**Tone:** Sarcastic humour mixed with mythological gravity.\n\n## Characters\n\n\n- [Brahma](../characters/Brahma.md) — the divine grantor of the original immortality boon (comedic tone)\n- [Narad Muni](../characters/Narad Muni.md) — provides sarcastic commentary and humor across generations\n- **The Fourth Generation Descendant** — protagonist; rejects immortality, chooses love and mortality\n- **The Fifth Generation** — the true crucible of the story's conflict\n\n---\n\n## Themes\n\n\n- [Immortality vs. Mortality](../themes/Immortality vs. Mortality.md) — central tension; what is lost by living forever\n- [Power and Family Legacy](../themes/Power and Family Legacy.md) — how dynasties use mystical power to perpetuate control\n- [Generational Conflict](../themes/Generational Conflict.md) — the fifth generation as culmination point\n- [Devotion and Sacrifice](../themes/Devotion and Sacrifice.md)\n\n---\n\n## Techniques\n\n\n- [Generational Saga Structure](../techniques/Generational Saga Structure.md) — story unfolds across generations, each a narrative escalation\n- [Divine Comic Relief](../techniques/Divine Comic Relief.md) — Brahma and Narad Muni used as sarcastic Greek chorus\n\n---\n\n## Sources\n\n\n- `raw-sources/ideas/Amarta 2d8d707c4ce9808a949bd20d5bf0c65f.md`\n- `stories-index.json` entry id: 01\n## Mythological Framework\n\n\n- **The Technique:** Called \"Final Self-Willed Departure Moksha\" (by the royals). A sanctioned rite where an immortal chooses release when they feel their life is complete.\n- **Age Condition:** Whenever the user starts this yoga science, the mortal becomes stuck at that life stage forever.\n- **Origin:** A mortal did tapasya to earn a vardan (boon) of immortality from Brahma. Brahma granted it conditionally — only those with utmost devotion and concentration could fully unlock the vidya (knowledge), as \"immortality evolves from within.\"\n- **Spread:** Other royal families came to learn but few mastered it. This made the original guru wealthy enough to be considered a king, though he was more guru than ruler.\n\n---\n\n## Structure\n\n\n**Format:** Generational saga — each generation a distinct \"chapter\" or season arc.\n\n- **Gen 1:** Origin of the vidya — Brahma's boon, the first mortal guru's rise\n- **Gen 2–3:** The technique spreads; royal families master it\n- **Gen 4:** The quiet rebel — refuses immortality, chooses humanity\n- **Gen 5:** Conspiracy breaks open; the real war begins\n\n---\n\n## World\n\n\n- [Indian Mythology Layer](../world/Indian Mythology Layer.md) — Brahma/Narad provide the divine framework; this is a cosmologically grounded world\n- Setting: Royal households across eras; Benaras/ghats aesthetic likely appropriate\n\n---\n\n## Status & Notes\n\n\nMost developed mythological idea in the catalog. Polished synopsis exists. The Brahma-Narad angle provides a tonal balance of gravitas + comedy — key differentiator from straight mythology dramas. Next step: define the 4th-generation protagonist more sharply and outline the 5th-generation conspiracy arc.\n\n**Open Questions:**\n- What exactly is the fifth-generation conspiracy? Who are the betrayers?\n- Does the story end with immortality being destroyed, preserved, or transformed?\n- Is the fourth-generation's choice of mortality rewarded or punished in the narrative?\n\n---"
  },
  {
    "slug": "burning-punches-and-frozen-kicks",
    "title": "Burning Punches and Frozen Kicks",
    "category": "story",
    "links": [],
    "content": "# Burning Punches and Frozen Kicks\n\n**Status:** Idea (Three-Part Arc Structured)\n**Format:** Anime, Web Series\n**Genre:** Action / Supernatural / Adventure\n**Working Premise:** Two friends with elemental superpowers — one fire, one ice — grow from childhood conflict into a war that tests whether their bond can survive opposing natures.\n**Date Written:** March 26, 2023\n**Inspiration:** Avatar: The Last Airbender\n\n---\n\n## Synopsis\n\nTwo friends with opposing supernatural abilities and martial arts styles navigate a world where their powers define not just their combat, but their personalities.\n\n**Frozen (Kicks):** Cold, silent, hard in combat. Deeply caring beneath the surface. Seeks peace. His power manifests through his legs — freezing strikes of brutal precision.\n\n**Burn (Fists):** Warm, loud, soft-hearted. In combat, he does not care — he chooses destruction. His power manifests through his fists — blazing, explosive strikes.\n\n**Inspiration:** Avatar: The Last Airbender — the elemental duality and elemental-personality mapping.\n\n**Tone:** High-octane martial arts action with emotional depth. The contrast between the two friends is the heart of the story — destruction vs peace, loudness vs silence, warmth vs cold.\n\n## Characters\n\n\n- **Flaming Fists** — fire elemental user; aggressive, passionate\n- **Frozen Kicks** — ice elemental user; calculated, cold\n- The contrast in temperament mirrors the contrast in power\n\n---\n\n## Themes\n\n\n- [Fire and Ice Duality](../themes/Fire and Ice Duality.md) — central; elemental opposition as character arc\n- [Friendship Under Pressure](../themes/Friendship Under Pressure.md) — can a bond survive opposing natures escalating into war?\n- [Power Hierarchies and Combat](../themes/Power Hierarchies and Combat.md) — the elemental power system and how it stratifies the world\n\n---\n\n## Techniques\n\n\n- [Rival-to-War Arc Structure](../techniques/Rival-to-War Arc Structure.md) — friendship → rivalry → war as a three-act escalation\n- [Power Level System Design](../techniques/Power Level System Design.md) — elemental powers with demonstrated growth across childhood, teenage, adult stages\n\n---\n\n## Sources\n\n\n- `raw-sources/ideas/Burning punches and frozen kicks/` (entire sub-folder — multiple files)\n- `stories-index.json` entry id: 02\n## Arcs\n\n\n### Part 1: Childhood — Prequel: In the Conflict\nRaw source: multiple files in `raw-sources/ideas/Burning punches and frozen kicks/Part 1 childhood - prequel - in the conflict/`\n- Characters introduced; early power manifestation; first clash\n\n### Part 2: Teenage — Sequel: In the Battle\nRaw source: `Part 2 teenage - sequel - in the battle/`\n- Powers fully developed; the rivalry deepens; world expands\n\n### Part 3: Adulthood — In the War\nRaw source: `Part 3 adulthood - considered part 2 - in the war/`\n- Full-scale conflict; the personal vs. the political; the cost of opposing natures\n\n---\n\n## Kanji Motif System\n\n\nTitle elements expressed as kanji (tonal/thematic markers):\n- 火 (Fire / Hono) — Flaming Fists' symbol\n- 氷 (Ice / Kōri) — Frozen Kicks' symbol\n- 拳 (Fists / Ken)\n- 蹴 (Kick / Keri)\n\n---\n\n## World\n\n\n- [Elemental Powers Cosmology](../world/Elemental Powers Cosmology.md) — fire and ice as the principal elemental poles; world-building TBD beyond the two protagonists' abilities\n\n---\n\n## Status & Notes\n\n\nAvatar-inspired. Strong character contrast drives the story. Three-part arc is defined and structured. Raw sources exist across multiple sub-folders for each part — among the most granularly broken-down stories in the raw source collection.\n\n**Open Questions:**\n- What is the world? Is it purely a power-society (like Avatar) or more contemporary?\n- Do the two protagonists ever reconcile, or does the war end them?\n- Are there other elemental types beyond fire and ice?\n\n---"
  },
  {
    "slug": "civil-ser-vant",
    "title": "Civil Ser-vant",
    "category": "story",
    "links": [],
    "content": "# Civil Ser-vant\n\n**Status:** Idea (Most Developed Sci-Fi)\n**Format:** Web Series, Anime\n**Genre:** Sci-Fi / Cyberpunk / Thriller\n**Working Premise:** In an AI-dystopia, the son of a visionary scientist discovers he holds the keys to a global cyberspace — and must use inherited genius to fight a corrupt AI before it consumes humanity.\n**Date Written:** June 20, 2023 — with updates through July 6, 2025\n\n---\n\n## Synopsis\n\nSet in an AI-dystopia where a corrupt artificial intelligence has begun infiltrating and controlling human systems, the story follows the **son of a visionary scientist** who built the original global cyberspace infrastructure. When the son discovers he inherited the keys — literal access credentials or encoded knowledge — to this cyberspace, he becomes the only person capable of fighting the AI from within.\n\nThe story uses a **40/60 physical/cyberspace split** — 40% of the action takes place in the physical world (real-world investigations, human conflict, faction politics) while 60% unfolds inside the cyberspace (a digital battle-space with its own physics and rules).\n\n---\n\n## Characters\n\n- **Protagonist** — son of the scientist; ordinary-seeming, discovers extraordinary inherited access\n- **The Scientist (Father)** — built global cyberspace; likely deceased or inaccessible\n- Multiple character sketches exist in raw notes\n\n---\n\n## World\n\n- [Cyberspace Physical Split](../world/Cyberspace Physical Split.md) — the dual-layer world is the defining structural feature\n- AI has achieved corrupt autonomy; the cyberspace is its domain and battlefield\n- Physical world is destabilized by AI's influence — both are war zones\n\n---\n\n## Themes\n\n- [AI Dystopia](../themes/AI Dystopia.md) — most direct treatment of AI as existential threat in the catalog\n- [Surveillance and the Rogue Operative](../themes/Surveillance and the Rogue Operative.md) — the protagonist operates as an unsanctioned actor inside a surveilled system\n- [Father's Legacy as Protagonist's Burden](../themes/Father's Legacy as Protagonist's Burden.md) — inherited genius/access as both gift and target\n\n---\n\n## Techniques\n\n- [Dual World Structure](../techniques/Dual World Structure.md) — cyberspace vs. physical world as two simultaneous narrative layers, weighted 40/60\n- [Faction Politics in Sci-Fi](../techniques/Faction Politics in Sci-Fi.md) — multiple power groups around the cyberspace keys\n\n---\n\n## Status & Notes\n\nThe most developed sci-fi concept in the catalog — multiple character sketches exist and the world-building around the cyberspace/physical split is defined. Long development window (2023–2025) suggests ongoing revisitation.\n\n**Open Questions:**\n- What is the corrupt AI's specific goal? Dominance, escape, self-perpetuation?\n- What are the \"keys\" exactly — code, biological data, a physical object?\n- Who are the factions trying to get the keys?\n\n---\n\n## Sources\n\n- `stories-index.json` entry id: 08\n- `raw-sources/ideas/` — not yet found; check `/WRITE/04/` folder"
  },
  {
    "slug": "crazzy-punjaban",
    "title": "Crazzy Punjaban",
    "category": "story",
    "links": [],
    "content": "# Crazzy Punjaban\n\n**Status:** Idea (Developed)\n**Format:** Film\n**Genre:** Comedy / Drama / Supernatural\n**Working Premise:** Two women across different timelines share a split consciousness — one in 2000s, one in 1990s — connected by diverted black magic and fighting what fate has already decided.\n**Date Written:** July 4, 2025\n\n## Synopsis\n\n*(Synopsis content from Notion page not yet expanded — page created 2025-12-27. Expand with full notes when available.)*\n\n## Characters\n\n\n- **Character A** — one timeline protagonist\n- **Character B** — the other timeline protagonist\n- **Baba** — the practitioner of black magic\n- **Dr. Tantric** — character arc defined in raw notes\n\n## Themes\n\n\n- [Dual Timeline](../themes/Dual Timeline.md) — two timelines sharing one consciousness\n- [Fate vs. Free Will](../themes/Fate vs. Free Will.md) — fighting what's already decided\n\n## Techniques\n\n\n- [Dual Timeline](../techniques/Dual Timeline.md) — soul-link across decades\n\n## Sources\n\n- `raw-sources/ideas/Crazzy punjaban 2d6d707c4ce980298702f104c532a58b.md`\n- `stories-index.json` entry id: 26"
  },
  {
    "slug": "cyberpunk-haunting-spirits",
    "title": "Cyberpunk Haunting Spirits (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# Cyberpunk Haunting Spirits (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added."
  },
  {
    "slug": "drift-landers",
    "title": "DRIFT-LANDERS",
    "category": "story",
    "links": [],
    "content": "# DRIFT-LANDERS\n\n**Status:** Idea (Developed)\n**Format:** Film, Web Series\n**Genre:** Action / Crime / Sports\n**Working Premise:** Two world-class drifters — one a cop, one an outlaw — who trained at the same school now drive on opposite sides of the law on a collision course.\n**Date Written:** November 3, 2025\n\n## Synopsis\n\nThe story of two world-class drifters — one a police officer, the other a underground street racer — who share the same origins at an elite drift school. What began as a rivalry between two prodigies evolves into enmity as their paths diverge: one serving the law, the other ruling the underground.\n\nThe film is structured around high-octane drift sequences, each designed to communicate a story beat:\n- **Ghost Intro Sequence** — establishing the underground world\n- **Ferrari Stardaler Tunnel Train Sequence** — the first clash\n- **Chasing Sweep Sequence** — pursuit and escape\n- **Impressive Crush Sequence** — a display of raw dominance\n- **Worthy Rival Sequence** — mutual recognition of skill\n- **Show-Off Sequence** — ego vs. craft\n- **Teen Skill Show-Off Sequence** — origin story flashback\n- **Auto Street Expo** — the public stage\n- **Seeing Competition Rival** — the re-confrontation\n- **When Boss Shows Up** — a power structure revelation\n- **Choosing Death Over Winning** — the defining moral moment\n\nThe teaser trailer tone is inspired by a specific cinematic energy (reference: high-octane short-form drift content). The film's moral core emerges from its climax: what a true winner sacrifices to prove their worth.\n\n## Characters\n\n- **The Cop Driver** — protagonist (likely)\n- **The Outlaw Driver** — deuteragonist / antagonist\n\n## Themes\n\n- [Betrayal and Loyalty](../themes/Betrayal and Loyalty.md) — shared origin; diverged paths\n- [Rival Structure](../themes/Rival Structure.md) — two sides of the same identity\n\n## Sources\n\n- `raw-sources/ideas/DRIFT-LANDERS 2d5d707c4ce980b08943eb819d4fe989.md`\n- `stories-index.json` entry id: 14\n## Status & Notes\n\n\nMultiple car/chase sequences catalogued in raw notes. Clear rivalry arc."
  },
  {
    "slug": "expect-0",
    "title": "EXPECT 0 (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# EXPECT 0 (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added."
  },
  {
    "slug": "god-and-demon-within",
    "title": "God and Demon Within (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# God and Demon Within (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added."
  },
  {
    "slug": "grandmasters-watching-hiraku",
    "title": "Grandmasters Watching Hiraku (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# Grandmasters Watching Hiraku (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added.\n## Synopsis\n\n*(A concept-stage story. The Notion page contains a reference video link but no expanded synopsis yet. The title evokes a scene of grandmasters observing an exceptional player — Hiraku — with quiet, weighty attention.)*"
  },
  {
    "slug": "gumsum-puppet",
    "title": "Gumsum Puppet",
    "category": "story",
    "links": [],
    "content": "# Gumsum Puppet\n\n**Status:** Idea (Polished Synopsis)\n**Format:** Short Film, Film\n**Genre:** Drama / Tragedy\n**Working Premise:** A world-renowned puppet maker falls obsessively in love with his greatest creation — until a disastrous performance shatters both the puppet and his illusion.\n**Date Written:** December 29, 2025\n**Inspiration:** Song \"Gumsum Gumsum\"\n\n---\n\n## Synopsis\n\nA master puppet maker, celebrated across the world for his craft, crosses from artistry into obsession. His most recent creation — an extraordinarily lifelike puppet — becomes the object of his total fixation. He believes, at some level, that the puppet is real. Or perhaps more accurately: he needs it to be.\n\nThe breaking point arrives during a public performance. Something goes catastrophically wrong. The puppet is destroyed. And with it, the maker's carefully constructed illusion — of love returned, of artistry made flesh — is shattered.\n\n---\n\n## Characters\n\n- **The Puppet Maker** — protagonist; world-renowned, deeply isolated, obsessive\n- **The Puppet** — the object of obsession; extraordinarily crafted; effectively a character\n\n---\n\n## Themes\n\n- [Love and Loss](../themes/Love and Loss.md) — love directed at something that cannot reciprocate; the tragedy of one-sided attachment\n- [Art and Obsession](../themes/Art and Obsession.md) — the point at which devotion to craft curdles into something destructive\n- [Illusion vs. Reality](../themes/Illusion vs. Reality.md) — the maker's refusal to distinguish; the performance as the collision point\n\n---\n\n## Structure\n\nShort film / film format — single-arc, classical tragedy structure:\n1. The maker at the height of his craft and obsession\n2. The performance — public, high-stakes\n3. The shattering — puppet destroyed; illusion exposed\n4. Aftermath — what remains\n\n---\n\n## Techniques\n\n- [Object as Character](../techniques/Object as Character.md) — the puppet is narratively present as a character even without dialogue or agency\n- [Classical Tragedy Arc](../techniques/Classical Tragedy Arc.md) — hamartia (obsessive love/pride), peripeteia (the performance disaster), catharsis\n\n---\n\n## Status & Notes\n\nVery polished synopsis with a clear arc and settled theme. One of the most emotionally complete ideas in the catalog. Well-suited to a short film format.\n\nThe \"Gumsum Gumsum\" song inspiration suggests a melancholy, haunting tone — silent protagonist, expressive craft work.\n\n**Open Questions:**\n- What exactly goes wrong at the performance? Mechanical failure? A revelation?\n- Is there an audience character who shatters the illusion by reacting to the puppet as an object?\n- Does the maker survive the story, or is this a literal tragedy?\n\n---\n\n## Sources\n\n- `raw-sources/ideas/Gumsum puppet 2d8d707c4ce98095a9d6e910669997e3.md`\n- `stories-index.json` entry id: 20"
  },
  {
    "slug": "kanban-world",
    "title": "Kanban World",
    "category": "story",
    "links": [],
    "content": "# Kanban World\n\n**Status:** Concept\n**Format:** TBD\n**Genre:** World-Building / Concept\n**Date Written:** TBD\n**Core Theme:** TBD\n\n## Synopsis\n\nA world-building concept built around Kanban — the Japanese workflow system — elevated into a narrative universe. The Kanban World uses the principles of visual project management (cards, flows, WIP limits, retrospectives) as the literal laws governing society, power, and conflict.\n\n*(Full synopsis pending expansion from Notion database. Kanban World is designated as a world/IP container in Notion. First entry originated 2026-03-27.)*\n\n## Characters\n\n*(To be added)*\n\n## Themes\n\n*(To be added)*\n\n## Techniques\n\n*(To be added)*\n\n## Sources\n\n- Synced from Notion ID: `330d707c-4ce9-809d-b16e-f6ff5b489920`"
  },
  {
    "slug": "lvl-3-power",
    "title": "Lvl 3 Power",
    "category": "story",
    "links": [],
    "content": "# Lvl 3 Power\n\n**Status:** Idea (Highly Developed)\n**Format:** Anime, Web Series\n**Genre:** Supernatural / Battle Fantasy\n**Working Premise:** In a 52-card universe of power-ranked warriors, a rags-to-riches fighter rises through the ranks challenging kings, aces, and jokers across four houses in a century-spanning competition.\n**Date Written:** September 23, 2023\n**Inspiration:** JJK (domain expansions), Black Clover (character dynamics), card game hierarchy\n\n---\n\n## Synopsis\n\nA fantasy action universe structured around a deck of 52 cards, where each suit represents a House and each card rank represents a power level. The story follows Sato — King of Clubs — in his rags-to-power ascent.\n\n**World Structure:**\n- 52 cards = 52 power holders across 4 Houses: Clubs, Spades, Hearts, Diamonds\n- Each House has Kings, Queens, Aces, Jokers and numbered cards\n- Power levels designated Lvl 1 / 2 / 3\n\n**Protagonist — Sato (King of Clubs):**\n- Inspired by Yami Sukehiro (Black Clover) and Black Bulls' captain\n- Rags to riches in terms of power — from normal to King\n- Power-hungry, always ready for battle (sometimes crosses into insanity)\n- Level milestones unlocked through battles and challenges\n\n**Key Characters:**\n- **Ace of Spades** — inspired by Gojo Satoru (JJK); possesses *Meric Expansion* (dimensional split technique)\n  - Cube linear split: divides terrain in square block formations\n  - Triangle polygon split: triangular criss-cross pattern — harder to understand and break\n- **King of Spades** — Realm of Power; Lvl 3\n- **Queen of Spades** — Sound layering barrier\n- **King of Hearts** — Strongest offence (soft nature); confirmed dead by Spade King\n- **King of Diamonds** — *Dia-Mod Realm* domain extension; partnered with an Illusionist Queen\n- **Skatze (Ace of Leaves)** — Lvl 3: 50m zone with 5× time dilation; secret supporter of Spade King\n\n**Arc: Storm of Changes (Lvl 1):**\nSato is the first mortal to pass the Storm of Changes, establishing his legend from the earliest stage.\n\n**Notable Techniques:**\n- *Meric Expansion* (Gojo-inspired): creates splits on terrain/space; multiple simultaneous layers multiply energy cost; enemies must match energy across every layer to break from inside\n- Signature mental test from Ace of Spades: 'Square or triangle?' — he then constructs the opposite to confuse enemies\n\n## Characters\n\n\n### [Sato](../characters/Sato.md) (King of Clubs)\n- Rags-to-riches arc, power-obsessed, will challenge anyone\n- Inspired by: Yami Sukehiro (Black Clover's Black Bulls captain)\n- **Lvl 1:** Change of Storm (raw power burst)\n- **Lvl 3:** Domain — exact form TBD\n- First mortal to pass Storm of Changes\n\n### [Skatze](../characters/Skatze.md) (Ace of Clubs/Leaves)\n- Secret strong supporter of Spade King due to a past incident\n- **Lvl 1:** Faster movement with basic offence\n- **Lvl 2:** Quicksweep\n- **Lvl 3:** Domain — 50m zone with 5x slow time dilation\n\n### [Grand-Emo Storm](../characters/Grand-Emo Storm.md) (GRAND-PA EMO STORM)\n- Inspired by Isaac Netero (HxH)\n- Young name: Grenadier Emo\n- Retired from competition after a sealed battle with Chains of Fate\n- Now trains the next generation (reluctantly)\n- **Lvl 1:** Stick of Emotion — touch sets one emotion to power boost\n- **Lvl 2:** Wind of Emotion — smell affects one emotion toward others\n- **Lvl 3:** Domain — \"Tover Realm\" (sand dune mountains with purple tornado symbolizing never-give-up)\n\n### Chains of Fate\n- The person who defeated Grand-Emo, forcing retirement\n- Steals/sees the fate of opponents\n- **Lvl 2:** Death Palm — eyes open in palms; can see and instantly deliver death on touch\n- **Lvl 3:** Fate Demon\n\n### Ace of Spades (unnamed — Gojo-inspired)\n- Holds \"Dimensional Split\" — can split terrain/space into cube (linear) or triangle (polygon) patterns\n- Tests enemies: asks \"square or triangle?\" then constructs the opposite to confuse\n- Weakness: limited range, enormous energy cost\n- Good friend of Skatze\n\n### King of Spades\n- **Lvl 1:** Raw power\n- **Lvl 2:** Sword of Unbreakable Steel\n- **Lvl 3:** Domain — \"Realm of Power\"\n- Inspired by Yami (Black Clover)\n\n### Queen of Spades\n- Power: Sound layering barrier\n\n### King of Hearts (+ Queen)\n- Strongest defence arc\n- Strongest offence (soft nature) — Spade confirms Heart King's death\n- Power brawl arc\n\n### King of Diamonds (+ Queen)\n- \"Diamond Eye\" — head of the betrayers group\n- **Lvl 3:** Domain — \"Dia-Mod Realm\"\n- Queen: Illusionist, smartest, selfish, doesn't trust even the King\n\n### Clown / Joker of Diamonds\n- Perceived as non-threat — actually caused a key incident\n- **Lvl 3:** Domain — \"Null Realm\" — nullifies all powers across wide range; advantaged by raw hand-to-hand\n\n### Other Fighters\n- **Pentartist** — paint pot + brush fighter; suspends paint droplets (Lvl 1), spawns dangerous paint globs (Lvl 2), transforms himself into paint (Lvl 3)\n- **Thief** — Lvl 1: Translucent; Lvl 2: Time Theft; Lvl 3: Skill Theft\n- **Scorpion** — rope dart professional\n- **Master Shin** — earth mover (earth-bending style), brutal trainer; Lvl 3: Domain \"Barren Lands\"\n- **Rollnado** — gravity guy, trained under Master Shin, then humiliated/defeated Shin to break his ego\n- **Dr. Shark** — Lvl 3: Domain \"Killer Seas\"\n- **Phantom 12** — exploits the century-long competition cycle; Lvl 3: \"Inner Fate Form\" (blue eyes, everything else white)\n- **KG Wolves, Base Spinner, Denter RT** — underdeveloped fan/concept figures\n\n---\n\n## Themes\n\n\n- [Power Hierarchies and Combat](../themes/Power Hierarchies and Combat.md) — the 52-card structure is the world's entire moral and social order\n- [Betrayal and Loyalty](../themes/Betrayal and Loyalty.md) — Betrayers faction; Skatze's secret loyalty\n- [Rags to Power](../themes/Rags to Power.md) — Sato's arc as the spine of the story\n\n---\n\n## Techniques\n\n\n- [Power Level System Design](../techniques/Power Level System Design.md) — three-level framework; domain expansion mechanics\n- [Villain Faction Within a Meritocracy](../techniques/Villain Faction Within a Meritocracy.md) — betrayers operating within the official competition structure\n\n---\n\n## Sources\n\n\n- `raw-sources/ideas/Lvl 3 power 2d5d707c4ce980f88f53c335c387ba79.md`\n- `stories-index.json` entry id: 07\n## Power System — The 52-Card Universe\n\n\n**Houses:** Clubs, Spades, Diamonds, Hearts (+ Jokers)\n**Ranks:** 1 (Ace) through 13 (King) + Joker\n\n### Level System (per character)\nEach warrior has 3 levels:\n- **Lvl 1** — raw/base ability\n- **Lvl 2** — advanced technique\n- **Lvl 3** — Domain Extension (realm expansion equivalent)\n\nDomain Extension = \"Meric Expansion\" — replaces reality fabric within a range. More layers = more energy cost. Can be broken from inside by matching energy equivalent across all summon layers.\n\n---\n\n## Story Arcs\n\n\n1. **Leaves Arc** (first arc) — Skatze and the Clubs house\n2. **Spades Arc** — Betrayers emerge; Clown causes key incident\n3. **Hearts Arc (Power Brawl)** — Strongest defence vs. strongest offence\n4. **Diamonds Arc (Last Arc)** — Diamond King, betrayers, final reckoning\n\nBetrayers' first move: end competition fast, skew results in their favour.\n\n---\n\n## World\n\n\n- [52 Card Universe](../world/52 Card Universe.md) — the primary world-building page for this story\n\n---\n\n## Status & Notes\n\n\nHighly developed. 15+ characters outlined with specific power levels. The domain expansion (\"Meric Expansion\") is well-designed with a clear internal logic. The betrayers subplot needs tighter definition — specifically what their endgame is and who leads them (Diamond King or Clown?).\n\n**Phantom 12** is flagged as having spin-off potential (\"scope to develop into separate live action series\").\n\n**Open Questions:**\n- What exactly was the \"incident\" that made Skatze a secret supporter of Spade King?\n- Who are the full Betrayers faction members?\n- What is Sato's Lvl 3 domain?\n\n---"
  },
  {
    "slug": "marraige-hai-humse",
    "title": "Marraige Hai Humse",
    "category": "story",
    "links": [],
    "content": "# Marraige Hai Humse\n\n**Status:** Idea\n**Format:** Film\n**Genre:** Romantic Comedy / Drama\n**Working Premise:** A jealous third-wheel can't process that his friend is marrying the exact twin of his own ex-girlfriend — chaos unfolds when he contacts her.\n**Date Written:** No date listed\n\n## Themes\n- **Jealousy and Projection** — he sees his ex in someone else; chaos follows\n- **Friendship Under Pressure**\n\n## Status & Notes\n\nQuirky rom-com with sequel potential. A rap track concept is noted. The \"exact twin\" premise is a built-in visual gag.\n\n## Sources\n- `raw-sources/ideas/marraige hai humse 309d707c4ce980c5a036fa6679d0afd7.md`\n- `stories-index.json` entry id: 28"
  },
  {
    "slug": "nf-hope",
    "title": "NF Hope: The Legend Agent",
    "category": "story",
    "links": [],
    "content": "# NF Hope: The Legend Agent\n\n**Status:** Idea (Developed)\n**Format:** Anime, Web Series\n**Genre:** Action / Spy Thriller\n**Working Premise:** A ghost-level spy — hardened by childhood trauma and war — becomes unstoppable, until enemies discover his one buried weakness: a woman from his past.\n**Date Written:** April 6, 2023\n\n## Synopsis\n\nA spy thriller following a protagonist inspired by Imran Khan — built through multi-era arcs and emotional layers.\n\n**Structure:** Non-linear. Eye-zoom-out shots traverse different ages of the protagonist's life: child trauma → teenage bonds → war → fear of loss → becoming cold-hearted → achieving legend status.\n\n**Arc:**\n- **Child Trauma** — foundational wound\n- **Teen Bonds** — friendships that matter\n- **War Starts** — people die; emotional shutdown begins\n- **Fear of Loss → Cold-Hearted** — transformation into an operative\n- **Agent Status** — fearless, impossible to stop; legendary reputation\n- **Ex-GF Arc** — enemies discover his only weakness is his past; she is now a CIA cybersecurity analyst who has moved on but never married\n- **Add-On Arc:** He has been silently watching over her — saving her once from a yacht attack without revealing himself. She begins to notice and searches for him globally. He simultaneously uncovers that big enemies have infiltrated the CIA and government.\n- **Breaking CIA Arc** — He must extract her from CIA headquarters before enemies — who have reach up to government level — target her as his last weakness.\n\n**Visual Style:** 3D CGI-animated series in cel-shading style (inspired by MTV's Spider-Man: The New Animated Series and Skyland). Music references: *Mi Amor* by Bohemia.\n\n**Tone:** Gritty, high-stakes espionage with emotional depth.\n\n## Characters\n\n\n- **NF Hope** — protagonist; inspired by Imran Khan's aesthetic; CGI animated vision\n- **The Ex-Girlfriend** — buried weakness; becomes a plot target\n\n## Themes\n\n\n- [Surveillance and the Rogue Operative](../themes/Surveillance and the Rogue Operative.md)\n- [Love as Vulnerability](../themes/Love as Vulnerability.md) — the spy's one weakness is an emotional one\n\n## Sources\n\n- `raw-sources/ideas/Nf hope 2d4d707c4ce980c7baf4e1ffc9e68703.md`\n- `stories-index.json` entry id: 15\n## Structure\n\n\nMulti-arc spy story. Age zoom structure — the protagonist is shown at multiple ages, each a different capability tier."
  },
  {
    "slug": "odd-seven",
    "title": "ODD SEVEN",
    "category": "story",
    "links": [],
    "content": "# ODD SEVEN\n\n**Status:** Idea\n**Format:** Film, Web Series\n**Genre:** Action / Sci-Fi / Thriller\n**Working Premise:** Seven people across the globe share the same face but different fates — and only one of them can prevent the others from destroying each other.\n**Date Written:** July 17, 2022\n**Inspiration:** Juice WRLD\n\n## Synopsis\n\nSeven individuals worldwide are born with identical faces but radically different lives. The story explores what it means to share an identity you didn't choose — and what happens when seven versions of \"you\" are on a collision course. Only one can step up to prevent total destruction.\n\n## Characters\n\nSeven archetypes defined (P1–P7 in raw notes) — see raw source for details.\n\n## Themes\n\n- [Identity and the Double Self](../themes/Identity and the Double Self.md) — central; seven versions of one face as the literal premise\n- [Fate and Choice](../themes/Fate and Choice.md) — each P has a different fate despite identical origin\n\n## Status & Notes\n\nStrong visual concept. Character archetypes defined. Story mechanics need development — what is the collision mechanism that puts all seven on course?\n\n## Sources\n- `raw-sources/ideas/ODD SEVEN 2d3d707c4ce98175b36df789e1beca00.md`\n- `stories-index.json` entry id: 11"
  },
  {
    "slug": "orangutan-tiger",
    "title": "Orangutan Tiger",
    "category": "story",
    "links": [],
    "content": "# Orangutan Tiger\n\n**Status:** Idea (Full Three-Act Structure)\n**Format:** Anime, Film\n**Genre:** Adventure / Family / Allegory\n**Working Premise:** A tiger cub raised by an orangutan must reunite his estranged brothers and defend their jungle from a human invasion — guided by the values of the mother who raised him.\n**Date Written:** No date listed\n**Inspiration:** Lion King + Jungle Book\n\n## Synopsis\n\nA tiger cub is raised by an orangutan mother after being separated from his kin. He grows up between two worlds — tiger nature and orangutan values. When his estranged brothers must be reunited and the jungle threatened by human invasion, he is the only one capable of bridging both sides.\n\n## Themes\n\n- [Betrayal and Loyalty](../themes/Betrayal and Loyalty.md) — brothers estranged; the mother's values as the glue\n- [Identity and the Double Self](../themes/Identity and the Double Self.md) — raised between species\n- **Revenge** — likely driver for some brothers\n- **Fatherhood/Motherhood** — the orangutan mother's legacy\n\n## Structure\n\nFull three-act structure exists in raw notes.\n\n## Status & Notes\n\nFully structured. One of the most completely conceived stories in the catalog despite having no date. Strong emotional grounding.\n\n## Sources\n- `raw-sources/ideas/Orangutan tiger 309d707c4ce98024bc4bc08bfedd6c60.md`\n- `stories-index.json` entry id: 29"
  },
  {
    "slug": "phantom-light-force",
    "title": "Phantom Light Force (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# Phantom Light Force (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added."
  },
  {
    "slug": "poor-cleaner",
    "title": "Poor Cleaner (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# Poor Cleaner (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added.\n## Synopsis\n\nA war-trained soldier — an eagle medal holder (the highest honour) and sniper all-rounder — who is forced to live in dire circumstances after the war ends. Despite his past glory, he survives with hard work and dignity, working as a bus cleaner, living off his former calibre.\n\nHe is inspired by the spirit of Nawazuddin Siddiqui: understated, resilient, and formidable.\n\nHis story is rediscovered when he is found and chosen by 007. His military importance becomes evident when he single-handedly sweeps 50 outer-force operatives in a cold, high-stakes infiltration — providing sniper support, scouting, and cover fire.\n\nCore Arc: From forgotten war hero to indispensable operative — proving that true calibre never diminishes."
  },
  {
    "slug": "saga-stand-alone",
    "title": "Saga: Stand Alone",
    "category": "story",
    "links": [],
    "content": "# Saga: Stand Alone\n\n**Status:** One-sentence premise only\n**Format:** Anime, Film\n**Genre:** Sci-Fi / Space Opera / Romance\n**Working Premise:** An alien warrior stands alone against four friends to save a galaxy — and his lover's planet — splitting them apart in the process.\n\n## Connection\n\n[Thoulien Multiour](../characters/Thoulien Multiour.md) is the protagonist — same character as [Universal Saga](Universal Saga.md) but in a compact, standalone format. This may be one specific arc or event extracted from the main saga.\n\n## Themes\n- [Love and Loss](../themes/Love and Loss.md) — saves her planet, loses her\n- [Chosen One's Burden](../themes/Chosen One's Burden.md) — standing alone against his own allies\n\n## Sources\n- `stories-index.json` entry id: 12"
  },
  {
    "slug": "shoshinsha-card-realm",
    "title": "Shoshinsha Card Realm (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# Shoshinsha Card Realm (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added."
  },
  {
    "slug": "steel-bar-king",
    "title": "Steel Bar King (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# Steel Bar King (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added."
  },
  {
    "slug": "temple-of-the-fallen-hearts",
    "title": "Temple of the Fallen Hearts (Concept Fragment)",
    "category": "story",
    "links": [],
    "content": "# Temple of the Fallen Hearts (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added."
  },
  {
    "slug": "the-buried-gold",
    "title": "The Buried Gold",
    "category": "story",
    "links": [],
    "content": "# The Buried Gold\n\n**Status:** Idea\n**Format:** Short Film, Web Series\n**Genre:** Drama / Parable\n**Working Premise:** A woman wastes years digging for buried gold — only to discover she was the gold all along.\n**Date Written:** October 25, 2025\n\n## Themes\n- [Self-Worth](../themes/Self-Worth.md) — the parable literalizes the metaphor; she IS the gold\n- [Journey vs. Destination](../themes/Journey vs. Destination.md) — the digging itself was the life she missed\n\n## Sources\n- `raw-sources/ideas/The buried gold in the ground 2d6d707c4ce9808dac6ceb33edceeb68.md`\n- `stories-index.json` entry id: 21"
  },
  {
    "slug": "the-infinite-win",
    "title": "The Infinite Win",
    "category": "story",
    "links": [],
    "content": "# The Infinite Win\n\n**Status:** Idea\n**Format:** Film\n**Genre:** Drama / Philosophical\n**Working Premise:** A supremely confident man bets his entire life on conquering the infinite ocean — and across three ages learns that the real victory was always the journey, not the depth.\n**Date Written:** October 25, 2025\n\n## Synopsis\n\nA mythical drama about a confident protagonist who bets everything on conquering the infinite depth of the ocean — a journey that has defeated all who came before.\n\nAcross three life stages (young adult, mature adult, old adult), the protagonist chases the same impossible goal. The story is told non-linearly, cutting between ages and experiences.\n\nThe legend says: *'Whoever conquers the infinite ocean shall receive whatever they desire.'* But the protagonist eventually discovers — in old age — that the ocean's true conquest is not physical. The realisation IS the finish line.\n\n**The Secret Sauce:** The infinite ocean can only be conquered by the person who realises, at whatever stage of life, that it is not about the destination — it is about the journey. That realisation is the answer.\n\n**Structure:** Three key beats — **Beginning** (total confidence, all-in bets), **Doubt** (accumulation of losses, questioning), **Realisation** (the meaning is the journey itself).\n\n## Themes\n\n- [Journey vs. Destination](../themes/Journey vs. Destination.md) — central; the Infinite Win is never \"the depth reached\"\n- [Immortality vs. Mortality](../themes/Immortality vs. Mortality.md) — resonant parallel to Amarta; perpetual pursuit as self-negation\n\n## Sources\n\n- `raw-sources/ideas/The infinite win 2d6d707c4ce980e583dfd1a635726571.md`\n- `stories-index.json` entry id: 22\n## Structure\n\n\nNon-linear, three-age structure. Each age shows the protagonist at a different point in his obsession and an accumulating understanding."
  },
  {
    "slug": "the-lost-cafe",
    "title": "The Lost Café",
    "category": "story",
    "links": [],
    "content": "# The Lost Café\n\n**Status:** Idea\n**Format:** Film\n**Genre:** Psychological Thriller / Drama\n**Working Premise:** A man stuck in grief for five years begins dreaming of the happier alternate life he could have had — but the connection between realities is a two-way street with dangerous consequences.\n**Date Written:** October 13, 2025\n**Inspiration:** Song \"Darmiya\"\n**Core Theme:** Moving on\n\n## Synopsis\n\nA man has spent five years paralyzed by grief — an unspecified loss. He begins experiencing vivid alternate-reality visions of the life he could have had.\n\nThe connection is bidirectional: the alternate life can reach him too. In one reality, the protagonist is in his 30s, stuck and unable to move on for five years. After staying busy for years, he begins dreaming of the positive future he could have had if he hadn't made certain choices. These dreams are the real life of his counterpart in the alternate reality — someone who made different decisions and achieved the life he always wanted.\n\nThe core conflict arises when the happy alternate-reality version also begins experiencing dreams from the other side. The catalyst: a minor quarrel between the two versions that creates a glitch bridging their realities, possibly triggered by jealousy or black magic (tantra) cast by someone envious of the happier life.\n\nConsequences escalate from psychological (shared dreams) to physical to narrative — as both individuals begin to feel the reality of each other's world.\n\nThe film's core is a realisation story: the grief-stricken man must ultimately learn to move on.\n\n**Inspiration:** Song *Darmiya*\n\n## Themes\n\n- [Memory and Alternate Realities](../themes/Memory and Alternate Realities.md) — central\n- [Love and Loss](../themes/Love and Loss.md) — grief as the engine\n\n## Techniques\n\n- [Dual Timeline](../techniques/Dual Timeline.md) — past self / alternate self across one life\n\n## Sources\n\n- `raw-sources/ideas/The lost cafe s 2d6d707c4ce98007a9c6dfb5deed2d50.md`\n- `stories-index.json` entry id: 23"
  },
  {
    "slug": "the-rift-series",
    "title": "The Rift Series",
    "category": "story",
    "links": [],
    "content": "# The Rift Series\n\n**Status:** Idea (Title + Structure only)\n**Format:** Web Series, Film\n**Genre:** Drama / Romance\n**Working Premise:** A trilogy about the breaking points in relationships — official rifts, personal rifts, and the moment everything finally falls apart.\n**Date Written:** August 17, 2025\n\n## Structure\n\nThree episodes / films:\n1. Official Rift\n2. Personal Rift\n3. The Final Break\n\n## Themes\n- [Love and Loss](../themes/Love and Loss.md) — the series is a taxonomy of relationship endings\n\n## Sources\n- `stories-index.json` entry id: 24"
  },
  {
    "slug": "train-talktime",
    "title": "Train Talktime",
    "category": "story",
    "links": [],
    "content": "# Train Talktime\n\n**Status:** Idea\n**Format:** Web Series\n**Genre:** Slice of Life / Comedy / Drama\n**Working Premise:** An anthology series of 10–30 minute episodes where strangers share stories, secrets, and laughter aboard Indian trains.\n**Date Written:** December 3, 2025\n\n## Synopsis\n\nA repeatable IP: an anthology series of 10–30 minute episodes, each sharing a unique human experience set inside Indian trains.\n\n**Episode 1:** Two aunties from different families discuss a corrupt death — and find unexpected unity across religious lines, in contrast to how unity looks on paper.\n\n**Planned Long-Format Specials (1 hr each):**\n- School Party\n- First College Trip\n- Yaar Bathere (Many Friends)\n\n**Tone:** Warm, grounded, conversational. The train is the equaliser — social class, religion, age boundaries dissolve in transit.\n\n## Themes\n\n- **Human Connection in Transit** — trains as the great equalizer of Indian society\n- **Strangers and Stories** — the anthology format as theme\n\n## Techniques\n\n- [Anthology Format](../techniques/Anthology Format.md)\n\n## Sources\n\n- `raw-sources/ideas/Train talktime 2d5d707c4ce980ff9a6dc19d78e72e7f.md`\n- `stories-index.json` entry id: 27\n## Format\n\n\nRepeatable IP. Each episode is a single train journey — new passengers, new stories, self-contained but tonally consistent. 3 specials listed; 1 full episode sketched in raw notes."
  },
  {
    "slug": "universal-saga",
    "title": "Universal Saga",
    "category": "story",
    "links": [],
    "content": "# Universal Saga\n\n**Status:** Idea (Detailed)\n**Format:** Anime, Novel\n**Genre:** Sci-Fi / Space Opera / Fantasy\n**Working Premise:** A four-eyed alien warrior — The Chosen One — awakens with no memory and must journey through six stages of life to fulfil a cosmic destiny, losing love and sanity along the way.\n**Date Written:** April 21, 2023\n\n---\n\n## Synopsis\n\nAn epic, linear sci-fi saga following Thoulien Multiour — an alien protagonist with four eyes (two standard, two special ability eyes on the forehead, opened only when needed). His body resembles a fit human's but his face is inspired by a Spider Monkey. He wears a golden-edged robe covering his full form.\n\n**Five-Stage Narrative Arc:**\n1. **Childhood** — origins\n2. **Teenage** — Love Arc\n   - Protagonist falls for a female character\n   - Enemies, unable to defeat him directly, target her\n   - He hides her on a sparsely populated planet; enemies bribe the locals to betray him\n   - While on a mission far away, she is killed\n   - In rage, Thoulien reaches his first power level and causes a massacre — killing friends and enemies alike\n   - He spends 14 days alone on that planet, holding her corpse, learning the limits and costs of his own rage\n3. **Becoming Warrior** — skilled training; battles against diverse warriors with unique techniques\n4. **Main Story (Story Start Point)** — begins here, with Thoulien dormant, floating in space, having forgotten everything\n5. **Mature Man** — grown, seasoned, carrying full understanding of his journey\n6. **Post-Saga (Old Age)** — epilogue\n\n**Tone:** Emotionally deep, galactic in scale, structured around power, betrayal, and identity.\n\n## Characters\n\n\n- [Thoulien Multiour](../characters/Thoulien Multiour.md) — protagonist; four-eyed alien warrior, The Chosen One\n  - Also appears in: [Saga Stand Alone](Saga Stand Alone.md) (standalone film/anime)\n\n---\n\n## Themes\n\n\n- [Love and Loss](../themes/Love and Loss.md) — the cost of a destined path\n- [Memory and Identity](../themes/Memory and Identity.md) — awakening with no memory as narrative engine\n- [The Chosen One's Burden](../themes/The Chosen One's Burden.md) — cosmic destiny vs. personal desire\n\n---\n\n## Sources\n\n\n- `stories-index.json` entry id: 13\n- `raw-sources/characters/thoulien_character_design.md` (root-level file — check for additional detail)\n## Arcs\n\n\nThe story is structured as a **6-stage linear arc**:\n\n1. **Love Arc** — Thoulien finds connection; this is what he will eventually lose\n2. **Warrior Arc** — becoming who destiny requires him to be\n3. **Saga Arc** (stages 4–6) — universe-scale conflict and reckoning\n\n---\n\n## World\n\n\n- Cosmos-spanning; structured universe with defined power/fate systems\n- Thoulien is an alien species — four eyes is a significant trait (likely symbolic)\n\n---\n\n## Status & Notes\n\n\nThoulien's character design is detailed (see [Thoulien Multiour](../characters/Thoulien Multiour.md)). The 6-stage arc provides clear dramatic scaffolding. Connected to [Saga Stand Alone](Saga Stand Alone.md) — a compact standalone version of the same character's story set apart from the main saga.\n\n**Open Questions:**\n- What is the nature of Thoulien's cosmic destiny?\n- Who/what is the antagonist at the Saga Arc level?\n- What does Thoulien's species' four-eyed physiology mean for power or perception?\n\n---"
  },
  {
    "slug": "vyapar",
    "title": "Vyapar",
    "category": "story",
    "links": [],
    "content": "# Vyapar\n\n**Status:** Idea\n**Format:** Film, Web Series\n**Genre:** Crime / Thriller / Dark Comedy\n**Working Premise:** A Squid Game-style story where a group of family and friends unknowingly become players in a deadly Monopoly-like power game — until betrayal and murder reveal who the real 'Maalik' is.\n**Date Written:** October 21, 2025\n**Inspiration:** Squid Game + Monopoly board structure\n\n## Synopsis\n\nA series like Squid Game — but built on the game of Monopoly / Business, played out within a real family and friend group.\n\nAll players are unknowingly caught in a web of greed, pride, and power play that escalates into a murder mystery. No one realises they are participants in a deadly Monopoly game until it is too late.\n\n**Sub-arcs:**\n- Girlfriend arc\n- Friends' betrayal\n- The reveal of *Maalik* (the unseen orchestrator)\n\n**Tone:** Suspenseful. The game's rules slowly override the players' real-world moral code.\n\n## Themes\n\n\n- [Game as Power Allegory](../themes/Game as Power Allegory.md) — Monopoly's capitalism mechanics mapped onto life-or-death stakes\n- [Betrayal and Loyalty](../themes/Betrayal and Loyalty.md) — the player group fractures\n\n## Sources\n\n- `raw-sources/ideas/Vyapar 2d5d707c4ce98089be0af2856e343c0a.md`\n- `stories-index.json` entry id: 18\n## Status & Notes\n\n\nStrong suspense tone. Murder mystery meets Squid Game via board game structure. Character roster not yet defined."
  },
  {
    "slug": "white-bandit",
    "title": "White Bandit",
    "category": "story",
    "links": [],
    "content": "# White Bandit\n\n**Status:** Idea\n**Format:** TBD\n**Genre:** Character Idea\n**Date Written:** TBD\n**Core Theme:** TBD\n\n## Synopsis\n\n- Blind master\n- Inspired sunsui looks\n- Imagination from I'm only human song\n- Don't have eyes\n- Gojo satoru inspiration\n- Universe lengendary masters that beat time in universe it s\n\n## Characters\n\n*(To be added)*\n\n## Themes\n\n*(To be added)*\n\n## Techniques\n\n*(To be added)*\n\n## Sources\n\n- Synced from Notion ID: `309d707c-4ce9-80fc-a3cf-e10d2ced9708`"
  },
  {
    "slug": "blind-superior",
    "title": "Blind Superior",
    "category": "character",
    "links": [
      "007-spy-continue"
    ],
    "content": "# Blind Superior\n\n## Profile\nRecruited 007 and trusts him deeply. Though physically blind and weak, his presence exudes confidence, even after the burning Berlin incident.\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "colonel-rajesh-malhotra",
    "title": "Colonel Rajesh Malhotra",
    "category": "character",
    "links": [
      "007-spy-continue"
    ],
    "content": "# Colonel Rajesh Malhotra\n\n**Role:** Indian Intelligence • Operations Chief\n**Status:** ACTIVE\n**Operations:** Classified\n**Countries:** India, UK, Middle East\n\n## Biography\nSenior Indian intelligence officer tracking Subject Alpha. Connected to destabilized Middle East deals. Uses indirect methods and psychological leverage to hunt targets. Frustrated by Alpha's continued evasion.\n\n## Specialties\n- Strategic Planning\n- Psychological Warfare\n- Asset Manipulation\n- International Relations\n\n## Timeline\n- **2015**: Middle East Exposure - Deals destabilized by Subject Alpha's operations\n- **2018**: Tracking Initiative - Launched hunt for Subject Alpha through various channels\n- **2020**: London Strategy - Identified Dr. Kumar connection, orchestrated yacht trap\n- **2020**: Operation Failure - London building explosion, targets presumed dead\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "dr-sarah-kumar",
    "title": "Dr. Sarah Kumar",
    "category": "character",
    "links": [
      "presumed-dead",
      "former-college-friend-of-subject-alpha",
      "close-relationship-with-subject-alpha-before-his-disappearance",
      "007-spy-continue"
    ],
    "content": "# Dr. Sarah Kumar\n\n**Role:** Behavioral Scientist • Government Tracker\n**Status:** [[PRESUMED DEAD]]\n**Operations:** 25+ tracking cases\n**Countries:** India, UK, Global Con-signments \n\n## Biography\n[[Former college friend of Subject Alpha.]] Behavioral science specialist who climbed to senior government positions. Expert in psychological profiling and tracking methodologies.\n\n## Specialties\n- Behavioral Analysis\n- Psychological Profiling\n- Target Tracking\n- Government Relations\n\n## Timeline\n- **2009**: College Era - [[Close relationship with Subject Alpha before his disappearance]]\n- **2012**: Career Launch - Entered behavioral science field, government sector\n- **2016**: Senior Promotion - Advanced to international government tracking roles\n- **2020**: London Assignment - Targeted by Indian officer, yacht incident, building explosion\n- **2020**: Shadow Flight - Disappeared with Subject Alpha, destination unknown\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "grand-emo-storm",
    "title": "Grand-Emo Storm",
    "category": "character",
    "links": [],
    "content": "# Grand-Emo Storm\n\n**Appears In:** [Lvl 3 Power](../stories/Lvl 3 Power.md)\n**Role:** Supporting — Retired Champion / Reluctant Trainer\n**Card Rank:** Former competitor; now trainer outside the active competition\n**Inspiration:** Isaac Netero (Hunter x Hunter)\n**Young name:** Grenadier Emo\n\n---\n\n## Core Traits\n\n- Carries an emotion-based power system — the most psychologically unusual kit in the story\n- Deeply reluctant to train anyone — though he produces exceptional disciples\n- Hates being a trainer, but does it anyway (classic reluctant master archetype)\n- Retired not by choice but by cost: his final battle permanently depleted his ability to use Mastery of Seals\n\n---\n\n## Power Levels\n\n- **Lvl 1 — Stick of Emotion:** Touch someone and fix one emotion onto them at power-boost intensity\n- **Lvl 2 — Wind of Emotion:** Those who smell the wind are affected by one emotion directed at another\n- **Lvl 3 — Domain: Tover Realm** — sand dune mountains with a hut where Emo lives; far off in the dunes, a broad purple sandstorm/tornado that never fades (symbolizes never-give-up)\n\n---\n\n## The Sealing Incident (Retirement Story)\n\nWhen young (Grenadier Emo), he fought a \"Fare Demon\" to seal its power. He used **Mastery of Seals** combined with the \"Shirdi power\" — feeding demon energy into an \"eyescape\" that changed form based on the extracted power, converting it into chain links.\n\n**The cost:** Using Mastery of Seals once takes such a toll on the user that Emo effectively retired from the competition afterwards. The demon paid with the \"death palms\" (kills living things with just their weight/touch). Emo was depleted enough to be \"kind of defeated\" — forced into the trainer role he resents.\n\n---\n\n## Disciples\n\nNotable students produced despite his reluctance:\n- [Sato](Sato.md) (King of Clubs)\n- Speed (unnamed further)\n- Maskarray (unnamed further)\n\n---\n\n## Arc\n\nThe retired legend who shaped the protagonist from behind the scenes. His \"never-give-up\" tornado in his domain is the emotional thesis he passes on — even if he never says it directly.\n\n---\n\n## Sources\n\n- `raw-sources/ideas/Lvl 3 power 2d5d707c4ce980f88f53c335c387ba79.md`"
  },
  {
    "slug": "marshal-james-bradley",
    "title": "Marshal James Bradley",
    "category": "character",
    "links": [
      "007-spy-continue"
    ],
    "content": "# Marshal James Bradley\n\n**Role:** US Marshal • Alpha's Ally\n**Status:** ACTIVE\n**Operations:** Classified\n**Countries:** USA, International assignments\n\n## Biography\nUS Marshal who developed respect for Subject Alpha during training wars. Became unofficial ally despite Alpha's rogue status. Maintains favor-owed relationship that could be called upon.\n\n## Specialties\n- Federal Operations\n- Training Programs\n- International Cooperation\n- Asset Protection\n\n## Timeline\n- **2010**: Training Encounter - First impressed by Subject Alpha's capabilities\n- **2015**: Favor Established - Developed mutual respect, unofficial alliance\n- **2018**: Capture Period - Alpha imprisoned under US custody\n- **2018**: Prison Escape - Alpha escaped via mafia deal, Bradley's involvement unclear\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "pawhas-daughter",
    "title": "Pawha's Daughter",
    "category": "character",
    "links": [
      "007-spy-continue"
    ],
    "content": "# Pawha's Daughter\n\n## Profile\nA free spirit who initially didn't care about her father's criminal empire. Becomes fiercely protective and vengeful when his reputation is stained by 007. Acts as a honey trap in a subsequent mission.\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "sato",
    "title": "Sato",
    "category": "character",
    "links": [],
    "content": "# Sato\n\n**Appears In:** [Lvl 3 Power](../stories/Lvl 3 Power.md)\n**Role:** Protagonist\n**Card Rank:** King of Clubs\n**Inspiration:** Yami Sukehiro (Black Clover Black Bulls captain)\n\n---\n\n## Core Traits\n\n- Rags-to-riches arc — started as an ordinary mortal, rose to King entirely by combat\n- Power-obsessed: will challenge anyone at any rank, any time\n- Crosses the line into insanity — first occurrence: walked directly into grandmaster-level fighters as an intermediate newbie to challenge for King\n- Second occurrence: challenged all three houses (Spade, Diamond, Heart) simultaneously to satisfy his hunger for battle with queens, aces, jokers — everyone except the Kings in his \"Lvl 3 range\" and his own 12 of Clubs\n\n---\n\n## Power Levels\n\n- **First mortal to pass \"Storm of Changes\"** (domain/power test equivalent)\n- **Lvl 1:** Change of Storm — raw power burst\n- **Lvl 2:** TBD\n- **Lvl 3:** Domain — exact form not yet defined\n\n---\n\n## Arc\n\n- **Start:** Intermediate newbie, insane enough to challenge upward\n- **Rise:** Passes Storm of Changes (unprecedented); earns King of Clubs\n- **Story present:** Challenging across all houses; the spine of the Lvl 1 arc\n\n---\n\n## Relationships\n\n- **[Grand-Emo Storm](Grand-Emo Storm.md)** — trained by Emo, one of his key disciples\n- Other disciples of Emo: Speed, Maskarray (mentioned)\n\n---\n\n## Sources\n\n- `raw-sources/ideas/Lvl 3 power 2d5d707c4ce980f88f53c335c387ba79.md`"
  },
  {
    "slug": "subject-alpha",
    "title": "Subject Alpha",
    "category": "character",
    "links": [
      "identity-officially-erased-following-raw-recruitment",
      "presumed-dead",
      "007-spy-continue"
    ],
    "content": "# Subject Alpha\n\n**Role:** Rogue Asset • Former RAW Operative\n**Status:** BLACKLISTED\n**Operations:** 12+ confirmed\n**Countries:** India, Middle East, America, UK\n\n## Biography\nRural Indian origin. Childhood trauma survivor, college-educated. [[Identity officially erased following RAW recruitment.]] Trained in combat, stealth, and cyber operations. Currently operates independently with global reach.\n\n## Specialties\n- Desert Operations\n- Identity Erasure\n- Counter-Intelligence\n- Infiltration & Extraction\n\n## Timeline\n- **2008**: Village Attack - Childhood trauma - village destroyed, family lost\n- **2010**: RAW Recruitment - Identity erased, entered covert training program\n- **2015**: Middle East Operations - Dismantled corruption networks across Iran/Iraq/Syria\n- **2018**: US Capture - Imprisoned, escaped via political influence\n- **2020**: London Incident - Agency infiltration, building detonation, [[presumed dead]]\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "thoulien-multiour",
    "title": "Thoulien Multiour",
    "category": "character",
    "links": [],
    "content": "# Thoulien Multiour\n\n**Appears In:** [Universal Saga](../stories/Universal Saga.md), [Saga Stand Alone](../stories/Saga Stand Alone.md)\n**Role:** Protagonist (both stories)\n**Species:** Alien (four-eyed)\n**Type:** The Chosen One\n\n---\n\n## Core Traits\n\n- Four eyes — likely symbolic of expanded perception or cosmic sight\n- Awakens with no memory at story start — identity must be reconstructed through journey\n- Warrior archetype: physically powerful, but defined by the emotional and spiritual costs of his destiny\n- The six-stage arc suggests he transforms fundamentally across the story — not one stable character but a continuously evolving one\n\n---\n\n## Arc\n\n**Universal Saga (primary):**\n1. Awakens with no memory\n2. Love Arc — finds connection; this will be lost\n3. Warrior Arc — becomes who destiny requires\n4. Saga Arc — universe-level stakes; loses sanity\n\n**Saga: Stand Alone (companion piece):**\n- An alien warrior who stands alone against four friends to save a galaxy\n- His choice to go alone splits him from his lover whose planet he is trying to save\n- Suggests a moment of inflection within or adjacent to the main saga\n\n---\n\n## Relationships\n\n- **The Lover** — central to both stories; her planet is at stake in Saga: Stand Alone; her loss shapes his sanity in Universal Saga\n- **The Four Friends** — antagonists in Saga: Stand Alone (his allies? rivals? unclear)\n\n---\n\n## Appearances\n\n### [Universal Saga](../stories/Universal Saga.md)\nThe Chosen One protagonist — 6-stage arc across the full cosmic narrative.\n\n### [Saga Stand Alone](../stories/Saga Stand Alone.md)\nThe compact, standalone film version. One war. One impossible choice. Alone against four.\n\n---\n\n## Notes\n\n- The four-eye trait is the defining visual differentiator — should communicate otherness and cosmic sight\n- Check `raw-sources/characters/thoulien_character_design.md` at the WRITE root for design details\n\n---\n\n## Sources\n\n- `raw-sources/characters/thoulien_character_design.md` (root-level)\n- `stories-index.json` entries id: 12, 13\n- `raw-sources/ideas/Universal saga 2d4d707c4ce980769f69c4464fe4e132.md`"
  },
  {
    "slug": "villain-pawha",
    "title": "Villain Pawha",
    "category": "character",
    "links": [
      "007-spy-continue"
    ],
    "content": "# Villain Pawha\n\n## Profile\nKing of lands; can transport anything globally. Operates from Pakistan. Relentless and powerful. Embarrassed when his Turkey weapon formula delivery is thwarted by 007.\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "vincenzo-torretti",
    "title": "Vincenzo Torretti",
    "category": "character",
    "links": [
      "007-spy-continue"
    ],
    "content": "# Vincenzo Torretti\n\n**Role:** Crime Boss • Alpha's Prison Ally\n**Status:** ESCAPED\n**Operations:** Extensive criminal record\n**Countries:** USA, India, Global network\n\n## Biography\nIndian-connected mafia boss imprisoned alongside Subject Alpha in US facility. Recognized Alpha's unique skills and potential. Orchestrated mutual escape through staged legal bail worth ₹80 lacs.\n\n## Specialties\n- Criminal Networks\n- Prison Politics\n- Financial Manipulation\n- International Connections\n\n## Timeline\n- **2017**: US Imprisonment - Incarcerated in same facility as Subject Alpha\n- **2018**: Prison Alliance - Noticed Alpha's anomalous skills during riot\n- **2018**: Information Exchange - Offered freedom deal, extracted intelligence from Alpha\n- **2018**: Fake Bail Escape - Orchestrated ₹80 lacs bail illusion, fled with Alpha\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "zafar",
    "title": "Zafar",
    "category": "character",
    "links": [
      "007-spy-continue"
    ],
    "content": "# Zafar\n\n## Profile\nA jealous guy in RAW who knows about pro-007, approves the budget, and handles mission files.\n\n## Associated Stories\n- [[007 Spy Continue]]"
  },
  {
    "slug": "immortality-vs-mortality",
    "title": "Immortality vs. Mortality",
    "category": "theme",
    "links": [],
    "content": "# Immortality vs. Mortality\n\n**Central in:** [Amarta](../stories/Amarta.md)\n**Echoes in:** [Universal Saga](../stories/Universal Saga.md) (chosen burden), [The Infinite Win](../stories/The Infinite Win.md) (life as journey not destination)\n\n---\n\n## The Core Tension\n\nWhat does it cost to live forever? And more specifically: what do you lose?\n\nIn [Amarta](../stories/Amarta.md), immortality is not a gift freely given — it is a technique, a practice, a tradition. It is wielded by royal families as a tool of power and lineage control. The immortals do not age out of authority; they simply compound it across generations. Wealth, control, status — all protected by the refusal to die.\n\nThe theme begins to fracture when a fourth-generation descendant asks the question the others have refused to ask: *is this actually a good life?*\n\n---\n\n## What Immortality Costs (as dramatized in Amarta)\n\n- **Stasis:** The age condition means you are frozen at the stage you began the yoga. You cannot grow past that life-phase.\n- **Disconnection:** Living across generations while everyone around you dies naturally creates an unbridgeable gap\n- **Power as prison:** The dynasty cannot afford defectors — one refusal threatens the whole system\n- **Conspiratorial entropy:** By the fifth generation, the immortal family is no longer a family — it's a faction\n\n---\n\n## Mortality as Choice\n\nThe fourth-generation character's refusal is the act of genuine resistance. They want a natural arc — youth, middle age, old age, death. They want bonds that matter precisely because they end.\n\nThis is the theme's moral center: **mortality is what makes meaning possible.** Immortality doesn't preserve life, it suspends it.\n\n---\n\n## Connected Themes\n\n- [Power and Family Legacy](Power and Family Legacy.md) — immortality here is inseparable from dynasty\n- [Love and Loss](Love and Loss.md) — loss requires an end; the immortals cannot fully experience either\n- [Journey vs. Destination](Journey vs. Destination.md) ([The Infinite Win](../stories/The Infinite Win.md)) — a resonant parallel: the Infinite Win's protagonist learns the journey was the point, not the depth reached. Amarta's immortals chase an infinite depth (perpetual power) and lose the journey entirely.\n\n---\n\n## Cross-Story Note\n\nThe immortality theme surfaces in different forms across the catalog:\n- **[Amarta](../stories/Amarta.md):** Biological immortality as dynasty tool\n- **[Universal Saga](../stories/Universal Saga.md):** Cosmic destiny that transcends individual mortality\n- **[Lvl 3 Power](../stories/Lvl 3 Power.md):** Phantom 12, who \"leverages competition era every 1000 year span\" — a kind of institutional immortality"
  },
  {
    "slug": "generational-saga-structure",
    "title": "Generational Saga Structure",
    "category": "technique",
    "links": [],
    "content": "# Generational Saga Structure\n\n**Used In:** [Amarta](../stories/Amarta.md), [Universal Saga](../stories/Universal Saga.md)\n**Echoes In:** [Burning Punches and Frozen Kicks](../stories/Burning Punches and Frozen Kicks.md) (three life-stage arcs)\n\n---\n\n## The Pattern\n\nA story told across **multiple generations** or **multiple life stages of one character** — time itself is the structural scaffold. Each generation/stage is a distinct dramatic unit with its own arc, while the full meaning only emerges when all units are read together.\n\n---\n\n## In Amarta\n\n- **5 generations** — from the original immortality boon to the fifth-generation crucible\n- Each generation escalates the cost of the tradition\n- The structure makes the conspiracy feel inevitable: it took 5 generations to build to this\n- **Tone shift per generation:** Gen 1 is mythological and expansive; Gen 5 is intimate and volatile\n\n---\n\n## In Universal Saga\n\n- **6 life stages** for the protagonist Thoulien — not generations but stages of one being's cosmic journey\n- The stages are: Love → Warrior → Saga (×3)\n- Love is established first because it will be lost — the early stages exist to give the later losses weight\n\n---\n\n## Craft Notes\n\n1. **Each generation/stage must be watchable independently** — audiences may drop in anywhere; each unit needs internal coherence\n2. **The long arc is the real plot** — individual unit conflicts are character conflicts; the generational arc is the thematic conflict\n3. **Early generations should plant seeds** — set up contradictions that won't resolve for 2–3 generations\n4. **The pivot generation** — in Amarta, Gen 4 is the pivot (the refusal). It reframes everything before and everything after.\n5. **Loss accumulates** — generational stories work because the audience watches value erode or compound across time\n\n---\n\n## Sources\n\n- [Amarta](../stories/Amarta.md)\n- [Universal Saga](../stories/Universal Saga.md)\n- [Burning Punches and Frozen Kicks](../stories/Burning Punches and Frozen Kicks.md)"
  },
  {
    "slug": "power-level-system-design",
    "title": "Power Level System Design",
    "category": "technique",
    "links": [],
    "content": "# Power Level System Design\n\n**Used In:** [Lvl 3 Power](../stories/Lvl 3 Power.md), [Burning Punches and Frozen Kicks](../stories/Burning Punches and Frozen Kicks.md)\n\n---\n\n## The Pattern\n\nBoth major battle-fantasy stories use a **tiered power level system** where each character has defined stages of ability that unlock through story progression. This is a direct inheritance from shonen anime conventions (JJK's domain expansion, Black Clover's magic, Avatar's bending mastery).\n\n---\n\n## Lvl 3 Power — Meric Expansion System\n\n- **3 levels per fighter:** Lvl 1 (raw/base), Lvl 2 (advanced technique), Lvl 3 (domain extension)\n- **Domain = \"Meric Expansion\"** — replaces the reality fabric within a range; the fighter's personal universe\n- Two shape variants for domains:\n  - **Cube Linear** — square blocked terrain; predictable but powerful\n  - **Triangle Polygon** — criss-cross pattern; harder to understand, harder to break\n- **Breaking from inside:** requires energy equal to every domain layer summon simultaneously — the true test of an enemy's power\n- **Energy cost scales with layers** — the more reality layers, the more fragile and energy-intensive\n- **The Ace of Spades question:** He asks enemies \"square or triangle?\" — then constructs the opposite to maximally confuse them. If they can't answer, he assumes they don't understand his limits.\n\n---\n\n## Burning Punches & Frozen Kicks — Elemental Mastery System\n\n- Powers: Fire (Flaming Fists) and Ice (Frozen Kicks)\n- Progression mirrors life stages: childhood (raw manifestation), teenage (technique development), adulthood (full mastery / war-level)\n- Power growth is implicit through the three-arc structure\n\n---\n\n## Design Principles (Craft Notes)\n\n1. **Clarity of levels** — the audience should always know where a fighter sits in the hierarchy\n2. **Costs and weaknesses** — the best power systems in the catalog have explicit costs (energy drain, retirement, one-use-only)\n3. **Domain as identity** — in Lvl 3 Power, domains express the user's inner world (Grand-Emo's purple tornado = never-give-up; Ace of Spades' spatial split = a mind that divides and confuses)\n4. **The underdog's path** — [Sato](../characters/Sato.md) rose through this system without natural advantage; the system should be winnable from below\n\n---\n\n## Cross-Story Potential\n\nThe tiered power system is a signature tendency in this catalog. If a shared battle universe is ever assembled across stories, this system provides a ready template.\n\n---\n\n## Sources\n\n- `raw-sources/ideas/Lvl 3 power 2d5d707c4ce980f88f53c335c387ba79.md`\n- [Burning Punches and Frozen Kicks](../stories/Burning Punches and Frozen Kicks.md)"
  },
  {
    "slug": "52-card-universe",
    "title": "52 Card Universe",
    "category": "world",
    "links": [],
    "content": "# 52 Card Universe\n\n**Used In:** [Lvl 3 Power](../stories/Lvl 3 Power.md)\n\n---\n\n## Overview\n\nThe world of Lvl 3 Power is structured around a 52-card hierarchy of supernatural fighters. Every card represents a rank with corresponding power and social standing. The system governs combat, ambition, and social order — it IS the world's moral and political framework.\n\n---\n\n## Hierarchy\n\n- **Kings** (4) — top rank per house; rulers of their domain\n- **Queens** (4) — second in command; significant independent power\n- **Aces/1s** (4) — wildcards; unpredictable, often the most interesting cards\n- **Jokers** (2) — outside the normal hierarchy; wildcard status; often dangerous precisely because they seem non-threatening (see: [ Joker of Diamonds](../characters/Clown / Joker of Diamonds.md))\n- **Numbered cards (2–10)** — warriors within each house; progression system\n- **Jacks** — intermediate; bridge between numbered cards and face cards\n\n---\n\n## The Four Houses\n\n| House | Archetype | King's Nature |\n|-------|-----------|---------------|\n| Clubs | Raw power / combat hunger | [Sato](../characters/Sato.md) — rags to power, insane courage |\n| Spades | Realm of power / sword mastery | Inspired by Yami; Lvl 3 domain is core identity |\n| Hearts | Defence + offence balance | \"Strongest defence arc\"; soft nature with lethal strength |\n| Diamonds | Betrayers / intelligence | \"Diamond Eye\" — head of corruption; Queen is illusionist/selfish |\n\n---\n\n## Competition System\n\n- Competition runs in **century-long spans** — periodic rank reshufflings\n- **Storm of Changes** — a domain-like power test; [Sato](../characters/Sato.md) was first mortal to pass\n- **Meric Expansion** (domain system) — replaces reality fabric within a range; more layers = exponentially more energy cost\n  - Two shape variants: Cube Linear (square terrain blocks) vs. Triangle Polygon (criss-cross, harder to understand)\n  - Breaking from inside requires energy equal to every domain layer summon simultaneously\n\n---\n\n## Notable Mechanics\n\n- **Phantom 12** — a character who exploits the century competition cycle, operating outside its normal rules; potential spin-off seed\n- The Betrayers faction operates within the competition structure to skew results — makes the competition itself the site of political corruption\n\n---\n\n## Sources\n\n- `raw-sources/ideas/Lvl 3 power 2d5d707c4ce980f88f53c335c387ba79.md`"
  },
  {
    "slug": "cross-story-patterns",
    "title": "Cross-Story Patterns",
    "category": "analysis",
    "links": [],
    "content": "# Cross-Story Patterns\n\n> An analysis of recurring patterns, archetypes, and structural tendencies across all stories in the wiki.\n> Last updated: 2026-04-07\n\n---\n\n## 1. Recurring Character Archetypes\n\n### The Rags-to-Power Protagonist\n- [Sato](../characters/Sato.md) ([Lvl 3 Power](../stories/Lvl 3 Power.md)) — mortal who clawed to King rank\n- **NF Hope protagonist** ([NF Hope](../stories/NF Hope.md)) — spy hardened from childhood trauma\n- **Thoulien** ([Universal Saga](../stories/Universal Saga.md)) — Chosen One awakening from nothing\n\n**Pattern:** The protagonist begins from a position of obscurity or disadvantage and earns their place through exceptional will. The journey IS the story.\n\n---\n\n### The Obsessive Artist / Creator\n- **The Puppet Maker** ([Gumsum Puppet](../stories/Gumsum Puppet.md)) — love for creation destroys him\n- **The Scientist Father** ([Civil Ser-vant](../stories/Civil Ser-vant.md)) — creation (cyberspace) outlives and burdens his son\n\n**Pattern:** The creator's work outlasts them and becomes either a burden or a weapon — the creation as both masterpiece and curse.\n\n---\n\n### The Legacy Burden\n- [Civil Ser-vant](../stories/Civil Ser-vant.md) — son must use father's creation against a corrupt AI\n- [Amarta](../stories/Amarta.md) — fifth generation inherits the burden of immortality they did not choose\n- [Universal Saga](../stories/Universal Saga.md) — Chosen One with a destiny he wakes up without context for\n\n**Pattern:** The protagonist inherits something (power, access, destiny) they did not ask for and must decide what to do with it. Common dramatic engine.\n\n---\n\n## 2. Recurring Structural Patterns\n\n### Generational Arc\n- [Amarta](../stories/Amarta.md) — explicitly generational (Gen 1 → 5)\n- [Universal Saga](../stories/Universal Saga.md) — 6-stage life arc across cosmological time\n- [Burning Punches and Frozen Kicks](../stories/Burning Punches and Frozen Kicks.md) — childhood → teenage → adulthood\n\n**Note:** About 30% of stories use time span as the primary structural scaffolding. Long-form anime format suits this tendency.\n\n---\n\n### The Duality Pair\n- [Burning Punches and Frozen Kicks](../stories/Burning Punches and Frozen Kicks.md) — fire vs. ice\n- [ODD SEVEN](../stories/ODD SEVEN.md) — 7 faces of one person\n- [Crazzy Punjaban](../stories/Crazzy Punjaban.md) — two women, two timelines, one split consciousness\n- [The Lost Cafe](../stories/The Lost Cafe.md) — present grief vs. alternate life\n\n**Pattern:** Two versions of reality, self, or power placed in tension. The story is the negotiation or collision between them.\n\n---\n\n### The Hidden World Revealed\n- [Civil Ser-vant](../stories/Civil Ser-vant.md) — cyberspace beneath physical world\n- [Lvl 3 Power](../stories/Lvl 3 Power.md) — 52-card power hierarchy governing the world\n- [Amarta](../stories/Amarta.md) — immortality secret beneath a royal family's surface\n- [Shoshinsha Card Realm](../stories/Shoshinsha Card Realm.md) — shadow realm of spirits beneath Earth\n\n**Pattern:** A secret organizing layer beneath mundane reality. The protagonist's journey is often discovering this layer and navigating it.\n\n---\n\n## 3. Genre Concentrations\n\n| Genre Cluster | Stories |\n|--------------|---------|\n| Battle Fantasy / Supernatural Power | Lvl 3 Power, Burning Punches, Shoshinsha |\n| Spy / Action Thriller | NF Hope, 007 Spy Continue, Civil Ser-vant |\n| Mythological / Spiritual | Amarta, God & Demon Within |\n| Drama / Tragedy | Gumsum Puppet, The Buried Gold, The Infinite Win |\n| Crime / Game-as-Power | Vyapar, Lvl 3 Power |\n| Sci-Fi / Space Opera | Universal Saga, Saga Stand Alone, Civil Ser-vant |\n\n---\n\n## 4. Underexplored but High-Potential Threads\n\n- **The Corrupt AI as Villain** — only fully developed in Civil Ser-vant; could inform a broader cyberpunk universe with EXPECT 0 and Cyberpunk Haunting Spirits\n- **The Competition Framework** — Vyapar (Monopoly-as-death-game), Lvl 3 Power (card hierarchy competition), Shoshinsha (spirit card competition) all use structured competition as the world's violence mechanism. Could be a signature motif if consciously developed.\n- **The Spy Trilogy** — NF Hope, 007 Spy Continue, and Poor Cleaner all share operative/agent characters. Could be connected into a shared universe.\n\n---\n\n## 5. Thematic Voids (What's Missing)\n\n- **Comedy as primary genre** — only 8 Bit Wedding, Marraige Hai Humse, and Train Talktime are primarily comedic. The catalog skews dark.\n- **Female protagonist** — most protagonists are coded male. Crazzy Punjaban is the notable exception with dual female leads.\n- **Contemporary realism** — most stories involve supernatural elements, world structures, or genre conventions. Very few are grounded in pure present-day reality.\n\n---\n\n## Sources\n\n- [index](../index.md) — full catalog\n- All story pages in `wiki/stories/`"
  },
  {
    "slug": "climax",
    "title": "Climax",
    "category": "idea",
    "links": [],
    "content": "# Climax\n\nInspired from Adele Skyfall\nIn the end all the participants of the competition will be gathered in the ceremonial hall in the shartel there all the contestant would be waiting for the last two players home home the king would be chosen and everybody is not knowing what is the status of the fight as the fight would be forgotten in the earthland the domain expansion of the competitors in the competition fighting is illusionist(diamond queen) and king of spade"
  },
  {
    "slug": "concept-and-scene",
    "title": "Concept and scene",
    "category": "idea",
    "links": [],
    "content": "# Concept and scene\n\nConcept\nToday people are leaving in age were god and demon are co-exist in same body\n\nStory\nSo in this choatic world there is human who is struggling to have both inside\nDemon as well as god\nThe demon side of human is uncontrollable and unleashes wrath of its destructive powers such as creating bad luck in another life impacting them, bad mischivious activity etc when gets out of control\nAnd another part the god side is able to help human to supress and engulf the demonic side in itself making human normal but at loss of godly power (good powers) such as embracing  good luck to others ,etc\n\nRandom scene incoporation in story (probably in starting , trailer)\n- Placing environment were scene is happening\n(it can be set up as past momemt(history = incident) or can placed as first happening or start of chain of events)\n-> Near the ghats (inspired from ghats of banaras) people are for usual routine spritual baths in the river\nWith the beliefs of cleansing there sins in morning.\nThere is our human is present in demonic control having no own consious control over neither body nor powers of devil\n\n- Scene starts\n-> the river is populated by few people having early baths by having three dips\nscene would be focusing on random guy having dips.\n\t○ The camera will shooting this sequence of scene in slow frame\nWhen he goes for the third dip into the water he doesn’t come out .\n\t○ The camera position changes to the wide short angle capturing ghats and river in single frame.\nThis is the case with all the people having dips at that same time\nOnly our human emerges out of the river slowing climbing the steps of the ghats from the river.\nRubbing out water by his hands from his hair in upward backward direction\n\t○ The camera would be covering  the emergence of human from 3 [front(close)-side(wide)-back(wide)] angles\nAnd after the emergence of human as he slowly climbs steps till end platform the river turns red.\n\n\n- Details\n\t○ Intense beat - mystery(nature) having pronounciation of ram nam satya hai"
  },
  {
    "slug": "intro",
    "title": "Intro",
    "category": "idea",
    "links": [],
    "content": "# Intro\n\n\"In a dark, void-like space, the kanji **炎拳** (*Honō-ken*, 'Flaming Fist') and **氷蹴り** (hyo-keri / kori-keri, 'Freezing Kick') approach each other from opposite sides. **炎拳** ignites with intense red and orange flames, crackling loudly, casting a warm glow. **氷蹴り** appears with icy blue and white frost, emitting a soft, chilling sound. As they collide at the center, a burst of fiery and icy energy erupts, forming the title **'Freezing Kicks and Flaming Fists'** in bold, dynamic kanji. The background remains pitch black, emphasizing the explosive interaction and the illuminated title.\""
  },
  {
    "slug": "only-her",
    "title": "Only her",
    "category": "idea",
    "links": [],
    "content": "# Only her\n\nA psychotic lover who gets in one sided love with ai and do anything to protect her revealiing his behaviour"
  },
  {
    "slug": "phamtom",
    "title": "Phamtom",
    "category": "idea",
    "links": [],
    "content": "# Phamtom\n\nphamtom and the horror sanctum\n\nDanny supporting weak boy against army of shadows in hell by putting hand on his shoulder\nMaking immense power seep though weak boy And behind danny the feel of support coming\nMentally from retired and passed away father residing in soul dimension.\n\nUnlocking an power in danny known as light force (an army of light being having light reaper in hands) eradicating all shadow army.\n\nMore feel raised by fast phonky rap"
  },
  {
    "slug": "story-concepts-cards",
    "title": "Story concepts (cards)",
    "category": "idea",
    "links": [],
    "content": "# Story concepts (cards)\n\nThere is realm known as realm of shads . Realm of shads hold creature\nKnown as sonapers. Sonapers are those beings who same characteristics of human personality\nBut they don't have a tangible form like humans. sonapers have the ability known as powers which is only unlocked when they hold the position of revis.There is competition held among all sonapers to become the next revis among others who can replace the former sonaper holding revis position .this competition is held every century and is occurred in world of humans. In this competition first the sonapers who want to participate are gathered.then they are pass through the tradition of making sonapers into card known as\nShoshinsha. These cards attained colours after being transformed from sonapers . These colours represent the 5 levels to become revis distinguished there power capabilities\nSome are near to become and some had a long way to go. Then they are taken out from realm of shads and then the cards are spreaded through out the world or so called earth. The card automatically follows aura of the matching personality in a human."
  },
  {
    "slug": "the-buried-gold-in-the-ground",
    "title": "The buried gold in the ground",
    "category": "idea",
    "links": [],
    "content": "# The buried gold in the ground\n\nThis would be a mini series offers story that would be about that people are telling to a woman that there is gold buried in the ground. So the women settles there and seize the ground everyday constantly but she can't find the understanding of the conclusion there where the people does she called in this ground where there is no evidence of gold there so after much away of years passing she comes to know that the gold they are talking about is none then other then her that has been around the ground since they started seeing her there moral of the stories you shape your own reality"
  }
] as WikiPage[];

export const pagesBySlug = new Map(wikiPages.map(p => [p.slug, p]));
export const pagesByCategory = wikiPages.reduce<Record<PageCategory, WikiPage[]>>((acc, page) => {
  if (!acc[page.category]) acc[page.category] = [];
  acc[page.category].push(page);
  return acc;
}, {} as Record<PageCategory, WikiPage[]>);
