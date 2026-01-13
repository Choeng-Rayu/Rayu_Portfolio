import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
// import "./Chatbot.css"; // Assuming the CSS is in a separate file
import "font-awesome/css/font-awesome.min.css";

const Chatbot = () => {
  // State management using useState
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome to Rayu's portfolio! Ask me about services, pricing, React skills, contact info, projects, or timelines.\n\nTry: \"What services do you offer?\" or \"Website cost?\"",
      type: "bot"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const avatarUrl = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";

  // Ref for scrolling to the bottom of the messages
  const messagesRef = useRef(null);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Toggle chat window visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle sending a message
  const sendMessage = async (e) => {
    e.preventDefault();
    const userMessage = message.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");

    if (userMessage.toLowerCase().includes("qr")) {
      const qrCode = await generateQRCode(userMessage);
      addMessage(qrCode, "bot", true);
    } else {
      const botReply = getBotReply(userMessage);
      setTimeout(() => {
        addMessage(botReply, "bot");
      }, 500);
    }

    setMessage("");
  };

  // Add a message to the messages array and scroll to bottom
  const addMessage = (textOrQrCode, type, isQrCode = false) => {
    const message = isQrCode
      ? { qrCode: textOrQrCode, type }
      : { text: textOrQrCode, type };
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Generate QR code using the qrcode library
  const generateQRCode = async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error("QR Code generation failed:", err);
      return null;
    }
  };

  // Determine bot reply based on user message with comprehensive responses
  const getBotReply = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage.includes("good morning") || lowerMessage.includes("good afternoon") || lowerMessage.includes("good evening")) {
      const greetings = [
        "Hi there! � Keen to chat about Rayu's work?",
        "Hello! 😊 What would you like to explore about Rayu?",
        "Hey! 🌟 Ask me anything about the services or projects.",
        "Great to see you! 🎉 How can I help today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Web Development Services
    else if (lowerMessage.includes("web development") || lowerMessage.includes("website") || lowerMessage.includes("web design") || lowerMessage.includes("frontend") || lowerMessage.includes("backend")) {
  return "🌐 Web development: Frontend (React, responsive UI), Backend (APIs, databases), and full-stack builds like e-commerce or business sites. Want to chat about yours? 🚀";
    }

    // Technologies & Skills
    else if (lowerMessage.includes("skills") || lowerMessage.includes("technology") || lowerMessage.includes("tech stack") || lowerMessage.includes("programming") || lowerMessage.includes("languages")) {
  return "💻 Skills snapshot: Frontend (React, Next, Tailwind), Backend (Node, Express, MongoDB, MySQL), plus Git, Figma, and performance-focused builds. Peek at the Skills section for more. 📊";
    }

    // React specific
    else if (lowerMessage.includes("react") || lowerMessage.includes("jsx") || lowerMessage.includes("component")) {
  return "⚛️ React focus: custom components, hooks, state handling, and polished UX. Projects include portfolios, real-time apps, and e-commerce builds. Need a React partner? 🚀";
    }

    // Pricing & Services
    else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("rate") || lowerMessage.includes("budget") || lowerMessage.includes("quote") || lowerMessage.includes("estimate")) {
  return "💰 Pricing snapshot: Landing pages $200-500, business sites $500-1500, e-commerce $1000-3000, custom apps $1500+. Hourly rate $25-50. Includes responsive, SEO, performance, 30-day support, and source code. Need a tailored quote? Let's talk.";
    }

    // Project Timeline
    else if (lowerMessage.includes("timeline") || lowerMessage.includes("how long") || lowerMessage.includes("duration") || lowerMessage.includes("delivery") || lowerMessage.includes("when")) {
  return "⏰ Timelines: landing pages 3-7 days, business sites 1-3 weeks, e-commerce 2-6 weeks, custom apps 4-12 weeks. Flow: plan → design → build → test → launch. Rush work available with a 50% uplift. Need a deadline estimate?";
    }

    // Process & Workflow
    else if (lowerMessage.includes("process") || lowerMessage.includes("workflow") || lowerMessage.includes("how do you work") || lowerMessage.includes("methodology")) {
  return "🔄 Process: discovery call, proposal, design, development, testing, launch, plus 30 days of support. Expect regular updates and quick replies on Telegram, GitHub for code, Figma for visuals."
    }

    // Support & Maintenance
    else if (lowerMessage.includes("support") || lowerMessage.includes("maintenance") || lowerMessage.includes("help") || lowerMessage.includes("assistance") || lowerMessage.includes("after delivery")) {
  return "🤝 Support: 30 days of bug fixes, minor tweaks, and performance help included. Ongoing care from $50-200/month covers updates, security, new features, and monitoring. Reach me anytime via Telegram @President_Alein, email choengrayu307@gmail.com, or phone 096 998 3479.";
    }

    // Contact Information
    else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("get in touch")) {
  return "📞 Contact options: Telegram @President_Alein (fastest) or https://t.me/Choeng_Rayu, email choengrayu307@gmail.com, phone/WhatsApp +855 96 998 3479. Also on LinkedIn and Facebook. Telegram usually replies within an hour.";
    }

    // Specific contact methods
    else if (lowerMessage.includes("email")) {
  return "📧 Email: choengrayu307@gmail.com. Share your project, timeline, budget, and references for a quick reply (usually within 24 hours). Telegram is still the fastest route.";
    }

    else if (lowerMessage.includes("phone") || lowerMessage.includes("call") || lowerMessage.includes("លេខទូរស័ព្ទ")) {
  return "📱 Phone/WhatsApp: +855 96 998 3479. Available for voice or video, mainly 8 AM-8 PM GMT+7 (weekends lighter). Prefer a ping on Telegram first.";
    }

    else if (lowerMessage.includes("telegram")) {
  return "💬 Telegram: @President_Alein or https://t.me/Choeng_Rayu. Fast replies, easy file sharing, and perfect for quick voice notes or demos.";
    }

    else if (lowerMessage.includes("whatsapp")) {
  return "📱 WhatsApp: +855 96 998 3479 for quick questions, voice notes, and updates. Expect replies within a couple of hours during business time.";
    }

    // Social Media
    else if (lowerMessage.includes("linkedin")) {
  return "💼 LinkedIn: https://www.linkedin.com/in/rayu-choeng-351243335/ for experience highlights, projects, and testimonials. Feel free to connect.";
    }

    else if (lowerMessage.includes("facebook")) {
  return "📘 Facebook: Rayu Choeng (https://web.facebook.com/choeng.rayu.5) if you prefer Messenger or want project updates.";
    }

    else if (lowerMessage.includes("instagram")) {
  return "📸 Instagram is in the works—use Telegram, email, LinkedIn, or Facebook for now. Thanks for sticking around!";
    }

    // Projects & Portfolio
    else if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("portfolio") || lowerMessage.includes("example") || lowerMessage.includes("showcase")) {
  return "🚀 Projects include portfolio sites, e-commerce builds, real-time chats, landing pages, and full web apps. Browse the Projects section or ask for a specific example.";
    }

    // Experience & Background
    else if (lowerMessage.includes("experience") || lowerMessage.includes("background") || lowerMessage.includes("about") || lowerMessage.includes("who are you") || lowerMessage.includes("tell me about")) {
  return "👨‍💻 About Rayu: freelance web dev with 2+ years' experience, 50+ shipped projects, and a focus on React, responsive UX, performance, and clear client communication.";
    }

    // Technologies Deep Dive
    else if (lowerMessage.includes("javascript") || lowerMessage.includes("js")) {
  return "🟨 JavaScript: modern ES6+ practices, strong with React, Node, and Express for interactive, real-time, API-driven apps.";
    }

    else if (lowerMessage.includes("css") || lowerMessage.includes("styling") || lowerMessage.includes("design")) {
  return "🎨 CSS: fluent with Flexbox, Grid, animations, responsive design, and tooling like Tailwind, Bootstrap, and Styled Components—always aiming for accessible, fast UI.";
    }

    // Business & Freelancing
    else if (lowerMessage.includes("freelance") || lowerMessage.includes("business") || lowerMessage.includes("why choose") || lowerMessage.includes("advantage")) {
  return "💼 Why choose Rayu? Direct access to the developer, fair pricing, fast delivery, regular updates, and long-term support—backed by 50+ on-time projects.";
    }

    // Learning & Growth
    else if (lowerMessage.includes("learn") || lowerMessage.includes("tutorial") || lowerMessage.includes("teach") || lowerMessage.includes("course")) {
  return "📚 Mentoring offered: 1-on-1 coaching, code reviews, and project planning around web dev, React, JS, and freelancing. Starts around $30/hour.";
    }

    // Emergency & Urgent
    else if (lowerMessage.includes("urgent") || lowerMessage.includes("emergency") || lowerMessage.includes("asap") || lowerMessage.includes("rush") || lowerMessage.includes("immediately")) {
  return "🚨 Need urgent help? I'm available for rush fixes, same-day turnarounds, and critical bugs. Expect surcharges (≈50%+). Ping Telegram @President_Alein or call/WhatsApp +855 96 998 3479 for the fastest response.";
    }

    // Payment & Terms
    else if (lowerMessage.includes("payment") || lowerMessage.includes("pay") || lowerMessage.includes("invoice") || lowerMessage.includes("terms")) {
  return "💳 Payments: bank transfer, PayPal, Wise, crypto, or local methods. Typically 50% upfront for bigger projects (25% for smaller) and the rest on delivery, with net 7 invoicing.";
    }

    // Testimonials & Reviews
    else if (lowerMessage.includes("review") || lowerMessage.includes("testimonial") || lowerMessage.includes("feedback") || lowerMessage.includes("client") || lowerMessage.includes("reference")) {
  return "⭐ Clients highlight the communication, on-time delivery, and final polish. References and demos are available if you'd like proof.";
    }

    // Common Greetings & Politeness
    else if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("appreciate")) {
  return "😊 Happy to help! If you need more details, feel free to ask for service info, timelines, or a quote.";
    }

    else if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye") || lowerMessage.includes("see you") || lowerMessage.includes("talk later")) {
  return "👋 Thanks for visiting! Save the contact info and reach out anytime you need web help.";
    }

    // Default response with helpful suggestions
    else {
  return "🤔 I'm ready to help—ask about services, pricing, skills, timelines, urgent work, or support. Type keywords like \"contact\", \"pricing\", or \"skills\" to jump straight in.";
    }
  };

  // Scroll to the bottom of the messages div
  const scrollToBottom = (smooth = true) => {
    if (!messagesRef.current) return;

    const behavior = smooth ? "smooth" : "auto";
    const node = messagesRef.current;

    if (typeof node.scrollTo === "function") {
      node.scrollTo({ top: node.scrollHeight, behavior });
    } else {
      node.scrollTop = node.scrollHeight;
    }
  };

  useEffect(() => {
    if (!isChatOpen) return;
    scrollToBottom(messages.length > 1);
  }, [messages, isChatOpen]);

  // JSX structure
  const markup = (
    <>
      <div className="chatbot">
        {/* Chatbot Icon */}
        <div className="bot-icon" onClick={toggleChat}>
          <div className="icon-inner">
            <i className="fa fa-commenting" aria-hidden="true"></i>
          </div>
        </div>

        {/* Enhanced Chatbot Window */}
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="header-content">
                <img className="header-avatar" src={avatarUrl} alt="Assistant Avatar" />
                <div className="header-text">
                  <h4>Rayu's Assistant</h4>
                  <span className="status">Online • Ready to help! 🌟</span>
                </div>
              </div>
              <span className="close-icon" onClick={toggleChat}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            </div>
            <div className="chat-content">
              <div className="messages" ref={messagesRef}>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type}`}>
                    {msg.type === "bot" && (
                      <img className="avatar" src={avatarUrl} alt="Bot Avatar" />
                    )}
                    <div className="message-text">
                      {msg.qrCode ? (
                        <img src={msg.qrCode} alt="QR Code" />
                      ) : (
                        <div style={{ color: "black" }}>{msg.text}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="chat-input">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Send a message..."
                  className="input-field"
                />
                <button type="submit" className="send-button">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        /* Chatbot Container - MUST BE VISIBLE */
        .chatbot {
          position: fixed !important;
          bottom: 0 !important;
          right: 0 !important;
          top: auto !important;
          left: auto !important;
          z-index: 999999 !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          pointer-events: none;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: auto;
          height: auto;
          transform: none !important;
          clip: auto !important;
          clip-path: none !important;
        }

        .chatbot * {
          pointer-events: auto;
        }

        /* Chatbot Icon */
        .bot-icon {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          top: auto !important;
          left: auto !important;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          width: 70px;
          height: 70px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 999999 !important;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid rgba(255, 255, 255, 0.2);
          visibility: visible !important;
          opacity: 1 !important;
          transform: none !important;
          will-change: auto !important;
        }

        .bot-icon:hover {
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
        }

        @media (max-width: 768px) {
          .bot-icon:hover {
            transform: none !important;
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
          }
        }

        .icon-inner {
          color: white;
          font-size: 1.5rem;
          margin: 17px;
        }

        /* Chat Window */
        .chat-window {
          position: fixed !important;
          bottom: 100px !important;
          right: 20px !important;
          top: auto !important;
          left: auto !important;
          width: 380px;
          max-height: 500px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          display: flex !important;
          flex-direction: column;
          z-index: 999999 !important;
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          visibility: visible !important;
          opacity: 1 !important;
          transform: none !important;
          will-change: auto !important;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 20px 20px 0 0;
          position: relative;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .header-text h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .status {
          font-size: 12px;
          opacity: 0.9;
          margin: 0;
        }

        .close-icon {
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-icon:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .chat-content {
          display: flex;
          flex-direction: column;
          padding: 10px;
          overflow-y: auto;
        }

        .messages {
          overflow-y: auto;
          margin-bottom: 10px;
        }

        .message {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message.bot {
          justify-content: flex-start;
        }

        .message .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .message-text {
          max-width: 75%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          word-wrap: break-word;
          line-height: 1.4;
        }

        .message.bot .message-text {
          background: linear-gradient(135deg, #f8f9ff 0%, #e8ecff 100%);
          color: #2d3748;
          border-bottom-left-radius: 6px;
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .message.user .message-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-bottom-right-radius: 6px;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .text-content {
          white-space: pre-wrap;
          line-height: 1.5;
          font-size: 14px;
        }

        .text-content strong,
        .text-content b {
          font-weight: 600;
          color: #4a5568;
        }

        .message.user .text-content strong,
        .message.user .text-content b {
          color: rgba(255, 255, 255, 0.95);
        }

        .qr-code {
          max-width: 150px;
          border-radius: 8px;
        }

        /* Typing Indicator */
        .typing-message {
          opacity: 0.8;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 8px 0;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #667eea;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .chat-input {
          display: flex;
          align-items: center;
          padding: 10px;
          border-top: 1px solid #ddd;
        }

        .input-field {
          border: none;
          padding: 10px;
          border-radius: 20px;
          margin-right: 10px;
          background: #f1f1f1;
          color: black;
          flex: 1;
        }

        .send-button {
          background: #4caf50;
          border-radius: 10px;
          width: 50px;
          color: white;
          border: none;
          cursor: pointer;
        }

        .send-button:hover {
          background: #45a049;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .chatbot {
            position: fixed !important;
            z-index: 999999 !important;
            display: block !important;
            inset: 0 !important;
            top: auto !important;
            left: auto !important;
            bottom: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            pointer-events: none !important;
            transform: none !important;
            will-change: auto !important;
          }

          .bot-icon {
            position: fixed !important;
            width: 60px !important;
            height: 60px !important;
            right: 20px !important;
            bottom: 20px !important;
            left: auto !important;
            top: auto !important;
            z-index: 999999 !important;
            pointer-events: auto !important;
            transform: none !important;
            will-change: auto !important;
          }

          .icon-inner {
            font-size: 1.3rem;
          }

          .chat-window {
            position: fixed !important;
            width: calc(100vw - 40px) !important;
            max-width: 340px !important;
            bottom: 90px !important;
            right: 20px !important;
            left: auto !important;
            top: auto !important;
            max-height: 450px !important;
            z-index: 999999 !important;
            transform: none !important;
            will-change: auto !important;
          }

          .chat-header {
            padding: 14px 16px;
          }

          .header-avatar {
            width: 36px;
            height: 36px;
          }

          .header-text h4 {
            font-size: 15px;
          }

          .status {
            font-size: 11px;
          }

          .message-text {
            max-width: 80%;
            font-size: 13px;
          }

          .input-field {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .chatbot {
            position: fixed !important;
            z-index: 999999 !important;
            display: block !important;
          }

          .bot-icon {
            position: fixed !important;
            width: 55px !important;
            height: 55px !important;
            right: 15px !important;
            bottom: 15px !important;
            left: auto !important;
            top: auto !important;
            z-index: 999999 !important;
            pointer-events: auto !important;
            transform: none !important;
            will-change: auto !important;
          }

          .chat-window {
            position: fixed !important;
            width: calc(100vw - 30px) !important;
            bottom: 85px !important;
            right: 15px !important;
            left: auto !important;
            top: auto !important;
            max-height: 400px !important;
            z-index: 999999 !important;
            transform: none !important;
            will-change: auto !important;
          }

          .header-text h4 {
            font-size: 14px;
          }

          .message-text {
            padding: 10px 14px;
            font-size: 13px;
          }
        }

        /* Ensure fixed positioning overrides */
        .chatbot,
        .bot-icon,
        .chat-window {
          position: fixed !important;
          display: block !important;
          visibility: visible !important;
        }

        .bot-icon {
          display: flex !important;
        }

        .chat-window {
          display: flex !important;
        }
      `}</style>
    </>
  );

  if (!isMounted) return null;

  return createPortal(markup, document.body);
};

export default Chatbot;












// import "font-awesome/css/font-awesome.min.css";
// import React, { useState, useRef } from "react";
// import QRCode from "qrcode";
// import "./Chatbot.css"; // Assuming the CSS is in a separate file
// import "font-awesome/css/font-awesome.min.css";

// const Chatbot = () => {
//   // State management using useState
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const avatarUrl =
//     "https://w7.pngwing.com/pngs/408/238/png-transparent-pink-and-blue-illustration-discord-computer-icons-logo-user-internet-bot-discord-icon-purple-angle-violet-thumbnail.png";
  
//   // Ref for scrolling to the bottom of the messages
//   const messagesRef = useRef(null);

//   // Toggle chat window visibility
//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   // Handle sending a message
//   const sendMessage = async (e) => {
//     e.preventDefault();
//     const userMessage = message.trim();
//     if (!userMessage) return;

//     addMessage(userMessage, "user");

//     if (userMessage.toLowerCase().includes("qr")) {
//       const qrCode = await generateQRCode(userMessage);
//       addMessage(qrCode, "bot", true);
//     } else {
//       const botReply = getBotReply(userMessage);
//       setTimeout(() => {
//         addMessage(botReply, "bot");
//       }, 500);
//     }

//     setMessage("");
//   };

//   // Add a message to the messages array and scroll to bottom
//   const addMessage = (textOrQrCode, type, isQrCode = false) => {
//     const message = isQrCode
//       ? { qrCode: textOrQrCode, type }
//       : { text: textOrQrCode, type };
//     setMessages((prevMessages) => [...prevMessages, message]);
//     scrollToBottom();
//   };

//   // Generate QR code using the qrcode library
//   const generateQRCode = async (text) => {
//     try {
//       return await QRCode.toDataURL(text);
//     } catch (err) {
//       console.error("QR Code generation failed:", err);
//       return null;
//     }
//   };

//   // Determine bot reply based on user message
//   const getBotReply = (userMessage) => {
//     const lowerMessage = userMessage.toLowerCase();

//     if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
//       return "Hello! Welcome to my bot service. How can I assist you today?";
//     } else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
//       return "Our services vary in price depending on your requirements. Can you specify the service you're interested in?";
//     } else if (lowerMessage.includes("support") || lowerMessage.includes("help")) {
//       return "Our support team is available 24/7 to assist you. Please let us know the issue you're facing.";
//     } else if (lowerMessage.includes("email")) {
//       return "Here is our email: choengrayu307@gmail.com or you can click the header button contact to directly email me";
//     } else if (lowerMessage.includes("phone") || lowerMessage.includes("លេខទូរស័ព្ទ")) {
//       return "Here is our phone number: 096 998 3479 or telegram contact: https://t.me/Choeng_Rayu";
//     } else if (lowerMessage.includes("telegram")) {
//       return "Here is Telegram, you can use either: https://t.me/Choeng_Rayu/ or @President_Alein";
//     } else if (lowerMessage.includes("contact")) {
//       return "You can contact us via email, Telegram, phone, and LinkedIn.";
//     } else if (lowerMessage.includes("linkedin")) {
//       return "Here is our LinkedIn profile: https://www.linkedin.com/in/rayu-choeng-351243335/";
//     } else if (lowerMessage.includes("whatsapp")) {
//       return "Here is our WhatsApp number: +855 96 998 3479.";
//     } else if (lowerMessage.includes("facebook")) {
//       return "Here facebook: Rayu Choeng  or Click the link: https://web.facebook.com/choeng.rayu.5?_rdc=1&_rdr#";
//     } else if (lowerMessage.includes("instagram")) {
//       return "I will create account on Instagram soon but now please contact by another way.";
//     } else if (lowerMessage.includes("bye")) {
//       return "Goodbye! Feel free to chat with me again anytime.";
//     } else {
//       return "I'm here to help with your queries. Can you provide more details about what you're looking for?";
//     }
//   };

//   // Scroll to the bottom of the messages div
//   const scrollToBottom = () => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }
//   };

//   // JSX structure
//     return (
//     <>
//         <div className="chatbot">
//         {/* Chatbot Icon */}
//         <div className="bot-icon" onClick={toggleChat}>
//             <div className="icon-inner">
//             <i className="fa fa-commenting" aria-hidden="true"></i>
//             </div>
//         </div>

//         {/* Chatbot Window */}
//         {isChatOpen && (
//             <div className="chat-window">
//             <div className="chat-header">
//                 <span className="close-icon" onClick={toggleChat}>
//                 <i className="fa fa-window-close" aria-hidden="true"></i>
//                 </span>
//                 <h4>How can we help you?</h4>
//             </div>
//             <div className="chat-content">
//                 <div className="messages" ref={messagesRef}>
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`message ${msg.type}`}>
//                     {msg.type === "bot" && (
//                         <img className="avatar" src={avatarUrl} alt="Bot Avatar" />
//                     )}
//                     <div className="message-text">
//                         {msg.qrCode ? (
//                         <img src={msg.qrCode} alt="QR Code" />
//                         ) : (
//                         <div style={{ color: "black" }}>{msg.text}</div>
//                         )}
//                     </div>
//                     </div>
//                 ))}
//                 </div>
//                 <form onSubmit={sendMessage} className="chat-input">
//                 <input
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     type="text"
//                     placeholder="Send a message..."
//                     className="input-field"
//                 />
//                 <button type="submit" className="send-button">
//                     <i className="fa fa-paper-plane" aria-hidden="true"></i>
//                 </button>
//                 </form>
//             </div>
//             </div>
//         )}
//         </div>
//         <style jsx>{`
//         /* ...your styles here... */
//         /* Chatbot Icon */
//             .bot-icon {
//             position: fixed;
//             bottom: 15px;
//             left: 15px;
//             background: #3b4f69;
//             border-radius: 50%;
//             width: 60px;
//             height: 60px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             cursor: pointer;
//             z-index: 1000;
//             }

//             .icon-inner {
//             color: white;
//             font-size: 1.5rem;
//             margin: 17px;
//             }

//             /* Chat Window */
//             .chat-window {
//             position: fixed;
//             bottom: 80px;
//             left: 15px;
//             width: 320px;
//             background: white;
//             border-radius: 10px;
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//             display: flex;
//             flex-direction: column;
//             z-index: 1000;
//             }

//             .chat-header {
//             background: gray;
//             color: white;
//             padding: 10px;
//             justify-content: space-between;
//             align-items: center;
//             border-radius: 10px 10px 0 0;
//             }

//             .close-icon {
//             cursor: pointer;
//             }

//             .chat-content {
//             display: flex;
//             flex-direction: column;
//             padding: 10px;
//             overflow-y: auto;
//             }

//             .messages {
//             overflow-y: auto;
//             margin-bottom: 10px;
//             }

//             .message {
//             display: flex;
//             align-items: center;
//             margin-bottom: 10px;
//             }

//             .message.user {
//             justify-content: flex-end;
//             }

//             .message.bot {
//             justify-content: flex-start;
//             }

//             .message .avatar {
//             width: 30px;
//             height: 30px;
//             border-radius: 50%;
//             margin-right: 10px;
//             }

//             .message-text {
//             background: #f1f1f1;
//             border-radius: 15px;
//             padding: 10px;
//             max-width: 70%;
//             color: black !important;
//             }

//             .message.user .message-text {
//             background: #4caf50;
//             color: white;
//             }

//             /* Input Field */
//             .chat-input {
//             display: flex;
//             align-items: center;
//             padding: 10px;
//             border-top: 1px solid #ddd;
//             }

//             .input-field {
//             border: none;
//             padding: 10px;
//             border-radius: 20px;
//             margin-right: 10px;
//             background: #f1f1f1;
//             color: black;
//             }

//             .send-button {
//             background: #4caf50;
//             border-radius: 10px;
//             width: 50px;
//             color: white;
//             border: none;
//             cursor: pointer;
//             }

//             .send-button:hover {
//             background: #45a049;
//             }
//         `}</style>
//     </>
//     );

// };

// export default Chatbot;
