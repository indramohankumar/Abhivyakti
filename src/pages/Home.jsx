import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import {
  Calendar, MapPin, Sparkles, ArrowRight, ExternalLink,
  Music, Users, VenetianMask, Shirt, Palette, Utensils,
  Menu, X, Sun, Moon, Star, Trophy, Clock, ChevronUp
} from 'lucide-react';
import { Carousel360 } from '../components/ui/image-fan-carousel';
import CulturalDust from '../components/ui/cultural-dust';


/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const eventPhotos = [
  '/photos/media_1790088249710.jpg',
  '/photos/media_1790088249711.jpg',
  '/photos/media_1790088249718.jpg',
  '/photos/media_1790088249727.jpg',
  '/photos/media_1790088249734.jpg',
  '/photos/media_1790097857124.jpg',
  '/photos/media_1790097869892.jpg'
];

const PhotoCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % eventPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-4 shadow-2xl border-4 border-white/80 group bg-maroon/5">
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={eventPhotos[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 p-2 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
        {eventPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              i === index ? 'w-6 bg-gold shadow-[0_0_8px_rgba(201,168,76,0.9)]' : 'w-2 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const events = [
  { name: 'संगीत · Music', desc: 'Indian Classical, Semi-Classical, Sufi, Indian Folk, Devotional, Ghazal', icon: Music, color: 'from-saffron to-amber-500', image: 'https://media.gettyimages.com/id/1314574070/photo/indian-musician-zakir-hussain-plays-tabla-as-he-performs-at-a-benefit-concert-in-celebration.jpg?s=612x612&w=0&k=20&c=aSLEAXpLnf8pg2QThlp-PN67NqigErOp4HHBJPmpRwo=', rulesLink: 'https://docs.google.com/document/d/1VBvLQH9djme__Lp4jUQhwt6ucDpfdZI9/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'नृत्य · Dance', desc: 'Classical, Semi-Classical, Indian Folk', icon: Users, color: 'from-quantum-pink to-rose-500', image: 'https://images.unsplash.com/photo-1764014792668-bc484714744f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsYXNzaWNhbCUyMGRhbmNlfGVufDB8fDB8fHww', rulesLink: 'https://docs.google.com/document/d/1kTYN4YAfi4wZLbi0jXVPfSnWy3AGj0bq/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'नाटक · Theatre', desc: 'Indian Mythology-Based Drama', icon: VenetianMask, color: 'from-deep-red to-red-700', image: 'https://media.gettyimages.com/id/1198572409/photo/dancers-perform-classical-dance-at-khajuraho-dance-festival-india.jpg?s=2048x2048&w=gi&k=20&c=u2I1ceuU3KFBrfBWNNYQiO2hmZQxBSK075CS3umQUoQ=', rulesLink: 'https://docs.google.com/document/d/1Up1NfeKEmbHRGvk1ebK3Y3b9DgSlfKCl/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'फैशन · Fashion', desc: 'Fashion Show – Indian Ethnic Wear', icon: Shirt, color: 'from-quantum-purple to-fuchsia-600', image: 'https://media.gettyimages.com/id/2287626362/photo/delhi-india-models-walk-the-runway-during-the-house-of-masaba-show-at-india-couture-week-2026.jpg?s=612x612&w=0&k=20&c=WxbMRhqopDZfljOvv5AAaR1O7KEZwvSboR-zXerDA7E=', rulesLink: 'https://docs.google.com/document/d/1Up1NfeKEmbHRGvk1ebK3Y3b9DgSlfKCl/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'कला · Fine Arts', desc: 'Rangoli', icon: Palette, color: 'from-emerald-600 to-green-500', image: 'https://www.shutterstock.com/image-photo/intricate-traditional-handdrawn-kalamkari-peacock-600w-2460598057.jpg', rulesLink: 'https://docs.google.com/document/d/1p7WUPCg8X38o5GBbRvRXxVpvxlfYU7x4/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
  { name: 'पाक कला · Indian Cuisine', desc: 'Lost Recipes – Culinary Competition', icon: Utensils, color: 'from-gold to-burnt-orange', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800', rulesLink: 'https://docs.google.com/document/d/13uCjopZokuFAOhwk73wHC2EBSj2sjJiP/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true' },
];

const highlights = [
  { icon: Trophy, label: '10', suffix: '+', desc: 'Universities' },
  { icon: Users, label: '500', suffix: '+', desc: 'Participants' },
  { icon: Star, label: '6', suffix: '', desc: 'Categories' },
  { icon: Clock, label: '3', suffix: '', desc: 'Days' },
];

/* ─── CountUp: animates a number from 0 → end when scrolled into view ─── */
const CountUp = ({ end, suffix = '', duration = 2000 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = parseInt(end);
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── TiltPoster: 3D perspective tilt on hover with gold ambient shadow ─── */
const TiltPoster = ({ src, alt, glowColor = 'rgba(201,168,76,0.3)', borderColor = 'border-gold/15' }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative rounded-xl sm:rounded-2xl overflow-hidden border ${borderColor} group`}
        style={{ boxShadow: `0 10px 40px ${glowColor}, 0 0 80px ${glowColor}` }}
      >
        <img src={src} alt={alt} className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </motion.div>
    </div>
  );
};

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

const navLinks = ['Events', 'Photos', 'Register'];

/* ─── App ─── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBottomCTA, setShowBottomCTA] = useState(false);
  const dark = false;

  /* ─── Countdown Timer ─── */
  const EVENT_START = new Date('2026-10-22T09:00:00+05:30').getTime();
  const EVENT_END = new Date('2026-10-24T23:59:59+05:30').getTime();

  const calcCountdown = () => {
    const now = Date.now();
    if (now >= EVENT_START && now <= EVENT_END) return { isLive: true, isPast: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (now > EVENT_END) return { isLive: false, isPast: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const diff = EVENT_START - now;
    return {
      isLive: false, isPast: false,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState(calcCountdown);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calcCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

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

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 150); // slight delay lets the mobile menu begin closing
  };

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* ─── Scroll-based constellation flow ─── */
  const { scrollY } = useScroll();
  const [bgShift, setBgShift] = useState(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    // Parallax drift upward as user scrolls
    setBgShift(-y * 0.15);
  });

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${dark ? 'bg-cultural-dark text-gray-200' : 'bg-cultural text-gray-800'}`}>
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-100"
        style={{ transform: `translateY(${bgShift}px)` }}
      >
        <CulturalDust mode={dark ? "dark" : "light"} opacity={1.0} speed={0.8} />
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
                <div className="w-px h-6 sm:h-8 bg-gray-300 mx-1"></div>
                <img src="/iks-logo.png" alt="IKS Logo" className={`h-6 sm:h-8 md:h-9 object-contain mix-blend-multiply`} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-hindi text-maroon text-base sm:text-lg md:text-xl font-black tracking-tight pt-1 pb-1">अभिव्यक्ति</span>
                <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Abhivyakti</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-1">
              <a href="#journey" onClick={(e) => handleNavClick(e, 'journey')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dark ? 'text-gray-400 hover:text-gold hover:bg-gold/5' : 'text-gray-600 hover:text-maroon hover:bg-gold/5'}`}>
                Journey
              </a>
              <a href="#events" onClick={(e) => handleNavClick(e, 'events')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dark ? 'text-gray-400 hover:text-gold hover:bg-gold/5' : 'text-gray-600 hover:text-maroon hover:bg-gold/5'}`}>
                Inter-University
              </a>
              <a href="#photos" onClick={(e) => handleNavClick(e, 'photos')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dark ? 'text-gray-400 hover:text-gold hover:bg-gold/5' : 'text-gray-600 hover:text-maroon hover:bg-gold/5'}`}>
                Photos
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dark ? 'text-gray-400 hover:text-gold hover:bg-gold/5' : 'text-gray-600 hover:text-maroon hover:bg-gold/5'}`}>
                Contact
              </a>

              <Link to="/inter-school" className="ml-2 relative group flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-quantum-purple bg-quantum-purple/10 border border-quantum-purple/30 rounded-lg hover:bg-quantum-purple/20 transition-all overflow-hidden shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                <Sparkles className="w-4 h-4" /> Inter-School
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-500 ease-in-out"></div>
              </Link>
              
              <a href="#register" onClick={(e) => handleNavClick(e, 'register')} className="ml-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-5 py-2 rounded-lg font-semibold text-sm hover:brightness-110 transition-all">Register Now</a>
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
                <Link to="/inter-school" onClick={() => setMenuOpen(false)} className={`mb-2 block px-4 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 ${dark ? 'text-quantum-purple bg-quantum-purple/10 border border-quantum-purple/20' : 'text-quantum-purple bg-quantum-purple/10 border border-quantum-purple/20'}`}>
                  <Sparkles className="w-4 h-4" /> Inter-School Events
                </Link>
                <a href="#journey" onClick={(e) => handleNavClick(e, 'journey')} className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>
                  Festival Journey
                </a>
                <a href="#events" onClick={(e) => handleNavClick(e, 'events')} className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>
                  Inter-University Events
                </a>
                <a href="#photos" onClick={(e) => handleNavClick(e, 'photos')} className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>
                  Photos
                </a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>
                  Contact Us
                </a>
                
                <a href="#register" onClick={(e) => handleNavClick(e, 'register')} className="block mt-3 text-center bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-5 py-3 rounded-lg font-bold text-sm">Register Now</a>
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
                className={`font-hindi text-[3rem] xs:text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[9rem] font-extrabold leading-tight tracking-normal block pt-2 ${dark ? 'text-gold-gradient drop-shadow-[0_10px_20px_rgba(201,168,76,0.4)]' : 'text-maroon drop-shadow-sm'}`}
                speed={120}
              />
              <TypeWriter
                text="Abhivyakti 2026"
                delay={1500}
                speed={80}
                className={`font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight block ${dark ? 'text-white' : 'text-maroon drop-shadow-md'}`}
                cursorColor={dark ? '#C9A84C' : '#800020'}
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
              {countdown.isLive ? (
                /* ── LIVE MODE ── */
                <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-red-500/30 bg-red-500/[0.06] backdrop-blur-sm">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-4 h-4 rounded-full bg-red-500 animate-ping opacity-40"></span>
                    <span className="relative w-3 h-3 rounded-full bg-red-500"></span>
                  </div>
                  <div>
                    <p className="text-red-400 font-extrabold text-sm sm:text-base tracking-wider uppercase">Event is Live</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Oct 22–24, 2026 · Quantum University</p>
                  </div>
                </div>
              ) : countdown.isPast ? (
                /* ── POST EVENT ── */
                <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-gold/20 bg-gold/[0.04] backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-gold font-bold text-sm">Abhivyakti 2026 has concluded</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Thank you for being part of the celebration!</p>
                  </div>
                </div>
              ) : (
                /* ── COUNTDOWN MODE ── */
                <div className={`rounded-2xl border overflow-hidden ${dark ? 'bg-white/[0.02] border-dark-border backdrop-blur-sm' : 'bg-white/60 border-gold/10 backdrop-blur-sm'}`}>
                  <div className="px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gold/60" />
                      <span className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">Starts Oct 22, 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-gold/40" />
                      <span className="text-[10px] sm:text-xs text-gray-600">Roorkee</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 divide-x divide-white/5">
                    {[
                      { val: countdown.days, label: 'Days' },
                      { val: countdown.hours, label: 'Hours' },
                      { val: countdown.minutes, label: 'Min' },
                      { val: countdown.seconds, label: 'Sec' },
                    ].map((unit) => (
                      <div key={unit.label} className="py-3 sm:py-4 text-center">
                        <motion.p
                          key={unit.val}
                          initial={{ y: -8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.25 }}
                          className={`font-serif text-xl sm:text-3xl font-black tabular-nums ${dark ? 'text-white' : 'text-maroon'}`}
                        >
                          {String(unit.val).padStart(2, '0')}
                        </motion.p>
                        <p className="text-[8px] sm:text-[10px] text-gray-600 font-semibold uppercase tracking-widest mt-0.5">{unit.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  <h3 className="text-gold-gradient text-2xl sm:text-4xl font-extrabold pb-1 pt-2 leading-normal">चित्रशाला</h3>
                  <p className={`font-serif text-base sm:text-2xl font-black mt-0.5 sm:mt-1 ${dark ? 'text-white' : 'text-maroon'}`}>Photos</p>
                </div>
                <p className={`text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium ${dark ? 'text-gold/60' : 'text-gold-dark/70'}`}>Glimpses of Abhivyakti</p>
                <GoldLine />
                <PhotoCarousel />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ HIGHLIGHTS BAR ════════ */}
      <section className={`py-10 sm:py-16 border-y relative z-10 ${dark ? 'bg-dark-card/50 border-dark-border' : 'bg-gold/[0.03] border-gold/10'}`}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-4 gap-3 sm:grid-cols-4 sm:gap-8">
          {highlights.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center">
              <h.icon className={`w-5 h-5 sm:w-7 sm:h-7 mx-auto mb-2 sm:mb-3 ${dark ? 'text-gold/60' : 'text-gold'}`} />
              <p className="text-gold-gradient text-3xl sm:text-5xl md:text-6xl font-extrabold leading-none">
                <CountUp end={h.label} suffix={h.suffix} duration={1800 + i * 400} />
              </p>
              <p className={`text-[9px] sm:text-xs font-semibold uppercase tracking-[0.15em] mt-1.5 sm:mt-2 ${dark ? 'text-gray-600' : 'text-gray-500'}`}>{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ FESTIVAL JOURNEY ════════ */}
      <section id="journey" className="py-16 sm:py-24 relative overflow-hidden">

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-gold font-semibold tracking-[0.2em] uppercase text-xs mb-2">3 Days of Glory</p>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-black mb-3 ${dark ? 'text-white' : 'text-maroon'}`}>
              The <span className="text-gold-gradient">Festival Journey</span>
            </h2>
            <GoldLine />
          </div>

          <div className="relative max-w-4xl mx-auto">

            {/* ── Flowing golden line (desktop) ── */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden sm:block pointer-events-none">
              <div className="absolute inset-0 w-[3px] bg-gradient-to-b from-transparent via-gold/50 to-transparent rounded-full"></div>
              <motion.div
                className="absolute w-[3px] rounded-full"
                style={{ left: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, #E8D48B, transparent)' }}
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* ── Flowing golden line (mobile) ── */}
            <div className="absolute left-5 top-0 bottom-0 sm:hidden pointer-events-none">
              <div className="absolute inset-0 w-[2px] bg-gradient-to-b from-transparent via-gold/40 to-transparent"></div>
              <motion.div
                className="absolute w-[2px] rounded-full"
                style={{ left: 0, height: '50px', background: 'linear-gradient(to bottom, transparent, #E8D48B, transparent)' }}
                animate={{ top: ['-5%', '105%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-20 sm:space-y-28 relative z-10">

              {/* ── DAY 1 · Inter-School ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 pl-14 sm:pl-0"
              >
                <div className="sm:w-[46%] sm:text-right">
                  <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-widest rounded-full mb-3 border border-gold/20">Day 1 · Oct 22nd</span>
                  <h3 className={`font-serif text-2xl sm:text-3xl font-black mb-2 ${dark ? 'text-white' : 'text-deep-red'}`}>Inter-School Events</h3>
                  <p className={`text-sm leading-relaxed max-w-xs sm:ml-auto mb-4 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Young minds compete in Declamation, Fine Arts, Story Telling & Skit.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:justify-end mb-4">
                    {['Declamation', 'Fine Arts', 'Story Telling', 'Skit'].map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold bg-gold/8 text-gold/80 border border-gold/15 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <Link to="/inter-school" className="inline-flex items-center gap-1.5 text-sm font-bold text-gold hover:text-white transition-colors group">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Node */}
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-1 sm:top-1/2 sm:-translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-dark-bg border-[3px] border-gold flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.5)]">
                    <div className="w-2.5 h-2.5 bg-gold rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Poster Image */}
                <div className="w-[85%] max-w-[240px] sm:max-w-none sm:w-[46%] mt-2 sm:mt-0">
                  <TiltPoster src="/poster-school.png" alt="Inter-School Events Poster" glowColor="rgba(201,168,76,0.25)" borderColor="border-gold/15" />
                </div>
              </motion.div>

              {/* ── DAY 2 & 3 · Inter-University ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col sm:flex-row-reverse items-start sm:items-center gap-6 sm:gap-12 pl-14 sm:pl-0"
              >
                <div className="sm:w-[46%]">
                  <span className="inline-block px-3 py-1 bg-quantum-pink/10 text-quantum-pink text-[11px] font-bold uppercase tracking-widest rounded-full mb-3 border border-quantum-pink/20">Day 2 & 3 · Oct 23rd-24th</span>
                  <h3 className={`font-serif text-2xl sm:text-3xl font-black mb-2 ${dark ? 'text-white' : 'text-deep-red'}`}>Inter-University Events</h3>
                  <p className={`text-sm leading-relaxed max-w-xs mb-4 ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
                    The grand stage — universities from across India, six mega categories.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {['Music', 'Dance', 'Theatre', 'Fashion', 'Fine Arts', 'Cuisine'].map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold bg-quantum-pink/8 text-quantum-pink/80 border border-quantum-pink/15 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <a href="#events" className="inline-flex items-center gap-1.5 text-sm font-bold text-quantum-pink hover:text-white transition-colors group">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Node */}
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-1 sm:top-1/2 sm:-translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-dark-bg border-[3px] border-quantum-pink flex items-center justify-center shadow-[0_0_20px_rgba(234,21,136,0.5)]">
                    <div className="w-2.5 h-2.5 bg-quantum-pink rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Poster Image */}
                <div className="w-[85%] max-w-[240px] sm:max-w-none sm:w-[46%] mt-2 sm:mt-0">
                  <TiltPoster src="/poster-university.png" alt="Inter-University Events Poster" glowColor="rgba(234,21,136,0.2)" borderColor="border-quantum-pink/15" />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════ EVENTS ════════ */}
      <section id="events" className="py-10 sm:py-20 md:py-28 px-4 relative overflow-hidden">
        <GoldenWheel className={`absolute top-0 right-0 w-[180px] sm:w-[380px] h-[180px] sm:h-[380px] -translate-y-1/3 translate-x-1/4 animate-[spin_70s_linear_infinite] ${dark ? 'text-gold/15' : 'text-gold/20'}`} />
        <SparkleParticle className="top-[20%] right-[15%] w-1.5 h-1.5 sm:w-2 sm:h-2" delay={1.8} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-5 sm:mb-10">
            <p className="text-gold font-semibold tracking-[0.2em] uppercase text-[10px] sm:text-sm mb-1 sm:mb-2">प्रतियोगिताएं · Competitions</p>
            <h2 className={`font-serif text-2xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 ${dark ? 'text-white' : 'text-deep-red'}`}>
              Events & <span className="text-gold-gradient">Categories</span>
            </h2>
            <GoldLine />
            <p className={`max-w-lg mx-auto text-xs sm:text-base mt-2 sm:mt-3 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>
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

            <p className="text-gold-gradient text-2xl sm:text-4xl font-extrabold mb-1 pt-2 pb-1">समारोह में शामिल हों</p>
            <h2 className={`font-serif text-lg sm:text-2xl md:text-3xl font-black mb-1.5 sm:mb-2 ${dark ? 'text-white' : 'text-maroon'}`}>Join the Celebration</h2>
            <GoldLine />
            <p className={`text-xs sm:text-base mb-5 sm:mb-8 max-w-md mx-auto mt-2 sm:mt-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
              Register through our official Google Form and represent your university at Abhivyakti 2026. Open to all universities across India.
            </p>

            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfmgwAHb9CEGP9jj13wmTf3regVu8ikecjMfDCEYg53orF0Mg/viewform?usp=header" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-lg text-[13px] sm:text-base font-bold hover:brightness-110 active:scale-[0.97] transition-all shadow-lg shadow-gold/20">
              Fill Registration Form <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <footer id="contact" className={`pt-12 sm:pt-20 pb-6 px-4 border-t ${dark ? 'bg-black/40 border-dark-border text-white' : 'bg-gradient-to-b from-[#3d0014] to-[#1f000a] text-cream border-[#5c001e]'} relative z-10 shadow-[0_-10px_30px_rgba(61,0,20,0.3)]`}>
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-10 border-b border-white/10">

            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-3 rounded-xl inline-flex shadow-lg shadow-black/20">
                <img src="/logo.png" alt="Quantum University" className="h-8 object-contain" />
                <div className="w-px h-8 bg-gray-300"></div>
                <img src="/iks-logo.png" alt="IKS Logo" className="h-8 object-contain mix-blend-multiply" />
              </div>
              <div>
                <span className="font-hindi text-gold-gradient font-black text-2xl tracking-wide pt-1 pb-1 block">अभिव्यक्ति</span>
                <span className="text-[10px] text-gray-400 tracking-[0.25em] uppercase font-semibold">Abhivyakti 2026</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-xs">
                Quantum University's grand annual cultural festival celebrating the vibrant essence of Indian art, literature, and heritage.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-white font-bold text-lg tracking-wide mb-5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" /> Quick Links
              </h4>
              <ul className="space-y-3">
                {['Journey', 'Events', 'Photos', 'Register'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 text-sm hover:text-gold hover:pl-2 transition-all duration-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/50"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="font-serif text-white font-bold text-lg tracking-wide mb-5 flex items-center gap-2">
                <Music className="w-4 h-4 text-gold" /> Contact Us
              </h4>
              <div className="space-y-5 text-sm text-gray-400">
                <div>
                  <p className="text-gold font-semibold mb-1 uppercase text-[10px] tracking-wider">Conveners</p>
                  <p className="text-gray-200">Mr Abhishek Kumar <span className="text-gray-500 ml-1">89794 61479</span></p>
                </div>
                <div>
                  <p className="text-gold font-semibold mb-1 uppercase text-[10px] tracking-wider">Co-Conveners</p>
                  <p className="text-gray-200">Dr Poulami <span className="text-gray-500 ml-1">7431 869 712</span></p>
                  <p className="text-gray-200">Ms Tapsi Rana <span className="text-gray-500 ml-1">70880 43974</span></p>
                  <p className="text-gray-200">Mr Vibhanshu <span className="text-gray-500 ml-1">81717 09548</span></p>
                </div>
                <div>
                  <p className="text-gold font-semibold mb-1 uppercase text-[10px] tracking-wider">Student Coordinators</p>
                  <p className="text-gray-200">Shivam Prakash <span className="text-gray-500 ml-1">74829 42186</span></p>
                  <p className="text-gray-200">Archii <span className="text-gray-500 ml-1">93028 42951</span></p>
                </div>
              </div>
            </div>

            {/* Connect Us */}
            <div className="flex flex-col">
              <h4 className="font-serif text-white font-bold text-lg tracking-wide mb-5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" /> Find Us
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Quantum University,<br />
                Mandawar (22 Km Milestone), Roorkee - Dehradun Highway (NH 73),<br />
                Roorkee, Uttarakhand 247167
              </p>
              {/* Small Map */}
              <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 relative shadow-lg group">
                <iframe 
                  title="Quantum University Roorkee Map"
                  src="https://maps.google.com/maps?q=Quantum%20University,%20Roorkee,%20Uttarakhand&t=&z=12&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-maroon/20 pointer-events-none mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2026 Quantum University, Roorkee. All rights reserved.</p>
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
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
