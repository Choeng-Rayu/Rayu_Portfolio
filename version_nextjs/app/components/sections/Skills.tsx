'use client';

import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import SkillBar from '../ui/SkillBar';
import { skills } from '../../data/portfolio';
import Icon from '../icons';

type SkillCategory = 'programming' | 'frontend' | 'backend' | 'databases' | 'tools';

type SkillWithLevel = { name: string; icon: string; level: number };

const categoryLabels: Record<SkillCategory, { label: string; icon: string; color: string }> = {
  programming: { label: 'Programming Languages', icon: 'code', color: '#f59e0b' },
  frontend: { label: 'Frontend Development', icon: 'paint', color: '#10b981' },
  backend: { label: 'Backend Development', icon: 'gear', color: '#3b82f6' },
  databases: { label: 'Databases', icon: 'database', color: '#8b5cf6' },
  tools: { label: 'Tools & Platforms', icon: 'tools', color: '#ec4899' },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('programming');

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <SectionTitle 
          title="Skills & Expertise" 
          subtitle="Technologies and tools I work with"
          accent="#00d4ff"
        />
        
        <div className="skills-content">
          {/* Category Tabs */}
          <div className="skills-tabs">
            {(Object.keys(categoryLabels) as SkillCategory[]).map((category) => (
              <button
                key={category}
                className={`skill-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                style={{
                  '--tab-color': categoryLabels[category].color,
                } as React.CSSProperties}
              >
                <span className="tab-icon"><Icon name={categoryLabels[category].icon} size={16} /></span>
                <span className="tab-label">{categoryLabels[category].label}</span>
              </button>
            ))}
          </div>
          
          {/* Skills Display */}
          <div className="skills-display">
            <div className="skills-grid">
              {(skills[activeCategory] as SkillWithLevel[])?.map((skill, index) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-icon"><Icon name={skill.icon} size={20} /></div>
                  <div className="skill-details">
                    <SkillBar 
                      name={skill.name} 
                      level={skill.level} 
                      color={categoryLabels[activeCategory].color}
                      delay={index * 100}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Soft Skills */}
          <div className="soft-skills">
            <h3 className="soft-skills-title">
              <span><Icon name="star" size={20} /></span> Soft Skills
            </h3>
            <div className="soft-skills-grid">
              {skills.soft.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className="soft-skill-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="soft-icon"><Icon name={skill.icon} size={16} /></span>
                  <span className="soft-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
