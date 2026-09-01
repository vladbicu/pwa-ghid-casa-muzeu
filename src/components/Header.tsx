import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useTenant } from '../config/TenantContext';
import { getUI } from '../i18n/ui';
import { BrandLockup } from './BrandMark';

const LANG_SHORT: Record<string, string> = { ro: 'RO', en: 'EN', fr: 'FR', it: 'IT' };

export function Header() {
  const { viewMode, setViewMode, language, setLanguage, availableLanguages } = useSettings();
  const tenant = useTenant();
  const ui = getUI(language);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="px-5 pt-5 pb-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <Link to="/" aria-label={tenant.name}>
          <BrandLockup />
        </Link>

        <div className="flex items-center gap-2">
          {tenant.features.guidMode && (
            <div className="flex items-center bg-museum-sand rounded-full p-[3px] text-[11px] font-bold">
              <button
                onClick={() => setViewMode('tourist')}
                aria-pressed={viewMode === 'tourist'}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  viewMode === 'tourist' ? 'bg-accent text-white' : 'text-clay-700'
                }`}
              >
                {ui.touristMode}
              </button>
              <button
                onClick={() => setViewMode('guide')}
                aria-pressed={viewMode === 'guide'}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  viewMode === 'guide' ? 'bg-accent text-white' : 'text-clay-700'
                }`}
              >
                {ui.guideMode}
              </button>
            </div>
          )}

          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-label={`Limba — ${availableLanguages.find((l) => l.code === language)?.label}`}
              aria-expanded={langOpen}
              className="text-[11px] font-bold border-[1.5px] border-clay-300 rounded-full px-2.5 py-1.5 text-museum-walnut hover:border-museum-walnut/40 transition-colors"
            >
              {LANG_SHORT[language] ?? language.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-museum-cream rounded-2xl shadow-lg border border-clay-300 overflow-hidden z-50 min-w-[150px]">
                {availableLanguages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between gap-2 transition-colors ${
                      l.code === language
                        ? 'text-accent-700 font-semibold'
                        : 'text-museum-walnut hover:bg-museum-sand'
                    }`}
                  >
                    {l.label}
                    {l.code === language && <Check size={14} strokeWidth={2.75} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
