import codecs
with codecs.open('src/components/ui/antaragni-events.jsx', 'r', encoding='utf-8') as f:
    content = f.read()
start = content.find('General Rules Button')
end = content.find('View Official Rulebook')
print(repr(content[start:end+50]))
