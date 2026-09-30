import React, { useState } from 'react';
import { X, CheckCircle2, Lock } from 'lucide-react';
import type { BadgeCategory, UserLearningStats } from '../types';
import { ALL_BADGES, getBadgeProgress } from '../utils/badgeSystem';

interface BadgeWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserLearningStats;
}

export const BadgeWallModal: React.FC<BadgeWallModalProps> = ({ isOpen, onClose, stats }) => {
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');

  if (!isOpen) return null;

  const filteredBadges = selectedCategory === 'all'
    ? ALL_BADGES
    : ALL_BADGES.filter((b) => b.category === selectedCategory);

  const totalUnlockedCount = ALL_BADGES.filter((b) => !!stats.unlockedBadges[b.id] || getBadgeProgress(b, stats).isUnlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] rounded-[28px] p-6 max-w-2xl w-full shadow-2xl border border-[#d8c2be]/60 flex flex-col max-h-[90vh] animate-in fade-in duration-200">
        {/* 头部标题与统计 */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#d8c2be]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#410002] flex items-center justify-center text-xl shadow-xs">
              🏅
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-[#231918] text-lg">
                  我的成就奖状馆 🏅
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-bold">
                  已获得 {totalUnlockedCount} / {ALL_BADGES.length} 张
                </span>
              </div>
              <p className="text-xs text-[#775651]">
                多认字、写好字，就能拿到闪闪发光的奖状和星星奖励哦！
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#fdf1ee] hover:bg-white text-[#775651] flex items-center justify-center transition m3-press-active cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 类别筛选栏 */}
        <div className="flex items-center gap-1.5 py-3 overflow-x-auto shrink-0 border-b border-[#d8c2be]/40 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
            }`}
          >
            全部奖状
          </button>
          <button
            onClick={() => setSelectedCategory('writing')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active shrink-0 cursor-pointer ${
              selectedCategory === 'writing'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
            }`}
          >
            ✍️ 会写的字 (5~500字)
          </button>
          <button
            onClick={() => setSelectedCategory('dictation')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active shrink-0 cursor-pointer ${
              selectedCategory === 'dictation'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
            }`}
          >
            🎧 听写小能手
          </button>
          <button
            onClick={() => setSelectedCategory('mistake_clear')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active shrink-0 cursor-pointer ${
              selectedCategory === 'mistake_clear'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
            }`}
          >
            🛡️ 改错小标兵
          </button>
          <button
            onClick={() => setSelectedCategory('streak')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active shrink-0 cursor-pointer ${
              selectedCategory === 'streak'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
            }`}
          >
            🔥 天天来学习
          </button>
        </div>

        {/* 勋章网格卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 overflow-y-auto py-4 px-1 flex-1 scrollbar-none">
          {filteredBadges.map((badge) => {
            const { current, percent, isUnlocked } = getBadgeProgress(badge, stats);
            const unlockedDate = stats.unlockedBadges[badge.id];

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-[20px] border transition flex gap-3 relative overflow-hidden ${
                  isUnlocked
                    ? 'bg-white border-[#ba1a1a]/30 shadow-xs'
                    : 'bg-[#fdf1ee]/70 border-[#d8c2be]/60 opacity-70'
                }`}
              >
                {/* 徽章大图标 */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0 border ${
                    isUnlocked
                      ? 'bg-[#ffdad6] border-[#ffdad6]'
                      : 'bg-[#ebe0dd] border-[#d8c2be] grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                {/* 徽章详情 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-black text-sm truncate ${
                        isUnlocked ? 'text-[#231918]' : 'text-[#775651]'
                      }`}
                    >
                      {badge.title}
                    </span>
                    {isUnlocked ? (
                      <span className="text-[10px] text-[#2e7d32] bg-[#e8f5e9] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> 已获得
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#775651] bg-[#ebe0dd] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> 加油中
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#775651] mt-1 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>

                  {/* 进度条与解锁信息 */}
                  <div className="mt-2.5">
                    {isUnlocked ? (
                      <div className="flex items-center justify-between text-[10px] text-[#ba1a1a] font-bold">
                        <span>奖励: ⭐+{badge.rewardStars} 💧+{badge.rewardInk}</span>
                        {unlockedDate && (
                          <span className="text-[#775651] font-normal">
                            {unlockedDate} 获得
                          </span>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-[#775651] mb-1 font-medium">
                          <span>离拿奖状还差</span>
                          <span>
                            {current} / {badge.targetCount} ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#ebe0dd] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#ba1a1a] h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部按钮 */}
        <div className="pt-3.5 border-t border-[#d8c2be]/40 flex items-center justify-between shrink-0">
          <span className="text-xs text-[#775651]">
            💡 只要多写对生字、按时打卡，就能拿到更多新奖状啦！
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white font-bold text-xs shadow-xs cursor-pointer transition m3-press-active"
          >
            我知道啦
          </button>
        </div>
      </div>
    </div>
  );
};
