import codecs
import re

with codecs.open('src/components/ui/CrewCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'CREW.*?ABHIVYAKTI.*?26', 'CREW \u2022 ABHIVYAKTI \\\'26', content)

with codecs.open('src/components/ui/CrewCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
