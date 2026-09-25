import codecs

def update_home(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    old_string = '{ name: "Indra Mohan Kumar", role: "TECH", phone: "6204318317", image: "/crew/indra.jpg" }'
    new_string = '{ name: "Indra Mohan Kumar", role: "TECH", phone: "6204318317", image: "/crew/indra.jpg", linkedin: "https://www.linkedin.com/in/indra-mohan-kumar-500375311/", instagram: "https://www.instagram.com/?hl=en" }'
    
    if old_string in content:
        content = content.replace(old_string, new_string)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated Home.jsx!")
    else:
        print("Could not find the Indra string in Home.jsx")

update_home('src/pages/Home.jsx')
