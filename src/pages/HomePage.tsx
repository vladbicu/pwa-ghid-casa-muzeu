import React from 'react';
import { Link } from 'react-router-dom';
import { useTours, useResumeTour, useTour, useStop, getLocalizedText } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { TourCard } from '../components/TourCard';
import { Play, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HomePage() {
  const tours = useTours();
  const { language } = useSettings();
  const ui = getUI(language);

  const resume = useResumeTour();
  const resumeTour = useTour(resume?.tourId);
  const resumeStop = useStop(resume?.stopId);
  const resumeStopTitle = resumeStop ? getLocalizedText(resumeStop.title, language) || '' : '';

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-24 pt-6 px-4 md:px-8 max-w-5xl mx-auto"
    >
      {/* Resume banner */}
      {resume && resumeTour && (
        <Link
          to={`/tour/${resume.tourId}/stop/${resume.stopId}`}
          state={{ direction: 1 }}
          className="flex items-center gap-3 bg-museum-moss/10 border border-museum-moss/30 rounded-xl p-4 mb-6 hover:bg-museum-moss/15 transition-colors group"
        >
          <div className="w-10 h-10 bg-museum-moss text-museum-cream rounded-full flex items-center justify-center shrink-0">
            <Play size={16} fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-museum-moss uppercase tracking-wider mb-0.5">
              {ui.continueTour}
            </p>
            <p className="text-museum-walnut font-medium truncate text-sm">
              {ui.resumeLabel(resumeStopTitle)}
            </p>
          </div>
          <ChevronRight size={18} className="text-museum-moss/60 shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}

      <div className="mb-10 text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-museum-walnut mb-3"
        >
          {ui.homeTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-museum-walnut/70 text-lg max-w-2xl"
        >
          {ui.selectTour}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {tours.map((tour, index) => (
          <TourCard key={tour.id} tour={tour} index={index} />
        ))}
      </div>
    </motion.main>
  );
}
