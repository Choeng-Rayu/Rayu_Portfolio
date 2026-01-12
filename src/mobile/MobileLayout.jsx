import React from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Project';
import Contact from './Contact';
import Navigation from './Navigation';
import './mobile-layout.css';

const MobileLayout = () => {
  return (
    <div className="mobile-portfolio">
      <Navigation />
      <main className="mobile-main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="mobile-footer">
        <p>© 2024 Choeng Rayu. All rights reserved.</p>
        <p>Built with React & ❤️</p>
      </footer>
    </div>
  );
};

export default MobileLayout;
