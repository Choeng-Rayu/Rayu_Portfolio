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
