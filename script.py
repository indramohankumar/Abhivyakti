# -*- coding: utf-8 -*-
import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'({\/\*\s*??? HERO .*?\*\/}.*?<section className=\"relative min-h-\[90dvh\].*?)({\/\*\s*.*HIGHLIGHTS BAR.*\*\/})', re.DOTALL | re.IGNORECASE)

hero_replacement = '''{/* ?? HERO (3D Animated Chakra & Crisp Text) ?? */}
      <section className="relative min-h-[95dvh] sm:min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-20 px-4 overflow-hidden bg-[#0A0505]">
        
        {/* Massive 3D Revolving Golden Chakra Background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          {/* Base ambient glow */}
          <div className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#4E301C]/40 blur-[120px] rounded-full z-0" />
          
          {/* Multiple rotating layers for 3D parallax effect */}
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ rotate: { duration: 150, repeat: Infinity, ease: "linear" }, scale: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute z-0 opacity-[0.15]"
          >
            <GoldenWheel className="w-[150vw] sm:w-[90vw] max-w-[1400px] h-[150vw] sm:h-[90vw] max-h-[1400px] text-[#C9A84C]" />
          </motion.div>

          <motion.div 
            animate={{ rotate: -360, scale: [1.05, 1, 1.05] }}
            transition={{ rotate: { duration: 200, repeat: Infinity, ease: "linear" }, scale: { duration: 15, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute z-0 opacity-[0.25] mix-blend-screen"
          >
            <GoldenWheel className="w-[100vw] sm:w-[60vw] max-w-[900px] h-[100vw] sm:h-[60vw] max-h-[900px] text-[#F3DA8C]" />
          </motion.div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ rotate: { duration: 300, repeat: Infinity, ease: "linear" } }}
            className="absolute z-0 opacity-40 blur-[1px]"
          >
            <GoldenWheel className="w-[50vw] sm:w-[30vw] max-w-[500px] h-[50vw] sm:h-[30vw] max-h-[500px] text-[#8B7332]" />
          </motion.div>
        </div>
        
        {/* Gradient overlay to seamlessly fade into the deep black/brown body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0505] via-[#0A0505]/20 to-transparent z-0 pointer-events-none" />

        {/* Floating Diyas & Particles */}
        <SparkleParticle className="top-1/4 left-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 z-10" delay={0.2} />
        <SparkleParticle className="bottom-1/3 left-1/4 w-2 h-2 sm:w-3 sm:h-3 z-10" delay={1.2} />
        <SparkleParticle className="top-1/3 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 z-10" delay={2.5} />
        <SparkleParticle className="bottom-1/4 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 z-10" delay={0.8} />

        {/* Centered Content (Crisp Text over 3D Chakra) */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-auto pointer-events-auto pb-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 sm:space-y-8 flex flex-col items-center w-full">

            {/* Crisp Typography */}
            <motion.div variants={fadeUp} className="space-y-2 flex flex-col items-center">
              <h1 className="font-hindi text-[4rem] xs:text-[5rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11.5rem] font-extrabold leading-[1.1] tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#F3DA8C] via-[#C9A84C] to-[#8B7332] drop-shadow-[0_0_40px_rgba(201,168,76,0.3)]">
                ??????????
              </h1>
              <TypeWriter
                text="Abhivyakti 2026"
                delay={500}
                speed={80}
                className="font-serif text-xl sm:text-3xl md:text-4xl font-black tracking-[0.25em] uppercase block text-white drop-shadow-md"
                cursorColor="#C9A84C"
              />
              <GoldLine />
              <p className="text-[10px] sm:text-sm tracking-[0.2em] uppercase font-semibold text-gray-400 mt-2">
                Expression of Indian Culture & Heritage
              </p>
            </motion.div>

            <motion.p variants={fadeUp} className="text-[13px] sm:text-base md:text-lg max-w-2xl leading-relaxed text-gray-400 font-light mt-4">
              A grand Three-day inter-university celebration of <strong className="text-gold">literary excellence</strong>, <strong className="text-quantum-pink">cultural richness</strong>, and <strong className="text-purple-400">intellectual engagement</strong> — uniting students, artists, and scholars from across India.
            </motion.p>

            <motion.div variants={fadeUp} className="w-full max-w-md mx-auto mt-6">
              {countdown.isLive ? (
                <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-red-500/30 bg-red-500/[0.06] backdrop-blur-sm">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-4 h-4 rounded-full bg-red-500 animate-ping opacity-40"></span>
                    <span className="relative w-3 h-3 rounded-full bg-red-500"></span>
                  </div>
                  <div className="text-left">
                    <p className="text-red-400 font-extrabold text-sm sm:text-base tracking-wider uppercase">Event is Live</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Oct 22-24, 2026 • Quantum University</p>
                  </div>
                </div>
              ) : countdown.isPast ? (
                <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-gold/20 bg-gold/[0.04] backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <div className="text-left">
                    <p className="text-gold font-bold text-sm">Abhivyakti 2026 has concluded</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Thank you for being part of the celebration!</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border overflow-hidden bg-[#0A0505]/40 border-gold/10 backdrop-blur-md shadow-[0_0_50px_rgba(201,168,76,0.15)]">
                  <div className="px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between border-b border-gold/10 bg-black/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[10px] sm:text-xs text-gray-300 font-semibold uppercase tracking-wider">Starts Oct 22, 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-gold/60" />
                      <span className="text-[10px] sm:text-xs text-gray-400">Roorkee</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 divide-x divide-gold/10 bg-black/40">
                    {[
                      { val: countdown.days, label: 'Days' },
                      { val: countdown.hours, label: 'Hours' },
                      { val: countdown.minutes, label: 'Min' },
                      { val: countdown.seconds, label: 'Sec' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center py-2.5 sm:py-4 px-1 group">
                        <span className="text-2xl sm:text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_2px_15px_rgba(201,168,76,0.4)] group-hover:scale-110 transition-transform">
                          {String(item.val).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[10px] text-gold uppercase font-bold tracking-widest mt-1 opacity-80">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-8 w-full">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfmgwAHb9CEGP9jj13wmTf3regVu8ikecjMfDCEYg53orF0Mg/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#C9A84C] via-[#E8D48B] to-[#C9A84C] bg-[length:200%_auto] hover:bg-[100%_auto] rounded-full overflow-hidden shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-all duration-500 hover:scale-105 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center justify-center gap-2 text-[#0A0505] font-extrabold tracking-[0.2em] uppercase text-xs sm:text-sm">
                  Register Inter-University <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <Link 
                to="/inter-school"
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0A0505]/60 hover:bg-black border border-gold/20 hover:border-gold/60 rounded-full backdrop-blur-md transition-all duration-500 w-full sm:w-auto hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
              >
                <span className="flex items-center justify-center gap-2 text-gold group-hover:text-[#F3DA8C] font-bold tracking-[0.1em] uppercase text-xs sm:text-sm transition-colors">
                  Inter-School Events <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </span>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>
      '''

# I'll just write it manually using a simpler regex.
content = re.sub(r'({\/\*\s*-------- HERO --------\s*\*\/}.*?)({\/\*\s*-------- HIGHLIGHTS BAR --------\s*\*\/})', hero_replacement + r'\n      \2', content, flags=re.DOTALL | re.IGNORECASE)

# If it didn't match the specific comments, I'll fallback to a broader one.
if "3D Animated Chakra & Crisp Text" not in content:
    content = re.sub(r'({\/\*\s*?? HERO.*?)({\/\*\s*-------- HIGHLIGHTS BAR)', hero_replacement + r'\n      \2', content, flags=re.DOTALL | re.IGNORECASE)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
