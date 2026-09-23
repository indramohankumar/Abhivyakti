import re

with open('src/components/ui/antaragni-events.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the return block for the mapping function
old_map = r'''          {marqueeEvents.map((event, index) => {
            const Icon = event.icon;
            
            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-3xl w-[260px] sm:w-[320px] flex-shrink-0 cursor-pointer transition-all duration-500 flex flex-col justify-end group border border-white/10 hover:border-[#ff6b35]/60 hover:shadow-[0_0_40px_rgba(255,107,53,0.25)]"
                onClick={() => setSelectedEvent(event)}
                layout
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: \url(\)\ }}
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/70 to-transparent transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full backdrop-blur-md bg-[#ff6b35]/20 text-[#ff6b35] shadow-[0_0_15px_rgba(255,107,53,0.5)]">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    
                    <h3 className="font-serif font-bold tracking-widest text-lg sm:text-xl text-white whitespace-nowrap drop-shadow-md">
                      {event.name}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-[10px] sm:text-xs line-clamp-2 mb-3 font-light tracking-wide">
                    {event.desc}
                  </p>

                  {/* Sub-Events Glowing Tags preview */}
                  {event.subEvents && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {event.subEvents.slice(0, 2).map((sub, i) => (
                        <span 
                          key={i}
                          className="text-[8px] sm:text-[9px] px-2.5 py-1 rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/15 text-orange-200 backdrop-blur-md whitespace-nowrap shadow-[0_0_10px_rgba(255,107,53,0.2)] font-semibold tracking-wider"
                        >
                          {sub}
                        </span>
                      ))}
                      {event.subEvents.length > 2 && (
                        <span className="text-[8px] sm:text-[9px] px-2.5 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-md whitespace-nowrap font-semibold">
                          +{event.subEvents.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  <button className="flex items-center gap-1.5 text-[#ff6b35] text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:text-white transition-colors mt-auto">
                    Explore Events <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}'''

new_map = r'''          {marqueeEvents.map((event, index) => {
            const colors = ['bg-[#ff9d4a]', 'bg-[#ff5f3c]', 'bg-[#ffd147]', 'bg-[#e92a67]'];
            const blockColor = colors[index % colors.length];
            const originalIndex = (index % events.length) + 1;
            
            return (
              <div key={index} className="flex flex-col items-center gap-3 w-[260px] sm:w-[300px] flex-shrink-0 cursor-pointer group" onClick={() => setSelectedEvent(event)}>
                <motion.div
                  className="relative overflow-hidden w-full aspect-[3/4] flex flex-col justify-end border border-white/10 group-hover:border-[#ff6b35]/50 transition-colors shadow-2xl rounded-sm"
                  layout
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: url() }}
                  />
                  
                  {/* Dark overlay for contrast */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  
                  {/* Corner Brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/50"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/50"></div>
                  <div className="absolute bottom-[4.5rem] left-2 w-3 h-3 border-b border-l border-white/50 z-20"></div>
                  <div className="absolute bottom-[4.5rem] right-2 w-3 h-3 border-b border-r border-white/50 z-20"></div>

                  {/* Top Texts */}
                  <div className="absolute top-3 left-4 text-[8px] sm:text-[9px] text-white/90 font-mono tracking-widest font-bold z-10">
                    ? {String(originalIndex).padStart(2, '0')}/26
                  </div>
                  <div className="absolute top-3 right-4 text-[8px] sm:text-[9px] text-red-500 font-mono tracking-widest font-black uppercase z-10 drop-shadow-md">
                    ANTARAGNI '26
                  </div>

                  {/* Bottom Solid Title Block */}
                  <div className={elative z-10 w-full  px-4 py-3 pb-2 flex flex-col justify-between min-h-[4rem] group-hover:brightness-110 transition-all}>
                    <h3 className="font-sans font-black tracking-tight text-xl sm:text-2xl text-black uppercase leading-none truncate">
                      {event.name}
                    </h3>
                    <div className="w-full flex justify-between items-end mt-1">
                      <div className="w-2 h-2 border-l border-b border-black/50"></div>
                      {/* Fake Barcode */}
                      <div className="flex gap-[2px] h-3 items-end opacity-80">
                        <div className="w-1 h-full bg-black"></div>
                        <div className="w-[1.5px] h-full bg-black"></div>
                        <div className="w-[2px] h-[80%] bg-black"></div>
                        <div className="w-1 h-[90%] bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[3px] h-[70%] bg-black"></div>
                        <div className="w-1 h-full bg-black"></div>
                        <div className="w-[1.5px] h-full bg-black"></div>
                        <div className="w-[2px] h-full bg-black"></div>
                        <div className="w-1 h-[80%] bg-black"></div>
                        <div className="w-2 h-2 border-r border-b border-black/50 ml-1"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Stage Text Under Card */}
                <div className="text-[9px] sm:text-[10px] text-white/50 font-bold uppercase tracking-[0.25em]">
                  {event.name === 'Fine Arts' || event.name === 'Fashion' ? 'VISUAL DISTRICT' : 'PERFORMING ARTS STAGE'}
                </div>
              </div>
            );
          })}'''

if old_map in content:
    content = content.replace(old_map, new_map)
    with open('src/components/ui/antaragni-events.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced.")
else:
    print("Could not find the exact old block.")
