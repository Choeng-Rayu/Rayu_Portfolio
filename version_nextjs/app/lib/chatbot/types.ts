// Chatbot Type Definitions

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

export interface ChatAction {
  type: 'link' | 'download' | 'email' | 'contact-form';
  label: string;
  url: string;
  icon?: string;
}

export interface Intent {
  name: string;
  patterns: (string | RegExp)[];
  responses: string[];
  actions?: ChatAction[];
  async?: boolean;
}

export interface QuickAction {
  label: string;
  message: string;
}

export interface ContactData {
  email: string;
  subject: string;
  message: string;
}
