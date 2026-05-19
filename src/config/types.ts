export interface TenantColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface TenantFeatures {
  shortCodes: boolean;
  guidMode: boolean;
  thematicTours: boolean;
  videoStops: boolean;
  contextIntro: boolean;
  industrySection: boolean;
}

export interface TenantConfig {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  baseUrl: string;
  colors: TenantColors;
  defaultLanguage: 'ro' | 'en' | 'fr' | 'it';
  availableLanguages: ('ro' | 'en' | 'fr' | 'it')[];
  features: TenantFeatures;
  contact: {
    website?: string;
    address?: string;
    phone?: string;
  };
  meta: {
    description: Record<string, string>;
  };
}
