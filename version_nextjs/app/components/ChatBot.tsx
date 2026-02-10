'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  generateChatResponse, 
  getInitialGreeting, 
  quickActions, 
  generateId,
  ChatMessage,
  ChatAction 
} from '../lib/chatbot';

interface ChatMessageDisplay {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageDisplay[]>([getInitialGreeting()]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    // Add user message
    const userMessage: ChatMessageDisplay = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

    // Generate response using the chat agent
    const response = generateChatResponse(text);
    const assistantMessage: ChatMessageDisplay = {
      id: generateId(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      actions: response.actions,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'download') {
      const link = document.createElement('a');
      link.href = action.url;
      link.download = 'Rayu_Choeng_CV.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(action.url, '_blank');
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle"
        data-open={isOpen}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toggle-icon">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="toggle-content">
            <svg viewBox="0 0 24 24" fill="currentColor" className="toggle-icon">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
            </svg>
            <span className="toggle-badge">Chat</span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-avatar">
            <span>AI</span>
          </div>
          <div className="header-info">
            <h3>Rayu&apos;s AI Assistant</h3>
            <p>Ask me anything about Rayu!</p>
          </div>
          <div className="header-status">
            <span className="status-dot"></span>
            <span>Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role}`}
            >
              <div className="message-bubble">
                <p className="message-content">{message.content}</p>

                {/* Action buttons */}
                {message.actions && message.actions.length > 0 && (
                  <div className="message-actions">
                    {message.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(action)}
                        className={`action-btn ${action.type}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="message assistant">
              <div className="message-bubble typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="chatbot-quick-actions">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(action.message)}
              className="quick-action-btn"
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="chatbot-input">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Rayu..."
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="send-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
