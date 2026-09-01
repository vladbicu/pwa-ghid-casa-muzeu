import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { TenantProvider } from './config/TenantContext';
// Self-hosted fonts so the PWA renders correctly on a cold offline load.
// Bree Serif — headings/buttons/numerals; verified full Romanian coverage (ș ț ă).
// Figtree — body text.
import '@fontsource/bree-serif/400.css';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/600.css';
import '@fontsource/figtree/700.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TenantProvider>
      <App />
    </TenantProvider>
  </React.StrictMode>
);
