import codecs

with codecs.open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_interschool = "import InterSchool from './pages/InterSchool';"
import_journey = "import InterSchool from './pages/InterSchool';\nimport Journey from './pages/Journey';"
content = content.replace(import_interschool, import_journey)

route_interschool = '<Route path="/inter-school" element={<InterSchool />} />'
route_journey = '<Route path="/inter-school" element={<InterSchool />} />\n          <Route path="/journey" element={<Journey />} />'
content = content.replace(route_interschool, route_journey)

with codecs.open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
