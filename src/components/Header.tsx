import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useSettings } from '../context/SettingsContext';
import { asset } from '../utils/asset';

export function Header() {
  const [logoError, setLogoError] = useState(false);
  const { theme, setTheme } = useSettings();

  return (
    <header className="sticky top-0 z-50 bg-museum-beige/90 backdrop-blur-sm border-b border-museum-walnut/10 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {logoError ? (
            <span className="text-lg font-bold text-museum-walnut tracking-tight">
              Casa Muzeu Bukowina
            </span>
          ) : (
            <img
              src={asset('/icons/logo.png')}
              alt="Casa Muzeu Bukowina"
              onError={() => setLogoError(true)}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="p-2 rounded-lg text-museum-walnut/60 hover:text-museum-walnut hover:bg-museum-walnut/8 transition-colors"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
