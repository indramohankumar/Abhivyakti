import codecs

def restore_logo(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the white logo tag
    old_tag = '<img src="/logo.png" alt="Quantum University" className="h-6 sm:h-8 md:h-9 object-contain mix-blend-screen" style={{ filter: "grayscale(1) invert(1) brightness(2)" }} />'
    
    # We create a container with a white radial glow to preserve the original colors in the center,
    # and use mix-blend-multiply on the image so its white edges disappear into the dark navbar.
    new_tag = '''<div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_10%,rgba(255,255,255,0)_70%)] pointer-events-none scale-150"></div>
                  <img src="/logo.png" alt="Quantum University" className="h-6 sm:h-8 md:h-9 object-contain mix-blend-multiply relative z-10" />
                </div>'''
    
    content = content.replace(old_tag, new_tag)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

restore_logo('src/pages/Home.jsx')
restore_logo('src/pages/InterSchool.jsx')
