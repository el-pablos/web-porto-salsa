'use client';

import { CountUp } from '@/components/effects/CountUp';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioData from '@/data/portfolio.json';

const stats = [
  { label: 'Proyek Selesai', value: portfolioData.stats.projectsCompleted, suffix: '+' },
  { label: 'Dataset Dianalisis', value: portfolioData.stats.datasetsAnalyzed, suffix: '+' },
  { label: 'Tools Dikuasai', value: portfolioData.stats.toolsMastered, suffix: '' },
  { label: 'Tahun Belajar', value: portfolioData.stats.yearsLearning, suffix: '+' },
];

export function VisitorCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-12 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-soft p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-gradient mb-2">
                {inView && <CountUp end={stat.value} duration={2} />}
                {stat.suffix}
              </div>
              <p className="text-neutral-soft text-sm font-bold uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
