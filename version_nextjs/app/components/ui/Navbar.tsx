'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navigation, personalInfo } from '../../data/portfolio';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigation.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link href="#home" className="navbar-logo" onClick={() => scrollToSection('#home')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">{personalInfo.name.split(' ')[0]}</span>
          <span className="logo-bracket">/&gt;</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-links">
          {navigation.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => scrollToSection(item.href)}
                className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a href={personalInfo.cvUrl} download className="navbar-cta">
          <span>Download CV</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        </a>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          {navigation.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => scrollToSection(item.href)}
                className={`mobile-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <a href={personalInfo.cvUrl} download className="mobile-cta">
          Download CV
        </a>
      </div>
    </nav>
  );
}
