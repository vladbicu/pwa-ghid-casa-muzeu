import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useIndustrySection, useIndustrySections, getLocalizedText } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { TimelineEvent } from '../components/TimelineEvent';
import { asset } from '../utils/asset';

export function IndustrySectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { data: section, loading } = useIndustrySection(sectionId);
  const { data: allSections } = useIndustrySections();
  const { language } = useSettings();
  const ui = getUI(language);
  const [imgError, setImgError] = useState(false);

  if (loading) {
    return (
      <div className="pb-28">
        <div className="animate-pulse bg-museum-walnut/10 h-[230px]" />
        <div className="max-w-2xl mx-auto px-5 pt-6 space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-museum-walnut/10 rounded-[20px] h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="p-8 text-center text-clay-600">
        <p>{ui.stopNotFound}</p>
        <Link to="/industry" className="text-accent-700 underline mt-2 inline-block">
          {ui.backToIndustry}
        </Link>
      </div>
    );
  }

  const title = getLocalizedText(section.title, language) ?? section.title.ro;
  const description = getLocalizedText(section.description, language) ?? section.description.ro;
  const siblings = allSections.filter((s) => s.id !== section.id);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-museum-beige pb-28"
    >
      {/* Hero */}
      <div className="relative h-[230px] w-full overflow-hidden bg-museum-walnut/20">
        {!imgError && (
          <img
            src={asset(section.image)}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(32,30,29,0.5), rgba(32,30,29,0.15) 55%)' }}
        />
        <Link
          to="/industry"
          aria-label={ui.backToIndustry}
          className="absolute top-14 left-[18px] w-10 h-10 rounded-full bg-museum-cream/92 flex items-center justify-center text-museum-walnut"
        >
          <ArrowLeft size={19} strokeWidth={2.75} />
        </Link>
      </div>

      {/* Sheet */}
      <div className="relative z-[1] -mt-[30px] rounded-t-sheet bg-museum-beige px-5 pt-6 max-w-2xl mx-auto">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-accent-700 mb-1.5">
          {section.period}
        </div>
        <h1 className="font-heading text-[27px] leading-[1.1] text-museum-walnut mb-2">{title}</h1>
        <p className="text-[13.5px] leading-normal text-clay-700 mb-6">{description}</p>

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

        {siblings.length > 0 && (
          <div className="flex gap-2.5 mt-4">
            {siblings.map((s) => (
              <Link
                key={s.id}
                to={`/industry/${s.id}`}
                className="flex-1 text-center border-[1.5px] border-clay-300 rounded-full py-3.5 font-heading text-[15px] text-museum-walnut"
              >
                {getLocalizedText(s.title, language) ?? s.id}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.main>
  );
}
