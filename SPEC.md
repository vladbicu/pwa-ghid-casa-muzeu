# SPEC.md — Casa Muzeu Ghid

Digital guide app for the Casa Muzeu Bukowina complex in Putna, Suceava county. A mobile-first PWA that visitors use on-site to self-guide through two historic houses and an academic industry study. No backend — everything is static JSON + React.

---

## Product overview

- **Audience:** Visitors (tourist mode) and docents (guide mode)
- **Languages:** Romanian, English, French, Italian — all content is fully translated
- **Deployment:** Served at `/ghid/` as a static site; installable as a PWA
- **Houses covered:** Casa Veronica Bicu (CVB) and Casa Aionitoaie (CAI)

---

## Current features

### Shell

**Header** (visible on all pages except Stop)
- Logo linking to home; falls back to text name if image fails
- Guide / Visitor mode toggle (hidden when `features.guidMode = false`)
- Dark / light theme toggle
- Language switcher (shows only languages declared in `tenant.json`)

**Bottom navigation** (visible on all pages except Stop)
- Home tab (always present)
- Code lookup tab (shown when `features.shortCodes = true`)
- Active tab indicated by animated green pill above icon

---

### Home page (`/`)

- Resume banner: if a tour was started previously, a persistent banner offers one-tap resumption to the exact stop last visited (stored in `localStorage` as `ghid-resume`)
- Tour grid: card for each tour in `tours.json`, ordered by `tour.order`; each card shows cover image, title, duration, and stop count
- Industry hub card: links to `/industry` — always shown
- Bucovina context tile: links to `/intro` — shown only when `features.contextIntro = true`

---

### Tour detail page (`/tour/:tourId`)

- Full-bleed hero image with back button, duration badge, and stop count
- Theme filter row: horizontal chip strip listing all themes (`themes.json`) that appear at least once in this tour's stops; "Complete Tour" chip resets the filter
  - Selecting a theme filters the stop list to matching stops only
  - Theme filter is passed as `?theme=<id>` on the Begin Tour link so stop-to-stop navigation respects it
- Begin Tour button: navigates to the first stop (first in filtered list if a theme is active)
- Stop list grouped by room, with sequential index numbers

---

### Stop page (`/tour/:tourId/stop/:stopId`)

Full-screen immersive view, no header or bottom nav chrome.

**Structure (top to bottom):**
1. **Hero media** — parallax cover image (or `MediaGallery` if `stop.media` is populated); back arrow + stop counter + list button overlay
2. **Stop title** with type badge (intro / room / object / collection) and estimated time
3. **Script** — the narration text read aloud by the guide or visitor
4. **Key points** — bullet list of 2–4 memorable facts; hidden when empty
5. **Questions** (guide mode only, `features.guidMode`) — discussion prompts for the docent; shown in a green-tinted box
6. **Extra details** — optional long-form text in a collapsible `Accordion`

**Navigation:**
- Previous / Next stop buttons with slide direction animation (`state: { direction: ±1 }`)
- Last stop shows "Finish tour" button back to tour detail
- Progress bar fixed to bottom: fills proportionally through the stop sequence

**Jump-to-stop sheet:**
- Tapping the list icon opens a bottom sheet listing all stops in the current sequence; tapping any jumps directly

**Thematic navigation:**
- When a `?theme=<id>` param is present, prev/next navigate within the theme's stop subset rather than the full tour; the stop counter reflects the theme sequence

**Resume persistence:**
- Every stop visit writes `{ tourId, stopId }` to `localStorage` so the home page resume banner stays current

---

### Thematic tour page (`/tour/thematic/:themeId`)

Standalone page for a theme from `themes.json` (accessible via cards that may be added to the home page or other surfaces).

- Theme header: color-coded icon, title, description, stop count
- Flat list of all stops tagged with this theme across both houses, sorted: CVB first, then CAI, each ordered by `stop.order`
- Each stop card links to its normal stop URL with `?theme=<themeId>` so thematic navigation is preserved inside the stop page

---

### Industry section (`/industry`, `/industry/:sectionId`)

An academic study (1775–1944) separate from the house tours. Gated by `features.industrySection` on the home card, but the routes are always registered.

**Hub page (`/industry`):**
- 3-column card grid listing all sections from `industry.json`, ordered by `section.order`
- Each card shows cover image, period label, title, description excerpt

**Section page (`/industry/:sectionId`):**
- Hero image with period label and title
- Description paragraph
- Vertical timeline: each event has a year, title, body, and optional image
- Sections and events have optional `shortCode` integers so visitors can jump here from the Find page

---

### Bucovina context intro (`/intro`)

A scrollable timeline of historical slides from `intro.json`, covering Habsburg Bukovina (1775–1918). Each slide has an icon, title, body text, and optional image.

- Shown automatically on first visit when `features.contextIntro = true` (redirect from `/` if `ghid-intro-seen` is not set in `localStorage`)
- Also reachable any time via the Bucovina tile on the home page
- "Start visit" button navigates to home and marks the intro as seen

---

### Find by code (`/find`)

Phone-keypad UI for entering numeric `shortCode`s printed on physical exhibit labels.

- Auto-navigates on single-digit input if no valid two-digit code starts with that digit
- Shakes red and shows error message if code is not found
- Resolves to a stop URL (`/tour/:tourId/stop/:stopId`) or an industry section URL (`/industry/:sectionId`)
- Gated in the bottom navigation by `features.shortCodes`

---

### Media gallery (`StopMedia`)

Stops can have a `media` array with mixed content:

| `type` | Behavior |
|---|---|
| `image` | Displayed inline with optional caption |
| `youtube` | Lazy YouTube embed; shows thumbnail + play button; graceful offline message |
| `video-local` | `<video>` player with optional thumbnail poster; served from `/images/` |

Videos are gated by `features.videoStops`. If disabled, video items are hidden and the fallback `stop.image` is shown instead.

---

### Settings (persisted in `localStorage`)

| Key | Values | Default |
|---|---|---|
| `ghid-language` | `ro` / `en` / `fr` / `it` | tenant `defaultLanguage` |
| `ghid-theme` | `light` / `dark` | `light` |
| `ghid-view-mode` | `tourist` / `guide` | `tourist` |
| `ghid-intro-seen` | `"1"` / absent | absent |
| `ghid-resume` | `{ tourId, stopId }` JSON | absent |

---

### Multi-tenancy

`/tenant.json` is fetched at startup. It controls the museum name, logo, base URL, color palette (applied as CSS custom properties), default language, available languages, contact info, and feature flags. If the file is absent the app falls back to the hardcoded default config for Casa Muzeu Bukowina.

Feature flags in `tenant.features`:

| Flag | Effect when `false` |
|---|---|
| `shortCodes` | Hides Code tab in bottom nav |
| `guidMode` | Hides guide/visitor toggle in header; questions section hidden |
| `thematicTours` | Theme filter hidden on tour detail; thematic tour pages still routed |
| `videoStops` | Video items in MediaGallery are suppressed |
| `contextIntro` | Bucovina tile hidden on home; no redirect on first visit |
| `industrySection` | Industry card hidden on home (routes still registered) |

---

### Admin — QR generator (`/admin/qr`)

Internal page (not linked from navigation) that generates print-ready QR code labels for all stops and industry sections that have a `shortCode`. Downloads a ZIP of individual SVG/PNG files.

---

### PWA / offline

- Service worker via `vite-plugin-pwa` (Workbox, `autoUpdate` mode)
- Pre-caches all JS, CSS, HTML, ICO, SVG assets
- Runtime cache for `/images/**` (CacheFirst, 200-image cap, 30-day TTL)
- JSON data files are network-first (no explicit runtime cache rule — they are small and change infrequently)

---

## Planned features

_Add new feature specs below. Each entry should describe the user-facing behaviour, the data changes needed (new fields in JSON or new JSON files), and any new routes or feature flags required._

<!-- Example format:

### Feature name

**Goal:** one sentence on what this adds for the visitor or docent.

**UX:**
- describe screens and interactions

**Data:**
- new fields or files in `public/data/`

**Feature flag:** `features.xxx` (add to `TenantFeatures` in `src/config/types.ts`)

**Routes:** `/new-route`

-->
