'use client';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  accent?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  accent = 'var(--accent-primary)',
  align = 'center' 
}: SectionTitleProps) {
  return (
    <div className={`section-title-wrapper ${align}`}>
      <h2 className="section-title">
        <span className="title-decorator" style={{ background: accent }}></span>
        {title}
        <span className="title-decorator" style={{ background: accent }}></span>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
