import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Mandala = ({ className }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none">
    <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
    <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="3" opacity="0.8" />
    
    {/* Large Petals */}
    {[...Array(12)].map((_, i) => (
      <path 
        key={`petal-${i}`}
        d="M250 50 C280 120, 310 180, 250 210 C190 180, 220 120, 250 50 Z" 
        fill="currentColor" 
        opacity="0.15" 
        transform={`rotate(${i * 30} 250 250)`} 
      />
    ))}
    
    {/* Small Petals */}
    {[...Array(24)].map((_, i) => (
      <path 
        key={`small-petal-${i}`}
        d="M250 120 C265 160, 275 190, 250 210 C225 190, 235 160, 250 120 Z" 
        stroke="currentColor" 
        strokeWidth="1"
        fill="transparent"
        opacity="0.4" 
        transform={`rotate(${i * 15} 250 250)`} 
      />
    ))}
    
    {/* Inner rings */}
    <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="2" opacity="0.6" strokeDasharray="10 5" />
    <circle cx="250" cy="250" r="80" stroke="currentColor" strokeWidth="1" opacity="0.8" />
    <circle cx="250" cy="250" r="40" fill="currentColor" opacity="0.2" />
    <circle cx="250" cy="250" r="20" fill="currentColor" opacity="0.5" />
  </svg>
);

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll lock while loading
    document.body.style.overflow = 'hidden';

    // Fast initial jump
    setProgress(15);

    const duration = 2500;
    const interval = 30;
    let currentProgress = 15;
    
    const timer = setInterval(() => {
      // Slower towards the end to build anticipation
      const increment = currentProgress > 80 ? 1 : currentProgress > 50 ? 2 : 3;
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        
        // Wait a beat at 100% before triggering exit animation
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = 'unset';
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1500); // Allow time for the massive scale-up exit animation
        }, 500);
      }
      setProgress(currentProgress);
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="fixed inset-0 z-[9999] bg-[#0a0505] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient Glows */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gold/5 blur-[100px] pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-maroon/20 blur-[80px] pointer-events-none" />

          {/* Rotating Mandala */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] max-w-[1000px] text-gold/15 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            <Mandala className="w-full h-full" />
          </motion.div>

          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[500px] text-gold/25 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <Mandala className="w-full h-full" />
          </motion.div>

          {/* Core Content */}
          <div className="relative z-10 flex flex-col items-center text-center mt-[-5dvh]">
            {/* Logo / Main Text */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <h1 className="text-gold-gradient font-serif text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-widest drop-shadow-[0_0_30px_rgba(201,168,76,0.3)] mb-3">
                अभिव्यक्ति
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, filter: 'blur(5px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="text-gold/70 font-serif text-[10px] md:text-sm tracking-[0.4em] uppercase mb-20"
            >
              Expressions of Bharat
            </motion.p>

            {/* Loading Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col items-center w-full max-w-[200px] md:max-w-[280px]"
            >
              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden mb-5 rounded-full">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light shadow-[0_0_15px_rgba(201,168,76,0.8)]"
                  style={{ width: `${progress}%` }}
                  layout
                />
              </div>
              
              {/* Progress Text */}
              <div className="flex justify-between w-full text-gold/60 text-[10px] font-mono tracking-widest uppercase font-semibold">
                <span>Entering Realm</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
