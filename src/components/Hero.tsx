'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ShuffleText } from '@/components/effects/ShuffleText';
import { HiArrowDown } from 'react-icons/hi';

const LaserFlow = dynamic(
  () => import('@/components/effects/LaserFlow').then(mod => ({ default: mod.LaserFlow })),
  { ssr: false }
);

export function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <LaserFlow />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider">
            Hai, perkenalkan saya
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
            <ShuffleText text="Adinda Salsa" className="text-gradient" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
            Data Analyst & Researcher
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Mengubah data mentah menjadi insight bermakna.
          Passionate dalam analisis data, visualisasi, dan riset kuantitatif.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#proyek"
            className="px-8 py-3 bg-primary rounded-smooth text-white font-semibold
                       hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/25
                       transition-all duration-300"
          >
            Lihat Proyek Saya
          </a>
          <a
            href="#kontak"
            className="px-8 py-3 border border-primary/30 rounded-smooth text-primary font-semibold
                       hover:bg-primary/10 transition-all duration-300"
          >
            Hubungi Saya
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#tentang" className="text-gray-500 hover:text-primary transition-colors animate-bounce inline-block">
            <HiArrowDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
