import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { cn } from "../../lib/utils";

const METAL_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")';
const GRAIN_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22g%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23g)%22/%3E%3C/svg%3E")';

function Room({
  backWall = {
    tl: [22, 10],
    tr: [78, 10],
    br: [78, 70],
    bl: [22, 70],
  },
  lightsOn = true,
  intensity = 1,
  lightColor = "255,200,100",
  spots = [35, 50, 65],
  vignette = 0.55,
  isFlickering = false,
  className = "",
}) {
  const { tl, tr, br, bl } = backWall;
  const poly = useMemo(
    () => (pts) =>
      `polygon(${pts.map(([x, y]) => `${x}% ${y}%`).join(", ")})`,
    []
  );
  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden bg-black pointer-events-none ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([tl, tr, br, bl]),
          background:
            "linear-gradient(to bottom, rgba(25,20,15,1) 0%, rgba(10,8,6,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 0], [100, 0], tr, tl]),
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 0], tl, bl, [0, 100]]),
          background:
            "linear-gradient(to right, rgba(12,10,8,1) 0%, rgba(22,18,14,1) 70%, rgba(30,24,18,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[100, 0], tr, br, [100, 100]]),
          background:
            "linear-gradient(to left, rgba(12,10,8,1) 0%, rgba(22,18,14,1) 70%, rgba(30,24,18,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 100], [100, 100], br, bl]),
          background:
            "linear-gradient(to top, rgba(20,16,12,1) 0%, rgba(8,6,4,1) 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
        <defs>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="20%" stopColor="#C9A84C" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#C9A84C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={`${bl[0]}%`} y1={`${bl[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="rgba(201,168,76,0.3)" strokeWidth="5" style={{ filter: "blur(3px)" }} />
        <line x1={`${bl[0]}%`} y1={`${bl[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="url(#baseGrad)" strokeWidth="1" />
        <line x1={`${tl[0]}%`} y1={`${tl[1]}%`} x2={`${bl[0]}%`} y2={`${bl[1]}%`}
          stroke="url(#vGrad)" strokeWidth="1" />
        <line x1={`${tr[0]}%`} y1={`${tr[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="url(#vGrad)" strokeWidth="1" />
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 15,
          opacity: lightsOn ? intensity : 0,
          transition: isFlickering ? "none" : `opacity 700ms ${EASE}`,
          mixBlendMode: "screen",
          willChange: "opacity",
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{ 
            clipPath: poly([tl, tr, br, bl]), 
            background: spots.map(x => `radial-gradient(ellipse 20% 30% at ${x}% 68%, rgba(${lightColor},0.08) 0%, transparent 70%)`).join(", ")
          }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            clipPath: poly([[0, 0], tl, bl, [0, 100]]), 
            background: `radial-gradient(ellipse 30% 40% at 15% 75%, rgba(${lightColor},0.04) 0%, transparent 60%)`
          }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            clipPath: poly([[100, 0], tr, br, [100, 100]]), 
            background: `radial-gradient(ellipse 30% 40% at 85% 75%, rgba(${lightColor},0.04) 0%, transparent 60%)`
          }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            clipPath: poly([[0, 100], [100, 100], br, bl]), 
            background: spots.map(x => `radial-gradient(ellipse 25% 20% at ${x}% 80%, rgba(${lightColor},0.03) 0%, transparent 60%)`).join(", ")
          }} 
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 16, mixBlendMode: "screen" }}
      >
        {spots.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: lightsOn ? intensity : 0 }}
            transition={isFlickering ? { duration: 0 } : { delay: i * 0.1, duration: 0.8, ease: "easeInOut" }}
            className="absolute flex w-200 h-[80vh] -translate-x-1/2 justify-center pointer-events-none"
            style={{ 
              left: `${pos}%`, 
              top: "calc(3% + 80px)",
              mixBlendMode: "screen",
              willChange: "opacity"
            }}
          >
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }} shadows={false} gl={{ alpha: true }}>
              <ambientLight intensity={0.4} />
              <SpotLight
                distance={9.5}
                angle={0.15}
                attenuation={8}
                anglePower={6}
                color={`rgb(${lightColor})`}
                position={[0, 4.1, 0]}
                volumetric
                opacity={0.65}
                radiusTop={0.08}
                radiusBottom={2.2}
              />
            </Canvas>
          </motion.div>
        ))}
      </div>
      {/* Light points / Bulbs (Without heavy black metal stands) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 31 }}
      >
        {spots.map((pos, i) => (
          <div 
            key={i} 
            className="absolute flex flex-col items-center" 
            style={{ left: `${pos}%`, top: '1.5%', transform: 'translate(-50%, 0)' }}
          >
            {/* Glowing Bulb Dot */}
            <div 
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-700"
              style={{
                background: lightsOn ? '#FFE49E' : '#333',
                boxShadow: lightsOn 
                  ? `0 0 20px 8px rgba(255,228,158,0.9), 0 0 40px 15px rgba(255,200,100,0.4)`
                  : `none`,
              }}
            />
          </div>
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{
          zIndex: 20,
          background: `radial-gradient(ellipse 90% 80% at 50% 45%,
            transparent 55%,
            rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 25,
          opacity: 0.04,
          mixBlendMode: "screen",
          backgroundImage: GRAIN_NOISE,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}

export const VolumetricStudio = ({ 
  className,
  children
}) => {
  const [lightsOn, setLightsOn] = useState(false);
  const [isFlickering, setIsFlickering] = useState(true);
  useEffect(() => {
    let mounted = true;
    const runFlicker = async () => {
      const sleep = (ms) => new Promise(r => setTimeout(r, ms));
      await sleep(600);
      if (!mounted) return;
      setLightsOn(true);
      await sleep(100);
      setLightsOn(false);
      await sleep(300);
      setLightsOn(true);
      await sleep(50);
      setLightsOn(false);
      await sleep(200);
      setLightsOn(true);
      await sleep(40);
      setLightsOn(false);
      await sleep(60);
      setLightsOn(true);
      await sleep(40);
      setLightsOn(false);
      await sleep(400);
      if (!mounted) return;
      setIsFlickering(false);
      setLightsOn(true);
    };
    runFlicker();
    return () => { mounted = false; };
  }, []);
  return (
    <section className={cn("relative w-full h-full min-h-[550px] bg-black overflow-hidden font-sans", className)}>
      <Room
        lightsOn={lightsOn}
        intensity={1}
        lightColor="255,200,100"
        spots={[35, 50, 65]}
        isFlickering={isFlickering}
      />
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </section>
  );
};
