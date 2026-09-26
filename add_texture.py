def add_texture(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to add the stardust texture right before the <style> tag or after it, inside the main container
    target = """      <style dangerouslySetInnerHTML={{__html: `"""
    
    insertion = """      {/* Dusky Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 pointer-events-none mix-blend-overlay z-20" style={{ filter: 'contrast(1.5)' }}></div>
      
"""
    
    if target in content:
        content = content.replace(target, insertion + target)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Added dusky texture to PhotoMarquee!")
    else:
        print("Could not find the target to inject texture.")

add_texture('src/components/ui/PhotoMarquee.jsx')
