import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useTour,
  useStopsForTour,
  useResumeTour,
  getLocalizedText,
  groupStopsByRoom,
  computeTourDuration,
  useThemes,
} from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { StopCard } from '../components/StopCard';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';

export function TourDetailPage() {
  const { tourId } = useParams();
  const { language } = useSettings();
  const ui = getUI(language);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  const { data: tour, loading: tourLoading } = useTour(tourId);
  const { data: allStopsForTour, loading: stopsLoading } = useStopsForTour(tour);
  const { data: themes } = useThemes();
  const resume = useResumeTour();

  if (tourLoading) {
    return (
      <div className="pb-28 min-h-screen">
        <div className="animate-pulse bg-museum-walnut/10 h-[270px]" />
        <div className="max-w-2xl mx-auto px-5 mt-6 space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-museum-walnut/10 rounded-[20px] h-14" />
          ))}
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <div className="bg-museum-cream rounded-card shadow-lg p-10 max-w-md">
          <h1 className="text-xl mb-4 text-museum-walnut">Turul nu a fost găsit</h1>
          <Link to="/" className="text-accent-700 hover:underline">← {ui.toursNav}</Link>
        </div>
      </div>
    );
  }

  const title = getLocalizedText(tour.title, language) || '';
  const description = getLocalizedText(tour.description, language) || '';
  const duration = computeTourDuration(tour);

  const relevantThemes = themes.filter((theme) =>
    allStopsForTour.some((stop) => stop.themes?.includes(theme.id)),
  );

  const stops = selectedThemeId
    ? allStopsForTour.filter((stop) => stop.themes?.includes(selectedThemeId))
    : allStopsForTour;

  const stopIndexMap = new Map(stops.map((stop, index) => [stop.id, index]));
  const roomGroups = groupStopsByRoom(stops);
  const firstStopId = stops[0]?.id;
  const beginTourUrl = firstStopId
    ? `/tour/${tour.id}/stop/${firstStopId}${selectedThemeId ? `?theme=${selectedThemeId}` : ''}`
    : null;
  const resumeStopId = resume?.tourId === tour.id ? resume.stopId : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-28 min-h-screen"
    >
      {/* Hero */}
      <div className="relative h-[270px] w-full overflow-hidden bg-museum-walnut/20">
        {tour.image && (
          <img
            src={asset(tour.image)}
            alt={title}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(32,30,29,0.45), rgba(32,30,29,0.05) 50%)' }}
        />
        <Link
          to="/"
          aria-label={ui.back}
          className="absolute top-14 left-[18px] w-10 h-10 rounded-full bg-museum-cream/90 flex items-center justify-center text-museum-walnut"
        >
          <ArrowLeft size={19} strokeWidth={2.75} />
        </Link>
      </div>

      {/* Sheet */}
      <div className="relative z-[1] -mt-[30px] rounded-t-sheet bg-museum-beige px-5 pt-6 max-w-2xl mx-auto">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-accent-700 mb-1.5">
          Casa {tour.order} · Putna
        </div>
        <h1 className="font-heading text-[28px] leading-[1.1] text-museum-walnut mb-2">{title}</h1>
        <p className="text-[13.5px] leading-snug text-clay-700">
          {ui.stopsCount(tour.stopIds.length)} · {duration}
        </p>
        <p className="text-[13.5px] leading-normal text-clay-700 mt-1.5">{description}</p>

        {/* Theme filter chips */}
        {!stopsLoading && relevantThemes.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 mt-4">
            <button
              onClick={() => setSelectedThemeId(null)}
              className={`shrink-0 whitespace-nowrap text-[12.5px] font-semibold px-3.5 py-2 rounded-full transition-colors ${
                selectedThemeId === null
                  ? 'bg-museum-walnut text-clay-100'
                  : 'border-[1.5px] border-clay-300 text-museum-walnut'
              }`}
            >
              {ui.completeTour}
            </button>
            {relevantThemes.map((theme) => {
              const isActive = selectedThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedThemeId(theme.id)}
                  className={`shrink-0 whitespace-nowrap text-[12.5px] font-semibold px-3.5 py-2 rounded-full transition-colors ${
                    isActive
                      ? 'bg-museum-walnut text-clay-100'
                      : 'border-[1.5px] border-clay-300 text-museum-walnut'
                  }`}
                >
                  {getLocalizedText(theme.title, language) ?? theme.id}
                </button>
              );
            })}
          </div>
        )}

        {/* Room groups */}
        <div className="mt-5 flex flex-col gap-5">
          {stopsLoading ? (
            [0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-museum-walnut/10 rounded-[20px] h-14" />
            ))
          ) : (
            roomGroups.map((group) => (
              <div key={group.roomId} className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-clay-600">
                    {group.roomName}
                  </span>
                  <span className="flex-1 h-[1.5px] bg-clay-300" />
                  <span className="text-[11px] text-clay-600">
                    {ui.stopsCount(group.stops.length)}
                  </span>
                </div>
                {group.stops.map((stop) => (
                  <StopCard
                    key={stop.id}
                    stop={stop}
                    tourId={tour.id}
                    index={stopIndexMap.get(stop.id) ?? 0}
                    isCurrent={stop.id === resumeStopId}
                    isResume={stop.id === resumeStopId}
                    themeId={selectedThemeId ?? undefined}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sticky footer */}
      {beginTourUrl && (
        <div
          className="fixed left-0 right-0 z-30 px-5 pt-3.5"
          style={{
            bottom: 0,
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 26px)',
            background: 'linear-gradient(to top, rgb(var(--museum-beige)) 70%, transparent)',
          }}
        >
          <div className="max-w-2xl mx-auto">
            <Link
              to={beginTourUrl}
              state={{ direction: 1 }}
              className="block text-center bg-accent text-white rounded-full py-4 font-heading text-[16px] shadow-md"
            >
              {resumeStopId ? ui.continueTour : ui.beginTour}
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}
