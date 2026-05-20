import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useMatch,
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
import { AdminQRPage } from './pages/admin/AdminQRPage';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SettingsProvider } from './context/SettingsContext';

function AppRoutes() {
  const location = useLocation();
  const isStopPage = useMatch('/tour/:tourId/stop/:stopId');
  const direction = (location.state as { direction?: number } | null)?.direction ?? 0;

  return (
    <>
      {!isStopPage && <Header />}
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tour/:tourId" element={<TourDetailPage />} />
          <Route path="/tour/:tourId/stop/:stopId" element={<StopPage />} />
          <Route path="/industry" element={<IndustryHubPage />} />
          <Route path="/industry/:sectionId" element={<IndustrySectionPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/admin/qr" element={<AdminQRPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {!isStopPage && <Navigation />}
    </>
  );
}

export function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <SettingsProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-museum-beige text-museum-walnut font-sans selection:bg-museum-moss/30">
            <AppRoutes />
          </div>
        </ErrorBoundary>
      </SettingsProvider>
    </Router>
  );
}
