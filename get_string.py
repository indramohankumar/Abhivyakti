import codecs
with codecs.open('src/pages/InterSchool.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('Event Rules')
end = content.find('</AnimatePresence>')

print(repr(content[start:end+18]))
