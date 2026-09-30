import React, { useState } from 'react';
import { X, Trash2, ArrowRight, BookOpen, Target, Sparkles, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import type { MistakeRecord } from '../types';
import { speechService } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';

interface ErrorBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  mistakes: string[];
  mistakeRecords?: { [char: string]: MistakeRecord };
  onSelectCharacter: (char: string) => void;
  onClearMistakes: () => void;
}

export const ErrorBookModal: React.FC<ErrorBookModalProps> = ({
  isOpen,
  onClose,
  mistakes,
  mistakeRecords = {},
  onSelectCharacter,
  onClearMistakes,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'need_review' | 'frequent'>('all');

  if (!isOpen) return null;

  // 艾宾浩斯与高频错字过滤
  const filteredMistakes = mistakes.filter((char) => {
    const record = mistakeRecords[char];
    if (selectedFilter === 'frequent') {
      return (record?.count || 1) >= 2;
    }
    if (selectedFilter === 'need_review') {
      // 待巩固：连续答对次数少于 2 次
      return (record?.consecutiveSuccess || 0) < 2;
    }
    return true;
  });

  const handleStartChallenge = () => {
    if (mistakes.length === 0) return;
    const targetChar = filteredMistakes[0] || mistakes[0];
    soundEffects.playStarReward();
    speechService.speak(`开启错题消除大作战！我们先来攻克「${targetChar}」字！`);
    onSelectCharacter(targetChar);
    onClose();
  };

  const handleConfirmClear = () => {
    soundEffects.playStrokeMistake();
    onClearMistakes();
    setShowClearConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#fff8f6] rounded-[28px] p-5 sm:p-6 max-w-xl w-full shadow-2xl border border-[#d8c2be]/60 animate-in fade-in duration-200 flex flex-col max-h-[92vh]">
        {/* 顶部标题与 48px 关闭按钮 */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#d8c2be]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-full bg-[#ffdad6] text-[#410002] flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5 text-[#ba1a1a]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#231918] text-lg flex items-center gap-2">
                <span>错题攻克本</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-bold">
                  {mistakes.length} 个字待消灭
                </span>
              </h3>
              <p className="text-[11px] text-[#775651]">
                遵循艾宾浩斯抗遗忘曲线 · 连续写对 2 次彻底消灭
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-[#fdf1ee] hover:bg-white text-[#775651] flex items-center justify-center transition m3-press-active cursor-pointer"
            title="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 核心激励横幅：一键错题消除大作战 */}
        {mistakes.length > 0 && (
          <div className="my-3 p-3.5 rounded-[20px] bg-gradient-to-r from-[#ffdad6]/80 via-[#fdf1ee] to-[#e8f5e9]/80 border border-[#ba1a1a]/30 flex items-center justify-between gap-3 shrink-0">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-[#ba1a1a]">
                <Target className="w-4 h-4 text-[#ba1a1a]" />
                <span>错题消除大作战 🎯</span>
              </div>
              <p className="text-[11px] text-[#775651] mt-0.5">
                智能推题，逐个攻坚弱项生字，夺取改错小标兵勋章！
              </p>
            </div>
            <button
              onClick={handleStartChallenge}
              className="px-4 py-2.5 min-h-[44px] rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white font-extrabold text-xs shadow-xs transition m3-press-active cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>立即攻克 🚀</span>
            </button>
          </div>
        )}

        {/* 艾宾浩斯抗遗忘筛选分类 */}
        {mistakes.length > 0 && (
          <div className="flex items-center gap-1.5 pb-2.5 border-b border-[#d8c2be]/30 shrink-0 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition m3-press-active cursor-pointer shrink-0 ${
                selectedFilter === 'all'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
              }`}
            >
              全部待练 ({mistakes.length})
            </button>
            <button
              onClick={() => setSelectedFilter('need_review')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition m3-press-active cursor-pointer shrink-0 flex items-center gap-1 ${
                selectedFilter === 'need_review'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>今日需巩固</span>
            </button>
            <button
              onClick={() => setSelectedFilter('frequent')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition m3-press-active cursor-pointer shrink-0 flex items-center gap-1 ${
                selectedFilter === 'frequent'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>高频易错</span>
            </button>
          </div>
        )}

        {/* 错字网格卡片 */}
        <div className="my-2.5 flex-1 overflow-y-auto scrollbar-none">
          {filteredMistakes.length === 0 ? (
            <div className="py-12 text-center text-[#775651] flex flex-col items-center">
              <span className="text-5xl mb-3">🎉</span>
              <p className="text-base font-extrabold text-[#231918]">太棒啦！这批生字已经全拿下！</p>
              <p className="text-xs text-[#775651] mt-1.5">笔顺工整、间架规范，继续保持哦！</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredMistakes.map((char) => {
                const record = mistakeRecords[char];
                const mistakeCount = record?.count || 1;
                const reasonTag = record?.reasons?.[0] || '倒插笔';
                const successStreak = record?.consecutiveSuccess || 0;

                return (
                  <div
                    key={char}
                    onClick={() => {
                      speechService.speak(`复习攻克生字：${char}`);
                      onSelectCharacter(char);
                      onClose();
                    }}
                    className="bg-[#fdf1ee] hover:bg-white transition p-3.5 rounded-[22px] border border-[#d8c2be]/60 hover:border-[#ba1a1a] flex flex-col justify-between cursor-pointer group shadow-2xs m3-press-active"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-bold">
                        练错 {mistakeCount} 次
                      </span>
                      <span className="text-[10px] text-[#775651] font-medium">
                        {successStreak > 0 ? `已连对 ${successStreak}/2` : '待消灭'}
                      </span>
                    </div>

                    <div className="my-2 text-center">
                      <span className="text-3xl font-black text-[#231918] font-kaiti group-hover:scale-110 group-hover:text-[#ba1a1a] transition inline-block">
                        {char}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] text-[#775651] truncate text-center bg-white/70 py-0.5 rounded-md border border-[#d8c2be]/40">
                        ⚠️ {reasonTag}
                      </div>

                      <div className="text-[11px] text-[#ba1a1a] font-bold flex items-center justify-center gap-1 mt-1 group-hover:underline">
                        <span>去攻克</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 底部操作区：长效防误触 */}
        <div className="flex items-center justify-between pt-3 border-t border-[#d8c2be]/40 shrink-0">
          {mistakes.length > 0 ? (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="min-h-[48px] px-3 text-xs text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-full font-bold flex items-center gap-1.5 transition cursor-pointer m3-press-active"
            >
              <Trash2 className="w-4 h-4" />
              <span>清空错题</span>
            </button>
          ) : (
            <span />
          )}

          <button
            onClick={onClose}
            className="min-h-[48px] px-7 py-2.5 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white font-bold text-xs shadow-xs transition m3-press-active cursor-pointer"
          >
            回教室练字
          </button>
        </div>

        {/* 儿童防误触二次确认弹窗 (Child-Safe Confirmation Modal) */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-[24px] p-5 max-w-sm w-full shadow-2xl border border-[#d8c2be] text-center">
              <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] mx-auto flex items-center justify-center text-2xl mb-2.5">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-[#231918] mb-1">
                要清空所有的错题吗？
              </h4>
              <p className="text-xs text-[#775651] mb-5 leading-relaxed">
                清空后，写错的字和倒插笔记录就会消失哦！建议多练练攻克它们再消灭。
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 min-h-[48px] py-2.5 rounded-full border border-[#d8c2be] bg-[#fdf1ee] text-[#231918] text-xs font-bold transition m3-press-active cursor-pointer"
                >
                  留着多练练
                </button>
                <button
                  onClick={handleConfirmClear}
                  className="flex-1 min-h-[48px] py-2.5 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white text-xs font-bold shadow-xs transition m3-press-active cursor-pointer"
                >
                  确认清空
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
