import codecs
import re

def revert_crew(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    regex = r'<ContactCrewGrid coordinators=\{\[\s*\{\s*name:\s*"Dr\. Pushpender Singh"[\s\S]*?\}\s*\]\}\s*\/>'

    new_array = '''<ContactCrewGrid coordinators={[
          { name: "Dhruv Bhati", role: "STUDENT COORDINATOR", phone: "79062 16206", image: "/crew/dhruv.jpg" },
          { name: "Nilbrata Das", role: "STUDENT COORDINATOR", phone: "89748 94143", image: "/crew/nilbrata.jpg" }
        ]} />'''

    if re.search(regex, content):
        content = re.sub(regex, new_array, content)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Reverted ContactCrewGrid via regex!")
    else:
        print("Regex failed!")

revert_crew('src/pages/InterSchool.jsx')
