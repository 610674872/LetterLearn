import type { TextbookCurriculum } from '../types';


export const PEP_CURRICULUM_DATA: TextbookCurriculum[] = [
  {
    grade: 1,
    semester: 1,
    title: '一年级上册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 识字篇（象形字与基础）',
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
                  { word: '他们', pinyin: 'tā men', sentence: '他们是一起长大的好伙伴。' },
                  { word: '他人', pinyin: 'tā rén', sentence: '乐于助人，多为他人着想。' }
                ]
              }
            ],
            dictationWords: [
              { word: '大人', pinyin: 'dà rén', sentence: '爸爸妈妈是[大人]。' },
              { word: '天上', pinyin: 'tiān shàng', sentence: '小鸟在[天上]飞。' },
              { word: '人们', pinyin: 'rén men', sentence: '[人们]在公园里散步。' },
              { word: '人口', pinyin: 'rén kǒu', sentence: '小镇上有很多[人口]。' }
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
                  { word: '一个', pinyin: 'yī gè', sentence: '树上有一个红苹果。' },
                  { word: '一天', pinyin: 'yī tiān', sentence: '美好的一天开始了。' }
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
                  { word: '二人', pinyin: 'èr rén', sentence: '二人并肩向前走。' },
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
                  { word: '三天', pinyin: 'sān tiān', sentence: '放假三天真开心。' },
                  { word: '三月', pinyin: 'sān yuè', sentence: '三月桃花朵朵开。' }
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
                  { word: '上山', pinyin: 'shàng shān', sentence: '大家一起去上山看日出。' },
                  { word: '上下', pinyin: 'shàng xià', sentence: '电梯上下运行很平稳。' },
                  { word: '早上', pinyin: 'zǎo shàng', sentence: '早上好，敬爱的老师！' }
                ]
              },
              {
                char: '下',
                pinyin: 'xià',
                tone: 4,
                radical: '一',
                strokeCount: 3,
                structure: '独体字',
                strokeNames: ['横', '竖', '点'],
                isWritingTarget: true,
                words: [
                  { word: '下雨', pinyin: 'xià yǔ', sentence: '窗外下起了蒙蒙细雨。' },
                  { word: '下午', pinyin: 'xià wǔ', sentence: '下午我们去操场踢球。' },
                  { word: '下山', pinyin: 'xià shān', sentence: '太阳落山了，我们结伴下山。' }
                ]
              }
            ],
            dictationWords: [
              { word: '一日', pinyin: 'yī rì', sentence: '[一日]之计在于晨。' },
              { word: '二人', pinyin: 'èr rén', sentence: '[二人]同心其利断金。' },
              { word: '三天', pinyin: 'sān tiān', sentence: '已经过去[三天]了。' },
              { word: '上下', pinyin: 'shàng xià', sentence: '我们要遵守规则[上下]楼梯。' },
              { word: '上山', pinyin: 'shàng shān', sentence: '小羊排队去[上山]吃青草。' }
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
                  { word: '人口', pinyin: 'rén kǒu', sentence: '大城市人口多。' },
                  { word: '开口', pinyin: 'kāi kǒu', sentence: '小宝宝终于开口叫妈妈了。' },
                  { word: '门口', pinyin: 'mén kǒu', sentence: '校门口有许多鲜花。' }
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
                  { word: '目光', pinyin: 'mù guāng', sentence: '老师投来赞许的目光。' },
                  { word: '双目', pinyin: 'shuāng mù', sentence: '闭上双目静静休息。' }
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
                  { word: '木耳', pinyin: 'mù ěr', sentence: '黑木耳营养丰富。' },
                  { word: '耳朵', pinyin: 'ěr duo', sentence: '兔子的长耳朵真灵敏。' }
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
                  { word: '小手', pinyin: 'xiǎo shǒu', sentence: '拍拍小手真开心。' }
                ]
              }
            ],
            dictationWords: [
              { word: '人口', pinyin: 'rén kǒu', sentence: '我们村的[人口]越来越多了。' },
              { word: '双手', pinyin: 'shuāng shǒu', sentence: '用我们勤劳的[双手]打扫卫生。' },
              { word: '木耳', pinyin: 'mù ěr', sentence: '餐桌上有一盘凉拌[木耳]。' },
              { word: '目光', pinyin: 'mù guāng', sentence: '他的[目光]十分坚定。' }
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
                  { word: '日子', pinyin: 'rì zi', sentence: '幸福的日子过得真快。' },
                  { word: '日出', pinyin: 'rì chū', sentence: '海边看日出美不胜收。' }
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
                  { word: '月亮', pinyin: 'yuè liang', sentence: '弯弯的月亮像小船。' },
                  { word: '日月', pinyin: 'rì yuè', sentence: '日月生辉，照亮大地。' }
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
                  { word: '水滴', pinyin: 'shuǐ dī', sentence: '水滴石穿，坚持就是胜利。' },
                  { word: '开水', pinyin: 'kāi shuǐ', sentence: '多喝温开水对身体好。' }
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
                  { word: '大火', pinyin: 'dà huǒ', sentence: '消防员叔叔扑灭了大火。' },
                  { word: '水火', pinyin: 'shuǐ huǒ', sentence: '水火无情，一定要注意安全。' }
                ]
              },
              {
                char: '田',
                pinyin: 'tián',
                tone: 2,
                radical: '田',
                strokeCount: 5,
                structure: '独体字',
                strokeNames: ['竖', '横折', '横', '竖', '横'],
                isWritingTarget: true,
                words: [
                  { word: '水田', pinyin: 'shuǐ tián', sentence: '水田里白鹭自由飞翔。' },
                  { word: '田地', pinyin: 'tián dì', sentence: '农民伯伯在田地里辛勤劳作。' }
                ]
              },
              {
                char: '禾',
                pinyin: 'hé',
                tone: 2,
                radical: '禾',
                strokeCount: 5,
                structure: '独体字',
                strokeNames: ['平撇', '横', '竖', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '禾苗', pinyin: 'hé miáo', sentence: '田里的禾苗绿油油的。' }
                ]
              }
            ],
            dictationWords: [
              { word: '日月', pinyin: 'rì yuè', sentence: '[日月]如梭，时光飞逝。' },
              { word: '水火', pinyin: 'shuǐ huǒ', sentence: '[水火]相容需要科学的智慧。' },
              { word: '水田', pinyin: 'shuǐ tián', sentence: '江南有很多美丽的[水田]。' },
              { word: '禾苗', pinyin: 'hé miáo', sentence: '雨后[禾苗]长得飞快。' },
              { word: '开水', pinyin: 'kāi shuǐ', sentence: '妈妈倒了一杯温[开水]。' }
            ]
          }
        ]
      },
      {
        unitNumber: 4,
        title: '第四单元 课文篇（秋天与大自然）',
        lessons: [
          {
            id: 'g1s1-u4-l1',
            unit: 4,
            lessonIndex: 1,
            title: '课文1《秋天》',
            characters: [
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
                  { word: '大人', pinyin: 'dà rén', sentence: '大人在前面走，小孩在后面跟。' },
                  { word: '大风', pinyin: 'dà fēng', sentence: '秋天的大风刮落了黄叶。' }
                ]
              },
              {
                char: '秋',
                pinyin: 'qiū',
                tone: 1,
                radical: '禾',
                strokeCount: 9,
                structure: '左右结构',
                strokeNames: ['平撇', '横', '竖', '撇', '点', '点', '撇', '撇', '捺'],
                isWritingTarget: false,
                words: [
                  { word: '秋天', pinyin: 'qiū tiān', sentence: '秋天到了，天气凉了。' },
                  { word: '秋风', pinyin: 'qiū fēng', sentence: '秋风吹过金色的麦浪。' }
                ]
              },
              {
                char: '了',
                pinyin: 'le',
                tone: 0,
                radical: '乛',
                strokeCount: 2,
                structure: '独体字',
                strokeNames: ['横撇', '竖钩'],
                isWritingTarget: true,
                words: [
                  { word: '来了', pinyin: 'lái le', sentence: '春天来了，小燕子飞回来了。' },
                  { word: '好了', pinyin: 'hǎo le', sentence: '我的作业写好了。' }
                ]
              }
            ],
            dictationWords: [
              { word: '秋天', pinyin: 'qiū tiān', sentence: '[秋天]到了，树叶变黄了。' },
              { word: '大人', pinyin: 'dà rén', sentence: '小树长成大树，小孩子长成[大人]。' },
              { word: '来了', pinyin: 'lái le', sentence: '秋风姑娘悄悄地[来了]。' }
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
        title: '第一单元 识字篇（春夏秋冬）',
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
                  { word: '春天', pinyin: 'chūn tiān', sentence: '春天百花盛开。' },
                  { word: '春风', pinyin: 'chūn fēng', sentence: '春风拂面暖洋洋。' }
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
                  { word: '大风', pinyin: 'dà fēng', sentence: '大风吹动了红旗。' },
                  { word: '风雨', pinyin: 'fēng yǔ', sentence: '经历风雨才能见彩虹。' }
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
                  { word: '冬天', pinyin: 'dōng tiān', sentence: '冬天下起了大雪。' },
                  { word: '立冬', pinyin: 'lì dōng', sentence: '立冬标志着冬季的来临。' }
                ]
              },
              {
                char: '雪',
                pinyin: 'xuě',
                tone: 3,
                radical: '雨',
                strokeCount: 11,
                structure: '上下结构',
                strokeNames: ['横', '点', '横撇', '竖', '点', '点', '点', '点', '横折', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '雪花', pinyin: 'xuě huā', sentence: '洁白的雪花从天而降。' },
                  { word: '白雪', pinyin: 'bái xuě', sentence: '大地上覆盖着白雪。' }
                ]
              }
            ],
            dictationWords: [
              { word: '春天', pinyin: 'chūn tiān', sentence: '[春天]百花齐放争奇斗艳。' },
              { word: '春风', pinyin: 'chūn fēng', sentence: '[春风]轻轻地拂过柳梢。' },
              { word: '雪花', pinyin: 'xuě huā', sentence: '美丽的[雪花]漫天飞舞。' },
              { word: '冬天', pinyin: 'dōng tiān', sentence: '[冬天]堆雪人打雪仗真好玩。' }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 2,
    semester: 1,
    title: '二年级上册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 识字篇（场景与树木）',
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
                structure: '单一结构',
                isWritingTarget: true,
                words: [
                  { word: '两只', pinyin: 'liǎng zhī', sentence: '池塘里有两只小鸭子。' },
                  { word: '两人', pinyin: 'liǎng rén', sentence: '两人互相勉励共同进步。' }
                ]
              },
              {
                char: '哪',
                pinyin: 'nǎ',
                tone: 3,
                radical: '口',
                strokeCount: 9,
                structure: '左中右',
                isWritingTarget: true,
                words: [
                  { word: '哪里', pinyin: 'nǎ lǐ', sentence: '小蝌蚪在找妈妈在哪里。' }
                ]
              }
            ],
            dictationWords: [
              { word: '两人', pinyin: 'liǎng rén', sentence: '[两人]坐在树荫下一同看书。' },
              { word: '哪里', pinyin: 'nǎ lǐ', sentence: '请问图书馆在[哪里]？' }
            ]
          }
        ]
      }
    ]
  }
];
