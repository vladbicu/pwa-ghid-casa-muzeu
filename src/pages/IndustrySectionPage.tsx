import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useIndustrySection, getLocalizedText } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { TimelineEvent } from '../components/TimelineEvent';
import { asset } from '../utils/asset';

export function IndustrySectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = useIndustrySection(sectionId);
  const { language } = useSettings();
  const ui = getUI(language);
  const [imgError, setImgError] = useState(false);

  if (!section) {
    return (
      <div className="p-8 text-center text-museum-walnut/60">
        <p>{ui.stopNotFound}</p>
        <Link to="/industry" className="text-museum-moss underline mt-2 inline-block">
          {ui.backToIndustry}
        </Link>
      </div>
    );
  }

  const title = getLocalizedText(section.title, language) ?? section.title.ro;
  const description = getLocalizedText(section.description, language) ?? section.description.ro;

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-24"
    >
      {/* Hero */}
      <div className="relative h-52 md:h-64 bg-museum-sand overflow-hidden">
        {!imgError && (
          <img
            src={asset(section.image)}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-museum-walnut/70 via-museum-walnut/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-museum-cream/70 text-xs font-semibold uppercase tracking-widest mb-1 block">
            {section.period}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-museum-cream leading-tight">{title}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 pt-6">
        <Link
          to="/industry"
          className="inline-flex items-center gap-1 text-sm text-museum-walnut/60 hover:text-museum-walnut mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          {ui.backToIndustry}
        </Link>

        <p className="text-museum-walnut/70 text-sm leading-relaxed mb-8 pb-8 border-b border-museum-walnut/10">
          {description}
        </p>

        <h2 className="text-xs font-bold uppercase tracking-widest text-museum-walnut/40 mb-6">
          {ui.timeline}
        </h2>

        {/* Timeline */}
        <div>
          {section.events.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              language={language}
              index={index}
              isLast={index === section.events.length - 1}
            />
          ))}
        </div>
      </div>
    </motion.main>
  );
}
