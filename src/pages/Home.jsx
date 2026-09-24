import React, { useState, useEffect, useRef } from 'react';
import { EmberParticles } from '../components/ui/EmberParticles';
import { ContactCrewGrid } from '../components/ui/CrewCard';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import {
  Calendar, MapPin, Sparkles, ArrowRight, ExternalLink,
  Music, Users, VenetianMask, Shirt, Palette, Utensils, BookOpen,
  Menu, X, Sun, Moon, Star, Trophy, Clock, ChevronUp, Mail, Phone
} from 'lucide-react';
import { Carousel360 } from '../components/ui/image-fan-carousel';
import MegaEventCard from '../components/ui/MegaEventCard';
import { AntaragniEventsGrid } from '../components/ui/antaragni-events';
import CulturalDust from '../components/ui/cultural-dust';
import PhotoMarquee from '../components/ui/PhotoMarquee';
import FloralMandala from '../components/ui/FloralMandala';
import { ParallaxMandalaBackground } from '../components/ui/parallax-mandala';


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


const EventPolaroid = ({ image, title, rotation = "rotate-0", tapeColor = "bg-white/30" }) => {
  return (
    <div className={`shrink-0 w-[260px] sm:w-[300px] flex flex-col relative group cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(255,107,53,0.4)] ${rotation}`}>
      {/* Realistic Tape */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${tapeColor} backdrop-blur-md opacity-90 shadow-sm rotate-2 z-20 mix-blend-screen`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-40"></div>
      </div>
      
      {/* Image Container */}
      <div className="w-full overflow-hidden relative rounded-sm border border-white/10 group-hover:border-white/30 transition-colors duration-500">
        <img src={image} alt={title} className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
        {/* Subtle highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

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
  { 
    name: 'Music', 
    desc: 'Indian Classical, Semi-Classical, Sufi, Indian Folk, Devotional, Ghazal', 
    icon: Music, color: 'from-saffron to-amber-500', 
    image: 'https://media.gettyimages.com/id/1314574070/photo/indian-musician-zakir-hussain-plays-tabla-as-he-performs-at-a-benefit-concert-in-celebration.jpg?s=612x612&w=0&k=20&c=aSLEAXpLnf8pg2QThlp-PN67NqigErOp4HHBJPmpRwo=', 
    rulesLink: 'https://docs.google.com/document/d/1VBvLQH9djme__Lp4jUQhwt6ucDpfdZI9/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true',
    subEvents: ['Indian Classical', 'Semi-Classical', 'Sufi', 'Indian Folk', 'Devotional', 'Ghazal']
  },
  { 
    name: 'Dance', 
    desc: 'Classical, Semi-Classical, Indian Folk', 
    icon: Users, color: 'from-quantum-pink to-rose-500', 
    image: 'https://images.unsplash.com/photo-1764014792668-bc484714744f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsYXNzaWNhbCUyMGRhbmNlfGVufDB8fDB8fHww', 
    rulesLink: 'https://docs.google.com/document/d/1kTYN4YAfi4wZLbi0jXVPfSnWy3AGj0bq/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true',
    subEvents: ['Classical', 'Semi-Classical', 'Indian Folk']
  },
  { 
    name: 'Theatre', 
    desc: 'Indian Mythology-Based Drama', 
    icon: VenetianMask, color: 'from-deep-red to-red-700', 
    image: 'https://media.gettyimages.com/id/1198572409/photo/dancers-perform-classical-dance-at-khajuraho-dance-festival-india.jpg?s=2048x2048&w=gi&k=20&c=u2I1ceuU3KFBrfBWNNYQiO2hmZQxBSK075CS3umQUoQ=', 
    rulesLink: 'https://docs.google.com/document/d/1Up1NfeKEmbHRGvk1ebK3Y3b9DgSlfKCl/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true',
    subEvents: ['Indian Mythology-Based Drama']
  },
  { 
    name: 'Fashion', 
    desc: 'Fashion Show – Indian Ethnic Wear', 
    icon: Shirt, color: 'from-quantum-purple to-fuchsia-600', 
    image: 'https://media.gettyimages.com/id/2287626362/photo/delhi-india-models-walk-the-runway-during-the-house-of-masaba-show-at-india-couture-week-2026.jpg?s=612x612&w=0&k=20&c=WxbMRhqopDZfljOvv5AAaR1O7KEZwvSboR-zXerDA7E=', 
    rulesLink: 'https://docs.google.com/document/d/1Up1NfeKEmbHRGvk1ebK3Y3b9DgSlfKCl/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true',
    subEvents: ['Fashion Show – Indian Ethnic Wear']
  },
  { 
    name: 'Fine Arts', 
    desc: 'Rangoli', 
    icon: Palette, color: 'from-emerald-600 to-green-500', 
    image: 'https://www.shutterstock.com/image-photo/intricate-traditional-handdrawn-kalamkari-peacock-600w-2460598057.jpg', 
    rulesLink: 'https://docs.google.com/document/d/1p7WUPCg8X38o5GBbRvRXxVpvxlfYU7x4/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true',
    subEvents: ['Rangoli']
  },
  { 
    name: 'Indian Cuisine', 
    desc: 'Lost Recipes – Inter-University Culinary Competition', 
    icon: Utensils, color: 'from-gold to-burnt-orange', 
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800', 
    rulesLink: 'https://docs.google.com/document/d/13uCjopZokuFAOhwk73wHC2EBSj2sjJiP/edit?usp=drive_link&ouid=110613590784742549939&rtpof=true&sd=true',
    subEvents: ['Inter-University Culinary Competition']
  },
];

const highlights = [
  { icon: Trophy, label: '50', suffix: '+', desc: 'Universities' },
  { icon: Users, label: '1000', suffix: '+', desc: 'Participants' },
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
  const dark = true;

  const journeyRef = useRef(null);
  const { scrollYProgress: journeyScroll } = useScroll({
    target: journeyRef,
    offset: ["start center", "end center"]
  });

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
      <ParallaxMandalaBackground />

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
                <img src="/logo.png" alt="Quantum University" className="h-12 sm:h-14 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
                
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-hindi text-maroon text-base sm:text-lg md:text-xl font-black tracking-tight pt-1 pb-1">अभिव्यक्ति</span>
                <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Abhivyakti</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/journey" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dark ? 'text-gray-400 hover:text-gold hover:bg-gold/5' : 'text-gray-600 hover:text-maroon hover:bg-gold/5'}`}>Journey</Link>
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
              
              <a href="#register" onClick={(e) => handleNavClick(e, 'register')} className="ml-2 bg-gradient-to-r from-yellow-400 to-[#ff5f3c] text-white px-6 py-2 rounded-lg font-extrabold text-sm shadow-[0_0_20px_rgba(255,165,0,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,165,0,0.8)] transition-all duration-300 tracking-wide uppercase">Register Now</a>
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
                <Link to="/journey" onClick={() => setMenuOpen(false)} className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>Festival Journey</Link>
                <a href="#events" onClick={(e) => handleNavClick(e, 'events')} className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>
                  Inter-University Events
                </a>
                <a href="#photos" onClick={(e) => handleNavClick(e, 'photos')} className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>
                  Photos
                </a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`block px-4 py-3 font-medium rounded-lg transition-colors ${dark ? 'text-gray-300 active:bg-gold/10' : 'text-gray-700 active:bg-gold/10'}`}>
                  Contact Us
                </a>
                
                <a href="#register" onClick={(e) => handleNavClick(e, 'register')} className="block mt-3 text-center bg-gradient-to-r from-yellow-400 to-[#ff5f3c] text-white px-5 py-3 rounded-lg font-black text-sm shadow-[0_0_20px_rgba(255,165,0,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,165,0,0.8)] transition-all duration-300 uppercase tracking-widest">Register Now</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ════════ HERO ════════ */}
      {/* 🚀 HERO (Antaragni Fiery Dark Theme) 🚀 */}
      <section className="relative min-h-[95dvh] sm:min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-20 px-4 overflow-hidden bg-transparent">
        
        {/* Massive 3D Revolving Fiery Chakra Background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          {/* Base ambient fire glow */}
          <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#ff5f3c]/20 blur-[120px] rounded-full z-0" />
          
          {/* Multiple rotating layers for 3D parallax effect */}
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ rotate: { duration: 120, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute z-0 opacity-[0.25]"
          >
            <GoldenWheel className="w-[150vw] sm:w-[90vw] max-w-[1400px] h-[150vw] sm:h-[90vw] max-h-[1400px] text-[#ff6b35]" />
          </motion.div>

          <motion.div 
            animate={{ rotate: -360, scale: [1.05, 1, 1.05] }}
            transition={{ rotate: { duration: 180, repeat: Infinity, ease: "linear" }, scale: { duration: 15, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute z-0 opacity-[0.4] mix-blend-screen"
          >
            <GoldenWheel className="w-[100vw] sm:w-[60vw] max-w-[900px] h-[100vw] sm:h-[60vw] max-h-[900px] text-[#9b1c31]" />
          </motion.div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ rotate: { duration: 240, repeat: Infinity, ease: "linear" } }}
            className="absolute z-0 opacity-60 blur-[1px]"
          >
            <GoldenWheel className="w-[50vw] sm:w-[30vw] max-w-[500px] h-[50vw] sm:h-[30vw] max-h-[500px] text-[#e92a67]" />
          </motion.div>
        </div>
        
        {/* Gradient overlay to seamlessly fade into the dark deep purple body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12091f] via-[#12091f]/40 to-transparent z-0 pointer-events-none" />

        {/* Floating Sparks (Antaragni Fire Particles) */}
        <SparkleParticle className="top-1/4 left-1/3 w-2 h-2 sm:w-3 sm:h-3 z-10 text-[#ff6b35]" delay={0.2} />
        <SparkleParticle className="bottom-1/3 left-1/4 w-2 h-2 sm:w-3 sm:h-3 z-10 text-[#ff5f3c]" delay={1.2} />
        <SparkleParticle className="top-1/3 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 z-10 text-[#e92a67]" delay={2.5} />
        <SparkleParticle className="bottom-1/4 right-1/3 w-2 h-2 sm:w-3 sm:h-3 z-10 text-[#ff6b35]" delay={0.8} />

        {/* Centered Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-auto pointer-events-auto pb-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 sm:space-y-8 flex flex-col items-center w-full">

            {/* Crisp Typography in Fiery Orange/Red Gradient */}
            <motion.div variants={fadeUp} className="space-y-2 flex flex-col items-center">
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
            </motion.div>

            <motion.p variants={fadeUp} className="text-[13px] sm:text-base md:text-lg max-w-2xl leading-relaxed text-gray-300 font-medium mt-4">
              A grand Three-day inter-university celebration of <strong className="text-[#ff6b35]">literary excellence</strong>, <strong className="text-[#e92a67]">cultural richness</strong>, and <strong className="text-[#ff5f3c]">intellectual engagement</strong> — uniting students, artists, and scholars from across India.
            </motion.p>

            <motion.div variants={fadeUp} className="w-full max-w-md mx-auto mt-6">
              {countdown.isLive ? (
                <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-red-500/30 bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,0,0.2)]">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-4 h-4 rounded-full bg-red-500 animate-ping opacity-60"></span>
                    <span className="relative w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_red]"></span>
                  </div>
                  <div className="text-left">
                    <p className="text-red-400 font-extrabold text-sm sm:text-base tracking-wider uppercase">Event is Live</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs">Oct 22-24, 2026 • Quantum University</p>
                  </div>
                </div>
              ) : countdown.isPast ? (
                <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                  <Sparkles className="w-5 h-5 text-[#ff6b35]" />
                  <div className="text-left">
                    <p className="text-[#ff6b35] font-bold text-sm">Abhivyakti 2026 has concluded</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs">Thank you for being part of the celebration!</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border overflow-hidden bg-[#12091f]/60 border-[#ff6b35]/20 backdrop-blur-md shadow-[0_4px_40px_rgba(255,107,53,0.15)]">
                  <div className="px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between border-b border-[#ff6b35]/20 bg-black/40">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#ff6b35]" />
                      <span className="text-[10px] sm:text-xs text-gray-300 font-bold uppercase tracking-wider">Starts Oct 22, 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#ff5f3c]" />
                      <span className="text-[10px] sm:text-xs text-gray-400 font-semibold">Roorkee</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 divide-x divide-[#ff6b35]/20 bg-black/20">
                    {[
                      { val: countdown.days, label: 'Days' },
                      { val: countdown.hours, label: 'Hours' },
                      { val: countdown.minutes, label: 'Min' },
                      { val: countdown.seconds, label: 'Sec' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center py-2.5 sm:py-4 px-1 group">
                        <span className="text-2xl sm:text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_2px_15px_rgba(255,107,53,0.6)] group-hover:scale-110 group-hover:text-[#ff6b35] transition-all">
                          {String(item.val).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[10px] text-[#ff6b35] uppercase font-bold tracking-widest mt-1 opacity-90">{item.label}</span>
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
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#ff6b35] via-[#e92a67] to-[#ff5f3c] bg-[length:200%_auto] hover:bg-[100%_auto] rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,107,53,0.4)] transition-all duration-500 hover:scale-105 w-full sm:w-auto border border-transparent"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center justify-center gap-2 text-white font-extrabold tracking-[0.2em] uppercase text-xs sm:text-sm">
                  Register Inter-University <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <Link 
                to="/inter-school"
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-[#12091f]/80 hover:bg-black border border-[#ff6b35]/40 hover:border-[#ff6b35] rounded-full backdrop-blur-md transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(255,107,53,0.1)]"
              >
                <span className="flex items-center justify-center gap-2 text-[#ff6b35] font-bold tracking-[0.1em] uppercase text-xs sm:text-sm">
                  Inter-School Events <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </span>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════ HIGHLIGHTS BAR ════════ */}
      <section className="relative z-20 py-8 sm:py-16 px-4 -mt-8 sm:-mt-12">
        <div className={`max-w-6xl mx-auto rounded-3xl sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-2xl border ${dark ? 'bg-dark-card/80 border-gold/20 shadow-black/50' : 'bg-white/70 border-maroon/20 shadow-maroon/10'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 sm:gap-8 px-6 py-10 sm:p-14 relative z-10">
            {highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                className="text-center group flex flex-col items-center">
                
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-5 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${dark ? 'bg-black/40 border border-white/10 shadow-black/50' : 'bg-white border border-maroon/10 shadow-maroon/5'}`}>
                  <h.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${dark ? 'text-gold' : 'text-maroon'}`} />
                </div>
                
                <p className="text-gold-gradient text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none drop-shadow-sm mb-2">
                  <CountUp end={h.label} suffix={h.suffix} duration={1800 + i * 400} />
                </p>
                
                <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FESTIVAL JOURNEY ════════ */}
      <section id="events"><MegaEventCard events={events} /></section>

      


      
      {/* ?? EVENT POLAROIDS MARQUEE ?? */}
      <section className="relative z-20 pt-16 pb-12 overflow-hidden bg-[#12091f]">
        
        {/* Left-to-Right Polaroid Marquee */}
        <div className="relative w-full flex overflow-x-hidden border-y border-white/5 bg-black/40 py-12 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          
          <div className="animate-marquee-reverse flex gap-8 sm:gap-12 items-center whitespace-nowrap pl-8 sm:pl-12">
            {/* Set 1 */}
            <EventPolaroid title="Dance" image="/events/dance.jpg" rotation="-rotate-3" tapeColor="bg-white/20" />
            <EventPolaroid title="Music" image="/events/music.jpg" rotation="rotate-2" tapeColor="bg-[#ff6b35]/40" />
            <EventPolaroid title="Fashion" image="/events/fashion.jpg" rotation="-rotate-1" tapeColor="bg-white/30" />
            <EventPolaroid title="Theatre" image="/events/theatre.jpg" rotation="rotate-3" tapeColor="bg-[#9b1c31]/50" />
            <EventPolaroid title="Fine Arts" image="/events/fine-arts.jpg" rotation="-rotate-2" tapeColor="bg-white/20" />
            <EventPolaroid title="Indian Cuisine" image="/events/cuisine.jpg" rotation="rotate-1" tapeColor="bg-[#e01a4f]/40" />
            
            {/* Set 2 (Duplicate for infinite scroll) */}
            <EventPolaroid title="Dance" image="/events/dance.jpg" rotation="-rotate-3" tapeColor="bg-white/20" />
            <EventPolaroid title="Music" image="/events/music.jpg" rotation="rotate-2" tapeColor="bg-[#ff6b35]/40" />
            <EventPolaroid title="Fashion" image="/events/fashion.jpg" rotation="-rotate-1" tapeColor="bg-white/30" />
            <EventPolaroid title="Theatre" image="/events/theatre.jpg" rotation="rotate-3" tapeColor="bg-[#9b1c31]/50" />
            <EventPolaroid title="Fine Arts" image="/events/fine-arts.jpg" rotation="-rotate-2" tapeColor="bg-white/20" />
            <EventPolaroid title="Indian Cuisine" image="/events/cuisine.jpg" rotation="rotate-1" tapeColor="bg-[#e01a4f]/40" />
          </div>
        </div>

        {/* Text Marquee (Event Names) */}
        <div className="relative w-full flex overflow-x-hidden border-b border-white/5 bg-gradient-to-r from-[#0a0505] via-[#1a0a1a] to-[#0a0505] py-5">
          <div className="animate-marquee flex gap-12 items-center whitespace-nowrap pl-12 text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/60 font-black text-4xl sm:text-5xl uppercase tracking-widest drop-shadow-lg">
            <span>Dance</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            <span>Music</span>
            <Sparkles className="w-10 h-10 text-[#e01a4f] shrink-0 opacity-80" />
            <span>Fashion</span>
            <Sparkles className="w-10 h-10 text-[#ffb703] shrink-0 opacity-80" />
            <span>Theatre</span>
            <Sparkles className="w-10 h-10 text-[#9b1c31] shrink-0 opacity-80" />
            <span>Fine Arts</span>
            <Sparkles className="w-10 h-10 text-[#ff5f3c] shrink-0 opacity-80" />
            <span>Indian Cuisine</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            
            {/* Duplicate */}
            <span>Dance</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
            <span>Music</span>
            <Sparkles className="w-10 h-10 text-[#e01a4f] shrink-0 opacity-80" />
            <span>Fashion</span>
            <Sparkles className="w-10 h-10 text-[#ffb703] shrink-0 opacity-80" />
            <span>Theatre</span>
            <Sparkles className="w-10 h-10 text-[#9b1c31] shrink-0 opacity-80" />
            <span>Fine Arts</span>
            <Sparkles className="w-10 h-10 text-[#ff5f3c] shrink-0 opacity-80" />
            <span>Indian Cuisine</span>
            <Sparkles className="w-10 h-10 text-[#ff6b35] shrink-0 opacity-80" />
          </div>
        </div>
      </section>
      {/* ?? NEW PHOTOS MARQUEE ?? */}
      <section id="photos" className="relative z-20 py-8 sm:py-12 overflow-hidden bg-[#12091f]">
        <div className="text-center mb-6 sm:mb-10 px-4">
          <p className="text-[#ff6b35] font-semibold tracking-[0.2em] uppercase text-xs mb-2">Memories</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff5f3c]">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent mx-auto mt-4 opacity-70"></div>
        </div>
        <PhotoMarquee images={[
          '/photos/media_1790128762747.jpg',
          '/photos/media_1790128762753.jpg',
          '/photos/media_1790128762760.jpg',
          '/photos/media_1790128762799.jpg'
        ]} speed={35} />
      </section>

      {/* ════════ EVENTS ════════ */}
      {/* ?? REGISTER ?? */}
        <section id="register" className="py-20 md:py-32 px-4 relative overflow-hidden bg-[#12091f] flex flex-col items-center justify-center">
          <GoldenWheel className={`absolute top-10 left-10 w-40 h-40 opacity-20 animate-[spin_65s_linear_infinite] text-gold`} />
          <SparkleParticle className="top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3" delay={0.5} />
  
          {/* GIANT "SEE YOU IN OCTOBER" GRAPHIC (Top) */}
          <div className="relative w-full flex flex-col items-center justify-center z-10 pt-10">
            <h1 className="font-black tracking-tighter leading-[0.85] flex flex-col items-center text-center w-full">
               <span className="text-[70px] sm:text-[100px] md:text-[150px] lg:text-[180px] bg-clip-text text-transparent bg-gradient-to-b from-[#ffb703] via-[#ff6b35] to-[#9b1c31] drop-shadow-2xl z-20">SEE YOU</span>
               <span className="text-[70px] sm:text-[100px] md:text-[150px] lg:text-[180px] text-transparent z-10 tracking-widest font-sans -mt-4 sm:-mt-8 md:-mt-12" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.6)' }}>IN OCTOBER</span>
            </h1>
          </div>

          {/* THE CARD (Middle) */}
          <div className="max-w-2xl mx-auto w-full relative z-40 mt-16 mb-24">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={`text-center p-8 sm:p-12 md:p-14 rounded-3xl border relative overflow-hidden backdrop-blur-xl bg-black/60 border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]`}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#9b1c31]"></div>
  
              <p className="text-gold-gradient text-2xl sm:text-4xl font-extrabold mb-1 pt-2 pb-1">उत्सव की तैयारी करें</p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black mb-2 text-white">Join the Celebration</h2>
              <GoldLine />
              <p className="text-sm sm:text-base mb-8 max-w-md mx-auto mt-4 text-gray-300 leading-relaxed">
                Register through our official Google Form and represent your university at Abhivyakti 2026. Open to all universities across India.
              </p>
  
              <a 
href="https://docs.google.com/forms/d/e/1FAIpQLSfmgwAHb9CEGP9jj13wmTf3regVu8ikecjMfDCEYg53orF0Mg/viewform?usp=header" 
target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#ff5f3c] text-black px-8 py-4 rounded-xl text-base sm:text-xl font-black hover:scale-105 active:scale-[0.97] transition-all shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:shadow-[0_0_60px_rgba(255,107,53,0.6)] uppercase tracking-widest w-full sm:w-auto">
                Register Now <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* FAST MOVING TILTED TAPE (Bottom) */}
          <div className="relative w-[110%] h-12 md:h-16 bg-[#ffb703] -rotate-3 shadow-[0_0_50px_rgba(255,183,3,0.4)] z-30 flex items-center overflow-hidden border-y-2 border-white/40 mt-8 mb-4 mix-blend-screen">
             <div className="animate-marquee flex gap-10 items-center whitespace-nowrap text-black font-black text-2xl md:text-3xl uppercase tracking-tighter" style={{ animationDuration: '6s' }}>
                 <span>Quantum University</span> <Sparkles className="w-6 h-6 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-6 h-6 text-black" /> <span>Join Now</span> <Sparkles className="w-6 h-6 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-6 h-6 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-6 h-6 text-black" /> <span>Join Now</span> <Sparkles className="w-6 h-6 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-6 h-6 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-6 h-6 text-black" /> <span>Join Now</span> <Sparkles className="w-6 h-6 text-black" />
                 <span>Quantum University</span> <Sparkles className="w-6 h-6 text-black" /> <span>Abhivyakti &apos;26</span> <Sparkles className="w-6 h-6 text-black" /> <span>Join Now</span> <Sparkles className="w-6 h-6 text-black" />
             </div>
          </div>
        </section>

      <ContactCrewGrid coordinators={[
        { name: "Shivam Prakash", role: "STUDENT COORDINATOR", phone: "74829 42186" },
        { name: "Archii", role: "STUDENT COORDINATOR", phone: "93028 42951", image: "/crew/archii.jpg" },
        { name: "Indra Mohan Kumar", role: "TECH", phone: "6204318317", image: "/crew/indra.jpg" }
      ]} />
      <footer id="contact" className={`pt-12 sm:pt-20 pb-6 px-4 border-t ${dark ? 'bg-black/40 border-dark-border text-white' : 'bg-gradient-to-b from-[#3d0014] to-[#1f000a] text-cream border-[#5c001e]'} relative z-10 shadow-[0_-10px_30px_rgba(61,0,20,0.3)]`}>
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-10 border-b border-white/10">
  
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 inline-flex">
                  <img src="/logo.png" alt="Quantum University" className="h-12 sm:h-14 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
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
                      <Link to={`/${item.toLowerCase() === 'journey' ? 'journey' : ''}`} className="text-gray-400 text-sm hover:text-gold hover:pl-2 transition-all duration-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/50"></span>
                        {item}
                      </Link>
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
              <p className="text-gray-500 text-xs">&copy; 2026 Quantum University, Roorkee. All rights reserved.</p>
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






