"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Heart, Calendar, MapPin, ChevronDown } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { AnimatedItem, Section } from "./Section";
import { experiences } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";

interface TimelineEntryProps {
  entry: typeof experiences[0];
  index: number;
  isLeft: boolean;
}

function TimelineEntry({ entry, index, isLeft }: TimelineEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const isCurrent = entry.endDate === "Present";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-start gap-4 sm:gap-6"
    >
      {/* Timeline connector - hidden on mobile */}
      <div className="hidden sm:flex flex-col items-center">
        <div
          className={cn(
            "w-4 h-4 rounded-full border-2 z-10",
            isCurrent
              ? "bg-primary border-primary shadow-lg shadow-primary/50"
              : "bg-background border-white/30"
          )}
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* Content */}
      <GlassPanel
        hover
        className={cn(
          "flex-1 mb-6 cursor-pointer transition-all duration-300",
          isCurrent && "border-primary/30 shadow-lg shadow-primary/10"
        )}
        radius="xl"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-5 sm:p-6 text-left"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Role */}
              <h3 className={cn(
                "text-lg font-semibold transition-colors",
                isCurrent ? "text-primary" : "text-white"
              )}>
                {entry.role}
              </h3>

              {/* Company */}
              <p className="text-white/80 font-medium mt-1">
                {entry.company}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.startDate} – {entry.endDate}
                </span>
                {entry.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {entry.location}
                  </span>
                )}
              </div>
            </div>

            {/* Expand icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-text-muted"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/10 pt-4">
                {entry.description && (
                  <p className="text-text-secondary mb-4">
                    {entry.description}
                  </p>
                )}
                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {entry.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassPanel>
    </motion.div>
  );
}

export function Experience() {
  const [activeTab, setActiveTab] = useState<"work" | "volunteer">("work");

  const workExperience = experiences.filter((e) => e.type === "work");
  const volunteerExperience = experiences.filter((e) => e.type === "volunteer");

  const displayExperiences = activeTab === "work" ? workExperience : volunteerExperience;

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey and contributions"
    >
      {/* Tab Switcher */}
      <AnimatedItem delay={0.1}>
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setActiveTab("work")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              activeTab === "work"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10"
            )}
          >
            <Briefcase className="w-4 h-4" />
            Work
          </button>
          <button
            onClick={() => setActiveTab("volunteer")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              activeTab === "volunteer"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10"
            )}
          >
            <Heart className="w-4 h-4" />
            Volunteer
          </button>
        </div>
      </AnimatedItem>

      {/* Timeline */}
      <div className="relative">
        {/* Mobile timeline line */}
        <div className="sm:hidden absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {displayExperiences.map((exp, index) => (
              <TimelineEntry
                key={exp.id}
                entry={exp}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
