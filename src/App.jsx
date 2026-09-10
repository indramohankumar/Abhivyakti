import React, { useState, useEffect } from 'react';
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
  },
  {
    name: "Dance",
    events: "Classical, Semi-Classical, Indian Folk",
    icon: Users,
    gradient: "from-quantum-pink to-rose-400",
  },
  {
    name: "Theatre",
    events: "Indian Mythology-Based Drama",
    icon: VenetianMask,
    gradient: "from-maroon to-red-700",
  },
  {
    name: "Fashion",
    events: "Fashion Show – Indian Ethnic Wear",
    icon: Shirt,
    gradient: "from-quantum-purple to-fuchsia-500",
  },
  {
    name: "Fine Arts",
    events: "Rangoli & Visual Arts",
    icon: Palette,
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    name: "Indian Cuisine",
    events: "Inter-University Culinary Competition",
    icon: Utensils,
    gradient: "from-gold to-amber-500",
  }
];

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

const Divider = () => (
  <div className="flex items-center justify-center gap-3 my-6 sm:my-8 max-w-xs mx-auto">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30"></div>
    <div className="w-1.5 h-1.5 rounded-full bg-gold/50"></div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30"></div>
  </div>
);

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Kavyanjali', href: '#kavyanjali' },
  { label: 'Register', href: '#register' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="min-h-screen bg-cultural font-sans text-gray-800 overflow-x-hidden">

      {/* ─── Navbar ─── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-[72px]">

            {/* Logo — clean, just logo + name */}
            <a href="#" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Quantum University"
                className="h-7 sm:h-9 md:h-10 object-contain"
              />
              <span className="text-base sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple to-quantum-pink">
                Abhivyakti
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.slice(0, 3).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm text-gray-600 font-medium rounded-lg hover:text-maroon hover:bg-saffron/8 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#register"
                className="ml-3 bg-gradient-to-r from-quantum-purple to-quantum-pink text-white px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Register Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 active:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-saffron/8 active:bg-saffron/15 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#register"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-2 text-center bg-gradient-to-r from-quantum-purple to-quantum-pink text-white px-5 py-3 rounded-lg font-semibold text-sm"
                >
                  Register Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section className="pt-20 pb-10 sm:pt-24 sm:pb-14 md:pt-32 md:pb-20 px-4 min-h-[100dvh] flex items-center relative overflow-hidden">
        <MandalaDecor className="absolute -top-10 -right-10 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] text-saffron/20 animate-[spin_60s_linear_infinite]" />
        <MandalaDecor className="absolute -bottom-16 -left-16 w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] text-quantum-purple/15 animate-[spin_80s_linear_infinite_reverse]" />
        <MandalaDecor className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] text-gold/8 animate-[spin_90s_linear_infinite]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-5 sm:space-y-7"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-gold/20 text-maroon font-medium text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              Annual Literary & Cultural Festival 2026
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-[2rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
              <span className="text-gray-900">Celebrating Indian</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-quantum-pink to-quantum-purple">
                Culture & Heritage
              </span>
              <br />
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-500 block mt-2">through Abhivyakti at Quantum University</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-sm sm:text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
              A vibrant five-day confluence of literary excellence, cultural richness, and intellectual engagement — bringing together students, faculty, and eminent personalities from across India.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-gray-100">
                <div className="bg-saffron/10 p-2 rounded-lg text-saffron shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">October 2026</p>
                  <p className="text-xs text-gray-500">Five days of celebration</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-gray-100">
                <div className="bg-quantum-purple/10 p-2 rounded-lg text-quantum-purple shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Quantum University</p>
                  <p className="text-xs text-gray-500">Roorkee, Uttarakhand</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex gap-3 pt-1">
              <a
                href="#register"
                className="bg-gradient-to-r from-quantum-purple to-quantum-pink text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Register Now <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#events"
                className="border border-gray-200 text-gray-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/60 active:scale-[0.97] transition-all"
              >
                View Events
              </a>
            </motion.div>
          </motion.div>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mt-2 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-saffron/15 to-quantum-purple/15 blur-3xl rounded-full scale-110"></div>
            <div className="relative bg-white/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/60 shadow-xl overflow-hidden">
              <div className="absolute top-4 left-4 w-20 h-20 bg-saffron/15 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-quantum-purple/15 rounded-full blur-2xl"></div>

              <div className="relative z-10 space-y-4">
                <div className="bg-gradient-to-r from-maroon to-quantum-purple text-white text-xs font-semibold px-3 py-1 rounded-full inline-block">
                  Grand Finale
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Kavyanjali</h2>
                <p className="text-quantum-purple font-medium text-sm sm:text-base">काव्यांजलि — The Spectacular Kavi Sammelan</p>
                <Divider />
                <p className="text-gray-600 text-sm leading-relaxed">
                  A mesmerizing poetry recital marking the grand culmination of Abhivyakti, attracting eminent literary personalities from across India.
                </p>
                <div className="flex gap-4 pt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Day 5</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Main Auditorium</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Events ─── */}
      <section id="events" className="py-14 sm:py-18 md:py-24 px-4 relative">
        <MandalaDecor className="absolute top-0 right-0 w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] text-gold/10 -translate-y-1/3 translate-x-1/4 animate-[spin_70s_linear_infinite]" />
        <MandalaDecor className="absolute bottom-0 left-0 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] text-saffron/8 translate-y-1/4 -translate-x-1/4 animate-[spin_50s_linear_infinite_reverse]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-saffron font-semibold tracking-wider uppercase text-xs sm:text-sm mb-2">Competitions</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Events & Categories
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
              Six cultural arenas celebrating the soul of Indian artistic tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-gold/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center mb-4 shadow-sm`}>
                  <cat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-quantum-purple transition-colors">{cat.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cat.events}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Register ─── */}
      <section id="register" className="py-14 sm:py-20 md:py-24 px-4 relative overflow-hidden">
        <MandalaDecor className="absolute bottom-0 left-0 w-[260px] sm:w-80 h-[260px] sm:h-80 text-quantum-purple/8 translate-y-1/3 -translate-x-1/4 animate-[spin_65s_linear_infinite]" />
        <MandalaDecor className="absolute top-0 right-0 w-[200px] sm:w-64 h-[200px] sm:h-64 text-saffron/8 -translate-y-1/4 translate-x-1/4 animate-[spin_55s_linear_infinite_reverse]" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-md p-7 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Join the Celebration</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-md mx-auto">
              Register through our Google Form and secure your spot at Abhivyakti 2026. Open to all universities across India.
            </p>

            <a
              href="https://forms.gle/your-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-quantum-purple to-quantum-pink text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Fill Registration Form
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 text-white py-10 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Quantum University" className="h-7 sm:h-8 brightness-0 invert opacity-60" />
              <span className="text-sm font-medium text-gray-400">×</span>
              <span className="font-semibold text-gray-300">Abhivyakti '26</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2026 Quantum University, Roorkee
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
