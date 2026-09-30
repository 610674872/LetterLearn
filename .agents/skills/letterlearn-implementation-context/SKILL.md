---
name: letterlearn-implementation-context
description: 在《字小乐》(LetterLearn) 开始写代码、接手新对话中的开发任务、修改已有功能、排查实现入口或完成较大代码变更后使用；负责先读取并核对当前代码真实实现，提炼关键模型、组件、数据流、持久化、HanziWriter渲染协议、Web Speech语音状态和“当前实现与目标需求的差距”，维护 docs/engineering/IMPLEMENTATION_CONTEXT.md，帮助后续开发秒速进入状态，不代替真实编码和测试。
version: 1.0.0
---

# 《字小乐》代码实现地图 Skill (LetterLearn Implementation Context)

用于维护《字小乐》工程的“真实代码实现全景地图”。

> **核心目标**：让每一个新对话、新任务在动手改代码前，秒速知道：
> 1. 真实运行的代码在哪个组件与文件中；
> 2. 核心状态由谁持有（React State / Props / localStorage）；
> 3. 数据流怎么跑（`生字题库 → 组件状态 → 触控笔画判定 → 错题/成就持久化 → UI声画反馈`）；
> 4. 当前已经实现了什么，与产品目标还差在哪里；
> 5. 动手改代码应该从哪些文件与函数切入。

项目真实实现地图文档：
`docs/engineering/IMPLEMENTATION_CONTEXT.md`

---

## 🎯 何时使用

以下场景优先激活本 Skill：
- 用户说“继续实现 / 修改这个功能 / 优化这个界面”；
- 新对话接手之前的未完成任务，需要快速摸清工程现状；
- 不清楚某个生字书写、拼音或听写功能落在哪个组件；
- 进行了数据模型（`src/types/index.ts`）、组件结构或持久化结构的重构；
- 准备打包前需要确认当前实现路径与依赖关系。

---

## 🧭 核对代码实现的“四大基石”

编写任何代码前，必须在内部理清：

### 1. 入口在哪里 (Entry Points)
- **全局入口**：[src/App.tsx](file:///Users/mac/work/personal/LetterLearn/src/App.tsx)（模式切换、全局学习统计、护眼弹窗调度）
- **核心交互组件**：
  - 田字格练字：[src/components/HanziBoard.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/HanziBoard.tsx)
  - 智能听写：[src/components/DictationMaster.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/DictationMaster.tsx)
  - 拼音闯关：[src/components/PinyinWritingQuiz.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/PinyinWritingQuiz.tsx)
  - 自由画板：[src/components/FreeHandwritingBoard.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/FreeHandwritingBoard.tsx)
  - 错题强化：[src/components/ErrorBookModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/ErrorBookModal.tsx)
  - 勋章成就：[src/components/BadgeWallModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/BadgeWallModal.tsx)
  - 护眼关怀：[src/components/EyeCareModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/EyeCareModal.tsx)
  - 生字字典：[src/components/CharacterDictionaryModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/CharacterDictionaryModal.tsx)
  - 课本抽屉：[src/components/CurriculumDrawer.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/CurriculumDrawer.tsx)
- **底层驱动服务**：
  - 语音合成：[src/utils/speech.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/speech.ts)
  - 音效合成：[src/utils/soundEffects.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/soundEffects.ts)
  - 笔画分析：[src/utils/strokeAnalyzer.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/strokeAnalyzer.ts)
  - 勋章判定：[src/utils/badgeSystem.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/badgeSystem.ts)
  - 部编题库：[src/data/pepCurriculum.ts](file:///Users/mac/work/personal/LetterLearn/src/data/pepCurriculum.ts)

### 2. 状态由谁持有 (State Ownership)
- **全局持久状态**：`UserLearningStats`（掌握字、错题库、已解锁徽章），持久化于 `localStorage['letterlearn_stats']`；
- **当前课堂状态**：当前年级、册次、单元、生字索引，由 `App.tsx` 持有并下发；
- **局部瞬时状态**：笔画索引、书写笔迹坐标点集、发音播放状态，由对应组件的 ref 或 useState 局部管理。

### 3. 数据怎么流 (Data Flow)
```text
教材数据 (pepCurriculum)
   │
   ▼
组件初始化渲染 (田字格 / 拼音例句 / 听写词)
   │
   ▼
儿童交互 (触控书写 / 语音朗读)
   │
   ▼
底层判定 (strokeAnalyzer 笔顺方向对齐 / HanziWriter 轨迹校验)
   │
   ▼
状态变更 & 持久化 (localStorage 错题归集 / 徽章点亮)
   │
   ▼
多感官反馈 (水滴叮咚音 + 墨滴增长 + 星星彩带庆祝)
```

### 4. 当前实现与目标的真实差距 (Implementation Gap)
开发前客观识别：哪些是当前已经完全跑通的，哪些是目前仅有 UI 占位还未对接底层逻辑的，哪些是需要重构的。

---

## 📝 维护 IMPLEMENTATION_CONTEXT.md

当以下任一情况发生且已提交时，必须同步更新 `docs/engineering/IMPLEMENTATION_CONTEXT.md`：
1. 新增或修改了核心数据类型（`src/types/index.ts`）；
2. 新增或重构了核心组件路由与交互页面；
3. 持久化存储结构或键名发生迁移变更；
4. 语音/音频驱动、手写分析底层算法发生重大优化；
5. 原本标记为“未完成”的功能已经开发落地。
