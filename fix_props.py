import codecs

with codecs.open('src/components/ui/CrewCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_grid = '''export const ContactCrewGrid = () => {
  const coordinators = [
    {
      name: "Shivam Prakash",
      role: "STUDENT COORDINATOR",
      phone: "74829 42186",
      image: null // To be replaced later
    },
    {
      name: "Archii",
      role: "STUDENT COORDINATOR",
      phone: "93028 42951",
      image: null
    }
  ];'''

new_grid = '''export const ContactCrewGrid = ({ coordinators }) => {'''

content = content.replace(old_grid, new_grid)

with codecs.open('src/components/ui/CrewCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
