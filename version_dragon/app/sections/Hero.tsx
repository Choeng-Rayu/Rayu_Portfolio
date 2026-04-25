'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DragonVisualization from '../components/DragonVisualization';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <DragonVisualization />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-[var(--font-inter)] text-xs sm:text-sm text-white/40 tracking-widest uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
