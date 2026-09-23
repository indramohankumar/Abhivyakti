import urllib.request
import re

url = 'https://events.antaragni.in/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    css_files = re.findall(r'href=\"(\/_next\/static\/chunks\/[^\"]+\.css)\"', html)
    print('CSS Files found:', css_files)
    
    bg_colors = set(re.findall(r'bg-\[#([0-9a-fA-F]{6,8})\]', html))
    print('Inline Background Colors:', bg_colors)
    
    # Just look for any hex color in the HTML body to get a sense of the palette
    all_hex = set(re.findall(r'#([0-9a-fA-F]{6})', html))
    print('All Hex Colors in HTML:', all_hex)
    
    for css in css_files:
        css_url = f'https://events.antaragni.in{css}'
        css_content = urllib.request.urlopen(urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        css_vars = re.findall(r'--[a-zA-Z0-9-]+:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsl\([^)]+\))', css_content)
        print('CSS Variables:', css_vars[:20])
except Exception as e:
    print('Error:', e)
