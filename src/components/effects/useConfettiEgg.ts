'use client';

import { useState, useCallback } from 'react';

export function useConfettiEgg(threshold = 5) {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = useCallback(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= threshold) {
      setClickCount(0);

      import('canvas-confetti').then(({ default: confetti }) => {
        const duration = 2500;
        const end = Date.now() + duration;

        const colors = ['#FF99C8', '#CFBAF0', '#9ED2D6', '#FCB1D1', '#FFF9E1'];

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
            shapes: ['star', 'circle'],
            scalar: 0.9,
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
            shapes: ['star', 'circle'],
            scalar: 0.9,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };

        frame();
      });
    }
  }, [clickCount, threshold]);

  return { handleClick, clickCount };
}
