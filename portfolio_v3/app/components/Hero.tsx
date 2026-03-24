"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { GlassButton } from "./GlassButton";
import { GlassBadge } from "./GlassBadge";
import { personalInfo } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";

const titles = [
  "Software Engineer",
  "Full Stack Developer",
  "Open Source Builder",
  "AI Explorer",
];

export function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for cursor spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spotlight position
  const spotlightX = useTransform(mouseX, [-1, 1], [-100, 100]);
  const spotlightY = useTransform(mouseY, [-1, 1], [-100, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Typewriter effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex]);

  const handleScrollToWork = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20"
    >
      {/* Cursor spotlight effect */}
      <motion.div
        style={{ x: spotlightX, y: spotlightY }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 157, 255, 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Terminal window decoration */}
        <motion.div
          initial={{ opacity: 0, x: 100, y: -100 }}
          animate={{ opacity: 0.6, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-32 right-4 sm:right-20 hidden lg:block"
        >
          <div className="glass rounded-2xl p-4 w-72">
            <div className="flex gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-danger" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-1">
              <p className="text-success">$ rayu --status</p>
              <p>Building: DasTern v2.0</p>
              <p className="text-primary">Location: Phnom Penh 🇰🇭</p>
              <p className="text-success flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Available for work
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating code blocks */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-40 left-4 sm:left-20 hidden lg:block"
        >
          <div className="glass rounded-2xl p-3 font-mono text-xs">
            <span className="text-purple-400">const</span>{" "}
            <span className="text-blue-400">developer</span>{" "}
            <span className="text-white">=</span>{" "}
            <span className="text-amber-400">{"{"}</span>
            <div className="pl-4">
              <span className="text-text-muted">passion:</span>{" "}
              <span className="text-green-400">"Building"</span>,
            </div>
            <div className="pl-4">
              <span className="text-text-muted">focus:</span>{" "}
              <span className="text-green-400">"Innovation"</span>,
            </div>
            <span className="text-amber-400">{"}"}</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <GlassBadge variant="success" size="md" glow>
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            {personalInfo.availability}
          </GlassBadge>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4"
        >
          CHOENG RAYU
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl lg:text-3xl">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-text-secondary">
              {displayText}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-2 text-text-muted mb-10"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{personalInfo.location}</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlassButton 
            variant="primary" 
            size="lg"
            icon={ArrowRight}
            onClick={handleScrollToWork}
            className="w-full sm:w-auto"
          >
            View My Work
          </GlassButton>
          <GlassButton 
            variant="secondary" 
            size="lg"
            icon={Download}
            className="w-full sm:w-auto"
          >
            Download CV
          </GlassButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-text-muted">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-3 rounded-full bg-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
