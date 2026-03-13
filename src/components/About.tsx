'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiCode, HiChartBar, HiShieldCheck } from 'react-icons/hi';

const highlights = [
  {
    icon: HiChartBar,
    title: 'Data Analysis',
    desc: 'Mengolah dataset besar menjadi insight yang actionable',
  },
  {
    icon: HiCode,
    title: 'Visualization',
    desc: 'Membangun dashboard & chart interaktif yang informatif',
  },
  {
    icon: HiShieldCheck,
    title: 'QA Testing',
    desc: 'Memastikan kualitas software melalui testing metodis',
  },
  {
    icon: HiAcademicCap,
    title: 'Research',
    desc: 'Riset sosial kuantitatif dengan pendekatan data-driven',
  },
];

export function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="tentang" className="py-20 md:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tentang <span className="text-gradient">Saya</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
              Saya <span className="text-primary font-semibold">Adinda Salsa Aryadi Putri</span>,
              mahasiswi Sosiologi di FISIP Universitas Nasional (UNAS) angkatan 2022.
              Saya memiliki passion besar dalam mengolah data mentah menjadi informasi
              yang bermakna dan dapat digunakan untuk pengambilan keputusan.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Pengalaman saya di Komisi Nasional Disabilitas (KND) membuka mata saya
              tentang pentingnya data dalam mendukung kebijakan publik. Di sana saya
              belajar menganalisis dataset nasional dan membangun visualisasi data
              untuk laporan tahunan.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Saat ini saya aktif mengeksplorasi bidang Quality Assurance dan
              Security Testing, menggabungkan kemampuan analitis saya dengan
              metodologi pengujian software yang terstruktur.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="glass-card p-5 text-center"
              >
                <item.icon className="text-primary text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
