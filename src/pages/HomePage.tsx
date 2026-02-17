import React from 'react';
import { useTours } from '../hooks/useData';
import { TourCard } from '../components/TourCard';
import { motion } from 'framer-motion';

export function HomePage() {
  const tours = useTours();

  return (
    <main className="pb-24 pt-6 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <motion.h2
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-3xl md:text-4xl font-bold text-museum-walnut mb-3"
        >
          Ghid Casa Muzeu
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.1,
          }}
          className="text-museum-walnut/70 text-lg max-w-2xl"
        >
          Selectează un tur pentru a începe ghidajul.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {tours.map((tour, index) => (
          <TourCard key={tour.id} tour={tour} index={index} />
        ))}
      </div>
    </main>
  );
}
