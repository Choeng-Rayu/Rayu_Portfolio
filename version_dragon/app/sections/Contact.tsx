'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'choengrayu307@gmail.com',
    href: 'mailto:choengrayu307@gmail.com',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: '+855 12 345 678',
    href: 'tel:+85512345678',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: 'Cambodia',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    href: 'https://github.com/Choeng-Rayu',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    label: 'Portfolio',
    href: 'https://rayu-choeng.tech',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pointer-events-none" />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff4500]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff4500]/3 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="font-[var(--font-playfair-display)] text-4xl sm:text-5xl md:text-6xl font-normal text-white/95 mb-4">
            Get In <span className="text-[#ff4500] drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">Touch</span>
          </h2>
          <p className="font-[var(--font-inter)] text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Let&apos;s collaborate on something amazing. I&apos;m always open to discussing new projects,
            creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-[var(--font-inter)] text-xl sm:text-2xl font-medium text-white/90">
                Let&apos;s work together
              </h3>
              <p className="font-[var(--font-inter)] text-sm sm:text-base text-white/50 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hi,
                I&apos;d love to hear from you. Fill out the form or reach out directly through any
                of the channels below.
              </p>
            </div>

            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ scale: 1.02, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff4500]/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#ff4500]/10 text-[#ff4500] group-hover:bg-[#ff4500]/20 group-hover:shadow-[0_0_20px_rgba(255,69,0,0.3)] transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-[var(--font-inter)] text-xs text-white/40 uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="font-[var(--font-inter)] text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="pt-4">
              <p className="font-[var(--font-inter)] text-xs text-white/40 uppercase tracking-wider mb-4">
                Connect on social
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#ff4500] hover:border-[#ff4500]/40 hover:shadow-[0_0_20px_rgba(255,69,0,0.2)] transition-all duration-300"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="font-[var(--font-inter)] text-xs text-white/60 uppercase tracking-wider"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white/90 placeholder:text-white/30 font-[var(--font-inter)] text-sm focus:outline-none focus:border-[#ff4500]/60 focus:shadow-[0_0_20px_rgba(255,69,0,0.15)] transition-all duration-300 ${
                        errors.name ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 font-[var(--font-inter)] text-xs text-red-400"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="font-[var(--font-inter)] text-xs text-white/60 uppercase tracking-wider"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white/90 placeholder:text-white/30 font-[var(--font-inter)] text-sm focus:outline-none focus:border-[#ff4500]/60 focus:shadow-[0_0_20px_rgba(255,69,0,0.15)] transition-all duration-300 ${
                        errors.email ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 font-[var(--font-inter)] text-xs text-red-400"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="font-[var(--font-inter)] text-xs text-white/60 uppercase tracking-wider"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white/90 placeholder:text-white/30 font-[var(--font-inter)] text-sm focus:outline-none focus:border-[#ff4500]/60 focus:shadow-[0_0_20px_rgba(255,69,0,0.15)] transition-all duration-300 ${
                      errors.subject ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="Project collaboration"
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 font-[var(--font-inter)] text-xs text-red-400"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="font-[var(--font-inter)] text-xs text-white/60 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white/90 placeholder:text-white/30 font-[var(--font-inter)] text-sm resize-none focus:outline-none focus:border-[#ff4500]/60 focus:shadow-[0_0_20px_rgba(255,69,0,0.15)] transition-all duration-300 ${
                      errors.message ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 font-[var(--font-inter)] text-xs text-red-400"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full py-4 rounded-lg font-[var(--font-inter)] text-sm font-medium text-white bg-[#ff4500] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span
                    className={`relative z-10 flex items-center justify-center gap-2 transition-all duration-300 ${
                      isSubmitting ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff4500] to-[#ff6a00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="font-[var(--font-inter)] text-sm">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
