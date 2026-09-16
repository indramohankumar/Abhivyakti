import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Calendar, Users, Mic, ArrowLeft, Brain } from 'lucide-react';
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

export default function InterSchool() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-500 bg-cultural-dark text-gray-200">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-75">
        <ConstellationField mode="dark" speed={1} opacity={0.85} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 pt-6 px-4 md:px-8 max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold tracking-wide uppercase text-sm">Back to Home</span>
        </Link>
        <div className="flex flex-col items-end leading-none">
          <span className="text-gold-gradient text-lg md:text-xl font-extrabold tracking-tight pt-1 pb-1">अभिव्यक्ति</span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-gray-500">Inter-School</span>
        </div>
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
              Schools Edition
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-gold-gradient drop-shadow-[0_10px_20px_rgba(201,168,76,0.3)] py-3 leading-normal md:leading-normal">
              काव्य, वाकपटुता एवं प्रश्नोत्तरी
            </motion.h1>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              Poetry, Extempore & Quizzes
            </motion.h2>
            <GoldLine />
            <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed">
              A platform for young brilliant minds from diverse schools to articulate their thoughts, 
              weave magic with words, and test their knowledge in the grand arena of Abhivyakti.
            </motion.p>
          </motion.div>

          {/* Segment Features */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Poetry Segment */}
            <div className="relative p-8 rounded-3xl border border-dark-border bg-dark-card/60 backdrop-blur-md overflow-hidden group hover:border-gold/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Sparkles className="w-10 h-10 text-gold mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">काव्य-पाठ (Poetry Recitation)</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Let your verses flow like a timeless river. Participants can present self-composed or 
                famous literary works in Hindi or English, celebrating the beauty of rhythmic expression.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Time Limit: 3-5 Minutes</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Theme: Open / Patriotic / Nature</li>
              </ul>
            </div>

            {/* Extempore Segment */}
            <div className="relative p-8 rounded-3xl border border-dark-border bg-dark-card/60 backdrop-blur-md overflow-hidden group hover:border-quantum-pink/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-quantum-pink to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Mic className="w-10 h-10 text-quantum-pink mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">आशुभाषण (Extempore)</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Think on your feet and speak with conviction. A test of presence of mind, eloquence, 
                and knowledge, where students speak on topics given on the spot.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-quantum-pink"></div> Prep Time: 1 Minute</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-quantum-pink"></div> Speaking Time: 2 Minutes</li>
              </ul>
            </div>

            {/* Quiz Segment */}
            <div className="relative p-8 rounded-3xl border border-dark-border bg-dark-card/60 backdrop-blur-md overflow-hidden group hover:border-blue-400/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Brain className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">प्रश्नोत्तरी (Quiz)</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Challenge your intellect and quick thinking. A thrilling battle of wits covering Indian Heritage, General Knowledge, and Literature.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Team Size: 2 Members</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Format: Prelims & Finals</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
