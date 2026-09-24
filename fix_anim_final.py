import codecs

def fix_animations(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    theme_insertion = """
  --animate-marquee: marquee 30s linear infinite;
  --animate-marquee-reverse: marquee-reverse 35s linear infinite;
"""
    if '--animate-marquee' not in content:
        content = content.replace("--font-hindi: 'Rozha One', 'Yatra One', serif;", "--font-hindi: 'Rozha One', 'Yatra One', serif;" + theme_insertion)

    old_keyframes = """  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.333333%); }
  }"""
    
    new_keyframes = """
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
"""
    if old_keyframes in content:
        content = content.replace(old_keyframes, new_keyframes)
    elif '@keyframes marquee-reverse' not in content:
        content += new_keyframes

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed animations")

fix_animations('src/index.css')
