"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiPhotograph, HiColorSwatch, HiSparkles } from "react-icons/hi";
import type { IconType } from "react-icons";
import portfolioData from "@/data/portfolio.json";
import { WaveText } from "@/components/effects/WaveText";

// Mapping kategori ke icon dan warna
const categoryConfig: Record<
  string,
  {
    icon: IconType;
    gradient: string;
    iconColor: string;
    label: string;
  }
> = {
  infographic: {
    icon: HiPhotograph,
    gradient: "from-blue-500/20 via-indigo-600/30 to-violet-600/20",
    iconColor: "text-blue-500",
    label: "Infografis",
  },
  poster: {
    icon: HiColorSwatch,
    gradient: "from-emerald-500/20 via-teal-600/30 to-cyan-600/20",
    iconColor: "text-emerald-500",
    label: "Poster",
  },
  "sticker-logo": {
    icon: HiSparkles,
    gradient: "from-rose-500/20 via-pink-600/30 to-fuchsia-600/20",
    iconColor: "text-rose-500",
    label: "Sticker & Logo",
  },
};

const defaultCategoryConfig = {
  icon: HiPhotograph,
  gradient: "from-primary/20 via-primary/30 to-primary-dark/20",
  iconColor: "text-primary",
  label: "Design",
};

// Filter tabs
const designFilters = [
  { key: "all", label: "Semua" },
  { key: "infographic", label: "Infografis" },
  { key: "poster", label: "Poster" },
  { key: "sticker-logo", label: "Sticker & Logo" },
];

export function DesignGallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredDesigns =
    activeFilter === "all"
      ? portfolioData.designs
      : portfolioData.designs.filter((d) => d.category === activeFilter);

  return (
    <section
      id="desain"
      className="section-container relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full"
          style={{
            animation:
              "blob-morph 14s ease-in-out infinite, float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 blur-3xl rounded-full"
          style={{
            animation:
              "blob-morph 16s ease-in-out infinite reverse, float 10s ease-in-out infinite 3s",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-20"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
          Galeri <WaveText text="Desain" charClassName="text-gradient" />
        </h2>
        <p className="text-sm md:text-base text-neutral-light max-w-lg mx-auto">
          Koleksi desain infografis, poster, sticker, dan logo yang pernah
          dibuat untuk berbagai kegiatan.
        </p>
        <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
      >
        {designFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-3 md:px-5 py-1.5 md:py-2 rounded-soft-md text-xs md:text-sm font-bold transition-all duration-300 ${
              activeFilter === filter.key
                ? "bg-primary text-white shadow-soft"
                : "bg-neutral/5 text-neutral-light hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {filter.label}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredDesigns.map((design, i) => {
            const config =
              categoryConfig[design.category] || defaultCategoryConfig;
            const IconComponent = config.icon;

            return (
              <motion.div
                key={design.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-soft group hover:shadow-soft-md"
              >
                {/* Thumbnail Placeholder */}
                <div
                  className={`relative aspect-square mb-4 -mx-4 md:-mx-6 -mt-4 md:-mt-6 overflow-hidden rounded-t-soft bg-gradient-to-br ${config.gradient}`}
                >
                  {/* Pattern Overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 blur-2xl opacity-40 ${config.iconColor.replace("text-", "bg-")}`}
                        style={{ transform: "scale(2)" }}
                      />
                      <IconComponent
                        className={`relative w-12 h-12 md:w-16 md:h-16 ${config.iconColor} transition-all duration-300 group-hover:scale-110`}
                      />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm text-neutral">
                      {config.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-sm md:text-base font-black text-neutral mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {design.title}
                </h3>
                <p className="text-[10px] md:text-xs text-neutral-soft leading-relaxed line-clamp-2">
                  {design.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
