import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTour, useStopsForTour, getLocalizedText, groupStopsByRoom } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { StopCard } from '../components/StopCard';
import { ArrowLeft, Clock, MapPin, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';

export function TourDetailPage() {
  const { tourId } = useParams();
  const { language } = useSettings();
  const ui = getUI(language);

  const { data: tour, loading: tourLoading } = useTour(tourId);
  const { data: stops, loading: stopsLoading } = useStopsForTour(tour);

  if (tourLoading) {
    return (
      <div className="pb-24 bg-museum-beige min-h-screen">
        <div className="animate-pulse bg-museum-walnut/10 h-[40vh] min-h-[300px]" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-6 space-y-4">
          <div className="animate-pulse bg-museum-walnut/10 rounded-xl h-10 w-2/3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-museum-walnut/10 rounded-xl h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-museum-beige flex items-center justify-center p-8 text-center">
        <div className="bg-museum-cream rounded-2xl shadow-warm-lg p-10 max-w-md border border-museum-walnut/10">
          <h1 className="text-xl font-bold text-museum-walnut mb-4">Turul nu a fost găsit</h1>
          <Link to="/" className="text-museum-moss hover:underline">← Tururi</Link>
        </div>
      </div>
    );
  }

  const title = getLocalizedText(tour.title, language) || '';
  const description = getLocalizedText(tour.description, language) || '';
  const firstStopId = tour.stopIds[0];

  const stopIndexMap = new Map(stops.map((stop, index) => [stop.id, index]));
  const roomGroups = groupStopsByRoom(stops);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-24 bg-museum-beige min-h-screen"
    >
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-museum-walnut/20">
          {tour.image && (
            <img
              src={asset(tour.image)}
              alt={title}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-museum-beige" />

        <Link
          to="/"
          aria-label="Înapoi la tururi"
          className="absolute top-6 left-6 p-3 bg-museum-cream/20 backdrop-blur-md text-museum-cream rounded-full hover:bg-museum-cream/30 transition-colors z-10"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-museum-beige via-museum-beige/80 to-transparent pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex gap-4 mb-3 text-sm font-medium text-museum-walnut/80">
              <span className="flex items-center gap-1 bg-museum-cream px-3 py-1 rounded-full shadow-sm">
                <Clock size={14} /> {tour.durationLabel}
              </span>
              <span className="flex items-center gap-1 bg-museum-cream px-3 py-1 rounded-full shadow-sm">
                <MapPin size={14} /> {stopsLoading ? '…' : stops.length} {ui.stops}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-museum-walnut mb-2">{title}</h1>
            <p className="text-museum-walnut/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-museum-walnut">{ui.stops}</h2>
          {firstStopId && (
            <Link
              to={`/tour/${tour.id}/stop/${firstStopId}`}
              state={{ direction: 1 }}
              className="flex items-center gap-2 bg-museum-moss text-museum-cream px-5 py-2.5 rounded-full font-semibold shadow-warm hover:bg-museum-moss/90 transition-colors active:scale-95"
            >
              <Play size={18} fill="currentColor" /> {ui.beginTour}
            </Link>
          )}
        </div>

        {stopsLoading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-museum-walnut/10 rounded-xl h-20" />
            ))}
          </div>
        ) : (
          roomGroups.map((group) => (
            <div key={group.roomId} className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-museum-walnut/40 mb-3 px-1">
                {group.roomName}
              </h3>
              <div className="space-y-3">
                {group.stops.map((stop) => (
                  <StopCard
                    key={stop.id}
                    stop={stop}
                    tourId={tour.id}
                    index={stopIndexMap.get(stop.id) ?? 0}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </motion.div>
  );
}
