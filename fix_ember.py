import codecs

content = '''import React from 'react';

export const EmberParticles = () => {
  // Generate 40 random embers
  const embers = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6,
    size: 2 + Math.random() * 5,
    tx: (Math.random() - 0.5) * 100 // drift X
  }));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[120vh]">
      <style dangerouslySetInnerHTML={{__html: 
        @keyframes floatUp {
          0% { 
            transform: translateY(100vh) translateX(0px) scale(0.5); 
            opacity: 0; 
          }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { 
            transform: translateY(-20vh) translateX(var(--tx)) scale(1.2); 
            opacity: 0; 
          }
        }
        .ember {
          position: absolute;
          top: 0;
          background: radial-gradient(circle, #ff9d4a 0%, #ff5f3c 40%, transparent 80%);
          border-radius: 50%;
          animation: floatUp linear infinite;
        }
      }} />
      {embers.map((e) => (
        <div
          key={e.id}
          className="ember"
          style={{
            left: e.left + "%",
            width: e.size + "px",
            height: e.size + "px",
            animationDuration: e.duration + "s",
            animationDelay: e.delay + "s",
            boxShadow: "0 0 " + (e.size * 2) + "px #ff5f3c",
            '--tx': e.tx + "px"
          }}
        />
      ))}
    </div>
  );
};
'''

with codecs.open('src/components/ui/EmberParticles.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
