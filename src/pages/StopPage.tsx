import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  useTour,
  useStop,
  useStopIndex,
  useStopsForTour,
  getLocalizedText,
  saveResume,
  useThematicStops,
  useTours,
  useStops,
} from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { Accordion } from '../components/Accordion';
import { ArrowLeft, ChevronLeft, List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { asset } from '../utils/asset';
import { MediaGallery } from '../components/media/MediaGallery';
import { useTenant } from '../config/TenantContext';

const slideVariants = {
  initial: (d: number) => ({ x: d > 0 ? '35%' : d < 0 ? '-35%' : 0, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? '-35%' : d < 0 ? '35%' : 0, opacity: 0 }),
};

export function StopPage() {
  const { tourId, stopId } = useParams();
  const { language, viewMode } = useSettings();
  const tenant = useTenant();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const themeId = searchParams.get('theme') ?? undefined;
  const direction = (location.state as { direction?: number } | null)?.direction ?? 0;
  const ui = getUI(language);
  const isGuide = viewMode === 'guide';

  const { data: tour, loading: tourLoading } = useTour(tourId);
  const { data: stop, loading: stopLoading } = useStop(stopId);
  const stopIndex = useStopIndex(tour, stopId);
  const { data: allStops } = useStopsForTour(tour);

  const { data: allToursData } = useTours();
  const { data: allStopsData } = useStops();
  const { stops: thematicStops, tourMap: thematicTourMap } = useThematicStops(
    themeId ?? '',
    allToursData ?? [],
    allStopsData ?? [],
  );
  const thematicIndex = themeId ? thematicStops.findIndex((s) => s.id === stopId) : -1;

  const [jumperOpen, setJumperOpen] = useState(false);

  useEffect(() => {
    if (tourId && stopId) saveResume(tourId, stopId);
  }, [tourId, stopId]);

  if (tourLoading || stopLoading) {
    return (
      <div className="min-h-screen bg-museum-beige">
        <div className="animate-pulse bg-museum-walnut/10 h-[40vh]" />
        <div className="relative -mt-8 px-5 max-w-2xl mx-auto">
          <div className="bg-museum-beige rounded-t-[32px] p-6 space-y-4">
            <div className="animate-pulse bg-museum-walnut/10 rounded-xl h-9 w-2/3" />
            <div className="animate-pulse bg-museum-walnut/10 rounded-xl h-4 w-full" />
            <div className="animate-pulse bg-museum-walnut/10 rounded-xl h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!tour || !stop || stopIndex === -1) {
    return (
      <div className="min-h-screen bg-museum-beige flex items-center justify-center p-8 text-center">
        <div className="bg-museum-cream rounded-card shadow-lg p-10 max-w-md">
          <h1 className="text-xl mb-4 text-museum-walnut">{ui.stopNotFound}</h1>
          <Link to={tourId ? `/tour/${tourId}` : '/'} className="text-accent-700 hover:underline">
            {ui.backToTour}
          </Link>
        </div>
      </div>
    );
  }

  const isThematic = themeId && thematicIndex !== -1;

  const prevStopId = isThematic
    ? thematicIndex > 0 ? thematicStops[thematicIndex - 1].id : null
    : stopIndex > 0 ? tour.stopIds[stopIndex - 1] : null;
  const nextStopId = isThematic
    ? thematicIndex < thematicStops.length - 1 ? thematicStops[thematicIndex + 1].id : null
    : stopIndex < tour.stopIds.length - 1 ? tour.stopIds[stopIndex + 1] : null;

  const totalStops = isThematic ? thematicStops.length : tour.stopIds.length;
  const currentStopIndex = isThematic ? thematicIndex : stopIndex;

  const prevTourId = isThematic && prevStopId ? thematicTourMap.get(prevStopId) ?? tourId : tourId;
  const nextTourId = isThematic && nextStopId ? thematicTourMap.get(nextStopId) ?? tourId : tourId;

  const backUrl = isThematic ? `/tour/thematic/${themeId}` : `/tour/${tourId}`;
  const prevUrl = prevStopId
    ? `/tour/${prevTourId}/stop/${prevStopId}${themeId ? `?theme=${themeId}` : ''}`
    : null;
  const nextUrl = nextStopId
    ? `/tour/${nextTourId}/stop/${nextStopId}${themeId ? `?theme=${themeId}` : ''}`
    : null;

  const estMins = Math.ceil(stop.estSeconds / 60);
  const title = getLocalizedText(stop.title, language) || '';
  const script = getLocalizedText(stop.script, language) || '';
  const keyPoints = getLocalizedText(stop.keyPoints, language) || [];
  const questions = getLocalizedText(stop.questions, language) || [];
  const extra = getLocalizedText(stop.extra, language);

  const nextStopData = nextStopId
    ? (allStopsData ?? []).find((s) => s.id === nextStopId)
    : null;
  const nextStopTitle = nextStopData ? getLocalizedText(nextStopData.title, language) || '' : '';

  const counterPill = ui.stopCounter(currentStopIndex + 1, totalStops);
  const progress = ((currentStopIndex + 1) / totalStops) * 100;

  const backBtn = (
    <Link
      to={backUrl}
      aria-label={ui.back}
      className="w-10 h-10 rounded-full bg-museum-cream/95 shadow-md flex items-center justify-center text-museum-walnut shrink-0"
    >
      <ArrowLeft size={19} strokeWidth={2.75} />
    </Link>
  );
  const listBtn = (
    <button
      onClick={() => setJumperOpen(true)}
      aria-label={ui.stops}
      className="w-10 h-10 rounded-full bg-museum-cream/95 shadow-md flex items-center justify-center text-museum-walnut shrink-0"
    >
      <List size={18} strokeWidth={2.75} />
    </button>
  );

  return (
    <>
      <motion.div
        custom={direction}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="min-h-screen bg-museum-beige"
        style={{ paddingBottom: 140 }}
      >
        {isGuide ? (
          /* ---------- Guide mode: a layer over the same stop ---------- */
          <>
            <div
              className="bg-sage-700 text-white px-5 flex items-center justify-between"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)', paddingBottom: 12 }}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[12px] font-bold">
                  G
                </span>
                <span className="text-[13px] font-bold">{ui.guideModeBar}</span>
              </div>
              <span className="text-[12px] font-bold bg-white/20 rounded-full px-2.5 py-1">
                {ui.estTime(estMins)}
              </span>
            </div>

            <div className="px-5 pt-3 max-w-2xl mx-auto flex flex-col gap-3">
              <div className="flex items-center justify-between">
                {backBtn}
                {listBtn}
              </div>

              <div className="flex items-center gap-3">
                {stop.image && (
                  <img src={asset(stop.image)} alt="" className="w-14 h-14 rounded-inner object-cover shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-clay-600">
                    {counterPill}
                  </div>
                  <h1 className="font-heading text-[24px] leading-[1.1] text-museum-walnut">{title}</h1>
                </div>
              </div>

              {script && script !== 'TODO' && (
                <>
                  <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-accent-700">
                    {ui.guideSay}
                  </div>
                  <p className="text-[17px] leading-[1.62] text-pretty-wrap text-museum-walnut whitespace-pre-wrap">
                    {script}
                  </p>
                </>
              )}

              {questions.length > 0 && (
                <div className="bg-sage-200 rounded-inner px-4 py-4">
                  <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-sage-800 mb-2.5">
                    {ui.guideQuestions}
                  </div>
                  <div className="flex flex-col gap-2.5 text-[14.5px] leading-snug">
                    {questions.map((q, i) => (
                      <div key={i} className="flex gap-2.5">
                        <span className="text-sage-800 font-bold">{i + 1}</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {keyPoints.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {keyPoints.map((p, i) => (
                    <span key={i} className="text-[12px] font-semibold px-3 py-1.5 rounded-full border-[1.5px] border-clay-300">
                      {p}
                    </span>
                  ))}
                </div>
              )}

              {extra && (
                <Accordion title={ui.extraDetails} teaser={extra.split('\n')[0]?.substring(0, 120)}>
                  <p className="text-clay-700 whitespace-pre-wrap">{extra}</p>
                </Accordion>
              )}

              {nextStopTitle && (
                <div className="border-t-[1.5px] border-clay-300 pt-3 flex items-center gap-2.5">
                  <span className="text-[12px] text-clay-600">{ui.nextLabel}</span>
                  <span className="text-[13.5px] font-bold text-museum-walnut">
                    {currentStopIndex + 2} · {nextStopTitle}
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          /* ---------- Visitor mode ---------- */
          <>
            <div className="relative h-[330px] w-full overflow-hidden bg-museum-walnut/20">
              {stop.media && stop.media.length > 0 ? (
                <div className="absolute inset-0">
                  <MediaGallery
                    media={stop.media}
                    lang={language}
                    fallbackImage={stop.image}
                    videoEnabled={tenant.features.videoStops}
                  />
                </div>
              ) : stop.image ? (
                <img
                  src={asset(stop.image)}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : null}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(32,30,29,0.5), rgba(32,30,29,0) 45%)' }}
              />
              <div
                className="absolute left-[18px] right-[18px] flex items-center justify-between"
                style={{ top: 'calc(env(safe-area-inset-top, 0px) + 14px)' }}
              >
                {backBtn}
                <div className="text-[12px] font-bold text-museum-cream bg-museum-walnut/45 rounded-full px-3.5 py-2">
                  {counterPill}
                </div>
                {listBtn}
              </div>
            </div>

            <div className="relative z-[1] -mt-8 rounded-t-[32px] bg-museum-beige px-5 pt-6 max-w-2xl mx-auto">
              <div className="flex gap-2 mb-3.5">
                <span className="text-[11px] font-bold px-2.5 py-1.5 rounded-full bg-accent-200 text-accent-800">
                  {ui.stopTypeLabel(stop.type)}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1.5 rounded-full bg-museum-sand text-clay-700">
                  {ui.estTime(estMins)}
                </span>
              </div>

              <h1 className="font-heading text-[30px] leading-[1.08] text-museum-walnut mb-3.5">
                {title}
              </h1>

              {script && script !== 'TODO' && (
                <p className="text-[16px] leading-[1.62] text-pretty-wrap text-museum-walnut whitespace-pre-wrap mb-4">
                  {script}
                </p>
              )}

              {keyPoints.length > 0 && (
                <div className="bg-clay-100 rounded-inner px-4 py-4 mb-4">
                  <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-accent-700 mb-2.5">
                    {ui.keyPoints}
                  </div>
                  <div className="flex flex-col gap-2 text-[14px] leading-snug">
                    {keyPoints.map((p, i) => (
                      <div key={i} className="flex gap-2.5">
                        <span className="w-[7px] h-[7px] rounded-full bg-accent mt-[7px] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {questions.length > 0 && (
                <div className="mb-4">
                  <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-accent-700 mb-2.5">
                    {ui.questions}
                  </div>
                  <div className="flex flex-col gap-2 text-[14px] leading-snug">
                    {questions.map((q, i) => (
                      <div key={i} className="flex gap-2.5 bg-museum-sand/60 rounded-xl p-3">
                        <span className="font-bold text-accent-700 shrink-0">{i + 1}.</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {extra && (
                <div className="mb-4">
                  <Accordion title={ui.extraDetails} teaser={extra.split('\n')[0]?.substring(0, 120)}>
                    <p className="text-clay-700 whitespace-pre-wrap">{extra}</p>
                  </Accordion>
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* Sticky footer */}
      <div
        className="fixed left-0 right-0 z-30 px-5 pt-3"
        style={{
          bottom: 0,
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
          background: 'linear-gradient(to top, rgb(var(--museum-beige)) 70%, transparent)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="h-1 rounded-full bg-clay-300 mb-3 overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-2.5">
            {prevUrl ? (
              <Link
                to={prevUrl}
                state={{ direction: -1 }}
                aria-label={ui.back}
                className="w-14 rounded-full border-[1.5px] border-clay-300 flex items-center justify-center text-museum-walnut"
              >
                <ChevronLeft size={18} strokeWidth={2.75} />
              </Link>
            ) : (
              <span className="w-14 rounded-full border-[1.5px] border-clay-200 opacity-40" />
            )}
            {nextUrl ? (
              <Link
                to={nextUrl}
                state={{ direction: 1 }}
                className={`flex-1 text-center rounded-full py-4 font-heading text-[16px] text-white ${
                  isGuide ? 'bg-sage-700' : 'bg-museum-walnut'
                }`}
              >
                {ui.nextStop}
              </Link>
            ) : (
              <Link
                to={backUrl}
                className={`flex-1 text-center rounded-full py-4 font-heading text-[16px] text-white ${
                  isGuide ? 'bg-sage-700' : 'bg-accent'
                }`}
              >
                {ui.finishTour}
              </Link>
            )}
          </div>
        </div>
      </div>

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
              className="fixed bottom-0 left-0 right-0 bg-museum-beige rounded-t-sheet z-50 max-h-[75vh] flex flex-col shadow-lg"
            >
              <div className="px-5 pt-4 pb-3 shrink-0">
                <div className="w-10 h-1.5 bg-museum-walnut/20 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-museum-walnut">{ui.stops}</h3>
                  <button
                    onClick={() => setJumperOpen(false)}
                    aria-label="×"
                    className="p-1.5 text-clay-600 hover:text-museum-walnut rounded-lg"
                  >
                    <X size={18} strokeWidth={2.75} />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto px-4 py-3 space-y-1.5">
                {allStops.map((s, idx) => {
                  const st = getLocalizedText(s.title, language) || '';
                  const isCur = s.id === stopId;
                  return (
                    <Link
                      key={s.id}
                      to={`/tour/${tourId}/stop/${s.id}`}
                      state={{ direction: idx > stopIndex ? 1 : -1 }}
                      onClick={() => setJumperOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        isCur ? 'bg-accent-200' : 'hover:bg-museum-sand'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          isCur ? 'bg-accent text-white' : 'bg-museum-sand text-clay-700'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className={`text-sm font-semibold truncate ${
                          isCur ? 'text-accent-800' : 'text-museum-walnut'
                        }`}
                      >
                        {st}
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
