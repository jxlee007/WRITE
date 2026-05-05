// AUTO-GENERATED from /story-wiki/content/*/prose/ — do not edit directly.
// Regenerate with: node scripts/build-prose.mjs  (or via npm run predev)

export interface ProseScene {
  sceneNumber: number;
  sceneId: string;
  title: string;
  status: 'draft' | 'revised' | 'locked';
  location: string;
  characters: string;
  purpose: string;
  arcName: string;
  body: string;
}

export interface ProseArc {
  name: string;
  sceneIds: string[];
  note: string;
}

export interface ProseWork {
  slug: string;
  storyTitle: string;
  genre: string;
  logline: string;
  arcs: ProseArc[];
  scenes: ProseScene[];
  sceneCount: number;
  lockedCount: number;
}

export const proseWorks: ProseWork[] = [
  {
    "slug": "007-spy-treatment",
    "storyTitle": "007: Spy Continue",
    "genre": "thriller",
    "logline": "A former Indian intelligence operative — erased by the state, presumed dead across three continents — resurfaces from the margins of the world to protect the one person who still remembers his name, before the people who buried him find out he's still breathing.",
    "arcs": [
      {
        "name": "Origins",
        "sceneIds": [
          "001",
          "002",
          "003"
        ],
        "note": "Establish who Alpha was before the erasure. The village, the loss, the first survival. Tone: quiet, intimate, then rupture."
      },
      {
        "name": "College",
        "sceneIds": [
          "004",
          "005",
          "006"
        ],
        "note": "The only time Alpha felt normal. Sarah is introduced here. Male friend is introduced here. The war call is the last innocent moment."
      },
      {
        "name": "War & RAW",
        "sceneIds": [
          "007",
          "008",
          "009",
          "010"
        ],
        "note": "Brotherhood forged, then shattered. The sacrifice of the male friend is the wound that never heals. RAW offers an identity-shaped coffin — he steps in willingly."
      },
      {
        "name": "Middle East",
        "sceneIds": [
          "011",
          "012",
          "013",
          "014"
        ],
        "note": "Alpha as instrument of the state. Effective, brutal, efficient. Betrayal shows him the state is not what he serves."
      },
      {
        "name": "Rogue America",
        "sceneIds": [
          "015",
          "016",
          "017"
        ],
        "note": "Alpha officially goes dark. Becomes a bargaining chip. Prison introduces Torretti."
      },
      {
        "name": "Prison Break",
        "sceneIds": [
          "018",
          "019",
          "020",
          "021",
          "022"
        ],
        "note": "Alpha survives the block's politics, earns Torretti's deal, exits via the ₹80 motif. The motif first appears here."
      },
      {
        "name": "Middle East Return",
        "sceneIds": [
          "023",
          "024"
        ],
        "note": "Alpha completes his vengeance mission. Finds emptiness. Remembers Sarah."
      },
      {
        "name": "London",
        "sceneIds": [
          "025",
          "026",
          "027",
          "028",
          "029",
          "030",
          "031"
        ],
        "note": "The story's emotional center. Sarah has lived a full life assuming Alpha is dead. Malhotra weaponizes that connection. The yacht is a trap — Alpha is the shadow response."
      },
      {
        "name": "Infiltration & Escape",
        "sceneIds": [
          "032",
          "033",
          "034",
          "035",
          "036",
          "037",
          "038",
          "039"
        ],
        "note": "The spectacular finale. Alpha fights through the building, finds Sarah, executes the illusion of their deaths. Shadow Flight is the open ending."
      }
    ],
    "scenes": [
      {
        "sceneNumber": 1,
        "sceneId": "001",
        "title": "Village Before the Fire",
        "status": "locked",
        "location": "Rural India — a small village in the hills, unnamed deliberately",
        "characters": "Young Alpha (no name given), unnamed villagers, glimpses of a father",
        "purpose": "Establish the world Alpha loses. Root him in something warm before it is taken. Seed the detachment that will define him — even here, he is slightly apart from it all.",
        "arcName": "Origins",
        "body": "The mornings came quietly in the hills.\n\nNo alarm, no urgency — just the slow brightening through the gaps in the kaccha wall, the smell of woodsmoke from the neighbour's kitchen drifting in. He would lie still for a moment after waking, listening. Cattle moving. A woman calling her child. The distant, rhythmic knock of someone splitting wood.\n\nHe was twelve. He would not know until much later that these sounds had a weight — that they were the kind of sounds you could carry for the rest of your life, the way you carry something without knowing you are carrying it at all.\n\nHis father had a way of naming things precisely.\n\n*That bird is a drongo. See the tail — forked, like a tuning fork. It will chase anything out of its territory, even a hawk.*\n\nThe boy had watched the small dark bird dive at a kite three times its size, screaming at it, furious, relentless, until the kite simply left. He had asked his father why it bothered. The kite would come back.\n\n*Because the territory is all it has,* his father had said. *If it stops defending it, it no longer exists.*\n\nHe had not understood it then. He filed it away, the way he filed most things — in some quiet interior room he did not have a name for.\n\n---\n\nThe village had a rhythm. He knew it the way he knew his own heartbeat — not by thinking about it, but by the disturbance when it skipped.\n\nMarket on Tuesdays. The school was three kilometers down the road; he walked it every morning, sometimes running the last half-kilometer because he liked the burn in his legs, liked the way his mind went blank during the run. He was not the fastest. He was the most consistent. The teacher had noted this once, in a tone that was more observation than praise.\n\n*You don't quit when it gets hard. You just go quiet.*\n\nHe had nodded and sat down.\n\nHe was always slightly outside things. Not unhappy — that was not the word for it. He could laugh, could sit in a pile of other children and be genuinely part of the noise. But there was a membrane between him and the full surrender of it. Some part of him always watching. Always noting exits.\n\nHe had told no one this. There was no language for it that didn't sound wrong.\n\n---\n\nThere was a girl in the neighboring lane who could whistle through her fingers, a sound so sharp it scared the crows out of the trees. He had spent three weeks learning how. He never managed it, but he learned, in the process, how to be very patient with a thing that was failing him.\n\nThere was an old man — half-blind, moved like water around obstacles — who sat outside the grain seller's and played chess against himself. The boy had watched him for a month before asking to play. The man had beaten him in eleven moves. He came back the next day. And the day after.\n\nThe man never spoke during the game. Neither did he.\n\nBy the end of six months, the boy was winning. The man had laughed — a real laugh, surprised by itself — and said: *Most people want to learn to win faster. You learned to last longer.*\n\nThe boy had walked home thinking about that.\n\n---\n\nThe evenings were the best part. The hills caught the light differently in the hour before dark — everything going amber and copper and long-shadowed. He would sit on the flat rock behind the house, the one that jutted out enough that you could see the valley below, and he would just look.\n\nNot at anything specific. Just at the whole of it.\n\nHis father would sometimes come and sit next to him, and neither of them would say anything, and that was entirely fine.\n\nOnce, his father had put a hand on his shoulder and said: *Whatever happens, this is yours. You carry this.*\n\nHe had not known what his father meant.\n\n---\n\nThe night came like all the others.\n\nHe ate. He helped wash the vessels. He lay down on the mat and listened to the village go quiet — the sounds tapering to dogs and insects and somewhere, a baby crying and then settling.\n\nHe closed his eyes.\n\nHe did not know it was the last night he would sleep like this — without listening for something wrong. He did not know that the quiet, which had always felt like safety, was a thing that could be taken.\n\nHe just slept.\n\nAnd in the morning, the fire began."
      },
      {
        "sceneNumber": 2,
        "sceneId": "002",
        "title": "The Night the Village Burned",
        "status": "locked",
        "location": "Same village, deep night → dawn",
        "characters": "Young Alpha, unnamed villagers (background), unnamed attackers (no faces given)",
        "purpose": "The inciting rupture. Everything before this is context; everything after is consequence. The trauma is planted here. Alpha does not fight — he watches, he hides, he survives. That is the scene's point.",
        "arcName": "Origins",
        "body": "He woke to the smell first.\n\nSomething chemical underneath the smoke — not woodsmoke, not cooking. Something that did not belong to any morning he had known. He sat up in the dark and his body had already decided something was wrong before his mind caught up.\n\nOutside, nothing.\n\nThen: shouting. A woman's voice, cut short.\n\nHe moved without thinking, pulling on his shoes in the dark by feel alone, crossing to the gap in the wall that served as a window. The lane below was empty. But the far end — the far end was lit orange, and the orange was moving, and the moving was growing.\n\nFire.\n\nNot a small fire. Not the kind you stand around and manage. The kind that has made a decision.\n\n---\n\nHe found his father at the door, already dressed, already still with a kind of stillness that was its own alarm. He put a hand on the boy's chest. Don't go out.\n\n*Baba—*\n\nStay behind me. Don't make noise.\n\nThey moved through the back, through the gap in the fence behind the grain jars, out into the dark field that ran behind the row of houses. Other people were already there — neighbors he recognized by shape, by the way they moved, gathering silently the way cattle do when something in the air changes.\n\nNo one was talking. That was the worst of it. In every emergency the boy had ever seen — a cart falling, a flood warning, a dog bite — adults talked. They argued, they instructed, they filled space with authority. Here they were quiet. And their quiet told him that whatever was happening was outside the category of things that talking could manage.\n\n---\n\nThey crouched in the field and watched.\n\nHe watched the way he had always watched things — with that membrane up, that interior distance — and even then, even at twelve with the whole world suddenly on fire, some part of him was noting.\n\nThe way the attackers moved: not randomly. They moved in lanes.\n\nThe way they chose what to burn: structures first, then the open spaces.\n\nThe way they did not hurry: they had accounted for time.\n\nHe did not understand these observations as tactical. He did not have that word yet. He just stored them in the quiet interior room, alongside the drongo bird and the chess endgames and the boy who could run farther than anyone and still not be fastest.\n\n---\n\nHe lost his father in the second hour.\n\nHe did not see it happen. That was the thing that would stay with him longest — not an image, but an absence. His father's hand was on his shoulder, and then there was noise, sudden and too close, and the hand was gone. He turned and his father was gone. The space his father had occupied was just dark field.\n\nHe did not call out. He understood, in some animal way, that calling out was wrong.\n\nHe stayed down.\n\nLater he would not be able to say how long he stayed down. Time had stopped working properly. He was aware of heat, and then less heat. Aware of noise, and then less noise. Aware of his own breathing, which he had flattened to almost nothing, pressing himself into the soil of a field he had run across a hundred times and never once noticed the exact texture of.\n\nHe noticed it now. He noticed everything.\n\n---\n\nWhen the light came — the grey, flat light of pre-dawn, nothing like the amber evenings — he lifted his head.\n\nThe village was still standing. Parts of it. Some of the roofs were open to the sky now. The smell had changed — wet ash, the particular smell of things that have burned and been rained on, even though it had not rained. He did not know yet that burning things make their own weather.\n\nPeople were moving again, slowly, making sounds again — low and wrong.\n\nHe stood up.\n\nHe found, in the standing, that something had shifted. He could not have described it precisely. He would not try to for years. But there was a room in him that had been open his whole life — the one with the amber evenings in it, the drongo bird, his father's hand on his shoulder — and the door to that room had closed. Not locked. Closed. The things inside it were still there.\n\nThey would just be behind glass from now on.\n\nHe began to walk. Away from the noise, toward the edge of the hill, the direction he did not know, moving the way he had learned to move when there was nothing left to stand still for.\n\nHe did not look back.\n\nHe had already filed it away, in the new quiet interior room. The one that had no warmth in it yet, only space. He would fill it later, slowly, over years, with a different kind of knowing.\n\nFor now, he just walked.\n\nThe sun came up behind him. He didn't notice."
      },
      {
        "sceneNumber": 3,
        "sceneId": "003",
        "title": "Escape and the Wilderness",
        "status": "locked",
        "location": "Hill country, rural India → forests, outskirts, unnamed roads",
        "characters": "Alpha (unnamed, ~12–16 years)",
        "purpose": "The long middle. Where the skills come from. Not a training montage — a slow accumulation of necessity. The wilderness does not teach him anything he did not already have. It only removes everything else until those things are all that remain.",
        "arcName": "Origins",
        "body": "The first day he walked until the ground changed.\n\nVillage soil, then scrub, then the rockier pale earth of the hill slopes where the goat paths ran. He followed the goat paths because they went somewhere — goats do not make paths to nowhere — and because following something that went somewhere was better than stopping.\n\nHe did not have water. He found it by mid-morning in a gully where the rock had cupped it, rainwater dark with leaf matter, and he drank it without hesitation. Later, he would understand that this was the first good decision he made. At the time it was just thirst.\n\nThe hill was not a dramatic hill. It did not loom. It was the kind of hill that only becomes a hill when you are at the bottom of it, looking up, and there is no path that avoids it.\n\nHe went up.\n\n---\n\nHe did not know what he was running from, exactly. He knew there had been men with intent and structure, and he knew his father was gone, and he knew that the village was behind him and that the village behind him was no longer the village it had been. These facts existed in him the way water exists in rock — present, slow-moving, reshaping things from the inside without much visible drama.\n\nHe did not cry. This was not bravery. He simply found, when he checked for the impulse, that it was not there. The door had closed. What was behind it could not reach him yet.\n\nHe walked.\n\n---\n\nBy the third day he had found the pattern of the land.\n\nWater ran downhill — that was obvious — but it collected in specific places based on the slope's angle and the depth of the soil, and he found that if he read the vegetation he could anticipate where the water would be before he reached it. Dark green in dry season meant deep roots. Deep roots meant access. He had not read this anywhere. He arrived at it by looking.\n\nHe understood now why he had always been this way — the noting, the filing, the detached inventory-taking that had made him strange among boys who simply *did* things. Out here it was not strange. Out here it was just useful.\n\nThe boy who observed more than he reacted was the boy who did not drink from the stagnant pool and did not step on the nest and did not take the trail that the others took when the others did not know what they were doing.\n\nHe had never liked being a boy. He found he was better at this.\n\n---\n\nOn the fifth day he found a family.\n\nA small holding on the back slope — a woman, two daughters, an old man who barely lifted his head from the cot in the corner. He did not announce himself. He watched from the edge of the tree line for most of an afternoon, the way he had always watched things he did not yet understand.\n\nThey were not dangerous. They were simply living, carefully, in a place that expected nothing easy.\n\nHe came down at dusk. The woman met him at the threshold with a look that was not fear and not welcome but something more pragmatic — an assessment. He had nothing to offer, which she saw immediately, but she let him inside anyway and put food in front of him. He ate without speaking. She did not speak either. The two daughters watched him from the far corner with the particular attention of children who have learned that strangers carry information.\n\nHe stayed three days. He fixed the collapsed portion of the water channel without being asked — he had watched the old man look at it twice, the particular way you look at a problem you no longer have the capacity to solve. He fixed it in an afternoon.\n\nWhen he left, the woman pressed a small amount of food into his hands. She did not ask his name.\n\nHe had not offered it.\n\n---\n\nThe weeks accumulated. Then months.\n\nHe moved north, then east, following no particular logic except that staying still felt wrong and moving felt purposeful, even when it wasn't. He learned to find food, to predict weather by pressure in his ears and the behavior of insects, to make himself invisible in any space by calibrating how much space he took up.\n\nThis last thing came naturally. He had always had a talent for being present without pressing.\n\nHe slept in outbuildings, in the open when the outbuildings were not there, on buses when he had enough to pay, walking the roadside through the night when he did not. Twice he got sick and waited it out in dry culverts, sweating and shivering, and learned how much discomfort a body could sustain before it started inventing shortcuts. The shortcuts his body invented were efficient. He noted them.\n\nHe was robbed once, of the small amount of cash he had accumulated. He watched it happen — three boys, older, opportunistic rather than practiced — and made the calculation that resisting was not worth the injury, and let it happen. Then he noted how they moved, how they identified targets, how long they lingered after.\n\nHe was not robbed again.\n\n---\n\nHe found work in a town large enough to have industry — carrying, sorting, the kind of labor that asks no questions because it does not need to. He was young but he was quiet and he was capable, and capable-and-quiet is sufficient for most of what the world needs done.\n\nHe saved money this time in portions, hidden in separate places, because the lesson from the robbery had been structural: concentration creates single points of failure.\n\nHe was fourteen, or close to it. He had no documentation that would confirm this.\n\nHe had the chess endgames, still, committed to some part of him that nothing had touched. He played them mentally at night, all the classic late-game problems — Réti's endgame, Lucena's rook, the Philidor draw — and they soothed him the way they had always soothed him, not because they were comforting but because they were *solvable*. They were problems with answers, which was rare.\n\nHe thought about his father less than he expected to.\n\nHe thought about the men who moved in lanes through the burning village more than he expected to.\n\n---\n\nHe kept moving. East, then south. A city, eventually, its size a kind of camouflage. He found a school — government, crowded, not particularly interested in the paperwork of a quiet boy who showed up and sat in the back and answered every question correctly — and he attended for two years, accumulating credits without accumulating attention.\n\nHe was good at that by now. The not-accumulating-attention.\n\nAt sixteen he sat an exam under a name he had borrowed — not stolen, borrowed; he had asked, and the boy whose name it was had agreed without understanding why — and the score came back high enough that it opened a door he had not known to look for.\n\nA college. Far north. Scholarship.\n\nHe studied the acceptance letter for a long time. Not with excitement — with the same careful inventory he applied to everything. A new place. A new category of people. A new set of rules to learn.\n\nHe had been learning new rules for four years. He was very good at it.\n\nHe packed the few things he owned into a bag that was not heavy, and he left the city the way he had left everything: without ceremony, without backward glance, carrying only what was necessary.\n\nThe village was behind glass.\n\nAhead of him was the next part.\n\nHe did not know, yet, what it would cost."
      }
    ],
    "sceneCount": 3,
    "lockedCount": 3
  }
] as ProseWork[];

export const proseWorksBySlug = new Map(proseWorks.map(w => [w.slug, w]));
