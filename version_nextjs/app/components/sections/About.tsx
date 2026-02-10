'use client';

import SectionTitle from '../ui/SectionTitle';
import { aboutMe, coreInterests, personalInfo } from '../../data/portfolio';
import Icon from '../icons';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <SectionTitle 
          title="About Me" 
          subtitle="Get to know my story and what drives me"
        />
        
        <div className="about-content">
          <div className="about-main">
            <div className="about-card">
              <div className="about-header">
                <span className="about-emoji"><Icon name="user" size={24} /></span>
                <div>
                  <h3>{personalInfo.name}</h3>
                  <p>{personalInfo.title} • {personalInfo.year}</p>
                </div>
              </div>
              
              <p className="about-headline">{aboutMe.headline}</p>
              <p className="about-description">{aboutMe.description}</p>
              
              <div className="about-highlights">
                {aboutMe.highlights.map((item, index) => (
                  <div key={index} className="highlight-item">
                    <span className="highlight-icon"><Icon name={item.icon} size={16} /></span>
                    <span className="highlight-text">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="about-status">
                <span className="status-dot"></span>
                <span>{personalInfo.status}</span>
              </div>
            </div>
            
            <div className="about-quote">
              <blockquote>
                <span className="quote-mark">&ldquo;</span>
                {personalInfo.philosophy}
                <span className="quote-mark">&rdquo;</span>
              </blockquote>
            </div>
          </div>
          
          <div className="about-sidebar">
            <div className="interests-card">
              <h4><Icon name="star" size={16} /> Core Interests</h4>
              <div className="interests-grid">
                {coreInterests.map((interest, index) => (
                  <div key={index} className="interest-item">
                    <span className="interest-icon"><Icon name={interest.icon} size={16} /></span>
                    <span className="interest-title">{interest.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="education-card">
              <h4><Icon name="graduation" size={16} /> Education</h4>
              <div className="education-info">
                <div className="edu-icon"><Icon name="home" size={20} /></div>
                <div>
                  <p className="edu-school">{personalInfo.university}</p>
                  <p className="edu-degree">Software Engineering</p>
                  <p className="edu-year">{personalInfo.year} (2023 - Present)</p>
                </div>
              </div>
            </div>
            
            <div className="stats-grid">
              {aboutMe.stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
