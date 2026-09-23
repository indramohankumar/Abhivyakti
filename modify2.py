with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
in_events = False

for line in lines:
    if 'id="events"' in line:
        in_events = True
    
    if in_events and 'id="register"' in line:
        in_events = False
        # The line containing register comment might have been skipped, but 'id="register"' is the actual section.
        # Let's just output the previous comment explicitly if we skipped it.
        new_lines.append('      {/* ?? REGISTER ?? */}\n')
        
    if not in_events:
        if 'id="journey"' in line:
            new_lines.append('      <MegaEventCard events={events} />\n\n')
        if 'id="register"' in line:
            # We already added the comment above, but let's just make sure we don't duplicate it.
            pass
        new_lines.append(line)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
