# -*- coding: utf-8 -*-
import codecs
import re

with codecs.open('src/components/ui/MegaEventCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove ACROSS INDIA sticky tape
tape_regex = r'\{\/\* Sticky Tape: ACROSS INDIA \*\/\}\s*<div.*?ACROSS INDIA\s*<\/div>'
content = re.sub(tape_regex, '', content, flags=re.DOTALL)

# 2. Change ROADTRIPS to THE JOURNEY
content = content.replace("ROADTRIPS", "THE JOURNEY")

# 3. Change description text
old_desc = "Rock, rap, beatboxing, comedy and DJ battles hit your city before the grand finale at Quantum University."
new_desc = "A magnificent three-day cultural and academic extravaganza. Experience breathtaking performances, fierce inter-university competitions, and unforgettable moments at Quantum University."
content = content.replace(old_desc, new_desc)

# 4. Change HIT THE ROAD to EXPLORE
content = content.replace("HIT THE ROAD", "EXPLORE JOURNEY")

# 5. Fix NA corruption
content = re.sub(r'NA.*? 08/26', 'N 08/26', content)

with codecs.open('src/components/ui/MegaEventCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
