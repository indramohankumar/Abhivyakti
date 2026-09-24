import codecs
import re

def update_navbar_logo(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The current logo tag in the navbar
    old_logo_regex = r'<img src="/logo\.png" alt="Quantum University" className="h-10 sm:h-12 md:h-14 object-contain drop-shadow-\[0_0_15px_rgba\(255,255,255,0\.5\)\] brightness-110" />'
    
    # Let's replace it with a beautiful frosted glass pill
    new_logo = '''<div className="relative h-10 sm:h-12 md:h-14 flex items-center bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/10 transition-all hover:bg-white/20">
                  <img src="/logo.png" alt="Quantum University" className="h-full object-contain" />
                </div>'''
    
    # If the old regex matches, replace it
    if re.search(old_logo_regex, content):
        content = re.sub(old_logo_regex, new_logo, content)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated Navbar logo in {filename}")
    else:
        print(f"Regex didn't match in {filename}")

update_navbar_logo('src/pages/Home.jsx')
update_navbar_logo('src/pages/InterSchool.jsx')
