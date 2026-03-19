'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { badges, Badge, AchievementState, initialAchievementState } from '@/data/badges';

interface AchievementContextType {
  state: AchievementState;
  unlockedBadges: Badge[];
  unlockBadge: (badgeId: string) => void;
  incrementStat: (stat: keyof AchievementState['stats'], value?: number) => void;
  addVisitedSection: (sectionId: string) => void;
  addHoveredProject: (projectTitle: string) => void;
  addHoveredSkill: (skillName: string) => void;
  checkAndUnlockBadges: () => void;
  getProgress: () => number;
}

const STORAGE_KEY = 'portfolio_achievements';

const AchievementContext = createContext<AchievementContextType | null>(null);

function loadFromStorage(): AchievementState {
  if (typeof window === 'undefined') return initialAchievementState;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...initialAchievementState,
        ...parsed,
        stats: {
          ...initialAchievementState.stats,
          ...parsed.stats,
        },
      };
    }
  } catch {
    // Ignore errors
  }
  return initialAchievementState;
}

function saveToStorage(state: AchievementState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore errors
  }
}

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AchievementState>(initialAchievementState);
  const [mounted, setMounted] = useState(false);

  // Load dari localStorage saat mount
  useEffect(() => {
    setState(loadFromStorage());
    setMounted(true);
  }, []);

  // Save ke localStorage saat state berubah
  useEffect(() => {
    if (mounted) {
      saveToStorage(state);
    }
  }, [state, mounted]);

  const unlockBadge = useCallback((badgeId: string) => {
    setState((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
      };
    });
  }, []);

  const incrementStat = useCallback((stat: keyof AchievementState['stats'], value: number = 1) => {
    setState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: typeof prev.stats[stat] === 'number'
          ? (prev.stats[stat] as number) + value
          : value,
      },
    }));
  }, []);

  const addVisitedSection = useCallback((sectionId: string) => {
    setState((prev) => {
      if (prev.stats.sectionsVisited.includes(sectionId)) return prev;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          sectionsVisited: [...prev.stats.sectionsVisited, sectionId],
        },
      };
    });
  }, []);

  const addHoveredProject = useCallback((projectTitle: string) => {
    setState((prev) => {
      if (prev.stats.projectsHovered.includes(projectTitle)) return prev;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          projectsHovered: [...prev.stats.projectsHovered, projectTitle],
        },
      };
    });
  }, []);

  const addHoveredSkill = useCallback((skillName: string) => {
    setState((prev) => {
      if (prev.stats.skillsHovered.includes(skillName)) return prev;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          skillsHovered: [...prev.stats.skillsHovered, skillName],
        },
      };
    });
  }, []);

  const checkAndUnlockBadges = useCallback(() => {
    const { stats, badges: unlockedBadgeIds } = state;

    // First Steps - pertama kali berkunjung
    if (!unlockedBadgeIds.includes('first-steps')) {
      unlockBadge('first-steps');
    }

    // Section Hopper - kunjungi 6 section
    if (stats.sectionsVisited.length >= 6 && !unlockedBadgeIds.includes('section-hopper')) {
      unlockBadge('section-hopper');
    }

    // Deep Diver - scroll sampai footer
    if (stats.scrolledToFooter && !unlockedBadgeIds.includes('deep-diver')) {
      unlockBadge('deep-diver');
    }

    // Clicker - 10 klik
    if (stats.totalClicks >= 10 && !unlockedBadgeIds.includes('clicker')) {
      unlockBadge('clicker');
    }

    // Chicken Friend - klik ayam 5x
    if (stats.chickenClicks >= 5 && !unlockedBadgeIds.includes('chicken-friend')) {
      unlockBadge('chicken-friend');
    }

    // Egg Hunter - kumpulkan 5 telur
    if (stats.eggsCollected >= 5 && !unlockedBadgeIds.includes('egg-hunter')) {
      unlockBadge('egg-hunter');
    }

    // Party Starter - trigger confetti
    if (stats.confettiTriggered && !unlockedBadgeIds.includes('party-starter')) {
      unlockBadge('party-starter');
    }

    // Connector - klik contact
    if (stats.contactClicked && !unlockedBadgeIds.includes('connector')) {
      unlockBadge('connector');
    }

    // Night Explorer - kunjungi jam 00:00 - 04:00
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 4 && !unlockedBadgeIds.includes('night-explorer')) {
      unlockBadge('night-explorer');
    }

    // Speed Reader - scroll ke footer dalam 30 detik
    if (stats.scrolledToFooter && stats.pageLoadTime) {
      const timeToFooter = Date.now() - stats.pageLoadTime;
      if (timeToFooter <= 30000 && !unlockedBadgeIds.includes('speed-reader')) {
        unlockBadge('speed-reader');
      }
    }

    // Project Enthusiast - hover semua project (4 projects)
    if (stats.projectsHovered.length >= 4 && !unlockedBadgeIds.includes('project-enthusiast')) {
      unlockBadge('project-enthusiast');
    }

    // Skill Checker - hover semua skill (16 skills)
    if (stats.skillsHovered.length >= 16 && !unlockedBadgeIds.includes('skill-checker')) {
      unlockBadge('skill-checker');
    }
  }, [state, unlockBadge]);

  // Check badges setiap kali state berubah
  useEffect(() => {
    if (mounted) {
      checkAndUnlockBadges();
    }
  }, [state.stats, mounted, checkAndUnlockBadges]);

  // Set page load time saat mount
  useEffect(() => {
    if (mounted && !state.stats.pageLoadTime) {
      setState((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          pageLoadTime: Date.now(),
        },
      }));
    }
  }, [mounted, state.stats.pageLoadTime]);

  const unlockedBadges = badges.filter((b) => state.badges.includes(b.id));

  const getProgress = useCallback(() => {
    return Math.round((state.badges.length / badges.length) * 100);
  }, [state.badges.length]);

  return (
    <AchievementContext.Provider
      value={{
        state,
        unlockedBadges,
        unlockBadge,
        incrementStat,
        addVisitedSection,
        addHoveredProject,
        addHoveredSkill,
        checkAndUnlockBadges,
        getProgress,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
}
