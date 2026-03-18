"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import portfolioData from "@/data/portfolio.json";
import { StaggerReveal } from "@/components/effects/StaggerReveal";
import { WaveText } from "@/components/effects/WaveText";

type SkillCategory = {
  label: string;
  key: keyof typeof portfolioData.skills;
  bgClass: string;
  textClass: string;
  dotColorClass: string;
};

// Hardcoded skill levels (1-5) karena data portfolio.json tidak punya level
const skillLevels: Record<string, number> = {
  // Data Analysis
  "Python (Pandas, NumPy)": 5,
  "SQL & Database": 4,
  "Statistical Analysis": 4,
  "Data Cleaning & Processing": 5,
  // Visualization
  "Power BI": 5,
  Tableau: 4,
  "Matplotlib & Seaborn": 4,
  "Excel Advanced": 5,
  // Database & Query
  "SQL & PostgreSQL": 4,
  "Google Sheets Advanced": 5,
  "ETL & Data Pipeline": 3,
  "Data Warehousing Basics": 3,
  // Soft Skills
  "Research & Analysis": 5,
  "Report Writing": 4,
  "Team Collaboration": 5,
  "Critical Thinking": 4,
};

const categories: SkillCategory[] = [
  {
    label: "Data Analysis",
    key: "dataAnalysis",
    bgClass: "bg-primary/10",
    textClass: "text-primary-dark",
    dotColorClass: "bg-primary-dark",
  },
  {
    label: "Visualization",
    key: "visualization",
    bgClass: "bg-accent/10",
    textClass: "text-accent",
    dotColorClass: "bg-accent",
  },
  {
    label: "Database & Query",
    key: "databaseQuery",
    bgClass: "bg-secondary/10",
    textClass: "text-secondary",
    dotColorClass: "bg-secondary",
  },
  {
    label: "Soft Skills",
    key: "softSkills",
    bgClass: "bg-neutral/5",
    textClass: "text-neutral",
    dotColorClass: "bg-neutral",
  },
];

// Komponen untuk menampilkan level dots dengan animasi
interface SkillLevelDotsProps {
  level: number;
  maxLevel?: number;
  colorClass: string;
  isVisible: boolean;
  delayOffset?: number;
}

function SkillLevelDots({
  level,
  maxLevel = 5,
  colorClass,
  isVisible,
  delayOffset = 0,
}: SkillLevelDotsProps) {
  return (
    <div className="flex items-center gap-1 ml-2 shrink-0">
      {Array.from({ length: maxLevel }, (_, i) => {
        const isFilled = i < level;
        return (
          <motion.span
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${isFilled ? colorClass : "bg-neutral/20"}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              delay: delayOffset + i * 0.08,
            }}
          />
        );
      })}
    </div>
  );
}

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="skill"
      className="section-container relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 -left-32 w-80 h-80 bg-secondary/12 blur-3xl rounded-full"
          style={{
            animation:
              "blob-morph 14s ease-in-out infinite, float 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-20 w-96 h-96 bg-accent/10 blur-3xl rounded-full"
          style={{
            animation:
              "blob-morph 16s ease-in-out infinite reverse, float 9s ease-in-out infinite 3s",
          }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Keahlian <WaveText text="Analitis" charClassName="text-gradient" />
          </h2>
          <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="card-soft"
            >
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <span
                  className={`w-2 h-6 rounded-full ${cat.bgClass.replace("/10", "")}`}
                />
                {cat.label}
              </h3>
              <StaggerReveal className="flex flex-wrap gap-3">
                {portfolioData.skills[cat.key].map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center px-4 py-2 rounded-soft-md text-sm font-bold ${cat.bgClass} ${cat.textClass}
                               hover:scale-105 transition-transform duration-200 cursor-default`}
                  >
                    {skill}
                    <SkillLevelDots
                      level={skillLevels[skill] ?? 3}
                      colorClass={cat.dotColorClass}
                      isVisible={inView}
                      delayOffset={catIndex * 0.1 + skillIndex * 0.06 + 0.3}
                    />
                  </span>
                ))}
              </StaggerReveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
