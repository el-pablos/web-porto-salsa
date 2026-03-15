'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioData from '@/data/portfolio.json';
import { StaggerReveal } from '@/components/effects/StaggerReveal';
import { WaveText } from '@/components/effects/WaveText';

type SkillCategory = {
  label: string;
  key: keyof typeof portfolioData.skills;
  bgClass: string;
  textClass: string;
};

const categories: SkillCategory[] = [
  { label: 'Data Analysis', key: 'dataAnalysis', bgClass: 'bg-primary/10', textClass: 'text-primary-dark' },
  { label: 'Visualization', key: 'visualization', bgClass: 'bg-accent/10', textClass: 'text-accent' },
  { label: 'Database & Query', key: 'databaseQuery', bgClass: 'bg-secondary/10', textClass: 'text-secondary' },
  { label: 'Soft Skills', key: 'softSkills', bgClass: 'bg-neutral/5', textClass: 'text-neutral' },
];

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skill" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Keahlian <WaveText text="Analitis" charClassName="text-gradient" />
        </h2>
        <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat, catIndex) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            className="card-soft"
          >
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className={`w-2 h-6 rounded-full ${cat.bgClass.replace('/10', '')}`} />
              {cat.label}
            </h3>
            <StaggerReveal className="flex flex-wrap gap-3">
              {portfolioData.skills[cat.key].map((skill) => (
                <span
                  key={skill}
                  className={`px-5 py-2 rounded-soft-md text-sm font-bold ${cat.bgClass} ${cat.textClass}
                             hover:scale-105 transition-transform duration-200 cursor-default`}
                >
                  {skill}
                </span>
              ))}
            </StaggerReveal>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
