# Concept 1: Explorer Passport ⭐ Recommended

## Concept headline

A pocket passport that fills with folk-art stamps as children explore the house, turning each room into a discovery checkpoint they earn their way through.

---

## Visual style

### Identity
Vintage adventure journal crossed with a Romanian folk-art sticker album. The mood is warm, tactile, and collectible — think an old Romanian postal stamp collection reimagined as a children's game. The design should feel slightly aged and physical, as if the passport is a real object the child carries.

### Color palette

| Role | Color | Hex |
|------|-------|-----|
| Background (parchment) | Warm off-white | `#F5EDD4` |
| Primary action | Terracotta | `#D95F3B` |
| Earned stamps / highlights | Golden yellow | `#F2A227` |
| Stamp ink / accents | Deep cobalt | `#1D4E89` |
| Card surface | Off-white paper | `#FFFAF0` |
| Body text | Dark chocolate | `#2D1A0E` |
| Correct answer flash | Bright green | `#27AE60` |
| Wrong answer / hint | Muted amber | `#E67E22` |

### Typography
- **Display headings** (stamp names, screen titles): Fredoka One or Nunito ExtraBold — round, chunky, friendly without being babyish
- **Body / question text**: Nunito Regular or SemiBold — highly legible, round terminals, comfortable at large sizes
- **Badge labels / short codes**: monospace or Fredoka One in cobalt

The roundness of the letterforms signals "safe and playful" without going cartoon-baby. Older children (12–14) won't feel talked down to.

### Illustration tone
Flat-vector folk art. Each room gets a **unique stamp icon** that abstracts a real object from that stop using geometric motifs drawn from Romanian embroidery:
- Loom → geometric diamond grid stamp
- Stove → stylized flame-and-arch
- Icon wall → gold frame with a star burst
- Traditional bed → stacked zigzag textile pattern
- Kitchen → round bread loaf with wheat sprig
- Pantry → ceramic jar with diamond band
- Musical instruments → a stylized flute silhouette

The stamp outline (before earned) is a dashed circle with a faint question mark. After earning, the stamp "inks in" with a satisfying snap animation.

Border motifs along the tops/bottoms of screens: simplified Romanian embroidery diamonds and zigzag bands in terracotta and golden yellow.

### UI personality
**Tactile**. Buttons look slightly pressed (box-shadow inset on :active). Cards have a drop shadow that looks like paper lifting off a surface. The passport "filling up" is visible at a glance from any screen — the stamp count in the corner is always present. Progress should feel physical, not digital.

---

## Key screens

### 1. Welcome / Age Picker Screen
Full-screen parchment background with a large illustrated passport cover centered: a leather-textured rectangle with the text **"Pașaportul Exploratorilor Bucovinei"** and a small embroidered crest (the existing museum logo redrawn in folk-art style).

Below the passport cover, three illustrated character options for age-group selection — not labeled with numbers, just visual:
- A small round-faced child (6–8)
- A slightly taller kid with a backpack (9–11)
- A taller, more confident pose (12–14)

Tap a character to select your "explorer type." One big terracotta button below: **"Deschide Pașaportul!"**

No login. No forms. Single tap to start.

---

### 2. Passport Home Screen (the hub)
A two-page spread rendered as a horizontal card — like opening a real passport. Slight page-curl shadow at the spine.

**Left page**: The chosen explorer character (small illustration) + a name field ("Numele tău:" with a single tap-to-edit input, prefilled "Explorator"). Below: total stops count "5 din 12 ștampile".

**Right page**: A 3×4 grid of stamp slots. Earned stamps: full-color folk-art icons. Unearned: dashed circle outlines with faint question marks. Tapping an earned stamp shows the stop name and fun fact.

Below the passport spread, outside the paper: a large terracotta pill button **"Continuă aventura!"** (or **"Începe aventura!"** if no stamps yet).

A small floating icon (bottom-right): current stop counter or a compass icon to navigate to the current position.

---

### 3. Stop Arrival Screen
Full-bleed photo of the room (the existing `stop.image`). A dark overlay (40% opacity) for contrast.

Centered on the photo: a large animated stamp outline (dashed circle, slightly bouncing) with the room name inside in white Fredoka One. Sub-label below: **"Ești în [Camera cu Icoane]! Câștigă ștampila!"**

One large terracotta CTA button at the bottom: **"Descoperă misiunea!"**

---

### 4. Question Screen (core interaction)
Clean white card sliding up from the bottom (bottom-sheet animation), covering 70% of the screen. The room photo is still visible at top.

**Card contents**:
- Top: question text in large Nunito SemiBold (22–24px), age-adapted
- Below: 3 large tappable answer buttons in a vertical list. Each button is a rounded rectangle in parchment (`#F5EDD4`) with dark text, large enough to tap with a thumb. Lettered A / B / C in cobalt in a small circle on the left.

**After correct answer**: the selected button flashes green, the card collapses, and the stamp "thuds" onto the photo with a scale+rotation snap animation (scale from 0.3 to 1.1 to 1.0, slight CCW rotation to final angle — like a rubber stamp).

**After wrong answer**: the selected button shakes horizontally (CSS keyframe), stays amber/orange. A small hint card slides in below: "Încearcă din nou! Indiciu: [one-sentence clue]." The question stays visible.

---

### 5. Stamp Earned Screen
Full-screen celebration. The newly earned stamp is shown large (60% screen width), centered, with its full folk-art illustration in color. The stamp name below: **"Ștampila Războiului de Țesut"** in Fredoka One.

Below the stamp: a fun fact card (parchment color, folk-art border): **"Un covor tradițional putea lua luni întregi să fie țesut!"** — one sentence, kid voice, written in second person.

Two options at the bottom:
- **"Mergi mai departe →"** (primary, terracotta) — next stop
- **"Vezi pașaportul"** (secondary, outlined) — jump to passport spread

---

### 6. Passport Complete Screen
All 12 stamp slots filled. Full-screen parchment. Confetti rains down in folk-art shapes (diamonds, zigzags) in terracotta and golden yellow.

Large text: **"Ai explorat casa!"**
Sub-text: **"Pașaportul tău este complet. Ești un adevărat explorator al Bucovinei!"**

The full passport spread (miniaturized) is shown with all stamps filled, plus a gold "COMPLET" seal stamped diagonally across it.

Big terracotta button: **"Arată ghidului!"** — the entire design of this screen encourages the child to physically show the phone to their museum guide or parent. This is the social moment.

A secondary option: **"Salvează pașaportul"** (shares a screenshot or downloads a PDF summary — v2 feature).

---

## Core interaction loop

1. **Arrive at stop** → Animated stamp outline appears on the room photo, inviting the child to earn it
2. **Read question** → Age-adapted question card slides up (observation / inference / historical reasoning based on selected age tier)
3. **Tap answer** → Correct: stamp thuds into place with animation. Wrong: gentle shake + one-sentence hint, retry allowed
4. **Stamp fills the passport** → Return to passport spread shows progress visually — the collection grows

Each stop takes 60–90 seconds. The full 12-stop experience is 12–18 minutes, well-suited for a school group visit with a guide.

---

## Figma AI / Google Stitch Prompt

Design a mobile app screen for a children's museum explorer game called "Pașaportul Exploratorilor Bucovinei" (Bukovina Explorer's Passport), portrait orientation, iPhone 14 Pro size (393×852px). The screen is the **Passport Home Screen**. Visual style: warm parchment background (#F5EDD4) with subtle paper grain texture. A fine geometric border motif runs along the top and bottom edges using terracotta (#D95F3B) and golden yellow (#F2A227) — the motif is inspired by Romanian embroidery: small diamonds and zigzag bands. The central element is an **open passport book spread**: two off-white (#FFFAF0) rectangular "pages" side by side, slightly wider than the screen, with a soft drop shadow to suggest paper lifting off the background and a subtle curve at the spine edge in the center. The **left page** shows a small round-faced child explorer character illustration (simple flat-vector, warm ochre skin, traditional-inspired clothing, holding a small backpack) with the handwritten-style label "ALEX" in dark brown below, and a sub-label "Explorator Bucovineanu" in a smaller rounded font. The **right page** shows a 3×4 grid of stamp slots (12 total): 5 slots are filled with colorful flat-vector folk-art stamp icons in deep cobalt (#1D4E89) and terracotta — a diamond-grid loom, a flame-and-arch stove, a gold-framed star icon, a zigzag textile bed, a round ceramic jar — each inside a circular stamp border. The remaining 7 slots are empty: dashed circles with faint question mark silhouettes. Below the passport spread, outside the paper, a large rounded-rectangle terracotta (#D95F3B) button reads "Continuă aventura!" in white Nunito Bold. A small progress pill above the button reads "5 din 12 ștampile" in dark brown. The overall mood: warm, tactile, collectible — like a vintage passport crossed with a Romanian folk-art sticker album. Not cartoon-babyish, but clearly designed for children aged 6–14.
