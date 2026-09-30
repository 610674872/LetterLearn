// 语音播放与朗读工具（基于 Web Speech API）

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // 优先匹配中文普通话声音 (zh-CN / zh-HK / Chinese)
    const chineseVoices = voices.filter(v => v.lang.includes('zh') || v.lang.includes('cmn'));
    if (chineseVoices.length > 0) {
      // 优选 Tingting, Xiaoxiao, Sin-ji 等高质量声音
      const preferred = chineseVoices.find(v => 
        v.name.includes('Tingting') || 
        v.name.includes('Xiaoxiao') || 
        v.name.includes('Meijia') ||
        v.name.includes('Natural')
      );
      this.voice = preferred || chineseVoices[0];
    }
  }

  public speak(text: string, rate: number = 0.85, pitch: number = 1.1): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      this.synth.cancel(); // 停止当前发音

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = rate; // 略慢一点更适合儿童辨听
      utterance.pitch = pitch; // 音调略高更亲切童趣
      if (this.voice) {
        utterance.voice = this.voice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.synth.speak(utterance);
    });
  }

  public cancel() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechService = new SpeechService();
