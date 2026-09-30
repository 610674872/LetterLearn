# 决策：20分钟儿童视力保护与眼保健操关怀机制

- **日期**：2026-09-29
- **状态**：已敲定并实现
- **涉及模块**：[src/components/EyeCareModal.tsx](file:///Users/mac/work/personal/LetterLearn/src/components/EyeCareModal.tsx), [src/App.tsx](file:///Users/mac/work/personal/LetterLearn/src/App.tsx)

---

## 🎯 一、背景与健康伦理
低年级儿童眼球发育尚未成熟，长时间注视发光屏幕极易引发视疲劳和近视。遵循眼科国际公认的“20-20-20”护眼法则，产品必须将护眼作为核心伦理底线。

---

## 📋 二、已敲定方案
1. **计时机制**：
   - 全局维护累计活跃时间（非后台挂起时间）；
   - 达到 20 分钟时，自动浮现全屏护眼关怀弹窗（`EyeCareModal`）；
2. **交互引导**：
   - 杜绝粗暴断电，以卡通恐龙“小恐龙喊你休息眼睛啦”亲切形象出现；
   - 引导 20 秒呼吸、远眺窗外绿植、做眨眼操；
   - 倒计时结束后方可继续使用，强化健康习惯。
