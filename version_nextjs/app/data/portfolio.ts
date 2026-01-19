// Portfolio Data for Rayu Choeng

export const personalInfo = {
  name: "Rayu Choeng",
  title: "Software Engineering Student",
  subtitle: "Full Stack Developer | Tech Builder",
  location: "Cambodia 🇰🇭",
  university: "CADT (Cambodia Academy of Digital Technology)",
  year: "Year 3",
  email: "choengrayu307@gmail.com",
  phone: "+855 969983479",
  mission: "Turning real-life problems into practical digital solutions",
  philosophy: "Consistency beats talent. Impact beats theory.",
  status: "Open to Internships & Collaborations",
  cvUrl: "/Choeng_Rayu_CV.pdf",
};

export const aboutMe = {
  headline: "Hands-on software engineering student driven by curiosity, discipline, and purpose.",
  description: `Coming from a financially challenged family, I see education and technology as tools for change — not just for myself, but for my community. I don't just learn technology — I apply it.`,
  highlights: [
    { icon: "🔍", text: "Curious about how systems work and how to improve them" },
    { icon: "🛠️", text: "Love building real, usable software" },
    { icon: "🌍", text: "Focused on local impact with scalable ideas" },
    { icon: "🤝", text: "Active in volunteering, events, and youth development" },
  ],
  stats: [
    { number: "3+", label: "Years Coding" },
    { number: "8+", label: "Projects Built" },
    { number: "700+", label: "Students Taught" },
    { number: "2+", label: "Years Teaching" },
  ],
};

export const coreInterests = [
  { icon: "💊", title: "Health Technology" },
  { icon: "💰", title: "FinTech & Financial Literacy" },
  { icon: "🤖", title: "Robotics & Automation" },
  { icon: "🏙️", title: "Smart Cities & Urban Design" },
  { icon: "🚗", title: "Automotive Systems" },
  { icon: "🌐", title: "Scalable Digital Solutions" },
];

export const skills = {
  programming: [
    { name: "Java", icon: "☕", level: 85 },
    { name: "C++", icon: "⚙️", level: 80 },
    { name: "C", icon: "🔧", level: 75 },
    { name: "JavaScript", icon: "📜", level: 90 },
    { name: "TypeScript", icon: "🔷", level: 80 },
    { name: "Python", icon: "🐍", level: 75 },
  ],
  frontend: [
    { name: "React.js", icon: "⚛️", level: 88 },
    { name: "Next.js", icon: "▲", level: 80 },
    { name: "HTML5", icon: "🌐", level: 95 },
    { name: "CSS3", icon: "🎨", level: 90 },
    { name: "Tailwind CSS", icon: "💨", level: 85 },
    { name: "Flutter", icon: "📱", level: 70 },
  ],
  backend: [
    { name: "Node.js", icon: "🟢", level: 85 },
    { name: "Express.js", icon: "🚀", level: 80 },
    { name: "REST APIs", icon: "🔌", level: 88 },
  ],
  databases: [
    { name: "MySQL", icon: "🐬", level: 85 },
    { name: "MongoDB", icon: "🍃", level: 80 },
    { name: "PostgreSQL", icon: "🐘", level: 70 },
  ],
  tools: [
    { name: "Git/GitHub", icon: "🔀", level: 90 },
    { name: "Telegram Bot API", icon: "🤖", level: 90 },
    { name: "Docker", icon: "🐳", level: 65 },
    { name: "Digital Ocean", icon: "🌊", level: 75 },
    { name: "Nginx", icon: "🔒", level: 70 },
  ],
  soft: [
    { name: "Teaching", icon: "🧑‍🏫" },
    { name: "Problem Solving", icon: "🧩" },
    { name: "Communication", icon: "💬" },
    { name: "Team Collaboration", icon: "👥" },
    { name: "System Design", icon: "📐" },
    { name: "Critical Thinking", icon: "🤔" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "DasTern – Smart Prescription OCR",
    description: "Healthcare-focused OCR system that scans medical prescriptions in Khmer, English, and French. Extracts structured medication data and creates automated medication reminders.",
    tags: ["Python", "OpenCV", "Tesseract OCR", "AI", "Healthcare Tech"],
    accentColor: "#5e17eb",
    demoLink: "",
    codeLink: "https://github.com/Choeng-Rayu/DasTern",
    featured: true,
    category: "AI/ML",
  },
  {
    id: 2,
    title: "Finwise.space",
    description: "Smart financial management platform for tracking income, expenses, and savings. Features multi-bank data import, analytics, and AI-powered financial guidance.",
    tags: ["React", "Node.js", "MySQL", "Telegram Bot", "VPS/Nginx"],
    accentColor: "#00b894",
    demoLink: "https://finwise.space",
    codeLink: "https://github.com/Choeng-Rayu/Finwise2.git",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 3,
    title: "RayuOS (Mini Operating System)",
    description: "Low-level operating system project to understand OS internals including memory handling, process flow, and system-level programming.",
    tags: ["C", "OS Fundamentals", "Low-Level Programming"],
    accentColor: "#00c2a8",
    demoLink: "",
    codeLink: "https://github.com/Choeng-Rayu/RayuOS",
    featured: true,
    category: "Systems",
  },
  {
    id: 4,
    title: "Cyber Security Project",
    description: "Python-based cybersecurity project focused on understanding security threats, vulnerability analysis, and defensive programming techniques.",
    tags: ["Python", "Cyber Security", "Security Analysis"],
    accentColor: "#ff3b3b",
    demoLink: "",
    codeLink: "https://github.com/Choeng-Rayu/cyber_project_T1Y3",
    featured: false,
    category: "Security",
  },
  {
    id: 5,
    title: "DerLg – Tour Booking Platform",
    description: "Startup project digitizing tour and trip bookings in Cambodia. Connects travelers with local services through an easy booking system.",
    tags: ["TypeScript", "Node.js", "Startup", "Tourism Tech"],
    accentColor: "#0095ff",
    demoLink: "",
    codeLink: "https://github.com/Choeng-Rayu/DerLg-Startup",
    featured: false,
    category: "Startup",
  },
  {
    id: 6,
    title: "Math Telegram Bot",
    description: "Free AI assistant on Telegram helping students learn math, especially function solving. Features PDF reports and study reminders.",
    tags: ["Python", "DeepSeek API", "Telegram Bot", "Webhook"],
    accentColor: "#7700ff",
    demoLink: "https://t.me/rayumathbot",
    codeLink: "https://github.com/Choeng-Rayu/MathBot_Python.git",
    featured: false,
    category: "Bot",
  },
  {
    id: 7,
    title: "Alarm Bot",
    description: "Telegram bot for setting alarms and notifications with database integration.",
    tags: ["Node.js", "Telegram API", "MongoDB", "Webhook"],
    accentColor: "#ff9500",
    demoLink: "https://t.me/rayualarmbot",
    codeLink: "https://github.com/Choeng-Rayu/AlarmBot.git",
    featured: false,
    category: "Bot",
  },
  {
    id: 8,
    title: "Coffee Ordering System",
    description: "Digital coffee ordering platform with menu browsing, order placement, and transaction management.",
    tags: ["JavaScript", "Node.js", "MongoDB"],
    accentColor: "#6f4e37",
    demoLink: "https://hybridcoffee.me/",
    codeLink: "https://github.com/Choeng-Rayu/CoffeeHybrid-Year2",
    featured: false,
    category: "Full Stack",
  },
];

export const experience = {
  teaching: [
    {
      title: "Math Tutor",
      description: "2 years experience teaching math (Grades 4-8 and Grade 12 for BacII) in both Khmer and English",
      icon: "📚",
    },
    {
      title: "Khoding-Hero Volunteer",
      description: "Led 3-member team and taught Scratch programming to ~700 students",
      icon: "💻",
    },
  ],
  events: [
    { name: "Digital Government Forum", role: "Technical & Logistics" },
    { name: "Cambodia Higher Education Forum", role: "Technical & Logistics" },
    { name: "National Career & Productivity Fair", role: "Technical & Logistics" },
    { name: "National & Para-National Sports Events", role: "Technical Support" },
    { name: "My First Stock - Financial Education", role: "Volunteer Leader" },
  ],
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/Choeng-Rayu", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rayu-choeng-351243335/", icon: "linkedin" },
  { name: "Facebook", url: "https://www.facebook.com/choeng.rayu.5", icon: "facebook" },
  { name: "Telegram", url: "https://t.me/President_Alien", icon: "telegram" },
  { name: "Email", url: "mailto:choengrayu307@gmail.com", icon: "email" },
];

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

// Chatbot knowledge base
export const chatbotKnowledge = {
  greetings: [
    "Hi! I'm Rayu's AI assistant. How can I help you learn more about Rayu?",
    "Hello! Want to know about Rayu's skills, projects, or experience? Just ask!",
    "Hey there! I'm here to tell you all about Rayu Choeng. What would you like to know?",
  ],
  about: `Rayu Choeng is a Year 3 Software Engineering student at CADT (Cambodia Academy of Digital Technology). Coming from a financially challenged family, Rayu sees education and technology as tools for change. With 3+ years of coding experience and having taught 700+ students through volunteering, Rayu is passionate about building practical digital solutions that solve real-world problems.`,
  skills: `Rayu is proficient in multiple programming languages including Java, C++, C, JavaScript, TypeScript, and Python. For web development, Rayu uses React.js, Next.js, Node.js, and has experience with databases like MySQL, MongoDB, and PostgreSQL. Rayu also builds Telegram bots and has experience with cloud deployment using Digital Ocean and Nginx.`,
  projects: `Rayu has built 8+ projects including:
  • DasTern - Smart Prescription OCR for healthcare
  • Finwise.space - Financial tracking platform
  • RayuOS - Mini operating system in C
  • DerLg - Tour booking startup
  • Telegram bots for math tutoring and alarms
  • Coffee ordering system`,
  contact: `You can reach Rayu at:
  📧 Email: choengrayu307@gmail.com
  📱 Phone: +855 969983479
  💼 LinkedIn: linkedin.com/in/rayu-choeng-351243335
  🐙 GitHub: github.com/Choeng-Rayu
  ✈️ Telegram: @President_Alien`,
  education: `Rayu is a Year 3 student at Cambodia Academy of Digital Technology (CADT), studying Software Engineering. Rayu has also completed Cisco IT certifications and is constantly learning new technologies.`,
  experience: `Rayu has diverse experience including:
  • Math Tutor (2 years) - Teaching grades 4-8 and BacII
  • Khoding-Hero Volunteer - Led team teaching 700+ students Scratch
  • Technical support at major events like Digital Government Forum, Cambodia Higher Education Forum, and National Sports Events
  • Volunteer Leader at "My First Stock" financial education initiative`,
  cv: `You can download Rayu's CV to learn more about qualifications and experience. Would you like the download link?`,
  hire: `Rayu is currently open to internships and collaborations! With strong skills in full-stack development, a passion for solving real problems, and experience in teaching and teamwork, Rayu would be a valuable addition to any team. Contact via email at choengrayu307@gmail.com or connect on LinkedIn.`,
  interests: `Rayu is particularly interested in:
  💊 Health Technology
  💰 FinTech & Financial Literacy
  🤖 Robotics & Automation
  🏙️ Smart Cities & Urban Design
  🚗 Automotive & Mechanical Systems
  🌐 Scalable Digital Solutions`,
};
