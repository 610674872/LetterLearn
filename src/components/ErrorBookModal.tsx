import React from 'react';
import { X, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { speechService } from '../utils/speech';

interface ErrorBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  mistakes: string[];
  onSelectCharacter: (char: string) => void;
  onClearMistakes: () => void;
}

export const ErrorBookModal: React.FC<ErrorBookModalProps> = ({
  isOpen,
  onClose,
  mistakes,
  onSelectCharacter,
  onClearMistakes,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] rounded-[28px] p-6 max-w-lg w-full shadow-2xl border border-[#d8c2be]/60 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#d8c2be]/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#ba1a1a]" />
            <h3 className="font-extrabold text-[#231918] text-lg">
              我的生字错题本 📖
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#fdf1ee] hover:bg-white text-[#775651] flex items-center justify-center transition m3-press-active cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4">
          <p className="text-xs text-[#775651] mb-3">
            平时写错或有倒插笔的字都在这里，多练两遍就能攻克它们啦！
          </p>

          {mistakes.length === 0 ? (
            <div className="py-12 text-center text-[#775651] flex flex-col items-center">
              <span className="text-4xl mb-2">🎉</span>
              <p className="text-sm font-bold text-[#231918]">太棒啦！错题本空空如也！</p>
              <p className="text-xs text-[#775651] mt-1">每个字都写得很规范，继续加油！</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-64 overflow-y-auto p-1 scrollbar-none">
              {mistakes.map((char, index) => (
                <div
                  key={index}
                  onClick={() => {
                    speechService.speak(`复习生字：${char}`);
                    onSelectCharacter(char);
                    onClose();
                  }}
                  className="bg-[#fdf1ee] hover:bg-white hover:scale-105 transition p-3 rounded-[20px] border border-[#d8c2be]/60 flex flex-col items-center justify-center cursor-pointer group shadow-2xs m3-press-active"
                >
                  <span className="text-2xl font-black text-[#231918] font-kaiti group-hover:text-[#ba1a1a]">
                    {char}
                  </span>
                  <span className="text-[10px] text-[#ba1a1a] font-bold mt-1 flex items-center gap-0.5">
                    再写写 <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-[#d8c2be]/40">
          {mistakes.length > 0 && (
            <button
              onClick={onClearMistakes}
              className="text-xs text-[#ba1a1a] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> 清空错题本
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-6 py-2.5 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white font-bold text-xs shadow-xs transition m3-press-active cursor-pointer"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  );
};
