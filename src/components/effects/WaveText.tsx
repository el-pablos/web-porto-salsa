'use client';

import { motion } from 'framer-motion';

interface WaveTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WaveText({ text, className = '', delay = 0 }: WaveTextProps) {
  const characters = text.split('');

  return (
    <span
      className={className}
      aria-label={text}
      role="text"
      data-testid="wave-text"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          style={{ display: 'inline-block' }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: delay + index * 0.08,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
