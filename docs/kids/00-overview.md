# Children's Museum Experience — Overview & Recommendation

## Why this exists

A school group visit to Casa Muzeu Bukowina showed that the current guide app has no offering for children. The adult app uses 250–450-word narratives, a heritage palette (walnut, moss, cream), and assumes a reading level and attention span suited to adults. A children's version needs to feel like a completely different product — different visual identity, different interaction model, a game mechanic that gives kids a reason to pay attention at each stop.

## Three concepts pitched

| File | Concept | Best age fit | Design investment |
|------|---------|-------------|-------------------|
| `01-explorer-passport.md` | Explorer Passport | 6–14 (all) | Low–Medium |
| `02-mystery-detective.md` | Mystery Detective | 10–13 | Medium |
| `03-time-traveler.md` | Time Traveler Mission | 7–11 | High (needs illustrator) |

Each file contains: concept headline, full visual style spec (hex palette, type, illustration tone), screen-by-screen descriptions, the core interaction loop, and a ready-to-paste Figma AI / Google Stitch prompt.

---

## Recommendation: Explorer Passport

**Explorer Passport** is the right starting point. Reasons:

- **Works across the full 6–14 age range** — collecting stamps engages younger children; completing a visible artifact satisfies older ones
- **Every stop maps naturally to a stamp icon** — the loom, stove, icon wall, ceramic pantry vessels, the traditional bed — each is visually distinct and memorable enough to illustrate as a collectible folk-art stamp
- **Simplest interaction loop** — one question per stop → stamp earned → passport grows. Fastest to prototype and iterate
- **The "show the guide" moment** — the completion screen is designed for the child to physically show their full passport to the museum guide or parent, creating a social payoff that can be built into docent training
- **Zero visual overlap with the adult app** — terracotta/parchment/golden yellow versus the adult app's walnut/moss/beige. Immediately readable as a distinct product

**Second choice**: Mystery Detective if the museum's school visits skew older (10–13) or a more literary experience is wanted.

**Third choice**: Time Traveler if an illustrator is engaged — the Elena character could become a real mascot, but the concept doesn't land without dedicated character art.

---

## Shared design notes (applies to all three concepts)

### Age selector
All three concepts need an upfront age-group picker. This is the single mechanism that sets question complexity — no other settings screen needed.

| Tier | Age | Question type |
|------|-----|---------------|
| 6–8 | Young | Observation-based: "What color is the pot?" / "Point to the biggest object" |
| 9–11 | Middle | Inference: "Why would a family keep this in the pantry?" |
| 12–14 | Older | Historical reasoning: "How does this object tell us about life in 1854?" |

### Stop selection
38 stops is too many for children. Use 10–12 curated "kid stops" — the most visually interesting and narratively rich:

**From CVB (Casa Veronica Bicu)**:
- CVB-TIN-01 — Welcome / intro (sets the story frame)
- CVB-C1-01 — The Loom (has video, dramatic object, weaving story)
- CVB-C1-03 — The Traditional Bed (piled high with textiles)
- CVB-C1-04 — The Icon Wall (gold frames, spiritual meaning)
- CVB-C2-01 — The Good Room / Parlour
- CVB-C3-01 — The Kitchen (sensory: smells, fire, bread)
- CVB-C3-02 — The Pantry (rows of jars, storage culture)
- CVB-C4-01 or similar — musical instruments / folk objects

**From CAI (Casa Aionitoaie)**:
- 2–3 stops from the house-reconstruction story — CAI's narrative of a community dismantling and rebuilding a house by hand is especially compelling for the Time Traveler concept

### Language
Default to Romanian (`ro`) — the museum is in Putna, visitors are largely Romanian families and school groups. The existing 4-language infrastructure can be reused if international groups are ever targeted, but Romanian-only is the right v1 scope.

### Figma/Stitch prompt usage
Each concept file ends with a `## Figma AI / Google Stitch Prompt` section. Copy the paragraph block verbatim and paste it into:
- **Google Stitch**: stitch.withgoogle.com → new project → paste as initial prompt
- **Figma AI**: Figma → design tab → "Generate UI" → paste prompt

The prompts specify exact hex codes, layout, and mood. Results are better when the tool is given explicit colors, a named screen, device dimensions, and 2–3 mood references.

---

## Implementation path (after a design is chosen)

This is a brief technical map for the developer handoff. Full implementation is a separate sprint.

### 1. New tenant config
Add `public/tenant-kids.json` — the existing `TenantContext` already loads the tenant at runtime. The kids tenant sets a completely different color palette (injected as CSS custom properties) and a new set of feature flags.

New feature flags in `TenantFeatures`:
```ts
kidsMode: boolean
kidsGame: 'passport' | 'detective' | 'time-traveler' | false
```

### 2. New `kids` block in stops.json
Each of the 10–12 selected stops gets a `kids` object alongside the existing adult fields:

```json
"kids": {
  "include": true,
  "stampIcon": "loom",
  "question": {
    "ro": "La ce folosim un război de țesut?",
    "en": "What do you use a loom for?"
  },
  "answers": [
    { "text": { "ro": "Să facem pâine", "en": "Making bread" }, "correct": false },
    { "text": { "ro": "Să țesem pânza", "en": "Weaving fabric" }, "correct": true },
    { "text": { "ro": "Să păstrăm apă", "en": "Storing water" }, "correct": false }
  ],
  "funFact": {
    "ro": "Un covor tradițional putea lua luni întregi să fie țesut!",
    "en": "A traditional rug could take months to weave!"
  },
  "ageAdaptations": {
    "6-8": {
      "question": { "ro": "Ce culoare are firul de pe război?" },
      "answers": [
        { "text": { "ro": "Roșu" }, "correct": false },
        { "text": { "ro": "Alb" }, "correct": true },
        { "text": { "ro": "Verde" }, "correct": false }
      ]
    }
  }
}
```

### 3. New `/kids/` route tree in App.tsx
```
/kids/                    KidsAgeSelectPage
/kids/tour/:tourId        KidsTourPage  (game hub — passport spread / case board / courtyard map)
/kids/tour/:tourId/stop/:stopId  KidsStopPage  (question + reward screen)
/kids/complete/:tourId    KidsCompletePage  (final collection / celebration)
```

### 4. New `src/pages/kids/` component folder
Shares **only**: `useData` hooks, `asset()` helper, `public/data/` JSON files.
Shares **nothing** of: visual components, CSS classes, color variables, layout components.

The new folder is completely isolated — a designer can style it independently without touching the adult app.

### 5. KidsProgressContext
New context (localStorage key: `ghid-kids-progress`) tracks:
- `ageGroup: '6-8' | '9-11' | '12-14'`
- `earnedStops: string[]` — stop IDs where the question was answered correctly
- `currentTourId: string`

### 6. CSS theme separation
A `html.kids-mode` class carries the kids palette as CSS custom properties. The adult and kids palettes never conflict. Toggled when the route is under `/kids/`.

### 7. Validate updated stops.json
Extend `npm run validate` to check that all stops with `kids.include: true` have valid `question`, `answers` (exactly one correct), and `funFact` fields in Romanian.
