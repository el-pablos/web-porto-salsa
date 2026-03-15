'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ShuffleText } from '@/components/effects/ShuffleText';
import { useConfettiEgg } from '@/components/effects/useConfettiEgg';

const LaserFlow = dynamic(
  () => import('@/components/effects/LaserFlow').then(mod => ({ default: mod.LaserFlow })),
  { ssr: false }
);

export function Hero() {
  const { handleClick } = useConfettiEgg(5);

  return (
    <section id="beranda" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <LaserFlow />

      {/* Morphing blob backgrounds */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/15 blur-3xl animate-float"
           style={{ animation: 'blob-morph 12s ease-in-out infinite, float 6s ease-in-out infinite' }} />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/15 blur-3xl"
           style={{ animation: 'blob-morph 15s ease-in-out infinite reverse, float 8s ease-in-out infinite 2s' }} />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/10 blur-3xl"
           style={{ animation: 'blob-morph 10s ease-in-out infinite 3s, float 7s ease-in-out infinite 1s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-sm font-semibold tracking-wide mb-6">
            Data Analyst & Researcher
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="text-neutral-light">Halo, Saya </span>
            <span onClick={handleClick}>
              <ShuffleText text="Salsa" className="text-gradient" />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-neutral-light max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Mengubah data mentah menjadi insight bermakna.
          Mahasiswi Sosiologi yang berfokus pada analisis data dan riset sosial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <a href="#proyek" className="btn-primary w-full sm:w-auto text-center">
            Lihat Portofolio
          </a>
          <a href="#kontak" className="btn-secondary w-full sm:w-auto text-center">
            Mari Berdiskusi
          </a>
        </motion.div>
      </div>
    </section>
  );
}
