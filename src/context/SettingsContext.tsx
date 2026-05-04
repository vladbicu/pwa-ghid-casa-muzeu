import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Lang } from '../types';

interface SettingsContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  availableLanguages: { code: Lang; label: string; available: boolean }[];
}

const LANGUAGE_KEY = 'ghid-language';

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

  const setLanguage = (lang: Lang) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        availableLanguages,
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
