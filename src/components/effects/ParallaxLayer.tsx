'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.5, className }: ParallaxLayerProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 200]);

  return (
    <motion.div
      data-testid="parallax-layer"
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
