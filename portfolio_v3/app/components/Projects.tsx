"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Code2 } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { GlassBadge } from "./GlassBadge";
import { GlassButton } from "./GlassButton";
import { AnimatedItem, Section } from "./Section";
import { projects } from "@/app/lib/data";
import type { Project } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

type StatusVariant = "primary" | "success" | "info" | "warning";

const statusVariants: Record<string, StatusVariant> = {
  active: "primary",
  completed: "success",
  "open-source": "info",
  startup: "warning",
};

const statusLabels = {
  active: "Active",
  completed: "Completed",
  "open-source": "Open Source",
  startup: "Startup",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassPanel 
        hover 
        className="h-full group cursor-pointer overflow-hidden"
        radius="xl"
      >
        {/* Gradient accent top bar */}
        <div className={cn(
          "h-1 w-full bg-gradient-to-r",
          project.gradient
        )} />

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {project.date}
              </p>
            </div>
            <GlassBadge variant={statusVariants[project.status]} size="sm">
              {statusLabels[project.status]}
            </GlassBadge>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-text-secondary"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-text-muted">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Code2 className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
            <div className="flex-1" />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              group-hover={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 text-primary text-sm font-medium"
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filters = [
    { key: "all", label: "All Projects" },
    { key: "startup", label: "Startup" },
    { key: "open-source", label: "Open Source" },
    { key: "ai", label: "AI" },
    { key: "school", label: "School" },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const filteredProjects = activeFilter === "all" 
    ? featuredProjects 
    : featuredProjects.filter((p) => p.category === activeFilter);

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="Things I've built that I'm proud of"
    >
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((filter) => (
          <motion.button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
              activeFilter === filter.key
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10 hover:text-white"
            )}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>

      {/* View All Button */}
      <AnimatedItem delay={0.5} className="mt-12 text-center">
        <GlassButton variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
          View All Projects
        </GlassButton>
      </AnimatedItem>
    </Section>
  );
}
