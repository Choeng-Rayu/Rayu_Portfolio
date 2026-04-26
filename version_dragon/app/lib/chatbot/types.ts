// Chat message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// Chat action types
export interface ChatAction {
  type: 'link' | 'download' | 'email' | 'contact-form';
  label: string;
  url: string;
  icon?: string;
}

// Quick action suggestions
export interface QuickAction {
  label: string;
  message: string;
}

// API request/response types
export interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

export interface ChatResponse {
  content: string;
  actions?: ChatAction[];
}
