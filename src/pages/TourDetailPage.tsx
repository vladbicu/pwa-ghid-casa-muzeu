import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTour, useStopsForTour, getLocalizedText } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { StopCard } from '../components/StopCard';
import { ArrowLeft, Clock, MapPin, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function TourDetailPage() {
  const { tourId } = useParams();
  const { language } = useSettings();

  const tour = useTour(tourId);
  const stops = useStopsForTour(tour);

  if (!tour) {
    return <div className="p-8 text-center">Turul nu a fost găsit</div>;
  }

  const title = getLocalizedText(tour.title, language) || '';
  const description = getLocalizedText(tour.description, language) || '';
  const firstStopId = tour.stopIds[0];

  return (
    <div className="pb-24 bg-museum-beige min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-museum-walnut/20"
          style={{
            backgroundImage: tour.image ? `url(${tour.image})` : undefined,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-museum-beige" />

        <Link
          to="/"
          className="absolute top-6 left-6 p-3 bg-museum-cream/20 backdrop-blur-md text-museum-cream rounded-full hover:bg-museum-cream/30 transition-colors z-10"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-museum-beige via-museum-beige/80 to-transparent pt-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex gap-4 mb-3 text-sm font-medium text-museum-walnut/80">
              <span className="flex items-center gap-1 bg-museum-cream px-3 py-1 rounded-full shadow-sm">
                <Clock size={14} /> {tour.durationLabel}
              </span>
              <span className="flex items-center gap-1 bg-museum-cream px-3 py-1 rounded-full shadow-sm">
                <MapPin size={14} /> {stops.length} Opriri
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-museum-walnut mb-2">
              {title}
            </h1>
            <p className="text-museum-walnut/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-museum-walnut">Opriri</h2>
          {firstStopId && (
            <Link
              to={`/tour/${tour.id}/stop/${firstStopId}`}
              className="flex items-center gap-2 bg-museum-moss text-museum-cream px-5 py-2.5 rounded-full font-semibold shadow-warm hover:bg-museum-moss/90 transition-colors active:scale-95"
            >
              <Play size={18} fill="currentColor" /> Începe turul
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {stops.map((stop, index) => (
            <StopCard
              key={stop.id}
              stop={stop}
              tourId={tour.id}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
