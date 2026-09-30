# 💻 资深产品架构与跨端工程标准

> **主理角色**：资深产品架构工程师  
> **技术栈**：React 19 + TypeScript + Vite + Tailwind CSS + Capacitor Android/iOS + HanziWriter  
> **核心指标**：60fps 触控绘制无卡顿、离线优先、零致命崩溃、低端儿童设备适配

---

## 一、性能与触控绘制架构 (60fps Touch & Render)

### 1. 手写触控与笔迹渲染延迟极小化
* **延迟敏感性**：儿童手写笔迹如果存在 $>30\text{ms}$ 延迟，会显著影响书写肌肉记忆。
* **技术规范**：
  * 使用 HTML5 Canvas 或 SVG 渲染笔迹时，禁止在 `pointermove` 或 `touchmove` 事件中执行重计算、深拷贝或触发 React 的 `setState` 重新渲染组件整树。
  * 笔画采集点使用局部 ref 缓冲区（Buffer），结合 `requestAnimationFrame` 驱动局部重绘。
  * CSS 设置 `touch-action: none;` 防止手写板区域触发浏览器默认的上下回弹或左右滑动手势。
* **HanziWriter 性能优化**：
  * 在 [HanziBoard.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/HanziBoard.tsx) 中对 `HanziWriter.create` 实例进行生命周期精准管理。
  * 字符切换时必须正确调用销毁或更新方法，严禁内存泄露导致多次切换后页面掉帧。

### 2. 低端儿童学习平板适配 (Low-End Devices)
* 很多家庭使用闲置的老款 iPad、百元 Android 平板或低性能儿童手表/学习机。
* **优化策略**：
  * 避免大面积全屏重绘模糊滤镜（如 `backdrop-blur-xl`），在低性能机型下降级为纯色半透明背景。
  * 礼花特效（`canvas-confetti`）粒子数限制在 50~80 颗之间，播放完毕立即清理画布。

---

## 二、离线优先与数据自愈体系 (Local-First & Offline Resilience)

### 1. 全离线学习数据与字典架构
* 汉字笔画字库、发音、人教版课本同步题库（[pepCurriculum.ts](file:///Users/mac/work/personal/LetterLearn/src/data/pepCurriculum.ts)）全部内置打包。
* 严禁依赖不稳定的外网第三方生字接口导致课堂或练习中断。

### 2. 本地持久化与防损坏
* 用户学习成就、错题记录（`UserLearningStats`）写入 `localStorage` 时：
  * 必须使用 `try-catch` 包裹 `JSON.parse` 与 `JSON.stringify`，处理无痕模式、存储配额满（QuotaExceededError）等边界异常。
  * 必须具备 Schema 默认值填充兜底，防止旧版本字段缺失导致页面空白。

---

## 三、跨端容器适配 (Capacitor & Mobile Ecosystem)

### 1. 移动端安全区与屏幕方向
* **安全区适配**：顶部导航栏与底部操作栏必须加入 Safe Area Inset：
  ```css
  padding-top: max(env(safe-area-inset-top), 16px);
  padding-bottom: max(env(safe-area-inset-bottom), 16px);
  ```
* **屏幕横竖屏自适应**：
  * 手机端默认竖屏优化，田字格置中，生字列表置底。
  * 平板端支持横屏分栏（左侧生字选择与课文导航，右侧田字格与听写主操作区）。

### 2. 语音合成 (TTS) 与音频策略
* 移动端（iOS / Android WebView）对 AudioContext 与 Web Speech API 普遍有“必须由用户交互手势触发后才能播放声音”的安全限制。
* 编写通用音频管理器（[soundEffects.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/soundEffects.ts) 和 [speech.ts](file:///Users/mac/work/personal/LetterLearn/src/utils/speech.ts)），在首个用户点击动作时自动解锁 AudioContext。
* 当系统缺少中文 TTS 语音包时，控制台温和提示并不阻塞整体书写练习主流程。

---

## 四、代码质量与严谨性标准

1. **类型完备**：所有数据模型必须在 [src/types/index.ts](file:///Users/mac/work/personal/LetterLearn/src/types/index.ts) 中显式声明，杜绝滥用 `any`。
2. **零 Lint 错误**：遵循项目 `oxlint` 规范，杜绝未使用的变量与无效导入。
3. **单一职责与高内聚**：
   - 教学数据：`src/data/`
   - 工具函数：`src/utils/`
   - 独立交互单元：`src/components/`
