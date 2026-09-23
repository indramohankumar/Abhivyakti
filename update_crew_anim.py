import codecs

with codecs.open('src/components/ui/CrewCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_anim = '''      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}'''

new_anim = '''      whileHover={{ y: -12, scale: 1.02, rotate: index % 2 === 0 ? 2 : -2 }}
      whileTap={{ y: -15, scale: 0.98, rotate: index % 2 === 0 ? 4 : -4 }}'''

content = content.replace(old_anim, new_anim)

with codecs.open('src/components/ui/CrewCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
