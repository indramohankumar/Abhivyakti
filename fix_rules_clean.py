def fix_rules(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find('Event Rules')
    end = content.find('</AnimatePresence>')

    if start != -1 and end != -1:
        prefix = content[:start]
        suffix = content[end+18:]
        
        good_string = """Event Rules
                    </h4>
                    <ul className="space-y-3">
                      {activeModal.rules.map((rule, i) => (
                        <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className={`font-bold mt-0.5 ${dark ? activeModal.textColor : 'text-maroon'}`}>{i + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>"""
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(prefix + good_string + suffix)
        print("Fixed by slicing cleanly!")
    else:
        print("Could not find start or end")

fix_rules('src/pages/InterSchool.jsx')
