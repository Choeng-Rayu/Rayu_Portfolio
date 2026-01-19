// Chatbot Agent - Intelligent assistant for Rayu's portfolio
// This agent uses keyword matching and intent detection to provide helpful responses

import { chatbotKnowledge, personalInfo, projects, skills, socialLinks, experience } from './portfolio';

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

interface Intent {
  name: string;
  keywords: string[];
  responses: string[];
  actions?: ChatAction[];
}

// Define intents with keywords and responses
const intents: Intent[] = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo'],
    responses: chatbotKnowledge.greetings,
  },
  {
    name: 'about',
    keywords: ['about', 'who', 'tell me about', 'introduce', 'rayu', 'background', 'story', 'yourself', 'him', 'who is'],
    responses: [chatbotKnowledge.about],
  },
  {
    name: 'skills',
    keywords: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool', 'stack', 'know', 'capable', 'can do', 'abilities', 'expertise', 'proficient'],
    responses: [chatbotKnowledge.skills],
  },
  {
    name: 'projects',
    keywords: ['project', 'work', 'portfolio', 'built', 'created', 'developed', 'made', 'application', 'app', 'website', 'showcase', 'examples'],
    responses: [chatbotKnowledge.projects],
  },
  {
    name: 'contact',
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'get in touch', 'connect', 'social', 'linkedin', 'github', 'telegram'],
    responses: [chatbotKnowledge.contact],
    actions: [
      { type: 'email', label: 'Send Email', url: 'mailto:choengrayu307@gmail.com', icon: '📧' },
      { type: 'link', label: 'LinkedIn', url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', icon: '💼' },
      { type: 'link', label: 'GitHub', url: 'https://github.com/Choeng-Rayu', icon: '🐙' },
    ],
  },
  {
    name: 'education',
    keywords: ['education', 'school', 'university', 'study', 'degree', 'student', 'learning', 'cadt', 'college', 'academic'],
    responses: [chatbotKnowledge.education],
  },
  {
    name: 'experience',
    keywords: ['experience', 'work history', 'job', 'career', 'volunteer', 'teaching', 'event', 'worked'],
    responses: [chatbotKnowledge.experience],
  },
  {
    name: 'cv',
    keywords: ['cv', 'resume', 'curriculum', 'download', 'pdf', 'document', 'qualification'],
    responses: ["Here's Rayu's CV! Click the button below to view or download it. The CV contains detailed information about education, skills, projects, and experience."],
    actions: [
      { type: 'download', label: '📄 Download CV', url: '/CV.md', icon: '📄' },
    ],
  },
  {
    name: 'hire',
    keywords: ['hire', 'hiring', 'job', 'position', 'internship', 'opportunity', 'work with', 'collaborate', 'available', 'looking for', 'recruit', 'employment'],
    responses: [chatbotKnowledge.hire],
    actions: [
      { type: 'email', label: 'Contact for Opportunities', url: 'mailto:choengrayu307@gmail.com?subject=Job/Internship Opportunity', icon: '💼' },
      { type: 'link', label: 'View LinkedIn', url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', icon: '🔗' },
    ],
  },
  {
    name: 'interests',
    keywords: ['interest', 'passionate', 'focus', 'care about', 'field', 'domain', 'area', 'sector', 'industry'],
    responses: [chatbotKnowledge.interests],
  },
  {
    name: 'location',
    keywords: ['location', 'where', 'country', 'city', 'based', 'live', 'cambodia'],
    responses: [`Rayu is based in ${personalInfo.location}. Currently studying at ${personalInfo.university}. Open to remote opportunities and collaborations worldwide!`],
  },
  {
    name: 'help',
    keywords: ['help', 'what can you', 'options', 'menu', 'commands', 'features', 'guide'],
    responses: [`I can help you learn about Rayu! Try asking about:
    
🧑‍💻 **About** - Who is Rayu?
🛠️ **Skills** - Technical abilities
📂 **Projects** - Work portfolio  
📧 **Contact** - How to reach Rayu
📄 **CV** - Download resume
💼 **Hire** - Job opportunities
🎓 **Education** - Academic background
🌟 **Interests** - Areas of focus

Just type your question naturally!`],
  },
  {
    name: 'thanks',
    keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'helpful', 'great', 'awesome', 'cool'],
    responses: [
      "You're welcome! Feel free to ask more questions or reach out to Rayu directly! 😊",
      "Glad I could help! Don't hesitate to contact Rayu for more details!",
      "Happy to assist! Is there anything else you'd like to know about Rayu?",
    ],
  },
  {
    name: 'bye',
    keywords: ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit', 'close'],
    responses: [
      "Goodbye! Thanks for learning about Rayu. Feel free to come back anytime! 👋",
      "Take care! Hope to see you again. Don't forget to check out Rayu's projects! 🚀",
    ],
  },
];

// Specific project queries
const projectPatterns: { pattern: RegExp; projectId: number }[] = [
  { pattern: /dastern|ocr|prescription|healthcare|medical/i, projectId: 1 },
  { pattern: /finwise|financial|finance|money|budget|tracking/i, projectId: 2 },
  { pattern: /rayuos|operating system|os|low.?level/i, projectId: 3 },
  { pattern: /cyber|security|hack/i, projectId: 4 },
  { pattern: /derlg|tour|booking|travel/i, projectId: 5 },
  { pattern: /math.?bot|tutor/i, projectId: 6 },
  { pattern: /alarm.?bot|reminder/i, projectId: 7 },
  { pattern: /coffee|hybrid/i, projectId: 8 },
];

// Find the best matching intent
function detectIntent(message: string): Intent | null {
  const normalizedMessage = message.toLowerCase().trim();
  
  let bestMatch: Intent | null = null;
  let highestScore = 0;
  
  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (normalizedMessage.includes(keyword.toLowerCase())) {
        // Longer keyword matches get higher scores
        score += keyword.length;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }
  
  return highestScore > 0 ? bestMatch : null;
}

// Find specific project being asked about
function detectProjectQuery(message: string): typeof projects[0] | null {
  for (const { pattern, projectId } of projectPatterns) {
    if (pattern.test(message)) {
      return projects.find(p => p.id === projectId) || null;
    }
  }
  return null;
}

// Generate response for specific project
function generateProjectResponse(project: typeof projects[0]): { content: string; actions: ChatAction[] } {
  const content = `**${project.title}**

${project.description}

🏷️ Technologies: ${project.tags.join(', ')}
📁 Category: ${project.category}`;

  const actions: ChatAction[] = [];
  
  if (project.codeLink) {
    actions.push({ type: 'link', label: 'View Code', url: project.codeLink, icon: '💻' });
  }
  if (project.demoLink) {
    actions.push({ type: 'link', label: 'Live Demo', url: project.demoLink, icon: '🌐' });
  }

  return { content, actions };
}

// Get random response from array
function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Main chat function
export function generateChatResponse(userMessage: string): { content: string; actions?: ChatAction[] } {
  // Check for specific project query first
  const project = detectProjectQuery(userMessage);
  if (project) {
    return generateProjectResponse(project);
  }
  
  // Check for general intents
  const intent = detectIntent(userMessage);
  
  if (intent) {
    return {
      content: getRandomResponse(intent.responses),
      actions: intent.actions,
    };
  }
  
  // Default response for unrecognized queries
  return {
    content: `I'm not sure I understand that question. Here are some things you can ask me about:

• Who is Rayu?
• What are Rayu's skills?
• Show me projects
• How can I contact Rayu?
• Download CV
• Is Rayu available for hire?

Feel free to ask any of these questions! 😊`,
    actions: [
      { type: 'download', label: '📄 Get CV', url: '/CV.md', icon: '📄' },
      { type: 'email', label: '📧 Contact Rayu', url: 'mailto:choengrayu307@gmail.com', icon: '📧' },
    ],
  };
}

// Generate initial greeting
export function getInitialGreeting(): ChatMessage {
  return {
    id: 'initial',
    role: 'assistant',
    content: `👋 Hi! I'm Rayu's AI assistant.

I can tell you about:
• 🧑‍💻 Rayu's background and story
• 🛠️ Technical skills and expertise
• 📂 Projects and portfolio
• 💼 Hiring/internship availability
• 📄 CV download

**What would you like to know?**`,
    timestamp: new Date(),
    actions: [
      { type: 'download', label: '📄 Download CV', url: '/CV.md', icon: '📄' },
      { type: 'email', label: '📧 Contact', url: 'mailto:choengrayu307@gmail.com', icon: '📧' },
    ],
  };
}

// Quick action suggestions
export const quickActions = [
  { label: "Who is Rayu?", message: "Tell me about Rayu" },
  { label: "Skills", message: "What are Rayu's skills?" },
  { label: "Projects", message: "Show me projects" },
  { label: "Contact", message: "How to contact Rayu?" },
  { label: "Download CV", message: "I want to download the CV" },
  { label: "Hiring", message: "Is Rayu available for hire?" },
];
