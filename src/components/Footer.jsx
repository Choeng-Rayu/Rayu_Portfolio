import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaFacebook } from 'react-icons/fa';
import { SiLeetcode, SiTelegram } from 'react-icons/si';

function Footer() {
  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/Choeng-Rayu', 
      icon: <FaGithub />,
      color: '#6e5494'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/rayu-choeng-351243335/', 
      icon: <FaLinkedin />,
      color: '#0077b5'
    },
    { 
      name: 'Facebook', 
      href: 'https://www.facebook.com/choeng.rayu.5', 
      icon: <FaFacebook />,
      color: '#1da1f2'
    },
    { 
      name: 'Telegram', 
      href: 'https://t.me/President_Alein', 
      icon: <SiTelegram />,
      color: '#ffa116'
    },
    { 
      name: 'Email', 
      href: 'mailto:choengrayu307@gmail.com', 
      icon: <FaEnvelope />,
      color: '#d44638'
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="footer-container"
    >
      {/* Decorative elements */}
      <div className="footer-decoration">
        <div className="footer-dots"></div>
        <div className="footer-wave"></div>
      </div>

      <div className="footer-content">
        {/* Logo/brand section */}
        <motion.div
          className="footer-brand"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="brand-logo">
            <FaCode className="code-icon" />
            <span>Choeng Rayu Hire Me Please</span>
          </div>
          <motion.p
            className="brand-tagline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Building digital experiences with passion and precision
          </motion.p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="social-links-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="social-title">Connect With Me</h3>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ '--link-color': link.color }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 + index * 0.1
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.1,
                  boxShadow: `0 8px 15px ${link.color}40`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon">{link.icon}</span>
                <span className="social-name">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Copyright and credits */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="copyright">
            © {new Date().getFullYear()} Choeng Rayu. All rights reserved.
          </p>
          <p className="credits">
            Crafted with <span className="heart">❤️</span> and React
          </p>
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .footer-container {
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          color: #fff;
          padding: 80px 20px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .footer-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .footer-dots {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.3;
        }

        .footer-wave {
          position: absolute;
          top: -50px;
          left: 0;
          width: 100%;
          height: 100px;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23d4af37' opacity='.1'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%23d4af37' opacity='.25'/%3E%3C/svg%3E");
          background-size: cover;
          background-repeat: no-repeat;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .footer-brand {
          margin-bottom: 60px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #d4af37, #f4e5c2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .code-icon {
          font-size: 2.8rem;
          color: #d4af37;
          filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5));
        }

        .brand-tagline {
          font-size: 1.2rem;
          color: #aaa;
          font-style: italic;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .social-links-container {
          margin-bottom: 60px;
        }

        .social-title {
          font-size: 1.3rem;
          margin-bottom: 30px;
          color: #d4af37;
          position: relative;
          display: inline-block;
        }

        .social-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }

        .social-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .social-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          border-radius: 20px;
          background: rgba(30, 30, 30, 0.7);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--link-color);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .social-link:hover::before {
          opacity: 0.2;
        }

        .social-icon {
          font-size: 2rem;
          margin-bottom: 8px;
          transition: transform 0.3s ease;
        }

        .social-link:hover .social-icon {
          transform: scale(1.2);
          color: var(--link-color);
        }

        .social-name {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 30px;
        }

        .copyright {
          color: #888;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .credits {
          color: #666;
          font-size: 0.8rem;
        }

        .heart {
          color: #ff4d4d;
          display: inline-block;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .footer-container {
            padding: 60px 15px 30px;
          }

          .brand-logo {
            font-size: 2rem;
          }

          .code-icon {
            font-size: 2.2rem;
          }

          .brand-tagline {
            font-size: 1rem;
          }

          .social-links {
            gap: 15px;
          }

          .social-link {
            width: 80px;
            height: 80px;
          }

          .social-icon {
            font-size: 1.5rem;
          }

          .social-name {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 50px 10px 20px;
          }

          .brand-logo {
            font-size: 1.8rem;
            flex-direction: column;
            gap: 5px;
          }

          .social-links {
            gap: 10px;
          }

          .social-link {
            width: 70px;
            height: 70px;
            border-radius: 15px;
          }
        }
      `}</style>
    </motion.footer>
  );
}

export default Footer;