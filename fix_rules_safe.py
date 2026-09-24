import codecs

def fix_rules(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    bad_string = """                      <ul className="space-y-3">
                    {['Journey', 'Events', 'Photos', 'Register'].map(item => (
                      <li key={item}>
                        <Link to={`/${item.toLowerCase() === 'journey' ? 'journey' : ''}`} className="text-gray-400 text-sm hover:text-gold hover:pl-2 transition-all duration-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/50"></span>
                          {item}
                        </Link>
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

    good_string = """                      <ul className="space-y-3">
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

    if bad_string in content:
        content = content.replace(bad_string, good_string)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed rules array replacement!")
    else:
        print("Could not find the exact bad string to replace.")

fix_rules('src/pages/InterSchool.jsx')
