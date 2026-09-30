import { useState, useEffect } from 'react';
import type { GradeLevel, SemesterLevel, Lesson, CharacterItem, LearningMode, UserLearningStats, BadgeItem, DictationResult } from './types';
import { PEP_CURRICULUM_DATA } from './data/pepCurriculum';
import { Navbar } from './components/Navbar';
import { CharacterSelector } from './components/CharacterSelector';
import { HanziBoard } from './components/HanziBoard';
import { PinyinWritingQuiz } from './components/PinyinWritingQuiz';
import { DictationMaster } from './components/DictationMaster';
import { ErrorBookModal } from './components/ErrorBookModal';
import { EyeCareModal } from './components/EyeCareModal';
import { BadgeWallModal } from './components/BadgeWallModal';
import { BadgeUnlockCelebration } from './components/BadgeUnlockCelebration';
import { CharacterDictionaryModal } from './components/CharacterDictionaryModal';
import { InstallAppModal } from './components/InstallAppModal';
import { CurriculumDrawer } from './components/CurriculumDrawer';
import { BottomTabBar } from './components/BottomTabBar';
import { AudioSettingsModal } from './components/AudioSettingsModal';
import { evaluateNewBadges } from './utils/badgeSystem';
import { speechService } from './utils/speech';

export function App() {
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(1);
  const [currentSemester, setCurrentSemester] = useState<SemesterLevel>(1);

  // 获取当前学期教材
  const currentCurriculum = PEP_CURRICULUM_DATA.find(
    (c) => c.grade === currentGrade && c.semester === currentSemester
  ) || PEP_CURRICULUM_DATA[0];

  const [currentLesson, setCurrentLesson] = useState<Lesson>(
    currentCurriculum.units[0].lessons[0]
  );

  const [currentCharItem, setCurrentCharItem] = useState<CharacterItem>(
    currentCurriculum.units[0].lessons[0].characters[0]
  );

  const [currentMode, setCurrentMode] = useState<LearningMode>('stroke');

  // 积分与激励状态（支持 localStorage 离线持久化）
  const [starsCount, setStarsCount] = useState<number>(() => {
    return Number(localStorage.getItem('letterlearn_stars') || '28');
  });

  const [inkCount, setInkCount] = useState<number>(() => {
    return Number(localStorage.getItem('letterlearn_ink') || '85');
  });

  // 全量学习档案追踪 (已认、已写、错题、打卡、徽章)
  const [learningStats, setLearningStats] = useState<UserLearningStats>(() => {
    const saved = localStorage.getItem('letterlearn_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      writtenCorrectChars: ['天', '人', '一', '二'],
      mistakes: {
        '我': { count: 2, lastDate: '2026-09-28', reasons: ['倒插笔'] },
        '水': { count: 1, lastDate: '2026-09-29', reasons: ['落笔反了'] },
      },
      clearedMistakesCount: 2,
      totalDictationWordsPassed: 12,
      streakDays: 4,
      lastActiveDate: '2026-09-29',
      unlockedBadges: {
        'write_5': '2026-09-28',
        'write_10': '2026-09-29',
        'dict_10': '2026-09-29',
        'clear_1': '2026-09-28',
        'streak_3': '2026-09-27',
      },
    };
  });

  const [charProgress, setCharProgress] = useState<{ [char: string]: number }>(() => {
    const saved = localStorage.getItem('letterlearn_progress');
    return saved ? JSON.parse(saved) : { 天: 3, 地: 2, 人: 3, 一: 3, 二: 3 };
  });

  // 弹窗状态
  const [isErrorBookOpen, setIsErrorBookOpen] = useState(false);
  const [isEyeCareOpen, setIsEyeCareOpen] = useState(false);
  const [isBadgeWallOpen, setIsBadgeWallOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [activeNewBadge, setActiveNewBadge] = useState<BadgeItem | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isCurriculumDrawerOpen, setIsCurriculumDrawerOpen] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  // 监听 PWA 安装事件
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
    };

    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;
      setIsAppInstalled(standalone);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    checkStandalone();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleTriggerInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try {
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsAppInstalled(true);
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
      setDeferredPrompt(null);
    }
  };

  // 保存数据到 localStorage
  useEffect(() => {
    localStorage.setItem('letterlearn_stars', starsCount.toString());
  }, [starsCount]);

  useEffect(() => {
    localStorage.setItem('letterlearn_ink', inkCount.toString());
  }, [inkCount]);

  useEffect(() => {
    localStorage.setItem('letterlearn_stats', JSON.stringify(learningStats));
  }, [learningStats]);

  useEffect(() => {
    localStorage.setItem('letterlearn_progress', JSON.stringify(charProgress));
  }, [charProgress]);

  // 护眼定时提醒（默认 20 分钟）
  useEffect(() => {
    const timer = setInterval(() => {
      setIsEyeCareOpen(true);
    }, 20 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // 统一的徽章判定与触发流程
  const processBadgeCheck = (updatedStats: UserLearningStats) => {
    const { newBadges, updatedUnlockedMap } = evaluateNewBadges(updatedStats);
    if (newBadges.length > 0) {
      // 累计徽章奖励
      let addStars = 0;
      let addInk = 0;
      newBadges.forEach((b) => {
        addStars += b.rewardStars;
        addInk += b.rewardInk;
      });
      setStarsCount((prev) => prev + addStars);
      setInkCount((prev) => prev + addInk);

      // 弹出最新获得的成就徽章庆祝弹窗
      setActiveNewBadge(newBadges[0]);

      return {
        ...updatedStats,
        unlockedBadges: updatedUnlockedMap,
      };
    }
    return updatedStats;
  };

  // 切换教材
  const handleSelectCurriculum = (grade: GradeLevel, semester: SemesterLevel) => {
    setCurrentGrade(grade);
    setCurrentSemester(semester);
    const curr = PEP_CURRICULUM_DATA.find((c) => c.grade === grade && c.semester === semester);
    if (curr && curr.units[0]?.lessons[0]) {
      const firstLesson = curr.units[0].lessons[0];
      setCurrentLesson(firstLesson);
      setCurrentCharItem(firstLesson.characters[0]);
    }
  };

  // 切换课文
  const handleSelectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    if (lesson.characters.length > 0) {
      setCurrentCharItem(lesson.characters[0]);
    }
  };

  // 记录完成一个汉字
  const handleCharacterCompleted = (char: string, stars: number) => {
    setStarsCount((prev) => prev + stars);
    setInkCount((prev) => prev + 10);
    setCharProgress((prev) => ({
      ...prev,
      [char]: Math.max(prev[char] || 0, stars),
    }));

    setLearningStats((prev) => {
      const writtenSet = new Set(prev.writtenCorrectChars);
      let clearedCount = prev.clearedMistakesCount;
      const updatedMistakes = { ...prev.mistakes };

      // 2星或3星即掌握该字
      if (stars >= 2) {
        writtenSet.add(char);
      }

      if (updatedMistakes[char]) {
        const currentStreak = (updatedMistakes[char].consecutiveSuccess || 0) + 1;
        // 3星满星直接消灭，或者连续2次正确彻底消灭该错字
        if (stars === 3 || currentStreak >= 2) {
          delete updatedMistakes[char];
          clearedCount += 1;
        } else {
          updatedMistakes[char] = {
            ...updatedMistakes[char],
            consecutiveSuccess: currentStreak,
            ebinghausStage: Math.min(3, (updatedMistakes[char].ebinghausStage || 0) + 1),
            lastDate: new Date().toISOString().split('T')[0],
          };
        }
      }

      const nextStats: UserLearningStats = {
        ...prev,
        writtenCorrectChars: Array.from(writtenSet),
        mistakes: updatedMistakes,
        clearedMistakesCount: clearedCount,
      };

      return processBadgeCheck(nextStats);
    });
  };

  // 记录写错的字
  const handleAddMistake = (char: string, reason?: string) => {
    setLearningStats((prev) => {
      const existing = prev.mistakes[char] || {
        count: 0,
        lastDate: new Date().toISOString().split('T')[0],
        reasons: [],
      };

      const updatedReasons = reason
        ? [...new Set([...existing.reasons, reason])]
        : existing.reasons;

      const nextStats: UserLearningStats = {
        ...prev,
        mistakes: {
          ...prev.mistakes,
          [char]: {
            count: existing.count + 1,
            lastDate: new Date().toISOString().split('T')[0],
            reasons: updatedReasons,
          },
        },
      };

      return nextStats;
    });
  };

  // 听写完成统计
  const handleDictationFinished = (results: DictationResult[]) => {
    const passedCount = results.filter((r) => r.passed).length;
    setStarsCount((prev) => prev + passedCount * 2);
    setInkCount((prev) => prev + passedCount * 10);

    setLearningStats((prev) => {
      const nextStats: UserLearningStats = {
        ...prev,
        totalDictationWordsPassed: prev.totalDictationWordsPassed + passedCount,
      };
      return processBadgeCheck(nextStats);
    });
  };

  // 从错题本或字库大厅点击汉字跳回针对性练字
  const handleSelectCharacterToPractice = (charItem: CharacterItem) => {
    for (const curr of PEP_CURRICULUM_DATA) {
      for (const unit of curr.units) {
        for (const lesson of unit.lessons) {
          const match = lesson.characters.find((c) => c.char === charItem.char);
          if (match) {
            setCurrentGrade(curr.grade);
            setCurrentSemester(curr.semester);
            setCurrentLesson(lesson);
            setCurrentCharItem(match);
            setCurrentMode('stroke');
            return;
          }
        }
      }
    }
  };

  const mistakeCharList = Object.keys(learningStats.mistakes);
  const unlockedBadgeCount = Object.keys(learningStats.unlockedBadges).length;
  const totalCurriculumCharactersCount = currentCurriculum.units
    .flatMap((u) => u.lessons)
    .flatMap((l) => l.characters).length;

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden bg-[#fff8f6] text-[#231918]">
      {/* 顶部紧凑应用栏 (适配 Safe-Area 顶部) */}
      <Navbar
        currentGrade={currentGrade}
        currentSemester={currentSemester}
        currentLesson={currentLesson}
        starsCount={starsCount}
        inkCount={inkCount}
        mistakesCount={mistakeCharList.length}
        unlockedBadgeCount={unlockedBadgeCount}
        onOpenCurriculumDrawer={() => setIsCurriculumDrawerOpen(true)}
        onOpenErrorBook={() => setIsErrorBookOpen(true)}
        onOpenEyeCare={() => setIsEyeCareOpen(true)}
        onOpenBadgeWall={() => setIsBadgeWallOpen(true)}
        onOpenInstallApp={() => setIsInstallModalOpen(true)}
        onOpenAudioSettings={() => setIsAudioSettingsOpen(true)}
        isAppInstalled={isAppInstalled}
      />

      {/* 主体交互区域：手机端顺滑滚动容器 (隐藏网页滚动条) */}
      <main className="flex-1 overflow-y-auto overscroll-contain px-2.5 py-2.5 sm:px-4 sm:py-4 scrollbar-none">
        <div className="max-w-2xl mx-auto w-full pb-8">
          {/* 模式 1：规范笔顺与田字格 (含看演示、跟着描、自由写判分) */}
          {currentMode === 'stroke' && (
            <div className="animate-in fade-in duration-200">
              <CharacterSelector
                characters={currentLesson.characters}
                selectedChar={currentCharItem.char}
                onSelectCharacter={(item) => {
                  setCurrentCharItem(item);
                  speechService.speak(`${item.char}，${item.pinyin}`);
                }}
                charProgress={charProgress}
              />

              <HanziBoard
                character={currentCharItem}
                onCharacterCompleted={handleCharacterCompleted}
              />
            </div>
          )}

          {/* 模式 2：看拼音写汉字 */}
          {currentMode === 'pinyin' && (
            <div className="animate-in fade-in duration-200">
              <PinyinWritingQuiz
                lesson={currentLesson}
                onAddMistake={(char) => handleAddMistake(char, '看拼音默写错误')}
                onFinish={() => {
                  setStarsCount((prev) => prev + 5);
                  setInkCount((prev) => prev + 25);
                }}
              />
            </div>
          )}

          {/* 模式 3：人教同步智能听写 */}
          {currentMode === 'dictation' && (
            <div className="animate-in fade-in duration-200">
              <DictationMaster
                lesson={currentLesson}
                onAddMistake={(char) => handleAddMistake(char, '听写测验写错')}
                onFinish={handleDictationFinished}
                onFinishExam={(score, stars) => {
                  setStarsCount((prev) => prev + stars * 3);
                  setInkCount((prev) => prev + Math.round(score / 2));
                }}
              />
            </div>
          )}
        </div>
      </main>

      {/* 手机端底部原生四大功能导航栏 (适配 Safe-Area 底部) */}
      <BottomTabBar
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        onOpenCharacterDictionary={() => setIsDictionaryOpen(true)}
        writtenCount={learningStats.writtenCorrectChars.length}
        totalCharactersCount={totalCurriculumCharactersCount}
      />

      {/* 弹窗：生字大厅档案 (会写、错题全览) */}
      <CharacterDictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        stats={learningStats}
        onSelectCharacterToPractice={handleSelectCharacterToPractice}
      />

      {/* 弹窗：成就勋章馆 */}
      <BadgeWallModal
        isOpen={isBadgeWallOpen}
        onClose={() => setIsBadgeWallOpen(false)}
        stats={learningStats}
      />

      {/* 弹窗：新成就解锁庆祝弹窗 */}
      <BadgeUnlockCelebration
        badge={activeNewBadge}
        onClose={() => setActiveNewBadge(null)}
      />

      {/* 弹窗：错题本 */}
      <ErrorBookModal
        isOpen={isErrorBookOpen}
        onClose={() => setIsErrorBookOpen(false)}
        mistakes={mistakeCharList}
        mistakeRecords={learningStats.mistakes}
        onSelectCharacter={(char) => {
          const match = currentLesson.characters.find((c) => c.char === char) || currentCharItem;
          handleSelectCharacterToPractice(match);
        }}
        onClearMistakes={() =>
          setLearningStats((prev) => ({ ...prev, mistakes: {} }))
        }
      />

      {/* 弹窗：护眼提示 */}
      <EyeCareModal
        isOpen={isEyeCareOpen}
        onClose={() => setIsEyeCareOpen(false)}
        onRewardEyeCareStar={() => {
          setStarsCount((prev) => prev + 1);
        }}
      />

      {/* 弹窗：安装到手机 */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        deferredPrompt={deferredPrompt}
        onTriggerInstall={handleTriggerInstall}
      />

      {/* 课文与年级选择抽屉 (移动端 Native Drawer) */}
      <CurriculumDrawer
        isOpen={isCurriculumDrawerOpen}
        onClose={() => setIsCurriculumDrawerOpen(false)}
        currentGrade={currentGrade}
        currentSemester={currentSemester}
        currentLessonId={currentLesson.id}
        onSelectCurriculum={handleSelectCurriculum}
        onSelectLesson={handleSelectLesson}
        charProgress={charProgress}
      />

      {/* 弹窗：声音与发音排查与设置 */}
      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
      />
    </div>
  );
}

export default App;
