"use client";

import { motion } from "framer-motion";
import { Github, Instagram, MessageCircle, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/30 text-sm flex items-center gap-1.5"
        >
          Built with <Heart size={13} className="text-pink-500" /> by{" "}
          <span className="gradient-text font-semibold">Tama El Pablo</span>
        </motion.div>

        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/el-pablos", icon: <Github size={16} /> },
            { href: "https://instagram.com/tam.aspx", icon: <Instagram size={16} /> },
            { href: "https://wa.me/6282210819939", icon: <MessageCircle size={16} /> },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-cyan-400 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <p className="text-white/20 text-xs">© 2026 tams.codes</p>
      </div>
    </footer>
  );
}
