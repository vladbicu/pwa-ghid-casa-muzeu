import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-museum-beige/90 backdrop-blur-sm border-b border-museum-walnut/10 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://cdn.magicpatterns.com/uploads/d71D976sGXs5ECubFUniSM/ChatGPT_Image_Dec_30,_2025,_01_30_28_PM.png"
            alt="Casa Muzeu Bukowina"
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
