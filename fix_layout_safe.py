import codecs
import re

def fix_register_layout(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the current register section
    regex = r'\{\/\* \?\? REGISTER \?\? \*\/\}[\s\S]*?<\/section>'
    
    new_register_section = """{/* ?? REGISTER ?? */}
        <section id="register" className="py-20 md:py-32 px-4 relative overflow-hidden bg-[#12091f] flex flex-col items-center justify-center">
          <GoldenWheel className={`absolute top-10 left-10 w-40 h-40 opacity-20 animate-[spin_65s_linear_infinite] text-gold`} />
          <SparkleParticle className="top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3" delay={0.5} />
  
          {/* GIANT "SEE YOU IN OCTOBER" GRAPHIC (Now visible at the top) */}
          <div className="relative w-full flex flex-col items-center justify-center z-10 pt-10">
            <h1 className="font-black tracking-tighter leading-[0.85] flex flex-col items-center text-center w-full">
               <span className="text-[70px] sm:text-[100px] md:text-[150px] lg:text-[180px] bg-clip-text text-transparent bg-gradient-to-b from-[#ffb703] via-[#ff6b35] to-[#9b1c31] drop-shadow-2xl z-20">SEE YOU</span>
               <span className="text-[70px] sm:text-[100px] md:text-[150px] lg:text-[180px] text-transparent z-10 tracking-widest font-sans -mt-4 sm:-mt-8 md:-mt-12" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.6)' }}>IN OCTOBER</span>
            </h1>
          </div>

          {/* FAST MOVING TILTED TAPE */}
          <div className="relative w-[110%] h-12 md:h-16 bg-[#ffb703] -rotate-3 shadow-[0_0_50px_rgba(255,183,3,0.4)] z-30 flex items-center overflow-hidden border-y-2 border-white/40 mt-8 mb-16 mix-blend-screen">
             <div className="animate-marquee flex gap-10 items-center whitespace-nowrap text-black font-black text-2xl md:text-3xl uppercase tracking-tighter" style={{ animationDuration: '6s' }}>
                 <span>Quantum University</span> <Sparkles className="w-6 h-6 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-6 h-6 text-black" /> <span>Join Now</span> <Sparkles className="w-6 h-6 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-6 h-6 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-6 h-6 text-black" /> <span>Join Now</span> <Sparkles className="w-6 h-6 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-6 h-6 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-6 h-6 text-black" /> <span>Join Now</span> <Sparkles className="w-6 h-6 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-6 h-6 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-6 h-6 text-black" /> <span>Join Now</span> <Sparkles className="w-6 h-6 text-black" />
             </div>
          </div>

          <div className="max-w-2xl mx-auto w-full relative z-40">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={`text-center p-8 sm:p-12 md:p-14 rounded-3xl border relative overflow-hidden backdrop-blur-xl bg-black/60 border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]`}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#9b1c31]"></div>
  
              <p className="text-gold-gradient text-2xl sm:text-4xl font-extrabold mb-1 pt-2 pb-1">उत्सव की तैयारी करें</p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black mb-2 text-white">Join the Celebration</h2>
              <GoldLine />
              <p className="text-sm sm:text-base mb-8 max-w-md mx-auto mt-4 text-gray-300 leading-relaxed">
                Register through our official Google Form and represent your university at Abhivyakti 2026. Open to all universities across India.
              </p>
  
              <a 
href="https://docs.google.com/forms/d/e/1FAIpQLSfmgwAHb9CEGP9jj13wmTf3regVu8ikecjMfDCEYg53orF0Mg/viewform?usp=header" 
target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ff5f3c] text-black px-8 py-4 rounded-xl text-base sm:text-xl font-black hover:scale-105 active:scale-[0.97] transition-all shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:shadow-[0_0_60px_rgba(255,107,53,0.6)] uppercase tracking-widest w-full sm:w-auto">
                Register Now <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>"""
        
    content = re.sub(regex, new_register_section, content, count=1)
    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed syntax")

fix_register_layout('src/pages/Home.jsx')
