'use client';

interface SkillBarProps {
  name: string;
  level: number;
  color?: string;
  delay?: number;
}

export default function SkillBar({ 
  name, 
  level, 
  color = 'var(--accent-primary)', 
  delay = 0 
}: SkillBarProps) {
  return (
    <div className="skill-bar" style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-track">
        <div 
          className="skill-fill"
          style={{ 
            width: `${level}%`, 
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            animationDelay: `${delay + 300}ms`
          }}
        />
      </div>
    </div>
  );
}
