'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRandomQuote } from '@/hooks';

interface RandomQuoteDisplayProps {
  autoRotate?: boolean;
  rotateInterval?: number;
  className?: string;
}

/**
 * Komponen untuk menampilkan random quote dengan animasi
 * Cocok untuk diletakkan di footer atau section dekoratif
 */
export function RandomQuoteDisplay({
  autoRotate = true,
  rotateInterval = 30000,
  className = '',
}: RandomQuoteDisplayProps) {
  const { quote, nextQuote } = useRandomQuote(autoRotate, rotateInterval);
  const [mounted, setMounted] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update key saat quote berubah
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [quote]);

  if (!mounted) return null;

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-neutral-light italic">
            &ldquo;{quote.text}&rdquo;
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Manual rotate button */}
      {!autoRotate && (
        <button
          onClick={nextQuote}
          className="mt-2 text-xs text-primary hover:text-primary-dark transition-colors"
        >
          Quote lain →
        </button>
      )}
    </div>
  );
}
