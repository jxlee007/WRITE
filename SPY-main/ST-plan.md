# ASCII wireframe — Up: Man in action | Left: DOSSIER | Right: Characters | Down: Scroll to reveal

```
+--------------------------------------------------------------------------------+
|                             MAN IN ACTION [top-center]                         |
|  [ Vertical Left Button ]                     [ Vertical Right Button ]        |
|  [ Timeline / Dossier ]                       [ Characters ]                   |
|  (swup transition left)                      ( open character modal )          |
|                              ⬇️ scroll down                                   |
+--------------------------------------------------------------------------------+
                                     | 
                                     |
                   the content scrolls over the Blur Filter
                                     |
                                     |
                        SECOND HERO — SHADOW PROTOCOL (center)
            ---------------------------------------------------------------
                                TITLE: SHADOW PROTOCOL
             TAGLINE: Eight Films. One Global Conspiracy. No One Is Safe.
                            CTA: [ Enter the Shadows ]  
                                     |
                                Story Overview
              ------------------------------------------------------------
                               The Story Arc:
          - Maya Chen uncovers a decades-spanning conspiracy by "The Selective's."
         - From Tokyo neon to Rome's corridors of power, espionage meets personal stakes.
                               Themes & Tone:
             - 🎯 Global Conspiracy  • 🔬 High‑Tech Espionage
              - 💔 Personal Stakes   • ⚡ Relentless Pacing
                                     |
                  FILMS — The Eight Films (grid / responsive cards)
             ------------------------------------------------------------
                                    |  01 • SHADOW PROTOCOL: INITIATION
                                    |     "Trust no one. Question everything. Survive at all costs."
                                    |  02 • SHADOW PROTOCOL: TOKYO DRIFT
                                    |     "In the city of neon and shadows, every reflection hides a secret."
                                    |  03 • SHADOW PROTOCOL: BERLIN WALL
                                    |     "Some walls never truly fall."
                                    |  04 • SHADOW PROTOCOL: MOSCOW RULES
                                    |     "In Russia, the game plays you."
                                    |  05 • SHADOW PROTOCOL: LONDON FOG
                                    |     "In the fog of war, truth is the first casualty."
                                    |  06 • SHADOW PROTOCOL: DUBAI GOLD
                                    |     "Where money flows, power follows."
                                    |  07 • SHADOW PROTOCOL: ROME BURNS
                                    |     "All roads lead to the final truth."
                                    |  08 • SHADOW PROTOCOL: ENDGAME
                                    |     "Every shadow must face the light."
                                     |
                    blur filter stops before background image
                                     |
                                     |
                                     |
                                     V
                reveal details: title and directed by JXLEE at bottom 
                                                
                                     

```

Characters Modal (on clicking Characters button)
```
+-------------------+-----------------+------------------+
+--------------------------------------------------------+
| +---------------+ +---------------+ +--------------+   |
| |    .----.     | |    .----.     | |   .----.     |   |
| |   / O  O \    | |   / 0  0 \    | |  / -  - \    |   |
| |   |  \/  |    | |   |  \/  |    | |  | \_/ |     |   |
| |   \ ---- /    | |   \ ---- /    | |  \ ____/     |   |
| |               | |               | |              |   |
| |     MAYA      | |    KENJI      | |   LUCIA      |   |
| |   Director    | |  Operative    | |   Fixer      |   |
| +---------------+ +---------------+ +--------------+   |
|                                                        |
| +---------------+ +---------------+ +--------------+   |
| |     .::::.    | |     .----.    | |    .----.    |   |
| |    :  ><  :   | |     /  -  \   | |   / X  X \   |   |
| |    :  --  :   | |    |  ._. |   | |   |  \_/ |   |   |
| |     '::::'    | |    \ ---- /   | |   \_____ /   |   |
| |               | |               | |              |   |
| |     ALEXEI    | |      ZARA     | |   REDACTED   |   |
| |     Handler   | |     Analyst   | |  Antagonist  |   |
| +---------------+ +---------------+ +--------------+   |
|                                                        |
| (Click a box to open character page                    |
| → swup transition to the right with back)              | 
+--------------------------------------------------------+                       

```

Notes:
- use swup page transitions.
- Vertical Left button: Page transit to left to dossier page; 
- Vertical Right button: character quick-select with icons/initials.
- Top: header ; font heading "MAN IN ACTION" disappears on scroll.
- Bottom: persistent parallax zoom in on background to scroll to focus on subject in image reveal some details in end - title and directed by JXLEE.
- Layout is 3 zones: header, two-vertical-button body, footer scroll hint.
- Replace placeholders with real UI components and responsive rules for small screens.
- Onclick of Timeline/Dossier button - load dossier content with static line loader (decrypting 0-100%)  - Use swup transition it transit towards left to open dossier page having back button to landing page. left transit with decrypt loader (0→100%)
- Onclick of Characters button - open animated modal with individual character card blocks - onclick of individual character - Use swup transition it transit towards right to open specific character's page having back button to landing page.
- Ensure mobile stacking: hero → overview → films (single column), buttons become icons.

Dossier Page (on clicking Timeline button)
``` 
+-----------------------------------------------------------+
| < BACK [top-left]                                         |
|                                                           |
|      Accessing case-file: 1985-007                        |
|  [Static line loader: Decrypting 0-100%]                  |
|                                                           |
+--------------------------------------------------------------+
|  DOSSIER [top-left]                                          |
|  TIMELINE NAV BAR                                            |
|  [ 1985 ]   [ 1990s ]   [ 2001 ]   [ 2010s ]   [ Present ]   |
|  (pill buttons — click year to filter timeline entries)      |
+--------------------------------------------------------------+
|  TIMELINE ENTRIES (scrollable)                              |
```
+--------------------------------------------------------------------------------+
| TIMELINE ENTRIES — Chapters as Case-Study Cards (3-column grid, scrollable)    |
+--------------------------------------------------------------------------------+

+--------------------------+--------------------------+--------------------------+
| 01 • CASE STUDY: INITIATION| 02 • CASE STUDY: TOKYO   | 03 • CASE STUDY: BERLIN  |
| Date: 2010               | Date: 2011               | Date: 2012               |
| ------------------------ | ------------------------ | ------------------------ |
| Summary: Maya cracks the  | Summary: Neon clues lead | Summary: A wall of files  |
| first protocol — access   | to an off-grid cell.     | and a hidden ledger.      |
| Tags: #espionage #init   | Tags: #surveillance #ux  | Tags: #archive #intel     |
| [Open Case →] (swup → left)| [Open Case →] (swup → left)| [Open Case →] (swup → left)|
+--------------------------+--------------------------+--------------------------+

+--------------------------+--------------------------+--------------------------+
| 04 • CASE STUDY: MOSCOW  | 05 • CASE STUDY: LONDON  | 06 • CASE STUDY: DUBAI   |
| Date: 2013               | Date: 2015               | Date: 2017               |
| ------------------------ | ------------------------ | ------------------------ |
| Summary: Trade routes are | Summary: Fog and false   | Summary: Wealth hides a   |
| leverage — safe houses map| leads — a mole uncovered | pipeline of covert ops.   |
| Tags: #tradecraft #ops   | Tags: #mole #counterint  | Tags: #finance #cover     |
| [Open Case →] (swup → left)| [Open Case →] (swup → left)| [Open Case →] (swup → left)|
+--------------------------+--------------------------+--------------------------+

+--------------------------+--------------------------+--------------------------+
| 07 • CASE STUDY: ROME    | 08 • CASE STUDY: ENDGAME | 09 • BONUS: TIMELINE NOTE |
| Date: 2019               | Date: 2021               | Date: Archive             |
| ------------------------ | ------------------------ | ------------------------ |
| Summary: Crossroads lead  | Summary: Confrontation   | Summary: Meta notes, link |
| to a reveal — papal files | and collapse of a ring.  | to raw logs & manifests.  |
| Tags: #coverup #stakes   | Tags: #finale #expose    | Tags: #meta #archives     |
| [Open Case →] (swup → left)| [Open Case →] (swup → left)| [Open Case →] (swup → left)|
+--------------------------+--------------------------+--------------------------+
```

Notes:
- Grid behavior: 3 columns on desktop (equal-width cards), 2 columns on tablet, 1 column on mobile (stacked).
- Mobile rules: cards become full-width stacked; icons → initials; tap target: full card opens (swup transition → left to dossier detail, with static loader 0→100%).
- Accessibility: include aria-labels per card; keyboard focus shows outline; Enter/Space triggers swup navigation.
- Interaction: scrolling area remains independent (overflow-y: auto). Cards animate on reveal (subtle translateY + fade).

