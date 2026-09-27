import codecs
import re

def fix_menu(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix logo path
    content = content.replace('<img src="/quantum.png"', '<img src="/logo.png"')
    
    # Fix blur performance
    content = content.replace('bg-black/80 backdrop-blur-2xl', 'bg-[#0a0505] backdrop-blur-md')

    # Add scroll lock effect for mobile menu
    effect_str = '''  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);'''
    
    if 'document.body.style.overflow = \'hidden\'' not in content:
        content = content.replace('const [menuOpen, setMenuOpen] = useState(false);', effect_str)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed menu bugs!")

fix_menu('src/pages/Home.jsx')
