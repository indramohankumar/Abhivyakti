import codecs

def update_home(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace solid background with transparent for the 3 sections
    content = content.replace('className="relative z-20 pt-16 pb-12 overflow-hidden bg-[#12091f]"', 'className="relative z-20 pt-16 pb-12 overflow-hidden bg-transparent"')
    content = content.replace('className="relative z-20 py-8 sm:py-12 overflow-hidden bg-[#12091f]"', 'className="relative z-20 py-8 sm:py-12 overflow-hidden bg-transparent"')
    content = content.replace('className="py-20 md:py-32 px-4 relative overflow-hidden bg-[#12091f] flex flex-col items-center justify-center"', 'className="py-20 md:py-32 px-4 relative overflow-hidden bg-transparent flex flex-col items-center justify-center"')

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated Home backgrounds!")

def update_photos(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove mix-blend-luminosity to make photos full color, which matches the colorful neon vibe better
    old_img_class = 'className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-luminosity hover:mix-blend-normal"'
    new_img_class = 'className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"'
    
    # Also remove the hardcoded #12091f in gradients inside the photo cards, make them black/transparent for better blending
    content = content.replace('bg-[radial-gradient(circle_at_center,transparent_40%,#12091f_120%)]', 'bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_120%)]')
    content = content.replace('from-[#12091f]', 'from-black/80')
    
    content = content.replace(old_img_class, new_img_class)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated PhotoMarquee blending!")

update_home('src/pages/Home.jsx')
update_photos('src/components/ui/PhotoMarquee.jsx')
