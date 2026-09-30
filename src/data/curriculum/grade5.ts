import type { TextbookCurriculum } from '../../types';

export const GRADE_5_CURRICULUM: TextbookCurriculum[] = [
  {
    grade: 5,
    semester: 1,
    title: '五年级上册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 1,
        title: '第一单元 万物有灵',
        oralCommunication: {
          id: 'g5s1-u1-oral',
          type: 'oral',
          title: '口语交际：制定班级公约',
          content: '为班集体建言献策，就纪律、卫生、互助等问题提出建设性条款，大家共同举手表决形成公约。',
          guide: '【名师锦囊】观点要明确，理由要充分，倾听他人发言时不随意打断，求同存异。',
          audioText: '口语交际，制定班级公约。关心集体，提出切实建议，共同遵守班级规则。'
        },
        accumulation: {
          id: 'g5s1-u1-recite',
          type: 'recite',
          title: '古诗诵读《蝉》',
          author: '唐 · 虞世南',
          content: '垂緌饮清露，流响出疏桐。居高声自远，非是藉秋风。',
          pinyin: 'chuí ruí yǐn qīng lù, liú xiǎng chū shū tóng. jū gāo shēng zì yuǎn, fēi shì jiè qiū fēng.',
          guide: '【名师导读】借蝉喻人，高尚的人格自然声名远扬，并非凭借外在的权势与东风，充满高洁的自立自强精神。',
          audioText: '古诗诵读，蝉。唐，虞世南。垂緌饮清露，流响出疏桐。居高声自远，非是藉秋风。'
        },
        lessons: [
          {
            id: 'g5s1-u1-l1',
            unit: 1,
            lessonIndex: 1,
            title: '课文1《白鹭》',
            characters: [
              {
                char: '宜',
                pinyin: 'yí',
                tone: 2,
                radical: '宀',
                strokeCount: 8,
                structure: '上下结构',
                strokeNames: ['点', '点', '横撇', '横', '竖', '横折', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '适宜', pinyin: 'shì yí', sentence: '白鹭是一首精巧的诗，色素配合身段大小都十分适宜。' },
                  { word: '相宜', pinyin: 'xiāng yí', sentence: '淡妆浓抹总相宜。' }
                ]
              },
              {
                char: '鹤',
                pinyin: 'hè',
                tone: 4,
                radical: '鸟',
                strokeCount: 15,
                structure: '左右结构',
                strokeNames: ['点', '点', '横撇', '点', '撇', '竖', '横折', '横', '横', '撇', '撇', '横折钩', '点', '竖折折钩', '横'],
                isWritingTarget: true,
                words: [
                  { word: '白鹤', pinyin: 'bái hè', sentence: '白鹤太大而嫌生硬，即使如粉红的朱鹭也显得大了一些。' },
                  { word: '仙鹤', pinyin: 'xiān hè', sentence: '传说中仙鹤常常伴随仙人云游。' }
                ]
              },
              {
                char: '嫌',
                pinyin: 'xián',
                tone: 2,
                radical: '女',
                strokeCount: 13,
                structure: '左右结构',
                strokeNames: ['撇点', '撇', '横', '点', '点', '提', '点', '撇', '横', '横', '竖', '撇', '捺'],
                isWritingTarget: true,
                words: [
                  { word: '嫌弃', pinyin: 'xián qì', sentence: '白鹭没有一丝让人嫌弃的多余之处。' },
                  { word: '涉嫌', pinyin: 'shè xián', sentence: '做人要光明正大。' }
                ]
              }
            ],
            dictationWords: [
              { word: '精巧', pinyin: 'jīng qiǎo', sentence: '白鹭实在是一首韵在骨子里的[精巧]的散文诗。' },
              { word: '寻常', pinyin: 'xún cháng', sentence: '在清晨的黄昏中，人们常常见到它那不[寻常]的美丽身影。' },
              { word: '安详', pinyin: 'ān xiáng', sentence: '老白鹭孤独地伫立在水田中，显得格外悠然与[安详]。' }
            ]
          },
          {
            id: 'g5s1-u1-l2',
            unit: 1,
            lessonIndex: 2,
            title: '课文2《落花生》',
            characters: [
              {
                char: '亩',
                pinyin: 'mǔ',
                tone: 3,
                radical: '亠',
                strokeCount: 7,
                structure: '上下结构',
                strokeNames: ['点', '横', '竖', '横折', '横', '竖', '横'],
                isWritingTarget: true,
                words: [
                  { word: '半亩', pinyin: 'bàn mǔ', sentence: '我们在后园的半亩空地上播种花生。' },
                  { word: '田亩', pinyin: 'tián mǔ', sentence: '辽阔的田亩里长满了饱满的庄稼。' }
                ]
              },
              {
                char: '播',
                pinyin: 'bō',
                tone: 1,
                radical: '扌',
                strokeCount: 15,
                structure: '左右结构',
                strokeNames: ['横', '竖钩', '提', '撇', '点', '撇', '横折', '捺', '点', '横', '撇', '竖', '横折', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '播种', pinyin: 'bō zhòng', sentence: '春天是辛勤播种希望的季节。' },
                  { word: '广播', pinyin: 'guǎng bō', sentence: '清晨学校的广播响起了美妙的晨曲。' }
                ]
              },
              {
                char: '浇',
                pinyin: 'jiāo',
                tone: 1,
                radical: '氵',
                strokeCount: 9,
                structure: '左右结构',
                strokeNames: ['点', '点', '提', '横', '横', '竖', '横', '撇', '竖弯钩'],
                isWritingTarget: true,
                words: [
                  { word: '浇水', pinyin: 'jiāo shuǐ', sentence: '我们翻地、播种、浇水、施肥。' },
                  { word: '浇灌', pinyin: 'jiāo guàn', sentence: '辛勤的汗水浇灌出成功的果实。' }
                ]
              }
            ],
            dictationWords: [
              { word: '播种', pinyin: 'bō zhòng', sentence: '在春意盎然的土地上辛勤[播种]希望的种子。' },
              { word: '可贵', pinyin: 'kě guì', sentence: '花生的品质最[可贵]的是它朴实无华、默默奉献。' },
              { word: '吩咐', pinyin: 'fēn fù', sentence: '父亲[吩咐]我们要做一个对社会有用的人。' }
            ]
          }
        ]
      },
      {
        unitNumber: 4,
        title: '第四单元 爱国情怀与家国担当',
        oralCommunication: {
          id: 'g5s1-u4-oral',
          type: 'oral',
          title: '口语交际：我是小小讲解员',
          content: '选择一处革命圣地或家乡的名胜古迹，担任志愿讲解员，向游客热情、清楚地介绍它的历史与看点。',
          guide: '【名师锦囊】按照游览顺序讲解，语气亲切热情，对重点文物与感人故事多作展开。',
          audioText: '口语交际，我是小小讲解员。按路线有条理讲解，感情饱满，举止落落大方。'
        },
        accumulation: {
          id: 'g5s1-u4-recite',
          type: 'recite',
          title: '古诗诵读《示儿》',
          author: '宋 · 陆游',
          content: '死去元知万事空，但悲不见九州同。王师北定中原日，家祭无忘告乃翁。',
          pinyin: 'sǐ qù yuán zhī wàn shì kōng, dàn bēi bú jiàn jiǔ zhōu tóng. wáng shī běi dìng zhōng yuán rì, jiā jì wú wàng gào nǎi wēng.',
          guide: '【名师导读】南宋爱国诗人陆游临终遗训，字字泣血，表达了毕生渴望祖国统一、收复中原的至深爱国情怀。',
          audioText: '古诗诵读，示儿。宋，陆游。死去元知万事空，但悲不见九州同。王师北定中原日，家祭无忘告乃翁。'
        },
        lessons: [
          {
            id: 'g5s1-u4-l1',
            unit: 4,
            lessonIndex: 1,
            title: '课文13《少年中国说》',
            characters: [
              {
                char: '泻',
                pinyin: 'xiè',
                tone: 4,
                radical: '氵',
                strokeCount: 8,
                structure: '左右结构',
                strokeNames: ['点', '点', '提', '点', '点', '横撇', '竖', '横折钩'],
                isWritingTarget: true,
                words: [
                  { word: '一泻千里', pinyin: 'yí xiè qiān lǐ', sentence: '红日初升，其道大光；河出伏流，一泻千里。' },
                  { word: '倾泻', pinyin: 'qīng xiè', sentence: '瀑布如白练般从峭壁倾泻而下。' }
                ]
              },
              {
                char: '潜',
                pinyin: 'qián',
                tone: 2,
                radical: '氵',
                strokeCount: 15,
                structure: '左右结构',
                strokeNames: ['点', '点', '提', '横', '横', '竖', '横', '横', '竖', '竖', '横折', '横', '横', '横', '竖'],
                isWritingTarget: true,
                words: [
                  { word: '潜龙腾渊', pinyin: 'qián lóng téng yuān', sentence: '潜龙腾渊，鳞爪飞扬。' },
                  { word: '潜心', pinyin: 'qián xīn', sentence: '潜心钻研知识，攀登科学高峰。' }
                ]
              },
              {
                char: '渊',
                pinyin: 'yuān',
                tone: 1,
                radical: '氵',
                strokeCount: 11,
                structure: '左右结构',
                strokeNames: ['点', '点', '提', '竖', '横折', '横', '横', '竖', '撇', '竖弯钩', '点'],
                isWritingTarget: true,
                words: [
                  { word: '深渊', pinyin: 'shēn yuān', sentence: '临深渊而志愈坚。' },
                  { word: '渊博', pinyin: 'yuān bó', sentence: '张老师知识渊博，平易近人。' }
                ]
              }
            ],
            dictationWords: [
              { word: '潜龙腾渊', pinyin: 'qián lóng téng yuān', sentence: '少年犹如[潜龙腾渊]，展现出无限的活力与生机。' },
              { word: '一泻千里', pinyin: 'yí xiè qiān lǐ', sentence: '长江之水奔腾咆哮，[一泻千里]，气势恢宏。' },
              { word: '与国无疆', pinyin: 'yǔ guó wú jiāng', sentence: '美哉我少年中国，与天不老；壮哉我中国少年，[与国无疆]！' }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 5,
    semester: 2,
    title: '五年级下册',
    version: '人教版 (部编版)',
    units: [
      {
        unitNumber: 2,
        title: '第二单元 古典名著之旅',
        oralCommunication: {
          id: 'g5s2-u2-oral',
          type: 'oral',
          title: '口语交际：怎么表演课本剧',
          content: '选择古典名著中的精彩片段（如草船借箭、武松打虎），改编为课本剧台词并进行角色扮演。',
          guide: '【名师锦囊】抓准人物个性特点（诸葛亮的神机妙算、周瑜的妒忌），台词生动，肢体动作到位。',
          audioText: '口语交际，怎么表演课本剧。读懂角色心理，台词清晰生动，配合默契。'
        },
        accumulation: {
          id: 'g5s2-u2-recite',
          type: 'recite',
          title: '古诗诵读《鸟鸣涧》',
          author: '唐 · 王维',
          content: '人闲桂花落，夜静春山空。月出惊山鸟，时鸣春涧中。',
          pinyin: 'rén xián guì huā luò, yè jìng chūn shān kōng. yuè chū jīng shān niǎo, shí míng chūn jiàn zhōng.',
          guide: '【名师导读】诗佛王维以动衬静的名篇，落花、月升、鸟鸣不仅不喧闹，反而将春夜山涧的静谧幽美衬托到了极致。',
          audioText: '古诗诵读，鸟鸣涧。唐，王维。人闲桂花落，夜静春山空。月出惊山鸟，时鸣春涧中。'
        },
        lessons: [
          {
            id: 'g5s2-u2-l1',
            unit: 2,
            lessonIndex: 1,
            title: '课文5《草船借箭》',
            characters: [
              {
                char: '妒',
                pinyin: 'dù',
                tone: 4,
                radical: '女',
                strokeCount: 7,
                structure: '左右结构',
                strokeNames: ['撇点', '撇', '横', '点', '横', '竖折', '横'],
                isWritingTarget: true,
                words: [
                  { word: '妒忌', pinyin: 'dù jì', sentence: '周瑜看到诸葛亮挺有才干，心里很妒忌。' },
                  { word: '嫉妒', pinyin: 'jí dù', sentence: '我们要学会欣赏他人，克服内心的嫉妒。' }
                ]
              },
              {
                char: '忌',
                pinyin: 'jì',
                tone: 4,
                radical: '心',
                strokeCount: 7,
                structure: '上下结构',
                strokeNames: ['横折', '横', '竖弯钩', '点', '斜钩', '点', '点'],
                isWritingTarget: true,
                words: [
                  { word: '顾忌', pinyin: 'gù jì', sentence: '诸葛亮成竹在胸，毫无顾忌。' },
                  { word: '猜忌', pinyin: 'cāi jì', sentence: '坦诚交流可以消除人与人之间的猜忌。' }
                ]
              },
              {
                char: '督',
                pinyin: 'dū',
                tone: 1,
                radical: '目',
                strokeCount: 13,
                structure: '上下结构',
                strokeNames: ['竖', '横', '竖', '撇', '点', '横撇', '捺', '竖', '横折', '横', '横', '横'],
                isWritingTarget: true,
                words: [
                  { word: '都督', pinyin: 'dū du', sentence: '周瑜是东吴年轻有为的大都督。' },
                  { word: '督促', pinyin: 'dū cù', sentence: '老师经常督促我们养成端正的书写习惯。' }
                ]
              },
              {
                char: '鲁',
                pinyin: 'lǔ',
                tone: 3,
                radical: '鱼',
                strokeCount: 12,
                structure: '上下结构',
                strokeNames: ['撇', '横撇', '竖', '横折', '横', '竖', '横', '提', '竖', '横折', '横'],
                isWritingTarget: true,
                words: [
                  { word: '鲁肃', pinyin: 'lǔ sù', sentence: '鲁肃为人忠厚老实，顾全大局。' },
                  { word: '粗鲁', pinyin: 'cū lǔ', sentence: '说话举止不能粗鲁无礼。' }
                ]
              }
            ],
            dictationWords: [
              { word: '妒忌', pinyin: 'dù jì', sentence: '周瑜心中暗生[妒忌]，设下难题刁难诸葛亮。' },
              { word: '都督', pinyin: 'dū du', sentence: '诸葛亮神态从容地向大[都督]立下了军令状。' },
              { word: '神机妙算', pinyin: 'shén jī miào suàn', sentence: '鲁肃由衷佩服诸葛亮的[神机妙算]，自叹不如。' },
              { word: '擂鼓呐喊', pinyin: 'léi gǔ nà hǎn', sentence: '二十条草船排成一字，军士们在江面上[擂鼓呐喊]。' }
            ]
          }
        ]
      }
    ]
  }
];
