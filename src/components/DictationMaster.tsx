import React, { useState, useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';
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
  Undo2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { Lesson, DictationType, DictationResult } from '../types';
import { speechService } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';
import { analyzeCharacterStrokes } from '../utils/strokeAnalyzer';
import type { RawStroke, Point, StrokeDiagnosisResult } from '../utils/strokeAnalyzer';

interface DictationMasterProps {
  lesson: Lesson;
  onFinish?: (results: DictationResult[]) => void;
  onAddMistake?: (char: string) => void;
}

export const DictationMaster: React.FC<DictationMasterProps> = ({
  lesson,
  onFinish,
  onAddMistake,
}) => {
  const words = lesson.dictationWords;

  const [mode, setMode] = useState<DictationType>('screen'); // 默认屏幕沉浸写字模式
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatCount, setRepeatCount] = useState<1 | 2>(2);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(8);
  const [countdown, setCountdown] = useState<number>(8);
  const [isFinished, setIsFinished] = useState(false);

  // 记录每个词语的核对结果
  const [checkResults, setCheckResults] = useState<{ [word: string]: boolean }>({});

  const timerRef = useRef<any>(null);
  const currentItem = words[currentIndex];

  // 朗读当前词语（注意：绝不提前报出单个字的写法，只读词语和例句）
  const announceCurrentWord = (index: number) => {
    const item = words[index];
    if (!item) return;

    if (repeatCount === 1) {
      speechService.speak(`第 ${index + 1} 个词：${item.word}`);
    } else {
      speechService.speak(`第 ${index + 1} 个词：${item.word}。${item.sentence || ''}。${item.word}。`);
    }
  };

  // 纸上听写自动伴读计时器
  useEffect(() => {
    if (mode !== 'paper' || !isPlaying || isFinished) return;

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
            setIsFinished(true);
            speechService.speak('所有词语播报完毕！请家长和孩子一起核对批改。', 1.0);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, mode, intervalSeconds, repeatCount, isFinished]);

  const handleNextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCountdown(intervalSeconds);
      if (isPlaying) {
        announceCurrentWord(currentIndex + 1);
      }
    } else {
      setIsFinished(true);
      setIsPlaying(false);
      speechService.speak('听写已完成！我们来对对答案吧。');
    }
  };

  const handleRepeatCurrent = () => {
    announceCurrentWord(currentIndex);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFinished(false);
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
        onAddMistake?.(char);
      }
    }
  };

  if (!currentItem && !isFinished) {
    return (
      <div className="p-8 text-center text-[#534341]">
        本课暂未录入听写词语
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* M3 Card Container */}
      <div className="w-full bg-[#fff8f6] rounded-[28px] p-3.5 sm:p-5 border border-[#d8c2be]/60 shadow-xs flex flex-col items-center">
        {/* 顶部标题与 M3 Connected Segmented Button */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pb-2.5 mb-3 border-b border-[#d8c2be]/40 gap-2.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#231918] flex items-center gap-2">
              <span>课后同步听写</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-extrabold">
                {lesson.title}
              </span>
            </h2>
            <p className="text-[11px] text-[#775651] mt-0.5">
              共 {words.length} 个词语 · 不提示字形 · 写完再批改
            </p>
          </div>

          {/* M3 Segmented Button */}
          <div className="flex border border-[#857370]/40 rounded-full overflow-hidden p-0.5 bg-[#fdf1ee] shrink-0">
            <button
              onClick={() => {
                setMode('screen');
                handleRestart();
              }}
              className={`py-1.5 px-3 text-xs font-bold transition-all rounded-full flex items-center gap-1 cursor-pointer m3-press-active ${
                mode === 'screen'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'text-[#534341] hover:bg-[#fff8f6]'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>屏幕默写 📱</span>
            </button>
            <button
              onClick={() => {
                setMode('paper');
                handleRestart();
              }}
              className={`py-1.5 px-3 text-xs font-bold transition-all rounded-full flex items-center gap-1 cursor-pointer m3-press-active ${
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

        {/* 模式 1：屏幕手写默写 (不提前显示字、书写不打断、写完判笔顺与字对错) */}
        {mode === 'screen' && !isFinished && (
          <ScreenNonInterruptDictationPad
            key={currentItem.word}
            wordItem={currentItem}
            currentIndex={currentIndex}
            totalCount={words.length}
            onNextWord={handleNextWord}
            onPassWord={() => {
              handleToggleCheck(currentItem.word, true);
              handleNextWord();
            }}
            onFailWord={() => {
              handleToggleCheck(currentItem.word, false);
              handleNextWord();
            }}
          />
        )}

        {/* 模式 2：纸上伴读模式 UI */}
        {mode === 'paper' && !isFinished && (
          <div className="w-full flex flex-col items-center my-2">
            {/* 参数调优条 */}
            <div className="w-full bg-[#fdf1ee] p-3 rounded-[20px] border border-[#d8c2be]/60 flex flex-wrap items-center justify-between gap-3 text-xs text-[#231918] mb-5">
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

            {/* 纸上听写播报大卡片：绝不显示中文字，只显示拼音 */}
            <div className="w-full bg-[#fdf1ee] p-6 rounded-[24px] border border-[#d8c2be]/60 flex flex-col items-center">
              <div className="flex items-center gap-2 text-xs font-bold bg-[#ffdad6] text-[#410002] px-3.5 py-1 rounded-full mb-3">
                <span>第 {currentIndex + 1} / {words.length} 词</span>
              </div>

              {/* 仅显示拼音与声音，绝不显示汉字 */}
              <div className="my-2 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#ba1a1a] font-pinyin tracking-widest">
                  {currentItem.pinyin}
                </div>
                <div className="text-xs text-[#775651] mt-2">
                  请在听写本上写下这个词语，不要偷看哦 ✏️
                </div>
              </div>

              {/* 进度条 */}
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

              {/* M3 控制按钮 */}
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={handleRepeatCurrent}
                  className="w-11 h-11 rounded-full bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#ba1a1a] flex items-center justify-center shadow-xs transition m3-press-active cursor-pointer"
                  title="再读一次"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-2.5 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white font-bold text-sm shadow-xs flex items-center gap-2 transition m3-press-active cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>暂停</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>开始播放</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleNextWord}
                  className="w-11 h-11 rounded-full bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#231918] flex items-center justify-center shadow-xs transition m3-press-active cursor-pointer"
                  title="下一词"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 听写完成总结与对答案批改列表 */}
        {isFinished && (
          <div className="w-full bg-[#fdf1ee] p-5 rounded-[24px] border border-[#d8c2be]/60 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#d8c2be]/40">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-[#ba1a1a]" />
                <h3 className="font-bold text-[#231918] text-base">
                  听写结束！对照标准答案批改 📝
                </h3>
              </div>
              <button
                onClick={handleRestart}
                className="text-xs font-bold text-[#ba1a1a] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 重新听写
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

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleCheck(item.word, true)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer m3-press-active ${
                          status === true
                            ? 'bg-[#2e7d32] text-white font-bold'
                            : 'bg-[#fdf1ee] text-[#857370] hover:bg-[#e8f5e9] hover:text-[#2e7d32]'
                        }`}
                        title="正确"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => handleToggleCheck(item.word, false)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer m3-press-active ${
                          status === false
                            ? 'bg-[#ba1a1a] text-white font-bold'
                            : 'bg-[#fdf1ee] text-[#857370] hover:bg-[#ffdad6] hover:text-[#ba1a1a]'
                        }`}
                        title="错误"
                      >
                        <X className="w-4 h-4 stroke-[2.5]" />
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
    </div>
  );
};

// ============================================================================
// 屏幕听写子组件：不提前显字、书写不打断、写完再判字与笔顺
// ============================================================================
interface ScreenNonInterruptDictationPadProps {
  wordItem: { word: string; pinyin: string; sentence: string };
  currentIndex: number;
  totalCount: number;
  onNextWord: () => void;
  onPassWord: () => void;
  onFailWord: () => void;
}

const ScreenNonInterruptDictationPad: React.FC<ScreenNonInterruptDictationPadProps> = ({
  wordItem,
  currentIndex,
  totalCount,
  onPassWord,
  onFailWord,
}) => {
  const chars = wordItem.word.split('');
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const currentChar = chars[activeCharIndex];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawnStrokes, setDrawnStrokes] = useState<RawStroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<RawStroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [standardMedians, setStandardMedians] = useState<number[][][]>([]);
  const [strokeNames, setStrokeNames] = useState<string[]>([]);

  // 诊断结果：书写完成后才产生
  const [diagnosis, setDiagnosis] = useState<StrokeDiagnosisResult | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const CANVAS_SIZE = 260;

  // 预载当前待写字的骨架数据（用于后置判断笔顺和字形）
  useEffect(() => {
    if (!currentChar) return;
    setDrawnStrokes([]);
    setDiagnosis(null);
    setShowAnswer(false);

    // 播放题目音频：只读词语和拼音，不提前把字剧透
    speechService.speak(`请听写词语：${wordItem.word}。请写第 ${activeCharIndex + 1} 个字。`);

    HanziWriter.loadCharacterData(currentChar)
      .then((data: any) => {
        if (data && data.medians) {
          setStandardMedians(data.medians);
          setStrokeNames(data.strokeNames || []);
        }
      })
      .catch((err) => {
        console.warn('Load char data error:', err);
      });
  }, [currentChar, activeCharIndex, wordItem.word]);

  // 重绘画布上的墨迹
  const redraw = (strokes: RawStroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke) => {
      if (stroke.length === 0) return;
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 14;

      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  };

  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      time: Date.now(),
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (diagnosis) return; // 已判分后不可再画
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const p = getCanvasPoint(e);
    const newStroke = [p];
    setCurrentStroke(newStroke);
    redraw([...drawnStrokes, newStroke]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;
    const p = getCanvasPoint(e);
    const updated = [...currentStroke, p];
    setCurrentStroke(updated);
    redraw([...drawnStrokes, updated]);
  };

  const handlePointerUp = () => {
    if (!isDrawing || !currentStroke) return;
    setIsDrawing(false);
    if (currentStroke.length > 1) {
      const updated = [...drawnStrokes, currentStroke];
      setDrawnStrokes(updated);
      redraw(updated);
      soundEffects.playStrokeSuccess();
    }
    setCurrentStroke(null);
  };

  // 撤销一笔
  const handleUndo = () => {
    if (drawnStrokes.length === 0 || diagnosis) return;
    const updated = drawnStrokes.slice(0, -1);
    setDrawnStrokes(updated);
    redraw(updated);
  };

  // 清空
  const handleClear = () => {
    if (diagnosis) return;
    setDrawnStrokes([]);
    redraw([]);
  };

  // 核心：书写完成后一并判断字对不对、笔顺对不对
  const handleEvaluate = () => {
    if (drawnStrokes.length === 0) return;

    const result = analyzeCharacterStrokes(
      drawnStrokes,
      CANVAS_SIZE,
      CANVAS_SIZE,
      standardMedians,
      strokeNames
    );

    setDiagnosis(result);
    setShowAnswer(true);

    if (result.isCharacterCorrect && result.isOrderCorrect) {
      soundEffects.playCharacterComplete();
      confetti({ particleCount: 40, spread: 50 });
      speechService.speak(`太棒啦！「${currentChar}」字写对了，笔顺完全规范！`);
    } else if (result.isCharacterCorrect) {
      soundEffects.playStarReward();
      speechService.speak(`字写对了！不过有倒插笔哦，注意标准笔顺。`);
    } else {
      soundEffects.playStrokeMistake();
      speechService.speak(`这个字好像写错啦，这是「${currentChar}」字，来看看标准答案吧。`);
    }
  };

  // 进入词语的下一个字，或者完成该词
  const handleNextCharOrFinish = () => {
    const passed = diagnosis?.isCharacterCorrect ?? false;
    if (activeCharIndex < chars.length - 1) {
      setActiveCharIndex((prev) => prev + 1);
    } else {
      if (passed) {
        onPassWord();
      } else {
        onFailWord();
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center my-0.5">
      {/* 题头：仅展示拼音与题号，绝不提前显示字！ */}
      <div className="w-full text-center mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#fdf1ee] border border-[#d8c2be]/60 rounded-full text-xs font-bold text-[#ba1a1a] mb-1.5">
          <span>第 {currentIndex + 1} / {totalCount} 词</span>
          <span>·</span>
          <span>正在写第 {activeCharIndex + 1} 个字</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#ba1a1a] font-pinyin tracking-widest">
            {wordItem.pinyin}
          </span>
          <button
            onClick={() => speechService.speak(wordItem.word)}
            className="w-9 h-9 rounded-full bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#ba1a1a] flex items-center justify-center shadow-xs transition m3-press-active cursor-pointer"
            title="听发音"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* 词语字格槽位：只显示问号 [ ? ]，只有判分后才展示真字 */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {chars.map((c, i) => {
            const isCurrent = i === activeCharIndex;
            return (
              <div
                key={i}
                className={`w-10 h-10 rounded-[12px] flex items-center justify-center font-bold text-lg border transition-all ${
                  isCurrent
                    ? 'border-2 border-[#ba1a1a] bg-[#ffdad6] text-[#410002] shadow-xs scale-105'
                    : i < activeCharIndex
                    ? 'border-[#2e7d32] bg-[#e8f5e9] text-[#2e7d32]'
                    : 'border-[#d8c2be] bg-[#fdf1ee] text-[#857370]'
                }`}
              >
                {/* 核心要求：写之前绝对不显示字！ */}
                {i < activeCharIndex ? c : (isCurrent && showAnswer) ? c : '?'}
              </div>
            );
          })}
        </div>
      </div>

      {/* M3 田字格画布：书写过程中绝不打断 */}
      <div className="relative p-1.5 bg-[#fdf1ee] rounded-[26px] border border-[#d8c2be]/60 shadow-xs mb-2">
        <div className="tianzige-box w-[260px] h-[260px] relative select-none">
          <div className="mizige-diag-1" />
          <div className="mizige-diag-2" />
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-[260px] h-[260px] cursor-crosshair relative z-2 touch-none"
          />
        </div>

        {/* 诊断完成后：浮层展示标准字与评分对比 */}
        {diagnosis && (
          <div className="absolute inset-2 bg-white/95 rounded-[24px] p-4 flex flex-col items-center justify-center z-10 animate-in fade-in duration-200 text-center">
            {diagnosis.isCharacterCorrect ? (
              <CheckCircle2 className="w-12 h-12 text-[#2e7d32] mb-1 animate-bounce" />
            ) : (
              <AlertCircle className="w-12 h-12 text-[#ba1a1a] mb-1 animate-pulse" />
            )}

            <div className="text-base font-extrabold text-[#231918]">
              {diagnosis.isCharacterCorrect ? (diagnosis.isOrderCorrect ? '汉字与笔顺全对！' : '字写对了，笔顺有倒插笔') : '字写错啦'}
            </div>

            <div className="flex gap-1 my-1.5">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-xl ${i < diagnosis.stars ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                  ⭐
                </span>
              ))}
            </div>

            {/* 标准字对照展示 */}
            <div className="p-2 bg-[#fdf1ee] rounded-xl border border-[#d8c2be]/60 my-1 text-xs text-[#534341]">
              标准字：<span className="text-xl font-bold font-kaiti text-[#ba1a1a]">{currentChar}</span>
            </div>

            <p className="text-[11px] text-[#775651] max-w-xs mt-1">
              {diagnosis.summaryMessage}
            </p>
          </div>
        )}
      </div>

      {/* 底部 M3 按钮区 */}
      <div className="w-full max-w-xs flex flex-col gap-2 mt-2">
        {!diagnosis ? (
          <>
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={handleUndo}
                disabled={drawnStrokes.length === 0}
                className="flex-1 py-2 px-3 rounded-full border border-[#d8c2be] bg-[#fdf1ee] hover:bg-[#fff8f6] text-[#231918] text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed m3-press-active"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>撤销一笔</span>
              </button>

              <button
                onClick={handleClear}
                disabled={drawnStrokes.length === 0}
                className="flex-1 py-2 px-3 rounded-full border border-[#d8c2be] bg-[#fdf1ee] hover:bg-[#fff8f6] text-[#231918] text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed m3-press-active"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>清空重写</span>
              </button>
            </div>

            {/* 核心提交按钮：完整写完再判分，中途绝不打扰 */}
            <button
              onClick={handleEvaluate}
              disabled={drawnStrokes.length === 0}
              className="w-full py-3 px-4 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>我写好啦！交卷判分 🚀</span>
            </button>
          </>
        ) : (
          <button
            onClick={handleNextCharOrFinish}
            className="w-full py-3 px-4 rounded-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer"
          >
            <span>{activeCharIndex < chars.length - 1 ? '继续写下一个字 ➡️' : '查看词语批改结果 📝'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
