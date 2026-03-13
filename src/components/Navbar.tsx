'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Beranda', href: '#beranda' },
  { name: 'Tentang', href: '#tentang' },
  { name: 'Skill', href: '#skill' },
  { name: 'Proyek', href: '#proyek' },
  { name: 'Pengalaman', href: '#pengalaman' },
  { name: 'Kontak', href: '#kontak' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 ${
        isScrolled ? 'px-4' : 'px-6'
      }`}
    >
      <div 
        className={`max-w-5xl mx-auto transition-all duration-500 rounded-soft-lg flex items-center justify-between px-6 py-3 ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-md shadow-soft border border-white/40' 
            : 'bg-transparent'
        }`}
      >
        <a href="#beranda" className="text-2xl font-black text-primary hover:scale-105 transition-transform">
          S<span className="text-secondary">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-neutral-light hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href="#kontak" className="btn-primary py-2 text-sm">
            Kontak
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-neutral-light transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-neutral-light transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-neutral-light transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-soft-xl shadow-soft-lg border border-white/40 p-8 md:hidden flex flex-col gap-6 items-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-neutral-light hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center">
              Kontak Saya
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
