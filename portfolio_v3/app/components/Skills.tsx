"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code2, Layers, Server, Database, Cloud, Brain } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { AnimatedItem, Section } from "./Section";
import { skills } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";

interface SkillBarProps {
  name: string;
  level: number;
  category: string;
  index: number;
}

function SkillBar({ name, level, category, index }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const categoryColors = {
    languages: "from-blue-500 to-cyan-400",
    frontend: "from-purple-500 to-pink-400",
    backend: "from-orange-500 to-amber-400",
    database: "from-green-500 to-emerald-400",
    devops: "from-red-500 to-rose-400",
    ai: "from-indigo-500 to-violet-400",
  };

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white font-medium">{name}</span>
        <span className="text-xs text-text-muted">{level}/10</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={hasAnimated ? { width: `${level * 10}%` } : {}}
          transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            categoryColors[category as keyof typeof categoryColors] || "from-primary to-primary-light"
          )}
        />
      </div>
    </div>
  );
}

interface SkillClusterProps {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
  category: string;
  delay: number;
}

function SkillCluster({ title, icon, skills: clusterSkills, category, delay }: SkillClusterProps) {
  return (
    <AnimatedItem delay={delay}>
      <GlassPanel hover className="h-full p-6" radius="xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="space-y-4">
          {clusterSkills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              category={category}
              index={index}
            />
          ))}
        </div>
      </GlassPanel>
    </AnimatedItem>
  );
}

export function Skills() {
  const languageSkills = skills.filter((s) => s.category === "languages").slice(0, 6);
  const frontendSkills = skills.filter((s) => s.category === "frontend");
  const backendSkills = skills.filter((s) => s.category === "backend");
  const databaseSkills = skills.filter((s) => s.category === "database").slice(0, 3);
  const devopsSkills = skills.filter((s) => s.category === "devops");
  const aiSkills = skills.filter((s) => s.category === "ai");

  const clusters = [
    { title: "Languages", icon: <Code2 className="w-5 h-5" />, skills: languageSkills, category: "languages" },
    { title: "Frontend", icon: <Layers className="w-5 h-5" />, skills: frontendSkills, category: "frontend" },
    { title: "Backend", icon: <Server className="w-5 h-5" />, skills: backendSkills, category: "backend" },
    { title: "Databases", icon: <Database className="w-5 h-5" />, skills: databaseSkills, category: "database" },
    { title: "DevOps & Cloud", icon: <Cloud className="w-5 h-5" />, skills: devopsSkills, category: "devops" },
    { title: "AI & ML", icon: <Brain className="w-5 h-5" />, skills: aiSkills, category: "ai" },
  ];

  // Find top skills
  const topSkills = [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);

  return (
    <Section
      id="skills"
      title="Skills & Tech Stack"
      subtitle="Technologies I work with to bring ideas to life"
    >
      {/* Top Skills Highlight */}
      <AnimatedItem delay={0.1} className="mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {topSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium flex items-center gap-2"
            >
              <span className="text-yellow-400">⭐</span>
              {skill.name} <span className="text-xs opacity-70">{skill.level}/10</span>
            </motion.div>
          ))}
        </div>
      </AnimatedItem>

      {/* Skill Clusters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusters.map((cluster, index) => (
          <SkillCluster
            key={cluster.title}
            title={cluster.title}
            icon={cluster.icon}
            skills={cluster.skills}
            category={cluster.category}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>

      {/* Currently Learning */}
      <AnimatedItem delay={0.7} className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
          <span className="text-2xl animate-bounce">🔥</span>
          <span className="text-text-secondary">Currently Learning:</span>
          <span className="text-white font-medium">Go, AI/LLM Integration, Advanced System Design</span>
        </div>
      </AnimatedItem>
    </Section>
  );
}
