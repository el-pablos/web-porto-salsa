'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EggProps {
  id: number;
  x: number;
}

interface ChickenEggLayerProps {
  chickenX: number;
  onEggCollected?: () => void;
}

/**
 * Komponen untuk menampilkan telur yang diletakkan oleh ayam
 * Telur akan muncul dan bisa diklik untuk dikumpulkan
 */
export function ChickenEggLayer({
  chickenX,
  onEggCollected,
}: ChickenEggLayerProps) {
  const [eggs, setEggs] = useState<EggProps[]>([]);
  const eggIdRef = useRef(0);

  const layEgg = useCallback(() => {
    const newEgg: EggProps = {
      id: eggIdRef.current++,
      x: chickenX + 15, // Offset from chicken position
    };

    setEggs((prev) => {
      // Max 10 eggs on screen
      if (prev.length >= 10) {
        return [...prev.slice(1), newEgg];
      }
      return [...prev, newEgg];
    });

    // Auto-remove egg after 15 seconds if not collected
    setTimeout(() => {
      setEggs((prev) => prev.filter((e) => e.id !== newEgg.id));
    }, 15000);
  }, [chickenX]);

  const collectEgg = useCallback(
    (eggId: number) => {
      setEggs((prev) => prev.filter((e) => e.id !== eggId));
      onEggCollected?.();
    },
    [onEggCollected]
  );

  return {
    eggs,
    layEgg,
    collectEgg,
    EggDisplay: () => (
      <AnimatePresence>
        {eggs.map((egg) => (
          <motion.div
            key={egg.id}
            className="fixed bottom-4 z-39 cursor-pointer"
            style={{ left: egg.x }}
            initial={{ scale: 0, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => collectEgg(egg.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Klik untuk mengumpulkan telur!"
          >
            <EggSVG />
          </motion.div>
        ))}
      </AnimatePresence>
    ),
  };
}

/**
 * Hook untuk mengelola egg laying easter egg pada WalkingChicken
 */
export function useChickenEggLaying(threshold: number = 10) {
  const [clickCount, setClickCount] = useState(0);
  const [eggsLaid, setEggsLaid] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleClick = useCallback(
    (onLayEgg: () => void) => {
      const newCount = clickCount + 1;
      setClickCount(newCount);

      // Show hint after 5 clicks
      if (newCount >= 5 && newCount < threshold) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 1500);
      }

      // Lay egg when threshold reached
      if (newCount >= threshold) {
        setClickCount(0);
        setEggsLaid((prev) => prev + 1);
        onLayEgg();
      }
    },
    [clickCount, threshold]
  );

  return {
    clickCount,
    eggsLaid,
    showHint,
    hintMessage: threshold - clickCount <= 5 ? `${threshold - clickCount} more...` : '',
    handleClick,
  };
}

function EggSVG() {
  return (
    <svg width="30" height="40" viewBox="0 0 30 40">
      {/* Egg shape */}
      <ellipse cx="15" cy="22" rx="13" ry="18" fill="#FCB1D1" />
      <ellipse cx="15" cy="22" rx="13" ry="18" fill="url(#eggGradient)" />

      {/* Gradient */}
      <defs>
        <radialGradient id="eggGradient" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFF9E1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FCB1D1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Stroke */}
      <ellipse
        cx="15"
        cy="22"
        rx="12"
        ry="17"
        fill="none"
        stroke="#FF99C8"
        strokeWidth="2"
      />

      {/* Decorative spots */}
      <circle cx="10" cy="18" r="2" fill="#CFBAF0" opacity="0.5" />
      <circle cx="18" cy="25" r="1.5" fill="#9ED2D6" opacity="0.5" />
      <circle cx="12" cy="28" r="1" fill="#CFBAF0" opacity="0.5" />

      {/* Shine */}
      <ellipse cx="10" cy="14" rx="3" ry="4" fill="white" opacity="0.3" />
    </svg>
  );
}
