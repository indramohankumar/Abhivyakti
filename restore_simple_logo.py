import codecs
import re

def restore_logo(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the radial gradient mess
    radial_mess_regex = r'<div className="relative flex items-center justify-center">\s*<div className="absolute inset-0 bg-\[radial-gradient\(ellipse_at_center,rgba\(255,255,255,0\.9\)_10%,rgba\(255,255,255,0\)_70%\)\] pointer-events-none scale-150"></div>\s*<img src="/logo\.png" alt="Quantum University" className="h-6 sm:h-8 md:h-9 object-contain mix-blend-multiply relative z-10" />\s*</div>'
    
    # Simple clean logo
    clean_logo = '<img src="/logo.png" alt="Quantum University" className="h-6 sm:h-8 md:h-9 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] brightness-110" />'
    
    content = re.sub(radial_mess_regex, clean_logo, content)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

restore_logo('src/pages/Home.jsx')
restore_logo('src/pages/InterSchool.jsx')
