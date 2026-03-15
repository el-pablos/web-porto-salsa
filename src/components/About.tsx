'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiDatabase, HiChartBar, HiDocumentText } from 'react-icons/hi';
import { BouncyEntrance } from '@/components/effects/BouncyEntrance';
import { WaveText } from '@/components/effects/WaveText';
import { TiltCard } from '@/components/effects/TiltCard';

const highlights = [
  {
    icon: HiChartBar,
    title: 'Data Analysis',
    desc: 'Mengolah dataset besar menjadi insight yang actionable',
  },
  {
    icon: HiDatabase,
    title: 'Database & Query',
    desc: 'Mengelola dan mengquery data dengan SQL dan tools modern',
  },
  {
    icon: HiDocumentText,
    title: 'Visualization',
    desc: 'Membangun dashboard & chart interaktif yang informatif',
  },
  {
    icon: HiAcademicCap,
    title: 'Research',
    desc: 'Riset sosial kuantitatif dengan pendekatan data-driven',
  },
];

export function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="tentang" className="section-container" ref={ref}>
      <BouncyEntrance>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Tentang <WaveText text="Saya" charClassName="text-gradient" />
          </h2>
          <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-6 text-lg text-neutral-light leading-relaxed">
              <p>
                Halo! Saya <span className="text-primary font-bold">Adinda Salsa Aryadi Putri</span>,
                seorang mahasiswi Sosiologi yang memiliki ketertarikan mendalam pada dunia data.
              </p>
              <p>
                Bagi saya, data bukan sekadar angka, melainkan cerita yang menunggu untuk diceritakan.
                Fokus saya adalah menjembatani antara fenomena sosial dengan analisis data kuantitatif
                untuk menghasilkan insight yang valid dan berdampak.
              </p>
              <p>
                Berbekal pengalaman di <span className="text-secondary font-bold">Komisi Nasional Disabilitas (KND)</span>,
                saya terbiasa menangani dataset kompleks dan mengubahnya menjadi visualisasi yang mudah dipahami
                oleh para pengambil kebijakan.
              </p>
            </div>

            <div className="pt-4">
              <a href="#kontak" className="btn-primary">
                Unduh CV
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {highlights.map((item) => (
              <TiltCard
                key={item.title}
                className="card-soft flex flex-col items-center text-center p-6"
              >
                <div className="w-12 h-12 rounded-soft-md bg-primary/10 flex items-center justify-center mb-4 text-primary text-2xl">
                  <item.icon />
                </div>
                <h3 className="font-bold text-neutral text-sm mb-2">{item.title}</h3>
                <p className="text-neutral-soft text-xs leading-tight">{item.desc}</p>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </BouncyEntrance>
    </section>
  );
}
