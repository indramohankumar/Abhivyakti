import codecs
import re

def update_crew(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    regex = r'<ContactCrewGrid coordinators=\{\[\s*\{\s*name:\s*"Dhruv Bhati"[\s\S]*?\}\s*\]\}\s*\/>'

    new_array = '''<ContactCrewGrid coordinators={[
          { name: "Dr. Pushpender Singh", role: "CONVENER", phone: "98991 42233" },
          { name: "Dr. Nirmesh Sharma", role: "CO-CONVENER", phone: "97600 87704" },
          { name: "Dr. Varsha Gupta", role: "CO-CONVENER", phone: "70156 60812" },
          { name: "Dr. Mousmi Agarwal", role: "CO-CONVENER", phone: "98971 93757" },
          { name: "Dhruv Bhati", role: "STUDENT COORDINATOR", phone: "79062 16206", image: "/crew/dhruv.jpg" },
          { name: "Nilbrata Das", role: "STUDENT COORDINATOR", phone: "89748 94143", image: "/crew/nilbrata.jpg" }
        ]} />'''

    if re.search(regex, content):
        content = re.sub(regex, new_array, content)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated ContactCrewGrid via regex!")
    else:
        print("Regex failed!")

update_crew('src/pages/InterSchool.jsx')
