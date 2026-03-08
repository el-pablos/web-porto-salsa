"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI WhatsApp Chatbot",
    desc: "Bot WhatsApp AI berbasis Claude API dengan persona clone 'Tamas'. Fitur: 26 callable tools, AI-First Orchestrator, unlimited conversation memory, multi-format document reader.",
    tags: ["Node.js", "Baileys", "Claude API", "SQLite"],
    github: "https://github.com/el-pablos/ai-whatsapp-chatbot",
    live: null,
    color: "cyan",
    emoji: "🤖",
  },
  {
    title: "TAMA AI — OpenClaw Agent",
    desc: "Agen AI lokal di Windows berbasis OpenClaw. Full control terminal, browser automation, file system, Telegram bot, 52 bundled skills, ClawHub marketplace.",
    tags: ["OpenClaw", "TypeScript", "Node.js", "Telegram"],
    github: "https://github.com/el-pablos",
    live: null,
    color: "purple",
    emoji: "🌀",
  },
  {
    title: "Porto.Tams.Codes",
    desc: "Portfolio website personal dengan design gacor. Dark mode, glassmorphism, animasi smooth, fully responsive. Deployed di Vercel.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/el-pablos",
    live: "https://porto.tams.codes",
    color: "pink",
    emoji: "🎨",
  },
  {
    title: "Copilot API Proxy",
    desc: "Reverse proxy untuk GitHub Copilot API — bisa dipakai sebagai OpenAI-compatible endpoint. Support streaming, multi-model, auth token.",
    tags: ["Node.js", "Express", "GitHub Copilot", "API"],
    github: "https://github.com/el-pablos/copilot-api",
    live: null,
    color: "cyan",
    emoji: "🔄",
  },
  {
    title: "Dashboard PowerBI Big Data",
    desc: "Dashboard analitik big data terintegrasi PowerBI. Visualisasi data kompleks, real-time update, export report.",
    tags: ["PowerBI", "Python", "SQL", "Data Viz"],
    github: "https://github.com/el-pablos/dashboard-powerbi-big-data",
    live: null,
    color: "purple",
    emoji: "📊",
  },
  {
    title: "Lite ERP System",
    desc: "Sistem ERP ringan untuk manajemen bisnis kecil-menengah. Modul: inventory, penjualan, laporan keuangan, manajemen user.",
    tags: ["PHP", "MySQL", "Bootstrap", "jQuery"],
    github: "https://github.com/el-pablos/lite-erp",
    live: null,
    color: "pink",
    emoji: "🏢",
  },
];

const colorMap: Record<string, { border: string; tag: string; glow: string }> = {
  cyan: { border: "border-cyan-500/20 hover:border-cyan-500/50", tag: "bg-cyan-500/10 text-cyan-400", glow: "hover:shadow-cyan-500/10" },
  purple: { border: "border-purple-500/20 hover:border-purple-500/50", tag: "bg-purple-500/10 text-purple-400", glow: "hover:shadow-purple-500/10" },
  pink: { border: "border-pink-500/20 hover:border-pink-500/50", tag: "bg-pink-500/10 text-pink-400", glow: "hover:shadow-pink-500/10" },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono mb-3">// my work</p>
          <h2 className="text-4xl md:text-5xl font-black">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`glass rounded-2xl p-6 border ${colorMap[project.color].border} ${colorMap[project.color].glow} hover:shadow-xl transition-all duration-300 flex flex-col`}
            >
              <div className="text-4xl mb-4">{project.emoji}</div>
              <h3 className="font-bold text-lg mb-2 text-white">{project.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{project.desc}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span key={tag} className={`px-2 py-1 rounded-lg text-xs font-medium ${colorMap[project.color].tag}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <Github size={15} /> Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/el-pablos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-cyan-500/40 text-white/60 hover:text-white transition-all"
          >
            <Github size={18} />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
