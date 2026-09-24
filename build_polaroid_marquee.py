import codecs
import re

def update_home(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add EventPolaroid component definition
    polaroid_comp = '''
const EventPolaroid = ({ image, title, index, color = "bg-[#ff6b35]", rotation = "rotate-0", tapeColor = "bg-[#ffd166]" }) => {
  return (
    <div className={shrink-0 w-[240px] sm:w-[280px] bg-[#110915] border border-white/10 p-2 pb-0 flex flex-col relative group cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,107,53,0.3)] }>
      {/* Tape */}
      <div className={bsolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4  opacity-90 shadow-sm rotate-2 z-10}></div>
      
      {/* Top Header */}
      <div className="flex justify-between items-center px-1 py-2 text-[8px] sm:text-[10px] text-white/50 font-mono tracking-widest uppercase">
        <span>[ ? {index}/26 ]</span>
        <span>[ ABHIVYAKTI '26 ]</span>
      </div>
      
      {/* Image */}
      <div className="w-full aspect-[4/5] overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-overlay"></div>
      </div>
      
      {/* Bottom Bar */}
      <div className={w-full  mt-2 p-3 flex justify-between items-end relative overflow-hidden}>
        <h3 className="font-black text-black text-xl sm:text-2xl uppercase tracking-tighter leading-none z-10">{title}</h3>
        {/* Fake Barcode */}
        <div className="flex gap-[2px] h-4 items-end z-10 opacity-70">
          {[1,2,3,1,4,1,2,1,5,1,2].map((h, i) => (
            <div key={i} className="w-[1.5px] bg-black" style={{ height: ${h * 4}px }}></div>
          ))}
        </div>
        
        {/* Decorative corner bracket */}
        <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-black/30"></div>
      </div>
    </div>
  );
};

'''

    # Insert polaroid component before PhotoCarousel
    content = content.replace('const PhotoCarousel = () => {', polaroid_comp + 'const PhotoCarousel = () => {')

    # 2. Build the EventsMarquee Section
    marquee_section = '''
      {/* ?? EVENT POLAROIDS MARQUEE ?? */}
      <section className="relative z-20 pt-16 pb-8 overflow-hidden bg-[#12091f]">
        
        {/* Left-to-Right Polaroid Marquee */}
        <div className="relative w-full flex overflow-x-hidden border-y border-white/5 bg-black/20 py-10">
          <div className="animate-marquee-reverse flex gap-6 sm:gap-10 items-center whitespace-nowrap pl-6 sm:pl-10">
            {/* Set 1 */}
            <EventPolaroid index="01" title="Dance" image="/photos/media_1790097857124.jpg" color="bg-[#ff5f3c]" rotation="-rotate-2" tapeColor="bg-[#ffd166]" />
            <EventPolaroid index="02" title="DJ Wars" image="/photos/media_1790128762747.jpg" color="bg-[#ffb703]" rotation="rotate-1" tapeColor="bg-red-400" />
            <EventPolaroid index="03" title="Dramatics" image="/photos/media_1790116487337.png" color="bg-[#9b1c31]" rotation="-rotate-1" tapeColor="bg-[#ffd166]" />
            <EventPolaroid index="04" title="Nationals" image="/photos/media_1790097869892.jpg" color="bg-[#ff6b35]" rotation="rotate-2" tapeColor="bg-yellow-400" />
            <EventPolaroid index="05" title="Ritambhara" image="/photos/media_1790128762760.jpg" color="bg-[#e01a4f]" rotation="-rotate-2" tapeColor="bg-[#ffd166]" />
            
            {/* Set 2 (Duplicate for infinite scroll) */}
            <EventPolaroid index="01" title="Dance" image="/photos/media_1790097857124.jpg" color="bg-[#ff5f3c]" rotation="-rotate-2" tapeColor="bg-[#ffd166]" />
            <EventPolaroid index="02" title="DJ Wars" image="/photos/media_1790128762747.jpg" color="bg-[#ffb703]" rotation="rotate-1" tapeColor="bg-red-400" />
            <EventPolaroid index="03" title="Dramatics" image="/photos/media_1790116487337.png" color="bg-[#9b1c31]" rotation="-rotate-1" tapeColor="bg-[#ffd166]" />
            <EventPolaroid index="04" title="Nationals" image="/photos/media_1790097869892.jpg" color="bg-[#ff6b35]" rotation="rotate-2" tapeColor="bg-yellow-400" />
            <EventPolaroid index="05" title="Ritambhara" image="/photos/media_1790128762760.jpg" color="bg-[#e01a4f]" rotation="-rotate-2" tapeColor="bg-[#ffd166]" />
          </div>
        </div>

        {/* Text Marquee (Artist / Event Names) */}
        <div className="relative w-full flex overflow-x-hidden border-b border-white/5 bg-[#0a0505] py-4">
          <div className="animate-marquee flex gap-10 items-center whitespace-nowrap pl-10 text-white/40 font-black text-3xl sm:text-5xl uppercase tracking-tighter mix-blend-screen">
            <span>The Local Train</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            <span>Shaan</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            <span>Salim-Sulaiman</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            <span>Sunidhi Chauhan</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            <span>Amit Trivedi</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            
            {/* Duplicate */}
            <span>The Local Train</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            <span>Shaan</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            <span>Salim-Sulaiman</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            <span>Sunidhi Chauhan</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
            <span>Amit Trivedi</span>
            <Sparkles className="w-8 h-8 text-[#ff6b35] shrink-0" />
          </div>
        </div>
      </section>

'''
    
    # Insert marquee section BEFORE photos section
    photos_section_anchor = '{/* ?? NEW PHOTOS MARQUEE ?? */}'
    
    if photos_section_anchor in content:
        content = content.replace(photos_section_anchor, marquee_section + '\n      ' + photos_section_anchor)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated Home.jsx successfully")
    else:
        print("Anchor not found in Home.jsx")

update_home('src/pages/Home.jsx')
