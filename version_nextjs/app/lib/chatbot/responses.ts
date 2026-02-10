// Response Generators

import { ChatMessage, ChatAction, QuickAction } from './types';
import { personalInfo } from '../../data/portfolio';

/**
 * Generate fallback response for unrecognized queries
 */
export function getFallbackResponse(): { content: string; actions: ChatAction[] } {
  return {
    content: `I'm not sure I understand that question. Here are some things you can ask me:

• Who is Rayu?
• What are Rayu's skills?
• Show me projects
• How can I contact Rayu?
• Download CV
• Is Rayu available for hire?

Feel free to ask any of these questions!`,
    actions: [
      { type: 'download', label: 'Get CV', url: '/Choeng_Rayu_CV.pdf', icon: 'document' },
      { type: 'email', label: 'Contact Rayu', url: `mailto:${personalInfo.email}`, icon: 'email' },
    ],
  };
}

/**
 * Generate initial greeting message
 */
export function getInitialGreeting(): ChatMessage {
  return {
    id: 'initial',
    role: 'assistant',
    content: `**Hi! I'm Rayu's AI Assistant.**

I can help you learn about:
• Rayu's background and story
• Technical skills and expertise
• Projects and portfolio
• Hiring/internship availability
• CV download

**What would you like to know?**`,
    timestamp: new Date(),
    actions: [
      { type: 'download', label: 'Download CV', url: '/Choeng_Rayu_CV.pdf', icon: 'document' },
      { type: 'email', label: 'Contact', url: `mailto:${personalInfo.email}`, icon: 'email' },
    ],
  };
}

/**
 * Quick action suggestions for user
 */
export const quickActions: QuickAction[] = [
  { label: "Who is Rayu?", message: "Tell me about Rayu" },
  { label: "Skills", message: "What are Rayu's skills?" },
  { label: "Projects", message: "Show me projects" },
  { label: "Contact", message: "How to contact Rayu?" },
  { label: "Download CV", message: "I want to download the CV" },
  { label: "Hiring", message: "Is Rayu available for hire?" },
];
