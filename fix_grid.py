def fix_grid(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    bad_string = """className={`flex h-full gap-3 sm:gap-4 w-max animate-marquee ${isPaused ? 'paused' : ''}`}
        > setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >"""
        
    # Wait, let's just find the start of the div
    start = content.find('{/* Scrolling Track */}')
    end = content.find('{marqueeEvents.map((event, index) => {')
    
    if start != -1 and end != -1:
        prefix = content[:start]
        suffix = content[end:]
        
        new_block = """{/* Scrolling Track */}
        <div 
          className={`flex h-full gap-3 sm:gap-4 w-max animate-marquee ${isPaused ? 'paused' : ''}`}
        >
          """
        content = prefix + new_block + suffix
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed corrupted grid div!")
    else:
        print("Could not find blocks.")

fix_grid('src/components/ui/antaragni-events.jsx')
