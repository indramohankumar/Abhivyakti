# -*- coding: utf-8 -*-
import codecs

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Split by <footer id="contact" ...
parts = content.split('<footer id="contact"')
if len(parts) == 2:
    prefix = parts[0]
    # Find the end of the footer
    suffix = parts[1].split('</footer>')[1]
    
    footer_new = '''<footer id="contact" className={pt-16 sm:pt-24 pb-8 px-4 border-t  relative z-10 shadow-[0_-10px_30px_rgba(61,0,20,0.3)]}>
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#ff6b35]/50 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-12 border-b border-white/10">
              
              {/* Brand Column */}
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
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#ff6b35] hover:text-white hover:border-[#ff6b35] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#ff6b35] hover:text-white hover:border-[#ff6b35] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#ff6b35] hover:text-white hover:border-[#ff6b35] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-sans font-black text-lg text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff6b35]" /> Quick Links
                </h4>
                <ul className="space-y-4">
                  <li><Link to="/journey" className="text-white/60 text-sm font-medium hover:text-[#ff6b35] hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/50"></span> Festival Journey</Link></li>
                  <li><a href="#events" className="text-white/60 text-sm font-medium hover:text-[#ff6b35] hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/50"></span> Events</a></li>
                  <li><a href="#photos" className="text-white/60 text-sm font-medium hover:text-[#ff6b35] hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/50"></span> Photo Gallery</a></li>
                  <li><a href="#register" className="text-white/60 text-sm font-medium hover:text-[#ff6b35] hover:pl-2 transition-all duration-300 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/50"></span> Register Now</a></li>
                </ul>
              </div>

              {/* Contact Details */}
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
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:border-[#ff6b35]/50 transition-colors space-y-3">
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <Mail className="w-4 h-4 text-[#ff6b35]" />
                      <a href="mailto:info@quantumuniversity.edu.in" className="hover:text-white transition-colors">info@quantumuniversity.edu.in</a>
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <Phone className="w-4 h-4 text-[#ff6b35]" />
                      <a href="tel:+917308080803" className="hover:text-white transition-colors">+91 73080 80803</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Bottom bar */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-xs font-medium font-sans text-center md:text-left">
                &copy; {new Date().getFullYear()} Abhivyakti, Quantum University. All Rights Reserved.
              </p>
              <div className="flex items-center gap-6 text-xs font-medium font-sans">
                <a href="#" className="text-white/40 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>'''
    
    new_content = prefix + footer_new + suffix
    
    with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced footer!")
else:
    print("Could not find footer in Home.jsx")
