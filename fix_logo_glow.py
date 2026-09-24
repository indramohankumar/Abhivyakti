import codecs
import re

def add_glow(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the current logo tags
    old_logo_regex = r'<img src="/logo\.png" alt="Quantum University" className="h-12 sm:h-14 md:h-16 object-contain drop-shadow-sm" />'
    
    # We add a subtle white glow. rgba(255,255,255,0.3) is elegant and "no much"
    new_logo = '<img src="/logo.png" alt="Quantum University" className="h-12 sm:h-14 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />'
    
    content = re.sub(old_logo_regex, new_logo, content)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Added white glow to {filename}")

add_glow('src/pages/Home.jsx')
add_glow('src/pages/InterSchool.jsx')
