"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Instagram, MessageCircle, Mail, Send, CheckCircle } from "lucide-react";

const socials = [
  { label: "GitHub", handle: "el-pablos", href: "https://github.com/el-pablos", icon: <Github size={20} />, color: "hover:border-white/40 hover:text-white" },
  { label: "Instagram", handle: "tam.aspx", href: "https://instagram.com/tam.aspx", icon: <Instagram size={20} />, color: "hover:border-pink-500/40 hover:text-pink-400" },
  { label: "WhatsApp", handle: "082210819939", href: "https://wa.me/6282210819939", icon: <MessageCircle size={20} />, color: "hover:border-green-500/40 hover:text-green-400" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:tama@tams.codes?subject=From ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name} (${form.email})`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono mb-3">// get in touch</p>
          <h2 className="text-4xl md:text-5xl font-black">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto">
            Punya project keren? Mau kolaborasi? Atau sekadar say hi — w selalu open buat ngobrol.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-white/60 text-sm font-mono mb-2">// find me at</h3>
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className={`flex items-center gap-4 p-4 glass rounded-xl border border-white/5 ${s.color} transition-all duration-200`}
              >
                <span className="text-white/40">{s.icon}</span>
                <div>
                  <div className="font-medium text-white">{s.label}</div>
                  <div className="text-sm text-white/40">{s.handle}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <h3 className="text-white/60 text-sm font-mono mb-2">// send message</h3>
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-3 rounded-xl glass border border-white/10 focus:border-cyan-500/50 outline-none text-white placeholder:text-white/30 bg-transparent transition-colors"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-3 rounded-xl glass border border-white/10 focus:border-cyan-500/50 outline-none text-white placeholder:text-white/30 bg-transparent transition-colors"
            />
            <textarea
              placeholder="What's on your mind?"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="px-4 py-3 rounded-xl glass border border-white/10 focus:border-cyan-500/50 outline-none text-white placeholder:text-white/30 bg-transparent transition-colors resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition-opacity"
            >
              {sent ? (
                <><CheckCircle size={18} /> Sent!</>
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
