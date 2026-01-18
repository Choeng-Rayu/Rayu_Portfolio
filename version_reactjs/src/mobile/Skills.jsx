import React from 'react';
import { skills } from '../repo/skillsData';

const Skills = () => {
  const techStack = [
    { name: 'React.js', icon: '⚛️', level: 85 },
    { name: 'JavaScript', icon: '📜', level: 90 },
    { name: 'Node.js', icon: '🟢', level: 80 },
    { name: 'Java', icon: '☕', level: 75 },
    { name: 'C/C++', icon: '⚙️', level: 70 },
    { name: 'Python', icon: '🐍', level: 75 },
    { name: 'MySQL', icon: '🗄️', level: 80 },
    { name: 'MongoDB', icon: '🍃', level: 75 },
    { name: 'Flutter', icon: '📱', level: 65 },
    { name: 'Git', icon: '🔀', level: 85 },
  ];

  return (
    <section id="skills" className="mobile-section mobile-skills">
      <div className="section-header">
        <h2>Skills & Tech</h2>
        <div className="section-line"></div>
      </div>

      <div className="skills-content">
        {/* Tech Stack */}
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <div key={index} className="tech-card">
              <span className="tech-icon">{tech.icon}</span>
              <span className="tech-name">{tech.name}</span>
              <div className="tech-bar">
                <div className="tech-progress" style={{ width: `${tech.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="additional-skills">
          <h3>Other Skills</h3>
          <div className="skill-tags">
            <span className="skill-tag">Problem Solving</span>
            <span className="skill-tag">Teaching</span>
            <span className="skill-tag">Communication</span>
            <span className="skill-tag">Team Work</span>
            <span className="skill-tag">System Design</span>
            <span className="skill-tag">AI Tools</span>
            <span className="skill-tag">Critical Thinking</span>
            <span className="skill-tag">Math Tutoring</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
