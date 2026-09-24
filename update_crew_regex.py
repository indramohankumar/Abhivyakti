import codecs
import re

def update_home(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Archii replacement
    content = re.sub(r'\{ name: "Archii", role: "STUDENT COORDINATOR", phone: "93028 42951" \}',
                     r'{ name: "Archii", role: "STUDENT COORDINATOR", phone: "93028 42951", image: "/crew/archii.jpg" }', content)
                     
    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated Home")

def update_interschool(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Dhruv replacement
    content = re.sub(r'\{ name: "Dhruv Bhati", role: "STUDENT COORDINATOR", phone: "79062 16206" \}',
                     r'{ name: "Dhruv Bhati", role: "STUDENT COORDINATOR", phone: "79062 16206", image: "/crew/dhruv.jpg" }', content)
                     
    # Nilbrata replacement
    content = re.sub(r'\{ name: "Nilbrata Das", role: "STUDENT COORDINATOR", phone: "89748 94143" \}',
                     r'{ name: "Nilbrata Das", role: "STUDENT COORDINATOR", phone: "89748 94143", image: "/crew/nilbrata.jpg" }', content)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated InterSchool")

update_home('src/pages/Home.jsx')
update_interschool('src/pages/InterSchool.jsx')
