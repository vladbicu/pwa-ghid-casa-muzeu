import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntroSlides } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { asset } from '../utils/asset';

export const INTRO_SEEN_KEY = 'ghid-intro-seen';

const FALLBACK_IMG = '/images/mock/Casa muzeu Putna-296.jpg';

export function IntroPage() {
  const navigate = useNavigate();
  const { language } = useSettings();
  const ui = getUI(language);
  const { data: slides, loading } = useIntroSlides();
  const [index, setIndex] = useState(0);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    localStorage.setItem(INTRO_SEEN_KEY, '1');
  }, []);

  if (loading || !slides || slides.length === 0) {
    return <div className="min-h-screen bg-museum-beige" />;
  }

  const slide = slides[Math.min(index, slides.length - 1)];
  const title = (slide.title as Record<string, string>)[language] ?? slide.title.ro;
  const body = (slide.body as Record<string, string>)[language] ?? slide.body.ro;
  const isLast = index >= slides.length - 1;

  const next = () => {
    if (isLast) navigate('/');
    else {
      setIndex((i) => i + 1);
      setImgErr(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-museum-beige flex flex-col max-w-2xl mx-auto"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 26px)' }}
    >
      <div className="px-5 pt-16">
        <div className="rounded-card overflow-hidden h-[230px] bg-clay-200">
          <img
            src={asset(imgErr || !slide.image ? FALLBACK_IMG : slide.image)}
            alt=""
            onError={() => setImgErr(true)}
            className="washed w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="px-6 pt-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-700">
            {ui.aboutBukovina}
          </span>
          <span className="flex-1 h-[1.5px] bg-clay-300" />
          <span className="text-[11px] font-bold text-clay-600">
            {index + 1} / {slides.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="font-heading text-[30px] leading-[1.1] text-museum-walnut mb-3">{title}</h2>
            <p className="text-[16px] leading-[1.6] text-pretty-wrap text-museum-walnut">{body}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-1.5 mt-1">
          {slides.map((s, i) => (
            <span
              key={s.id}
              className={`h-[5px] rounded-full transition-all ${
                i === index ? 'w-[26px] bg-accent' : 'w-[9px] bg-clay-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pt-4 flex gap-2.5 items-center">
        <button
          onClick={() => navigate('/')}
          className="text-[14px] font-semibold text-clay-600 px-3"
        >
          {ui.skipIntro}
        </button>
        <button
          onClick={next}
          className="flex-1 bg-accent text-white rounded-full py-4 text-center font-heading text-[16px] shadow-md"
        >
          {isLast ? ui.startVisit : ui.moreBtn}
        </button>
      </div>
    </motion.main>
  );
}
