import codecs

def update_grid(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add the hover CSS for desktop only
    old_css = """.animate-marquee.paused {
          animation-play-state: paused;
        }"""
        
    new_css = """.animate-marquee.paused {
          animation-play-state: paused;
        }
        @media (hover: hover) and (pointer: fine) {
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        }"""
        
    # Remove the manual JS onMouseEnter/Leave
    old_div = """<div 
          className={`flex h-full gap-3 sm:gap-4 w-max animate-marquee ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >"""
        
    new_div = """<div 
          className={`flex h-full gap-3 sm:gap-4 w-max animate-marquee ${isPaused ? 'paused' : ''}`}
        >"""
        
    if old_css in content and old_div in content:
        content = content.replace(old_css, new_css)
        content = content.replace(old_div, new_div)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated antaragni-events mobile interactions!")
    else:
        print("Strings not found.")

update_grid('src/components/ui/antaragni-events.jsx')
