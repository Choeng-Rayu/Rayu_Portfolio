import React from 'react';
import { projects } from '../repo/projectsData';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Projects = () => {
  return (
    <section id="projects" className="mobile-section mobile-projects">
      <div className="section-header">
        <h2>Projects</h2>
        <div className="section-line"></div>
        <p className="section-subtitle">Some of my recent work</p>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card" style={{ '--accent': project.accentColor }}>
            <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
            
            <h3 className="project-title">{project.title}</h3>
            
            <p className="project-description">
              {project.description.length > 120 
                ? project.description.substring(0, 120) + '...' 
                : project.description}
            </p>

            <div className="project-tags">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <span key={tagIndex} className="project-tag">{tag}</span>
              ))}
              {project.tags.length > 3 && (
                <span className="project-tag more">+{project.tags.length - 3}</span>
              )}
            </div>

            <div className="project-links">
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link demo">
                  <FaExternalLinkAlt /> Demo
                </a>
              )}
              {project.codeLink && (
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link code">
                  <FaGithub /> Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
