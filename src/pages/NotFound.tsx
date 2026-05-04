import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-museum-beige flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="bg-museum-cream rounded-2xl shadow-warm-lg p-10 max-w-md w-full border border-museum-walnut/10">
        <p className="text-7xl font-bold text-museum-walnut/15 mb-4">404</p>
        <h1 className="text-2xl font-bold text-museum-walnut mb-2">Pagina nu există</h1>
        <p className="text-museum-walnut/60 mb-8">Pagina pe care o cauți nu a fost găsită.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-museum-walnut text-museum-cream px-6 py-3 rounded-full font-semibold shadow-warm hover:bg-museum-walnut/90 transition-all"
        >
          <Home size={18} /> Tururi
        </Link>
      </div>
    </motion.div>
  );
}
