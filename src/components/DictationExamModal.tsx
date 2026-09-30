import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Undo2,
  Trash2
} from 'lucide-react';
import type { Lesson } from '../types';
import { speechService } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';
import {
  analyzeCharacterStrokes,
  loadCharacterDataWithCache,
  type RawStroke,
  type Point,
  type StrokeDiagnosisResult
} from '../utils/strokeAnalyzer';

interface DictationExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  onFinishExam?: (score: number, stars: number, failedChars: string[]) => void;
  onAddMistake?: (char: string, reason?: string) => void;
}

interface CharExamDetail {
  char: string;
  pinyin: string;
  strokes: RawStroke[];
  diagnosis?: StrokeDiagnosisResult;
}

interface WordExamResult {
  word: string;
  pinyin: string;
  sentence: string;
  isPassed: boolean;
  score: number;
  charDetails: CharExamDetail[];
}

export const DictationExamModal: React.FC<DictationExamModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onFinishExam,
  onAddMistake,
}) => {
  const words = lesson.dictationWords;

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWordItem = words[currentIndex] || words[0];

  // 记录每个题目、每个字的独立书写笔画: wordIndex -> charIndex -> RawStroke[]
  const [answers, setAnswers] = useState<{
    [wordIndex: number]: { [charIndex: number]: RawStroke[] };
  }>({});

  // 当前字选中聚焦状态（针对多字词，指示当前正在写哪一格）
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  // 状态机：'exam' (答题中) | 'evaluating' (正在批改) | 'report' (成绩单)
  const [examState, setExamState] = useState<'exam' | 'evaluating' | 'report'>('exam');
  const [examResults, setExamResults] = useState<WordExamResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);

  // 退出二次确认对话框
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // 朗读当前题目语音
  const playWordAudio = useCallback((index: number) => {
    const item = words[index];
    if (!item) return;
    speechService.speak(
      `第 ${index + 1} 题，请写词语：${item.word}。${item.sentence || ''}。${item.word}。`
    );
  }, [words]);

  // 打开弹窗初始化
  useEffect(() => {
    if (isOpen && words.length > 0) {
      setCurrentIndex(0);
      setActiveCharIndex(0);
      setAnswers({});
      setExamState('exam');
      setExamResults([]);
      setShowExitConfirm(false);
      // 延迟 300ms 播放第一题发音，等待界面转场完成
      const timer = setTimeout(() => {
        playWordAudio(0);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, words.length, playWordAudio]);

  // 切换题目时自动重置焦点和播放语音
  const handleGoToQuestion = (index: number) => {
    if (index < 0 || index >= words.length) return;
    setCurrentIndex(index);
    setActiveCharIndex(0);
    playWordAudio(index);
  };

  // 当前词语拆解
  const currentChars = currentWordItem ? currentWordItem.word.split('') : [];
  const currentPinyins = currentWordItem
    ? currentWordItem.pinyin.split(' ')
    : [];

  // 获取当前字画笔数据
  const getCurrentCharStrokes = (charIdx: number): RawStroke[] => {
    return answers[currentIndex]?.[charIdx] || [];
  };

  // 保存某格笔迹
  const handleStrokesChange = (charIdx: number, newStrokes: RawStroke[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        ...(prev[currentIndex] || {}),
        [charIdx]: newStrokes,
      },
    }));
  };

  // 清空当前词所有格
  const handleClearCurrentWord = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {},
    }));
  };

  // 撤销当前聚焦格的一笔
  const handleUndoCurrentChar = () => {
    const strokes = getCurrentCharStrokes(activeCharIndex);
    if (strokes.length === 0) return;
    handleStrokesChange(activeCharIndex, strokes.slice(0, -1));
  };



  // 提交考卷后置全卷判分
  const handleSubmitExam = async () => {
    setExamState('evaluating');
    soundEffects.playStrokeSuccess();

    try {
      const results: WordExamResult[] = [];
      let totalWordScore = 0;
      const failedCharsList: string[] = [];

      for (let wIdx = 0; wIdx < words.length; wIdx++) {
        const item = words[wIdx];
        const chars = item.word.split('');
        const pinyins = item.pinyin.split(' ');
        const wordAnswer = answers[wIdx] || {};

        const charDetails: CharExamDetail[] = [];
        let wordScoreSum = 0;
        let wordAllCorrect = true;

        for (let cIdx = 0; cIdx < chars.length; cIdx++) {
          const char = chars[cIdx];
          const strokes = wordAnswer[cIdx] || [];
          let diagnosis: StrokeDiagnosisResult | undefined;

          if (strokes.length > 0) {
            try {
              const charData = await loadCharacterDataWithCache(char);
              if (charData && charData.medians) {
                diagnosis = analyzeCharacterStrokes(
                  strokes,
                  260,
                  260,
                  charData.medians,
                  charData.strokeNames || []
                );
              }
            } catch (err) {
              console.warn(`批改生字「${char}」失败:`, err);
            }
          }

          const isCharOk = diagnosis?.isCharacterCorrect ?? false;
          const charScore = diagnosis?.score ?? (strokes.length > 0 ? 30 : 0);
          wordScoreSum += charScore;

          if (!isCharOk) {
            wordAllCorrect = false;
            failedCharsList.push(char);
            onAddMistake?.(char, '听写测验未掌握');
          } else if (!diagnosis?.isOrderCorrect) {
            onAddMistake?.(char, '听写测验倒插笔');
          }

          charDetails.push({
            char,
            pinyin: pinyins[cIdx] || item.pinyin,
            strokes,
            diagnosis,
          });
        }

        const avgWordScore = Math.round(wordScoreSum / Math.max(1, chars.length));
        totalWordScore += avgWordScore;

        results.push({
          word: item.word,
          pinyin: item.pinyin,
          sentence: item.sentence,
          isPassed: wordAllCorrect,
          score: avgWordScore,
          charDetails,
        });
      }

      const finalTotalScore = Math.round(totalWordScore / Math.max(1, words.length));
      const stars = finalTotalScore >= 90 ? 3 : finalTotalScore >= 70 ? 2 : 1;

      setOverallScore(finalTotalScore);
      setEarnedStars(stars);
      setExamResults(results);
      setExamState('report');

      // 视得分给予多感官音效反馈
      if (finalTotalScore >= 90) {
        soundEffects.playCharacterComplete();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
        speechService.speak(`恭喜你！听写测验获得 ${finalTotalScore} 分，太出色啦！`);
      } else if (finalTotalScore >= 70) {
        soundEffects.playStarReward();
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
        speechService.speak(`真棒！听写测验获得 ${finalTotalScore} 分，继续保持哦！`);
      } else {
        soundEffects.playStrokeMistake();
        speechService.speak(`完成听写！我们一起来看看标准写法，下次一定会更好！`);
      }

      onFinishExam?.(finalTotalScore, stars, failedCharsList);
    } catch (e) {
      console.error('判分异常:', e);
      setExamState('report');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#fbf9f5] flex flex-col text-[#231918] select-none animate-in fade-in duration-200">
      {/* =================================================================== */}
      {/* 顶部极简导航栏 (排除主 App 杂讯干扰) */}
      {/* =================================================================== */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#d8c2be]/50 px-4 py-3 flex items-center justify-between shrink-0 safe-top">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (examState === 'report') {
                onClose();
              } else {
                setShowExitConfirm(true);
              }
            }}
            className="w-10 h-10 rounded-full bg-[#fdf1ee] hover:bg-[#ffdad6] text-[#775651] flex items-center justify-center transition m3-press-active cursor-pointer"
            title="退出测验"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div>
            <h1 className="text-base font-bold text-[#231918] flex items-center gap-2">
              <span>听写正式测验</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-semibold">
                {lesson.title}
              </span>
            </h1>
          </div>
        </div>

        {examState === 'exam' && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6]/70 px-3 py-1 rounded-full">
              第 {currentIndex + 1} / {words.length} 题
            </span>
            <button
              onClick={() => playWordAudio(currentIndex)}
              className="w-10 h-10 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white flex items-center justify-center shadow-xs transition m3-press-active cursor-pointer"
              title="再听一遍"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </header>

      {/* =================================================================== */}
      {/* 主体视图 1：正式测验作答界面 (零干扰 · 自适应田字格格数) */}
      {/* =================================================================== */}
      {examState === 'exam' && (
        <main className="flex-1 flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto max-w-4xl mx-auto w-full">
          {/* 进度指示条 */}
          <div className="w-full max-w-md bg-[#d8c2be]/30 h-2 rounded-full overflow-hidden mb-2">
            <div
              className="bg-[#ba1a1a] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            />
          </div>

          {/* 题目区域：仅显示拼音与例句语境，严禁剧透汉字 */}
          <div className="text-center my-1 sm:my-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#ba1a1a] font-pinyin tracking-widest flex items-center justify-center gap-3">
              <span>{currentWordItem.pinyin}</span>
              <button
                onClick={() => playWordAudio(currentIndex)}
                className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center hover:scale-105 transition cursor-pointer"
                title="播报读音"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            {currentWordItem.sentence && (
              <p className="text-xs sm:text-sm text-[#775651] mt-1 italic">
                “{currentWordItem.sentence.replace(/\[.*?\]/g, '____')}”
              </p>
            )}
            <p className="text-[11px] text-[#857370] mt-0.5">
              共 {currentChars.length} 个字 · 在对应田字格内认真书写 ✏️
            </p>
          </div>

          {/* 核心亮点：自适应多格田字格矩阵 (词与字田字格格数动态对齐) */}
          <div className="w-full flex items-center justify-center py-2 sm:py-4">
            <div
              className={`flex items-center justify-center gap-3 sm:gap-6 flex-wrap ${
                currentChars.length === 1 ? 'max-w-xs' : 'max-w-2xl'
              }`}
            >
              {currentChars.map((_char, cIdx) => {
                const isActive = cIdx === activeCharIndex;
                const charStrokes = getCurrentCharStrokes(cIdx);
                const charPinyin = currentPinyins[cIdx] || '';
                // 单字采用 260px，双字采用 160px，三字以上采用 120px
                const boxSize = currentChars.length === 1 ? 260 : currentChars.length === 2 ? 165 : 125;

                return (
                  <div
                    key={cIdx}
                    onClick={() => setActiveCharIndex(cIdx)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    {/* 单字对应拼音 */}
                    <div className="text-sm sm:text-base font-bold text-[#ba1a1a] font-pinyin mb-1 tracking-wider">
                      {charPinyin}
                    </div>

                    {/* 田字格与独立画布 */}
                    <div
                      className={`relative bg-[#fdf1ee] rounded-[24px] border-2 transition-all p-1 shadow-xs ${
                        isActive
                          ? 'border-[#ba1a1a] ring-3 ring-[#ffdad6]'
                          : 'border-[#d8c2be] hover:border-[#857370]'
                      }`}
                      style={{ width: boxSize + 12, height: boxSize + 12 }}
                    >
                      <TianzigeSingleCanvas
                        width={boxSize}
                        height={boxSize}
                        strokes={charStrokes}
                        onStrokesChange={(strokes) => handleStrokesChange(cIdx, strokes)}
                      />

                      {/* 格内右下角笔画统计小提示 */}
                      {charStrokes.length > 0 && (
                        <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-0.5 rounded-full text-[10px] text-[#775651] font-bold pointer-events-none shadow-2xs">
                          {charStrokes.length} 笔
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-[#775651] mt-1 font-semibold">
                      第 {cIdx + 1} 字
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 辅助工具条：撤销、清空 */}
          <div className="flex items-center gap-3 my-2">
            <button
              onClick={handleUndoCurrentChar}
              disabled={getCurrentCharStrokes(activeCharIndex).length === 0}
              className="px-4 py-2 rounded-full border border-[#d8c2be] bg-white hover:bg-[#fff8f6] text-[#231918] text-xs font-bold flex items-center gap-1.5 transition m3-press-active cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>撤销一笔</span>
            </button>

            <button
              onClick={handleClearCurrentWord}
              className="px-4 py-2 rounded-full border border-[#d8c2be] bg-white hover:bg-[#fff8f6] text-[#ba1a1a] text-xs font-bold flex items-center gap-1.5 transition m3-press-active cursor-pointer shadow-2xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>重写本词</span>
            </button>
          </div>

          {/* 底部导航控制区 (大触控热区 >= 56px) */}
          <div className="w-full max-w-md flex items-center justify-between gap-3 pt-2 safe-bottom">
            <button
              onClick={() => handleGoToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="flex-1 min-h-[52px] rounded-full border border-[#d8c2be] bg-white hover:bg-[#fff8f6] text-[#231918] text-sm font-bold flex items-center justify-center gap-1 transition m3-press-active cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>上一题</span>
            </button>

            {currentIndex < words.length - 1 ? (
              <button
                onClick={() => handleGoToQuestion(currentIndex + 1)}
                className="flex-1 min-h-[52px] rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white text-sm font-bold flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer shadow-xs"
              >
                <span>下一题</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="flex-1 min-h-[52px] rounded-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-sm font-bold flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>交卷判分 🚀</span>
              </button>
            )}
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* 状态 2：批改判分过渡动画 */}
      {/* =================================================================== */}
      {examState === 'evaluating' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] mb-4 animate-bounce">
            <Sparkles className="w-10 h-10 fill-current" />
          </div>
          <h2 className="text-xl font-extrabold text-[#231918] mb-2">
            小老师正在仔细阅卷中... 📝
          </h2>
          <p className="text-xs text-[#775651]">
            正在核对现代汉语国标笔顺、起止笔方向与间架结构
          </p>
        </div>
      )}

      {/* =================================================================== */}
      {/* 主体视图 3：全景成绩单与考后讲评 (等到全部做完才展示对错与打分) */}
      {/* =================================================================== */}
      {examState === 'report' && (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-3xl mx-auto w-full">
          {/* 成绩总评头部卡片 */}
          <div className="w-full bg-white rounded-[28px] p-6 border border-[#d8c2be]/60 shadow-xs flex flex-col items-center text-center mb-5">
            <div className="flex items-center gap-1.5 text-3xl mb-2">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={`transition-all duration-300 ${
                    i < earnedStars ? 'opacity-100 scale-110' : 'opacity-20 grayscale'
                  }`}
                >
                  ⭐
                </span>
              ))}
            </div>

            <div className="flex items-baseline gap-1 my-1">
              <span className="text-5xl font-black text-[#ba1a1a] font-sans">
                {overallScore}
              </span>
              <span className="text-base font-bold text-[#775651]">分</span>
            </div>

            <p className="text-sm font-bold text-[#231918] mt-1">
              {overallScore >= 95
                ? '太棒啦！一字不漏，规范如印刷体！🏆'
                : overallScore >= 80
                ? '很优秀！大部分词语都掌握牢固！✨'
                : overallScore >= 60
                ? '及格啦！注意几个小笔顺，再接再厉！🌱'
                : '不要灰心，对照标准字多练练就能攻克！💪'}
            </p>

            <p className="text-xs text-[#775651] mt-1">
              已将错字自动收录至错题本，稍后可一键强化巩固。
            </p>
          </div>

          {/* 全卷逐题详细批改清单 */}
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-[#231918] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#ba1a1a]" />
              <span>全卷题目答题讲评清单</span>
            </h3>
            <span className="text-xs text-[#775651]">
              共 {examResults.length} 题
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {examResults.map((result, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[20px] p-4 border border-[#d8c2be]/60 shadow-2xs flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between border-b border-[#d8c2be]/40 pb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded-full">
                        第 {idx + 1} 题
                      </span>
                      <span className="text-lg font-bold font-kaiti text-[#231918]">
                        {result.word}
                      </span>
                      <span className="text-xs text-[#775651] font-pinyin">
                        [{result.pinyin}]
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {result.isPassed ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2e7d32] bg-[#e8f5e9] px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>正确</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-1 rounded-full">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>需巩固</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 逐字书写与标准字诊断 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {result.charDetails.map((cd, cIdx) => {
                      const isCorrect = cd.diagnosis?.isCharacterCorrect ?? false;
                      const isOrderOk = cd.diagnosis?.isOrderCorrect ?? false;

                      return (
                        <div
                          key={cIdx}
                          className="bg-[#fdf1ee] rounded-xl p-2.5 border border-[#d8c2be]/50 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-white border border-[#d8c2be] flex items-center justify-center text-lg font-bold font-kaiti text-[#ba1a1a]">
                              {cd.char}
                            </div>
                            <div>
                              <div className="font-bold text-[#231918]">
                                {cd.pinyin} · 实际写了 {cd.strokes.length} 笔
                              </div>
                              <div className="text-[11px] text-[#775651]">
                                {isCorrect
                                  ? isOrderOk
                                    ? '笔顺完全规范'
                                    : '字形对，有倒插笔'
                                  : cd.strokes.length === 0
                                  ? '未作答'
                                  : '笔画有缺失或偏移'}
                              </div>
                            </div>
                          </div>

                          <div className="font-bold">
                            {isCorrect && isOrderOk && <span className="text-[#2e7d32]">100分</span>}
                            {isCorrect && !isOrderOk && <span className="text-[#d97706]">85分</span>}
                            {!isCorrect && <span className="text-[#ba1a1a]">未掌握</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 底部按钮 */}
          <div className="flex items-center gap-3 mt-6 safe-bottom">
            <button
              onClick={() => {
                setExamState('exam');
                setCurrentIndex(0);
                setActiveCharIndex(0);
                setAnswers({});
                playWordAudio(0);
              }}
              className="flex-1 min-h-[52px] rounded-full border border-[#d8c2be] bg-white hover:bg-[#fff8f6] text-[#231918] text-sm font-bold flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新测验一次</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 min-h-[52px] rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white text-sm font-bold flex items-center justify-center gap-1.5 transition m3-press-active cursor-pointer shadow-xs"
            >
              <span>完成，返回课堂 🏠</span>
            </button>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* 退出二次确认对话框 (防儿童手抖误触) */}
      {/* =================================================================== */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[28px] p-6 max-w-sm w-full border border-[#d8c2be] shadow-lg flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-3">
              <HelpCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-bold text-[#231918] mb-1.5">
              确定要离开听写考场吗？
            </h3>
            <p className="text-xs text-[#775651] mb-5">
              当前测验尚未交卷，现在退出将不会保存本轮测验得分哦。
            </p>
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 min-h-[48px] rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white text-xs font-bold transition m3-press-active cursor-pointer shadow-xs"
              >
                继续答题
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onClose();
                }}
                className="flex-1 min-h-[48px] rounded-full border border-[#d8c2be] bg-[#fdf1ee] text-[#775651] hover:bg-[#ffdad6] text-xs font-bold transition m3-press-active cursor-pointer"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 单个田字格 Canvas 画布组件 (极致 60fps 流畅手写与独立笔迹隔离)
// ============================================================================
interface TianzigeSingleCanvasProps {
  width: number;
  height: number;
  strokes: RawStroke[];
  onStrokesChange: (strokes: RawStroke[]) => void;
}

const TianzigeSingleCanvas: React.FC<TianzigeSingleCanvasProps> = ({
  width,
  height,
  strokes,
  onStrokesChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const currentStrokeRef = useRef<Point[]>([]);

  // 重绘画布
  const redraw = useCallback(
    (strokesToDraw: RawStroke[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      strokesToDraw.forEach((stroke) => {
        if (stroke.length === 0) return;
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = width > 200 ? 14 : width > 150 ? 11 : 9;

        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
      });
    },
    [width]
  );

  // 笔迹变化时同步重绘
  useEffect(() => {
    redraw(strokes);
  }, [strokes, redraw]);

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
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const p = getCanvasPoint(e);
    currentStrokeRef.current = [p];

    // 直接在 canvas 上连贯绘制当前笔画
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = width > 200 ? 14 : width > 150 ? 11 : 9;
        ctx.moveTo(p.x, p.y);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const p = getCanvasPoint(e);
    currentStrokeRef.current.push(p);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStrokeRef.current.length > 1) {
      const updated = [...strokes, currentStrokeRef.current];
      onStrokesChange(updated);
      soundEffects.playStrokeSuccess();
    }
    currentStrokeRef.current = [];
  };

  return (
    <div
      className="tianzige-box relative select-none"
      style={{ width, height }}
    >
      <div className="mizige-diag-1" />
      <div className="mizige-diag-2" />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="cursor-crosshair relative z-2 touch-none rounded-xl"
        style={{ width, height }}
      />
    </div>
  );
};
