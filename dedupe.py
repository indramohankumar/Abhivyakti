import codecs
import re

for filename in ['src/pages/Home.jsx', 'src/pages/InterSchool.jsx']:
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all instances of the imports
    content = re.sub(r"import \{ EmberParticles \} from '\.\./components/ui/EmberParticles';\n?", "", content)
    content = re.sub(r"import \{ ContactCrewGrid \} from '\.\./components/ui/CrewCard';\n?", "", content)
    
    # Add exactly one instance at the top
    imports = "import { EmberParticles } from '../components/ui/EmberParticles';\nimport { ContactCrewGrid } from '../components/ui/CrewCard';\n"
    content = re.sub(r'(import React.*?\n)', r'\1' + imports, content, count=1)
    
    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
