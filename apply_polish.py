import codecs
import re

def update_index_css(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '--animate-shimmer' not in content:
        target = '--animate-marquee-reverse: marquee-reverse 35s linear infinite;'
        insertion = '''  --animate-shimmer: shimmer 2.5s infinite;
  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
'''
        content = content.replace(target, target + '\n' + insertion)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated index.css with shimmer animation!")

def update_home(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Import useSpring
    content = content.replace(
        'import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from \'framer-motion\';',
        'import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView, useSpring } from \'framer-motion\';'
    )

    # Change scrollY hook to include scrollYProgress
    content = content.replace('const { scrollY } = useScroll();', 'const { scrollY, scrollYProgress } = useScroll();\n    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });')

    # Add Scroll Progress Bar just inside the main div
    main_div = "      <div className={min-h-screen font-sans overflow-x-hidden transition-colors duration-500 }>\n        <div"
    new_main_div = """      <div className={min-h-screen font-sans overflow-x-hidden transition-colors duration-500 }>
        {/* Scroll Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#9b1c31] z-[100] origin-left" style={{ scaleX }} />
        <div"""
    content = content.replace(main_div, new_main_div)
    
    # We might have failed the main_div replace if \n spacing was different, let's try a safer regex for main_div
    if 'Scroll Progress Bar' not in content:
        pattern = r'<div className=\{\min-h-screen font-sans overflow-x-hidden transition-colors duration-500 \$\{dark \?\s*\'bg-cultural-dark text-gray-200\' : \'bg-cultural text-gray-800\'\}\\}>\s*<div'
        replacement = r'<div className={min-h-screen font-sans overflow-x-hidden transition-colors duration-500 }>\n        <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ffb703] via-[#ff6b35] to-[#9b1c31] z-[100] origin-left" style={{ scaleX }} />\n        <div'
        content = re.sub(pattern, replacement, content)
        
    # Replace Mobile Menu AnimatePresence block
    # It's large, we can slice it
    start_menu = content.find('{menuOpen && (')
    end_menu = content.find('</AnimatePresence>', start_menu)
    if start_menu != -1 and end_menu != -1:
        prefix = content[:start_menu]
        suffix = content[end_menu:]
        
        new_menu = """{menuOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-2xl flex flex-col justify-center px-8"
              >
                <div className="absolute top-4 right-4 flex items-center justify-between w-[calc(100%-2rem)]">
                  <div className="flex items-center gap-3">
                     <div className="relative">
                       <img src="/quantum.png" alt="Quantum University" className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                     </div>
                     <span className="text-[14px] font-black tracking-widest text-[#ff6b35] drop-shadow-md">ABHIVYAKTI '26</span>
                  </div>
                  <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-8 text-center mt-8">
                  {[
                    { label: "Inter-School Events", path: "/inter-school", icon: <Sparkles className="w-5 h-5 mr-2 inline text-[#ffb703]" /> },
                    { label: "Festival Journey", path: "/journey" },
                    { label: "Inter-University", href: "#events", action: (e) => handleNavClick(e, 'events') },
                    { label: "Photos", href: "#photos", action: (e) => handleNavClick(e, 'photos') },
                    { label: "Contact Us", href: "#contact", action: (e) => handleNavClick(e, 'contact') }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (i * 0.1) }}
                    >
                      {item.path ? (
                        <Link to={item.path} onClick={() => setMenuOpen(false)} className="text-xl font-black text-white hover:text-[#ff6b35] tracking-widest uppercase">
                          {item.icon}{item.label}
                        </Link>
                      ) : (
                        <a href={item.href} onClick={item.action} className="text-xl font-black text-white hover:text-[#ff6b35] tracking-widest uppercase">
                          {item.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                  
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="mt-6">
                    <a href="#register" onClick={(e) => handleNavClick(e, 'register')} className="relative inline-flex items-center justify-center bg-gradient-to-r from-[#ffb703] to-[#ff5f3c] text-white px-8 py-4 rounded-full font-black text-sm shadow-[0_0_30px_rgba(255,107,53,0.5)] uppercase tracking-[0.2em] overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></span>
                      Register Now
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          """
        content = prefix + new_menu + suffix
        
    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated Home.jsx!")

update_index_css('src/index.css')
update_home('src/pages/Home.jsx')
