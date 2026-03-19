'use client';

import { useState, useCallback, useEffect } from 'react';

interface VisitedSectionsReturn {
  visitedSections: Set<string>;
  markAsVisited: (sectionId: string) => void;
  isVisited: (sectionId: string) => boolean;
  visitedCount: number;
  totalSections: number;
  allVisited: boolean;
}

const SECTIONS = ['beranda', 'tentang', 'skill', 'proyek', 'pengalaman', 'kontak'];
const STORAGE_KEY = 'portfolio_visited_sections';

/**
 * Hook untuk tracking section yang sudah dikunjungi
 * Data di-persist di sessionStorage
 */
export function useVisitedSections(): VisitedSectionsReturn {
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  // Load dari sessionStorage saat mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setVisitedSections(new Set(parsed));
      }
    } catch {
      // Ignore errors
    }
  }, []);

  // Save ke sessionStorage saat berubah
  useEffect(() => {
    if (visitedSections.size > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(visitedSections)));
      } catch {
        // Ignore errors
      }
    }
  }, [visitedSections]);

  const markAsVisited = useCallback((sectionId: string) => {
    setVisitedSections((prev) => {
      if (prev.has(sectionId)) return prev;
      const newSet = new Set(prev);
      newSet.add(sectionId);
      return newSet;
    });
  }, []);

  const isVisited = useCallback(
    (sectionId: string) => visitedSections.has(sectionId),
    [visitedSections]
  );

  return {
    visitedSections,
    markAsVisited,
    isVisited,
    visitedCount: visitedSections.size,
    totalSections: SECTIONS.length,
    allVisited: visitedSections.size >= SECTIONS.length,
  };
}

export default useVisitedSections;
