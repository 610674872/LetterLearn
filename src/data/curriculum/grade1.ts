import type { TextbookCurriculum } from '../../types';

export const GRADE_1_CURRICULUM: TextbookCurriculum[] = [
  {
    grade: 1,
    semester: 1,
    title: '一年级上册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 识字篇（象形字与基础）',
        oralCommunication: {
          id: 'g1s1-u1-oral',
          type: 'oral',
          title: '口语交际：我说你做',
          content: '大声说，让别人听得清；注意听，别人说话要认真。一个人发出指令，另一个人做动作，比如“请你摸摸右耳朵”、“请你举起左手”。',
          guide: '【名师锦囊】说话时眼睛看着对方，声音洪亮大方；听别人说话时要集中注意力，听清楚要求再行动。',
          audioText: '口语交际，我说你做。说话时声音要响亮，听别人说话要认真听。'
        },
        accumulation: {
          id: 'g1s1-u1-recite',
          type: 'recite',
          title: '古诗诵读《咏鹅》',
          author: '唐 · 骆宾王',
          content: '鹅，鹅，鹅，曲项向天歌。白毛浮绿水，红掌拨清波。',
          pinyin: 'é, é, é, qū xiàng xiàng tiān gē. bái máo fú lǜ shuǐ, hóng zhǎng bō qīng bō.',
          guide: '【名师导读】这首诗是骆宾王七岁时所作，用优美的语言描摹了白鹅在水面上引颈欢歌、自在悠游的可爱画面。',
          audioText: '古诗诵读，咏鹅。唐，骆宾王。鹅，鹅，鹅，曲项向天歌。白毛浮绿水，红掌拨清波。'
        },
        lessons: [
          {
            id: 'g1s1-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '识字1《天地人》',
            characters: [
              {
                char: '天',
                pinyin: 'tiān',
                tone: 1,
                radical: '大',
                strokeCount: 4,
                structure: '独体字',
                strokeNames: ['横', '横', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '天空', pinyin: 'tiān kōng', sentence: '蓝蓝的天空飘着白云。' },
                  { word: '白天', pinyin: 'bái tiān', sentence: '白天太阳当空照。' },
                  { word: '天上', pinyin: 'tiān shàng', sentence: '小鸟在天上飞。' }
                ]
              },
              {
                char: '地',
                pinyin: 'dì',
                tone: 4,
                radical: '土',
                strokeCount: 6,
                structure: '左右结构',
                strokeNames: ['横', '竖', '提', '横折弯钩', '竖', '竖弯钩'],
                isWritingTarget: false,
                words: [
                  { word: '大地', pinyin: 'dà dì', sentence: '春回大地，万物复苏。' },
                  { word: '土地', pinyin: 'tǔ dì', sentence: '肥沃的土地长出禾苗。' }
                ]
              },
              {
                char: '人',
                pinyin: 'rén',
                tone: 2,
                radical: '人',
                strokeCount: 2,
                structure: '独体字',
                strokeNames: ['撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '大人', pinyin: 'dà rén', sentence: '爸爸妈妈是大人。' },
                  { word: '人们', pinyin: 'rén men', sentence: '人们在草地上快乐地玩耍。' },
                  { word: '人口', pinyin: 'rén kǒu', sentence: '我国人口众多。' }
                ]
              },
              {
                char: '你',
                pinyin: 'nǐ',
                tone: 3,
                radical: '亻',
                strokeCount: 7,
                structure: '左右结构',
                strokeNames: ['撇', '竖', '撇', '横撇', '点', '竖钩', '点'],
                isWritingTarget: false,
                words: [
                  { word: '你好', pinyin: 'nǐ hǎo', sentence: '小朋友见面说你好。' },
                  { word: '你们', pinyin: 'nǐ men', sentence: '你们都是好学生。' }
                ]
              },
              {
                char: '我',
                pinyin: 'wǒ',
                tone: 3,
                radical: '戈',
                strokeCount: 7,
                structure: '左右结构',
                strokeNames: ['撇', '横', '竖钩', '提', '斜钩', '撇', '点'],
                isWritingTarget: false,
                words: [
                  { word: '我们', pinyin: 'wǒ men', sentence: '我们爱祖国。' },
                  { word: '我家', pinyin: 'wǒ jiā', sentence: '我家住在美丽的小镇。' }
                ]
              },
              {
                char: '他',
                pinyin: 'tā',
                tone: 1,
                radical: '亻',
                strokeCount: 5,
                structure: '左右结构',
                strokeNames: ['撇', '竖', '横折弯钩', '竖', '竖弯钩'],
                isWritingTarget: false,
                words: [
                  { word: '他们', pinyin: 'tā men', sentence: '他们是一年级的小学生。' },
                  { word: '他人', pinyin: 'tā rén', sentence: '我们要乐于帮助他人。' }
                ]
              }
            ],
            dictationWords: [
              { word: '天地', pinyin: 'tiān dì', sentence: '广阔的[天地]间万物生长。' },
              { word: '人们', pinyin: 'rén men', sentence: '广场上到处都是欢庆的[人们]。' },
              { word: '大人', pinyin: 'dà rén', sentence: '小朋友要懂礼貌，尊敬[大人]。' }
            ]
          },
          {
            id: 'g1s1-u1-l2',
            unit: 1,
            lessonIndex: 2,
            title: '识字2《金木水火土》',
            characters: [
              {
                char: '一',
                pinyin: 'yī',
                tone: 1,
                radical: '一',
                strokeCount: 1,
                structure: '独体字',
                strokeNames: ['横'],
                isWritingTarget: true,
                words: [
                  { word: '一个', pinyin: 'yī gè', sentence: '桌上有一个红苹果。' },
                  { word: '一天', pinyin: 'yī tiān', sentence: '快乐的一天过去了。' }
                ]
              },
              {
                char: '二',
                pinyin: 'èr',
                tone: 4,
                radical: '二',
                strokeCount: 2,
                structure: '独体字',
                strokeNames: ['横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '二十', pinyin: 'èr shí', sentence: '班级里有二十个男生。' },
                  { word: '二月', pinyin: 'èr yuè', sentence: '二月春风似剪刀。' }
                ]
              },
              {
                char: '三',
                pinyin: 'sān',
                tone: 1,
                radical: '一',
                strokeCount: 3,
                structure: '独体字',
                strokeNames: ['横', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '三人', pinyin: 'sān rén', sentence: '三人行，必有我师。' },
                  { word: '三月', pinyin: 'sān yuè', sentence: '阳春三月桃花盛开。' }
                ]
              },
              {
                char: '上',
                pinyin: 'shàng',
                tone: 4,
                radical: '一',
                strokeCount: 3,
                structure: '独体字',
                strokeNames: ['竖', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '上学', pinyin: 'shàng xué', sentence: '背起书包上学去。' },
                  { word: '上面', pinyin: 'shàng miàn', sentence: '书桌上面放着台灯。' }
                ]
              }
            ],
            dictationWords: [
              { word: '一二三', pinyin: 'yī èr sān', sentence: '我们大家一起数：[一二三]！' },
              { word: '天上', pinyin: 'tiān shàng', sentence: '小鸟在蓝蓝的[天上]快乐飞翔。' },
              { word: '上山', pinyin: 'shàng shān', sentence: '周日早晨，我们全家一起去[上山]锻炼。' }
            ]
          },
          {
            id: 'g1s1-u1-l3',
            unit: 1,
            lessonIndex: 3,
            title: '识字3《口耳目》',
            characters: [
              {
                char: '口',
                pinyin: 'kǒu',
                tone: 3,
                radical: '口',
                strokeCount: 3,
                structure: '独体字',
                strokeNames: ['竖', '横折', '横'],
                isWritingTarget: true,
                words: [
                  { word: '门口', pinyin: 'mén kǒu', sentence: '学校门口开满了鲜花。' },
                  { word: '张口', pinyin: 'zhāng kǒu', sentence: '小朋友张口大声读书。' }
                ]
              },
              {
                char: '目',
                pinyin: 'mù',
                tone: 4,
                radical: '目',
                strokeCount: 5,
                structure: '独体字',
                strokeNames: ['竖', '横折', '横', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '目光', pinyin: 'mù guāng', sentence: '老师的目光温暖而亲切。' },
                  { word: '耳目', pinyin: 'ěr mù', sentence: '保护好我们的耳目感官。' }
                ]
              },
              {
                char: '耳',
                pinyin: 'ěr',
                tone: 3,
                radical: '耳',
                strokeCount: 6,
                structure: '独体字',
                strokeNames: ['横', '竖', '竖', '横', '横', '提'],
                isWritingTarget: true,
                words: [
                  { word: '耳朵', pinyin: 'ěr duo', sentence: '兔子的耳朵长长的。' },
                  { word: '木耳', pinyin: 'mù ěr', sentence: '今天中午吃炒木耳。' }
                ]
              },
              {
                char: '手',
                pinyin: 'shǒu',
                tone: 3,
                radical: '手',
                strokeCount: 4,
                structure: '独体字',
                strokeNames: ['撇', '横', '横', '竖钩'],
                isWritingTarget: true,
                words: [
                  { word: '双手', pinyin: 'shuāng shǒu', sentence: '勤劳的双手创造幸福。' },
                  { word: '招手', pinyin: 'zhāo shǒu', sentence: '上学时向妈妈挥挥手。' }
                ]
              }
            ],
            dictationWords: [
              { word: '人口', pinyin: 'rén kǒu', sentence: '城市里[人口]很多，十分繁华。' },
              { word: '双手', pinyin: 'shuāng shǒu', sentence: '我们要用自己的[双手]整理书包。' },
              { word: '耳目', pinyin: 'ěr mù', sentence: '大自然的美景令人[耳目]一新。' }
            ]
          },
          {
            id: 'g1s1-u1-l4',
            unit: 1,
            lessonIndex: 4,
            title: '识字4《日月水火》',
            characters: [
              {
                char: '日',
                pinyin: 'rì',
                tone: 4,
                radical: '日',
                strokeCount: 4,
                structure: '独体字',
                strokeNames: ['竖', '横折', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '日子', pinyin: 'rì zi', sentence: '我们的日子越来越甜美。' },
                  { word: '日月', pinyin: 'rì yuè', sentence: '日月生辉照大地。' }
                ]
              },
              {
                char: '月',
                pinyin: 'yuè',
                tone: 4,
                radical: '月',
                strokeCount: 4,
                structure: '独体字',
                strokeNames: ['撇', '横折钩', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '月亮', pinyin: 'yuè liang', sentence: '圆圆的月亮像玉盘。' },
                  { word: '月光', pinyin: 'yuè guāng', sentence: '皎洁的月光洒满窗台。' }
                ]
              },
              {
                char: '水',
                pinyin: 'shuǐ',
                tone: 3,
                radical: '水',
                strokeCount: 4,
                structure: '独体字',
                strokeNames: ['竖钩', '横撇', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '清水', pinyin: 'qīng shuǐ', sentence: '小溪里的清水真甘甜。' },
                  { word: '开水', pinyin: 'kāi shuǐ', sentence: '每天多喝开水身体好。' }
                ]
              },
              {
                char: '火',
                pinyin: 'huǒ',
                tone: 3,
                radical: '火',
                strokeCount: 4,
                structure: '独体字',
                strokeNames: ['点', '撇', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '火苗', pinyin: 'huǒ miáo', sentence: '红红的火苗跳跃着。' },
                  { word: '大火', pinyin: 'dà huǒ', sentence: '消防员叔叔扑灭了大火。' }
                ]
              }
            ],
            dictationWords: [
              { word: '日月', pinyin: 'rì yuè', sentence: '天空中[日月]星辰闪烁发光。' },
              { word: '水火', pinyin: 'shuǐ huǒ', sentence: '水和火都是大自然神奇的力量。' },
              { word: '火山', pinyin: 'huǒ shān', sentence: '大自然中有巍峨壮丽的[火山]。' }
            ]
          }
        ]
      },
      {
        unitNumber: 4,
        title: '第四单元 课文篇（秋天与大自然）',
        oralCommunication: {
          id: 'g1s1-u4-oral',
          type: 'oral',
          title: '口语交际：我们做朋友',
          content: '向新朋友介绍自己：“你好，我叫李华，我喜欢画画，我们可以做朋友吗？”',
          guide: '【名师锦囊】主动微笑、礼貌问好、态度真诚是交到好朋友的秘诀哦！',
          audioText: '口语交际，我们做朋友。主动微笑，大声介绍自己的名字和爱好。'
        },
        accumulation: {
          id: 'g1s1-u4-recite',
          type: 'recite',
          title: '汉乐府《江南》',
          author: '两汉 · 乐府民歌',
          content: '江南可采莲，莲叶何田田。鱼戏莲叶间。鱼戏莲叶东，鱼戏莲叶西，鱼戏莲叶南，鱼戏莲叶北。',
          pinyin: 'jiāng nán kě cǎi lián, lián yè hé tián tián. yú xì lián yè jiān. yú xì lián yè dōng, yú xì lián yè xī, yú xì lián yè nán, yú xì lián yè běi.',
          guide: '【名师导读】这首江南民歌生动再现了水乡采莲的欢快场景，小鱼在荷叶间穿梭嬉戏，极富节奏感与美感。',
          audioText: '经典诵读，江南。江南可采莲，莲叶何田田。鱼戏莲叶间。'
        },
        lessons: [
          {
            id: 'g1s1-u4-l1',
            unit: 4,
            lessonIndex: 1,
            title: '课文1《秋天》',
            characters: [
              {
                char: '了',
                pinyin: 'le',
                tone: 0,
                radical: '乙',
                strokeCount: 2,
                structure: '独体字',
                strokeNames: ['横撇', '竖钩'],
                isWritingTarget: true,
                words: [
                  { word: '来了', pinyin: 'lái le', sentence: '秋天来了，天气凉了。' },
                  { word: '走了', pinyin: 'zǒu le', sentence: '小燕子飞走了。' }
                ]
              },
              {
                char: '子',
                pinyin: 'zǐ',
                tone: 3,
                radical: '子',
                strokeCount: 3,
                structure: '独体字',
                strokeNames: ['横撇', '弯钩', '横'],
                isWritingTarget: true,
                words: [
                  { word: '叶子', pinyin: 'yè zi', sentence: '秋天到了，树叶变黄了。' },
                  { word: '孩子', pinyin: 'hái zi', sentence: '操场上有好多可爱的孩子。' }
                ]
              },
              {
                char: '大',
                pinyin: 'dà',
                tone: 4,
                radical: '大',
                strokeCount: 3,
                structure: '独体字',
                strokeNames: ['横', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '大树', pinyin: 'dà shù', sentence: '门前有一棵高大的梧桐树。' },
                  { word: '大雁', pinyin: 'dà yàn', sentence: '一群大雁往南飞。' }
                ]
              }
            ],
            dictationWords: [
              { word: '大了', pinyin: 'dà le', sentence: '过了一年，我又长[大了]一岁。' },
              { word: '儿子', pinyin: 'ér zǐ', sentence: '小鸟是鸟妈妈心爱的[儿子]。' },
              { word: '大天', pinyin: 'dà tiān', sentence: '[大天]白日，我们一起在草地上奔跑。' }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 1,
    semester: 2,
    title: '一年级下册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 识字篇（自然与生活）',
        oralCommunication: {
          id: 'g1s2-u1-oral',
          type: 'oral',
          title: '口语交际：听故事，讲故事',
          content: '认真听老师讲《老鼠嫁女》的故事，看图把关键情节讲给爸爸妈妈听。',
          guide: '【名师锦囊】听故事时抓住角色和主要事情，讲故事时声音响亮，动作自然。',
          audioText: '口语交际，听故事，讲故事。听清楚角色，按顺序把故事讲明白。'
        },
        accumulation: {
          id: 'g1s2-u1-recite',
          type: 'recite',
          title: '古诗诵读《春晓》',
          author: '唐 · 孟浩然',
          content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
          pinyin: 'chūn mián bù jué xiǎo, chù chù wén tí niǎo. yè lái fēng yǔ shēng, huā luò zhī duō shǎo.',
          guide: '【名师导读】诗人描绘了一幅生机勃勃的春天早晨图景，鸟语花香中带着淡淡的惜春之情。',
          audioText: '古诗诵读，春晓。唐，孟浩然。春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。'
        },
        lessons: [
          {
            id: 'g1s2-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '识字1《春夏秋冬》',
            characters: [
              {
                char: '春',
                pinyin: 'chūn',
                tone: 1,
                radical: '日',
                strokeCount: 9,
                structure: '上下结构',
                strokeNames: ['横', '横', '横', '撇', '捺', '竖', '横折', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '春天', pinyin: 'chūn tiān', sentence: '春天来了，桃花盛开。' },
                  { word: '春风', pinyin: 'chūn fēng', sentence: '温和的春风吹绿了柳树。' }
                ]
              },
              {
                char: '冬',
                pinyin: 'dōng',
                tone: 1,
                radical: '夂',
                strokeCount: 5,
                structure: '上下结构',
                strokeNames: ['撇', '横撇', '捺', '点', '点'],
                isWritingTarget: true,
                words: [
                  { word: '冬天', pinyin: 'dōng tiān', sentence: '冬天雪花飘飘。' },
                  { word: '立冬', pinyin: 'lì dōng', sentence: '立冬意味着冬季开始。' }
                ]
              },
              {
                char: '风',
                pinyin: 'fēng',
                tone: 1,
                radical: '风',
                strokeCount: 4,
                structure: '半包围',
                strokeNames: ['撇', '横折弯钩', '撇', '点'],
                isWritingTarget: true,
                words: [
                  { word: '大风', pinyin: 'dà fēng', sentence: '门外刮起了一阵大风。' },
                  { word: '风雨', pinyin: 'fēng yǔ', sentence: '小树不畏风雨茁壮成长。' }
                ]
              },
              {
                char: '雪',
                pinyin: 'xuě',
                tone: 3,
                radical: '雨',
                strokeCount: 11,
                structure: '上下结构',
                strokeNames: ['横', '点', '横钩', '竖', '点', '点', '点', '点', '横折', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '雪人', pinyin: 'xuě rén', sentence: '我们在院子里堆雪人。' },
                  { word: '白雪', pinyin: 'bái xuě', sentence: '大地铺满了厚厚的白雪。' }
                ]
              }
            ],
            dictationWords: [
              { word: '春风', pinyin: 'chūn fēng', sentence: '[春风]吹拂着大地的每一个角落。' },
              { word: '冬雪', pinyin: 'dōng xuě', sentence: '窗外漫天飞舞着洁白的[冬雪]。' },
              { word: '飞鸟', pinyin: 'fēi niǎo', sentence: '成群的[飞鸟]在树林上空盘旋。' }
            ]
          },
          {
            id: 'g1s2-u1-l2',
            unit: 1,
            lessonIndex: 2,
            title: '识字2《姓氏歌》',
            characters: [
              {
                char: '姓',
                pinyin: 'xìng',
                tone: 4,
                radical: '女',
                strokeCount: 8,
                structure: '左右结构',
                strokeNames: ['撇点', '撇', '横', '撇', '横', '横', '竖', '横'],
                isWritingTarget: true,
                words: [
                  { word: '姓名', pinyin: 'xìng míng', sentence: '在作业本上工整写下姓名。' },
                  { word: '姓氏', pinyin: 'xìng shì', sentence: '中国有许多古老的姓氏。' }
                ]
              },
              {
                char: '什',
                pinyin: 'shén',
                tone: 2,
                radical: '亻',
                strokeCount: 4,
                structure: '左右结构',
                strokeNames: ['撇', '竖', '横', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '什么', pinyin: 'shén me', sentence: '请问你叫什么名字？' }
                ]
              },
              {
                char: '么',
                pinyin: 'me',
                tone: 0,
                radical: '丿',
                strokeCount: 3,
                structure: '独体字',
                strokeNames: ['撇', '撇折', '点'],
                isWritingTarget: true,
                words: [
                  { word: '多么', pinyin: 'duō me', sentence: '祖国的山河多么壮丽！' }
                ]
              }
            ],
            dictationWords: [
              { word: '什么', pinyin: 'shén me', sentence: '书包里装了[什么]宝贝？' },
              { word: '姓名', pinyin: 'xìng míng', sentence: '请把你的[姓名]写在登记表上。' },
              { word: '双人', pinyin: 'shuāng rén', sentence: '我们俩坐在[双人]椅子上读书。' }
            ]
          }
        ]
      }
    ]
  }
];
