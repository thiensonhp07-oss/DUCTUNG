import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  char: string;
}

export const CuteCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const cuteSymbols = ['✨', '💖', '⭐', '🌸', '💫', '🍡'];
    const cuteColors = ['#F472B6', '#FBBF24', '#A78BFA', '#34D399', '#FB7185'];

    const addParticle = (x: number, y: number, burst = false) => {
      const count = burst ? 8 : 1;
      for (let i = 0; i < count; i++) {
        const angle = burst ? Math.random() * Math.PI * 2 : (Math.random() - 0.5) * 2;
        const speed = burst ? Math.random() * 3 + 1.5 : Math.random() * 1.5 + 0.5;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 1 : 0.8),
          size: burst ? Math.random() * 8 + 12 : Math.random() * 6 + 10,
          alpha: 1,
          decay: burst ? 0.02 + Math.random() * 0.02 : 0.03 + Math.random() * 0.02,
          color: cuteColors[Math.floor(Math.random() * cuteColors.length)],
          char: cuteSymbols[Math.floor(Math.random() * cuteSymbols.length)],
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      if (!lastPosRef.current) {
        lastPosRef.current = currentPos;
        return;
      }
      const dx = currentPos.x - lastPosRef.current.x;
      const dy = currentPos.y - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 18) {
        addParticle(currentPos.x, currentPos.y, false);
        lastPosRef.current = currentPos;
      }
    };

    const handleClick = (e: MouseEvent) => {
      addParticle(e.clientX, e.clientY, true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.font = `${p.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity: 0.9 }}
    />
  );
};
