'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi';
import portfolioData from '@/data/portfolio.json';

export function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="pengalaman" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pengalaman & <span className="text-gradient">Pendidikan</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
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
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-dark-400 border-2 border-primary flex items-center justify-center z-10">
                <HiBriefcase className="text-primary text-lg" />
              </div>
              <div className="ml-16 md:ml-0 md:w-1/2 glass-card p-6">
                <span className="text-primary text-xs font-mono mb-2 block">{exp.period}</span>
                <h3 className="text-lg font-semibold text-white mb-1">{exp.role}</h3>
                <p className="text-sm text-gray-400 mb-3">{exp.company}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{exp.description}</p>
                <ul className="space-y-1">
                  {exp.highlights.map((h) => (
                    <li key={h} className="text-xs text-gray-500 flex items-start gap-2">
                      <span className="text-primary mt-1">&#x25B8;</span>
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
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-dark-400 border-2 border-accent flex items-center justify-center z-10">
                <HiAcademicCap className="text-accent text-lg" />
              </div>
              <div className="ml-16 md:ml-0 md:w-1/2 glass-card p-6">
                <span className="text-accent text-xs font-mono mb-2 block">{edu.year}</span>
                <h3 className="text-lg font-semibold text-white mb-1">{edu.degree}</h3>
                <p className="text-sm text-gray-400 mb-1">{edu.institution}</p>
                <p className="text-sm text-gray-400">{edu.faculty}</p>
                <p className="text-xs text-gray-500 mt-2">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
