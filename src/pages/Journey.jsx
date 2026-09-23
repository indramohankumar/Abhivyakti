import React from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmberParticles } from '../components/ui/EmberParticles';



const dark = true;

const GoldLine = () => (
  <div className="flex items-center gap-4 max-w-sm mx-auto my-5">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
    <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)]"></div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-transparent"></div>
  </div>
);

export default function Journey() {
  const journeyRef = useRef(null);
  const { scrollYProgress: journeyScroll } = useScroll({
    target: journeyRef,
    offset: ["start center", "end center"]
  });
  return (
    <div className="min-h-screen bg-[#0a0505] text-white font-sans overflow-x-hidden">
      <EmberParticles />
      
      {/* Background radial glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#ff6b35]/20 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Navbar Minimal */}
      <nav className="relative z-50 px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-[#ff6b35] transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-xs uppercase">Back to Home</span>
        </Link>
        <div className="text-[#ff6b35] font-mono font-black tracking-widest text-lg sm:text-2xl uppercase">
          ABHIVYAKTI '26
        </div>
      </nav>

      {/* Hero */}
      <header className="relative z-10 pt-20 pb-16 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1 border border-[#ff6b35]/30 rounded-full text-[#ff6b35] text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(255,107,53,0.2)]">
            Across India
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 uppercase tracking-tighter">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] drop-shadow-[0_0_30px_rgba(255,107,53,0.5)]">Journey</span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Rock, rap, beatboxing, comedy and DJ battles hit your city before the grand finale at Quantum University. Hit the road with us.
          </p>
        </motion.div>
      </header>

      {/* Timeline */}
      <section id="journey" className="py-16 sm:py-24 relative overflow-hidden">

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-gold font-semibold tracking-[0.2em] uppercase text-xs mb-2">3 Days of Glory</p>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-black mb-3 ${dark ? 'text-white' : 'text-maroon'}`}>
              The <span className="text-gold-gradient">Festival Journey</span>
            </h2>
            <GoldLine />
          </div>

          <div ref={journeyRef} className="relative max-w-4xl mx-auto py-4 sm:py-10">

            {/* ── Flowing golden line (desktop) ── */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden sm:block pointer-events-none w-[4px]">
              <div className="absolute inset-0 bg-gold/10 rounded-full"></div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full origin-top shadow-[0_0_20px_rgba(201,168,76,0.8)]"
                style={{ scaleY: journeyScroll }}
              />
            </div>

            {/* ── Flowing golden line (mobile) ── */}
            <div className="absolute left-[22px] top-0 bottom-0 sm:hidden pointer-events-none w-[3px]">
              <div className="absolute inset-0 bg-gold/10 rounded-full"></div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full origin-top shadow-[0_0_15px_rgba(201,168,76,0.6)]"
                style={{ scaleY: journeyScroll }}
              />
            </div>

            <div className="space-y-20 sm:space-y-28 relative z-10">

              {/* ── DAY 1 · Inter-School ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-200px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 pl-14 sm:pl-0"
              >
                <div className="sm:w-[46%] sm:text-right">
                  <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[11px] font-bold uppercase tracking-widest rounded-full mb-3 border border-gold/20 shadow-sm shadow-gold/5">Day 1 · Oct 22nd</span>
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
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-2 sm:top-1/2 sm:-translate-y-1/2 z-20">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-dark-bg border-[3px] border-gold flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.8)] backdrop-blur-md">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gold rounded-full animate-ping absolute"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gold rounded-full"></div>
                  </div>
                </div>

                {/* Poster Image */}
                <div className="w-[85%] max-w-[240px] sm:max-w-none sm:w-[46%] mt-2 sm:mt-0 transition-transform duration-500 hover:scale-[1.02]">
                  <TiltPoster src="/poster-school.png" alt="Inter-School Events Poster" glowColor="rgba(201,168,76,0.3)" borderColor="border-gold/30" />
                </div>
              </motion.div>

              {/* ── DAY 2 & 3 · Inter-University ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-200px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative flex flex-col sm:flex-row-reverse items-start sm:items-center gap-6 sm:gap-12 pl-14 sm:pl-0"
              >
                <div className="sm:w-[46%]">
                  <span className="inline-block px-3 py-1 bg-quantum-pink/10 text-quantum-pink text-[11px] font-bold uppercase tracking-widest rounded-full mb-3 border border-quantum-pink/20 shadow-sm shadow-quantum-pink/5">Day 2 & 3 · Oct 23rd-24th</span>
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
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-2 sm:top-1/2 sm:-translate-y-1/2 z-20">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-dark-bg border-[3px] border-quantum-pink flex items-center justify-center shadow-[0_0_20px_rgba(234,21,136,0.8)] backdrop-blur-md">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-quantum-pink rounded-full animate-ping absolute"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-quantum-pink rounded-full"></div>
                  </div>
                </div>

                {/* Poster Image */}
                <div className="w-[85%] max-w-[240px] sm:max-w-none sm:w-[46%] mt-2 sm:mt-0 transition-transform duration-500 hover:scale-[1.02]">
                  <TiltPoster src="/poster-university.png" alt="Inter-University Events Poster" glowColor="rgba(234,21,136,0.3)" borderColor="border-quantum-pink/30" />
                </div>
              </motion.div>


            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
