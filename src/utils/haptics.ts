// 原生触觉反馈封装：支持 Capacitor Haptics 与 Web 振动 API (navigator.vibrate) 降级兜底

import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

class HapticsService {
  // 轻微触觉反馈：按键点按、笔画落笔 (Tick / Light)
  public async lightImpact() {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  }

  // 中度触觉反馈：笔画书写正确、单笔完成 (Medium)
  public async mediumImpact() {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(25);
      }
    }
  }

  // 成功通知震动：整字写对、通关、解锁成就 (Success Notification)
  public async successNotification() {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([30, 50, 60]);
      }
    }
  }

  // 柔和提醒震动：笔顺倒插笔、起笔反了 (Warning Notification)
  public async warningNotification() {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([20, 40, 20]);
      }
    }
  }

  // 选择切换微反馈：Tab 切换、菜单点击 (Selection)
  public async selectionChanged() {
    try {
      await Haptics.selectionChanged();
    } catch {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(8);
      }
    }
  }
}

export const haptics = new HapticsService();
