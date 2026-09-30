import type { TextbookCurriculum } from '../../types';

export const GRADE_4_CURRICULUM: TextbookCurriculum[] = [
  {
    grade: 4,
    semester: 1,
    title: '四年级上册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 自然奇观',
        oralCommunication: {
          id: 'g4s1-u1-oral',
          type: 'oral',
          title: '口语交际：我们与环境',
          content: '围绕身边环境问题（如垃圾分类、节约用水、绿色出行）展开讨论，提出切实可行的小建议。',
          guide: '【名师锦囊】从身边小事说起，发现问题并给出具体的行动方案，表达诚恳有条理。',
          audioText: '口语交际，我们与环境。结合生活观察，提出保护身边环境的具体金点子。'
        },
        accumulation: {
          id: 'g4s1-u1-recite',
          type: 'recite',
          title: '古诗诵读《题西林壁》',
          author: '宋 · 苏轼',
          content: '横看成岭侧成峰，远近高低各不同。不识庐山真面目，只缘身在此山中。',
          pinyin: 'héng kàn chéng lǐng cè chéng fēng, yuǎn jìn gāo dī gè bù tóng. bù shí lú shān zhēn miàn mù, zhǐ yuán shēn zài cǐ shān zhōng.',
          guide: '【名师导读】苏轼寓哲理于写景之中，告诉我们看待事物如果局限在一角就看不清全貌，必须站在更客观、全面的高度。',
          audioText: '古诗诵读，题西林壁。宋，苏轼。横看成岭侧成峰，远近高低各不同。不识庐山真面目，只缘身在此山中。'
        },
        lessons: [
          {
            id: 'g4s1-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文1《观潮》',
            characters: [
              {
                char: '潮',
                pinyin: 'cháo',
                tone: 2,
                radical: '氵',
                strokeCount: 15,
                structure: '左中右结构',
                strokeNames: ['点', '点', '提', '横', '竖', '竖', '横', '竖', '横折', '横', '横', '撇', '横折钩', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '钱塘江大潮', pinyin: 'qián táng jiāng dà cháo', sentence: '钱塘江大潮自古以来被称为天下奇观。' },
                  { word: '涨潮', pinyin: 'zhǎng cháo', sentence: '海水每天都会按时涨潮和落潮。' }
                ]
              },
              {
                char: '据',
                pinyin: 'jù',
                tone: 4,
                radical: '扌',
                strokeCount: 11,
                structure: '左右结构',
                strokeNames: ['横', '竖钩', '提', '横折', '横', '撇', '竖', '横折', '横', '横折', '横'],
                isWritingTarget: true,
                words: [
                  { word: '据点', pinyin: 'jù diǎn', sentence: '据守在重要的交通隘口。' },
                  { word: '根据', pinyin: 'gēn jù', sentence: '根据天气预报，明天将是个晴天。' }
                ]
              },
              {
                char: '阔',
                pinyin: 'kuò',
                tone: 4,
                radical: '门',
                strokeCount: 12,
                structure: '半包围',
                strokeNames: ['点', '竖', '横折钩', '点', '点', '提', '横', '竖', '竖', '横', '撇', '点'],
                isWritingTarget: true,
                words: [
                  { word: '广阔', pinyin: 'guǎng kuò', sentence: '江面在薄雾中显得非常广阔平静。' },
                  { word: '海阔天空', pinyin: 'hǎi kuò tiān kōng', sentence: '退一步海阔天空。' }
                ]
              },
              {
                char: '盼',
                pinyin: 'pàn',
                tone: 4,
                radical: '目',
                strokeCount: 9,
                structure: '左右结构',
                strokeNames: ['竖', '横折', '横', '横', '横', '撇', '点', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '期盼', pinyin: 'qī pàn', sentence: '人们翘首期盼大潮的到来。' },
                  { word: '盼望', pinyin: 'pàn wàng', sentence: '盼望着新学期的精彩收获。' }
                ]
              }
            ],
            dictationWords: [
              { word: '奇观', pinyin: 'qí guān', sentence: '钱塘江大潮被称为雄伟壮丽的天下[奇观]。' },
              { word: '薄雾', pinyin: 'báo wù', sentence: '清晨的江面上笼罩着一层淡淡的[薄雾]。' },
              { word: '沸腾', pinyin: 'fèi téng', sentence: '人群顿时[沸腾]起来，爆发出雷鸣般的欢呼声。' },
              { word: '山崩地裂', pinyin: 'shān bēng dì liè', sentence: '那声音犹如千万匹战马奔腾，响彻云霄，犹如[山崩地裂]。' }
            ]
          },
          {
            id: 'g4s1-u1-l2',
            unit: 1,
            lessonIndex: 2,
            title: '课文2《走月亮》',
            characters: [
              {
                char: '淘',
                pinyin: 'táo',
                tone: 2,
                radical: '氵',
                strokeCount: 10,
                structure: '左右结构',
                strokeNames: ['点', '点', '提', '撇', '横折钩', '撇', '点', '横', '竖', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '淘米', pinyin: 'táo mǐ', sentence: '妈妈在溪边淘洗洁白的大米。' },
                  { word: '淘气', pinyin: 'táo qì', sentence: '小弟弟淘气又可爱。' }
                ]
              },
              {
                char: '牵',
                pinyin: 'qiān',
                tone: 1,
                radical: '牛',
                strokeCount: 11,
                structure: '上下结构',
                strokeNames: ['横', '撇', '捺', '点', '横撇', '撇', '横', '竖', '横', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '牵手', pinyin: 'qiān shǒu', sentence: '我和阿妈牵着手，走在明月照耀的田埂上。' },
                  { word: '牵挂', pinyin: 'qiān guà', sentence: '母亲心里时刻牵挂着远方的孩子。' }
                ]
              },
              {
                char: '鹅',
                pinyin: 'é',
                tone: 2,
                radical: '鸟',
                strokeCount: 12,
                structure: '左右结构',
                strokeNames: ['撇', '横', '竖钩', '提', '斜钩', '撇', '点', '撇', '横折钩', '点', '竖折折钩', '横'],
                isWritingTarget: true,
                words: [
                  { word: '鹅卵石', pinyin: 'é luǎn shí', sentence: '小溪里铺着细小的鹅卵石。' },
                  { word: '白鹅', pinyin: 'bái é', sentence: '洁白的白天鹅在水面上梳理羽毛。' }
                ]
              }
            ],
            dictationWords: [
              { word: '柔和', pinyin: 'róu hé', sentence: '月光[柔和]地洒在乡间静谧的小路上。' },
              { word: '鹅卵石', pinyin: 'é luǎn shí', sentence: '清澈见底的溪水轻轻漫过圆润光滑的[鹅卵石]。' },
              { word: '新鲜', pinyin: 'xīn xiān', sentence: '微风送来泥土与成熟稻谷[新鲜]甜美的气息。' }
            ]
          }
        ]
      },
      {
        unitNumber: 4,
        title: '第四单元 神话故事',
        oralCommunication: {
          id: 'g4s1-u4-oral',
          type: 'oral',
          title: '口语交际：讲历史人物故事',
          content: '选择一个你最钦佩的古代神话或历史人物故事，讲给同学们听，突出人物的坚韧品质。',
          guide: '【名师锦囊】讲故事要有起承转合，运用神态动作把人物演活，富有感染力。',
          audioText: '口语交际，讲历史人物故事。突出人物品格，绘声绘色，打动听众。'
        },
        accumulation: {
          id: 'g4s1-u4-recite',
          type: 'recite',
          title: '古诗诵读《出塞》',
          author: '唐 · 王昌龄',
          content: '秦时明月汉时关，万里长征人未还。但使龙城飞将在，不教胡马度阴山。',
          pinyin: 'qín shí míng yuè hàn shí guān, wàn lǐ cháng zhēng rén wèi hái. dàn shǐ lóng chéng fēi jiàng zài, bú jiào hú mǎ dù yīn shān.',
          guide: '【名师导读】王昌龄的《出塞》被誉为唐人七绝压卷之作，字里行间充溢着保家卫国的豪情壮志与对和平的渴望。',
          audioText: '古诗诵读，出塞。唐，王昌龄。秦时明月汉时关，万里长征人未还。但使龙城飞将在，不教胡马度阴山。'
        },
        lessons: [
          {
            id: 'g4s1-u4-l1',
            unit: 4,
            lessonIndex: 1,
            title: '课文12《盘古开天地》',
            characters: [
              {
                char: '劈',
                pinyin: 'pī',
                tone: 1,
                radical: '刀',
                strokeCount: 15,
                structure: '上下结构',
                strokeNames: ['横折', '横', '竖', '横', '竖', '横折钩', '点', '撇', '横', '竖', '横撇', '捺', '横折', '撇', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '劈开', pinyin: 'pī kāi', sentence: '盘古挥起大斧，用力劈开混沌。' },
                  { word: '劈柴', pinyin: 'pī chái', sentence: '老爷爷在院子里劈柴取暖。' }
                ]
              },
              {
                char: '缓',
                pinyin: 'huǎn',
                tone: 3,
                radical: '纟',
                strokeCount: 12,
                structure: '左右结构',
                strokeNames: ['撇折', '撇折', '提', '撇', '点', '点', '撇', '横', '横', '撇', '横撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '缓缓', pinyin: 'huǎn huǎn', sentence: '清而轻的阳气缓缓上升，变成了天。' },
                  { word: '缓慢', pinyin: 'huǎn màn', sentence: '列车缓慢驶入安静的站台。' }
                ]
              },
              {
                char: '竭',
                pinyin: 'jié',
                tone: 2,
                radical: '立',
                strokeCount: 14,
                structure: '左右结构',
                strokeNames: ['点', '横', '点', '撇', '提', '竖', '横折', '横', '横', '竖', '横折', '横', '撇', '竖弯钩'],
                isWritingTarget: true,
                words: [
                  { word: '竭力', pinyin: 'jié lì', sentence: '盘古竭尽全力顶天立地。' },
                  { word: '枯竭', pinyin: 'kū jié', sentence: '保护水源，防止资源枯竭。' }
                ]
              }
            ],
            dictationWords: [
              { word: '开辟', pinyin: 'kāi pì', sentence: '伟大的盘古用神力为人类[开辟]了天地宇宙。' },
              { word: '浑浊', pinyin: 'hún zhuó', sentence: '重而[浑浊]的物质逐渐下沉，化作了坚实辽阔的大地。' },
              { word: '精疲力竭', pinyin: 'jīng pí lì jié', sentence: '经过漫长的岁月奋战，顶天立地的巨人终于[精疲力竭]倒下了。' }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 4,
    semester: 2,
    title: '四年级下册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 乡村美景',
        oralCommunication: {
          id: 'g4s2-u1-oral',
          type: 'oral',
          title: '口语交际：转述',
          content: '听清别人交代的内容，弄清要点，在转述给第三人时做到准确、不遗漏、礼貌得体。',
          guide: '【名师锦囊】转述时人称代词（你我他）要灵活转换，交代清楚时间、地点与事情。',
          audioText: '口语交际，转述。听清时间地点事情，转换人称，准确传达。'
        },
        accumulation: {
          id: 'g4s2-u1-recite',
          type: 'recite',
          title: '古诗诵读《四时田园杂兴》',
          author: '宋 · 范成大',
          content: '昼出耘田夜绩麻，村庄儿女各当家。童孙未解供耕织，也傍桑阴学种瓜。',
          pinyin: 'zhòu chū yún tián yè jì má, cūn zhuāng ér nǚ gè dāng jiā. tóng sūn wèi jiě gòng gēng zhī, yě bàng sāng yīn xué zhòng guā.',
          guide: '【名师导读】生动展示了江南农村春忙时节热火朝天的劳动景象，小孩子们在桑树下学种瓜的天真情趣更是令人莞尔。',
          audioText: '古诗诵读，四时田园杂兴。宋，范成大。昼出耘田夜绩麻，村庄儿女各当家。童孙未解供耕织，也傍桑阴学种瓜。'
        },
        lessons: [
          {
            id: 'g4s2-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文2《乡下人家》',
            characters: [
              {
                char: '构',
                pinyin: 'gòu',
                tone: 4,
                radical: '木',
                strokeCount: 8,
                structure: '左右结构',
                strokeNames: ['横', '竖', '撇', '点', '撇', '横折钩', '竖', '横折'],
                isWritingTarget: true,
                words: [
                  { word: '构成', pinyin: 'gòu chéng', sentence: '乡下人家总能构成一幅自然和谐的风景画。' },
                  { word: '结构', pinyin: 'jié gòu', sentence: '这个句子的语法结构十分完整。' }
                ]
              },
              {
                char: '饰',
                pinyin: 'shì',
                tone: 4,
                radical: '饣',
                strokeCount: 8,
                structure: '左右结构',
                strokeNames: ['撇', '横撇', '竖提', '撇', '横', '竖', '横折钩', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '装饰', pinyin: 'zhuāng shì', sentence: '青藤爬满屋檐，成为最好的天然装饰。' },
                  { word: '饰品', pinyin: 'shì pǐn', sentence: '柜台里摆放着精美的民俗饰品。' }
                ]
              },
              {
                char: '棚',
                pinyin: 'péng',
                tone: 2,
                radical: '木',
                strokeCount: 12,
                structure: '左中右结构',
                strokeNames: ['横', '竖', '撇', '点', '撇', '横折钩', '横', '横', '撇', '横折钩', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '瓜棚', pinyin: 'guā péng', sentence: '夏天坐在青绿的瓜棚底下乘凉十分惬意。' },
                  { word: '棚架', pinyin: 'péng jià', sentence: '葡萄藤顺着竹木搭起的棚架向上攀爬。' }
                ]
              }
            ],
            dictationWords: [
              { word: '装饰', pinyin: 'zhuāng shì', sentence: '朴素的农舍被爬山虎[装饰]得格外生机勃勃。' },
              { word: '率领', pinyin: 'shuài lǐng', sentence: '母鸡[率领]着一群黄绒绒的小雏鸡在草丛里觅食。' },
              { word: '和谐', pinyin: 'hé xié', sentence: '乡下人家与大自然共同织就了一幅[和谐]宁静的美景。' }
            ]
          }
        ]
      }
    ]
  }
];
