"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface WalkingChickenProps {
  /** Ukuran ayam dalam pixel (default: 70) */
  size?: number;
  /** Opacity ayam (default: 0.75) */
  opacity?: number;
  /** Durasi satu kali jalan dari kiri ke kanan dalam detik (default: 25) */
  walkDuration?: number;
  /** Jarak dari bottom viewport dalam pixel (default: 80) */
  bottomOffset?: number;
}

/**
 * Ayam pixel/chibi yang berjalan horizontal dari kiri ke kanan
 * Posisi di bottom viewport, di atas footer
 * Hidden di mobile (< 768px)
 */
export function WalkingChicken({
  size = 70,
  opacity = 0.75,
  walkDuration = 25,
  bottomOffset = 80,
}: WalkingChickenProps) {
  const [frame, setFrame] = useState(0);
  const controls = useAnimationControls();

  // Animasi walking sprite (3 frame)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 3);
    }, 150); // Ganti frame setiap 150ms

    return () => clearInterval(interval);
  }, []);

  // Animasi berjalan dari kiri ke kanan
  useEffect(() => {
    const startWalking = async () => {
      // Loop infinite
      while (true) {
        // Reset ke kiri
        await controls.set({ x: -size });
        // Jalan ke kanan
        await controls.start({
          x: typeof window !== "undefined" ? window.innerWidth + size : 1920,
          transition: {
            duration: walkDuration,
            ease: "linear",
          },
        });
      }
    };

    startWalking();
  }, [controls, size, walkDuration]);

  return (
    <motion.div
      className="fixed pointer-events-none z-40 hidden md:block"
      style={{
        bottom: bottomOffset,
        left: 0,
        opacity,
      }}
      animate={controls}
      aria-hidden="true"
    >
      <ChickenSprite frame={frame} size={size} />
    </motion.div>
  );
}

interface ChickenSpriteProps {
  frame: number;
  size: number;
}

/**
 * SVG Sprite ayam pixel/chibi dengan 3 frame animasi
 * Warna: Pink (#FF99C8) dan Lavender (#CFBAF0)
 */
function ChickenSprite({ frame, size }: ChickenSpriteProps) {
  // Posisi kaki berdasarkan frame untuk animasi jalan
  const legOffsets = [
    { left: 0, right: 0 }, // Frame 0: Kedua kaki di tengah
    { left: -2, right: 2 }, // Frame 1: Kaki kiri maju, kanan mundur
    { left: 2, right: -2 }, // Frame 2: Kaki kanan maju, kiri mundur
  ];

  const currentLeg = legOffsets[frame];

  // Bounce effect saat jalan
  const bodyBounce = frame === 1 ? -1 : frame === 2 ? -1 : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `translateY(${bodyBounce}px)` }}
    >
      {/* Shadow */}
      <ellipse cx="32" cy="58" rx="14" ry="4" fill="#3D3040" opacity="0.15" />

      {/* Tail feathers */}
      <g>
        <ellipse
          cx="14"
          cy="32"
          rx="6"
          ry="10"
          fill="#FF99C8"
          transform="rotate(-20 14 32)"
        />
        <ellipse
          cx="12"
          cy="30"
          rx="4"
          ry="8"
          fill="#CFBAF0"
          transform="rotate(-25 12 30)"
        />
        <ellipse
          cx="16"
          cy="34"
          rx="4"
          ry="7"
          fill="#FCB1D1"
          transform="rotate(-15 16 34)"
        />
      </g>

      {/* Body */}
      <ellipse cx="32" cy="36" rx="16" ry="14" fill="#FF99C8" />

      {/* Body highlight */}
      <ellipse cx="36" cy="32" rx="8" ry="6" fill="#FCB1D1" opacity="0.6" />

      {/* Wing */}
      <ellipse
        cx="28"
        cy="38"
        rx="8"
        ry="10"
        fill="#CFBAF0"
        transform={`rotate(${frame === 1 ? -5 : frame === 2 ? 5 : 0} 28 38)`}
      />

      {/* Wing detail */}
      <ellipse cx="26" cy="40" rx="4" ry="6" fill="#E1D0F5" opacity="0.5" />

      {/* Legs */}
      <g>
        {/* Left leg */}
        <rect
          x={26 + currentLeg.left}
          y="46"
          width="3"
          height="10"
          rx="1.5"
          fill="#E8A86E"
        />
        {/* Left foot */}
        <ellipse
          cx={27.5 + currentLeg.left}
          cy="56"
          rx="4"
          ry="2"
          fill="#E8A86E"
        />

        {/* Right leg */}
        <rect
          x={35 + currentLeg.right}
          y="46"
          width="3"
          height="10"
          rx="1.5"
          fill="#E8A86E"
        />
        {/* Right foot */}
        <ellipse
          cx={36.5 + currentLeg.right}
          cy="56"
          rx="4"
          ry="2"
          fill="#E8A86E"
        />
      </g>

      {/* Head */}
      <circle cx="44" cy="22" r="12" fill="#FF99C8" />

      {/* Head highlight */}
      <circle cx="47" cy="19" r="5" fill="#FCB1D1" opacity="0.5" />

      {/* Comb (jengger) */}
      <g fill="#E94E89">
        <circle cx="44" cy="10" r="3" />
        <circle cx="48" cy="11" r="2.5" />
        <circle cx="40" cy="11" r="2.5" />
      </g>

      {/* Beak */}
      <g>
        {/* Upper beak */}
        <path d="M54 22 L60 24 L54 26 Z" fill="#E8A86E" />
        {/* Lower beak - opens slightly when walking */}
        <path
          d={
            frame === 1 ? "M54 26 L58 27 L54 28 Z" : "M54 26 L58 26.5 L54 27 Z"
          }
          fill="#D4956A"
        />
      </g>

      {/* Eye */}
      <g>
        {/* Eye white */}
        <ellipse cx="48" cy="20" rx="4" ry="4.5" fill="white" />
        {/* Pupil */}
        <circle cx="49" cy="20" r="2" fill="#3D3040" />
        {/* Eye shine */}
        <circle cx="50" cy="19" r="0.8" fill="white" />
      </g>

      {/* Blush */}
      <ellipse cx="52" cy="25" rx="3" ry="2" fill="#CFBAF0" opacity="0.6" />

      {/* Wattle (pial) */}
      <ellipse cx="54" cy="29" rx="2" ry="3" fill="#E94E89" />
    </svg>
  );
}

export default WalkingChicken;
