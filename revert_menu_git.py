import codecs
import subprocess

def revert_menu(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        current_content = f.read()
        
    result = subprocess.run(['git', 'show', '9d14e01:src/pages/Home.jsx'], capture_output=True, text=True, encoding='utf-8')
    original_content = result.stdout

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

revert_menu('src/pages/Home.jsx')
