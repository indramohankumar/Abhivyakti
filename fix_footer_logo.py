import codecs
import re

def remove_glass_footer(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The glass pill in the footer
    footer_pill_regex = r'<div className="relative h-10 sm:h-12 md:h-14 flex items-center bg-white/10 p-2 rounded-xl backdrop-blur-sm">\s*<img src="/logo\.png" alt="Quantum University" className="h-full object-contain" />\s*</div>'
    
    # Just the logo, no pill, just a tiny bit larger to match footer size
    new_logo = '<img src="/logo.png" alt="Quantum University" className="h-10 sm:h-12 md:h-14 object-contain" />'
    
    if re.search(footer_pill_regex, content):
        content = re.sub(footer_pill_regex, new_logo, content)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed footer glassmorphism in {filename}")

remove_glass_footer('src/pages/Home.jsx')
remove_glass_footer('src/pages/InterSchool.jsx')
