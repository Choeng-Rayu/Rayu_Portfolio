import React, { useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Project';
import Contact from './Contact';
import './mobile-layout.css';

const MobileLayout = () => {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="mobile-layout" style={{
      width: '100%',
      minHeight: '100vh',
      background: '#ffffff',
      overflowX: 'hidden'
    }}>
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      <style>{`
        .mobile-layout {
          padding-top: 0;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Hide desktop elements on mobile */
        @media (max-width: 768px) {
          .header,
          .footer-container,
          .pointer-effect,
          .splash-cursor,
          canvas {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileLayout;
