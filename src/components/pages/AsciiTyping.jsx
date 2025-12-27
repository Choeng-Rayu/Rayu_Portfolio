import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AsciiTyping = ({ 
  className = '',
  typeSpeed = 10,
  pauseAfterComplete = 2000,
  cursorBlinkSpeed = 530 
}) => {
  const asciiArt = `
██████╗  █████╗ ██╗   ██╗██╗   ██╗     ██████╗██╗  ██╗ ██████╗ ███████╗███╗   ██╗ ██████╗ 
██╔══██╗██╔══██╗╚██╗ ██╔╝██║   ██║    ██╔════╝██║  ██║██╔═══██╗██╔════╝████╗  ██║██╔════╝ 
██████╔╝███████║ ╚████╔╝ ██║   ██║    ██║     ███████║██║   ██║█████╗  ██╔██╗ ██║██║  ███╗
██╔══██╗██╔══██║  ╚██╔╝  ██║   ██║    ██║     ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║██║   ██║
██║  ██║██║  ██║   ██║   ╚██████╔╝    ╚██████╗██║  ██║╚██████╔╝███████╗██║ ╚████║╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝      ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝`;

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Typing and deleting effect
  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(!isTyping);
      }, pauseAfterComplete);
      return () => clearTimeout(pauseTimeout);
    }

    if (isTyping) {
      // Typing forward
      if (currentIndex < asciiArt.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(asciiArt.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
      }
    } else {
      // Deleting backward
      if (currentIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentIndex(currentIndex - 1);
          setDisplayedText(asciiArt.slice(0, currentIndex - 1));
        }, typeSpeed / 2); // Delete faster than typing
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, pause before typing again
        setIsPaused(true);
      }
    }
  }, [currentIndex, isTyping, isPaused, asciiArt, typeSpeed, pauseAfterComplete]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);
    return () => clearInterval(interval);
  }, [cursorBlinkSpeed]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <pre style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        lineHeight: '1.2',
        color: '#00ff00',
        margin: 0,
        whiteSpace: 'pre',
        overflow: 'auto'
      }}>
        {displayedText}
        <span style={{ 
          opacity: showCursor ? 1 : 0,
          color: '#00ff00'
        }}>█</span>
      </pre>
    </motion.div>
  );
};

export default AsciiTyping;
