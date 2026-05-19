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
  },
};

export function getUI(lang: Lang): UIStrings {
  return uiStrings[lang];
}
