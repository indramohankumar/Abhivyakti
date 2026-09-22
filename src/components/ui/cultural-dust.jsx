import React, { useEffect, useRef } from 'react';

export default function CulturalDust({ mode = 'dark', opacity = 1, speed = 1 }) {
  const canvasRef = useRef(null);
  const isDark = mode === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles (diyas and dust)
    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor(window.innerWidth / (isDark ? 15 : 20)); 
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3 * speed,
          vy: -(Math.random() * 0.5 + 0.2) * speed, 
          alpha: Math.random(),
          phase: Math.random() * Math.PI * 2,
          type: Math.random() > 0.95 ? 'diya' : (Math.random() > 0.8 ? 'red' : 'gold'),
          scale: Math.random() * 0.5 + 0.5
        });
      }
    };

    const drawDiya = (ctx, x, y, scale, currentAlpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      
      // Flame
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.quadraticCurveTo(5, -2, 0, 5);
      ctx.quadraticCurveTo(-5, -2, 0, -10);
      ctx.fillStyle = `rgba(255, 165, 0, ${currentAlpha})`;
      ctx.shadowColor = 'rgba(255, 200, 0, 0.8)';
      ctx.shadowBlur = 15;
      ctx.fill();

      // Base (Earthen pot)
      ctx.beginPath();
      ctx.arc(0, 7, 6, 0, Math.PI, false);
      ctx.fillStyle = `rgba(139, 69, 19, ${currentAlpha})`; // SaddleBrown
      ctx.shadowBlur = 0;
      ctx.fill();
      
      ctx.restore();
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.phase += 0.02 * speed;
        const currentAlpha = 0.2 + ((Math.sin(p.phase) + 1) / 2) * 0.8;
        
        if (p.type === 'diya') {
          drawDiya(ctx, p.x, p.y, p.scale, currentAlpha * opacity);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * (isDark ? 1 : 1.5), 0, Math.PI * 2);
          
          if (p.type === 'gold') {
            ctx.fillStyle = isDark ? `rgba(201, 168, 76, ${currentAlpha * opacity})` : `rgba(230, 140, 30, ${currentAlpha * opacity})`;
            ctx.shadowColor = isDark ? 'rgba(232, 212, 139, 0.8)' : 'rgba(255, 150, 0, 0.6)';
          } else {
            ctx.fillStyle = isDark ? `rgba(234, 33, 33, ${currentAlpha * opacity})` : `rgba(200, 20, 50, ${currentAlpha * opacity})`;
            ctx.shadowColor = isDark ? 'rgba(234, 33, 33, 0.8)' : 'rgba(220, 50, 80, 0.5)';
          }
          
          ctx.shadowBlur = isDark ? 10 : 5;
          ctx.fill();
        }
        
        p.x += p.vx;
        p.y += p.vy;
        p.x += Math.sin(p.phase * 0.5) * (p.type === 'diya' ? 0.1 : 0.3);
        
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity, speed, isDark]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0505] via-[#1a0808] to-[#0a0505]"></div>
          <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-gold/5 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] bg-maroon/10 blur-[150px] rounded-full mix-blend-screen"></div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#fff5e6] via-[#ffe8cc] to-[#fff5e6]"></div>
          <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-orange-400/20 blur-[120px] rounded-full mix-blend-multiply"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] bg-red-400/15 blur-[150px] rounded-full mix-blend-multiply"></div>
        </>
      )}
      
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${isDark ? 'mix-blend-screen' : 'mix-blend-darken'} opacity-80`}
      />
    </div>
  );
}
