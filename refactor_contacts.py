import codecs
import re

def update_home():
    with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Import
    if 'import { ContactCrewGrid }' not in content:
        content = content.replace("import { EmberParticles } from '../components/ui/EmberParticles';", "import { EmberParticles } from '../components/ui/EmberParticles';\nimport { ContactCrewGrid } from '../components/ui/CrewCard';")

    # Insert ContactCrewGrid above footer
    if '<ContactCrewGrid />' not in content:
        content = content.replace('<footer id="contact"', '<ContactCrewGrid />\n      <footer id="contact"')

    # Remove student coordinators from Footer
    footer_coord_html = '''                  <div>
                    <p className="text-gold font-semibold mb-1 uppercase text-[10px] tracking-wider">Student Coordinators</p>
                    <p className="text-gray-200">Shivam Prakash <span className="text-gray-500 ml-1">74829 42186</span></p>
                    <p className="text-gray-200">Archii <span className="text-gray-500 ml-1">93028 42951</span></p>
                  </div>'''
    content = content.replace(footer_coord_html, '')
    
    with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

def update_interschool():
    with codecs.open('src/pages/InterSchool.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Import
    if 'import { ContactCrewGrid }' not in content:
        content = content.replace("import { EmberParticles } from '../components/ui/EmberParticles';", "import { EmberParticles } from '../components/ui/EmberParticles';\nimport { ContactCrewGrid } from '../components/ui/CrewCard';")

    # Insert ContactCrewGrid above footer
    if '<ContactCrewGrid />' not in content:
        content = content.replace('<footer id="contact"', '<ContactCrewGrid />\n      <footer id="contact"')

    # Remove student coordinators from Footer
    footer_coord_html = '''                  <div>
                    <p className="text-gold font-semibold mb-1 uppercase text-[10px] tracking-wider">Student Coordinators</p>
                    <p className="text-gray-200">Shivam Prakash <span className="text-gray-500 ml-1">74829 42186</span></p>
                    <p className="text-gray-200">Archii <span className="text-gray-500 ml-1">93028 42951</span></p>
                  </div>'''
    content = content.replace(footer_coord_html, '')
    
    with codecs.open('src/pages/InterSchool.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

update_home()
update_interschool()
print("Contacts updated")
