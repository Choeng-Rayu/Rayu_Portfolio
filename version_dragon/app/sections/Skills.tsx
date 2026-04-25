'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Tool {
  name: string;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  {
    name: 'JavaScript',
    level: 'Expert',
    description: 'Advanced proficiency in modern JavaScript (ES6+), including asynchronous programming, closures, and functional programming concepts.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7v5.77c0 .86-.35 1.31-1.05 1.31-.61 0-.98-.27-1.38-.93l-1.94 1.63zm5.58.03c.5.98 1.51 1.55 3.13 1.55 1.93 0 3.17-1.07 3.17-2.95 0-1.74-1.15-2.41-2.66-2.92l-.42-.15c-.87-.31-1.15-.52-1.15-.99 0-.45.35-.78.9-.78.54 0 .93.28 1.22.83l1.23-.84c-.55-.98-1.35-1.41-2.45-1.41-1.71 0-2.89 1.06-2.89 2.73 0 1.66 1.06 2.43 2.5 2.86l.42.15c.92.32 1.31.6 1.31 1.15 0 .53-.47.88-1.18.88-.89 0-1.38-.42-1.72-1.02l-1.31.82z"/>
      </svg>
    ),
    color: '#F7DF1E',
  },
  {
    name: 'React',
    level: 'Expert',
    description: 'Expert in building dynamic user interfaces with React, including hooks, context API, and performance optimization techniques.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 2.5c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(0 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      </svg>
    ),
    color: '#61DAFB',
  },
  {
    name: 'Three.js',
    level: 'Advanced',
    description: 'Experienced in creating 3D graphics and animations using Three.js for immersive web experiences.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    color: '#ffffff',
  },
  {
    name: 'Framer Motion',
    level: 'Advanced',
    description: 'Skilled in creating smooth animations and transitions with Framer Motion for enhanced user experience.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L18.5 8 12 11.5 5.5 8 12 4.5zM5 9l7 4v7.5L5 16V9zm14 7l-7 4.5V13l7-4v7z"/>
      </svg>
    ),
    color: '#FF0055',
  },
  {
    name: 'HTML5',
    level: 'Expert',
    description: 'Proficiency in semantic HTML5 markup for accessible and SEO-friendly web pages.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.285L12 19.288l5.373-1.53L18.59 4.414z"/>
      </svg>
    ),
    color: '#E34F26',
  },
  {
    name: 'CSS3',
    level: 'Expert',
    description: 'Advanced CSS3 skills including Flexbox, Grid, animations, and responsive design principles.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.956-.81-.188-2.11H6.248l.29 3.285L12 19.288l5.373-1.53L18.59 4.414H7.031z"/>
      </svg>
    ),
    color: '#1572B6',
  },
  {
    name: 'Java',
    level: 'Advanced',
    description: 'Strong foundation in Java programming with experience in object-oriented design and data structures.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M8.85 18.236s-.95.559.66.748c1.93.238 2.92.204 5.05-.283 0 0 .561.351 1.346.654-4.77 2.048-10.799-.118-7.056-1.119zm-.576-2.666s-1.063.788.556.948c2.074.213 3.705.23 6.526-.313 0 0 .39.395 1.003.611-5.783 1.69-12.226.132-8.085-1.246zm9.952-3.234c1.26 1.29-.33 2.45-.33 2.45s2.845-1.467 1.538-3.309c-1.242-1.757-2.194-2.623-2.194-2.623s.85 2.193-.014 3.482zm-9.27 7.84s.703.583 1.94.644c-1.777.663-4.316.571-4.316.571s1.766.579 5.288-.104c1.764-.34 3.481-1.07 3.481-1.07s-3.108.111-6.393-1.041zM14.7 7.674S10.691 9.215 13.908 9.53c.929.09 1.781-.09 2.778-.525 0 0-.487.382-.778.488 3.456.292 5.449-1.577 2.238-2.75 0-.001 1.187.563-.446 1.324zM12.016.454s3.196 1.093-2.55 4.18c-3.807 2.06-1.042 3.239-.001 3.588-2.713-1.173-4.702-2.782-3.563-3.988 1.718-1.845 6.114-3.78 6.114-3.78z"/>
      </svg>
    ),
    color: '#007396',
  },
  {
    name: 'C++',
    level: 'Advanced',
    description: 'Proficient in C++ programming with understanding of memory management and algorithms.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M7.207 18.92c-2.67-1.341-4.478-4.107-4.478-7.295 0-4.522 3.669-8.19 8.19-8.19 1.837 0 3.532.607 4.9 1.63l3.62-3.62C16.906 0.82 14.317 0 11.52 0 5.157 0 0 5.157 0 11.52c0 4.133 2.183 7.758 5.46 9.787l1.747-3.387zm10.586-13.84l-1.747 3.387c2.67 1.341 4.478 4.107 4.478 7.295 0 4.522-3.669 8.19-8.19 8.19-1.837 0-3.532-.607-4.9-1.63l-3.62 3.62c2.163 1.609 4.752 2.429 7.549 2.429 6.363 0 11.52-5.157 11.52-11.52 0-4.133-2.183-7.758-5.46-9.787l-.63.006zm-5.833 4.577v3.773l3.37 1.947 3.37-1.947V9.657l-3.37-1.947-3.37 1.947z"/>
      </svg>
    ),
    color: '#00599C',
  },
  {
    name: 'Flutter',
    level: 'Intermediate',
    description: 'Experience in building cross-platform mobile applications with Flutter and Dart.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.012h-7.357zm.014 11.072L7.857 17.53l6.47 6.472H21.7l-6.46-6.468 6.46-6.46h-7.372z"/>
      </svg>
    ),
    color: '#02569B',
  },
];

const tools: Tool[] = [
  { name: 'Node.js', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.47 1.27-.12 1.27-.83V9.27c0-.43.34-.77.77-.77h.02c.42 0 .77.34.77.77v7.25c0 1.24-.68 1.96-1.86 1.96-.36 0-.64 0-1.43-.39l-1.89-1.09a2.2 2.2 0 0 1-1.1-1.91V7.71c0-.78.42-1.51 1.1-1.91l7.44-4.29a2.29 2.29 0 0 1 2.22 0l7.44 4.3c.68.39 1.1 1.12 1.1 1.91v8.58c0 .78-.42 1.51-1.1 1.91l-7.44 4.29c-.34.2-.73.3-1.11.3-.38 0-.77-.1-1.11-.3l-1.77-1.04c-.24-.14-.32-.45-.18-.7.14-.24.45-.32.7-.18l1.77 1.03c.22.13.48.2.74.2.26 0 .52-.07.74-.2l7.44-4.29c.22-.13.36-.38.36-.65V7.71c0-.27-.14-.52-.36-.65L12.78 2.77a1.28 1.28 0 0 0-1.3 0L3.9 7.06c-.24.14-.39.4-.39.65v8.58c0 .26.15.51.39.65l1.95 1.13c.58.34 1.02.54 1.79.54.74 0 1.19-.29 1.55-.81.1-.15.26-.23.43-.23h.02c.42 0 .77.35.77.77 0 .3-.14.58-.37.77-1.05 1.02-2.25 1.21-3.59.7l-1.95-1.12a2.2 2.2 0 0 1-1.1-1.91V7.71c0-.78.42-1.51 1.1-1.91l7.44-4.29c.47-.27 1.05-.27 1.52 0l7.44 4.3c.68.39 1.1 1.12 1.1 1.91v8.58c0 .78-.42 1.51-1.1 1.91l-7.44 4.29c-.23.13-.48.2-.74.2-.26 0-.52-.07-.74-.2L9.6 19.84c-.23-.13-.38-.38-.38-.65V11.4c0-.43.34-.77.77-.77h.02c.42 0 .77.34.77.77v6.91l6.28-3.63 2.18-1.26V7.71L12 1.85z"/></svg> },
  { name: 'MongoDB', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24c.338-.405.604-.793.67-1.126.621-3.34 2.688-6.232 3.542-7.186.321-.354.681-.684.916-.934.034.021.066.034.087.045.155.105.29.187.405.249.114.062.21.104.288.135.078.03.137.047.174.058.186.053.373.1.565.14.192.04.39.074.594.104.204.03.415.055.634.074.219.02.447.034.683.042.236.008.48.012.733.012.252 0 .506-.004.76-.012.236-.008.464-.022.683-.042.219-.019.43-.044.634-.074.204-.03.402-.064.594-.104.192-.04.38-.087.565-.14.037-.011.096-.028.174-.058.078-.031.174-.073.288-.135.115-.062.25-.144.405-.249.021-.011.053-.024.087-.045.235.25.595.58.916.934.854.954 2.92 3.846 3.542 7.186.066.333.332.72.67 1.126.241-.738.43-1.684.576-2.826.146-1.142.25-2.416.312-3.822.124-2.812-.022-6.007-.629-9.42z"/></svg> },
  { name: 'Express', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-3H9V7h2v6zm4 3h-2v-2h2v2zm0-3h-2V7h2v6z"/></svg> },
  { name: 'Firebase', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M5.239 15.063L7.21 2.381a.453.453 0 0 1 .847-.145l2.053 3.858-4.87 8.97zm12.695.9l-2.055-3.858-4.87 8.969 6.925-5.111zM12.622 6.248l-1.324-2.495a.453.453 0 0 0-.846.145L8.478 17.073l4.144-10.825zm1.21 18.514L2.913 24l8.82-16.417L20.652 24z"/></svg> },
  { name: 'Git', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.656 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.678-1.342-.396-2.009L7.611 3.527 4.747.668c-.603-.603-1.582-.603-2.188 0L.452 2.775c-.603.605-.603 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582.002-2.187z"/></svg> },
  { name: 'GitHub', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { name: 'Tailwind CSS', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg> },
  { name: 'TypeScript', icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656-.03.053-.061.1-.091.146l-.937.89c-.183.175-.417.261-.701.261H1.125c-.623 0-1.125-.502-1.125-1.125V1.125C0 .502.502 0 1.125 0H1v24h22V0h-.125z"/></svg> },
];

const levelColors: Record<string, string> = {
  Beginner: 'from-gray-500 to-gray-600',
  Intermediate: 'from-blue-500 to-cyan-500',
  Advanced: 'from-orange-500 to-red-500',
  Expert: 'from-[#ff4500] to-orange-600',
};

const levelWidths: Record<string, string> = {
  Beginner: 'w-1/4',
  Intermediate: 'w-2/4',
  Advanced: 'w-3/4',
  Expert: 'w-full',
};

export default function Skills() {
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const toolVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] w-24 mx-auto mb-8 bg-gradient-to-r from-transparent via-[#ff4500] to-transparent"
          />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
            <span className="text-[#ff4500] drop-shadow-[0_0_20px_rgba(255,69,0,0.5)]">
              Technical
            </span>{' '}
            Skills
          </h2>
          <p className="text-white/50 text-lg font-light tracking-wide max-w-2xl mx-auto">
            Proficient in modern web technologies and frameworks, with expertise in creating immersive digital experiences
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-[1px] w-32 mx-auto mt-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={cardVariants}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-[#ff4500]/50 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(255,69,0,0.15)]">
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff4500]/10 via-transparent to-transparent" />
                </div>

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="p-3 rounded-lg bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10"
                        style={{ color: skill.color }}
                      >
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-white group-hover:text-[#ff4500] transition-colors duration-300">
                          {skill.name}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${levelColors[skill.level]} text-white`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : skill.level === 'Intermediate' ? '50%' : '25%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${levelColors[skill.level]} rounded-full`}
                      />
                    </div>
                  </div>

                  {/* Description - Shows on Hover */}
                  <div className="relative overflow-hidden">
                    <p className="text-sm text-white/60 leading-relaxed transform transition-all duration-500 group-hover:text-white/80">
                      {skill.description}
                    </p>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#ff4500]/20 to-transparent transform rotate-45 translate-x-10 -translate-y-10" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Section Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
            <h3 className="text-xl font-light tracking-widest text-white/60 uppercase">
              Technologies & Tools
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
          </div>

          {/* Tools Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={toolVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-[#ff4500]/50 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(255,69,0,0.1)]">
                  <div className="text-white/60 group-hover:text-[#ff4500] transition-colors duration-300">
                    {tool.icon}
                  </div>
                  <span className="text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors duration-300">
                    {tool.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mt-20"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <div className="text-white/30 font-mono text-[10px] tracking-[0.4em] font-light uppercase">
              &lt;/
              <span className="text-[#ff4500]/80 font-bold drop-shadow-[0_0_10px_rgba(255,69,0,0.5)]">
                {' '}SKILLS{' '}
              </span>
              &gt;
            </div>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
