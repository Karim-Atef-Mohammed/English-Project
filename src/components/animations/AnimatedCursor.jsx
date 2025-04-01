import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    const handleLinkEnter = () => setCursorVariant('link');
    const handleLinkLeave = () => setCursorVariant('default');
    const handleButtonEnter = () => setCursorVariant('button');
    const handleButtonLeave = () => setCursorVariant('default');
    const handleInputEnter = () => setCursorVariant('input');
    const handleInputLeave = () => setCursorVariant('default');
    
    window.addEventListener('mousemove', mouseMove);
    
    // Select all interactive elements
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    const inputs = document.querySelectorAll('input, textarea, select');
    
    // Add event listeners
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkEnter);
      link.addEventListener('mouseleave', handleLinkLeave);
    });
    
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', handleButtonEnter);
      button.addEventListener('mouseleave', handleButtonLeave);
    });
    
    inputs.forEach((input) => {
      input.addEventListener('mouseenter', handleInputEnter);
      input.addEventListener('mouseleave', handleInputLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkEnter);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
      
      buttons.forEach((button) => {
        button.removeEventListener('mouseenter', handleButtonEnter);
        button.removeEventListener('mouseleave', handleButtonLeave);
      });
      
      inputs.forEach((input) => {
        input.removeEventListener('mouseenter', handleInputEnter);
        input.removeEventListener('mouseleave', handleInputLeave);
      });
    };
  }, []);
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'difference'
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid rgba(215, 18, 255, 0.8)',
      mixBlendMode: 'normal'
    },
    button: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid rgba(12, 135, 232, 0.8)',
      mixBlendMode: 'normal'
    },
    input: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 24,
      height: 24,
      width: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      border: 'none',
      mixBlendMode: 'difference'
    }
  };
  
  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 28,
  };
  
  return (
    <>
      <motion.div
        className="cursor-dot"
        variants={variants}
        animate={cursorVariant}
        transition={spring}
        style={{
          position: 'fixed',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <motion.div
        className="cursor-dot-outline"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 40,
          mass: 0.5
        }}
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
};

export default AnimatedCursor;