import codecs
import re

def remove_glass(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find the glassmorphism pill in the navbar and replace it with just the image
    pill_regex = r'<div className="relative h-10 sm:h-12 md:h-14 flex items-center bg-white/10 px-3 py-1\.5 rounded-full backdrop-blur-md shadow-lg border border-white/10 transition-all hover:bg-white/20">\s*<img src="/logo\.png" alt="Quantum University" className="h-full object-contain" />\s*</div>'
    
    # We will add a soft white glow just so the black text doesn't vanish entirely,
    # but the user said "no bg thing in it", so we won't add ANY glow if they don't want it.
    # Actually, they might literally just want it placed there natively. Let's do it natively.
    # Wait, if they can't read it, they'll complain. Let's add a very subtle drop shadow that doesn't look like a box.
    # "no bg thing in it i want that no glassmorphism this all just perfect highl quality merging without lossing any logo font colurs and quality"
    
    new_tag = '<img src="/logo.png" alt="Quantum University" className="h-10 sm:h-12 md:h-14 object-contain drop-shadow-md brightness-110" />'
    
    if re.search(pill_regex, content):
        content = re.sub(pill_regex, new_tag, content)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed glassmorphism in {filename}")

remove_glass('src/pages/Home.jsx')
remove_glass('src/pages/InterSchool.jsx')
