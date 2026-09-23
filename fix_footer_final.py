import codecs
import re

def fix_footer(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the broken footer tag
    broken_regex = r'<footer id="contact" className=\{pt-16 sm:pt-24.*?\}\s*>'
    # The correct footer tag without backslashes
    correct = """<footer id="contact" className={`pt-16 sm:pt-24 pb-8 px-4 border-t ${dark ? 'bg-[#0a0505] border-white/10 text-white/80' : 'bg-gradient-to-b from-[#3d0014] to-[#1f000a] text-cream border-[#5c001e]'} relative z-10 shadow-[0_-10px_30px_rgba(61,0,20,0.3)]`}>"""
    
    content = re.sub(broken_regex, correct, content)
    
    # Also fix the one with backslashes
    bad_backslash_regex = r'<footer id="contact" className=\{`pt-16 sm:pt-24.*?\}\s*>'
    content = re.sub(bad_backslash_regex, correct, content)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

fix_footer('src/pages/Home.jsx')
fix_footer('src/pages/InterSchool.jsx')
