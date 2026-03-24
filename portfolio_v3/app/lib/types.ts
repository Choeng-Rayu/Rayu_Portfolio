export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  status: "active" | "completed" | "open-source" | "startup";
  category: "startup" | "open-source" | "school" | "volunteer" | "ai";
  techStack: string[];
  gradient: string;
  github?: string;
  liveDemo?: string;
  date: string;
  featured?: boolean;
  problem?: string;
  solution?: string;
  features?: string[];
  learnings?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  type: "work" | "volunteer";
  startDate: string;
  endDate: string | "Present";
  description?: string;
  highlights?: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: "languages" | "frontend" | "backend" | "database" | "devops" | "ai";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
