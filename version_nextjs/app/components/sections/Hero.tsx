'use client';

import { useState } from 'react';
import TypeWriter from '../ui/TypeWriter';
import AnimatedBackground from '../ui/AnimatedBackground';
import AsciiTyping from '../ui/asciiTyping';
import { personalInfo, aboutMe, socialLinks } from '../../data/portfolio';
import { asciArtStyles, defaultStyle, getAsciiArtByStyle } from '../../data/asciArtStyle';

export default function Hero() {
  const [selectedStyle, setSelectedStyle] = useState(defaultStyle);
  const currentArt = getAsciiArtByStyle(selectedStyle);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'github':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case 'telegram':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="home" className="hero-section">
      <AnimatedBackground variant="particles" />
      
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting">
            <span className="wave">👋</span>
            <span>Hello, I&apos;m</span>
          </div>
          
          <h1 className="hero-name">
            <span className="name-gradient">{personalInfo.name}</span>
          </h1>

          <div className="my-6 flex justify-center">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-cyan-400/40 bg-gray-900/30 hover:bg-gray-900/50 hover:border-cyan-400/60 transition-all">
              <label htmlFor="ascii-style-select" className="text-sm font-medium text-gray-300">
                ASCII Style:
              </label>
              <select 
                id="ascii-style-select"
                value={selectedStyle} 
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="px-3 py-1 rounded bg-gray-800 text-cyan-300 border border-cyan-400/30 hover:border-cyan-400/60 cursor-pointer text-sm focus:outline-none focus:border-cyan-400/80 transition-all"
                style={{ color: '#00d4ff' }}
              >
                {asciArtStyles.map(style => (
                  <option key={style.styleType} value={style.styleType}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="my-10">
            <AsciiTyping 
              key={selectedStyle}
              className="overflow-x-auto"
              typeSpeed={10}
              pauseAfterComplete={5000}
              asciiArt={currentArt.art}
            />
          </div>
          
          <div className="hero-title">
            <TypeWriter 
              texts={[
                'Software Engineering Student',
                'Full Stack Developer',
                'Tech Builder',
                'Problem Solver',
                'Math Tutor',
              ]}
              speed={80}
              deleteSpeed={40}
              pauseTime={2000}
            />
          </div>
          
          <p className="hero-tagline">{personalInfo.mission}</p>
          
          <div className="hero-stats">
            {aboutMe.stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          
          <div className="hero-cta">
            <button onClick={scrollToProjects} className="btn-primary">
              <span>View My Work</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              <span>Contact Me</span>
            </button>
          </div>
          
          <div className="hero-social">
            {socialLinks.slice(0, 3).map((link) => (
              <a 
                key={link.name}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={link.name}
              >
                {getSocialIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="profile-wrapper">
            <div className="profile-ring ring-1"></div>
            <div className="profile-ring ring-2"></div>
            <div className="profile-ring ring-3"></div>
            <div className="profile-content">
              <div className="profile-avatar">
                <img 
                  src="/Rayu_Photo.png" 
                  alt="Rayu Choeng Profile" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              </div>
              <div className="floating-tags">
                <span className="floating-tag tag-1">⚛️ React</span>
                <span className="floating-tag tag-2">🟢 Node.js</span>
                <span className="floating-tag tag-3">☕ Java</span>
                <span className="floating-tag tag-4">🐍 Python</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
