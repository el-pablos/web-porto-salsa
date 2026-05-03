"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView as useFramerInView,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiBriefcase,
  HiAcademicCap,
  HiUserGroup,
  HiHeart,
  HiGlobe,
} from "react-icons/hi";
import portfolioData from "@/data/portfolio.json";

// Mapping type ke icon dan warna
const typeConfig: Record<
  string,
  {
    icon: typeof HiBriefcase;
    colorClass: "primary" | "accent" | "secondary";
    label: string;
  }
> = {
  internship: {
    icon: HiBriefcase,
    colorClass: "primary",
    label: "Magang",
  },
  organization: {
    icon: HiUserGroup,
    colorClass: "accent",
    label: "Organisasi",
  },
  "community-service": {
    icon: HiHeart,
    colorClass: "secondary",
    label: "Pengabdian",
  },
  volunteer: {
    icon: HiGlobe,
    colorClass: "secondary",
    label: "Volunteer",
  },
};

const defaultTypeConfig = {
  icon: HiBriefcase,
  colorClass: "primary" as const,
  label: "Pengalaman",
};

// Timeline node component dengan pulse animation
function TimelineNode({
  icon: Icon,
  colorClass,
  isInView,
}: {
  icon: typeof HiBriefcase;
  colorClass: "primary" | "accent" | "secondary";
  isInView: boolean;
}) {
  const borderColor =
    colorClass === "primary"
      ? "border-primary/20"
      : colorClass === "accent"
        ? "border-accent/20"
        : "border-secondary/20";
  const textColor =
    colorClass === "primary"
      ? "text-primary"
      : colorClass === "accent"
        ? "text-accent"
        : "text-secondary";
  const glowColor =
    colorClass === "primary"
      ? "bg-primary/30"
      : colorClass === "accent"
        ? "bg-accent/30"
        : "bg-secondary/30";

  return (
    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
      {/* Pulse rings */}
      {isInView && (
        <>
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            className={`absolute inset-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${glowColor}`}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 0.3,
            }}
            className={`absolute inset-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${glowColor}`}
          />
        </>
      )}
      {/* Node circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 ${borderColor} flex items-center justify-center shadow-soft`}
      >
        <Icon className={`${textColor} text-base md:text-lg`} />
      </motion.div>
    </div>
  );
}

// Individual experience/organization item
function ExperienceItem({
  exp,
  index,
  isLeft,
}: {
  exp: (typeof portfolioData.experience)[0];
  index: number;
  isLeft: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(itemRef, { once: true, margin: "-100px" });

  const expType = (exp as { type?: string }).type || "internship";
  const config = typeConfig[expType] || defaultTypeConfig;
  const expLink = (exp as { link?: string }).link;

  const lineColor =
    config.colorClass === "primary"
      ? "bg-primary/40"
      : config.colorClass === "accent"
        ? "bg-accent/40"
        : "bg-secondary/40";

  const badgeBg =
    config.colorClass === "primary"
      ? "bg-primary/10 text-primary-dark"
      : config.colorClass === "accent"
        ? "bg-accent/10 text-accent"
        : "bg-secondary/10 text-secondary";

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative flex items-start gap-4 md:gap-6 mb-8 md:mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div
        className={`hidden md:block md:w-1/2 ${isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
      />
      {/* Timeline node with pulse */}
      <TimelineNode
        icon={config.icon}
        colorClass={config.colorClass}
        isInView={isInView}
      />
      {/* Connector line from node to card */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{ originX: isLeft ? 0 : 1 }}
        className={`hidden md:block absolute top-5 h-0.5 ${lineColor} ${
          isLeft
            ? "left-1/2 ml-6 w-[calc(2rem-6px)]"
            : "right-1/2 mr-6 w-[calc(2rem-6px)]"
        }`}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`ml-14 md:ml-0 md:w-1/2 card-soft p-4 md:p-6 ${isLeft ? "md:ml-8" : "md:mr-8"}`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${
              config.colorClass === "primary"
                ? "text-primary"
                : config.colorClass === "accent"
                  ? "text-accent"
                  : "text-secondary"
            }`}
          >
            {exp.period}
          </span>
          <span
            className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeBg}`}
          >
            {config.label}
          </span>
        </div>
        <h3 className="text-base md:text-lg font-black text-neutral mb-1">
          {exp.role}
        </h3>
        <p className="text-xs md:text-sm font-bold text-neutral-light mb-3 md:mb-4">
          {exp.company}
        </p>
        <p className="text-xs md:text-sm text-neutral-soft leading-relaxed mb-3">
          {exp.description}
        </p>
        <ul className="space-y-1.5 md:space-y-2">
          {exp.highlights.map((h) => (
            <li
              key={h}
              className="text-xs md:text-sm text-neutral-soft flex items-start gap-2"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  config.colorClass === "primary"
                    ? "bg-primary"
                    : config.colorClass === "accent"
                      ? "bg-accent"
                      : "bg-secondary"
                }`}
              />
              {h}
            </li>
          ))}
        </ul>
        {expLink && (
          <a
            href={expLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
          >
            Lihat Detail →
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

// Individual education item
function EducationItem({
  edu,
  totalIndex,
  isLeft,
}: {
  edu: (typeof portfolioData.education)[0];
  totalIndex: number;
  isLeft: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative flex items-start gap-4 md:gap-6 mb-8 md:mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div
        className={`hidden md:block md:w-1/2 ${isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
      />
      {/* Timeline node with pulse */}
      <TimelineNode
        icon={HiAcademicCap}
        colorClass="accent"
        isInView={isInView}
      />
      {/* Connector line from node to card */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{ originX: isLeft ? 0 : 1 }}
        className={`hidden md:block absolute top-5 h-0.5 bg-accent/40 ${
          isLeft
            ? "left-1/2 ml-6 w-[calc(2rem-6px)]"
            : "right-1/2 mr-6 w-[calc(2rem-6px)]"
        }`}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`ml-14 md:ml-0 md:w-1/2 card-soft p-4 md:p-6 ${isLeft ? "md:ml-8" : "md:mr-8"}`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] md:text-xs font-black text-accent uppercase tracking-widest">
            {edu.year}
          </span>
          <span className="text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            Pendidikan
          </span>
        </div>
        <h3 className="text-base md:text-lg font-black text-neutral mb-1">
          {edu.degree}
        </h3>
        <p className="text-xs md:text-sm font-bold text-neutral-light">
          {edu.institution}
        </p>
        <p className="text-xs md:text-sm text-neutral-light">{edu.faculty}</p>
        <p className="text-[10px] md:text-xs text-neutral-soft mt-3 italic">
          {edu.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll progress untuk timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  // Transform scroll progress ke height percentage untuk timeline line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="pengalaman" className="section-container" ref={sectionRef}>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-20"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
          Jejak <span className="text-gradient">Akademik & Karir</span>
        </h2>
        <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
        {/* Background timeline line (static, faded) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2" />

        {/* Animated timeline line that grows with scroll */}
        <motion.div
          className="absolute left-6 md:left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top"
          style={{
            height: lineHeight,
            opacity: lineOpacity,
            background:
              "linear-gradient(to bottom, var(--color-primary), var(--color-accent))",
            boxShadow:
              "0 0 8px var(--color-primary), 0 0 16px var(--color-primary)",
          }}
        />

        {/* Glowing dot at the end of the line */}
        <motion.div
          className="absolute left-6 md:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
          style={{
            top: lineHeight,
            opacity: lineOpacity,
            boxShadow:
              "0 0 12px var(--color-primary), 0 0 24px var(--color-primary)",
          }}
        />

        {/* Experience items */}
        {portfolioData.experience.map((exp, i) => {
          const isLeft = i % 2 === 0;
          return (
            <ExperienceItem
              key={exp.company}
              exp={exp}
              index={i}
              isLeft={isLeft}
            />
          );
        })}

        {/* Education items */}
        {portfolioData.education.map((edu, i) => {
          const totalIndex = portfolioData.experience.length + i;
          const isLeft = totalIndex % 2 === 0;
          return (
            <EducationItem
              key={edu.institution}
              edu={edu}
              totalIndex={totalIndex}
              isLeft={isLeft}
            />
          );
        })}
      </div>
    </section>
  );
}
