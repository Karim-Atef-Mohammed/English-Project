import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 20
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        // FIXED: Changed problematic easing function
        ease: "easeOut", // Changed from cubic-bezier(0.6, 0.05, -0.01, 0.9)
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        // FIXED: Changed problematic easing function
        ease: "easeIn" // Changed from cubic-bezier(0.6, 0.05, -0.01, 0.9)
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;