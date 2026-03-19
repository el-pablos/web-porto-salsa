'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface HeartBurstProps {
  triggerOnClick?: boolean;
  maxParticles?: number;
}

const HEART_COLORS = ['#FF99C8', '#E94E89', '#FCB1D1', '#F1C0E8', '#CFBAF0'];

/**
 * Komponen yang menampilkan efek heart particles
 * burst ketika user klik di halaman
 */
export function HeartBurst({
  triggerOnClick = true,
  maxParticles = 50,
}: HeartBurstProps) {
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const particleIdRef = useRef(0);

  useEffect(() => {
    setMounted(true);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const createParticles = useCallback(
    (x: number, y: number, count: number = 5) => {
      if (prefersReducedMotion) return;

      const newParticles: HeartParticle[] = [];

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: particleIdRef.current++,
          x: x + (Math.random() - 0.5) * 40,
          y: y + (Math.random() - 0.5) * 40,
          size: 12 + Math.random() * 16,
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        });
      }

      setParticles((prev) => {
        const combined = [...prev, ...newParticles];
        // Limit particles
        if (combined.length > maxParticles) {
          return combined.slice(-maxParticles);
        }
        return combined;
      });

      // Auto-remove particles after animation
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, 2000);
    },
    [maxParticles, prefersReducedMotion]
  );

  useEffect(() => {
    if (!mounted || !triggerOnClick || prefersReducedMotion) return;

    const handleClick = (e: MouseEvent) => {
      // Only trigger on left click
      if (e.button !== 0) return;

      // Skip if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        return;
      }

      createParticles(e.clientX, e.clientY, 3);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [mounted, triggerOnClick, createParticles, prefersReducedMotion]);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            initial={{
              scale: 0,
              opacity: 1,
              y: 0,
              rotate: Math.random() * 60 - 30,
            }}
            animate={{
              scale: [0, 1.2, 1, 0.8],
              opacity: [1, 1, 0.8, 0],
              y: -100 - Math.random() * 50,
              rotate: Math.random() * 360,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              ease: 'easeOut',
            }}
          >
            <HeartSVG size={particle.size} color={particle.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function HeartSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ filter: `drop-shadow(0 2px 4px ${color}50)` }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
