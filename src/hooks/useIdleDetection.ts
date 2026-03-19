'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook untuk mendeteksi user idle (tidak ada interaksi)
 * @param idleTimeout - Waktu dalam ms sebelum dianggap idle (default: 30000)
 */
export function useIdleDetection(idleTimeout: number = 30000) {
  const [isIdle, setIsIdle] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const resetActivity = useCallback(() => {
    setLastActivity(Date.now());
    setIsIdle(false);
  }, []);

  useEffect(() => {
    // Events yang menandakan aktivitas user
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click'];

    // Handler untuk reset activity
    const handleActivity = () => {
      resetActivity();
    };

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Check idle status setiap 1 detik
    const idleChecker = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;
      if (timeSinceActivity >= idleTimeout && !isIdle) {
        setIsIdle(true);
      }
    }, 1000);

    return () => {
      // Cleanup
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(idleChecker);
    };
  }, [idleTimeout, lastActivity, isIdle, resetActivity]);

  return { isIdle, lastActivity, resetActivity };
}

export default useIdleDetection;
