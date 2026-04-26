'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Maximize2,
  Bot,
  User,
  AlertCircle,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage, QuickAction } from '../lib/chatbot/types';
import { generateId, formatTimestamp, quickActions } from '../lib/chatbot/utils';
import { generateOfflineResponse } from '../lib/chatbot/data';

// Typing indicator component
const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <motion.span
      className="w-2 h-2 rounded-full bg-[#ff4500]/60"
      animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
    />
    <motion.span
      className="w-2 h-2 rounded-full bg-[#ff4500]/60"
      animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
    />
    <motion.span
      className="w-2 h-2 rounded-full bg-[#ff4500]/60"
      animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
    />
  </div>
);

// Quick action button component
const QuickActionButton: React.FC<{
  action: QuickAction;
  onClick: () => void;
  disabled: boolean;
}> = ({ action, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-3 py-1.5 text-xs font-medium rounded-full border border-[#ff4500]/30 bg-[#ff4500]/10 text-[#ff4500] hover:bg-[#ff4500]/20 hover:border-[#ff4500]/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
  >
    {action.label}
  </button>
);

// Message bubble component
const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-[#ff4500]/20 border border-[#ff4500]/30'
            : 'bg-white/10 border border-white/20'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-[#ff4500]" />
        ) : (
          <Bot className="w-4 h-4 text-white/80" />
        )}
      </div>

      {/* Message content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[calc(100%-3rem)]`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-[#ff4500] text-white rounded-br-md'
              : 'bg-white/10 text-white/90 rounded-bl-md border border-white/10'
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="m-0 text-sm leading-relaxed">{children}</p>,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-[#ff4500] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children }) => (
                    <code className="px-1.5 py-0.5 rounded bg-black/30 text-[#ff4500] text-xs">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="p-3 rounded-lg bg-black/30 overflow-x-auto text-xs">
                      {children}
                    </pre>
                  ),
                  ul: ({ children }) => <ul className="list-disc pl-4 my-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 my-2">{children}</ol>,
                  li: ({ children }) => <li className="my-1">{children}</li>,
                  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span className="text-[10px] text-white/40 mt-1 px-1">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: "Hi there! I'm Rayu's AI assistant. I can help you learn about his experience, skills, projects, and how to get in touch. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debug logging helper
  const debugLog = useCallback((...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[ChatBot]', ...args);
    }
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Handle click outside to close on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node) &&
        isOpen &&
        !isMinimized
      ) {
        // Only close on mobile
        if (window.innerWidth < 768) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMinimized]);

  // Send message to API with streaming support
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      debugLog('Cancelled previous request');
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsStreaming(true);
    setError(null);

    // Create assistant message placeholder
    const assistantMessageId = generateId();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, assistantMessage]);

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    // 30 second timeout
    const timeoutId = setTimeout(() => {
      abortControllerRef.current?.abort();
      debugLog('Request timed out after 30 seconds');
    }, 30000);

    try {
      debugLog('Sending message:', userMessage.content);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.filter((m) => !m.isStreaming),
        }),
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else if (response.status === 503) {
          throw new Error('Service temporarily unavailable. Please try again later.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body received from server');
      }

      // eslint-disable-next-line prefer-const
      let streamingContent = '';
      let chunkCount = 0;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        chunkCount++;

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              debugLog('Stream completed');
              break;
            }
            try {
              const parsed = JSON.parse(data);
              // NVIDIA API format: choices[0].delta.content
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                // eslint-disable-next-line react-hooks/immutability
                streamingContent += content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId
                      ? { ...m, content: streamingContent }
                      : m
                  )
                );
              }
            } catch (parseError) {
              // Handle non-JSON data (plain text streaming)
              debugLog('Failed to parse chunk as JSON, treating as plain text:', data);
              // eslint-disable-next-line react-hooks/immutability
              streamingContent += data;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId
                    ? { ...m, content: streamingContent }
                    : m
                )
              );
            }
          }
        }
      }

      debugLog(`Stream complete. Received ${chunkCount} chunks`);

      // Finalize message
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? { ...m, content: streamingContent, isStreaming: false }
            : m
        )
      );
    } catch (err) {
      clearTimeout(timeoutId);

      // Handle specific error types
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          debugLog('Request was aborted');
          setError('Request was cancelled or timed out. Please try again.');
        } else {
          debugLog('Chat error:', err.message);
          setError(err.message || 'Failed to get response. Please try again.');
        }
      } else {
        debugLog('Unknown error:', err);
        setError('An unexpected error occurred. Please try again.');
      }

      // Remove the streaming message on error
      setMessages((prev) => prev.filter((m) => m.id !== assistantMessageId));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.message);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const clearChat = () => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      debugLog('Cancelled request on chat clear');
    }

    setMessages([
      {
        id: generateId(),
        role: 'assistant',
        content: "Chat cleared! How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setIsLoading(false);
    setIsStreaming(false);
    setError(null);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#ff4500] hover:bg-[#ff5722] text-white shadow-lg shadow-[#ff4500]/30 flex items-center justify-center transition-colors duration-300"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : undefined,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`fixed z-50 flex flex-col bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden ${
              isMinimized
                ? 'bottom-6 right-6 w-[320px] rounded-2xl'
                : 'bottom-4 right-4 w-[calc(100%-2rem)] sm:w-[400px] md:w-[450px] h-[500px] md:h-[600px] rounded-2xl'
            }`}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 69, 0, 0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ff4500]/20 border border-[#ff4500]/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#ff4500]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Chat with AI Assistant
                  </h3>
                  <p className="text-xs text-white/50">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMinimize}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  aria-label={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content (hidden when minimized) */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    {isLoading && !isStreaming && (
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white/80" />
                        </div>
                        <TypingIndicator />
                      </div>
                    )}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                        <button
                          onClick={() => setError(null)}
                          className="ml-auto text-xs underline hover:no-underline"
                        >
                          Dismiss
                        </button>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  <div className="px-4 py-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <QuickActionButton
                          key={action.label}
                          action={action}
                          onClick={() => handleQuickAction(action)}
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-white/10 bg-black/20">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <div className="flex-1 relative">
                        <textarea
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your message..."
                          disabled={isLoading}
                          rows={1}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm resize-none focus:outline-none focus:border-[#ff4500]/50 focus:ring-1 focus:ring-[#ff4500]/20 transition-all duration-200 disabled:opacity-50"
                          style={{ minHeight: '44px', maxHeight: '120px' }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isLoading}
                        className="flex-shrink-0 px-4 py-3 rounded-xl bg-[#ff4500] hover:bg-[#ff5722] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors duration-200"
                        aria-label="Send message"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[10px] text-white/30">
                        Press Enter to send, Shift+Enter for new line
                      </p>
                      <button
                        onClick={clearChat}
                        className="text-[10px] text-white/40 hover:text-white/60 transition-colors duration-200"
                      >
                        Clear chat
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
