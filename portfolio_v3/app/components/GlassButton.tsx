"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-light hover:shadow-primary/50 active:bg-primary-dark",
  secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 active:bg-white/5",
  ghost: "bg-transparent text-white hover:bg-white/10 active:bg-white/5",
  outline: "bg-transparent text-primary border border-primary hover:bg-primary/10 active:bg-primary/20",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2.5",
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ 
    children, 
    variant = "primary", 
    size = "md", 
    icon: Icon, 
    iconPosition = "right",
    loading = false,
    className,
    disabled,
    ...props 
  }, ref) => {
    const IconComponent = Icon;

    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300",
          "backdrop-blur-xl border border-white/20",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Glow effect for primary */}
        {variant === "primary" && (
          <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        
        {/* Loading spinner */}
        {loading && (
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}

        {/* Icon left */}
        {IconComponent && iconPosition === "left" && !loading && (
          <IconComponent className="w-4 h-4" />
        )}

        <span className="relative z-10">{children}</span>

        {/* Icon right */}
        {IconComponent && iconPosition === "right" && !loading && (
          <IconComponent className="w-4 h-4" />
        )}
      </motion.button>
    );
  }
);

GlassButton.displayName = "GlassButton";
