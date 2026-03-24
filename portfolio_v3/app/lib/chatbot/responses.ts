// Response Generators

import { ChatMessage, ChatAction, QuickAction } from './types';
import { personalInfo } from '../../data/portfolio';

const FALLBACKS = [
  `Hmm, I'm not sure about that specific question. Here are some popular topics:

• **Who is Rayu?** — background and story
• **Skills** — tech stack and expertise
• **Projects** — portfolio and demos
• **GitHub** — live repo stats
• **Contact / Send Message** — reach Rayu directly
• **Download CV** — full resume PDF
• **Hire** — internship / job availability

Try rephrasing or type "help" for the full menu!`,
  `I didn't quite catch that. You can ask me things like:

• "What languages does Rayu know?"
• "Tell me about DasTern project"
• "Is Rayu available for internship?"
• "Show me his GitHub repos"
• "I want to send Rayu a message"

Or type **help** to see all options!`,
];

/**
 * Generate fallback response for unrecognized queries
 */
export function getFallbackResponse(): { content: string; actions: ChatAction[] } {
  return {
    content: FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)],
    actions: [
      { type: 'download', label: '⬇ Download CV', url: '/Choeng_Rayu_CV.pdf', icon: 'document' },
      { type: 'contact-form', label: '✉ Send Message', url: '#contact-form', icon: 'email' },
    ],
  };
}

/**
 * Initial greeting message shown when chat opens
 */
export function getInitialGreeting(): ChatMessage {
  return {
    id: 'initial',
    role: 'assistant',
    content: `**Hi there! I'm Rayu's AI assistant.** 👋

I can answer questions about:
• 👤 Background & story
• 🛠️ Skills & tech stack
• 📁 Projects & portfolio
• 🐙 GitHub activity (live!)
• 📄 CV download
• 💼 Hiring & availability
• ✉ Send Rayu a message directly

**Just ask naturally — what would you like to know?**`,
    timestamp: new Date(),
    actions: [
      { type: 'download', label: '⬇ Download CV', url: '/Choeng_Rayu_CV.pdf', icon: 'document' },
      { type: 'contact-form', label: '✉ Contact Rayu', url: '#contact-form', icon: 'email' },
    ],
  };
}

/**
 * Quick action chip suggestions shown above the input
 */
export const quickActions: QuickAction[] = [
  { label: '👤 About Rayu', message: 'Tell me about Rayu' },
  { label: '🛠️ Skills', message: "What are Rayu's skills?" },
  { label: '📁 Projects', message: 'Show me projects' },
  { label: '🐙 GitHub', message: "Show Rayu's GitHub activity" },
  { label: '📄 Download CV', message: 'I want to download the CV' },
  { label: '✉ Send Message', message: 'I want to send Rayu a message' },
];
