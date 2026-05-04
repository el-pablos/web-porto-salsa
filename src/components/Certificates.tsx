"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiAcademicCap,
  HiCalendar,
  HiOfficeBuilding,
  HiPhotograph,
  HiX,
  HiChevronDown,
  HiChevronUp,
  HiBadgeCheck,
  HiUserGroup,
  HiHeart,
  HiBookOpen,
  HiLightBulb,
  HiDesktopComputer,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";
import { WaveText } from "@/components/effects/WaveText";
import { TiltCard } from "@/components/effects/TiltCard";

// Category configuration
const categoryConfig: Record<
  string,
  { label: string; icon: IconType; color: string; bgColor: string }
> = {
  all: {
    label: "Semua",
    icon: HiAcademicCap,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  seminar: {
    label: "Seminar",
    icon: HiLightBulb,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  organization: {
    label: "Organisasi",
    icon: HiUserGroup,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  volunteer: {
    label: "Volunteer",
    icon: HiHeart,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  "community-service": {
    label: "Pengabdian",
    icon: HiUserGroup,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  course: {
    label: "Course",
    icon: HiDesktopComputer,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  academic: {
    label: "Akademik",
    icon: HiBookOpen,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
};

// Category filter options
const certCategories = [
  { key: "all", label: "Semua" },
  { key: "seminar", label: "Seminar" },
  { key: "organization", label: "Organisasi" },
  { key: "volunteer", label: "Volunteer" },
  { key: "community-service", label: "Pengabdian" },
  { key: "course", label: "Course" },
  { key: "academic", label: "Akademik" },
];

const INITIAL_SHOW_COUNT = 9;

export function Certificates() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  const certificates = portfolioData.certificates as Array<{
    title: string;
    issuer: string;
    date: string;
    category?: string;
    description: string;
    credentialId?: string;
    image?: string | null;
    images?: string[];
  }>;

  const filteredCerts =
    activeFilter === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeFilter);

  const displayedCerts = showAll
    ? filteredCerts
    : filteredCerts.slice(0, INITIAL_SHOW_COUNT);

  const hasMore = filteredCerts.length > INITIAL_SHOW_COUNT;

  const openLightbox = useCallback((images: string | string[], title: string) => {
    const imageArray = Array.isArray(images) ? images : [images];
    setLightboxImages(imageArray);
    setLightboxIndex(0);
    setLightboxTitle(title);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImages([]);
    setLightboxIndex(0);
    setLightboxTitle("");
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  }, [lightboxImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  }, [lightboxImages.length]);

  const getCategoryConfig = (category?: string) => {
    if (!category) return categoryConfig.all;
    return categoryConfig[category] || categoryConfig.all;
  };

  return (
    <>
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
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-3xl rounded-full"
            style={{
              animation: "blob-morph 20s ease-in-out infinite 5s",
            }}
          />
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <WaveText text="Sertifikat" charClassName="text-gradient" />
          </h2>
          <p className="text-sm md:text-base text-neutral-light max-w-2xl mx-auto">
            Koleksi {certificates.length} sertifikat dari berbagai kegiatan
            seminar, organisasi, volunteer, course, dan pengabdian masyarakat
            yang pernah diikuti.
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
          {certCategories.map((cat) => {
            const count =
              cat.key === "all"
                ? certificates.length
                : certificates.filter((c) => c.category === cat.key).length;
            if (count === 0 && cat.key !== "all") return null;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveFilter(cat.key);
                  setShowAll(false);
                }}
                className={`px-3 md:px-5 py-1.5 md:py-2 rounded-soft-md text-xs md:text-sm font-bold transition-all duration-300 ${
                  activeFilter === cat.key
                    ? "bg-primary text-white shadow-soft"
                    : "bg-neutral/5 text-neutral-light hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat.label}
                <span className="ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Certificates Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedCerts.map((cert, i) => {
                const catConfig = getCategoryConfig(cert.category);
                return (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <TiltCard className="card-soft h-full flex flex-col group">
                      {/* Image Preview (if available) */}
                      {(cert.images || cert.image) && (
                        <div
                          className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 mb-4 overflow-hidden rounded-t-soft-lg cursor-pointer"
                          onClick={() => {
                            const images = cert.images || (cert.image ? [cert.image] : []);
                            openLightbox(images, cert.title);
                          }}
                        >
                          <div className="aspect-[16/10] relative bg-gradient-to-br from-cream to-soft-light">
                            <Image
                              src={cert.images ? cert.images[0] : cert.image!}
                              alt={cert.title}
                              fill
                              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2 shadow-soft">
                                <HiPhotograph className="w-5 h-5 text-primary" />
                              </div>
                            </div>
                            {/* Multi-page indicator */}
                            {cert.images && cert.images.length > 1 && (
                              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-bold">
                                {cert.images.length} halaman
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Certificate Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-10 h-10 md:w-11 md:h-11 rounded-soft-sm ${catConfig.bgColor} flex items-center justify-center flex-shrink-0`}
                        >
                          <catConfig.icon
                            className={`w-5 h-5 ${catConfig.color}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm md:text-base font-black text-neutral leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {cert.title}
                          </h3>
                          {/* Category Badge */}
                          <span
                            className={`inline-flex items-center gap-0.5 mt-1 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${catConfig.bgColor} ${catConfig.color}`}
                          >
                            {catConfig.label}
                          </span>
                        </div>
                      </div>

                      {/* Certificate Details */}
                      <div className="space-y-1.5 flex-1">
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
                        {cert.credentialId && (
                          <div className="flex items-center gap-2 text-neutral-soft">
                            <HiBadgeCheck className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500" />
                            <span className="text-xs font-mono text-emerald-600 truncate">
                              {cert.credentialId}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-[11px] md:text-xs text-neutral-soft leading-relaxed mt-3 pt-3 border-t border-primary/10 line-clamp-3">
                        {cert.description}
                      </p>

                      {/* View Image Button (if has image) */}
                      {cert.image && (
                        <button
                          onClick={() =>
                            openLightbox(cert.image!, cert.title)
                          }
                          className="mt-3 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                        >
                          <HiPhotograph className="w-3.5 h-3.5" />
                          Lihat Sertifikat
                        </button>
                      )}
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Show More / Show Less Button */}
            {hasMore && !showAll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8 md:mt-12"
              >
                <button
                  onClick={() => setShowAll(true)}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <HiChevronDown className="w-4 h-4" />
                  Tampilkan Semua ({filteredCerts.length - INITIAL_SHOW_COUNT}{" "}
                  lagi)
                </button>
              </motion.div>
            )}

            {showAll && hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-8 md:mt-12"
              >
                <button
                  onClick={() => setShowAll(false)}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <HiChevronUp className="w-4 h-4" />
                  Tampilkan Lebih Sedikit
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full max-h-[85vh] bg-white rounded-soft-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-primary/10 bg-cream/50">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-bold text-neutral truncate pr-4">
                    {lightboxTitle}
                  </h4>
                  {lightboxImages.length > 1 && (
                    <p className="text-xs text-neutral-light mt-0.5">
                      Halaman {lightboxIndex + 1} dari {lightboxImages.length}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeLightbox}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral/10 hover:bg-neutral/20 flex items-center justify-center transition-colors"
                  aria-label="Tutup"
                >
                  <HiX className="w-4 h-4 text-neutral" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative w-full h-[60vh] md:h-[70vh] bg-neutral/5">
                <Image
                  src={lightboxImages[lightboxIndex]}
                  alt={`${lightboxTitle} - Halaman ${lightboxIndex + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />

                {/* Navigation Arrows (only show if multiple images) */}
                {lightboxImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
                      aria-label="Halaman sebelumnya"
                    >
                      <HiChevronUp className="w-5 h-5 text-neutral rotate-[-90deg]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
                      aria-label="Halaman selanjutnya"
                    >
                      <HiChevronUp className="w-5 h-5 text-neutral rotate-90" />
                    </button>
                  </>
                )}
              </div>

              {/* Page Indicators (only show if multiple images) */}
              {lightboxImages.length > 1 && (
                <div className="flex justify-center gap-1.5 px-4 py-3 bg-cream/50 border-t border-primary/10">
                  {lightboxImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === lightboxIndex
                          ? "bg-primary w-6"
                          : "bg-neutral/30 hover:bg-neutral/50"
                      }`}
                      aria-label={`Halaman ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
