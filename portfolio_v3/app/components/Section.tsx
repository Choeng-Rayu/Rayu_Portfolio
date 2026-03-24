"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/app/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleAlign?: "left" | "center" | "right";
}

export function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  className,
  titleAlign = "left",
}: SectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <section 
      id={id}
      ref={ref}
      className={cn("py-16 sm:py-24 px-4 sm:px-6", className)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn("mb-12 sm:mb-16", alignClasses[titleAlign])}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {/* Decorative line */}
          <div className={cn(
            "mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-primary-light",
            titleAlign === "center" && "mx-auto",
            titleAlign === "right" && "ml-auto"
          )} />
        </motion.div>

        {/* Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

interface AnimatedItemProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedItem({ children, delay = 0, className }: AnimatedItemProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
