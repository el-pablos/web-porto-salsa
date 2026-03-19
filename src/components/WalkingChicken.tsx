"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

interface ChickenState {
  x: number;
  direction: "left" | "right";
  isWalking: boolean;
  isPecking: boolean;
}

interface EggProps {
  id: number;
  x: number;
}

const EGG_THRESHOLD = 10; // Klik 10 kali untuk lay egg

export function WalkingChicken() {
  const [chicken, setChicken] = useState<ChickenState>({
    x: 100,
    direction: "right",
    isWalking: true,
    isPecking: false,
  });
  const [isClient, setIsClient] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [eggs, setEggs] = useState<EggProps[]>([]);
  const [eggsCollected, setEggsCollected] = useState(0);
  const eggIdRef = { current: 0 };
  const controls = useAnimationControls();

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Random behavior: walk, stop, peck
  const randomBehavior = useCallback(() => {
    const behaviors = ["walk", "stop", "peck", "turn"];
    const randomChoice =
      behaviors[Math.floor(Math.random() * behaviors.length)];

    switch (randomChoice) {
      case "walk":
        setChicken((prev) => ({ ...prev, isWalking: true, isPecking: false }));
        break;
      case "stop":
        setChicken((prev) => ({ ...prev, isWalking: false, isPecking: false }));
        break;
      case "peck":
        setChicken((prev) => ({ ...prev, isWalking: false, isPecking: true }));
        setTimeout(() => {
          setChicken((prev) => ({ ...prev, isPecking: false }));
        }, 1000);
        break;
      case "turn":
        setChicken((prev) => ({
          ...prev,
          direction: prev.direction === "left" ? "right" : "left",
        }));
        break;
    }
  }, []);

  // Walking animation
  useEffect(() => {
    if (!isClient) return;

    const walkInterval = setInterval(() => {
      if (chicken.isWalking && !chicken.isPecking) {
        setChicken((prev) => {
          const speed = 3;
          const newX =
            prev.direction === "right" ? prev.x + speed : prev.x - speed;
          const maxX =
            typeof window !== "undefined" ? window.innerWidth - 80 : 1000;

          // Turn around at edges
          if (newX <= 20) {
            return { ...prev, x: 20, direction: "right" };
          }
          if (newX >= maxX) {
            return { ...prev, x: maxX, direction: "left" };
          }

          return { ...prev, x: newX };
        });
      }
    }, 50);

    return () => clearInterval(walkInterval);
  }, [chicken.isWalking, chicken.isPecking, chicken.direction, isClient]);

  // Random behavior trigger
  useEffect(() => {
    if (!isClient) return;

    const behaviorInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        randomBehavior();
      }
    }, 2000);

    return () => clearInterval(behaviorInterval);
  }, [randomBehavior, isClient]);

  // Pecking animation
  useEffect(() => {
    if (chicken.isPecking) {
      controls.start({
        rotate: [0, 30, 0, 30, 0],
        transition: { duration: 0.5, repeat: 1 },
      });
    }
  }, [chicken.isPecking, controls]);

  // Lay egg function
  const layEgg = useCallback(() => {
    const newEgg: EggProps = {
      id: eggIdRef.current++,
      x: chicken.x + 15,
    };

    setEggs((prev) => {
      if (prev.length >= 10) {
        return [...prev.slice(1), newEgg];
      }
      return [...prev, newEgg];
    });

    // Auto-remove egg after 15 seconds
    setTimeout(() => {
      setEggs((prev) => prev.filter((e) => e.id !== newEgg.id));
    }, 15000);
  }, [chicken.x]);

  // Collect egg function
  const collectEgg = useCallback((eggId: number) => {
    setEggs((prev) => prev.filter((e) => e.id !== eggId));
    setEggsCollected((prev) => prev + 1);
  }, []);

  // Handle chicken click
  const handleChickenClick = useCallback(() => {
    // Jump animation
    controls.start({
      y: [0, -30, 0],
      transition: { duration: 0.4, ease: "easeOut" },
    });

    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Show hint after 5 clicks
    if (newCount >= 5 && newCount < EGG_THRESHOLD) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 1500);
    }

    // Lay egg when threshold reached
    if (newCount >= EGG_THRESHOLD) {
      setClickCount(0);
      layEgg();
    }
  }, [clickCount, controls, layEgg]);

  if (!isClient) return null;

  return (
    <>
      {/* Eggs */}
      <AnimatePresence>
        {eggs.map((egg) => (
          <motion.div
            key={egg.id}
            className="fixed bottom-4 z-39 cursor-pointer"
            style={{ left: egg.x }}
            initial={{ scale: 0, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => collectEgg(egg.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Klik untuk mengumpulkan telur!"
          >
            <EggSVG />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Chicken */}
      <motion.div
        className="fixed bottom-4 z-40 cursor-pointer select-none"
        style={{ left: chicken.x }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onClick={handleChickenClick}
        title="Klik untuk lompat! (10x untuk telur)"
      >
        {/* Hint bubble */}
        {showHint && (
          <motion.span
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-primary whitespace-nowrap bg-white/90 px-2 py-1 rounded-full shadow-soft"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {EGG_THRESHOLD - clickCount} more...
          </motion.span>
        )}
      <motion.div
        animate={controls}
        style={{
          transform: chicken.direction === "left" ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        {/* Chicken SVG */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 100 100"
          className="drop-shadow-lg"
        >
          {/* Body */}
          <ellipse
            cx="50"
            cy="60"
            rx="30"
            ry="25"
            fill="#FCD34D"
            stroke="#F59E0B"
            strokeWidth="2"
          />

          {/* Wing */}
          <motion.ellipse
            cx="40"
            cy="60"
            rx="15"
            ry="12"
            fill="#FBBF24"
            stroke="#F59E0B"
            strokeWidth="1"
            animate={chicken.isWalking ? { rotate: [0, 5, 0, -5, 0] } : {}}
            transition={{ duration: 0.3, repeat: Infinity }}
          />

          {/* Head */}
          <motion.g
            animate={
              chicken.isPecking
                ? {
                    rotate: [0, 20, 0, 20, 0],
                    originX: "50px",
                    originY: "40px",
                  }
                : {}
            }
            transition={{ duration: 0.3, repeat: chicken.isPecking ? 2 : 0 }}
          >
            <circle
              cx="70"
              cy="35"
              r="18"
              fill="#FCD34D"
              stroke="#F59E0B"
              strokeWidth="2"
            />

            {/* Comb */}
            <path
              d="M65 18 Q68 10 72 18 Q75 10 78 18 Q80 12 82 20 L82 25 Q72 22 65 25 Z"
              fill="#EF4444"
              stroke="#DC2626"
              strokeWidth="1"
            />

            {/* Beak */}
            <path
              d="M85 35 L98 38 L85 42 Z"
              fill="#F97316"
              stroke="#EA580C"
              strokeWidth="1"
            />

            {/* Eye */}
            <circle cx="75" cy="32" r="4" fill="#1F2937" />
            <circle cx="76" cy="31" r="1.5" fill="white" />

            {/* Wattle */}
            <ellipse
              cx="82"
              cy="45"
              rx="4"
              ry="6"
              fill="#EF4444"
              stroke="#DC2626"
              strokeWidth="1"
            />
          </motion.g>

          {/* Legs */}
          <motion.g
            animate={chicken.isWalking ? { rotate: [0, 15, 0, -15, 0] } : {}}
            transition={{ duration: 0.2, repeat: Infinity }}
            style={{ originX: "45px", originY: "80px" }}
          >
            <path
              d="M40 80 L35 95 M35 95 L28 98 M35 95 L35 100 M35 95 L42 98"
              stroke="#F97316"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          <motion.g
            animate={chicken.isWalking ? { rotate: [0, -15, 0, 15, 0] } : {}}
            transition={{ duration: 0.2, repeat: Infinity }}
            style={{ originX: "55px", originY: "80px" }}
          >
            <path
              d="M55 80 L55 95 M55 95 L48 98 M55 95 L55 100 M55 95 L62 98"
              stroke="#F97316"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* Tail feathers */}
          <path
            d="M20 50 Q10 45 15 55 Q8 52 18 60 Q12 60 20 65"
            fill="#FBBF24"
            stroke="#F59E0B"
            strokeWidth="1"
          />
        </svg>

        {/* Walking dust effect */}
        {chicken.isWalking && (
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1, 1.5] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-amber-200/50" />
          </motion.div>
        )}

        {/* Eggs collected counter */}
        {eggsCollected > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-soft"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {eggsCollected}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
    </>
  );
}

function EggSVG() {
  return (
    <svg width="30" height="40" viewBox="0 0 30 40" className="drop-shadow-md">
      {/* Egg shape */}
      <ellipse cx="15" cy="22" rx="13" ry="18" fill="#FCB1D1" />
      <ellipse cx="15" cy="22" rx="13" ry="18" fill="url(#eggGradientWC)" />

      {/* Gradient */}
      <defs>
        <radialGradient id="eggGradientWC" cx="30%" cy="30%" r="60%">
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
