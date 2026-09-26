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
            // Colors from the uploaded image (Orange, Red, Yellow, Magenta)
            const colors = ['bg-[#ff9d4a]', 'bg-[#ff5f3c]', 'bg-[#ffd147]', 'bg-[#e92a67]'];
            const blockColor = colors[index % colors.length];
            const originalIndex = (index % events.length) + 1;
            
            return (
              <div key={index} className="flex flex-col items-center gap-3 w-[260px] sm:w-[300px] flex-shrink-0 cursor-pointer group" onClick={() => setSelectedEvent(event)}>
                <motion.div
                  className="relative overflow-hidden w-full aspect-[3/4] flex flex-col justify-end border border-white/10 group-hover:border-[#ff6b35]/50 transition-colors shadow-2xl rounded-[2px]"
                  layout
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  
                  {/* Dark overlay for contrast */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  
                  {/* Corner Brackets (White) */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/70"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/70"></div>
                  
                  {/* Corner Brackets inside bottom block (Black) */}
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-black/70 z-20"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-black/70 z-20"></div>

                  {/* Top Texts */}
                  <div className="absolute top-3 left-6 text-[9px] text-white/90 font-mono tracking-widest font-bold z-10">
                    № {String(originalIndex).padStart(2, '0')}/26
                  </div>
                  <div className="absolute top-3 right-6 text-[9px] text-red-500 font-mono tracking-widest font-black uppercase z-10 drop-shadow-md">
                    ABHIVYAKTI '26
                  </div>

                  {/* Bottom Solid Title Block */}
                  <div className={`relative z-10 w-full ${blockColor} px-6 pt-4 pb-3 flex flex-col justify-between group-hover:brightness-110 transition-all`}>
                    <h3 className="font-sans font-black tracking-tighter text-[1.3rem] sm:text-2xl text-black uppercase leading-none truncate mb-2">
                      {event.name}
                    </h3>
                    <div className="w-full flex justify-end items-end h-4">
                      {/* Fake Barcode */}
                      <div className="flex gap-[2px] h-full items-end opacity-90 pr-2">
                        <div className="w-1 h-full bg-black"></div>
                        <div className="w-[1.5px] h-full bg-black"></div>
                        <div className="w-[2px] h-[80%] bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-1 h-[90%] bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[3px] h-[70%] bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[1.5px] h-[90%] bg-black"></div>
                        <div className="w-[2px] h-full bg-black"></div>
                        <div className="w-1 h-[80%] bg-black"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Stage Text Under Card */}
                <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] mt-1">
                  {event.name === 'Fine Arts' || event.name === 'Fashion' ? 'VISUAL DISTRICT' : 'PERFORMING ARTS STAGE'}
                </div>
              </div>
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
                
                {/* General Rules Button or Inline Rules */}
                {selectedEvent.rules ? (
                  <div className="mt-8 bg-white/5 border border-[#ff6b35]/20 p-6 sm:p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#ff6b35]"></div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase mb-6 flex items-center gap-3">
                      <FileText className="text-[#ff6b35] w-6 h-6" /> Event Rules & Guidelines
                    </h3>
                    <ul className="space-y-4">
                      {selectedEvent.rules.map((rule, i) => (
                        <li key={i} className="flex gap-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                          <span className="font-black text-[#ff6b35] shrink-0 mt-0.5">{i + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
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
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
