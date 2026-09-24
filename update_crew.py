import codecs
import re

def update_home(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    old_home = '''<ContactCrewGrid coordinators={[
          { name: "Shivam Prakash", role: "STUDENT COORDINATOR", phone: "74829 42186" },
          { name: "Archii", role: "STUDENT COORDINATOR", phone: "93028 42951" },
          { name: "Indra Mohan Kumar", role: "TECH", phone: "6204318317", image: "/crew/indra.jpg" }
        ]} />'''
        
    new_home = '''<ContactCrewGrid coordinators={[
          { name: "Shivam Prakash", role: "STUDENT COORDINATOR", phone: "74829 42186" },
          { name: "Archii", role: "STUDENT COORDINATOR", phone: "93028 42951", image: "/crew/archii.jpg" },
          { name: "Indra Mohan Kumar", role: "TECH", phone: "6204318317", image: "/crew/indra.jpg" }
        ]} />'''

    if old_home in content:
        content = content.replace(old_home, new_home)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated Home")
    else:
        print("Could not find array in Home")

def update_interschool(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    old_inter = '''<ContactCrewGrid coordinators={[
          { name: "Dhruv Bhati", role: "STUDENT COORDINATOR", phone: "79062 16206" },
          { name: "Nilbrata Das", role: "STUDENT COORDINATOR", phone: "89748 94143" }
        ]} />'''
        
    new_inter = '''<ContactCrewGrid coordinators={[
          { name: "Dhruv Bhati", role: "STUDENT COORDINATOR", phone: "79062 16206", image: "/crew/dhruv.jpg" },
          { name: "Nilbrata Das", role: "STUDENT COORDINATOR", phone: "89748 94143", image: "/crew/nilbrata.jpg" }
        ]} />'''

    if old_inter in content:
        content = content.replace(old_inter, new_inter)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated InterSchool")
    else:
        print("Could not find array in InterSchool")

update_home('src/pages/Home.jsx')
update_interschool('src/pages/InterSchool.jsx')
