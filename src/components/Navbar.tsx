import React from 'react';
import { BookOpen, Award, ChevronDown, Smartphone } from 'lucide-react';
import type { GradeLevel, SemesterLevel, Lesson } from '../types';

interface NavbarProps {
  currentGrade: GradeLevel;
  currentSemester: SemesterLevel;
  currentLesson: Lesson;
  starsCount: number;
  inkCount: number;
  mistakesCount: number;
  unlockedBadgeCount: number;
  onOpenCurriculumDrawer: () => void;
  onOpenErrorBook: () => void;
  onOpenEyeCare: () => void;
  onOpenBadgeWall: () => void;
  onOpenInstallApp: () => void;
  isAppInstalled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGrade,
  currentSemester,
  currentLesson,
  starsCount,
  inkCount,
  mistakesCount,
  unlockedBadgeCount,
  onOpenCurriculumDrawer,
  onOpenErrorBook,
  onOpenEyeCare,
  onOpenBadgeWall,
  onOpenInstallApp,
  isAppInstalled,
}) => {
  const shortCurriculumLabel = `${currentGrade === 1 ? '一' : '二'}${currentSemester === 1 ? '上' : '下'}`;

  return (
    <header className="shrink-0 w-full bg-[#fff8f6]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#d8c2be]/50 pt-[env(safe-area-inset-top)]">
      {/* M3 Top App Bar: 64px standard height */}
      <div className="max-w-4xl mx-auto px-3 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* 左侧：Brand & Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-[14px] bg-[#ba1a1a] text-white flex items-center justify-center font-bold text-lg shadow-xs">
            字
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-[#231918] tracking-tight leading-none">
              字小乐
            </h1>
            <span className="text-[10px] text-[#775651] font-medium">
              部编人教版同步
            </span>
          </div>
        </div>

        {/* 中间：M3 Filter Chip 样式的选课胶囊 (点击打开 M3 Bottom Sheet) */}
        <button
          onClick={onOpenCurriculumDrawer}
          className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-[#fdf1ee] hover:bg-[#f7ebe8] border border-[#d8c2be] text-[#231918] font-bold text-xs sm:text-sm m3-press-active shadow-2xs cursor-pointer max-w-[210px] sm:max-w-xs truncate"
          title="点击切换教材年级与课文"
        >
          <span className="px-1.5 py-0.5 rounded-md bg-[#ffdad6] text-[#410002] text-[10px] font-extrabold shrink-0">
            {shortCurriculumLabel}
          </span>
          <span className="truncate">
            {currentLesson.title}
          </span>
          <ChevronDown className="w-4 h-4 text-[#775651] shrink-0" />
        </button>

        {/* 右侧：M3 Action Buttons & Tonal Chips */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* M3 Suggestion Chip: 积分 */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fdf1ee] border border-[#d8c2be]/60 text-xs font-bold text-[#715b2e]">
            <span>⭐</span>
            <span>{starsCount}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fdf1ee] border border-[#d8c2be]/60 text-xs font-bold text-[#775651]">
            <span>💧</span>
            <span>{inkCount}</span>
          </div>

          {/* M3 IconButton: 奖状 */}
          <button
            onClick={onOpenBadgeWall}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-[#f7ebe8] text-[#534341] flex items-center justify-center transition m3-press-active relative cursor-pointer"
            title="查看奖状馆"
          >
            <Award className="w-5 h-5 text-[#ba1a1a]" />
            {unlockedBadgeCount > 0 && (
              <span className="absolute top-1 right-1 px-1 min-w-[14px] h-[14px] rounded-full bg-[#ba1a1a] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                {unlockedBadgeCount}
              </span>
            )}
          </button>

          {/* M3 IconButton: 错题 */}
          <button
            onClick={onOpenErrorBook}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-[#f7ebe8] text-[#534341] flex items-center justify-center transition m3-press-active relative cursor-pointer"
            title="查看错题本"
          >
            <BookOpen className="w-5 h-5 text-[#775651]" />
            {mistakesCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba1a1a]" />
            )}
          </button>

          {/* M3 IconButton: 安装/运行指示 */}
          <button
            onClick={onOpenInstallApp}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition m3-press-active cursor-pointer ${
              isAppInstalled
                ? 'text-[#2e7d32] hover:bg-[#e8f5e9]'
                : 'text-[#ba1a1a] hover:bg-[#ffdad6]'
            }`}
            title="安装到手机桌面"
          >
            <Smartphone className="w-5 h-5" />
          </button>

          {/* 护眼 */}
          <button
            onClick={onOpenEyeCare}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-[#f7ebe8] text-base flex items-center justify-center transition m3-press-active cursor-pointer"
            title="护眼模式"
          >
            🦖
          </button>
        </div>
      </div>
    </header>
  );
};
