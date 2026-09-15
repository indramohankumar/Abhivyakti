import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Sparkles, ArrowRight, ExternalLink,
  Music, Users, VenetianMask, Shirt, Palette, Utensils,
  Menu, X, Sun, Moon, Star, Trophy, Clock, ChevronUp
} from 'lucide-react';
import { Carousel360 } from './components/ui/image-fan-carousel';
import ConstellationField from './components/ui/constellation-field';


/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

/* ─── Data ─── */
const events = [
  { name: 'संगीत · Music', desc: 'Indian Classical, Semi-Classical, Sufi, Folk, Devotional, Ghazal', icon: Music, color: 'from-saffron to-amber-500', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800', rulesLink: 'https://docs.google.com/document/d/1VBvLQH9djme__Lp4jUQhwt6ucDpfdZI9/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'नृत्य · Dance', desc: 'Classical, Semi-Classical, Indian Folk Dance', icon: Users, color: 'from-quantum-pink to-rose-500', image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=800', rulesLink: 'https://docs.google.com/document/d/1kTYN4YAfi4wZLbi0jXVPfSnWy3AGj0bq/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'नाटक · Theatre', desc: 'Indian Mythology-Based Drama & Nukkad Natak', icon: VenetianMask, color: 'from-deep-red to-red-700', image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=800', rulesLink: 'https://docs.google.com/document/d/1Up1NfeKEmbHRGvk1ebK3Y3b9DgSlfKCl/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'फैशन · Fashion', desc: 'Fashion Show – Indian Ethnic Wear', icon: Shirt, color: 'from-quantum-purple to-fuchsia-600', image: 'https://images.pexels.com/photos/8483369/pexels-photo-8483369.jpeg?auto=compress&cs=tinysrgb&w=800', rulesLink: 'https://docs.google.com/document/d/1Up1NfeKEmbHRGvk1ebK3Y3b9DgSlfKCl/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'कला · Fine Arts', desc: 'Rangoli, Painting & Visual Arts', icon: Palette, color: 'from-emerald-600 to-green-500', image: 'https://images.pexels.com/photos/5583126/pexels-photo-5583126.jpeg?auto=compress&cs=tinysrgb&w=800', rulesLink: 'https://docs.google.com/document/d/1p7WUPCg8X38o5GBbRvRXxVpvxlfYU7x4/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'पाक कला · Cuisine', desc: 'Inter-University Culinary Competition', icon: Utensils, color: 'from-gold to-burnt-orange', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800', rulesLink: 'https://docs.google.com/document/d/13uCjopZokuFAOhwk73wHC2EBSj2sjJiP/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
];

const highlights = [
  { icon: Trophy, label: '10+', desc: 'Universities' },
  { icon: Users, label: '500+', desc: 'Participants' },
  { icon: Star, label: '6', desc: 'Categories' },
  { icon: Clock, label: '3', desc: 'Days' },
];

/* ─── Components ─── */

/* A richer, more cultural golden wheel / chakra */
const GoldenWheel = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none">
    {/* Outer dotted ring */}
    <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" opacity="0.4"/>
    {/* Inner solid rings */}
    <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
    <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
    {/* Lotus Petals / Spokes */}
    {[...Array(16)].map((_, i) => (
      <path key={i} d="M100 16 C 110 40, 115 60, 100 80 C 85 60, 90 40, 100 16 Z" fill="currentColor" opacity="0.15" transform={`rotate(${i*22.5} 100 100)`}/>
    ))}
    {/* Center core */}
    <circle cx="100" cy="100" r="24" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5"/>
    <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.4"/>
  </svg>
);


const SparkleParticle = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)] pointer-events-none ${className}`}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const GoldLine = () => (
  <div className="flex items-center gap-4 max-w-sm mx-auto my-5">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
    <div className="w-2 h-2 rotate-45 bg-gold/60"></div>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
  </div>
);

/* Typewriter effect — types text letter by letter */
const TypeWriter = ({ text, className = '', speed = 100, delay = 0, cursorColor = '#C9A84C' }) => {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
    // After typing done, blink cursor a few times then hide
    const hideCursor = setTimeout(() => setShowCursor(false), 2000);
    return () => clearTimeout(hideCursor);
  }, [displayed, text, speed, started]);

  // Blink cursor
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, [showCursor]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span style={{ color: cursorColor, fontWeight: 'normal' }} className="ml-0.5">
          {cursorVisible ? '|' : '\u00A0'}
        </span>
      )}
    </span>
  );
};

const navLinks = ['About', 'Events', 'Photos', 'Register'];

/* ─── App ─── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBottomCTA, setShowBottomCTA] = useState(false);
  const dark = true;

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setShowScrollTop(y > 400);
      setShowBottomCTA(y > 300);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${dark ? 'bg-cultural-dark text-gray-200' : 'bg-cultural text-gray-800'}`}>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-75">
        <ConstellationField mode={dark ? "dark" : "light"} speed={1} opacity={0.85} />
      </div>

      {/* ════════ NAVBAR ════════ */}
      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? dark ? 'bg-dark-bg/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-dark-border' : 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gold/5 border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-[72px]">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex items-center gap-2.5 transition-all duration-300">
                <img src="/logo.png" alt="Quantum University" className={`h-6 sm:h-8 md:h-9 object-contain ${dark ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] brightness-110' : 'mix-blend-multiply'}`} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-gold-gradient text-base sm:text-lg md:text-xl font-extrabold tracking-tight">अभिव्यक्ति</span>
                <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Abhivyakti</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.slice(0, 3).map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                   className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dark ? 'text-gray-400 hover:text-gold hover:bg-gold/5' : 'text-gray-600 hover:text-maroon hover:bg-gold/5'}`}>
                  {item}
                </a>
              ))}

              <a href="#register" className="ml-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-5 py-2 rounded-lg font-semibold text-sm hover:brightness-110 transition-all">Register Now</a>
            </div>

            <div className="flex items-center gap-1 md:hidden">

              <button onClick={() => setMenuOpen(!menuOpen)} className={`w-10 h-10 flex items-center justify-center rounded-lg ${dark ? 'text-gray-300' : 'text-gray-700'}`} aria-label="Menu">
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
              className={`md:hidden overflow-hidden backdrop-blur-xl border-t ${dark ? 'bg-dark-bg/95 border-dark-border' : 'bg-white/95 border-gold/10'}`}>
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navLinks.map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                     className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>{item}</a>
                ))}
                <a href="#register" onClick={() => setMenuOpen(false)} className="block mt-2 text-center bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-5 py-3 rounded-lg font-semibold text-sm">Register Now</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[85dvh] sm:min-h-[100dvh] flex items-center pt-16 pb-6 sm:pt-24 sm:pb-14 md:pt-28 md:pb-20 px-4 overflow-hidden">
        {/* Background Decorations */}
        <GoldenWheel className={`absolute -top-10 -right-10 w-[180px] sm:w-[420px] md:w-[550px] h-[180px] sm:h-[420px] md:h-[550px] animate-[spin_60s_linear_infinite] ${dark ? 'text-gold/20' : 'text-gold/25'}`} />
        <GoldenWheel className={`absolute -bottom-20 -left-20 w-[200px] sm:w-[480px] md:w-[620px] h-[200px] sm:h-[480px] md:h-[620px] animate-[spin_80s_linear_infinite_reverse] ${dark ? 'text-quantum-purple/15' : 'text-quantum-purple/20'}`} />
        
        {/* Floating Diyas & Particles */}
        <SparkleParticle className="top-1/4 left-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2" delay={0.2} />
        <SparkleParticle className="bottom-1/3 left-1/4 w-2 h-2 sm:w-3 sm:h-3" delay={1.2} />
        <SparkleParticle className="top-1/3 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2" delay={2.5} />
        <SparkleParticle className="bottom-1/4 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2" delay={0.8} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center relative z-10 w-full pointer-events-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4 sm:space-y-8">

            <motion.div variants={fadeUp} className="space-y-3">
              <TypeWriter
                text="अभिव्यक्ति"
                className="text-gold-gradient text-[2.2rem] xs:text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight block pt-2 drop-shadow-[0_10px_20px_rgba(201,168,76,0.4)]"
                speed={120}
              />
              <TypeWriter
                text="Abhivyakti 2026"
                delay={1500}
                speed={80}
                className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight block ${dark ? 'text-white' : 'text-gray-900'}`}
                cursorColor={dark ? '#C9A84C' : '#8B7332'}
              />
              <GoldLine />
              <p className={`text-[10px] sm:text-sm tracking-[0.2em] uppercase font-semibold ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                Expression of Indian Culture & Heritage
              </p>
            </motion.div>

            <motion.p variants={fadeUp} className={`text-[13px] sm:text-base md:text-lg max-w-lg leading-relaxed line-clamp-3 sm:line-clamp-none ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              A grand Three-day inter-university celebration of <strong className="text-gold">literary excellence</strong>, <strong className={dark ? 'text-quantum-pink' : 'text-maroon'}>cultural richness</strong>, and <strong className={dark ? 'text-purple-400' : 'text-quantum-purple'}>intellectual engagement</strong> — uniting students, artists, and scholars from across India.
            </motion.p>

            <motion.div variants={fadeUp} className="max-w-md">
              <div className={`flex items-center gap-0 rounded-2xl border overflow-hidden ${dark ? 'bg-white/[0.03] border-dark-border backdrop-blur-sm' : 'bg-white/60 border-gold/10 backdrop-blur-sm'}`}>
                {/* Date */}
                <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-5 sm:py-3.5 flex-1">
                  <div className="bg-gold/10 p-1.5 sm:p-2 rounded-lg text-gold shrink-0"><Calendar className="w-4 h-4" /></div>
                  <div>
                    <p className={`font-bold text-xs sm:text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>Oct 2026</p>
                    <p className={`text-[10px] sm:text-xs ${dark ? 'text-gray-600' : 'text-gray-500'}`}>3 Days Festival</p>
                  </div>
                </div>
                {/* Gold divider */}
                <div className={`w-px self-stretch ${dark ? 'bg-gradient-to-b from-transparent via-gold/30 to-transparent' : 'bg-gradient-to-b from-transparent via-gold/20 to-transparent'}`}></div>
                {/* Location */}
                <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-5 sm:py-3.5 flex-1">
                  <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${dark ? 'bg-quantum-purple/15 text-purple-400' : 'bg-quantum-purple/8 text-quantum-purple'}`}><MapPin className="w-4 h-4" /></div>
                  <div>
                    <p className={`font-bold text-xs sm:text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>Roorkee</p>
                    <p className={`text-[10px] sm:text-xs ${dark ? 'text-gray-600' : 'text-gray-500'}`}>Uttarakhand</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
              <a href="#register" className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-4 py-2 sm:px-7 sm:py-3 rounded-lg font-bold text-[13px] sm:text-base flex items-center gap-2 hover:brightness-110 active:scale-[0.97] transition-all shadow-lg shadow-gold/20">
                Register Now <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#events" className={`px-4 py-2 sm:px-7 sm:py-3 rounded-lg font-semibold text-[13px] sm:text-base active:scale-[0.97] transition-all border ${dark ? 'border-gold/20 text-gold hover:bg-gold/5' : 'border-gold/30 text-gold-dark hover:bg-gold/5'}`}>
                Explore Events
              </a>
            </motion.div>
          </motion.div>

          {/* Hero right — Photos card */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative mt-2 lg:mt-0">
            <div className={`absolute inset-0 blur-3xl rounded-full scale-110 ${dark ? 'bg-gold/5' : 'bg-gold/10'}`}></div>
            <div className={`relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl border overflow-hidden ${dark ? 'bg-dark-card/80 border-dark-border shadow-2xl shadow-black/30' : 'bg-white/60 backdrop-blur-md border-gold/15 shadow-xl'}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light"></div>
              <div className={`absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full blur-2xl ${dark ? 'bg-gold/8' : 'bg-gold/15'}`}></div>

              <div id="photos" className="relative z-10 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-gold-dark to-gold text-dark-bg text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Memories</span>
                </div>
                <div>
                  <h3 className="text-gold-gradient text-2xl sm:text-4xl font-extrabold">चित्रशाला</h3>
                  <p className={`text-base sm:text-xl font-semibold mt-0.5 sm:mt-1 ${dark ? 'text-white' : 'text-gray-900'}`}>Photos</p>
                </div>
                <p className={`text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium ${dark ? 'text-gold/60' : 'text-gold-dark/70'}`}>Glimpses of Abhivyakti</p>
                <GoldLine />
                <p className={`text-xs sm:text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {/* ADD YOUR PHOTO DETAILS OR COMPONENTS HERE */}
                  Capturing the moments of literary excellence, cultural richness, and intellectual engagement.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ HIGHLIGHTS BAR ════════ */}
      <section className={`py-5 sm:py-10 border-y relative z-10 ${dark ? 'bg-dark-card/50 border-dark-border' : 'bg-gold/[0.03] border-gold/10'}`}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-4 gap-3 sm:grid-cols-4 sm:gap-8">
          {highlights.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center">
              <h.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 ${dark ? 'text-gold/70' : 'text-gold'}`} />
              <p className={`text-lg sm:text-3xl font-extrabold ${dark ? 'text-white' : 'text-gray-900'}`}>{h.label}</p>
              <p className={`text-[10px] sm:text-sm font-medium ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ EVENTS ════════ */}
      <section id="events" className="py-10 sm:py-20 md:py-28 px-4 relative overflow-hidden">
        <GoldenWheel className={`absolute top-0 right-0 w-[180px] sm:w-[380px] h-[180px] sm:h-[380px] -translate-y-1/3 translate-x-1/4 animate-[spin_70s_linear_infinite] ${dark ? 'text-gold/15' : 'text-gold/20'}`} />
        <SparkleParticle className="top-[20%] right-[15%] w-1.5 h-1.5 sm:w-2 sm:h-2" delay={1.8} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-5 sm:mb-10">
            <p className="text-gold font-semibold tracking-[0.2em] uppercase text-[10px] sm:text-sm mb-1 sm:mb-2">प्रतियोगिताएं · Competitions</p>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Events & <span className="text-gold-gradient">Categories</span>
            </h2>
            <GoldLine />
            <p className={`max-w-lg mx-auto text-xs sm:text-base mt-2 sm:mt-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
              Six grand arenas celebrating the soul of Indian artistic tradition.
            </p>
          </div>

          <div>
            <Carousel360 items={events} />
          </div>
        </div>
      </section>

      {/* ════════ REGISTER ════════ */}
      <section id="register" className="py-10 sm:py-20 md:py-28 px-4 relative overflow-hidden">
        <GoldenWheel className={`absolute bottom-0 left-0 w-[180px] sm:w-80 h-[180px] sm:h-80 translate-y-1/3 -translate-x-1/4 animate-[spin_65s_linear_infinite] ${dark ? 'text-quantum-purple/15' : 'text-quantum-purple/20'}`} />
        <SparkleParticle className="top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3" delay={0.5} />

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className={`text-center p-5 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl border relative overflow-hidden ${
              dark ? 'bg-dark-card/70 border-dark-border shadow-2xl shadow-black/20' : 'bg-white/70 backdrop-blur-md border-gold/15 shadow-xl shadow-gold/5'
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light"></div>

            <p className="text-gold-gradient text-2xl sm:text-4xl font-extrabold mb-1">समारोह में शामिल हों</p>
            <h2 className={`text-lg sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Join the Celebration</h2>
            <GoldLine />
            <p className={`text-xs sm:text-base mb-5 sm:mb-8 max-w-md mx-auto mt-2 sm:mt-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
              Register through our official Google Form and represent your university at Abhivyakti 2026. Open to all universities across India.
            </p>

            <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-lg text-[13px] sm:text-base font-bold hover:brightness-110 active:scale-[0.97] transition-all shadow-lg shadow-gold/20">
              Fill Registration Form <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className={`pt-10 sm:pt-16 pb-6 px-4 border-t ${dark ? 'bg-black/40 border-dark-border' : 'bg-gray-950 border-gray-800'} text-white relative z-10`}>
        <div className="max-w-7xl mx-auto">
          {/* Top row */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 pb-8 sm:pb-10 border-b border-white/10">

            {/* Brand */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center transition-all duration-300">
                  <img src="/logo.png" alt="Quantum University" className="h-6 sm:h-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] brightness-110" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-gold-gradient font-extrabold text-sm sm:text-base">अभिव्यक्ति</span>
                  <span className="text-[8px] sm:text-[9px] text-gray-500 tracking-[0.15em] uppercase">Abhivyakti 2026</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                Quantum University's annual inter-university cultural festival celebrating Indian art, literature, and heritage.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-gold font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {['About', 'Events', 'Photos', 'Register'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 text-xs sm:text-sm hover:text-gold transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events — hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block">
              <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Events</h4>
              <ul className="space-y-2.5">
                {['Music', 'Dance', 'Theatre', 'Fashion', 'Fine Arts', 'Cuisine'].map(item => (
                  <li key={item}>
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Us */}
            <div className="col-span-2 sm:col-span-1 flex flex-col">
              <h4 className="text-gold font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Connect Us</h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-400 mb-4">
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold/60 mt-0.5 shrink-0" />
                  <span className="leading-tight">Quantum University, Roorkee, Uttarakhand 247167</span>
                </li>
              </ul>
              {/* Small Map */}
              <div className={`w-full h-32 sm:h-40 mt-auto rounded-xl overflow-hidden border ${dark ? 'border-white/10' : 'border-gray-800'} relative shadow-md opacity-80 hover:opacity-100 transition-opacity`}>
                <iframe 
                  title="Quantum University Roorkee Map"
                  src="https://maps.google.com/maps?q=Quantum%20University,%20Roorkee,%20Uttarakhand&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full"
                  style={{ 
                    border: 0, 
                    filter: dark ? 'invert(90%) hue-rotate(180deg) contrast(90%) brightness(85%)' : 'none' 
                  }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-gold/5 pointer-events-none mix-blend-overlay"></div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
            <p className="text-gray-600 text-[10px] sm:text-xs">© 2026 Quantum University, Roorkee. All rights reserved.</p>
            <div className="flex items-center gap-1 text-gray-600 text-[10px] sm:text-xs">
             
            </div>
          </div>
        </div>
      </footer>

      {/* ════════ STICKY MOBILE BOTTOM CTA ════════ */}
      <AnimatePresence>
        {showBottomCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            <div className={`px-4 py-3 backdrop-blur-xl border-t ${dark ? 'bg-dark-bg/95 border-dark-border' : 'bg-white/95 border-gold/10'}`}>
              <a href="#register"
                 className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg py-2.5 rounded-xl font-bold text-sm active:scale-[0.97] transition-all shadow-lg shadow-gold/25">
                <Sparkles className="w-4 h-4" />
                Register for Abhivyakti 2026
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════ SCROLL TO TOP ════════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-20 md:bottom-8 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform ${
              dark ? 'bg-dark-card border border-dark-border text-gold shadow-black/30' : 'bg-white border border-gold/20 text-gold-dark shadow-gold/10'
            }`}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
