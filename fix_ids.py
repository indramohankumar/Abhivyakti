import codecs

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<MegaEventCard events={events} />', '<section id=\"events\"><MegaEventCard events={events} /></section>')

content = content.replace(
    '        <section className=\"relative z-20 py-8 sm:py-12 overflow-hidden bg-[#12091f]\">',
    '        <section id=\"photos\" className=\"relative z-20 py-8 sm:py-12 overflow-hidden bg-[#12091f]\">'
)

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
