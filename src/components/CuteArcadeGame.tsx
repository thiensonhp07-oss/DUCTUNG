import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Heart, Sparkles, Pause } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  type: 'boba' | 'star' | 'heart' | 'cake' | 'bug';
  char: string;
  points: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  alpha: number;
}

export const CuteArcadeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('bdt_high_score') || '0');
  });
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const playerPosRef = useRef({ x: 250, targetX: 250 });
  const itemsRef = useRef<FallingItem[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const comboRef = useRef(0);

  // Sync refs with state
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);
  useEffect(() => {
    comboRef.current = combo;
  }, [combo]);

  const startGame = () => {
    sounds.playSuccess();
    setScore(0);
    setLives(3);
    setCombo(0);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
    itemsRef.current = [];
    particlesRef.current = [];
    lastSpawnRef.current = performance.now();
  };

  const stopGame = () => {
    setIsPlaying(false);
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      localStorage.setItem('bdt_high_score', scoreRef.current.toString());
      sounds.playSuccess();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      playerPosRef.current.targetX = Math.max(30, Math.min(canvas.width - 30, clientX));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches[0].clientX - rect.left;
        playerPosRef.current.targetX = Math.max(30, Math.min(canvas.width - 30, clientX));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        playerPosRef.current.targetX = Math.max(30, playerPosRef.current.targetX - 40);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        playerPosRef.current.targetX = Math.min(canvas.width - 30, playerPosRef.current.targetX + 40);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Smooth lerp player movement
      playerPosRef.current.x += (playerPosRef.current.targetX - playerPosRef.current.x) * 0.2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(251, 207, 232, 0.25)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      if (isPlaying && !isPaused && !gameOver) {
        // Spawn items
        const spawnInterval = Math.max(600, 1200 - scoreRef.current * 2);
        if (currentTime - lastSpawnRef.current > spawnInterval) {
          lastSpawnRef.current = currentTime;

          const rand = Math.random();
          let itemType: FallingItem['type'] = 'boba';
          let char = '🧋';
          let points = 10;

          if (rand < 0.22) {
            itemType = 'bug';
            char = '👾';
            points = 0;
          } else if (rand < 0.45) {
            itemType = 'boba';
            char = '🧋';
            points = 10;
          } else if (rand < 0.65) {
            itemType = 'star';
            char = '⭐';
            points = 20;
          } else if (rand < 0.85) {
            itemType = 'cake';
            char = '🍰';
            points = 25;
          } else {
            itemType = 'heart';
            char = '💖';
            points = 15;
          }

          itemsRef.current.push({
            id: Math.random(),
            x: Math.random() * (canvas.width - 60) + 30,
            y: -20,
            speed: 130 + Math.random() * 80 + Math.min(scoreRef.current * 0.5, 120),
            size: 26,
            type: itemType,
            char,
            points,
          });
        }

        // Update items
        const playerX = playerPosRef.current.x;
        const playerY = canvas.height - 40;
        const catchRadius = 36;

        for (let i = itemsRef.current.length - 1; i >= 0; i--) {
          const item = itemsRef.current[i];
          item.y += item.speed * dt;

          // Check catch collision
          const dx = item.x - playerX;
          const dy = item.y - playerY;
          const dist = Math.hypot(dx, dy);

          if (dist < catchRadius) {
            // Caught item
            if (item.type === 'bug') {
              sounds.playHit();
              const newLives = livesRef.current - 1;
              setLives(newLives);
              setCombo(0);
              if (newLives <= 0) {
                setGameOver(true);
                stopGame();
              }
            } else {
              sounds.playBobaCatch();
              const comboMultiplier = Math.min(4, 1 + Math.floor(comboRef.current / 5));
              const earned = item.points * comboMultiplier;
              const newScore = scoreRef.current + earned;
              setScore(newScore);
              setCombo((c) => c + 1);

              if (item.type === 'heart' && livesRef.current < 3) {
                sounds.playHeart();
                setLives((l) => Math.min(3, l + 1));
              }

              // Burst particles
              for (let p = 0; p < 5; p++) {
                particlesRef.current.push({
                  x: item.x,
                  y: item.y,
                  vx: (Math.random() - 0.5) * 120,
                  vy: (Math.random() - 0.5) * 120,
                  char: item.char,
                  alpha: 1,
                });
              }
            }

            itemsRef.current.splice(i, 1);
            continue;
          }

          // Missed item
          if (item.y > canvas.height + 20) {
            if (item.type !== 'bug') {
              setCombo(0);
            }
            itemsRef.current.splice(i, 1);
          }
        }
      }

      // Draw Falling items
      for (const item of itemsRef.current) {
        ctx.font = `${item.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.char, item.x, item.y);
      }

      // Draw Particles
      for (let p = particlesRef.current.length - 1; p >= 0; p--) {
        const pt = particlesRef.current[p];
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.alpha -= dt * 1.5;

        if (pt.alpha <= 0) {
          particlesRef.current.splice(p, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pt.char, pt.x, pt.y);
        ctx.restore();
      }

      // Draw Player: Cute Tùng Basket / Character
      const px = playerPosRef.current.x;
      const py = canvas.height - 40;

      // Basket shadow
      ctx.fillStyle = 'rgba(244, 114, 182, 0.2)';
      ctx.beginPath();
      ctx.ellipse(px, py + 18, 32, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cute character face & bowl
      ctx.fillStyle = '#FFF1F2';
      ctx.strokeStyle = '#FB7185';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(px, py, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cute eyes & smile
      ctx.fillStyle = '#1E293B';
      ctx.beginPath();
      ctx.arc(px - 9, py - 4, 3, 0, Math.PI * 2);
      ctx.arc(px + 9, py - 4, 3, 0, Math.PI * 2);
      ctx.fill();

      // Cute rosy blush
      ctx.fillStyle = '#FDA4AF';
      ctx.beginPath();
      ctx.arc(px - 14, py + 4, 4, 0, Math.PI * 2);
      ctx.arc(px + 14, py + 4, 4, 0, Math.PI * 2);
      ctx.fill();

      // Cute open smile
      ctx.strokeStyle = '#E11D48';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py + 2, 7, 0.2, Math.PI - 0.2);
      ctx.stroke();

      // Top sprout
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🌱', px, py - 28);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, isPaused, gameOver]);

  return (
    <section id="mini-game" className="py-20 relative bg-white border-y border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wide">
            <span>Mini-Game Tương Tác 60 FPS</span>
            <span aria-hidden="true">·</span>
            <span>Chơi Cùng Bùi Đức Tùng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-2">
            Đức Tùng Hứng Trà Sữa & Né Deadline
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Di chuyển chuột hoặc phím mũi tên ← → để giúp Tùng nhặt trân châu, trà sữa và ngôi sao may mắn, tránh xa các con Bug/Deadline màu tím nha!
          </p>
        </div>

        {/* Game Container */}
        <div className="max-w-2xl mx-auto bg-[#FFFDF9] rounded-3xl p-6 border border-rose-200/80 shadow-md">
          
          {/* Top Scorebar */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100">
            {/* Lives */}
            <div className="flex items-center gap-1.5">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 transition-transform ${
                    i < lives ? 'text-rose-500 fill-rose-500 scale-100' : 'text-slate-300 scale-90'
                  }`}
                />
              ))}
            </div>

            {/* Score & Combo */}
            <div className="flex items-center gap-4 text-center">
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-semibold">Điểm số</span>
                <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">{score}</span>
              </div>
              {combo > 2 && (
                <div className="animate-bounce">
                  <span className="text-[10px] text-rose-500 font-bold block uppercase">Combo!</span>
                  <span className="text-sm font-extrabold text-rose-600 font-mono">x{combo}</span>
                </div>
              )}
            </div>

            {/* High Score */}
            <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 font-medium">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Kỷ lục: <strong className="font-mono tabular-nums">{highScore}</strong></span>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-rose-50/40 to-pink-50/50 border border-rose-100 shadow-inner flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={560}
              height={380}
              className="w-full h-auto cursor-none max-w-full block"
            />

            {/* Pre-Game Start Screen */}
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                <span className="text-5xl mb-3 animate-bounce">🧋</span>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Sẵn Sàng Hứng Trà Sữa?</h3>
                <p className="text-xs text-slate-600 max-w-xs mb-5">
                  Nhặt 🧋 (+10đ), ⭐ (+20đ), 🍰 (+25đ), 💖 (+Hồi máu). Đừng chạm vào 👾 Deadline nha!
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Bắt Đầu Ngay</span>
                </button>
              </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                <span className="text-5xl mb-2">😴</span>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Ôi Không! Bị Deadline Đè Rùi!</h3>
                <p className="text-xs text-slate-600 mb-2">
                  Đức Tùng cần một giấc ngủ nướng để hồi phục năng lượng!
                </p>
                <div className="text-base font-extrabold text-rose-600 font-mono mb-4">
                  Điểm của bạn: {score}
                </div>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi Lại Trận Mới</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Game Controls */}
          {isPlaying && (
            <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
              <span>Di chuột hoặc phím ← → để di chuyển</span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <Pause className="w-3 h-3" />
                <span>{isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
