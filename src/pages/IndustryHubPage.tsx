import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useIndustrySections } from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { getUI } from '../i18n/ui';
import { IndustrySectionCard } from '../components/IndustrySectionCard';

export function IndustryHubPage() {
  const { data: sections, loading } = useIndustrySections();
  const { language } = useSettings();
  const ui = getUI(language);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-24 pt-6 px-4 md:px-8 max-w-5xl mx-auto"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-museum-walnut/60 hover:text-museum-walnut mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        {ui.back}
      </Link>

      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <span className="bg-museum-moss text-museum-cream text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
            {ui.studyBadge}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-museum-walnut mb-2"
        >
          {ui.industryTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-museum-walnut/60 text-base"
        >
          {ui.industrySubtitle}
        </motion.p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-museum-walnut/10 rounded-xl h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <IndustrySectionCard key={section.id} section={section} index={index} />
            ))}
        </div>
      )}
    </motion.main>
  );
}
