import React, { useState } from 'react';
import { Sparkles, Cookie, Sliders, Laptop, Cat, Coffee, Music, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import workspaceImg from '../assets/images/tung_workspace_bento_1790698572443.jpg';
import chibiImg from '../assets/images/tung_chibi_avatar_1790698582957.jpg';

const FORTUNES = [
  'Hôm nay Bùi Đức Tùng chúc bạn gặp toàn niềm vui và được uống trà sữa miễn phí!',
  'Một nụ cười ngọt ngào sẽ mở ra cánh cửa may mắn bất ngờ cho bạn hôm nay!',
  'Bạn xinh xắn và đáng yêu hơn bạn nghĩ rất nhiều đó nha, tự tin lên nhé!',
  'Mọi deadline khó khăn hôm nay đều sẽ bị thổi bay cái vèo!',
  'Hôm nay sẽ có người khen bạn đáng yêu, chuẩn bị tinh thần vui vẻ nha!',
  'Đức Tùng gửi bạn một túi năng lượng tích cực 100% không calo độc hại nè!',
];

export const BentoShowcase: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [currentFortune, setCurrentFortune] = useState<string | null>(null);
  const [isCookieCracked, setIsCookieCracked] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState<'sprout' | 'glasses' | 'crown' | 'cat'>('sprout');
  const [gentleSlider, setGentleSlider] = useState(99);
  const [humorSlider, setHumorSlider] = useState(95);

  const handleCrackCookie = () => {
    sounds.playBoing();
    sounds.playChime();
    setIsCookieCracked(true);
    const randomPick = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    setCurrentFortune(randomPick);
  };

  const handleResetCookie = () => {
    sounds.playPop();
    setIsCookieCracked(false);
    setCurrentFortune(null);
  };

  return (
    <section id="bento-showcase" className="py-20 relative bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wide">
            <span>Hệ Sinh Thái Đức Tùng</span>
            <span aria-hidden="true">·</span>
            <span>Bento Showcase Đẳng Cấp</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Những Mảnh Ghép Làm Nên Bùi Đức Tùng
          </h2>
          <p className="text-slate-600 text-base">
            Khám phá không gian làm việc chill, linh vật chibi dễ thương và những tương tác bất ngờ.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 (Col-span 2 on LG): Cozy Workspace with Hotspots */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold mb-1">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Không Gian Sáng Tạo</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Góc Làm Việc Ấm Cúng Của Tùng</h3>
              </div>
              <span className="text-xs text-slate-400">Chạm vào điểm sáng để khám phá</span>
            </div>

            {/* Workspace Image with interactive hotspots */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 group">
              <img
                src={workspaceImg}
                alt="Góc làm việc cực chill của Bùi Đức Tùng"
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />

              {/* Hotspot 1: Mechanical Keyboard */}
              <button
                onClick={() => {
                  sounds.playPop(700);
                  setActiveHotspot(
                    'Bàn phím cơ custom pastel với switch êm như bông, gõ ra hàng triệu dòng code mượt mà!'
                  );
                }}
                title="Bàn phím cơ"
                className="absolute bottom-[24%] left-[44%] w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs shadow-lg hover:scale-125 transition-transform"
              >
                <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-75" />
                ⌨️
              </button>

              {/* Hotspot 2: Calico Kitten */}
              <button
                onClick={() => {
                  sounds.playBoing();
                  setActiveHotspot(
                    'Bé mèo trợ lý kiêm quản lý chất lượng giấc ngủ của Tùng, chuyên gia cuộn tròn bên cạnh chuột!'
                  );
                }}
                title="Mèo cưng"
                className="absolute bottom-[20%] right-[32%] w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-lg hover:scale-125 transition-transform"
              >
                <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
                🐱
              </button>

              {/* Hotspot 3: Matcha Latte */}
              <button
                onClick={() => {
                  sounds.playPop(520);
                  setActiveHotspot(
                    'Cốc matcha latte ấm nóng bổ sung polyphenol và năng lượng sáng tạo cả ngày!'
                  );
                }}
                title="Matcha latte"
                className="absolute bottom-[36%] left-[22%] w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-lg hover:scale-125 transition-transform"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                🍵
              </button>
            </div>

            {/* Hotspot Info Box */}
            <div className="mt-4 min-h-[44px] p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-700">
              <span className="text-base shrink-0">💡</span>
              <p>
                {activeHotspot ||
                  'Bấm vào các nút tròn nhấp nháy trên ảnh góc bàn để nghe Tùng bật mí bí mật nhé!'}
              </p>
            </div>
          </div>

          {/* Card 2: Chibi Mascot & Accessory Selector */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Linh Vật Độc Quyền</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Tùng Chibi Siêu Cưng</h3>
              <p className="text-xs text-slate-500 mt-1">Chọn phụ kiện đeo cho bé Tùng nè:</p>
            </div>

            {/* Chibi Mascot Display */}
            <div className="relative aspect-square w-full my-4 rounded-2xl overflow-hidden bg-rose-50/60 border border-rose-100 flex items-center justify-center group">
              <img
                src={chibiImg}
                alt="Bùi Đức Tùng Chibi Mascot"
                className="w-48 h-48 object-cover rounded-xl select-none transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Accessory Overlay badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs border border-rose-100 text-xs font-semibold text-rose-600 flex items-center gap-1">
                {selectedAccessory === 'sprout' && '🌱 Mầm Cây May Mắn'}
                {selectedAccessory === 'glasses' && '👓 Kính Tri Thức'}
                {selectedAccessory === 'crown' && '👑 Vương Miện Cute'}
                {selectedAccessory === 'cat' && '🐱 Tai Mèo Nhanh Nhẹn'}
              </div>
            </div>

            {/* Accessory Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => {
                  sounds.playPop(480);
                  setSelectedAccessory('sprout');
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-colors ${
                  selectedAccessory === 'sprout'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                🌱 Mầm cây
              </button>
              <button
                onClick={() => {
                  sounds.playPop(540);
                  setSelectedAccessory('glasses');
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-colors ${
                  selectedAccessory === 'glasses'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                👓 Kính mắt
              </button>
              <button
                onClick={() => {
                  sounds.playPop(600);
                  setSelectedAccessory('crown');
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-colors ${
                  selectedAccessory === 'crown'
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                👑 Vương miện
              </button>
              <button
                onClick={() => {
                  sounds.playPop(660);
                  setSelectedAccessory('cat');
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-colors ${
                  selectedAccessory === 'cat'
                    ? 'bg-pink-50 border-pink-300 text-pink-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                🐱 Tai mèo
              </button>
            </div>
          </div>

          {/* Card 3: Daily Fortune Cookie */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold mb-1">
                <Cookie className="w-3.5 h-3.5" />
                <span>Quà Tặng Tinh Thần</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Bánh Quy May Mắn Của Tùng</h3>
              <p className="text-xs text-slate-500 mt-1">Bẻ bánh nhận thông điệp dễ thương trong ngày:</p>
            </div>

            <div className="my-6 text-center">
              {!isCookieCracked ? (
                <div className="space-y-3">
                  <div
                    onClick={handleCrackCookie}
                    className="w-24 h-24 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-4xl cursor-pointer hover:scale-110 active:scale-95 transition-transform shadow-xs"
                  >
                    🥠
                  </div>
                  <button
                    onClick={handleCrackCookie}
                    className="px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors"
                  >
                    Bẻ bánh ngay ✨
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3 animate-fadeIn text-left">
                  <span className="text-xl block">📜</span>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium italic leading-relaxed">
                    "{currentFortune}"
                  </p>
                  <button
                    onClick={handleResetCookie}
                    className="text-[11px] font-semibold text-amber-700 hover:underline block pt-1"
                  >
                    Bẻ thêm chiếc bánh khác →
                  </button>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              Mỗi ngày mở 1 chiếc để nhân đôi may mắn nha!
            </div>
          </div>

          {/* Card 4 (Col-span 2 on LG): Tùng's Interactive Sliders */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold mb-1">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Bộ Điều Chỉnh Độ Cute</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Bảng Kiểm Định Phẩm Chất Bùi Đức Tùng</h3>
              </div>
              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-lg">
                100% Nguyên Bản
              </span>
            </div>

            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Mức độ chu đáo & ga lăng</span>
                  <span className="font-mono tabular-nums text-rose-600 font-bold">{gentleSlider}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="100"
                  value={gentleSlider}
                  onChange={(e) => setGentleSlider(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Chỉ số khiếu hài hước & dí dỏm</span>
                  <span className="font-mono tabular-nums text-amber-600 font-bold">{humorSlider}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={humorSlider}
                  onChange={(e) => setHumorSlider(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 text-xs text-slate-600 mt-2">
              🌟 <strong>Đánh giá tổng quan:</strong> Dù bạn có kéo thanh trượt thế nào, Bùi Đức Tùng vẫn luôn đạt điểm số tối đa trong lòng những người yêu mến!
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
