import codecs
import re

with codecs.open('src/pages/Journey.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<style dangerouslySetInnerHTML=\{\{__html:\s*@keyframes marqueeReverse', r'<style dangerouslySetInnerHTML={{__html: \n          @keyframes marqueeReverse', content)
content = re.sub(r'animation: marqueeReverse 25s linear infinite;\s*\}\s*\}\} />', r'animation: marqueeReverse 25s linear infinite;\n          }\n        }} />', content)

with codecs.open('src/pages/Journey.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
