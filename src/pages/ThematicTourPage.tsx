import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Scissors, Coffee, Heart, Building2,
  ArrowLeft, Layers,
} from 'lucide-react';
import { useThemes, useThematicStops, useTours, useStops } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { getLocalizedText } from '../hooks/useData';
import { StopCard } from '../components/StopCard';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Scissors,
  Coffee,
  Heart,
  Building2,
};

export function ThematicTourPage() {
  const { themeId } = useParams<{ themeId: string }>();
  const { language } = useSettings();
  const ui = getUI(language);

  const { data: themes } = useThemes();
  const { data: tours } = useTours();
  const { data: stops } = useStops();

  const theme = themes.find((t) => t.id === themeId);
  const { stops: thematicStops, tourMap } = useThematicStops(
    themeId ?? '',
    tours ?? [],
    stops ?? [],
  );

  if (!theme) {
    return (
      <div className="min-h-screen bg-museum-beige flex items-center justify-center p-8 text-center">
        <div className="bg-museum-cream rounded-2xl shadow-warm-lg p-10 max-w-md border border-museum-walnut/10">
          <h1 className="text-xl font-bold text-museum-walnut mb-4">Tema nu a fost găsită</h1>
          <Link to="/" className="text-museum-moss hover:underline">{ui.back}</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[theme.icon] ?? Layers;
  const title = getLocalizedText(theme.title, language) ?? theme.id;
  const description = getLocalizedText(theme.description, language) ?? '';

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-24 pt-6 px-4 md:px-8 max-w-3xl mx-auto"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-museum-walnut/60 hover:text-museum-walnut text-sm font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> {ui.back}
      </Link>

      {/* Theme header */}
      <div className="bg-museum-cream rounded-2xl p-6 border border-museum-walnut/5 shadow-warm mb-8">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: theme.color + '20' }}
          >
            <Icon size={24} style={{ color: theme.color }} />
          </div>
          <div className="flex-1">
            <span
              className="text-[11px] font-bold uppercase tracking-wider mb-1 inline-block"
              style={{ color: theme.color }}
            >
              {ui.thematicBadge}
            </span>
            <h1 className="text-2xl font-bold text-museum-walnut leading-tight mb-2">
              {title}
            </h1>
            <p className="text-museum-walnut/70 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-museum-walnut/8">
          <span className="text-sm text-museum-walnut/50">
            {ui.stopsCount(thematicStops.length)}
          </span>
        </div>
      </div>

      {/* Stop list */}
      <div className="space-y-3">
        {thematicStops.map((stop, idx) => {
          const stopTourId = tourMap.get(stop.id) ?? '';
          return (
            <StopCard
              key={stop.id}
              stop={stop}
              tourId={stopTourId}
              index={idx}
              themeId={themeId}
            />
          );
        })}
      </div>
    </motion.main>
  );
}
