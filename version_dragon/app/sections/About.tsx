'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ExternalLink,
  BookOpen,
  Briefcase,
  Heart,
  BadgeCheck,
  ChevronRight,
} from 'lucide-react';

// Certificate Types
const CERTIFICATE_TYPES = {
  Academic: 'Academic',
  Professional: 'Professional Training',
  Volunteer: 'Volunteer Certificate',
  Work: 'Work Certificate',
} as const;

type CertificateType = typeof CERTIFICATE_TYPES[keyof typeof CERTIFICATE_TYPES];

// Certificate Data
const certificatesData = [
  {
    type: CERTIFICATE_TYPES.Academic,
    title: 'Baccalauréat (Bac II)',
    institution: 'Hun Sen Borey 100 Knong High School',
    grade: 'Grade B',
    date: 'November 24, 2023',
    verificationUrl: 'https://verify.gov.kh/verify/ba1d31fd9f3c2853edd973e955cc7845e484a182774a5d12568f7caeea471ac3?key=0037327bb0844bf7691ae5c882a2bc1e4933739b4dfc16d53c89558900a590fc',
  },
  {
    type: CERTIFICATE_TYPES.Academic,
    title: "Bachelor's in Computer Science (Year 3)",
    institution: 'Cambodia Academy of Digital Technology',
    status: 'Currently Enrolled',
    period: 'January 2024 – Present',
    verificationUrl: 'https://verify.gov.kh/verify/3b35764c208b34af1c95ab3a09f5b2aefa7332b65e98b1c8e184eb635e9508f2?key=2c43a7002735a6333689d5088412f4f870c205535bdc92913e892b21bf5bd44a',
  },
  {
    type: CERTIFICATE_TYPES.Professional,
    title: 'IT Essentials: PC Hardware and Software',
    organization: 'CISCO Networking Academy',
    completedDate: 'May 14, 2024',
    topics: ['Computer hardware and software installation', 'Troubleshooting and maintenance', 'PC assembly', 'Operating system management'],
    verificationUrl: 'https://drive.google.com/file/d/1oXMj11rTBcqAv8aSn0ER5J138DXmyAW1/view?usp=drivesdk',
  },
  {
    type: CERTIFICATE_TYPES.Professional,
    title: 'NICC 12th Startup Camp: TechTourism Ignite',
    organization: 'National Institute of Cambodia (NICC)',
    completedDate: 'September 14, 2024',
    focus: 'Empowering entrepreneurs to innovate in tourism through technology',
    verificationUrl: 'https://drive.google.com/file/d/1odE4Bo0jImOM72HfIUurMetj00JTy6LW/view?usp=drivesdk',
  },
  {
    type: CERTIFICATE_TYPES.Volunteer,
    title: 'Digital Government Forum Participation',
    role: 'Crowd Team',
    period: 'March 11-13, 2024',
    verificationUrl: 'https://verify.gov.kh/verify/97e7ce8f61a4f43c10f3441636e517f92466e94216fb65e265a3c9f0f997a158?key=8940f9bd54c3283d3c981f01a6787ccfdfa43b90298d3fea628c26cc0b31980b',
  },
  {
    type: CERTIFICATE_TYPES.Volunteer,
    title: 'Cambodia High Education Forum and Exhibition',
    role: 'Seat Arrangement',
    period: 'October 19-20, 2024',
    verificationUrl: 'https://drive.google.com/file/d/1oh1oD2nvVWCTzBfG2KbYXQxyQ85AdhyE/view?usp=sharing',
  },
  {
    type: CERTIFICATE_TYPES.Volunteer,
    title: 'National Career and Productivity Fair 2024',
    role: 'Technical Team',
    period: 'October 26-27, 2024',
    verificationUrl: 'https://drive.google.com/file/d/1ofiNpycGDZoZUm-Sgdcq-FzoqsosZ7C5/view?usp=drivesdk',
  },
  {
    type: CERTIFICATE_TYPES.Volunteer,
    title: 'National Sports Games (4th National Sports & 2nd Para Games 2024)',
    role: 'Technical Team',
    period: 'October 30 – November 8, 2024',
    verificationUrl: 'https://drive.google.com/file/d/1orE867zXvRCmM2aLCI94CRA4zyRl4kOK/view?usp=drivesdk',
  },
  {
    type: CERTIFICATE_TYPES.Volunteer,
    title: 'My First Stock Campaign',
    role: 'Technical Team Leader',
    period: 'October 25-28, 2024',
    verificationUrl: 'https://drive.google.com/file/d/1orowX4bd6gmRW8Q8AZhhJvOQVPlcHFRU/view?usp=drivesdk',
  },
  {
    type: CERTIFICATE_TYPES.Work,
    title: 'Mathematics Tutor',
    role: 'Part-Time Tutor',
    period: '2024 – February 2025',
    verificationUrl: 'https://drive.google.com/file/d/1nsf1lkeDqp0i5Md9cn272b1fhiYwRlfs/view?usp=sharing',
  },
  {
    type: CERTIFICATE_TYPES.Volunteer,
    title: 'Khoding-Hero Volunteer Program',
    role: 'Team Leader & Instructor',
    period: 'August – September 2024',
    location: 'Samky High School, Siem Reap Province',
    verificationUrl: 'https://drive.google.com/file/d/1ozrvWrgUTzZs2szScNf9SP9dnCQuLrCh/view?usp=sharing',
  },
];

// Certificate Type Config
const certificateConfig: Record<CertificateType, { icon: React.ElementType; color: string; bgColor: string; borderColor: string; gradient: string }> = {
  [CERTIFICATE_TYPES.Academic]: {
    icon: BookOpen,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    gradient: 'from-cyan-500/5 to-transparent',
  },
  [CERTIFICATE_TYPES.Professional]: {
    icon: BadgeCheck,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    gradient: 'from-orange-500/5 to-transparent',
  },
  [CERTIFICATE_TYPES.Volunteer]: {
    icon: Heart,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    gradient: 'from-emerald-500/5 to-transparent',
  },
  [CERTIFICATE_TYPES.Work]: {
    icon: Briefcase,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    gradient: 'from-violet-500/5 to-transparent',
  },
};

interface EducationItem {
  school: string;
  degree: string;
  year: string;
  achievements?: string[];
  highlight?: string;
  certificateIndex?: number;
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
    certificateIndex: 1,
  },
  {
    school: 'Hun Sen Borey 100 Knong High School',
    degree: 'Baccalauréat (Bac II)',
    year: 'Completed',
    achievements: ['Grade B'],
    certificateIndex: 0,
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
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
  const [activeFilter, setActiveFilter] = useState<CertificateType | 'All'>('All');

  const filteredCertificates = activeFilter === 'All'
    ? certificatesData
    : certificatesData.filter(cert => cert.type === activeFilter);

  const getCertDisplayDate = (cert: typeof certificatesData[0]) => {
    return cert.date || cert.period || cert.completedDate || '';
  };

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
            {educationData.map((edu, index) => (
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

                  {edu.certificateIndex !== undefined && certificatesData[edu.certificateIndex] && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <a
                        href={certificatesData[edu.certificateIndex].verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                      >
                        <Award className="w-4 h-4" />
                        <span>View Certificate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates & Education Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <Award className="w-6 h-6 text-orange-500" />
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              Certificates & Education
            </h3>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
            {(['All', ...Object.values(CERTIFICATE_TYPES)] as const).map((filter) => {
              const isActive = activeFilter === filter;
              const config = filter !== 'All' ? certificateConfig[filter] : null;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? config
                        ? `${config.bgColor} ${config.color} ${config.borderColor} border`
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  <span className="relative z-10">
                    {filter === 'All' ? 'All Certificates' : filter}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Certificates Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert, index) => {
                const config = certificateConfig[cert.type];
                const Icon = config.icon;
                const displayDate = getCertDisplayDate(cert);

                return (
                  <motion.div
                    key={`${cert.title}-${index}`}
                    layout
                    variants={cardVariants}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`group relative rounded-xl border ${config.borderColor} bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-300`}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Type Badge */}
                    <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bgColor} border ${config.borderColor}`}>
                      <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                      <span className={`text-[10px] font-medium uppercase tracking-wider ${config.color}`}>
                        {cert.type}
                      </span>
                    </div>

                    <div className="relative p-6 pt-14">
                      {/* Title */}
                      <h4 className="text-lg font-medium text-white mb-3 leading-tight group-hover:text-white/90 transition-colors">
                        {cert.title}
                      </h4>

                      {/* Institution/Organization */}
                      <div className="flex items-start gap-2 mb-3">
                        <div className={`p-1 rounded ${config.bgColor} shrink-0 mt-0.5`}>
                          {cert.type === CERTIFICATE_TYPES.Academic ? (
                            <School className={`w-3 h-3 ${config.color}`} />
                          ) : cert.type === CERTIFICATE_TYPES.Volunteer ? (
                            <Heart className={`w-3 h-3 ${config.color}`} />
                          ) : (
                            <Briefcase className={`w-3 h-3 ${config.color}`} />
                          )}
                        </div>
                        <span className="text-sm text-white/70 font-light">
                          {cert.institution || cert.organization}
                        </span>
                      </div>

                      {/* Role (if applicable) */}
                      {(cert as { role?: string }).role && (
                        <div className="flex items-start gap-2 mb-3">
                          <div className={`p-1 rounded ${config.bgColor} shrink-0 mt-0.5`}>
                            <Users className={`w-3 h-3 ${config.color}`} />
                          </div>
                          <span className="text-sm text-white/60">
                            Role: <span className="text-white/80">{(cert as { role?: string }).role}</span>
                          </span>
                        </div>
                      )}

                      {/* Date/Period */}
                      {displayDate && (
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className={`w-3.5 h-3.5 ${config.color} opacity-70`} />
                          <span className="text-xs text-white/50 font-mono">{displayDate}</span>
                        </div>
                      )}

                      {/* Grade/Status */}
                      {(cert as { grade?: string; status?: string }).grade && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1 rounded ${config.bgColor}`}>
                            <Award className={`w-3 h-3 ${config.color}`} />
                          </div>
                          <span className={`text-sm font-medium ${config.color}`}>
                            {(cert as { grade?: string }).grade}
                          </span>
                        </div>
                      )}
                      {(cert as { status?: string }).status && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1 rounded ${config.bgColor}`}>
                            <BadgeCheck className={`w-3 h-3 ${config.color}`} />
                          </div>
                          <span className={`text-sm font-medium ${config.color}`}>
                            {(cert as { status?: string }).status}
                          </span>
                        </div>
                      )}

                      {/* Topics/Focus */}
                      {(cert as { topics?: string[] }).topics && (cert as { topics?: string[] }).topics!.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Topics Covered</p>
                          <div className="flex flex-wrap gap-1.5">
                            {(cert as { topics?: string[] }).topics!.map((topic, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-0.5 rounded text-[10px] ${config.bgColor} ${config.color} border ${config.borderColor}`}
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {(cert as { focus?: string }).focus && (
                        <div className="mb-4">
                          <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Focus</p>
                          <p className="text-xs text-white/60 italic">
                            {(cert as { focus?: string }).focus}
                          </p>
                        </div>
                      )}

                      {/* Location */}
                      {(cert as { location?: string }).location && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`p-1 rounded ${config.bgColor}`}>
                            <School className={`w-3 h-3 ${config.color}`} />
                          </div>
                          <span className="text-xs text-white/50">
                            {(cert as { location?: string }).location}
                          </span>
                        </div>
                      )}

                      {/* Verification Button */}
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg ${config.bgColor} ${config.color} border ${config.borderColor} hover:bg-opacity-20 transition-all duration-300 group/btn`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Verify Certificate</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${config.color.replace('text-', 'bg-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-white/40 text-lg">No certificates found for this filter.</p>
            </motion.div>
          )}
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
