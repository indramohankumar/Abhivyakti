import codecs

def fix_rules(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    bad_string = 'Event Rules\n                    </h4>\n                    <ul className="space-y-3">\n                  {[\'Journey\', \'Events\', \'Photos\', \'Register\'].map(item => (\n                    <li key={item}>\n                      <Link to={/} className="text-gray-400 text-sm hover:text-gold hover:pl-2 transition-all duration-300 flex items-center gap-2">\n                        <span className="w-1.5 h-1.5 rounded-full bg-gold/50"></span>\n                        {item}\n                      </Link>\n                    </li>\n                  ))}\n                </ul>\n                  </div>\n                  \n                </div>\n              </div>\n            </motion.div>\n          </div>\n        )}\n      </AnimatePresence>'

    good_string = 'Event Rules\n                    </h4>\n                    <ul className="space-y-3">\n                      {activeModal.rules.map((rule, i) => (\n                        <li key={i} className={lex items-start gap-3 text-sm leading-relaxed }>\n                          <span className={ont-bold mt-0.5 }>{i + 1}.</span>\n                          <span>{rule}</span>\n                        </li>\n                      ))}\n                    </ul>\n                  </div>\n                  \n                </div>\n              </div>\n            </motion.div>\n          </div>\n        )}\n      </AnimatePresence>'

    if bad_string in content:
        content = content.replace(bad_string, good_string)
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed EXACT rules array replacement!")
    else:
        print("Still could not find the exact bad string to replace.")

fix_rules('src/pages/InterSchool.jsx')
