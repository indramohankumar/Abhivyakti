import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight, FileText } from 'lucide-react';

export function AntaragniEventsGrid({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
      setIsPaused(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsPaused(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEvent]);

  // Duplicate events multiple times to create a seamless infinite loop
  const marqueeEvents = [...events, ...events, ...events];

  return (
    <>
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); } /* Exact 1/3 of total width since we have 3 duplicate sets */
        }
        .animate-marquee {
          animation: scrollMarquee 35s linear infinite;
        }
        .animate-marquee.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full h-[380px] sm:h-[420px] overflow-hidden relative z-10 py-2 sm:py-4">
        {/* Fading Edges for depth */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#0a0505] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#0a0505] to-transparent z-20 pointer-events-none" />

        {/* Scrolling Track */}
        <div 
          className={`flex h-full gap-3 sm:gap-4 w-max animate-marquee ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {marqueeEvents.map((event, index) => {
            const Icon = event.icon;
            
            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-3xl w-[260px] sm:w-[320px] flex-shrink-0 cursor-pointer transition-all duration-500 flex flex-col justify-end group border border-white/10 hover:border-[#ff6b35]/60 hover:shadow-[0_0_40px_rgba(255,107,53,0.25)]"
                onClick={() => setSelectedEvent(event)}
                layout
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/70 to-transparent transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full backdrop-blur-md bg-[#ff6b35]/20 text-[#ff6b35] shadow-[0_0_15px_rgba(255,107,53,0.5)]">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    
                    <h3 className="font-serif font-bold tracking-widest text-lg sm:text-xl text-white whitespace-nowrap drop-shadow-md">
                      {event.name}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-[10px] sm:text-xs line-clamp-2 mb-3 font-light tracking-wide">
                    {event.desc}
                  </p>

                  {/* Sub-Events Glowing Tags preview */}
                  {event.subEvents && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {event.subEvents.slice(0, 2).map((sub, i) => (
                        <span 
                          key={i}
                          className="text-[8px] sm:text-[9px] px-2.5 py-1 rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/15 text-orange-200 backdrop-blur-md whitespace-nowrap shadow-[0_0_10px_rgba(255,107,53,0.2)] font-semibold tracking-wider"
                        >
                          {sub}
                        </span>
                      ))}
                      {event.subEvents.length > 2 && (
                        <span className="text-[8px] sm:text-[9px] px-2.5 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-md whitespace-nowrap font-semibold">
                          +{event.subEvents.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#f24236] text-white px-4 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] group-hover:scale-[1.02]"
                  >
                    Explore Events <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
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
