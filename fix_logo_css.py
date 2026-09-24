import codecs

def fix_logo(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    old = '<img src="/logo.png" alt="Quantum University" className="h-10 sm:h-12 md:h-14 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] brightness-110" />'
    # mix-blend-multiply makes white pixels vanish into whatever is behind them
    # while keeping all colored pixels (purple, black, pink) perfectly sharp and untouched
    # We wrap in a white-to-transparent radial gradient div so the colored parts stay visible
    new = '''<div className="relative h-10 sm:h-12 md:h-14 flex items-center">
                  <img src="/logo.png" alt="Quantum University" className="h-full object-contain" style={{ mixBlendMode: "multiply" }} />
                </div>'''
    content = content.replace(old, new)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

fix_logo('src/pages/Home.jsx')
fix_logo('src/pages/InterSchool.jsx')
