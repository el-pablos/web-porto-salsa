'use client';

import { motion } from 'framer-motion';

interface BouncyIconProps {
  children: React.ReactNode;
  delay?: number;
  intensity?: 'subtle' | 'medium' | 'bouncy';
  className?: string;
}

/**
 * Wrapper yang memberikan efek bouncing/floating pada icon
 * Bagus untuk social links, badges, dll.
 */
export function BouncyIcon({
  children,
  delay = 0,
  intensity = 'subtle',
  className = '',
}: BouncyIconProps) {
  const intensityConfig = {
    subtle: { y: [0, -3, 0], duration: 3 },
    medium: { y: [0, -5, 0], duration: 2.5 },
    bouncy: { y: [0, -8, 0], duration: 2 },
  };

  const config = intensityConfig[intensity];

  return (
    <motion.div
      className={className}
      animate={{
        y: config.y,
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
