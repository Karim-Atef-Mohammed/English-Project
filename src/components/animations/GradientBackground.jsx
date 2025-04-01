import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GradientBackground = () => {
  const canvasRef = useRef(null);
  const colors = useRef([
    { r: 12, g: 135, b: 232 },   // Blue
    { r: 215, g: 18, b: 255 },   // Purple
    { r: 10, g: 191, b: 229 },   // Cyan
    { r: 247, g: 37, b: 133 }    // Pink
  ]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let mouseX = 0.5;
    let mouseY = 0.5;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Throttle mouse movement to improve performance
    let lastMove = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMove > 50) { // Only update every 50ms
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        lastMove = now;
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    
    // Reduce render complexity
    const render = (time) => {
      const t = time * 0.0003; // Slower animation
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient
      const gradient = ctx.createRadialGradient(
        canvas.width * (mouseX * 0.3 + 0.35),
        canvas.height * (mouseY * 0.3 + 0.35),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      
      // Animate colors with less complexity
      colors.current.forEach((color, i) => {
        const position = i / (colors.current.length - 1);
        // Reduced noise effect
        const noise = Math.sin(t + i) * 0.03; 
        
        // Ensure position + noise is between 0 and 1
        const colorStopPosition = Math.max(0.05, Math.min(0.95, position + noise));
        
        gradient.addColorStop(
          colorStopPosition,
          `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`
        );
      });
      
      // Fill background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // OPTIMIZATION: Skip pixel manipulation for better performance
      // Just update less frequently
      if (Math.floor(time / 1000) % 3 === 0) { // Only apply noise effect every 3 seconds
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Process far fewer pixels (only 1 in 500)
        for (let i = 0; i < data.length; i += 500) {
          const noise = Math.random() * 5 - 2.5;
          data[i] = Math.max(0, Math.min(255, data[i] + noise));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default GradientBackground;