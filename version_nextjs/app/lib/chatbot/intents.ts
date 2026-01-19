// Chatbot Intents Configuration

import { Intent } from './types';
import { chatbotKnowledge, personalInfo } from '../../data/portfolio';

export const intents: Intent[] = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo', 'hola'],
    responses: chatbotKnowledge.greetings,
  },
  {
    name: 'about',
    keywords: ['about', 'who', 'tell me about', 'introduce', 'rayu', 'background', 'story', 'yourself', 'him', 'who is', 'biography'],
    responses: [chatbotKnowledge.about],
  },
  {
    name: 'skills',
    keywords: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool', 'stack', 'know', 'capable', 'can do', 'abilities', 'expertise', 'proficient', 'what can'],
    responses: [chatbotKnowledge.skills],
  },
  {
    name: 'projects',
    keywords: ['project', 'work', 'portfolio', 'built', 'created', 'developed', 'made', 'application', 'app', 'website', 'showcase', 'examples', 'show me'],
    responses: [chatbotKnowledge.projects],
  },
  {
    name: 'contact',
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'get in touch', 'connect', 'social', 'linkedin', 'github', 'telegram', 'how to contact'],
    responses: [chatbotKnowledge.contact],
    actions: [
      { type: 'email', label: '📧 Send Email', url: `mailto:${personalInfo.email}`, icon: '📧' },
      { type: 'link', label: '💼 LinkedIn', url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', icon: '💼' },
      { type: 'link', label: '🐙 GitHub', url: 'https://github.com/Choeng-Rayu', icon: '🐙' },
    ],
  },
  {
    name: 'education',
    keywords: ['education', 'school', 'university', 'study', 'degree', 'student', 'learning', 'cadt', 'college', 'academic', 'where study'],
    responses: [chatbotKnowledge.education],
  },
  {
    name: 'experience',
    keywords: ['experience', 'work history', 'job', 'career', 'volunteer', 'teaching', 'event', 'worked', 'history'],
    responses: [chatbotKnowledge.experience],
  },
  {
    name: 'cv',
    keywords: ['cv', 'resume', 'curriculum', 'download', 'pdf', 'document', 'qualification', 'get cv', 'download cv'],
    responses: ["Here's Rayu's CV! 📄 Click the button below to view or download it. The CV contains detailed information about education, skills, projects, and experience."],
    actions: [
      { type: 'download', label: '📄 Download CV (PDF)', url: '/Choeng_Rayu_CV.pdf', icon: '📄' },
      { type: 'link', label: '💼 View LinkedIn Profile', url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', icon: '💼' },
    ],
  },
  {
    name: 'hire',
    keywords: ['hire', 'hiring', 'job', 'position', 'internship', 'opportunity', 'work with', 'collaborate', 'available', 'looking for', 'recruit', 'employment', 'open to', 'freelance'],
    responses: [chatbotKnowledge.hire],
    actions: [
      { type: 'email', label: '💼 Contact for Opportunities', url: `mailto:${personalInfo.email}?subject=Job/Internship Opportunity`, icon: '💼' },
      { type: 'link', label: '🔗 View LinkedIn', url: 'https://www.linkedin.com/in/rayu-choeng-351243335/', icon: '🔗' },
      { type: 'download', label: '📄 Get CV', url: '/Choeng_Rayu_CV.pdf', icon: '📄' },
    ],
  },
  {
    name: 'interests',
    keywords: ['interest', 'passionate', 'focus', 'care about', 'field', 'domain', 'area', 'sector', 'industry', 'what interest'],
    responses: [chatbotKnowledge.interests],
  },
  {
    name: 'location',
    keywords: ['location', 'where', 'country', 'city', 'based', 'live', 'cambodia', 'from', 'located'],
    responses: [`Rayu is based in ${personalInfo.location}. 🏠

Currently studying at ${personalInfo.university} (Year 3).

📍 Open to remote opportunities and collaborations worldwide!`],
  },
  {
    name: 'help',
    keywords: ['help', 'what can you', 'options', 'menu', 'commands', 'features', 'guide', 'how to use'],
    responses: [`I can help you learn about Rayu! 🤖 Try asking about:

🧑‍💻 **About** - Who is Rayu?
🛠️ **Skills** - Technical abilities & expertise
📂 **Projects** - Work portfolio & demos
📧 **Contact** - How to reach Rayu
📄 **CV** - Download resume
💼 **Hire** - Job/internship availability
🎓 **Education** - Academic background
🌟 **Interests** - Areas of focus

Just type your question naturally! 💬`],
  },
  {
    name: 'thanks',
    keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'helpful', 'great', 'awesome', 'cool', 'nice'],
    responses: [
      "You're welcome! 😊 Feel free to ask more questions or reach out to Rayu directly!",
      "Glad I could help! 🙌 Don't hesitate to contact Rayu for more details!",
      "Happy to assist! ✨ Is there anything else you'd like to know about Rayu?",
    ],
  },
  {
    name: 'bye',
    keywords: ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit', 'close', 'take care'],
    responses: [
      "Goodbye! 👋 Thanks for learning about Rayu. Feel free to come back anytime!",
      "Take care! 🚀 Hope to see you again. Don't forget to check out Rayu's projects!",
      "See you! ✌️ Feel free to reach out to Rayu directly if you have any questions!",
    ],
  },
];

// Specific project patterns for detailed project queries
export const projectPatterns: { pattern: RegExp; projectTitle: string }[] = [
  { pattern: /dastern|ocr|prescription|healthcare|medical/i, projectTitle: 'DasTern' },
  { pattern: /finwise|financial|finance|money|budget|tracking/i, projectTitle: 'Finwise' },
  { pattern: /rayuos|operating system|os|low.?level/i, projectTitle: 'RayuOS' },
  { pattern: /cyber|security|hack/i, projectTitle: 'Cyber' },
  { pattern: /derlg|tour|booking|travel/i, projectTitle: 'DerLg' },
  { pattern: /math.?bot|tutor|telegram.?bot/i, projectTitle: 'Math' },
  { pattern: /alarm.?bot|reminder|task/i, projectTitle: 'Alarm' },
  { pattern: /coffee|hybrid/i, projectTitle: 'Coffee' },
];
