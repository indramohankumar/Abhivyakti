import codecs
import re

def fix_rules(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The broken rules block
    regex = r'(<h4 className=\{ont-bold text-lg mb-4 flex items-center gap-2 \$\{dark \? \'text-white\' : \'text-maroon\'\}\}>\s*<div className=\{w-1 h-5 rounded-full \$\{dark \? activeModal\.colorClass : \'bg-maroon\'\}\}><\/div>\s*Event Rules\s*<\/h4>\s*<ul className="space-y-3">)\s*\{\[\'Journey\', \'Events\', \'Photos\', \'Register\'\]\.map\(item => \(\s*<li key=\{item\}>\s*<Link to=\{\/\$\{item\.toLowerCase\(\) === \'journey\' \? \'journey\' : \'\'\}\} className="text-gray-400 text-sm hover:text-gold hover:pl-2 transition-all duration-300 flex items-center gap-2">\s*<span className="w-1\.5 h-1\.5 rounded-full bg-gold\/50"><\/span>\s*\{item\}\s*<\/Link>\s*<\/li>\s*\)\)\}'
    
    replacement = r"""\1
                        {activeModal.rules.map((rule, i) => (
                          <li key={i} className={lex items-start gap-3 text-sm leading-relaxed }>
                            <span className={ont-bold mt-0.5 }>{i + 1}.</span>
                            <span>{rule}</span>
                          </li>
                        ))}"""

    if re.search(regex, content):
        content = re.sub(regex, replacement, content)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed the rules render bug!")
    else:
        print("Regex failed to match!")

fix_rules('src/pages/InterSchool.jsx')
