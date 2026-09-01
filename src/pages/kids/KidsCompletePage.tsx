import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useKidsProgress } from '../../context/KidsProgressContext';
import { useStops, getLocalizedText } from '../../hooks/useData';
import { getKidsUI, getExplorerTitle } from '../../i18n/ui';
import type { Lang, Stop } from '../../types';
import {
  Home, Grid3X3, Flame, BedDouble, Star, Armchair,
  UtensilsCrossed, Package, Building2, Hammer, HelpCircle,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Home, Grid3x3: Grid3X3, Flame, BedDouble, Star, Armchair,
  UtensilsCrossed, Package, Building2, Hammer,
};

const COMPLETION_GREETING: Record<Lang, { boy: string; girl: string }> = {
  ro: {
    boy:  'Ești un adevărat explorator al Bucovinei!',
    girl: 'Ești o adevărată exploratoare a Bucovinei!',
  },
  en: {
    boy:  "You're a true Bukovina Explorer!",
    girl: "You're a true Bukovina Explorer!",
  },
  fr: {
    boy:  'Tu es un vrai explorateur de Bucovine!',
    girl: 'Tu es une vraie exploratrice de Bucovine!',
  },
  it: {
    boy:  'Sei un vero esploratore della Bucovina!',
    girl: 'Sei una vera esploratrice della Bucovina!',
  },
};

const CONFETTI_SHAPES = ['◆', '◇', '✦', '✧', '◈'];
const CONFETTI_COLORS = [
  'text-[#D95F3B]', 'text-[#F2A227]', 'text-[#1D4E89]',
  'text-[#27AE60]', 'text-[#C0392B]',
];

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className={`absolute text-lg ${CONFETTI_COLORS[i % CONFETTI_COLORS.length]}`}
          style={{ left: `${(i * 37 + 5) % 95}%`, top: '-8%' }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)], opacity: [1, 0.6, 0] }}
          transition={{ duration: 2.5 + (i % 4) * 0.4, delay: i * 0.1, repeat: Infinity, ease: 'linear' }}
        >
          {CONFETTI_SHAPES[i % CONFETTI_SHAPES.length]}
        </motion.span>
      ))}
    </div>
  );
}

function StampIcon({ stop, lang }: { stop: Stop; lang: Lang }) {
  const Icon = ICON_MAP[stop.kids!.stampIcon] ?? HelpCircle;
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', delay: stop.kids!.order * 0.08 }}
      className="flex flex-col items-center gap-1"
    >
      <div className="w-12 h-12 rounded-full bg-[rgb(var(--kids-cobalt))] flex items-center justify-center shadow-md">
        <Icon size={22} className="text-white" strokeWidth={1.5} />
      </div>
      <span className="text-[9px] font-bold text-[rgb(var(--kids-ink))]/60 text-center max-w-[48px] leading-tight">
        {(getLocalizedText(stop.title, lang) ?? '').split(':')[0].trim()}
      </span>
    </motion.div>
  );
}

export function KidsCompletePage() {
  const navigate = useNavigate();
  const { progress, resetProgress } = useKidsProgress();
  const { data: allStops } = useStops();

  if (!progress) {
    navigate('/pasaportul-exploratorului', { replace: true });
    return null;
  }

  const lang: Lang = progress.language ?? 'ro';
  const ui = getKidsUI(lang);
  const gender = progress.gender ?? 'boy';
  const greeting = COMPLETION_GREETING[lang][gender];

  const kidsStops: Stop[] = (allStops ?? [])
    .filter(s => s.kids?.include)
    .sort((a, b) => a.kids!.order - b.kids!.order);

  return (
    <div className="relative min-h-screen bg-[rgb(var(--kids-parchment))] flex flex-col items-center px-5 py-8 font-[Nunito,Outfit,sans-serif] overflow-hidden">
      <Confetti />

      {/* decorative top border */}
      <div className="w-full h-3 bg-[rgb(var(--kids-terracotta))] rounded-full mb-1" />
      <div className="w-3/4 h-1.5 bg-[rgb(var(--kids-gold))] rounded-full mb-6" />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-extrabold text-[rgb(var(--kids-ink))] text-3xl text-center mb-2"
      >
        {ui.congratulations}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[rgb(var(--kids-ink))]/70 text-center font-semibold text-base mb-1"
      >
        {ui.exploredHouse}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[rgb(var(--kids-terracotta))] font-extrabold text-lg text-center mb-6"
      >
        {greeting}
      </motion.p>

      {/* complete passport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-[rgb(var(--kids-paper))] rounded-3xl shadow-xl p-5 mb-6 relative"
      >
        {/* COMPLET seal */}
        <div className="absolute -top-4 -right-2 w-16 h-16 rounded-full bg-[rgb(var(--kids-gold))] flex items-center justify-center shadow-lg border-4 border-[rgb(var(--kids-terracotta))] rotate-12">
          <span className="text-white font-extrabold text-[9px] text-center leading-tight">
            COM<br />PLET
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">
            {progress.ageGroup === '6-8' ? '🌱' : progress.ageGroup === '9-11' ? '🎒' : '🔭'}
          </div>
          <div>
            <p className="font-extrabold text-[rgb(var(--kids-ink))] text-base">{progress.explorerName}</p>
            <p className="text-[rgb(var(--kids-ink))]/40 text-xs font-semibold">
              {getExplorerTitle(ui, gender)}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[rgb(var(--kids-terracotta))] font-extrabold text-sm">{kidsStops.length}/{kidsStops.length}</p>
            <p className="text-[rgb(var(--kids-ink))]/40 text-xs">{ui.stampsProgress}</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 place-items-center">
          {kidsStops.map(stop => (
            <StampIcon key={stop.id} stop={stop} lang={lang} />
          ))}
        </div>
      </motion.div>

      {/* show guide CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={() => {/* just a display action */}}
        className="w-full py-5 rounded-2xl bg-[rgb(var(--kids-terracotta))] text-white font-extrabold text-xl shadow-lg active:scale-95 transition-transform mb-3"
      >
        {ui.showGuide}
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => { resetProgress(); navigate('/pasaportul-exploratorului'); }}
        className="text-[rgb(var(--kids-ink))]/40 font-semibold text-sm"
      >
        {ui.newAdventure}
      </motion.button>

      {/* decorative bottom border */}
      <div className="mt-auto pt-6 w-full flex flex-col items-center gap-1">
        <div className="w-3/4 h-1.5 bg-[rgb(var(--kids-gold))] rounded-full" />
        <div className="w-full h-3 bg-[rgb(var(--kids-terracotta))] rounded-full" />
      </div>
    </div>
  );
}
