import codecs

with codecs.open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace variables
replacements = {
    '--color-quantum-purple: #8F2271;': '--color-quantum-purple: #9b1c31;',
    '--color-quantum-pink: #EA1588;': '--color-quantum-pink: #e92a67;',
    '--color-saffron: #FF9933;': '--color-saffron: #ff5f3c;',
    '--color-maroon: #882C41;': '--color-maroon: #ff5f3c;',
    '--color-gold: #C9A84C;': '--color-gold: #ff6b35;',
    '--color-gold-light: #F3DA8C;': '--color-gold-light: #ff9d4a;',
    '--color-gold-dark: #A27329;': '--color-gold-dark: #cc4c2b;',
    '--color-deep-red: #8B1A1A;': '--color-deep-red: #ff5f3c;',
    '--color-burnt-orange: #CC5500;': '--color-burnt-orange: #ff6b35;',
    '--color-dark-card: #1a1025;': '--color-dark-card: #0a0505;',
    '--color-dark-border: #301b45;': '--color-dark-border: #331510;',
    'background: linear-gradient(135deg, #C9A84C 0%, #E8D48B 40%, #C9A84C 60%, #8B7332 100%);': 'background: linear-gradient(135deg, #ff6b35 0%, #ff9d4a 40%, #ff6b35 60%, #cc4c2b 100%);',
    '::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 99px; }': '::-webkit-scrollbar-thumb { background: #ff6b35; border-radius: 99px; }',
    '.dark ::-webkit-scrollbar-thumb { background: #8B7332; }': '.dark ::-webkit-scrollbar-thumb { background: #cc4c2b; }'
}

for old, new_ in replacements.items():
    css = css.replace(old, new_)

with codecs.open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Patched index.css successfully.')
