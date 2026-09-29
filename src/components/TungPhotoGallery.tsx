import React, { useState } from 'react';
import { Camera, Sparkles, Heart, MapPin, Glasses, Flame } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { useOriginalPhoto } from '../utils/useOriginalPhoto';
import { OriginalPhotoUploader } from './OriginalPhotoUploader';

interface TungPhotoGalleryProps {
  onSendHeart: () => void;
}

export const TungPhotoGallery: React.FC<TungPhotoGalleryProps> = ({ onSendHeart }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cool' | 'cute'>('all');
  const [photoReactions, setPhotoReactions] = useState<{ [key: string]: number }>({
    'mountain-film': 528,
    'portrait-shades': 892,
    'full-look': 634,
  });

  const { photo, isCustom, updatePhoto, resetPhoto } = useOriginalPhoto();

  const handleLikePhoto = (id: string) => {
    sounds.playHeart();
    onSendHeart();
    setPhotoReactions((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="album-anh" className="py-20 relative bg-white border-y border-rose-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wide">
              <Camera className="w-3.5 h-3.5" />
              <span>Góc Ảnh Đời Thường Của Bùi Đức Tùng</span>
              <span aria-hidden="true">·</span>
              <span>100% Real Visual</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Visual Đỉnh Chóp - Vừa Cool Ngầu Vừa Siêu Cute
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Khoảnh khắc Bùi Đức Tùng check-in giữa rừng thông sương mờ với outfit hoodie đen, kính râm cực ngầu kết hợp nụ cười duyên dáng đốn tim người nhìn!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Bộ lọc ảnh:</span>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  sounds.playPop();
                  setActiveFilter('all');
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setActiveFilter('cool');
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeFilter === 'cool'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🕶️ Cool ngầu
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setActiveFilter('cute');
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeFilter === 'cute'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌸 Đáng yêu
              </button>
            </div>
          </div>
        </div>

        {/* Original Photo Uploader Bar */}
        <OriginalPhotoUploader
          isCustom={isCustom}
          onPhotoSelected={updatePhoto}
          onReset={resetPhoto}
        />

        {/* Dynamic Photo Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Photo: The Full Balcony & Pine Mountain Look */}
          <div className="md:col-span-7 bg-[#FFFDF9] rounded-3xl p-5 border border-rose-100 shadow-sm flex flex-col justify-between group">
            <div className="relative aspect-[9/14] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
              <img
                src={photo}
                alt="Bùi Đức Tùng check-in ban công rừng thông siêu ngầu"
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-103"
                loading="eager"
              />

              {/* Top Film Badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white font-mono flex items-center gap-1.5 border border-white/20">
                <MapPin className="w-3 h-3 text-rose-400" />
                <span>{isCustom ? 'Ảnh Gốc Nguyên Mẫu 100%' : 'Rừng Thông Sương Mù · Check-in'}</span>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-rose-500/90 px-2 py-0.5 rounded-md font-semibold text-white">
                    {isCustom ? 'ORIGINAL PHOTO' : 'HOT OUTFIT'}
                  </span>
                  <span className="text-xs text-slate-300">Stüssy / Hoodie x Timberland</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isCustom ? 'Khoảnh khắc nguyên bản của Bùi Đức Tùng' : 'Góc nghiêng thần thánh bên ban công đồi thông'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Tone màu film vintage kết hợp kính râm đen tạo nên vibe cực chất nhưng vẫn toát lên vẻ đáng yêu gần gũi.
                </p>
              </div>
            </div>

            <div className="pt-4 px-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-900">Chỉ số visual:</span>
                <span className="text-rose-600 font-bold font-mono">10/10 Chuẩn nguyên mẫu</span>
              </div>
              <button
                onClick={() => handleLikePhoto('full-look')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-semibold transition-colors active:scale-95"
              >
                <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span className="font-mono tabular-nums">{photoReactions['full-look']}</span>
                <span>Thả tim ảnh này</span>
              </button>
            </div>
          </div>

          {/* Right Column: 2 Close-up Cards */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: Close-up with Sunglasses */}
            <div className="bg-[#FFFDF9] rounded-3xl p-5 border border-rose-100 shadow-sm flex flex-col justify-between group flex-1">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={photo}
                  alt="Chân dung Bùi Đức Tùng đeo kính râm cười duyên"
                  className="w-full h-full object-cover object-top select-none transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                  <Glasses className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Kính Râm Cool Boy</span>
                </div>
              </div>

              <div className="pt-4 px-1 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Bùi Đức Tùng Focus</h4>
                  <p className="text-xs text-slate-500">Nụ cười đốn gục mọi trái tim</p>
                </div>
                <button
                  onClick={() => handleLikePhoto('portrait-shades')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-xl text-xs font-semibold transition-colors active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono tabular-nums">{photoReactions['portrait-shades']}</span>
                </button>
              </div>
            </div>

            {/* Card 2: Cinematic Film Vibe */}
            <div className="bg-[#FFFDF9] rounded-3xl p-5 border border-rose-100 shadow-sm flex flex-col justify-between group flex-1">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={photo}
                  alt="Bùi Đức Tùng phong cách phim điện ảnh"
                  className="w-full h-full object-cover object-center select-none transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] text-emerald-300 font-mono flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>Ảnh Gốc Tự Nhiên</span>
                </div>
              </div>

              <div className="pt-4 px-1 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Khoảnh Khắc Ban Công</h4>
                  <p className="text-xs text-slate-500">100% nguyên bản của Tùng</p>
                </div>
                <button
                  onClick={() => handleLikePhoto('mountain-film')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-semibold transition-colors active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono tabular-nums">{photoReactions['mountain-film']}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
