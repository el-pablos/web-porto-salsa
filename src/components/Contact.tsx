'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiLocationMarker, HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import portfolioData from '@/data/portfolio.json';

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', message: '' });

  const contactLinks = [
    { icon: FaLinkedin, label: 'LinkedIn', value: 'Adinda Salsa', href: portfolioData.contact.linkedin, color: 'text-blue-600' },
    { icon: FaGithub, label: 'GitHub', value: 'adndaaryadi', href: portfolioData.contact.github, color: 'text-neutral' },
    { icon: HiLocationMarker, label: 'Lokasi', value: portfolioData.contact.location, href: '#', color: 'text-red-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(portfolioData.contact.linkedin, '_blank');
  };

  return (
    <section id="kontak" className="section-container" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ayo <span className="text-gradient">Terhubung</span>
          </h2>
          <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-11 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 space-y-4"
          >
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-soft p-5 flex items-center gap-5 group hover:bg-white"
              >
                <div className={`w-12 h-12 rounded-soft-md bg-neutral/5 flex items-center justify-center text-2xl ${link.color} group-hover:scale-110 transition-transform`}>
                  <link.icon />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-neutral-soft mb-0.5">{link.label}</p>
                  <p className="font-bold text-neutral group-hover:text-primary transition-colors">{link.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 card-soft p-10 space-y-8 bg-white"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-black text-neutral uppercase tracking-wider ml-1">Nama Kamu</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 bg-soft-light/50 border-2 border-transparent rounded-soft-md focus:outline-none focus:border-primary/20 focus:bg-white transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-neutral uppercase tracking-wider ml-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 bg-soft-light/50 border-2 border-transparent rounded-soft-md focus:outline-none focus:border-primary/20 focus:bg-white transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-neutral uppercase tracking-wider ml-1">Pesan</label>
              <textarea
                required
                rows={5}
                className="w-full px-5 py-4 bg-soft-light/50 border-2 border-transparent rounded-soft-md focus:outline-none focus:border-primary/20 focus:bg-white transition-all font-medium resize-none"
                placeholder="Halo Salsa, saya tertarik..."
              />
            </div>
            <button type="submit" className="btn-primary w-full py-5 text-lg">
              Kirim Pesan via LinkedIn
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
