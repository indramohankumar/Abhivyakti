import codecs

file_path = 'src/components/ui/MegaEventCard.jsx'
with codecs.open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("media_1790088249718.jpg", "media_1790131158983.jpg")

with codecs.open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
