import React, { useState, useEffect, useRef } from 'react';
import { EmberParticles } from '../components/ui/EmberParticles';
import { ContactCrewGrid } from '../components/ui/CrewCard';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, MapPin, Calendar, Users, Mic, ArrowLeft, Palette, BookOpen, Drama, X, ChevronRight, Magnet, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import CulturalDust from '../components/ui/cultural-dust';
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

/* ─── Reused Components ─── */
const GoldenWheel = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" opacity="0.4"/>
    <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
    <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
    {[...Array(16)].map((_, i) => (
      <path key={i} d="M100 16 C 110 40, 115 60, 100 80 C 85 60, 90 40, 100 16 Z" fill="currentColor" opacity="0.15" transform={`rotate(${i*22.5} 100 100)`}/>
    ))}
    <circle cx="100" cy="100" r="24" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5"/>
    <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.4"/>
  </svg>
);

const SparkleParticle = ({ className, delay = 0, zeroG = false }) => {
  const zeroGAnimate = {
    y: [0, -300],
    x: [0, (Math.random() - 0.5) * 100],
    opacity: [0, 1, 0],
    scale: [0, 1.5, 0],
    rotate: [0, 180]
  };

  const normalAnimate = {
    opacity: [0, 1, 0],
    scale: [0, 1.5, 0]
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)] pointer-events-none ${className}`}
      animate={zeroG ? zeroGAnimate : normalAnimate}
      transition={{ 
        duration: zeroG ? 4 + Math.random() * 2 : 3, 
        repeat: Infinity, 
        ease: zeroG ? "linear" : "easeInOut", 
        delay 
      }}
    />
  );
};

const GoldLine = () => (
  <div className="flex items-center gap-4 max-w-sm mx-auto my-5">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
    <div className="w-2 h-2 rotate-45 bg-gold/60"></div>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
  </div>
);

/* ─── Magnetic 3D Card Wrapper ─── */
const MagneticCard = ({ children, className, zeroG }) => {
  const ref = useRef(null);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Map mouse position to rotation degrees
  const rotateX = useTransform(y, [-150, 150], [12, -12]);
  const rotateY = useTransform(x, [-150, 150], [-12, 12]);
  
  // Add physics spring for smooth tilting
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    if (zeroG || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
    scale.set(1.02); // Magnetic pull toward cursor
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  // Zero-G Physics values
  const [driftX, setDriftX] = useState((Math.random() - 0.5) * 40);
  const [driftY, setDriftY] = useState((Math.random() - 0.5) * 40);
  const [driftR, setDriftR] = useState((Math.random() - 0.5) * 10);
  
  useEffect(() => {
    if (zeroG) {
      // Create random drifting when zeroG is toggled
      setDriftX((Math.random() - 0.5) * 40);
      setDriftY((Math.random() - 0.5) * 40);
      setDriftR((Math.random() - 0.5) * 6);
    }
  }, [zeroG]);

  const zeroGAnimate = zeroG ? { 
    x: [0, driftX, -driftX, 0],
    y: [0, driftY, -driftY, 0], 
    rotateZ: [0, driftR, -driftR, 0] 
  } : { x: 0, y: 0, rotateZ: 0 };

  const zeroGTransition = zeroG ? { 
    duration: 6 + Math.random() * 4, 
    repeat: Infinity, 
    ease: "easeInOut" 
  } : { duration: 0.5, ease: "easeOut" };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      animate={zeroGAnimate}
      transition={zeroGTransition}
      className="h-full w-full"
    >
      <motion.div 
        style={{ 
          rotateX: zeroG ? 0 : springX, 
          rotateY: zeroG ? 0 : springY, 
          scale: zeroG ? 1 : scale 
        }}
        className={`h-full w-full ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};


/* ─── Event Data ─── */
const eventDetails = [
  {
    id: "declamation",
    title: "Declamation",
    theme: "Bharat – The Voice of a Civilisation",
    icon: Mic,
    colorName: "gold",
    colorClass: "bg-gold",
    textColor: "text-gold",
    borderColor: "border-gold/20",
    gradientVia: "via-gold",
    shortDetails: [
      "Team: Individual",
      "Language: Hindi or English",
      "Duration: 3–5 minutes",
      "Timings: 9:30 am onwards"
    ],
    topics: ["Indian cultural heritage", "Vasudhaiva Kutumbakam", "India's unity in diversity"],
    rules: ["Individual participation only.", "Speech may be delivered in Hindi or English.", "Maximum time: 3–5 minutes."]
  },
  {
    id: "fine-arts",
    title: "Fine Arts",
    theme: "Rang-e-Bharat – Colours of Our Heritage",
    icon: Palette,
    colorName: "quantum-pink",
    colorClass: "bg-quantum-pink",
    textColor: "text-quantum-pink",
    borderColor: "border-quantum-pink/20",
    gradientVia: "via-quantum-pink",
    shortDetails: [
      "Team: Individual",
      "Duration: 90 minutes",
      "Max 4 participants per school",
      "Timings: 9:30 am onwards"
    ],
    topics: ["Indian festivals and celebrations", "Folk and tribal art", "Indian monuments and heritage"],
    rules: ["Individual participation only.", "Artwork will be created at the venue.", "Maximum time: 90 minutes."]
  },
  {
    id: "story-telling",
    title: "Story Telling",
    theme: "Kahaniyan Bharat Ki – Stories of Our Roots",
    icon: BookOpen,
    colorName: "blue-400",
    colorClass: "bg-blue-400",
    textColor: "text-blue-400",
    borderColor: "border-blue-400/20",
    gradientVia: "via-blue-400",
    shortDetails: [
      "Team: Individual",
      "Duration: 5–7 minutes",
      "Max 4 participants per school",
      "Timings: 9:30 am onwards"
    ],
    topics: ["Panchatantra & Jataka tales", "Indian mythology and folklore", "Stories of Indian freedom fighters"],
    rules: ["Individual participation only.", "Maximum time: 5–7 minutes.", "The story may be original, traditional or adapted."]
  },
  {
    id: "skit",
    title: "Skit",
    theme: "Bharat – Parampara Se Pragati Tak",
    icon: Drama,
    colorName: "green-400",
    colorClass: "bg-green-400",
    textColor: "text-green-400",
    borderColor: "border-green-400/20",
    gradientVia: "via-green-400",
    shortDetails: [
      "Team: 4–10 participants",
      "Duration: 8–10 minutes",
      "Timings: 9:30 am onwards"
    ],
    topics: ["Indian traditions in modern society", "Unity in Diversity", "Saving India's cultural heritage"],
    rules: ["Team event with 4–10 participants.", "Maximum performance time: 8–10 minutes.", "Performance may be in Hindi or English."]
  }
];

export default function InterSchool() {
  const [activeModal, setActiveModal] = useState(null);
  const [zeroG, setZeroG] = useState(false);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll();
  const yParallaxElements = useTransform(scrollYProgress, [0, 1], [0, -300]); // Moves up faster
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 200]); // Inverse drift

  const dark = true;

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setActiveModal(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : 'unset';
  }, [activeModal]);

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${dark ? 'bg-cultural-dark text-gray-200' : 'bg-cultural text-gray-800'}`}>
      
      {/* ZeroG Background Effect */}
      <motion.div 
        animate={{ opacity: zeroG ? 0.3 : 1 }} 
        transition={{ duration: 1 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <CulturalDust mode={dark ? "dark" : "light"} speed={zeroG ? 2.5 : 0.8} />
      </motion.div>
      <ParallaxMandalaBackground />

      {/* Navigation */}
      <nav className="relative z-50 pt-5 sm:pt-6 px-4 md:px-8 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-0 sm:py-0 sm:bg-transparent border sm:border-none rounded-lg transition-colors ${dark ? 'bg-white/5 border-white/10 text-gold hover:text-gold-light' : 'bg-maroon/5 border-maroon/10 text-maroon hover:text-deep-red'}`}>
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold tracking-wide uppercase text-[10px] sm:text-sm hidden sm:inline">Back to Home</span>
            <span className="font-semibold tracking-wide uppercase text-[10px] sm:hidden">Home</span>
          </Link>
          
          <div className={`w-px h-6 hidden sm:block ${dark ? 'bg-white/20' : 'bg-gray-300'}`}></div>
          
          {/* ── Zero-G Toggle ── */}
          <button 
            onClick={() => setZeroG(!zeroG)}
            title="Toggle Anti-Gravity"
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
              zeroG 
                ? 'bg-quantum-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.8)] border border-quantum-purple' 
                : dark 
                  ? 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10'
                  : 'bg-maroon/5 text-maroon border border-maroon/20 hover:bg-maroon/10'
            }`}
          >
            <Magnet className={`w-4 h-4 ${zeroG ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-2.5">
          <img src="/logo.png" alt="Quantum University" className="h-12 sm:h-14 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          
        </div>
      </nav>

      <main className="relative z-10 pt-10 pb-20 px-4">
        {/* Background Parallax Decorations */}
        <motion.div style={{ y: yParallaxElements }} className="absolute -top-20 -left-20 w-[300px] h-[300px] pointer-events-none">
          <GoldenWheel className="w-full h-full animate-[spin_60s_linear_infinite] text-gold/15" />
        </motion.div>
        
        <motion.div style={{ y: yParallaxSlow }} className="absolute top-1/2 -right-32 w-[400px] h-[400px] pointer-events-none">
          <GoldenWheel className="w-full h-full animate-[spin_80s_linear_infinite_reverse] text-quantum-purple/15" />
        </motion.div>
        
        {/* Dust Particles (Upward in ZeroG) */}
        <SparkleParticle zeroG={zeroG} className="top-1/4 left-1/3 w-2 h-2" delay={0.2} />
        <SparkleParticle zeroG={zeroG} className="top-1/3 right-1/4 w-2 h-2" delay={2.5} />
        <SparkleParticle zeroG={zeroG} className="bottom-1/4 right-1/3 w-2 h-2" delay={0.8} />

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header Section */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={stagger} 
            className="text-center space-y-4 pt-10 relative z-20"
          >
            <motion.div variants={fadeUp} className={`inline-block px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-4 ${dark ? 'bg-gold/10 border-gold/20 text-gold' : 'bg-maroon/10 border-maroon/20 text-maroon'}`}>
              Oct, 22nd 2026
            </motion.div>
            
            {/* Float header gently in Zero-G */}
            <motion.h1 
              variants={fadeUp} 
              animate={zeroG ? { y: [0, -10, 5, 0], rotateZ: [0, 1, -1, 0] } : {}}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`font-hindi text-4xl md:text-6xl lg:text-7xl font-extrabold py-3 leading-normal md:leading-normal ${dark ? 'text-gold-gradient drop-shadow-[0_10px_20px_rgba(201,168,76,0.3)]' : 'text-maroon drop-shadow-sm'}`}
            >
              अभिव्यक्ति
            </motion.h1>
            
            <motion.h2 variants={fadeUp} className={`font-serif text-xl md:text-3xl font-black tracking-wide ${dark ? 'text-white' : 'text-deep-red'}`}>
              Expressions of Bharat
            </motion.h2>
            <motion.h3 variants={fadeUp} className={`text-base md:text-xl font-bold tracking-wide mt-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              Parampara, Sanskriti & Srijan
            </motion.h3>
            <GoldLine />
            <motion.p variants={fadeUp} className={`max-w-2xl mx-auto text-sm md:text-base leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              Quantum University invites your participation in The Inter-School Events. Join us for a celebration of our heritage, culture, and creativity.
            </motion.p>
              
              <motion.div variants={fadeUp} className="mt-8 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSemUbsPQUTjTPb3UQSwWWj2zvrEq70acv8z_iunsS3cIF2qbA/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg rounded-full font-extrabold text-lg md:text-xl uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <span className="relative z-10">Register Now</span>
                    <Sparkles className="w-5 h-5 text-dark-bg relative z-10" />
                  </a>
                </div>
              </motion.div>
          </motion.div>

          {/* Events Grid (Inverse Scrolling Parallax wrapper) */}
          <motion.div style={{ y: yParallaxElements }} className="relative z-10 w-full h-full">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {eventDetails.map((event) => {
                const Icon = event.icon;
                return (
                  <MagneticCard key={event.id} zeroG={zeroG}>
                    <div className={`relative h-full p-8 rounded-3xl border backdrop-blur-md overflow-hidden group flex flex-col shadow-lg transition-colors duration-500 hover:border-gold/30 ${dark ? 'bg-dark-card/60 border-dark-border' : 'bg-white/70 border-maroon/20 hover:border-maroon/50 shadow-maroon/5'}`}>
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${event.gradientVia} to-transparent opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                      
                      <div className="flex-1 pointer-events-none">
                        <Icon className={`w-10 h-10 mb-6 ${event.textColor} group-hover:scale-110 transition-transform duration-300`} />
                        <h3 className={`font-serif text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-maroon'}`}>{event.title}</h3>
                        <p className={`text-sm leading-relaxed mb-6 font-medium ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Theme: "{event.theme}"
                        </p>
                        
                        <ul className={`space-y-2 text-sm mb-8 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {event.shortDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${event.colorClass}`}></div>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button 
                        onClick={() => setActiveModal(event)}
                        className={`mt-auto inline-flex items-center justify-between w-full px-5 py-3 rounded-xl border transition-colors text-sm font-bold tracking-wide pointer-events-auto ${
                          dark 
                            ? `border-white/5 bg-white/5 hover:bg-white/10 ${event.textColor}` 
                            : `border-maroon/10 bg-maroon/5 hover:bg-maroon/10 text-maroon`
                        }`}
                      >
                        <span>View Rules & Topics</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </MagneticCard>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Registration Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center justify-center mt-16 pb-12 relative z-20"
          >
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold via-gold-light to-gold-dark rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSemUbsPQUTjTPb3UQSwWWj2zvrEq70acv8z_iunsS3cIF2qbA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg rounded-full font-extrabold text-xl md:text-2xl uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative z-10">Register Now</span>
                <Sparkles className="w-6 h-6 text-dark-bg relative z-10" />
              </a>
            </div>
            <p className="mt-6 text-gray-400 text-sm font-medium tracking-wide">Join us on Oct 22nd, 2026</p>
          </motion.div>

        </div>
      </main>

      {/* Rules Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col rounded-2xl shadow-2xl ${dark ? 'bg-dark-card border border-dark-border' : 'bg-cream border border-maroon/20'}`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${activeModal.gradientVia} to-transparent`}></div>
              
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-6 border-b shrink-0 ${dark ? 'border-white/10' : 'border-maroon/10'}`}>
                <div className="flex items-center gap-3">
                  <activeModal.icon className={`w-6 h-6 ${dark ? activeModal.textColor : 'text-maroon'}`} />
                  <div>
                    <h2 className={`font-serif text-xl font-bold leading-tight ${dark ? 'text-white' : 'text-deep-red'}`}>{activeModal.title}</h2>
                    <p className={`text-xs mt-1 font-medium ${dark ? activeModal.textColor : 'text-maroon'}`}>{activeModal.theme}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className={`p-2 rounded-full transition-colors ${dark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-maroon/10 text-gray-500 hover:text-maroon'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="space-y-8">
                  {/* Topics Section */}
                  <div>
                    <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-maroon'}`}>
                      <div className={`w-1 h-5 rounded-full ${dark ? activeModal.colorClass : 'bg-maroon'}`}></div>
                      Topics & Inspiration
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeModal.topics.map((topic, i) => (
                        <li key={i} className={`flex items-start gap-2.5 text-sm p-3 rounded-lg border ${dark ? 'text-gray-300 bg-white/[0.02] border-white/5' : 'text-gray-700 bg-maroon/5 border-maroon/10'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${dark ? activeModal.colorClass : 'bg-maroon'} opacity-70`}></div>
                          <span className="leading-snug">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rules Section */}
                  <div>
                    <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-maroon'}`}>
                      <div className={`w-1 h-5 rounded-full ${dark ? activeModal.colorClass : 'bg-maroon'}`}></div>
                      Event Rules
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
                  
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════ FOOTER ════════ */}
      <ContactCrewGrid coordinators={[
        { name: "Dhruv Bhati", role: "STUDENT COORDINATOR", phone: "79062 16206", image: "/crew/dhruv.jpg" },
        { name: "Nilbrata Das", role: "STUDENT COORDINATOR", phone: "89748 94143", image: "/crew/nilbrata.jpg" }
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
    </div>
  );
}

