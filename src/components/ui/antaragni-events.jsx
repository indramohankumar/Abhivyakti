import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight, FileText } from 'lucide-react';

export function AntaragniEventsGrid({ events }) {
  const [active, setActive] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEvent]);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-[600px] gap-3 sm:gap-4 p-2 sm:p-4 font-sans relative z-10">
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

                      {/* Sub-Events Glowing Tags preview */}
                      {event.subEvents && (
                        <div className="flex flex-wrap gap-2 mb-5 max-w-lg">
                          {event.subEvents.slice(0, 3).map((sub, i) => (
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
                          {event.subEvents.length > 3 && (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-[9px] sm:text-[11px] px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/70 backdrop-blur-md whitespace-nowrap font-medium"
                            >
                              +{event.subEvents.length - 3} More
                            </motion.span>
                          )}
                        </div>
                      )}

                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering setActive
                          setSelectedEvent(event);
                        }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#f24236] hover:from-[#f24236] hover:to-[#ff6b35] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:scale-105"
                      >
                        Explore Events <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULL SCREEN MODAL ("SEPARATE PAGE") */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] bg-[#0a0505] border border-[#ff6b35]/30 shadow-[0_0_50px_rgba(255,107,53,0.15)] flex flex-col"
            >
              {/* Modal Header Image */}
              <div className="relative h-48 sm:h-64 w-full shrink-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedEvent.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-[#0a0505]/60 to-transparent" />
                
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-[#ff6b35]/20 text-white hover:text-[#ff6b35] rounded-full backdrop-blur-md border border-white/10 transition-colors z-50"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 sm:p-3 rounded-full bg-[#ff6b35]/20 text-[#ff6b35] backdrop-blur-md shadow-[0_0_15px_rgba(255,107,53,0.5)]">
                      <selectedEvent.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h2 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-wider drop-shadow-lg">
                      {selectedEvent.name}
                    </h2>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-lg font-light tracking-wide max-w-2xl pl-1">
                    {selectedEvent.desc}
                  </p>
                </div>
              </div>

              {/* Modal Body - List of Events */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-widest uppercase">
                    Competitions <span className="text-[#ff6b35]">({selectedEvent.subEvents?.length || 0})</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedEvent.subEvents?.map((sub, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/10 transition-all duration-300 flex flex-col justify-between"
                    >
                      <h4 className="text-white font-semibold text-lg mb-2 pr-8">{sub}</h4>
                      
                      <div className="flex items-center gap-2 mt-4 text-[#ff6b35] text-xs font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                        <FileText className="w-4 h-4" />
                        <span>Read Rules</span>
                      </div>
                      
                      {/* Interactive click area covering the card to go to rules */}
                      <a 
                        href={selectedEvent.rulesLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute inset-0 z-10"
                        title={`View rules for ${sub}`}
                      />
                      
                      <ExternalLink className="absolute top-5 right-5 w-4 h-4 text-white/30 group-hover:text-[#ff6b35] transition-colors" />
                    </motion.div>
                  ))}
                </div>
                
                {/* General Rules Button */}
                <div className="mt-8 flex justify-center">
                  <a 
                    href={selectedEvent.rulesLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#f24236] hover:from-[#f24236] hover:to-[#ff6b35] text-white px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(255,107,53,0.5)] hover:scale-105"
                  >
                    View Official Rulebook <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
