import React from 'react';
import { Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-rose-100 bg-white py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Brand note */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-slate-900">Bùi Đức Tùng</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">
            Trang web độc quyền siêu cấp đáng yêu & đẳng cấp
          </span>
        </div>

        {/* Right signature */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Được tạo nên bằng cả</span>
          <button
            onClick={() => sounds.playHeart()}
            className="text-rose-500 hover:scale-125 transition-transform"
            title="Thả tim"
          >
            <Heart className="w-4 h-4 fill-current inline" />
          </button>
          <span>và những dòng code mượt mà</span>
        </div>

      </div>
    </footer>
  );
};
