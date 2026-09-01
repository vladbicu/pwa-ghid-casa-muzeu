export type Lang = "ro" | "en" | "fr" | "it";

export type HouseId = "CVB" | "CAI";

export type StopType = "intro" | "room" | "object" | "collection";

export interface StopMedia {
  type: 'image' | 'video-local' | 'youtube';
  url: string;
  thumbnail?: string;
  caption?: Record<Lang, string>;
  duration?: number;
}

export interface Theme {
  id: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  icon: string;
  color: string;
  stopCount?: number;
}

export interface ThemesData {
  version: number;
  themes: Theme[];
}

export interface Stop {
  id: string;
  houseId: HouseId;
  roomId: string;
  type: StopType;
  order: number;
  estSeconds: number;
  shortCode?: number;
  themes?: string[];
  media?: StopMedia[];
  title: Record<Lang, string>;
  script: Record<Lang, string>;
  keyPoints: Record<Lang, string[]>;
  questions: Record<Lang, string[]>;
  extra: Record<Lang, string>;
  image: string;
  kids?: KidsData;
}

export interface KidsAnswer {
  text: Record<Lang, string>;
  correct: boolean;
}

export interface KidsAgeAdaptation {
  question: Record<Lang, string>;
  answers: KidsAnswer[];
}

export interface KidsData {
  include: boolean;
  stampIcon: string;
  order: number;
  scriptKids: Record<Lang, string>;
  question: Record<Lang, string>;
  answers: KidsAnswer[];
  funFact: Record<Lang, string>;
  ageAdaptations?: {
    '6-8'?: KidsAgeAdaptation;
    '12-14'?: KidsAgeAdaptation;
  };
}

export type AgeGroup = '6-8' | '9-11' | '12-14';

export interface StopsData {
  version: number;
  defaultLang: Lang;
  stops: Stop[];
}

export interface Tour {
  id: string;
  houseId: HouseId;
  order: number;
  durationLabel: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  stopIds: string[];
  image?: string;
}

export interface ToursData {
  version: number;
  defaultLang: Lang;
  tours: Tour[];
}

export interface IndustryEvent {
  id: string;
  year: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
  image?: string;
}

export interface IndustrySection {
  id: string;
  order: number;
  shortCode?: number;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  period: string;
  events: IndustryEvent[];
}

export interface IndustryData {
  version: number;
  sections: IndustrySection[];
}

export interface IntroSlide {
  id: string;
  icon: string;
  image: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}

export interface IntroData {
  version: number;
  slides: IntroSlide[];
}

