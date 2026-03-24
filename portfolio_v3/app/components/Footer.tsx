"use client";

import { motion } from "framer-motion";
import { Mail, Send, Heart } from "lucide-react";
import { socialLinks, personalInfo } from "@/app/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Send,
};

export function Footer() {
  return (
    <footer className="relative mt-20 sm:mt-32 pb-8 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-white font-bold">CR</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Choeng Rayu</h3>
                <p className="text-xs text-text-muted">Software Engineer</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary max-w-xs">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-wrap gap-2">
              {["About", "Projects", "Skills", "Experience", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon] || Mail;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-sm text-text-muted">
              {personalInfo.email}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted"
        >
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-danger inline animate-pulse" /> using Next.js & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
