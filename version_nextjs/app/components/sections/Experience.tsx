'use client';

import SectionTitle from '../ui/SectionTitle';
import { experience } from '../../data/portfolio';
import Icon from '../icons';

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <SectionTitle 
          title="Experience" 
          subtitle="Teaching, volunteering, and building"
          accent="#10b981"
        />
        
        <div className="experience-content">
          {/* Teaching Experience */}
          <div className="experience-column">
            <h3 className="exp-category-title">
              <span><Icon name="math" size={24} /></span> Teaching & Mentoring
            </h3>
            <div className="exp-cards">
              {experience.teaching.map((item, index) => (
                <div key={index} className="exp-card teaching">
                  <span className="exp-icon">{item.icon}</span>
                  <div className="exp-info">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Events & Volunteering */}
          <div className="experience-column">
            <h3 className="exp-category-title">
              <span><Icon name="star" size={24} /></span> Events & Volunteering
            </h3>
            <div className="events-timeline">
              {experience.events.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-dot"></div>
                  <div className="event-content">
                    <h4>{event.name}</h4>
                    <span className="event-role">{event.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Impact Stats */}
        <div className="impact-banner">
          <div className="impact-item">
            <span className="impact-icon"><Icon name="teaching" size={24} /></span>
            <span className="impact-number">700+</span>
            <span className="impact-label">Students Taught</span>
          </div>
          <div className="impact-item">
            <span className="impact-icon"><Icon name="graduation" size={24} /></span>
            <span className="impact-number">2+</span>
            <span className="impact-label">Years Teaching</span>
          </div>
          <div className="impact-item">
            <span className="impact-icon"><Icon name="star" size={24} /></span>
            <span className="impact-number">5+</span>
            <span className="impact-label">Major Events</span>
          </div>
          <div className="impact-item">
            <span className="impact-icon"><Icon name="collaboration" size={24} /></span>
            <span className="impact-number">3</span>
            <span className="impact-label">Team Members Led</span>
          </div>
        </div>
      </div>
    </section>
  );
}
