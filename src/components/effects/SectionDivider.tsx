"use client";

import { useMemo } from "react";

type DividerVariant =
  | "wave"
  | "curve"
  | "dots"
  | "wave-smooth"
  | "wave-sharp"
  | "tilt";

interface SectionDividerProps {
  /** Jenis pattern divider */
  variant?: DividerVariant;
  /** Flip divider secara vertikal */
  flip?: boolean;
  /** Warna fill SVG - bisa hex, rgb, atau nama warna Tailwind */
  color?: string;
  /** Custom className untuk container */
  className?: string;
  /** Height divider dalam pixel */
  height?: number;
}

// Color mapping untuk palette yang ada
const colorMap: Record<string, string> = {
  primary: "#FF99C8",
  "primary-light": "#FCB1D1",
  "primary-dark": "#E94E89",
  secondary: "#9ED2D6",
  "secondary-light": "#C2E9FB",
  accent: "#CFBAF0",
  "accent-light": "#F1C0E8",
  cream: "#FFF9E1",
  soft: "#FAD2E1",
  "soft-light": "#FFF0F5",
  neutral: "#3D3040",
  "neutral-light": "#6B5B6E",
  "neutral-soft": "#A899A9",
  white: "#FFFFFF",
  transparent: "transparent",
};

function resolveColor(color: string): string {
  return colorMap[color] ?? color;
}

export function SectionDivider({
  variant = "wave",
  flip = false,
  color = "primary",
  className = "",
  height = 60,
}: SectionDividerProps) {
  const resolvedColor = useMemo(() => resolveColor(color), [color]);

  const svgProps = {
    width: "100%",
    height,
    viewBox: "0 0 1440 60",
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: "block",
      transform: flip ? "scaleY(-1)" : undefined,
    },
  };

  const renderPattern = () => {
    switch (variant) {
      case "wave":
        // Classic wave dengan multiple curves
        return (
          <svg {...svgProps}>
            <path
              d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
              fill={resolvedColor}
            />
          </svg>
        );

      case "wave-smooth":
        // Smooth wave yang lebih halus
        return (
          <svg {...svgProps}>
            <path
              d="M0,20 Q360,60 720,30 T1440,20 L1440,60 L0,60 Z"
              fill={resolvedColor}
            />
          </svg>
        );

      case "wave-sharp":
        // Wave dengan sudut lebih tajam
        return (
          <svg {...svgProps}>
            <path
              d="M0,40 L180,10 L360,45 L540,15 L720,40 L900,10 L1080,45 L1260,15 L1440,40 L1440,60 L0,60 Z"
              fill={resolvedColor}
            />
          </svg>
        );

      case "curve":
        // Simple curve tunggal
        return (
          <svg {...svgProps}>
            <path
              d="M0,60 Q720,0 1440,60 L1440,60 L0,60 Z"
              fill={resolvedColor}
            />
          </svg>
        );

      case "dots":
        // Dot pattern dengan circles
        return (
          <svg {...svgProps} viewBox="0 0 1440 60">
            {/* Background fill */}
            <rect x="0" y="30" width="1440" height="30" fill={resolvedColor} />
            {/* Dot pattern */}
            {Array.from({ length: 25 }).map((_, i) => {
              const cx = i * 60 + 30;
              const cy = 30 + Math.sin(i * 0.5) * 8;
              const radius = 8 + Math.sin(i * 0.7) * 3;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={resolvedColor}
                />
              );
            })}
          </svg>
        );

      case "tilt":
        // Simple diagonal tilt
        return (
          <svg {...svgProps}>
            <polygon points="0,60 1440,20 1440,60" fill={resolvedColor} />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      aria-hidden="true"
      data-testid="section-divider"
      data-variant={variant}
    >
      {renderPattern()}
    </div>
  );
}

// Preset dividers untuk kemudahan penggunaan
export function WaveDivider(props: Omit<SectionDividerProps, "variant">) {
  return <SectionDivider variant="wave" {...props} />;
}

export function CurveDivider(props: Omit<SectionDividerProps, "variant">) {
  return <SectionDivider variant="curve" {...props} />;
}

export function DotsDivider(props: Omit<SectionDividerProps, "variant">) {
  return <SectionDivider variant="dots" {...props} />;
}

export function TiltDivider(props: Omit<SectionDividerProps, "variant">) {
  return <SectionDivider variant="tilt" {...props} />;
}

export default SectionDivider;
