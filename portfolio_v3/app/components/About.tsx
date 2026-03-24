"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { AnimatedItem } from "./Section";
import { personalInfo } from "@/app/lib/data";

export function About() {
  const stats = [
    { value: personalInfo.stats.yearsOfExperience, label: "Years Coding" },
    { value: personalInfo.stats.projectsShipped, label: "Projects Shipped" },
    { value: personalInfo.stats.currentYear, label: "Education" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Photo */}
          <AnimatedItem className="order-1">
            <div className="relative mx-auto max-w-sm">
              {/* Rotating ring */}
              <div className="absolute inset-0 animate-rotate-ring">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#009DFF" />
                      <stop offset="50%" stopColor="#40BAFF" />
                      <stop offset="100%" stopColor="#009DFF" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r="95"
                    fill="none"
                    stroke="url(#ringGradient)"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                  />
                </svg>
              </div>

              {/* Profile image container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl"
              >
                <Image
                  src="/Rayu_Photo.png"
                  alt={personalInfo.name}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover aspect-square"
                  priority
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -right-4 top-8 glass rounded-xl px-3 py-2"
              >
                <span className="text-2xl">🇰🇭</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -left-4 bottom-16 glass rounded-xl px-3 py-2"
              >
                <span className="text-sm text-white font-medium">Born 2005</span>
              </motion.div>
            </div>
          </AnimatedItem>

          {/* Content */}
          <div className="order-2 space-y-8">
            <AnimatedItem>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                About <span className="text-primary">Me</span>
              </h2>
            </AnimatedItem>

            <AnimatedItem delay={0.1}>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                {personalInfo.bio}
              </p>
            </AnimatedItem>

            <AnimatedItem delay={0.2}>
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4" />
                <span>Born {personalInfo.birthDate}</span>
              </div>
            </AnimatedItem>

            {/* Stats Grid */}
            <AnimatedItem delay={0.3}>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="glass rounded-2xl p-4 sm:p-6 text-center hover:border-primary/30 transition-colors"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-text-muted">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedItem>
          </div>
        </div>
      </div>
    </section>
  );
}
