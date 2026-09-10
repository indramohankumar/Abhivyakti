import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ArrowRight, ExternalLink, Music, Users, VenetianMask, Shirt, Palette, Utensils } from 'lucide-react';

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
    shadow: "shadow-saffron/20",
    emoji: "🎵"
  },
  {
    name: "Dance",
    events: "Classical, Semi-Classical, Indian Folk",
    icon: Users,
    gradient: "from-quantum-pink to-rose-400",
    shadow: "shadow-pink-500/20",
    emoji: "💃"
  },
  {
    name: "Theatre",
    events: "Indian Mythology-Based Drama",
    icon: VenetianMask,
    gradient: "from-maroon to-red-700",
    shadow: "shadow-red-800/20",
    emoji: "🎭"
  },
  {
    name: "Fashion",
    events: "Fashion Show – Indian Ethnic Wear",
    icon: Shirt,
    gradient: "from-quantum-purple to-fuchsia-500",
    shadow: "shadow-purple-500/20",
    emoji: "👗"
  },
  {
    name: "Fine Arts",
    events: "Rangoli & Visual Arts",
    icon: Palette,
    gradient: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20",
    emoji: "🎨"
  },
  {
    name: "Indian Cuisine",
    events: "Inter-University Culinary Competition",
    icon: Utensils,
    gradient: "from-gold to-amber-500",
    shadow: "shadow-yellow-500/20",
    emoji: "🍛"
  }
];

/* Decorative mandala SVG pattern */
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

/* Decorative paisley-like border */
const OrnamentBorder = () => (
  <div className="flex items-center justify-center gap-2 my-2">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
    <span className="text-gold text-lg">✦</span>
    <span className="text-saffron text-sm">❈</span>
    <span className="text-gold text-lg">✦</span>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-cultural font-sans text-gray-800 selection:bg-quantum-pink selection:text-white overflow-x-hidden">

      {/* ─── Navbar ─── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed w-full z-50 bg-cream/90 backdrop-blur-xl border-b border-gold/20 shadow-[0_2px_20px_rgba(212,160,23,0.08)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo group — seamless merge */}
            <a href="#" className="flex items-center gap-3 group">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.1 }}
                src="/logo.png"
                alt="Quantum University"
                className="h-10 md:h-11 object-contain"
              />
              <span className="text-[10px] md:text-xs font-medium text-gray-400 tracking-widest uppercase hidden sm:block">presents</span>
              <motion.span
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.1 }}
                className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple via-quantum-pink to-saffron tracking-tight"
              >
                Abhivyakti
              </motion.span>
            </a>

            {/* Nav links */}
            <div className="hidden md:flex items-center space-x-1">
              {['About', 'Events', 'Kavyanjali'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className="px-4 py-2 text-gray-600 font-medium rounded-full hover:bg-saffron/10 hover:text-maroon transition-colors duration-150"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Register CTA */}
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,153,51,0.35)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1, ease: "linear" }}
              href="#register"
              className="bg-gradient-to-r from-saffron via-quantum-pink to-quantum-purple text-white px-5 py-2.5 rounded-full font-semibold shadow-md flex items-center gap-2 text-sm"
            >
              Register
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* ─── Hero Section ─── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 min-h-screen flex items-center relative overflow-hidden">
        {/* Background mandalas */}
        <MandalaDecor className="absolute -top-20 -right-20 w-[500px] h-[500px] text-saffron/30 animate-[spin_60s_linear_infinite]" />
        <MandalaDecor className="absolute -bottom-32 -left-32 w-[600px] h-[600px] text-quantum-purple/20 animate-[spin_80s_linear_infinite_reverse]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-gold/30 text-maroon font-semibold text-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-saffron" />
              <span>Annual Literary &amp; Cultural Festival 2026</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold leading-[1.1]">
              <span className="text-maroon">Celebrating</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-quantum-pink to-quantum-purple text-shadow-warm">
                भारतीय संस्कृति
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-bold text-gray-700">through Abhivyakti</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              A vibrant confluence of <span className="font-semibold text-maroon">literary excellence</span>,{' '}
              <span className="font-semibold text-saffron">cultural richness</span>, and{' '}
              <span className="font-semibold text-quantum-purple">intellectual engagement</span> at Quantum University, Roorkee.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gold/20">
                <div className="bg-saffron/15 p-3 rounded-xl text-saffron">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">October 2026</p>
                  <p className="text-sm text-gray-500">Five days of celebration</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gold/20">
                <div className="bg-maroon/10 p-3 rounded-xl text-maroon">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Quantum University</p>
                  <p className="text-sm text-gray-500">Roorkee, Uttarakhand</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-saffron/20 via-quantum-pink/10 to-quantum-purple/20 blur-3xl rounded-full scale-110"></div>
            <div className="relative bg-gradient-to-br from-cream/80 via-white/60 to-cream/80 backdrop-blur-xl p-8 rounded-[3rem] border border-gold/20 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col justify-center">
              {/* Decorative blobs */}
              <div className="absolute top-6 left-6 w-24 h-24 bg-saffron/25 rounded-full blur-2xl"></div>
              <div className="absolute bottom-6 right-6 w-32 h-32 bg-quantum-purple/20 rounded-full blur-2xl"></div>
              <div className="absolute top-4 right-4 text-6xl opacity-20 select-none">🪔</div>
              <div className="absolute bottom-4 left-4 text-5xl opacity-15 select-none">🏵️</div>

              <div className="z-10 text-center space-y-4">
                <p className="text-5xl">🎭</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-maroon">Grand Culmination</h2>
                <OrnamentBorder />
                <p className="text-quantum-purple font-semibold text-lg">with 'Kavyanjali' — काव्यांजलि</p>
                <p className="text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
                  The spectacular Kavi Sammelan — a mesmerizing poetry recital attracting eminent literary personalities from across India.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Decorative divider ─── */}
      <div className="max-w-4xl mx-auto px-4">
        <OrnamentBorder />
      </div>

      {/* ─── Events Section ─── */}
      <section id="events" className="py-20 px-4 relative z-10">
        <MandalaDecor className="absolute top-0 right-0 w-72 h-72 text-gold/15 -translate-y-1/2 translate-x-1/4" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-saffron font-semibold tracking-widest uppercase text-sm mb-3"
            >
              ✦ प्रतियोगिताएं ✦
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-maroon mb-4"
            >
              Competitions & Events
            </motion.h2>
            <OrnamentBorder />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-4">
              Showcase your talent across six grand cultural arenas celebrating the soul of Indian tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.15 } }}
                className={`bg-white/70 backdrop-blur-md rounded-3xl p-7 border border-gold/15 shadow-lg ${cat.shadow} cursor-pointer group`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center shadow-md`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-150">{cat.emoji}</span>
                </div>
                <h3 className="text-2xl font-bold text-maroon mb-2 group-hover:text-quantum-purple transition-colors duration-150">{cat.name}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{cat.events}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Decorative divider ─── */}
      <div className="max-w-4xl mx-auto px-4">
        <OrnamentBorder />
      </div>

      {/* ─── Registration Section ─── */}
      <section id="register" className="py-24 px-4 relative overflow-hidden">
        <MandalaDecor className="absolute bottom-0 left-0 w-80 h-80 text-quantum-purple/10 translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-cream via-white to-cream p-10 md:p-16 rounded-[3rem] shadow-xl border border-gold/20 relative"
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-saffron/30 to-quantum-pink/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-gradient-to-br from-quantum-purple/20 to-gold/15 rounded-full blur-3xl"></div>

            <p className="text-5xl mb-4">🪔</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-maroon">Be Part of the Celebration</h2>
            <OrnamentBorder />
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto mt-4">
              Ready to showcase your talent? Register now through our official Google Form and join thousands of students from across India at Abhivyakti 2026.
            </p>

            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(255,153,51,0.35)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
              href="https://forms.gle/your-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-saffron via-quantum-pink to-quantum-purple text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-saffron/25"
            >
              Fill Registration Form
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-gradient-to-br from-maroon via-gray-900 to-gray-900 text-white py-14 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Quantum University" className="h-10 brightness-0 invert opacity-70" />
              <div className="h-6 w-px bg-white/20"></div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-saffron via-pink-400 to-purple-400">
                Abhivyakti '26
              </span>
            </div>
            <p className="text-gray-400 text-sm text-center">
              © 2026 Quantum University, Roorkee. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-saffron transition-colors duration-150">Privacy Policy</a>
              <a href="#" className="hover:text-saffron transition-colors duration-150">Terms of Event</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-gray-500 text-xs">
            <span>Celebrating Indian culture, literature, and artistic expression 🇮🇳</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
