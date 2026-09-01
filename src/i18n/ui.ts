import type { Lang, StopType } from '../types';

const stopTypeLabels: Record<Lang, Record<StopType, string>> = {
  ro: { intro: 'Introducere', room: 'Cameră', object: 'Obiect', collection: 'Colecție' },
  en: { intro: 'Introduction', room: 'Room', object: 'Object', collection: 'Collection' },
  fr: { intro: 'Introduction', room: 'Salle', object: 'Objet', collection: 'Collection' },
  it: { intro: 'Introduzione', room: 'Stanza', object: 'Oggetto', collection: 'Collezione' },
};

interface UIStrings {
  homeTitle: string;
  selectTour: string;
  industryTitle: string;
  industrySubtitle: string;
  studyBadge: string;
  backToIndustry: string;
  timeline: string;
  stopCounter: (current: number, total: number) => string;
  back: string;
  nextStop: string;
  finishTour: string;
  keyPoints: string;
  questions: string;
  extraDetails: string;
  stops: string;
  beginTour: string;
  continueTour: string;
  resumeLabel: (stopTitle: string) => string;
  stopTypeLabel: (type: StopType) => string;
  estTime: (mins: number) => string;
  stopNotFound: string;
  backToTour: string;
  findPageTitle: string;
  findPageSubtitle: string;
  findCodeNotFound: string;
  findNav: string;
  touristMode: string;
  guideMode: string;
  switchToGuide: string;
  switchToTourist: string;
  guideQuestions: string;
  skipIntro: string;
  startVisit: string;
  aboutBukovina: string;
  thematicTours: string;
  thematicBadge: string;
  stopsCount: (n: number) => string;
  videoUnavailableOffline: string;
  watchVideo: string;
  bukovinaSubtitle: string;
  completeTour: string;
  toursNav: string;
  homeGreeting: string;
  homeGreetingSub: (stops: number) => string;
  nextLabel: string;
  openStop: string;
  moreBtn: string;
  guideModeBar: string;
  scanQrHint: string;
  resumeShort: string;
  guideSay: string;
}

const uiStrings: Record<Lang, UIStrings> = {
  ro: {
    homeTitle: 'Ghid Casa Muzeu',
    selectTour: 'Selectează un tur pentru a începe ghidajul.',
    industryTitle: 'Industria din Putna',
    industrySubtitle: 'Studiu 1775–1944',
    studyBadge: 'Studiu academic',
    backToIndustry: '← Înapoi la industrie',
    timeline: 'Cronologie',
    stopCounter: (c, t) => `Oprire ${c} din ${t}`,
    back: 'Înapoi',
    nextStop: 'Următoarea oprire',
    finishTour: 'Finalizează turul',
    keyPoints: 'Puncte cheie',
    questions: 'Întrebări pentru public',
    extraDetails: 'Extra detalii',
    stops: 'Opriri',
    beginTour: 'Începe turul',
    continueTour: 'Continuă turul',
    resumeLabel: (title) => `Continuă: ${title}`,
    stopTypeLabel: (type) => stopTypeLabels.ro[type],
    estTime: (mins) => `~${mins} min`,
    stopNotFound: 'Oprirea nu a fost găsită',
    backToTour: '← Înapoi la tur',
    findPageTitle: 'Caută după cod',
    findPageSubtitle: 'Introdu codul de pe etichetă',
    findCodeNotFound: 'Cod negăsit',
    findNav: 'Cod etichetă',
    touristMode: 'Vizitator',
    guideMode: 'Ghid',
    switchToGuide: 'Comută la modul ghid',
    switchToTourist: 'Comută la modul vizitator',
    guideQuestions: 'Întrebări pentru public',
    skipIntro: 'Sari',
    startVisit: 'Începe vizita',
    aboutBukovina: 'Despre Bucovina',
    thematicTours: 'Explorează pe temă',
    thematicBadge: 'Tur tematic',
    stopsCount: (n) => `${n} opriri`,
    videoUnavailableOffline: 'Video disponibil online',
    watchVideo: 'Redă video',
    bukovinaSubtitle: 'Contextul istoric al Bucovinei',
    completeTour: 'Tur Complet',
    toursNav: 'Tururi',
    homeGreeting: 'Bună ziua la Putna.',
    homeGreetingSub: (s) => `Două case, ${s} de opriri. Mergeți în ritmul dumneavoastră.`,
    nextLabel: 'Urmează',
    openStop: 'Deschide oprirea',
    moreBtn: 'Mai departe',
    guideModeBar: 'Mod ghid',
    scanQrHint: 'Sau scanați codul QR de pe etichetă',
    resumeShort: 'Reia',
    guideSay: 'Ce spui',
  },
  en: {
    homeTitle: 'Casa Muzeu Guide',
    selectTour: 'Select a tour to begin your guided visit.',
    industryTitle: 'Industry in Putna',
    industrySubtitle: 'Study 1775–1944',
    studyBadge: 'Academic Study',
    backToIndustry: '← Back to Industry',
    timeline: 'Timeline',
    stopCounter: (c, t) => `Stop ${c} of ${t}`,
    back: 'Back',
    nextStop: 'Next stop',
    finishTour: 'Finish tour',
    keyPoints: 'Key points',
    questions: 'Questions for the audience',
    extraDetails: 'Extra details',
    stops: 'Stops',
    beginTour: 'Begin tour',
    continueTour: 'Continue tour',
    resumeLabel: (title) => `Continue: ${title}`,
    stopTypeLabel: (type) => stopTypeLabels.en[type],
    estTime: (mins) => `~${mins} min`,
    stopNotFound: 'Stop not found',
    backToTour: '← Back to tour',
    findPageTitle: 'Find by code',
    findPageSubtitle: 'Enter the code from the label',
    findCodeNotFound: 'Code not found',
    findNav: 'Label code',
    touristMode: 'Visitor',
    guideMode: 'Guide',
    switchToGuide: 'Switch to guide mode',
    switchToTourist: 'Switch to visitor mode',
    guideQuestions: 'Questions for the audience',
    skipIntro: 'Skip',
    startVisit: 'Start visit',
    aboutBukovina: 'About Bukovina',
    thematicTours: 'Explore by theme',
    thematicBadge: 'Thematic tour',
    stopsCount: (n) => `${n} stops`,
    videoUnavailableOffline: 'Video available online',
    watchVideo: 'Play video',
    bukovinaSubtitle: 'Historical context of Bukovina',
    completeTour: 'Complete Tour',
    toursNav: 'Tours',
    homeGreeting: 'Welcome to Putna.',
    homeGreetingSub: (s) => `Two houses, ${s} stops. Go at your own pace.`,
    nextLabel: 'Next',
    openStop: 'Open stop',
    moreBtn: 'Continue',
    guideModeBar: 'Guide mode',
    scanQrHint: 'Or scan the QR code on the label',
    resumeShort: 'Resume',
    guideSay: 'What you say',
  },
  fr: {
    homeTitle: 'Guide Casa Muzeu',
    selectTour: 'Sélectionnez une visite pour commencer le guidage.',
    industryTitle: "L'industrie à Putna",
    industrySubtitle: 'Étude 1775–1944',
    studyBadge: 'Étude académique',
    backToIndustry: "← Retour à l'industrie",
    timeline: 'Chronologie',
    stopCounter: (c, t) => `Arrêt ${c} sur ${t}`,
    back: 'Retour',
    nextStop: 'Arrêt suivant',
    finishTour: 'Terminer la visite',
    keyPoints: 'Points clés',
    questions: 'Questions pour le public',
    extraDetails: 'Détails supplémentaires',
    stops: 'Arrêts',
    beginTour: 'Commencer',
    continueTour: 'Continuer la visite',
    resumeLabel: (title) => `Reprendre : ${title}`,
    stopTypeLabel: (type) => stopTypeLabels.fr[type],
    estTime: (mins) => `~${mins} min`,
    stopNotFound: 'Arrêt introuvable',
    backToTour: '← Retour à la visite',
    findPageTitle: 'Chercher par code',
    findPageSubtitle: "Entrez le code de l'étiquette",
    findCodeNotFound: 'Code introuvable',
    findNav: 'Code étiquette',
    touristMode: 'Visiteur',
    guideMode: 'Guide',
    switchToGuide: 'Passer en mode guide',
    switchToTourist: 'Passer en mode visiteur',
    guideQuestions: 'Questions pour le public',
    skipIntro: 'Passer',
    startVisit: 'Commencer la visite',
    aboutBukovina: 'À propos de la Bucovine',
    thematicTours: 'Explorer par thème',
    thematicBadge: 'Visite thématique',
    stopsCount: (n) => `${n} arrêts`,
    videoUnavailableOffline: 'Vidéo disponible en ligne',
    watchVideo: 'Lire la vidéo',
    bukovinaSubtitle: 'Contexte historique de la Bucovine',
    completeTour: 'Visite Complète',
    toursNav: 'Visites',
    homeGreeting: 'Bienvenue à Putna.',
    homeGreetingSub: (s) => `Deux maisons, ${s} arrêts. Allez à votre rythme.`,
    nextLabel: 'À suivre',
    openStop: "Ouvrir l'arrêt",
    moreBtn: 'Continuer',
    guideModeBar: 'Mode guide',
    scanQrHint: "Ou scannez le QR code sur l'étiquette",
    resumeShort: 'Reprendre',
    guideSay: 'Ce que vous dites',
  },
  it: {
    homeTitle: 'Guida Casa Muzeu',
    selectTour: 'Seleziona un tour per iniziare la guida.',
    industryTitle: "L'industria a Putna",
    industrySubtitle: 'Studio 1775–1944',
    studyBadge: 'Studio accademico',
    backToIndustry: "← Torna all'industria",
    timeline: 'Cronologia',
    stopCounter: (c, t) => `Tappa ${c} di ${t}`,
    back: 'Indietro',
    nextStop: 'Tappa successiva',
    finishTour: 'Termina il tour',
    keyPoints: 'Punti chiave',
    questions: 'Domande per il pubblico',
    extraDetails: 'Dettagli aggiuntivi',
    stops: 'Tappe',
    beginTour: 'Inizia',
    continueTour: 'Continua il tour',
    resumeLabel: (title) => `Continua: ${title}`,
    stopTypeLabel: (type) => stopTypeLabels.it[type],
    estTime: (mins) => `~${mins} min`,
    stopNotFound: 'Tappa non trovata',
    backToTour: '← Torna al tour',
    findPageTitle: 'Cerca per codice',
    findPageSubtitle: "Inserisci il codice dall'etichetta",
    findCodeNotFound: 'Codice non trovato',
    findNav: 'Codice etichetta',
    touristMode: 'Visitatore',
    guideMode: 'Guida',
    switchToGuide: 'Passa alla modalità guida',
    switchToTourist: 'Passa alla modalità visitatore',
    guideQuestions: 'Domande per il pubblico',
    skipIntro: 'Salta',
    startVisit: 'Inizia la visita',
    aboutBukovina: 'Sulla Bucovina',
    thematicTours: 'Esplora per tema',
    thematicBadge: 'Tour tematico',
    stopsCount: (n) => `${n} tappe`,
    videoUnavailableOffline: 'Video disponibile online',
    watchVideo: 'Riproduci video',
    bukovinaSubtitle: 'Contesto storico della Bucovina',
    completeTour: 'Tour Completo',
    toursNav: 'Tour',
    homeGreeting: 'Benvenuti a Putna.',
    homeGreetingSub: (s) => `Due case, ${s} tappe. Andate al vostro ritmo.`,
    nextLabel: 'Prossimo',
    openStop: 'Apri la tappa',
    moreBtn: 'Avanti',
    guideModeBar: 'Modalità guida',
    scanQrHint: "Oppure scansiona il codice QR sull'etichetta",
    resumeShort: 'Riprendi',
    guideSay: 'Cosa dici',
  },
};

export function getUI(lang: Lang): UIStrings {
  return uiStrings[lang];
}

export interface KidsUIStrings {
  welcomeTitle: string;
  chooseExplorer: string;
  chooseGender: string;
  boy: string;
  girl: string;
  chooseLanguage: string;
  yourName: string;
  openPassport: string;
  welcomeBack: string;
  stampsCollected: string;
  continueAdventure: string;
  startOver: string;
  myPassport: string;
  stampsProgress: string;
  passportComplete: string;
  stampsRemaining: string;
  startAdventure: string;
  seeFullPassport: string;
  backToPassport: string;
  earnStamp: string;
  keepGoing: string;
  finishPassport: string;
  tryAgain: string;
  didYouKnow: string;
  congratulations: string;
  exploredHouse: string;
  showGuide: string;
  newAdventure: string;
  bukovinaExplorer: string;
}

const kidsUiStrings: Record<Lang, KidsUIStrings> = {
  ro: {
    welcomeTitle: 'Pașaportul Exploratorilor Bucovinei',
    chooseExplorer: 'Alege tipul tău de explorator:',
    chooseGender: 'Ești băiat sau fată?',
    boy: 'Băiat',
    girl: 'Fată',
    chooseLanguage: 'Alege limba:',
    yourName: 'Numele tău (opțional):',
    openPassport: 'Deschide Pașaportul! 🎒',
    welcomeBack: 'Bun revenit',
    stampsCollected: 'ștampile colectate',
    continueAdventure: 'Continuă aventura! →',
    startOver: 'Începe din nou',
    myPassport: 'Pașaportul meu',
    stampsProgress: 'ștampile',
    passportComplete: 'Pașaport complet! 🎉',
    stampsRemaining: 'ștampile rămase',
    startAdventure: 'Începe aventura! 🎒',
    seeFullPassport: 'Vezi pașaportul complet! 🎊',
    backToPassport: '← Pașaport',
    earnStamp: 'Câștigă ștampila! 🎯',
    keepGoing: 'Mergi mai departe →',
    finishPassport: 'Finalizează pașaportul! 🎊',
    tryAgain: 'Încearcă din nou! Citește din nou povestea pentru un indiciu. 💡',
    didYouKnow: 'Știai că...',
    congratulations: 'Felicitări! 🎉',
    exploredHouse: 'Ai explorat toată casa!',
    showGuide: 'Arată ghidului! 🙌',
    newAdventure: 'Începe o nouă aventură',
    bukovinaExplorer: 'Explorator Bucovineanu / Exploratoare Bucovineancă',
  },
  en: {
    welcomeTitle: "Bukovina Explorer's Passport",
    chooseExplorer: 'Choose your explorer type:',
    chooseGender: 'Are you a boy or a girl?',
    boy: 'Boy',
    girl: 'Girl',
    chooseLanguage: 'Choose language:',
    yourName: 'Your name (optional):',
    openPassport: 'Open the Passport! 🎒',
    welcomeBack: 'Welcome back',
    stampsCollected: 'stamps collected',
    continueAdventure: 'Continue the adventure! →',
    startOver: 'Start over',
    myPassport: 'My Passport',
    stampsProgress: 'stamps',
    passportComplete: 'Passport complete! 🎉',
    stampsRemaining: 'stamps remaining',
    startAdventure: 'Start the adventure! 🎒',
    seeFullPassport: 'See full passport! 🎊',
    backToPassport: '← Passport',
    earnStamp: 'Earn the stamp! 🎯',
    keepGoing: 'Keep going →',
    finishPassport: 'Finish the passport! 🎊',
    tryAgain: 'Try again! Re-read the story for a hint. 💡',
    didYouKnow: 'Did you know...',
    congratulations: 'Congratulations! 🎉',
    exploredHouse: 'You explored the whole house!',
    showGuide: 'Show the guide! 🙌',
    newAdventure: 'Start a new adventure',
    bukovinaExplorer: 'Bukovina Explorer',
  },
  fr: {
    welcomeTitle: 'Passeport des Explorateurs de Bucovine',
    chooseExplorer: 'Choisissez votre type d\'explorateur :',
    chooseGender: 'Tu es un garçon ou une fille ?',
    boy: 'Garçon',
    girl: 'Fille',
    chooseLanguage: 'Choisir la langue :',
    yourName: 'Ton prénom (optionnel) :',
    openPassport: 'Ouvre le Passeport ! 🎒',
    welcomeBack: 'Bon retour',
    stampsCollected: 'tampons collectés',
    continueAdventure: 'Continue l\'aventure ! →',
    startOver: 'Recommencer',
    myPassport: 'Mon Passeport',
    stampsProgress: 'tampons',
    passportComplete: 'Passeport complet ! 🎉',
    stampsRemaining: 'tampons restants',
    startAdventure: 'Commence l\'aventure ! 🎒',
    seeFullPassport: 'Voir le passeport complet ! 🎊',
    backToPassport: '← Passeport',
    earnStamp: 'Gagne le tampon ! 🎯',
    keepGoing: 'Continue →',
    finishPassport: 'Finalise le passeport ! 🎊',
    tryAgain: 'Réessaie ! Relis l\'histoire pour un indice. 💡',
    didYouKnow: 'Le savais-tu...',
    congratulations: 'Félicitations ! 🎉',
    exploredHouse: 'Tu as exploré toute la maison !',
    showGuide: 'Montre au guide ! 🙌',
    newAdventure: 'Commencer une nouvelle aventure',
    bukovinaExplorer: 'Explorateur de Bucovine / Exploratrice de Bucovine',
  },
  it: {
    welcomeTitle: 'Passaporto degli Esploratori della Bucovina',
    chooseExplorer: 'Scegli il tuo tipo di esploratore:',
    chooseGender: 'Sei maschio o femmina?',
    boy: 'Maschio',
    girl: 'Femmina',
    chooseLanguage: 'Scegli la lingua:',
    yourName: 'Il tuo nome (opzionale):',
    openPassport: 'Apri il Passaporto! 🎒',
    welcomeBack: 'Ben tornato/a',
    stampsCollected: 'timbri raccolti',
    continueAdventure: 'Continua l\'avventura! →',
    startOver: 'Ricominciare',
    myPassport: 'Il mio Passaporto',
    stampsProgress: 'timbri',
    passportComplete: 'Passaporto completo! 🎉',
    stampsRemaining: 'timbri rimanenti',
    startAdventure: 'Inizia l\'avventura! 🎒',
    seeFullPassport: 'Vedi il passaporto completo! 🎊',
    backToPassport: '← Passaporto',
    earnStamp: 'Guadagna il timbro! 🎯',
    keepGoing: 'Avanti →',
    finishPassport: 'Finalizza il passaporto! 🎊',
    tryAgain: 'Riprova! Rileggi la storia per un indizio. 💡',
    didYouKnow: 'Lo sapevi che...',
    congratulations: 'Complimenti! 🎉',
    exploredHouse: 'Hai esplorato tutta la casa!',
    showGuide: 'Mostra alla guida! 🙌',
    newAdventure: 'Inizia una nuova avventura',
    bukovinaExplorer: 'Esploratore della Bucovina / Esploratrice della Bucovina',
  },
};

export function getKidsUI(lang: Lang): KidsUIStrings {
  return kidsUiStrings[lang];
}

export function getExplorerTitle(ui: KidsUIStrings, gender: 'boy' | 'girl'): string {
  const parts = ui.bukovinaExplorer.split(' / ');
  return gender === 'girl' ? (parts[1] ?? parts[0]) : parts[0];
}
