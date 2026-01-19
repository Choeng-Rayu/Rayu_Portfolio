// Chatbot Utility Functions

import { Intent, ChatAction } from './types';
import { intents, projectPatterns } from './intents';
import { projects } from '../../data/portfolio';

/**
 * Detect intent from user message using keyword matching
 */
export function detectIntent(message: string): Intent | null {
  const lowerMessage = message.toLowerCase();
  let bestMatch: Intent | null = null;
  let highestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        score += keyword.split(' ').length; // Multi-word matches get higher scores
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }
  
  return highestScore > 0 ? bestMatch : null;
}

/**
 * Find specific project being asked about
 */
export function detectProjectQuery(message: string): typeof projects[0] | null {
  for (const { pattern, projectTitle } of projectPatterns) {
    if (pattern.test(message)) {
      return projects.find(p => p.title.toLowerCase().includes(projectTitle.toLowerCase())) || null;
    }
  }
  return null;
}

/**
 * Generate response for specific project
 */
export function generateProjectResponse(project: typeof projects[0]): { content: string; actions: ChatAction[] } {
  const content = `**${project.title}** ${project.featured ? '⭐' : ''}

${project.description}

🏷️ **Technologies:** ${project.tags.join(', ')}
📁 **Category:** ${project.category}`;

  const actions: ChatAction[] = [];
  
  if (project.codeLink) {
    actions.push({ type: 'link', label: '💻 View Code', url: project.codeLink, icon: '💻' });
  }
  if (project.demoLink) {
    actions.push({ type: 'link', label: '🌐 Live Demo', url: project.demoLink, icon: '🌐' });
  }

  return { content, actions };
}

/**
 * Get random response from array
 */
export function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}
