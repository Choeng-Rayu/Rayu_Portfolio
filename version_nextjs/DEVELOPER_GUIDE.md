# Developer Guide - Rayu Portfolio

> **Quick Reference:** This guide helps you understand and modify the codebase efficiently.

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Data Flow](#data-flow)
4. [How to Modify Content](#how-to-modify-content)
5. [How to Add New Features](#how-to-add-new-features)
6. [Component Patterns](#component-patterns)
7. [Styling Guide](#styling-guide)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

This is a **Next.js 16** single-page portfolio with the following characteristics:

- **Single Page Application (SPA)**: All content is on one page with anchor-based navigation
- **Static Data**: No API/database - all content is in TypeScript files
- **Component-Based**: React components organized by purpose
- **Dark Theme Only**: Glass morphism design with cyan/purple accents

```
User → Navbar (Anchor Navigation) → Sections → Components → Data Files
                                    ↓
                              ChatBot (Floating Widget)
```

---

## Project Structure

```
app/
├── components/
│   ├── sections/          # Page sections (Hero, About, Skills, etc.)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   │
│   ├── ui/               # Reusable UI components
│   │   ├── Navbar.tsx    # Fixed navigation bar
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillBar.tsx
│   │   └── SectionTitle.tsx
│   │
│   └── ChatBot.tsx       # Floating AI assistant
│
├── data/
│   └── portfolio.ts      # ALL content lives here (see below)
│
├── types/
│   └── index.ts          # TypeScript type definitions
│
├── hooks/
│   ├── useInView.ts      # Scroll detection hook
│   └── useWindowSize.ts  # Responsive hook
│
├── lib/
│   └── chatbot/          # Chatbot AI logic
│       ├── index.ts
│       ├── intents.ts
│       └── responses.ts
│
├── page.tsx              # Main page (composes all sections)
├── layout.tsx            # Root layout with fonts/metadata
└── globals.css           # Global styles & CSS variables
```

---

## Data Flow

### The Golden Rule
**ALL content data is in `/app/data/portfolio.ts`** - this is the only file you need to edit to change text, skills, projects, etc.

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  /app/data/portfolio.ts (Single Source of Truth)           │
│                                                             │
│  • personalInfo        →  Hero, About, Contact             │
│  • aboutMe            →  About                             │
│  • skills             →  Skills                            │
│  • projects           →  Projects                          │
│  • experience         →  Experience                        │
│  • socialLinks        →  Hero, Contact, Footer             │
│  • navigation         →  Navbar                            │
│  • chatbotKnowledge   →  ChatBot                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
              Each section imports what it needs
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Sections pass data to UI components via props             │
│                                                             │
│  Example:                                                   │
│  Projects.tsx ──projects array──> ProjectCard.tsx          │
└─────────────────────────────────────────────────────────────┘
```

### State Management
- **No Redux/Context**: Uses React `useState` for local component state only
- **State Types**:
  - `activeFilter` - Current project category filter
  - `selectedStyle` - ASCII art style selection
  - Mobile menu toggle
  - Form input states

---

## How to Modify Content

### 1. Update Personal Information

**File:** `app/data/portfolio.ts`

```typescript
export const personalInfo = {
  name: "Your Name",              // Change your name
  title: "Your Title",            // Change your job title
  location: "Your Location",      // Change location
  email: "your@email.com",        // Change email
  phone: "+1234567890",           // Change phone
  // ... other fields
};
```

**Where it appears:** Hero section, About section, Contact section, ChatBot responses

### 2. Add/Edit Projects

**File:** `app/data/portfolio.ts`

```typescript
export const projects = [
  {
    id: 9,                        // Unique ID (increment from last)
    title: "Your New Project",
    description: "Project description here...",
    tags: ["React", "Node.js"],   // Technologies used
    category: "Full Stack",       // Category for filtering
    accentColor: "#00d4ff",       // Card accent color (hex)
    demoLink: "https://...",      // Optional live demo URL
    codeLink: "https://github...", // Required GitHub URL
    featured: true,               // Show in "Featured" filter
  },
  // ... existing projects
];
```

**Categories available:** `all`, `featured`, `Full Stack`, `AI/ML`, `Bot`, `Systems`

**To add a new category:**
1. Add projects with the new category name
2. Update `Projects.tsx` line 9:
   ```typescript
   type FilterCategory = 'all' | 'featured' | 'Full Stack' | 'AI/ML' | 'Bot' | 'Systems' | 'YourCategory';
   ```
3. Add to categories array on line 19:
   ```typescript
   const categories: FilterCategory[] = ['all', 'featured', 'Full Stack', 'AI/ML', 'Bot', 'Systems', 'YourCategory'];
   ```

### 3. Update Skills

**File:** `app/data/portfolio.ts`

```typescript
export const skills = {
  programming: [
    { name: "JavaScript", icon: "javascript", level: 90 },  // level: 0-100
    { name: "Your Skill", icon: "star", level: 85 },
  ],
  frontend: [...],
  backend: [...],
  databases: [...],
  tools: [...],
  soft: [...],  // Soft skills (no level needed)
};
```

**To add a new skill category:**
1. Add to `skills` object in `portfolio.ts`
2. Update `Skills.tsx` to render the new category (see component structure)

### 4. Update Experience

**File:** `app/data/portfolio.ts`

```typescript
export const experience = {
  teaching: [
    {
      title: "Your Role",
      description: "Description of your experience",
      icon: "star",  // Icon name from Icon component
    },
  ],
  events: [
    { name: "Event Name", role: "Your Role" },
  ],
};
```

### 5. Update ChatBot Knowledge

**File:** `app/data/portfolio.ts`

```typescript
export const chatbotKnowledge = {
  greetings: [
    "Hi! I'm your AI assistant...",
    "Hello! How can I help you?",
  ],
  about: `Your bio here...`,
  skills: `Your skills summary...`,
  projects: `Your projects summary...`,
  contact: `Your contact info...`,
  // ... other topics
};
```

**To add new chatbot intents:**
1. Add new knowledge field above
2. Update `app/lib/chatbot/intents.ts` to detect the new intent
3. Update `app/lib/chatbot/responses.ts` to generate responses

---

## How to Add New Features

### Adding a New Section

**Example: Adding a "Blog" section**

1. **Create the section component:**
   ```bash
   touch app/components/sections/Blog.tsx
   ```

2. **Basic section template:**
   ```tsx
   'use client';
   
   import SectionTitle from '../ui/SectionTitle';
   // Import your data
   import { blogPosts } from '../../data/portfolio';
   
   export default function Blog() {
     return (
       <section id="blog" className="blog-section">
         <div className="section-container">
           <SectionTitle 
             title="Blog" 
             subtitle="My thoughts and tutorials"
             accent="#00d4ff"
           />
           {/* Your content here */}
         </div>
       </section>
     );
   }
   ```

3. **Add section data to `portfolio.ts`:**
   ```typescript
   export const blogPosts = [
     { id: 1, title: "Post Title", content: "..." },
   ];
   ```

4. **Add to navigation in `portfolio.ts`:**
   ```typescript
   export const navigation = [
     // ... existing items
     { name: "Blog", href: "#blog" },
   ];
   ```

5. **Import and add to `page.tsx`:**
   ```tsx
   import Blog from './components/sections/Blog';
   
   // In the component:
   <Blog />
   ```

6. **Add styles to `globals.css`:**
   ```css
   .blog-section {
     padding: 6rem 0;
   }
   ```

### Adding a New UI Component

**Example: Adding a "Badge" component**

1. **Create the component:**
   ```bash
   touch app/components/ui/Badge.tsx
   ```

2. **Component structure:**
   ```tsx
   interface BadgeProps {
     text: string;
     color?: string;
     variant?: 'solid' | 'outline';
   }
   
   export default function Badge({ 
     text, 
     color = '#00d4ff',
     variant = 'outline' 
   }: BadgeProps) {
     return (
       <span 
         className={`badge ${variant}`}
         style={{ 
           borderColor: color,
           backgroundColor: variant === 'solid' ? color : 'transparent',
         }}
       >
         {text}
       </span>
     );
   }
   ```

3. **Use in your sections:**
   ```tsx
   import Badge from '../ui/Badge';
   
   <Badge text="New" color="#00ff88" variant="solid" />
   ```

---

## Component Patterns

### Section Component Pattern

Every section follows this structure:

```tsx
'use client';  // Required for client-side interactivity

import SectionTitle from '../ui/SectionTitle';
import { yourData } from '../../data/portfolio';

export default function SectionName() {
  // Local state if needed
  const [state, setState] = useState(initialValue);
  
  return (
    <section id="section-id" className="section-name">
      <div className="section-container">
        <SectionTitle 
          title="Section Title" 
          subtitle="Section subtitle"
          accent="#accent-color"
        />
        
        {/* Section content */}
        
      </div>
    </section>
  );
}
```

### UI Component Pattern

Reusable UI components follow this pattern:

```tsx
'use client';

// 1. Define props interface
interface ComponentProps {
  title: string;
  description?: string;  // Optional prop
  items: Array<{ id: number; name: string }>;
  onAction?: () => void; // Callback prop
}

// 2. Destructure props with defaults
export default function ComponentName({
  title,
  description = '',  // Default value
  items,
  onAction,
}: ComponentProps) {
  // 3. Component logic
  const handleClick = () => {
    onAction?.();
  };
  
  // 4. Render
  return (
    <div className="component-class">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {items.map(item => (
        <span key={item.id}>{item.name}</span>
      ))}
    </div>
  );
}
```

### Props Passing Pattern

```
Section (Imports data)
    ↓ passes filtered/transformed data
UI Component (Receives props, renders)
    ↓ may receive callbacks
Child Components
```

**Example:**
```tsx
// Projects.tsx (Parent)
const filteredProjects = projects.filter(p => p.featured);

return (
  <div>
    {filteredProjects.map(project => (
      <ProjectCard 
        key={project.id} 
        {...project}  // Spread all project properties
      />
    ))}
  </div>
);

// ProjectCard.tsx (Child)
export default function ProjectCard({
  title,        // Destructure what you need
  description,
  tags,
  demoLink,
}: ProjectCardProps) {
  // Use props to render
}
```

---

## Styling Guide

### CSS Architecture

**Two-layer styling system:**

1. **Tailwind CSS** - Utility classes for layout and simple styles
2. **Custom CSS** - Complex animations, glass effects, component-specific styles

### CSS Variables (in `globals.css`)

```css
:root {
  --background: #0a0a0f;        /* Main background */
  --foreground: #f8fafc;        /* Main text color */
  --accent-primary: #00d4ff;    /* Cyan accent */
  --accent-secondary: #7c3aed;  /* Purple accent */
  --accent-tertiary: #00ff88;   /* Green accent */
  --glass-bg: rgba(255, 255, 255, 0.05);    /* Glass background */
  --glass-border: rgba(255, 255, 255, 0.1); /* Glass border */
}
```

### How to Modify Styles

**1. Change accent colors globally:**
```css
/* In globals.css :root */
--accent-primary: #ff6b6b;  /* Change cyan to coral */
```

**2. Modify a section's padding:**
```css
/* In globals.css */
.projects-section {
  padding: 8rem 0;  /* Increase from 6rem */
}
```

**3. Add a new animation:**
```css
/* In globals.css */
@keyframes your-animation {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.your-class {
  animation: your-animation 0.5s ease-out;
}
```

**4. Change component-specific styles:**
```css
/* In globals.css - find the component class */
.project-card {
  border-radius: 16px;  /* Change from 12px */
}
```

### Responsive Breakpoints

```css
/* Mobile First - Default styles */
.section-container {
  padding: 0 1rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .section-container {
    padding: 0 2rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .section-container {
    padding: 0 4rem;
  }
}

/* Large Desktop (1280px+) */
@media (min-width: 1280px) {
  .section-container {
    max-width: 1200px;
  }
}
```

---

## Troubleshooting

### Common Issues

**1. Changes not showing up?**
- Restart the dev server: `npm run dev`
- Clear browser cache (Ctrl+Shift+R)
- Check for TypeScript errors: `npm run type-check`

**2. New project not appearing?**
- Check that `id` is unique
- Verify `category` matches existing categories or add new one
- Ensure no syntax errors in `portfolio.ts`

**3. Navigation not scrolling to section?**
- Verify section has correct `id` attribute: `<section id="correct-id">`
- Check navigation href matches: `{ name: "Section", href: "#correct-id" }`

**4. ChatBot not responding correctly?**
- Check `chatbotKnowledge` in `portfolio.ts`
- Verify intent patterns in `app/lib/chatbot/intents.ts`
- Test with exact keywords from patterns

**5. Styles not applying?**
- Check class name spelling
- Verify styles are in `globals.css`
- Check CSS specificity (more specific selector needed?)

### Development Workflow

```bash
# 1. Start development server
npm run dev

# 2. Edit data in app/data/portfolio.ts
# Changes reflect immediately in browser

# 3. Before committing, check for errors
npm run lint
npm run type-check

# 4. Build for production
npm run build

# 5. Output is in /dist folder (static export)
```

### File to Edit for Common Tasks

| Task | File to Edit |
|------|-------------|
| Change name/title | `app/data/portfolio.ts` → `personalInfo` |
| Add/edit project | `app/data/portfolio.ts` → `projects` array |
| Update skills | `app/data/portfolio.ts` → `skills` object |
| Change colors | `app/globals.css` → `:root` variables |
| Add navigation item | `app/data/portfolio.ts` → `navigation` array |
| Update chatbot responses | `app/data/portfolio.ts` → `chatbotKnowledge` |
| Change section order | `app/page.tsx` → reorder imports/components |
| Add new section | Create `app/components/sections/NewSection.tsx` |
| Add new UI component | Create `app/components/ui/NewComponent.tsx` |

---

## Quick Reference

### Key Data Structures

```typescript
// Project structure
{
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  accentColor: string;  // Hex color
  demoLink?: string;    // Optional
  codeLink: string;     // Required
  featured?: boolean;   // Optional
}

// Skill structure
{
  name: string;
  icon: string;         // Emoji
  level: number;        // 0-100
}

// Social link structure
{
  name: string;
  url: string;
  icon: string;
}
```

### Component Import Pattern

```tsx
// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';

// UI Components
import ProjectCard from './components/ui/ProjectCard';
import SectionTitle from './components/ui/SectionTitle';

// Data
import { projects, skills } from './data/portfolio';

// Types (if needed)
import { Project, Skill } from './types';
```

### Section ID Reference

| Section | ID |
|---------|-----|
| Hero | `home` |
| About | `about` |
| Skills | `skills` |
| Projects | `projects` |
| Experience | `experience` |
| Contact | `contact` |

---

## Support

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com/docs

---

*Last updated: February 2026*
