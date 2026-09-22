# -*- coding: utf-8 -*-
import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'({\/\*\s*??? HERO .*?\*\/}.*?)({\/\*\s*.*HIGHLIGHTS BAR.*\*\/})', re.DOTALL | re.IGNORECASE)

hero_replacement = '''{/* ?? HERO (Using Uploaded Theme Splash) ?? */}
      <section className="relative min-h-[90dvh] sm:min-h-[100dvh] flex flex-col items-center justify-end pt-16 pb-12 sm:pt-24 sm:pb-20 px-4 overflow-hidden bg-[#0A0505]">
        
        {/* The Uploaded Theme Image */}
        <div 
          className="absolute inset-0 bg-cover bg-top sm:bg-center z-0"
          style={{ backgroundImage: "url('/theme-bg.png')" }}
        />
        
        {/* Gradient overlay to seamlessly fade into the deep black/brown body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0505] via-[#0A0505]/40 to-transparent z-0 pointer-events-none" />

        {/* Floating Diyas & Particles */}
        <SparkleParticle className="top-1/4 left-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 z-10" delay={0.2} />
        <SparkleParticle className="bottom-1/3 left-1/4 w-2 h-2 sm:w-3 sm:h-3 z-10" delay={1.2} />
        <SparkleParticle className="top-1/3 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 z-10" delay={2.5} />
        <SparkleParticle className="bottom-1/4 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 z-10" delay={0.8} />

        {/* Centered Content (placed below the image's built-in typography) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-auto pointer-events-auto pt-40 sm:pt-80 pb-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 sm:space-y-8 flex flex-col items-center w-full">

            <motion.div variants={fadeUp} className="w-full max-w-md mx-auto">
              {countdown.isLive ? (
                /* LIVE MODE */
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
                /* POST EVENT */
                <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-gold/20 bg-gold/[0.04] backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <div className="text-left">
                    <p className="text-gold font-bold text-sm">Abhivyakti 2026 has concluded</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Thank you for being part of the celebration!</p>
                  </div>
                </div>
              ) : (
                /* COUNTDOWN MODE */
                <div className="rounded-2xl border overflow-hidden bg-white/[0.02] border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(201,168,76,0.1)]">
                  <div className="px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between border-b border-white/10 bg-black/40">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gold/80" />
                      <span className="text-[10px] sm:text-xs text-gray-300 font-semibold uppercase tracking-wider">Starts Oct 22, 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-gold/60" />
                      <span className="text-[10px] sm:text-xs text-gray-400">Roorkee</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 divide-x divide-white/10 bg-black/20">
                    {[
                      { val: countdown.days, label: 'Days' },
                      { val: countdown.hours, label: 'Hours' },
                      { val: countdown.minutes, label: 'Min' },
                      { val: countdown.seconds, label: 'Sec' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center py-2.5 sm:py-4 px-1">
                        <span className="text-2xl sm:text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_2px_10px_rgba(201,168,76,0.3)]">
                          {String(item.val).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[10px] text-gold/80 uppercase font-bold tracking-widest mt-1">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-6 w-full">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfmgwAHb9CEGP9jj13wmTf3regVu8ikecjMfDCEYg53orF0Mg/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#C9A84C] via-[#E8D48B] to-[#8B7332] hover:brightness-110 rounded-full overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all hover:scale-105 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center justify-center gap-2 text-[#0A0505] font-extrabold tracking-[0.2em] uppercase text-xs sm:text-sm">
                  Register Inter-University <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <Link 
                to="/inter-school"
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-gold/50 rounded-full backdrop-blur-md transition-all w-full sm:w-auto hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]"
              >
                <span className="flex items-center justify-center gap-2 text-gray-200 group-hover:text-gold font-bold tracking-[0.1em] uppercase text-xs sm:text-sm">
                  Inter-School Events <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </span>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>
      '''

new_content, count = pattern.subn(hero_replacement + r'\n      \2', content)

if count > 0:
    with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Replaced Hero Section!")
else:
    # Try alternate match if it couldn't find the pattern
    pattern = re.compile(r'({\/\*\s*-------- HERO --------\s*\*\/}.*?)({\/\*\s*.*HIGHLIGHTS BAR.*\*\/})', re.DOTALL | re.IGNORECASE)
    new_content, count = pattern.subn(hero_replacement + r'\n      \2', content)
    if count > 0:
        with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("SUCCESS: Replaced Hero Section (Fallback Regex)!")
    else:
        print("FAIL: Could not find Hero section to replace.")
