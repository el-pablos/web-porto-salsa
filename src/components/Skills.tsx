"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend",
    color: "cyan",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 82 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vue.js", level: 70 },
    ],
  },
  {
    category: "Backend",
    color: "purple",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "Python", level: 80 },
      { name: "REST API", level: 92 },
      { name: "GraphQL", level: 65 },
    ],
  },
  {
    category: "AI & Data",
    color: "pink",
    skills: [
      { name: "Claude API", level: 88 },
      { name: "OpenAI API", level: 85 },
      { name: "LangChain", level: 70 },
      { name: "SQLite / MySQL", level: 85 },
      { name: "Python ML", level: 72 },
    ],
  },
  {
    category: "DevOps & Tools",
    color: "cyan",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 70 },
      { name: "Vercel / Railway", level: 85 },
      { name: "Linux / VPS", level: 78 },
      { name: "CI/CD", level: 68 },
    ],
  },
];

const colorMap: Record<string, string> = {
  cyan: "from-cyan-500 to-cyan-300",
  purple: "from-purple-600 to-purple-400",
  pink: "from-pink-500 to-pink-300",
};

const borderMap: Record<string, string> = {
  cyan: "border-cyan-500/20",
  purple: "border-purple-500/20",
  pink: "border-pink-500/20",
};

const textMap: Record<string, string> = {
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono mb-3">// tech stack</p>
          <h2 className="text-4xl md:text-5xl font-black">
            My <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className={`glass rounded-2xl p-6 border ${borderMap[group.color]}`}
            >
              <h3 className={`font-bold text-lg mb-5 ${textMap[group.color]}`}>
                {group.category}
              </h3>
              <div className="flex flex-col gap-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/40">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: si * 0.08 }}
                        className={`h-full rounded-full bg-gradient-to-r ${colorMap[group.color]}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
