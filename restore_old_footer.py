import codecs
import re

def restore_footer(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The current footer starts at <footer id="contact"
    parts = content.split('<footer id="contact"')
    if len(parts) != 2:
        print(f"Could not find footer in {filename}")
        return

    prefix = parts[0]
    suffix = parts[1].split('</footer>')[1]

    # The original footer with the map, but without the "Abhivyakti" text block and without the white bg on logo
    old_footer = '''<footer id="contact" className={pt-12 sm:pt-20 pb-6 px-4 border-t  relative z-10 shadow-[0_-10px_30px_rgba(61,0,20,0.3)]}>
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-10 border-b border-white/10">
  
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 inline-flex">
                  <div className="relative h-10 sm:h-12 md:h-14 flex items-center bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                    <img src="/logo.png" alt="Quantum University" className="h-full object-contain" />
                  </div>
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
                      <Link to={/} className="text-gray-400 text-sm hover:text-gold hover:pl-2 transition-all duration-300 flex items-center gap-2">
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
        </footer>'''

    content = prefix + old_footer + suffix
    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Restored footer in {filename}")

restore_footer('src/pages/Home.jsx')
restore_footer('src/pages/InterSchool.jsx')
