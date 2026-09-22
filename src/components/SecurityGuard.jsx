import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function SecurityGuard() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerWarning();
    };

    const handleKeyDown = (e) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
        (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Mac Cmd+Option+I/J/C
        (e.metaKey && e.keyCode === 85) // Mac Cmd+U
      ) {
        e.preventDefault();
        triggerWarning();
      }
    };

    const triggerWarning = () => {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2500);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Optional: Aggressive Debugger Trap
    // When devtools is open, this freezes the page
    // const blockDevTools = setInterval(() => {
    //   Function("debugger")();
    // }, 50);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      // clearInterval(blockDevTools);
    };
  }, []);

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-dark-bg/95 text-white px-5 py-3 rounded-full shadow-[0_0_25px_rgba(201,168,76,0.3)] border border-gold/40 backdrop-blur-xl"
        >
          <ShieldAlert className="w-5 h-5 text-gold animate-pulse" />
          <span className="font-semibold text-sm tracking-widest uppercase">Code is Locked</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
