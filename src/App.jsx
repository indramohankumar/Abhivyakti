import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ArrowRight, ExternalLink, Music, Users, VenetianMask, Shirt, Palette, Utensils, Menu, X, Sun, Moon } from 'lucide-react';

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
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30 dark:to-gold/15"></div>
    <div className="w-1.5 h-1.5 rounded-full bg-gold/50 dark:bg-gold/30"></div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30 dark:to-gold/15"></div>
  </div>
);

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Kavyanjali', href: '#kavyanjali' },
  { label: 'Register', href: '#register' },
];

// Theme hook
function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return [dark, () => setDark(d => !d)];
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, toggleDark] = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-300 ${
      dark ? 'bg-cultural-dark text-gray-200' : 'bg-cultural text-gray-800'
    }`}>

      {/* ─── Navbar ─── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? dark
              ? 'bg-dark-bg/90 backdrop-blur-xl shadow-md border-b border-dark-border'
              : 'bg-white/90 backdrop-blur-xl shadow-md border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-[72px]">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Quantum University"
                className={`h-7 sm:h-9 md:h-10 object-contain transition-all duration-300 ${dark ? 'brightness-0 invert' : ''}`}
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
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    dark
                      ? 'text-gray-400 hover:text-saffron hover:bg-white/5'
                      : 'text-gray-600 hover:text-maroon hover:bg-saffron/8'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Dark mode toggle */}
              <button
                onClick={toggleDark}
                className={`ml-2 w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  dark
                    ? 'text-yellow-400 hover:bg-white/5'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={dark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                  </motion.div>
                </AnimatePresence>
              </button>

              <a
                href="#register"
                className="ml-2 bg-gradient-to-r from-quantum-purple to-quantum-pink text-white px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Register Now
              </a>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={toggleDark}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  dark ? 'text-yellow-400' : 'text-gray-500'
                }`}
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                  dark ? 'text-gray-300 active:bg-white/10' : 'text-gray-700 active:bg-gray-100'
                }`}
                aria-label="Menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
              className={`md:hidden overflow-hidden backdrop-blur-xl border-t ${
                dark
                  ? 'bg-dark-bg/95 border-dark-border'
                  : 'bg-white/95 border-gray-100'
              }`}
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 font-medium rounded-lg transition-colors ${
                      dark
                        ? 'text-gray-300 hover:bg-white/5 active:bg-white/10'
                        : 'text-gray-700 hover:bg-saffron/8 active:bg-saffron/15'
                    }`}
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
        <MandalaDecor className={`absolute -top-10 -right-10 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] animate-[spin_60s_linear_infinite] ${dark ? 'text-saffron/10' : 'text-saffron/20'}`} />
        <MandalaDecor className={`absolute -bottom-16 -left-16 w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] animate-[spin_80s_linear_infinite_reverse] ${dark ? 'text-quantum-purple/10' : 'text-quantum-purple/15'}`} />
        <MandalaDecor className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] animate-[spin_90s_linear_infinite] ${dark ? 'text-gold/5' : 'text-gold/8'}`} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-5 sm:space-y-7"
          >
            <motion.div variants={fadeIn} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-xs sm:text-sm ${
              dark
                ? 'bg-white/5 border border-white/10 text-saffron'
                : 'bg-white/60 border border-gold/20 text-maroon'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              Annual Literary & Cultural Festival 2026
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-[2rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
              <span className={dark ? 'text-white' : 'text-gray-900'}>Celebrating Indian</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-quantum-pink to-quantum-purple">
                Culture & Heritage
              </span>
              <br />
              <span className={`text-lg sm:text-xl md:text-2xl font-semibold block mt-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                through Abhivyakti at Quantum University
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className={`text-sm sm:text-base md:text-lg max-w-lg leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              A vibrant five-day confluence of literary excellence, cultural richness, and intellectual engagement — bringing together students, faculty, and eminent personalities from across India.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <div className={`flex items-center gap-3 p-3 rounded-xl border ${
                dark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-gray-100'
              }`}>
                <div className={`p-2 rounded-lg shrink-0 ${dark ? 'bg-saffron/15 text-saffron' : 'bg-saffron/10 text-saffron'}`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>October 2026</p>
                  <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Five days of celebration</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-3 rounded-xl border ${
                dark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-gray-100'
              }`}>
                <div className={`p-2 rounded-lg shrink-0 ${dark ? 'bg-quantum-purple/20 text-purple-400' : 'bg-quantum-purple/10 text-quantum-purple'}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>Quantum University</p>
                  <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Roorkee, Uttarakhand</p>
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
                className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base active:scale-[0.97] transition-all border ${
                  dark
                    ? 'border-white/15 text-gray-300 hover:bg-white/5'
                    : 'border-gray-200 text-gray-700 hover:bg-white/60'
                }`}
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
            <div className={`relative backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-xl overflow-hidden ${
              dark
                ? 'bg-dark-card/80 border-dark-border'
                : 'bg-white/50 border-white/60'
            }`}>
              <div className="absolute top-4 left-4 w-20 h-20 bg-saffron/15 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-quantum-purple/15 rounded-full blur-2xl"></div>

              <div className="relative z-10 space-y-4">
                <div className="bg-gradient-to-r from-maroon to-quantum-purple text-white text-xs font-semibold px-3 py-1 rounded-full inline-block">
                  Grand Finale
                </div>
                <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Kavyanjali</h2>
                <p className={`font-medium text-sm sm:text-base ${dark ? 'text-purple-400' : 'text-quantum-purple'}`}>
                  काव्यांजलि — The Spectacular Kavi Sammelan
                </p>
                <Divider />
                <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  A mesmerizing poetry recital marking the grand culmination of Abhivyakti, attracting eminent literary personalities from across India.
                </p>
                <div className={`flex gap-4 pt-2 text-xs ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
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
        <MandalaDecor className={`absolute top-0 right-0 w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] -translate-y-1/3 translate-x-1/4 animate-[spin_70s_linear_infinite] ${dark ? 'text-gold/5' : 'text-gold/10'}`} />
        <MandalaDecor className={`absolute bottom-0 left-0 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] translate-y-1/4 -translate-x-1/4 animate-[spin_50s_linear_infinite_reverse] ${dark ? 'text-saffron/5' : 'text-saffron/8'}`} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-saffron font-semibold tracking-wider uppercase text-xs sm:text-sm mb-2">Competitions</p>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Events & Categories
            </h2>
            <p className={`max-w-lg mx-auto text-sm sm:text-base ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
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
                className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group ${
                  dark
                    ? 'bg-dark-card/60 border-dark-border hover:border-saffron/20'
                    : 'bg-white/60 border-gray-100 hover:border-gold/20'
                }`}
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center mb-4 shadow-sm`}>
                  <cat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className={`text-lg sm:text-xl font-bold mb-1 transition-colors ${
                  dark
                    ? 'text-white group-hover:text-saffron'
                    : 'text-gray-900 group-hover:text-quantum-purple'
                }`}>{cat.name}</h3>
                <p className={`text-sm leading-relaxed ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{cat.events}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Register ─── */}
      <section id="register" className="py-14 sm:py-20 md:py-24 px-4 relative overflow-hidden">
        <MandalaDecor className={`absolute bottom-0 left-0 w-[260px] sm:w-80 h-[260px] sm:h-80 translate-y-1/3 -translate-x-1/4 animate-[spin_65s_linear_infinite] ${dark ? 'text-quantum-purple/5' : 'text-quantum-purple/8'}`} />
        <MandalaDecor className={`absolute top-0 right-0 w-[200px] sm:w-64 h-[200px] sm:h-64 -translate-y-1/4 translate-x-1/4 animate-[spin_55s_linear_infinite_reverse] ${dark ? 'text-saffron/5' : 'text-saffron/8'}`} />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`backdrop-blur-md p-7 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl shadow-lg border ${
              dark
                ? 'bg-dark-card/70 border-dark-border'
                : 'bg-white/70 border-gray-100'
            }`}
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Join the Celebration
            </h2>
            <p className={`text-sm sm:text-base mb-8 max-w-md mx-auto ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
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
      <footer className={`py-10 sm:py-12 px-4 ${dark ? 'bg-black/40' : 'bg-gray-900'} text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Quantum University" className="h-7 sm:h-8 brightness-0 invert opacity-60" />
              <span className="text-sm font-medium text-gray-500">×</span>
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
