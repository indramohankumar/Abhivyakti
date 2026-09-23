import codecs

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

if "import { EmberParticles }" not in content:
    content = content.replace("import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';", "import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';\nimport { EmberParticles } from '../components/ui/EmberParticles';")

old_nav_class = """className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled
              ? dark ? 'bg-dark-bg/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-dark-border' : 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gold/5 border-b border-gold/10'
              : 'bg-transparent'
          }`}"""
new_nav_class = """className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled
              ? 'backdrop-blur-md bg-white/5 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
              : 'bg-transparent'
          }`}"""
content = content.replace(old_nav_class, new_nav_class)


old_reg_btn_desktop = 'className="ml-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-5 py-2 rounded-lg font-semibold text-sm hover:brightness-110 transition-all">Register Now'
new_reg_btn_desktop = 'className="ml-2 bg-gradient-to-r from-yellow-400 to-[#ff5f3c] text-white px-6 py-2 rounded-lg font-extrabold text-sm shadow-[0_0_20px_rgba(255,165,0,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,165,0,0.8)] transition-all duration-300 tracking-wide uppercase">Register Now'
content = content.replace(old_reg_btn_desktop, new_reg_btn_desktop)


old_reg_btn_mobile = 'className="block mt-3 text-center bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-5 py-3 rounded-lg font-bold text-sm">Register Now'
new_reg_btn_mobile = 'className="block mt-3 text-center bg-gradient-to-r from-yellow-400 to-[#ff5f3c] text-white px-5 py-3 rounded-lg font-black text-sm shadow-[0_0_20px_rgba(255,165,0,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,165,0,0.8)] transition-all duration-300 uppercase tracking-widest">Register Now'
content = content.replace(old_reg_btn_mobile, new_reg_btn_mobile)


old_sparks = '''        {/* Floating Sparks (Antaragni Fire Particles) */}
        <SparkleParticle className="top-1/4 left-1/3 w-2 h-2 sm:w-3 sm:h-3 z-10 text-[#ff6b35]" delay={0.2} />
        <SparkleParticle className="bottom-1/3 left-1/4 w-2 h-2 sm:w-3 sm:h-3 z-10 text-[#ff5f3c]" delay={1.2} />
        <SparkleParticle className="top-1/3 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 z-10 text-[#e92a67]" delay={2.5} />
        <SparkleParticle className="bottom-1/4 right-1/3 w-2 h-2 sm:w-3 sm:h-3 z-10 text-[#ff6b35]" delay={0.8} />'''
new_sparks = '''        {/* Dynamic Ember Particles */}
        <EmberParticles />'''
content = content.replace(old_sparks, new_sparks)

old_title_block = '''            <motion.div variants={fadeUp} className="space-y-2 flex flex-col items-center">
              <h1 className="font-hindi text-[4rem] xs:text-[5rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11.5rem] font-extrabold leading-[1.1] tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] drop-shadow-[0_0_50px_rgba(255,107,53,0.4)] min-h-[1.2em]">
                <TypeWriter
                  text="अभिव्यक्ति"
                  delay={100}
                  speed={200}
                  cursorColor="#ff6b35"
                />
              </h1>
              <div className="font-serif text-xl sm:text-3xl md:text-4xl font-black tracking-[0.25em] uppercase block text-white drop-shadow-[0_0_20px_rgba(255,107,53,0.5)] mt-2">
                Abhivyakti 2026
              </div>
              <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent mt-4 opacity-70"></div>
              <p className="text-[10px] sm:text-sm tracking-[0.2em] uppercase font-bold text-gray-400 mt-3">
                The Fire Within • Expression of Culture
              </p>
            </motion.div>'''
new_title_block = '''            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
              className="space-y-2 flex flex-col items-center relative"
            >
              {/* Animated Fire Glow Behind Title */}
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-600/30 rounded-full blur-[100px] pointer-events-none -z-10" 
              />
              
              <h1 className="font-hindi text-[4rem] xs:text-[5rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11.5rem] font-extrabold leading-[1.1] tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] drop-shadow-[0_0_50px_rgba(255,107,53,0.4)] min-h-[1.2em]">
                <TypeWriter
                  text="अभिव्यक्ति"
                  delay={100}
                  speed={200}
                  cursorColor="#ff6b35"
                />
              </h1>

              <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} 
                className="flex flex-col items-center w-full"
              >
                <div className="font-serif text-xl sm:text-3xl md:text-4xl font-black tracking-[0.25em] uppercase block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mt-2 drop-shadow-[0_0_20px_rgba(255,165,0,0.5)]">
                  Abhivyakti 2026
                </div>
                <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent mt-4 opacity-70"></div>
                <p className="text-[10px] sm:text-sm tracking-[0.2em] uppercase font-bold text-gray-400 mt-3">
                  The Fire Within • Expression of Culture
                </p>
              </motion.div>
            </motion.div>'''
content = content.replace(old_title_block, new_title_block)

# Glassmorphism on countdown
old_countdown_live = 'className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-red-500/50 bg-red-500/[0.1] backdrop-blur-md shadow-[0_0_30px_rgba(255,0,0,0.3)]"'
new_countdown_live = 'className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-red-500/30 bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,0,0.2)]"'
content = content.replace(old_countdown_live, new_countdown_live)

old_countdown_past = 'className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] backdrop-blur-md"'
new_countdown_past = 'className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"'
content = content.replace(old_countdown_past, new_countdown_past)

# Wrap Countdown with motion slide up
old_countdown_block = '{/* Countdown Timer */}'
new_countdown_block = '{/* Countdown Timer */}\\n          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.8, ease: "easeOut" }} className="w-full max-w-4xl flex justify-center mt-2">'
content = content.replace(old_countdown_block, new_countdown_block)
content = content.replace('<CountdownTimer />', '<CountdownTimer />\\n          </motion.div>')


with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
