import codecs
import re

with codecs.open('src/pages/Journey.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix imports
content = content.replace("import React from 'react';", "import React, { useState } from 'react';")
content = content.replace("import { MapPin, Calendar, ArrowLeft } from 'lucide-react';", "import { MapPin, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';")

tilt_poster_code = """const TiltPoster = ({ src, alt, glowColor = 'rgba(201,168,76,0.3)', borderColor = 'border-gold/15' }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative rounded-xl sm:rounded-2xl overflow-hidden border ${borderColor} group`}
        style={{ boxShadow: `0 10px 40px ${glowColor}, 0 0 80px ${glowColor}` }}
      >
        <img src={src} alt={alt} className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </motion.div>
    </div>
  );
};

"""

# Escape sequence fixing if needed, but since we read and write via python it's fine.
content = content.replace("export default function Journey() {", tilt_poster_code + "export default function Journey() {")

with codecs.open('src/pages/Journey.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
