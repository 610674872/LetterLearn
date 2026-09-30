// 语音播放与朗读工具（基于 Web Speech API + 高品质网络发音双重兜底）
import { soundEffects } from './soundEffects';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();
  private currentAudio: HTMLAudioElement | null = null;
  private isOnlineFallbackEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.initVoice();

        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.initVoice();
        }
        window.speechSynthesis?.addEventListener?.('voiceschanged', () => this.initVoice());
      }

      // 用户首次交互时恢复/解除可能被挂起的语音合成
      const unlockSpeech = () => {
        if (this.synth && this.synth.paused) {
          this.synth.resume();
        }
      };
      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach((evt) => {
        window.addEventListener(evt, unlockSpeech, { passive: true });
      });

      // 与 soundEffects 共享静音状态
      soundEffects.subscribeMuteChange((muted) => {
        if (muted) {
          this.cancel();
        }
      });
    }
  }

  public initVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // 匹配中文普通话声音 (zh-CN / zh-HK / zh-TW / Chinese / cmn)
    const chineseVoices = voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      return (
        lang.includes('zh') ||
        lang.includes('cmn') ||
        name.includes('chinese') ||
        name.includes('mandarin') ||
        name.includes('普通话') ||
        name.includes('中文')
      );
    });

    if (chineseVoices.length > 0) {
      // 优选高品质发音人 (如 Edge/Windows 的 Xiaoxiao, 云希, 苹果系统的 Tingting, Meijia 等)
      const preferred = chineseVoices.find((v) => {
        const name = v.name || '';
        return (
          name.includes('Xiaoxiao') ||
          name.includes('Tingting') ||
          name.includes('Meijia') ||
          name.includes('Yunxi') ||
          name.includes('Natural') ||
          name.includes('Sin-ji') ||
          v.lang === 'zh-CN' ||
          v.lang === 'zh_CN'
        );
      });
      this.voice = preferred || chineseVoices[0];
      return this.voice;
    }

    return null;
  }

  // 播放网络真人发音兜底（当本地环境无中文语音包或报错时自动调用）
  private playOnlineFallback(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (soundEffects.getMuted()) {
        resolve();
        return;
      }

      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      // 提取核心文字，避免特殊符号干扰网络 TTS
      const cleanText = text.replace(/[，。！？、~～#*\s]+/g, ' ').trim();
      if (!cleanText) {
        resolve();
        return;
      }

      const primaryUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&le=zh`;
      const backupUrl = `https://fanyi.baidu.com/gettts?lan=zh&text=${encodeURIComponent(cleanText)}&spd=5&source=web`;

      const audio = new Audio(primaryUrl);
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        resolve();
      };

      audio.onerror = () => {
        // 尝试备用引擎
        const fallbackAudio = new Audio(backupUrl);
        this.currentAudio = fallbackAudio;
        fallbackAudio.onended = () => {
          this.currentAudio = null;
          resolve();
        };
        fallbackAudio.onerror = () => {
          this.currentAudio = null;
          resolve();
        };
        fallbackAudio.play().catch(() => {
          this.currentAudio = null;
          resolve();
        });
      };

      audio.play().catch(() => {
        this.currentAudio = null;
        resolve();
      });
    });
  }

  public async speak(text: string, rate: number = 0.88, pitch: number = 1.05): Promise<void> {
    if (soundEffects.getMuted()) return;

    // 1. 无本地 Web Speech API，直接使用网络在线发音兜底
    if (!this.synth) {
      if (this.isOnlineFallbackEnabled) {
        await this.playOnlineFallback(text);
      }
      return;
    }

    // 确保声音列表已加载
    if (!this.voice) {
      this.initVoice();
    }

    // 2. 本地系统无中文发音人，直接走高保真网络发音兜底
    if (!this.voice && this.isOnlineFallbackEnabled) {
      await this.playOnlineFallback(text);
      return;
    }

    return new Promise<void>((resolve) => {
      try {
        // 唤醒可能处于 paused 的合成器引擎
        if (this.synth!.paused) {
          this.synth!.resume();
        }
        this.synth!.cancel(); // 清空当前待播队列

        // 避免 cancel 和 speak 处于同一同步微任务导致 Chromium 内部直接抛弃 speak
        setTimeout(() => {
          if (soundEffects.getMuted()) {
            resolve();
            return;
          }

          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'zh-CN';
          utterance.rate = rate; // 略慢一点更适合低年级儿童辨听
          utterance.pitch = pitch; // 音调略高更亲切童趣

          if (this.voice) {
            utterance.voice = this.voice;
          }

          // 核心防御：防止 Chromium / Safari V8 垃圾回收导致发音突然静音卡死 (Chromium Issue 1157975)
          this.activeUtterances.add(utterance);

          const cleanup = () => {
            this.activeUtterances.delete(utterance);
          };

          utterance.onend = () => {
            cleanup();
            resolve();
          };

          utterance.onerror = (e) => {
            cleanup();
            console.warn('[SpeechService] Local speech failed, switching to online fallback:', e);
            if (this.isOnlineFallbackEnabled) {
              this.playOnlineFallback(text).then(resolve);
            } else {
              resolve();
            }
          };

          this.synth!.speak(utterance);
        }, 20);
      } catch (err) {
        console.warn('[SpeechService] Speech execution error:', err);
        if (this.isOnlineFallbackEnabled) {
          this.playOnlineFallback(text).then(resolve);
        } else {
          resolve();
        }
      }
    });
  }

  public cancel() {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.activeUtterances.clear();
  }

  // 获取发音引擎健康与诊断信息
  public getDiagnostics() {
    const hasSynth = typeof window !== 'undefined' && 'speechSynthesis' in window;
    const voices = hasSynth ? window.speechSynthesis.getVoices() : [];
    const chineseVoices = voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      return lang.includes('zh') || lang.includes('cmn') || name.includes('chinese');
    });

    return {
      webSpeechSupported: hasSynth,
      totalVoices: voices.length,
      chineseVoicesCount: chineseVoices.length,
      activeVoiceName: this.voice ? this.voice.name : '网络真人高清发音兜底',
      isMuted: soundEffects.getMuted(),
      onlineFallbackReady: this.isOnlineFallbackEnabled,
    };
  }
}

export const speechService = new SpeechService();
