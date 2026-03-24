"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, X, Send, CheckCircle, Loader2, Phone, MapPin, User } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { GlassButton } from "./GlassButton";
import { cn } from "@/app/lib/utils";
import { personalInfo } from "@/app/lib/data";

const emailSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export function EmailFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => {
          setIsSubmitted(false);
          setIsOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Email Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full",
          "bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/30",
          "flex items-center justify-center",
          "transition-all duration-300",
          isOpen ? "rotate-90" : ""
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Mail className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Email Form Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]"
          >
            <GlassPanel radius="xl" className="overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Send className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Send Email</h3>
                      <p className="text-xs text-text-muted">Quick contact form</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted" />
                  </button>
                </div>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email Sent!</h3>
                    <p className="text-text-secondary text-sm">
                      Thank you for reaching out. Rayu will get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <User className="w-4 h-4" />
                        Your Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder="John Doe"
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl bg-white/5 border text-white text-sm",
                          "placeholder:text-text-muted",
                          "focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                          errors.name ? "border-danger" : "border-white/10 focus:border-primary"
                        )}
                      />
                      {errors.name && (
                        <p className="text-xs text-danger mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="john@example.com"
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl bg-white/5 border text-white text-sm",
                          "placeholder:text-text-muted",
                          "focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                          errors.email ? "border-danger" : "border-white/10 focus:border-primary"
                        )}
                      />
                      {errors.email && (
                        <p className="text-xs text-danger mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <Send className="w-4 h-4" />
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Tell Rayu about your project, idea, or opportunity..."
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl bg-white/5 border text-white text-sm resize-none",
                          "placeholder:text-text-muted",
                          "focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                          errors.message ? "border-danger" : "border-white/10 focus:border-primary"
                        )}
                      />
                      {errors.message && (
                        <p className="text-xs text-danger mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <GlassButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      className="w-full"
                      icon={Send}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </GlassButton>
                  </form>
                )}
              </AnimatePresence>

              {/* Quick Contact Info */}
              <div className="px-4 pb-4">
                <div className="pt-3 border-t border-white/10">
                  <p className="text-xs text-text-muted mb-3">Or reach out directly:</p>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {personalInfo.email}
                    </a>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {personalInfo.phone}
                    </a>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <MapPin className="w-4 h-4" />
                      {personalInfo.location}
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
