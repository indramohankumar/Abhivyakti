def update_grid(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find and replace the onMouseEnter/Leave block
    target = 'className={`flex h-full gap-3 sm:gap-4 w-max animate-marquee ${isPaused ? \'paused\' : \'\'}`}'
    
    start = content.find(target)
    if start != -1:
        end = content.find('>', start)
        content = content[:start] + target + '\n        ' + content[end:]
        print("Replaced div!")

    # Find and replace the CSS
    css_target = '.animate-marquee.paused {'
    start_css = content.find(css_target)
    if start_css != -1:
        end_css = content.find('}', start_css) + 1
        new_css = """.animate-marquee.paused {
          animation-play-state: paused;
        }
        @media (hover: hover) and (pointer: fine) {
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        }"""
        content = content[:start_css] + new_css + content[end_css:]
        print("Replaced CSS!")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_grid('src/components/ui/antaragni-events.jsx')
