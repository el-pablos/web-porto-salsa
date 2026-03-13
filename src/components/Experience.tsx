'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi';
import portfolioData from '@/data/portfolio.json';

export function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pengalaman" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Jejak <span className="text-gradient">Akademik & Karir</span>
        </h2>
        <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

        {/* Experience */}
        {portfolioData.experience.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            className={`relative flex items-start gap-6 mb-12 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="hidden md:block md:w-1/2" />
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center z-10 shadow-soft">
              <HiBriefcase className="text-primary text-lg" />
            </div>
            <div className="ml-16 md:ml-0 md:w-1/2 card-soft p-6">
              <span className="text-xs font-black text-primary uppercase tracking-widest mb-2 block">{exp.period}</span>
              <h3 className="text-lg font-black text-neutral mb-1">{exp.role}</h3>
              <p className="text-sm font-bold text-neutral-light mb-4">{exp.company}</p>
              <p className="text-sm text-neutral-soft leading-relaxed mb-3">{exp.description}</p>
              <ul className="space-y-2">
                {exp.highlights.map((h) => (
                  <li key={h} className="text-sm text-neutral-soft flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* Education */}
        {portfolioData.education.map((edu, i) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, x: (portfolioData.experience.length + i) % 2 === 0 ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
            className="relative flex items-start gap-6 mb-12"
          >
            <div className="hidden md:block md:w-1/2" />
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-accent/20 flex items-center justify-center z-10 shadow-soft">
              <HiAcademicCap className="text-accent text-lg" />
            </div>
            <div className="ml-16 md:ml-0 md:w-1/2 card-soft p-6">
              <span className="text-xs font-black text-accent uppercase tracking-widest mb-2 block">{edu.year}</span>
              <h3 className="text-lg font-black text-neutral mb-1">{edu.degree}</h3>
              <p className="text-sm font-bold text-neutral-light">{edu.institution}</p>
              <p className="text-sm text-neutral-light">{edu.faculty}</p>
              <p className="text-xs text-neutral-soft mt-3 italic">{edu.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
