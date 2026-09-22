import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Switched to lucide-react as requested

// ─────────────────────────────────────────────
// Customize here — images, timing, sizes, geometry
// ─────────────────────────────────────────────



// How often the carousel auto-rotates (ms)
const AUTOPLAY_INTERVAL_MS = 2400;

// Spring physics for the ring rotation
const springTransition = {
  type: "spring",
  stiffness: 60,
  damping: 16,
  mass: 0.7,
};

// Ring depth (radius) bounds and how much of the container width it uses
const RADIUS_MIN = 120;
const RADIUS_MAX = 320;
const RADIUS_WIDTH_RATIO = 0.55;
const PERSPECTIVE_MULTIPLIER = 2.4; // how strong the 3D perspective looks
const RING_TILT_DEG = 38; // tilt angle of ring thumbnails

// Center image crossfade
const CROSSFADE_DURATION_S = 0.45;
const CROSSFADE_EASE = [0.22, 1, 0.36, 1];

// Size classes — thumbnails on the ring
const THUMB_SIZE_CLASSES =
  "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24";

// Size classes — active center image
const CENTER_SIZE_CLASSES =
  "w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-[22rem] lg:h-[30rem]";

// Nav button size
const BUTTON_SIZE_CLASSES = "w-9 h-9 sm:w-10 sm:h-10";

// ─────────────────────────────────────────────

// Small spinner shown while an image is loading
const ImageLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5">
    <div className="w-1/4 aspect-square rounded-full border-2 border-black/15 dark:border-white/20 border-t-black/50 dark:border-t-white/60 animate-spin" />
  </div>
);

export const Carousel360 = ({ items }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(220);
  const [loadedThumbs, setLoadedThumbs] = useState(() =>
    items.map(() => false),
  );

  const numImages = items.length;
  const angleStep = 360 / numImages;

  const steps = Math.round(rotation / angleStep);
  const centerIndex = ((-steps % numImages) + numImages) % numImages;
  const activeItem = items[centerIndex];

  // Reset the center loader whenever we land on a new image. Done during
  // render (not in an effect) so it doesn't trigger an extra render pass.
  const [prevCenterIndex, setPrevCenterIndex] = useState(centerIndex);
  const [centerLoaded, setCenterLoaded] = useState(false);
  if (centerIndex !== prevCenterIndex) {
    setPrevCenterIndex(centerIndex);
    setCenterLoaded(false);
  }

  useEffect(() => {
    const updateRadius = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setRadius(
        Math.max(RADIUS_MIN, Math.min(RADIUS_MAX, width * RADIUS_WIDTH_RATIO)),
      );
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + angleStep);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [angleStep]);

  const rotateCarousel = useCallback(
    (direction) => {
      setRotation(
        (prev) => prev + (direction === "left" ? -angleStep : angleStep),
      );
    },
    [angleStep],
  );

  const markThumbLoaded = useCallback((index) => {
    setLoadedThumbs((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-4 sm:py-10">
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.x < -30 || velocity.x < -200) rotateCarousel("left");
          else if (offset.x > 30 || velocity.x > 200) rotateCarousel("right");
        }}
        className="relative w-[96%] sm:w-[92%] max-w-[600px] aspect-[4/3] sm:aspect-[5/3] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
      >
        <div
          className="relative w-full h-full"
          style={{ perspective: radius * PERSPECTIVE_MULTIPLIER }}
        >
          {items.map((item, index) => {
            const targetAngle = rotation + angleStep * index;
            return (
              <motion.div
                key={item.name}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: targetAngle }}
                transition={springTransition}
              >
                <motion.div
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.15)] bg-black/10"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{
                    rotateY: -targetAngle,
                    rotateX: RING_TILT_DEG,
                    z: radius,
                  }}
                  transition={springTransition}
                >
                  {!loadedThumbs[index] && <ImageLoader />}
                    {/* Replaced next/image with standard img for Vite */}
                  <img
                    src={item.image}
                    alt={item.name}
                    onLoad={() => markThumbLoaded(index)}
                    className={`object-cover ${THUMB_SIZE_CLASSES} opacity-90 transition-opacity duration-300`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={centerIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: CROSSFADE_DURATION_S,
                ease: CROSSFADE_EASE,
              }}
              className="relative rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.4)] pointer-events-auto bg-black/10 group"
            >
              {/* Replaced next/image with standard img for Vite */}
              <img
                src={activeItem.image}
                alt={activeItem.name}
                loading="lazy"
                onLoad={() => setCenterLoaded(true)}
                className={`object-cover ${CENTER_SIZE_CLASSES} transition-opacity duration-300 opacity-100`}
              />
              
              {/* Beautiful Dark Gradient Overlay & Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-5 sm:p-6 md:p-8 text-left transition-opacity duration-300">
                 <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 className="font-serif text-gold-gradient text-xl sm:text-3xl md:text-4xl font-extrabold mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                     {activeItem.name}
                   </h3>
                   <p className="text-white/90 text-sm sm:text-base font-medium drop-shadow-md line-clamp-3 mb-4 leading-relaxed">
                     {activeItem.desc}
                   </p>
                   {activeItem.rulesLink && (
                     <a 
                       href={activeItem.rulesLink} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gold hover:bg-gold-light text-dark-bg border border-gold-light rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(201,168,76,0.4)] hover:shadow-[0_0_25px_rgba(201,168,76,0.6)] hover:scale-105"
                       onClick={(e) => e.stopPropagation()}
                     >
                       View Rules
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                     </a>
                   )}
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="flex items-center gap-3 mt-6 sm:mt-8 z-30">
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => rotateCarousel("left")}
          className={`group relative flex items-center justify-center ${BUTTON_SIZE_CLASSES} rounded-full overflow-hidden
                     shadow-sm shadow-black/10 dark:shadow-black/30
                     transition-transform duration-200 active:scale-90 cursor-pointer`}
        >
          <span
            className="absolute inset-0 rounded-full
                       bg-gradient-to-b from-white/70 to-white/20 dark:from-white/20 dark:to-white/5
                       backdrop-blur-lg backdrop-saturate-150 border border-white/40 dark:border-white/15
                       transition-all duration-200
                       group-hover:from-white/80 group-hover:to-white/25 dark:group-hover:from-white/25 dark:group-hover:to-white/10"
          />
          <ArrowLeft className="relative z-10 h-4 w-4 text-black/60 dark:text-white/80 group-hover:text-black/80 dark:group-hover:text-white transition-colors duration-200" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={() => rotateCarousel("right")}
          className={`group relative flex items-center justify-center ${BUTTON_SIZE_CLASSES} rounded-full overflow-hidden
                     shadow-sm shadow-black/10 dark:shadow-black/30
                     transition-transform duration-200 active:scale-90 cursor-pointer`}
        >
          <span
            className="absolute inset-0 rounded-full
                       bg-gradient-to-b from-white/70 to-white/20 dark:from-white/20 dark:to-white/5
                       backdrop-blur-lg backdrop-saturate-150 border border-white/40 dark:border-white/15
                       transition-all duration-200
                       group-hover:from-white/80 group-hover:to-white/25 dark:group-hover:from-white/25 dark:group-hover:to-white/10"
          />
          <ArrowRight className="relative z-10 h-4 w-4 text-black/60 dark:text-white/80 group-hover:text-black/80 dark:group-hover:text-white transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
};

export default Carousel360;
