import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { TourDetailPage } from './pages/TourDetailPage';
import { StopPage } from './pages/StopPage';
import { SettingsProvider } from './context/SettingsContext';

function AppRoutes() {
  const location = useLocation();
  // Don't show header/nav on StopPage for immersive feel
  const isStopPage = location.pathname.includes('/stop/');

  return (
    <>
      {!isStopPage && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tour/:tourId" element={<TourDetailPage />} />
        <Route path="/tour/:tourId/stop/:stopId" element={<StopPage />} />
        <Route
          path="*"
          element={<div className="p-8 text-center">Pagina nu a fost găsită</div>}
        />
      </Routes>

      {!isStopPage && <Navigation />}
    </>
  );
}

export function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <SettingsProvider>
        <div className="min-h-screen bg-museum-beige text-museum-walnut font-sans selection:bg-museum-moss/30">
          <AppRoutes />
        </div>
      </SettingsProvider>
    </Router>
  );
}
