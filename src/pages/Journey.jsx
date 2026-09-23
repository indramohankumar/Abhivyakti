import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmberParticles } from '../components/ui/EmberParticles';

const cities = [
  { city: "Delhi", date: "12 Oct 2026", venue: "TBA", desc: "The capital kick-off. Rap & Beatboxing battles.", color: "from-[#ff6b35]" },
  { city: "Lucknow", date: "15 Oct 2026", venue: "TBA", desc: "Nawabi vibes. Comedy and DJ Wars.", color: "from-[#ff5f3c]" },
  { city: "Jaipur", date: "18 Oct 2026", venue: "TBA", desc: "The pink city showdown. Rock band clashes.", color: "from-[#9b1c31]" },
  { city: "Roorkee", date: "24-26 Oct 2026", venue: "Quantum University", desc: "The Grand Finale. The Fire Within.", color: "from-[#ff9d4a]" }
];

export default function Journey() {
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
      <section className="relative z-10 py-16 px-4 max-w-5xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[24px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff6b35]/10 via-[#ff6b35]/50 to-[#ff6b35]/10 sm:-translate-x-1/2"></div>
          
          <div className="space-y-12 sm:space-y-24">
            {cities.map((city, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-8 ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
              >
                {/* Node */}
                <div className="absolute left-[25px] sm:left-1/2 w-4 h-4 bg-[#12091f] border-2 border-[#ff6b35] rounded-full sm:-translate-x-1/2 shadow-[0_0_15px_#ff6b35] z-10 top-6 sm:top-1/2 sm:-translate-y-1/2"></div>
                
                {/* Content */}
                <div className={`ml-[60px] sm:ml-0 w-full sm:w-1/2 flex ${idx % 2 === 0 ? 'sm:justify-start sm:pl-16' : 'sm:justify-end sm:pr-16'}`}>
                  <div className="bg-[#12091f]/80 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl w-full max-w-sm hover:border-[#ff6b35]/40 transition-colors group">
                    <div className="flex items-center gap-3 text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3">
                      <Calendar className="w-4 h-4" />
                      {city.date}
                    </div>
                    <h3 className="text-3xl font-black mb-2 text-white group-hover:text-[#ff9d4a] transition-colors">{city.city}</h3>
                    <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest mb-4">
                      <MapPin className="w-3 h-3" />
                      {city.venue}
                    </div>
                    <p className="text-white/70 font-light text-sm leading-relaxed">
                      {city.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
