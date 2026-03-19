'use client';

import { useState, useEffect, useCallback } from 'react';

interface TimeGreeting {
  greeting: string;
  emoji: string;
  contextualMessage: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night' | 'latenight';
}

/**
 * Hook untuk mendapatkan greeting berdasarkan waktu lokal user
 * Update otomatis setiap 1 menit
 */
export function useTimeGreeting(): TimeGreeting {
  const getGreeting = useCallback((): TimeGreeting => {
    const hour = new Date().getHours();

    // Pagi (04:00 - 10:59)
    if (hour >= 4 && hour < 11) {
      return {
        greeting: 'Selamat Pagi',
        emoji: '🌅',
        contextualMessage: 'Siap memulai hari produktif?',
        period: 'morning',
      };
    }

    // Siang (11:00 - 14:59)
    if (hour >= 11 && hour < 15) {
      return {
        greeting: 'Selamat Siang',
        emoji: '☀️',
        contextualMessage: 'Lagi cari inspirasi?',
        period: 'afternoon',
      };
    }

    // Sore (15:00 - 17:59)
    if (hour >= 15 && hour < 18) {
      return {
        greeting: 'Selamat Sore',
        emoji: '🌇',
        contextualMessage: 'Waktunya review hasil kerja!',
        period: 'evening',
      };
    }

    // Malam (18:00 - 21:59)
    if (hour >= 18 && hour < 22) {
      return {
        greeting: 'Selamat Malam',
        emoji: '🌙',
        contextualMessage: 'Masih semangat explore?',
        period: 'night',
      };
    }

    // Larut malam (22:00 - 03:59)
    return {
      greeting: 'Halo Night Owl',
      emoji: '🦉',
      contextualMessage: 'Wow, kamu dedicated banget!',
      period: 'latenight',
    };
  }, []);

  const [greeting, setGreeting] = useState<TimeGreeting>(getGreeting);

  useEffect(() => {
    // Update greeting setiap 1 menit
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, [getGreeting]);

  return greeting;
}

export default useTimeGreeting;
