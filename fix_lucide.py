import codecs
with codecs.open('src/components/ui/CrewCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import { Mail, PhoneCall } from 'lucide-react';", "import { Mail } from 'lucide-react';")

with codecs.open('src/components/ui/CrewCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
