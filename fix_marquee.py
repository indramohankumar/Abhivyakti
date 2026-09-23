import codecs

with codecs.open('src/components/ui/PhotoMarquee.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add mask-image to the wrapper and remove the solid background color if any
old_wrapper = '<div className="relative w-full h-[240px] sm:h-[320px] overflow-hidden bg-transparent py-4 my-8">'
new_wrapper = '''<div 
      className="relative w-full h-[240px] sm:h-[320px] overflow-hidden bg-transparent py-4 my-8"
      style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
    >'''
content = content.replace(old_wrapper, new_wrapper)

# 2. Remove the old solid color edge gradients
old_edges = '''      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#12091f] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#12091f] to-transparent z-10 pointer-events-none"></div>'''
content = content.replace(old_edges, '')

# 3. Enhance the photo blending (vignette overlay)
old_photo = '''            <img 
              src={src} 
              alt="Gallery" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12091f] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>'''
new_photo = '''            <img 
              src={src} 
              alt="Gallery" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-luminosity hover:mix-blend-normal"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#12091f_120%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#12091f] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>'''
content = content.replace(old_photo, new_photo)

# 4. Soften the border
old_card_class = 'className="w-[320px] sm:w-[450px] h-full rounded-xl overflow-hidden border border-[#ff6b35]/20 shadow-[0_0_20px_rgba(255,107,53,0.1)] flex-shrink-0 relative group hover:border-[#ff6b35]/50 transition-colors cursor-pointer"'
new_card_class = 'className="w-[320px] sm:w-[450px] h-full rounded-2xl overflow-hidden border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex-shrink-0 relative group hover:border-[#ff6b35]/40 hover:shadow-[0_0_30px_rgba(255,107,53,0.2)] transition-all duration-500 cursor-pointer"'
content = content.replace(old_card_class, new_card_class)

with codecs.open('src/components/ui/PhotoMarquee.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
