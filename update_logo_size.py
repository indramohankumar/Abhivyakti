import codecs

def update_logo(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the current logo tag
    old_tag = '<img src="/logo.png" alt="Quantum University" className="h-6 sm:h-8 md:h-9 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] brightness-110" />'
    new_tag = '<img src="/logo.png" alt="Quantum University" className="h-10 sm:h-12 md:h-14 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] brightness-110" />'
    
    content = content.replace(old_tag, new_tag)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_logo('src/pages/Home.jsx')
update_logo('src/pages/InterSchool.jsx')
