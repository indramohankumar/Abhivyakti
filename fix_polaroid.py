import codecs
import re

def fix_polaroid(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The broken component
    broken_regex = r'const EventPolaroid = \(\{.*?\}\) => \{.*?\};\n'
    
    # The correct component
    correct_comp = """const EventPolaroid = ({ image, title, index, color = "bg-[#ff6b35]", rotation = "rotate-0", tapeColor = "bg-[#ffd166]" }) => {
  return (
    <div className={`shrink-0 w-[240px] sm:w-[280px] bg-[#110915] border border-white/10 p-2 pb-0 flex flex-col relative group cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,107,53,0.3)] ${rotation}`}>
      {/* Tape */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 ${tapeColor} opacity-90 shadow-sm rotate-2 z-10`}></div>
      
      {/* Top Header */}
      <div className="flex justify-between items-center px-1 py-2 text-[8px] sm:text-[10px] text-white/50 font-mono tracking-widest uppercase">
        <span>[ № {index}/26 ]</span>
        <span>[ ABHIVYAKTI &apos;26 ]</span>
      </div>
      
      {/* Image */}
      <div className="w-full aspect-[4/5] overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-overlay pointer-events-none"></div>
      </div>
      
      {/* Bottom Bar */}
      <div className={`w-full ${color} mt-2 p-3 flex justify-between items-end relative overflow-hidden`}>
        <h3 className="font-black text-black text-xl sm:text-2xl uppercase tracking-tighter leading-none z-10">{title}</h3>
        {/* Fake Barcode */}
        <div className="flex gap-[2px] h-4 items-end z-10 opacity-70">
          {[1,2,3,1,4,1,2,1,5,1,2].map((h, i) => (
            <div key={i} className="w-[1.5px] bg-black" style={{ height: `${h * 4}px` }}></div>
          ))}
        </div>
        
        {/* Decorative corner bracket */}
        <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-black/30 pointer-events-none"></div>
      </div>
    </div>
  );
};
"""
    
    content = re.sub(broken_regex, correct_comp, content, flags=re.DOTALL)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed EventPolaroid")

fix_polaroid('src/pages/Home.jsx')
