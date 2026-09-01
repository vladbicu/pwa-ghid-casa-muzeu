import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useMatch,
  useNavigate,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { TourDetailPage } from './pages/TourDetailPage';
import { StopPage } from './pages/StopPage';
import { IndustryHubPage } from './pages/IndustryHubPage';
import { IndustrySectionPage } from './pages/IndustrySectionPage';
import { FindPage } from './pages/FindPage';
import { IntroPage, INTRO_SEEN_KEY } from './pages/IntroPage';
import { ThematicTourPage } from './pages/ThematicTourPage';
import { AdminQRPage } from './pages/admin/AdminQRPage';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SettingsProvider } from './context/SettingsContext';
import { KidsProgressProvider } from './context/KidsProgressContext';
import { useTenant } from './config/TenantContext';
import { KidsWelcomePage } from './pages/kids/KidsWelcomePage';
import { KidsPassportPage } from './pages/kids/KidsPassportPage';
import { KidsStopPage } from './pages/kids/KidsStopPage';
import { KidsCompletePage } from './pages/kids/KidsCompletePage';

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const isKidsRoute = useMatch('/pasaportul-exploratorului/*');
  // The redesign gives tour/stop/section/intro screens their own full-bleed
  // hero + back button — the app Header and bottom nav only belong on the
  // "hub" screens.
  const chromeRoutes = ['/', '/find', '/industry', '/admin/qr'];
  const showChrome = chromeRoutes.includes(location.pathname);
  const direction = (location.state as { direction?: number } | null)?.direction ?? 0;
  const tenant = useTenant();

  useEffect(() => {
    if (
      tenant.features.contextIntro &&
      location.pathname === '/' &&
      !localStorage.getItem(INTRO_SEEN_KEY)
    ) {
      navigate('/intro', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (isKidsRoute) {
      document.documentElement.classList.add('kids-mode');
    } else {
      document.documentElement.classList.remove('kids-mode');
    }
    return () => document.documentElement.classList.remove('kids-mode');
  }, [isKidsRoute]);

  const hideChrome = !showChrome || !!isKidsRoute;

  return (
    <>
      {!hideChrome && <Header />}
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tour/thematic/:themeId" element={<ThematicTourPage />} />
          <Route path="/tour/:tourId" element={<TourDetailPage />} />
          <Route path="/tour/:tourId/stop/:stopId" element={<StopPage />} />
          <Route path="/industry" element={<IndustryHubPage />} />
          <Route path="/industry/:sectionId" element={<IndustrySectionPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/admin/qr" element={<AdminQRPage />} />
          <Route path="/pasaportul-exploratorului" element={<KidsWelcomePage />} />
          <Route path="/pasaportul-exploratorului/pasaport" element={<KidsPassportPage />} />
          <Route path="/pasaportul-exploratorului/oprire/:stopId" element={<KidsStopPage />} />
          <Route path="/pasaportul-exploratorului/complet" element={<KidsCompletePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {!hideChrome && <Navigation />}
    </>
  );
}

export function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <SettingsProvider>
        <KidsProgressProvider>
          <ErrorBoundary>
            <div className="min-h-screen bg-museum-beige text-museum-walnut font-sans selection:bg-museum-moss/30">
              <AppRoutes />
            </div>
          </ErrorBoundary>
        </KidsProgressProvider>
      </SettingsProvider>
    </Router>
  );
}
