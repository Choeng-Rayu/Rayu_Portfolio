"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { forwardRef } from "react";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  tint?: "primary" | "secondary" | "success" | "warning" | "danger";
  radius?: "sm" | "md" | "lg" | "xl";
  blur?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  hover?: boolean;
}

const radiusClasses = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
};

const blurClasses = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-xl",
  xl: "backdrop-blur-2xl",
};

const tintClasses = {
  primary: "bg-primary/10 border-primary/20",
  secondary: "bg-white/5 border-white/10",
  success: "bg-success/10 border-success/20",
  warning: "bg-warning/10 border-warning/20",
  danger: "bg-danger/10 border-danger/20",
};

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ 
    children, 
    className, 
    tint = "primary", 
    radius = "lg", 
    blur = "lg", 
    glow = false,
    hover = false,
    ...props 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden border backdrop-filter",
          blurClasses[blur],
          radiusClasses[radius],
          tintClasses[tint],
          glow && "shadow-lg shadow-primary/10",
          hover && "transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:shadow-lg hover:shadow-primary/10",
          className
        )}
        {...props}
      >
        {/* Specular edge highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
