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

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Experience Column */}
        <div>
          <h3 className="text-2xl font-black mb-10 flex items-center gap-4 text-primary-dark">
            <HiBriefcase className="text-3xl" />
            Pengalaman
          </h3>
          <div className="space-y-8 relative before:absolute before:left-[17px] before:top-0 before:bottom-0 before:w-1 before:bg-primary/10">
            {portfolioData.experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center z-10" />
                <div className="card-soft p-6">
                  <span className="text-xs font-black text-primary uppercase tracking-widest mb-2 block">{exp.period}</span>
                  <h4 className="text-lg font-black text-neutral mb-1">{exp.role}</h4>
                  <p className="text-sm font-bold text-neutral-light mb-4">{exp.company}</p>
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
          </div>
        </div>

        {/* Education Column */}
        <div>
          <h3 className="text-2xl font-black mb-10 flex items-center gap-4 text-accent">
            <HiAcademicCap className="text-3xl" />
            Pendidikan
          </h3>
          <div className="space-y-8 relative before:absolute before:left-[17px] before:top-0 before:bottom-0 before:w-1 before:bg-accent/10">
            {portfolioData.education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-white border-4 border-accent/20 flex items-center justify-center z-10" />
                <div className="card-soft p-6 border-accent/10">
                  <span className="text-xs font-black text-accent uppercase tracking-widest mb-2 block">{edu.year}</span>
                  <h4 className="text-lg font-black text-neutral mb-1">{edu.degree}</h4>
                  <p className="text-sm font-bold text-neutral-light">{edu.institution}</p>
                  <p className="text-xs text-neutral-soft mt-3 italic">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
