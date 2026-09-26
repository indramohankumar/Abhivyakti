def update_events_grid(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find('{/* General Rules Button */}')
    end = content.find('</a>\n                </div>', start)
    
    # If not found with \n, try \r\n
    if end == -1:
        end = content.find('</a>\r\n                </div>', start)
        
    if start != -1 and end != -1:
        prefix = content[:start]
        # Skip past the closing div
        suffix = content[end + len('</a>\n                </div>'):]
        if '</a>\r\n                </div>' in content[end:end+40]:
            suffix = content[end + len('</a>\r\n                </div>'):]

        new_string = """{/* General Rules Button or Inline Rules */}
                {selectedEvent.rules ? (
                  <div className="mt-8 bg-white/5 border border-[#ff6b35]/20 p-6 sm:p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#ff6b35]"></div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase mb-6 flex items-center gap-3">
                      <FileText className="text-[#ff6b35] w-6 h-6" /> Event Rules & Guidelines
                    </h3>
                    <ul className="space-y-4">
                      {selectedEvent.rules.map((rule, i) => (
                        <li key={i} className="flex gap-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                          <span className="font-black text-[#ff6b35] shrink-0 mt-0.5">{i + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-8 flex justify-center">
                    <a 
                      href={selectedEvent.rulesLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#f24236] hover:from-[#f24236] hover:to-[#ff6b35] text-white px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(255,107,53,0.5)] hover:scale-105"
                    >
                      View Official Rulebook <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}"""
                
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(prefix + new_string + suffix)
        print("Updated AntaragniEventsGrid by slicing!")
    else:
        print("Could not find start or end positions.")

update_events_grid('src/components/ui/antaragni-events.jsx')
