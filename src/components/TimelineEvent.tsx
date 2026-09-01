import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { IndustryEvent, Lang } from '../types';
import { getLocalizedText } from '../hooks/useData';
import { asset } from '../utils/asset';

interface TimelineEventProps {
  event: IndustryEvent;
  language: Lang;
  index: number;
  isLast: boolean;
}

export function TimelineEvent({ event, language, index, isLast }: TimelineEventProps) {
  const [imgError, setImgError] = useState(false);

  const title = getLocalizedText(event.title, language) ?? event.title.ro;
  const body = getLocalizedText(event.body, language) ?? event.body.ro;
  const isEmpty = !body || body === 'TODO';
  const active = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="flex gap-3.5"
    >
      {/* Gutter */}
      <div className="w-[22px] flex flex-col items-center shrink-0">
        <span
          className={`w-3 h-3 rounded-full mt-[5px] ${active ? 'bg-accent' : 'bg-clay-400'}`}
        />
        {!isLast && <span className="flex-1 w-[2px] bg-clay-300" />}
      </div>

      {/* Content */}
      <div className="pb-[18px] min-w-0">
        <div className={`font-heading text-[17px] ${active ? 'text-accent-700' : 'text-clay-600'}`}>
          {event.year}
        </div>
        <div className="text-[14.5px] font-bold text-museum-walnut mt-0.5">{title}</div>
        {isEmpty ? (
          <p className="text-clay-400 text-[13px] italic mt-1">— conținut în curs de completare —</p>
        ) : (
          <p className="text-[13px] leading-normal text-clay-700 mt-1">{body}</p>
        )}
        {event.image && !imgError && (
          <img
            src={asset(event.image)}
            alt={title}
            onError={() => setImgError(true)}
            className="mt-3 rounded-thumb w-full max-w-sm object-cover h-40"
          />
        )}
      </div>
    </motion.div>
  );
}
