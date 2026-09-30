// 数据模型定义

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type SemesterLevel = 1 | 2;

export interface CharacterItem {
  char: string;
  pinyin: string;
  tone: number; // 声调 1, 2, 3, 4, 0(轻声)
  radical: string; // 部首
  strokeCount: number; // 笔画数
  structure: string; // 结构：独体字、上下结构、左右结构、半包围
  strokeNames?: string[]; // 每笔名称：["横", "竖", "撇", "捺"]
  isWritingTarget: boolean; // 是否是写字表（true=会写，false=会认识字表）
  words: {
    word: string;
    pinyin: string;
    sentence?: string;
  }[];
}

// 听说读写一体化：经典古诗文诵读、口语交际、日积月累
export interface OralAndReadingItem {
  id: string;
  type: 'recite' | 'oral' | 'reading_accumulation'; // 经典诵读 | 口语交际 | 日积月累
  title: string;
  author?: string; // 作者与朝代（如：唐·李白）
  content: string; // 诵读或表达正文
  pinyin?: string; // 拼音注音
  guide?: string; // 名师启迪 / 口语交际表达小锦囊
  audioText?: string; // 朗读语音文本（用于朗读发音）
}

export interface Lesson {
  id: string;
  unit: number;
  lessonIndex: number;
  title: string;
  characters: CharacterItem[];
  dictationWords: {
    word: string;
    pinyin: string;
    sentence: string;
  }[];
  oralAndReading?: OralAndReadingItem[]; // 课文同步听说读内容
}

export interface Unit {
  unitNumber: number;
  title: string;
  lessons: Lesson[];
  oralCommunication?: OralAndReadingItem; // 单元口语交际
  accumulation?: OralAndReadingItem; // 单元日积月累
}

export interface TextbookCurriculum {
  grade: GradeLevel;
  semester: SemesterLevel;
  title: string;
  version: '人教版 (部编版)';
  units: Unit[];
}

export type LearningMode = 'stroke' | 'pinyin' | 'dictation' | 'recite';
export type StrokePracticeMode = 'animate' | 'trace' | 'quiz';
export type DictationType = 'screen' | 'paper';

export interface DictationResult {
  word: string;
  pinyin: string;
  passed: boolean;
  userStrokesCount?: number;
}

// 成就徽章系统模型
export type BadgeCategory = 'writing' | 'dictation' | 'mistake_clear' | 'streak';

export interface BadgeItem {
  id: string;
  category: BadgeCategory;
  title: string;
  icon: string;
  targetCount: number;
  description: string;
  rewardStars: number;
  rewardInk: number;
}

export interface MistakeRecord {
  count: number;
  lastDate: string;
  reasons: string[];
  firstDate?: string;
  consecutiveSuccess?: number; // 连续掌握次数 (达到2次即可彻底消除错题)
  ebinghausStage?: number; // 艾宾浩斯复习阶段: 0: 今日新错, 1: 1天待巩固, 2: 3天复习, 3: 7天抗遗忘挑战
}

export interface UserLearningStats {
  writtenCorrectChars: string[]; // 规范掌握的生字 (写字表满星/通关)
  mistakes: { [char: string]: MistakeRecord }; // 错字记录
  clearedMistakesCount: number; // 累计消灭的错字数
  totalDictationWordsPassed: number; // 听写正确词数
  streakDays: number; // 连续坚持学习天数
  lastActiveDate: string; // 上次学习日期 YYYY-MM-DD
  unlockedBadges: { [badgeId: string]: string }; // 解锁的徽章: badgeId -> unlockedAt
}
