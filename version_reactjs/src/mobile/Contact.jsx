import React from 'react';
import { contactInfo } from '../repo/contactData';
import { FaEnvelope, FaPhone, FaTelegram, FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Choeng-Rayu', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', name: 'LinkedIn' },
    { icon: <FaTelegram />, url: 'https://t.me/President_Alien', name: 'Telegram' },
    { icon: <FaFacebook />, url: 'https://www.facebook.com/choeng.rayu.5', name: 'Facebook' },
  ];

  const iconMap = {
    Mail: <FaEnvelope />,
    Phone: <FaPhone />,
  };

  return (
    <section id="contact" className="mobile-section mobile-contact">
      <div className="section-header">
        <h2>Get In Touch</h2>
        <div className="section-line"></div>
        <p className="section-subtitle">Let's work together!</p>
      </div>

      <div className="contact-content">
        <p className="contact-intro">
          I'm always open to discussing new projects, internships, or collaboration opportunities.
        </p>

        {/* Contact Info */}
        <div className="contact-info">
          {contactInfo.map((info, index) => (
            <a key={index} href={info.link} className="contact-item">
              <div className="contact-icon">{iconMap[info.icon]}</div>
              <div className="contact-details">
                <span className="contact-label">{info.title}</span>
                <span className="contact-value">{info.content}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="social-section">
          <h3>Connect With Me</h3>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Message */}
        <div className="quick-contact">
          <p>Prefer email? Click below to send me a message directly:</p>
          <a href="mailto:choengrayu307@gmail.com" className="email-btn">
            <FaEnvelope /> Send Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
