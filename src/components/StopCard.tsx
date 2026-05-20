import React from 'react';
import { Play, CheckCircle2, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Stop, StopType } from '../types';
import { useSettings } from '../context/SettingsContext';
import { getLocalizedText } from '../hooks/useData';
import { getUI } from '../i18n/ui';
import { asset } from '../utils/asset';

interface StopCardProps {
  stop: Stop;
  tourId: string;
  index: number;
  isCompleted?: boolean;
  themeId?: string;
}

const typeBadgeStyle: Record<StopType, string> = {
  intro: 'bg-museum-moss text-museum-cream',
  room: 'bg-museum-walnut/80 text-museum-cream',
  object: 'bg-amber-700 text-white',
  collection: 'bg-slate-600 text-white',
};

export function StopCard({ stop, tourId, index, isCompleted = false, themeId }: StopCardProps) {
  const { language, viewMode } = useSettings();
  const ui = getUI(language);
  const title = getLocalizedText(stop.title, language) || '';
  const keyPoints = getLocalizedText(stop.keyPoints, language) || [];
  const questions = getLocalizedText(stop.questions, language) || [];
  const description = keyPoints[0] || '';

  const formatTime = (seconds: number) => {
    const mins = Math.ceil(seconds / 60);
    return ui.estTime(mins);
  };

  const stopUrl = themeId
    ? `/tour/${tourId}/stop/${stop.id}?theme=${themeId}`
    : `/tour/${tourId}/stop/${stop.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={stopUrl}
        className="flex items-center gap-4 p-4 bg-museum-cream rounded-xl shadow-warm border border-museum-walnut/5 hover:border-museum-moss/30 hover:shadow-md transition-all duration-300 group active:scale-[0.99]"
      >
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-museum-walnut/10">
            {stop.image && (
              <img
                src={asset(stop.image)}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}
          </div>
          {/* Stop number badge */}
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-museum-walnut text-museum-cream text-xs font-bold flex items-center justify-center rounded-full shadow-sm border border-museum-cream">
            {index + 1}
          </div>
          {/* Stop type badge */}
          <div className={`absolute -bottom-1 -right-1 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md shadow-sm ${typeBadgeStyle[stop.type]}`}>
            {ui.stopTypeLabel(stop.type)}
          </div>
          {/* Questions badge — guide mode only */}
          {viewMode === 'guide' && questions.length > 0 && (
            <div className="absolute -top-1 -right-1 flex items-center gap-0.5 bg-museum-moss text-museum-cream text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
              <MessageCircleQuestion size={10} />
              {questions.length}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-museum-walnut text-base leading-tight mb-1 truncate group-hover:text-museum-moss transition-colors">
            {title}
          </h4>
          <p className="text-sm text-museum-walnut/70 line-clamp-1">
            {description}
          </p>
          <p className="text-xs text-museum-walnut/50 mt-1">
            {formatTime(stop.estSeconds)}
          </p>
        </div>

        <div className="shrink-0 text-museum-moss opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
          {isCompleted ? (
            <CheckCircle2 size={24} />
          ) : (
            <Play size={24} fill="currentColor" />
          )}
        </div>
      </Link>
    </motion.div>
  );
}
