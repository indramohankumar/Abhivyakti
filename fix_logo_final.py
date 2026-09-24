import codecs
import re

def fix_logo(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The current logo tag is inside a div
    old_div_regex = r'<div className="relative h-10 sm:h-12 md:h-14 flex items-center">\s*<img src="/logo\.png" alt="Quantum University" className="h-full object-contain" style=\{\{ mixBlendMode: "multiply" \}\} />\s*</div>'
    
    # New beautiful tag
    new_tag = '<img src="/logo.png" alt="Quantum University" className="h-10 sm:h-12 md:h-14 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] brightness-110" />'
    
    content = re.sub(old_div_regex, new_tag, content)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

fix_logo('src/pages/Home.jsx')
fix_logo('src/pages/InterSchool.jsx')
