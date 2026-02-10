'use client';

import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { personalInfo, socialLinks } from '../../data/portfolio';
import Icon from '../icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission - replace with actual API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      case 'facebook':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
          </svg>
        );
      case 'telegram':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        );
      case 'email':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Let&apos;s connect and build something amazing together"
          accent="#f59e0b"
        />
        
        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <h3>Let&apos;s Connect!</h3>
              <p>
                I&apos;m currently open for internships, collaborations, and freelance projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="contact-details">
                <a href={`mailto:${personalInfo.email}`} className="contact-item">
                  <span className="contact-icon"><Icon name="email" size={20} /></span>
                  <div>
                    <span className="contact-label">Email</span>
                    <span className="contact-value">{personalInfo.email}</span>
                  </div>
                </a>
                <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="contact-item">
                  <span className="contact-icon"><Icon name="phone" size={20} /></span>
                  <div>
                    <span className="contact-label">Phone</span>
                    <span className="contact-value">{personalInfo.phone}</span>
                  </div>
                </a>
                <div className="contact-item">
                  <span className="contact-icon"><Icon name="home" size={20} /></span>
                  <div>
                    <span className="contact-label">Location</span>
                    <span className="contact-value">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="contact-social">
                <p>Find me on</p>
                <div className="social-links">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      aria-label={link.name}
                    >
                      {getSocialIcon(link.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Availability Card */}
            <div className="availability-card">
              <div className="availability-status">
                <span className="status-dot active"></span>
                <span>Available for opportunities</span>
              </div>
              <p>Open to internships, part-time positions, and remote collaborations!</p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className={`submit-btn ${status}`}
                disabled={status === 'sending'}
              >
                {status === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22,2 15,22 11,13 2,9"/>
                    </svg>
                  </>
                )}
                {status === 'sending' && <span>Sending...</span>}
                {status === 'success' && <span>Message Sent!</span>}
                {status === 'error' && <span>Error, try again</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
