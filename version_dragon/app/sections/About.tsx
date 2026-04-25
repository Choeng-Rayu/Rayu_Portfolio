'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Palette,
  Brain,
  Users,
  GitBranch,
  Bug,
  Zap,
  Database,
  Plug,
  GraduationCap,
  Award,
  Clock,
  School,
} from 'lucide-react';

interface EducationItem {
  school: string;
  degree: string;
  year: string;
  achievements?: string[];
  highlight?: string;
}

const educationData: EducationItem[] = [
  {
    school: 'Cambodia Academy of Digital Technology',
    degree: "Bachelor's in Computer Science",
    year: 'Currently Year 3',
    achievements: [
      'Techo Digital Talent Scholarship recipient',
      'Joint ALCPP Program In The Capacity Specialists - 5-month program focusing on Teamwork, Communication, Growth Mindset, Critical Thinking',
    ],
    highlight: 'Scholarship Recipient',
  },
  {
    school: 'Hun Sen Borey 100 Knong High School',
    degree: 'Baccalauréat (Bac II)',
    year: 'Completed',
    achievements: ['Grade B'],
  },
];

const expertiseItems = [
  { name: 'Web Development', icon: Code2 },
  { name: 'Mobile Development', icon: Smartphone },
  { name: 'UI/UX Design', icon: Palette },
  { name: 'Problem Solving', icon: Brain },
  { name: 'Team Collaboration', icon: Users },
  { name: 'Version Control', icon: GitBranch },
  { name: 'Testing & Debugging', icon: Bug },
  { name: 'Performance Optimization', icon: Zap },
  { name: 'Database Management', icon: Database },
  { name: 'API Integration', icon: Plug },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const About: React.FC = () => {
  return (
    <section className="min-h-screen w-full bg-[#0a0a0a] relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Background gradient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-orange-500/60" />
            <span className="text-orange-400/80 font-mono text-xs tracking-[0.3em] uppercase">
              Get To Know Me
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            About{' '}
            <span className="text-orange-500 font-normal italic">Me</span>
          </h2>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="relative p-8 sm:p-12 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed font-light">
              Hands-on software engineering student driven by{' '}
              <span className="text-orange-400 font-normal">curiosity</span>,{' '}
              <span className="text-orange-400 font-normal">discipline</span>, and{' '}
              <span className="text-orange-400 font-normal">purpose</span>.
              Coming from a financially challenged family, I see education and
              technology as tools for change. I specialize in creating
              innovative web applications and software solutions using modern
              technologies.
            </p>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <GraduationCap className="w-6 h-6 text-orange-500" />
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              Education
            </h3>
          </motion.div>

          <div className="space-y-8">
            {educationData.map((edu) => (
              <motion.div
                key={edu.school}
                variants={cardVariants}
                className="relative pl-8 sm:pl-12 border-l border-orange-500/30"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[6.5px] rounded-full bg-orange-500 shadow-[0_0_10px_rgba(255,69,0,0.5)]" />
                <div className="p-6 sm:p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-xl sm:text-2xl font-light text-white mb-1">
                        {edu.school}
                      </h4>
                      <p className="text-white/60 font-light">{edu.degree}</p>
                    </div>
                    <div className="flex items-center gap-2 text-orange-400/80">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-mono">{edu.year}</span>
                    </div>
                  </div>

                  {edu.highlight && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 w-fit">
                      <Award className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-orange-300 font-medium">
                        {edu.highlight}
                      </span>
                    </div>
                  )}

                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-white/70 text-sm sm:text-base"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500/60 mt-2 shrink-0" />
                          <span className="font-light">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <School className="w-6 h-6 text-orange-500" />
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              Expertise
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {expertiseItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <span className="text-sm sm:text-base text-white/80 font-light group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default About;
