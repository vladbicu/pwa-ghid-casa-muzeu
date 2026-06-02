# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (served at http://localhost:5173/ghid/)
npm run build        # tsc + vite build → dist/
npm run lint         # eslint src/
npm run format       # prettier --write src/
npm run validate     # validate JSON data integrity (public/data/)
npm run labels       # regenerate labels.csv from shortCodes
npm run qr           # generate QR codes for print
npm run preview      # preview built dist/
```

No test suite exists — verify changes by running the dev server.

## Architecture

This is a React + TypeScript + Vite **PWA** (Progressive Web App) digital museum guide. It is deployed at `/ghid/` (the Vite `base` is `/ghid/`). All asset paths must use the `asset()` helper from `src/utils/asset.ts` to prepend the base URL correctly.

### Data layer (`public/data/`)

All content is served as static JSON files. The app has no backend. Data files:
- `stops.json` — individual exhibit stops (`Stop[]`)
- `tours.json` — ordered tours referencing stop IDs (`Tour[]`)
- `themes.json` — thematic categories that stops can belong to (`Theme[]`)
- `industry.json` — the Industry section with timeline events (`IndustrySection[]`)
- `intro.json` — onboarding slides (`IntroSlide[]`)

All content fields (`title`, `script`, `keyPoints`, etc.) are `Record<Lang, T>` where `Lang = "ro" | "en" | "fr" | "it"`. Always supply all four languages. Use `getLocalizedText(record, lang)` from `src/hooks/useData.ts` to read them — it falls back to `"ro"` for empty values.

Data is fetched through hooks in `src/hooks/useData.ts` (e.g. `useTours`, `useStop`, `useStopsForTour`). These use an in-memory module-level cache keyed by path, so each JSON file is fetched at most once per session.

After editing data files, run `npm run validate` to catch referential integrity errors (unknown stop IDs in tours, duplicate `shortCode`s, missing translations).

### Multi-tenancy

At startup, `TenantProvider` (`src/config/TenantContext.tsx`) fetches `/tenant.json`. If absent, it falls back to `DEFAULT_TENANT`. The tenant config controls:
- **Colors**: injected as CSS custom properties (`--museum-walnut`, `--museum-moss`, etc.)
- **Feature flags** (`tenant.features`): `shortCodes`, `guidMode`, `thematicTours`, `videoStops`, `contextIntro`, `industrySection` — gates entire sections of the UI

Always access tenant config via `useTenant()`. Never hardcode museum names or colors.

### Routing (`src/App.tsx`)

```
/                         HomePage
/intro                    IntroPage (contextIntro feature gate)
/tour/:tourId             TourDetailPage
/tour/:tourId/stop/:stopId  StopPage (hides Header + Navigation chrome)
/tour/thematic/:themeId   ThematicTourPage
/industry                 IndustryHubPage
/industry/:sectionId      IndustrySectionPage
/find                     FindPage (numeric short-code lookup)
/admin/qr                 AdminQRPage
```

Navigation transitions use Framer Motion `AnimatePresence`. Pass `state: { direction: 1 | -1 }` on navigation to drive slide direction in `StopPage`.

### Settings

`SettingsContext` (`src/context/SettingsContext.tsx`) manages language, theme (light/dark), and viewMode (`tourist` | `guide`), all persisted in `localStorage`. Guide mode (`guidMode` feature flag) shows extra questions for docents. Access via `useSettings()`.

### Localization

UI strings are centralized in `src/i18n/ui.ts`. Call `getUI(language)` to get a typed `UIStrings` object. Add new strings there (with all four languages) rather than inline in components.

### Stop IDs and short codes

Stop IDs follow the convention `{HOUSE_ID}-{ROOM_ID}-{NN}` (e.g. `CVB-TIN-01`). `houseId` is `"CVB"` or `"CAI"`. `shortCode` is an integer printed on physical exhibit labels — visitors enter it on the `/find` page to jump directly to a stop.
