import React, { useState, useEffect } from 'react';

const AsciiTyping = ({ 
  className = '',
  typeSpeed = 10,
  pauseAfterComplete = 5000,
  cursorBlinkSpeed = 530,
  asciiArt = ''
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset animation when ASCII art changes (when selection changes)
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setIsDeleting(false);
  }, [asciiArt]);

  // Typing and looping effect
  useEffect(() => {
    if (!asciiArt) return;

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting phase
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(asciiArt.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, typeSpeed / 2);
      } else {
        // Start typing again
        setIsDeleting(false);
        setIsComplete(false);
      }
    } else {
      // Typing phase
      if (currentIndex < asciiArt.length) {
        timeout = setTimeout(() => {
          setDisplayedText(asciiArt.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, typeSpeed);
      } else if (!isComplete) {
        // Finished typing, pause then start deleting
        setIsComplete(true);
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseAfterComplete);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isComplete, isDeleting, asciiArt, typeSpeed, pauseAfterComplete]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);
    return () => clearInterval(interval);
  }, [cursorBlinkSpeed]);

  return (
    <div className={className} style={{ color: '#00d4ff' }}>
      <pre className="font-mono text-sm leading-tight m-0 p-0 whitespace-pre overflow-auto" style={{ color: '#00d4ff' }}>
        {displayedText}
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#00d4ff' }}>█</span>
      </pre>
    </div>
  );
};

export default AsciiTyping;
