'use client';

import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    VanillaTilt.init(el, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      perspective: 1000,
      scale: 1.02,
    });

    return () => {
      const tiltEl = el as unknown as { vanillaTilt?: { destroy: () => void } };
      if (tiltEl.vanillaTilt) {
        tiltEl.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div ref={tiltRef} className={className} data-testid="tilt-card">
      {children}
    </div>
  );
}
