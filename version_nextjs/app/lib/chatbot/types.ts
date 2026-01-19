// Chatbot Type Definitions

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

export interface Intent {
  name: string;
  keywords: string[];
  responses: string[];
  actions?: ChatAction[];
}

export interface QuickAction {
  label: string;
  message: string;
}
