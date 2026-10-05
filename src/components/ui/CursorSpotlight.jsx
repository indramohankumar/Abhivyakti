import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CursorSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // If hovering over a button, link, or clickable card, increase the spotlight size
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Only show on non-touch devices (desktop)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen"
      animate={{
        x: mousePosition.x - (isHovering ? 150 : 200),
        y: mousePosition.y - (isHovering ? 150 : 200),
        width: isHovering ? 300 : 400,
        height: isHovering ? 300 : 400,
      }}
      transition={{
        type: "tween",
        ease: "backOut",
        duration: 0.15
      }}
      style={{
        background: isHovering 
          ? 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0) 70%)'
          : 'radial-gradient(circle, rgba(255,183,3,0.08) 0%, rgba(255,107,53,0) 70%)',
      }}
    />
  );
};
