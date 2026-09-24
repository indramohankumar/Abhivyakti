import codecs
import re

def fix_polaroid(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The broken component
    broken_regex = r'const EventPolaroid = \(\{.*?\}\) => \{.*?\};\n'
    
    # The correct component
    correct_comp = """const EventPolaroid = ({ image, title, index, color = "from-[#ff6b35] to-[#ff5f3c]", rotation = "rotate-0", tapeColor = "bg-white/30" }) => {
  return (
    <div className={`shrink-0 w-[260px] sm:w-[300px] bg-[#0a050a] border border-white/20 p-3 pb-0 flex flex-col relative group cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(255,107,53,0.4)] ${rotation}`}>
      {/* Realistic Tape */}
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 ${tapeColor} backdrop-blur-md opacity-80 shadow-sm rotate-2 z-20 mix-blend-screen`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30"></div>
      </div>
      
      {/* Top Header */}
      <div className="flex justify-between items-center px-1 py-2 text-[10px] text-white/50 font-mono tracking-widest uppercase">
        <span>[ № {index}/06 ]</span>
        <span className="text-[#ff6b35]">[ ABHIVYAKTI &apos;26 ]</span>
      </div>
      
      {/* Image with internal border */}
      <div className="w-full aspect-[4/5] overflow-hidden relative border border-white/5 rounded-sm">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale-[30%] contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 scale-110 group-hover:scale-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
      </div>
      
      {/* Bottom Bar with Gradient */}
      <div className={`w-full bg-gradient-to-r ${color} mt-3 mb-3 p-3 flex justify-between items-end relative overflow-hidden rounded-sm shadow-inner`}>
        <h3 className="font-black text-black text-2xl uppercase tracking-tighter leading-none z-10 drop-shadow-sm">{title}</h3>
        {/* Fake Barcode / Equalizer */}
        <div className="flex gap-[2px] h-5 items-end z-10 opacity-60 mix-blend-multiply">
          {[2,4,3,1,5,2,4,1,3,2,5].map((h, i) => (
            <div key={i} className="w-[2px] bg-black transition-all duration-300 group-hover:h-full" style={{ height: `${h * 4}px` }}></div>
          ))}
        </div>
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
