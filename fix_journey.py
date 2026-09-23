import codecs

with codecs.open('src/pages/Journey.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add GoldLine component and dark=true
gold_line_code = '''const dark = true;

const GoldLine = () => (
  <div className="flex items-center gap-4 max-w-sm mx-auto my-5">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
    <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)]"></div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-transparent"></div>
  </div>
);

export default function Journey() {'''

content = content.replace("export default function Journey() {", gold_line_code)

with codecs.open('src/pages/Journey.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
