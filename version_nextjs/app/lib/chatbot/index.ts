// Chatbot Agent - Main Entry Point
// Intelligent assistant for Rayu's portfolio using keyword matching and intent detection

export * from './types';
export * from './responses';

import { detectIntent, detectProjectQuery, generateProjectResponse, getRandomResponse } from './utils';
import { getFallbackResponse } from './responses';

/**
 * Generate chat response based on user message
 */
export function generateChatResponse(userMessage: string): { content: string; actions?: any[] } {
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
  return getFallbackResponse();
}

/**
 * Generate unique ID for messages
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
