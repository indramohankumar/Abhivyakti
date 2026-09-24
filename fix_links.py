import codecs
import re

def fix_links(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the broken Link tag
    broken_regex = r'<Link to=\{/.*?\} className="text-gray-400 text-sm hover:text-gold hover:pl-2 transition-all duration-300 flex items-center gap-2">'
    
    # We'll just replace the whole ul block to be safe
    broken_ul_regex = r'<ul className="space-y-3">.*?</ul>'
    
    correct_ul = """<ul className="space-y-3">
                  {['Journey', 'Events', 'Photos', 'Register'].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase() === 'journey' ? 'journey' : ''}`} className="text-gray-400 text-sm hover:text-gold hover:pl-2 transition-all duration-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/50"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>"""
    
    content = re.sub(broken_ul_regex, correct_ul, content, flags=re.DOTALL)

    with codecs.open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

fix_links('src/pages/Home.jsx')
fix_links('src/pages/InterSchool.jsx')
