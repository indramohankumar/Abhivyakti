import codecs

def update_home(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    old_string = '{ name: "Indra Mohan Kumar", role: "TECH", phone: "6204318317" }'
    new_string = '{ name: "Indra Mohan Kumar", role: "TECH", phone: "6204318317", image: "/crew/indra.jpg" }'
    
    if old_string in content:
        content = content.replace(old_string, new_string)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
    else:
        print(f"Could not find Indra in {filename}")

update_home('src/pages/Home.jsx')
update_home('src/pages/InterSchool.jsx')
