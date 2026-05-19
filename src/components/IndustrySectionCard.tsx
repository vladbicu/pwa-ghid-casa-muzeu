import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { IndustrySection } from '../types';
import { useSettings } from '../context/SettingsContext';
import { getLocalizedText } from '../hooks/useData';
import { getUI } from '../i18n/ui';
import { asset } from '../utils/asset';

interface IndustrySectionCardProps {
  section: IndustrySection;
  index: number;
}

export function IndustrySectionCard({ section, index }: IndustrySectionCardProps) {
  const { language } = useSettings();
  const ui = getUI(language);
  const [imgError, setImgError] = useState(false);

  const title = getLocalizedText(section.title, language) ?? section.title.ro;
  const description = getLocalizedText(section.description, language) ?? section.description.ro;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        to={`/industry/${section.id}`}
        className="group block bg-museum-cream rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative h-40 bg-museum-sand overflow-hidden">
          {!imgError && (
            <img
              src={asset(section.image)}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-museum-walnut/60 to-transparent" />
          <div className="absolute top-3 right-3">
            <span className="bg-museum-moss text-museum-cream text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
              {ui.studyBadge}
            </span>
          </div>
          <div className="absolute bottom-3 left-4">
            <span className="text-museum-cream/80 text-xs font-medium">{section.period}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-museum-walnut text-lg leading-tight mb-1 group-hover:text-museum-moss transition-colors">
            {title}
          </h3>
          <p className="text-museum-walnut/60 text-sm line-clamp-2 mb-3">{description}</p>
          <div className="flex items-center justify-between text-xs text-museum-walnut/50">
            <span>{section.events.length} {ui.timeline.toLowerCase()}</span>
            <ArrowRight size={14} className="text-museum-moss group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
