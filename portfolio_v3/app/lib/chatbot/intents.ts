// Chatbot Intents Configuration — broad NLP-style pattern matching

import { Intent } from './types';
import { chatbotKnowledge, personalInfo } from '../../data/portfolio';

export const intents: Intent[] = [
  // ── GREETINGS ──────────────────────────────────────────────────────────────
  {
    name: 'greeting',
    patterns: [
      /^(hi|hey|hello|howdy|sup|yo|hola|bonjour|salut|good\s*(morning|afternoon|evening|day))\b/i,
      'hi', 'hey', 'hello', 'howdy', 'greetings', 'what\'s up', 'wassup',
    ],
    responses: [
      ...chatbotKnowledge.greetings,
      "Hey! I'm Rayu's AI assistant. I know everything about his background, skills, and projects. What would you like to know?",
    ],
  },

  // ── ABOUT / WHO IS RAYU ────────────────────────────────────────────────────
  {
    name: 'about',
    patterns: [
      /who is rayu|tell me about (rayu|himself|him)|introduce (rayu|yourself)|rayu'?s background|rayu'?s story/i,
      /who are you|what are you|about you/i,
      'about rayu', 'about him', 'who is he', 'background', 'biography', 'story',
      'introduce', 'tell me about', 'who is rayu', 'about himself',
    ],
    responses: [
      chatbotKnowledge.about,
      `Rayu Choeng is a passionate Year 3 Software Engineering student at CADT (Cambodia Academy of Digital Technology). He's from Cambodia and has been coding for 3+ years.

Coming from humble beginnings, Rayu turned challenges into motivation — he's built 8+ real-world projects, taught programming to 700+ students, and volunteers at national-scale events.

His motto: "Consistency beats talent. Impact beats theory."`,
    ],
  },

  // ── AGE / YEAR / PERSONAL ─────────────────────────────────────────────────
  {
    name: 'personal',
    patterns: [
      /how old|rayu'?s age|when.*(born|birthday)|what year/i,
      /rayu'?s full name|full name|real name/i,
      /what.*study|what.*major|what.*course/i,
      'age', 'year', 'personal', 'name', 'full name',
    ],
    responses: [
      `Here are some personal details about Rayu:

**Name:** Choeng Rayu
**University:** Cambodia Academy of Digital Technology (CADT)
**Year:** Year 3 — Software Engineering
**Location:** Cambodia 🇰🇭
**Status:** Open to Internships & Collaborations
**Mission:** Turning real-life problems into practical digital solutions`,
    ],
  },

  // ── SKILLS ────────────────────────────────────────────────────────────────
  {
    name: 'skills',
    patterns: [
      /what.*(skill|tech|can (you|rayu)|know|do)|rayu'?s (skill|tech|stack|expertise|ability)/i,
      /programming language|framework|library|tool|technology/i,
      /can (he|rayu) (code|program|build|develop)/i,
      'skills', 'tech stack', 'technologies', 'expertise', 'proficient', 'capable',
      'abilities', 'what can he do', 'what does he know', 'coding language',
    ],
    responses: [
      chatbotKnowledge.skills,
      `Rayu's tech stack covers the full development lifecycle:

🖥️ **Languages:** Java, C/C++, JavaScript, TypeScript, Python
⚛️ **Frontend:** React.js, Next.js, HTML5, CSS3, Tailwind CSS, Flutter
🔧 **Backend:** Node.js, Express.js, REST APIs
🗄️ **Databases:** MySQL, MongoDB, PostgreSQL
☁️ **DevOps & Tools:** Git, Docker, Digital Ocean, Nginx, Telegram Bot API

He's particularly strong in full-stack JavaScript/TypeScript development and automation bots.`,
    ],
  },

  // ── PROJECTS (GENERAL) ───────────────────────────────────────────────────
  {
    name: 'projects',
    patterns: [
      /show.*(project|work|portfolio|build)|what.*(built|created|made|developed)/i,
      /rayu'?s (project|work|portfolio|app|website)/i,
      /list.*(project|app)|any.*(project|app|example)/i,
      'projects', 'portfolio', 'work', 'applications', 'built', 'created',
      'show me', 'examples', 'what has he built', 'showcase',
    ],
    responses: [
      chatbotKnowledge.projects,
      `Rayu has built 8+ projects spanning multiple domains:

**Healthcare:** DasTern — prescription OCR system in Khmer/English/French
**FinTech:** Finwise.space — multi-bank financial tracker with AI guidance
**Systems:** RayuOS — mini OS from scratch in C
**Startup:** DerLg — tour booking platform for Cambodia
**Bots:** Math Telegram Bot (AI-powered), Alarm Bot
**Security:** Cyber Security Project in Python
**E-Commerce:** Coffee Ordering System

Most are open-source on GitHub! Ask about any specific project for details.`,
    ],
  },

  // ── CONTACT (INFO) ───────────────────────────────────────────────────────
  {
    name: 'contact',
    patterns: [
      /how.*(contact|reach|find|talk|chat).*(rayu|him|you)/i,
      /rayu'?s (email|phone|number|contact|social)/i,
      /connect with|get in touch|social media|linkedin|facebook/i,
      'contact', 'reach out', 'how to contact', 'email', 'phone',
      'social links', 'social media', 'connect',
    ],
    responses: [
      chatbotKnowledge.contact,
      `You can connect with Rayu through several channels:

📧 **Email:** choengrayu307@gmail.com
📱 **Phone:** +855 969983479
💼 **LinkedIn:** linkedin.com/in/rayu-choeng-351243335
🐙 **GitHub:** github.com/Choeng-Rayu
📘 **Facebook:** facebook.com/choeng.rayu.5
✈️ **Telegram:** @President_Alien

Or type "send message" to contact Rayu directly through this chat!`,
    ],
    actions: [
      { type: 'link', label: 'LinkedIn', url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', icon: 'linkedin' },
      { type: 'link', label: 'GitHub', url: 'https://github.com/Choeng-Rayu', icon: 'github' },
      { type: 'contact-form', label: 'Send Message Here', url: '#contact-form', icon: 'email' },
    ],
  },

  // ── SEND MESSAGE (TRIGGER CONTACT FORM) ─────────────────────────────────
  {
    name: 'send_message',
    patterns: [
      /send.*(message|email|mail|note)|write.*(to rayu|to him|email)/i,
      /i want to.*(contact|reach|message|email|talk)/i,
      /can i.*(message|email|contact|write)/i,
      /contact form|drop a message|leave a message|get in touch here/i,
      'send message', 'contact here', 'message rayu', 'email rayu',
      'write to rayu', 'drop message',
    ],
    responses: [
      "Of course! Let me collect your details so I can forward your message to Rayu. Ready? Let's start — what's your email address?",
      "Sure! I'll help you reach out to Rayu directly. First, what's your email address so he can reply to you?",
    ],
    actions: [
      { type: 'contact-form', label: 'Start Contact Form', url: '#contact-form', icon: 'email' },
    ],
  },

  // ── EDUCATION ────────────────────────────────────────────────────────────
  {
    name: 'education',
    patterns: [
      /where.*(study|school|college|university)|what.*(degree|university|school|major)/i,
      /cadt|cambodia academy|digital technology/i,
      /rayu'?s (education|academic|degree|qualification)/i,
      /cisco|certification|certificate/i,
      'education', 'school', 'university', 'study', 'degree', 'cadt',
      'academic', 'studied', 'where did he study',
    ],
    responses: [
      chatbotKnowledge.education,
      `Rayu is currently a Year 3 student at Cambodia Academy of Digital Technology (CADT) studying Software Engineering.

**Coursework includes:** Algorithms, Data Structures, OS, Networks, Databases, Software Engineering practices

He has also completed Cisco IT Essentials certification and is always self-learning new tech through online platforms.`,
    ],
  },

  // ── EXPERIENCE ───────────────────────────────────────────────────────────
  {
    name: 'experience',
    patterns: [
      /rayu'?s (experience|work|career|job history|background)/i,
      /what.*(experience|work.?history|worked|career|volunteer)/i,
      /has he.*(worked|taught|volunteered)/i,
      /teaching|tutor|volunteer|event|khoding/i,
      'experience', 'career', 'work history', 'volunteering', 'teaching',
      'what has he done', 'work experience',
    ],
    responses: [
      chatbotKnowledge.experience,
      `Rayu has diverse real-world experience beyond just coding:

👨‍🏫 **Math Tutor (2 years)** — Taught grades 4–8 & BacII prep in Khmer and English

💻 **Khoding-Hero Volunteer** — Led a 3-member team teaching Scratch to ~700 students

🎪 **National Events (Technical Support):**
  • Digital Government Forum
  • Cambodia Higher Education Forum
  • National Career & Productivity Fair
  • National & Para-National Sports Events

💰 **Volunteer Leader** — "My First Stock" financial literacy initiative

This combination of teaching + tech + events makes him a well-rounded team player.`,
    ],
  },

  // ── CV / RESUME ──────────────────────────────────────────────────────────
  {
    name: 'cv',
    patterns: [
      /download.*(cv|resume)|get.*(cv|resume)|(cv|resume).*(download|link|pdf)/i,
      /rayu'?s (cv|resume)|share.*(cv|resume)/i,
      'cv', 'resume', 'curriculum vitae', 'download cv', 'get cv', 'pdf',
      'qualification document', 'rayu cv',
    ],
    responses: [
      "Here's Rayu's CV! Click the button below to download the PDF — it covers education, skills, projects, and experience in full detail.",
      "You can download Rayu's CV as a PDF below. It's the most complete overview of his qualifications and work.",
    ],
    actions: [
      { type: 'download', label: '⬇ Download CV (PDF)', url: '/Choeng_Rayu_CV.pdf', icon: 'document' },
      { type: 'link', label: 'View LinkedIn', url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', icon: 'linkedin' },
    ],
  },

  // ── HIRE / INTERNSHIP ────────────────────────────────────────────────────
  {
    name: 'hire',
    patterns: [
      /hire|hiring|internship|job offer|position|employment|recruit/i,
      /is (rayu|he) available|open to work|looking for (job|work|opportunity)/i,
      /freelance|collaboration|work together|work with (rayu|him)/i,
      /can i hire|want to hire|interested in hiring/i,
      'hire', 'hiring', 'internship', 'available', 'opportunity', 'collaborate',
      'work with', 'job', 'freelance', 'open to work',
    ],
    responses: [
      chatbotKnowledge.hire,
      `Yes! Rayu is actively looking for opportunities!

✅ **Open to:** Internships, Part-time, Remote collaborations, Freelance

**Why hire Rayu?**
🔹 3+ years hands-on coding across full-stack
🔹 8+ shipped projects solving real problems
🔹 Strong in JS/TS, Python, Java, React, Node.js
🔹 Experience in teaching = excellent communicator
🔹 Based in Cambodia, available for remote work

Best way to reach him: choengrayu307@gmail.com`,
    ],
    actions: [
      { type: 'download', label: 'Download CV', url: '/Choeng_Rayu_CV.pdf', icon: 'document' },
      { type: 'contact-form', label: 'Send Opportunity', url: '#contact-form', icon: 'email' },
    ],
  },

  // ── GITHUB (LIVE) ────────────────────────────────────────────────────────
  {
    name: 'github',
    patterns: [
      /github|git hub|open.?source|rayu'?s (repos?|repository|repositories)/i,
      /how many (repos?|project|repository)|stars|forks|contributions/i,
      /rayu'?s coding activity|latest (project|repo|commit)|recent work on github/i,
      'github', 'repos', 'repositories', 'open source', 'stars', 'forks',
      'contributions', 'github activity', 'coding activity',
    ],
    responses: [
      "Let me check Rayu's live GitHub activity for you...",
    ],
    async: true,
  },

  // ── INTERESTS ────────────────────────────────────────────────────────────
  {
    name: 'interests',
    patterns: [
      /interest|passion|focus|care about|field|industry|sector|domain/i,
      /what does (rayu|he) like|what is (rayu|he) into|rayu'?s passion/i,
      'interests', 'passionate', 'focus area', 'cares about', 'excited about',
    ],
    responses: [
      chatbotKnowledge.interests,
      `Rayu's passion points to impact-driven technology:

❤️‍🩹 **Health Technology** — using AI/sensors to improve healthcare access
💸 **FinTech & Financial Literacy** — making finance accessible to all
🤖 **Robotics & Automation** — smart systems that help people
🏙️ **Smart Cities** — data-driven urban planning
🚗 **Automotive Systems** — software for vehicles and transportation
📈 **Scalable Digital Solutions** — building things that grow beyond one person`,
    ],
  },

  // ── LOCATION ─────────────────────────────────────────────────────────────
  {
    name: 'location',
    patterns: [
      /where.*(rayu|he|you).*(from|based|live|located)/i,
      /which country|cambodia|phnom penh/i,
      'location', 'where from', 'country', 'based in', 'live',
    ],
    responses: [
      `Rayu is based in **Cambodia** 🇰🇭

He's currently studying at CADT (Cambodia Academy of Digital Technology) in Phnom Penh.

He's open to **remote opportunities worldwide** — timezone UTC+7.`,
    ],
  },

  // ── PHILOSOPHY / MINDSET ─────────────────────────────────────────────────
  {
    name: 'philosophy',
    patterns: [
      /philosophy|mindset|belief|values|motto|mantra|life goal|mission/i,
      /what drive|what motivate|why (code|build|develop)/i,
      'philosophy', 'mindset', 'motivation', 'driven by', 'mission',
    ],
    responses: [
      `Rayu lives by two principles:

💡 **"Consistency beats talent."** — He believes showing up every day and building habits outperforms raw talent.

🎯 **"Impact beats theory."** — Building real things that help real people matters more than just knowing the concepts.

Coming from a financially challenged family, he sees education and technology as tools for change — not just for himself, but for his community.`,
    ],
  },

  // ── LANGUAGES (SPOKEN) ────────────────────────────────────────────────────
  {
    name: 'languages_spoken',
    patterns: [
      /speak.*(language|khmer|english)|language.*(speak|know)/i,
      /know khmer|speaks english|bilingual/i,
      'spoken language', 'khmer', 'language spoken',
    ],
    responses: [
      `Rayu is bilingual:

🇰🇭 **Khmer** — Native language
🇬🇧 **English** — Professional working proficiency (used daily at CADT, in teaching, and in all projects)

He taught math in both Khmer and English to students of all ages!`,
    ],
  },

  // ── SALARY / RATE ─────────────────────────────────────────────────────────
  {
    name: 'salary',
    patterns: [
      /salary|rate|how much|payment|pay|compensation|cost/i,
      'salary', 'rate', 'how much', 'pay',
    ],
    responses: [
      `For salary and rate details, it's best to discuss directly with Rayu.

You can reach him at: **choengrayu307@gmail.com**

Or use the contact form in this chat — just type "send message"!`,
    ],
    actions: [
      { type: 'contact-form', label: 'Discuss via Chat', url: '#contact-form', icon: 'email' },
    ],
  },

  // ── HELP / MENU ──────────────────────────────────────────────────────────
  {
    name: 'help',
    patterns: [
      /^(help|menu|options|commands?|what can (you|i)|how to use|guide)\b/i,
      'help', 'menu', 'options', 'what can you do', 'commands', 'features',
    ],
    responses: [
      `I'm Rayu's AI assistant — here's what I can help with:

👤 **About** — Who is Rayu? His story and background
🛠️ **Skills** — Tech stack, languages, frameworks
📁 **Projects** — Portfolio, demos, code links
🎓 **Education** — CADT, certifications
💼 **Experience** — Teaching, volunteering, events
🐙 **GitHub** — Live repos and stats from GitHub
📄 **CV** — Download full resume PDF
💌 **Send Message** — Contact Rayu directly through this chat
💡 **Interests** — His passion areas and future goals
🤝 **Hire** — Availability for internships / collaborations

Just ask naturally — I understand full sentences!`,
    ],
  },

  // ── THANKS ───────────────────────────────────────────────────────────────
  {
    name: 'thanks',
    patterns: [
      /thank(s| you)|appreciate|helpful|great|awesome|cool|nice|wonderful|perfect/i,
      'thank', 'thanks', 'appreciate', 'helpful',
    ],
    responses: [
      "You're welcome! Feel free to ask more — or type 'send message' if you'd like to reach Rayu directly! 😊",
      "Happy to help! Is there anything else you'd like to know about Rayu?",
      "Glad that helped! Don't hesitate to contact Rayu — he's always open to interesting conversations!",
    ],
  },

  // ── BYE ──────────────────────────────────────────────────────────────────
  {
    name: 'bye',
    patterns: [
      /^(bye|goodbye|see you|cya|later|take care|farewell|good night)\b/i,
      'bye', 'goodbye', 'take care', 'see you', 'good night',
    ],
    responses: [
      "Goodbye! Thanks for learning about Rayu. Feel free to come back anytime! 👋",
      "Take care! Hope Rayu's work caught your interest. Don't hesitate to reach out!",
      "See you! If you'd like to collaborate with Rayu, his email is choengrayu307@gmail.com 🙌",
    ],
  },

  // ── WHAT IS (general curiosity) ──────────────────────────────────────────
  {
    name: 'cadt',
    patterns: [
      /what is cadt|what does cadt mean|cadt university/i,
      'cadt', 'what is cadt',
    ],
    responses: [
      `**CADT** stands for **Cambodia Academy of Digital Technology**.

It's Cambodia's premier technology-focused university, established with government support to develop the country's digital talent.

Rayu is in Year 3 studying Software Engineering there — it's a highly selective and rigorous program! 🎓`,
    ],
  },
];

// Specific project patterns for detailed project queries
export const projectPatterns: { pattern: RegExp; projectTitle: string }[] = [
  { pattern: /dastern|ocr|prescription|healthcare|medical/i, projectTitle: 'DasTern' },
  { pattern: /finwise|financial|finance|money|budget|tracking/i, projectTitle: 'Finwise' },
  { pattern: /rayuos|operating system|\bos\b|low.?level/i, projectTitle: 'RayuOS' },
  { pattern: /cyber|security|hack/i, projectTitle: 'Cyber' },
  { pattern: /derlg|tour|booking|travel/i, projectTitle: 'DerLg' },
  { pattern: /math.?bot|function.?solv|telegram.?math/i, projectTitle: 'Math' },
  { pattern: /alarm.?bot|reminder|schedule/i, projectTitle: 'Alarm' },
  { pattern: /coffee|hybrid.?coffee|cafe|order/i, projectTitle: 'Coffee' },
];
