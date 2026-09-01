import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Stop } from '../types';
import { useSettings } from '../context/SettingsContext';
import { getLocalizedText } from '../hooks/useData';
import { getUI } from '../i18n/ui';
import { asset } from '../utils/asset';

interface StopCardProps {
  stop: Stop;
  tourId: string;
  index: number;
  isCurrent?: boolean;
  isResume?: boolean;
  themeId?: string;
}

export function StopCard({ stop, tourId, index, isCurrent = false, isResume = false, themeId }: StopCardProps) {
  const { language } = useSettings();
  const ui = getUI(language);
  const title = getLocalizedText(stop.title, language) || '';
  const mins = Math.ceil(stop.estSeconds / 60);

  const stopUrl = themeId
    ? `/tour/${tourId}/stop/${stop.id}?theme=${themeId}`
    : `/tour/${tourId}/stop/${stop.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link
        to={stopUrl}
        state={{ direction: 1 }}
        className="flex items-center gap-3 bg-clay-100 rounded-[20px] px-3.5 py-3 transition-transform duration-300 hover:-translate-y-px"
      >
        {isResume && stop.image ? (
          <img
            src={asset(stop.image)}
            alt=""
            className="w-11 h-11 rounded-thumb object-cover shrink-0"
          />
        ) : (
          <span
            className={`w-7 h-7 rounded-full text-[12.5px] font-bold flex items-center justify-center shrink-0 ${
              isCurrent ? 'bg-accent text-white' : 'bg-museum-sand text-clay-700'
            }`}
          >
            {index + 1}
          </span>
        )}

        <span className="flex-1 min-w-0 text-[14px] font-semibold text-museum-walnut truncate">
          {title}
        </span>

        {isResume ? (
          <span className="text-[11px] font-bold text-sage-800 bg-sage-200 rounded-full px-2.5 py-1 shrink-0">
            {ui.resumeShort}
          </span>
        ) : (
          <span className="text-[11.5px] text-clay-600 shrink-0">{ui.estTime(mins)}</span>
        )}
      </Link>
    </motion.div>
  );
}
