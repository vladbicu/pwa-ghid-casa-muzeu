import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  useTours,
  useStops,
  useIndustrySections,
  findStopByCode,
  findSectionByCode,
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

  const stops = stopsData ?? [];
  const tours = toursData ?? [];

  const [input, setInput] = useState('');
  const [shaking, setShaking] = useState(false);

  // All valid shortCodes for extension check
  const allCodes = useMemo(() => {
    const codes: number[] = [];
    for (const s of stops) if (s.shortCode !== undefined) codes.push(s.shortCode);
    for (const sec of sections) if (sec.shortCode !== undefined) codes.push(sec.shortCode);
    return codes;
  }, [stops, sections]);

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

    // Auto-navigate if no valid code could extend this prefix further
    const hasExtension =
      newInput.length === 1 &&
      allCodes.some((c) => c.toString().length > 1 && c.toString().startsWith(newInput));

    if (!hasExtension) {
      if (!tryNavigate(newInput)) {
        shake();
      }
    }
  };

  const handleBackspace = () => {
    if (shaking) return;
    setInput((prev) => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    if (shaking || !input) return;
    if (!tryNavigate(input)) {
      shake();
    }
  };

  const keypadRows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-24 pt-8 px-4 max-w-sm mx-auto flex flex-col items-center"
    >
      <h1 className="text-xl font-bold text-museum-walnut mb-1">{ui.findPageTitle}</h1>
      <p className="text-sm text-museum-walnut/60 mb-8 text-center">{ui.findPageSubtitle}</p>

      {/* Code display */}
      <motion.div
        animate={shaking ? { x: [-8, 8, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8 w-full flex flex-col items-center"
      >
        <div
          className={`font-mono text-[72px] leading-none font-bold tracking-widest min-w-[4ch] text-center transition-colors ${
            shaking ? 'text-red-500' : 'text-museum-walnut'
          }`}
        >
          {input || '—'}
        </div>
        {shaking && (
          <p className="text-sm text-red-500 mt-2 font-medium">{ui.findCodeNotFound}</p>
        )}
        {loading && !shaking && (
          <p className="text-xs text-museum-walnut/40 mt-2">…</p>
        )}
      </motion.div>

      {/* Keypad */}
      <div className="w-full max-w-[280px]">
        <div className="grid grid-cols-3 gap-3 mb-3">
          {keypadRows.flat().map((n) => (
            <button
              key={n}
              onClick={() => handleDigit(n)}
              className="h-16 rounded-2xl bg-museum-cream border border-museum-walnut/10 text-museum-walnut text-2xl font-semibold shadow-warm hover:bg-museum-sand active:scale-95 transition-all"
            >
              {n}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleBackspace}
            className="h-16 rounded-2xl bg-museum-cream border border-museum-walnut/10 text-museum-walnut/60 shadow-warm hover:bg-museum-sand active:scale-95 transition-all flex items-center justify-center"
          >
            <Delete size={22} />
          </button>
          <button
            onClick={() => handleDigit(0)}
            className="h-16 rounded-2xl bg-museum-cream border border-museum-walnut/10 text-museum-walnut text-2xl font-semibold shadow-warm hover:bg-museum-sand active:scale-95 transition-all"
          >
            0
          </button>
          <button
            onClick={handleConfirm}
            className="h-16 rounded-2xl bg-museum-moss text-museum-cream shadow-warm hover:bg-museum-moss/90 active:scale-95 transition-all flex items-center justify-center"
          >
            <Check size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.main>
  );
}
