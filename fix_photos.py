import codecs
import re

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'{\/\* .*NEW PHOTOS MARQUEE.* \*\/}\s*<section className=\"relative z-20 py-8 sm:py-12 overflow-hidden bg-\[#12091f\]\">',
                 '{/* ?? NEW PHOTOS MARQUEE ?? */}\n      <section id=\"photos\" className=\"relative z-20 py-8 sm:py-12 overflow-hidden bg-[#12091f]\">', content)

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
