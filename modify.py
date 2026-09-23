with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_block = '''
      {/* ?? NEW PHOTOS MARQUEE ?? */}
      <section className="relative z-20 py-8 sm:py-12 overflow-hidden bg-[#12091f]">
        <div className="text-center mb-6 sm:mb-10 px-4">
          <p className="text-[#ff6b35] font-semibold tracking-[0.2em] uppercase text-xs mb-2">Memories</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ff5f3c]">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent mx-auto mt-4 opacity-70"></div>
        </div>
        <PhotoMarquee images={[
          '/photos/media_1790128762747.jpg',
          '/photos/media_1790128762753.jpg',
          '/photos/media_1790128762760.jpg',
          '/photos/media_1790128762799.jpg'
        ]} speed={35} />
      </section>
'''

for i, line in enumerate(lines):
    if 'id="events"' in line:
        lines.insert(i-1, new_block + '\n')
        break

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)
