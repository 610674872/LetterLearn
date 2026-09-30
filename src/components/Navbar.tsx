import React, { useState, useEffect } from 'react';
import { BookOpen, Award, ChevronDown, Smartphone, Volume2, VolumeX } from 'lucide-react';
import type { GradeLevel, SemesterLevel, Lesson } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { speechService } from '../utils/speech';

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
  onOpenAudioSettings?: () => void;
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
  onOpenAudioSettings,
  isAppInstalled,
}) => {
  const gradeChinese = ['一', '二', '三', '四', '五', '六'];
  const shortCurriculumLabel = `${gradeChinese[currentGrade - 1] || '一'}${currentSemester === 1 ? '上' : '下'}`;
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEffects.getMuted());

  useEffect(() => {
    const unsub = soundEffects.subscribeMuteChange((muted) => {
      setIsMuted(muted);
    });
    return unsub;
  }, []);

  const handleSoundButtonClick = () => {
    if (isMuted) {
      // 若当前静音，点击直接解除静音，激活音频并播放提示
      soundEffects.setMuted(false);
      soundEffects.unlockAudioContext();
      soundEffects.playStrokeSuccess();
      speechService.speak('声音已开启');
    } else {
      // 若已开启，点击打开声音诊断与测试面板
      if (onOpenAudioSettings) {
        onOpenAudioSettings();
      } else {
        soundEffects.toggleMute();
      }
    }
  };

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

          {/* M3 IconButton: 声音排查与控制 */}
          <button
            onClick={handleSoundButtonClick}
            className={`w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full flex items-center justify-center transition m3-press-active cursor-pointer relative ${
              isMuted
                ? 'bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffb4ab]'
                : 'hover:bg-[#f7ebe8] text-[#534341]'
            }`}
            title={isMuted ? '当前已静音（点击解除静音）' : '声音设置与测试（点击排查发音）'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-[#ba1a1a]" />
            ) : (
              <Volume2 className="w-5 h-5 text-[#ba1a1a]" />
            )}
          </button>

          {/* M3 IconButton: 奖状 */}
          <button
            onClick={onOpenBadgeWall}
            className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full hover:bg-[#f7ebe8] text-[#534341] flex items-center justify-center transition m3-press-active relative cursor-pointer"
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
            className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full hover:bg-[#f7ebe8] text-[#534341] flex items-center justify-center transition m3-press-active relative cursor-pointer"
            title="查看错题本"
          >
            <BookOpen className="w-5 h-5 text-[#775651]" />
            {mistakesCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
            )}
          </button>

          {/* M3 IconButton: 安装/运行指示 */}
          <button
            onClick={onOpenInstallApp}
            className={`w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full flex items-center justify-center transition m3-press-active cursor-pointer ${
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
            className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full hover:bg-[#f7ebe8] text-lg flex items-center justify-center transition m3-press-active cursor-pointer"
            title="护眼模式"
          >
            🦖
          </button>
        </div>
      </div>
    </header>
  );
};
