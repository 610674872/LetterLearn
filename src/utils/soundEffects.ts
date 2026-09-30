// 纯原生 Web Audio API 合成音效（无需任何外部音频文件，零延迟，100% 离线可用）

import { haptics } from './haptics';

type MuteChangeListener = (isMuted: boolean) => void;

class SoundEffectsService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private listeners: Set<MuteChangeListener> = new Set();
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isMuted = localStorage.getItem('letterlearn_muted') === 'true';

      // 注册全页面首次用户手势自动解锁机制（适配 iOS Safari、微信、Android 各大移动端 WebView）
      const unlock = () => {
        this.unlockAudioContext();
      };
      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach((evt) => {
        window.addEventListener(evt, unlock, { once: true, passive: true });
      });
    }
  }

  public subscribeMuteChange(listener: MuteChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyMuteChange() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isMuted);
      } catch (e) {
        console.error(e);
      }
    });
  }

  // 主动解锁 Web Audio 上下文与音频硬件管道
  public unlockAudioContext(): void {
    if (this.isUnlocked) return;
    const ctx = this.getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      try {
        // 播放 1 个采样的静音音频缓冲区，彻底激活 iOS WebKit 音频通道
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        this.isUnlocked = true;
      } catch {
        // ignore
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('letterlearn_muted', String(muted));
    }
    this.notifyMuteChange();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 保证在 AudioContext 真正恢复活跃后再调度振荡器节点，彻底解决 iOS/首音静音问题
  private runWithContext(fn: (ctx: AudioContext) => void) {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx
        .resume()
        .then(() => {
          if (!this.isMuted) fn(ctx);
        })
        .catch(() => {});
    } else {
      fn(ctx);
    }
  }

  // 笔画书写正确时的清脆水滴/小木鱼声 (Plink)
  public playStrokeSuccess() {
    haptics.lightImpact();
    this.runWithContext((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    });
  }

  // 笔顺错误时的温和提示音 (Soft Blip)
  public playStrokeMistake() {
    haptics.warningNotification();
    this.runWithContext((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    });
  }

  // 汉字书写全部完成的通关和弦声 (Success Chord)
  public playCharacterComplete() {
    haptics.successNotification();
    this.runWithContext((ctx) => {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (大三和弦)
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    });
  }

  // 获得星星的魔法闪耀声 (Sparkle)
  public playStarReward() {
    haptics.mediumImpact();
    this.runWithContext((ctx) => {
      const frequencies = [880, 1108.73, 1318.51, 1760]; // A5, C#6, E6, A6
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + idx * 0.06;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    });
  }
}

export const soundEffects = new SoundEffectsService();
