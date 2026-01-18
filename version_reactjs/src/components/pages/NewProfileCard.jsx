import React from 'react';
import { motion } from 'framer-motion';
import './NewProfileCard.css';

const NewProfileCard = ({ 
  name = "Choeng Rayu", 
  title = "Software Engineer",
  avatarUrl,
  onContactClick
}) => {
  return (
    <motion.div 
      className="new-profile-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background Gradient */}
      <div className="card-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* Header Section */}
        <motion.div 
          className="card-header"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="avatar-container">
            <div className="avatar-ring"></div>
            <img src={avatarUrl} alt={name} className="avatar-image" />
            <div className="status-indicator"></div>
          </div>
          
          <div className="user-info">
            <h2 className="user-name">{name}</h2>
            <p className="user-title">{title}</p>
          </div>
        </motion.div>

        {/* Contact Button */}
        <motion.button 
          className="contact-button"
          onClick={onContactClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
          <span className="button-arrow">→</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NewProfileCard;
