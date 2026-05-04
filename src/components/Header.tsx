import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const [logoError, setLogoError] = useState(false);

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
              src="/icons/logo.png"
              alt="Casa Muzeu Bukowina"
              onError={() => setLogoError(true)}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </Link>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
