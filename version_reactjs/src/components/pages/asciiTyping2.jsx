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
  const [isComplete, setIsComplete] = useState(false);

  // Typing effect
  useEffect(() => {
    if (currentIndex < asciiArt.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(asciiArt.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typeSpeed);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      // After completing, wait and then restart
      const restartTimeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentIndex(0);
        setIsComplete(false);
      }, pauseAfterComplete);
      return () => clearTimeout(restartTimeout);
    }
  }, [currentIndex, isComplete, asciiArt, typeSpeed, pauseAfterComplete]);

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
