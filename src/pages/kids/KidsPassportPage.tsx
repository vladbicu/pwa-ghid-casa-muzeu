import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKidsProgress } from '../../context/KidsProgressContext';
import { useStops } from '../../hooks/useData';
import { getLocalizedText } from '../../hooks/useData';
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

function StampSlot({ stop, earned, lang }: { stop: Stop; earned: boolean; lang: Lang }) {
  const Icon = ICON_MAP[stop.kids!.stampIcon] ?? HelpCircle;
  const label = (getLocalizedText(stop.title, lang) ?? '').split(':')[0].trim();
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={[
          'w-16 h-16 rounded-full flex items-center justify-center transition-all',
          earned
            ? 'bg-[rgb(var(--kids-cobalt))] shadow-md'
            : 'border-2 border-dashed border-[rgb(var(--kids-ink))]/25 bg-[rgb(var(--kids-parchment))]',
        ].join(' ')}
      >
        {earned
          ? <Icon size={28} className="text-white" strokeWidth={1.5} />
          : <HelpCircle size={20} className="text-[rgb(var(--kids-ink))]/20" strokeWidth={1.5} />
        }
      </div>
      <span className={[
        'text-[10px] font-bold text-center leading-tight max-w-[64px]',
        earned ? 'text-[rgb(var(--kids-ink))]/70' : 'text-[rgb(var(--kids-ink))]/25',
      ].join(' ')}>
        {earned ? label : '?'}
      </span>
    </div>
  );
}

export function KidsPassportPage() {
  const navigate = useNavigate();
  const { progress, getNextStopId } = useKidsProgress();
  const { data: allStops } = useStops();

  if (!progress) {
    navigate('/pasaportul-exploratorului', { replace: true });
    return null;
  }

  const lang: Lang = progress.language ?? 'ro';
  const ui = getKidsUI(lang);

  const kidsStops: Stop[] = (allStops ?? [])
    .filter(s => s.kids?.include)
    .sort((a, b) => a.kids!.order - b.kids!.order);

  const earned = progress.earnedStopIds;
  const total = kidsStops.length;
  const count = earned.length;
  const isComplete = count === total;

  function handleNext() {
    if (isComplete) {
      navigate('/pasaportul-exploratorului/complet');
      return;
    }
    const nextId = getNextStopId(kidsStops);
    if (nextId) navigate(`/pasaportul-exploratorului/oprire/${nextId}`);
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--kids-parchment))] flex flex-col font-[Nunito,Outfit,sans-serif]">
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-4">
        <button
          onClick={() => navigate('/pasaportul-exploratorului')}
          className="text-[rgb(var(--kids-ink))]/50 font-semibold text-sm"
        >
          ← Înapoi
        </button>
        <h1 className="font-extrabold text-[rgb(var(--kids-ink))] text-lg">{ui.myPassport}</h1>
        <span className="text-sm font-bold text-[rgb(var(--kids-terracotta))]">
          {count}/{total} ✦
        </span>
      </div>

      {/* passport spread */}
      <div className="mx-4 rounded-2xl shadow-xl overflow-hidden flex" style={{ background: '#FFFAF0', minHeight: 260 }}>
        {/* left page */}
        <div className="flex-1 p-5 border-r-2 border-dashed border-[rgb(var(--kids-ink))]/10 flex flex-col items-center justify-center gap-3">
          <div className="text-5xl">
            {progress.ageGroup === '6-8' ? '🌱' : progress.ageGroup === '9-11' ? '🎒' : '🔭'}
          </div>
          <p className="font-extrabold text-[rgb(var(--kids-ink))] text-base text-center leading-tight">
            {progress.explorerName}
          </p>
          <p className="text-[rgb(var(--kids-ink))]/40 text-xs font-semibold text-center">
            {getExplorerTitle(ui, progress.gender ?? 'boy')}
          </p>
          <div className="mt-2 px-3 py-1 rounded-full bg-[rgb(var(--kids-gold))]/20 border border-[rgb(var(--kids-gold))]/40">
            <p className="text-[rgb(var(--kids-ink))]/60 text-xs font-bold">
              {count} / {total} {ui.stampsProgress}
            </p>
          </div>
        </div>

        {/* right page — stamp grid */}
        <div className="flex-1 p-4 flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-3 place-items-center">
            {kidsStops.map(stop => (
              <StampSlot
                key={stop.id}
                stop={stop}
                earned={earned.includes(stop.id)}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="mx-4 mt-4">
        <div className="h-2.5 bg-[rgb(var(--kids-ink))]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[rgb(var(--kids-gold))] rounded-full transition-all duration-500"
            style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
          />
        </div>
        <p className="text-center text-xs text-[rgb(var(--kids-ink))]/40 font-semibold mt-1">
          {isComplete ? ui.passportComplete : `${total - count} ${ui.stampsRemaining}`}
        </p>
      </div>

      {/* CTA */}
      <div className="px-4 mt-6 pb-10">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-[rgb(var(--kids-terracotta))] text-white font-extrabold text-xl shadow-lg active:scale-95 transition-transform"
        >
          {isComplete ? ui.seeFullPassport : count === 0 ? ui.startAdventure : ui.continueAdventure}
        </button>
      </div>
    </div>
  );
}
