import type { TextbookCurriculum } from '../../types';

export const GRADE_3_CURRICULUM: TextbookCurriculum[] = [
  {
    grade: 3,
    semester: 1,
    title: '三年级上册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 校园与伙伴',
        oralCommunication: {
          id: 'g3s1-u1-oral',
          type: 'oral',
          title: '口语交际：我的暑假生活',
          content: '选择暑假里最感兴趣的一件事（如学游泳、帮家里做家务、去乡下旅行），把过程讲清楚，说说自己的感受。',
          guide: '【名师锦囊】借助照片或小物件讲述，突出最精彩的细节，注意与听众有眼神互动。',
          audioText: '口语交际，我的暑假生活。讲清楚时间、地点和过程，分享真实的快乐感受。'
        },
        accumulation: {
          id: 'g3s1-u1-recite',
          type: 'recite',
          title: '古诗诵读《所见》',
          author: '清 · 袁枚',
          content: '牧童骑黄牛，歌声振林樾。意欲捕鸣蝉，忽然闭口立。',
          pinyin: 'mù tóng qí huáng niú, gē shēng zhèn lín yuè. yì yù bǔ míng chán, hū rán bì kǒu lì.',
          guide: '【名师导读】生动捕捉了牧童天真烂漫的神态：骑牛高歌与欲捕鸣蝉时的屏息静立，动静结合，跃然纸上。',
          audioText: '古诗诵读，所见。清，袁枚。牧童骑黄牛，歌声振林樾。意欲捕鸣蝉，忽然闭口立。'
        },
        lessons: [
          {
            id: 'g3s1-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文1《大青树下的小学》',
            characters: [
              {
                char: '晨',
                pinyin: 'chén',
                tone: 2,
                radical: '日',
                strokeCount: 11,
                structure: '上下结构',
                strokeNames: ['竖', '横折', '横', '横', '横', '撇', '横', '横', '竖提', '撇', '点'],
                isWritingTarget: true,
                words: [
                  { word: '早晨', pinyin: 'zǎo chén', sentence: '清晨的阳光洒在校园的操场上。' },
                  { word: '晨光', pinyin: 'chén guāng', sentence: '沐浴在柔和的晨光里读书。' }
                ]
              },
              {
                char: '绒',
                pinyin: 'róng',
                tone: 2,
                radical: '纟',
                strokeCount: 9,
                structure: '左右结构',
                strokeNames: ['撇折', '撇折', '提', '横', '横', '竖钩', '撇', '点', '点'],
                isWritingTarget: true,
                words: [
                  { word: '绒球', pinyin: 'róng qiú', sentence: '大青树上开满了粉红色的绒球花。' },
                  { word: '羽绒', pinyin: 'yǔ róng', sentence: '冬天的羽绒服很保暖。' }
                ]
              },
              {
                char: '球',
                pinyin: 'qiú',
                tone: 2,
                radical: '王',
                strokeCount: 11,
                structure: '左右结构',
                strokeNames: ['横', '横', '竖', '提', '横', '竖钩', '点', '提', '撇', '捺', '点'],
                isWritingTarget: true,
                words: [
                  { word: '足球', pinyin: 'zú qiú', sentence: '同学们在绿茵场上踢足球。' },
                  { word: '地球', pinyin: 'dì qiú', sentence: '地球是我们共同的美丽家园。' }
                ]
              },
              {
                char: '汉',
                pinyin: 'hàn',
                tone: 4,
                radical: '氵',
                strokeCount: 5,
                structure: '左右结构',
                strokeNames: ['点', '点', '提', '横撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '汉字', pinyin: 'hàn zì', sentence: '汉字是世界上最美丽的文字之一。' },
                  { word: '汉语', pinyin: 'hàn yǔ', sentence: '我们要学好规范的普通话与汉语。' }
                ]
              }
            ],
            dictationWords: [
              { word: '早晨', pinyin: 'zǎo chén', sentence: '清凉的[早晨]，同学们背着书包高高兴兴去上学。' },
              { word: '汉字', pinyin: 'hàn zì', sentence: '一笔一画认真书写规范的[汉字]。' },
              { word: '鲜艳', pinyin: 'xiān yàn', sentence: '操场上的五星红旗迎风飘扬，格外[鲜艳]。' },
              { word: '敬礼', pinyin: 'jìng lǐ', sentence: '升国旗时，少先队员向国旗庄严[敬礼]。' }
            ]
          },
          {
            id: 'g3s1-u1-l2',
            unit: 1,
            lessonIndex: 2,
            title: '课文2《花的学校》',
            characters: [
              {
                char: '落',
                pinyin: 'luò',
                tone: 4,
                radical: '艹',
                strokeCount: 12,
                structure: '上下结构',
                strokeNames: ['横', '竖', '竖', '点', '点', '提', '撇', '竖', '横折', '横', '撇', '点'],
                isWritingTarget: true,
                words: [
                  { word: '落下', pinyin: 'luò xià', sentence: '雨滴从天空中纷纷落下。' },
                  { word: '落叶', pinyin: 'luò yè', sentence: '秋天的落叶铺满了林间小道。' }
                ]
              },
              {
                char: '荒',
                pinyin: 'huāng',
                tone: 1,
                radical: '艹',
                strokeCount: 9,
                structure: '上下结构',
                strokeNames: ['横', '竖', '竖', '点', '横', '竖折', '撇', '竖弯钩', '点'],
                isWritingTarget: true,
                words: [
                  { word: '荒野', pinyin: 'huāng yě', sentence: '一群群花朵在荒野里欢跳狂欢。' },
                  { word: '荒地', pinyin: 'huāng dì', sentence: '荒地被开垦成了美丽的菜园。' }
                ]
              },
              {
                char: '笛',
                pinyin: 'dí',
                tone: 2,
                radical: '⺮',
                strokeCount: 11,
                structure: '上下结构',
                strokeNames: ['撇', '横', '点', '撇', '横', '点', '竖', '横折', '横', '竖', '横'],
                isWritingTarget: true,
                words: [
                  { word: '笛子', pinyin: 'dí zi', sentence: '雷云在天空中轰响，狂风吹着竹笛。' },
                  { word: '汽笛', pinyin: 'qì dí', sentence: '远处的轮船鸣响了响亮的汽笛。' }
                ]
              }
            ],
            dictationWords: [
              { word: '荒野', pinyin: 'huāng yě', sentence: '春天来临，五彩斑斓的花朵开遍了[荒野]。' },
              { word: '跳舞', pinyin: 'tiào wǔ', sentence: '美丽的花瓣在微风中像小仙女一样翩翩[跳舞]。' },
              { word: '狂欢', pinyin: 'kuáng huān', sentence: '节日里，大街小巷洋溢着[狂欢]的热烈气氛。' }
            ]
          }
        ]
      },
      {
        unitNumber: 2,
        title: '第二单元 金秋时节',
        oralCommunication: {
          id: 'g3s1-u2-oral',
          type: 'oral',
          title: '口语交际：名字里的故事',
          content: '回家向长辈了解自己名字的含义和寄托的期望，在班级里分享自己名字里的有趣故事。',
          guide: '【名师锦囊】讲明白名字的字面意思和父母的期盼，带着自豪感讲述。',
          audioText: '口语交际，名字里的故事。讲清父母起名的美好寄托，语言生动有感情。'
        },
        accumulation: {
          id: 'g3s1-u2-recite',
          type: 'recite',
          title: '古诗诵读《山行》',
          author: '唐 · 杜牧',
          content: '远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。',
          pinyin: 'yuǎn shàng hán shān shí jìng xiá, bái yún shēng chù yǒu rén jiā. tíng chē zuò ài fēng lín wǎn, shuāng yè hóng yú èr yuè huā.',
          guide: '【名师导读】杜牧笔下的深秋山行充满生机与热情，“霜叶红于二月花”更是千古传诵的名句，展现了战胜严霜的昂扬生机。',
          audioText: '古诗诵读，山行。唐，杜牧。远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。'
        },
        lessons: [
          {
            id: 'g3s1-u2-l1',
            unit: 2,
            lessonIndex: 1,
            title: '课文6《秋天的雨》',
            characters: [
              {
                char: '盒',
                pinyin: 'hé',
                tone: 2,
                radical: '皿',
                strokeCount: 11,
                structure: '上下结构',
                strokeNames: ['撇', '捺', '横', '竖', '横折', '横', '竖', '横折', '竖', '竖', '横'],
                isWritingTarget: true,
                words: [
                  { word: '盒子', pinyin: 'hé zi', sentence: '秋天的雨有一盒五彩缤纷的颜料。' },
                  { word: '饭盒', pinyin: 'fàn hé', sentence: '把饭盒洗刷得干干净净。' }
                ]
              },
              {
                char: '颜',
                pinyin: 'yán',
                tone: 2,
                radical: '页',
                strokeCount: 15,
                structure: '左右结构',
                strokeNames: ['点', '横', '点', '撇', '横', '竖', '提', '撇', '撇', '撇', '横', '撇', '竖', '横折', '撇', '点'],
                isWritingTarget: true,
                words: [
                  { word: '颜色', pinyin: 'yán sè', sentence: '秋天将美丽的颜色分给了大自然。' },
                  { word: '容颜', pinyin: 'róng yán', sentence: '妈妈脸上露出了慈爱的容颜。' }
                ]
              },
              {
                char: '料',
                pinyin: 'liào',
                tone: 4,
                radical: '斗',
                strokeCount: 10,
                structure: '左右结构',
                strokeNames: ['点', '点', '撇', '横', '竖', '撇', '点', '点', '横', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '材料', pinyin: 'cái liào', sentence: '用收集来的落叶做手工作品的材料。' },
                  { word: '颜料', pinyin: 'yán liào', sentence: '金黄的颜料染亮了整片银杏树。' }
                ]
              }
            ],
            dictationWords: [
              { word: '清凉', pinyin: 'qīng liáng', sentence: '秋天的雨是一把[清凉]而温柔的钥匙。' },
              { word: '颜料', pinyin: 'yán liào', sentence: '秋天有一盒神奇五彩的[颜料]。' },
              { word: '丰收', pinyin: 'fēng shōu', sentence: '金秋时节，田野里到处是一派[丰收]的欢乐景象。' }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 3,
    semester: 2,
    title: '三年级下册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 可爱的生灵',
        oralCommunication: {
          id: 'g3s2-u1-oral',
          type: 'oral',
          title: '口语交际：春游去哪儿玩',
          content: '讨论春游地点，提出你的建议，说明理由（风景优美、有丰富的游玩项目），并倾听并商量采纳大家的意见。',
          guide: '【名师锦囊】说话要有理有据，陈述理由时条理清晰（第一、第二），尊重他人想法。',
          audioText: '口语交际，春游去哪儿玩。说清楚想去的地方和理由，耐心听取伙伴的想法。'
        },
        accumulation: {
          id: 'g3s2-u1-recite',
          type: 'recite',
          title: '古诗诵读《绝句》',
          author: '唐 · 杜甫',
          content: '迟日江山丽，春风花草香。泥融飞燕子，沙暖睡鸳鸯。',
          pinyin: 'chí rì jiāng shān lì, chūn fēng huā cǎo xiāng. ní róng fēi yàn zi, shā nuǎn shuì yuān yāng.',
          guide: '【名师导读】诗圣杜甫笔下的成都草堂春日，色彩绚烂，燕子筑巢，鸳鸯安睡，充满了安宁祥和与生机。',
          audioText: '古诗诵读，绝句。唐，杜甫。迟日江山丽，春风花草香。泥融飞燕子，沙暖睡鸳鸯。'
        },
        lessons: [
          {
            id: 'g3s2-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文3《荷花》',
            characters: [
              {
                char: '瓣',
                pinyin: 'bàn',
                tone: 4,
                radical: '辛',
                strokeCount: 19,
                structure: '左中右结构',
                strokeNames: ['点', '横', '点', '撇', '横', '竖', '提', '撇', '撇折', '点', '点', '横', '点', '撇', '横', '竖', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '花瓣', pinyin: 'huā bàn', sentence: '荷花已经展开了两三片花瓣儿。' },
                  { word: '豆瓣', pinyin: 'dòu bàn', sentence: '嫩绿的豆瓣破土而出。' }
                ]
              },
              {
                char: '蓬',
                pinyin: 'péng',
                tone: 2,
                radical: '艹',
                strokeCount: 13,
                structure: '上下结构',
                strokeNames: ['横', '竖', '竖', '撇', '横折钩', '横', '横', '竖', '点', '点', '横折折撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '莲蓬', pinyin: 'lián peng', sentence: '荷花冒出了嫩黄色的小莲蓬。' },
                  { word: '蓬勃', pinyin: 'péng bó', sentence: '春天的万物充满蓬勃生机。' }
                ]
              },
              {
                char: '姿',
                pinyin: 'zī',
                tone: 1,
                radical: '女',
                strokeCount: 9,
                structure: '上下结构',
                strokeNames: ['点', '提', '撇', '横折', '撇', '捺', '撇点', '撇', '横'],
                isWritingTarget: true,
                words: [
                  { word: '姿势', pinyin: 'zī shì', sentence: '看看这一朵很美，看看那一朵姿势也十分优美。' },
                  { word: '姿态', pinyin: 'zī tài', sentence: '荷花千姿百态，美不胜收。' }
                ]
              }
            ],
            dictationWords: [
              { word: '花瓣', pinyin: 'huā bàn', sentence: '粉白相间的[花瓣]在微风中轻轻摇曳。' },
              { word: '荷花', pinyin: 'hé huā', sentence: '池塘里亭亭玉立的[荷花]散发着淡淡清香。' },
              { word: '姿势', pinyin: 'zī shì', sentence: '阅读书写时一定要保持挺拔端正的[姿势]。' }
            ]
          }
        ]
      }
    ]
  }
];
