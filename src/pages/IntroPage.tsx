import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Users, Church, Home, ArrowRight } from 'lucide-react';
import { useIntroSlides } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { asset } from '../utils/asset';
import type { IntroSlide } from '../types';

const INTRO_SEEN_KEY = 'ghid-intro-seen';

const iconMap: Record<string, React.ElementType> = {
  Map,
  Users,
  Church,
  Home,
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

function SlideContent({ slide, language }: { slide: IntroSlide; language: string }) {
  const Icon = iconMap[slide.icon] ?? Map;
  const title = (slide.title as Record<string, string>)[language] ?? slide.title.ro;
  const body = (slide.body as Record<string, string>)[language] ?? slide.body.ro;

  return (
    <div className="relative w-full h-full flex flex-col justify-end">
      {/* Background image */}
      {slide.image && (
        <img
          src={asset(slide.image)}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}

      {/* Top gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-museum-walnut/40 via-transparent to-museum-walnut/80" />

      {/* Text content */}
      <div className="relative z-10 p-8 pb-24">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={28} className="text-museum-cream/70 shrink-0" />
        </div>
        <h2 className="text-[28px] font-bold text-museum-cream leading-tight mb-4 max-w-[60%]">
          {title}
        </h2>
        <p className="text-base text-museum-cream/85 leading-relaxed max-w-lg">
          {body}
        </p>
      </div>
    </div>
  );
}

export function IntroPage() {
  const navigate = useNavigate();
  const { language } = useSettings();
  const ui = getUI(language);
  const { data: slides, loading } = useIntroSlides();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const finish = () => {
    localStorage.setItem(INTRO_SEEN_KEY, '1');
    navigate('/');
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (!slides) return;
    if (info.offset.x < -50 && current < slides.length - 1) {
      goTo(current + 1);
    } else if (info.offset.x > 50 && current > 0) {
      goTo(current - 1);
    }
  };

  if (loading || !slides || slides.length === 0) {
    return <div className="min-h-screen bg-museum-walnut" />;
  }

  const isLast = current === slides.length - 1;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-museum-walnut">
      {/* Skip / Start button */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={finish}
          className={`font-medium transition-all flex items-center gap-1 ${
            isLast
              ? 'text-museum-cream text-base'
              : 'text-museum-cream/70 text-sm hover:text-museum-cream'
          }`}
        >
          {isLast ? (
            <>
              {ui.startVisit} <ArrowRight size={16} />
            </>
          ) : (
            ui.skipIntro
          )}
        </button>
      </div>

      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <SlideContent slide={slides[current]} language={language} />
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-museum-cream w-5' : 'bg-museum-cream/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export { INTRO_SEEN_KEY };
