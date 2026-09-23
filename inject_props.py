import codecs

def update_home():
    with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    home_coords = '''<ContactCrewGrid coordinators={[
        { name: "Shivam Prakash", role: "STUDENT COORDINATOR", phone: "74829 42186" },
        { name: "Archii", role: "STUDENT COORDINATOR", phone: "93028 42951" }
      ]} />'''
    
    content = content.replace('<ContactCrewGrid />', home_coords)
    
    with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

def update_interschool():
    with codecs.open('src/pages/InterSchool.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    interschool_coords = '''<ContactCrewGrid coordinators={[
        { name: "Dhruv Bhati", role: "STUDENT COORDINATOR", phone: "79062 16206" },
        { name: "Nilbrata Das", role: "STUDENT COORDINATOR", phone: "89748 94143" }
      ]} />'''
      
    content = content.replace('<ContactCrewGrid />', interschool_coords)

    # Remove the old text from the footer
    old_footer_text = '''                  <div>
                    <p className="text-gold font-semibold mb-1 uppercase text-[10px] tracking-wider">Student Coordinators</p>
                    <p className="text-gray-200">Dhruv Bhati <span className="text-gray-500 ml-1">79062 16206</span></p>
                    <p className="text-gray-200">Nilbrata Das <span className="text-gray-500 ml-1">89748 94143</span></p>
                  </div>'''
    content = content.replace(old_footer_text, '')
    
    with codecs.open('src/pages/InterSchool.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

update_home()
update_interschool()
