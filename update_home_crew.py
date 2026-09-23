import codecs

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_crew = '''      <ContactCrewGrid coordinators={[
        { name: "Shivam Prakash", role: "STUDENT COORDINATOR", phone: "74829 42186" },
        { name: "Archii", role: "STUDENT COORDINATOR", phone: "93028 42951" }
      ]} />'''

new_crew = '''      <ContactCrewGrid coordinators={[
        { name: "Shivam Prakash", role: "STUDENT COORDINATOR", phone: "74829 42186" },
        { name: "Archii", role: "STUDENT COORDINATOR", phone: "93028 42951" },
        { name: "Indra Mohan Kumar", role: "TECH", phone: "6204318317" }
      ]} />'''

content = content.replace(old_crew, new_crew)

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
