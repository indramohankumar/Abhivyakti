import codecs

def update_crew_card(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The conditional footer section
    old_footer = """<div className="flex items-center gap-3">
          {email && (
            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
              <Mail className="w-4 h-4" />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff6b35] transition-colors" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          )}
        </div>"""
        
    new_footer = """<div className="flex items-center gap-3">
          <a href={email ? `mailto:${email}` : '#'} target={email ? "_blank" : "_self"} rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); if (!email) e.preventDefault(); }}>
            <Mail className="w-4 h-4" />
          </a>
          <a href={instagram || '#'} target={instagram ? "_blank" : "_self"} rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff6b35] transition-colors" onClick={(e) => { e.stopPropagation(); if (!instagram) e.preventDefault(); }}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href={linkedin || '#'} target={linkedin ? "_blank" : "_self"} rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" onClick={(e) => { e.stopPropagation(); if (!linkedin) e.preventDefault(); }}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>"""
        
    if old_footer in content:
        content = content.replace(old_footer, new_footer)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated CrewCard to show static links!")
    else:
        print("Could not find the exact old_footer string.")

update_crew_card('src/components/ui/CrewCard.jsx')
