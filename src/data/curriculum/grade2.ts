import type { TextbookCurriculum } from '../../types';

export const GRADE_2_CURRICULUM: TextbookCurriculum[] = [
  {
    grade: 2,
    semester: 1,
    title: '二年级上册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 大自然的秘密',
        oralCommunication: {
          id: 'g2s1-u1-oral',
          type: 'oral',
          title: '口语交际：有趣的动物',
          content: '介绍一种你最喜欢的小动物。说说它长什么样子，有什么生活习性，为什么觉得它特别有趣。',
          guide: '【名师锦囊】先想好按什么顺序讲（外形、习性、本领），吐字清晰，态度大方自然。',
          audioText: '口语交际，有趣的动物。先说外形特点，再说生活习性，声音响亮有礼貌。'
        },
        accumulation: {
          id: 'g2s1-u1-recite',
          type: 'recite',
          title: '古诗诵读《梅花》',
          author: '宋 · 王安石',
          content: '墙角数枝梅，凌寒独自开。遥知不是雪，为有暗香来。',
          pinyin: 'qiáng jiǎo shù zhī méi, líng hán dú zì kāi. yáo zhī bù shì xuě, wèi yǒu àn xiāng lái.',
          guide: '【名师导读】赞美梅花在严寒风雪中傲然挺立的高洁品格与缕缕幽香。',
          audioText: '古诗诵读，梅花。宋，王安石。墙角数枝梅，凌寒独自开。遥知不是雪，为有暗香来。'
        },
        lessons: [
          {
            id: 'g2s1-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文1《小蝌蚪找妈妈》',
            characters: [
              {
                char: '两',
                pinyin: 'liǎng',
                tone: 3,
                radical: '一',
                strokeCount: 7,
                structure: '独体字',
                strokeNames: ['横', '竖', '横折钩', '撇', '点', '撇', '点'],
                isWritingTarget: true,
                words: [
                  { word: '两个', pinyin: 'liǎng gè', sentence: '我有两只可爱的小乌龟。' },
                  { word: '两岸', pinyin: 'liǎng àn', sentence: '两岸猿声啼不住。' }
                ]
              },
              {
                char: '哪',
                pinyin: 'nǎ',
                tone: 3,
                radical: '口',
                strokeCount: 9,
                structure: '左中右结构',
                strokeNames: ['竖', '横折', '横', '横折', '横', '横', '撇', '横折折折钩', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '哪里', pinyin: 'nǎ lǐ', sentence: '小蝌蚪在池塘里找妈妈：“妈妈在哪里？”' }
                ]
              },
              {
                char: '宽',
                pinyin: 'kuān',
                tone: 1,
                radical: '宀',
                strokeCount: 10,
                structure: '上下结构',
                strokeNames: ['点', '点', '横撇', '横', '竖', '竖', '横', '撇', '竖弯钩', '点'],
                isWritingTarget: true,
                words: [
                  { word: '宽阔', pinyin: 'kuān kuò', sentence: '宽阔的马路上车来车往。' },
                  { word: '宽嘴巴', pinyin: 'kuān zuǐ ba', sentence: '青蛙妈妈长着一张宽嘴巴。' }
                ]
              }
            ],
            dictationWords: [
              { word: '两个', pinyin: 'liǎng gè', sentence: '池塘里有[两个]调皮的小蝌蚪。' },
              { word: '哪里', pinyin: 'nǎ lǐ', sentence: '请问去图书馆的路在[哪里]？' },
              { word: '宽阔', pinyin: 'kuān kuò', sentence: '奔腾的江水流淌在[宽阔]的大地之上。' }
            ]
          },
          {
            id: 'g2s1-u1-l2',
            unit: 1,
            lessonIndex: 2,
            title: '课文3《植物妈妈有办法》',
            characters: [
              {
                char: '法',
                pinyin: 'fǎ',
                tone: 3,
                radical: '氵',
                strokeCount: 8,
                structure: '左右结构',
                strokeNames: ['点', '点', '提', '横', '竖', '横', '撇折', '点'],
                isWritingTarget: true,
                words: [
                  { word: '办法', pinyin: 'bàn fǎ', sentence: '植物妈妈有各种各样的好办法。' },
                  { word: '方法', pinyin: 'fāng fǎ', sentence: '掌握良好的学习方法事半功倍。' }
                ]
              },
              {
                char: '如',
                pinyin: 'rú',
                tone: 2,
                radical: '女',
                strokeCount: 6,
                structure: '左右结构',
                strokeNames: ['撇点', '撇', '横', '竖', '横折', '横'],
                isWritingTarget: true,
                words: [
                  { word: '如果', pinyin: 'rú guǒ', sentence: '如果明天下雨，我们就室内运动。' }
                ]
              },
              {
                char: '脚',
                pinyin: 'jiǎo',
                tone: 3,
                radical: '月',
                strokeCount: 11,
                structure: '左中右结构',
                strokeNames: ['撇', '横折钩', '横', '横', '横', '竖', '提', '横撇', '捺', '横折折折钩', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '脚步', pinyin: 'jiǎo bù', sentence: '春天的脚步越来越近了。' },
                  { word: '脚印', pinyin: 'jiǎo yìn', sentence: '雪地上留下一串小狗的脚印。' }
                ]
              }
            ],
            dictationWords: [
              { word: '办法', pinyin: 'bàn fǎ', sentence: '遇到困难要多动脑筋想[办法]。' },
              { word: '如果', pinyin: 'rú guǒ', sentence: '[如果]你仔细观察，就会发现大自然的许多秘密。' },
              { word: '脚步', pinyin: 'jiǎo bù', sentence: '小书童加快了前进的[脚步]。' }
            ]
          }
        ]
      },
      {
        unitNumber: 3,
        title: '第三单元 家国与风光',
        oralCommunication: {
          id: 'g2s1-u3-oral',
          type: 'oral',
          title: '口语交际：商量',
          content: '想和别人商量事情，要用礼貌客气的语气，讲清原因。例如借用同学的彩笔或调换座位。',
          guide: '【名师锦囊】商量时多用“请问”、“可以吗”，被拒绝也不发脾气。',
          audioText: '口语交际，商量。有礼貌，讲清原因，态度温和。'
        },
        accumulation: {
          id: 'g2s1-u3-recite',
          type: 'recite',
          title: '古诗诵读《登鹳雀楼》',
          author: '唐 · 王之涣',
          content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。',
          pinyin: 'bái rì yī shān jìn, huáng hé rù hǎi liú. yù qióng qiān lǐ mù, gèng shàng yì céng lóu.',
          guide: '【名师导读】站得高才能看得远，激励孩子们勇于攀登、不断进步。',
          audioText: '古诗诵读，登鹳雀楼。唐，王之涣。白日依山尽，黄河入海流。欲穷千里目，更上一层楼。'
        },
        lessons: [
          {
            id: 'g2s1-u3-l1',
            unit: 3,
            lessonIndex: 1,
            title: '课文8《黄山奇石》',
            characters: [
              {
                char: '巨',
                pinyin: 'jù',
                tone: 4,
                radical: '匚',
                strokeCount: 4,
                structure: '半包围',
                strokeNames: ['横', '横折', '横', '竖折'],
                isWritingTarget: true,
                words: [
                  { word: '巨大', pinyin: 'jù dà', sentence: '黄山上有许多巨大的怪石。' },
                  { word: '巨人', pinyin: 'jù rén', sentence: '童话里住着一个善良的巨人。' }
                ]
              },
              {
                char: '位',
                pinyin: 'wèi',
                tone: 4,
                radical: '亻',
                strokeCount: 7,
                structure: '左右结构',
                strokeNames: ['撇', '竖', '点', '横', '点', '撇', '横'],
                isWritingTarget: true,
                words: [
                  { word: '座位', pinyin: 'zuò wèi', sentence: '同学们坐在自己的座位上认真听讲。' },
                  { word: '每位', pinyin: 'měi wèi', sentence: '每位小朋友都有一本心爱的故事书。' }
                ]
              },
              {
                char: '每',
                pinyin: 'měi',
                tone: 3,
                radical: '母',
                strokeCount: 7,
                structure: '上下结构',
                strokeNames: ['撇', '横', '竖折', '横折钩', '点', '横', '点'],
                isWritingTarget: true,
                words: [
                  { word: '每天', pinyin: 'měi tiān', sentence: '我们每天早晨坚持早读。' },
                  { word: '每次', pinyin: 'měi cì', sentence: '每次练习都力求笔画规范。' }
                ]
              }
            ],
            dictationWords: [
              { word: '巨大', pinyin: 'jù dà', sentence: '眼前矗立着一块[巨大]的岩石。' },
              { word: '每位', pinyin: 'měi wèi', sentence: '老师亲切地看着[每位]同学。' },
              { word: '座位', pinyin: 'zuò wèi', sentence: '下课后把自己的[座位]整理得干干净净。' }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 2,
    semester: 2,
    title: '二年级下册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 春天的发现',
        oralCommunication: {
          id: 'g2s2-u1-oral',
          type: 'oral',
          title: '口语交际：注意说话的语气',
          content: '说话的语气不同，听者的感受完全不一样。用商量、温和的语气说话，别人更容易接受。',
          guide: '【名师锦囊】避免命令指责，多用“麻烦你帮个忙好吗？”代替“快点给我拿过来！”。',
          audioText: '口语交际，注意说话的语气。语气温和有礼，别人更乐意帮助你。'
        },
        accumulation: {
          id: 'g2s2-u1-recite',
          type: 'recite',
          title: '古诗诵读《赋得古原草送别》',
          author: '唐 · 白居易',
          content: '离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。',
          pinyin: 'lí lí yuán shàng cǎo, yí suì yì kū róng. yě huǒ shāo bú jìn, chūn fēng chuī yòu shēng.',
          guide: '【名师导读】赞扬小草生生不息、顽强坚韧的顽强生命力。',
          audioText: '古诗诵读，赋得古原草送别。唐，白居易。离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。'
        },
        lessons: [
          {
            id: 'g2s2-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文1《古诗二首 - 村居》',
            characters: [
              {
                char: '诗',
                pinyin: 'shī',
                tone: 1,
                radical: '讠',
                strokeCount: 8,
                structure: '左右结构',
                strokeNames: ['点', '横折提', '横', '竖', '横', '竖', '点'],
                isWritingTarget: true,
                words: [
                  { word: '古诗', pinyin: 'gǔ shī', sentence: '我们每天早晨背诵古诗。' },
                  { word: '诗人', pinyin: 'shī rén', sentence: '李白是伟大的诗人。' }
                ]
              },
              {
                char: '村',
                pinyin: 'cūn',
                tone: 1,
                radical: '木',
                strokeCount: 7,
                structure: '左右结构',
                strokeNames: ['横', '竖', '撇', '点', '横', '竖钩', '点'],
                isWritingTarget: true,
                words: [
                  { word: '农村', pinyin: 'nóng cūn', sentence: '农村的空气格外清新。' },
                  { word: '村子', pinyin: 'cūn zi', sentence: '小村子依山傍水风景好。' }
                ]
              },
              {
                char: '绿',
                pinyin: 'lǜ',
                tone: 4,
                radical: '纟',
                strokeCount: 11,
                structure: '左右结构',
                strokeNames: ['撇折', '撇折', '提', '横折', '横', '横', '竖钩', '撇', '点'],
                isWritingTarget: true,
                words: [
                  { word: '绿色', pinyin: 'lǜ sè', sentence: '春天的小草是绿色的。' },
                  { word: '绿树', pinyin: 'lǜ shù', sentence: '绿树成荫带来清凉。' }
                ]
              }
            ],
            dictationWords: [
              { word: '古诗', pinyin: 'gǔ shī', sentence: '同学们在课堂上齐声背诵[古诗]。' },
              { word: '村子', pinyin: 'cūn zi', sentence: '美丽的小[村子]鲜花开满路旁。' },
              { word: '绿色', pinyin: 'lǜ sè', sentence: '山坡上长满了嫩[绿色]的小草。' }
            ]
          },
          {
            id: 'g2s2-u1-l2',
            unit: 1,
            lessonIndex: 2,
            title: '课文2《找春天》',
            characters: [
              {
                char: '冲',
                pinyin: 'chōng',
                tone: 1,
                radical: '冫',
                strokeCount: 6,
                structure: '左右结构',
                strokeNames: ['点', '提', '竖', '横折', '横', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '冲出', pinyin: 'chōng chū', sentence: '我们冲出家门，奔向田野。' },
                  { word: '冲向', pinyin: 'chōng xiàng', sentence: '小河水哗哗地冲向前方。' }
                ]
              },
              {
                char: '寻',
                pinyin: 'xún',
                tone: 2,
                radical: '寸',
                strokeCount: 6,
                structure: '上下结构',
                strokeNames: ['横折', '横', '横', '横', '竖钩', '点'],
                isWritingTarget: true,
                words: [
                  { word: '寻找', pinyin: 'xún zhǎo', sentence: '我们在草丛里寻找春天的足迹。' },
                  { word: '搜寻', pinyin: 'sōu xún', sentence: '小松鼠在树洞周围搜寻松果。' }
                ]
              },
              {
                char: '姑',
                pinyin: 'gū',
                tone: 1,
                radical: '女',
                strokeCount: 8,
                structure: '左右结构',
                strokeNames: ['撇点', '撇', '横', '横', '竖', '竖', '横折', '横'],
                isWritingTarget: true,
                words: [
                  { word: '姑娘', pinyin: 'gū niang', sentence: '春天像个害羞的小姑娘。' },
                  { word: '姑姑', pinyin: 'gū gu', sentence: '周末姑姑带我去公园玩。' }
                ]
              }
            ],
            dictationWords: [
              { word: '寻找', pinyin: 'xún zhǎo', sentence: '大家结伴去大自然里[寻找]春天的影子。' },
              { word: '姑娘', pinyin: 'gū niang', sentence: '勤劳善良的小[姑娘]正在整理书桌。' },
              { word: '冲出', pinyin: 'chōng chū', sentence: '下课铃响了，孩子们笑着[冲出]教室。' }
            ]
          }
        ]
      }
    ]
  }
];
