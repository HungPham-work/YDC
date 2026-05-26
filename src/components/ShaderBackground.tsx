import React, { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse interactive coordinates
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Organic blob nodes
    const blobs = [
      { x: width * 0.2, y: height * 0.3, radius: Math.max(width, height) * 0.35, color: 'rgba(235, 235, 235, 0.4)', speedX: 0.002, speedY: 0.003, offset: 0 },
      { x: width * 0.8, y: height * 0.4, radius: Math.max(width, height) * 0.45, color: 'rgba(225, 225, 225, 0.35)', speedX: -0.0015, speedY: 0.0025, offset: Math.PI / 3 },
      { x: width * 0.5, y: height * 0.7, radius: Math.max(width, height) * 0.4, color: 'rgba(240, 240, 240, 0.5)', speedX: 0.0025, speedY: -0.002, offset: Math.PI / 1.5 },
      // A very subtle coral / amber element for warmth congruent to Cam San Hô theme
      { x: width * 0.4, y: height * 0.2, radius: Math.max(width, height) * 0.25, color: 'rgba(255, 87, 34, 0.04)', speedX: -0.001, speedY: 0.001, offset: Math.PI },
    ];

    let time = 0;

    const render = () => {
      time += 0.002;
      ctx.fillStyle = '#EFEFEF';
      ctx.fillRect(0, 0, width, height);

      // Interpolate mouse movement slowly for luxury drag lag feel
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Draw each fluid blur blob
      ctx.save();
      
      blobs.forEach((blob, idx) => {
        // Organic orbit
        const orbitX = Math.sin(time + blob.offset) * 80;
        const orbitY = Math.cos(time * 0.8 + blob.offset) * 80;
        
        let cx = blob.x + orbitX;
        let cy = blob.y + orbitY;

        // Slight drift toward mouse coords
        if (idx === 0) {
          cx += (mouse.x - width / 2) * 0.15;
          cy += (mouse.y - height / 2) * 0.15;
        } else if (idx === 3) {
          cx += (mouse.x - width / 2) * -0.08;
          cy += (mouse.y - height / 2) * -0.08;
        }

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.radius);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(239, 239, 239, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div id="shader-background-wrapper" className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      
      {/* Film Grain overlay using SVG micro noise */}
      <div 
        id="film-grain-layer" 
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
