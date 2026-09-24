import codecs

def add_animations(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add to @theme block
    theme_insertion = '''
  --animate-marquee: marquee 25s linear infinite;
  --animate-marquee-reverse: marquee-reverse 30s linear infinite;
  --animate-marquee-slow: marquee 40s linear infinite;
  --animate-marquee-reverse-slow: marquee-reverse 50s linear infinite;
'''
    content = content.replace('  --font-hindi: \\'Rozha One\\', \\'Yatra One\\', serif;', '  --font-hindi: \\'Rozha One\\', \\'Yatra One\\', serif;' + theme_insertion)

    # Replace the broken @keyframes at the bottom
    old_keyframes = '''  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.333333%); }
  }'''
    
    new_keyframes = '''
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
'''
    if old_keyframes in content:
        content = content.replace(old_keyframes, new_keyframes)
    else:
        # Just append it to the end
        content += new_keyframes

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added animations to index.css")

add_animations('src/index.css')
