import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaPaperPlane, FaEnvelope, FaCommentAlt } from 'react-icons/fa';
import { MdDone, MdErrorOutline } from 'react-icons/md';

const Contact = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const contactRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceId = 'service_1dnzd0m';
      const templateId = 'template_lrjer9e';
      const publicKey = '0_aqMaQXOd-Aw0EPi';

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          user_email: formData.user_email,
          message: formData.message
        },
        publicKey
      );

      if (response.status === 200) {
        setStatus({
          submitted: true,
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({
          user_email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({
        submitted: true,
        success: false,
        message: 'Failed to send email. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={contactRef}
      className="contact-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="contact-container">
        {/* Decorative elements */}
        <div className="contact-decoration">
          <div className="contact-dots"></div>
          <div className="contact-glow"></div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-title"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="section-subtitle"
        >
          Have a project in mind or want to collaborate/ hire me ? Send me a message!
        </motion.p>

        {status.submitted && (
          <motion.div
            className={`status-message ${status.success ? 'success' : 'error'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {status.success ? <MdDone className="status-icon" /> : <MdErrorOutline className="status-icon" />}
            {status.message}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="contact-form"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <label htmlFor="user_email">
              <FaEnvelope className="input-icon" />
              Your Email
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <label htmlFor="message">
              <FaCommentAlt className="input-icon" />
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Hello, I'd like to talk about..."
              rows="5"
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {loading ? (
              'Sending...'
            ) : (
              <>
                <FaPaperPlane className="send-icon" />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>
      </div>

      <style jsx>{`
        .contact-section {
          width: 100%;
          padding: 80px 20px;
          position: relative;
        }

        .contact-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          border-radius: 20px;
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .contact-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .contact-dots {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.3;
        }

        .contact-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 15px;
          background: linear-gradient(90deg, #d4af37, #f4e5c2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }

        .section-subtitle {
          text-align: center;
          color: #aaa;
          margin-bottom: 40px;
          font-size: 1.1rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
          position: relative;
          z-index: 1;
        }

        .form-group {
          position: relative;
        }

        label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-weight: 500;
          color: #d4af37;
          font-size: 1.1rem;
        }

        .input-icon {
          font-size: 1.2rem;
        }

        input,
        textarea {
          width: 100%;
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          font-size: 1rem;
          background: rgba(30, 30, 30, 0.7);
          color: #f0f0f0;
          transition: all 0.3s ease;
        }

        input:focus,
        textarea:focus {
          border-color: #d4af37;
          background: rgba(40, 40, 40, 0.9);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
          outline: none;
        }

        textarea {
          min-height: 150px;
          resize: vertical;
        }

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #d4af37, #f4e5c2);
          color: #1a1a1a;
          padding: 15px 25px;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        button:hover {
          background: linear-gradient(135deg, #f4e5c2, #d4af37);
          box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
        }

        button:disabled {
          background: #555;
          color: #999;
          cursor: not-allowed;
          box-shadow: none;
        }

        .send-icon {
          font-size: 1.2rem;
        }

        .status-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 20px;
          margin-bottom: 25px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 500;
        }

        .success {
          background: rgba(40, 167, 69, 0.2);
          color: #28a745;
          border: 1px solid rgba(40, 167, 69, 0.3);
        }

        .error {
          background: rgba(220, 53, 69, 0.2);
          color: #dc3545;
          border: 1px solid rgba(220, 53, 69, 0.3);
        }

        .status-icon {
          font-size: 1.5rem;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .contact-container {
            padding: 30px;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-subtitle {
            font-size: 1rem;
            margin-bottom: 30px;
          }

          input,
          textarea {
            padding: 12px;
          }

          button {
            padding: 12px 20px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .contact-container {
            padding: 25px 20px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .contact-form {
            gap: 20px;
          }

          label {
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Contact;