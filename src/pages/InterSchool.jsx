import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Calendar, Users, Mic, ArrowLeft, Palette, BookOpen, Drama, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConstellationField from '../components/ui/constellation-field';

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
    borderColor: "hover:border-gold/30",
    gradientVia: "via-gold",
    shortDetails: [
      "Team: Individual",
      "Language: Hindi or English",
      "Duration: 3–5 minutes",
      "Timings: 9:30 am onwards"
    ],
    topics: [
      "Indian cultural heritage and traditions",
      "Vasudhaiva Kutumbakam – the world as one family",
      "India's unity in diversity",
      "Indian knowledge traditions",
      "Unsung heroes of Indian history",
      "India's contribution to science, literature and philosophy",
      "Role of youth in preserving Indian culture",
      "Traditional values in modern India",
      "Indian festivals and their significance",
      "Heritage conservation"
    ],
    rules: [
      "Individual participation only.",
      "Speech may be delivered in Hindi or English.",
      "Maximum time: 3–5 minutes.",
      "The speech should be relevant to the given theme/topic.",
      "Participants should deliver the speech without reading a complete script.",
      "Limited cue cards may be used.",
      "Facts and references, wherever used, should be authentic.",
      "The content should promote cultural understanding and respect for India's diversity.",
      "Offensive, derogatory or inappropriate content is not permitted."
    ]
  },
  {
    id: "fine-arts",
    title: "Fine Arts",
    theme: "Rang-e-Bharat – Colours of Our Heritage",
    icon: Palette,
    colorName: "quantum-pink",
    colorClass: "bg-quantum-pink",
    textColor: "text-quantum-pink",
    borderColor: "hover:border-quantum-pink/30",
    gradientVia: "via-quantum-pink",
    shortDetails: [
      "Team: Individual",
      "Duration: 90 minutes",
      "Max 4 participants per school",
      "Timings: 9:30 am onwards"
    ],
    topics: [
      "Indian festivals and celebrations",
      "Folk and tribal art",
      "Indian monuments and heritage",
      "Traditional costumes",
      "Indian villages and rural life",
      "Classical and folk dance forms",
      "Indian handicrafts",
      "Nature and Indian landscapes",
      "Unity in diversity",
      "Indian traditions meeting modern India",
      "“My Vision of Bharat”"
    ],
    rules: [
      "Individual participation only.",
      "Artwork will be created at the venue.",
      "Maximum time: 90 minutes.",
      "Participants must bring their own art materials.",
      "Artwork must be based on the theme announced by the organisers.",
      "Traditional Indian art forms such as Madhubani, Warli, Gond, Mandala, Kalamkari-inspired patterns, etc., may be used creatively.",
      "Pre-drawn or partially completed artwork is not permitted.",
      "Tracing, printed images and stencils are not allowed.",
      "The artwork must be the participant's original creation.",
      "Completed artwork must be submitted before leaving the venue."
    ]
  },
  {
    id: "story-telling",
    title: "Story Telling",
    theme: "Kahaniyan Bharat Ki – Stories of Our Roots",
    icon: BookOpen,
    colorName: "blue-400",
    colorClass: "bg-blue-400",
    textColor: "text-blue-400",
    borderColor: "hover:border-blue-400/30",
    gradientVia: "via-blue-400",
    shortDetails: [
      "Team: Individual",
      "Duration: 5–7 minutes",
      "Max 4 participants per school",
      "Timings: 9:30 am onwards"
    ],
    topics: [
      "Panchatantra & Jataka tales",
      "Indian mythology and folklore",
      "Stories of Indian freedom fighters",
      "Folk tales from different regions of India",
      "Stories of Indian saints, thinkers and reformers",
      "Stories highlighting Indian values",
      "Stories of grandparents and oral traditions",
      "Regional legends and traditional narratives",
      "Stories showcasing unity in diversity",
      "Contemporary stories inspired by Indian culture"
    ],
    rules: [
      "Individual participation only.",
      "Maximum time: 5–7 minutes.",
      "The story may be original, traditional or adapted.",
      "The source should be acknowledged where applicable.",
      "The story should reflect an aspect of Indian culture, heritage, values or traditions.",
      "Participants may use appropriate expressions, gestures and simple props.",
      "Narration must be performed live.",
      "Pre-recorded narration or voice-over is not permitted.",
      "The story should be suitable for a school audience.",
      "Vulgar, offensive or culturally disrespectful content is prohibited."
    ]
  },
  {
    id: "skit",
    title: "Skit",
    theme: "Bharat – Parampara Se Pragati Tak",
    icon: Drama,
    colorName: "green-400",
    colorClass: "bg-green-400",
    textColor: "text-green-400",
    borderColor: "hover:border-green-400/30",
    gradientVia: "via-green-400",
    shortDetails: [
      "Team: 4–10 participants",
      "Duration: 8–10 minutes",
      "Timings: 9:30 am onwards"
    ],
    topics: [
      "Indian traditions in modern society",
      "Unity in Diversity",
      "Saving India's cultural heritage",
      "Generation gap and changing traditions",
      "Traditional values in contemporary life",
      "Indian festivals and their social significance",
      "Rural India and changing lifestyles",
      "Folk traditions and their preservation",
      "Indian family values",
      "Atmanirbhar Bharat",
      "Youth and the preservation of heritage",
      "Traditional knowledge and modern innovation"
    ],
    rules: [
      "Team event with 4–10 participants.",
      "Maximum performance time: 8–10 minutes.",
      "Performance may be in Hindi, English or a combination of both.",
      "The skit should have a clear connection with Indian culture, heritage, values or contemporary India.",
      "Costumes and props may be used.",
      "Teams must arrange their own costumes and props.",
      "Background music and sound effects are permitted.",
      "Dialogues and acting must be performed live.",
      "Fire, weapons, hazardous substances and dangerous props are strictly prohibited.",
      "Vulgar, offensive or disrespectful portrayal of any religion, community, culture or tradition is not permitted.",
      "Teams must complete stage setup and clearance within the allotted time.",
      "Exceeding the prescribed performance time may result in penalty/disqualification."
    ]
  }
];

export default function InterSchool() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Handle escape key for modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModal]);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-500 bg-cultural-dark text-gray-200">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-75">
        <ConstellationField mode="dark" speed={1} opacity={0.85} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 pt-5 sm:pt-6 px-4 md:px-8 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <img src="/logo.png" alt="Quantum University" className="h-7 sm:h-8 md:h-9 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] brightness-110" />
          <div className="flex flex-col leading-none">
            <span className="text-gold-gradient text-base sm:text-lg md:text-xl font-extrabold tracking-tight pt-1 pb-1">अभिव्यक्ति</span>
            <span className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase font-medium text-gray-400">Inter-School</span>
          </div>
        </div>
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-0 sm:py-0 sm:bg-transparent bg-white/5 border border-white/10 sm:border-none rounded-lg text-gold hover:text-gold-light transition-colors">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold tracking-wide uppercase text-[10px] sm:text-sm hidden sm:inline">Back to Home</span>
          <span className="font-semibold tracking-wide uppercase text-[10px] sm:hidden">Home</span>
        </Link>
      </nav>

      <main className="relative z-10 pt-10 pb-20 px-4">
        {/* Background Decorations */}
        <GoldenWheel className="absolute -top-20 -left-20 w-[300px] h-[300px] animate-[spin_60s_linear_infinite] text-gold/15" />
        <GoldenWheel className="absolute top-1/2 -right-32 w-[400px] h-[400px] animate-[spin_80s_linear_infinite_reverse] text-quantum-purple/15" />
        
        <SparkleParticle className="top-1/4 left-1/3 w-2 h-2" delay={0.2} />
        <SparkleParticle className="top-1/3 right-1/4 w-2 h-2" delay={2.5} />
        <SparkleParticle className="bottom-1/4 right-1/3 w-2 h-2" delay={0.8} />

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header Section */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={stagger} 
            className="text-center space-y-4 pt-10"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold tracking-widest uppercase mb-4">
              Oct, 22nd 2026
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl font-extrabold text-gold-gradient drop-shadow-[0_10px_20px_rgba(201,168,76,0.3)] py-3 leading-normal md:leading-normal">
              Expressions of Bharat
            </motion.h1>
            <motion.h2 variants={fadeUp} className="font-serif text-xl md:text-2xl font-bold text-white tracking-wide">
              Parampara, Sanskriti & Srijan
            </motion.h2>
            <GoldLine />
            <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed">
              Quantum University invites your participation in The Inter-School Events. Join us for a celebration of our heritage, culture, and creativity.
            </motion.p>
          </motion.div>

          {/* Events Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {eventDetails.map((event) => {
              const Icon = event.icon;
              return (
                <div key={event.id} className={`relative p-8 rounded-3xl border border-dark-border bg-dark-card/60 backdrop-blur-md overflow-hidden group transition-all duration-500 flex flex-col ${event.borderColor}`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${event.gradientVia} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className="flex-1">
                    <Icon className={`w-10 h-10 mb-6 ${event.textColor}`} />
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                      Theme: "{event.theme}"
                    </p>
                    
                    <ul className="space-y-2 text-sm text-gray-300 mb-8">
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
                    className={`mt-auto inline-flex items-center justify-between w-full px-5 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors ${event.textColor} text-sm font-bold tracking-wide`}
                  >
                    <span>View Rules & Topics</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </motion.div>

          {/* Registration Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center justify-center mt-16 pb-12"
          >
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold via-gold-light to-gold-dark rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <a 
                href="#" 
                className="relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg rounded-full font-extrabold text-xl md:text-2xl uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative z-10">Register Now</span>
                <Sparkles className="w-6 h-6 text-dark-bg relative z-10" />
              </a>
            </div>
            <p className="mt-6 text-gray-400 text-sm font-medium tracking-wide">Join us on Oct 22nd, 2026</p>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="border-t border-dark-border/50 pt-10 pb-12 text-center text-sm md:text-base text-gray-400 leading-relaxed"
          >
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 mb-4">
              <p><span className="text-gold font-medium">Student Coordinators:</span><br/> Dhruv Bhati <a href="tel:7906216206" className="hover:text-white transition-colors">7906216206</a><br/> Nilbrata Das <a href="tel:8974894143" className="hover:text-white transition-colors">8974894143</a></p>
              <p><span className="text-gold font-medium">Convener:</span><br/> Dr. Pushpender Singh <a href="tel:9899142233" className="hover:text-white transition-colors">98991 42233</a></p>
            </div>
            <p><span className="text-gold font-medium">Co-Conveners:</span> Dr Nirmesh Sharma <a href="tel:9760087704" className="hover:text-white transition-colors">97600 87704</a>, Dr Varsha Gupta <a href="tel:7015660812" className="hover:text-white transition-colors">70156 60812</a>, Dr. Mousmi Agarwal <a href="tel:9897193757" className="hover:text-white transition-colors">98971 93757</a></p>
          </motion.div>
        </div>
      </main>

      {/* Rules Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
              className={`relative w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col bg-dark-card border border-dark-border rounded-2xl shadow-2xl`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${activeModal.gradientVia} to-transparent`}></div>
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <activeModal.icon className={`w-6 h-6 ${activeModal.textColor}`} />
                  <div>
                    <h2 className="font-serif text-xl font-bold text-white leading-tight">{activeModal.title}</h2>
                    <p className={`text-xs mt-1 ${activeModal.textColor} font-medium`}>{activeModal.theme}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="space-y-8">
                  
                  {/* Topics Section */}
                  <div>
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                      <div className={`w-1 h-5 rounded-full ${activeModal.colorClass}`}></div>
                      Topics & Inspiration
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeModal.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm bg-white/[0.02] p-3 rounded-lg border border-white/5">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${activeModal.colorClass} opacity-70`}></div>
                          <span className="leading-snug">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rules Section */}
                  <div>
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                      <div className={`w-1 h-5 rounded-full ${activeModal.colorClass}`}></div>
                      Event Rules
                    </h4>
                    <ul className="space-y-3">
                      {activeModal.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                          <span className={`font-mono text-xs mt-0.5 px-1.5 py-0.5 rounded bg-white/10 ${activeModal.textColor}`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="leading-relaxed pt-0.5">{rule}</span>
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
    </div>
  );
}
