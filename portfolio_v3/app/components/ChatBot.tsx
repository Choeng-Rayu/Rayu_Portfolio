"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { GlassButton } from "./GlassButton";
import { cn } from "@/app/lib/utils";
import { chatbotKnowledge, personalInfo, projects } from "@/app/lib/data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  { label: "About Rayu", question: "Who is Rayu?" },
  { label: "Skills", question: "What are Rayu's skills?" },
  { label: "Projects", question: "Show me Rayu's projects" },
  { label: "Contact", question: "How can I contact Rayu?" },
  { label: "Download CV", question: "I want to download the CV" },
  { label: "Hire Rayu", question: "Is Rayu available for hire?" },
];

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  
  if (/hi|hello|hey|greetings/.test(lower)) return "greeting";
  if (/about|who|background|story|rayu/.test(lower)) return "about";
  if (/skill|technology|tech|programming|framework/.test(lower)) return "skills";
  if (/project|work|portfolio|built|created/.test(lower)) return "projects";
  if (/contact|email|phone|reach|connect/.test(lower)) return "contact";
  if (/education|school|university|study|degree/.test(lower)) return "education";
  if (/experience|work history|job|volunteer/.test(lower)) return "experience";
  if (/cv|resume|download|pdf/.test(lower)) return "cv";
  if (/hire|hiring|internship|opportunity|available/.test(lower)) return "hire";
  if (/interest|passionate|focus|field/.test(lower)) return "interests";
  if (/location|where|country|city|cambodia/.test(lower)) return "location";
  if (/thank|thanks|appreciate/.test(lower)) return "thanks";
  if (/bye|goodbye|see you/.test(lower)) return "bye";
  
  return "unknown";
}

function generateResponse(message: string): string {
  const intent = detectIntent(message);
  
  switch (intent) {
    case "greeting":
      return chatbotKnowledge.greeting;
    case "about":
      return chatbotKnowledge.about;
    case "skills":
      return chatbotKnowledge.skills;
    case "projects":
      return `Rayu has built several impressive projects:\n\n${projects.map(p => `• **${p.name}**: ${p.shortDescription}`).join("\n")}\n\nWould you like to know more about any specific project?`;
    case "contact":
      return chatbotKnowledge.contact;
    case "education":
      return chatbotKnowledge.education;
    case "experience":
      return chatbotKnowledge.experience;
    case "cv":
      return `You can download Rayu's CV here: ${personalInfo.cvLink}`;
    case "hire":
      return chatbotKnowledge.hire;
    case "interests":
      return chatbotKnowledge.interests;
    case "thanks":
      return "You're welcome! Feel free to ask more questions or reach out to Rayu directly!";
    case "bye":
      return "Goodbye! Thanks for visiting. Feel free to come back anytime!";
    default:
      return `I'm not sure I understand that question. Here are some things you can ask me about:\n\n• Who is Rayu?\n• What are Rayu's skills?\n• Show me projects\n• How to contact Rayu?\n• Download CV\n• Is Rayu available for hire?\n\nJust type your question naturally!`;
  }
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hi! 👋 I'm Rayu's AI Assistant.\n\nI can help you learn about Rayu's background, skills, projects, and how to get in touch.\n\nWhat would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full",
          "bg-primary shadow-lg shadow-primary/30",
          "flex items-center justify-center",
          "transition-all duration-300",
          isOpen ? "rotate-90" : ""
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full border-2 border-white">
            <span className="absolute inset-0 rounded-full bg-danger animate-ping opacity-75" />
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-[360px] max-w-[calc(100vw-3rem)]"
          >
            <GlassPanel radius="xl" className="overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Rayu's Assistant
                    </h3>
                    <p className="text-xs text-text-muted">AI-powered chatbot</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-2",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                        message.role === "user"
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-white/5 text-text-secondary rounded-bl-md"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white/70" />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                  <span className="text-xs text-text-muted">Quick questions</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.slice(0, 3).map((q) => (
                    <button
                      key={q.label}
                      onClick={() => {
                        setInput(q.question);
                        handleQuickQuestion(q.question);
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <GlassButton
                    onClick={handleSend}
                    variant="primary"
                    size="sm"
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </GlassButton>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
