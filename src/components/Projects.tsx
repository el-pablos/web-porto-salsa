"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import portfolioData from "@/data/portfolio.json";
import { ShimmerCard } from "@/components/effects/ShimmerCard";
import {
  HiChartBar,
  HiTemplate,
  HiDocumentReport,
  HiChatAlt2,
  HiDesktopComputer,
  HiCamera,
  HiGlobe,
  HiShoppingCart,
  HiBeaker,
  HiExternalLink,
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
  "SILAF (Sistem Layanan Administrasi FISIP)": {
    gradient: "from-sky-500/20 via-blue-600/30 to-indigo-600/20",
    icon: HiDesktopComputer,
    iconColor: "text-sky-500",
  },
  "Photostory: Nusantara": {
    gradient: "from-rose-500/20 via-pink-600/30 to-fuchsia-600/20",
    icon: HiCamera,
    iconColor: "text-rose-500",
  },
  "Sociology Visual: Social Interaction": {
    gradient: "from-violet-500/20 via-purple-600/30 to-fuchsia-600/20",
    icon: HiCamera,
    iconColor: "text-violet-500",
  },
  "Virtual Exhibition: Urban Life": {
    gradient: "from-amber-500/20 via-orange-600/30 to-yellow-600/20",
    icon: HiGlobe,
    iconColor: "text-amber-500",
  },
  "Sociopreneurship: EcoCraft Creation": {
    gradient: "from-green-500/20 via-emerald-600/30 to-teal-600/20",
    icon: HiShoppingCart,
    iconColor: "text-green-500",
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
  icon: HiBeaker,
  iconColor: "text-primary",
};

// Kategori filter untuk projects
const projectCategories = [
  { key: "all", label: "Semua" },
  { key: "data-analysis", label: "Data Analysis" },
  { key: "creative", label: "Creative" },
  { key: "tech", label: "Tech" },
  { key: "sociopreneurship", label: "Sociopreneurship" },
  { key: "research", label: "Research" },
];

export function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (p) => (p as { category?: string }).category === activeFilter,
        );

  return (
    <section id="proyek" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-20"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
          Proyek <span className="text-gradient">Terpilih</span>
        </h2>
        <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
      >
        {projectCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveFilter(cat.key)}
            className={`px-3 md:px-5 py-1.5 md:py-2 rounded-soft-md text-xs md:text-sm font-bold transition-all duration-300 ${
              activeFilter === cat.key
                ? "bg-primary text-white shadow-soft"
                : "bg-neutral/5 text-neutral-light hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          {filteredProjects.map((project, i) => (
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
                    <div className="relative aspect-video mb-4 md:mb-6 -mx-4 md:-mx-6 -mt-4 md:-mt-6 overflow-hidden rounded-t-soft">
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
                            className={`relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 ${config.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg`}
                          />
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  );
                })()}

                <div className="flex flex-col h-full px-0 md:px-0">
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-2xl font-black text-neutral mb-2 md:mb-3 leading-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 md:pt-6 border-t border-primary/10">
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                      {project.highlights?.map((h) => (
                        <span
                          key={h}
                          className="text-[9px] md:text-[10px] uppercase tracking-wider px-1.5 md:px-2 py-0.5 bg-primary/5 text-primary-dark font-black rounded border border-primary/10"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 bg-neutral/5 text-neutral-light rounded-soft-sm"
                        >
                          #{t}
                        </span>
                      ))}
                      {(project as { link?: string }).link && (
                        <a
                          href={(project as { link?: string }).link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto text-primary hover:text-primary-dark transition-colors"
                          aria-label={`Lihat proyek ${project.title}`}
                        >
                          <HiExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ShimmerCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
