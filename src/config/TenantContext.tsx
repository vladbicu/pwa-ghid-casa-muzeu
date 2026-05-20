import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { TenantConfig } from './types';

const DEFAULT_TENANT: TenantConfig = {
  id: 'casa-muzeu-bukowina',
  name: 'Casa Muzeu Bukowina',
  shortName: 'Ghid Muzeu',
  logo: '/icons/logo.png',
  baseUrl: '/ghid/',
  colors: {
    primary: '#2C1810',
    secondary: '#6B7D5C',
    accent: '#F0EBE3',
    background: '#FAF7F0',
    surface: '#FFFCF5',
    text: '#2C1810',
  },
  defaultLanguage: 'ro',
  availableLanguages: ['ro', 'en', 'fr', 'it'],
  features: {
    shortCodes: true,
    guidMode: true,
    thematicTours: true,
    videoStops: true,
    contextIntro: true,
    industrySection: true,
  },
  contact: {
    website: 'https://casabukowina.ro',
    address: 'Putna, județul Suceava, România',
  },
  meta: {
    description: {
      ro: 'Ghid digital pentru vizitarea Casei Muzeu Bukowina din Putna',
      en: 'Digital guide for visiting Casa Muzeu Bukowina in Putna',
      fr: 'Guide numérique pour visiter la Casa Muzeu Bukowina à Putna',
      it: 'Guida digitale per visitare la Casa Muzeu Bukowina a Putna',
    },
  },
};

function hexToRgbTriplet(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0 0';
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

function applyCssVariables(colors: TenantConfig['colors']): void {
  const { style } = document.documentElement;
  style.setProperty('--museum-walnut', hexToRgbTriplet(colors.primary));
  style.setProperty('--museum-moss', hexToRgbTriplet(colors.secondary));
  style.setProperty('--museum-sand', hexToRgbTriplet(colors.accent));
  style.setProperty('--museum-beige', hexToRgbTriplet(colors.background));
  style.setProperty('--museum-cream', hexToRgbTriplet(colors.surface));
}

const TenantContext = createContext<TenantConfig | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);

  useEffect(() => {
    fetch(`${window.location.origin}/tenant.json`)
      .then((res) => res.json())
      .then((data: TenantConfig) => {
        applyCssVariables(data.colors);
        setTenant(data);
      })
      .catch(() => {
        applyCssVariables(DEFAULT_TENANT.colors);
        setTenant(DEFAULT_TENANT);
      });
  }, []);

  if (!tenant) {
    return <div style={{ background: '#FAF7F0', minHeight: '100vh' }} />;
  }

  return <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>;
}

export function useTenant(): TenantConfig {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
