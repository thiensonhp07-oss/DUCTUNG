import React, { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  color: string;
}

interface FloatingHeartsProps {
  triggerCount: number;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ triggerCount }) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    if (triggerCount === 0) return;

    const colors = ['#F43F5E', '#EC4899', '#FB7185', '#F472B6', '#FDA4AF'];
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // percentage from left
      size: Math.random() * 16 + 18,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setHearts((prev) => [...prev.slice(-25), newHeart]);

    const timer = setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2500);

    return () => clearTimeout(timer);
  }, [triggerCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-10 animate-float"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            color: heart.color,
            animation: 'floatUp 2.4s ease-out forwards',
          }}
        >
          💖
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6) rotate(0deg);
          }
          50% {
            transform: translateY(-200px) scale(1.2) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-450px) scale(1) rotate(-15deg);
          }
        }
      `}</style>
    </div>
  );
};
