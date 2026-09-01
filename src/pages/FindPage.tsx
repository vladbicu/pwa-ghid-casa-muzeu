import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  useTours,
  useStops,
  useIndustrySections,
  findStopByCode,
  findSectionByCode,
  getLocalizedText,
} from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';

export function FindPage() {
  const { language } = useSettings();
  const ui = getUI(language);
  const navigate = useNavigate();

  const { data: stopsData, loading: stopsLoading } = useStops();
  const { data: toursData, loading: toursLoading } = useTours();
  const { data: sections, loading: sectionsLoading } = useIndustrySections();
  const loading = stopsLoading || toursLoading || sectionsLoading;

  const stops = useMemo(() => stopsData ?? [], [stopsData]);
  const tours = useMemo(() => toursData ?? [], [toursData]);

  const [input, setInput] = useState('');
  const [shaking, setShaking] = useState(false);

  const allCodes = useMemo(() => {
    const codes: number[] = [];
    for (const s of stops) if (s.shortCode !== undefined) codes.push(s.shortCode);
    for (const sec of sections) if (sec.shortCode !== undefined) codes.push(sec.shortCode);
    return codes;
  }, [stops, sections]);

  // Live resolution — what the current input points at, before navigating.
  const resolvedLabel = useMemo(() => {
    if (!input) return '';
    const num = parseInt(input, 10);
    if (isNaN(num)) return '';
    const hit = findStopByCode(num, stops, tours);
    if (hit) return getLocalizedText(hit.stop.title, language) || '';
    const sec = findSectionByCode(num, sections);
    if (sec) return getLocalizedText(sec.title, language) || '';
    return '';
  }, [input, stops, tours, sections, language]);

  const tryNavigate = (code: string) => {
    const num = parseInt(code, 10);
    if (isNaN(num)) return false;
    const stopResult = findStopByCode(num, stops, tours);
    if (stopResult) {
      navigate(`/tour/${stopResult.tourId}/stop/${stopResult.stop.id}`);
      return true;
    }
    const section = findSectionByCode(num, sections);
    if (section) {
      navigate(`/industry/${section.id}`);
      return true;
    }
    return false;
  };

  const shake = () => {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      setInput('');
    }, 400);
  };

  const handleDigit = (d: number) => {
    if (shaking || input.length >= 2) return;
    const newInput = input + d.toString();
    setInput(newInput);
    const hasExtension =
      newInput.length === 1 &&
      allCodes.some((c) => c.toString().length > 1 && c.toString().startsWith(newInput));
    if (!hasExtension) {
      if (!tryNavigate(newInput)) shake();
    }
  };

  const handleBackspace = () => {
    if (shaking) return;
    setInput((prev) => prev.slice(0, -1));
  };

  const digits = [input[0] ?? '', input[1] ?? ''];

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-museum-beige pb-28 pt-16 px-6 max-w-sm mx-auto flex flex-col items-center"
    >
      <h1 className="font-heading text-[27px] leading-[1.1] text-museum-walnut mb-1.5 text-center">
        {ui.findPageTitle}
      </h1>
      <p className="text-[14px] text-clay-700 mb-6 text-center">{ui.findPageSubtitle}</p>

      {/* Digit slots */}
      <motion.div
        animate={shaking ? { x: [-8, 8, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className="flex gap-3 justify-center"
      >
        {digits.map((d, i) => (
          <span
            key={i}
            className={`w-16 h-[78px] rounded-[22px] bg-clay-100 shadow-sm flex items-center justify-center font-heading text-[36px] transition-colors ${
              shaking ? 'text-accent-700' : d ? 'text-museum-walnut' : 'text-clay-400'
            }`}
          >
            {d || (i === 0 ? '0' : '')}
          </span>
        ))}
      </motion.div>

      <div className="h-6 mt-3 text-center">
        {shaking ? (
          <span className="text-[13px] font-bold text-accent-700">{ui.findCodeNotFound}</span>
        ) : resolvedLabel ? (
          <span className="text-[13px] font-bold text-accent-700">{resolvedLabel}</span>
        ) : loading ? (
          <span className="text-xs text-clay-500">…</span>
        ) : null}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3.5 mt-4 w-full max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => handleDigit(n)}
            className="aspect-square rounded-full bg-clay-100 shadow-sm font-heading text-[28px] text-museum-walnut active:scale-95 transition-transform"
          >
            {n}
          </button>
        ))}
        <span />
        <button
          onClick={() => handleDigit(0)}
          className="aspect-square rounded-full bg-clay-100 shadow-sm font-heading text-[28px] text-museum-walnut active:scale-95 transition-transform"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          aria-label="⌫"
          className="aspect-square rounded-full bg-museum-sand text-clay-700 flex items-center justify-center active:scale-95 transition-transform"
        >
          <Delete size={22} strokeWidth={2.5} />
        </button>
      </div>

      <p className="text-center text-[12.5px] text-clay-600 mt-6">{ui.scanQrHint}</p>
    </motion.main>
  );
}
