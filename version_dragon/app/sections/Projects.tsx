'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Folder } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  demoUrl: string;
  codeUrl: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: '3D Portfolio Website',
    description:
      'An interactive 3D portfolio showcasing skills and projects with smooth animations and responsive design.',
    tags: ['React', 'Three.js', 'Framer Motion', 'CSS3'],
    accentColor: '#00ff88',
    demoUrl: 'https://rayu-portfolio.netlify.app',
    codeUrl: 'https://github.com/Rayu-Portfolio/version_reactjs',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description:
      'A full-stack e-commerce application with product catalog, shopping cart, and payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    accentColor: '#ff6b6b',
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 3,
    title: 'Task Management App',
    description:
      'A productivity app for managing tasks and projects with real-time collaboration features.',
    tags: ['React', 'Firebase', 'Material-UI'],
    accentColor: '#4ecdc4',
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description:
      'A weather application that displays current conditions and forecasts using a weather API.',
    tags: ['React', 'API Integration', 'CSS Grid'],
    accentColor: '#45b7d1',
    demoUrl: '#',
    codeUrl: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const Projects: React.FC = () => {
  return (
    <section className="min-h-screen w-full bg-[#0a0a0a] relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Background gradient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
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
            <div className="h-[1px] w-12 bg-white/30" />
            <span className="text-white/60 font-mono text-xs tracking-[0.3em] uppercase">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            Featured{' '}
            <span className="text-white/80 font-normal italic">Projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8"
        >
          {projectsData.map((project) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className="group relative"
            >
              <div
                className="relative h-full rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:bg-white/[0.04]"
                style={{
                  boxShadow: `0 0 0 1px transparent`,
                }}
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.accentColor}08, transparent 40%)`,
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                  }}
                />

                {/* Placeholder Image Area */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${project.accentColor}20, transparent)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Folder
                      className="w-16 h-16 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                      style={{ color: project.accentColor }}
                    />
                  </div>
                  {/* Project number badge */}
                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-medium"
                    style={{
                      backgroundColor: `${project.accentColor}15`,
                      color: project.accentColor,
                      border: `1px solid ${project.accentColor}30`,
                    }}
                  >
                    0{project.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3
                    className="text-xl sm:text-2xl font-light text-white mb-3 group-hover:transition-colors duration-300"
                    style={{
                      color: 'white',
                    }}
                  >
                    <span
                      className="group-hover:transition-colors duration-300"
                      style={{
                        color: 'white',
                      }}
                    >
                      {project.title}
                    </span>
                  </h3>

                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono tracking-wide transition-all duration-300"
                        style={{
                          backgroundColor: `${project.accentColor}10`,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: `${project.accentColor}15`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}30`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${project.accentColor}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${project.accentColor}15`;
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Demo
                    </a>
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 bg-white/5 border border-white/10 transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105"
                    >
                      <Code2 className="w-4 h-4" />
                      View Code
                    </a>
                  </div>
                </div>

                {/* Bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}40, transparent)`,
                  }}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  );
};

export default Projects;
