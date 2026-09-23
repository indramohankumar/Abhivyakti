import codecs

def fix_logo(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the <img src="/logo.png" tag
    start_idx = content.find('<img src="/logo.png"')
    if start_idx != -1:
        end_idx = content.find('/>', start_idx)
        if end_idx != -1:
            old_tag = content[start_idx:end_idx+2]
            new_tag = '<img src="/logo.png" alt="Quantum University" className="h-6 sm:h-8 md:h-9 object-contain mix-blend-screen" style={{ filter: "grayscale(1) invert(1) brightness(2)" }} />'
            content = content.replace(old_tag, new_tag)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

fix_logo('src/pages/Home.jsx')
fix_logo('src/pages/InterSchool.jsx')
