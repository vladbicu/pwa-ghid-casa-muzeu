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

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="relative flex gap-4 md:gap-6"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3 h-3 rounded-full bg-museum-walnut ring-4 ring-museum-beige mt-1 shrink-0 z-10" />
        {!isLast && <div className="w-0.5 flex-1 bg-museum-walnut/20 mt-1" />}
      </div>

      {/* Content */}
      <div className="pb-8 flex-1 min-w-0">
        <span className="inline-block bg-museum-walnut text-museum-cream text-xs font-bold px-3 py-1 rounded-full mb-2">
          {event.year}
        </span>
        <h3 className="font-bold text-museum-walnut text-base mb-2 leading-snug">{title}</h3>
        {isEmpty ? (
          <p className="text-museum-walnut/30 text-sm italic">— conținut în curs de completare —</p>
        ) : (
          <p className="text-museum-walnut/70 text-sm leading-relaxed">{body}</p>
        )}
        {event.image && !imgError && (
          <img
            src={asset(event.image)}
            alt={title}
            onError={() => setImgError(true)}
            className="mt-3 rounded-xl w-full max-w-sm object-cover h-40"
          />
        )}
      </div>
    </motion.div>
  );
}
