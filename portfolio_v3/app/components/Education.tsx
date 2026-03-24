"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { AnimatedItem, Section } from "./Section";
import { education } from "@/app/lib/data";

const institutionIcons: Record<string, string> = {
  "CADT": "🎓",
  "Northwestern": "🏫",
  "USAID": "📜",
};

export function Education() {
  return (
    <Section
      id="education"
      title="Education"
      subtitle="My academic journey and professional development"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassPanel hover className="h-full" radius="xl">
              {/* Gradient accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary-light rounded-t-xl" />
              
              <div className="p-6 space-y-4">
                {/* Icon and Institution */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl">
                    {institutionIcons[edu.institution.split(" ")[0]] || "🎓"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-primary font-medium text-sm mt-0.5">
                      {edu.degree}
                    </p>
                  </div>
                </div>

                {/* Field of Study */}
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-text-secondary text-sm">
                    {edu.field}
                  </span>
                </div>

                {/* Meta Info */}
                <div className="space-y-2 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(edu.startDate).toLocaleDateString("en-US", { 
                        month: "short", 
                        year: "numeric" 
                      })} – {new Date(edu.endDate).toLocaleDateString("en-US", { 
                        month: "short", 
                        year: "numeric" 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Description */}
                {edu.description && (
                  <p className="text-sm text-text-secondary leading-relaxed pt-2 border-t border-white/5">
                    {edu.description}
                  </p>
                )}
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
