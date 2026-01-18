import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCode, FaProjectDiagram, FaEnvelope, FaDownload, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';
import './MobileHome.css';

function MobileHome() {
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'About Me', icon: <FaCode />, path: '/about', color: '#3b82f6' },
    { name: 'My Skills', icon: <FaCode />, path: '/skills', color: '#10b981' },
    { name: 'Projects', icon: <FaProjectDiagram />, path: '/projects', color: '#8b5cf6' },
    { name: 'Contact', icon: <FaEnvelope />, path: '/contact', color: '#f59e0b' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Choeng-Rayu', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', name: 'LinkedIn' },
    { icon: <FaTelegram />, url: 'https://t.me/President_Alien', name: 'Telegram' },
  ];

  return (
    <div className="mobile-home">
      {/* Hero Section */}
      <motion.section 
        className="mobile-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="hero-content"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="greeting">👋 Hello, I'm</div>
          <h1 className="name">Choeng Rayu</h1>
          <p className="title">Software Engineering Student</p>
          <p className="tagline">Building digital solutions for real-world problems</p>
          
          {/* Social Links */}
          <div className="hero-socials">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <motion.button
              className="cta-primary"
              onClick={() => navigate('/about')}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              About Me <FaArrowRight />
            </motion.button>
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1OMPpxq4KtLMBqRY9sbYQ5qd0Pxnazpgg"
              className="cta-secondary"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <FaDownload /> Download CV
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Quick Navigation */}
      <section className="quick-nav-section">
        <h2 className="section-title">Explore</h2>
        <div className="quick-nav-grid">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              className="quick-nav-card"
              onClick={() => navigate(link.path)}
              style={{ '--accent-color': link.color }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="nav-icon">{link.icon}</div>
              <span className="nav-name">{link.name}</span>
              <FaArrowRight className="nav-arrow" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick About Preview */}
      <motion.section 
        className="about-preview"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="section-title">Who Am I?</h2>
        <div className="about-preview-content">
          <p>
            I'm a <strong>3rd year Software Engineering student</strong> at Cambodia Academy of Digital Technology (CADT). 
            I love building practical digital solutions and turning ideas into reality.
          </p>
          <div className="about-highlights">
            <div className="highlight-item">
              <span className="highlight-number">3+</span>
              <span className="highlight-label">Years Coding</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-number">8+</span>
              <span className="highlight-label">Projects</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-number">700+</span>
              <span className="highlight-label">Students Taught</span>
            </div>
          </div>
          <button className="learn-more-btn" onClick={() => navigate('/about')}>
            Learn More About Me <FaArrowRight />
          </button>
        </div>
      </motion.section>

      {/* Tech Stack Preview */}
      <motion.section 
        className="tech-preview"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="section-title">Tech Stack</h2>
        <div className="tech-tags">
          {['React.js', 'JavaScript', 'Java', 'C++', 'Flutter', 'Node.js', 'MySQL', 'MongoDB'].map((tech, index) => (
            <motion.span 
              key={index} 
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <button className="view-all-btn" onClick={() => navigate('/skills')}>
          View All Skills <FaArrowRight />
        </button>
      </motion.section>

      {/* Featured Project */}
      <motion.section 
        className="featured-project"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h2 className="section-title">Featured Project</h2>
        <div className="project-card-mobile">
          <div className="project-badge">🔥 Latest</div>
          <h3>Finwise.space</h3>
          <p>Smart financial management platform for tracking income, expenses, and savings.</p>
          <div className="project-tech">
            <span>React</span>
            <span>Node.js</span>
            <span>MySQL</span>
          </div>
          <div className="project-actions">
            <a href="https://finwise.space" target="_blank" rel="noopener noreferrer" className="project-link">
              Live Demo <FaArrowRight />
            </a>
          </div>
        </div>
        <button className="view-all-btn" onClick={() => navigate('/projects')}>
          View All Projects <FaArrowRight />
        </button>
      </motion.section>

      {/* Contact CTA */}
      <motion.section 
        className="contact-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <h2>Let's Work Together!</h2>
        <p>Open to internships, collaborations, and meaningful projects</p>
        <button className="contact-btn" onClick={() => navigate('/contact')}>
          <FaEnvelope /> Get In Touch
        </button>
      </motion.section>
    </div>
  );
}

export default MobileHome;
