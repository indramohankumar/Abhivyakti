import codecs
import re

def update_logo_and_footer(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Navbar logo to remove white background and make it pure white cutout
    old_logo_regex = r'<img src="/logo\.png" alt="Quantum University" className=\{h-.*?\}\} />'
    new_logo = '<img src="/logo.png" alt="Quantum University" className="h-6 sm:h-8 md:h-9 object-contain mix-blend-screen" style={{ filter: "grayscale(1) invert(1) brightness(2)" }} />'
    content = re.sub(old_logo_regex, new_logo, content, flags=re.DOTALL)

    # Also replace any simple logo (like in InterSchool footer if it wasn't replaced)
    content = content.replace('<img src="/logo.png" alt="Quantum University" className="h-8 object-contain" />', new_logo)

    # If it's InterSchool.jsx, it has the old footer! Replace it with the new footer!
    if 'InterSchool.jsx' in filename:
        parts = content.split('<footer id="contact"')
        if len(parts) == 2:
            prefix = parts[0]
            suffix = parts[1].split('</footer>')[1]
            
            footer_new = '''<footer id="contact" className={pt-16 sm:pt-24 pb-8 px-4 border-t  relative z-10 shadow-[0_-10px_30px_rgba(61,0,20,0.3)]}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#ff6b35]/50 to-transparent"></div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-12 border-b border-white/10">
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#9b1c31] flex items-center justify-center p-[2px] shadow-[0_0_15px_rgba(255,107,53,0.5)]">
                    <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                      <span className="font-serif font-black text-white text-lg">A</span>
                    </div>
                  </div>
                  <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow-md">Abhivyakti<span className="text-[#ff6b35]">.</span></span>
                </div>
                <p className="text-sm font-light leading-relaxed text-white/60 mb-6 font-sans">
                  The grand 3-day cultural and academic festival uniting the brightest minds across India. Ignite your passion.
                </p>
              </div>
              <div>
                <h4 className="font-sans font-black text-lg text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff6b35]" /> Quick Links
                </h4>
                <ul className="space-y-4">
                  <li><Link to="/journey" className="text-white/60 text-sm font-medium hover:text-[#ff6b35] hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/50"></span> Festival Journey</Link></li>
                  <li><Link to="/" className="text-white/60 text-sm font-medium hover:text-[#ff6b35] hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/50"></span> Home</Link></li>
                </ul>
              </div>
              <div className="lg:col-span-2">
                <h4 className="font-sans font-black text-lg text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ff6b35]" /> Reach Us
                </h4>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:border-[#ff6b35]/50 transition-colors">
                    <h5 className="font-bold text-white mb-2 font-serif text-lg">Quantum University</h5>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Mandawar (22 Km Milestone), Roorkee - Dehradun Highway (NH 73), Roorkee #247167
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-xs font-medium font-sans text-center md:text-left">
                &copy; 2026 Abhivyakti, Quantum University. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>'''
            content = prefix + footer_new + suffix

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_logo_and_footer('src/pages/Home.jsx')
update_logo_and_footer('src/pages/InterSchool.jsx')
