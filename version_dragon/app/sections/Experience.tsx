'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  Heart,
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
} from 'lucide-react';
import { useState } from 'react';

interface TimelineItem {
  id: string;
  title: string;
  organization?: string;
  dateRange: string;
  description: string[];
  type: 'work' | 'volunteer';
}

interface CertificationItem {
  id: string;
  title: string;
  organization: string;
  date: string;
}

const workExperience: TimelineItem[] = [
  {
    id: 'work-1',
    title: 'Part-Time Math Tutor',
    dateRange: '2024 – February 2025',
    description: [
      'Conducted one-on-one tutoring sessions for Grade 4 and Grade 8 students',
      'Focused on improving mathematical concepts and problem-solving skills',
      '2 years experience teaching math in both Khmer and English',
    ],
    type: 'work',
  },
];

const volunteerExperience: TimelineItem[] = [
  {
    id: 'volunteer-1',
    title: 'Khoding-Hero Volunteer Program',
    organization: 'Team Leader & Instructor',
    dateRange: 'August – September 2024',
    description: [
      'Led a three-member team teaching 700 students',
      'Taught ICT and coding with Scratch',
      'Managed digital registration and attendance tracking',
    ],
    type: 'volunteer',
  },
  {
    id: 'volunteer-2',
    title: 'My First Stock Campaign',
    organization: 'Volunteer Leader',
    dateRange: 'October 2024',
    description: ['Led all volunteer members'],
    type: 'volunteer',
  },
];

const certifications: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'IT Essentials: PC Hardware and Software',
    organization: 'CISCO Networking Academy',
    date: 'Completed: May 14, 2024',
  },
  {
    id: 'cert-2',
    title: 'TechTourism Ignite',
    organization: 'NICC 12th Startup Camp',
    date: 'Completed: September 14, 2024',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const isWork = item.type === 'work';
  const Icon = isWork ? Briefcase : Heart;
  const accentColor = isWork ? 'text-amber-400' : 'text-rose-400';
  const bgAccent = isWork ? 'bg-amber-400/10' : 'bg-rose-400/10';
  const borderAccent = isWork ? 'border-amber-400/20' : 'border-rose-400/20';

  return (
    <motion.div
      variants={itemVariants}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700" />

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
        className={`absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full ${bgAccent} ${borderAccent} border-2 flex items-center justify-center`}
      >
        <div className={`w-2 h-2 rounded-full ${isWork ? 'bg-amber-400' : 'bg-rose-400'}`} />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 md:p-6 hover:border-slate-700 transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${bgAccent} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${accentColor}`} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">
                  {item.title}
                </h3>
                {item.organization && (
                  <p className={`text-sm font-medium ${accentColor}`}>
                    {item.organization}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.dateRange}</span>
              </div>
            </div>

            {/* Description */}
            <ul className="mt-4 space-y-2">
              {item.description.map((desc, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                  <span className={`mt-1.5 flex-shrink-0 w-1 h-1 rounded-full ${isWork ? 'bg-amber-400' : 'bg-rose-400'}`} />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CertificationAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {certifications.map((cert) => {
        const isOpen = openId === cert.id;
        return (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="overflow-hidden"
          >
            <motion.button
              onClick={() => toggleAccordion(cert.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full text-left bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 md:p-5 hover:border-slate-700 transition-all group"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-medium text-slate-100 truncate">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-slate-400 truncate">
                    {cert.organization}
                  </p>
                </div>

                {/* Toggle indicator */}
                <div className="flex-shrink-0 text-slate-500 group-hover:text-slate-400 transition-colors">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Expanded content */}
              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? 'auto' : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400/80 text-sm">
                    <GraduationCap className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Experience() {
  return (
    <section className="relative min-h-screen bg-black py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,41,59,0.4),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 mb-6"
          >
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-400">Professional Journey</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400">Certifications</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400 rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column: Experience Timeline */}
          <div className="lg:col-span-3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-12"
            >
              {/* Work Experience */}
              <div>
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">Work Experience</h3>
                </motion.div>

                <div className="space-y-6">
                  {workExperience.map((item, index) => (
                    <TimelineCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </div>

              {/* Volunteer Experience */}
              <div>
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-rose-400/10 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-rose-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">Volunteer Experience</h3>
                </motion.div>

                <div className="space-y-6">
                  {volunteerExperience.map((item, index) => (
                    <TimelineCard key={item.id} item={item} index={index + workExperience.length} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="lg:sticky lg:top-24"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">Certifications</h3>
              </motion.div>

              <CertificationAccordion />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
