import codecs
import re

with codecs.open('src/components/ui/CrewCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the main wrapper
old_wrapper = 'className="relative w-full sm:w-[280px] bg-[#1a0f2e] rounded-xl border border-white/5 overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:border-[#ff6b35]/30 cursor-pointer"'
new_wrapper = 'className="relative w-[260px] sm:w-[280px] shrink-0 bg-[#1a0f2e] rounded-xl border border-white/5 overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:border-[#ff6b35]/30 cursor-pointer mx-auto"'
content = content.replace(old_wrapper, new_wrapper)

# 2. Update the padding
old_padding = '<div className="p-6 flex flex-col items-center z-10">'
new_padding = '<div className="p-5 sm:p-6 flex flex-col items-center z-10">'
content = content.replace(old_padding, new_padding)

# 3. Update the avatar size
old_avatar = 'className="relative w-28 h-28 mb-5 rounded-full p-[3px] bg-gradient-to-tr from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] group-hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] transition-all duration-500"'
new_avatar = 'className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 rounded-full p-[3px] bg-gradient-to-tr from-[#ff6b35] via-[#ff5f3c] to-[#9b1c31] group-hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] transition-all duration-500"'
content = content.replace(old_avatar, new_avatar)

# 4. Update the name size
old_name = 'className="text-white font-sans font-black text-2xl tracking-wide mb-3 drop-shadow-md group-hover:text-[#ff6b35] transition-colors"'
new_name = 'className="text-white font-sans font-black text-xl sm:text-2xl tracking-wide mb-2 sm:mb-3 drop-shadow-md group-hover:text-[#ff6b35] transition-colors text-center"'
content = content.replace(old_name, new_name)

# 5. Fix bullet character corruption
content = re.sub(r'CREW.*?ABHIVYAKTI \'26', 'CREW \u2022 ABHIVYAKTI \\\'26', content)

# 6. Make grid wrapper responsive
old_grid = '<div className="flex flex-wrap justify-center gap-6 sm:gap-10">'
new_grid = '<div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-10">'
content = content.replace(old_grid, new_grid)

with codecs.open('src/components/ui/CrewCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
