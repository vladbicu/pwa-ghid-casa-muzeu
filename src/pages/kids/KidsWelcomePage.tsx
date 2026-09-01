import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useKidsProgress } from '../../context/KidsProgressContext';
import { getKidsUI } from '../../i18n/ui';
import type { AgeGroup, Lang } from '../../types';

const AGE_GROUPS: { id: AgeGroup; emoji: string }[] = [
  { id: '6-8',   emoji: '🌱' },
  { id: '9-11',  emoji: '🎒' },
  { id: '12-14', emoji: '🔭' },
];

const AGE_LABELS: Record<AgeGroup, string> = {
  '6-8':   '6–8 ani',
  '9-11':  '9–11 ani',
  '12-14': '12–14 ani',
};

const AGE_DESCS: Record<AgeGroup, string> = {
  '6-8':   'Mic explorator',
  '9-11':  'Explorator',
  '12-14': 'Explorator senior',
};

const LANG_CHIPS: { id: Lang; flag: string; label: string }[] = [
  { id: 'ro', flag: '🇷🇴', label: 'RO' },
  { id: 'en', flag: '🇬🇧', label: 'EN' },
  { id: 'fr', flag: '🇫🇷', label: 'FR' },
  { id: 'it', flag: '🇮🇹', label: 'IT' },
];

const NAME_DEFAULTS: Record<Lang, { boy: string; girl: string }> = {
  ro: { boy: 'Explorator',  girl: 'Exploratoare' },
  en: { boy: 'Explorer',    girl: 'Explorer'      },
  fr: { boy: 'Explorateur', girl: 'Exploratrice'  },
  it: { boy: 'Esploratore', girl: 'Esploratrice'  },
};

export function KidsWelcomePage() {
  const navigate = useNavigate();
  const { progress, startAdventure, resetProgress } = useKidsProgress();

  const [lang, setLang]       = useState<Lang>('ro');
  const [selected, setSelected] = useState<AgeGroup | null>(null);
  const [gender, setGender]   = useState<'boy' | 'girl' | null>(null);
  const [name, setName]       = useState('');

  const ui = getKidsUI(lang);

  function handleLangChange(l: Lang) {
    setLang(l);
    if (gender) setName(NAME_DEFAULTS[l][gender]);
  }

  function handleGenderSelect(g: 'boy' | 'girl') {
    setGender(g);
    setName(NAME_DEFAULTS[lang][g]);
  }

  function handleStart() {
    if (!selected || !gender) return;
    const defaultName = NAME_DEFAULTS[lang][gender];
    startAdventure(selected, name.trim() || defaultName, lang, gender);
    navigate('/pasaportul-exploratorului/pasaport');
  }

  function handleContinue() {
    navigate('/pasaportul-exploratorului/pasaport');
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--kids-parchment))] flex flex-col items-center px-4 py-8 font-[Nunito,Outfit,sans-serif]">
      {/* decorative top border */}
      <div className="w-full h-3 bg-[rgb(var(--kids-terracotta))] rounded-full mb-1" />
      <div className="w-3/4 h-1.5 bg-[rgb(var(--kids-gold))] rounded-full mb-6" />

      {/* language picker */}
      <div className="w-full max-w-sm mb-6">
        <p className="text-[rgb(var(--kids-ink))]/50 text-xs font-bold uppercase tracking-wide mb-2 text-center">
          {ui.chooseLanguage}
        </p>
        <div className="flex gap-2 justify-center">
          {LANG_CHIPS.map(chip => (
            <button
              key={chip.id}
              onClick={() => handleLangChange(chip.id)}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-extrabold transition-all',
                lang === chip.id
                  ? 'bg-[rgb(var(--kids-terracotta))] text-white shadow-md'
                  : 'bg-[rgb(var(--kids-paper))] text-[rgb(var(--kids-ink))]/60 border border-[rgb(var(--kids-ink))]/10',
              ].join(' ')}
            >
              <span>{chip.flag}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* passport cover */}
      <div
        className="w-64 h-80 rounded-xl shadow-2xl flex flex-col items-center justify-center gap-3 mb-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #8B4513 0%, #5C2E00 100%)' }}
      >
        <div className="absolute inset-2 border-2 border-[#D4A855] rounded-lg opacity-60" />
        <div className="text-5xl">🏛️</div>
        <div className="text-center px-4">
          <p className="text-[#F5EDD4] font-bold text-sm leading-tight">Pașaportul</p>
          <p className="text-[#D4A855] font-extrabold text-base leading-tight">Exploratorilor</p>
          <p className="text-[#F5EDD4] font-bold text-sm leading-tight">Bucovinei</p>
        </div>
        <div className="text-[#D4A855] text-xs font-semibold tracking-widest opacity-80">
          CASA MUZEU ✦ PUTNA
        </div>
      </div>

      {/* returning visitor shortcut */}
      {progress && progress.earnedStopIds.length > 0 && (
        <div className="w-full max-w-sm mb-6 p-4 bg-[rgb(var(--kids-paper))] rounded-2xl shadow-md border-2 border-[rgb(var(--kids-gold))]">
          <p className="text-[rgb(var(--kids-ink))] font-bold text-center mb-1">
            {ui.welcomeBack}, {progress.explorerName}! 👋
          </p>
          <p className="text-[rgb(var(--kids-ink))]/60 text-sm text-center mb-3">
            {progress.earnedStopIds.length} {ui.stampsCollected}.
          </p>
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-xl bg-[rgb(var(--kids-terracotta))] text-white font-extrabold text-lg active:scale-95 transition-transform"
          >
            {ui.continueAdventure}
          </button>
          <button
            onClick={resetProgress}
            className="w-full mt-2 py-2 text-[rgb(var(--kids-ink))]/40 text-sm font-medium"
          >
            {ui.startOver}
          </button>
        </div>
      )}

      {/* new adventure form */}
      {(!progress || progress.earnedStopIds.length === 0) && (
        <div className="w-full max-w-sm">
          <p className="text-[rgb(var(--kids-ink))] font-bold text-xl text-center mb-6">
            {ui.chooseExplorer}
          </p>

          {/* age group picker */}
          <div className="flex flex-col gap-3 mb-6">
            {AGE_GROUPS.map(g => (
              <button
                key={g.id}
                onClick={() => setSelected(g.id)}
                className={[
                  'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-95',
                  selected === g.id
                    ? 'border-[rgb(var(--kids-terracotta))] bg-[rgb(var(--kids-terracotta))]/10 shadow-md'
                    : 'border-[rgb(var(--kids-ink))]/15 bg-[rgb(var(--kids-paper))]',
                ].join(' ')}
              >
                <span className="text-3xl">{g.emoji}</span>
                <div className="text-left">
                  <p className="font-extrabold text-[rgb(var(--kids-ink))] text-base">{AGE_LABELS[g.id]}</p>
                  <p className="text-[rgb(var(--kids-ink))]/50 text-sm">{AGE_DESCS[g.id]}</p>
                </div>
                {selected === g.id && (
                  <span className="ml-auto text-[rgb(var(--kids-terracotta))] font-bold text-xl">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* gender picker */}
          <p className="text-[rgb(var(--kids-ink))]/60 text-sm font-bold mb-3 text-center">
            {ui.chooseGender}
          </p>
          <div className="flex gap-3 mb-6">
            {(['boy', 'girl'] as const).map(g => (
              <button
                key={g}
                onClick={() => handleGenderSelect(g)}
                className={[
                  'flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95',
                  gender === g
                    ? 'border-[rgb(var(--kids-terracotta))] bg-[rgb(var(--kids-terracotta))]/10 shadow-md'
                    : 'border-[rgb(var(--kids-ink))]/15 bg-[rgb(var(--kids-paper))]',
                ].join(' ')}
              >
                <span className="text-2xl">{g === 'boy' ? '👦' : '👧'}</span>
                <span className="font-extrabold text-[rgb(var(--kids-ink))] text-base">
                  {g === 'boy' ? ui.boy : ui.girl}
                </span>
              </button>
            ))}
          </div>

          {/* name input */}
          <div className="mb-6">
            <label className="block text-[rgb(var(--kids-ink))]/60 text-sm font-semibold mb-1 pl-1">
              {ui.yourName}
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--kids-paper))] border-2 border-[rgb(var(--kids-ink))]/15 text-[rgb(var(--kids-ink))] font-bold text-base focus:outline-none focus:border-[rgb(var(--kids-terracotta))]"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={!selected || !gender}
            className={[
              'w-full py-4 rounded-2xl font-extrabold text-xl transition-all',
              selected && gender
                ? 'bg-[rgb(var(--kids-terracotta))] text-white shadow-lg active:scale-95'
                : 'bg-[rgb(var(--kids-ink))]/10 text-[rgb(var(--kids-ink))]/30 cursor-not-allowed',
            ].join(' ')}
          >
            {ui.openPassport}
          </button>
        </div>
      )}

      {/* decorative bottom border */}
      <div className="mt-auto pt-8 flex flex-col items-center gap-1">
        <div className="w-3/4 h-1.5 bg-[rgb(var(--kids-gold))] rounded-full" />
        <div className="w-full h-3 bg-[rgb(var(--kids-terracotta))] rounded-full" />
      </div>
    </div>
  );
}
