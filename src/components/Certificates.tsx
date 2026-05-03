"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiAcademicCap, HiCalendar, HiOfficeBuilding } from "react-icons/hi";
import portfolioData from "@/data/portfolio.json";
import { WaveText } from "@/components/effects/WaveText";
import { StaggerReveal } from "@/components/effects/StaggerReveal";
import { TiltCard } from "@/components/effects/TiltCard";

export function Certificates() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="sertifikat"
      className="section-container relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 blur-3xl rounded-full"
          style={{
            animation:
              "blob-morph 14s ease-in-out infinite, float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 blur-3xl rounded-full"
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
          <WaveText text="Sertifikat" charClassName="text-gradient" />
        </h2>
        <p className="text-sm md:text-base text-neutral-light max-w-lg mx-auto">
          Koleksi sertifikat dari berbagai kegiatan organisasi, volunteer, dan
          seminar yang pernah diikuti.
        </p>
        <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full mt-4" />
      </motion.div>

      <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {portfolioData.certificates.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <TiltCard className="card-soft h-full flex flex-col">
              {/* Certificate Icon Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-soft-md bg-accent/10 flex items-center justify-center text-accent text-xl md:text-2xl flex-shrink-0">
                  <HiAcademicCap />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-black text-neutral leading-tight line-clamp-2">
                    {cert.title}
                  </h3>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-neutral-soft">
                  <HiOfficeBuilding className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium truncate">
                    {cert.issuer}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-soft">
                  <HiCalendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium">
                    {cert.date}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[10px] md:text-xs text-neutral-soft leading-relaxed mt-3 pt-3 border-t border-primary/10">
                {cert.description}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </StaggerReveal>
    </section>
  );
}
