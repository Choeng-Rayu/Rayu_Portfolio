import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import TextAnimation from './TypeAnimation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    // { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Choeng-Rayu' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/rayu-choeng-351243335/' },
    { icon: <FaEnvelope />, url: 'mailto:choengrayu307@gmail.com' }
  ];

  const scrollToSection = (href) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('#about')}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <FaReact className="react-icon" />
          </motion.div>
          <div className="logo-text">
            <motion.span 
              className="name"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              CHOENG RAYU 
              
            </motion.span>
            <motion.span
              className="title"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 2}}
            >
              <TextAnimation
                strings={[
                  "Welcome!",
                  'I know you are ',
                  'Visiting my portfolio',
                ]}
                typeSpeed={40}
                backSpeed={20}
                motionProps={{
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", stiffness: 100 }
                }}
              />
            </motion.span>
          </div>
        </motion.div>

        {isMobile ? (
          <>
            <div className="mobile-controls">
              <motion.button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="icon" />
                ) : (
                  <FaBars className="icon" />
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  className="mobile-nav"
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                  <ul>
                    {navItems.map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          delay: 0.1 * index,
                          type: 'spring',
                          stiffness: 300
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <a 
                          href={item.href} 
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                          }}
                          className="nav-link"
                        >
                          <span className="nav-number">0{index + 1}.</span>
                          {item.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mobile-socials">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="social-icon"
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            <nav className="desktop-nav">
              <ul>
                {navItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a 
                      href={item.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className="nav-link"
                    >
                      <span className="nav-number">0{index + 1}.</span>
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="social-icon"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 2rem;
          z-index: 1000;
          background: rgba(10, 10, 15, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .header.scrolled {
          padding: 1rem 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
        }
        
        .react-icon {
          font-size: 2.2rem;
          color: #61dafb;
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        
        .name {
          font-size: 1.4rem;
          font-weight: 700;
          background: linear-gradient(90deg, #d4af37, #f4e5c2);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1;
          letter-spacing: -0.5px;
        }
        
        .title {
          font-size: 0.9rem;
          color: rgba(212, 175, 55, 0.8);
          font-weight: 500;
          margin-top: 0.2rem;
          letter-spacing: 0.5px;
        }
        
        /* Desktop Navigation */
        .desktop-nav {
          margin-left: auto;
          margin-right: 2rem;
        }
        
        .desktop-nav ul {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0;
          padding: 0;
        }
        
        .desktop-nav .nav-link {
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          position: relative;
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: all 0.3s ease;
        }
        
        .nav-number {
          color: #d4af37;
          font-size: 0.8rem;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        
        .desktop-nav .nav-link:hover {
          color: #d4af37;
        }
        
        .desktop-nav .nav-link:hover .nav-number {
          transform: translateY(-3px);
        }
        
        .desktop-nav .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #d4af37;
          transition: width 0.3s ease;
        }
        
        .desktop-nav .nav-link:hover::after {
          width: 100%;
        }
        
        /* Social Links */
        .social-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .social-icon {
          color: #94a3b8;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          color: #d4af37;
        }
        
        /* Mobile Navigation */
        .mobile-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 2rem;
        }
        
        .menu-toggle .icon {
          font-size: 1.5rem;
          color: #d4af37;
          transition: all 0.3s ease;
        }
        
        .mobile-nav {
          position: fixed;
          top: 0;
          right: 0;
          width: 70%;
          height: 100vh;
          background: rgba(15, 15, 20, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6rem 2rem 2rem;
          z-index: 99;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .mobile-nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .mobile-nav .nav-link {
          color: #e2e8f0;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        
        .mobile-nav .nav-link:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
          transform: translateX(5px);
        }
        
        .mobile-socials {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          padding: 2rem 0;
        }
        
        .mobile-socials .social-icon {
          font-size: 1.5rem;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .header {
            padding: 1rem 1.5rem;
          }
          
          .header.scrolled {
            padding: 0.8rem 1.5rem;
          }
          
          .name {
            font-size: 1.2rem;
          }
          
          .title {
            font-size: 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .header {
            padding: 0.8rem 1rem;
          }
          
          .react-icon {
            font-size: 1.8rem;
          }
          
          .mobile-nav {
            width: 85%;
          }
        }
      `}</style>
    </motion.header>
  );
}

export default Header;