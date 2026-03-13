'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import portfolioData from '@/data/portfolio.json';

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', message: '' });

  const contactLinks = [
    { icon: FaGithub, label: 'GitHub', value: 'adndaaryadi', href: portfolioData.contact.github },
    { icon: FaLinkedin, label: 'LinkedIn', value: 'Adinda Salsa', href: portfolioData.contact.linkedin },
    { icon: HiLocationMarker, label: 'Lokasi', value: portfolioData.contact.location, href: '#' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const linkedinUrl = portfolioData.contact.linkedin;
    window.open(linkedinUrl, '_blank');
  };

  return (
    <section id="kontak" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hubungi <span className="text-gradient">Saya</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Tertarik untuk berkolaborasi atau punya pertanyaan? Jangan ragu untuk menghubungi saya!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass-card p-4 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-smooth bg-primary/10 flex items-center justify-center
                              group-hover:bg-primary/20 transition-colors">
                  <link.icon className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{link.label}</p>
                  <p className="text-gray-300 font-medium">{link.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6 space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-1.5">Nama</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-dark-400/50 border border-gray-700/50 rounded-smooth
                           text-white placeholder-gray-600 focus:outline-none focus:border-primary/50
                           transition-colors"
                placeholder="Nama lengkap kamu"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-1.5">Pesan</label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-dark-400/50 border border-gray-700/50 rounded-smooth
                           text-white placeholder-gray-600 focus:outline-none focus:border-primary/50
                           transition-colors resize-none"
                placeholder="Tulis pesan kamu di sini..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary rounded-smooth text-white font-semibold
                         hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/25
                         transition-all duration-300"
            >
              Hubungi via LinkedIn
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
