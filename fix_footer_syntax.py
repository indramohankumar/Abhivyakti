import codecs
import re

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

bad_footer_regex = r'<footer id="contact" className=\{pt-16 sm:pt-24 pb-8 px-4 border-t  relative z-10 shadow-\[0_-10px_30px_rgba\(61,0,20,0\.3\)]\}>'
good_footer = r'<footer id="contact" className={`pt-16 sm:pt-24 pb-8 px-4 border-t ${dark ? \'bg-[#0a0505] border-white/10 text-white/80\' : \'bg-gradient-to-b from-[#3d0014] to-[#1f000a] text-cream border-[#5c001e]\'} relative z-10 shadow-[0_-10px_30px_rgba(61,0,20,0.3)]`}>'

content = re.sub(bad_footer_regex, good_footer, content)

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
