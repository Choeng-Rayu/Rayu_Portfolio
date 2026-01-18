import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';

const TextAnimation = ({
  strings = [],
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  showCursor = true,
  cursorChar = '$',
  className = '',
  motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 }
  }
}) => {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    if (!strings.length) return;

    const options = {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      showCursor,
      cursorChar,
    };

    if (el.current) {
      typed.current = new Typed(el.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [strings, typeSpeed, backSpeed, loop, showCursor, cursorChar]);

  return (
    <motion.span
      ref={el}
      className={className}
      {...motionProps} // Framer Motion props
    />
  );
};

export default TextAnimation;