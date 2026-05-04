import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  teaser?: string;
}

export function Accordion({ title, children, defaultOpen = false, teaser }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-museum-walnut/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between p-4 bg-museum-sand/50 hover:bg-museum-sand transition-colors text-left gap-3"
      >
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-museum-walnut block">{title}</span>
          {teaser && !isOpen && (
            <p className="text-xs text-museum-walnut/50 mt-0.5 line-clamp-2 font-normal">
              {teaser}
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown size={20} className="text-museum-walnut/60" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 bg-museum-cream/50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
