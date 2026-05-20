import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lang } from '../types';
import { useTenant } from '../config/TenantContext';

interface SettingsContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  availableLanguages: { code: Lang; label: string; available: boolean }[];
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const LANGUAGE_KEY = 'ghid-language';
const THEME_KEY = 'ghid-theme';

const LANGUAGE_LABELS: Record<Lang, string> = {
  ro: 'Română',
  en: 'English',
  fr: 'Français',
  it: 'Italiano',
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { availableLanguages: tenantLangs, defaultLanguage } = useTenant();

  const availableLanguages = tenantLangs.map((code) => ({
    code,
    label: LANGUAGE_LABELS[code],
    available: true,
  }));

  const [language, setLanguageState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      if (stored && tenantLangs.includes(stored as Lang)) {
        return stored as Lang;
      }
    }
    return defaultLanguage;
  });

  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const setLanguage = (lang: Lang) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const setTheme = (t: 'light' | 'dark') => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        availableLanguages,
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
