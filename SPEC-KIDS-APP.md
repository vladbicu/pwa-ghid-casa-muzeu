# Explorer Passport — Kids App Spec

## Overview

The Explorer Passport is a children's game built into the museum guide PWA. Kids earn stamps by visiting each room of the house and answering a question about it. The experience lives at `/pasaportul-exploratorului/` and is completely separate from the adult guide — independent language selection, its own palette, no shared navigation chrome.

---

## Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/pasaportul-exploratorului` | `KidsWelcomePage` | Entry point — setup or returning-visitor shortcut |
| `/pasaportul-exploratorului/pasaport` | `KidsPassportPage` | Passport spread + stamp grid + progress bar |
| `/pasaportul-exploratorului/oprire/:stopId` | `KidsStopPage` | Single room: photo, story, quiz, stamp |
| `/pasaportul-exploratorului/complet` | `KidsCompletePage` | Celebration screen + full stamp grid |

All four `/kids/*` paths must be removed. Old paths should 404 (via `NotFound`).

`useMatch('/pasaportul-exploratorului/*')` replaces the current `/kids/*` match in `App.tsx` for triggering `kids-mode` CSS class and hiding the adult Header/Navigation chrome.

---

## State — `KidsProgress` interface

Stored in `localStorage` at key `ghid-kids-progress`.

```ts
interface KidsProgress {
  ageGroup: AgeGroup;            // '6-8' | '9-11' | '12-14'
  gender: 'boy' | 'girl';        // new
  explorerName: string;
  language: Lang;                // new — 'ro' | 'en' | 'fr' | 'it'
  earnedStopIds: string[];
  startedAt: number;
}
```

`startAdventure(ageGroup, name, language, gender)` — updated signature.  
Context file: `src/context/KidsProgressContext.tsx`

---

## Welcome Page (`KidsWelcomePage.tsx`)

### Language picker (top of page, above passport cover)

Four tappable chips in a horizontal row:

```
[ 🇷🇴 RO ]  [ 🇬🇧 EN ]  [ 🇫🇷 FR ]  [ 🇮🇹 IT ]
```

- Default: `ro`
- Selected: terracotta background + white text
- Unselected: parchment + muted ink
- Changing language immediately re-renders all strings on this page via `getKidsUI(lang)`

### Gender picker (between age selector and name input)

Two large tappable cards, same visual style as age group cards:

```
[ 👦 Băiat / Boy / Garçon / Maschio ]
[ 👧 Fată  / Girl / Fille  / Femmina ]
```

- Default: neither selected (must choose before proceeding)
- Selected state: terracotta border + tinted background
- Selecting a gender pre-fills the name input with the gender-appropriate default:
  - ro boy → "Explorator", ro girl → "Exploratoare"
  - en → "Explorer" (both)
  - fr boy → "Explorateur", fr girl → "Exploratrice"
  - it boy → "Esploratore", it girl → "Esploratrice"

### Start button

Disabled until both age group AND gender are selected (language defaults to `ro` so it's never blocking).

---

## Gender Effects

Only two things change based on gender:

1. **Passport left page** (`KidsPassportPage`) — explorer subtitle:
   - ro boy: "Explorator Bucovineanu" / ro girl: "Exploratoare Bucovineancă"
   - en: "Bukovina Explorer" (same for both)
   - fr boy: "Explorateur de Bucovine" / fr girl: "Exploratrice de Bucovine"
   - it boy: "Esploratore della Bucovina" / it girl: "Esploratrice della Bucovina"

2. **Completion screen** (`KidsCompletePage`) — main greeting:
   - ro boy: "Ești un adevărat explorator al Bucovinei!"
   - ro girl: "Ești o adevărată exploratoare a Bucovinei!"
   - en: "You're a true Bukovina Explorer!" (same for both)
   - fr boy: "Tu es un vrai explorateur de Bucovine!"
   - fr girl: "Tu es une vraie exploratrice de Bucovine!"
   - it boy: "Sei un vero esploratore della Bucovina!"
   - it girl: "Sei una vera esploratrice della Bucovina!"

Questions, answers, and all stop content are entirely gender-neutral — no changes needed there.

---

## Internationalization

### UI strings — `src/i18n/ui.ts`

Add a `KidsUIStrings` interface and `kidsUiStrings` record **separate** from the adult `UIStrings`. Export `getKidsUI(lang: Lang): KidsUIStrings`.

| Key | ro | en | fr | it |
|-----|----|----|----|----|
| `welcomeTitle` | Pașaportul Exploratorilor Bucovinei | Bukovina Explorer's Passport | Passeport des Explorateurs de Bucovine | Passaporto degli Esploratori della Bucovina |
| `chooseExplorer` | Alege tipul tău de explorator: | Choose your explorer type: | Choisissez votre type d'explorateur : | Scegli il tuo tipo di esploratore: |
| `chooseGender` | Ești băiat sau fată? | Are you a boy or a girl? | Tu es un garçon ou une fille ? | Sei maschio o femmina? |
| `boy` | Băiat | Boy | Garçon | Maschio |
| `girl` | Fată | Girl | Fille | Femmina |
| `chooseLanguage` | Alege limba: | Choose language: | Choisir la langue : | Scegli la lingua: |
| `yourName` | Numele tău (opțional): | Your name (optional): | Ton prénom (optionnel) : | Il tuo nome (opzionale): |
| `openPassport` | Deschide Pașaportul! 🎒 | Open the Passport! 🎒 | Ouvre le Passeport ! 🎒 | Apri il Passaporto! 🎒 |
| `welcomeBack` | Bun revenit | Welcome back | Bon retour | Ben tornato/a |
| `stampsCollected` | ștampile colectate | stamps collected | tampons collectés | timbri raccolti |
| `continueAdventure` | Continuă aventura! → | Continue the adventure! → | Continue l'aventure ! → | Continua l'avventura! → |
| `startOver` | Începe din nou | Start over | Recommencer | Ricominciare |
| `myPassport` | Pașaportul meu | My Passport | Mon Passeport | Il mio Passaporto |
| `stampsProgress` | ștampile | stamps | tampons | timbri |
| `passportComplete` | Pașaport complet! 🎉 | Passport complete! 🎉 | Passeport complet ! 🎉 | Passaporto completo! 🎉 |
| `stampsRemaining` | ștampile rămase | stamps remaining | tampons restants | timbri rimanenti |
| `startAdventure` | Începe aventura! 🎒 | Start the adventure! 🎒 | Commence l'aventure ! 🎒 | Inizia l'avventura! 🎒 |
| `seeFullPassport` | Vezi pașaportul complet! 🎊 | See full passport! 🎊 | Voir le passeport complet ! 🎊 | Vedi il passaporto completo! 🎊 |
| `backToPassport` | ← Pașaport | ← Passport | ← Passeport | ← Passaporto |
| `earnStamp` | Câștigă ștampila! 🎯 | Earn the stamp! 🎯 | Gagne le tampon ! 🎯 | Guadagna il timbro! 🎯 |
| `keepGoing` | Mergi mai departe → | Keep going → | Continue → | Avanti → |
| `finishPassport` | Finalizează pașaportul! 🎊 | Finish the passport! 🎊 | Finalise le passeport ! 🎊 | Finalizza il passaporto! 🎊 |
| `tryAgain` | Încearcă din nou! Citește din nou povestea pentru un indiciu. 💡 | Try again! Re-read the story for a hint. 💡 | Réessaie ! Relis l'histoire pour un indice. 💡 | Riprova! Rileggi la storia per un indizio. 💡 |
| `didYouKnow` | Știai că... | Did you know... | Le savais-tu... | Lo sapevi che... |
| `congratulations` | Felicitări! 🎉 | Congratulations! 🎉 | Félicitations ! 🎉 | Complimenti! 🎉 |
| `exploredHouse` | Ai explorat toată casa! | You explored the whole house! | Tu as exploré toute la maison ! | Hai esplorato tutta la casa! |
| `showGuide` | Arată ghidului! 🙌 | Show the guide! 🙌 | Montre au guide ! 🙌 | Mostra alla guida! 🙌 |
| `newAdventure` | Începe o nouă aventură | Start a new adventure | Commencer une nouvelle aventure | Inizia una nuova avventura |
| `bukovinaExplorer` | Explorator Bucovineanu / Exploratoare Bucovineancă | Bukovina Explorer | Explorateur de Bucovine / Exploratrice de Bucovine | Esploratore della Bucovina / Esploratrice della Bucovina |

The `bukovinaExplorer` key returns the gender-appropriate form based on `progress.gender`. Helper suggestion:
```ts
function getExplorerTitle(ui: KidsUIStrings, gender: 'boy' | 'girl'): string {
  // ui.bukovinaExplorer stores 'boy form / girl form' or single form
  // Split on ' / ' and pick index based on gender
}
```

### Data layer — `public/data/stops.json`

All `kids` text fields must be widened from `{ "ro": "..." }` to `Record<Lang, string>`. The TypeScript types in `src/types/index.ts` must also be widened.

**TypeScript change** (file: `src/types/index.ts`):
```ts
// Before
scriptKids: { ro: string };
question: { ro: string };
// answer text: { ro: string }
funFact: { ro: string };

// After
scriptKids: Record<Lang, string>;
question: Record<Lang, string>;
// answer text: Record<Lang, string>
funFact: Record<Lang, string>;
```

**English content for all 10 stops** (to be added via Python migration script):

| Stop ID | scriptKids (en) | question (en) | correct answer (en) |
|---------|-----------------|----------------|----------------------|
| CVB-TIN-01 | Did you know this house is almost 170 years old? It was built in 1854 by a man named Niculai Bâcu — and 6 generations of his family have lived here since! | What year was the house built? | 1854 |
| CVB-C1-01 | Did you know that clothes and rugs were woven right here at home? The loom is the machine that turned wool threads into fabric. It was hidden under rugs for years, disassembled piece by piece — like a wooden puzzle! | What was the loom used for? | Weaving fabric and rugs |
| CVB-C1-02 | This stove isn't originally from Romania — it's a German design, brought to Bukovina when Austrians ruled the region. In the evenings, the whole family gathered around it to warm up and tell stories. | What important role did the stove play in winter? | It warmed the room and brought the family together |
| CVB-C1-03 | This bed looks beautiful — but people didn't sleep in it every night! It was arranged perfectly, with pillows piled as high as possible, to impress guests. The textiles — quilts and pillows — were made by the family themselves. | Why was the bed arranged so beautifully? | To impress guests |
| CVB-C1-04 | Every room in a traditional house had an icon corner — a special place for prayer. Icons protected the home and family. The most important holidays — Christmas, Easter — were celebrated facing this corner. | Where were the icons in a traditional house? | In a special corner of every room |
| CVB-C2-01 | The "good room" was the special room of the house — always clean and perfectly arranged, even though nobody used it daily. It was reserved for important guests: godparents, priests, respected village members. | What was the good room used for? | To receive special guests |
| CVB-C3-01 | The kitchen was the heart of the house — the day began and ended here. Early every morning a fire was lit, food was cooked, bread was baked. The smell of fresh bread and burning wood filled the whole house! | What happened in the kitchen every morning? | The fire was lit and food was cooked |
| CVB-C4-01 | The pantry was the storage room of the house — where preserves, pickles, cheese, and everything needed for winter were kept. A family with a full pantry could make it through winter without worry! | What was the pantry used for? | To keep food for winter |
| CAI-TIN-01 | This house was rescued! It was about to be demolished, but people in the community decided to move and rebuild it right next to Casa Veronica Bicu. A house can't be moved in a truck — it must be taken apart beam by beam and rebuilt! | How did Casa Aionitoaie get here? | It was taken apart and rebuilt by the community |
| CAI-TIN-02 | Rebuilding the house was enormous work — dozens of volunteers worked together, each bringing a piece of their skill. Some knew how to work wood, others stone, others roofing. Together, they rebuilt something that was about to be lost forever! | Who rebuilt Casa Aionitoaie? | Community volunteers |

French and Italian translations follow the same structure. The 6-8 age adaptations (`ageAdaptations['6-8']`) need the same widening for `question` and `answers[].text`.

---

## Files to Modify

| File | What changes |
|------|-------------|
| `src/App.tsx` | Rename 4 route paths; update `useMatch` to `/pasaportul-exploratorului/*`; update homepage link |
| `src/pages/HomePage.tsx` | Update `<Link to="/pasaportul-exploratorului">` |
| `src/types/index.ts` | Widen all `KidsData` text fields to `Record<Lang, string>` |
| `src/context/KidsProgressContext.tsx` | Add `language: Lang` + `gender: 'boy' \| 'girl'`; update `startAdventure` signature |
| `src/i18n/ui.ts` | Add `KidsUIStrings` interface + `kidsUiStrings` object + `getKidsUI(lang)` export |
| `src/pages/kids/KidsWelcomePage.tsx` | Add language picker (top) + gender picker; call `getKidsUI`; pass `language` + `gender` to `startAdventure` |
| `src/pages/kids/KidsPassportPage.tsx` | Update `navigate()` paths; use `getKidsUI`; gender-aware explorer subtitle |
| `src/pages/kids/KidsStopPage.tsx` | Update `navigate()` paths; use `progress.language` to read localized content |
| `src/pages/kids/KidsCompletePage.tsx` | Update `navigate()` paths; gender-aware completion greeting; use `getKidsUI` |
| `public/data/stops.json` | Add `en`, `fr`, `it` to all kids text fields (Python migration script) |

---

## Verification Checklist

1. `npm run build` → clean with no TypeScript errors
2. `npm run validate` → JSON integrity passes
3. Navigate to `/ghid/pasaportul-exploratorului` → welcome page loads
4. Navigate to `/ghid/kids` → 404 NotFound page
5. Switch language to EN on welcome page → all strings update immediately
6. Select "Fată" → name input pre-fills with gender-appropriate default
7. Complete setup → passport page shows localized subtitle and UI
8. At a stop in EN mode → story text, question, answers all in English
9. Complete all stops → completion greeting is gender-aware
10. Adult routes (`/`, `/tour/...`) completely unaffected — no kids palette, normal chrome
