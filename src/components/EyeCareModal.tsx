import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { X, Play, Pause, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { speechService } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';

interface EyeCareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardEyeCareStar?: () => void;
}

export const EyeCareModal: React.FC<EyeCareModalProps> = ({
  isOpen,
  onClose,
  onRewardEyeCareStar,
}) => {
  const TOTAL_SECONDS = 20;
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<any>(null);

  // 护眼动作分段指导（每 6~7 秒自动切换一个引导动作）
  const steps = [
    { text: '眨眨眼放松：用力闭上眼，再轻轻眨眨眼 5 次 👀', icon: '🦖' },
    { text: '眼珠转转圈：顺时针转一圈，逆时针转一圈 🔄', icon: '🌳' },
    { text: '远眺深呼吸：看向窗外最远处的绿色大树，慢慢深呼吸 🍃', icon: '✨' },
  ];

  const currentStepIndex = Math.min(
    steps.length - 1,
    Math.floor((TOTAL_SECONDS - secondsLeft) / 7)
  );

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(TOTAL_SECONDS);
      setIsRunning(true);
      setIsFinished(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    speechService.speak(
      '护眼时间到啦！让我们和小恐龙一起放松双眼，看向远方吧！',
      1.0
    );
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isRunning || isFinished) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setIsFinished(true);
          soundEffects.playCharacterComplete();
          confetti({ particleCount: 70, spread: 60 });
          speechService.speak('太棒啦！小恐龙夸你的小眼睛变得格外明亮清澈！');
          onRewardEyeCareStar?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isRunning, isFinished]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#fff8f6] rounded-[28px] p-5 sm:p-6 max-w-md w-full shadow-2xl border border-[#d8c2be]/60 text-center animate-in fade-in duration-200 flex flex-col items-center">
        {/* 顶部控制与 48px 关闭按钮 */}
        <div className="w-full flex items-center justify-between pb-2 border-b border-[#d8c2be]/40">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#2e7d32]">
            <Sparkles className="w-4 h-4 text-[#2e7d32]" />
            <span>20分钟视力关爱</span>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-[#fdf1ee] hover:bg-white text-[#775651] flex items-center justify-center transition m3-press-active cursor-pointer"
            title="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 动效中心区：深呼吸缩放圆环与小恐龙 */}
        <div className="relative my-4 flex items-center justify-center">
          {/* 呼吸脉动光圈 */}
          <div
            className={`w-36 h-36 rounded-full bg-[#e8f5e9] border-4 border-[#a5d6a7] flex items-center justify-center transition-all duration-1000 ${
              isRunning ? 'scale-110 shadow-lg' : 'scale-100 shadow-xs'
            }`}
          >
            <div className="text-5xl animate-bounce">
              {steps[currentStepIndex].icon}
            </div>
          </div>

          {/* 倒计时数字徽标 */}
          <div className="absolute -bottom-2 px-3 py-1 bg-white border border-[#2e7d32] text-[#2e7d32] rounded-full text-xs font-extrabold shadow-xs">
            {isFinished ? '已完成 ✨' : `休息倒计时: ${secondsLeft} 秒`}
          </div>
        </div>

        <h3 className="text-lg font-black text-[#231918] mb-1">
          {isFinished ? '双眼放松完毕！🌿' : '和小恐龙一起做眼保健操 🦖'}
        </h3>

        {/* 当前动作指导提示卡 */}
        <div className="w-full my-3 p-3.5 bg-[#fdf1ee] rounded-[22px] border border-[#d8c2be]/60 text-xs text-[#231918] flex items-center justify-center min-h-[56px] shadow-2xs">
          <span className="font-bold leading-relaxed text-[#2e7d32]">
            {steps[currentStepIndex].text}
          </span>
        </div>

        {/* 倒计时总进度条 */}
        <div className="w-full bg-[#ffdad6]/60 h-2.5 rounded-full overflow-hidden mb-5">
          <div
            className="bg-[#2e7d32] h-full transition-all duration-1000 ease-linear rounded-full"
            style={{
              width: `${((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100}%`,
            }}
          />
        </div>

        {/* 控制按键区 (触控热区 >= 48px) */}
        {!isFinished ? (
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 min-h-[48px] py-3 rounded-full border border-[#d8c2be] bg-[#fdf1ee] hover:bg-white text-[#231918] text-xs font-bold flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>暂停</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>继续跟练</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setSecondsLeft(TOTAL_SECONDS);
                setIsRunning(true);
              }}
              className="min-h-[48px] px-4 rounded-full border border-[#d8c2be] bg-[#fdf1ee] hover:bg-white text-[#534341] text-xs font-bold flex items-center justify-center gap-1 transition m3-press-active cursor-pointer"
              title="重新倒计时"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="flex-1 min-h-[48px] py-3 rounded-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-xs font-bold shadow-xs transition m3-press-active cursor-pointer"
            >
              我已放松好啦
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="w-full min-h-[48px] py-3 rounded-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-extrabold text-sm shadow-xs cursor-pointer transition m3-press-active flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>眼睛舒服啦，回教室练字！✨</span>
          </button>
        )}
      </div>
    </div>
  );
};
