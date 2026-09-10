import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ArrowRight, ExternalLink, Music, Users, VenetianMask, Shirt, Palette, Utensils, Menu, X } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const categories = [
  {
    name: "Music",
    events: "Indian Classical, Semi-Classical, Sufi, Indian Folk, Devotional, Ghazal",
    icon: Music,
    gradient: "from-saffron to-amber-400",
    shadow: "shadow-saffron/20",
    emoji: "🎵"
  },
  {
    name: "Dance",
    events: "Classical, Semi-Classical, Indian Folk",
    icon: Users,
    gradient: "from-quantum-pink to-rose-400",
    shadow: "shadow-pink-500/20",
    emoji: "💃"
  },
  {
    name: "Theatre",
    events: "Indian Mythology-Based Drama",
    icon: VenetianMask,
    gradient: "from-maroon to-red-700",
    shadow: "shadow-red-800/20",
    emoji: "🎭"
  },
  {
    name: "Fashion",
    events: "Fashion Show – Indian Ethnic Wear",
    icon: Shirt,
    gradient: "from-quantum-purple to-fuchsia-500",
    shadow: "shadow-purple-500/20",
    emoji: "👗"
  },
  {
    name: "Fine Arts",
    events: "Rangoli & Visual Arts",
    icon: Palette,
    gradient: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20",
    emoji: "🎨"
  },
  {
    name: "Indian Cuisine",
    events: "Inter-University Culinary Competition",
    icon: Utensils,
    gradient: "from-gold to-amber-500",
    shadow: "shadow-yellow-500/20",
    emoji: "🍛"
  }
];

/* Decorative mandala SVG pattern */
const MandalaDecor = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
    <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
    <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
    <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
    {[...Array(12)].map((_, i) => (
      <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.3" opacity="0.15"
        transform={`rotate(${i * 30} 100 100)`}/>
    ))}
    {[...Array(8)].map((_, i) => (
      <ellipse key={`e${i}`} cx="100" cy="100" rx="60" ry="20" stroke="currentColor" strokeWidth="0.4" opacity="0.12"
        transform={`rotate(${i * 22.5} 100 100)`}/>
    ))}
  </svg>
);

/* Decorative ornament border */
const OrnamentBorder = () => (
  <div className="flex items-center justify-center gap-2 my-2">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
    <span className="text-gold text-base sm:text-lg">✦</span>
    <span className="text-saffron text-xs sm:text-sm">❈</span>
    <span className="text-gold text-base sm:text-lg">✦</span>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
  </div>
);

const navItems = ['About', 'Events', 'Kavyanjali'];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cultural font-sans text-gray-800 selection:bg-quantum-pink selection:text-white overflow-x-hidden">

      {/* ─── Navbar ─── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed w-full z-50 bg-cream/90 backdrop-blur-xl border-b border-gold/20 shadow-[0_2px_20px_rgba(212,160,23,0.08)]"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-[72px]">

            {/* Logo group */}
            <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.1 }}
                src="/logo.png"
                alt="Quantum University"
                className="h-8 sm:h-10 md:h-11 object-contain"
              />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-400 tracking-widest uppercase hidden sm:block">presents</span>
              <motion.span
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.1 }}
                className="text-lg sm:text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple via-quantum-pink to-saffron tracking-tight"
              >
                Abhivyakti
              </motion.span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className="px-4 py-2 text-gray-600 font-medium rounded-full hover:bg-saffron/10 hover:text-maroon transition-colors duration-150"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Right side: Register + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,153,51,0.35)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1, ease: "linear" }}
                href="#register"
                className="bg-gradient-to-r from-saffron via-quantum-pink to-quantum-purple text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold shadow-md flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
              >
                Register
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.a>

              {/* Hamburger for mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/60 border border-gold/20 text-maroon active:scale-95 transition-transform"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-gold/10 bg-cream/95 backdrop-blur-xl"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-saffron/10 hover:text-maroon active:bg-saffron/20 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── Hero Section ─── */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 px-4 min-h-[100dvh] flex items-center relative overflow-hidden">
        {/* Background mandalas — visible on all screens */}
        <MandalaDecor className="absolute -top-10 -right-10 sm:-top-16 sm:-right-16 w-[300px] sm:w-80 md:w-[500px] h-[300px] sm:h-80 md:h-[500px] text-saffron/30 animate-[spin_60s_linear_infinite]" />
        <MandalaDecor className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 w-[350px] sm:w-96 md:w-[600px] h-[350px] sm:h-96 md:h-[600px] text-quantum-purple/20 animate-[spin_80s_linear_infinite_reverse]" />
        <MandalaDecor className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] text-gold/10 animate-[spin_90s_linear_infinite]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-5 sm:space-y-6 md:space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/70 backdrop-blur-sm border border-gold/30 text-maroon font-semibold text-xs sm:text-sm shadow-sm">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saffron" />
              <span>Annual Literary &amp; Cultural Festival 2026</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] sm:leading-[1.1]">
              <span className="text-maroon">Celebrating</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-quantum-pink to-quantum-purple text-shadow-warm">
                भारतीय संस्कृति
              </span>
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700">through Abhivyakti</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              A vibrant confluence of <span className="font-semibold text-maroon">literary excellence</span>,{' '}
              <span className="font-semibold text-saffron">cultural richness</span>, and{' '}
              <span className="font-semibold text-quantum-purple">intellectual engagement</span> at Quantum University, Roorkee.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gold/20">
                <div className="bg-saffron/15 p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-saffron">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">October 2026</p>
                  <p className="text-xs sm:text-sm text-gray-500">Five days of celebration</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gold/20">
                <div className="bg-maroon/10 p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-maroon">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">Quantum University</p>
                  <p className="text-xs sm:text-sm text-gray-500">Roorkee, Uttarakhand</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-4 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-saffron/20 via-quantum-pink/10 to-quantum-purple/20 blur-3xl rounded-full scale-110"></div>
            <div className="relative bg-gradient-to-br from-cream/80 via-white/60 to-cream/80 backdrop-blur-xl p-5 sm:p-8 rounded-2xl sm:rounded-[3rem] border border-gold/20 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col justify-center">
              {/* Decorative blobs */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-16 sm:w-24 h-16 sm:h-24 bg-saffron/25 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-20 sm:w-32 h-20 sm:h-32 bg-quantum-purple/20 rounded-full blur-2xl"></div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-6xl opacity-20 select-none">🪔</div>
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-3xl sm:text-5xl opacity-15 select-none">🏵️</div>

              <div className="z-10 text-center space-y-2 sm:space-y-4">
                <p className="text-3xl sm:text-5xl">🎭</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-maroon">Grand Culmination</h2>
                <OrnamentBorder />
                <p className="text-quantum-purple font-semibold text-sm sm:text-lg">with 'Kavyanjali' — काव्यांजलि</p>
                <p className="text-gray-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  The spectacular Kavi Sammelan — a mesmerizing poetry recital attracting eminent literary personalities from across India.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Decorative divider ─── */}
      <div className="max-w-4xl mx-auto px-4">
        <OrnamentBorder />
      </div>

      {/* ─── Events Section ─── */}
      <section id="events" className="py-12 sm:py-16 md:py-20 px-4 relative z-10">
        <MandalaDecor className="absolute top-0 right-0 w-[280px] sm:w-72 md:w-96 h-[280px] sm:h-72 md:h-96 text-gold/15 -translate-y-1/3 translate-x-1/4 animate-[spin_70s_linear_infinite]" />
        <MandalaDecor className="absolute bottom-0 left-0 w-[220px] sm:w-60 md:w-80 h-[220px] sm:h-60 md:h-80 text-saffron/10 translate-y-1/4 -translate-x-1/4 animate-[spin_50s_linear_infinite_reverse]" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-saffron font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3"
            >
              ✦ प्रतियोगिताएं ✦
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-maroon mb-3 sm:mb-4"
            >
              Competitions & Events
            </motion.h2>
            <OrnamentBorder />
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg mt-3 sm:mt-4 px-2">
              Showcase your talent across six grand cultural arenas celebrating the soul of Indian tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.15 } }}
                className={`bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gold/15 shadow-lg ${cat.shadow} cursor-pointer group active:scale-[0.98] transition-transform`}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-5">
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center shadow-md`}>
                    <cat.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform duration-150">{cat.emoji}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-maroon mb-1 sm:mb-2 group-hover:text-quantum-purple transition-colors duration-150">{cat.name}</h3>
                <p className="text-gray-600 font-medium leading-relaxed text-sm sm:text-base">{cat.events}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Decorative divider ─── */}
      <div className="max-w-4xl mx-auto px-4">
        <OrnamentBorder />
      </div>

      {/* ─── Registration Section ─── */}
      <section id="register" className="py-14 sm:py-20 md:py-24 px-4 relative overflow-hidden">
        <MandalaDecor className="absolute bottom-0 left-0 w-[260px] sm:w-80 h-[260px] sm:h-80 text-quantum-purple/10 translate-y-1/3 -translate-x-1/4 animate-[spin_65s_linear_infinite]" />
        <MandalaDecor className="absolute top-0 right-0 w-[200px] sm:w-64 h-[200px] sm:h-64 text-saffron/10 -translate-y-1/4 translate-x-1/4 animate-[spin_55s_linear_infinite_reverse]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-cream via-white to-cream p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-[3rem] shadow-xl border border-gold/20 relative"
          >
            <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-br from-saffron/30 to-quantum-pink/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-20 sm:w-36 h-20 sm:h-36 bg-gradient-to-br from-quantum-purple/20 to-gold/15 rounded-full blur-3xl"></div>

            <p className="text-3xl sm:text-5xl mb-3 sm:mb-4">🪔</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 text-maroon">Be Part of the Celebration</h2>
            <OrnamentBorder />
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-10 max-w-2xl mx-auto mt-3 sm:mt-4 px-1">
              Ready to showcase your talent? Register now through our official Google Form and join thousands of students from across India at Abhivyakti 2026.
            </p>

            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(255,153,51,0.35)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              href="https://forms.gle/your-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-saffron via-quantum-pink to-quantum-purple text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold shadow-xl shadow-saffron/25 active:scale-95 transition-transform"
            >
              Fill Registration Form
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-gradient-to-br from-maroon via-gray-900 to-gray-900 text-white py-10 sm:py-14 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-5 sm:gap-8 md:flex-row md:justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src="/logo.png" alt="Quantum University" className="h-8 sm:h-10 brightness-0 invert opacity-70" />
              <div className="h-5 sm:h-6 w-px bg-white/20"></div>
              <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-saffron via-pink-400 to-purple-400">
                Abhivyakti '26
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm text-center">
              © 2026 Quantum University, Roorkee. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm">
              <a href="#" className="hover:text-saffron transition-colors duration-150">Privacy Policy</a>
              <a href="#" className="hover:text-saffron transition-colors duration-150">Terms of Event</a>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 text-center text-gray-500 text-[10px] sm:text-xs">
            <span>Celebrating Indian culture, literature, and artistic expression 🇮🇳</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
