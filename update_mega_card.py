# -*- coding: utf-8 -*-
import codecs

with codecs.open('src/components/ui/MegaEventCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the wrapper flex-row for 2 cards
old_wrapper = '<div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-16 flex flex-col items-center justify-center z-20 relative">'
new_wrapper = '<div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-16 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-10 z-20 relative">'
content = content.replace(old_wrapper, new_wrapper)

# Add Link import
import_react = "import React, { useState } from 'react';"
import_react_new = "import React, { useState } from 'react';\nimport { Link } from 'react-router-dom';"
content = content.replace(import_react, import_react_new)

# Insert the second card
old_card_1 = '</div>\n      </div>\n\n      {/* MODAL / OVERLAY FOR EVENTS */}'
new_card_2 = '''</div>
        
        {/* BIG CARD 2: ROADTRIPS */}
        <Link 
          to="/journey"
          className="relative w-full md:flex-1 max-w-[500px] aspect-square group cursor-pointer border border-[#ff6b35]/20 bg-[#12091f] shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,53,0.3)] block"
        >
          {/* Background Image (Using a placeholder dark road trip style gradient or if I can reuse an image) */}
          <div className="absolute inset-2 bg-[url('/photos/media_1790131158983.jpg')] bg-cover bg-center brightness-75 group-hover:scale-[1.02] transition-transform duration-700" style={{ filter: 'hue-rotate(330deg) brightness(0.7)' }} />
          
          {/* Gradients */}
          <div className="absolute inset-2 bg-gradient-to-t from-[#12091f] via-[#12091f]/40 to-transparent opacity-90" />
          <div className="absolute inset-2 bg-gradient-to-t from-[#9b1c31] via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
          
          {/* Border Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/40"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40"></div>
          
          {/* Top Info */}
          <div className="absolute top-5 left-6 text-[10px] sm:text-xs text-white/80 font-mono tracking-widest font-bold z-10">
            NO 08/26
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

      {/* MODAL / OVERLAY FOR EVENTS */}'''
content = content.replace(old_card_1, new_card_2)

# Fix BIG CARD 1 width for flex row
old_card_1_wrapper = 'className="relative w-full max-w-[500px] aspect-square group cursor-pointer border border-[#ff6b35]/20 bg-[#12091f] shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,53,0.3)]"'
new_card_1_wrapper = 'className="relative w-full md:flex-1 max-w-[500px] aspect-square group cursor-pointer border border-[#ff6b35]/20 bg-[#12091f] shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,53,0.3)] block"'
content = content.replace(old_card_1_wrapper, new_card_1_wrapper)

with codecs.open('src/components/ui/MegaEventCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
