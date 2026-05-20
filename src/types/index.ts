export type Lang = "ro" | "en" | "fr" | "it";

export type HouseId = "CVB" | "CAI";

export type StopType = "intro" | "room" | "object" | "collection";

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
  title: Record<Lang, string>;
  script: Record<Lang, string>;
  keyPoints: Record<Lang, string[]>;
  questions: Record<Lang, string[]>;
  extra: Record<Lang, string>;
  image: string;
}

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

