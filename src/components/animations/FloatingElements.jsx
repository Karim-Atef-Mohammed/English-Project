import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  // OPTIMIZED: Reduced from 20 to 10 elements
  const elements = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 50 + 10,
    blur: Math.random() * 10 + 5,
    opacity: Math.random() * 0.15 + 0.05,
    // Longer animation durations for smoother transitions
    duration: Math.random() * 35 + 25,
    delay: Math.random() * 5,
    type: Math.random() > 0.7 ? 'circle' : Math.random() > 0.5 ? 'square' : 'triangle',
    color: [
      'rgba(12, 135, 232, 0.3)',
      'rgba(215, 18, 255, 0.3)',
      'rgba(10, 191, 229, 0.3)',
      'rgba(247, 37, 133, 0.3)'
    ][Math.floor(Math.random() * 4)]
  }));
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          initial={{
            x: `${element.x}vw`,
            y: `${element.y}vh`,
            opacity: 0
          }}
          animate={{
            x: [
              `${element.x}vw`,
              `${element.x + (Math.random() * 10 - 5)}vw`, // Reduced movement range
              `${element.x}vw`
            ],
            y: [
              `${element.y}vh`,
              `${element.y + (Math.random() * 10 - 5)}vh`, // Reduced movement range
              `${element.y}vh`
            ],
            opacity: element.opacity
          }}
          transition={{
            repeat: Infinity,
            duration: element.duration,
            ease: "linear", // Changed to linear for less CPU usage
            delay: element.delay,
            repeatType: "reverse"
          }}
          style={{
            position: 'absolute',
            width: element.size,
            height: element.size,
            filter: `blur(${element.blur}px)`,
            backgroundColor: element.type !== 'triangle' ? element.color : 'transparent',
            borderRadius: element.type === 'circle' ? '50%' : element.type === 'square' ? '0' : '0',
            mixBlendMode: 'plus-lighter',
            clipPath: element.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            border: element.type === 'triangle' ? `solid ${element.color}` : 'none'
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;