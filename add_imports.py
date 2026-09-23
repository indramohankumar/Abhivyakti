import codecs
import re

def update_home():
    with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Add imports
    imports = "import { EmberParticles } from '../components/ui/EmberParticles';\nimport { ContactCrewGrid } from '../components/ui/CrewCard';\n"
    content = re.sub(r'(import React.*?\n)', r'\1' + imports, content, count=1)
    
    with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

def update_interschool():
    with codecs.open('src/pages/InterSchool.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    imports = "import { EmberParticles } from '../components/ui/EmberParticles';\nimport { ContactCrewGrid } from '../components/ui/CrewCard';\n"
    content = re.sub(r'(import React.*?\n)', r'\1' + imports, content, count=1)
    
    with codecs.open('src/pages/InterSchool.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

update_home()
update_interschool()
print("Imports added")
