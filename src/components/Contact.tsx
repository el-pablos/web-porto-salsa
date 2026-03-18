"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiLocationMarker,
  HiCheckCircle,
  HiExclamationCircle,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import portfolioData from "@/data/portfolio.json";
import { BouncyEntrance } from "@/components/effects/BouncyEntrance";
import { RippleButton } from "@/components/effects/RippleButton";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const contactLinks = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "Adinda Salsa",
      href: portfolioData.contact.linkedin,
      color: "text-blue-600",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "adndaaryadi",
      href: portfolioData.contact.github,
      color: "text-neutral",
    },
    {
      icon: HiLocationMarker,
      label: "Lokasi",
      value: portfolioData.contact.location,
      href: "#",
      color: "text-red-500",
    },
  ];

  // Validasi email sederhana
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validasi form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Pesan wajib diisi";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Pesan minimal 10 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validasi single field saat blur
  const validateField = (field: keyof FormData): void => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!formData.name.trim()) {
          newErrors.name = "Nama wajib diisi";
        } else if (formData.name.trim().length < 2) {
          newErrors.name = "Nama minimal 2 karakter";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (!formData.email.trim()) {
          newErrors.email = "Email wajib diisi";
        } else if (!isValidEmail(formData.email)) {
          newErrors.email = "Format email tidak valid";
        } else {
          delete newErrors.email;
        }
        break;
      case "message":
        if (!formData.message.trim()) {
          newErrors.message = "Pesan wajib diisi";
        } else if (formData.message.trim().length < 10) {
          newErrors.message = "Pesan minimal 10 karakter";
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error saat user mulai mengetik
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle blur untuk validasi real-time
  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    if (!validateForm()) {
      return;
    }

    setSubmitStatus("loading");

    try {
      // Simulasi delay untuk UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Buat mailto link dengan data form
      const subject = encodeURIComponent(
        `Pesan dari ${formData.name} via Portfolio`,
      );
      const body = encodeURIComponent(
        `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`,
      );

      // Buka email client dengan data terisi
      const mailtoLink = `mailto:adnda.salsa@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      setSubmitStatus("success");

      // Reset form setelah sukses
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setTouched({});
        setSubmitStatus("idle");
      }, 3000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  // Helper untuk mendapatkan class input berdasarkan state
  const getInputClassName = (field: keyof FormData): string => {
    const baseClass =
      "w-full px-5 py-4 bg-soft-light/50 border-2 rounded-soft-md focus:outline-none transition-all font-medium";
    const hasError = touched[field] && errors[field];
    const isValid = touched[field] && !errors[field] && formData[field];

    if (hasError) {
      return `${baseClass} border-red-400 focus:border-red-500 bg-red-50/30`;
    }
    if (isValid) {
      return `${baseClass} border-green-400 focus:border-green-500`;
    }
    return `${baseClass} border-transparent focus:border-primary/20 focus:bg-white`;
  };

  return (
    <section id="kontak" className="section-container" ref={ref}>
      <BouncyEntrance>
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
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-soft p-5 flex items-center gap-5 group hover:bg-white"
                >
                  <div
                    className={`w-12 h-12 rounded-soft-md bg-neutral/5 flex items-center justify-center text-2xl ${link.color} group-hover:scale-110 transition-transform`}
                  >
                    <link.icon />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-neutral-soft mb-0.5">
                      {link.label}
                    </p>
                    <p className="font-bold text-neutral group-hover:text-primary transition-colors">
                      {link.value}
                    </p>
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
              noValidate
            >
              {/* Success/Error Message */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-soft-md"
                  >
                    <HiCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                    <p className="text-green-700 text-sm font-medium">
                      Email client terbuka! Silakan kirim pesan dari aplikasi
                      email kamu.
                    </p>
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-soft-md"
                  >
                    <HiExclamationCircle className="text-red-500 text-xl flex-shrink-0" />
                    <p className="text-red-700 text-sm font-medium">
                      Terjadi kesalahan. Silakan coba lagi.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-black text-neutral uppercase tracking-wider ml-1"
                  >
                    Nama Kamu
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={getInputClassName("name")}
                    placeholder="John Doe"
                    disabled={submitStatus === "loading"}
                  />
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <motion.p
                        id="name-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs font-medium ml-1"
                        role="alert"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-black text-neutral uppercase tracking-wider ml-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={getInputClassName("email")}
                    placeholder="john@example.com"
                    disabled={submitStatus === "loading"}
                  />
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs font-medium ml-1"
                        role="alert"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-black text-neutral uppercase tracking-wider ml-1"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`${getInputClassName("message")} resize-none`}
                  placeholder="Halo Salsa, saya tertarik untuk berkolaborasi..."
                  disabled={submitStatus === "loading"}
                />
                <AnimatePresence>
                  {touched.message && errors.message && (
                    <motion.p
                      id="message-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-xs font-medium ml-1"
                      role="alert"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                {/* Character count */}
                <p className="text-xs text-neutral-soft ml-1">
                  {formData.message.length}/500 karakter
                </p>
              </div>

              {/* Submit Button */}
              <RippleButton className="w-full">
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitStatus === "loading" ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Mengirim...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <HiCheckCircle className="text-xl" />
                      Berhasil!
                    </>
                  ) : (
                    "Kirim Pesan via Email"
                  )}
                </button>
              </RippleButton>

              <p className="text-xs text-neutral-soft text-center">
                Akan membuka aplikasi email default kamu dengan pesan yang sudah
                terisi.
              </p>
            </motion.form>
          </div>
        </div>
      </BouncyEntrance>
    </section>
  );
}
