# -*- coding: utf-8 -*-
import codecs
import re

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Desktop Navbar Journey link
desktop_journey_old = r'<a href="#journey" onClick=\{\(e\) => handleNavClick\(e, \'journey\'\)\} className=\{(px-4 py-2 text-sm font-medium.*?)\}>\s*Journey\s*</a>'
desktop_journey_new = r'<Link to="/journey" className={\1}>Journey</Link>'
content = re.sub(desktop_journey_old, desktop_journey_new, content)

# Fix Mobile Navbar Journey link
mobile_journey_old = r'<a href="#journey" onClick=\{\(e\) => handleNavClick\(e, \'journey\'\)\} className=\{(block px-4 py-3 font-medium.*?)\}>\s*Festival Journey\s*</a>'
mobile_journey_new = r'<Link to="/journey" onClick={() => setMenuOpen(false)} className={\1}>Festival Journey</Link>'
content = re.sub(mobile_journey_old, mobile_journey_new, content)

# Update Footer Typography
footer_old = r'<footer id="contact" className={pt-12 sm:pt-20 pb-6 px-4 border-t.*?</footer\s*>'

# Create an awesome new footer
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
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#ff6b35] hover:text-white hover:border-[#ff6b35] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#ff6b35] hover:text-white hover:border-[#ff6b35] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]">
                    <Linkedin className="w-4 h-4" />
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

content = re.sub(footer_old, footer_new, content, flags=re.DOTALL)

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
