import codecs

with codecs.open('src/pages/InterSchool.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

nav_idx = content.find('<motion.nav')
hero_idx = content.find('<section', nav_idx + 100)

print("Nav section starts around:", nav_idx)
print("Hero section starts around:", hero_idx)

# Print a snippet of the hero section
if hero_idx != -1:
    print(content[hero_idx:hero_idx+1000])

