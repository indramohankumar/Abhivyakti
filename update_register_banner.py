import codecs
import re

def update_home_register(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the old register section
    regex = r'\{\/\* \?\? REGISTER \?\? \*\/\}[\s\S]*?<\/section>'
    
    new_register_section = r"""{/* ?? REGISTER ?? */}
        <section id="register" className="py-32 md:py-48 px-4 relative overflow-hidden bg-[#12091f]">
          <GoldenWheel className={`absolute top-10 left-10 w-40 h-40 opacity-20 animate-[spin_65s_linear_infinite] text-gold`} />
          <SparkleParticle className="top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3" delay={0.5} />
  
          {/* GIANT "SEE YOU IN OCTOBER" BACKGROUND */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-90 pointer-events-none select-none z-0">
            <h1 className="font-black tracking-tighter leading-[0.8] flex flex-col items-center text-center w-full">
               <span className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] bg-clip-text text-transparent bg-gradient-to-b from-[#ffb703] via-[#ff6b35] to-[#9b1c31] drop-shadow-2xl z-10 translate-y-[10%]">SEE YOU</span>
               <span className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] text-transparent z-0 tracking-widest font-sans" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>IN OCTOBER</span>
            </h1>
          </div>

          {/* FAST MOVING TILTED TAPE */}
          <div className="absolute top-[65%] md:top-[70%] left-[-5%] w-[110%] h-14 md:h-20 bg-[#ffb703] -rotate-3 shadow-[0_0_50px_rgba(255,183,3,0.4)] z-20 flex items-center overflow-hidden border-y-2 border-white/20 mix-blend-screen">
             <div className="animate-marquee flex gap-10 items-center whitespace-nowrap text-black font-black text-2xl md:text-4xl uppercase tracking-tighter" style={{ animationDuration: '8s' }}>
                 <span>Quantum University</span> <Sparkles className="w-8 h-8 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-8 h-8 text-black" /> <span>Join Now</span> <Sparkles className="w-8 h-8 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-8 h-8 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-8 h-8 text-black" /> <span>Join Now</span> <Sparkles className="w-8 h-8 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-8 h-8 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-8 h-8 text-black" /> <span>Join Now</span> <Sparkles className="w-8 h-8 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-8 h-8 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-8 h-8 text-black" /> <span>Join Now</span> <Sparkles className="w-8 h-8 text-black" />
             </div>
          </div>

          <div className="max-w-2xl mx-auto relative z-30 mt-32 sm:mt-48">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className={`text-center p-6 sm:p-10 md:p-12 rounded-3xl border relative overflow-hidden backdrop-blur-xl bg-black/50 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#9b1c31]"></div>
  
              <p className="text-gold-gradient text-2xl sm:text-4xl font-extrabold mb-1 pt-2 pb-1">उत्सव की तैयारी करें</p>
              <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-black mb-1.5 sm:mb-2 text-white">Join the Celebration</h2>
              <GoldLine />
              <p className="text-xs sm:text-base mb-6 sm:mb-8 max-w-md mx-auto mt-2 sm:mt-3 text-gray-300">
                Register through our official Google Form and represent your university at Abhivyakti 2026. Open to all universities across India.
              </p>
  
              <a 
href="https://docs.google.com/forms/d/e/1FAIpQLSfmgwAHb9CEGP9jj13wmTf3regVu8ikecjMfDCEYg53orF0Mg/viewform?usp=header" 
target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ff5f3c] text-black px-6 py-3 sm:px-10 sm:py-4 rounded-xl text-[14px] sm:text-lg font-black hover:scale-105 active:scale-[0.97] transition-all shadow-[0_0_30px_rgba(255,107,53,0.5)] uppercase tracking-widest w-full sm:w-auto">
                Register Now <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>"""
        
    if re.search(regex, content):
        content = re.sub(regex, new_register_section, content, count=1)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully updated register section in Home.jsx")
    else:
        print("Regex failed to match in Home.jsx")

update_home_register('src/pages/Home.jsx')
