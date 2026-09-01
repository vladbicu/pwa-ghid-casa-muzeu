import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStop, useStops, getLocalizedText } from '../../hooks/useData';
import { useKidsProgress } from '../../context/KidsProgressContext';
import { getKidsUI } from '../../i18n/ui';
import { asset } from '../../utils/asset';
import type { KidsAnswer, AgeGroup, Lang } from '../../types';
import {
  Home, Grid3X3, Flame, BedDouble, Star, Armchair,
  UtensilsCrossed, Package, Building2, Hammer, HelpCircle,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Home, Grid3x3: Grid3X3, Flame, BedDouble, Star, Armchair,
  UtensilsCrossed, Package, Building2, Hammer,
};

const ANSWER_LABELS = ['A', 'B', 'C'];

function getEffectiveContent(
  ageGroup: AgeGroup,
  question: Record<Lang, string>,
  answers: KidsAnswer[],
  adaptations?: { '6-8'?: { question: Record<Lang, string>; answers: KidsAnswer[] }; '12-14'?: { question: Record<Lang, string>; answers: KidsAnswer[] } }
) {
  if (ageGroup === '6-8' && adaptations?.['6-8']) return adaptations['6-8'];
  if (ageGroup === '12-14' && adaptations?.['12-14']) return adaptations['12-14'];
  return { question, answers };
}

type Phase = 'arrival' | 'question' | 'correct' | 'wrong';

export function KidsStopPage() {
  const { stopId } = useParams<{ stopId: string }>();
  const navigate = useNavigate();
  const { data: stop } = useStop(stopId);
  const { data: allStops } = useStops();
  const { progress, earnStamp, getNextStopId } = useKidsProgress();

  const [phase, setPhase] = useState<Phase>('arrival');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);

  if (!progress) {
    navigate('/pasaportul-exploratorului', { replace: true });
    return null;
  }

  const lang: Lang = progress.language ?? 'ro';
  const ui = getKidsUI(lang);

  if (!stop?.kids?.include) {
    return (
      <div className="min-h-screen bg-[rgb(var(--kids-parchment))] flex items-center justify-center font-[Nunito,Outfit,sans-serif]">
        <p className="text-[rgb(var(--kids-ink))]/50">Oprire negăsită.</p>
      </div>
    );
  }

  const kids = stop.kids;
  const alreadyEarned = progress.earnedStopIds.includes(stop.id);
  const Icon = ICON_MAP[kids.stampIcon] ?? HelpCircle;

  const kidsStops = (allStops ?? []).filter(s => s.kids?.include).sort((a, b) => a.kids!.order - b.kids!.order);
  const stopIndex = kidsStops.findIndex(s => s.id === stop.id);
  const total = kidsStops.length;

  const { question, answers } = getEffectiveContent(
    progress.ageGroup,
    kids.question,
    kids.answers,
    kids.ageAdaptations,
  );

  function handleDiscoverClick() {
    if (alreadyEarned) {
      handleContinue();
      return;
    }
    setPhase('question');
  }

  function handleAnswer(idx: number) {
    if (answers[idx].correct) {
      setSelectedIdx(idx);
      earnStamp(stop!.id);
      setPhase('correct');
    } else {
      setWrongIdx(idx);
      setTimeout(() => setWrongIdx(null), 600);
    }
  }

  function handleContinue() {
    const nextId = getNextStopId(kidsStops);
    if (nextId) {
      navigate(`/pasaportul-exploratorului/oprire/${nextId}`);
    } else {
      navigate('/pasaportul-exploratorului/complet');
    }
  }

  const stopTitle = getLocalizedText(stop.title, lang) ?? '';

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--kids-parchment))] font-[Nunito,Outfit,sans-serif]">
      {/* hero image */}
      <div className="relative h-[45vh] min-h-[240px] overflow-hidden">
        <img
          src={asset(stop.image)}
          alt={stopTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgb(var(--kids-ink))]/40" />

        {/* back button */}
        <button
          onClick={() => navigate('/pasaportul-exploratorului/pasaport')}
          className="absolute top-4 left-4 bg-black/30 text-white rounded-full px-3 py-1.5 text-sm font-bold backdrop-blur-sm"
        >
          {ui.backToPassport}
        </button>

        {/* progress counter */}
        <div className="absolute top-4 right-4 bg-black/30 text-white rounded-full px-3 py-1.5 text-sm font-bold backdrop-blur-sm">
          {stopIndex + 1} / {total}
        </div>

        {/* animated stamp outline in center */}
        {phase === 'arrival' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full border-4 border-dashed border-white flex items-center justify-center"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <HelpCircle size={32} className="text-white/70" />
            </motion.div>
            <p className="text-white font-extrabold text-lg text-shadow-sm drop-shadow">
              {stopTitle.split(':')[0]}
            </p>
            <p className="text-white/80 text-sm font-semibold drop-shadow">
              {ui.earnStamp}
            </p>
          </motion.div>
        )}

        {/* stamp thud on correct */}
        {(phase === 'correct' || alreadyEarned) && phase !== 'question' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: -6, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <div className="w-24 h-24 rounded-full bg-[rgb(var(--kids-cobalt))] flex items-center justify-center shadow-2xl ring-4 ring-white/40">
              <Icon size={44} className="text-white" strokeWidth={1.5} />
            </div>
            <div className="bg-[rgb(var(--kids-cobalt))]/90 text-white font-extrabold text-xs tracking-widest px-4 py-1 rounded-full">
              ȘTAMPILAT ✦
            </div>
          </motion.div>
        )}
      </div>

      {/* content card */}
      <div className="flex-1 -mt-6 bg-[rgb(var(--kids-parchment))] rounded-t-3xl px-5 pt-6 pb-10">
        <h2 className="font-extrabold text-[rgb(var(--kids-ink))] text-2xl leading-tight mb-3">
          {stopTitle}
        </h2>

        {/* story text */}
        <p className="text-[rgb(var(--kids-ink))]/80 text-base leading-relaxed mb-5">
          {kids.scriptKids[lang] || kids.scriptKids.ro}
        </p>

        {/* fun fact if earned */}
        <AnimatePresence>
          {(phase === 'correct' || alreadyEarned) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 rounded-2xl bg-[rgb(var(--kids-gold))]/20 border border-[rgb(var(--kids-gold))]/40"
            >
              <p className="text-xs font-bold text-[rgb(var(--kids-ink))]/50 uppercase tracking-wide mb-1">
                {ui.didYouKnow}
              </p>
              <p className="text-[rgb(var(--kids-ink))] font-semibold text-sm leading-relaxed">
                {kids.funFact[lang] || kids.funFact.ro}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* question card */}
        <AnimatePresence mode="wait">
          {phase === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5"
            >
              <p className="font-extrabold text-[rgb(var(--kids-ink))] text-lg mb-4">
                {question[lang] || question.ro}
              </p>
              <div className="flex flex-col gap-3">
                {answers.map((ans, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    animate={wrongIdx === idx ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={[
                      'flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-colors active:scale-95',
                      wrongIdx === idx
                        ? 'border-[rgb(var(--kids-hint))] bg-[rgb(var(--kids-hint))]/10'
                        : 'border-[rgb(var(--kids-ink))]/15 bg-[rgb(var(--kids-paper))]',
                    ].join(' ')}
                  >
                    <span className="w-8 h-8 rounded-full bg-[rgb(var(--kids-cobalt))] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {ANSWER_LABELS[idx]}
                    </span>
                    <span className="text-[rgb(var(--kids-ink))] font-semibold text-base">
                      {ans.text[lang] || ans.text.ro}
                    </span>
                  </motion.button>
                ))}
              </div>
              {wrongIdx !== null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-[rgb(var(--kids-hint))] font-semibold text-center"
                >
                  {ui.tryAgain}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA button */}
        {phase === 'arrival' && (
          <button
            onClick={handleDiscoverClick}
            className="w-full py-4 rounded-2xl bg-[rgb(var(--kids-terracotta))] text-white font-extrabold text-xl shadow-lg active:scale-95 transition-transform"
          >
            {alreadyEarned ? ui.keepGoing : ui.earnStamp}
          </button>
        )}

        {(phase === 'correct' || (alreadyEarned && phase !== 'question')) && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl bg-[rgb(var(--kids-terracotta))] text-white font-extrabold text-xl shadow-lg active:scale-95 transition-transform"
          >
            {getNextStopId(kidsStops) ? ui.keepGoing : ui.finishPassport}
          </motion.button>
        )}
      </div>
    </div>
  );
}
