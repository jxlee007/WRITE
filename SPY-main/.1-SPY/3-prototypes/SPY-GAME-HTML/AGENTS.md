
# 🕵️ AGENTS.MD - LLM Navigation Guide
**Updated Interactive Dossier: Shadows of the City (Urban Detective Noir)**  
*Dynamic Story Development & AI Media Integration*

---

## 📋 QUICK REFERENCE

| Component | Status | Priority | LLM Focus Areas |
|-----------|---------|----------|-----------------|
| Story Nodes (S01-S14) | 🟡 Partial | HIGH | Urban case construction, noir atmospherics |
| Interactive Systems | 🟢 Established | MEDIUM | AI media integration, parallax effects |
| Evidence Database | 🔴 Needs Work | HIGH | AI-generated media assets, metadata |
| Character Arcs | 🟡 Initiated | MEDIUM | Suspect development, moral conflicts |
| Technical Infrastructure | 🟢 Foundation | LOW | Enhance AI media calls, mobile optimization |

---

## 🗂️ UPDATED PROJECT ARCHITECTURE (ASCII)

```
urban-noir-dossier-game/
├── 🏠 index.html                           # Main dossier hub - Urban Noir theme
├── 🎭 nodes/                             # Story Nodes (case files)
│   ├── 🕵️ investigation-beginnings/
│   │   ├── s01-rainy-streets.html        # Scene: Arrival @ rainy city streets
│   │   ├── s02-first-clue.html           # Scene: Discover first clue
│   │   └── s03-suspect-intro.html        # Scene: Meet suspect
│   ├── 🌃 underworld/
│   │   ├── s04-mafia-ties.html           # Scene: Mafia connections
│   │   ├── s05-corridor-escape.html      # Scene: Narrow escape
│   │   └── s06-betrayal.html             # Scene: Unexpected betrayal
│   ├── 🔍 investigation/
│   │   ├── s07-follow-leads.html         # Scene: Follow leads around city
│   │   ├── s08-interrogate.html          # Scene: Suspect interrogation
│   │   └── s09-dark-alley.html           # Scene: Dangerous alley encounter
│   ├── ⚖️ moral-dilemmas/
│   │   ├── s10-expose-official.html      # Scene: Expose corrupt official
│   │   ├── s11-protect-friend.html       # Scene: Protect friend choice
│   │   └── s12-consequences.html         # Scene: Fallout and twist
│   ├── 🎭 resolution/
│   │   ├── s13-final-confrontation.html  # Scene: Culprit confrontation
│   │   └── s14-case-closed.html          # Scene: Case wrap-up
├── 🎨 assets/                           # Media Content
│   ├── 🖼️ images/
│   │   ├── characters/                   # AI generated faces (Stable Diffusion, Nano Banana)
│   │   ├── backgrounds/                  # Noir city scenes, rain fx (Midjourney)
│   │   └── evidence/                     # Photos, docs, clues
│   ├── 🎥 video/
│   │   ├── v01-intro.mp4                 # Cinematic (Perplexity Video)
│   │   ├── v02-interrogation.mp4         # Interrogation scene (Higgsfield)
│   │   ├── v03-escape-scene.mp4           # Action (Veo 2/3 AI)
│   │   └── v04-closing.mp4                # Case closing
│   ├── 🔉 audio/
│   │   ├── ambient/                      # City rain, footsteps
│   │   ├── voice/                        # Narration, dialogues
│   │   └── sfx/                         # UI & interaction
├── ⚙️ js/                              # Core Logic & Interaction
│   ├── app.js                           # Main controller
│   ├── navigation.js                   # Node routing
│   ├── timeline.js                     # Scroll-driven timeline
│   ├── evidence.js                     # AI Media integrated modals
│   ├── pov.js                          # POV management
│   ├── motifs.js                       # Clue pattern tracking
│   ├── animations.js                   # GSAP scroll and parallax
│   └── swup-config.js                  # Page transitions
└── 📄 docs/
    ├── README.md                      # Project overview
    ├── STORY-STRUCTURE.md             # Narrative flow for noir
    └── TECHNICAL-SPECS.md             # AI media integration notes
```

---

## 🎯 AI MEDIA INTEGRATION AREAS

- **Character portraits:** Stable Diffusion + Nano Banana for suspects' faces with noir lighting.
- **Backgrounds:** Midjourney for moody rain-soaked city scenes.
- **Videos:** Perplexity for short intros, Higgsfield for interrogation animations, Veo 2/3 for escape and action clips.
- **Audio:** Ambient city rain, footsteps, voice narrations, and UI sounds.
- **Dynamic content:** JS evidence system calls AI APIs dynamically for personalized clues based on player choices.

---

## 📌 TASK GUIDANCE FOR LLMs

### Story Node Expansion
```
"Expand node [NODE_ID]: [TITLE]"
- Reference noir story flow in STORY-STRUCTURE.md
- Include AI media prompts metadata
- Integrate branching moral choices
- Link evidence and motifs
```

### Evidence Creation
```
"Create evidence [EVIDENCE_ID]: [TYPE]"
- Summarize scene clues
- Attach AI-generated media references
- Define redaction/reveal mechanics
```

### AI Media Updates
```
"Update AI media for [NODE_ID or EVIDENCE_ID]"
- Refresh AI images/videos
- Adjust prompts for mood and theme
- Optimize for mobile playback
```

---

## 🔄 DYNAMIC CONTENT ADDITION

1. New nodes should maintain noir theme and branching narrative style.
2. AI media prompts saved with each scene for easy regeneration.
3. Maintain all evidence and character data in central JSON for cross-node access.
4. Use modular JS to add new interactive elements dynamically.

---

*Last Updated: September 22, 2025*
*Version: 2.0*  