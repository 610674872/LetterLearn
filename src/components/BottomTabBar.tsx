import React from 'react';
import { PenTool, SpellCheck, Headphones, Library } from 'lucide-react';
import type { LearningMode } from '../types';

interface BottomTabBarProps {
  currentMode: LearningMode;
  onSelectMode: (mode: LearningMode) => void;
  onOpenCharacterDictionary: () => void;
  writtenCount: number;
  totalCharactersCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentMode,
  onSelectMode,
  onOpenCharacterDictionary,
  writtenCount,
  totalCharactersCount,
}) => {
  const tabs = [
    {
      id: 'stroke' as LearningMode,
      label: '田字格练字',
      icon: PenTool,
    },
    {
      id: 'pinyin' as LearningMode,
      label: '看拼音写字',
      icon: SpellCheck,
    },
    {
      id: 'dictation' as LearningMode,
      label: '同步听写',
      icon: Headphones,
    },
  ];

  return (
    <nav className="shrink-0 w-full bg-[#f7ebe8]/95 backdrop-blur-md border-t border-[#d8c2be]/60 z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto px-4 h-[72px] sm:h-[80px] flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentMode === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectMode(tab.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer m3-press-active group"
            >
              {/* M3 Active Indicator Pill: 64px x 32px rounded-full */}
              <div
                className={`w-14 sm:w-16 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-[#ffdad6] text-[#410002] shadow-xs'
                    : 'bg-transparent text-[#534341] group-hover:bg-[#ebe0dd]/60'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.4]' : 'stroke-[1.8]'}`} />
              </div>

              {/* M3 Label Medium Typography */}
              <span
                className={`text-[11px] sm:text-[12px] tracking-wide transition-colors ${
                  isActive
                    ? 'font-bold text-[#231918]'
                    : 'font-medium text-[#534341]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* M3 Tab 4: 生字大厅 (带数值徽标 Badge) */}
        <button
          onClick={onOpenCharacterDictionary}
          className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer m3-press-active group relative"
          title={`生字本：已掌握 ${writtenCount} / ${totalCharactersCount} 字`}
        >
          <div className="w-14 sm:w-16 h-8 rounded-full flex items-center justify-center transition-all duration-200 bg-transparent text-[#534341] group-hover:bg-[#ebe0dd]/60 relative">
            <Library className="w-5 h-5 stroke-[1.8]" />

            {/* M3 Numerical Badge */}
            <span className="absolute -top-1 right-2 sm:right-3 px-1.5 py-0.2 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full min-w-[16px] text-center shadow-xs">
              {writtenCount}
            </span>
          </div>

          <span className="text-[11px] sm:text-[12px] font-medium tracking-wide text-[#534341]">
            生字本
          </span>
        </button>
      </div>
    </nav>
  );
};
