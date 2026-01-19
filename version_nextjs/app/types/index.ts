// Type definitions for the portfolio

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  accentColor: string;
  demoLink?: string;
  codeLink: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: number;
  }[];
}

export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'work' | 'volunteer' | 'education';
}

export interface Highlight {
  number: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

export interface ChatAction {
  type: 'link' | 'download' | 'email' | 'phone';
  label: string;
  url: string;
  icon?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  university: string;
  year: number;
  email: string;
  phone: string;
  status: string;
  mission: string;
  philosophy: string;
}
