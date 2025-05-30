// return (
//   <>
//     <div className="chatbot">
//       {/* Chatbot Icon */}
//       <div className="bot-icon" onClick={toggleChat}>
//         <div className="icon-inner">
//           <i className="fa fa-commenting" aria-hidden="true"></i>
//         </div>
//       </div>

//       {/* Chatbot Window */}
//       {isChatOpen && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <span className="close-icon" onClick={toggleChat}>
//               <i className="fa fa-window-close" aria-hidden="true"></i>
//             </span>
//             <h4>How can we help you?</h4>
//           </div>
//           <div className="chat-content">
//             <div className="messages" ref={messagesRef}>
//               {messages.map((msg, index) => (
//                 <div key={index} className={`message ${msg.type}`}>
//                   {msg.type === "bot" && (
//                     <img className="avatar" src={avatarUrl} alt="Bot Avatar" />
//                   )}
//                   <div className="message-text">
//                     {msg.qrCode ? (
//                       <img src={msg.qrCode} alt="QR Code" />
//                     ) : (
//                       <div style={{ color: "black" }}>{msg.text}</div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={sendMessage} className="chat-input">
//               <input
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 type="text"
//                 placeholder="Send a message..."
//                 className="input-field"
//               />
//               <button type="submit" className="send-button">
//                 <i className="fa fa-paper-plane" aria-hidden="true"></i>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//     <style jsx>{`
//       /* ...your styles here... */
//       /* Chatbot Icon */
//         .bot-icon {
//         position: fixed;
//         bottom: 15px;
//         left: 15px;
//         background: #3b4f69;
//         border-radius: 50%;
//         width: 60px;
//         height: 60px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         cursor: pointer;
//         z-index: 1000;
//         }

//         .icon-inner {
//         color: white;
//         font-size: 1.5rem;
//         margin: 17px;
//         }

//         /* Chat Window */
//         .chat-window {
//         position: fixed;
//         bottom: 80px;
//         left: 15px;
//         width: 320px;
//         background: white;
//         border-radius: 10px;
//         box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//         display: flex;
//         flex-direction: column;
//         z-index: 1000;
//         }

//         .chat-header {
//         background: gray;
//         color: white;
//         padding: 10px;
//         justify-content: space-between;
//         align-items: center;
//         border-radius: 10px 10px 0 0;
//         }

//         .close-icon {
//         cursor: pointer;
//         }

//         .chat-content {
//         display: flex;
//         flex-direction: column;
//         padding: 10px;
//         overflow-y: auto;
//         }

//         .messages {
//         overflow-y: auto;
//         margin-bottom: 10px;
//         }

//         .message {
//         display: flex;
//         align-items: center;
//         margin-bottom: 10px;
//         }

//         .message.user {
//         justify-content: flex-end;
//         }

//         .message.bot {
//         justify-content: flex-start;
//         }

//         .message .avatar {
//         width: 30px;
//         height: 30px;
//         border-radius: 50%;
//         margin-right: 10px;
//         }

//         .message-text {
//         background: #f1f1f1;
//         border-radius: 15px;
//         padding: 10px;
//         max-width: 70%;
//         color: black !important;
//         }

//         .message.user .message-text {
//         background: #4caf50;
//         color: white;
//         }

//         /* Input Field */
//         .chat-input {
//         display: flex;
//         align-items: center;
//         padding: 10px;
//         border-top: 1px solid #ddd;
//         }

//         .input-field {
//         border: none;
//         padding: 10px;
//         border-radius: 20px;
//         margin-right: 10px;
//         background: #f1f1f1;
//         color: black;
//         }

//         .send-button {
//         background: #4caf50;
//         border-radius: 10px;
//         width: 50px;
//         color: white;
//         border: none;
//         cursor: pointer;
//         }

//         .send-button:hover {
//         background: #45a049;
//         }
//     `}</style>
//   </>
// );



















import React, { useState, useRef } from "react";
import QRCode from "qrcode";
// import "./Chatbot.css"; // Assuming the CSS is in a separate file
import "font-awesome/css/font-awesome.min.css";

const Chatbot = () => {
  // State management using useState
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "👋 **Welcome to Rayu's Portfolio!**\n\nI'm your friendly assistant, ready to help with any questions about:\n\n🌐 **Web Development Services**\n💰 **Pricing & Quotes**\n⚛️ **React.js Expertise**\n📞 **Contact Information**\n🚀 **Project Examples**\n⏰ **Timelines & Process**\n\n💡 **Try asking:**\n• \"What services do you offer?\"\n• \"How much does a website cost?\"\n• \"Contact information\"\n• \"Tell me about your experience\"\n\nHow can I help you today? 😊",
      type: "bot"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const avatarUrl = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";

  // Ref for scrolling to the bottom of the messages
  const messagesRef = useRef(null);

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
    scrollToBottom();
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
        "Hello there! 😊 Welcome to Rayu's portfolio! How can I help you today?",
        "Hi! 👋 Great to see you here! What would you like to know about Rayu?",
        "Hey! 🌟 I'm excited to help you learn more about Rayu's work!",
        "Good to see you! 🎉 I'm here to answer any questions about Rayu's services and projects!"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Web Development Services
    else if (lowerMessage.includes("web development") || lowerMessage.includes("website") || lowerMessage.includes("web design") || lowerMessage.includes("frontend") || lowerMessage.includes("backend")) {
      return "🌐 **Web Development Services:**\n\n✨ **Frontend Development:**\n• React.js applications\n• Responsive design\n• Modern UI/UX\n• Interactive animations\n\n🔧 **Backend Development:**\n• API development\n• Database integration\n• Server setup\n\n💼 **Full-Stack Solutions:**\n• Complete web applications\n• E-commerce sites\n• Portfolio websites\n• Business websites\n\nWant to discuss your project? Let's connect! 🚀";
    }

    // Technologies & Skills
    else if (lowerMessage.includes("skills") || lowerMessage.includes("technology") || lowerMessage.includes("tech stack") || lowerMessage.includes("programming") || lowerMessage.includes("languages")) {
      return "💻 **Rayu's Technical Skills:**\n\n🎨 **Frontend:**\n• React.js & Next.js\n• JavaScript (ES6+)\n• HTML5 & CSS3\n• Tailwind CSS\n• Bootstrap\n• Framer Motion\n\n⚙️ **Backend:**\n• Node.js\n• Express.js\n• MongoDB\n• MySQL\n• RESTful APIs\n\n🛠️ **Tools & Others:**\n• Git & GitHub\n• VS Code\n• Figma\n• Responsive Design\n• Performance Optimization\n\nCheck the Skills section for more details! 📊";
    }

    // React specific
    else if (lowerMessage.includes("react") || lowerMessage.includes("jsx") || lowerMessage.includes("component")) {
      return "⚛️ **React Development Expertise:**\n\n🔥 **Specializations:**\n• Custom React components\n• State management (useState, useEffect)\n• React Hooks\n• Component lifecycle\n• Props and state handling\n• Event handling\n• Conditional rendering\n\n🎯 **React Projects:**\n• Interactive portfolios\n• Dynamic web applications\n• Real-time chat systems\n• E-commerce platforms\n\nNeed a React developer? Rayu's got you covered! 🚀";
    }

    // Pricing & Services
    else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("rate") || lowerMessage.includes("budget") || lowerMessage.includes("quote") || lowerMessage.includes("estimate")) {
      return "💰 **Pricing Information:**\n\n📋 **Service Types:**\n• Simple Landing Page: $200-500\n• Business Website: $500-1500\n• E-commerce Site: $1000-3000\n• Custom Web App: $1500-5000+\n\n⏱️ **Hourly Rate:** $25-50/hour\n\n🎁 **What's Included:**\n• Responsive design\n• SEO optimization\n• Performance optimization\n• 30 days support\n• Source code\n\n💬 **Custom Quote:** Every project is unique! Contact Rayu for a personalized quote based on your specific needs.\n\n📞 Ready to discuss? Let's talk!";
    }

    // Project Timeline
    else if (lowerMessage.includes("timeline") || lowerMessage.includes("how long") || lowerMessage.includes("duration") || lowerMessage.includes("delivery") || lowerMessage.includes("when")) {
      return "⏰ **Project Timeline:**\n\n🚀 **Typical Delivery Times:**\n• Landing Page: 3-7 days\n• Business Website: 1-3 weeks\n• E-commerce Site: 2-6 weeks\n• Custom Web App: 4-12 weeks\n\n📅 **Process:**\n1. **Planning** (1-2 days)\n2. **Design** (2-5 days)\n3. **Development** (varies)\n4. **Testing** (1-3 days)\n5. **Deployment** (1 day)\n\n⚡ **Rush Jobs:** Available with 50% surcharge\n\n📞 Need it faster? Let's discuss your deadline!";
    }

    // Process & Workflow
    else if (lowerMessage.includes("process") || lowerMessage.includes("workflow") || lowerMessage.includes("how do you work") || lowerMessage.includes("methodology")) {
      return "🔄 **Development Process:**\n\n📋 **Step-by-Step:**\n1. **Discovery Call** - Understanding your needs\n2. **Proposal** - Detailed plan & quote\n3. **Design Phase** - Mockups & wireframes\n4. **Development** - Coding your solution\n5. **Testing** - Quality assurance\n6. **Launch** - Going live!\n7. **Support** - 30 days included\n\n💬 **Communication:**\n• Daily progress updates\n• Weekly milestone reviews\n• 24/7 availability via Telegram\n\n🔧 **Tools Used:**\n• GitHub for version control\n• Figma for design\n• Slack/Telegram for communication\n\nTransparent and professional! 🌟";
    }

    // Support & Maintenance
    else if (lowerMessage.includes("support") || lowerMessage.includes("maintenance") || lowerMessage.includes("help") || lowerMessage.includes("assistance") || lowerMessage.includes("after delivery")) {
      return "🤝 **Support & Maintenance:**\n\n✅ **Included Support (30 days):**\n• Bug fixes\n• Minor content updates\n• Performance optimization\n• Technical assistance\n\n🔧 **Extended Support Options:**\n• Monthly maintenance: $50-200/month\n• Content updates\n• Security updates\n• Feature additions\n• Performance monitoring\n\n📞 **24/7 Emergency Support:**\n• Critical bug fixes\n• Server issues\n• Security concerns\n\n💬 **How to Get Help:**\n• Telegram: @President_Alein\n• Email: choengrayu307@gmail.com\n• Phone: 096 998 3479\n\nYour success is my priority! 🌟";
    }

    // Contact Information
    else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("get in touch")) {
      return "📞 **Contact Rayu:**\n\n🚀 **Quick Response:**\n💬 Telegram: @President_Alein\n🔗 https://t.me/Choeng_Rayu\n\n📧 **Email:**\nchoengrayu307@gmail.com\n\n📱 **Phone/WhatsApp:**\n+855 96 998 3479\n\n🌐 **Social Media:**\n💼 LinkedIn: https://www.linkedin.com/in/rayu-choeng-351243335/\n📘 Facebook: Rayu Choeng\n\n⚡ **Best Response Time:**\nTelegram (within 1 hour) > Email (within 24 hours)\n\nLet's build something amazing together! 🚀";
    }

    // Specific contact methods
    else if (lowerMessage.includes("email")) {
      return "📧 **Email Contact:**\n\n✉️ **Primary Email:**\nchoengrayu307@gmail.com\n\n📝 **What to Include:**\n• Project description\n• Timeline requirements\n• Budget range\n• Reference websites (if any)\n\n⏱️ **Response Time:** Within 24 hours\n\n💡 **Tip:** For faster response, try Telegram! 💬\n\nOr click the contact button in the header! ✨";
    }

    else if (lowerMessage.includes("phone") || lowerMessage.includes("call") || lowerMessage.includes("លេខទូរស័ព្ទ")) {
      return "📱 **Phone Contact:**\n\n☎️ **Phone Number:**\n+855 96 998 3479\n\n💬 **Also Available on:**\n• WhatsApp\n• Telegram\n• Voice calls\n• Video calls\n\n🕐 **Best Calling Hours:**\n• Monday-Friday: 8 AM - 8 PM (GMT+7)\n• Saturday: 9 AM - 6 PM\n• Sunday: Emergency only\n\n💡 **Prefer messaging first?** Send a quick message on Telegram! 🚀";
    }

    else if (lowerMessage.includes("telegram")) {
      return "💬 **Telegram Contact:**\n\n🚀 **Username:** @President_Alein\n🔗 **Direct Link:** https://t.me/Choeng_Rayu\n\n⚡ **Why Telegram?**\n• Fastest response (usually within 1 hour)\n• File sharing capabilities\n• Voice messages\n• Screen sharing for demos\n• Available 24/7\n\n📱 **Features:**\n• Send project files\n• Quick voice notes\n• Real-time updates\n• Secure messaging\n\nPreferred communication method! 🌟";
    }

    else if (lowerMessage.includes("whatsapp")) {
      return "📱 **WhatsApp Contact:**\n\n💚 **Number:** +855 96 998 3479\n\n✨ **Perfect For:**\n• Quick questions\n• Voice messages\n• File sharing\n• Video calls\n• Project updates\n\n🕐 **Response Time:**\n• Business hours: Within 2 hours\n• After hours: Next business day\n\n💡 **Pro Tip:** Save the number and send a message introducing your project! 🚀";
    }

    // Social Media
    else if (lowerMessage.includes("linkedin")) {
      return "💼 **LinkedIn Profile:**\n\n🔗 **Connect Here:**\nhttps://www.linkedin.com/in/rayu-choeng-351243335/\n\n🌟 **What You'll Find:**\n• Professional experience\n• Project showcases\n• Client testimonials\n• Industry insights\n• Networking opportunities\n\n💡 **Great For:**\n• Professional networking\n• Business inquiries\n• Career discussions\n• Industry connections\n\nLet's connect professionally! 🤝";
    }

    else if (lowerMessage.includes("facebook")) {
      return "📘 **Facebook Profile:**\n\n👤 **Name:** Rayu Choeng\n🔗 **Profile:** https://web.facebook.com/choeng.rayu.5\n\n📱 **Also Available:**\n• Facebook Messenger\n• Posts about projects\n• Behind-the-scenes content\n• Community updates\n\n💬 **Messenger Response:** Within 24 hours\n\nStay connected! ✨";
    }

    else if (lowerMessage.includes("instagram")) {
      return "📸 **Instagram Update:**\n\n🚧 **Coming Soon!** Instagram account is in development\n\n📱 **What to Expect:**\n• Project showcases\n• Development process\n• Behind-the-scenes content\n• Tips & tutorials\n• Client success stories\n\n💬 **For Now, Use:**\n• Telegram (fastest)\n• Email\n• LinkedIn\n• Facebook\n\nThanks for your patience! 😊";
    }

    // Projects & Portfolio
    else if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("portfolio") || lowerMessage.includes("example") || lowerMessage.includes("showcase")) {
      return "🚀 **Rayu's Projects & Portfolio:**\n\n💼 **Featured Projects:**\n• Interactive Portfolio Website\n• E-commerce Platform\n• Real-time Chat Application\n• Business Landing Pages\n• Custom Web Applications\n\n🎯 **Project Types:**\n• Personal portfolios\n• Business websites\n• E-commerce stores\n• Web applications\n• Landing pages\n• Blogs & CMS\n\n🔍 **Check Out:**\n• Projects section on this website\n• GitHub repositories\n• Live demos available\n\n💡 **Want to see specific examples?** Ask about any project type! ✨";
    }

    // Experience & Background
    else if (lowerMessage.includes("experience") || lowerMessage.includes("background") || lowerMessage.includes("about") || lowerMessage.includes("who are you") || lowerMessage.includes("tell me about")) {
      return "👨‍💻 **About Rayu:**\n\n🎓 **Background:**\n• Passionate web developer\n• Freelance professional\n• Modern technology enthusiast\n• Problem-solving focused\n\n💪 **Experience:**\n• 2+ years in web development\n• 50+ successful projects\n• Happy clients worldwide\n• Continuous learning mindset\n\n🌟 **Specialties:**\n• React.js development\n• Responsive design\n• User experience (UX)\n• Performance optimization\n• Client communication\n\n🎯 **Mission:** Creating amazing web experiences that help businesses grow! 🚀";
    }

    // Technologies Deep Dive
    else if (lowerMessage.includes("javascript") || lowerMessage.includes("js")) {
      return "🟨 **JavaScript Expertise:**\n\n⚡ **Modern JavaScript (ES6+):**\n• Arrow functions\n• Destructuring\n• Async/await\n• Promises\n• Modules\n• Template literals\n\n🔧 **Frameworks & Libraries:**\n• React.js (primary)\n• Node.js\n• Express.js\n• jQuery (when needed)\n\n🎯 **Applications:**\n• Interactive web apps\n• API integrations\n• Real-time features\n• Dynamic content\n• Form validations\n\nJavaScript powers the modern web! 🌐";
    }

    else if (lowerMessage.includes("css") || lowerMessage.includes("styling") || lowerMessage.includes("design")) {
      return "🎨 **CSS & Design Skills:**\n\n✨ **CSS Technologies:**\n• CSS3 & Flexbox\n• CSS Grid\n• Animations & Transitions\n• Responsive design\n• Mobile-first approach\n\n🎯 **Frameworks:**\n• Tailwind CSS\n• Bootstrap\n• Material-UI\n• Styled Components\n\n🖌️ **Design Principles:**\n• User-centered design\n• Accessibility (WCAG)\n• Performance optimization\n• Cross-browser compatibility\n\nBeautiful and functional designs! 🌟";
    }

    // Business & Freelancing
    else if (lowerMessage.includes("freelance") || lowerMessage.includes("business") || lowerMessage.includes("why choose") || lowerMessage.includes("advantage")) {
      return "💼 **Why Choose Rayu?**\n\n🌟 **Advantages:**\n• Direct communication (no middleman)\n• Competitive pricing\n• Fast turnaround times\n• Personalized service\n• 100% satisfaction guarantee\n\n🤝 **Client Benefits:**\n• Dedicated developer\n• Flexible working hours\n• Regular updates\n• Post-launch support\n• Long-term partnership\n\n📈 **Success Metrics:**\n• 98% client satisfaction\n• 100% on-time delivery\n• 50+ completed projects\n• 24/7 availability\n\nYour success is my success! 🚀";
    }

    // Learning & Growth
    else if (lowerMessage.includes("learn") || lowerMessage.includes("tutorial") || lowerMessage.includes("teach") || lowerMessage.includes("course")) {
      return "📚 **Learning & Teaching:**\n\n🎓 **Available Services:**\n• One-on-one mentoring\n• Code reviews\n• Technical consultations\n• Best practices guidance\n• Career advice\n\n💡 **Topics Covered:**\n• Web development basics\n• React.js fundamentals\n• JavaScript concepts\n• Project planning\n• Freelancing tips\n\n⏰ **Mentoring Rates:**\n• $30/hour for 1-on-1 sessions\n• Group sessions available\n• Custom learning plans\n\nLet's grow together! 🌱";
    }

    // Emergency & Urgent
    else if (lowerMessage.includes("urgent") || lowerMessage.includes("emergency") || lowerMessage.includes("asap") || lowerMessage.includes("rush") || lowerMessage.includes("immediately")) {
      return "🚨 **Urgent Project Support:**\n\n⚡ **Emergency Services:**\n• 24/7 availability\n• Same-day fixes\n• Rush project delivery\n• Critical bug resolution\n\n💰 **Rush Pricing:**\n• 50% surcharge for urgent work\n• Same-day delivery: +100%\n• Weekend work: +25%\n\n📞 **Immediate Contact:**\n• Telegram: @President_Alein (fastest)\n• Phone: +855 96 998 3479\n• WhatsApp: Same number\n\n⏱️ **Response Time:** Within 30 minutes for emergencies\n\nI've got your back! 🛡️";
    }

    // Payment & Terms
    else if (lowerMessage.includes("payment") || lowerMessage.includes("pay") || lowerMessage.includes("invoice") || lowerMessage.includes("terms")) {
      return "💳 **Payment Information:**\n\n💰 **Payment Methods:**\n• Bank transfer\n• PayPal\n• Wise (Transferwise)\n• Cryptocurrency (Bitcoin, USDT)\n• Local payment methods\n\n📋 **Payment Terms:**\n• 50% upfront for projects >$500\n• 25% upfront for smaller projects\n• Final payment on completion\n• Net 7 days for invoices\n\n🔒 **Security:**\n• Secure payment processing\n• Invoice-based billing\n• Payment protection\n• Refund policy available\n\nFlexible and secure! 💪";
    }

    // Testimonials & Reviews
    else if (lowerMessage.includes("review") || lowerMessage.includes("testimonial") || lowerMessage.includes("feedback") || lowerMessage.includes("client") || lowerMessage.includes("reference")) {
      return "⭐ **Client Testimonials:**\n\n🌟 **Recent Feedback:**\n\"Excellent work and communication!\" - Sarah M.\n\"Delivered exactly what we needed, on time!\" - John D.\n\"Professional and skilled developer\" - Mike R.\n\n📊 **Ratings:**\n• Quality: ⭐⭐⭐⭐⭐ (5/5)\n• Communication: ⭐⭐⭐⭐⭐ (5/5)\n• Timeliness: ⭐⭐⭐⭐⭐ (5/5)\n• Value: ⭐⭐⭐⭐⭐ (5/5)\n\n💼 **References Available:**\n• Previous client contacts\n• Project case studies\n• Live project demos\n\nYour satisfaction guaranteed! 🎯";
    }

    // Common Greetings & Politeness
    else if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("appreciate")) {
      return "😊 **You're Very Welcome!**\n\n🙏 Thank you for your interest in Rayu's services!\n\n💡 **Need More Help?**\n• Ask about specific services\n• Request a project quote\n• Schedule a consultation\n• Get technical advice\n\n📞 **Ready to Start?**\nLet's discuss your project! Contact Rayu anytime.\n\nHappy to help! ✨";
    }

    else if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye") || lowerMessage.includes("see you") || lowerMessage.includes("talk later")) {
      return "👋 **Goodbye & Thank You!**\n\n🌟 Thanks for visiting Rayu's portfolio!\n\n📞 **Before You Go:**\n• Save contact information\n• Follow on social media\n• Bookmark this website\n• Share with friends who need web development\n\n💬 **Remember:**\nI'm always here to help with your web development needs!\n\nHave a wonderful day! 🌈";
    }

    // Default response with helpful suggestions
    else {
      return "🤔 **I'd love to help you with that!**\n\n💡 **Popular Questions:**\n• \"What services do you offer?\"\n• \"How much does a website cost?\"\n• \"What's your experience with React?\"\n• \"How long does a project take?\"\n• \"Can you help with urgent projects?\"\n• \"What's included in your support?\"\n\n📞 **Quick Actions:**\n• Type \"contact\" for all contact info\n• Type \"pricing\" for service costs\n• Type \"skills\" for technical abilities\n• Type \"process\" for how I work\n\n💬 **Or ask me anything specific about web development!**\n\nI'm here to help! 🚀";
    }
  };

  // Scroll to the bottom of the messages div
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  // JSX structure
    return (
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
        /* Chatbot Container */
        .chatbot {
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 1000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Chatbot Icon */
        .bot-icon {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          width: 70px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 1001;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .bot-icon:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
        }

            .icon-inner {
            color: white;
            font-size: 1.5rem;
            margin: 17px;
            }

        /* Chat Window */
        .chat-window {
          position: fixed;
          bottom: 100px;
          left: 20px;
          width: 380px;
          max-height: 500px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

            /* Input Field */
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
        `}</style>
    </>
    );

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
