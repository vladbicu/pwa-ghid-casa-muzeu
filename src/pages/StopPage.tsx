import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTour, useStop, useStopIndex, getLocalizedText } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { Accordion } from '../components/Accordion';
import { ArrowLeft, ChevronRight, MessageCircleQuestion, Lightbulb, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export function StopPage() {
  const { tourId, stopId } = useParams();
  const { language } = useSettings();

  const tour = useTour(tourId);
  const stop = useStop(stopId);
  const stopIndex = useStopIndex(tour, stopId);

  if (!tour || !stop || stopIndex === -1) {
    return <div className="p-8 text-center">Oprirea nu a fost găsită</div>;
  }

  // Get prev/next stop IDs from tour's stopIds array
  const prevStopId = stopIndex > 0 ? tour.stopIds[stopIndex - 1] : null;
  const nextStopId = stopIndex < tour.stopIds.length - 1 ? tour.stopIds[stopIndex + 1] : null;
  const totalStops = tour.stopIds.length;

  const title = getLocalizedText(stop.title, language) || '';
  const script = getLocalizedText(stop.script, language) || '';
  const keyPoints = getLocalizedText(stop.keyPoints, language) || [];
  const questions = getLocalizedText(stop.questions, language) || [];
  const extra = getLocalizedText(stop.extra, language);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-museum-beige pb-24"
    >
      {/* Immersive Header */}
      <div className="relative h-[40vh] w-full">
        {stop.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${stop.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
          <Link
            to={`/tour/${tourId}`}
            className="p-3 bg-museum-walnut/80 backdrop-blur-md text-museum-cream rounded-full hover:bg-museum-walnut transition-colors shadow-lg"
          >
            <ArrowLeft size={24} />
          </Link>

          <div className="bg-museum-walnut/80 backdrop-blur-md text-museum-cream px-4 py-2 rounded-full font-medium shadow-lg">
            Oprire {stopIndex + 1} din {totalStops}
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="relative -mt-12 px-4 md:px-8 max-w-3xl mx-auto z-20">
        <div className="bg-museum-cream rounded-2xl shadow-warm-lg p-6 md:p-10 border border-museum-walnut/5">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-museum-walnut leading-tight mb-6">
            {title}
          </h1>

          {/* Script Text */}
          {script && (
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
                Puncte cheie
              </h3>
              <ul className="space-y-2">
                {keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-museum-walnut/80"
                  >
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
                Întrebări pentru public
              </h3>
              <ul className="space-y-2">
                {questions.map((question, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-museum-walnut/80 bg-museum-sand/50 p-3 rounded-lg"
                  >
                    <span className="font-semibold text-museum-moss shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Extra Details */}
          {extra && (
            <div className="mb-6">
              <Accordion title="Extra detalii">
                <p className="text-museum-walnut/80 whitespace-pre-wrap">{extra}</p>
              </Accordion>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-museum-walnut/10">
            {prevStopId ? (
              <Link
                to={`/tour/${tourId}/stop/${prevStopId}`}
                className="text-museum-walnut/60 hover:text-museum-walnut font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={16} /> Înapoi
              </Link>
            ) : (
              <div />
            )}

            {nextStopId ? (
              <Link
                to={`/tour/${tourId}/stop/${nextStopId}`}
                className="bg-museum-walnut text-museum-cream px-6 py-3 rounded-full font-semibold shadow-warm hover:bg-museum-walnut/90 transition-all flex items-center gap-2 hover:gap-3"
              >
                Următoarea oprire <ChevronRight size={18} />
              </Link>
            ) : (
              <Link
                to={`/tour/${tourId}`}
                className="bg-museum-moss text-museum-cream px-6 py-3 rounded-full font-semibold shadow-warm hover:bg-museum-moss/90 transition-all"
              >
                Finalizează turul
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Progress indicator at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-museum-sand z-30">
        <div
          className="h-full bg-museum-moss transition-all duration-300"
          style={{
            width: `${((stopIndex + 1) / totalStops) * 100}%`,
          }}
        />
      </div>
    </motion.div>
  );
}
