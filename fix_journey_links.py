import codecs

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

desktop_old = '''<a href="#journey" onClick={(e) => handleNavClick(e, 'journey')} className={px-4 py-2 text-sm font-medium rounded-lg transition-colors }>
                  Journey
                </a>'''
desktop_new = '''<Link to="/journey" className={px-4 py-2 text-sm font-medium rounded-lg transition-colors }>
                  Journey
                </Link>'''
content = content.replace(desktop_old, desktop_new)

mobile_old = '''<a href="#journey" onClick={(e) => handleNavClick(e, 'journey')} className={lock px-4 py-3 font-medium rounded-lg transition-colors }>
                    Festival Journey
                  </a>'''
mobile_new = '''<Link to="/journey" onClick={() => setMenuOpen(false)} className={lock px-4 py-3 font-medium rounded-lg transition-colors }>
                    Festival Journey
                  </Link>'''
content = content.replace(mobile_old, mobile_new)

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
