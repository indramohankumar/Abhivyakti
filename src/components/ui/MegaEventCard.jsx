import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { AntaragniEventsGrid } from './antaragni-events';

const MegaEventCard = ({ events }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-16 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-10 z-20 relative">
        
        {/* BIG CARD 1: EVENTS */}
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-full md:flex-1 max-w-[500px] aspect-square group cursor-pointer border border-[#ff6b35]/20 bg-[#12091f] shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,53,0.3)] block"
        >
          {/* Background Image */}
          <div className="absolute inset-2 bg-[url('/photos/media_1790131158983.jpg')] bg-cover bg-center brightness-75 group-hover:scale-[1.02] transition-transform duration-700" />
          
          {/* Gradients */}
          <div className="absolute inset-2 bg-gradient-to-t from-[#12091f] via-[#12091f]/40 to-transparent opacity-90" />
          <div className="absolute inset-2 bg-gradient-to-t from-[#9b1c31] via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
          
          {/* Border Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/40"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40"></div>
          
          {/* Top Info */}
          <div className="absolute top-5 left-6 text-[10px] sm:text-xs text-white/80 font-mono tracking-widest font-bold z-10">
            Nº 01/26
          </div>
          <div className="absolute top-5 right-6 text-[10px] sm:text-xs text-[#ff6b35] font-mono tracking-widest font-black uppercase z-10 drop-shadow-lg">
            ABHIVYAKTI '26
          </div>

          {/* Sticky Tape: ON CAMPUS */}
          <div className="absolute -top-4 left-6 sm:left-10 bg-[#ffd147] text-black font-black text-sm sm:text-base px-5 py-2 transform -rotate-3 shadow-lg z-20 uppercase tracking-widest group-hover:-rotate-6 transition-transform">
            ON CAMPUS
          </div>

          {/* Content */}
          <div className="absolute inset-x-6 sm:inset-x-8 bottom-6 sm:bottom-8 flex flex-col items-start z-10">
            <h2 className="font-sans font-black text-6xl sm:text-[5.5rem] leading-none text-white tracking-tighter mb-2 group-hover:text-[#ff6b35] transition-colors drop-shadow-xl">
              EVENTS
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-light max-w-[90%] leading-relaxed mb-4">
              40+ competitions across dance, music, drama, literary arts, quizzing and fashion. The main arena awaits.
            </p>
            <div className="w-full h-[1px] bg-white/20 mb-4"></div>
            <div className="flex items-center gap-2 text-[#ff6b35] text-xs sm:text-sm font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">
              ENTER THE ARENA <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
        
        {/* BIG CARD 2: ROADTRIPS */}
        <Link 
          to="/journey"
          className="relative w-full md:flex-1 max-w-[500px] aspect-square group cursor-pointer border border-[#ff6b35]/20 bg-[#12091f] shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,53,0.3)] block"
        >
          {/* Background Image (Reusing the poster image but with a different hue/brightness for variation) */}
          <div className="absolute inset-2 bg-[url('/photos/media_1790131158983.jpg')] bg-cover bg-center brightness-75 group-hover:scale-[1.02] transition-transform duration-700" style={{ filter: 'hue-rotate(320deg) brightness(0.65)' }} />
          
          {/* Gradients */}
          <div className="absolute inset-2 bg-gradient-to-t from-[#12091f] via-[#12091f]/40 to-transparent opacity-90" />
          <div className="absolute inset-2 bg-gradient-to-t from-[#9b1c31] via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
          
          {/* Border Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/40"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40"></div>
          
          {/* Top Info */}
          <div className="absolute top-5 left-6 text-[10px] sm:text-xs text-white/80 font-mono tracking-widest font-bold z-10">
            Nº 08/26
          </div>
          <div className="absolute top-5 right-6 text-[10px] sm:text-xs text-[#ff6b35] font-mono tracking-widest font-black uppercase z-10 drop-shadow-lg">
            ABHIVYAKTI '26
          </div>

          {/* Sticky Tape: ACROSS INDIA */}
          <div className="absolute -top-4 right-6 sm:right-10 bg-[#ff9d4a] text-black font-black text-sm sm:text-base px-5 py-2 transform rotate-3 shadow-lg z-20 uppercase tracking-widest group-hover:rotate-6 transition-transform">
            ACROSS INDIA
          </div>

          {/* Content */}
          <div className="absolute inset-x-6 sm:inset-x-8 bottom-6 sm:bottom-8 flex flex-col items-start z-10">
            <h2 className="font-sans font-black text-6xl sm:text-[5.5rem] leading-none text-white tracking-tighter mb-2 group-hover:text-[#ff6b35] transition-colors drop-shadow-xl">
              ROADTRIPS
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-light max-w-[90%] leading-relaxed mb-4">
              Rock, rap, beatboxing, comedy and DJ battles hit your city before the grand finale at Quantum University.
            </p>
            <div className="w-full h-[1px] bg-white/20 mb-4"></div>
            <div className="flex items-center gap-2 text-[#ff6b35] text-xs sm:text-sm font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">
              HIT THE ROAD <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* MODAL / OVERLAY FOR EVENTS */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#12091f] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#0a0505]">
              <div className="text-[#ff6b35] font-mono font-black tracking-widest text-sm uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full"></span> ABHIVYAKTI ARENA
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Fast Marquee Background / Header */}
            <div className="w-full bg-[#ff6b35] py-3 overflow-hidden flex whitespace-nowrap shadow-[0_0_30px_rgba(255,107,53,0.3)] z-10 border-b-2 border-black/50">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes fastMarquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-33.333333%); }
                }
                .animate-fast-marquee {
                  animation: fastMarquee 20s linear infinite;
                }
              `}} />
              <div className="flex items-center gap-6 text-[#12091f] font-black uppercase text-xl sm:text-2xl tracking-widest animate-fast-marquee w-max">
                <span>READY TO COMPETE? • THE FIRE SHALL RISE AGAIN • REGISTER NOW •</span>
                <span>READY TO COMPETE? • THE FIRE SHALL RISE AGAIN • REGISTER NOW •</span>
                <span>READY TO COMPETE? • THE FIRE SHALL RISE AGAIN • REGISTER NOW •</span>
              </div>
            </div>

            {/* Events Grid / Marquee */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center py-10 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.15),transparent_70%)] pointer-events-none" />
              
              <div className="text-center mb-8 z-10">
                <h3 className="text-white font-sans font-black text-4xl sm:text-6xl uppercase mb-2">Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff5f3c]">Arenas</span></h3>
                <p className="text-white/50 tracking-[0.3em] text-[10px] sm:text-xs uppercase font-bold">Select a category to view rulebooks</p>
              </div>

              <div className="w-full max-w-[100vw] relative z-10">
                <AntaragniEventsGrid events={events} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MegaEventCard;
