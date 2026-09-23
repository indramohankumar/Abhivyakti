import codecs

def update_home():
    with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix typewriter text and styling
    old_h1 = '''<h1 className="font-hindi text-[4rem] xs:text-[5rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11.5rem] font-extrabold leading-[1.1] tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] drop-shadow-[0_0_50px_rgba(255,107,53,0.4)] min-h-[1.2em]">
                <TypeWriter
                  text="??????????"'''
    
    new_h1 = '''<h1 className="font-hindi text-[3.5rem] xs:text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] xl:text-[10rem] font-extrabold leading-[1.1] tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] drop-shadow-[0_0_50px_rgba(255,107,53,0.4)] min-h-[1.2em] whitespace-nowrap">
                <TypeWriter
                  text="अभिव्यक्ति"'''
                  
    content = content.replace(old_h1, new_h1)
    
    # Just in case the formatting is slightly different, let's also do a targeted regex replace
    import re
    content = re.sub(
        r'<h1 className="font-hindi[^>]+>\s*<TypeWriter\s*text="\?+"\s*',
        r'<h1 className="font-hindi text-[3.5rem] xs:text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] xl:text-[10rem] font-extrabold leading-[1.1] tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] drop-shadow-[0_0_50px_rgba(255,107,53,0.4)] min-h-[1.2em] whitespace-nowrap">\n                <TypeWriter\n                  text="अभिव्यक्ति"\n                  ',
        content
    )
    
    # Let's also fix the header brand in the Navbar which also got corrupted to "??????????"
    content = content.replace(
        '<span className="font-hindi text-maroon text-base sm:text-lg md:text-xl font-black tracking-tight pt-1 pb-1">??????????</span>',
        '<span className="font-hindi text-[#ff5f3c] text-base sm:text-lg md:text-xl font-black tracking-tight pt-1 pb-1">अभिव्यक्ति</span>'
    )
    # The footer brand also got corrupted
    content = content.replace(
        '<span className="font-hindi text-gold-gradient font-black text-2xl tracking-wide pt-1 pb-1 block">??????????</span>',
        '<span className="font-hindi text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff5f3c] font-black text-2xl tracking-wide pt-1 pb-1 block">अभिव्यक्ति</span>'
    )

    # Footer Logo Fix
    old_footer_logo = '''<div className="flex items-center gap-4 bg-white p-3 rounded-xl inline-flex shadow-lg shadow-black/20">
                  <img src="/logo.png" alt="Quantum University" className="h-8 object-contain" />'''
    new_footer_logo = '''<div className="flex items-center gap-2.5 transition-all duration-300 bg-white p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-[0_0_15px_rgba(255,107,53,0.3)] border border-[#ff6b35]/20 inline-flex">
                  <img src="/logo.png" alt="Quantum University" className="h-6 sm:h-7 object-contain" />'''
    content = content.replace(old_footer_logo, new_footer_logo)

    with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

def update_interschool():
    with codecs.open('src/pages/InterSchool.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix footer logo in InterSchool
    old_footer_logo = '''<div className="flex items-center gap-4 bg-white p-3 rounded-xl inline-flex shadow-lg shadow-black/20">
                  <img src="/logo.png" alt="Quantum University" className="h-8 object-contain" />'''
    new_footer_logo = '''<div className="flex items-center gap-2.5 transition-all duration-300 bg-white p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-[0_0_15px_rgba(255,107,53,0.3)] border border-[#ff6b35]/20 inline-flex">
                  <img src="/logo.png" alt="Quantum University" className="h-6 sm:h-7 object-contain" />'''
    content = content.replace(old_footer_logo, new_footer_logo)
    
    # Fix the footer brand corrupted text
    content = content.replace(
        '<span className="font-hindi text-gold-gradient font-black text-2xl tracking-wide pt-1 pb-1 block">??????????</span>',
        '<span className="font-hindi text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff5f3c] font-black text-2xl tracking-wide pt-1 pb-1 block">अभिव्यक्ति</span>'
    )
    
    with codecs.open('src/pages/InterSchool.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

update_home()
update_interschool()
print("Done")
