'use client';

import React from 'react';
import Icon from '../icons';

interface IconDisplayProps {
  iconName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Map old icon names to new icon names
const iconNameMap: Record<string, string> = {
  // Programming
  'coffee-icon': 'java',
  'gear-icon': 'cpp',
  'cpu-icon': 'c',
  'javascript-icon': 'javascript',
  'typescript-icon': 'typescript',
  'python-icon': 'python',
  
  // Frontend
  'brand-react-icon': 'react',
  'brand-nextjs-icon': 'nextjs',
  'code-icon': 'html5',
  'paint-icon': 'css3',
  'layers-icon': 'tailwind',
  
  // Backend
  'nodejs-icon': 'nodejs',
  'rocket-icon': 'express',
  'plug-connected-icon': 'api',
  
  // Databases
  'mysql-icon': 'mysql',
  'database-icon': 'mongodb',
  
  // Tools
  'github-icon': 'git',
  'brand-telegram-icon': 'telegram',
  'docker-icon': 'docker',
  'globe-icon': 'digitalocean',
  'router-icon': 'nginx',
  
  // Experience & Skills
  'book-icon': 'math',
  'bulb-svg': 'problemSolving',
  'message-circle-icon': 'communication',
  'users-group-icon': 'collaboration',
  'layout-dashboard-icon': 'systemDesign',
  'focus-icon': 'criticalThinking',
  
  // Interests
  'scan-heart-icon': 'health',
  'currency-dollar-icon': 'fintech',
  'truck-electric-icon': 'automotive',
  
  // About highlights
  'magnifier-icon': 'curious',
  'hand-heart-icon': 'volunteer',
  
  // Experience icons
  'alarm-clock-plus-icon': 'robotics',
  
  // Contact & Social
  'brand-github-icon': 'github',
  'brand-linkedin-icon': 'linkedin',
  'brand-facebook-icon': 'facebook',
};

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export default function IconDisplay({ 
  iconName, 
  className = '', 
  size = 'md' 
}: IconDisplayProps) {
  const mappedName = iconNameMap[iconName] || iconName;
  
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Icon name={mappedName} size={sizeMap[size]} />
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
