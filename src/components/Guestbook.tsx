import React, { useState } from 'react';
import { Send, Heart, MessageSquareHeart, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Note {
  id: string;
  author: string;
  content: string;
  sticker: string;
  time: string;
  likes: number;
}

const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    author: 'Bạn Thân Của Tùng',
    content: 'Chúc Đức Tùng luôn giữ nụ cười tỏa nắng này nha! Cần gì cứ gọi anh em bao trà sữa full topping liền!',
    sticker: '🧋',
    time: 'Hôm nay',
    likes: 42,
  },
  {
    id: '2',
    author: 'Fan Cứng Bùi Đức Tùng',
    content: 'Tùng siêu cấp đáng yêu luôn á! Trang web này xịn xò đỉnh chóp thật sự!',
    sticker: '💖',
    time: 'Hôm qua',
    likes: 88,
  },
  {
    id: '3',
    author: 'Đồng Nghiệp Dễ Thương',
    content: 'Mỗi lần thấy Tùng cười là cả phòng làm việc bừng sáng năng lượng tích cực luôn á!',
    sticker: '🌸',
    time: '2 ngày trước',
    likes: 29,
  },
];

export const Guestbook: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('bdt_guestbook_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTES;
      }
    }
    return INITIAL_NOTES;
  });

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('💖');

  const STICKERS = ['💖', '🧋', '🌸', '✨', '🐾', '🍡'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    sounds.playSuccess();
    const newNote: Note = {
      id: Date.now().toString(),
      author: author.trim(),
      content: content.trim(),
      sticker: selectedSticker,
      time: 'Vừa xong',
      likes: 1,
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('bdt_guestbook_notes', JSON.stringify(updated));

    setAuthor('');
    setContent('');
  };

  const handleLike = (id: string) => {
    sounds.playPop(650);
    const updated = notes.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n));
    setNotes(updated);
    localStorage.setItem('bdt_guestbook_notes', JSON.stringify(updated));
  };

  return (
    <section id="luu-but" className="py-20 relative bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wide">
            <span>Góc Gửi Lời Yêu Thương</span>
            <span aria-hidden="true">·</span>
            <span>Lưu Bút Trực Tuyến</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Sổ Lưu Bút Dành Riêng Cho Bùi Đức Tùng
          </h2>
          <p className="text-slate-600 text-base">
            Gửi một lời chúc ngọt ngào, một lời nhắn nhủ ấm áp hoặc gắn một chiếc sticker xinh xắn tặng Tùng nha!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-rose-100 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
              <MessageSquareHeart className="w-4 h-4 text-rose-500" />
              <span>Viết Lời Nhắn Gửi Tùng</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Tên hoặc biệt danh của bạn
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ví dụ: Bé Mèo, Người Bạn Dấu Tên..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Chọn sticker đính kèm
                </label>
                <div className="flex items-center gap-2">
                  {STICKERS.map((stk) => (
                    <button
                      type="button"
                      key={stk}
                      onClick={() => {
                        sounds.playPop(520);
                        setSelectedSticker(stk);
                      }}
                      className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center border transition-all ${
                        selectedSticker === stk
                          ? 'bg-rose-50 border-rose-400 scale-110 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}
                    >
                      {stk}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Lời nhắn gửi ngọt ngào
                </label>
                <textarea
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Chúc Tùng ngày mới luôn tràn ngập nụ cười và may mắn nha..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Dán Lên Bảng Lưu Bút Ngay</span>
              </button>
            </form>
          </div>

          {/* Right Wall of Notes */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-5 rounded-2xl border border-rose-100/80 shadow-xs flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{note.sticker}</span>
                      <strong className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {note.author}
                      </strong>
                    </div>
                    <span className="text-[11px] text-slate-400">{note.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {note.content}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[10px]">Đã gửi tặng Tùng</span>
                  <button
                    onClick={() => handleLike(note.id)}
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-600 font-medium"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="tabular-nums font-mono">{note.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
