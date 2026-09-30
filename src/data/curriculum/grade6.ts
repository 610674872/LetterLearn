import type { TextbookCurriculum } from '../../types';

export const GRADE_6_CURRICULUM: TextbookCurriculum[] = [
  {
    grade: 6,
    semester: 1,
    title: '六年级上册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 触摸大自然',
        oralCommunication: {
          id: 'g6s1-u1-oral',
          type: 'oral',
          title: '口语交际：演讲',
          content: '围绕“科学与生活”或“读书伴我成长”发表简短演讲。观点鲜明，感情真挚，富有号召力。',
          guide: '【名师锦囊】列好演讲提纲，眼神注视台下听众，语调抑扬顿挫，手势自然得体。',
          audioText: '口语交际，演讲。观点明确，感情充沛，声音洪亮，仪态落落大方。'
        },
        accumulation: {
          id: 'g6s1-u1-recite',
          type: 'recite',
          title: '古诗诵读《西江月·夜行黄沙道中》',
          author: '宋 · 辛弃疾',
          content: '明月别枝惊鹊，清风半夜鸣蝉。稻花香里说丰年，听取蛙声一片。七八个星天外，两三点雨山前。旧时茅店社林边，路转溪桥忽见。',
          pinyin: 'míng yuè bié zhī jīng què, qīng fēng bàn yè míng chán. dào huā xiāng lǐ shuō fēng nián, tīng qǔ wā shēng yí piàn. qī bā gè xīng tiān wài, liǎng sān diǎn yǔ shān qián. jiù shí máo diàn shè lín biān, lù zhuǎn xī qiáo hū xiàn.',
          guide: '【名师导读】词人辛弃疾用轻快纯朴的语言，勾勒出江南夏夜山行清幽宁静又充满丰收欢欣的田园画卷。',
          audioText: '古诗诵读，西江月夜行黄沙道中。宋，辛弃疾。明月别枝惊鹊，清风半夜鸣蝉。稻花香里说丰年，听取蛙声一片。'
        },
        lessons: [
          {
            id: 'g6s1-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文1《草原》',
            characters: [
              {
                char: '毯',
                pinyin: 'tǎn',
                tone: 3,
                radical: '毛',
                strokeCount: 12,
                structure: '半包围',
                strokeNames: ['撇', '横', '横', '竖弯钩', '点', '点', '撇', '撇', '撇', '点', '点', '点'],
                isWritingTarget: true,
                words: [
                  { word: '地毯', pinyin: 'dì tǎn', sentence: '那里的天比别处的更可爱，空气是那么清鲜，天空是那么明朗。' },
                  { word: '毛毯', pinyin: 'máo tǎn', sentence: '羊群一会儿上了小丘，一会儿又下来，走在哪里都像给无边的绿毯绣上了白色大花。' }
                ]
              },
              {
                char: '渲',
                pinyin: 'xuàn',
                tone: 4,
                radical: '氵',
                strokeCount: 12,
                structure: '左右结构',
                strokeNames: ['点', '点', '提', '点', '点', '横撇', '横', '竖', '横折', '横', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '渲染', pinyin: 'xuàn rǎn', sentence: '那些小丘的线条是那么柔美，就像只用绿色渲染，不用墨线勾勒的中国画那样。' }
                ]
              },
              {
                char: '蹄',
                pinyin: 'tí',
                tone: 2,
                radical: '足',
                strokeCount: 16,
                structure: '左右结构',
                strokeNames: ['竖', '横折', '横', '竖', '横', '竖', '提', '点', '横', '点', '撇', '点', '横折', '横', '横', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '马蹄', pinyin: 'mǎ tí', sentence: '静寂的草原热闹起来：欢呼声，车声，马蹄声，响成一片。' },
                  { word: '蹄子', pinyin: 'tí zi', sentence: '骏马扬起健壮的蹄子奔驰在辽阔的草原上。' }
                ]
              }
            ],
            dictationWords: [
              { word: '清鲜', pinyin: 'qīng xiān', sentence: '草原上的空气是那么[清鲜]，天空是那么明朗。' },
              { word: '一碧千里', pinyin: 'yí bì qiān lǐ', sentence: '放眼望去，辽阔的平原[一碧千里]，而并不茫茫。' },
              { word: '翠色欲流', pinyin: 'cuì sè yù liú', sentence: '到处都是青草，[翠色欲流]，轻轻流入云际。' },
              { word: '蒙汉情深', pinyin: 'měng hàn qíng shēn', sentence: '[蒙汉情深]何忍别，天涯碧草话斜阳！' }
            ]
          }
        ]
      },
      {
        unitNumber: 8,
        title: '第八单元 走近鲁迅',
        oralCommunication: {
          id: 'g6s1-u8-oral',
          type: 'oral',
          title: '口语交际：请你支持我',
          content: '向老师或校长提出举办一次校园跳蚤市场或建立班级图书角的建议，用充分的理由争取对方支持。',
          guide: '【名师锦囊】态度诚恳谦逊，把可能遇到的顾虑（安全、时间、卫生）提前设想好解决预案。',
          audioText: '口语交际，请你支持我。理由充分，考虑周全，诚恳沟通，打消顾虑。'
        },
        accumulation: {
          id: 'g6s1-u8-recite',
          type: 'recite',
          title: '经典名言《鲁迅名言集》',
          author: '鲁迅',
          content: '其实地上本没有路，走的人多了，也便成了路。惟有民魂是值得宝贵的，惟有他发扬起来，中国才有真进步。',
          pinyin: 'qí shí dì shàng běn méi yǒu lù, zǒu de rén duō le, yě biàn chéng le lù. wéi yǒu mín hún shì zhí de bǎo guì de, wéi yǒu tā fā yáng qǐ lái, zhōng guó cái yǒu zhēn jìn bù.',
          guide: '【名师导读】深沉而富有哲理的名言，激励着一代代青年人敢于开拓创新、勇于拼搏奉献。',
          audioText: '经典名言诵读。其实地上本没有路，走的人多了，也便成了路。'
        },
        lessons: [
          {
            id: 'g6s1-u8-l1',
            unit: 8,
            lessonIndex: 1,
            title: '课文24《少年闰土》',
            characters: [
              {
                char: '捏',
                pinyin: 'niē',
                tone: 1,
                radical: '扌',
                strokeCount: 10,
                structure: '左右结构',
                strokeNames: ['横', '竖钩', '提', '竖', '横折', '横', '横', '横', '竖', '横'],
                isWritingTarget: true,
                words: [
                  { word: '捏着', pinyin: 'niē zhe', sentence: '深蓝的天空中挂着一轮金黄的圆月，下面是海边的沙地，都种着一望无际的碧绿的西瓜。其间有一个十一二岁的少年，项带银圈，手捏一柄钢叉，向一匹猹尽力的刺去。' }
                ]
              },
              {
                char: '胯',
                pinyin: 'kuà',
                tone: 4,
                radical: '月',
                strokeCount: 10,
                structure: '左右结构',
                strokeNames: ['撇', '横折钩', '横', '横', '横', '撇', '捺', '横', '横', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '胯下', pinyin: 'kuà xià', sentence: '那猹却将身一扭，反从他的胯下逃走了。' }
                ]
              },
              {
                char: '郑',
                pinyin: 'zhèng',
                tone: 4,
                radical: '阝',
                strokeCount: 8,
                structure: '左右结构',
                strokeNames: ['点', '撇', '横', '横', '竖', '提', '横折折折钩', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '郑重', pinyin: 'zhèng zhòng', sentence: '父亲郑重其事地答应了我。' },
                  { word: '郑重声明', pinyin: 'zhèng zhòng shēng míng', sentence: '郑重声明事实真相。' }
                ]
              }
            ],
            dictationWords: [
              { word: '郑重', pinyin: 'zhèng zhòng', sentence: '朋友分别时，[郑重]地握手告别，互赠珍贵的礼物。' },
              { word: '一望无际', pinyin: 'yí wàng wú jì', sentence: '海边的沙地上种着[一望无际]碧绿诱人的大西瓜。' },
              { word: '伶俐', pinyin: 'líng lì', sentence: '少年闰土不仅勇敢，而且聪明[伶俐]，见多识广。' }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 6,
    semester: 2,
    title: '六年级下册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 民风民俗与传统文化',
        oralCommunication: {
          id: 'g6s2-u1-oral',
          type: 'oral',
          title: '口语交际：即兴发言',
          content: '在庆祝会、毕业典礼或获奖场合，不用稿件进行1-2分钟的简短即兴发言，表达真情实感。',
          guide: '【名师锦囊】提前打好腹稿，快速构思“感谢、回忆、展望”三步法，自然大方。',
          audioText: '口语交际，即兴发言。快速构思要点，表达真情实感，落落大方。'
        },
        accumulation: {
          id: 'g6s2-u1-recite',
          type: 'recite',
          title: '古诗诵读《寒食》',
          author: '唐 · 韩翃',
          content: '春城无处不飞花，寒食东风御柳斜。日暮汉宫传蜡烛，轻烟散入五侯家。',
          pinyin: 'chūn chéng wú chù bù fēi huā, hán shí dōng fēng yù liǔ xié. rì mù hàn gōng chuán là zhú, qīng yān sàn rù wǔ hòu jiā.',
          guide: '【名师导读】描摹了长安城寒食节春意盎然的柳色飞花，含蓄委婉地讽喻了皇家权贵的特殊恩宠。',
          audioText: '古诗诵读，寒食。唐，韩翃。春城无处不飞花，寒食东风御柳斜。日暮汉宫传蜡烛，轻烟散入五侯家。'
        },
        lessons: [
          {
            id: 'g6s2-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文1《北京的春节》',
            characters: [
              {
                char: '蒜',
                pinyin: 'suàn',
                tone: 4,
                radical: '艹',
                strokeCount: 13,
                structure: '上下结构',
                strokeNames: ['横', '竖', '竖', '横', '横', '竖', '提', '横', '横', '竖', '提', '点', '点'],
                isWritingTarget: true,
                words: [
                  { word: '大蒜', pinyin: 'dà suàn', sentence: '腊八这天还要泡腊八蒜。' },
                  { word: '蒜瓣', pinyin: 'suàn bàn', sentence: '把大蒜剥成一瓣瓣的泡在醋里，色如翡翠。' }
                ]
              },
              {
                char: '醋',
                pinyin: 'cù',
                tone: 4,
                radical: '酉',
                strokeCount: 15,
                structure: '左右结构',
                strokeNames: ['横', '竖', '横折', '撇', '竖折', '横', '横', '横', '竖', '竖', '横', '竖', '横折', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '陈醋', pinyin: 'chén cù', sentence: '泡在陈醋里的大蒜变得通体碧绿。' },
                  { word: '米醋', pinyin: 'mǐ cù', sentence: '米醋酸中带甜，香气扑鼻。' }
                ]
              },
              {
                char: '饺',
                pinyin: 'jiǎo',
                tone: 3,
                radical: '饣',
                strokeCount: 9,
                structure: '左右结构',
                strokeNames: ['撇', '横撇', '竖提', '点', '横', '撇', '点', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '饺子', pinyin: 'jiǎo zi', sentence: '除夕夜全家团聚一起包饺子吃年夜饭。' },
                  { word: '水饺', pinyin: 'shuǐ jiǎo', sentence: '热气腾腾的水饺端上了餐桌。' }
                ]
              },
              {
                char: '翡',
                pinyin: 'fěi',
                tone: 3,
                radical: '羽',
                strokeCount: 14,
                structure: '上下结构',
                strokeNames: ['竖', '横', '竖', '横', '横撇', '点', '横撇', '点', '横折', '横', '横', '横折', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '翡翠', pinyin: 'fěi cuì', sentence: '泡好的腊八蒜通体碧绿，宛如晶莹剔透的翡翠。' }
                ]
              }
            ],
            dictationWords: [
              { word: '腊八粥', pinyin: 'là bā zhōu', sentence: '在腊八这天，家家户户都要熬香甜可口的[腊八粥]。' },
              { word: '万象更新', pinyin: 'wàn xiàng gēng xīn', sentence: '元宵节一过，春节的热闹渐渐过去，大地[万象更新]。' },
              { word: '灯火通宵', pinyin: 'dēng huǒ tōng xiāo', sentence: '除夕之夜家家[灯火通宵]，彻夜不绝，鞭炮声齐鸣。' },
              { word: '截然不同', pinyin: 'jié rán bù tóng', sentence: '元宵节的上市又是另一种景象，与平时的冷清[截然不同]。' }
            ]
          }
        ]
      },
      {
        unitNumber: 4,
        title: '第四单元 科学精神与人生理想',
        oralCommunication: {
          id: 'g6s2-u4-oral',
          type: 'oral',
          title: '口语交际：同读一本书',
          content: '围绕大家共同阅读过的一本名著（如《鲁滨逊漂流记》），开展读书分享会，探讨人物性格与给自己的启迪。',
          guide: '【名师锦囊】结合书中的具体情节发表个人见解，善于引发讨论，文明辩论。',
          audioText: '口语交际，同读一本书。结合具体章节分析人物，多角度阐述独特收获。'
        },
        accumulation: {
          id: 'g6s2-u4-recite',
          type: 'recite',
          title: '古诗诵读《竹石》',
          author: '清 · 郑燮',
          content: '咬定青山不放松，立根原在破岩中。千磨万击还坚劲，任尔东西南北风。',
          pinyin: 'yǎo dìng qīng shān bù fàng sōng, lì gēn yuán zài pò yán zhōng. qiān mó wàn jī hái jiān jìn, rèn ěr dōng xī nán běi fēng.',
          guide: '【名师导读】郑板桥借岩竹之坚劲，赞颂了战胜无数艰难险阻依然傲岸挺拔、百折不挠的坚贞人格力量。',
          audioText: '古诗诵读，竹石。清，郑燮。咬定青山不放松，立根原在破岩中。千磨万击还坚劲，任尔东西南北风。'
        },
        lessons: [
          {
            id: 'g6s2-u4-l1',
            unit: 4,
            lessonIndex: 1,
            title: '课文14《文言文二则 - 学弈》',
            characters: [
              {
                char: '援',
                pinyin: 'yuán',
                tone: 2,
                radical: '扌',
                strokeCount: 12,
                structure: '左右结构',
                strokeNames: ['横', '竖钩', '提', '撇', '点', '点', '撇', '横', '横', '横折钩', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '援弓缴', pinyin: 'yuán gōng zhuó', sentence: '一人虽听之，一心以为有鸿鹄将至，思援弓缴而射之。' },
                  { word: '支援', pinyin: 'zhī yuán', sentence: '一方有难，八方支援。' }
                ]
              },
              {
                char: '俱',
                pinyin: 'jù',
                tone: 4,
                radical: '亻',
                strokeCount: 10,
                structure: '左右结构',
                strokeNames: ['撇', '竖', '横', '竖', '横折', '横', '横', '横', '撇', '点'],
                isWritingTarget: true,
                words: [
                  { word: '俱学', pinyin: 'jù xué', sentence: '使弈秋诲二人弈，其一人专心致志，虽与之俱学，弗若之矣。' },
                  { word: '面面俱到', pinyin: 'miàn miàn jù dào', sentence: '做事考虑要周全周到。' }
                ]
              },
              {
                char: '弗',
                pinyin: 'fú',
                tone: 2,
                radical: '弓',
                strokeCount: 5,
                structure: '独体字',
                strokeNames: ['横折', '横', '竖折折钩', '撇', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '弗若', pinyin: 'fú ruò', sentence: '为是其智弗若与？曰：非然也。' }
                ]
              }
            ],
            dictationWords: [
              { word: '专心致志', pinyin: 'zhuān xīn zhì zhì', sentence: '只有[专心致志]、持之以恒，才能掌握过硬的本领。' },
              { word: '司空见惯', pinyin: 'sī kōng jiàn guàn', sentence: '善于观察的人，往往能从[司空见惯]的现象中发现科学真理。' },
              { word: '追根求源', pinyin: 'zhuī gēn qiú yuán', sentence: '科学探索需要具备勇于[追根求源]、百折不挠的坚韧精神。' }
            ]
          }
        ]
      }
    ]
  }
];
