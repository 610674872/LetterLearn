# 《字小乐》(LetterLearn) 真实代码实现地图 (Implementation Context)

> **定位**：供开发者与 Agent 秒速掌握当前仓库的真实代码布局、模块入口、状态流向与技术边界。

---

## 🏗️ 一、项目技术栈与运行环境

* **核心框架**：React 19.2 + TypeScript 6.0 + Vite 8.3
* **样式引擎**：Tailwind CSS 4.3 + 自定义田字格辅助线 CSS（[src/index.css](file:///Users/mac/work/personal/LetterLearn/src/index.css)）
* **移动跨端**：Capacitor 8.5（支持打包 Android APK 与 PWA 离线安装）
* **汉字书写引擎**：`hanzi-writer`（动态笔画拆解、轨迹追踪、纠偏）
* **音画特效**：
  * Web Speech API（标准普通话语音合成）
  * Web AudioContext 纯合成音效（水滴声、木鱼声、通关和弦）
  * `canvas-confetti`（彩带礼花微动效）

---

## 🗺️ 二、核心模块与代码入口地图

| 模块分类 | 核心文件 | 职责说明 |
| :--- | :--- | :--- |
| **应用总调度** | [src/App.tsx](file:///Users/mac/work/personal/LetterLearn/src/App.tsx) | 顶层导航状态、教材切换调度、全局统计数据管理、20分钟护眼定时器 |
| **田字格练字板** | [src/components/HanziBoard.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/HanziBoard.tsx) | “看演示 / 去描红 / 默写自测”三阶教学，调用 HanziWriter 与笔画语音伴读 |
| **智能听写大师** | [src/components/DictationMaster.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/DictationMaster.tsx) | ① 纸上伴读模式（自定义遍数与间隔）<br/>② 测验入口与纸上听写设置 |
| **全屏听写考场** | [src/components/DictationExamModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/DictationExamModal.tsx) | 独立全屏防干扰测验、单/双/多字自适应田字格画布、考后全卷100分打分与错题诊断报告 |
| **看拼音写汉字** | [src/components/PinyinWritingQuiz.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/PinyinWritingQuiz.tsx) | 带调拼音出题、课文例句填空语境化闯关 |
| **自由书写板** | [src/components/FreeHandwritingBoard.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/FreeHandwritingBoard.tsx) | 自由练字涂鸦、笔触粗细与朱红/墨黑切换 |
| **错题本强化** | [src/components/ErrorBookModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/ErrorBookModal.tsx) | 错字归集、艾宾浩斯抗遗忘周期复习、错字消灭重测 |
| **生字字典** | [src/components/CharacterDictionaryModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/CharacterDictionaryModal.tsx) | 笔画数、部首、间架结构分析与生活化组词例句 |
| **成就与勋章** | [src/components/BadgeWallModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/BadgeWallModal.tsx) | 星星（⭐）与墨滴（💧）成长体系、勋章解锁展示 |
| **护眼关怀** | [src/components/EyeCareModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/EyeCareModal.tsx) | 20 分钟护眼休息提醒与眼保健操动效引导 |
| **教材题库** | [src/data/pepCurriculum.ts](file:///Users/mac/work/personal/LetterLearn/src/data/pepCurriculum.ts) | 部编统编人教版小学语文一至二年级字表与同步听写词库 |
| **音效驱动** | [src/utils/soundEffects.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/soundEffects.ts) | 纯算法合成无外部依赖的清脆水滴声、木鱼声与通关和弦 |
| **普通话语音** | [src/utils/speech.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/speech.ts) | Web Speech 语音引擎，含语速调节与发音容错降级 |
| **笔迹分析器** | [src/utils/strokeAnalyzer.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/strokeAnalyzer.ts) | 基于中线坐标点集的笔顺起止方向与书写顺逆判定 |

---

## 💾 三、状态架构与持久化流向

```text
[儿童书写 / 听写结果]
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

## 🚧 四、当前真实实现与进阶需求差距

1. **生字题库覆盖率**：当前已录入一年级上册/下册精选课文，后续需持续扩充二年级上/下册完整词库；
2. **移动端触觉震动反馈**：目前已引入 Capacitor 基础库，后续可在笔画写对时联动 `@capacitor/haptics` 触发轻微震动；
3. **离线 PWA 静态缓存**：已配置 Service Worker 与 Manifest，支持主屏幕快捷安装。
