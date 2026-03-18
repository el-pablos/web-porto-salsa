"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface ProgressRingProps {
  /** Target value (0-100 for percentage, or any number for custom max) */
  value: number;
  /** Maximum value for calculating percentage (default: 100) */
  max?: number;
  /** Size of the ring in pixels */
  size?: number;
  /** Stroke width in pixels */
  strokeWidth?: number;
  /** Primary color for the progress arc */
  color?: "primary" | "secondary" | "accent";
  /** Animation duration in milliseconds */
  duration?: number;
  /** Label shown below the number */
  label?: string;
  /** Suffix for the number (e.g., "+", "%") */
  suffix?: string;
  /** Custom class name */
  className?: string;
}

const colorMap = {
  primary: {
    stroke: "#FF99C8",
    bg: "rgba(255, 153, 200, 0.15)",
    glow: "rgba(255, 153, 200, 0.4)",
  },
  secondary: {
    stroke: "#9ED2D6",
    bg: "rgba(158, 210, 214, 0.15)",
    glow: "rgba(158, 210, 214, 0.4)",
  },
  accent: {
    stroke: "#CFBAF0",
    bg: "rgba(207, 186, 240, 0.15)",
    glow: "rgba(207, 186, 240, 0.4)",
  },
};

export function ProgressRing({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = "primary",
  duration = 2000,
  label,
  suffix = "",
  className = "",
}: ProgressRingProps) {
  const [progress, setProgress] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / max) * 100, 100);
  const colors = colorMap[color];

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - rawProgress, 3);

      const currentProgress = easeOut * percentage;
      const currentValue = Math.floor(easeOut * value);

      setProgress(currentProgress);
      setDisplayValue(currentValue);

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(percentage);
        setDisplayValue(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView, value, percentage, duration]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.bg}
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.1s ease-out",
            }}
          />

          {/* Gradient overlay for shine effect */}
          <defs>
            <linearGradient
              id={`gradient-${color}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.stroke} stopOpacity="1" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor={colors.stroke} stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-black text-neutral"
            style={{ fontSize: size * 0.25 }}
          >
            {displayValue}
            {suffix}
          </span>
        </div>
      </div>

      {/* Label */}
      {label && (
        <span className="mt-3 text-sm font-medium text-neutral-light text-center">
          {label}
        </span>
      )}
    </div>
  );
}
