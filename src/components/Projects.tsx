'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiExternalLink } from 'react-icons/hi';
import portfolioData from '@/data/portfolio.json';

export function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="proyek" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proyek <span className="text-gradient">Unggulan</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white leading-tight">
                  {project.title}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/70 transition-colors shrink-0 ml-2"
                    aria-label={`Buka ${project.title}`}
                  >
                    <HiExternalLink size={20} />
                  </a>
                )}
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              {project.highlights && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700/30">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 bg-dark-200 text-gray-400 rounded font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
