'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ShuffleText } from '@/components/effects/ShuffleText';

const LaserFlow = dynamic(
  () => import('@/components/effects/LaserFlow').then(mod => ({ default: mod.LaserFlow })),
  { ssr: false }
);

export function Hero() {
  return (
    <section id="beranda" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <LaserFlow />

      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float [animation-delay:2s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

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
            <ShuffleText text="Salsa" className="text-gradient" />
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
