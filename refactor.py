import codecs
import re

# --- HOME.JSX LOGO FIX ---
with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home_content = f.read()

old_logo = '''<div className="flex items-center gap-2.5 transition-all duration-300">
                  <img src="/logo.png" alt="Quantum University" className={h-6 sm:h-8 md:h-9 object-contain } />
                  
                </div>'''
new_logo = '''<div className="flex items-center gap-2.5 transition-all duration-300 bg-white p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-[0_0_15px_rgba(255,107,53,0.3)] border border-[#ff6b35]/20">
                  <img src="/logo.png" alt="Quantum University" className="h-5 sm:h-6 md:h-7 object-contain" />
                </div>'''

home_content = home_content.replace(old_logo, new_logo)

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home_content)

# --- INTERSCHOOL.JSX FIX ---
with codecs.open('src/pages/InterSchool.jsx', 'r', encoding='utf-8') as f:
    is_content = f.read()

# 1. Add EmberParticles import
if 'import { EmberParticles }' not in is_content:
    is_content = is_content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport { EmberParticles } from '../components/ui/EmberParticles';")

# 2. Force dark mode
is_content = is_content.replace('const dark = false;', 'const dark = true;')

# 3. Fix main background
old_bg = '<div className={min-h-screen font-sans  relative overflow-hidden}>'
new_bg = '<div className="min-h-screen font-sans bg-[#12091f] text-gray-200 relative overflow-hidden">'
is_content = is_content.replace(old_bg, new_bg)

# 4. Add Parallax/EmberParticles to background
old_mandalas = '''      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">'''
new_mandalas = '''      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <EmberParticles />
        <div className="absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-b from-[#ff5f3c]/5 to-transparent pointer-events-none" />'''
is_content = is_content.replace(old_mandalas, new_mandalas)

# 5. Fix logo in InterSchool
old_is_logo = '''            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Quantum University" className={h-6 sm:h-8 object-contain } />
            </div>'''
new_is_logo = '''            <div className="flex items-center gap-2 bg-white p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-[0_0_15px_rgba(255,107,53,0.3)] border border-[#ff6b35]/20">
              <img src="/logo.png" alt="Quantum University" className="h-5 sm:h-6 object-contain" />
            </div>'''
is_content = is_content.replace(old_is_logo, new_is_logo)

with codecs.open('src/pages/InterSchool.jsx', 'w', encoding='utf-8') as f:
    f.write(is_content)

print('Updated both successfully.')
