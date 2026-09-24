import codecs
import re

def update_home_polaroids(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The broken/complex component
    broken_regex = r'const EventPolaroid = \(\{.*?\}\) => \{.*?\};\n'
    
    # The new simple image wrapper component
    correct_comp = """const EventPolaroid = ({ image, title, rotation = "rotate-0", tapeColor = "bg-white/30" }) => {
  return (
    <div className={`shrink-0 w-[260px] sm:w-[300px] flex flex-col relative group cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(255,107,53,0.4)] ${rotation}`}>
      {/* Realistic Tape */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${tapeColor} backdrop-blur-md opacity-90 shadow-sm rotate-2 z-20 mix-blend-screen`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-40"></div>
      </div>
      
      {/* Image Container */}
      <div className="w-full overflow-hidden relative rounded-sm border border-white/10 group-hover:border-white/30 transition-colors duration-500">
        <img src={image} alt={title} className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
        {/* Subtle highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};
"""
    
    content = re.sub(broken_regex, correct_comp, content, flags=re.DOTALL)

    # Now update the marquees section to use the newly sliced images
    marquee_section_regex = r'\{/\* \?\? EVENT POLAROIDS MARQUEE \?\? \*/\}.*?(?=\{/\* \?\? NEW PHOTOS MARQUEE \?\? \*/\})'
    
    new_marquee_section = """{/* ?? EVENT POLAROIDS MARQUEE ?? */}
      <section className="relative z-20 pt-16 pb-12 overflow-hidden bg-[#12091f]">
        
        {/* Left-to-Right Polaroid Marquee */}
        <div className="relative w-full flex overflow-x-hidden border-y border-white/5 bg-black/40 py-12 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          
          <div className="animate-marquee-reverse flex gap-8 sm:gap-12 items-center whitespace-nowrap pl-8 sm:pl-12">
            {/* Set 1 */}
            <EventPolaroid title="Dance" image="/events/dance.jpg" rotation="-rotate-3" tapeColor="bg-white/20" />
            <EventPolaroid title="Music" image="/events/music.jpg" rotation="rotate-2" tapeColor="bg-[#ff6b35]/40" />
            <EventPolaroid title="Fashion" image="/events/fashion.jpg" rotation="-rotate-1" tapeColor="bg-white/30" />
            <EventPolaroid title="Theatre" image="/events/theatre.jpg" rotation="rotate-3" tapeColor="bg-[#9b1c31]/50" />
            <EventPolaroid title="Fine Arts" image="/events/fine-arts.jpg" rotation="-rotate-2" tapeColor="bg-white/20" />
            <EventPolaroid title="Indian Cuisine" image="/events/cuisine.jpg" rotation="rotate-1" tapeColor="bg-[#e01a4f]/40" />
            
            {/* Set 2 (Duplicate for infinite scroll) */}
            <EventPolaroid title="Dance" image="/events/dance.jpg" rotation="-rotate-3" tapeColor="bg-white/20" />
            <EventPolaroid title="Music" image="/events/music.jpg" rotation="rotate-2" tapeColor="bg-[#ff6b35]/40" />
            <EventPolaroid title="Fashion" image="/events/fashion.jpg" rotation="-rotate-1" tapeColor="bg-white/30" />
            <EventPolaroid title="Theatre" image="/events/theatre.jpg" rotation="rotate-3" tapeColor="bg-[#9b1c31]/50" />
            <EventPolaroid title="Fine Arts" image="/events/fine-arts.jpg" rotation="-rotate-2" tapeColor="bg-white/20" />
            <EventPolaroid title="Indian Cuisine" image="/events/cuisine.jpg" rotation="rotate-1" tapeColor="bg-[#e01a4f]/40" />
          </div>
        </div>

        {/* Text Marquee (Event Names) */}
        <div className="relative w-full flex overflow-x-hidden border-b border-white/5 bg-gradient-to-r from-[#0a0505] via-[#1a0a1a] to-[#0a0505] py-5">
          <div className="animate-marquee flex gap-12 items-center whitespace-nowrap pl-12 text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/60 font-black text-4xl sm:text-5xl uppercase tracking-widest drop-shadow-lg">
            <span>Dance</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            <span>Music</span>
            <Sparkles className="w-10 h-10 text-[#e01a4f] shrink-0 opacity-80" />
            <span>Fashion</span>
            <Sparkles className="w-10 h-10 text-[#ffb703] shrink-0 opacity-80" />
            <span>Theatre</span>
            <Sparkles className="w-10 h-10 text-[#9b1c31] shrink-0 opacity-80" />
            <span>Fine Arts</span>
            <Sparkles className="w-10 h-10 text-[#ff5f3c] shrink-0 opacity-80" />
            <span>Indian Cuisine</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            
            {/* Duplicate */}
            <span>Dance</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            <span>Music</span>
            <Sparkles className="w-10 h-10 text-[#e01a4f] shrink-0 opacity-80" />
            <span>Fashion</span>
            <Sparkles className="w-10 h-10 text-[#ffb703] shrink-0 opacity-80" />
            <span>Theatre</span>
            <Sparkles className="w-10 h-10 text-[#9b1c31] shrink-0 opacity-80" />
            <span>Fine Arts</span>
            <Sparkles className="w-10 h-10 text-[#ff5f3c] shrink-0 opacity-80" />
            <span>Indian Cuisine</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
          </div>
        </div>
      </section>
      """
    
    content = re.sub(marquee_section_regex, new_marquee_section, content, flags=re.DOTALL)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated Polaroids successfully with custom user images!")

update_home_polaroids('src/pages/Home.jsx')
