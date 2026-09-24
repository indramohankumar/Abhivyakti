import codecs
import re

def insert_button(filename):
    with codecs.open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Lenient regex to handle whitespace/newlines
    anchor = r"(Quantum University invites your participation in The Inter-School Events\. Join us for a celebration of our heritage, culture, and creativity\.\s*</motion\.p>)"
    
    button_html = r"""\1
              
              <motion.div variants={fadeUp} className="mt-8 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSemUbsPQUTjTPb3UQSwWWj2zvrEq70acv8z_iunsS3cIF2qbA/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg rounded-full font-extrabold text-lg md:text-xl uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <span className="relative z-10">Register Now</span>
                    <Sparkles className="w-5 h-5 text-dark-bg relative z-10" />
                  </a>
                </div>
              </motion.div>"""
            
    new_content = re.sub(anchor, button_html, content)

    if content == new_content:
        print("Regex failed to match!")
    else:
        with codecs.open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully added register button to InterSchool!")

insert_button('src/pages/InterSchool.jsx')
