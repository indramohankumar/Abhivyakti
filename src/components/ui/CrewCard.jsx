import React from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const CrewCard = ({ name, role, phone, image }) => {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-[260px] sm:w-[280px] shrink-0 bg-[#1a0f2e] rounded-xl border border-white/5 overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:border-[#ff6b35]/30 cursor-pointer mx-auto"
    >
      {/* Top subtle gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      
      <div className="p-5 sm:p-6 flex flex-col items-center z-10">
        {/* Top Header */}
        <div className="text-[#ff9d4a] text-[9px] font-black tracking-[0.3em] uppercase mb-6 opacity-90">
          CREW • ABHIVYAKTI \'26
        </div>

        {/* Profile Image with Glowing Gradient Border */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 rounded-full p-[3px] bg-gradient-to-tr from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] group-hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] transition-all duration-500">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0505] border-2 border-[#1a0f2e]">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 font-bold text-3xl">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-white font-sans font-black text-xl sm:text-2xl tracking-wide mb-2 sm:mb-3 drop-shadow-md group-hover:text-[#ff6b35] transition-colors text-center">
          {name}
        </h3>

        {/* Role Tape */}
        <div className="relative w-full max-w-[200px] mb-4 flex justify-center">
          <div className="absolute inset-0 bg-[#ffd147] rounded-sm transform -rotate-2 scale-105 shadow-sm"></div>
          <div className="relative py-1.5 px-2 text-center text-[#12091f] font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase z-10">
            {role}
          </div>
        </div>

        {/* Phone */}
        <div className="text-gray-300 font-mono font-bold text-sm tracking-widest mb-6">
          {phone}
        </div>
      </div>

      {/* Dashed Line separator */}
      <div className="w-full border-t border-dashed border-white/20 relative">
        {/* Notches on sides */}
        <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-[#12091f]"></div>
        <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-[#12091f]"></div>
      </div>

      {/* Footer / Socials & Barcode */}
      <div className="p-4 sm:p-5 flex justify-between items-center bg-black/40">
        <div className="flex items-center gap-3">
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Mail className="w-4 h-4" /></a>
          <a href="#" className="text-gray-400 hover:text-[#ff6b35] transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
        
        {/* Fake Barcode */}
        <div className="flex items-center h-6 gap-[1px] sm:gap-[2px] opacity-70">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="bg-white/70 h-full" 
              style={{ width: `${Math.random() * 2 + 1}px`, opacity: Math.random() * 0.5 + 0.5 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ContactCrewGrid = ({ coordinators }) => {

  return (
    <section id="contact-crew" className="py-16 sm:py-24 relative overflow-hidden bg-[#12091f]">
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-3xl bg-[#ff6b35]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#ff6b35] font-semibold tracking-[0.2em] uppercase text-xs mb-2">Connect With Us</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-black mb-3 text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff5f3c]">Crew</span>
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent opacity-50 mt-4"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-10">
          {coordinators.map((coord, i) => (
            <CrewCard key={i} {...coord} />
          ))}
        </div>
      </div>
    </section>
  );
};
