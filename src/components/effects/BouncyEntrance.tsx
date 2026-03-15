'use client';

import { motion } from 'framer-motion';

interface BouncyEntranceProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function BouncyEntrance({ children, delay = 0, className }: BouncyEntranceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.8, delay }}
      className={className}
      data-testid="bouncy-entrance"
    >
      {children}
    </motion.div>
  );
}
