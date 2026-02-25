'use client';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  demoLink?: string;
  codeLink: string;
  featured?: boolean;
  category: string;
  stars?: number;
  forks?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  accentColor,
  demoLink,
  codeLink,
  featured,
  category,
  stars,
  forks,
}: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`}>
      {featured && <span className="featured-badge">⭐ Featured</span>}
      <div className="project-header">
        <span className="project-category" style={{ color: accentColor }}>
          {category}
        </span>
        <h3 className="project-title">{title}</h3>
      </div>
      
      <p className="project-description">{description}</p>
      
      {(stars !== undefined || forks !== undefined) && (
        <div className="project-live-stats">
          {stars !== undefined && (
            <span className="project-stat">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                <path d="M12 .587l3.668 7.431L24 9.279l-6 5.849 1.416 8.265L12 18.897l-7.416 4.496L6 15.128 0 9.279l8.332-1.261L12 .587z" />
              </svg>
              {stars}
            </span>
          )}
          {forks !== undefined && (
            <span className="project-stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" />
                <path d="M6 9v2a3 3 0 003 3h6a3 3 0 003-3V9" />
              </svg>
              {forks}
            </span>
          )}
        </div>
      )}

      <div className="project-tags">
        {tags.slice(0, 4).map((tag) => (
          <span 
            key={tag} 
            className="project-tag"
            style={{ borderColor: `${accentColor}50`, color: accentColor }}
          >
            {tag}
          </span>
        ))}
        {tags.length > 4 && (
          <span className="project-tag more">+{tags.length - 4}</span>
        )}
      </div>
      
      <div className="project-links">
        {demoLink && (
          <a 
            href={demoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="project-link demo"
            style={{ background: accentColor }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            Live Demo
          </a>
        )}
        <a 
          href={codeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="project-link code"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
          View Code
        </a>
      </div>
      
      <div className="project-glow" style={{ background: `${accentColor}20` }} />
    </article>
  );
}
