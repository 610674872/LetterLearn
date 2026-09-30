import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CharacterItem } from '../types';

interface CharacterSelectorProps {
  characters: CharacterItem[];
  selectedChar: string;
  onSelectCharacter: (char: CharacterItem) => void;
  charProgress: { [char: string]: number }; // stars
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  characters,
  selectedChar,
  onSelectCharacter,
  charProgress,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentIndex = characters.findIndex((c) => c.char === selectedChar);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectCharacter(characters[currentIndex - 1]);
      scrollIntoView(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < characters.length - 1) {
      onSelectCharacter(characters[currentIndex + 1]);
      scrollIntoView(currentIndex + 1);
    }
  };

  const scrollIntoView = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-3 bg-[#fdf1ee] p-2.5 rounded-[24px] border border-[#d8c2be]/50">
      {/* 顶部标题与快速翻页 */}
      <div className="flex items-center justify-between px-2 mb-1.5 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#231918]">
          <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
          <span>本课生字表</span>
          <span className="text-[11px] font-semibold text-[#775651] bg-[#ffdad6] text-[#410002] px-2 py-0.2 rounded-full">
            {currentIndex + 1} / {characters.length}
          </span>
        </div>

        {/* M3 Small IconButtons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className="w-7 h-7 rounded-full bg-[#fff8f6] hover:bg-[#f7ebe8] border border-[#d8c2be]/60 flex items-center justify-center text-[#534341] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer m3-press-active"
            title="上一个字"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= characters.length - 1}
            className="w-7 h-7 rounded-full bg-[#fff8f6] hover:bg-[#f7ebe8] border border-[#d8c2be]/60 flex items-center justify-center text-[#534341] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer m3-press-active"
            title="下一个字"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* M3 Horizontal Scroll Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory py-1 px-0.5"
      >
        {characters.map((item) => {
          const isSelected = item.char === selectedChar;
          const stars = charProgress[item.char] || 0;

          return (
            <button
              key={item.char}
              onClick={() => onSelectCharacter(item)}
              className={`flex flex-col items-center justify-center min-w-[58px] sm:min-w-[64px] h-[64px] sm:h-[68px] rounded-[18px] transition-all cursor-pointer relative shrink-0 snap-center m3-press-active ${
                isSelected
                  ? 'bg-[#ba1a1a] text-white shadow-xs scale-102 ring-2 ring-[#ffdad6]'
                  : 'bg-white border border-[#d8c2be]/60 hover:bg-[#fff8f6] text-[#231918]'
              }`}
            >
              <span
                className={`text-[10px] font-pinyin font-medium leading-none mb-0.5 ${
                  isSelected ? 'text-[#ffdad6]' : 'text-[#775651]'
                }`}
              >
                {item.pinyin}
              </span>
              <span className="text-xl sm:text-2xl font-bold font-kaiti leading-tight">
                {item.char}
              </span>

              {/* 星级徽章 */}
              {stars > 0 && (
                <span className="text-[8px] sm:text-[9px] absolute -bottom-1 bg-[#ffdad6] text-[#410002] font-black px-1.5 rounded-full border border-[#ba1a1a]/30 shadow-2xs">
                  {'⭐'.repeat(stars)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
