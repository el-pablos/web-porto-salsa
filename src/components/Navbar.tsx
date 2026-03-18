"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Variants untuk stagger animation saat navbar entrance
const navbarContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const navLinkVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

const mobileToggleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.3,
    },
  },
};

const navLinks = [
  { name: "Beranda", href: "#beranda", sectionId: "beranda" },
  { name: "Tentang", href: "#tentang", sectionId: "tentang" },
  { name: "Skill", href: "#skill", sectionId: "skill" },
  { name: "Proyek", href: "#proyek", sectionId: "proyek" },
  { name: "Pengalaman", href: "#pengalaman", sectionId: "pengalaman" },
  { name: "Kontak", href: "#kontak", sectionId: "kontak" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("beranda");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Refs untuk keyboard navigation dan focus management
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  // Unique ID untuk ARIA attributes
  const mobileMenuId = useId();

  // IntersectionObserver untuk mendeteksi section yang visible
  const setupIntersectionObserver = useCallback(() => {
    // Cleanup observer sebelumnya
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger saat section 20% dari atas viewport
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe semua section
    navLinks.forEach((link) => {
      const section = document.getElementById(link.sectionId);
      if (section) {
        observerRef.current?.observe(section);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Setup IntersectionObserver setelah mount
  useEffect(() => {
    // Delay sedikit untuk memastikan semua section sudah di-render
    const timer = setTimeout(() => {
      setupIntersectionObserver();
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [setupIntersectionObserver]);

  // Scroll lock saat mobile menu terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scroll
      document.body.style.overflow = "";
    }

    // Cleanup saat unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Keyboard navigation: Escape untuk close mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Return focus ke toggle button
        mobileToggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Focus trap untuk mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements =
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift+Tab dari element pertama -> pindah ke element terakhir
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // Tab dari element terakhir -> pindah ke element pertama
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleTabKeyPress);
    return () => document.removeEventListener("keydown", handleTabKeyPress);
  }, [isMobileMenuOpen]);

  // Auto-focus ke menu pertama saat mobile menu dibuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Delay sedikit untuk memastikan animasi sudah mulai
      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      aria-label="Navigasi utama"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 ${
        isScrolled ? "px-4" : "px-6"
      }`}
    >
      <div
        className={`max-w-5xl mx-auto transition-all duration-500 rounded-soft-lg flex items-center justify-between px-6 py-3 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-md shadow-soft border border-white/40"
            : "bg-transparent"
        }`}
      >
        <a
          href="#beranda"
          aria-label="Kembali ke beranda"
          className="text-2xl font-black text-primary hover:scale-105 transition-transform rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          S<span className="text-secondary">.</span>
        </a>

        {/* Desktop Menu */}
        <div
          role="menubar"
          aria-label="Menu navigasi desktop"
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-semibold transition-colors duration-300 relative group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isActive
                    ? "text-primary"
                    : "text-neutral-light hover:text-primary"
                }`}
              >
                {link.name}
                {/* Active indicator dengan animasi smooth */}
                {isActive ? (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all duration-300 group-hover:w-full rounded-full" />
                )}
              </a>
            );
          })}
          <a
            href="#kontak"
            role="menuitem"
            className="btn-primary py-2 text-sm rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Kontak
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          ref={mobileToggleRef}
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
          aria-label={
            isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
          }
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            aria-hidden="true"
            className={`w-6 h-0.5 bg-neutral-light transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            aria-hidden="true"
            className={`w-6 h-0.5 bg-neutral-light transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            aria-hidden="true"
            className={`w-6 h-0.5 bg-neutral-light transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id={mobileMenuId}
            role="menu"
            aria-label="Menu navigasi mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-soft-xl shadow-soft-lg border border-white/40 p-8 md:hidden flex flex-col gap-6 items-center"
          >
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.sectionId;
              const isFirst = index === 0;
              return (
                <a
                  key={link.name}
                  ref={isFirst ? firstFocusableRef : undefined}
                  href={link.href}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold transition-colors duration-300 flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive
                      ? "text-primary"
                      : "text-neutral-light hover:text-primary"
                  }`}
                >
                  {/* Dot indicator untuk mobile */}
                  {isActive && (
                    <motion.span
                      layoutId="mobileActiveIndicator"
                      className="w-2 h-2 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
            <a
              href="#kontak"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary w-full text-center"
            >
              Kontak Saya
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
