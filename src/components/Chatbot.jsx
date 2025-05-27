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
import "./Chatbot.css"; // Assuming the CSS is in a separate file
import "font-awesome/css/font-awesome.min.css";

const Chatbot = () => {
  // State management using useState
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const avatarUrl =
    "https://w7.pngwing.com/pngs/408/238/png-transparent-pink-and-blue-illustration-discord-computer-icons-logo-user-internet-bot-discord-icon-purple-angle-violet-thumbnail.png";
  
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

  // Determine bot reply based on user message
  const getBotReply = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Welcome to my bot service. How can I assist you today?";
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Our services vary in price depending on your requirements. Can you specify the service you're interested in?";
    } else if (lowerMessage.includes("support") || lowerMessage.includes("help")) {
      return "Our support team is available 24/7 to assist you. Please let us know the issue you're facing.";
    } else if (lowerMessage.includes("email")) {
      return "Here is our email: choengrayu307@gmail.com or you can click the header button contact to directly email me";
    } else if (lowerMessage.includes("phone") || lowerMessage.includes("លេខទូរស័ព្ទ")) {
      return "Here is our phone number: 096 998 3479 or telegram contact: https://t.me/Choeng_Rayu";
    } else if (lowerMessage.includes("telegram")) {
      return "Here is Telegram, you can use either: https://t.me/Choeng_Rayu/ or @President_Alein";
    } else if (lowerMessage.includes("contact")) {
      return "You can contact us via email, Telegram, phone, and LinkedIn.";
    } else if (lowerMessage.includes("linkedin")) {
      return "Here is our LinkedIn profile: https://www.linkedin.com/in/rayu-choeng-351243335/";
    } else if (lowerMessage.includes("whatsapp")) {
      return "Here is our WhatsApp number: +855 96 998 3479.";
    } else if (lowerMessage.includes("facebook")) {
      return "Here facebook: Rayu Choeng  or Click the link: https://web.facebook.com/choeng.rayu.5?_rdc=1&_rdr#";
    } else if (lowerMessage.includes("instagram")) {
      return "I will create account on Instagram soon but now please contact by another way.";
    } else if (lowerMessage.includes("bye")) {
      return "Goodbye! Feel free to chat with me again anytime.";
    } else {
      return "I'm here to help with your queries. Can you provide more details about what you're looking for?";
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

        {/* Chatbot Window */}
        {isChatOpen && (
            <div className="chat-window">
            <div className="chat-header">
                <span className="close-icon" onClick={toggleChat}>
                <i className="fa fa-window-close" aria-hidden="true"></i>
                </span>
                <h4>How can we help you?</h4>
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
        /* ...your styles here... */
        /* Chatbot Icon */
            .bot-icon {
            position: fixed;
            bottom: 15px;
            left: 15px;
            background: #3b4f69;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 1000;
            }

            .icon-inner {
            color: white;
            font-size: 1.5rem;
            margin: 17px;
            }

            /* Chat Window */
            .chat-window {
            position: fixed;
            bottom: 80px;
            left: 15px;
            width: 320px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            z-index: 1000;
            }

            .chat-header {
            background: gray;
            color: white;
            padding: 10px;
            justify-content: space-between;
            align-items: center;
            border-radius: 10px 10px 0 0;
            }

            .close-icon {
            cursor: pointer;
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
            background: #f1f1f1;
            border-radius: 15px;
            padding: 10px;
            max-width: 70%;
            color: black !important;
            }

            .message.user .message-text {
            background: #4caf50;
            color: white;
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



