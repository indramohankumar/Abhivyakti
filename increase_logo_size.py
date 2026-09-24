import codecs
import re

def increase_size(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Navbar logo
    old_nav_logo = r'<img src="/logo\.png" alt="Quantum University" className="h-10 sm:h-12 md:h-14 object-contain drop-shadow-md brightness-110" />'
    new_nav_logo = '<img src="/logo.png" alt="Quantum University" className="h-12 sm:h-14 md:h-16 object-contain drop-shadow-sm" />'
    
    # Footer logo
    old_footer_logo = r'<img src="/logo\.png" alt="Quantum University" className="h-10 sm:h-12 md:h-14 object-contain" />'
    new_footer_logo = '<img src="/logo.png" alt="Quantum University" className="h-12 sm:h-14 md:h-16 object-contain drop-shadow-sm" />'
    
    content = re.sub(old_nav_logo, new_nav_logo, content)
    content = re.sub(old_footer_logo, new_footer_logo, content)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

increase_size('src/pages/Home.jsx')
increase_size('src/pages/InterSchool.jsx')
