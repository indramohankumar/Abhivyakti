import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MandalaIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.5">
    {/* Outer dashed border */}
    <circle cx="50" cy="50" r="48" strokeOpacity="0.6" strokeDasharray="1 3" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="45" strokeOpacity="0.3"/>
    <circle cx="50" cy="50" r="32" strokeOpacity="0.3"/>
    <circle cx="50" cy="50" r="16" strokeOpacity="0.4"/>
    <circle cx="50" cy="50" r="4" strokeOpacity="0.8" fill="currentColor" fillOpacity="0.2"/>
    
    {/* 8-Pointed Star Base */}
    <g strokeOpacity="0.3">
      <polygon points="50,16 56,44 84,50 56,56 50,84 44,56 16,50 44,44" />
    </g>

    {/* Elegant Outer Petals (16 petals) */}
    <g strokeOpacity="0.4">
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={i}
          d="M 50 32 C 58 20 54 8 50 5 C 46 8 42 20 50 32"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
    </g>

    {/* Inner Petals (8 petals) */}
    <g strokeOpacity="0.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={i}
          d="M 50 16 Q 54 10 50 6 Q 46 10 50 16"
          transform={`rotate(${i * 45 + 22.5} 50 50)`}
          fill="currentColor" fillOpacity="0.05"
        />
      ))}
    </g>
  </svg>
);

export function ParallaxMandalaBackground() {
  const { scrollY } = useScroll();
  
  // Create different parallax speeds for immense depth
  const y1 = useTransform(scrollY, [0, 3000], [0, -350]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -250]);
  const y4 = useTransform(scrollY, [0, 3000], [0, -800]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* Top Right Massive Mandala */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-32 -right-32 sm:-top-64 sm:-right-64 opacity-20 text-gold mix-blend-multiply"
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }}>
          <MandalaIcon className="w-[450px] h-[450px] sm:w-[900px] sm:h-[900px]" />
        </motion.div>
      </motion.div>

      {/* Middle Left Medium Mandala */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[35%] -left-32 sm:-left-48 opacity-[0.12] text-maroon mix-blend-multiply"
      >
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 140, repeat: Infinity, ease: "linear" }}>
          <MandalaIcon className="w-[300px] h-[300px] sm:w-[600px] sm:h-[600px]" />
        </motion.div>
      </motion.div>

      {/* Bottom Right Giant Mandala */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-[75%] -right-20 sm:-right-40 opacity-15 text-gold mix-blend-multiply"
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 220, repeat: Infinity, ease: "linear" }}>
          <MandalaIcon className="w-[500px] h-[500px] sm:w-[1000px] sm:h-[1000px]" />
        </motion.div>
      </motion.div>
      
      {/* Bottom Left Deep Background Mandala */}
      <motion.div 
        style={{ y: y4 }}
        className="absolute top-[120%] -left-20 sm:-left-20 opacity-10 text-maroon mix-blend-multiply"
      >
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 160, repeat: Infinity, ease: "linear" }}>
          <MandalaIcon className="w-[400px] h-[400px] sm:w-[700px] sm:h-[700px]" />
        </motion.div>
      </motion.div>
      
    </div>
  );
}
