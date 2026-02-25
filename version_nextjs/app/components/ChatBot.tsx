'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  generateChatResponse,
  getInitialGreeting,
  quickActions,
  generateId,
  ChatAction,
} from '../lib/chatbot';

// ── EmailJS credentials ───────────────────────────────────────────────────────
const EMAILJS_SERVICE   = 'service_1dnzd0m';
const EMAILJS_TEMPLATE  = 'template_lrjer9e';
const EMAILJS_PUBLIC_KEY = '0_aqMaQXOd-Aw0EPi';

// ── Contact form state ────────────────────────────────────────────────────────
type ContactStep = 'idle' | 'email' | 'subject' | 'message' | 'sending';

interface ContactData { email: string; subject: string }

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// ── Helpers ───────────────────────────────────────────────────────────────────
interface ChatMessageDisplay {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

function addBotMsg(
  text: string,
  actions?: ChatAction[]
): ChatMessageDisplay {
  return {
    id: generateId(),
    role: 'assistant',
    content: text,
    timestamp: new Date(),
    actions,
  };
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState<ChatMessageDisplay[]>([getInitialGreeting()]);
  const [input, setInput]       = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Contact form state
  const [contactStep, setContactStep] = useState<ContactStep>('idle');
  const [contactData, setContactData] = useState<ContactData>({ email: '', subject: '' });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // ── Helper: push assistant message with delay ──────────────────────────────
  const pushBot = (text: string, actions?: ChatAction[]) => {
    setMessages(prev => [...prev, addBotMsg(text, actions)]);
  };

  // ── Contact form handler ───────────────────────────────────────────────────
  const handleContactStep = async (text: string): Promise<boolean> => {
    // Returns true if handled, false if message should fall through to normal chat

    if (contactStep === 'email') {
      if (!isValidEmail(text)) {
        pushBot("That doesn't look like a valid email address. Please try again:");
        return true;
      }
      setContactData(prev => ({ ...prev, email: text.trim() }));
      setContactStep('subject');
      pushBot("Got it! ✅ Now, what's the subject of your message?");
      return true;
    }

    if (contactStep === 'subject') {
      if (text.trim().length < 3) {
        pushBot("Please enter a subject (at least 3 characters):");
        return true;
      }
      setContactData(prev => ({ ...prev, subject: text.trim() }));
      setContactStep('message');
      pushBot("Almost there! ✅ Finally, type your message to Rayu:");
      return true;
    }

    if (contactStep === 'message') {
      if (text.trim().length < 5) {
        pushBot("Please write a bit more (minimum 5 characters):");
        return true;
      }
      setContactStep('sending');
      pushBot("⏳ Sending your message to Rayu…");

      try {
        await emailjs.send(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          {
            from_email: contactData.email,
            reply_to:   contactData.email,
            subject:    contactData.subject,
            message:    text.trim(),
            to_name:    'Choeng Rayu',
          },
          EMAILJS_PUBLIC_KEY
        );
        setContactStep('idle');
        setContactData({ email: '', subject: '' });
        pushBot(
          `✅ **Message sent!** Rayu will get back to you at **${contactData.email}** soon.\n\nIs there anything else you'd like to know about Rayu?`
        );
      } catch {
        setContactStep('idle');
        pushBot(
          "❌ Oops, something went wrong sending your message. Please try emailing Rayu directly at **choengrayu307@gmail.com**",
          [{ type: 'email', label: 'Email Rayu directly', url: 'mailto:choengrayu307@gmail.com', icon: 'email' }]
        );
      }
      return true;
    }

    return false; // not in contact flow
  };

  // ── Start contact form from intent or action click ────────────────────────
  const startContactForm = () => {
    setContactStep('email');
    pushBot("Sure! I'll forward your message to Rayu.\n\nFirst, what's your **email address** so he can reply to you?");
  };

  // ── Handle action buttons ─────────────────────────────────────────────────
  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'download') {
      const link = document.createElement('a');
      link.href = '/Choeng_Rayu_CV.pdf';
      link.download = 'Choeng_Rayu_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action.type === 'contact-form') {
      startContactForm();
    } else {
      window.open(action.url, '_blank');
    }
  };

  // ── Main send handler ─────────────────────────────────────────────────────
  const handleSend = async (messageText?: string) => {
    const text = (messageText ?? input).trim();
    if (!text) return;

    const userMsg: ChatMessageDisplay = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate natural thinking delay
    await new Promise(r => setTimeout(r, 400 + Math.random() * 400));
    setIsTyping(false);

    // Contact form flow takes priority
    const handled = await handleContactStep(text);
    if (handled) return;

    // Normal AI response
    const response = await generateChatResponse(text);

    const botMsg: ChatMessageDisplay = {
      id: generateId(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      actions: response.actions,
    };
    setMessages(prev => [...prev, botMsg]);

    // If the intent triggers the contact form, start it after the message appears
    if (response.startContactForm) {
      setTimeout(() => setContactStep('email'), 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Input placeholder based on current state ──────────────────────────────
  const placeholder =
    contactStep === 'email'   ? 'Enter your email address…' :
    contactStep === 'subject' ? 'Enter the subject…' :
    contactStep === 'message' ? 'Type your message to Rayu…' :
    contactStep === 'sending' ? 'Sending…' :
                                'Ask anything about Rayu…';

  // ── Cancel contact form ───────────────────────────────────────────────────
  const cancelContact = () => {
    setContactStep('idle');
    setContactData({ email: '', subject: '' });
    pushBot("Contact form cancelled. Feel free to ask me anything else! 😊");
  };

  return (
    <>
      {/* Toggle button */}
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

      {/* Chat window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-avatar"><span>AI</span></div>
          <div className="header-info">
            <h3>Rayu&apos;s AI Assistant</h3>
            <p>
              {contactStep !== 'idle'
                ? `📧 Contact form — step: ${contactStep}`
                : 'Ask me anything about Rayu!'}
            </p>
          </div>
          <div className="header-status">
            <span className="status-dot"></span>
            <span>Online</span>
          </div>
        </div>

        {/* Contact form progress bar */}
        {contactStep !== 'idle' && contactStep !== 'sending' && (
          <div className="chatbot-form-bar">
            <span className={contactStep === 'email' ? 'active' : 'done'}>① Email</span>
            <span className={contactStep === 'subject' ? 'active' : contactStep === 'message' ? 'done' : ''}>② Subject</span>
            <span className={contactStep === 'message' ? 'active' : ''}>③ Message</span>
            <button className="cancel-form-btn" onClick={cancelContact} title="Cancel">✕</button>
          </div>
        )}

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role}`}>
              <div className="message-bubble">
                <p className="message-content">{msg.content}</p>
                {msg.actions && msg.actions.length > 0 && (
                  <div className="message-actions">
                    {msg.actions.map((action, i) => (
                      <button
                        key={i}
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

          {isTyping && (
            <div className="message assistant">
              <div className="message-bubble typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions — hide during contact flow */}
        {contactStep === 'idle' && (
          <div className="chatbot-quick-actions">
            {quickActions.map((action, i) => (
              <button key={i} onClick={() => handleSend(action.message)} className="quick-action-btn">
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input">
          <input
            ref={inputRef}
            type={contactStep === 'email' ? 'email' : 'text'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={contactStep === 'sending'}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || contactStep === 'sending'}
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

