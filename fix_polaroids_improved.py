import codecs
import re

def update_polaroids(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The broken component
    broken_regex = r'const EventPolaroid = \(\{.*?\}\) => \{.*?\};\n'
    
    # The upgraded component
    correct_comp = """const EventPolaroid = ({ image, title, index, color = "from-[#ff6b35] to-[#ff5f3c]", rotation = "rotate-0", tapeColor = "bg-white/30" }) => {
  return (
    <div className={shrink-0 w-[260px] sm:w-[300px] bg-[#0a050a] border border-white/20 p-3 pb-0 flex flex-col relative group cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(255,107,53,0.4)] }>
      {/* Realistic Tape */}
      <div className={bsolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6  backdrop-blur-md opacity-80 shadow-sm rotate-2 z-20 mix-blend-screen}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30"></div>
      </div>
      
      {/* Top Header */}
      <div className="flex justify-between items-center px-1 py-2 text-[10px] text-white/50 font-mono tracking-widest uppercase">
        <span>[ ? {index}/06 ]</span>
        <span className="text-[#ff6b35]">[ ABHIVYAKTI '26 ]</span>
      </div>
      
      {/* Image with internal border */}
      <div className="w-full aspect-[4/5] overflow-hidden relative border border-white/5 rounded-sm">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale-[30%] contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 scale-110 group-hover:scale-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
      </div>
      
      {/* Bottom Bar with Gradient */}
      <div className={w-full bg-gradient-to-r  mt-3 mb-3 p-3 flex justify-between items-end relative overflow-hidden rounded-sm shadow-inner}>
        <h3 className="font-black text-black text-2xl uppercase tracking-tighter leading-none z-10 drop-shadow-sm">{title}</h3>
        {/* Fake Barcode / Equalizer */}
        <div className="flex gap-[2px] h-5 items-end z-10 opacity-60 mix-blend-multiply">
          {[2,4,3,1,5,2,4,1,3,2,5].map((h, i) => (
            <div key={i} className="w-[2px] bg-black transition-all duration-300 group-hover:h-full" style={{ height: ${h * 4}px }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
"""
    
    content = re.sub(broken_regex, correct_comp, content, flags=re.DOTALL)

    # Now update the marquees
    marquee_section_regex = r'\{/\* \?\? EVENT POLAROIDS MARQUEE \?\? \*/\}.*?(?=\{/\* \?\? NEW PHOTOS MARQUEE \?\? \*/\})'
    
    new_marquee_section = """{/* ?? EVENT POLAROIDS MARQUEE ?? */}
      <section className="relative z-20 pt-16 pb-12 overflow-hidden bg-[#12091f]">
        
        {/* Left-to-Right Polaroid Marquee */}
        <div className="relative w-full flex overflow-x-hidden border-y border-white/5 bg-black/40 py-12 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          
          <div className="animate-marquee-reverse flex gap-8 sm:gap-12 items-center whitespace-nowrap pl-8 sm:pl-12">
            {/* Set 1 */}
            <EventPolaroid index="01" title="Music" image="https://media.gettyimages.com/id/1314574070/photo/indian-musician-zakir-hussain-plays-tabla-as-he-performs-at-a-benefit-concert-in-celebration.jpg?s=612x612&w=0&k=20&c=aSLEAXpLnf8pg2QThlp-PN67NqigErOp4HHBJPmpRwo=" color="from-[#ff6b35] to-[#ffb703]" rotation="-rotate-3" tapeColor="bg-white/20" />
            <EventPolaroid index="02" title="Dance" image="https://images.unsplash.com/photo-1764014792668-bc484714744f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#9b1c31] to-[#e01a4f]" rotation="rotate-2" tapeColor="bg-[#ff6b35]/40" />
            <EventPolaroid index="03" title="Theatre" image="https://images.unsplash.com/photo-1507676184212-d0330a151b74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#12091f] to-[#ff5f3c]" rotation="-rotate-1" tapeColor="bg-white/30" />
            <EventPolaroid index="04" title="Fashion" image="https://images.unsplash.com/photo-1550614000-4b95d4edaa32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#e01a4f] to-[#ffb703]" rotation="rotate-3" tapeColor="bg-[#9b1c31]/50" />
            <EventPolaroid index="05" title="Fine Arts" image="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#ff6b35] to-[#9b1c31]" rotation="-rotate-2" tapeColor="bg-white/20" />
            <EventPolaroid index="06" title="Cuisine" image="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#ffb703] to-[#ff5f3c]" rotation="rotate-1" tapeColor="bg-[#e01a4f]/40" />
            
            {/* Set 2 (Duplicate for infinite scroll) */}
            <EventPolaroid index="01" title="Music" image="https://media.gettyimages.com/id/1314574070/photo/indian-musician-zakir-hussain-plays-tabla-as-he-performs-at-a-benefit-concert-in-celebration.jpg?s=612x612&w=0&k=20&c=aSLEAXpLnf8pg2QThlp-PN67NqigErOp4HHBJPmpRwo=" color="from-[#ff6b35] to-[#ffb703]" rotation="-rotate-3" tapeColor="bg-white/20" />
            <EventPolaroid index="02" title="Dance" image="https://images.unsplash.com/photo-1764014792668-bc484714744f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#9b1c31] to-[#e01a4f]" rotation="rotate-2" tapeColor="bg-[#ff6b35]/40" />
            <EventPolaroid index="03" title="Theatre" image="https://images.unsplash.com/photo-1507676184212-d0330a151b74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#12091f] to-[#ff5f3c]" rotation="-rotate-1" tapeColor="bg-white/30" />
            <EventPolaroid index="04" title="Fashion" image="https://images.unsplash.com/photo-1550614000-4b95d4edaa32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#e01a4f] to-[#ffb703]" rotation="rotate-3" tapeColor="bg-[#9b1c31]/50" />
            <EventPolaroid index="05" title="Fine Arts" image="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#ff6b35] to-[#9b1c31]" rotation="-rotate-2" tapeColor="bg-white/20" />
            <EventPolaroid index="06" title="Cuisine" image="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" color="from-[#ffb703] to-[#ff5f3c]" rotation="rotate-1" tapeColor="bg-[#e01a4f]/40" />
          </div>
        </div>

        {/* Text Marquee (Event Names) */}
        <div className="relative w-full flex overflow-x-hidden border-b border-white/5 bg-gradient-to-r from-[#0a0505] via-[#1a0a1a] to-[#0a0505] py-5">
          <div className="animate-marquee flex gap-12 items-center whitespace-nowrap pl-12 text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/60 font-black text-4xl sm:text-5xl uppercase tracking-widest drop-shadow-lg">
            <span>Music</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            <span>Dance</span>
            <Sparkles className="w-10 h-10 text-[#e01a4f] shrink-0 opacity-80" />
            <span>Theatre</span>
            <Sparkles className="w-10 h-10 text-[#ffb703] shrink-0 opacity-80" />
            <span>Fashion</span>
            <Sparkles className="w-10 h-10 text-[#9b1c31] shrink-0 opacity-80" />
            <span>Fine Arts</span>
            <Sparkles className="w-10 h-10 text-[#ff5f3c] shrink-0 opacity-80" />
            <span>Cuisine</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            
            {/* Duplicate */}
            <span>Music</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            <span>Dance</span>
            <Sparkles className="w-10 h-10 text-[#e01a4f] shrink-0 opacity-80" />
            <span>Theatre</span>
            <Sparkles className="w-10 h-10 text-[#ffb703] shrink-0 opacity-80" />
            <span>Fashion</span>
            <Sparkles className="w-10 h-10 text-[#9b1c31] shrink-0 opacity-80" />
            <span>Fine Arts</span>
            <Sparkles className="w-10 h-10 text-[#ff5f3c] shrink-0 opacity-80" />
            <span>Cuisine</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
          </div>
        </div>
      </section>
      """
    
    content = re.sub(marquee_section_regex, new_marquee_section, content, flags=re.DOTALL)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated Polaroids and Marquees successfully!")

update_polaroids('src/pages/Home.jsx')
