import React, { useState } from 'react';

const PhotoMarquee = ({ images, speed = 35 }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate 3 times for a seamless loop
  const marqueeImages = [...images, ...images, ...images];

  return (
    <div 
      className="relative w-full h-[240px] sm:h-[320px] overflow-hidden bg-transparent py-4 my-8"
      style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollPhotos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-photo-marquee {
          animation: scrollPhotos ${speed}s linear infinite;
        }
        .animate-photo-marquee.paused {
          animation-play-state: paused;
        }
      `}} />
      


      <div 
        className={`flex h-full gap-4 sm:gap-6 w-max animate-photo-marquee ${isPaused ? 'paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {marqueeImages.map((src, idx) => (
          <div 
            key={idx} 
            className="w-[320px] sm:w-[450px] h-full rounded-2xl overflow-hidden border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex-shrink-0 relative group hover:border-[#ff6b35]/40 hover:shadow-[0_0_30px_rgba(255,107,53,0.2)] transition-all duration-500 cursor-pointer"
          >
            <img 
              src={src} 
              alt="Gallery" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_120%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoMarquee;
