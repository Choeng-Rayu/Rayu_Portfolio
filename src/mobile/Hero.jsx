import React from 'react';
import { FaGithub, FaLinkedin, FaTelegram, FaDownload } from 'react-icons/fa';
import AsciiTyping from '../components/pages/AsciiTyping';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="mobile-hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content">
        {/* ASCII Art Animation */}
        <div className="hero-ascii">
          <AsciiTyping 
            typeSpeed={5}
            pauseAfterComplete={3000}
            cursorBlinkSpeed={500}
          />
        </div>

        <p className="hero-greeting">👋 Hello, I'm</p>
        <h1 className="hero-name">Choeng Rayu</h1>
        <h2 className="hero-title">Software Engineering Student</h2>
        <p className="hero-tagline">
          3rd Year @ CADT • Building practical digital solutions
        </p>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years Coding</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">700+</span>
            <span className="stat-label">Students</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="hero-socials">
          <a href="https://github.com/Choeng-Rayu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/rayu-choeng-351243335/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://t.me/President_Alien" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <FaTelegram />
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <button className="cta-primary" onClick={() => scrollToSection('projects')}>
            View Projects
          </button>
          <a 
            href="https://drive.google.com/uc?export=download&id=1dcOqSAMxC3dAIc8_orut0R4yQAHusl0w" 
            className="cta-secondary"
          >
            <FaDownload /> CV
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
          <span>Scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
