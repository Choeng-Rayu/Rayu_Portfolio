'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      setIsScrolled(scrollY > heroHeight);

      // Determine active section
      const sections = navItems.map((item) => item.href.replace('/#', ''));
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    setIsMobileMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween' as const,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween' as const,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
      >
        <nav className="mx-4 mt-4 px-6 py-4 rounded-2xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a
              href="/#home"
              onClick={(e) => handleNavClick(e, '/#home')}
              className="font-[var(--font-playfair-display)] text-xl font-medium text-white/95 hover:text-[#ff4500] transition-colors duration-300"
            >
              Rayu<span className="text-[#ff4500]">Choeng</span>
            </a>

            {/* Nav Links */}
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-4 py-2 font-[var(--font-inter)] text-sm font-medium transition-colors duration-300 rounded-lg ${
                      activeSection === item.href.replace('/#', '')
                        ? 'text-white'
                        : 'text-white/60 hover:text-white/90'
                    }`}
                  >
                    {activeSection === item.href.replace('/#', '') && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
      >
        <nav className="mx-4 mt-4 px-4 py-3 rounded-2xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/#home"
              onClick={(e) => handleNavClick(e, '/#home')}
              className="font-[var(--font-playfair-display)] text-lg font-medium text-white/95"
            >
              Rayu<span className="text-[#ff4500]">Choeng</span>
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[#0a0a0a] border-l border-white/10 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                {/* Close button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Mobile Nav Links */}
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        custom={index}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`block py-3 px-4 font-[var(--font-inter)] text-base font-medium rounded-xl transition-all duration-300 ${
                            activeSection === item.href.replace('/#', '')
                              ? 'text-white bg-[#ff4500]/20 border border-[#ff4500]/30'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t border-white/10"
                >
                  <p className="font-[var(--font-inter)] text-xs text-white/40 text-center">
                    Rayu Choeng
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
