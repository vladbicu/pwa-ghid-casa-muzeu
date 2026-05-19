import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lang } from '../types';

interface SettingsContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  availableLanguages: { code: Lang; label: string; available: boolean }[];
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const LANGUAGE_KEY = 'ghid-language';
const THEME_KEY = 'ghid-theme';

const availableLanguages: { code: Lang; label: string; available: boolean }[] = [
  { code: 'ro', label: 'Română', available: true },
  { code: 'en', label: 'English', available: true },
  { code: 'fr', label: 'Français', available: true },
  { code: 'it', label: 'Italiano', available: true },
];

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      if (stored && ['ro', 'en', 'fr', 'it'].includes(stored)) {
        return stored as Lang;
      }
    }
    return 'ro';
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
