"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import portfolioData from "@/data/portfolio.json";
import { ShimmerCard } from "@/components/effects/ShimmerCard";
import {
  HiChartBar,
  HiTemplate,
  HiDocumentReport,
  HiChatAlt2,
} from "react-icons/hi";
import type { IconType } from "react-icons";

// Konfigurasi thumbnail untuk setiap project
const projectThumbnailConfig: Record<
  string,
  {
    gradient: string;
    icon: IconType;
    iconColor: string;
  }
> = {
  "Analisis Data Disabilitas Nasional": {
    gradient: "from-blue-500/20 via-blue-600/30 to-indigo-600/20",
    icon: HiChartBar,
    iconColor: "text-blue-500",
  },
  "Dashboard Visualisasi Data KND": {
    gradient: "from-emerald-500/20 via-teal-600/30 to-cyan-600/20",
    icon: HiTemplate,
    iconColor: "text-emerald-500",
  },
  "Penelitian Sosial Kuantitatif UNAS": {
    gradient: "from-violet-500/20 via-purple-600/30 to-fuchsia-600/20",
    icon: HiDocumentReport,
    iconColor: "text-violet-500",
  },
  "Analisis Sentimen Media Sosial": {
    gradient: "from-amber-500/20 via-orange-600/30 to-rose-600/20",
    icon: HiChatAlt2,
    iconColor: "text-amber-500",
  },
};

// Default config untuk project yang tidak ada di mapping
const defaultThumbnailConfig = {
  gradient: "from-primary/20 via-primary/30 to-primary-dark/20",
  icon: HiChartBar,
  iconColor: "text-primary",
};

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
            className="card-soft group hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:border-primary/30"
          >
            <ShimmerCard>
              {/* Thumbnail Area */}
              {(() => {
                const config =
                  projectThumbnailConfig[project.title] ||
                  defaultThumbnailConfig;
                const IconComponent = config.icon;
                return (
                  <div className="relative aspect-video mb-6 -mx-6 -mt-6 overflow-hidden rounded-t-soft">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
                    />

                    {/* Pattern Overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                        backgroundSize: "24px 24px",
                      }}
                    />

                    {/* Icon Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Glow Effect */}
                        <div
                          className={`absolute inset-0 blur-2xl opacity-50 ${config.iconColor.replace("text-", "bg-")}`}
                          style={{ transform: "scale(2)" }}
                        />
                        {/* Icon */}
                        <IconComponent
                          className={`relative w-16 h-16 md:w-20 md:h-20 ${config.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg`}
                        />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })()}

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
                      <span
                        key={h}
                        className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-primary/5 text-primary-dark font-black rounded border border-primary/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-bold px-3 py-1 bg-neutral/5 text-neutral-light rounded-soft-sm"
                      >
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
