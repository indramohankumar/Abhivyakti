import codecs
import re

with codecs.open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'<a href="#journey" onClick=\{\(e\) => handleNavClick\(e, \'journey\'\)\}(.*?)>\s*Journey\s*</a>',
    r'<Link to="/journey"\1>Journey</Link>',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'<a href="#journey" onClick=\{\(e\) => handleNavClick\(e, \'journey\'\)\}(.*?)>\s*Festival Journey\s*</a>',
    r'<Link to="/journey" onClick={() => setMenuOpen(false)}\1>Festival Journey</Link>',
    content,
    flags=re.DOTALL
)

with codecs.open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
