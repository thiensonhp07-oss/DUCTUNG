import React from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  heartCount: number;
  onSendHeart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  heartCount,
  onSendHeart,
  isMuted,
  onToggleMute,
  isBgmPlaying,
  onToggleBgm,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-rose-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element brand wordmark */}
        <a
          href="#"
          onClick={() => sounds.playBoing()}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-rose-500 transition-colors flex items-center gap-1.5"
        >
          <span>Bùi Đức Tùng</span>
          <span className="text-rose-400 text-lg">✨</span>
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#gioi-thieu"
            onClick={() => sounds.playPop()}
            className="hover:text-rose-600 transition-colors relative py-1 hover:border-b-2 hover:border-rose-400"
          >
            Về Tùng
          </a>
          <a
            href="#album-anh"
            onClick={() => sounds.playPop()}
            className="hover:text-rose-600 transition-colors relative py-1 hover:border-b-2 hover:border-rose-400 text-rose-600 font-semibold"
          >
            Góc Ảnh Xịn 📸
          </a>
          <a
            href="#phong-thi-nghiem"
            onClick={() => sounds.playPop()}
            className="hover:text-rose-600 transition-colors relative py-1 hover:border-b-2 hover:border-rose-400"
          >
            Phòng Thí Nghiệm
          </a>
          <a
            href="#bento-showcase"
            onClick={() => sounds.playPop()}
            className="hover:text-rose-600 transition-colors relative py-1 hover:border-b-2 hover:border-rose-400"
          >
            Hệ Sinh Thái
          </a>
          <a
            href="#mini-game"
            onClick={() => sounds.playPop()}
            className="hover:text-rose-600 transition-colors relative py-1 hover:border-b-2 hover:border-rose-400"
          >
            Game Nhặt Trà Sữa
          </a>
          <a
            href="#luu-but"
            onClick={() => sounds.playPop()}
            className="hover:text-rose-600 transition-colors relative py-1 hover:border-b-2 hover:border-rose-400"
          >
            Sổ Lưu Bút
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Lo-Fi Ambient BGM Toggle */}
          <button
            onClick={onToggleBgm}
            title={isBgmPlaying ? 'Tắt nhạc chill' : 'Bật nhạc chill'}
            className={`p-2 rounded-xl transition-all duration-200 border ${
              isBgmPlaying
                ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
          >
            <Music className={`w-4 h-4 ${isBgmPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-rose-500" />}
          </button>

          {/* Heart Button with counter */}
          <button
            onClick={onSendHeart}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 active:scale-95 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Heart className="w-3.5 h-3.5 fill-current animate-bounce" />
            <span className="tabular-nums font-mono">{heartCount.toLocaleString()}</span>
            <span className="hidden sm:inline">Tim</span>
          </button>
        </div>
      </div>
    </header>
  );
};
