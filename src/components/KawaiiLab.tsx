import React, { useState } from 'react';
import { Sparkles, Heart, Zap, Coffee, Moon, Sun, Award, Flame } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MoodState {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  energyLevel: number;
  cuteLevel: number;
  bgGradient: string;
  quote: string;
}

const MOODS: MoodState[] = [
  {
    id: 'cute',
    name: 'Siêu Cấp Cute',
    icon: '🌸',
    tagline: 'Tràn ngập nụ cười và năng lượng tích cực',
    energyLevel: 98,
    cuteLevel: 100,
    bgGradient: 'from-pink-500/10 via-rose-500/5 to-amber-500/10',
    quote: '"Một nụ cười bằng mười thang thuốc bổ, còn nụ cười của Tùng thì ngọt như kẹo bông!"',
  },
  {
    id: 'coding',
    name: 'Coder Thần Sầu',
    icon: '💻',
    tagline: 'Bàn phím cơ gõ tanh tách, fix bug bằng cả trái tim',
    energyLevel: 92,
    cuteLevel: 95,
    bgGradient: 'from-blue-500/10 via-indigo-500/5 to-purple-500/10',
    quote: '"Code có thể có bug, nhưng tình cảm dành cho mọi người luôn là 0 error, 0 warning!"',
  },
  {
    id: 'boba',
    name: 'Cơn Khát Trà Sữa',
    icon: '🧋',
    tagline: '70% đường, 100% đá, gấp đôi trân châu hoàng kim',
    energyLevel: 85,
    cuteLevel: 99,
    bgGradient: 'from-amber-500/10 via-orange-500/5 to-yellow-500/10',
    quote: '"Cuộc đời có thể đắng, nhưng có trà sữa và nụ cười là đời lại ngọt ngào ngay!"',
  },
  {
    id: 'sleepy',
    name: 'Mèo Lười Ngủ Nướng',
    icon: '🐾',
    tagline: 'Cuộn tròn trong chăn ấm, mơ giấc mơ diệu kỳ',
    energyLevel: 45,
    cuteLevel: 100,
    bgGradient: 'from-violet-500/10 via-purple-500/5 to-slate-500/10',
    quote: '"Ngủ đủ 8 tiếng là tốt cho sức khỏe, nhưng ngủ thêm 5 phút nữa là tốt cho tâm hồn..."',
  },
  {
    id: 'star',
    name: 'Ngôi Sao Sáng Ngời',
    icon: '✨',
    tagline: 'Tự tin, ấm áp và luôn sẵn lòng giúp đỡ bạn bè',
    energyLevel: 96,
    cuteLevel: 98,
    bgGradient: 'from-yellow-500/10 via-amber-500/5 to-pink-500/10',
    quote: '"Hãy luôn là phiên bản tỏa sáng và tử tế nhất của chính mình nhé!"',
  },
];

export const KawaiiLab: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodState>(MOODS[0]);
  const [partnerName, setPartnerName] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState<{
    score: number;
    title: string;
    description: string;
  } | null>(null);
  const [customEnergyBoost, setCustomEnergyBoost] = useState(0);

  const handleSelectMood = (mood: MoodState) => {
    sounds.playPop(580);
    setCurrentMood(mood);
  };

  const handleEnergyBoost = () => {
    sounds.playBoing();
    setCustomEnergyBoost((prev) => prev + 5);
  };

  const calculateCompatibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) return;

    sounds.playSuccess();
    // Deterministic fun calculation based on name characters
    const clean = partnerName.trim().toLowerCase();
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = (hash * 31 + clean.charCodeAt(i)) % 100;
    }
    const score = 88 + (hash % 12); // Always super high, sweet & positive (88% - 99%)

    const titles = [
      'Cặp Đôi Tri Kỷ Vũ Trụ',
      'Đồng Đội Trà Sữa Đỉnh Chóp',
      'Cạ Cứng Cực Phẩm',
      'Cặp Bài Trùng Dễ Thương Vô Đối',
    ];
    const descriptions = [
      `${partnerName} và Bùi Đức Tùng mà đi uống trà sữa cùng nhau thì cười nói từ sáng đến đêm không hết chuyện!`,
      `Độ hòa hợp cực đỉnh! Chỉ cần nhìn ánh mắt là biết đối phương đang muốn order món gì luôn á!`,
      `Chỉ số tâm đầu ý hợp chạm nóc thiên hà. Luôn mang lại năng lượng tích cực và sự ấm áp cho nhau!`,
      `Một sự kết hợp hoàn hảo giữa độ đáng yêu và sự tinh tế, xứng đáng nhận huy chương tình bạn xuất sắc!`,
    ];

    const pickIdx = hash % titles.length;
    setCompatibilityResult({
      score,
      title: titles[pickIdx],
      description: descriptions[pickIdx],
    });
  };

  return (
    <section id="phong-thi-nghiem" className="py-20 relative bg-white border-y border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wide">
            <span>Phòng Thí Nghiệm Đáng Yêu</span>
            <span aria-hidden="true">·</span>
            <span>Tương Tác Real-Time</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Trạm Điều Khiển Tâm Trạng Của Đức Tùng
          </h2>
          <p className="text-slate-600 text-base">
            Thử chuyển đổi các chế độ hoạt động của Bùi Đức Tùng trong ngày để xem những phản ứng siêu cấp đáng yêu nhé!
          </p>
        </div>

        {/* Interactive Mood Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {MOODS.map((mood) => {
            const isActive = currentMood.id === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => handleSelectMood(mood)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-rose-50/80 border-rose-300 shadow-sm ring-2 ring-rose-300/40 -translate-y-0.5'
                    : 'bg-white border-slate-200/90 hover:border-rose-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-2xl block mb-2">{mood.icon}</span>
                <span className="text-sm font-bold text-slate-900 block truncate">{mood.name}</span>
                <span className="text-xs text-slate-500 block truncate mt-0.5">{mood.tagline}</span>
              </button>
            );
          })}
        </div>

        {/* Current Mood Display Panel */}
        <div className={`p-6 sm:p-8 rounded-3xl border border-rose-100 bg-gradient-to-br ${currentMood.bgGradient} mb-12 transition-all duration-500`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{currentMood.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{currentMood.name}</h3>
                  <p className="text-xs text-slate-500">{currentMood.tagline}</p>
                </div>
              </div>

              <blockquote className="italic text-slate-700 bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-white/60 shadow-xs text-sm sm:text-base leading-relaxed">
                {currentMood.quote}
              </blockquote>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleEnergyBoost}
                  className="px-4 py-2 bg-white hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-600 shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>Bơm thêm năng lượng (+5)</span>
                </button>
                <span className="text-xs text-slate-500">
                  Đã bơm thêm: <strong className="text-slate-800 tabular-nums">+{customEnergyBoost}%</strong>
                </span>
              </div>
            </div>

            {/* Right Meters */}
            <div className="lg:col-span-5 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-500" /> Chỉ số năng lượng
                  </span>
                  <span className="font-mono tabular-nums font-semibold">
                    {Math.min(100, currentMood.energyLevel + customEnergyBoost)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, currentMood.energyLevel + customEnergyBoost)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Độ đáng yêu lan tỏa
                  </span>
                  <span className="font-mono tabular-nums font-semibold">{currentMood.cuteLevel}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-rose-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${currentMood.cuteLevel}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Trạng thái radar:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Đang hoạt động ổn định
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Tool: Máy Đo Độ Hợp Cạ Cùng Tùng */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-rose-200/70 shadow-xs">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex p-2 bg-rose-100 text-rose-600 rounded-2xl mb-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Máy Đo Độ Hợp Cạ Cùng Bùi Đức Tùng
            </h3>
            <p className="text-sm text-slate-600">
              Nhập tên bạn vào đây để xem tỉ lệ ăn ý và cùng Tùng đi càn quét các quán trà sữa nhé!
            </p>

            <form onSubmit={calculateCompatibility} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Nhập tên của bạn (ví dụ: Mai Anh, Sơn...)"
                className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors shrink-0 whitespace-nowrap"
              >
                Kiểm tra ngay ✨
              </button>
            </form>

            {compatibilityResult && (
              <div className="mt-6 p-5 bg-white rounded-2xl border border-rose-200 shadow-sm text-left max-w-lg mx-auto animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900">{compatibilityResult.title}</span>
                  <span className="text-lg font-extrabold font-mono text-rose-600 tabular-nums">
                    {compatibilityResult.score}% Hợp nhau!
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${compatibilityResult.score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {compatibilityResult.description}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
