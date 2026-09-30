import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Undo2,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import type { Lesson, CharacterItem } from '../types';
import { speechService } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';
import { analyzeCharacterStrokes, loadCharacterDataWithCache } from '../utils/strokeAnalyzer';
import type { RawStroke, Point, StrokeDiagnosisResult } from '../utils/strokeAnalyzer';

interface PinyinWritingQuizProps {
  lesson: Lesson;
  onFinish?: (score: number) => void;
  onAddMistake?: (char: string) => void;
}

export const PinyinWritingQuiz: React.FC<PinyinWritingQuizProps> = ({
  lesson,
  onFinish,
  onAddMistake,
}) => {
  // 提取当前课文中属于写字表或核心生字的项目
  const quizItems: CharacterItem[] = lesson.characters.filter(
    (c) => c.isWritingTarget || c.words.length > 0
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [diagnosis, setDiagnosis] = useState<StrokeDiagnosisResult | null>(null);
  const [standardMedians, setStandardMedians] = useState<number[][][]>([]);
  const [strokeNames, setStrokeNames] = useState<string[]>([]);

  // 画布书写状态
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawnStrokes, setDrawnStrokes] = useState<RawStroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<RawStroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const CANVAS_SIZE = 260;
  const currentItem = quizItems[currentIndex];
  const currentWordObj = currentItem?.words[0];

  // 重置画布并重载当前字数据
  useEffect(() => {
    if (!currentItem) return;
    setDrawnStrokes([]);
    setCurrentStroke(null);
    setDiagnosis(null);
    setShowHint(false);

    // 播放题目拼音：简洁友好，只读拼音与词语，绝不提前剧透单字字形
    speechService.speak(`看拼音写生字：${currentItem.pinyin}。${currentWordObj ? currentWordObj.word : ''}`);

    loadCharacterDataWithCache(currentItem.char)
      .then((data: any) => {
        if (data && data.medians) {
          setStandardMedians(data.medians);
          setStrokeNames(data.strokeNames || []);
        }
      })
      .catch((err) => {
        console.warn('Load char data error:', err);
      });
  }, [currentIndex, currentItem?.char]);

  // 重绘笔迹
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
    if (diagnosis) return; // 判分后不可再写
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

  const handleUndo = () => {
    if (drawnStrokes.length === 0 || diagnosis) return;
    const updated = drawnStrokes.slice(0, -1);
    setDrawnStrokes(updated);
    redraw(updated);
  };

  const handleClear = () => {
    if (diagnosis) return;
    setDrawnStrokes([]);
    redraw([]);
  };

  // 核心：完整书写后判分，绝不在书写中途打断
  const handleEvaluate = () => {
    if (drawnStrokes.length === 0 || !currentItem) return;

    const result = analyzeCharacterStrokes(
      drawnStrokes,
      CANVAS_SIZE,
      CANVAS_SIZE,
      standardMedians,
      strokeNames
    );

    setDiagnosis(result);

    if (result.isCharacterCorrect && result.isOrderCorrect) {
      soundEffects.playCharacterComplete();
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      speechService.speak(`太棒啦！「${currentItem.char}」字全写对啦！`);
      setCompletedList((prev) => [...new Set([...prev, currentItem.char])]);
    } else if (result.isCharacterCorrect) {
      soundEffects.playStarReward();
      speechService.speak(`字写对啦！注意笔顺不要倒插笔哦~`);
      setCompletedList((prev) => [...new Set([...prev, currentItem.char])]);
    } else {
      soundEffects.playStrokeMistake();
      speechService.speak(`还差一点点，看看标准字怎么写吧！`);
      onAddMistake?.(currentItem.char);
    }
  };

  const handleRetry = () => {
    setDiagnosis(null);
    setDrawnStrokes([]);
    redraw([]);
  };

  const handleNext = () => {
    if (currentIndex < quizItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish?.(completedList.length);
    }
  };

  const handlePronounce = () => {
    if (!currentItem) return;
    speechService.speak(`${currentItem.pinyin}，${currentWordObj ? currentWordObj.word : ''}。${currentWordObj?.sentence || ''}`);
  };

  const handleShowHint = () => {
    setShowHint(true);
    speechService.speak(`提示：部首是「${currentItem.radical}」，总共有 ${currentItem.strokeCount} 画`);
  };

  if (!currentItem) {
    return (
      <div className="p-8 text-center text-[#534341]">
        该课文暂未设置测验字词
      </div>
    );
  }

  // 语境句子：绝不提前把目标字泄露，用 ___ 替换
  const displaySentence = currentWordObj?.sentence
    ? currentWordObj.sentence.split(currentItem.char).join('___')
    : null;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* M3 Card Container */}
      <div className="w-full bg-[#fff8f6] rounded-[28px] p-4 sm:p-6 border border-[#d8c2be]/60 shadow-xs flex flex-col items-center">
        {/* 顶部标题与进度指示 */}
        <div className="w-full flex items-center justify-between pb-3.5 mb-4 border-b border-[#d8c2be]/40">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#231918] flex items-center gap-2">
              <span>看拼音写生字</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-extrabold">
                {lesson.title}
              </span>
            </h2>
            <p className="text-[11px] text-[#775651] mt-0.5">
              读拼音 · 不提前提示字形 · 写完再批改
            </p>
          </div>

          <div className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-3.5 py-1 rounded-full shrink-0">
            第 {currentIndex + 1} / {quizItems.length} 题
          </div>
        </div>

        {/* 题目展示区：大拼音与语境句子（绝不提前出现目标字） */}
        <div className="bg-[#fdf1ee] w-full p-4 rounded-[24px] border border-[#d8c2be]/60 text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#ba1a1a] font-pinyin tracking-widest">
              {currentItem.pinyin}
            </span>
            <button
              onClick={handlePronounce}
              className="w-10 h-10 rounded-full bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#ba1a1a] flex items-center justify-center shadow-xs transition m3-press-active cursor-pointer"
              title="听发音"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* 语境句子填空提示：遮住目标字 */}
          {currentWordObj && (
            <div className="mt-3 text-[#231918] text-sm font-medium">
              <span>词语：</span>
              <span className="font-bold text-[#ba1a1a] mx-1 text-base">
                [ {diagnosis ? currentItem.char : '?'} ] {currentWordObj.word.slice(1)}
              </span>
              {displaySentence && (
                <span className="text-xs text-[#775651] block mt-1">
                  “{displaySentence}”
                </span>
              )}
            </div>
          )}

          {/* 提示展开 */}
          {showHint && !diagnosis && (
            <div className="mt-2 text-xs font-bold text-[#ba1a1a] bg-[#ffdad6]/60 py-1 px-3 rounded-full inline-block animate-in fade-in duration-150">
              💡 部首是「{currentItem.radical}」，总共 {currentItem.strokeCount} 画
            </div>
          )}
        </div>

        {/* M3 田字格画布：书写过程中绝不打断 */}
        <div className="relative p-2 bg-[#fdf1ee] rounded-[28px] border border-[#d8c2be]/60 shadow-xs mb-3">
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

          {/* 判分后结果浮层：展示标准字对比与评语 */}
          {diagnosis && (
            <div className="absolute inset-2 bg-white/95 rounded-[24px] p-4 flex flex-col items-center justify-center z-10 animate-in fade-in duration-200 text-center">
              {diagnosis.isCharacterCorrect ? (
                <CheckCircle2 className="w-12 h-12 text-[#2e7d32] mb-1 animate-bounce" />
              ) : (
                <AlertCircle className="w-12 h-12 text-[#ba1a1a] mb-1 animate-pulse" />
              )}

              <div className="text-base font-extrabold text-[#231918]">
                {diagnosis.isCharacterCorrect
                  ? diagnosis.isOrderCorrect
                    ? '全写对啦，笔顺很端正！'
                    : '字写对啦，注意笔顺！'
                  : '还差一点点，加油！'}
              </div>

              <div className="flex gap-1 my-1.5">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < diagnosis.stars ? 'opacity-100' : 'opacity-20 grayscale'}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* 标准字对照展示 */}
              <div className="p-2 bg-[#fdf1ee] rounded-xl border border-[#d8c2be]/60 my-1 text-xs text-[#534341]">
                标准字：<span className="text-xl font-bold font-kaiti text-[#ba1a1a]">{currentItem.char}</span>
              </div>

              <p className="text-[11px] text-[#775651] max-w-xs mt-1">
                {diagnosis.summaryMessage}
              </p>
            </div>
          )}
        </div>

        {/* 底部 M3 按钮区 */}
        <div className="w-full max-w-xs flex flex-col gap-2 mt-1">
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

                {!showHint && (
                  <button
                    onClick={handleShowHint}
                    className="py-2 px-3 rounded-full border border-[#d8c2be] bg-[#fdf1ee] hover:bg-[#fff8f6] text-[#775651] text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer m3-press-active"
                    title="看提示"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>提示</span>
                  </button>
                )}
              </div>

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
            <div className="flex items-center gap-2 w-full">
              {!diagnosis.isCharacterCorrect && (
                <button
                  onClick={handleRetry}
                  className="flex-1 py-3 px-4 rounded-full border border-[#d8c2be] bg-white hover:bg-[#fff8f6] text-[#231918] text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>再试一次 ✍️</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className={`py-3 px-4 rounded-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer ${
                  diagnosis.isCharacterCorrect ? 'w-full' : 'flex-1'
                }`}
              >
                <span>{currentIndex < quizItems.length - 1 ? '下一题 ➡️' : '看总成绩 🏆'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
