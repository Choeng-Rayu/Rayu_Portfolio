// Chatbot Knowledge Base for Offline Mode
// This provides rule-based responses when the NVIDIA API is unavailable

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
Email: choengrayu307@gmail.com
Phone: +855 969983479
LinkedIn: linkedin.com/in/rayu-choeng-351243335
GitHub: github.com/Choeng-Rayu
Telegram: @President_Alien`,
  education: `Rayu is a Year 3 student at Cambodia Academy of Digital Technology (CADT), studying Software Engineering. Rayu has also completed Cisco IT certifications and is constantly learning new technologies.`,
  experience: `Rayu has diverse experience including:
• Math Tutor (2 years) - Teaching grades 4-8 and BacII
• Khoding-Hero Volunteer - Led team teaching 700+ students Scratch
• Technical support at major events like Digital Government Forum, Cambodia Higher Education Forum, and National Sports Events
• Volunteer Leader at "My First Stock" financial education initiative`,
  hire: `Rayu is currently open to internships and collaborations! With strong skills in full-stack development, a passion for solving real problems, and experience in teaching and teamwork, Rayu would be a valuable addition to any team. Contact via email at choengrayu307@gmail.com or connect on LinkedIn.`,
  interests: `Rayu is particularly interested in:
• Health Technology
• FinTech & Financial Literacy
• Robotics & Automation
• Smart Cities & Urban Design
• Automotive & Mechanical Systems
• Scalable Digital Solutions`,
  github: `Rayu is active on GitHub with 55+ public repositories showcasing a wide range of projects. Key highlights:
• GitHub username: Choeng-Rayu
• Profile: github.com/Choeng-Rayu
• 55+ public repos, 12 followers
• Featured projects: DasTern (Prescription OCR), Finwise2 (FinTech), DerLg-Startup (Tour platform), CoffeeHybrid-Year2, AlarmBot, DeepSeekAPITelegramBot
• Main languages: JavaScript, TypeScript, Python, Java`,
  fallback: [
    "I'm not sure I understand. You can ask me about Rayu's skills, projects, experience, education, or how to contact him.",
    "Hmm, I didn't catch that. Try asking about Rayu's background, technical skills, or portfolio projects!",
    "I can help with questions about Rayu's experience, skills, projects, or contact info. What would you like to know?",
  ],
};

// Intent patterns for matching user queries
export interface Intent {
  name: string;
  patterns: (RegExp | string)[];
  responses: string[];
}

export const intents: Intent[] = [
  // Greetings
  {
    name: 'greeting',
    patterns: [
      /^(hi|hey|hello|howdy|sup|yo|hola|bonjour|salut|good\s*(morning|afternoon|evening|day))\b/i,
      'hi', 'hey', 'hello', 'howdy', 'greetings', 'what\'s up', 'wassup',
    ],
    responses: chatbotKnowledge.greetings,
  },
  // About
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
      `Rayu Choeng is a passionate Year 3 Software Engineering student at CADT. He's from Cambodia and has been coding for 3+ years. Coming from humble beginnings, Rayu turned challenges into motivation — he's built 8+ real-world projects, taught programming to 700+ students, and volunteers at national-scale events.`,
    ],
  },
  // Skills
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
      `Rayu's tech stack: Java, C/C++, JavaScript, TypeScript, Python, React.js, Next.js, Node.js, MySQL, MongoDB, PostgreSQL, Docker, Digital Ocean, and Telegram Bot API.`,
    ],
  },
  // Projects
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
      `Key projects: DasTern (Healthcare OCR), Finwise.space (Financial tracker), RayuOS (Operating System), DerLg (Tour booking), Telegram bots for math and alarms.`,
    ],
  },
  // Contact
  {
    name: 'contact',
    patterns: [
      /how.*(contact|reach|find|talk|chat).*(rayu|him|you)/i,
      /rayu'?s (email|phone|number|contact|social)/i,
      /connect with|get in touch|social media|linkedin|facebook/i,
      'contact', 'reach out', 'how to contact', 'email', 'phone',
      'social links', 'social media', 'connect',
    ],
    responses: [chatbotKnowledge.contact],
  },
  // Education
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
    responses: [chatbotKnowledge.education],
  },
  // Experience
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
    responses: [chatbotKnowledge.experience],
  },
  // GitHub
  {
    name: 'github',
    patterns: [
      /github|git hub|open.?source|rayu'?s (repos?|repository|repositories)/i,
      /how many (repos?|project|repository)|stars|forks|contributions/i,
      'github', 'repos', 'repositories', 'open source', 'stars', 'forks',
      'contributions', 'github activity', 'coding activity',
    ],
    responses: [chatbotKnowledge.github],
  },
  // Hire
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
    responses: [chatbotKnowledge.hire],
  },
  // Interests
  {
    name: 'interests',
    patterns: [
      /interest|passion|focus|care about|field|industry|sector|domain/i,
      /what does (rayu|he) like|what is (rayu|he) into|rayu'?s passion/i,
      'interests', 'passionate', 'focus area', 'cares about', 'excited about',
    ],
    responses: [chatbotKnowledge.interests],
  },
  // Thanks
  {
    name: 'thanks',
    patterns: [
      /thank(s| you)|appreciate|helpful|great|awesome|cool|nice|wonderful|perfect/i,
      'thank', 'thanks', 'appreciate', 'helpful',
    ],
    responses: [
      "You're welcome! Feel free to ask more about Rayu!",
      "Happy to help! Is there anything else you'd like to know?",
      "Glad that helped! Don't hesitate to reach out to Rayu directly.",
    ],
  },
  // Bye
  {
    name: 'bye',
    patterns: [
      /^(bye|goodbye|see you|cya|later|take care|farewell|good night)\b/i,
      'bye', 'goodbye', 'take care', 'see you', 'good night',
    ],
    responses: [
      "Goodbye! Thanks for learning about Rayu. Feel free to come back anytime!",
      "Take care! Hope Rayu's work caught your interest.",
      "See you! If you'd like to collaborate, Rayu's email is choengrayu307@gmail.com",
    ],
  },
  // Help
  {
    name: 'help',
    patterns: [
      /^(help|menu|options|commands?|what can (you|i)|how to use|guide)\b/i,
      'help', 'menu', 'options', 'what can you do', 'commands', 'features',
    ],
    responses: [
      `I can help you learn about Rayu! Ask me about:
• His background and story
• Technical skills and expertise
• Portfolio projects
• Education and certifications
• Professional experience
• How to contact him
• GitHub repositories
• Availability for hiring`,
    ],
  },
];

/**
 * Get a random response from an array
 */
export function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Detect intent from user message
 */
export function detectIntent(message: string): Intent | null {
  const lowerMessage = message.toLowerCase().trim();

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (typeof pattern === 'string') {
        if (lowerMessage.includes(pattern.toLowerCase())) {
          return intent;
        }
      } else if (pattern instanceof RegExp) {
        if (pattern.test(lowerMessage)) {
          return intent;
        }
      }
    }
  }

  return null;
}

/**
 * Generate offline chat response based on user message
 * This is used when the NVIDIA API is unavailable
 */
export function generateOfflineResponse(message: string): { content: string } {
  const intent = detectIntent(message);

  if (intent) {
    return {
      content: getRandomResponse(intent.responses),
    };
  }

  // Fallback response
  return {
    content: getRandomResponse(chatbotKnowledge.fallback),
  };
}
