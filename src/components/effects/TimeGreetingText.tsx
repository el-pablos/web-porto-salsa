'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeGreeting } from '@/hooks';

interface TimeGreetingTextProps {
  className?: string;
  showEmoji?: boolean;
  showContextual?: boolean;
}

/**
 * Komponen yang menampilkan greeting berdasarkan waktu
 * dengan animasi transisi smooth
 */
export function TimeGreetingText({
  className = '',
  showEmoji = false,
  showContextual = false,
}: TimeGreetingTextProps) {
  const greeting = useTimeGreeting();
  const [mounted, setMounted] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update key saat greeting berubah untuk trigger animasi
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [greeting.greeting]);

  if (!mounted) {
    // Return placeholder untuk prevent hydration mismatch
    return <span className={className}>Halo</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={key}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {greeting.greeting}
        </motion.span>
      </AnimatePresence>

      {showEmoji && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
        >
          {greeting.emoji}
        </motion.span>
      )}

      {showContextual && (
        <motion.span
          className="text-sm text-neutral-soft ml-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {greeting.contextualMessage}
        </motion.span>
      )}
    </span>
  );
}
