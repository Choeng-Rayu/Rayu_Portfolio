// Chatbot Agent — Main Entry Point
// Intelligent assistant using NLP-style pattern matching + live GitHub API

export * from './types';
export * from './responses';

import { detectIntent, detectProjectQuery, generateProjectResponse, buildGitHubResponse, getRandomResponse } from './utils';
import { getFallbackResponse } from './responses';

/**
 * Generate chat response — async so GitHub intent can fetch live data
 */
export async function generateChatResponse(
  userMessage: string
): Promise<{ content: string; actions?: any[]; startContactForm?: boolean }> {
  // 1. Check for specific project name query first
  const project = detectProjectQuery(userMessage);
  if (project) {
    return generateProjectResponse(project);
  }

  // 2. Detect general intent
  const intent = detectIntent(userMessage);

  // 3. GitHub intent → fetch live data
  if (intent?.async && intent.name === 'github') {
    try {
      const res = await fetch('/api/github');
      if (res.ok) {
        const data = await res.json();
        return buildGitHubResponse(data);
      }
    } catch {
      // fallthrough to static response
    }
    return {
      content: `Rayu has 55+ public repositories on GitHub! 🐙\n\nHe's worked with JavaScript, TypeScript, Python, Java and more.\n\n**github.com/Choeng-Rayu**`,
      actions: [{ type: 'link', label: '🐙 Visit GitHub', url: 'https://github.com/Choeng-Rayu', icon: 'github' }],
    };
  }

  // 4. Normal intent
  if (intent) {
    return {
      content: getRandomResponse(intent.responses),
      actions: intent.actions,
      startContactForm: intent.name === 'send_message',
    };
  }

  // 5. Fallback
  return getFallbackResponse();
}

/**
 * Generate unique ID for messages
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
