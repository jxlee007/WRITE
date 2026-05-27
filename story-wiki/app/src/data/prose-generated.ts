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
    "storyTitle": "007: SPY CONTINUE",
    "genre": "Spy Thriller",
    "logline": "A former Indian intelligence operative — erased by the state, presumed dead across three continents — resurfaces from the margins of the world to protect the one person who still remembers his name, before the people who buried him find out he\\'s still breathing.",
    "arcs": [
      {
        "name": "ARC 01 — ORIGIN",
        "sceneIds": [
          "s01",
          "s02",
          "s03",
          "s04",
          "s05",
          "s06",
          "s07",
          "s08"
        ],
        "note": "Childhood, trauma, first bonds, and the war that forged the ghost."
      },
      {
        "name": "ARC 02 — THE GHOST PROTOCOL",
        "sceneIds": [
          "s09",
          "s10",
          "s11",
          "s12",
          "s13",
          "s14",
          "s15",
          "s16"
        ],
        "note": "RAW recruitment, covert operations, betrayal, and the making of a rogue asset."
      },
      {
        "name": "ARC 03 — PRISON AND ALLIANCE",
        "sceneIds": [
          "s17",
          "s18",
          "s19",
          "s20",
          "s21",
          "s22"
        ],
        "note": "Imprisonment, an unlikely alliance, and a theatrical escape."
      },
      {
        "name": "ARC 04 — SHADOW OPERATIONS",
        "sceneIds": [
          "s23",
          "s24",
          "s25",
          "s26"
        ],
        "note": "The roots collapse, the ghost reflects, and the trap is assembled around the one person he cannot leave."
      },
      {
        "name": "ARC 05 — THE LONDON ENDGAME",
        "sceneIds": [
          "s27",
          "s28",
          "s29",
          "s30",
          "s31",
          "s32",
          "s33",
          "s34",
          "s35",
          "s36",
          "s37",
          "s38",
          "s39"
        ],
        "note": "The trap, the reunion, the breakout, and the perfect disappearance."
      }
    ],
    "scenes": [
      {
        "sceneNumber": 1,
        "sceneId": "s01",
        "title": "Village Life Before Chaos",
        "status": "locked",
        "location": "Rural India",
        "characters": "Subject Alpha (child)",
        "purpose": "Establish protagonist's idyllic childhood — detachment already visible.",
        "arcName": "ARC 01 — ORIGIN",
        "body": "A golden-hour village in rural India. Children play between mud walls while elders sit in dappled shade. Among them, a boy — already watching rather than joining, already cataloguing exits rather than friendships. His parents call him by a name the record will later erase. He answers, but his eyes never stop moving. The quiet here is real. It will not last."
      },
      {
        "sceneNumber": 2,
        "sceneId": "s02",
        "title": "Attack on Village",
        "status": "locked",
        "location": "Rural India — night",
        "characters": "Subject Alpha (child), Unknown Antagonist",
        "purpose": "Inciting trauma — the night that creates the ghost.",
        "arcName": "ARC 01 — ORIGIN",
        "body": "Flames arrive before sound does. The village erupts in coordinated fire — too precise to be an accident, too thorough to be a warning. The boy crawls under a burning threshold and watches his world reduce to silhouette and ash. His family does not emerge. He does. The burnt letter found in the wreckage carries a government stamp that won't be traced for fifteen years."
      },
      {
        "sceneNumber": 3,
        "sceneId": "s03",
        "title": "Escape and Survival",
        "status": "locked",
        "location": "Indian wilderness",
        "characters": "Subject Alpha (child)",
        "purpose": "Forge the survival skills that make him an asset.",
        "arcName": "ARC 01 — ORIGIN",
        "body": "Three weeks. Alone. The wilderness does not mourn with him, so he stops mourning. He learns to eat, to navigate, to sleep in two-hour rotations. The scars on his hands from the first week are replaced by callus. By the time he walks out of the tree line and into a highway town, the boy who watched his family burn is gone. What remains is something operational."
      },
      {
        "sceneNumber": 4,
        "sceneId": "s04",
        "title": "College Arrival",
        "status": "locked",
        "location": "University campus, India",
        "characters": "Subject Alpha, Dr. Sarah Kumar, Male Companion",
        "purpose": "Introduce the core trio — the only human bonds Alpha will ever form.",
        "arcName": "ARC 01 — ORIGIN",
        "body": "University orientation. Hundreds of students, one common area, three anomalies finding each other. Sarah Kumar has the sharpest eyes in the room — she reads a person's history in their posture before they speak. Their male companion is all warmth, the kind of person who fills silence. Alpha watches both of them the way he watched the village: noting exits, noting value. He stays."
      },
      {
        "sceneNumber": 5,
        "sceneId": "s05",
        "title": "College Romance",
        "status": "locked",
        "location": "University campus",
        "characters": "Subject Alpha, Dr. Sarah Kumar",
        "purpose": "Establish emotional stake — the one attachment that survives everything.",
        "arcName": "ARC 01 — ORIGIN",
        "body": "Tender moments. A voice note left outside a lecture hall. A redacted note passed across a library table that says nothing and everything. Sarah studies him the way she will later study targets — comprehensively, carefully, unable to stop. He lets her, which is the closest he has ever come to trust. These scenes are the only evidence that Subject Alpha once had a name someone said gently."
      },
      {
        "sceneNumber": 6,
        "sceneId": "s06",
        "title": "War Recruitment Call",
        "status": "locked",
        "location": "University / Military outpost",
        "characters": "Subject Alpha, Male Companion",
        "purpose": "Turn — duty pulls them from youth into a world they cannot return from.",
        "arcName": "ARC 01 — ORIGIN",
        "body": "A national mobilisation. Draft notices arrive with official stamps and the language of honour. Alpha and his companion enlist together, partly from duty, mostly because Alpha's prior training in the wilderness has given him a body that the military recognises before he speaks. The recruitment poster folds open to reveal terms. He signs. Sarah watches them leave from the campus gate."
      },
      {
        "sceneNumber": 7,
        "sceneId": "s07",
        "title": "First Combat Mission",
        "status": "locked",
        "location": "Active conflict zone",
        "characters": "Subject Alpha, Male Companion",
        "purpose": "Brotherhood cemented under fire — Alpha's competence confirmed.",
        "arcName": "ARC 01 — ORIGIN",
        "body": "Their first deployment into active contact. The companion fights with instinct and courage; Alpha fights with geometry — always one position ahead, always aware of where each body in the room is standing. They cover each other. They come back. The bond formed in those corridors is the kind that does not require language to maintain."
      },
      {
        "sceneNumber": 8,
        "sceneId": "s08",
        "title": "Male Friend's Sacrifice",
        "status": "locked",
        "location": "Conflict zone",
        "characters": "Subject Alpha, Male Companion",
        "purpose": "Second catastrophic loss — the wound that drives everything forward.",
        "arcName": "ARC 01 — ORIGIN",
        "body": "An ambush on the third deployment. The companion sees the blast radius before Alpha does and moves first. He saves six people including Alpha. His name goes on a memorial card in a manila folder that Alpha will carry for fifteen years in various pockets, wallets, and jacket linings — never reading it, unable to throw it away. Vengeance acquires a second face."
      },
      {
        "sceneNumber": 9,
        "sceneId": "s09",
        "title": "RAW Recruitment Offer",
        "status": "locked",
        "location": "Secure facility, India",
        "characters": "Subject Alpha, RAW Handler",
        "purpose": "Alpha trades his name for reach — the identity erasure that defines him.",
        "arcName": "ARC 02 — THE GHOST PROTOCOL",
        "body": "A sealed briefing room. A handler who introduces himself by function rather than name. The offer: erase your record, take a new one, operate without borders. The stamped terms are half redacted. Alpha reads the visible half, infers the rest, and signs. His name — the one Sarah said gently — is struck from every database that holds it. What remains is a designation: Subject Alpha."
      },
      {
        "sceneNumber": 10,
        "sceneId": "s10",
        "title": "RAW Training Montage",
        "status": "locked",
        "location": "Classified facilities",
        "characters": "Subject Alpha, Instructors, Marshal Bradley (offscreen)",
        "purpose": "Establish the full scope of Alpha's capabilities.",
        "arcName": "ARC 02 — THE GHOST PROTOCOL",
        "body": "Three disciplines, three phases. Combat: Alpha learns to neutralise threats in rooms, vehicles, open water. Stealth: a semester in identity performance — languages, accents, cover histories. Cyber: the third and most natural fit — he moves through networks the way he moved through the wilderness, reading patterns, finding gaps. An American marshal observing a joint training exercise takes notes. He circles Alpha's file."
      },
      {
        "sceneNumber": 11,
        "sceneId": "s11",
        "title": "Middle East Mission Briefing",
        "status": "locked",
        "location": "Intelligence HQ",
        "characters": "Subject Alpha, RAW Handler",
        "purpose": "Establish the geopolitical stakes — the 'roots' that fund war.",
        "arcName": "ARC 02 — THE GHOST PROTOCOL",
        "body": "An operation dossier spread across a table. Iran, Iraq, Syria — three nodes in a funding network that has kept regional conflicts liquid for a decade. Alpha is briefed on what RAW calls the roots: shell companies, corrupt intermediaries, political actors with clean hands and dirty ledgers. He studies the map for six minutes and identifies four connections the analysts missed. He deploys the next morning."
      },
      {
        "sceneNumber": 12,
        "sceneId": "s12",
        "title": "Execution of Covert Mission",
        "status": "locked",
        "location": "Iran / Iraq / Syria",
        "characters": "Subject Alpha",
        "purpose": "Alpha dismantles the roots — but exposes Indian political entanglement.",
        "arcName": "ARC 02 — THE GHOST PROTOCOL",
        "body": "Desert operations across three countries over eighteen months. Alpha burns ledgers, compromises intermediaries, and collapses financial pipelines with surgical precision. What he does not know: one of the root nodes belongs to a deal personally brokered by Colonel Rajesh Malhotra of Indian Intelligence. Alpha doesn't know Malhotra's name. Malhotra will spend the next seven years learning Alpha's."
      },
      {
        "sceneNumber": 13,
        "sceneId": "s13",
        "title": "Betrayal and Ambush",
        "status": "locked",
        "location": "Syria",
        "characters": "Subject Alpha",
        "purpose": "The political blowback — Alpha's extraction is compromised.",
        "arcName": "ARC 02 — THE GHOST PROTOCOL",
        "body": "An ambush pre-loaded with intelligence that could only have come from inside RAW. A leaked cable, partially burned, confirms a political actor sold Alpha's operation to protect the destabilized deal. He escapes the ambush alone, with three fractured ribs and a certainty that the state that erased his identity is also willing to erase his body. He goes rogue before they can finish the job."
      },
      {
        "sceneNumber": 14,
        "sceneId": "s14",
        "title": "American Marshal Introduction",
        "status": "locked",
        "location": "Joint training facility",
        "characters": "Subject Alpha, Marshal James Bradley",
        "purpose": "Establish the one Western ally who owes Alpha a favour.",
        "arcName": "ARC 02 — THE GHOST PROTOCOL",
        "body": "A flashback, surfacing now: Alpha during a joint training exercise, two years prior. Marshal James Bradley — eighteen years in federal operations, twenty-seven combat-adjacent incidents — watches Alpha run an extraction drill backwards, faster than the scenario allows. Bradley breaks protocol and speaks to him directly. A favour is established between them, informal and unwritten, the kind that survives regime changes and classification upgrades."
      },
      {
        "sceneNumber": 15,
        "sceneId": "s15",
        "title": "Protagonist Moves Rogue",
        "status": "locked",
        "location": "International",
        "characters": "Subject Alpha",
        "purpose": "Alpha goes off-grid — becomes a bargaining chip between nations.",
        "arcName": "ARC 02 — THE GHOST PROTOCOL",
        "body": "His blacklisted file circulates. Intelligence agencies in three countries flag him: dangerous, unaffiliated, potentially for sale. He is not for sale. He is running a different calculation — identifying the name behind the village attack, tracing the political chain from the ambush back to its origin. India wants him returned or eliminated. America, watching his file accumulate annotations, wants him delivered. He stays one city ahead of both."
      },
      {
        "sceneNumber": 16,
        "sceneId": "s16",
        "title": "Capture by US Government",
        "status": "locked",
        "location": "Airport, undisclosed",
        "characters": "Subject Alpha, Marshal Bradley",
        "purpose": "Alpha is taken — leveraged as diplomatic currency.",
        "arcName": "ARC 02 — THE GHOST PROTOCOL",
        "body": "A coordinated airport capture. Two marshals, four plainclothes agents, and a diplomatic protocol that classifies Alpha as leverage rather than suspect. He does not resist. He identifies the pressure points — which agency is driving the detention, which political interest is served by keeping him alive — and begins positioning his eventual exit before the cell door closes. The intake footage shows a man who looks bored."
      },
      {
        "sceneNumber": 17,
        "sceneId": "s17",
        "title": "Mafia Prison Encounter",
        "status": "locked",
        "location": "US Federal Correctional Facility",
        "characters": "Subject Alpha, Vincenzo Torretti",
        "purpose": "Alpha meets his extraction vehicle — an unlikely prison alliance.",
        "arcName": "ARC 03 — PRISON AND ALLIANCE",
        "body": "A federal correctional facility outside Philadelphia. Among the population: Vincenzo Torretti — Indian-connected crime boss, imprisoned on financial charges, observing everything from a corner table in the commissary. He watches Alpha for four days before speaking. What he notices is not strength but economy: Alpha uses exactly as much force as a situation requires and no more. Torretti has been looking for that kind of efficiency."
      },
      {
        "sceneNumber": 18,
        "sceneId": "s18",
        "title": "Prison Power Dynamics",
        "status": "locked",
        "location": "US Federal Facility",
        "characters": "Subject Alpha, Vincenzo Torretti, Guards",
        "purpose": "Establish the prison ecosystem — Alpha navigates it without joining it.",
        "arcName": "ARC 03 — PRISON AND ALLIANCE",
        "body": "Guard routes. Meal schedules. Cell block hierarchies. Alpha maps the facility the way he mapped the wilderness — systematically, without urgency. Torretti watches him do it and grows more interested. Three perspective windows on the same hour: Alpha sees threat geometry; Torretti sees potential; the guards see a quiet inmate who never causes problems. All three are correct."
      },
      {
        "sceneNumber": 19,
        "sceneId": "s19",
        "title": "Prison Riot and Strength Test",
        "status": "locked",
        "location": "US Federal Facility",
        "characters": "Subject Alpha, Torretti, Inmates",
        "purpose": "Alpha reveals capability under pressure — alliance sealed.",
        "arcName": "ARC 03 — PRISON AND ALLIANCE",
        "body": "A riot erupts on a Tuesday — too coordinated to be spontaneous, likely staged by competing interests within the block. Alpha moves through the chaos with the same geometry he uses in operations. Fourteen minutes later, he is leaning against the far wall, unmarked, having neutralised four active threats. Torretti is watching from behind a locked cell door. When the guards restore order, he sends Alpha a message through the commissary channel: we should talk."
      },
      {
        "sceneNumber": 20,
        "sceneId": "s20",
        "title": "Information Exchange with Mafia",
        "status": "locked",
        "location": "US Federal Facility",
        "characters": "Subject Alpha, Vincenzo Torretti",
        "purpose": "The deal — freedom traded for intelligence.",
        "arcName": "ARC 03 — PRISON AND ALLIANCE",
        "body": "The bargain transcript is half redacted at source, the rest by Alpha's own design. Torretti offers a route out — a staged bail with real legal paperwork. Alpha offers intelligence on a network Torretti needs access to. The exchange is recorded nowhere official. Torretti gets what he wants. Alpha gets what he needs. What Alpha extracts during the negotiation — a name, a connection to the village attack — is not in any version of the transcript."
      },
      {
        "sceneNumber": 21,
        "sceneId": "s21",
        "title": "Legal Bail and Illusion of Freedom",
        "status": "locked",
        "location": "US Federal Facility / Airport",
        "characters": "Subject Alpha, Vincenzo Torretti",
        "purpose": "The theatrical exit — freedom via performed legality.",
        "arcName": "ARC 03 — PRISON AND ALLIANCE",
        "body": "Eighty lacs. The number appears on a bail document that looks entirely legitimate because it was filed through an entirely legitimate proxy. Alpha and Torretti walk out together under the language of law. The '80' motif will recur — a number embedded in transactions, flight manifests, and case files across four countries, always signalling a moment where the official record and the real record diverge. They separate at the airport."
      },
      {
        "sceneNumber": 22,
        "sceneId": "s22",
        "title": "Flight to Unknown Location",
        "status": "locked",
        "location": "Airport / Airspace",
        "characters": "Subject Alpha",
        "purpose": "The ghost vanishes again — destination classified.",
        "arcName": "ARC 03 — PRISON AND ALLIANCE",
        "body": "RAW's airport surveillance team catches seventeen frames of him at the departure gate before he steps behind a structural column and is not picked up again. A partial flight manifest recovered three weeks later shows a seat booked under a name that doesn't exist to a destination that has been redacted at the carrier level. The frame with his face is the clearest image of Subject Alpha in any government archive. Analysts note: he is not running. He is moving toward something."
      },
      {
        "sceneNumber": 23,
        "sceneId": "s23",
        "title": "Middle East Destabilisation",
        "status": "locked",
        "location": "Iran, Iraq, Syria",
        "characters": "Subject Alpha",
        "purpose": "Alpha finishes what he started — the roots collapse.",
        "arcName": "ARC 04 — SHADOW OPERATIONS",
        "body": "He returns to each node in sequence. Three countries, eighteen months, zero formal attribution. The shell companies close. The intermediaries relocate or disappear. The political actors who depended on the network find their funding channels bricked without explanation. Colonel Malhotra receives the intelligence summary from a field officer and understands, for the first time, the full scope of what Alpha has dismantled. He also understands: it was personal."
      },
      {
        "sceneNumber": 24,
        "sceneId": "s24",
        "title": "Global Laying Low",
        "status": "locked",
        "location": "Various — anonymous cities",
        "characters": "Subject Alpha",
        "purpose": "A rare interior moment — Alpha reckons with what vengeance has not resolved.",
        "arcName": "ARC 04 — SHADOW OPERATIONS",
        "body": "After the last node goes dark, he stops. A city without a name on a coast without significance. He keeps a journal in a cipher he invented — short entries, dry language, occasionally a single line that isn't operational: she probably thinks I'm dead. He is right. The vengeance didn't bring his companion back. It didn't restore his village. It produced a very clean ledger and a very empty room. He starts tracking Sarah's career from public records."
      },
      {
        "sceneNumber": 25,
        "sceneId": "s25",
        "title": "Dr. Kumar's Career Rise",
        "status": "locked",
        "location": "India, UK",
        "characters": "Dr. Sarah Kumar",
        "purpose": "Establish Sarah as a formidable force in her own right — not a victim.",
        "arcName": "ARC 04 — SHADOW OPERATIONS",
        "body": "Believing him dead, Sarah Kumar does what brilliant people do with grief — she converts it into work. Behavioral science. Psychological profiling. She climbs into senior government roles faster than her age warrants and develops a tracking methodology that her colleagues call intuitive and she calls obvious. Her CV shows twenty-five closed tracking cases. What the CV does not show: she still recognises his posture in strangers and turns around on escalators for no reason she can explain."
      },
      {
        "sceneNumber": 26,
        "sceneId": "s26",
        "title": "London Assignment and Officer's Discovery",
        "status": "locked",
        "location": "London",
        "characters": "Dr. Sarah Kumar, Colonel Rajesh Malhotra",
        "purpose": "The trap is assembled — Sarah becomes the vector.",
        "arcName": "ARC 04 — SHADOW OPERATIONS",
        "body": "Colonel Rajesh Malhotra reviews Sarah Kumar's file in London during a bilateral meeting. The college connection to Subject Alpha is a footnote in a footnote. He does not tell her what he knows. Instead, he positions her on a case adjacent to Alpha's known patterns — not directing her toward him, but leaving the path lit. His reasoning: she is the one person in the world Alpha might surface for. She is, without knowing it, the lure."
      },
      {
        "sceneNumber": 27,
        "sceneId": "s27",
        "title": "Yacht Party Setup",
        "status": "locked",
        "location": "Thames, London",
        "characters": "Dr. Sarah Kumar, Intelligence Operatives",
        "purpose": "The trap goes live — a diplomatic event weaponised.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "A diplomatic reception on a chartered yacht on the Thames. Sarah receives the invitation through an official channel. The vessel has been pre-positioned: basement crew replaced, stabilisers compromised, two 'guests' on the guest list who are not guests. Plan A is the boat. Plan B is the four men in the basement with contingency orders. The event is designed to look like an accident. Malhotra will be watching from a monitor three miles away."
      },
      {
        "sceneNumber": 28,
        "sceneId": "s28",
        "title": "Yacht Sabotage and Ambush",
        "status": "locked",
        "location": "Thames yacht — below deck",
        "characters": "Malhotra operatives",
        "purpose": "Both plans activate simultaneously — the trap is sprung.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "Plan A begins at 21:40: a guest trips a circuit that compromises the stabilisers. Plan B activates four minutes later when a basement operative receives a secondary signal. What neither plan accounts for: Alpha has been tracking the yacht for eleven hours from a position on the north bank. He identified the basement operatives at 17:00 from their entry pattern. He is already in the water."
      },
      {
        "sceneNumber": 29,
        "sceneId": "s29",
        "title": "Protagonist Intervenes on Yacht",
        "status": "locked",
        "location": "Thames yacht — below deck",
        "characters": "Subject Alpha, Dr. Sarah Kumar",
        "purpose": "Alpha resurfaces to save her — ambiguous, wordless, then gone.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "He comes up through the maintenance hatch. Neutralises the captain and the four basement operatives in sequence, using structural elements and the yacht's own noise to mask the contact. Sarah, on the upper deck, hears nothing irregular. She looks over the railing and sees a figure drop into the Thames and disappear under the current. She dismisses it as ambient London. She will spend the next three days unable to sleep."
      },
      {
        "sceneNumber": 30,
        "sceneId": "s30",
        "title": "Officer Tightens the Noose",
        "status": "locked",
        "location": "London — Malhotra's surveillance post",
        "characters": "Colonel Rajesh Malhotra",
        "purpose": "The antagonist recalibrates — he knows Alpha is alive.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "The yacht operation report lands on Malhotra's desk at 22:15: all four basement operatives incapacitated, no injuries to guests. The pattern is unmistakable. He marks Alpha's dossier: ACTIVE — LONDON. He also marks something else: Alpha chose to protect her and disappear rather than make contact. Malhotra adds a note: he won't be able to do that twice. He redirects three surveillance teams to Dr. Kumar's London assignment."
      },
      {
        "sceneNumber": 31,
        "sceneId": "s31",
        "title": "Protagonist Plans London Breakout",
        "status": "locked",
        "location": "London — safe house",
        "characters": "Subject Alpha",
        "purpose": "Alpha shifts from reactive to offensive — he will extract her and erase them both.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "He knows Malhotra knows he's here. He has thirty-six hours before the surveillance closes. He lays out the plan on a bare table: stealth entry to the building where Sarah is working under Malhotra's adjacent pressure, a corridor-by-corridor extraction, and a controlled detonation that produces convincing casualty evidence without actual casualties. Two steps require precision. One step requires trust. He hasn't asked Sarah for anything in eleven years."
      },
      {
        "sceneNumber": 32,
        "sceneId": "s32",
        "title": "Silent Entry",
        "status": "locked",
        "location": "London intelligence building",
        "characters": "Subject Alpha",
        "purpose": "The infiltration begins — Alpha ghosts through outer security.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "He enters through a maintenance access point at 03:40. Twenty-two CCTV nodes in the building. He disables twelve from a junction box in the basement and walks past the remaining ten in the uniform of a contractor whose badge he lifted three days prior. Outer guards don't register him. He moves through the building the way he moved through the wilderness: reading the system, finding the gaps, never forcing."
      },
      {
        "sceneNumber": 33,
        "sceneId": "s33",
        "title": "Chaotic Inner Assault",
        "status": "locked",
        "location": "London intelligence building — corridors",
        "characters": "Subject Alpha",
        "purpose": "Stealth breaks — Alpha fights his way through inner resistance.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "The fourth floor breaks containment when a guard on a non-standard patrol route opens a stairwell door at the wrong moment. Alpha neutralises him in under three seconds, but the radio check-in missed triggers an alert. The remainder of the operation is open contact. He moves through three corridors in one direction, never retreating, using the building's own layout — which he memorised from architectural records — as the operational environment. By the fifth floor he is breathing hard. He does not slow down."
      },
      {
        "sceneNumber": 34,
        "sceneId": "s34",
        "title": "Confrontation with Female Friend",
        "status": "locked",
        "location": "London intelligence building — fifth floor",
        "characters": "Subject Alpha, Dr. Sarah Kumar",
        "purpose": "The reunion — eleven years of presumed death, a gun, and disbelief.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "She is alone in the office, reviewing a tracking file, when the door opens. She reaches for her sidearm by training before she registers the face. For four seconds, neither of them speaks. The gun is pointed at his chest. He has his hands at his sides — not raised, not hostile, just present. She says his name — the real one, the erased one — for the first time in eleven years. He says: we need to move."
      },
      {
        "sceneNumber": 35,
        "sceneId": "s35",
        "title": "Trust Test and Gun to Forehead",
        "status": "locked",
        "location": "London intelligence building — fifth floor",
        "characters": "Subject Alpha, Dr. Sarah Kumar",
        "purpose": "Alpha breaks the standoff — trust demonstrated, not argued.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "She doesn't lower the gun. He steps forward and presses the barrel against his own forehead. She is looking at him over the sight. His expression doesn't change. He says: you have been tracking people for twelve years. You know what a threat looks like. Her certainty meter — the one she has built an entire career on — reads zero threat. She lowers the gun. He moves her to the stairwell without another word."
      },
      {
        "sceneNumber": 36,
        "sceneId": "s36",
        "title": "Officer Watches and Cuts Signal",
        "status": "locked",
        "location": "Malhotra surveillance post / Building fifth floor",
        "characters": "Colonel Rajesh Malhotra, Subject Alpha",
        "purpose": "Malhotra nearly wins — Alpha preempted the detonation option.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "Malhotra's live CCTV feed from the building's emergency circuit — the cameras Alpha didn't disable — shows two figures on the fifth floor. He reaches for the remote detonation control that was embedded in the building's renovation two years prior. He finds the signal already cut. Alpha located the detonation receiver during his architectural research and disabled it from the junction box at 03:52, seventeen minutes before anyone knew he was inside."
      },
      {
        "sceneNumber": 37,
        "sceneId": "s37",
        "title": "Building Detonation and Illusion of Death",
        "status": "locked",
        "location": "London intelligence building",
        "characters": "Subject Alpha, Dr. Sarah Kumar",
        "purpose": "Alpha controls the narrative — they die officially.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "At 04:31, from a position two blocks east, Alpha detonates four charges he placed during the stealth entry phase. The building's east wing collapses at the structural points the architectural plans showed were load-bearing. The explosion is large enough to produce credible casualty ambiguity. Forensics will find enough evidence of two presences on the fifth floor to close both files: KUMAR, S. — deceased. SUBJECT ALPHA — confirmed dead. They are already on a night bus heading north."
      },
      {
        "sceneNumber": 38,
        "sceneId": "s38",
        "title": "Aftermath and Global Reaction",
        "status": "locked",
        "location": "London, Global news cycle",
        "characters": "Colonel Rajesh Malhotra",
        "purpose": "The world believes the record — Malhotra is left with nothing to pursue.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "BBC, Times of India, NDTV — a London intelligence building explosion, two confirmed casualties, investigation pending. Malhotra reads every report. The forensic summary confirms both deaths. He is left with an investigation thread that officially has no subject. He writes a single line in his operational log: he planned this before he entered the building. He closes the file. He does not believe it is closed. He is correct."
      },
      {
        "sceneNumber": 39,
        "sceneId": "s39",
        "title": "Shadow Flight — Cliffhanger",
        "status": "locked",
        "location": "Airport, destination unknown",
        "characters": "Subject Alpha, Dr. Sarah Kumar",
        "purpose": "The cliffhanger — they vanish together. The next chapter is unwritten.",
        "arcName": "ARC 05 — THE LONDON ENDGAME",
        "body": "A partial flight manifest recovered by GCHQ six weeks later shows two seats booked under names that do not exist in any database, on a flight whose destination has been redacted at the carrier level. The number '80' appears in the booking reference. Analysts identify five possible destination countries. None can be confirmed. In the last frame of airport CCTV, Subject Alpha holds a door open. Dr. Sarah Kumar walks through it. They do not look back. The door closes. The screen goes dark."
      }
    ],
    "sceneCount": 39,
    "lockedCount": 39
  }
] as ProseWork[];

export const proseWorksBySlug = new Map(proseWorks.map(w => [w.slug, w]));
