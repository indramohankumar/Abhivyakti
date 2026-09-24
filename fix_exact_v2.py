def fix_rules(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find('Event Rules')
    end = content.find('</AnimatePresence>')

    if start != -1 and end != -1:
        prefix = content[:start]
        suffix = content[end+18:]
        
        good_string = 'Event Rules\\n                    </h4>\\n                    <ul className="space-y-3">\\n                      {activeModal.rules.map((rule, i) => (\\n                        <li key={i} className={lex items-start gap-3 text-sm leading-relaxed }>\\n                          <span className={ont-bold mt-0.5 }>{i + 1}.</span>\\n                          <span>{rule}</span>\\n                        </li>\\n                      ))}\\n                    </ul>\\n                  </div>\\n                  \\n                </div>\\n              </div>\\n            </motion.div>\\n          </div>\\n        )}\\n      </AnimatePresence>'
        
        # Replace literal \n with the os newline just in case, but writing with utf-8 is fine
        good_string = good_string.replace('\\n', '\n')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(prefix + good_string + suffix)
        print("Fixed by slicing!")
    else:
        print("Could not find start or end")

fix_rules('src/pages/InterSchool.jsx')
