'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioData from '@/data/portfolio.json';

type SkillCategory = {
  label: string;
  key: keyof typeof portfolioData.skills;
  bgClass: string;
  textClass: string;
};

const categories: SkillCategory[] = [
  { label: 'Data Analysis', key: 'dataAnalysis', bgClass: 'bg-pink-100', textClass: 'text-pink-700' },
  { label: 'Visualization', key: 'visualization', bgClass: 'bg-purple-100', textClass: 'text-purple-700' },
  { label: 'Database & Query', key: 'databaseQuery', bgClass: 'bg-orange-100', textClass: 'text-orange-700' },
  { label: 'Soft Skills', key: 'softSkills', bgClass: 'bg-emerald-100', textClass: 'text-emerald-700' },
];

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="keahlian" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Keahlian <span className="text-gradient">Saya</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold mb-5 text-pastel-900">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills[cat.key].map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: catIndex * 0.15 + i * 0.05 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${cat.bgClass} ${cat.textClass}
                               hover:shadow-md hover:scale-105 transition-all duration-200`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
