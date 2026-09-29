import React, { useState, useRef } from 'react';
import { Sparkles, Coffee, Smile, ChevronRight, Upload, Camera } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { useOriginalPhoto } from '../utils/useOriginalPhoto';

interface HeroSectionProps {
  onExploreLab: () => void;
  onSendHeart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreLab, onSendHeart }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [characterReaction, setCharacterReaction] = useState<string | null>(
    'Chào bạn! Tớ là Bùi Đức Tùng nè, rất vui được gặp bạn ghé thăm thế giới cute này nha!'
  );
  const cardRef = useRef<HTMLDivElement | null>(null);
  const heroFileInputRef = useRef<HTMLInputElement | null>(null);
  const { photo, heroPhoto, isCustom, updatePhoto } = useOriginalPhoto();

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) {
        sounds.playSuccess();
        updatePhoto(res);
        setCharacterReaction('Oa! Bạn vừa cập nhật ảnh gốc xịn xò 100% nguyên bản của Tùng rồi nè! 🥰✨');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleHeadpat = () => {
    sounds.playBoing();
    onSendHeart();
    const responses = [
      'Aww... Bạn xoa đầu làm Tùng ngại xỉu luôn á! 🥰',
      'Được xoa đầu sướng quá đi, cộng thêm 100 điểm năng lượng cute! ✨',
      'Xoa đầu tóc bù xù rùi nè, nhưng mà Tùng thích lắm! 💖',
    ];
    setCharacterReaction(responses[Math.floor(Math.random() * responses.length)]);
  };

  const handleMilkTea = () => {
    sounds.playPop(620);
    const responses = [
      'Húp một ngụm trà sữa trân châu đường đen ngọt ngào! Cảm ơn bạn nha! 🧋',
      'Trà sữa full topping 70% đường 100% đá ngon số 1 quả đất! 😋',
      'Năng lượng trà sữa đã được nạp đầy, sẵn sàng code xuyên đêm rùi! ⚡',
    ];
    setCharacterReaction(responses[Math.floor(Math.random() * responses.length)]);
  };

  const handlePraise = () => {
    sounds.playChime();
    const responses = [
      'Uầy, bạn khen làm Tùng đỏ cả hai tai rồi này! Cảm ơn vì sự ngọt ngào nhé! 🌸',
      'Tùng xin nhận lời khen này nha, bạn cũng siêu cấp dễ thương luôn á! 🌟',
      'Nhận được lời khen của bạn là ngày hôm nay của Tùng vui trọn vẹn rồi! 💌',
    ];
    setCharacterReaction(responses[Math.floor(Math.random() * responses.length)]);
  };

  return (
    <section id="gioi-thieu" className="relative pt-12 pb-20 overflow-hidden">
      {/* Soft warm ambient backdrop glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Cute Typography & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Zero-pill metadata */}
            <div className="flex items-center gap-2 text-xs font-medium text-rose-500 tracking-wide uppercase">
              <span>Bùi Đức Tùng Official Space</span>
              <span aria-hidden="true">·</span>
              <span>Phiên Bản Đáng Yêu Max Cấp</span>
              <span aria-hidden="true">·</span>
              <span>2026 Edition</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Xin chào, tớ là{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
                Bùi Đức Tùng
              </span>{' '}
              đây!
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Chàng trai với nụ cười tỏa nắng, đam mê những điều nhỏ xinh ngọt ngào,
              và mang sứ mệnh lan tỏa năng lượng tích cực cùng sự cute vô cực đến mọi người xung quanh.
            </p>

            {/* Zero-pill metadata summary list */}
            <div className="pt-2 pb-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Hệ điều hành: Siêu cute
              </span>
              <span aria-hidden="true">·</span>
              <span>Sở thích: Trà sữa, code & ngủ nướng</span>
              <span aria-hidden="true">·</span>
              <span>Chỉ số hạnh phúc: 99.9%</span>
            </div>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playSuccess();
                  onExploreLab();
                }}
                className="px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Khám phá thế giới của Tùng</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleHeadpat}
                className="px-5 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Smile className="w-4 h-4 text-rose-500" />
                <span>Xoa đầu Tùng một cái</span>
              </button>
            </div>

            {/* Micro-Interaction Bar */}
            <div className="pt-4 border-t border-slate-200/80">
              <p className="text-xs text-slate-500 mb-2 font-medium">Tương tác trực tiếp cùng Đức Tùng:</p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleMilkTea}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tặng ly trà sữa</span>
                </button>
                <button
                  onClick={handlePraise}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>Khen Tùng đẹp trai</span>
                </button>
                <button
                  onClick={handleHeadpat}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Smile className="w-3.5 h-3.5 text-rose-500" />
                  <span>Nựng má cute</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Tilt Card with Character */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-md bg-white rounded-3xl p-4 shadow-xl border border-rose-100 group"
            >
              {/* Dynamic Dialog Speech Bubble */}
              {characterReaction && (
                <div className="absolute -top-12 left-4 right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-rose-100 text-xs text-slate-700 flex items-center gap-2 animate-bounce">
                  <span className="text-base shrink-0">💬</span>
                  <p className="line-clamp-2">{characterReaction}</p>
                </div>
              )}

              {/* Character Image Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-rose-50 to-pink-50 border border-rose-50">
                <input
                  ref={heroFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleHeroPhotoUpload}
                />

                <img
                  src={heroPhoto}
                  alt="Chân dung Bùi Đức Tùng siêu cấp ngầu và đáng yêu"
                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Real Photo Certified Badge */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-semibold text-white flex items-center gap-1.5 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>{isCustom ? 'Ảnh gốc 100% nguyên mẫu' : 'Real Photo · Kính Đen Siêu Ngầu'}</span>
                </div>

                {/* Upload overlay button */}
                <button
                  onClick={() => heroFileInputRef.current?.click()}
                  title="Thay bằng file ảnh gốc BuiDucTung.jpg từ máy"
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5 text-rose-500" />
                  <span>{isCustom ? 'Đổi ảnh gốc khác' : 'Dùng ảnh gốc BuiDucTung.jpg'}</span>
                </button>

                {/* Subtle Holographic Sheen Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${tilt.y * 3 + 50}% ${-tilt.x * 3 + 50}%, rgba(255,255,255,0.8), transparent 70%)`,
                  }}
                />
              </div>

              {/* Bottom Card Identity Strip */}
              <div className="pt-4 px-2 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Bùi Đức Tùng</h2>
                  <p className="text-xs text-slate-500">Mẫu người mang lại niềm vui mỗi ngày</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-semibold text-rose-500 tabular-nums">LV.999 CUTE</span>
                  <p className="text-[10px] text-slate-400">Authentic Certified</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
