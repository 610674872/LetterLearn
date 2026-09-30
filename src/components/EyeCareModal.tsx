import React, { useEffect } from 'react';
import { speechService } from '../utils/speech';

interface EyeCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EyeCareModal: React.FC<EyeCareModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      speechService.speak('已经学习一段时间啦，让我们和小恐龙一起做眼保健操，眺望远方放松双眼吧！', 1.0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] rounded-[28px] p-6 max-w-md w-full shadow-2xl border border-[#d8c2be]/60 text-center animate-in fade-in duration-200">
        <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#410002] mx-auto flex items-center justify-center text-3xl mb-3 shadow-xs">
          🦖
        </div>

        <h3 className="text-xl font-extrabold text-[#231918] mb-1">
          眼睛休息时间到啦 🦖
        </h3>
        <p className="text-xs text-[#775651] mb-5 font-medium">
          学了一会儿啦，跟小恐龙一起眨眨眼、望远方，保护明亮的小眼睛！
        </p>

        <div className="bg-[#fdf1ee] p-4 rounded-[20px] border border-[#d8c2be]/60 mb-5 text-[#231918] text-xs space-y-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#ffdad6] text-[#410002] text-xs font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <span className="text-left font-medium">眨眨眼睛 5 次，轻轻闭上眼 10 秒</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#ffdad6] text-[#410002] text-xs font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <span className="text-left font-medium">眼球转转圈，上下左右看一看</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#ffdad6] text-[#410002] text-xs font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <span className="text-left font-medium">站起来喝口水，看看窗外绿油油的树木</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold text-sm shadow-xs cursor-pointer transition m3-press-active"
        >
          眼睛舒服啦，继续学！✨
        </button>
      </div>
    </div>
  );
};
