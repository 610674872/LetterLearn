import type { BadgeItem, UserLearningStats } from '../types';

export const ALL_BADGES: BadgeItem[] = [
  // 1. 会写字与规范笔顺阶梯 (Writing Milestones)
  {
    id: 'write_5',
    category: 'writing',
    title: '握笔小萌芽',
    icon: '🌱',
    targetCount: 5,
    description: '写对 5 个生字，迈开工整练字第一步！',
    rewardStars: 5,
    rewardInk: 20,
  },
  {
    id: 'write_10',
    category: 'writing',
    title: '写字小新星',
    icon: '✏️',
    targetCount: 10,
    description: '写对 10 个生字，每一笔都工工整整！',
    rewardStars: 8,
    rewardInk: 30,
  },
  {
    id: 'write_30',
    category: 'writing',
    title: '笔画真端正',
    icon: '🖋️',
    targetCount: 30,
    description: '写对 30 个生字，字写在田字格正中间！',
    rewardStars: 15,
    rewardInk: 60,
  },
  {
    id: 'write_50',
    category: 'writing',
    title: '笔顺小能手',
    icon: '🌸',
    targetCount: 50,
    description: '写对 50 个生字，不倒插笔，握笔越来越棒！',
    rewardStars: 25,
    rewardInk: 120,
  },
  {
    id: 'write_100',
    category: 'writing',
    title: '写字大通关',
    icon: '📜',
    targetCount: 100,
    description: '写对 100 个生字，掌握整册人教版核心字！',
    rewardStars: 40,
    rewardInk: 200,
  },
  {
    id: 'write_200',
    category: 'writing',
    title: '写字小高手',
    icon: '💎',
    targetCount: 200,
    description: '写对 200 个生字，老师和爸妈看了都夸赞！',
    rewardStars: 60,
    rewardInk: 300,
  },
  {
    id: 'write_300',
    category: 'writing',
    title: '汉字小状元',
    icon: '👑',
    targetCount: 300,
    description: '写对 300 个生字，什么难写的字都难不倒你！',
    rewardStars: 80,
    rewardInk: 450,
  },
  {
    id: 'write_500',
    category: 'writing',
    title: '超级写字大王',
    icon: '🏆',
    targetCount: 500,
    description: '写对 500 个生字，全能书法小标兵！',
    rewardStars: 100,
    rewardInk: 600,
  },

  // 2. 听写准确度阶梯 (Dictation Milestones)
  {
    id: 'dict_10',
    category: 'dictation',
    title: '听写小能手',
    icon: '🎧',
    targetCount: 10,
    description: '听写写对 10 个词语，小耳朵真灵敏！',
    rewardStars: 8,
    rewardInk: 30,
  },
  {
    id: 'dict_30',
    category: 'dictation',
    title: '听写小飞侠',
    icon: '🎯',
    targetCount: 30,
    description: '听写写对 30 个词语，一听就能快速写出来！',
    rewardStars: 15,
    rewardInk: 70,
  },
  {
    id: 'dict_50',
    category: 'dictation',
    title: '听写大满贯',
    icon: '🌟',
    targetCount: 50,
    description: '听写写对 50 个词语，本册词语全部掌握！',
    rewardStars: 30,
    rewardInk: 150,
  },

  // 3. 错题消灭阶梯 (Mistake Clearing)
  {
    id: 'clear_1',
    category: 'mistake_clear',
    title: '错字消灭者',
    icon: '🛡️',
    targetCount: 1,
    description: '成功改对第 1 个错别字，知错就改最棒啦！',
    rewardStars: 5,
    rewardInk: 20,
  },
  {
    id: 'clear_5',
    category: 'mistake_clear',
    title: '改错小标兵',
    icon: '⚔️',
    targetCount: 5,
    description: '消灭 5 个容易混淆或倒插笔的生字！',
    rewardStars: 15,
    rewardInk: 60,
  },
  {
    id: 'clear_20',
    category: 'mistake_clear',
    title: '金牌纠错官',
    icon: '🏅',
    targetCount: 20,
    description: '攻克 20 个错别字，生字再也不会写错啦！',
    rewardStars: 35,
    rewardInk: 160,
  },

  // 4. 坚持打卡自律阶梯 (Streaks)
  {
    id: 'streak_3',
    category: 'streak',
    title: '三天好习惯',
    icon: '📅',
    targetCount: 3,
    description: '连续练习打卡 3 天，每天都在进步！',
    rewardStars: 10,
    rewardInk: 40,
  },
  {
    id: 'streak_7',
    category: 'streak',
    title: '一周小自律',
    icon: '🔥',
    targetCount: 7,
    description: '连续练习打卡 7 天，天天来练字成习惯！',
    rewardStars: 25,
    rewardInk: 100,
  },
];

/**
 * 计算徽章当前完成进度
 */
export function getBadgeProgress(badge: BadgeItem, stats: UserLearningStats): { current: number; percent: number; isUnlocked: boolean } {
  let current = 0;

  switch (badge.category) {
    case 'writing':
      current = stats.writtenCorrectChars.length;
      break;
    case 'dictation':
      current = stats.totalDictationWordsPassed;
      break;
    case 'mistake_clear':
      current = stats.clearedMistakesCount;
      break;
    case 'streak':
      current = stats.streakDays;
      break;
  }

  const isUnlocked = !!stats.unlockedBadges[badge.id] || current >= badge.targetCount;
  const percent = Math.min(100, Math.floor((current / badge.targetCount) * 100));

  return { current, percent, isUnlocked };
}

/**
 * 校验并返回本次刚刚解锁的新徽章
 */
export function evaluateNewBadges(stats: UserLearningStats): { newBadges: BadgeItem[]; updatedUnlockedMap: { [id: string]: string } } {
  const newBadges: BadgeItem[] = [];
  const updatedUnlockedMap = { ...stats.unlockedBadges };
  const todayStr = new Date().toISOString().split('T')[0];

  for (const badge of ALL_BADGES) {
    if (!updatedUnlockedMap[badge.id]) {
      const { current } = getBadgeProgress(badge, stats);
      if (current >= badge.targetCount) {
        newBadges.push(badge);
        updatedUnlockedMap[badge.id] = todayStr;
      }
    }
  }

  return { newBadges, updatedUnlockedMap };
}
