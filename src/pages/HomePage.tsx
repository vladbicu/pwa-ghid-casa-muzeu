import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTours, useResumeTour, useTour, useStop, getLocalizedText } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { TourCard } from '../components/TourCard';
import { Play, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';

export function HomePage() {
  const { data: tours, loading } = useTours();
  const { language } = useSettings();
  const ui = getUI(language);
  const [industryImgError, setIndustryImgError] = useState(false);

  const resume = useResumeTour();
  const { data: resumeTour } = useTour(resume?.tourId);
  const { data: resumeStop } = useStop(resume?.stopId);
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

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-museum-walnut/10 rounded-xl h-64 md:h-80" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6">
          {(tours ?? []).map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      )}

      {/* Industry hub card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link to="/industry" className="block group relative">
          <div className="relative h-48 md:h-56 w-full rounded-2xl overflow-hidden shadow-warm-lg transition-transform duration-300 group-hover:-translate-y-1 bg-museum-walnut/20">
            {!industryImgError && (
              <img
                src={asset('/images/industry/lemn/lemn-01.jpg')}
                alt={ui.industryTitle}
                onError={() => setIndustryImgError(true)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-museum-walnut/90 via-museum-walnut/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-museum-cream">
              <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                <span className="inline-block bg-museum-moss text-museum-cream text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2">
                  {ui.studyBadge}
                </span>
                <h3 className="text-xl font-bold text-shadow-sm leading-tight mb-0.5">{ui.industryTitle}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-museum-cream/70">{ui.industrySubtitle}</p>
                  <ArrowRight size={16} className="text-museum-cream/70 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 border-[6px] border-museum-walnut/20 rounded-2xl pointer-events-none" />
          </div>
        </Link>
      </motion.div>
    </motion.main>
  );
}
