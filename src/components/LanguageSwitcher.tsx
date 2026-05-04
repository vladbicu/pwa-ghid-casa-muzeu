import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

export function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = availableLanguages.find((l) => l.code === language);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Selectează limba — ${currentLang?.label}`}
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-museum-sand hover:bg-museum-sand/80 transition-colors text-sm font-medium text-museum-walnut"
      >
        <Globe size={16} />
        <span>{currentLang?.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-museum-cream rounded-xl shadow-warm-lg border border-museum-walnut/10 overflow-hidden z-50 min-w-[150px]"
          >
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  if (lang.available) {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }
                }}
                disabled={!lang.available}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  lang.available
                    ? lang.code === language
                      ? 'bg-museum-moss/10 text-museum-moss font-medium'
                      : 'hover:bg-museum-sand text-museum-walnut'
                    : 'text-museum-walnut/40 cursor-not-allowed'
                }`}
              >
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
