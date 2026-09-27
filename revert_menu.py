import codecs

def revert_menu(filename, original_filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        current_content = f.read()
        
    with codecs.open(original_filename, 'r', encoding='utf-8') as f:
        original_content = f.read()

    # Extract the old menu
    start_old = original_content.find('{menuOpen && (')
    end_old = original_content.find('</AnimatePresence>', start_old)
    old_menu = original_content[start_old:end_old]

    # Find the new menu
    start_new = current_content.find('{menuOpen && (')
    end_new = current_content.find('</AnimatePresence>', start_new)
    
    if start_new != -1 and end_new != -1 and start_old != -1 and end_old != -1:
        current_content = current_content[:start_new] + old_menu + current_content[end_new:]
        print("Reverted the menu block!")
    
    # Remove the overflow hidden effect
    effect_str = '''  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);'''
    
    if effect_str in current_content:
        current_content = current_content.replace(effect_str, '')
        print("Removed the overflow lock effect!")

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(current_content)

revert_menu('src/pages/Home.jsx', 'original_home.jsx')
