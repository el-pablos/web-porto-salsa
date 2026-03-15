'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const SHAPES = ['✦', '◇', '○', '✿', '⬡'];
const COLORS = ['text-primary/20', 'text-accent/20', 'text-secondary/20', 'text-soft/30'];

interface FloatingItem {
  id: number;
  shape: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export function FloatingElements() {
  const items: FloatingItem[] = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      shape: SHAPES[i % SHAPES.length],
      left: `${5 + (i * 8.3) % 90}%`,
      size: 0.6 + Math.random() * 1.2,
      duration: 10 + (i * 3) % 15,
      delay: -(i * 2.5),
      color: COLORS[i % COLORS.length],
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" data-testid="floating-elements">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.color} select-none`}
          style={{
            left: item.left,
            bottom: '-5%',
            fontSize: `${item.size}rem`,
          }}
          animate={{
            y: [0, -1200],
            x: [0, Math.sin(item.id) * 40, 0],
            rotate: [0, 360],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.shape}
        </motion.div>
      ))}
    </div>
  );
}
