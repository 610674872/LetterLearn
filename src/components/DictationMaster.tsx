import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Check,
  X,
  FileText,
  Tablet,
  Settings,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import type { Lesson, DictationType, DictationResult } from '../types';
import { speechService } from '../utils/speech';
import { DictationExamModal } from './DictationExamModal';

interface DictationMasterProps {
  lesson: Lesson;
  onFinish?: (results: DictationResult[]) => void;
  onAddMistake?: (char: string, reason?: string) => void;
  onFinishExam?: (score: number, stars: number, failedChars: string[]) => void;
}

export const DictationMaster: React.FC<DictationMasterProps> = ({
  lesson,
  onFinish,
  onAddMistake,
  onFinishExam,
}) => {
  const words = lesson.dictationWords;

  const [mode, setMode] = useState<DictationType>('screen'); // 'screen' = 正式全屏测验入口, 'paper' = 纸上伴读
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  // 纸上伴读模式专属状态
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatCount, setRepeatCount] = useState<1 | 2>(2);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(8);
  const [countdown, setCountdown] = useState<number>(8);
  const [isPaperFinished, setIsPaperFinished] = useState(false);
  const [checkResults, setCheckResults] = useState<{ [word: string]: boolean }>({});

  const timerRef = useRef<any>(null);
  const currentItem = words[currentIndex];

  // 纸上听写朗读
  const announceCurrentWord = (index: number) => {
    const item = words[index];
    if (!item) return;

    if (repeatCount === 1) {
      speechService.speak(`第 ${index + 1} 个词：${item.word}`);
    } else {
      speechService.speak(`第 ${index + 1} 个词：${item.word}。${item.sentence || ''}。${item.word}。`);
    }
  };

  // 纸上伴读计时逻辑
  useEffect(() => {
    if (mode !== 'paper' || !isPlaying || isPaperFinished) return;

    announceCurrentWord(currentIndex);
    setCountdown(intervalSeconds);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (currentIndex < words.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            return intervalSeconds;
          } else {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            setIsPaperFinished(true);
            speechService.speak('所有词语播报完毕！请家长和孩子一起对照标准答案批改。', 1.0);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, mode, intervalSeconds, repeatCount, isPaperFinished, words.length]);

  const handleNextPaperWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCountdown(intervalSeconds);
      if (isPlaying) {
        announceCurrentWord(currentIndex + 1);
      }
    } else {
      setIsPaperFinished(true);
      setIsPlaying(false);
      speechService.speak('纸上听写已播报完毕！我们来对对答案吧。');
    }
  };

  const handleRestartPaper = () => {
    setCurrentIndex(0);
    setIsPaperFinished(false);
    setIsPlaying(false);
    setCountdown(intervalSeconds);
    setCheckResults({});
  };

  const handleToggleCheck = (word: string, passed: boolean) => {
    setCheckResults((prev) => ({
      ...prev,
      [word]: passed,
    }));

    if (!passed) {
      for (const char of word) {
        onAddMistake?.(char, '纸上听写批改失误');
      }
    }
  };

  if (!currentItem && !isPaperFinished && words.length === 0) {
    return (
      <div className="p-8 text-center text-[#534341]">
        本课暂未录入听写词语
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* M3 Card Container */}
      <div className="w-full bg-[#fff8f6] rounded-[28px] p-4 sm:p-6 border border-[#d8c2be]/60 shadow-xs flex flex-col items-center">
        {/* 顶部标题与模式切换 */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pb-3 mb-4 border-b border-[#d8c2be]/40 gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#231918] flex items-center gap-2">
              <span>部编版同步听写</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-extrabold">
                {lesson.title}
              </span>
            </h2>
            <p className="text-[11px] text-[#775651] mt-0.5">
              共 {words.length} 个词语 · 严格考标 · 规范书写
            </p>
          </div>

          {/* M3 Segmented Button */}
          <div className="flex border border-[#857370]/40 rounded-full overflow-hidden p-0.5 bg-[#fdf1ee] shrink-0">
            <button
              onClick={() => {
                setMode('screen');
                setIsPlaying(false);
              }}
              className={`py-1.5 px-3.5 text-xs font-bold transition-all rounded-full flex items-center gap-1.5 cursor-pointer m3-press-active ${
                mode === 'screen'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'text-[#534341] hover:bg-[#fff8f6]'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>全屏测验 📱</span>
            </button>
            <button
              onClick={() => {
                setMode('paper');
                handleRestartPaper();
              }}
              className={`py-1.5 px-3.5 text-xs font-bold transition-all rounded-full flex items-center gap-1.5 cursor-pointer m3-press-active ${
                mode === 'paper'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'text-[#534341] hover:bg-[#fff8f6]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>纸上伴读 📝</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 方案 A：正式全屏听写测验推荐入口卡片 */}
        {/* ================================================================= */}
        {mode === 'screen' && (
          <div className="w-full flex flex-col items-center py-2 animate-in fade-in duration-200">
            <div className="w-full bg-[#fdf1ee] rounded-[24px] p-5 sm:p-6 border border-[#d8c2be]/60 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-3 shadow-xs">
                <Sparkles className="w-8 h-8 fill-current" />
              </div>

              <h3 className="text-lg font-extrabold text-[#231918] mb-1">
                开启课后听写正式测验
              </h3>
              <p className="text-xs text-[#775651] max-w-md leading-relaxed mb-4">
                进入独立全屏考场，排除主界面干扰。田字格根据单字/双字动态匹配格数，作答中途零打扰，交卷后全卷诊断打分！
              </p>

              {/* 核心亮点标签 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-lg mb-5 text-left">
                <div className="bg-white/80 p-2.5 rounded-xl border border-[#d8c2be]/50 text-xs">
                  <div className="font-bold text-[#ba1a1a] flex items-center gap-1">
                    <span>🌟 独立全屏</span>
                  </div>
                  <div className="text-[11px] text-[#775651] mt-0.5">
                    隐藏顶部底栏，沉浸零干扰
                  </div>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-[#d8c2be]/50 text-xs">
                  <div className="font-bold text-[#ba1a1a] flex items-center gap-1">
                    <span>📐 多格排版</span>
                  </div>
                  <div className="text-[11px] text-[#775651] mt-0.5">
                    单字单格、双字并排双格
                  </div>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-[#d8c2be]/50 text-xs">
                  <div className="font-bold text-[#ba1a1a] flex items-center gap-1">
                    <span>🏆 考后判分</span>
                  </div>
                  <div className="text-[11px] text-[#775651] mt-0.5">
                    答完交卷，生成100分成绩单
                  </div>
                </div>
              </div>

              {/* 本课听写词语预览胶囊 */}
              <div className="w-full max-w-lg bg-white/60 p-3 rounded-2xl border border-[#d8c2be]/40 mb-5">
                <div className="text-[11px] font-bold text-[#775651] mb-2 flex items-center justify-between">
                  <span>本课待测词语清单:</span>
                  <span>{words.length} 个词</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {words.map((w, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#fdf1ee] border border-[#d8c2be]/50 text-xs font-bold text-[#231918] font-kaiti"
                    >
                      {w.word}
                    </span>
                  ))}
                </div>
              </div>

              {/* 大尺寸主操作 CTA 按钮 (触控热区 >= 56px) */}
              <button
                onClick={() => setIsExamModalOpen(true)}
                className="w-full max-w-md min-h-[56px] rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white text-base font-bold shadow-md flex items-center justify-center gap-2 transition m3-press-active cursor-pointer"
              >
                <Sparkles className="w-5 h-5 fill-current" />
                <span>进入全屏听写考场 🚀</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 方案 B：纸上伴读模式 (保护视力 · 实体纸笔书写) */}
        {/* ================================================================= */}
        {mode === 'paper' && !isPaperFinished && (
          <div className="w-full flex flex-col items-center my-1 animate-in fade-in duration-200">
            {/* 参数调优条 */}
            <div className="w-full bg-[#fdf1ee] p-3 rounded-[20px] border border-[#d8c2be]/60 flex flex-wrap items-center justify-between gap-3 text-xs text-[#231918] mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#ba1a1a]" />
                <span className="font-bold">伴读设置:</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <span>读几遍:</span>
                  <select
                    value={repeatCount}
                    onChange={(e) => setRepeatCount(Number(e.target.value) as 1 | 2)}
                    className="bg-white border border-[#d8c2be] rounded-lg px-2 py-1 text-xs font-bold"
                  >
                    <option value={1}>读 1 遍</option>
                    <option value={2}>读 2 遍带例句</option>
                  </select>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <span>等待时间:</span>
                  <select
                    value={intervalSeconds}
                    onChange={(e) => {
                      const sec = Number(e.target.value);
                      setIntervalSeconds(sec);
                      setCountdown(sec);
                    }}
                    className="bg-white border border-[#d8c2be] rounded-lg px-2 py-1 text-xs font-bold"
                  >
                    <option value={6}>6 秒 (熟练)</option>
                    <option value={8}>8 秒 (适中)</option>
                    <option value={12}>12 秒 (宽松)</option>
                  </select>
                </label>
              </div>
            </div>

            {/* 纸上听写大卡片：绝不显示中文字，只显示拼音 */}
            <div className="w-full bg-[#fdf1ee] p-6 rounded-[24px] border border-[#d8c2be]/60 flex flex-col items-center">
              <div className="flex items-center gap-2 text-xs font-bold bg-[#ffdad6] text-[#410002] px-3.5 py-1 rounded-full mb-3">
                <span>第 {currentIndex + 1} / {words.length} 词</span>
              </div>

              <div className="my-2 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#ba1a1a] font-pinyin tracking-widest">
                  {currentItem.pinyin}
                </div>
                <div className="text-xs text-[#775651] mt-2">
                  请在听写本上认真书写这个词语 ✏️
                </div>
              </div>

              {/* 倒计时条 */}
              <div className="w-full my-4 flex flex-col items-center">
                <div className="text-xs text-[#775651] font-bold mb-1">
                  倒计时: {countdown} 秒
                </div>
                <div className="w-full bg-[#ffdad6]/60 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ba1a1a] h-full transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${(countdown / intervalSeconds) * 100}%` }}
                  />
                </div>
              </div>

              {/* 控制按钮区 */}
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={() => announceCurrentWord(currentIndex)}
                  className="w-12 h-12 rounded-full bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#ba1a1a] flex items-center justify-center shadow-xs transition m3-press-active cursor-pointer"
                  title="再读一次"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-3 min-h-[48px] rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white font-bold text-sm shadow-xs flex items-center gap-2 transition m3-press-active cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>暂停</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>开始播放</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleNextPaperWord}
                  className="w-12 h-12 rounded-full bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#231918] flex items-center justify-center shadow-xs transition m3-press-active cursor-pointer"
                  title="下一词"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 纸上伴读完成总结与批改清单 */}
        {mode === 'paper' && isPaperFinished && (
          <div className="w-full bg-[#fdf1ee] p-5 rounded-[24px] border border-[#d8c2be]/60 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#d8c2be]/40">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-[#ba1a1a]" />
                <h3 className="font-bold text-[#231918] text-base">
                  听写播报结束！对照标准答案批改 📝
                </h3>
              </div>
              <button
                onClick={handleRestartPaper}
                className="text-xs font-bold text-[#ba1a1a] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 重新播报
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
              {words.map((item, idx) => {
                const status = checkResults[item.word];
                return (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-[16px] border border-[#d8c2be]/50 flex items-center justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-lg text-[#231918] font-kaiti">
                          {item.word}
                        </span>
                        <span className="text-xs text-[#775651] font-pinyin">
                          [{item.pinyin}]
                        </span>
                      </div>
                      {item.sentence && (
                        <p className="text-[11px] text-[#857370] mt-0.5">
                          “{item.sentence}”
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleCheck(item.word, true)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition cursor-pointer m3-press-active ${
                          status === true
                            ? 'bg-[#2e7d32] text-white font-bold shadow-xs'
                            : 'bg-[#fdf1ee] text-[#857370] hover:bg-[#e8f5e9] hover:text-[#2e7d32]'
                        }`}
                        title="正确"
                      >
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => handleToggleCheck(item.word, false)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition cursor-pointer m3-press-active ${
                          status === false
                            ? 'bg-[#ba1a1a] text-white font-bold shadow-xs'
                            : 'bg-[#fdf1ee] text-[#857370] hover:bg-[#ffdad6] hover:text-[#ba1a1a]'
                        }`}
                        title="错误"
                      >
                        <X className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => {
                  confetti({ particleCount: 60, spread: 50 });
                  const results: DictationResult[] = words.map((w) => ({
                    word: w.word,
                    pinyin: w.pinyin,
                    passed: checkResults[w.word] ?? true,
                  }));
                  onFinish?.(results);
                }}
                className="px-8 py-3 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white font-bold text-sm shadow-xs transition m3-press-active cursor-pointer"
              >
                批改完成！存入我的生字本 ✨
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* 独立全屏测验模态弹窗 (满足：单独页面 · 多格排版 · 考后判分) */}
      {/* =================================================================== */}
      <DictationExamModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        lesson={lesson}
        onAddMistake={onAddMistake}
        onFinishExam={(score, stars, failedChars) => {
          onFinishExam?.(score, stars, failedChars);
          // 同步生成 DictationResult 汇总
          const examSummaryResults: DictationResult[] = words.map((w) => ({
            word: w.word,
            pinyin: w.pinyin,
            passed: !w.word.split('').some((c) => failedChars.includes(c)),
          }));
          onFinish?.(examSummaryResults);
        }}
      />
    </div>
  );
};
