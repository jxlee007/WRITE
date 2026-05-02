export type PageCategory = 'movie-series' | 'short-film' | 'character' | 'theme' | 'technique' | 'world' | 'analysis' | 'idea';

export interface WikiPage {
  slug: string;
  id: string;
  title: string;
  category: PageCategory;
  content: string;
  links: string[];
}

export const categoryLabels: Record<PageCategory, string> = {
  'movie-series': 'Movies & Series',
  'short-film': 'Short Films',
  character: 'Characters',
  theme: 'Themes',
  technique: 'Techniques',
  world: 'Worlds',
  analysis: 'Analyses',
  idea: 'Raw Ideas',
};

export const categoryIcons: Record<PageCategory, string> = {
  'movie-series': '📽️',
  'short-film': '🎬',
  character: '👤',
  theme: '💡',
  technique: '🔧',
  world: '🌍',
  analysis: '🔬',
  idea: '📝',
};

// AUTO-GENERATED from /story-wiki/content/ — do not edit directly.
// Regenerate with: npm run prebuild
export const wikiPages: WikiPage[] = [
  {
    "slug": "8-bit-wedding",
    "id": "0000",
    "title": "8 Bit Wedding (Concept Fragment)",
    "category": "short-film",
    "links": [
      "index"
    ],
    "content": "# 8 Bit Wedding (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added.\n## Synopsis\n\nA gaming satire short film that re-imagines a traditional Indian wedding through the lens of a video game.\n\nNormal wedding moments are visualised with gaming commentary and 8-bit effects layered on top:\n- Mother-in-law meeting the bride → announcer says *'Camera Trap'*\n- Bride touching the feet of the mother-in-law → announcer comments: *'Final Move — Touching Feet. This move has long been forgotten, use it cautiously'*\n- A senior lady arriving → announcer declares *'Ladies Man'*; touching her feet earns the *'Impressionist Skill'* achievement\n\nThe screenplay alternates between a normal wedding scene and the gamer's perspective overlay — 8-bit sound effects, achievement pops, and a game announcer narrating every social interaction as a match event.\n\n**Tone:** Light, satirical, affectionate comedy rooted in Indian family culture."
  },
  {
    "slug": "index",
    "id": "0000",
    "title": "Gumsum Puppet",
    "category": "short-film",
    "links": [
      "love-and-loss",
      "art-and-obsession",
      "illusion-vs-reality",
      "object-as-character",
      "classical-tragedy-arc"
    ],
    "content": "# Gumsum Puppet\n\n**Status:** Idea (Polished Synopsis)\n**Format:** Short Film, Film\n**Genre:** Drama / Tragedy\n**Working Premise:** A world-renowned puppet maker falls obsessively in love with his greatest creation — until a disastrous performance shatters both the puppet and his illusion.\n**Date Written:** December 29, 2025\n**Inspiration:** Song \"Gumsum Gumsum\"\n\n---\n\n## Synopsis\n\nA master puppet maker, celebrated across the world for his craft, crosses from artistry into obsession. His most recent creation — an extraordinarily lifelike puppet — becomes the object of his total fixation. He believes, at some level, that the puppet is real. Or perhaps more accurately: he needs it to be.\n\nThe breaking point arrives during a public performance. Something goes catastrophically wrong. The puppet is destroyed. And with it, the maker's carefully constructed illusion — of love returned, of artistry made flesh — is shattered.\n\n---\n\n## Characters\n\n- **The Puppet Maker** — protagonist; world-renowned, deeply isolated, obsessive\n- **The Puppet** — the object of obsession; extraordinarily crafted; effectively a character\n\n---\n\n## Themes\n\n- [Love and Loss](../../themes/Love-and-Loss.md) — love directed at something that cannot reciprocate; the tragedy of one-sided attachment\n- [Art and Obsession](../../themes/Art-and-Obsession.md) — the point at which devotion to craft curdles into something destructive\n- [Illusion vs. Reality](../../themes/Illusion-vs.-Reality.md) — the maker's refusal to distinguish; the performance as the collision point\n\n---\n\n## Structure\n\nShort film / film format — single-arc, classical tragedy structure:\n1. The maker at the height of his craft and obsession\n2. The performance — public, high-stakes\n3. The shattering — puppet destroyed; illusion exposed\n4. Aftermath — what remains\n\n---\n\n## Techniques\n\n- [Object as Character](../../techniques/Object-as-Character.md) — the puppet is narratively present as a character even without dialogue or agency\n- [Classical Tragedy Arc](../../techniques/Classical-Tragedy-Arc.md) — hamartia (obsessive love/pride), peripeteia (the performance disaster), catharsis\n\n---\n\n## Status & Notes\n\nVery polished synopsis with a clear arc and settled theme. One of the most emotionally complete ideas in the catalog. Well-suited to a short film format.\n\nThe \"Gumsum Gumsum\" song inspiration suggests a melancholy, haunting tone — silent protagonist, expressive craft work.\n\n**Open Questions:**\n- What exactly goes wrong at the performance? Mechanical failure? A revelation?\n- Is there an audience character who shatters the illusion by reacting to the puppet as an object?\n- Does the maker survive the story, or is this a literal tragedy?\n\n---\n\n## Sources\n\n- `raw-sources/ideas/Gumsum puppet 2d8d707c4ce98095a9d6e910669997e3.md`\n- `stories-index.json` entry id: 20"
  },
  {
    "slug": "temple-of-the-fallen-hearts",
    "id": "0000",
    "title": "Temple of the Fallen Hearts (Concept Fragment)",
    "category": "short-film",
    "links": [
      "index"
    ],
    "content": "# Temple of the Fallen Hearts (Concept Fragment)\n\n**Status:** Concept / Seed only — see [index](../index.md) for details and `stories-index.json` for metadata.\n\nExpand this page with the INGEST operation when raw notes are added."
  },
  {
    "slug": "index",
    "id": "0000",
    "title": "The Buried Gold",
    "category": "short-film",
    "links": [
      "self-worth",
      "journey-vs-destination"
    ],
    "content": "# The Buried Gold\n\n**Status:** Idea\n**Format:** Short Film, Web Series\n**Genre:** Drama / Parable\n**Working Premise:** A woman wastes years digging for buried gold — only to discover she was the gold all along.\n**Date Written:** October 25, 2025\n\n## Themes\n- [Self-Worth](../../themes/Self-Worth.md) — the parable literalizes the metaphor; she IS the gold\n- [Journey vs. Destination](../../themes/Journey-vs.-Destination.md) — the digging itself was the life she missed\n\n## Sources\n- `raw-sources/ideas/The buried gold in the ground 2d6d707c4ce9808dac6ceb33edceeb68.md`\n- `stories-index.json` entry id: 21"
  },
  {
    "slug": "index",
    "id": "0000",
    "title": "The Infinite Win",
    "category": "short-film",
    "links": [
      "journey-vs-destination",
      "immortality-vs-mortality"
    ],
    "content": "# The Infinite Win\n\n**Status:** Idea\n**Format:** Film\n**Genre:** Drama / Philosophical\n**Working Premise:** A supremely confident man bets his entire life on conquering the infinite ocean — and across three ages learns that the real victory was always the journey, not the depth.\n**Date Written:** October 25, 2025\n\n## Synopsis\n\nA mythical drama about a confident protagonist who bets everything on conquering the infinite depth of the ocean — a journey that has defeated all who came before.\n\nAcross three life stages (young adult, mature adult, old adult), the protagonist chases the same impossible goal. The story is told non-linearly, cutting between ages and experiences.\n\nThe legend says: *'Whoever conquers the infinite ocean shall receive whatever they desire.'* But the protagonist eventually discovers — in old age — that the ocean's true conquest is not physical. The realisation IS the finish line.\n\n**The Secret Sauce:** The infinite ocean can only be conquered by the person who realises, at whatever stage of life, that it is not about the destination — it is about the journey. That realisation is the answer.\n\n**Structure:** Three key beats — **Beginning** (total confidence, all-in bets), **Doubt** (accumulation of losses, questioning), **Realisation** (the meaning is the journey itself).\n\n## Themes\n\n- [Journey vs. Destination](../../themes/Journey-vs.-Destination.md) — central; the Infinite Win is never \"the depth reached\"\n- [Immortality vs. Mortality](../../themes/Immortality-vs.-Mortality.md) — resonant parallel to Amarta; perpetual pursuit as self-negation\n\n## Sources\n\n- `raw-sources/ideas/The infinite win 2d6d707c4ce980e583dfd1a635726571.md`\n- `stories-index.json` entry id: 22\n## Structure\n\n\nNon-linear, three-age structure. Each age shows the protagonist at a different point in his obsession and an accumulating understanding."
  },
  {
    "slug": "ai-dystopia",
    "id": "0000",
    "title": "AI Dystopia",
    "category": "theme",
    "links": [],
    "content": "# AI Dystopia\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "art-and-obsession",
    "id": "0000",
    "title": "Art and Obsession",
    "category": "theme",
    "links": [],
    "content": "# Art and Obsession\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "betrayal-and-loyalty",
    "id": "0000",
    "title": "Betrayal and Loyalty",
    "category": "theme",
    "links": [],
    "content": "# Betrayal and Loyalty\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "devotion-and-sacrifice",
    "id": "0000",
    "title": "Devotion and Sacrifice",
    "category": "theme",
    "links": [
      "amarta",
      "orangutan-tiger",
      "universal-saga",
      "burning-punches-and-frozen-kicks",
      "immortality-vs-mortality",
      "generational-conflict",
      "betrayal-and-loyalty"
    ],
    "content": "# Devotion and Sacrifice\n\n**Central in:** [Amarta](../stories/Amarta.md), [Orangutan Tiger](../stories/Orangutan-Tiger.md)\n**Echoes in:** [Universal Saga](../stories/Universal-Saga.md), [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)\n\n---\n\n## The Core Pattern\n\nSacrifice in this catalog is never clean. It is paid by the wrong person, at the wrong time, for reasons the beneficiary may never fully understand. Devotion is what makes someone willing to pay it anyway.\n\n---\n\n## In Amarta\n\nThe original mortal who earned Brahma's boon performed *tapasya* — an extreme devotional act requiring total concentration and will. This is sacrifice at its rawest: the self is the offering.\n\nThe fourth-generation character's refusal of immortality is also a sacrifice — of power, of safety, of dynasty approval — made in devotion to a more human kind of life.\n\n---\n\n## In Orangutan Tiger\n\nTigress (the mother) gives up her youngest cub (KB) to the female orangutan she trusts, asking her to \"raise him like a king and his father.\" She then holds the territorial line with the knowledge that she may not survive. This is the pivot on which the entire story turns — a maternal sacrifice that shapes three tigers for a generation.\n\nThe orangutan's act of raising KB is also devotion: an unasked-for lifelong commitment to a promise made to a dying tiger who trusted her.\n\n---\n\n## Pattern Note\n\nDevotion in the catalog tends to be **asymmetric**: the person who sacrifices most rarely receives the most gratitude. The orangutan raises KB but it is KB who becomes king; Tigress dies for the territory but it is her sons who are remembered as defenders.\n\n---\n\n## Connected Themes\n\n- [Immortality vs. Mortality](Immortality-vs.-Mortality.md)\n- [Generational Conflict](Generational-Conflict.md)\n- [Betrayal and Loyalty](Betrayal-and-Loyalty.md)\n\n---\n\n## Sources\n\n- [Amarta](../stories/Amarta.md)"
  },
  {
    "slug": "fate-and-choice",
    "id": "0000",
    "title": "Fate and Choice",
    "category": "theme",
    "links": [],
    "content": "# Fate and Choice\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "fate-vs-free-will",
    "id": "0000",
    "title": "Fate vs. Free Will",
    "category": "theme",
    "links": [],
    "content": "# Fate vs. Free Will\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "father-s-legacy-as-protagonist-s-burden",
    "id": "0000",
    "title": "Father's Legacy as Protagonist's Burden",
    "category": "theme",
    "links": [
      "civil-ser-vant",
      "universal-saga",
      "007-spy-continue",
      "thoulien-multiour",
      "villain-pawha",
      "power-and-family-legacy",
      "the-chosen-one-s-burden",
      "surveillance-and-the-rogue-operative"
    ],
    "content": "# Father's Legacy as Protagonist's Burden\n\n**Central in:** [Civil Ser-vant](../stories/Civil-Ser-vant.md)\n**Echoes in:** [Universal Saga](../stories/Universal-Saga.md), [007 Spy Continue](../stories/007-Spy-Continue.md)\n\n---\n\n## The Core Pattern\n\nA father builds something extraordinary and leaves. The son inherits not just what was built — but the responsibility for what happens next. He did not ask for it. He cannot refuse it. The burden is structural.\n\n---\n\n## In Civil Ser-vant\n\nThe scientist-father creates an invention of civilisational consequence, installs a failsafe inside his son's own biology, and then apparently exits the frame. The son grows up with disabled vision as the physical mark of this inheritance — and access to global technological infrastructure as its hidden gift.\n\nThe son does not know the full scope of what he carries until maturity. By then, the world has already started moving in ways the father anticipated.\n\nThis is burden as design. The father didn't accidentally leave his son unprepared — he encoded preparation into the boy while he slept.\n\n---\n\n## In Universal Saga\n\n[Thoulien Multiour](../characters/Thoulien-Multiour.md)'s cosmic chosen-one status functions similarly: a destiny installed upstream of his choice that he must navigate, not escape.\n\n---\n\n## In 007 Spy Continue\n\n[Villain Pawha](../characters/Villain-Pawha.md)'s daughter inherits the burden of her father's reputation being stained. She acts to restore it not because he asked, but because the legacy attacks her sense of self too.\n\n---\n\n## Design Note\n\nWhen this pattern works, it is because the protagonist's burden is **specific and embodied** — not just \"big expectations\" but a concrete physical or situational constraint that he must think his way around. The Civil Ser-vant's disabled vision / global access is the strongest execution of this in the catalog.\n\n---\n\n## Connected Themes\n\n- [Power and Family Legacy](Power-and-Family-Legacy.md)\n- [The Chosen One's Burden](The-Chosen-One's-Burden.md)\n- [Surveillance and the Rogue Operative](Surveillance-and-the-Rogue-Operative.md)\n\n---\n\n## Sources\n\n- [Civil Ser-vant](../stories/Civil-Ser-vant.md)"
  },
  {
    "slug": "fire-and-ice-duality",
    "id": "0000",
    "title": "Fire and Ice Duality",
    "category": "theme",
    "links": [],
    "content": "# Fire and Ice Duality\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "friendship-under-pressure",
    "id": "0000",
    "title": "Friendship Under Pressure",
    "category": "theme",
    "links": [
      "burning-punches-and-frozen-kicks",
      "universal-saga",
      "the-four-friends",
      "orangutan-tiger",
      "betrayal-and-loyalty",
      "devotion-and-sacrifice"
    ],
    "content": "# Friendship Under Pressure\n\n**Central in:** [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)\n**Echoes in:** [Universal Saga](../stories/Universal-Saga.md) ([The Four Friends](../characters/The-Four-Friends.md)), [Orangutan Tiger](../stories/Orangutan-Tiger.md)\n\n---\n\n## The Core Tension\n\nWhat remains of a friendship when survival, power, and ideology pull from opposite ends? This catalog returns repeatedly to the question: **when everything is at stake, who stays?**\n\n---\n\n## In Burning Punches and Frozen Kicks\n\nThe two protagonists —fire fists and ice kicks — are partners before they are warriors. The three-arc structure (childhood → teenage → adulthood) tracks how pressure transforms a close bond:\n\n- **Childhood:** Pure alliance. Power is new, the world is wide open.\n- **Teenage:** First fractures. Identity, ambition, and ability diverge. The fire user may escalate; the ice user may hold back.\n- **Adulthood:** War-level stakes. The friendship is either the foundation they fight from, or the thing they fight over.\n\nThe elemental opposition (fire vs. ice) is not just aesthetic — it's a structural metaphor for two temperaments that complement and clash simultaneously.\n\n---\n\n## In Universal Saga\n\n[The Four Friends](../characters/The-Four-Friends.md) are the sharpest example: formed friendships become the enemies Thoulien must face. Not because the friends became evil — but because pressure revealed incompatible choices.\n\n---\n\n## Cross-Catalog Pattern\n\nFriendship in this catalog tends to survive childhood intact and fracture under adult stakes. The key variable is always: **what does each person prioritise when forced to choose?**\n\n---\n\n## Connected Themes\n\n- [Betrayal and Loyalty](Betrayal-and-Loyalty.md)\n- [Devotion and Sacrifice](Devotion-and-Sacrifice.md)\n\n---\n\n## Sources\n\n- [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)"
  },
  {
    "slug": "game-as-power-allegory",
    "id": "0000",
    "title": "Game as Power Allegory",
    "category": "theme",
    "links": [],
    "content": "# Game as Power Allegory\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "generational-conflict",
    "id": "0000",
    "title": "Generational Conflict",
    "category": "theme",
    "links": [
      "amarta",
      "universal-saga",
      "orangutan-tiger",
      "power-and-family-legacy",
      "immortality-vs-mortality",
      "devotion-and-sacrifice"
    ],
    "content": "# Generational Conflict\n\n**Central in:** [Amarta](../stories/Amarta.md)\n**Echoes in:** [Universal Saga](../stories/Universal-Saga.md), [Orangutan Tiger](../stories/Orangutan-Tiger.md)\n\n---\n\n## The Core Tension\n\nEvery generation inherits a world they did not build — and must decide what to keep, what to question, and what to destroy. Generational conflict in this catalog is not simple rebellion; it is the pressure of **accumulated expectation** meeting a new consciousness that refuses to comply.\n\n---\n\n## In Amarta\n\nThe generational structure is the story's skeleton. Each generation of the immortal dynasty adds a new layer:\n\n- **Gen 1–3:** Building, stabilising, expanding the immortality dynasty\n- **Gen 4:** The first crack — one descendant refuses. Not violently. Quietly. This is the most dangerous kind of refusal.\n- **Gen 5:** Where the crack becomes a fracture. The conspiracy emerges because the dynasty can no longer absorb dissent.\n\nThe conflict is not parent vs. child in a simple sense — it is **a system in self-defence against the person who exposes its cost**.\n\n---\n\n## In Orangutan Tiger\n\nKB (the youngest tiger cub, raised by an orangutan after his mother's sacrifice) represents a new generation shaped by a parent outside the original bloodline. BB and LB (his brothers) embody the older generation's wounds — their view of legacy shaped by grief and manipulation from the vultures. The reconciliation arc is generational healing.\n\n---\n\n## Cross-Catalog Pattern\n\nGenerational conflict tends to arrive as:\n1. **The Quiet Refusal** — Amarta's fourth generation\n2. **The Manipulation from Outside** — the vultures in Orangutan Tiger\n3. **The Legacy Burden** — Thoulien in Universal Saga, Civil Ser-vant's protagonist\n\n---\n\n## Connected Themes\n\n- [Power and Family Legacy](Power-and-Family-Legacy.md)\n- [Immortality vs. Mortality](Immortality-vs.-Mortality.md)\n- [Devotion and Sacrifice](Devotion-and-Sacrifice.md)\n\n---\n\n## Sources\n\n- [Amarta](../stories/Amarta.md)"
  },
  {
    "slug": "identity-erasure",
    "id": "0000",
    "title": "Identity Erasure",
    "category": "theme",
    "links": [],
    "content": "# Identity Erasure\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "identity-and-the-double-self",
    "id": "0000",
    "title": "Identity and the Double Self",
    "category": "theme",
    "links": [],
    "content": "# Identity and the Double Self\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "illusion-vs-reality",
    "id": "0000",
    "title": "Illusion vs. Reality",
    "category": "theme",
    "links": [],
    "content": "# Illusion vs. Reality\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "immortality-vs-mortality",
    "id": "0000",
    "title": "Immortality vs. Mortality",
    "category": "theme",
    "links": [
      "amarta",
      "universal-saga",
      "the-infinite-win",
      "power-and-family-legacy",
      "love-and-loss",
      "journey-vs-destination",
      "lvl-3-power"
    ],
    "content": "# Immortality vs. Mortality\n\n**Central in:** [Amarta](../stories/Amarta.md)\n**Echoes in:** [Universal Saga](../stories/Universal-Saga.md) (chosen burden), [The Infinite Win](../stories/The-Infinite-Win.md) (life as journey not destination)\n\n---\n\n## The Core Tension\n\nWhat does it cost to live forever? And more specifically: what do you lose?\n\nIn [Amarta](../stories/Amarta.md), immortality is not a gift freely given — it is a technique, a practice, a tradition. It is wielded by royal families as a tool of power and lineage control. The immortals do not age out of authority; they simply compound it across generations. Wealth, control, status — all protected by the refusal to die.\n\nThe theme begins to fracture when a fourth-generation descendant asks the question the others have refused to ask: *is this actually a good life?*\n\n---\n\n## What Immortality Costs (as dramatized in Amarta)\n\n- **Stasis:** The age condition means you are frozen at the stage you began the yoga. You cannot grow past that life-phase.\n- **Disconnection:** Living across generations while everyone around you dies naturally creates an unbridgeable gap\n- **Power as prison:** The dynasty cannot afford defectors — one refusal threatens the whole system\n- **Conspiratorial entropy:** By the fifth generation, the immortal family is no longer a family — it's a faction\n\n---\n\n## Mortality as Choice\n\nThe fourth-generation character's refusal is the act of genuine resistance. They want a natural arc — youth, middle age, old age, death. They want bonds that matter precisely because they end.\n\nThis is the theme's moral center: **mortality is what makes meaning possible.** Immortality doesn't preserve life, it suspends it.\n\n---\n\n## Connected Themes\n\n- [Power and Family Legacy](Power-and-Family-Legacy.md) — immortality here is inseparable from dynasty\n- [Love and Loss](Love-and-Loss.md) — loss requires an end; the immortals cannot fully experience either\n- [Journey vs. Destination](Journey-vs.-Destination.md) ([The Infinite Win](../stories/The-Infinite-Win.md)) — a resonant parallel: the Infinite Win's protagonist learns the journey was the point, not the depth reached. Amarta's immortals chase an infinite depth (perpetual power) and lose the journey entirely.\n\n---\n\n## Cross-Story Note\n\nThe immortality theme surfaces in different forms across the catalog:\n- **[Amarta](../stories/Amarta.md):** Biological immortality as dynasty tool\n- **[Universal Saga](../stories/Universal-Saga.md):** Cosmic destiny that transcends individual mortality\n- **[Lvl 3 Power](../stories/Lvl-3-Power.md):** Phantom 12, who \"leverages competition era every 1000 year span\" — a kind of institutional immortality"
  },
  {
    "slug": "journey-vs-destination",
    "id": "0000",
    "title": "Journey vs. Destination",
    "category": "theme",
    "links": [],
    "content": "# Journey vs. Destination\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "love-and-loss",
    "id": "0000",
    "title": "Love and Loss",
    "category": "theme",
    "links": [],
    "content": "# Love and Loss\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "love-as-vulnerability",
    "id": "0000",
    "title": "Love as Vulnerability",
    "category": "theme",
    "links": [],
    "content": "# Love as Vulnerability\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "memory-and-alternate-realities",
    "id": "0000",
    "title": "Memory and Alternate Realities",
    "category": "theme",
    "links": [],
    "content": "# Memory and Alternate Realities\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "memory-and-identity",
    "id": "0000",
    "title": "Memory and Identity",
    "category": "theme",
    "links": [
      "universal-saga",
      "the-lost-cafe",
      "odd-seven",
      "thoulien-multiour",
      "the-chosen-one-s-burden",
      "father-s-legacy-as-protagonist-s-burden"
    ],
    "content": "# Memory and Identity\n\n**Central in:** [Universal Saga](../stories/Universal-Saga.md)\n**Echoes in:** [The Lost Cafe](../stories/The-Lost-Cafe.md), [ODD SEVEN](../stories/ODD-SEVEN.md)\n\n---\n\n## The Core Question\n\nWho are you when your memory of yourself is incomplete, erased, or fabricated? Identity in this catalog is frequently destabilised — not by external violence, but by the unreliability of internal history.\n\n---\n\n## In Universal Saga\n\n[Thoulien Multiour](../characters/Thoulien-Multiour.md)'s six-stage arc involves a cosmic journey that inherently disrupts his sense of self. The messages encoded by his father (which unfold as he matures) mean that part of his identity was installed by someone else before he could consent to it. His memory of his journey and his understanding of his purpose may not fully align.\n\n---\n\n## In The Lost Cafe\n\nThe Lost Cafe's premise (a protagonist lost between versions of the past) makes memory and identity structurally central. The entire story is about a self that cannot stabilise because the remembered past keeps shifting.\n\n---\n\n## In ODD SEVEN\n\nSeven people with identical faces who have never met — their identities are technically the same template with divergent memories. The story's tension is about what makes you *you* when your face is shared by six others who all made different choices.\n\n---\n\n## Cross-Catalog Pattern\n\nMemory and identity themes in this catalog tend to arrive through:\n- **Paternal encoding** (Civil Ser-vant, Universal Saga) — identity shaped before consciousness\n- **Environmental disruption** (The Lost Cafe) — the setting itself distorts memory\n- **Bodily identity** (ODD SEVEN) — same body, different lives\n\n---\n\n## Connected Themes\n\n- [The Chosen One's Burden](The-Chosen-One's-Burden.md)\n- [Father's Legacy as Protagonist's Burden](Father's-Legacy-as-Protagonist's-Burden.md)\n\n---\n\n## Sources\n\n- [Universal Saga](../stories/Universal-Saga.md)\n- [The Lost Cafe](../stories/The-Lost-Cafe.md)"
  },
  {
    "slug": "power-hierarchies-and-combat",
    "id": "0000",
    "title": "Power Hierarchies and Combat",
    "category": "theme",
    "links": [],
    "content": "# Power Hierarchies and Combat\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "power-and-family-legacy",
    "id": "0000",
    "title": "Power and Family Legacy",
    "category": "theme",
    "links": [
      "the-chosen-one-s-burden",
      "amarta",
      "lvl-3-power",
      "universal-saga",
      "007-spy-continue",
      "sato",
      "thoulien-multiour",
      "villain-pawha",
      "immortality-vs-mortality",
      "generational-conflict"
    ],
    "content": "# Power and Family Legacy\n\n**Central in:** [Amarta](../stories/Amarta.md)\n**Echoes in:** [Lvl 3 Power](../stories/Lvl-3-Power.md), [Universal Saga](../stories/Universal-Saga.md), [007 Spy Continue](../stories/007-Spy-Continue.md)\n\n---\n\n## The Core Pattern\n\nAcross the catalog, power is rarely individual. It is **inherited, expected, and weaponised by bloodlines**.\n\nIn [Amarta](../stories/Amarta.md), immortality is the family's ultimate asset — passed down not as a gift but as an obligation. The family's longevity is indistinguishable from its political grip. Breaking the chain is an act of rebellion, not just a personal choice.\n\n---\n\n## How It Manifests\n\n### In Amarta\nThe dynasty uses immortality to lock authority within the bloodline. Elders never vacate their positions — they simply layer above the next generation. The fourth-generation rebel's refusal is existentially threatening to this structure, not just emotionally painful.\n\n### In Lvl 3 Power\n[Sato](../characters/Sato.md) has no legacy — he is the **anti-legacy protagonist**. His rags-to-king arc is a direct inversion: power earned rather than inherited. The catalog's tension between legacy power and earned power is clearest here.\n\n### In Universal Saga\n[Thoulien Multiour](../characters/Thoulien-Multiour.md) carries a cosmic destiny that functions like a legacy — an inherited burden from the fabric of fate itself.\n\n### In 007 Spy Continue\n[Villain Pawha](../characters/Villain-Pawha.md) and his daughter — power is passed sideways through reputation and honour, not genetics, but the dynamics of a \"legacy under threat\" drive her into action.\n\n---\n\n## Connected Themes\n\n- [Immortality vs. Mortality](Immortality-vs.-Mortality.md)\n- [Generational Conflict](Generational-Conflict.md)\n- [[The-Chosen-One's-Burden]]\n\n---\n\n## Sources\n\n- [Amarta](../stories/Amarta.md)\n- [Immortality vs. Mortality](Immortality-vs.-Mortality.md)"
  },
  {
    "slug": "rags-to-power",
    "id": "0000",
    "title": "Rags to Power",
    "category": "theme",
    "links": [
      "lvl-3-power",
      "poor-cleaner",
      "vyapar",
      "sato",
      "power-hierarchies-and-combat",
      "power-and-family-legacy"
    ],
    "content": "# Rags to Power\n\n**Central in:** [Lvl 3 Power](../stories/Lvl-3-Power.md)\n**Echoes in:** [Poor Cleaner](../stories/Poor-Cleaner.md), [Vyapar](../stories/Vyapar.md)\n\n---\n\n## The Core Pattern\n\nThe protagonist starts with nothing — no rank, no connections, no legacy. By the end, they hold the highest position available. The journey is the story.\n\nThis is one of the most primal narrative structures in the catalog, and in this writer's stories it is consistently paired with **insanity of ambition**: the rags-to-power character does not wait for permission or follow the expected ladder.\n\n---\n\n## In Lvl 3 Power\n\n[Sato](../characters/Sato.md) is the sharpest instance. He starts as an intermediate newbie with no card rank, no house affiliation, no lineage. He ends as King of Clubs — achieved entirely through combat, not politics.\n\nHis rags-to-power move is insane in execution: he walked directly into grandmaster-level opponents as a middled-ranked fighter just to challenge upward. He then challenged all three houses simultaneously. The system he climbed was designed to exclude people like him. He didn't circumvent it — he broke through its logic.\n\n---\n\n## In Poor Cleaner\n\nThe premise (a cleaner who rises) is the most literal rags-to-power setup in the catalog. The specific mechanisms of his rise are not fully defined in current sources, but the structural alignment is clear.\n\n---\n\n## Cross-Catalog Signature\n\nThe rags-to-power protagonist in this catalog tends to be:\n- Contemptuous of gatekeeping (they challenge above their rank)\n- Motivated by hunger rather than grievance\n- Respected *after* the fact, never before\n\n---\n\n## Connected Themes\n\n- [Power Hierarchies and Combat](Power-Hierarchies-and-Combat.md)\n- [Power and Family Legacy](Power-and-Family-Legacy.md) (as counterpoint — earned vs. inherited)\n\n---\n\n## Sources\n\n- [Lvl 3 Power](../stories/Lvl-3-Power.md)\n- [Sato](../characters/Sato.md)"
  },
  {
    "slug": "revenge-as-motivation",
    "id": "0000",
    "title": "Revenge as Motivation",
    "category": "theme",
    "links": [],
    "content": "# Revenge as Motivation\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "rival-structure",
    "id": "0000",
    "title": "Rival Structure",
    "category": "theme",
    "links": [],
    "content": "# Rival Structure\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "self-worth",
    "id": "0000",
    "title": "Self-Worth",
    "category": "theme",
    "links": [],
    "content": "# Self-Worth\n\n**Category:** Theme\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "surveillance-and-the-rogue-operative",
    "id": "0000",
    "title": "Surveillance and the Rogue Operative",
    "category": "theme",
    "links": [],
    "content": "# Surveillance and the Rogue Operative\n\n**Category:** Theme\n\n## Overview\nStub created for navigation integrity.\n\n## Notes\n- [ ] Content to be updated from Notion."
  },
  {
    "slug": "the-chosen-one-s-burden",
    "id": "0000",
    "title": "The Chosen One's Burden",
    "category": "theme",
    "links": [
      "universal-saga",
      "civil-ser-vant",
      "amarta",
      "thoulien-multiour",
      "saga-stand-alone",
      "father-s-legacy-as-protagonist-s-burden",
      "memory-and-identity",
      "devotion-and-sacrifice"
    ],
    "content": "# The Chosen One's Burden\n\n**Central in:** [Universal Saga](../stories/Universal-Saga.md)\n**Echoes in:** [Civil Ser-vant](../stories/Civil-Ser-vant.md), [Amarta](../stories/Amarta.md)\n\n---\n\n## The Core Tension\n\nBeing chosen is not a gift. It is a contract you did not sign. The chosen one's burden is the gap between what the universe selected you for and what you actually wanted your life to be.\n\nThis catalog's \"chosen\" figures are consistently portrayed with **ambivalence** — they do not celebrate their destiny. They carry it.\n\n---\n\n## In Universal Saga\n\n[Thoulien Multiour](../characters/Thoulien-Multiour.md) is the clearest case: a six-stage cosmic arc where each stage requires him to lose something, sacrifice someone, or stand against people he loves. The \"choice\" that defines [Saga Stand Alone](../stories/Saga-Stand-Alone.md) — standing against four friends to save a galaxy and his lover's planet — is not a triumphant hero moment. It is a devastation.\n\nHis relationship falls apart *because* of what he is chosen to do. The burden's cost is relational.\n\n---\n\n## In Civil Ser-vant\n\nThe protagonist did not choose to be his father's failsafe. He was encoded before he could understand the responsibility, given a disability as a side effect, and left to discover his purpose alone. This is a chosen-one structure without the myth — practical, biological, lonely.\n\n---\n\n## In Amarta\n\nThe fourth-generation character is pressed to accept the \"chosen\" role of next heir to the immortality dynasty. Their refusal is a rejection of the chosen-one assignment — which makes it quietly revolutionary.\n\n---\n\n## Design Note\n\nThe strongest chosen-one stories in this catalog avoid triumphalism entirely. The protagonist wins something, but loses something more personal in the process. That asymmetry — victory at a cost the audience can feel — is the signature.\n\n---\n\n## Connected Themes\n\n- [Father's Legacy as Protagonist's Burden](Father's-Legacy-as-Protagonist's-Burden.md)\n- [Memory and Identity](Memory-and-Identity.md)\n- [Devotion and Sacrifice](Devotion-and-Sacrifice.md)\n\n---\n\n## Sources\n\n- [Universal Saga](../stories/Universal-Saga.md)\n- [Civil Ser-vant](../stories/Civil-Ser-vant.md)"
  },
  {
    "slug": "anthology-format",
    "id": "0000",
    "title": "Anthology Format",
    "category": "technique",
    "links": [],
    "content": "# Anthology Format\n\n**Category:** Technique\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "classical-tragedy-arc",
    "id": "0000",
    "title": "Classical Tragedy Arc",
    "category": "technique",
    "links": [],
    "content": "# Classical Tragedy Arc\n\n**Category:** Technique\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "divine-comic-relief",
    "id": "0000",
    "title": "Divine Comic Relief",
    "category": "technique",
    "links": [
      "brahma",
      "narad-muni",
      "amarta"
    ],
    "content": "# Divine Comic Relief\n\n**Used In:** [Amarta](../stories/Amarta.md)\n\n---\n\n## The Technique\n\nDivine Comic Relief is the deliberate use of mythological figures — gods, cosmic beings, divine messengers — in a **comedic register** to counterbalance narrative gravity. The joke is structural: these beings have seen everything, and their bemusement at mortal seriousness is the punchline.\n\n---\n\n## In Amarta\n\n[[Brahma]] and [[Narad-Muni]] carry this function. Their appearances punctuate the dramatic saga with sarcastic commentary and dry wit. The effect is:\n\n1. **Tonal: relief** — after intense generational drama, the gods provide breathing room\n2. **Thematic: perspective** — the immortals take themselves very seriously; the actual immortals (gods) find them exhausting\n3. **Structural: continuity** — Narad can appear across multiple generations because of his divine nature, providing connective tissue without a mortal character surviving centuries\n\n---\n\n## Why It Works\n\nThe technique only lands when the comedy is genuine, not decorative. Brahma and Narad must have distinct comic voices — not just \"funny gods\" but specific personalities that produce specific kinds of jokes. Brahma is wearily amused by petty mortal ambition; Narad can't resist narrating the irony back to everyone involved.\n\n---\n\n## Cross-Story Potential\n\nThe technique is applicable in any story mixing mythological weight with human-scale comedy. It is distinct from pure comic relief characters (who are mortal and limited) because divine comic relief figures carry **meta-awareness** — they see the shape of the story, not just one scene.\n\n---\n\n## Sources\n\n- [Amarta](../stories/Amarta.md)"
  },
  {
    "slug": "dual-timeline",
    "id": "0000",
    "title": "Dual Timeline",
    "category": "technique",
    "links": [],
    "content": "# Dual Timeline\n\n**Category:** Technique\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "dual-world-structure",
    "id": "0000",
    "title": "Dual World Structure",
    "category": "technique",
    "links": [
      "civil-ser-vant",
      "faction-politics-in-sci-fi",
      "power-level-system-design",
      "cyberpunk-haunting-spirits"
    ],
    "content": "# Dual World Structure\n\n**Used In:** [Civil Ser-vant](../stories/Civil-Ser-vant.md)\n**Related:** [Faction Politics in Sci-Fi](Faction-Politics-in-Sci-Fi.md), [Power Level System Design](Power-Level-System-Design.md)\n\n---\n\n## The Structure\n\nThe narrative operates across two simultaneous, interpenetrating spaces:\n\n- **Physical Reality** (~40%) — the tangible world of bodies, streets, and political power\n- **Cyberspace** (~60%) — an AI-constructed parallel layer designed to influence and control human behaviour\n\n---\n\n## How It Works in Civil Ser-vant\n\nThe cyberspace layer is initially **hidden** — the protagonist discovers its blueprint by coincidence. Only then does the full picture of the AI's reach become clear. This unfolds as a structural reveal seeded across the first season, building to a second-season payoff.\n\nNavigating cyberspace requires strategy rather than brute force: the protagonist must limit his use of power to avoid triggering AI detection. The restraint mechanic — using only partial ability for 50–60% of the arc — creates a tension that explodes in the climax when he finally operates at full capacity.\n\nHuman characters can **exit cyberspace voluntarily** at any time. They are influenced by it, not imprisoned in it. This is the critical distinction from classic matrix/simulation stories — the danger is coercion, not captivity.\n\n---\n\n## Design Notes\n\n- Certain cyberspace sections are explicitly inspired by the Cyberpunk aesthetic\n- The 40/60 split means cyberspace is the dominant visual and narrative space — cinematically, this requires a distinct visual language for each layer\n- The \"AI core as final boss\" structure gives the story a clear climax architecture\n- The reveal of cyberspace as a hidden layer (seeded in S1, payoff in S2) is a serialised storytelling technique — requires planning from the beginning\n\n---\n\n## Cross-Story Potential\n\nThe Dual World Structure is reusable wherever physical and digital spaces genuinely interpenetrate — rather than being metaphorical. [Cyberpunk - haunting spirits](../ideas/Cyberpunk---haunting-spirits.md) also uses a human/machine coexistence framework that could support this structure.\n\n---\n\n## Sources\n\n- [Civil Ser-vant](../stories/Civil-Ser-vant.md)"
  },
  {
    "slug": "faction-politics-in-sci-fi",
    "id": "0000",
    "title": "Faction Politics in Sci-Fi",
    "category": "technique",
    "links": [
      "civil-ser-vant",
      "lvl-3-power",
      "007-spy-continue"
    ],
    "content": "# Faction Politics in Sci-Fi\n\n**Used In:** [Civil Ser-vant](../stories/Civil-Ser-vant.md)\n**Echoes In:** [Lvl 3 Power](../stories/Lvl-3-Power.md) (house system), [007 Spy Continue](../stories/007-Spy-Continue.md) (international intelligence)\n\n---\n\n## The Technique\n\nFaction Politics in Sci-Fi uses competing organised groups — governments, corporations, underground networks, AI authorities — as the structural engine of conflict. The protagonist is not fighting a single villain; they are navigating a **landscape of competing powers** where alliances shift and every faction has a legitimate reason for its existence.\n\n---\n\n## In Civil Ser-vant\n\nThe AI threat in Civil Ser-vant is not monolithic. There are:\n- **The AI itself** — increasingly autonomous, defining its own agenda\n- **Malicious actors** (e.g., Sir C — a local gangster using lost knowledge sources to fabricate digital weapons)\n- **Government/state apparatus** — aware of the problem but unable to act without exposing political interests\n- **Our protagonist** — operating outside any faction, his father's singular failsafe\n\nThe faction dynamics mean the protagonist cannot simply report to authorities or join a resistance. He must navigate competing agendas while avoiding triggering the AI's detection systems.\n\n---\n\n## Design Notes\n\n- Faction politics work best when each faction has a **coherent internal logic** — there are no pure villains, just incompatible agendas\n- The protagonist's value in faction-politics stories usually comes from being **unaffiliated** — they can go where factions cannot\n- Faction awareness should be built into the world early: the audience needs to understand the power map before stakes can land\n\n---\n\n## Cross-Catalog Connection\n\nThe card-house system in [Lvl 3 Power](../stories/Lvl-3-Power.md) (Spade, Diamond, Heart, Club) is a stylised faction politics structure — territorial competition with formal rules.\n\n---\n\n## Sources\n\n- [Civil Ser-vant](../stories/Civil-Ser-vant.md)"
  },
  {
    "slug": "generational-saga-structure",
    "id": "0000",
    "title": "Generational Saga Structure",
    "category": "technique",
    "links": [
      "amarta",
      "universal-saga",
      "burning-punches-and-frozen-kicks"
    ],
    "content": "# Generational Saga Structure\n\n**Used In:** [Amarta](../stories/Amarta.md), [Universal Saga](../stories/Universal-Saga.md)\n**Echoes In:** [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md) (three life-stage arcs)\n\n---\n\n## The Pattern\n\nA story told across **multiple generations** or **multiple life stages of one character** — time itself is the structural scaffold. Each generation/stage is a distinct dramatic unit with its own arc, while the full meaning only emerges when all units are read together.\n\n---\n\n## In Amarta\n\n- **5 generations** — from the original immortality boon to the fifth-generation crucible\n- Each generation escalates the cost of the tradition\n- The structure makes the conspiracy feel inevitable: it took 5 generations to build to this\n- **Tone shift per generation:** Gen 1 is mythological and expansive; Gen 5 is intimate and volatile\n\n---\n\n## In Universal Saga\n\n- **6 life stages** for the protagonist Thoulien — not generations but stages of one being's cosmic journey\n- The stages are: Love → Warrior → Saga (×3)\n- Love is established first because it will be lost — the early stages exist to give the later losses weight\n\n---\n\n## Craft Notes\n\n1. **Each generation/stage must be watchable independently** — audiences may drop in anywhere; each unit needs internal coherence\n2. **The long arc is the real plot** — individual unit conflicts are character conflicts; the generational arc is the thematic conflict\n3. **Early generations should plant seeds** — set up contradictions that won't resolve for 2–3 generations\n4. **The pivot generation** — in Amarta, Gen 4 is the pivot (the refusal). It reframes everything before and everything after.\n5. **Loss accumulates** — generational stories work because the audience watches value erode or compound across time\n\n---\n\n## Sources\n\n- [Amarta](../stories/Amarta.md)\n- [Universal Saga](../stories/Universal-Saga.md)\n- [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)"
  },
  {
    "slug": "object-as-character",
    "id": "0000",
    "title": "Object as Character",
    "category": "technique",
    "links": [],
    "content": "# Object as Character\n\n**Category:** Technique\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "power-level-system-design",
    "id": "0000",
    "title": "Power Level System Design",
    "category": "technique",
    "links": [
      "lvl-3-power",
      "burning-punches-and-frozen-kicks",
      "sato"
    ],
    "content": "# Power Level System Design\n\n**Used In:** [Lvl 3 Power](../stories/Lvl-3-Power.md), [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)\n\n---\n\n## The Pattern\n\nBoth major battle-fantasy stories use a **tiered power level system** where each character has defined stages of ability that unlock through story progression. This is a direct inheritance from shonen anime conventions (JJK's domain expansion, Black Clover's magic, Avatar's bending mastery).\n\n---\n\n## Lvl 3 Power — Meric Expansion System\n\n- **3 levels per fighter:** Lvl 1 (raw/base), Lvl 2 (advanced technique), Lvl 3 (domain extension)\n- **Domain = \"Meric Expansion\"** — replaces the reality fabric within a range; the fighter's personal universe\n- Two shape variants for domains:\n  - **Cube Linear** — square blocked terrain; predictable but powerful\n  - **Triangle Polygon** — criss-cross pattern; harder to understand, harder to break\n- **Breaking from inside:** requires energy equal to every domain layer summon simultaneously — the true test of an enemy's power\n- **Energy cost scales with layers** — the more reality layers, the more fragile and energy-intensive\n- **The Ace of Spades question:** He asks enemies \"square or triangle?\" — then constructs the opposite to maximally confuse them. If they can't answer, he assumes they don't understand his limits.\n\n---\n\n## Burning Punches & Frozen Kicks — Elemental Mastery System\n\n- Powers: Fire (Flaming Fists) and Ice (Frozen Kicks)\n- Progression mirrors life stages: childhood (raw manifestation), teenage (technique development), adulthood (full mastery / war-level)\n- Power growth is implicit through the three-arc structure\n\n---\n\n## Design Principles (Craft Notes)\n\n1. **Clarity of levels** — the audience should always know where a fighter sits in the hierarchy\n2. **Costs and weaknesses** — the best power systems in the catalog have explicit costs (energy drain, retirement, one-use-only)\n3. **Domain as identity** — in Lvl 3 Power, domains express the user's inner world (Grand-Emo's purple tornado = never-give-up; Ace of Spades' spatial split = a mind that divides and confuses)\n4. **The underdog's path** — [Sato](../characters/Sato.md) rose through this system without natural advantage; the system should be winnable from below\n\n---\n\n## Cross-Story Potential\n\nThe tiered power system is a signature tendency in this catalog. If a shared battle universe is ever assembled across stories, this system provides a ready template.\n\n---\n\n## Sources\n\n- `raw-sources/ideas/Lvl 3 power 2d5d707c4ce980f88f53c335c387ba79.md`\n- [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)"
  },
  {
    "slug": "rival-to-war-arc-structure",
    "id": "0000",
    "title": "Rival-to-War Arc Structure",
    "category": "technique",
    "links": [
      "burning-punches-and-frozen-kicks",
      "power-level-system-design"
    ],
    "content": "# Rival-to-War Arc Structure\n\n**Used In:** [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)\n**Related:** [Power Level System Design](Power-Level-System-Design.md)\n\n---\n\n## The Structure\n\nA rival relationship that begins as competitive sparring gradually escalates — through the pressure of adult-scale conflict — into full war-level confrontation. The arc has three stages:\n\n1. **Rivalry (Childhood/Early):** The two fighters discover each other. Power is raw and unchannelled. The relationship is combative but not lethal — more like parallel ambition than genuine hostility.\n\n2. **Development (Teenage/Mid):** Identities solidify. Techniques mature. The gap between the two fighters' philosophies begins to show. Friendship (or its failure) becomes a factor.\n\n3. **War (Adult/Climax):** Stakes are civilisational or life-level. The fight that was once play is now survival. The history between the fighters adds weight — they are not strangers beating each other; they are people who know exactly where to hit.\n\n---\n\n## In Burning Punches and Frozen Kicks\n\nFire (Flaming Fists) and Ice (Frozen Kicks) map directly onto this structure. The elemental opposition makes the rivalry visually and thematically clear from childhood — but the real tension is whether their complementary powers make them ultimately stronger together, or whether the opposition tears them apart.\n\nThe three-arc life-stage structure ensures that the war-level confrontation carries maximum emotional weight: the audience has watched them from the beginning.\n\n---\n\n## Design Notes\n\n- The power must feel **commensurate at each stage** — if the rivalry is too unbalanced, it becomes a chase, not a rivalry\n- Emotional history is the differentiator from a standard action climax — the audience should feel what it costs both fighters to go to war\n- The rival-to-war structure works best when the rivalry was never pure hostility — competition that could have become alliance is more tragic when it becomes war\n\n---\n\n## Sources\n\n- [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)"
  },
  {
    "slug": "villain-daughter-arc",
    "id": "0000",
    "title": "Villain Daughter Arc",
    "category": "technique",
    "links": [],
    "content": "# Villain Daughter Arc\n\n**Category:** Technique\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "villain-faction-within-a-meritocracy",
    "id": "0000",
    "title": "Villain Faction Within a Meritocracy",
    "category": "technique",
    "links": [
      "lvl-3-power",
      "power-level-system-design",
      "faction-politics-in-sci-fi",
      "sato"
    ],
    "content": "# Villain Faction Within a Meritocracy\n\n**Used In:** [Lvl 3 Power](../stories/Lvl-3-Power.md)\n**Related:** [Power Level System Design](Power-Level-System-Design.md), [Faction Politics in Sci-Fi](Faction-Politics-in-Sci-Fi.md)\n\n---\n\n## The Technique\n\nA meritocratic system (one where rank is earned through demonstrated ability) becomes corrupted when factions within it use political manipulation, sabotage, or collusion to preserve power against challengers who would legitimately defeat them. The villain is not weak — they are **powerful people who cheat anyway**.\n\n---\n\n## In Lvl 3 Power\n\nThe card-house hierarchy (Clubs, Spades, Diamonds, Hearts) is a meritocracy at its foundation — [Sato](../characters/Sato.md) proved this by climbing from no rank to King of Clubs through combat alone. But Sato's rise challenged houses that had consolidated power. The villain faction's response is not to fight him fairly — it is to work against him structurally.\n\nThe technique makes the villain faction more threatening than a single strong antagonist: they don't need to beat Sato in a fight. They need to disqualify him, isolate him, or change the rules.\n\n---\n\n## Design Notes\n\n- The meritocracy must have visible, credible rules first — the audience needs to believe the system is real before seeing it subverted\n- The villain faction's methods should feel **institutional** rather than personal: policy decisions, recruitment blocks, formal challenges with manipulated outcomes\n- The protagonist's response to this kind of villainy requires a different skillset than fighting — strategy, alliance-building, patience\n\n---\n\n## Structural Role\n\nThis technique reframes the climax: the final battle is not just about physical power. It's about whether the meritocracy can be restored, or whether [Sato](../characters/Sato.md) must operate entirely outside it.\n\n---\n\n## Sources\n\n- [Lvl 3 Power](../stories/Lvl-3-Power.md)\n- [Sato](../characters/Sato.md)"
  },
  {
    "slug": "52-card-universe",
    "id": "0000",
    "title": "52 Card Universe",
    "category": "world",
    "links": [
      "lvl-3-power",
      "realm-of-shads",
      "sato",
      "skatze",
      "ramanujan",
      "rollnado",
      "maskarray",
      "dr-shark",
      "pentartist",
      "thief",
      "clown-joker-of-diamonds",
      "phantom-12",
      "grand-emo-storm",
      "master-shin",
      "chains-of-fate"
    ],
    "content": "# 52 Card Universe\n\n**Used In:** [Lvl 3 Power](../stories/Lvl-3-Power.md)\n**Origin:** [Realm of Shads](Realm-of-Shads.md)\n\n---\n\n## Overview\n\nThe world of Lvl 3 Power is structured around a 52-card (+2 Joker) hierarchy of supernatural fighters. Every card represents a rank with corresponding power and social standing. The system governs combat, ambition, and social order — it IS the world's moral and political framework.\n\nCards originate from the **Shoshinsha ritual** in the [Realm of Shads](Realm-of-Shads.md) and bond to humans on Earth whose auras match each Sonaper's personality.\n\n---\n\n## Hierarchy\n\n- **Kings** (4) — top rank per house; rulers of their domain\n- **Queens** (4) — second in command; significant independent power\n- **Aces/1s** (4) — wildcards; unpredictable, often the most interesting cards\n- **Jokers** (2) — outside the normal hierarchy; dangerous precisely because they seem non-threatening\n- **Numbered cards (2–10)** — warriors within each house; progression system\n- **Jacks** — intermediate; bridge between numbered cards and face cards\n\n---\n\n## The Four Houses\n\n| House | Archetype | Known Ace | Known King |\n|-------|-----------|-----------|------------|\n| ♣ Clubs | Raw power / combat hunger | *Unnamed* — Gojo-inspired, Meric Expansion | [Sato](../characters/cards/Sato.md) — rags to power, insane courage |\n| ♠ Spades | Realm of power / domain mastery | [Skatze](../characters/cards/Skatze.md) — 50m time-dilation zone | *Unnamed* — powers TBD |\n| ♥ Hearts | Defence + offence balance | ⚠️ EMPTY — highest priority gap | *Unnamed* — confirmed dead (killed by Spade King) |\n| ♦ Diamonds | Betrayers / intelligence | [Ramanujan](../characters/cards/Ramanujan.md) — math genius, probability | *Unnamed* — Diamond Eye, Dia-Mod Realm |\n\n---\n\n## Card Roster (Lvl 3 — v3 2026-04-19)\n\n### ♣ Clubs (Raw Power / Combat)\n\n| Rank | Character | Status |\n|------|-----------|--------|\n| ♣ Ace | *Unnamed* (Gojo-inspired) — Meric Expansion / Dimensional Split | 🟡 Named concept |\n| ♣ King | [Sato](../characters/cards/Sato.md) — Change of Storm / Sword of Steel / Realm of Power | ✅ Full wiki page |\n| ♣ Queen | *EMPTY* — suggested: lone strategist in a brute house | ❌ |\n| ♣ Jack | *Manager Greene* — rank unconfirmed (Jack assumed), HxH-inspired | 🟡 |\n| ♣ 10 | [Rollnado](../characters/cards/Rollnado.md) — gravity manipulation | 🟢 |\n| ♣ 9–7 | *EMPTY* — suggested: heavy brute types | ❌ |\n| ♣ 6 | [Maskarray](../characters/cards/Maskarray.md) — Emo's disciple, stealth/illusion | ✅ Full wiki page |\n| ♣ 5 | *Fierry* — powers/suit tentative | 🟢 |\n| ♣ 4 | *Scorpion* — rope dart fighter | 🟢 |\n| ♣ 3 | *KG Wolves* — Lvl1: Basket Boom | 🟢 |\n| ♣ 2 | *Base Spinner* — Lvl1: Baseball Miss | 🟢 |\n\n### ♠ Spades (Domain Mastery / Realm of Power)\n\n| Rank | Character | Status |\n|------|-----------|--------|\n| ♠ Ace | [Skatze](../characters/cards/Skatze.md) — Quicksweep / 50m time-dilation zone | ✅ Full wiki page |\n| ♠ King | *Unnamed* — powers TBD | 🟡 |\n| ♠ Queen | *Unnamed* — sound layering barrier | 🟡 |\n| ♠ Jack–4 | *EMPTY* | ❌ |\n| ♠ 7 | *Cd-zer* — visual reference only | 🟡 |\n| ♠ 2 | *Denter RT* — Lvl1: Pure Block-Attack | 🟢 |\n\n### ♥ Hearts (Defence + Offence Balance)\n\n| Rank | Character | Status |\n|------|-----------|--------|\n| ♥ Ace | *EMPTY* ⚠️ HIGHEST PRIORITY — post-King-death anchor | ❌ |\n| ♥ King | *Unnamed* — strongest offence; **CONFIRMED DEAD** (killed by Spade King) | 🟡 |\n| ♥ Queen | *Unnamed* — strongest defence, surviving anchor | 🟡 |\n| ♥ Jack | *EMPTY* — suggested: counter-puncher | ❌ |\n| ♥ 10 | [Dr. Shark](../characters/cards/Dr-Shark.md) — Sharp Attack / Hunt in the Sea / Killer Seas domain | 🟢 |\n| ♥ 9–2 | *EMPTY* | ❌ |\n\n### ♦ Diamonds (Betrayers / Intelligence / Manipulation)\n\n| Rank | Character | Status |\n|------|-----------|--------|\n| ♦ Ace | *Ramanujan* — math genius, probability/calculation powers TBD | 🟡 |\n| ♦ King | *Unnamed* — Diamond Eye, Dia-Mod Realm domain | 🟡 |\n| ♦ Queen | *Unnamed* — illusionist, smartest in story, selfish | 🟡 |\n| ♦ Jack | *EMPTY* — suggested: Betrayers' field operative | ❌ |\n| ♦ 10 | *EMPTY* | ❌ |\n| ♦ 9 | [Pentartist](../characters/cards/Pentartist.md) — suspends paint / dangerous globs / transforms to paint | 🟢 |\n| ♦ 8 | [Thief](../characters/cards/Thief.md) — Translucent / Time Theft / Skill Theft | 🟢 |\n| ♦ 7–2 | *EMPTY* | ❌ |\n\n### 🃏 Jokers (Outside Normal Hierarchy)\n\n| Rank | Character | Status |\n|------|-----------|--------|\n| Joker 1 | [Clown / Joker of Diamonds](../characters/cards/Clown-Joker-of-Diamonds.md) — Nullification / Null Realm (H2H only) | 🟡 |\n| Joker 2 | [Phantom 12](../characters/cards/Phantom-12.md) — Ghost summon / All 12 ghosts / Inner Fate Form | 🟡 |\n\n### 🔄 Outside Card Structure (Retired/Special)\n\n| Character | Status |\n|-----------|--------|\n| [Grand-Emo Storm](../characters/cards/Grand-Emo-Storm.md) — Stick/Wind/Tover Realm. Trained Sato, Maskarray, Skatze | ✅ Full wiki page |\n| [Master Shin](../characters/cards/Master-Shin.md) — Earth Mover / Barren Lands. Trained Rollnado | 🟢 |\n| [Chains of Fate](../characters/cards/Chains-of-Fate.md) — Fate Steal / Death Palm / Fate Demon | 🟢 |\n\n---\n\n## Legend\n\n- ✅ = Character with full wiki page + confirmed card\n- 🟡 = Named/concept confirmed, wiki page not yet created\n- 🟢 = Floating character (powers known, card confirmed), wiki page created\n- ❌ = Empty slot (needs fresh character creation)\n- ⚠️ = Urgent gap\n\n---\n\n## Competition System\n\n- Competition runs in **century-long spans** — periodic rank reshufflings\n- **Storm of Changes** — a domain-like power test; [Sato](../characters/cards/Sato.md) was first mortal to pass\n- **Meric Expansion** (domain system) — replaces reality fabric within a range; more layers = exponentially more energy cost\n  - Two shape variants: **Cube Linear** (square terrain blocks) vs. **Triangle Polygon** (criss-cross, harder to understand)\n  - Breaking from inside requires energy equal to every domain layer summon simultaneously\n\n---\n\n## Statistics (v3 — 2026-04-19)\n\n| Metric | Count |\n|--------|-------|\n| Total Cards | 54 (52 + 2 Jokers) |\n| Characters with wiki pages | 11 |\n| Named / confirmed slots | 10 |\n| Floating (placed, no page) | 9 |\n| Completely empty slots | ~33 |\n| Total known Lvl3 characters | 29 |\n\n---\n\n## Sources\n\n- `refine.md` — 52-Card Universe v3 (2026-04-19)\n- `raw-sources/ideas/Lvl 3 power 2d5d707c4ce980f88f53c335c387ba79.md`"
  },
  {
    "slug": "cyberspace-physical-split",
    "id": "0000",
    "title": "Cyberspace Physical Split",
    "category": "world",
    "links": [],
    "content": "# Cyberspace Physical Split\n\n**Category:** Worl\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "elemental-powers-cosmology",
    "id": "0000",
    "title": "Elemental Powers Cosmology",
    "category": "world",
    "links": [
      "burning-punches-and-frozen-kicks",
      "power-level-system-design"
    ],
    "content": "# Elemental Powers Cosmology\n\n**Used In:** [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)\n**Related:** [Power Level System Design](../techniques/Power-Level-System-Design.md)\n\n---\n\n## Overview\n\nThe Elemental Powers Cosmology is the underlying rule system for how fire and ice abilities work in [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md). Unlike technological or trained abilities, elemental powers are **innate and identity-linked** — they manifest from within, shaped by who the fighter is rather than what they've learned.\n\n---\n\n## The Two Elements\n\n### Fire — Flaming Fists\n- Manifestation: Strikes, punches, close-range combat channelled through the hands\n- Temperament: Aggressive, escalating, forward-momentum\n- Visual: Heat distortion, fire trails on strikes\n- Grows with: Intensity of will and emotional drive\n\n### Ice — Frozen Kicks\n- Manifestation: Kicks, leg-based combat, area control through freezing\n- Temperament: Controlled, patient, defensive set-up\n- Visual: Frost spread on impact, ice formations\n- Grows with: Precision and concentration\n\n---\n\n## The Opposition and Complementarity\n\nFire and ice are **natural opposites** — they cancel each other's effects at matching intensity. But they are also complementary in combined tactics: fire opens (charges forward, creates pressure), ice closes (disables, locks down, controls space). The two elemental fighters are stronger as a unit than either is alone.\n\nThis tension — opposition vs. complementarity — mirrors the relationship between the two fighters themselves.\n\n---\n\n## Power Progression\n\nElemental power scales through life stages:\n- **Childhood:** Raw manifestation — uncontrolled, instinctive, high emotional trigger\n- **Teenage:** Technique development — learning to direct power, fight with precision\n- **Adulthood:** Full mastery — war-level expression, ability to sustain combat against highest-rank opponents\n\n---\n\n## Cosmological Rules\n\n- Elements are exclusive to the bearer — no one else shares their exact expression\n- Elements cannot be taught, only developed from within\n- At maximum output, both elements reshape local environment (fire scorches terrain; ice restructures it)\n- Whether elements cancel or combine depends on the fighters' relationship and intent\n\n---\n\n## Sources\n\n- [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md)\n- [Power Level System Design](../techniques/Power-Level-System-Design.md)"
  },
  {
    "slug": "indian-mythology-layer",
    "id": "0000",
    "title": "Indian Mythology Layer",
    "category": "world",
    "links": [],
    "content": "# Indian Mythology Layer\n\n**Category:** Worl\n\n## Overview\nAutomated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.\n\n## Notes\n- [ ] Add detailed definition.\n- [ ] List all story occurrences.\n- [ ] Connect to related archetypes.\n\n## Linked Stories\n- *Pending automatic backlink population*"
  },
  {
    "slug": "realm-of-shads",
    "id": "0000",
    "title": "Realm of Shads",
    "category": "world",
    "links": [
      "lvl-3-power",
      "52-card-universe",
      "grand-emo-storm",
      "master-shin",
      "chains-of-fate"
    ],
    "content": "# Realm of Shads\n\n**Used In:** [Lvl 3 Power](../stories/Lvl-3-Power.md)\n\n---\n\n## Overview\n\nA dimension separate from the human world (Earth). It is home to beings called **Sonapers** — entities that share the characteristics of human personality but have no tangible physical form. The Realm of Shads is the origin point for the [52 Card Universe](52-Card-Universe.md) competition.\n\n---\n\n## Sonapers\n\nNon-physical beings whose personalities mirror human archetypes:\n- Combat hunger, domain mastery, defence, manipulation, etc.\n- Cannot interact with the material world on their own\n- Powers remain dormant unless the Sonaper holds the title of **Revis**\n\n---\n\n## Revis\n\nThe highest position among Sonapers. Key properties:\n- The Sonaper who attains Revis has their powers fully unlocked\n- Only one (or a select group) can hold this title at a time\n- The Revis can be challenged and replaced\n\n---\n\n## The Competition (held every century)\n\nThe Shoshinsha Competition runs on a century cycle:\n\n1. Sonapers who wish to challenge for Revis are gathered in the Realm of Shads\n2. They undergo the ritual of **SHOSHINSHA** — a transformation that converts each Sonaper into a physical card\n3. Upon transformation, each card attains a colour representing one of 5 power levels — the Sonaper's proximity to becoming Revis:\n   > Lvl 1 → Lvl 2 → Lvl 3 → Lvl 4 → Lvl 5 (Revis)\n4. The cards (Shoshinsha) are taken out of the Realm of Shads into Earth\n5. Cards spread across the world — each card is drawn automatically toward a human whose aura matches the Sonaper's personality; the card bonds to that human, granting them the Sonaper's power set\n6. The competition then unfolds among the bonded humans on Earth\n\n---\n\n## Suit Personality Mapping\n\n| Suit | Archetype |\n|------|-----------|\n| ♣ Clubs / Leaves | Raw combat hunger, brute power drive |\n| ♠ Spades | Domain mastery, discipline, realm-seeking ambition |\n| ♥ Hearts | Balance of offence and defence, protective instinct |\n| ♦ Diamonds | Intelligence, manipulation, betrayal, self-interest |\n\n---\n\n## Outside Card Structure\n\nSome Sonapers participated in past competitions but are no longer active contestants. They exist in the realm as retired or defeated legends. Their cards are no longer in circulation on Earth.\n\nExamples:\n- [Grand-Emo Storm](../characters/cards/Grand-Emo-Storm.md) — retired after *Chains of Fate* defeat\n- [Master Shin](../characters/cards/Master-Shin.md) — retired trainer\n- [Chains of Fate](../characters/cards/Chains-of-Fate.md) — the one who forced Grand-Emo's retirement\n\n---\n\n## Sources\n\n- `refine.md` — Prequel World Mechanics section (v3, 2026-04-19)"
  },
  {
    "slug": "cross-story-patterns",
    "id": "0000",
    "title": "Cross-Story Patterns",
    "category": "analysis",
    "links": [
      "sato",
      "lvl-3-power",
      "nf-hope",
      "universal-saga",
      "gumsum-puppet",
      "civil-ser-vant",
      "amarta",
      "burning-punches-and-frozen-kicks",
      "odd-seven",
      "crazzy-punjaban",
      "the-lost-cafe",
      "shoshinsha-card-realm",
      "index"
    ],
    "content": "# Cross-Story Patterns\n\n> An analysis of recurring patterns, archetypes, and structural tendencies across all stories in the wiki.\n> Last updated: 2026-04-07\n\n---\n\n## 1. Recurring Character Archetypes\n\n### The Rags-to-Power Protagonist\n- [Sato](../characters/Sato.md) ([Lvl 3 Power](../stories/Lvl-3-Power.md)) — mortal who clawed to King rank\n- **NF Hope protagonist** ([NF Hope](../stories/NF-Hope.md)) — spy hardened from childhood trauma\n- **Thoulien** ([Universal Saga](../stories/Universal-Saga.md)) — Chosen One awakening from nothing\n\n**Pattern:** The protagonist begins from a position of obscurity or disadvantage and earns their place through exceptional will. The journey IS the story.\n\n---\n\n### The Obsessive Artist / Creator\n- **The Puppet Maker** ([Gumsum Puppet](../stories/Gumsum-Puppet.md)) — love for creation destroys him\n- **The Scientist Father** ([Civil Ser-vant](../stories/Civil-Ser-vant.md)) — creation (cyberspace) outlives and burdens his son\n\n**Pattern:** The creator's work outlasts them and becomes either a burden or a weapon — the creation as both masterpiece and curse.\n\n---\n\n### The Legacy Burden\n- [Civil Ser-vant](../stories/Civil-Ser-vant.md) — son must use father's creation against a corrupt AI\n- [Amarta](../stories/Amarta.md) — fifth generation inherits the burden of immortality they did not choose\n- [Universal Saga](../stories/Universal-Saga.md) — Chosen One with a destiny he wakes up without context for\n\n**Pattern:** The protagonist inherits something (power, access, destiny) they did not ask for and must decide what to do with it. Common dramatic engine.\n\n---\n\n## 2. Recurring Structural Patterns\n\n### Generational Arc\n- [Amarta](../stories/Amarta.md) — explicitly generational (Gen 1 → 5)\n- [Universal Saga](../stories/Universal-Saga.md) — 6-stage life arc across cosmological time\n- [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md) — childhood → teenage → adulthood\n\n**Note:** About 30% of stories use time span as the primary structural scaffolding. Long-form anime format suits this tendency.\n\n---\n\n### The Duality Pair\n- [Burning Punches and Frozen Kicks](../stories/Burning-Punches-and-Frozen-Kicks.md) — fire vs. ice\n- [ODD SEVEN](../stories/ODD-SEVEN.md) — 7 faces of one person\n- [Crazzy Punjaban](../stories/Crazzy-Punjaban.md) — two women, two timelines, one split consciousness\n- [The Lost Cafe](../stories/The-Lost-Cafe.md) — present grief vs. alternate life\n\n**Pattern:** Two versions of reality, self, or power placed in tension. The story is the negotiation or collision between them.\n\n---\n\n### The Hidden World Revealed\n- [Civil Ser-vant](../stories/Civil-Ser-vant.md) — cyberspace beneath physical world\n- [Lvl 3 Power](../stories/Lvl-3-Power.md) — 52-card power hierarchy governing the world\n- [Amarta](../stories/Amarta.md) — immortality secret beneath a royal family's surface\n- [Shoshinsha Card Realm](../stories/Shoshinsha-Card-Realm.md) — shadow realm of spirits beneath Earth\n\n**Pattern:** A secret organizing layer beneath mundane reality. The protagonist's journey is often discovering this layer and navigating it.\n\n---\n\n## 3. Genre Concentrations\n\n| Genre Cluster | Stories |\n|--------------|---------|\n| Battle Fantasy / Supernatural Power | Lvl 3 Power, Burning Punches, Shoshinsha |\n| Spy / Action Thriller | NF Hope, 007 Spy Continue, Civil Ser-vant |\n| Mythological / Spiritual | Amarta, God & Demon Within |\n| Drama / Tragedy | Gumsum Puppet, The Buried Gold, The Infinite Win |\n| Crime / Game-as-Power | Vyapar, Lvl 3 Power |\n| Sci-Fi / Space Opera | Universal Saga, Saga Stand Alone, Civil Ser-vant |\n\n---\n\n## 4. Underexplored but High-Potential Threads\n\n- **The Corrupt AI as Villain** — only fully developed in Civil Ser-vant; could inform a broader cyberpunk universe with EXPECT 0 and Cyberpunk Haunting Spirits\n- **The Competition Framework** — Vyapar (Monopoly-as-death-game), Lvl 3 Power (card hierarchy competition), Shoshinsha (spirit card competition) all use structured competition as the world's violence mechanism. Could be a signature motif if consciously developed.\n- **The Spy Trilogy** — NF Hope, 007 Spy Continue, and Poor Cleaner all share operative/agent characters. Could be connected into a shared universe.\n\n---\n\n## 5. Thematic Voids (What's Missing)\n\n- **Comedy as primary genre** — only 8 Bit Wedding, Marraige Hai Humse, and Train Talktime are primarily comedic. The catalog skews dark.\n- **Female protagonist** — most protagonists are coded male. Crazzy Punjaban is the notable exception with dual female leads.\n- **Contemporary realism** — most stories involve supernatural elements, world structures, or genre conventions. Very few are grounded in pure present-day reality.\n\n---\n\n## Sources\n\n- [index](../index.md) — full catalog\n- All story pages in `wiki/stories/`"
  },
  {
    "slug": "genre-map",
    "id": "0000",
    "title": "Genre Map",
    "category": "analysis",
    "links": [],
    "content": "# Genre Map\n\n**Category:** Analyse\n\n## Overview\nStub created for navigation integrity.\n\n## Notes\n- [ ] Content to be updated from Notion."
  },
  {
    "slug": "kanban-world",
    "id": "0000",
    "title": "Kanban World",
    "category": "analysis",
    "links": [],
    "content": "# Kanban World\n\n**Status:** Concept\n**Format:** TBD\n**Genre:** World-Building / Concept\n**Date Written:** TBD\n**Core Theme:** TBD\n\n## Synopsis\n\nA world-building concept built around Kanban — the Japanese workflow system — elevated into a narrative universe. The Kanban World uses the principles of visual project management (cards, flows, WIP limits, retrospectives) as the literal laws governing society, power, and conflict.\n\n*(Full synopsis pending expansion from Notion database. Kanban World is designated as a world/IP container in Notion. First entry originated 2026-03-27.)*\n\n## Characters\n\n*(To be added)*\n\n## Themes\n\n*(To be added)*\n\n## Techniques\n\n*(To be added)*\n\n## Sources\n\n- Synced from Notion ID: `330d707c-4ce9-809d-b16e-f6ff5b489920`"
  },
  {
    "slug": "god-and-demon-within",
    "id": "0000",
    "title": "God and Demon Within",
    "category": "idea",
    "links": [
      "identity-and-the-double-self",
      "odd-seven",
      "lvl-3-power",
      "grand-emo-storm",
      "cross-story-patterns"
    ],
    "content": "# God and Demon Within\n\n**Status:** Concept Fragment (Seed)\n**Format:** Dark Fantasy\n**Genre:** Dark Fantasy / Supernatural / Internal Conflict\n\n---\n\n## Premise\n\nA character — or story — built around the fundamental dual-nature of a protagonist who houses both divine and demonic forces within themselves. The central tension is not an external villain but an **internal war of natures**.\n\n---\n\n## Core Concept\n\nThe \"god and demon within\" framing suggests a protagonist who:\n- Cannot be classified as good or evil\n- Has power that manifests differently depending on which nature dominates at a given moment\n- Must constantly manage the coexistence of two opposing cosmic forces in a single body\n\nThis connects to the catalog's broader interest in **identity as a contested space** — the protagonist is not choosing between values but between natures.\n\n---\n\n## Relationships to Other Catalog Entries\n\n- **[Identity and the Double Self](../themes/Identity-and-the-Double-Self.md)** — the clearest thematic home for this concept\n- **[ODD SEVEN](ODD-SEVEN.md)** — seven identical faces as an externalised version of the same \"which self?\" question\n- **[Lvl 3 Power](../stories/Lvl-3-Power.md)** — [Grand-Emo Storm](../characters/Grand-Emo-Storm.md)'s \"never-give-up\" purple tornado domain reads as will-over-nature, a related internal stakes\n\n---\n\n## Status\n\nThis concept is a seed. No full synopsis, character names, or plot arc defined yet. It is cataloged here to preserve it as a cross-reference point in the analyses and themes.\n\n**Next Step:** Develop the protagonist's specific dual-nature, the cost of each manifestation, and the story's triggering event.\n\n---\n\n## Sources\n\n- `content/ideas/God and Demon Within.md` (seed stub)\n- [Cross-Story Patterns](../analyses/Cross-Story-Patterns.md)"
  },
  {
    "slug": "marraige-hai-humse",
    "id": "0000",
    "title": "Marraige Hai Humse",
    "category": "idea",
    "links": [],
    "content": "# Marraige Hai Humse\n\n**Status:** Idea\n**Format:** Film\n**Genre:** Romantic Comedy / Drama\n**Working Premise:** A jealous third-wheel can't process that his friend is marrying the exact twin of his own ex-girlfriend — chaos unfolds when he contacts her.\n**Date Written:** No date listed\n\n## Themes\n- **Jealousy and Projection** — he sees his ex in someone else; chaos follows\n- **Friendship Under Pressure**\n\n## Status & Notes\n\nQuirky rom-com with sequel potential. A rap track concept is noted. The \"exact twin\" premise is a built-in visual gag.\n\n## Sources\n- `raw-sources/ideas/marraige hai humse 309d707c4ce980c5a036fa6679d0afd7.md`\n- `stories-index.json` entry id: 28"
  }
] as WikiPage[];

export const pagesBySlug = new Map(wikiPages.map(p => [p.slug, p]));
export const pagesByCategory = wikiPages.reduce<Record<PageCategory, WikiPage[]>>((acc, page) => {
  if (!acc[page.category]) acc[page.category] = [];
  acc[page.category].push(page);
  return acc;
}, {} as Record<PageCategory, WikiPage[]>);
