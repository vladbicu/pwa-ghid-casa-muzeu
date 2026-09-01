import React from 'react';
import { Home, Hash } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTenant } from '../config/TenantContext';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';

export function Navigation() {
  const tenant = useTenant();
  const { language } = useSettings();
  const ui = getUI(language);

  const navItems = [
    { icon: Home, label: ui.toursNav, path: '/' },
    ...(tenant.features.shortCodes
      ? [{ icon: Hash, label: ui.findNav, path: '/find' }]
      : []),
  ];

  return (
    <nav
      className="fixed left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)' }}
    >
      <div className="pointer-events-auto flex gap-1 bg-museum-walnut rounded-full p-1.5 shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold transition-colors ${
                isActive
                  ? 'bg-museum-cream text-museum-walnut'
                  : 'text-clay-300 hover:text-museum-cream'
              }`
            }
          >
            <item.icon size={18} strokeWidth={2.75} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
