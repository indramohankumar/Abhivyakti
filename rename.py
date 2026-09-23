files = ['src/components/ui/antaragni-events.jsx', 'src/components/ui/MegaEventCard.jsx']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace("ANTARAGNI '26", "ABHIVYAKTI '26")
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print('Replaced successfully.')
