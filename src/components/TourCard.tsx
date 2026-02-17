import React from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Tour } from '../types';
import { useSettings } from '../context/SettingsContext';
import { getLocalizedText } from '../hooks/useData';

interface TourCardProps {
  tour: Tour;
  index: number;
}

export function TourCard({ tour, index }: TourCardProps) {
  const { language } = useSettings();

  const title = getLocalizedText(tour.title, language) || '';
  const description = getLocalizedText(tour.description, language) || '';

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
    >
      <Link to={`/tour/${tour.id}`} className="block group relative h-full">
        <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-warm-lg transition-transform duration-300 group-hover:-translate-y-1 group-focus:ring-4 ring-museum-moss/50">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 bg-museum-walnut/20"
            style={{
              backgroundImage: tour.image ? `url(${tour.image})` : undefined,
            }}
          />

          {/* Overlay - Warm dark gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-museum-walnut/90 via-museum-walnut/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-museum-cream">
            <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
              <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider mb-2 text-museum-cream/80">
                <span className="flex items-center gap-1 bg-museum-walnut/30 backdrop-blur-md px-2 py-1 rounded-md border border-museum-cream/10">
                  <Clock size={12} /> {tour.durationLabel}
                </span>
                <span className="flex items-center gap-1 bg-museum-walnut/30 backdrop-blur-md px-2 py-1 rounded-md border border-museum-cream/10">
                  <MapPin size={12} /> {tour.stopIds.length} Opriri
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2 text-shadow-sm leading-tight">
                {title}
              </h3>
              <p className="text-sm text-museum-cream/90 line-clamp-2 mb-4 font-light">
                {description}
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold text-museum-sand group-hover:text-white transition-colors">
                Începe turul{' '}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* Wooden Plaque Border Effect (Subtle) */}
          <div className="absolute inset-0 border-[6px] border-museum-walnut/20 rounded-2xl pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}
