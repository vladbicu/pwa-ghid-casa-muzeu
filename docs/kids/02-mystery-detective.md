# Concept 2: Mystery Detective

## Concept headline

Children are junior detectives piecing together the Bicu family's hidden story — collecting evidence at each stop until the full mystery of the house is revealed at the end.

---

## Visual style

### Identity
A Wes Anderson-coded children's mystery: warm but slightly moody, evidence-board aesthetic, playful noir without being scary. The central metaphor is a **detective's case board** — polaroid photos pinned to cork with red string connecting the clues. Every interaction feels like "finding evidence" rather than "completing a task."

### Color palette

| Role | Color | Hex |
|------|-------|-----|
| Background (case board) | Deep navy | `#1A2744` |
| Evidence cards / paper | Warm paper | `#F4ECD9` |
| Primary action / spotlight | Amber | `#FFBF00` |
| Unlocked clues / interactive | Teal | `#2ABFBF` |
| Text on dark backgrounds | Near-white | `#F0EDE6` |
| Text on cards | Dark brown | `#2D1A0E` |
| Red string (clue connections) | Crimson | `#C0392B` |
| Correct answer | Teal | `#2ABFBF` |
| Wrong answer | Muted orange | `#E67E22` |

### Typography
- **Case file headings** (screen titles, case names): Zilla Slab Bold or Rockwell — a slab serif gives "serious investigation" energy that children find delightfully grown-up
- **Body / question text**: Nunito SemiBold — round and friendly, contrasts with the slab to signal "this is the clue, not the decoration"
- **Handwritten annotations on polaroids**: Caveat or Patrick Hand — a casual handwriting font for the labels the detective writes on the evidence photos

The contrast between the serious slab and the friendly body reinforces "pretend-serious detective" tone — children love feeling like adults while playing.

### Illustration tone
**Polaroid photography meets hand-drawn annotation**. The actual stop photos from the museum (`stop.image`) are displayed in polaroid-style frames — white border, slight rotation (−8° to +8°), amber thumbtack at the top. Each polaroid has a handwritten-style annotation below the photo in teal: a short piece of the family story.

Locked polaroids are displayed as dark grey rectangles with a faint question mark. Unlocked ones show the full photo in warm sepia tone.

Red string SVG lines connect unlocked polaroids in sequence on the case board, growing as more clues are found.

The case board background is deep navy with a subtle cork texture (fine grid dots or light wood grain pattern).

### UI personality
**Investigative**. Every action feels like discovery. Tapping a new clue should feel like picking up evidence. The mystery progresses like a story — each room reveals one piece of the Bicu family's history. The "case solved" moment should feel like genuine revelation, not just task completion.

---

## Key screens

### 1. Detective Agency Intro Screen
Deep navy background. A spotlight effect (CSS radial gradient from amber center) illuminates a case file card in the center — worn cardstock, the museum's exterior photo inside a polaroid frame, stamped **"DOSAR DESCHIS / CASE OPEN"** in amber.

Text: **"O familie. O casă. Mult de descoperit."** in near-white slab serif.

Below: a detective badge icon (shield shape) and the CTA: **"Primește misiunea ta"** in an amber button. Subtitle: **"Detectiv junior, trebuie să descoperi secretul familiei Bicu."**

---

### 2. Case Board Screen (the hub)
The main navigation screen. Deep navy board texture. Multiple polaroid-style evidence cards scattered in a loose, organic layout (not a grid — intentional disorder, like a real investigation board). Each card is slightly rotated (random, fixed per stop), pinned with a small amber thumbtack.

**Locked cards**: dark grey, desaturated, question mark only.
**Unlocked cards**: full warm-sepia photo with a teal handwritten annotation label.

SVG red string lines connect the unlocked cards in sequence — the string grows as more clues are discovered.

Bottom of screen: a horizontal progress meter styled as a **magnifying glass** silhouette, filling from left to right in amber. Label: **"4 indicii descoperite din 12"**.

Top header: **"DOSARUL BICU"** in near-white slab serif, with a small detective badge icon to the left.

Tapping an unlocked card replays its clue text. Tapping a locked card shows a "locked" animation (padlock icon).

---

### 3. Stop Arrival Screen
Full-bleed room photo dimmed to 40% opacity. An animated amber spotlight (CSS radial gradient animation) "scans" across the photo from left to right, then settles and pulsates on a key object in the scene.

Overlay text: **"Detectiv, ai ajuns la [Bucătărie]!"**
Sub-text: **"Caută indiciul ascuns în această cameră."**

One large CTA button: **"Investighează!"** in amber on dark navy.

---

### 4. Clue Question Screen (core interaction)
A "case file" card slides up from the bottom (bottom-sheet pattern), covering 65% of the screen. The room photo stays visible at top.

**Card design**: warm paper background, slightly worn edges (CSS box-shadow inset). Header stamp: **"DOSAR #4"** in amber rubber-stamp style.

Question text at the top in Zilla Slab Bold — styled as a detective's deduction note: **"Pe baza a ceea ce vezi, familia folosea bucătăria pentru..."**

Below: two or three answer options styled as hand-stamped choices — each option has a rubber-stamp letter (A, B, C) in a circle on the left, with the answer text in Nunito.

**After correct answer**: The selected option gets a teal checkmark stamp. The card collapses. A polaroid "develops" in place — starts black, slowly reveals the room photo in sepia over 1.5 seconds (CSS transition). An annotation label fades in below.

**After wrong answer**: The selected option's letter wobbles (CSS keyframe). A small sticky-note pops up: **"Indiciu: [one-sentence hint]"** in Caveat handwriting font. The question stays; retry is allowed.

---

### 5. Evidence Collected Screen
The newly developed polaroid is shown full-screen, centered, with the room photo visible and a teal handwritten annotation below. Example: **"Indiciu #4: Covorul de pe grindă. Familia Bâcu îl țesea iarna ca să aibă căldură în cameră."**

Below the polaroid: a piece of family narrative in larger body text — one sentence of the story that this clue reveals. Written in detective's-note voice, past tense.

CTA: **"Adaugă la dosar →"** in amber. This triggers the red string on the case board to visibly extend to the new card (navigation goes back to case board with animation).

---

### 6. Case Solved Screen
All clues collected. The case board is now fully connected — all polaroids unlocked, red string running between all of them.

A final animation: all polaroids flip face-up and a composite **family portrait** appears in the center — a collage of the key photos with the family's story assembled from all clue annotations, 5–6 connected sentences. The string patterns form a decorative frame around it.

Large amber stamp: **"CAZ REZOLVAT"** drops onto the portrait with a thud animation.

Sub-text: **"Ai descoperit povestea familiei Bicu. Ești un detectiv adevărat!"**

CTA: **"Prezintă dosarul!"** — designed for the child to show the completed case board to the guide. The board becomes a shareable artifact.

---

## Core interaction loop

1. **Arrive at stop** → Spotlight animation scans the room and settles on the key object
2. **Investigate** → Detective deduction question: "Based on what you see, the family used this for..."
3. **Evidence found** → Polaroid develops (animation) with room photo + family story annotation
4. **Case board grows** → Red string extends to connect the new clue, mystery unfolds visually

---

## Figma AI / Google Stitch Prompt

Design a mobile app screen for a children's detective mystery game called "Dosarul Bicu" (The Bicu Case File), set in a traditional Romanian house museum, portrait orientation, iPhone 14 Pro size (393×852px). The screen is the **Case Board home screen**. Background: deep navy blue (#1A2744) with a subtle cork-board texture (fine grid of small dots in slightly lighter navy). Scattered across the board are 8 polaroid-style photo cards at slight random rotations (between −8° and +8°), each "pinned" with a small round amber (#FFBF00) thumbtack icon at the top center. Three cards are "unlocked": they show warm sepia-toned photographs of Romanian traditional household objects (a wooden hand loom, a blue-tiled ceramic stove, a wooden carved door) with short handwritten-style annotation labels below each photo in teal (#2ABFBF) in a casual script font. Five cards are "locked": dark grey rectangles with a faint padlock icon in the center, slightly desaturated. Thin crimson (#C0392B) string lines connect the three unlocked cards in sequence, like a detective's evidence board. At the top of the screen: header text "DOSARUL BICU" in near-white (#F0EDE6) in a slab serif font (like Zilla Slab Bold), with a small shield detective badge icon to the left. At the bottom of the screen: a horizontal progress bar styled as a magnifying glass silhouette, 3/8 filled in amber (#FFBF00), with the label "3 indicii descoperite din 8" in small near-white text below it. The overall mood: warm mysterious, Wes Anderson-inspired children's investigation board — serious and atmospheric but not scary, inviting discovery.
