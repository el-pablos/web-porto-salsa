"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Instagram, MessageCircle, ArrowDown, Terminal } from "lucide-react";

const roles = [
  "Full-Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Open Source Contributor",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = roles[roleIndex];
    let i = 0;
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => {
          setDisplayed(role.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-cyan-400 text-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Available for new projects
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-4 tracking-tight"
        >
          <span className="text-white">Tama </span>
          <span className="gradient-text">El Pablo</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-light text-white/60 mb-6 h-10"
        >
          <Terminal size={24} className="text-cyan-400" />
          <span className="text-cyan-300 font-mono">{displayed}</span>
          <span className="w-0.5 h-7 bg-cyan-400 animate-pulse" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/50 max-w-xl mx-auto text-lg mb-10 leading-relaxed"
        >
          Building cool things with code — from AI chatbots to full-stack web apps.
          Passionate about clean code, creative solutions, and turning ideas into reality.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl font-semibold glass border border-white/10 hover:border-cyan-500/40 transition-all duration-200 hover:scale-105"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-5"
        >
          {[
            { href: "https://github.com/el-pablos", icon: <Github size={20} />, label: "GitHub" },
            { href: "https://instagram.com/tam.aspx", icon: <Instagram size={20} />, label: "Instagram" },
            { href: "https://wa.me/6282210819939", icon: <MessageCircle size={20} />, label: "WhatsApp" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
