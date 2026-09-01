# Concept 3: Time Traveler Mission

## Concept headline

Children have "time-traveled" to 1854 Bucovina and must help Bunicuța Elena prepare for Christmas by completing a small mission in each room before the holiday arrives.

---

## Visual style

### Identity
A storybook that came to life on a phone. The experience should feel like stepping inside a Romanian fairy-tale illustration — warm, immersive, narrative-driven. The central recurring character is **Bunicuța Elena**, an elderly grandmother from 1854, illustrated in a warm flat-vector style. She appears on every screen and guides the child through the house with speech bubbles. Her warmth makes the history feel personal, not educational.

### Color palette

| Role | Color | Hex |
|------|-------|-----|
| Background (time portal) | Deep forest green | `#1A3A2A` |
| Active room / mission | Warm amber | `#FFF0C8` |
| Primary action / candlelight | Bright gold | `#F5C842` |
| Urgency / celebration | Raspberry | `#C0392B` |
| Card surface | Warm cream (aged paper) | `#FFFAEF` |
| Body text | Dark warm brown | `#2D1A0E` |
| Text on dark | Near-white | `#F2EDE0` |
| Correct answer | Soft green | `#27AE60` |
| Elena's speech bubbles | Warm amber | `#FFF0C8` |

The palette shifts dramatically between the "time portal" screens (deep green) and "inside the house" mission screens (warm amber/cream). This color shift is the visual metaphor for time travel — green is the magic, amber is 1854.

### Typography
- **Display headings** (mission titles, screen names): Baloo 2 ExtraBold or Comfortaa Bold — very round, high weight, storybook warmth
- **Elena's speech / story text**: Nunito Regular — natural, conversational, at a comfortable reading size
- **Mission labels / metadata**: Baloo 2 Medium — matches the display headings but at smaller size

Roundness in type is essential here — it signals "story and safety." This is the most child-forward of the three concepts.

### Character: Bunicuța Elena
A full-body illustrated character: a small, round-faced elderly Romanian woman in traditional Bukovinian dress — white embroidered blouse (ie with colored stitching), dark wool skirt, a colorful apron, white head scarf. Illustrated in warm flat-vector style with slightly thick outlines. Expression is kind and welcoming. She appears on:
- The portal entry (peeking out of the portal, waving)
- Mission briefings (standing next to the room photo, gesturing)
- Correct answer confirmation (happy jump animation)
- Wrong answer (head-scratch, hint gesture)
- Mission complete (standing in the decorated room, smiling)
- Final celebration (with the whole illustrated Bicu family)

Elena is the soul of this concept. Without dedicated character illustration, the concept cannot be pitched convincingly.

### Illustration tone
**Romanian fairy-tale book style** — inspired by illustrations in Ion Creangă collections and Romanian folk-tale picture books from the 1970s–1980s. Warm, slightly simplified, with visible "craft" in the linework. Flat color fills with slightly thick outlines. Character proportions are friendly and approachable (slightly large heads, round shapes).

Stop photos are displayed in **storybook frames**: oval or arched shapes with illustrated foliage (oak leaves, embroidery motifs) as borders. This transforms the real museum photos into something that feels like illustrations from a book.

The house floor plan (used as the mission hub) is a top-down illustrated overview — not a technical drawing, but a warm illustrated map with each room visible.

### UI personality
**Narrative-driven**. Every screen has at least one sentence of story. The child is not a user completing tasks — they are a character helping Elena. Progress is a **Christmas countdown** ("4 zile până la Crăciun"), not a percentage bar. When a room is completed, a candle appears on the floor plan. The final screen is the candles all lit — a visual metaphor for Christmas readiness.

---

## Key screens

### 1. Time Portal Entry Screen
Full-screen deep forest green background. A swirling portal animation in the center — concentric rings in gold, slightly glowing, CSS keyframe animation.

Elena's illustrated character peeks out from the portal edge, waving one hand. Speech bubble: **"Bun venit! Avem nevoie de ajutorul tău în 1854!"**

Header text: **"1854. Putna, Bucovina."** in near-white Baloo 2.
Sub-text: **"O familie te-a chemat să-i ajuți să se pregătească de Crăciun."**

One large gold CTA button: **"Intru în portal!"** with a stylized watch/portal icon.

---

### 2. Mission Hub Screen ("The Courtyard")
The central navigation screen. A warm illustrated top-down view of the CVB house floor plan — not technical, but a storybook map. Each room is clearly labeled with a warm illustrated label.

**Room states**:
- **Not yet visited**: room is drawn in muted colors, a small padlock icon in the center
- **Current / available**: room glows with a soft gold halo
- **Completed**: a small animated candle flickers in the room

Elena stands illustrated in the courtyard center. Speech bubble changes based on progress — e.g.: **"Mai avem 3 camere de pregătit! Hai la bucătărie!"** or **"Extraordinar! Hai mai departe!"**

Top of screen: a Christmas countdown counter — **"4 zile până la Crăciun"** with a small advent-calendar icon. This counts down as missions are completed (12 stops = 12 "days" to go).

The floor plan fills in with warm light as missions are completed — a visual representation of the house becoming ready for Christmas.

---

### 3. Mission Briefing Screen
Elena stands full-body on the left side of the screen against a warm amber background. On the right: the actual room photo displayed in an arched storybook frame with illustrated foliage borders.

Elena's speech bubble describes the mission in story voice: **"Trebuie să pregătim camera bună! Ajută-mă să descopăr ce este important pentru sărbătoare!"**

Below: a "mission card" in warm cream, with the mission title: **"Misiunea: Pregătește Camera Bună"** and a simple icon.

Large gold CTA button: **"Sunt gata!"**

---

### 4. Mission Task Screen (core interaction)
**Split screen layout**:
- **Top half** (45%): The room photo inside an arched storybook frame with embroidery-motif borders. The frame fills the width of the screen.
- **Bottom half** (55%): A cream mission card.

The mission card shows:
- Elena's handwritten-style note at the top: **"Elena scrie: 'Ce lucru din această cameră îl folosim la Crăciun?'"**
- Below: three illustrated answer options as large rounded buttons. Each button has a small folk-art icon alongside the text.

**After correct answer**: Elena does a small jump animation (scale-bounce on the illustrated character, which persists at bottom of screen as a small avatar). A candle icon animates onto the floor plan. Elena's speech bubble: **"Bravo! Asta era!"**

**After wrong answer**: Elena scratches her head (alternative expression state). Speech bubble: **"Hmm, mai încearcă! Indiciu: [one sentence]."** The question stays; retry is allowed.

---

### 5. Mission Complete Screen
Elena stands illustrated in the now-decorated room — a small candle appears on a surface in the background illustration, the storybook frame now shows the room with golden light.

Elena's speech bubble: **"Mulțumesc! Acum camera e gata de sărbătoare!"**

Below the illustration: an **"1854 Fact"** card in warm cream, styled as a book page, with a decorative top border. Contains one real historical detail about how this room or object was actually used at Christmas in 19th-century Bucovina. Written in child-accessible language: **"În 1854, familia Bicu folosea această cameră ca să primească oaspeții de Crăciun. Covoarele de pe pereți erau cele mai frumoase din casă!"**

Two options:
- **"Mergi la următoarea cameră →"** (gold button, primary)
- **"Înapoi în curte"** (secondary, outlined — returns to floor plan hub)

---

### 6. Holiday Celebration Screen (Completion)
All 12 rooms have candles lit on the floor plan. Elena and the illustrated Bicu family (simplified character group: Elena, a man, two children) stand together in the courtyard illustration.

CSS snowfall animation: small white dots drift down the screen.

Large text: **"Ajutorul tău a contat. Familia e gata de Crăciun în 1854!"**

Sub-text: **"Datorită ție, casa Bicu strălucește de sărbătoare."**

A **certificate card** slides up: an aged-paper card with decorative embroidery border, reading **"Am ajutat familia Bicu să se pregătească de Crăciun în 1854"** with the child's entered name and today's date.

CTA: **"Arată familiei tale!"** — the child shows the certificate to their guide or parent.

---

## Core interaction loop

1. **Enter room** → Elena briefs the mission in story voice; context is given as narrative, not exposition
2. **Complete mission** → Answer a contextual question framed as "helping Elena" (what to put here, how the family used this space, what this object is for)
3. **Room lights up** → An animated candle appears on the floor plan map; Christmas countdown decrements by one
4. **Receive 1854 fact** → A real historical detail about the room, told by Elena in story voice; the child leaves with genuine knowledge embedded in a memory

---

## Important note for designers

This concept **requires a dedicated character illustration** of Bunicuța Elena before it can be fully pitched or prototyped. The concept's emotional impact is entirely dependent on Elena feeling consistent, warm, and well-crafted across all screens. Without character art, this concept cannot be evaluated fairly from mockups.

**Recommended next step if choosing this concept**: Commission a Romanian folk-art-style illustration of Elena (one standing pose, 3–4 expression variants: neutral/welcoming, happy, confused/thinking, celebrating). All other screens can be designed around her once the character is established.

---

## Figma AI / Google Stitch Prompt

Design a mobile app screen for a children's time-travel game called "Misiunile Elenei" (Elena's Missions), set in a traditional Romanian house in 1854 Bucovina, portrait orientation, iPhone 14 Pro size (393×852px). The screen is the **Mission Hub / Courtyard screen**. Background: warm amber (#FFF0C8). The central element is an illustrated top-down view of a traditional Romanian wooden house floor plan, drawn in a storybook map style (not technical — warm illustrated linework, slightly thick outlines, visible rooms labeled in Romanian). The floor plan has 6 rooms visible: "Tindă" (entrance hall), "Camera Bună" (parlour), "Bucătărie" (kitchen), "Cămară" (pantry), "Camera 3", "Camera 4". Three rooms are "completed": they have a small animated candle icon drawn in their center in warm gold (#F5C842). Two rooms are "available": they have a soft golden halo/glow effect around their outline. One room is "locked": it's drawn in muted grey tones. In the courtyard area between the rooms stands a small flat-vector illustrated character: an elderly Romanian grandmother (Bunicuța Elena) in traditional Bukovinian dress — white embroidered blouse, dark skirt, colorful apron, white head scarf — with a warm speech bubble to her right reading "Mai avem 3 camere de pregătit!" in Nunito font. At the top of the screen: a Christmas countdown chip reads "4 zile până la Crăciun" with a small candle icon, in dark brown text on a warm cream background pill. The outer edges of the screen have a thin decorative border of Romanian embroidery motifs (diamond and zigzag patterns) in raspberry (#C0392B) and gold. The overall mood: warm, cozy, storybook — like a Romanian fairy tale illustration come to life.
