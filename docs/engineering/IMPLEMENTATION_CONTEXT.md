# 《字小乐》(LetterLearn) 真实代码实现地图 (Implementation Context)

> **定位**：供开发者与 Agent 秒速掌握当前仓库的真实代码布局、模块入口、状态流向与技术边界。

---

## 🏗️ 一、项目技术栈与运行环境

* **核心框架**：React 19.2 + TypeScript 6.0 + Vite 8.3
* **样式引擎**：Tailwind CSS 4.3 + 自定义田字格辅助线 CSS（[src/index.css](file:///Users/mac/work/personal/LetterLearn/src/index.css)）
* **移动跨端**：Capacitor 8.5（支持打包 Android APK 与 PWA 离线安装）
* **汉字书写引擎**：`hanzi-writer`（动态笔画拆解、轨迹追踪、纠偏）
* **音画特效**：
  * Web Speech API（标准普通话语音合成）+ 在线高品质真人发音兜底
  * Web AudioContext 纯算法合成音效（水滴声、木鱼声、通关和弦）
  * `canvas-confetti`（彩带礼花微动效）
  * Web Audio / MediaRecorder API（儿童朗读录音与回放）

---

## 🗺️ 二、核心模块与代码入口地图

| 模块分类 | 核心文件 | 职责说明 |
| :--- | :--- | :--- |
| **应用总调度** | [src/App.tsx](file:///Users/mac/work/personal/LetterLearn/src/App.tsx) | 顶层导航状态、教材切换调度、全局统计数据管理、20分钟护眼定时器 |
| **田字格练字板** | [src/components/HanziBoard.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/HanziBoard.tsx) | “看演示 / 去描红 / 默写自测”三阶教学，调用 HanziWriter 与笔画语音伴读 |
| **智能听写大师** | [src/components/DictationMaster.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/DictationMaster.tsx) | ① 纸上伴读模式（自定义遍数与间隔）<br/>② 测验入口与纸上听写设置 |
| **全屏听写考场** | [src/components/DictationExamModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/DictationExamModal.tsx) | 独立全屏防干扰测验、单/双/多字自适应田字格画布、考后全卷100分打分与错题诊断报告 |
| **诵读与口语演播室** | [src/components/OralAndReadingStudio.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/OralAndReadingStudio.tsx) | **听说读一体化**：名师范读(听)、小书童录音跟读回放(说)、经典古诗文与日积月累(读)、背诵三阶脚手架 |
| **看拼音写汉字** | [src/components/PinyinWritingQuiz.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/PinyinWritingQuiz.tsx) | 带调拼音出题、课文例句填空语境化闯关 |
| **教材抽屉** | [src/components/CurriculumDrawer.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/CurriculumDrawer.tsx) | **一至六年级全12册两级导航**（年级胶囊 + 上下册胶囊），单元口语与诵读角标 |
| **自由书写板** | [src/components/FreeHandwritingBoard.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/FreeHandwritingBoard.tsx) | 自由练字涂鸦、笔触粗细与朱红/墨黑切换 |
| **错题本强化** | [src/components/ErrorBookModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/ErrorBookModal.tsx) | 错字归集、艾宾浩斯抗遗忘周期复习、错字消灭重测 |
| **生字字典** | [src/components/CharacterDictionaryModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/CharacterDictionaryModal.tsx) | 一至六年级全字表检索、年级筛选、笔画数、部首、结构与例句 |
| **成就与勋章** | [src/components/BadgeWallModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/BadgeWallModal.tsx) | 星星（⭐）与墨滴（💧）成长体系、勋章解锁展示 |
| **护眼关怀** | [src/components/EyeCareModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/EyeCareModal.tsx) | 20 分钟护眼休息提醒与眼保健操动效引导 |
| **教材题库模块** | [src/data/curriculum/](file:///Users/mac/work/personal/LetterLearn/src/data/curriculum/) | 一至六年级分册模块化架构 (`grade1.ts` ~ `grade6.ts`)，包含写字表、听写词库、口语交际与诵读 |
| **音效驱动** | [src/utils/soundEffects.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/soundEffects.ts) | 纯算法合成无外部依赖的清脆水滴声、木鱼声与通关和弦 |
| **普通话语音** | [src/utils/speech.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/speech.ts) | Web Speech 语音引擎，含语速调节与发音容错降级 |
| **笔迹分析器** | [src/utils/strokeAnalyzer.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/strokeAnalyzer.ts) | 基于中线坐标点集的笔顺起止方向与书写顺逆判定 |

---

## 💾 三、状态架构与持久化流向

```text
[儿童书写 / 听写 / 诵读结果]
         │
         ▼
[更新 App.tsx 内部 userStats]
         │
         ▼
[写入 localStorage('letterlearn_stats')]
         │
         ├── writtenCorrectChars: string[] (已掌握生字)
         ├── mistakes: { [char]: { count, lastDate, reasons } } (错题本)
         ├── clearedMistakesCount: number (消灭错字数)
         ├── totalDictationWordsPassed: number (听写达标词数)
         └── unlockedBadges: { [badgeId]: string } (解锁勋章)
```

---

## 📚 四、人教版（部编版）小学 1~6 年级听说读写完整矩阵

| 学段与年级 | 听 (Listening) | 说 (Speaking) | 读 (Reading) | 写 (Writing) |
| :--- | :--- | :--- | :--- | :--- |
| **一年级（上/下）** | 智能听写伴读、发音辨听 | 口语交际《我说你做》《听故事讲故事》、发音跟读 | 拼音拼读、古诗《咏鹅》《春晓》诵读 | 国标基础笔画笔顺、象形汉字田字格书写 |
| **二年级（上/下）** | 语境听写、长句慢速听写 | 口语交际《有趣的动物》《商量》《说话语气》 | 经典古诗《登鹳雀楼》《赋得古原草送别》 | 部首间架结构、左右/上下/包围结构规整 |
| **三年级（上/下）** | 课文词语盘点、标准听写测验 | 口语交际《暑假生活》《名字里的故事》《春游建议》 | 经典散文《花的学校》、古诗《山行》《绝句》 | 会写字表进阶、中长词语拼音默写 |
| **四年级（上/下）** | 段落听写、四字成语听写 | 口语交际《我们与环境》《讲历史人物故事》《转述》 | 哲理诗《题西林壁》《出塞》、田园诗诵读 | 复杂笔画（撇折/折折钩）、形近字辨析书写 |
| **五年级（上/下）** | 文言古文初听、语意理解 | 口语交际《制定班级公约》《小小讲解员》《演课本剧》 | 爱国诗《示儿》《少年中国说》、名篇《白鹭》 | 名著高频字词盘点、文段规范抄写 |
| **六年级（上/下）** | 毕业复习全真听写、成语速写 | 口语交际《演讲》《请你支持我》《即兴发言》 | 豪放词《西江月》、鲁迅金句、古诗《竹石》 | 小学必背高阶汉字、词林高手默写自测 |

---

## 🚧 五、当前系统状态与后续演进

1. **生字与课文全覆盖**：已全面建立人教部编版 1 至 6 年级全 12 册教材的分模块数据架构；
2. **听说读写四维闭环**：写（HanziBoard）、拼（PinyinQuiz）、听（DictationMaster / DictationExamModal）、读说（OralAndReadingStudio）；
3. **移动端触觉震动反馈**：目前已引入 Capacitor 基础库，后续可在笔画写对时联动 `@capacitor/haptics` 触发轻微震动；
4. **离线 PWA 静态缓存**：已配置 Service Worker 与 Manifest，支持主屏幕快捷安装与离线使用。
