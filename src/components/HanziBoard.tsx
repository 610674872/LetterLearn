import { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import confetti from 'canvas-confetti';
import { RotateCcw, Volume2, Sparkles, CheckCircle2, AlertCircle, Eye, PenTool, HelpCircle } from 'lucide-react';
import type { CharacterItem, StrokePracticeMode } from '../types';
import { speechService } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';
import { FreeHandwritingBoard } from './FreeHandwritingBoard';

interface HanziBoardProps {
  character: CharacterItem;
  onCharacterCompleted?: (char: string, stars: number) => void;
}

export const HanziBoard: React.FC<HanziBoardProps> = ({ character, onCharacterCompleted }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);

  const [mode, setMode] = useState<StrokePracticeMode>('animate');
  const [isSlow, setIsSlow] = useState(false);
  const [currentStrokeIdx, setCurrentStrokeIdx] = useState<number>(0);
  const [mistakes, setMistakes] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('仔细看笔顺演示哦');
  const [earnedStars, setEarnedStars] = useState(0);
  const [standardMedians, setStandardMedians] = useState<number[][][]>([]);

  // 预载当前字的骨架数据（供写完再判模式使用）
  useEffect(() => {
    HanziWriter.loadCharacterData(character.char)
      .then((data: any) => {
        if (data && data.medians) {
          setStandardMedians(data.medians);
        }
      })
      .catch((err) => {
        console.warn('Failed to pre-load character medians:', err);
      });
  }, [character.char]);

  // 初始化并重置 HanziWriter（仅在看演示或描红模式下运行）
  useEffect(() => {
    if (mode === 'quiz') return; // 写完判笔顺模式使用 FreeHandwritingBoard 自研手写层
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    setCompleted(false);
    setMistakes(0);
    setCurrentStrokeIdx(0);

    const animationSpeed = isSlow ? 0.6 : 1.2;

    const writer = HanziWriter.create(containerRef.current, character.char, {
      width: 280,
      height: 280,
      padding: 18,
      showOutline: true,
      strokeAnimationSpeed: animationSpeed,
      delayBetweenStrokes: isSlow ? 600 : 350,
      strokeColor: '#b91c1c', // 规范笔画朱红墨色
      radicalColor: '#047857', // 偏旁部首翡翠绿
      outlineColor: '#cbd5e1', // 描红浅灰底色
      drawingColor: '#0f172a', // 孩子书写真实墨黑
      drawingWidth: 22,
      showHintAfterMisses: 2,
      highlightOnComplete: true,
      onLoadCharDataSuccess: (data: any) => {
        if (data && data.medians) {
          setStandardMedians(data.medians);
        }
      },
      onLoadCharDataError: () => {
        setStatusMessage('正在准备这个字，请稍等哦~');
      }
    });

    writerRef.current = writer;

    if (mode === 'animate') {
      setStatusMessage('仔细看小老师怎么写，注意起笔哦');
      writer.animateCharacter({
        onComplete: () => {
          setStatusMessage('看完了！现在可以点【跟着描】自己写啦！');
        }
      });
    } else if (mode === 'trace') {
      // 描红模式：实时逐笔引导
      setStatusMessage('按笔顺描一描，一笔一画写工整');
      writer.quiz({
        onMistake: (strokeData: any) => {
          setMistakes((prev) => prev + 1);
          soundEffects.playStrokeMistake();
          setStatusMessage(`第 ${strokeData.strokeNum + 1} 笔起笔不对哦，再试一次！`);
          speechService.speak('方向不对哦，再试一次', 1.0);
        },
        onCorrectStroke: (strokeData: any) => {
          setCurrentStrokeIdx(strokeData.strokeNum + 1);
          soundEffects.playStrokeSuccess();
          const strokeName = character.strokeNames?.[strokeData.strokeNum];
          if (strokeName) {
            setStatusMessage(`写对了！这是「${strokeName}」`);
            speechService.speak(strokeName, 1.1);
          } else {
            setStatusMessage('棒！这一笔写对啦！');
          }
        },
        onComplete: (summaryData: any) => {
          setCompleted(true);
          soundEffects.playCharacterComplete();
          const starCount = summaryData.totalMistakes === 0 ? 3 : summaryData.totalMistakes <= 2 ? 2 : 1;
          setEarnedStars(starCount);
          setStatusMessage(starCount === 3 ? '太棒啦！一笔没写错，得到三颗星！' : '写好啦！再练一次会写得更漂亮！');
          
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
          speechService.speak('太棒了，写得真好！', 1.0);
          onCharacterCompleted?.(character.char, starCount);
        }
      });
    }

    return () => {
      // cleanup
    };
  }, [character.char, mode, isSlow]);

  // 播放汉字读音与组词
  const handlePronounceChar = () => {
    speechService.speak(`${character.char}，${character.pinyin}。${character.words[0]?.word || ''}`);
  };

  // 重播或重置书写
  const handleReset = () => {
    if (!writerRef.current) return;
    setCompleted(false);
    setMistakes(0);
    setCurrentStrokeIdx(0);
    if (mode === 'animate') {
      writerRef.current.animateCharacter();
    } else {
      writerRef.current.quiz();
    }
  };

  // 提示下一笔
  const handleGiveHint = () => {
    if (writerRef.current && mode === 'trace') {
      writerRef.current.quiz();
      setStatusMessage('已为你提示这一笔');
    }
  };

  return (
    <div className="bg-[#fff8f6] rounded-[28px] p-4 sm:p-6 border border-[#d8c2be]/60 shadow-xs flex flex-col items-center max-w-2xl mx-auto w-full">
      {/* 头部生字信息栏：M3 App 风格 */}
      <div className="w-full flex flex-col gap-3 pb-3 mb-3 border-b border-[#d8c2be]/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePronounceChar}
              className="w-11 h-11 rounded-full bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#ba1a1a] flex items-center justify-center shadow-xs transition m3-press-active cursor-pointer shrink-0"
              title="朗读标准发音"
            >
              <Volume2 className="w-5 h-5 text-[#ba1a1a]" />
            </button>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#ba1a1a] font-pinyin tracking-wide leading-none">
                  {character.pinyin}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-bold">
                  {character.tone === 0 ? '轻声' : `${character.tone}声`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#775651] mt-1 font-medium flex-wrap">
                <span className="whitespace-nowrap">部首: <strong className="text-[#231918] font-bold">{character.radical}</strong></span>
                <span>·</span>
                <span className="whitespace-nowrap">笔画: <strong className="text-[#231918] font-bold">{character.strokeCount}画</strong></span>
                <span>·</span>
                <span className="whitespace-nowrap">结构: <strong className="text-[#231918] font-bold">{character.structure}</strong></span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#410002] whitespace-nowrap">
              部编写字表
            </span>
          </div>
        </div>

        {/* Material Design 3 Connected Segmented Button */}
        <div className="w-full flex border border-[#857370]/40 rounded-full p-0.5 bg-[#fdf1ee] overflow-hidden shrink-0">
          <button
            onClick={() => setMode('animate')}
            className={`flex-1 py-1.5 px-1.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer m3-press-active whitespace-nowrap ${
              mode === 'animate'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'text-[#534341] hover:bg-[#fff8f6]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>看笔顺</span>
          </button>
          <button
            onClick={() => setMode('trace')}
            className={`flex-1 py-1.5 px-1.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer m3-press-active whitespace-nowrap ${
              mode === 'trace'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'text-[#534341] hover:bg-[#fff8f6]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 shrink-0" />
            <span>跟着描</span>
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`flex-1 py-1.5 px-1.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer m3-press-active whitespace-nowrap ${
              mode === 'quiz'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'text-[#534341] hover:bg-[#fff8f6]'
            }`}
            title="写完整字看评分与笔顺诊断"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>自己写 🚀</span>
          </button>
        </div>
      </div>

      {/* 核心书写区域 */}
      {mode === 'quiz' ? (
        /* 整字书写，写完再判断笔顺模式 */
        <FreeHandwritingBoard
          character={character}
          standardMedians={standardMedians}
          onCompleted={onCharacterCompleted}
        />
      ) : (
        /* 看演示与分步描红模式 */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full items-center my-2">
          {/* 左侧：田字格书写画布 */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="relative p-2 bg-[#fdf1ee] rounded-[28px] border border-[#d8c2be]/60 shadow-xs">
              <div className="tianzige-box w-[280px] h-[280px]">
                <div className="mizige-diag-1" />
                <div className="mizige-diag-2" />
                <div ref={containerRef} className="w-[280px] h-[280px] cursor-crosshair relative z-2" />
              </div>

              {completed && (
                <div className="absolute inset-2 bg-white/95 rounded-[24px] backdrop-blur-xs flex flex-col items-center justify-center z-10 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-14 h-14 text-[#2e7d32] animate-bounce mb-2" />
                  <div className="text-xl font-bold text-[#231918]">
                    {earnedStars === 3 ? '完美书写！' : '书写完成！'}
                  </div>
                  <div className="flex gap-1.5 my-2">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl ${i < earnedStars ? 'opacity-100 scale-110' : 'opacity-25 grayscale'}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-2 px-5 py-2.5 bg-[#ba1a1a] text-white rounded-full text-sm font-bold shadow-xs hover:bg-[#9c1515] transition m3-press-active cursor-pointer"
                  >
                    再写一次
                  </button>
                </div>
              )}
            </div>

            <div className="mt-3 px-4 py-1.5 bg-[#fdf1ee] rounded-full text-xs font-bold text-[#ba1a1a] border border-[#d8c2be]/60 flex items-center gap-1.5">
              {mistakes > 0 ? (
                <AlertCircle className="w-4 h-4 text-[#ba1a1a] shrink-0" />
              ) : (
                <Sparkles className="w-4 h-4 text-[#ba1a1a] shrink-0" />
              )}
              <span>{statusMessage}</span>
            </div>

            <div className="flex items-center justify-center gap-2.5 mt-3.5 w-full max-w-xs">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 px-3 rounded-full border border-[#d8c2be] bg-[#fdf1ee] hover:bg-[#fff8f6] text-[#231918] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer m3-press-active shadow-xs"
              >
                <RotateCcw className="w-4 h-4 text-[#775651]" />
                <span>重来</span>
              </button>
              {mode === 'animate' ? (
                <button
                  onClick={() => setIsSlow(!isSlow)}
                  className={`flex-1 py-2.5 px-3 rounded-full border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer m3-press-active shadow-xs ${
                    isSlow
                      ? 'bg-[#ffdad6] text-[#410002] border-[#ba1a1a]'
                      : 'border-[#d8c2be] bg-[#fdf1ee] hover:bg-[#fff8f6] text-[#231918]'
                  }`}
                >
                  <span>🐢</span>
                  <span>{isSlow ? '慢速中' : '放慢看'}</span>
                </button>
              ) : (
                <button
                  onClick={handleGiveHint}
                  className="flex-1 py-2.5 px-3 rounded-full border border-[#ba1a1a] bg-[#ffdad6] hover:bg-[#ffcdc7] text-[#410002] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer m3-press-active shadow-xs"
                >
                  <HelpCircle className="w-4 h-4 text-[#ba1a1a]" />
                  <span>提示这笔</span>
                </button>
              )}
            </div>
          </div>

          {/* 右侧：笔顺分解步骤与常用词组 */}
          <div className="md:col-span-6 flex flex-col justify-between h-full space-y-3">
            <div className="bg-[#fdf1ee] p-4 rounded-[20px] border border-[#d8c2be]/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#231918] tracking-wider">
                  笔画顺序 ({character.strokeCount} 笔)
                </span>
                <span className="text-xs text-[#775651]">标准笔顺</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {character.strokeNames ? (
                  character.strokeNames.map((name, idx) => (
                    <div
                      key={idx}
                      onClick={() => speechService.speak(name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 cursor-pointer transition m3-press-active ${
                        currentStrokeIdx === idx + 1
                          ? 'bg-[#ba1a1a] text-white border-[#ba1a1a] shadow-xs scale-105'
                          : 'bg-white text-[#231918] border-[#d8c2be] hover:bg-[#fff8f6]'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-[#ffdad6] text-[#410002] text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{name}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-[#775651]">共 {character.strokeCount} 笔</span>
                )}
              </div>
            </div>

            <div className="bg-[#fdf1ee] p-4 rounded-[20px] border border-[#d8c2be]/60">
              <span className="text-xs font-bold text-[#231918] block mb-2">
                常用词语和造句 📖
              </span>
              <div className="space-y-2">
                {character.words.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => speechService.speak(`${item.word}。${item.sentence || ''}`)}
                    className="bg-white p-3 rounded-[16px] border border-[#d8c2be]/50 hover:border-[#ba1a1a] shadow-2xs transition cursor-pointer m3-press-active"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#231918] text-base font-kaiti">
                          {item.word}
                        </span>
                        <span className="text-xs text-[#ba1a1a] font-pinyin font-bold">
                          [{item.pinyin}]
                        </span>
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-[#775651]" />
                    </div>
                    {item.sentence && (
                      <p className="text-xs text-[#775651] mt-1 leading-relaxed">
                        {item.sentence}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
