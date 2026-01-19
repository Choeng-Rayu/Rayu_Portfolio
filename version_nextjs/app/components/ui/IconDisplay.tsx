'use client';

import React from 'react';

interface IconDisplayProps {
  iconName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Icon name to display mapping
const iconDisplayMap: Record<string, string> = {
  // Programming
  'coffee-icon': '☕',
  'gear-icon': '⚙️',
  'cpu-icon': '💻',
  'javascript-icon': '✨',
  'typescript-icon': '🔷',
  'python-icon': '🐍',
  
  // Frontend
  'brand-react-icon': '⚛️',
  'brand-nextjs-icon': '▲',
  'code-icon': '📝',
  'paint-icon': '🎨',
  'layers-icon': '📚',
  
  // Backend
  'nodejs-icon': '🟢',
  'rocket-icon': '🚀',
  'plug-connected-icon': '🔌',
  
  // Databases
  'mysql-icon': '🐬',
  'database-icon': '🗄️',
  
  // Tools
  'github-icon': '🐙',
  'brand-telegram-icon': '✈️',
  'docker-icon': '🐳',
  'globe-icon': '🌐',
  'router-icon': '🔒',
  
  // Experience & Skills
  'book-icon': '📚',
  'bulb-svg': '💡',
  'message-circle-icon': '💬',
  'users-group-icon': '👥',
  'layout-dashboard-icon': '📊',
  'focus-icon': '🎯',
  
  // Interests
  'scan-heart-icon': '❤️',
  'currency-dollar-icon': '💵',
  'truck-electric-icon': '🚗',
  
  // About highlights
  'magnifier-icon': '🔍',
  'hand-heart-icon': '🤝',
  
  // Experience icons
  'alarm-clock-plus-icon': '⏰',
  
  // Contact & Social
  'brand-github-icon': '🐙',
  'brand-linkedin-icon': '💼',
  'brand-facebook-icon': '📘',
};

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function IconDisplay({ 
  iconName, 
  className = '', 
  size = 'md' 
}: IconDisplayProps) {
  const displaySymbol = iconDisplayMap[iconName] || '•';
  
  return (
    <span 
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label={iconName}
    >
      {displaySymbol}
    </span>
  );
}

// Icon wrapper for category tabs and buttons
export function CategoryIcon({ iconName, label }: { iconName: string; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <IconDisplay iconName={iconName} size="md" />
      {label && <span>{label}</span>}
    </div>
  );
}

// Skill item icon with background
export function SkillIcon({ iconName }: { iconName: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
      <IconDisplay iconName={iconName} size="lg" />
    </div>
  );
}
