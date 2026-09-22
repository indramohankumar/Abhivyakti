import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export function AntaragniEventsGrid({ events }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row w-full h-[600px] gap-3 sm:gap-4 p-2 sm:p-4 font-sans">
      {events.map((event, index) => {
        const isActive = active === index;
        const Icon = event.icon;
        
        return (
          <motion.div
            key={index}
            className={`relative overflow-hidden rounded-[2rem] cursor-pointer transition-all duration-500 flex flex-col justify-end group ${
              isActive ? 'lg:flex-[4] flex-[3]' : 'lg:flex-[1] flex-[1]'
            }`}
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            layout
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${event.image})` }}
            />
            
            {/* Gradient Overlays for immense depth */}
            <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
              isActive 
                ? 'from-[#050505]/95 via-[#050505]/50 to-transparent' 
                : 'from-black/90 via-black/60 to-transparent'
            }`} />

            {/* Glowing Border effect on active */}
            <div className={`absolute inset-0 border-[2px] rounded-[2rem] transition-colors duration-500 ${
              isActive ? 'border-[#ff6b35]/40 shadow-[inset_0_0_40px_rgba(255,107,53,0.2)]' : 'border-white/5'
            }`} />

            {/* Content */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col h-full justify-end">
              
              {/* Desktop Vertical Title (when inactive) */}
              <div className={`absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100 hidden lg:flex'}`}>
                <h3 className="text-white/40 font-bold uppercase tracking-[0.3em] whitespace-nowrap -rotate-90 text-lg">
                  {event.name.split('·')[0].trim()}
                </h3>
              </div>

              <div className="flex items-center gap-3 mb-2 sm:mb-4">
                <div className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                  isActive ? 'bg-[#ff6b35]/20 text-[#ff6b35] shadow-[0_0_15px_rgba(255,107,53,0.5)]' : 'bg-black/50 text-white/50'
                }`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <motion.h3 
                  layout
                  className={`font-serif font-bold tracking-widest ${
                    isActive ? 'text-2xl sm:text-3xl text-white' : 'text-sm sm:text-lg text-white/70 lg:hidden'
                  } whitespace-nowrap`}
                >
                  {event.name}
                </motion.h3>
              </div>

              <AnimatePresence mode="popLayout">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="overflow-hidden flex flex-col items-start"
                  >
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base line-clamp-1 mb-3 font-light tracking-wide max-w-md">
                      {event.desc}
                    </p>

                    {/* Sub-Events Glowing Tags */}
                    {event.subEvents && (
                      <div className="flex flex-wrap gap-2 mb-5 max-w-lg">
                        {event.subEvents.map((sub, i) => (
                          <motion.span 
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + (i * 0.05) }}
                            className="text-[9px] sm:text-[11px] px-3 py-1.5 rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/10 text-orange-200 backdrop-blur-md whitespace-nowrap shadow-[0_0_10px_rgba(255,107,53,0.1)] font-medium tracking-wide"
                          >
                            {sub}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    <a 
                      href={event.rulesLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#f24236] hover:from-[#f24236] hover:to-[#ff6b35] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:scale-105"
                    >
                      View Details <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
