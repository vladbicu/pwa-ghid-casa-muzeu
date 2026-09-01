import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useTours,
  useResumeTour,
  useTour,
  useStop,
  useThemes,
  getLocalizedText,
} from '../hooks/useData';
import { useSettings } from '../context/SettingsContext';
import { useTenant } from '../config/TenantContext';
import { getUI } from '../i18n/ui';
import { TourCard } from '../components/TourCard';
import { Play, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';

export function HomePage() {
  const { data: tours, loading } = useTours();
  const { data: themes } = useThemes();
  const { language } = useSettings();
  const tenant = useTenant();
  const ui = getUI(language);

  const resume = useResumeTour();
  const { data: resumeTour } = useTour(resume?.tourId);
  const { data: resumeStop } = useStop(resume?.stopId);
  const resumeStopTitle = resumeStop ? getLocalizedText(resumeStop.title, language) || '' : '';

  const totalStops = (tours ?? []).reduce((n, t) => n + t.stopIds.length, 0);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="pb-28 pt-1 px-5 max-w-2xl mx-auto flex flex-col gap-3.5"
    >
      {/* Greeting */}
      <div className="mb-1">
        <h2 className="font-heading text-[31px] leading-[1.08] text-museum-walnut mb-1.5">
          {ui.homeGreeting}
        </h2>
        <p className="text-[14px] leading-snug text-clay-700">
          {ui.homeGreetingSub(totalStops || 38)}
        </p>
      </div>

      {/* Resume banner */}
      {resume && resumeTour && (
        <Link
          to={`/tour/${resume.tourId}/stop/${resume.stopId}`}
          state={{ direction: 1 }}
          className="flex items-center gap-3 bg-sage-200 rounded-[20px] px-3.5 py-3"
        >
          <div className="w-[38px] h-[38px] rounded-full bg-sage-700 text-white flex items-center justify-center shrink-0">
            <Play size={14} fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-sage-800">
              {ui.continueTour}
            </div>
            <div className="text-[14px] font-bold truncate text-museum-walnut">
              {resumeStopTitle}
            </div>
          </div>
          <ChevronRight size={18} className="text-sage-800 shrink-0" />
        </Link>
      )}

      {/* Thematic category chips */}
      {tenant.features.thematicTours && themes.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
          {themes.map((theme) => (
            <Link
              key={theme.id}
              to={`/tour/thematic/${theme.id}`}
              className="shrink-0 whitespace-nowrap text-[12.5px] font-semibold px-3.5 py-2 rounded-full border-[1.5px] border-clay-300 text-museum-walnut hover:border-museum-walnut/40 transition-colors"
            >
              {getLocalizedText(theme.title, language) ?? theme.id}
            </Link>
          ))}
        </div>
      )}

      {/* Tour cards */}
      {loading ? (
        <div className="flex flex-col gap-3.5">
          {[0, 1].map((i) => (
            <div key={i} className="animate-pulse bg-museum-walnut/10 rounded-card h-52" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {(tours ?? []).map((tour, index) => (
            <TourCard
              key={tour.id}
              tour={tour}
              index={index}
              variant={index === 0 ? 'large' : 'compact'}
            />
          ))}
        </div>
      )}

      {/* Half-width context tiles */}
      <div className="flex gap-3">
        {tenant.features.contextIntro && (
          <ContextTile to="/intro" kicker="1775–1918" title={ui.aboutBukovina} img="/images/mock/Casa muzeu Putna-296.jpg" />
        )}
        {tenant.features.industrySection && (
          <ContextTile to="/industry" kicker={ui.industrySubtitle} title={ui.industryTitle} img="/images/industry/ciment/cover.jpg" />
        )}
      </div>

    </motion.main>
  );
}

function ContextTile({
  to,
  kicker,
  title,
  img,
}: {
  to: string;
  kicker: string;
  title: string;
  img: string;
}) {
  const [err, setErr] = useState(false);
  return (
    <Link
      to={to}
      className="relative flex-1 h-[104px] rounded-[22px] overflow-hidden bg-museum-walnut/30"
    >
      {!err && (
        <img
          src={asset(img)}
          alt=""
          onError={() => setErr(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(32,30,29,0.85), rgba(32,30,29,0.1))' }}
      />
      <div className="absolute left-3.5 right-3.5 bottom-3 text-museum-cream">
        <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] opacity-75">{kicker}</div>
        <div className="font-heading text-[15px] leading-tight">{title}</div>
      </div>
    </Link>
  );
}
