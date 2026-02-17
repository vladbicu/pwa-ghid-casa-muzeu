export type Lang = "ro" | "en" | "fr" | "it";

export type HouseId = "CVB" | "CAI";

export type StopType = "intro" | "room" | "object" | "collection";

export interface Stop {
  id: string;
  houseId: HouseId;
  roomId: string;
  type: StopType;
  order: number;
  estSeconds: number;
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

