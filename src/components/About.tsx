"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiAcademicCap,
  HiLightBulb,
  HiUserGroup,
  HiDesktopComputer,
} from "react-icons/hi";
import { BouncyEntrance } from "@/components/effects/BouncyEntrance";
import { WaveText } from "@/components/effects/WaveText";
import { TiltCard } from "@/components/effects/TiltCard";
import portfolioData from "@/data/portfolio.json";

const highlights = [
  {
    icon: HiAcademicCap,
    title: "Social Research",
    desc: "Riset sosial kuantitatif dengan pendekatan data-driven",
  },
  {
    icon: HiLightBulb,
    title: "Data Analysis",
    desc: "Mengolah dataset menjadi insight yang actionable",
  },
  {
    icon: HiUserGroup,
    title: "Community Service",
    desc: "Aktif dalam kegiatan pengabdian masyarakat dan volunteer",
  },
  {
    icon: HiDesktopComputer,
    title: "Tech & Design",
    desc: "Ketertarikan di dunia teknologi, QA, dan desain kreatif",
  },
];

export function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="tentang"
      className="section-container relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative background blobs */}
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
        <div
          className="absolute top-1/2 left-1/3 w-56 h-56 bg-secondary/8 blur-3xl rounded-full"
          style={{
            animation:
              "blob-morph 12s ease-in-out infinite 2s, float 7s ease-in-out infinite 1s",
          }}
        />
      </div>

      <BouncyEntrance>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Tentang <WaveText text="Saya" charClassName="text-gradient" />
          </h2>
          <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-neutral-light leading-relaxed">
              <p>
                Halo! Saya{" "}
                <span className="text-primary font-bold">
                  {portfolioData.name}
                </span>
                , mahasiswi Ilmu Sosial dan Ilmu Politik, Program Studi Sosiologi
                yang memiliki kemampuan memahami dan menganalisis berbagai
                permasalahan secara kritis dan logis.
              </p>
              <p>
                Saya terbiasa mengartikulasikan ide secara jelas dan efektif,
                serta memiliki komitmen tinggi untuk terus belajar dan
                berkembang. Di luar bidang akademik, saya memiliki ketertarikan
                di dunia teknologi, khususnya dalam aspek pengujian dan kualitas
                sistem perangkat lunak.
              </p>
              <p>
                Berbekal pengalaman di{" "}
                <span className="text-secondary font-bold">
                  Komisi Nasional Disabilitas (KND)
                </span>{" "}
                sebagai Data Analyst Intern dan aktif di berbagai organisasi
                seperti{" "}
                <span className="text-accent font-bold">
                  Youth Ranger Indonesia
                </span>
                ,{" "}
                <span className="text-accent font-bold">UNAS FEST</span>, dan
                program volunteer{" "}
                <span className="text-accent font-bold">
                  Generasi Bebas Plastik
                </span>
                , saya dikenal sebagai pribadi yang komunikatif, bertanggung
                jawab, dan disiplin.
              </p>
            </div>

            <div className="pt-4">
              <a href="#kontak" className="btn-primary">
                Hubungi Saya
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4"
          >
            {highlights.map((item) => (
              <TiltCard
                key={item.title}
                className="card-soft flex flex-col items-center text-center p-4 md:p-6"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-soft-md bg-primary/10 flex items-center justify-center mb-3 md:mb-4 text-primary text-xl md:text-2xl">
                  <item.icon />
                </div>
                <h3 className="font-bold text-neutral text-xs md:text-sm mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-soft text-[11px] md:text-xs leading-tight">
                  {item.desc}
                </p>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </BouncyEntrance>
    </section>
  );
}
