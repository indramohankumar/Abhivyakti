import codecs

with codecs.open('src/components/ui/CrewCard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update CrewCard signature to accept index
content = content.replace("export const CrewCard = ({ name, role, phone, image }) => {", "export const CrewCard = ({ name, role, phone, image, index = 0 }) => {")

# 2. Add entry animations to the motion.div wrapper
old_motion = '''    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-[260px] sm:w-[280px] shrink-0 bg-[#1a0f2e] rounded-xl border border-white/5 overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:border-[#ff6b35]/30 cursor-pointer mx-auto"
    >'''
new_motion = '''    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 120, damping: 20 }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-[260px] sm:w-[280px] shrink-0 bg-[#1a0f2e] rounded-xl border border-white/5 overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] active:shadow-[0_0_30px_rgba(255,107,53,0.4)] hover:border-[#ff6b35]/30 active:border-[#ff6b35]/40 cursor-pointer mx-auto"
    >'''
content = content.replace(old_motion, new_motion)

# 3. Add active state to profile image glow
old_avatar = 'group-hover:shadow-[0_0_20px_rgba(255,107,53,0.6)]'
new_avatar = 'group-hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] group-active:shadow-[0_0_25px_rgba(255,107,53,0.8)]'
content = content.replace(old_avatar, new_avatar)

# 4. Add active state to Name text
old_name = 'drop-shadow-md group-hover:text-[#ff6b35] transition-colors text-center'
new_name = 'drop-shadow-md group-hover:text-[#ff6b35] group-active:text-[#ff5f3c] transition-colors text-center'
content = content.replace(old_name, new_name)

# 5. Pass index from grid
old_map = '<CrewCard key={i} {...coord} />'
new_map = '<CrewCard key={i} index={i} {...coord} />'
content = content.replace(old_map, new_map)

with codecs.open('src/components/ui/CrewCard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Enhanced mobile fx")
