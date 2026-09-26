import codecs
import re

def update_grid(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    css_pattern = r'\.animate-marquee\.paused\s*\{\s*animation-play-state:\s*paused;\s*\}'
    new_css = '.animate-marquee.paused { animation-play-state: paused; } @media (hover: hover) and (pointer: fine) { .animate-marquee:hover { animation-play-state: paused; } }'
    
    div_pattern = r'className=\{\lex h-full gap-3 sm:gap-4 w-max animate-marquee \$\{isPaused \? \'paused\' : \'\'\}\\}\s*onMouseEnter=\{[\s\S]*?\}\s*onMouseLeave=\{[\s\S]*?\}'
    new_div = 'className={lex h-full gap-3 sm:gap-4 w-max animate-marquee }'
    
    if re.search(css_pattern, content) and re.search(div_pattern, content):
        content = re.sub(css_pattern, new_css, content)
        content = re.sub(div_pattern, new_div, content)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated grid with regex!")
    else:
        print("Regex patterns not found.")

update_grid('src/components/ui/antaragni-events.jsx')
