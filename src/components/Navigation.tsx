import React from 'react';
import { Home, Hash } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTenant } from '../config/TenantContext';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';

export function Navigation() {
  const tenant = useTenant();
  const { language } = useSettings();
  const ui = getUI(language);

  const navItems = [
    { icon: Home, label: 'Tururi', path: '/' },
    ...(tenant.features.shortCodes
      ? [{ icon: Hash, label: ui.findNav, path: '/find' }]
      : []),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-museum-beige border-t border-museum-walnut/10 pb-safe pt-2 px-4 z-50 shadow-[0_-4px_20px_rgba(107,68,35,0.1)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors duration-300
              ${isActive ? 'text-museum-moss' : 'text-museum-walnut/60 hover:text-museum-walnut/80'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-2 w-8 h-1 bg-museum-moss rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
