'use client';

import { useState, useCallback, useEffect } from 'react';
import quotes, { Quote } from '@/data/quotes';

interface UseRandomQuoteReturn {
  quote: Quote;
  nextQuote: () => void;
  previousQuote: () => void;
}

/**
 * Hook untuk mendapatkan random quote tanpa repeat
 * @param autoRotate - Apakah auto-rotate ke quote berikutnya
 * @param rotateInterval - Interval rotasi dalam ms (default: 30000)
 */
export function useRandomQuote(
  autoRotate: boolean = false,
  rotateInterval: number = 30000
): UseRandomQuoteReturn {
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return Math.floor(Math.random() * quotes.length);
  });

  const getRandomIndex = useCallback((excludeIndex: number | null): number => {
    if (quotes.length === 1) return 0;

    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === excludeIndex);

    return newIndex;
  }, []);

  const nextQuote = useCallback(() => {
    setLastIndex(currentIndex);
    setCurrentIndex(getRandomIndex(currentIndex));
  }, [currentIndex, getRandomIndex]);

  const previousQuote = useCallback(() => {
    if (lastIndex !== null) {
      setCurrentIndex(lastIndex);
      setLastIndex(null);
    }
  }, [lastIndex]);

  // Auto-rotate jika diaktifkan
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      nextQuote();
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotateInterval, nextQuote]);

  return {
    quote: quotes[currentIndex],
    nextQuote,
    previousQuote,
  };
}

export default useRandomQuote;
