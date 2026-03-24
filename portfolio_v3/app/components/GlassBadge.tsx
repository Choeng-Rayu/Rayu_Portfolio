"use client";

import { cn } from "@/app/lib/utils";
import { LucideIcon } from "lucide-react";

interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "primary" | "info";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  className?: string;
  glow?: boolean;
}

const variantClasses = {
  default: "bg-white/10 border-white/20 text-white",
  success: "bg-success/20 border-success/30 text-success",
  warning: "bg-warning/20 border-warning/30 text-warning",
  danger: "bg-danger/20 border-danger/30 text-danger",
  primary: "bg-primary/20 border-primary/30 text-primary-light",
  info: "bg-cyan-500/20 border-cyan-500/30 text-cyan-400",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function GlassBadge({ 
  children, 
  variant = "default", 
  size = "md", 
  icon: Icon,
  className,
  glow = false,
}: GlassBadgeProps) {
  const IconComponent = Icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-lg backdrop-blur-md border",
        variantClasses[variant],
        sizeClasses[size],
        glow && variant === "primary" && "shadow-lg shadow-primary/30",
        glow && variant === "success" && "shadow-lg shadow-success/30",
        className
      )}
    >
      {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}
