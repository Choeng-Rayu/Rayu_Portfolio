import type { Project, Experience, Skill, Education } from "./types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "dastern-healthcare",
    name: "DasTern Healthcare",
    description: "Prescription → Reminder — A comprehensive healthcare management system that bridges the gap between doctors and patients through intelligent medication reminders and health tracking.",
    shortDescription: "Prescription → Reminder healthcare management system",
    status: "active",
    category: "startup",
    techStack: ["Flutter", "FastAPI", "MySQL", "Docker", "AI"],
    gradient: "from-blue-500 to-cyan-400",
    github: "https://github.com/ChoengRayu/DasTern",
    liveDemo: "https://dastern.app",
    date: "Oct 2025 – Present",
    featured: true,
    problem: "Many patients in Cambodia struggle with medication adherence due to lack of reminders and communication gaps between healthcare providers and patients.",
    solution: "DasTern creates a seamless ecosystem where doctors can prescribe medications digitally, and patients receive timely reminders through a mobile app.",
    features: ["Digital prescription management", "AI-powered medication reminders", "Patient health tracking dashboard", "Real-time doctor-patient communication", "Multi-language support (Khmer & English)"],
    learnings: ["Full-stack mobile development with Flutter", "Building AI-powered notification systems", "Healthcare data security and compliance", "Startup product development and iteration"]
  },
  {
    id: "2",
    slug: "derlg",
    name: "DerLg",
    description: "AI Trip Planner by mood — An intelligent travel planning assistant that curates personalized trips based on your emotional state and preferences.",
    shortDescription: "AI-powered trip planner that designs journeys based on your mood",
    status: "active",
    category: "startup",
    techStack: ["Next.js", "React", "Node.js", "OpenAI", "MongoDB"],
    gradient: "from-purple-500 to-pink-400",
    github: "https://github.com/ChoengRayu/DerLg",
    liveDemo: "https://derlg.app",
    date: "May 2025 – Present",
    featured: true,
    problem: "Traditional trip planners require extensive manual input and don't adapt to the traveler's emotional needs or current mood.",
    solution: "DerLg uses AI to understand your mood and automatically suggests destinations, activities, and itineraries that match how you want to feel.",
    features: ["Mood detection and analysis", "AI-generated personalized itineraries", "Budget-aware trip planning", "Collaborative travel planning", "Local experience recommendations"],
    learnings: ["Integration with LLM APIs for natural language processing", "Building intuitive mood-tracking interfaces", "Creating adaptive recommendation algorithms", "User experience design for AI interactions"]
  },
  {
    id: "3",
    slug: "rayuos",
    name: "RayuOS",
    description: "Custom Linux Operating System — A lightweight, privacy-focused custom Linux distribution built from scratch with modern design principles.",
    shortDescription: "Custom lightweight Linux OS with privacy focus",
    status: "active",
    category: "open-source",
    techStack: ["C", "C++", "Linux Kernel", "Shell Scripting", "Qt"],
    gradient: "from-green-500 to-emerald-400",
    github: "https://github.com/ChoengRayu/RayuOS",
    date: "Jan 2025 – Present",
    featured: true,
    problem: "Existing Linux distributions often come with bloatware and lack the customization needed for a truly personal computing experience.",
    solution: "RayuOS provides a minimal, fast, and highly customizable Linux experience with privacy-first defaults and a modern desktop environment.",
    features: ["Minimal base system (~500MB)", "Privacy-first configuration", "Custom window manager", "Streamlined package management", "Modern GTK/Qt theming"],
    learnings: ["Linux kernel module development", "System-level programming in C/C++", "Building and maintaining a Linux distribution", "Performance optimization at the OS level"]
  },
  {
    id: "4",
    slug: "telegram-mathbot",
    name: "Telegram MathBot AI",
    description: "Open source math solver bot — A Telegram bot powered by AI that solves mathematical problems ranging from basic arithmetic to calculus.",
    shortDescription: "AI-powered math solving Telegram bot",
    status: "open-source",
    category: "ai",
    techStack: ["Python", "Telegram API", "OpenAI", "Docker"],
    gradient: "from-orange-500 to-amber-400",
    github: "https://github.com/ChoengRayu/MathBot",
    liveDemo: "https://t.me/RayuMathBot",
    date: "Mar 2025 – Present",
    featured: true,
    problem: "Students often need quick help with math problems but don't have immediate access to tutoring or lack confidence asking questions.",
    solution: "MathBot provides instant, step-by-step solutions to math problems via Telegram, making math help accessible 24/7.",
    features: ["Step-by-step problem solving", "Supports algebra, calculus, trigonometry", "LaTeX rendering for clear answers", "Conversation context for follow-up questions", "Learning mode with explanations"],
    learnings: ["Building Telegram bots with Python", "Mathematical expression parsing", "Integration with AI models for education", "Open source project maintenance"]
  },
  {
    id: "5",
    slug: "finwise",
    name: "FinWise",
    description: "Financial literacy competition project — A gamified financial education platform that teaches budgeting and investing through interactive challenges.",
    shortDescription: "Gamified financial literacy learning platform",
    status: "completed",
    category: "school",
    techStack: ["React", "Node.js", "MongoDB", "Chart.js"],
    gradient: "from-emerald-500 to-teal-400",
    github: "https://github.com/ChoengRayu/FinWise",
    date: "2024",
    problem: "Young people in Cambodia lack accessible financial education tools that make learning about money management engaging.",
    solution: "FinWise transforms financial literacy into an interactive game with challenges, rewards, and real-world simulation.",
    features: ["Interactive financial quizzes", "Virtual portfolio simulator", "Budget planning challenges", "Progress tracking and achievements", "Community leaderboards"],
    learnings: ["Building gamified learning experiences", "Data visualization with Chart.js", "RESTful API design", "User authentication and authorization"]
  },
  {
    id: "6",
    slug: "hybrid-coffee",
    name: "HybridCoffee",
    description: "School project management system — A web application designed for educational institutions to manage student projects, assignments, and collaborations.",
    shortDescription: "Student project and assignment management system",
    status: "completed",
    category: "school",
    techStack: ["Flutter", "Firebase", "Dart"],
    gradient: "from-amber-500 to-yellow-400",
    github: "https://github.com/ChoengRayu/HybridCoffee",
    date: "2023",
    problem: "Students and teachers struggle to track project progress, submit work, and collaborate effectively within traditional learning management systems.",
    solution: "HybridCoffee provides a streamlined platform specifically designed for project-based learning with built-in collaboration tools.",
    features: ["Project tracking dashboard", "Team collaboration spaces", "Assignment submission system", "Grading and feedback tools", "Progress analytics"],
    learnings: ["Mobile-first development with Flutter", "Firebase integration", "Real-time collaboration features", "Agile project management"]
  }
];

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Math Tutor",
    company: "Part-Time Tutor",
    location: "Kampong Speu, Cambodia",
    type: "work",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    description: "Part-time math tutor for Grade 4 and Grade 8 students, helping them understand mathematical concepts and improve their grades.",
    highlights: ["Taught algebra and geometry", "Prepared students for exams", "Developed personalized learning plans"]
  },
  {
    id: "2",
    role: "ICT & Scratch Coding Trainer",
    company: "Khoding-Hero Volunteer Program",
    location: "Samky High School, Siem Reap",
    type: "volunteer",
    startDate: "2024-08-04",
    endDate: "2024-09-04",
    description: "Team Leader - Taught ICT and Scratch coding to over 700 students in rural schools, introducing them to programming fundamentals.",
    highlights: ["Led team of volunteers", "Taught 700+ students", "Covered ICT basics and Scratch coding"]
  },
  {
    id: "3",
    role: "Crowd Team Member",
    company: "Digital Government Forum",
    location: "Phnom Penh, Cambodia",
    type: "volunteer",
    startDate: "2024-03-11",
    endDate: "2024-03-13",
    description: "Participated in crowd management and attendee coordination at Cambodia's Digital Government Forum."
  },
  {
    id: "4",
    role: "Seat Arrangement Coordinator",
    company: "Cambodia Higher Education Forum and Exhibition",
    location: "Phnom Penh, Cambodia",
    type: "volunteer",
    startDate: "2024-10-19",
    endDate: "2024-10-20",
    description: "Managed seat arrangements and logistics for the Cambodia Higher Education Forum attendees."
  },
  {
    id: "5",
    role: "Technical Team Member",
    company: "National Career and Productivity Fair 2024",
    location: "Phnom Penh, Cambodia",
    type: "volunteer",
    startDate: "2024-10-26",
    endDate: "2024-10-27",
    description: "Provided technical support and setup for the National Career and Productivity Fair event."
  },
  {
    id: "6",
    role: "Technical Team Member",
    company: "4th National Sports Games & 2nd National Disability Sports Games 2024",
    location: "Phnom Penh, Cambodia",
    type: "volunteer",
    startDate: "2024-10-30",
    endDate: "2024-11-08",
    description: "Technical volunteer supporting the national sports games events."
  },
  {
    id: "7",
    role: "Volunteer Leader",
    company: "My First Stock Program",
    location: "Phnom Penh, Cambodia",
    type: "volunteer",
    startDate: "2024-10-25",
    endDate: "2024-10-28",
    description: "Led volunteer team promoting stock market education and financial literacy among youth."
  }
];

export const skills: Skill[] = [
  // Languages
  { name: "HTML", level: 8, category: "languages" },
  { name: "CSS", level: 8, category: "languages" },
  { name: "JavaScript", level: 7, category: "languages" },
  { name: "Java", level: 7, category: "languages" },
  { name: "C++", level: 7, category: "languages" },
  { name: "C", level: 6, category: "languages" },
  { name: "Dart", level: 8, category: "languages" },
  // Frontend
  { name: "React.js", level: 8, category: "frontend" },
  { name: "Flutter", level: 9, category: "frontend" },
  { name: "HTML/CSS", level: 8, category: "frontend" },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "Hun Sen Borey 100 Knong High School",
    degree: "Baccalauréat (Bac II)",
    field: "High School Diploma",
    startDate: "2023-11-24",
    endDate: "2023-11-24",
    location: "Kampong Speu Province, Cambodia",
    description: "Graduated with grade B. Focus on science and mathematics."
  },
  {
    id: "2",
    institution: "Cambodia Academy of Digital Technology (CADT)",
    degree: "Bachelor's in Computer Science",
    field: "Software Engineering",
    startDate: "2024-01-01",
    endDate: "Present",
    location: "Phnom Penh, Cambodia",
    description: "Year 3 student. Focus areas: Java, C++, C, React.js, HTML, CSS. Learning full-stack development and software engineering principles."
  },
  {
    id: "3",
    institution: "Joint ALCPP Program - The Capacity Specialists (USAID)",
    degree: "Soft Skills & Professional Development",
    field: "Professional Development",
    startDate: "2024-11-01",
    endDate: "2025-05-31",
    location: "Phnom Penh, Cambodia",
    description: "5-month program: 3 months of classes + 2 months internship. Focused on leadership, communication, and professional growth."
  },
  {
    id: "4",
    institution: "Paññāsāstra International School – IFL",
    degree: "Diploma in General English – Level 12",
    field: "English Language",
    startDate: "2024-01-01",
    endDate: "Present",
    location: "Phnom Penh, Cambodia",
    description: "Currently studying Level 12. Certificate pending."
  },
  {
    id: "5",
    institution: "NICC",
    degree: "12th Startup Camp: TechTourism Ignite",
    field: "Entrepreneurship",
    startDate: "2024-09-14",
    endDate: "2024-09-14",
    location: "Phnom Penh, Cambodia",
    description: "Participated in startup camping program focused on tech tourism innovation."
  },
  {
    id: "6",
    institution: "CISCO Networking Academy",
    degree: "IT Essentials: PC Hardware and Software",
    field: "IT Fundamentals",
    startDate: "2024-05-14",
    endDate: "2024-05-14",
    location: "Online",
    description: "Completed IT Essentials certification covering PC hardware and software fundamentals."
  }
];

export const personalInfo = {
  name: "Choeng Rayu",
  title: "Software Engineer Student",
  origin: "Kampong Speu Province, Cambodia",
  tagline: "Passionate about technology and determined to create impact through code.",
  location: "Phnom Penh, Cambodia",
  birthDate: "March 27, 2005",
  email: "choengrayu307@gmail.com",
  phone: "+855 96 998 3479",
  github: "https://github.com/ChoengRayu",
  linkedin: "https://www.linkedin.com/in/rayu-choeng-351243335/",
  telegram: "@President_Alien",
  website: "rayu-choeng.tech",
  cvLink: "/Choeng_Rayu_CV.pdf",
  bio: "Born into a poor family, motivated to study hard to change life and support family. Passionate about science and digital technology. Currently studying Computer Science at CADT while building real-world projects.",
  stats: {
    yearsOfExperience: "2+",
    projectsShipped: "6+",
    currentYear: "Year 3"
  },
  availability: "Open to Opportunities"
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/ChoengRayu", icon: "Github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rayu-choeng-351243335/", icon: "Linkedin" },
  { name: "Telegram", url: "https://t.me/President_Alien", icon: "Send" },
  { name: "Email", url: "mailto:choengrayu307@gmail.com", icon: "Mail" },
  { name: "CV", url: "/Choeng_Rayu_CV.pdf", icon: "FileText" }
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

// Chatbot Knowledge Base
export const chatbotKnowledge = {
  greeting: "Hi there! 👋 I'm Rayu's AI assistant. How can I help you today?",
  about: `Rayu is a ${personalInfo.title} from ${personalInfo.origin}. 

Born into a humble background, Rayu has been driven by a passion for technology and a determination to create positive change. Currently studying Computer Science at CADT in Phnom Penh, Rayu is building real-world projects while developing skills in Flutter, React, and various programming languages.

Rayu's story is one of perseverance and dedication to learning.`,
  skills: `Rayu's technical skills include:

**Languages:** HTML, CSS, JavaScript, Java, C++, C, Dart
**Frameworks:** Flutter, React.js
**Tools:** Git, Docker, Firebase

Rayu is particularly strong in Flutter development and is continuously learning new technologies.`,
  contact: `You can reach Rayu through:

📧 Email: ${personalInfo.email}
📱 Telegram: ${personalInfo.telegram}
💼 LinkedIn: ${personalInfo.linkedin}
🐙 GitHub: ${personalInfo.github}`,
  hire: `Rayu is ${personalInfo.availability}! 

Currently open to:
- Internship opportunities
- Freelance projects
- Collaborative work
- Entry-level positions

Feel free to reach out!`,
  interests: "Rayu is passionate about mobile development (especially Flutter), web technologies, and creating technology solutions that can make a positive impact in the community.",
  education: `Rayu's educational background:

🎓 Hun Sen Borey 100 Knong High School - Baccalauréat (Bac II), Grade B (2023)

🎓 Cambodia Academy of Digital Technology (CADT) - Bachelor's in Computer Science, Year 3 (2024-Present)

📜 Joint ALCPP Program (USAID) - Soft Skills & Professional Development (2024-2025)

🏆 CISCO IT Essentials Certification (2024)

🌟 12th Startup Camp: TechTourism Ignite (2024)`,
  experience: `Rayu's experience includes:

💼 Math Tutor - Part-time tutoring for Grade 4 & 8 students (2024-2025)

🏅 Team Leader at Khoding-Hero Volunteer Program - Taught ICT & Scratch to 700+ students (Aug-Sep 2024)

🎪 Various volunteer roles at Digital Government Forum, Higher Education Forum, National Sports Games, and more.`
};
