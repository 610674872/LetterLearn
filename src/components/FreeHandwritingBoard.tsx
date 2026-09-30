import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Undo2,
  Play,
  Sparkles,
  HelpCircle
} from 'lucide-react';

import type { CharacterItem } from '../types';
import { analyzeCharacterStrokes } from '../utils/strokeAnalyzer';
import type { RawStroke, Point, StrokeDiagnosisResult } from '../utils/strokeAnalyzer';

import { speechService } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';

interface FreeHandwritingBoardProps {
  character: CharacterItem;
  standardMedians: number[][][];
  onCompleted?: (char: string, stars: number) => void;
}

export const FreeHandwritingBoard: React.FC<FreeHandwritingBoardProps> = ({
  character,
  standardMedians,
  onCompleted,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [drawnStrokes, setDrawnStrokes] = useState<RawStroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<RawStroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<StrokeDiagnosisResult | null>(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayStep, setReplayStep] = useState<number>(-1);

  const CANVAS_SIZE = 280;

  // 重置画布并重绘
  const redrawCanvas = (
    strokes: RawStroke[],
    highlightStrokeIndex?: number,
    colorOverride?: string
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke, strokeIdx) => {
      if (stroke.length === 0) return;

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 笔画高亮或着色
      if (highlightStrokeIndex !== undefined && strokeIdx === highlightStrokeIndex) {
        ctx.strokeStyle = colorOverride || '#ef4444';
        ctx.lineWidth = 20;
      } else {
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 16;
      }

      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        // 二次贝塞尔平滑
        const prev = stroke[i - 1];
        const curr = stroke[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      }
      ctx.stroke();

      // 在笔画起笔处画一个微小数字角标，标注这是孩子写的第几画
      if (stroke.length > 0 && diagnosis) {
        const startPoint = stroke[0];
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${strokeIdx + 1}`, startPoint.x, startPoint.y);
      }
    });
  };

  // 生字切换时重置
  useEffect(() => {
    setDrawnStrokes([]);
    setCurrentStroke(null);
    setDiagnosis(null);
    setIsReplaying(false);
    setReplayStep(-1);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [character.char]);

  // 当笔画更新时重绘
  useEffect(() => {
    if (!isReplaying) {
      redrawCanvas(drawnStrokes);
    }
  }, [drawnStrokes, isReplaying]);

  // 手写交互事件
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (diagnosis || isReplaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const startPoint: Point = { x, y, time: Date.now() };
    setIsDrawing(true);
    setCurrentStroke([startPoint]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStroke = [...currentStroke, { x, y, time: Date.now() }];
    setCurrentStroke(newStroke);

    // 实时预览当前画
    redrawCanvas([...drawnStrokes, newStroke]);
  };

  const handlePointerUp = () => {
    if (!isDrawing || !currentStroke) return;
    setIsDrawing(false);

    if (currentStroke.length >= 2) {
      const updated = [...drawnStrokes, currentStroke];
      setDrawnStrokes(updated);
      soundEffects.playStrokeSuccess();
    }
    setCurrentStroke(null);
  };

  // 撤销上一笔
  const handleUndo = () => {
    if (drawnStrokes.length === 0 || diagnosis) return;
    setDrawnStrokes((prev) => prev.slice(0, -1));
  };

  // 清空重写
  const handleClear = () => {
    setDrawnStrokes([]);
    setDiagnosis(null);
    setIsReplaying(false);
    setReplayStep(-1);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // 提交并后置诊断笔顺
  const handleSubmitEvaluation = () => {
    if (drawnStrokes.length === 0) return;

    const result = analyzeCharacterStrokes(
      drawnStrokes,
      CANVAS_SIZE,
      CANVAS_SIZE,
      standardMedians,
      character.strokeNames || []
    );

    setDiagnosis(result);

    if (result.stars === 3) {
      soundEffects.playCharacterComplete();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      speechService.speak(`太棒啦！笔顺全对，给你三颗星！`);
    } else if (result.stars === 2) {
      soundEffects.playStarReward();
      speechService.speak(result.summaryMessage);
    } else {
      soundEffects.playStrokeMistake();
      speechService.speak(`有倒插笔或笔画写反了哦，来看看怎么改吧！`);
    }

    onCompleted?.(character.char, result.stars);
  };

  // 逐笔回放孩子刚才的书写顺序
  const handleReplayMyStrokes = () => {
    if (drawnStrokes.length === 0) return;
    setIsReplaying(true);
    setReplayStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= drawnStrokes.length) {
        setReplayStep(step);
        redrawCanvas(drawnStrokes.slice(0, step));
        const matched = diagnosis?.details[step - 1];
        if (matched) {
          speechService.speak(`第 ${step} 笔写了 ${matched.strokeName}`, 1.0);
        }
      } else {
        clearInterval(interval);
        setIsReplaying(false);
        redrawCanvas(drawnStrokes);
      }
    }, 900);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 状态小贴士 */}
      <div className="mb-3 px-4 py-1.5 bg-[#fdf1ee] rounded-full text-xs font-bold text-[#ba1a1a] border border-[#d8c2be]/60 flex items-center gap-1.5 shadow-xs">
        <Sparkles className="w-4 h-4 text-[#ba1a1a]" />
        <span>
          {diagnosis
            ? diagnosis.summaryMessage
            : `写完整字看评分（共 ${character.strokeCount} 笔，已写 ${drawnStrokes.length} 笔）`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full items-start my-2">
        {/* 左侧：手写田字格与操作 */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative p-2 bg-[#fdf1ee] rounded-[28px] border border-[#d8c2be]/60 shadow-xs">
            {/* 传统田字格 */}
            <div className="tianzige-box w-[280px] h-[280px] relative select-none">
              <div className="mizige-diag-1" />
              <div className="mizige-diag-2" />
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="w-[280px] h-[280px] cursor-crosshair relative z-2 touch-none"
              />
            </div>

            {/* 回放指示器 */}
            {isReplaying && (
              <div className="absolute top-4 left-4 bg-[#ba1a1a] text-white text-xs px-3 py-1 rounded-full font-bold shadow-xs animate-pulse z-10">
                看下笔顺序：第 {replayStep} 笔
              </div>
            )}
          </div>

          {/* 手写工具条：移动端大触控区 */}
          <div className="w-full max-w-xs flex flex-col gap-2 mt-3.5">
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={handleUndo}
                disabled={drawnStrokes.length === 0 || !!diagnosis}
                className="flex-1 py-2.5 px-3 rounded-full border border-[#d8c2be] bg-[#fdf1ee] hover:bg-[#fff8f6] text-[#231918] text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed m3-press-active shadow-xs"
              >
                <Undo2 className="w-3.5 h-3.5 text-[#775651]" />
                <span>撤销一笔</span>
              </button>

              <button
                onClick={handleClear}
                className="flex-1 py-2.5 px-3 rounded-full border border-[#d8c2be] bg-[#fdf1ee] hover:bg-[#fff8f6] text-[#231918] text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition cursor-pointer m3-press-active shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#775651]" />
                <span>清空重写</span>
              </button>
            </div>

            {!diagnosis ? (
              <button
                onClick={handleSubmitEvaluation}
                disabled={drawnStrokes.length === 0}
                className="w-full py-3 px-4 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>我写好啦！看评分 🚀</span>
              </button>
            ) : (
              <button
                onClick={handleReplayMyStrokes}
                disabled={isReplaying}
                className="w-full py-3 px-4 rounded-full bg-[#ffdad6] hover:bg-[#ffcdc7] text-[#410002] text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>慢动作看我的下笔顺序 ▶️</span>
              </button>
            )}
          </div>
        </div>

        {/* 右侧：诊断报告与笔顺明细卡片 */}
        <div className="md:col-span-6 flex flex-col h-full space-y-3">
          {diagnosis ? (
            <div className="bg-[#fdf1ee] p-5 rounded-[24px] border border-[#d8c2be]/60 shadow-xs animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#d8c2be]/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#231918] font-kaiti">
                    {character.char}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < diagnosis.stars ? 'opacity-100 scale-110' : 'opacity-20 grayscale'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-[#ffdad6] text-[#410002]">
                  得分: {diagnosis.score} 分
                </span>
              </div>

              {/* 核心三维指标 */}
              <div className="grid grid-cols-3 gap-2 my-3 text-center">
                <div
                  className={`p-2 rounded-[14px] border text-xs font-bold ${
                    diagnosis.isCountCorrect
                      ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]'
                      : 'bg-[#ffdad6] text-[#410002] border-[#ba1a1a]'
                  }`}
                >
                  <div>笔画数</div>
                  <div className="text-base font-extrabold mt-0.5">
                    {diagnosis.totalActualStrokes} / {diagnosis.totalExpectedStrokes} 画
                  </div>
                </div>

                <div
                  className={`p-2 rounded-[14px] border text-xs font-bold ${
                    diagnosis.isOrderCorrect
                      ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]'
                      : 'bg-[#ffdad6] text-[#410002] border-[#ba1a1a]'
                  }`}
                >
                  <div>笔顺顺不顺</div>
                  <div className="text-base font-extrabold mt-0.5">
                    {diagnosis.isOrderCorrect ? '顺序完全正确' : '有倒插笔'}
                  </div>
                </div>

                <div
                  className={`p-2 rounded-[14px] border text-xs font-bold ${
                    diagnosis.isDirectionCorrect
                      ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]'
                      : 'bg-[#ffdad6] text-[#410002] border-[#ba1a1a]'
                  }`}
                >
                  <div>落笔方向</div>
                  <div className="text-base font-extrabold mt-0.5">
                    {diagnosis.isDirectionCorrect ? '方向端正' : '起笔反了'}
                  </div>
                </div>
              </div>

              {/* 逐笔下笔顺序诊断明细 */}
              <div className="my-3">
                <span className="text-xs font-bold text-[#231918] block mb-1.5">
                  每一笔写得怎么样：
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {diagnosis.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-[14px] text-xs flex items-center justify-between border ${
                        detail.isOrderCorrect && !detail.isDirectionReversed
                          ? 'bg-[#e8f5e9]/70 border-[#a5d6a7] text-[#1b5e20]'
                          : 'bg-[#ffdad6]/70 border-[#ba1a1a]/40 text-[#410002]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white font-bold flex items-center justify-center text-[10px] shadow-2xs">
                          {detail.drawnIndex + 1}
                        </span>
                        <span className="font-bold">你写了「{detail.strokeName}」</span>
                      </div>
                      <span className="text-[11px] font-medium">
                        {detail.feedback}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 老师建议列表 */}
              {diagnosis.adviceList.length > 0 && (
                <div className="mt-2 bg-[#fff8f6] p-3 rounded-[16px] border border-[#d8c2be]/60 text-xs text-[#775651] space-y-1">
                  {diagnosis.adviceList.map((advice, i) => (
                    <div key={i} className="flex items-start gap-1">
                      <span className="text-[#ba1a1a] font-bold">•</span>
                      <span>{advice}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* 未提交批改时的引导提示卡 */
            <div className="bg-[#fdf1ee] p-5 rounded-[24px] border border-[#d8c2be]/60 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ba1a1a] mb-2">
                  <HelpCircle className="w-4 h-4 text-[#ba1a1a]" />
                  <span>写字小指南 ✏️</span>
                </div>
                <p className="text-xs text-[#534341] leading-relaxed">
                  像在纸上写字一样，自由写完一整个字，小老师再帮你检查笔顺对不对！
                </p>
                <div className="mt-3 space-y-1.5 text-xs text-[#534341]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                    <span>1. 一笔一画写完整个字；</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                    <span>2. 点右下角<strong>【我写好啦！看评分】</strong>；</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                    <span>3. 查看有没有“倒插笔”，还可以点<strong>【看下笔顺序】</strong>哦！</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#d8c2be]/40 text-xs text-[#775651] flex items-center justify-between">
                <span>这个字共有 <strong className="text-[#231918]">{character.strokeCount} 笔</strong></span>
                <span className="font-pinyin font-bold text-[#ba1a1a]">[{character.pinyin}]</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
