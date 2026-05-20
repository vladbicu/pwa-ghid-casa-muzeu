import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Users, Church, Home, ArrowRight } from 'lucide-react';
import { useIntroSlides } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { asset } from '../utils/asset';
import type { IntroSlide } from '../types';

export const INTRO_SEEN_KEY = 'ghid-intro-seen';

const iconMap: Record<string, React.ElementType> = {
  Map,
  Users,
  Church,
  Home,
};

function TimelineEntry({ slide, language, index }: { slide: IntroSlide; language: string; index: number }) {
  const Icon = iconMap[slide.icon] ?? Map;
  const title = (slide.title as Record<string, string>)[language] ?? slide.title.ro;
  const body = (slide.body as Record<string, string>)[language] ?? slide.body.ro;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      className="relative pl-8"
    >
      {/* Dot on the timeline line */}
      <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-museum-moss border-2 border-museum-beige" />

      {/* Icon + title */}
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className="text-museum-moss shrink-0" />
        <h2 className="font-semibold text-museum-walnut text-lg leading-tight">{title}</h2>
      </div>

      {/* Body */}
      <p className="text-museum-walnut/70 text-sm leading-relaxed">{body}</p>

      {/* Image */}
      {slide.image && (
        <img
          src={asset(slide.image)}
          alt={title}
          className="mt-3 w-full rounded-xl object-cover"
          style={{ maxHeight: 192 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}
    </motion.div>
  );
}

export function IntroPage() {
  const navigate = useNavigate();
  const { language } = useSettings();
  const ui = getUI(language);
  const { data: slides, loading } = useIntroSlides();

  useEffect(() => {
    localStorage.setItem(INTRO_SEEN_KEY, '1');
  }, []);

  if (loading || !slides) {
    return <div className="min-h-screen bg-museum-beige" />;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-24 pt-6 px-4 md:px-8 max-w-2xl mx-auto"
    >
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-museum-walnut">{ui.aboutBukovina}</h1>
          <span className="text-xs font-bold text-museum-walnut/50 bg-museum-sand px-2 py-0.5 rounded-full">
            1775–1918
          </span>
        </div>
        <p className="text-museum-walnut/60 text-sm">{ui.bukovinaSubtitle}</p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-museum-walnut/15 ml-3 space-y-10 mb-12">
        {slides.map((slide, idx) => (
          <TimelineEntry key={slide.id} slide={slide} language={language} index={idx} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: slides.length * 0.1 + 0.2 }}
        className="flex justify-center"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-museum-walnut text-museum-cream px-6 py-3 rounded-full font-semibold shadow-warm hover:bg-museum-walnut/90 active:scale-95 transition-all"
        >
          {ui.startVisit} <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.main>
  );
}
