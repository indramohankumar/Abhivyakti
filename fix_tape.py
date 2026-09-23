import codecs

with codecs.open('src/components/ui/CrewCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_tape = '''        <div className="relative w-full max-w-[200px] mb-4 transform -rotate-2">
          <div className="absolute inset-0 bg-[#ffd147] rounded-sm transform rotate-2"></div>
          <div className="relative py-1.5 px-2 text-center text-[#12091f] font-black text-[10px] tracking-[0.2em] uppercase">
            {role}
          </div>
        </div>'''

new_tape = '''        <div className="relative w-full max-w-[200px] mb-4 flex justify-center">
          <div className="absolute inset-0 bg-[#ffd147] rounded-sm transform -rotate-2 scale-105 shadow-sm"></div>
          <div className="relative py-1.5 px-2 text-center text-[#12091f] font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase z-10">
            {role}
          </div>
        </div>'''

content = content.replace(old_tape, new_tape)

with codecs.open('src/components/ui/CrewCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
