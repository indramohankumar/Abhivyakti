import React, { useState } from 'react';

const PhotoMarquee = ({ images, speed = 35 }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate 3 times for a seamless loop
  const marqueeImages = [...images, ...images, ...images];

  return (
    <div className="relative w-full h-[240px] sm:h-[320px] overflow-hidden bg-transparent py-4 my-8">
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
      
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#12091f] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#12091f] to-transparent z-10 pointer-events-none"></div>

      <div 
        className={`flex h-full gap-4 sm:gap-6 w-max animate-photo-marquee ${isPaused ? 'paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {marqueeImages.map((src, idx) => (
          <div 
            key={idx} 
            className="w-[320px] sm:w-[450px] h-full rounded-xl overflow-hidden border border-[#ff6b35]/20 shadow-[0_0_20px_rgba(255,107,53,0.1)] flex-shrink-0 relative group hover:border-[#ff6b35]/50 transition-colors cursor-pointer"
          >
            <img 
              src={src} 
              alt="Gallery" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12091f] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoMarquee;
