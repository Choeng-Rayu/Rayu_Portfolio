'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Choeng-Rayu', Icon: GithubIcon },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand & Quote */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-[family-name:var(--font-playfair-display)] text-2xl sm:text-3xl text-[#E4E3E0] tracking-tight">
                Rayu Choeng
              </h3>
              <div className="h-[1px] w-12 bg-[#ff4500]/60 mt-4" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[family-name:var(--font-inter)] text-sm text-white/40 italic leading-relaxed"
            >
              &ldquo;Turning ideas into reality through code.&rdquo;
            </motion.p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-[family-name:var(--font-geist-sans)] text-xs text-white/30 uppercase tracking-[0.2em]"
            >
              Navigation
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-[family-name:var(--font-inter)] text-sm text-white/50 hover:text-[#ff4500] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Social & Back to Top */}
          <div className="space-y-6">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-[family-name:var(--font-geist-sans)] text-xs text-white/30 uppercase tracking-[0.2em]"
            >
              Connect
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-[#ff4500]/50 hover:bg-[#ff4500]/10 transition-all duration-300"
                >
                  <link.Icon className="w-4 h-4 text-white/50 group-hover:text-[#ff4500] transition-colors duration-300" />
                </a>
              ))}
            </motion.div>

            {/* Back to Top */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={scrollToTop}
              className="group flex items-center gap-2 mt-4 text-white/30 hover:text-[#ff4500] transition-colors duration-300"
              aria-label="Back to top"
            >
              <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.15em]">
                Back to top
              </span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/10 group-hover:border-[#ff4500]/50 group-hover:bg-[#ff4500]/10 transition-all duration-300">
                <ArrowUp className="w-3 h-3" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-[family-name:var(--font-inter)] text-xs text-white/30">
            &copy; 2025 Rayu Choeng. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/20 tracking-[0.4em] uppercase">
            <span className="text-[#ff4500]/50">&lt;/</span>
            <span>build</span>
            <span className="text-[#ff4500]/50">&gt;</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
