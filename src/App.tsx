/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TungPhotoGallery } from './components/TungPhotoGallery';
import { KawaiiLab } from './components/KawaiiLab';
import { BentoShowcase } from './components/BentoShowcase';
import { CuteArcadeGame } from './components/CuteArcadeGame';
import { Guestbook } from './components/Guestbook';
import { Footer } from './components/Footer';
import { CuteCursorTrail } from './components/CuteCursorTrail';
import { FloatingHearts } from './components/FloatingHearts';
import { sounds } from './utils/soundEffects';
import { Heart, ArrowUp } from 'lucide-react';

export default function App() {
  const [heartCount, setHeartCount] = useState<number>(() => {
    const saved = localStorage.getItem('bdt_heart_count');
    return saved ? Number(saved) : 9999;
  });

  const [heartBurstTrigger, setHeartBurstTrigger] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendHeart = () => {
    sounds.playHeart();
    setHeartCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('bdt_heart_count', next.toString());
      return next;
    });
    setHeartBurstTrigger((prev) => prev + 1);
  };

  const handleToggleMute = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (nextMuted) {
      setIsBgmPlaying(false);
    }
  };

  const handleToggleBgm = () => {
    const playing = sounds.toggleBgm();
    setIsBgmPlaying(playing);
    if (playing && isMuted) {
      setIsMuted(false);
    }
  };

  const scrollToLab = () => {
    const el = document.getElementById('phong-thi-nghiem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    sounds.playBoing();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#1E293B] relative selection:bg-rose-200 selection:text-rose-900">
      {/* Interactive Sparkle Cursor Trail */}
      <CuteCursorTrail />

      {/* Floating Hearts Animation */}
      <FloatingHearts triggerCount={heartBurstTrigger} />

      {/* Top Bar Navigation */}
      <Navbar
        heartCount={heartCount}
        onSendHeart={handleSendHeart}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection onExploreLab={scrollToLab} onSendHeart={handleSendHeart} />

        {/* Section: Tung Photo Gallery Showcase */}
        <TungPhotoGallery onSendHeart={handleSendHeart} />

        {/* Section 1: Kawaii Lab & Mood Synthesizer */}
        <KawaiiLab />

        {/* Section 2: Bento Showcase */}
        <BentoShowcase />

        {/* Section 3: Interactive 60 FPS Mini-Game */}
        <CuteArcadeGame />

        {/* Section 4: Guestbook & Love Wall */}
        <Guestbook />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Action Buttons at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            title="Lên đầu trang"
            className="w-10 h-10 rounded-full bg-white border border-rose-200 text-slate-600 hover:text-rose-600 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Big Heart Shower FAB */}
        <button
          onClick={handleSendHeart}
          title="Bắn tim cho Tùng!"
          className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
        >
          <Heart className="w-4 h-4 fill-white animate-bounce group-hover:scale-125 transition-transform" />
          <span>Thả tim Tùng!</span>
        </button>
      </div>
    </div>
  );
}
