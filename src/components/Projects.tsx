'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioData from '@/data/portfolio.json';
import { ShimmerCard } from '@/components/effects/ShimmerCard';

export function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="proyek" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Proyek <span className="text-gradient">Terpilih</span>
        </h2>
        <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="card-soft group"
          >
            <ShimmerCard>
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-neutral mb-3 leading-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-primary/10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights?.map((h) => (
                    <span key={h} className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-primary/5 text-primary-dark font-black rounded border border-primary/10">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-bold px-3 py-1 bg-neutral/5 text-neutral-light rounded-soft-sm">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </ShimmerCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
