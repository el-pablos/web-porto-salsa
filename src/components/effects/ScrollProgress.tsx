'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9999]"
      style={{
        scaleX,
        background: 'linear-gradient(to right, #FF99C8, #CFBAF0, #9ED2D6)',
      }}
      data-testid="scroll-progress"
    />
  );
}
