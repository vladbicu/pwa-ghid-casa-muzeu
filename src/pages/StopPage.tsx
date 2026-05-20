import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useTour, useStop, useStopIndex, useStopsForTour, getLocalizedText, saveResume } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { Accordion } from '../components/Accordion';
import { ArrowLeft, ChevronRight, MessageCircleQuestion, Lightbulb, BookOpen, List, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { asset } from '../utils/asset';

const slideVariants = {
  initial: (d: number) => ({
    x: d > 0 ? '35%' : d < 0 ? '-35%' : 0,
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1 },
  exit: (d: number) => ({
    x: d > 0 ? '-35%' : d < 0 ? '35%' : 0,
    opacity: 0,
  }),
};

export function StopPage() {
  const { tourId, stopId } = useParams();
  const { language } = useSettings();
  const location = useLocation();
  const direction = (location.state as { direction?: number } | null)?.direction ?? 0;
  const ui = getUI(language);

  const { data: tour, loading: tourLoading } = useTour(tourId);
  const { data: stop, loading: stopLoading } = useStop(stopId);
  const stopIndex = useStopIndex(tour, stopId);
  const { data: allStops } = useStopsForTour(tour);

  const [jumperOpen, setJumperOpen] = useState(false);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 400], ['0%', '25%']);

  useEffect(() => {
    if (tourId && stopId) saveResume(tourId, stopId);
  }, [tourId, stopId]);

  if (tourLoading || stopLoading) {
    return (
      <div className="min-h-screen bg-museum-beige">
        <div className="animate-pulse bg-museum-walnut/10 h-[40vh]" />
        <div className="relative -mt-12 px-4 md:px-8 max-w-3xl mx-auto">
          <div className="bg-museum-cream rounded-2xl p-6 space-y-4">
            <div className="animate-pulse bg-museum-walnut/10 rounded-xl h-10 w-2/3" />
            <div className="animate-pulse bg-museum-walnut/10 rounded-xl h-4 w-full" />
            <div className="animate-pulse bg-museum-walnut/10 rounded-xl h-4 w-full" />
            <div className="animate-pulse bg-museum-walnut/10 rounded-xl h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!tour || !stop || stopIndex === -1) {
    return (
      <div className="min-h-screen bg-museum-beige flex items-center justify-center p-8 text-center">
        <div className="bg-museum-cream rounded-2xl shadow-warm-lg p-10 max-w-md border border-museum-walnut/10">
          <h1 className="text-xl font-bold text-museum-walnut mb-4">{ui.stopNotFound}</h1>
          <Link to={tourId ? `/tour/${tourId}` : '/'} className="text-museum-moss hover:underline">
            {ui.backToTour}
          </Link>
        </div>
      </div>
    );
  }

  const prevStopId = stopIndex > 0 ? tour.stopIds[stopIndex - 1] : null;
  const nextStopId = stopIndex < tour.stopIds.length - 1 ? tour.stopIds[stopIndex + 1] : null;
  const totalStops = tour.stopIds.length;
  const estMins = Math.ceil(stop.estSeconds / 60);

  const title = getLocalizedText(stop.title, language) || '';
  const script = getLocalizedText(stop.script, language) || '';
  const keyPoints = getLocalizedText(stop.keyPoints, language) || [];
  const questions = getLocalizedText(stop.questions, language) || [];
  const extra = getLocalizedText(stop.extra, language);

  return (
    <>
      <motion.div
        custom={direction}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="min-h-screen bg-museum-beige pb-24"
      >
        {/* Immersive Hero */}
        <div className="relative h-[40vh] w-full overflow-hidden bg-museum-walnut/20">
          {stop.image && (
            <motion.img
              src={asset(stop.image)}
              alt={title}
              style={{ y: imageY }}
              className="absolute inset-0 w-full h-full object-cover scale-110"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
            <Link
              to={`/tour/${tourId}`}
              aria-label={ui.back}
              className="p-3 bg-museum-walnut/80 backdrop-blur-md text-museum-cream rounded-full hover:bg-museum-walnut transition-colors shadow-lg"
            >
              <ArrowLeft size={24} />
            </Link>

            <div className="flex items-center gap-2">
              <div className="bg-museum-walnut/80 backdrop-blur-md text-museum-cream px-4 py-2 rounded-full font-medium shadow-lg text-sm">
                {ui.stopCounter(stopIndex + 1, totalStops)}
              </div>
              <button
                onClick={() => setJumperOpen(true)}
                aria-label="Sari la oprire"
                className="p-2.5 bg-museum-walnut/80 backdrop-blur-md text-museum-cream rounded-full hover:bg-museum-walnut transition-colors shadow-lg"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="relative -mt-12 px-4 md:px-8 max-w-3xl mx-auto z-20">
          <div className="bg-museum-cream rounded-2xl shadow-warm-lg p-6 md:p-10 border border-museum-walnut/5">
            {/* Title + est time */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-museum-walnut leading-tight">
                {title}
              </h1>
              <span className="shrink-0 text-sm text-museum-walnut/50 bg-museum-sand px-3 py-1 rounded-full mt-1 whitespace-nowrap">
                {ui.estTime(estMins)}
              </span>
            </div>

            {/* Script Text */}
            {script && script !== 'TODO' && (
              <div className="prose prose-lg prose-stone text-museum-walnut/80 mb-8 leading-relaxed">
                <div className="flex items-start gap-3 mb-4">
                  <BookOpen size={24} className="text-museum-moss shrink-0 mt-1" />
                  <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-museum-moss first-letter:mr-1 first-letter:float-left whitespace-pre-wrap">
                    {script}
                  </p>
                </div>
              </div>
            )}

            {/* Key Points */}
            {keyPoints.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-museum-walnut mb-3">
                  <Lightbulb size={20} className="text-museum-moss" />
                  {ui.keyPoints}
                </h3>
                <ul className="space-y-2">
                  {keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-museum-walnut/80">
                      <span className="w-2 h-2 rounded-full bg-museum-moss mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Questions */}
            {questions.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-museum-walnut mb-3">
                  <MessageCircleQuestion size={20} className="text-museum-moss" />
                  {ui.questions}
                </h3>
                <ul className="space-y-2">
                  {questions.map((question, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-museum-walnut/80 bg-museum-sand/50 p-3 rounded-lg">
                      <span className="font-semibold text-museum-moss shrink-0">{idx + 1}.</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extra Details */}
            {extra && (
              <div className="mb-6">
                <Accordion title={ui.extraDetails} teaser={extra.split('\n')[0]?.substring(0, 120)}>
                  <p className="text-museum-walnut/80 whitespace-pre-wrap">{extra}</p>
                </Accordion>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-museum-walnut/10">
              {prevStopId ? (
                <Link
                  to={`/tour/${tourId}/stop/${prevStopId}`}
                  state={{ direction: -1 }}
                  className="text-museum-walnut/60 hover:text-museum-walnut font-medium flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft size={16} /> {ui.back}
                </Link>
              ) : (
                <div />
              )}

              {nextStopId ? (
                <Link
                  to={`/tour/${tourId}/stop/${nextStopId}`}
                  state={{ direction: 1 }}
                  className="bg-museum-walnut text-museum-cream px-6 py-3 rounded-full font-semibold shadow-warm hover:bg-museum-walnut/90 transition-all flex items-center gap-2 hover:gap-3"
                >
                  {ui.nextStop} <ChevronRight size={18} />
                </Link>
              ) : (
                <Link
                  to={`/tour/${tourId}`}
                  className="bg-museum-moss text-museum-cream px-6 py-3 rounded-full font-semibold shadow-warm hover:bg-museum-moss/90 transition-all"
                >
                  {ui.finishTour}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="fixed bottom-0 left-0 right-0 h-1.5 bg-museum-sand/80 z-30">
          <div
            className="h-full bg-museum-moss transition-all duration-300"
            style={{ width: `${((stopIndex + 1) / totalStops) * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Jump-to-stop sheet */}
      <AnimatePresence>
        {jumperOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setJumperOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed bottom-0 left-0 right-0 bg-museum-cream rounded-t-3xl z-50 max-h-[75vh] flex flex-col shadow-warm-lg"
            >
              {/* Sheet handle + header */}
              <div className="px-6 pt-4 pb-3 border-b border-museum-walnut/10 shrink-0">
                <div className="w-10 h-1.5 bg-museum-walnut/20 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-museum-walnut">{ui.stops}</h3>
                  <button
                    onClick={() => setJumperOpen(false)}
                    aria-label="Închide"
                    className="p-1.5 text-museum-walnut/50 hover:text-museum-walnut rounded-lg hover:bg-museum-sand transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Stop list */}
              <div className="overflow-y-auto px-4 py-3 space-y-1.5">
                {allStops.map((s, idx) => {
                  const stopTitle = getLocalizedText(s.title, language) || '';
                  const isCurrent = s.id === stopId;
                  const jumpDirection = idx > stopIndex ? 1 : -1;
                  return (
                    <Link
                      key={s.id}
                      to={`/tour/${tourId}/stop/${s.id}`}
                      state={{ direction: jumpDirection }}
                      onClick={() => setJumperOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        isCurrent
                          ? 'bg-museum-moss/15 border border-museum-moss/30'
                          : 'hover:bg-museum-sand'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                        isCurrent ? 'bg-museum-moss text-museum-cream' : 'bg-museum-walnut/10 text-museum-walnut'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-sm font-medium truncate ${
                        isCurrent ? 'text-museum-moss' : 'text-museum-walnut'
                      }`}>
                        {stopTitle}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
