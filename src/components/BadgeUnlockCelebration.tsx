import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, X } from 'lucide-react';
import type { BadgeItem } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { speechService } from '../utils/speech';

interface BadgeUnlockCelebrationProps {
  badge: BadgeItem | null;
  onClose: () => void;
}

export const BadgeUnlockCelebration: React.FC<BadgeUnlockCelebrationProps> = ({ badge, onClose }) => {
  useEffect(() => {
    if (badge) {
      soundEffects.playCharacterComplete();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
      });
      speechService.speak(`太棒啦！你拿到了一张新奖状：${badge.title}！`, 1.0);
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-b from-amber-50 via-white to-orange-50 rounded-3xl p-8 max-w-sm w-full shadow-2xl border-4 border-amber-300 text-center relative animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-24 h-24 rounded-3xl bg-amber-100 mx-auto flex items-center justify-center text-5xl mb-4 border-2 border-amber-300 shadow-md animate-bounce">
          {badge.icon}
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5" /> 拿到新奖状啦 🎉
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
          {badge.title}
        </h3>

        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          {badge.description}
        </p>

        {/* 奖励卡片 */}
        <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-200 mb-6 flex items-center justify-around shadow-2xs">
          <div className="flex items-center gap-1.5 font-black text-amber-600 text-sm">
            <span>⭐</span>
            <span>+{badge.rewardStars} 星星</span>
          </div>
          <div className="h-4 w-px bg-amber-200" />
          <div className="flex items-center gap-1.5 font-black text-sky-600 text-sm">
            <span>💧</span>
            <span>+{badge.rewardInk} 墨滴</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow cursor-pointer transition active:scale-95"
        >
          好耶！放进奖状馆 🏅
        </button>
      </div>
    </div>
  );
};
