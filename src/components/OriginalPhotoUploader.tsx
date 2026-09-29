import React, { useRef } from 'react';
import { Upload, CheckCircle2, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface OriginalPhotoUploaderProps {
  isCustom: boolean;
  onPhotoSelected: (dataUrl: string) => void;
  onReset: () => void;
  variant?: 'banner' | 'button';
}

export const OriginalPhotoUploader: React.FC<OriginalPhotoUploaderProps> = ({
  isCustom,
  onPhotoSelected,
  onReset,
  variant = 'banner',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        sounds.playSuccess();
        onPhotoSelected(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        sounds.playSuccess();
        onPhotoSelected(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (variant === 'button') {
    return (
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => {
            sounds.playPop();
            fileInputRef.current?.click();
          }}
          className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{isCustom ? 'Đổi ảnh gốc khác' : 'Chọn ảnh gốc nguyên mẫu'}</span>
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`rounded-2xl p-4 sm:p-5 border transition-all ${
        isCustom
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
          : 'bg-rose-50/80 border-rose-200 text-slate-800'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isCustom ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
            }`}
          >
            {isCustom ? <CheckCircle2 className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold">
                {isCustom
                  ? 'Đang hiển thị 100% ảnh gốc nguyên bản của Bùi Đức Tùng!'
                  : 'Sử dụng ảnh gốc nguyên mẫu (BuiDucTung.jpg)'}
              </h4>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isCustom ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                }`}
              >
                {isCustom ? 'ORIGINAL PHOTO ACTIVE' : 'KHÔNG QUA AI'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {isCustom
                ? 'Ảnh thật của Tùng đã được áp dụng toàn bộ giao diện và lưu trên máy bạn.'
                : 'Bấm nút bên cạnh để chọn file ảnh gốc của Tùng (hoặc kéo thả ảnh vào đây) để hiển thị nguyên bản.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {isCustom && (
            <button
              onClick={() => {
                sounds.playHit();
                onReset();
              }}
              title="Khôi phục mặc định"
              className="p-2 text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              sounds.playPop();
              fileInputRef.current?.click();
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-95 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isCustom ? 'Thay ảnh gốc khác' : 'Tải ảnh BuiDucTung.jpg lên'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
