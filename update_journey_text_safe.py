import codecs

with codecs.open('src/pages/Journey.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Change Across India to 3 DAYS OF GLORY
content = content.replace("Across India", "3 DAYS OF GLORY")

# 2. Change Description
old_desc = "Rock, rap, beatboxing, comedy and DJ battles hit your city before the grand finale at Quantum University. Hit the road with us."
new_desc = "A magnificent three-day cultural and academic extravaganza. Experience breathtaking performances, fierce inter-university competitions, and unforgettable moments at Quantum University."
content = content.replace(old_desc, new_desc)

# 3. Inject Left-to-Right Marquee
marquee_code = '''        </motion.div>
      </header>

      {/* Marquee Left to Right */}
      <div className="w-full bg-gradient-to-r from-[#9b1c31] via-[#ff6b35] to-[#9b1c31] py-4 overflow-hidden flex whitespace-nowrap shadow-[0_0_40px_rgba(255,107,53,0.4)] relative z-20 border-y border-[#ff6b35]/50">
        <style dangerouslySetInnerHTML={{__html: 
          @keyframes marqueeReverse {
            0% { transform: translateX(-33.333333%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-reverse {
            animation: marqueeReverse 25s linear infinite;
          }
        }} />
        <div className="flex items-center gap-8 text-[#12091f] font-black uppercase text-xl sm:text-2xl tracking-[0.2em] animate-marquee-reverse w-max drop-shadow-md">
          <span>THE FIRE WITHIN \u2022 40+ COMPETITIONS \u2022 CULTURAL EXTRAVAGANZA \u2022 UNFORGETTABLE MEMORIES \u2022</span>
          <span>THE FIRE WITHIN \u2022 40+ COMPETITIONS \u2022 CULTURAL EXTRAVAGANZA \u2022 UNFORGETTABLE MEMORIES \u2022</span>
          <span>THE FIRE WITHIN \u2022 40+ COMPETITIONS \u2022 CULTURAL EXTRAVAGANZA \u2022 UNFORGETTABLE MEMORIES \u2022</span>
        </div>
      </div>

      {/* Timeline */}'''

content = content.replace("        </motion.div>\n      </header>\n\n      {/* Timeline */}", marquee_code)

with codecs.open('src/pages/Journey.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
