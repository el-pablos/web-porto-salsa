"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Zap } from "lucide-react";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "30+", label: "Projects Built" },
  { value: "∞", label: "Lines of Code" },
];

const facts = [
  { icon: <Code2 size={18} />, text: "Full-stack — from database to UI" },
  { icon: <Cpu size={18} />, text: "AI & chatbot integration specialist" },
  { icon: <Zap size={18} />, text: "Always learning, always shipping" },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono mb-3">// about me</p>
          <h2 className="text-4xl md:text-5xl font-black">
            Who Am <span className="gradient-text">I?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 rounded-2xl glass gradient-border overflow-hidden flex items-center justify-center">
                <div className="text-8xl select-none">👨‍💻</div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -right-4 px-4 py-2 glass border border-cyan-500/30 rounded-xl text-sm text-cyan-400 font-mono"
              >
                el-pablos
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Halo! Gw <span className="text-white font-semibold">Tama El Pablo</span> — developer yang suka bikin hal-hal keren dari nol.
              Dari backend API sampai frontend yang smooth, dari chatbot AI sampai data pipeline.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Passionate banget di dunia AI dan automation. Suka eksplorasi teknologi baru,
              build side projects, dan kontribusi ke komunitas developer Indonesia.
            </p>

            {/* Facts */}
            <div className="flex flex-col gap-3 mb-8">
              {facts.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-white/60"
                >
                  <span className="text-cyan-400">{f.icon}</span>
                  <span>{f.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 text-center border border-white/5"
                >
                  <div className="text-2xl font-black gradient-text">{s.value}</div>
                  <div className="text-xs text-white/40 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
