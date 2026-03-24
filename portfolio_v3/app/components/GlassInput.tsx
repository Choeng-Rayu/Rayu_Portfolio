"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { LucideIcon } from "lucide-react";

interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  icon?: LucideIcon;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "py-2 px-3 text-sm",
  md: "py-3 px-4 text-base",
  lg: "py-4 px-5 text-lg",
};

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, icon: Icon, size = "md", className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const IconComponent = Icon;

    return (
      <div className="relative w-full">
        {/* Floating label */}
        <AnimatePresence>
          {isFocused || props.value ? (
            <motion.label
              initial={{ y: 0, scale: 1 }}
              animate={{ y: -24, scale: 0.85 }}
              exit={{ y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute left-4 pointer-events-none origin-left text-text-secondary",
                error ? "text-danger" : isFocused ? "text-primary" : "text-text-muted"
              )}
            >
              {label}
            </motion.label>
          ) : (
            <motion.label
              initial={{ y: 0, scale: 1 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -24, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted"
            >
              {label}
            </motion.label>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className="relative">
          {IconComponent && (
            <IconComponent 
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
                isFocused ? "text-primary" : "text-text-muted"
              )} 
            />
          )}
          <input
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              "w-full bg-white/5 backdrop-blur-xl rounded-xl border transition-all duration-300",
              "text-white placeholder:text-transparent",
              IconComponent ? "pl-12" : "pl-4",
              sizeClasses[size],
              error
                ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                : "border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20",
              className
            )}
            {...props}
          />
          
          {/* Focus glow */}
          <div 
            className={cn(
              "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none",
              isFocused && "opacity-100",
              error ? "ring-2 ring-danger/20" : "ring-2 ring-primary/20"
            )} 
          />
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 text-sm text-danger"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";

interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="relative w-full">
        {/* Floating label */}
        <AnimatePresence>
          {isFocused || props.value ? (
            <motion.label
              initial={{ y: 0, scale: 1 }}
              animate={{ y: -24, scale: 0.85 }}
              exit={{ y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute left-4 pointer-events-none origin-left text-text-secondary",
                error ? "text-danger" : isFocused ? "text-primary" : "text-text-muted"
              )}
            >
              {label}
            </motion.label>
          ) : (
            <motion.label
              initial={{ y: 0, scale: 1 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -24, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 top-4 pointer-events-none text-text-muted"
            >
              {label}
            </motion.label>
          )}
        </AnimatePresence>

        {/* Textarea */}
        <textarea
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          rows={5}
          className={cn(
            "w-full bg-white/5 backdrop-blur-xl rounded-xl border transition-all duration-300",
            "text-white placeholder:text-transparent py-4 px-4 resize-none",
            error
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
              : "border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20",
            className
          )}
          {...props}
        />

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 text-sm text-danger"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassTextarea.displayName = "GlassTextarea";
