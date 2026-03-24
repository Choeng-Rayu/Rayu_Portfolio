"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Globe, Send, MessageCircle, CheckCircle } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { GlassInput, GlassTextarea } from "./GlassInput";
import { GlassButton } from "./GlassButton";
import { AnimatedItem, Section } from "./Section";
import { personalInfo, socialLinks } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const quickContacts = [
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: Globe, label: "Website", value: personalInfo.website, href: `https://${personalInfo.website}` },
  { icon: MessageCircle, label: "Telegram", value: "@President_Alien", href: "https://t.me/President_Alien" },
];

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail: Mail,
  Send: MessageCircle,
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Let's build something amazing together"
      titleAlign="center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Form */}
        <AnimatedItem>
          <GlassPanel className="p-6 sm:p-8" radius="xl">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-secondary">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Your Name
                  </label>
                  <GlassInput
                    {...register("name")}
                    label="Your Name"
                    placeholder="e.g. Sophea"
                    error={errors.name?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <GlassInput
                    {...register("email")}
                    label="Email Address"
                    type="email"
                    placeholder="e.g. sophea@example.com"
                    error={errors.email?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <GlassTextarea
                    {...register("message")}
                    label="Your Message"
                    placeholder="Tell me about your project, idea, or opportunity..."
                    error={errors.message?.message}
                  />
                </div>

                <GlassButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  loading={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </GlassButton>
              </form>
            )}
          </GlassPanel>
        </AnimatedItem>

        {/* Contact Info */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <AnimatedItem delay={0.1}>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Contact
            </h3>
            <div className="space-y-3">
              {quickContacts.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">{contact.label}</p>
                      <p className="text-white font-medium">{contact.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </AnimatedItem>

          {/* Social Links */}
          <AnimatedItem delay={0.2}>
            <h3 className="text-lg font-semibold text-white mb-4 mt-8">
              Connect With Me
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const IconComponent = socialIcons[link.icon] || Mail;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </motion.a>
                );
              })}
            </div>
          </AnimatedItem>

          {/* Availability Note */}
          <AnimatedItem delay={0.3}>
            <div className="mt-8 p-5 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="text-primary font-semibold">Open to:</span> internships, collaborations, freelance projects, and startup ideas. Feel free to reach out — I typically respond within 24 hours.
              </p>
            </div>
          </AnimatedItem>
        </div>
      </div>
    </Section>
  );
}
