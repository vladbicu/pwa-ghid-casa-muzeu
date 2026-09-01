import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Tour } from '../types';
import { useSettings } from '../context/SettingsContext';
import { getLocalizedText, computeTourDuration } from '../hooks/useData';
import { getUI } from '../i18n/ui';
import { asset } from '../utils/asset';

interface TourCardProps {
  tour: Tour;
  index: number;
  variant?: 'large' | 'compact';
}

export function TourCard({ tour, index, variant = 'large' }: TourCardProps) {
  const { language } = useSettings();
  const ui = getUI(language);
  const [imgError, setImgError] = useState(false);

  const title = getLocalizedText(tour.title, language) || '';
  const description = getLocalizedText(tour.description, language) || '';
  const duration = computeTourDuration(tour);
  const stopCount = tour.stopIds.length;

  const img = tour.image && !imgError && (
    <img
      src={asset(tour.image)}
      alt={title}
      onError={() => setImgError(true)}
      className="washed w-full h-full object-cover"
    />
  );

  const pills = (
    <div className="flex gap-1.5">
      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-accent-200 text-accent-800">
        {ui.stopsCount(stopCount)}
      </span>
      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-museum-sand text-clay-700">
        {duration}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/tour/${tour.id}`}
        className="block bg-museum-cream rounded-card overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-px"
      >
        {variant === 'large' ? (
          <>
            <div className="h-[132px] bg-clay-200">{img}</div>
            <div className="px-4 pt-3 pb-4">
              <h3 className="font-heading text-[20px] mb-1 text-museum-walnut">{title}</h3>
              <p className="text-[12.5px] leading-snug text-clay-700 mb-2.5 line-clamp-2">
                {description}
              </p>
              {pills}
            </div>
          </>
        ) : (
          <div className="flex">
            <div className="w-[118px] h-[118px] shrink-0 bg-clay-200">{img}</div>
            <div className="px-3.5 py-3 flex-1 min-w-0">
              <h3 className="font-heading text-[18px] mb-0.5 text-museum-walnut">{title}</h3>
              <p className="text-[12px] leading-snug text-clay-700 mb-2 line-clamp-2">
                {description}
              </p>
              {pills}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
