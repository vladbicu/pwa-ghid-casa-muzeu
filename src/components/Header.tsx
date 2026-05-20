import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Users, User, Info } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useSettings } from '../context/SettingsContext';
import { useTenant } from '../config/TenantContext';
import { getUI } from '../i18n/ui';
import { asset } from '../utils/asset';

export function Header() {
  const [logoError, setLogoError] = useState(false);
  const { theme, setTheme, viewMode, setViewMode, language } = useSettings();
  const tenant = useTenant();
  const ui = getUI(language);

  return (
    <header className="sticky top-0 z-50 bg-museum-beige/90 backdrop-blur-sm border-b border-museum-walnut/10 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {logoError ? (
            <span className="text-lg font-bold text-museum-walnut tracking-tight">
              {tenant.name}
            </span>
          ) : (
            <img
              src={asset(tenant.logo)}
              alt={tenant.name}
              onError={() => setLogoError(true)}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </Link>

        <div className="flex items-center gap-2">
          {tenant.features.guidMode && (
            <div
              title={viewMode === 'tourist' ? ui.switchToGuide : ui.switchToTourist}
              className="flex items-center bg-museum-sand rounded-full p-0.5 text-xs font-semibold"
            >
              <button
                onClick={() => setViewMode('tourist')}
                aria-label={ui.touristMode}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors ${
                  viewMode === 'tourist'
                    ? 'bg-museum-walnut text-museum-cream'
                    : 'text-museum-walnut/60 hover:text-museum-walnut'
                }`}
              >
                <Users size={14} />
                <span className="hidden sm:inline">{ui.touristMode}</span>
              </button>
              <button
                onClick={() => setViewMode('guide')}
                aria-label={ui.guideMode}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors ${
                  viewMode === 'guide'
                    ? 'bg-museum-walnut text-museum-cream'
                    : 'text-museum-walnut/60 hover:text-museum-walnut'
                }`}
              >
                <User size={14} />
                <span className="hidden sm:inline">{ui.guideMode}</span>
              </button>
            </div>
          )}
          {tenant.features.contextIntro && (
            <Link
              to="/intro"
              aria-label={ui.aboutBukovina}
              title={ui.aboutBukovina}
              className="p-2 rounded-lg text-museum-walnut/60 hover:text-museum-walnut hover:bg-museum-walnut/8 transition-colors"
            >
              <Info size={18} />
            </Link>
          )}
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
