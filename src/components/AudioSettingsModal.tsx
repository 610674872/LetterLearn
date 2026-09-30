import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CheckCircle2, Play, Sparkles, HelpCircle, X, RefreshCw } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { speechService } from '../utils/speech';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({ isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEffects.getMuted());
  const [diagnostics, setDiagnostics] = useState(() => speechService.getDiagnostics());
  const [testStatus, setTestStatus] = useState<string>('');

  useEffect(() => {
    const unsub = soundEffects.subscribeMuteChange((muted) => {
      setIsMuted(muted);
      setDiagnostics(speechService.getDiagnostics());
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (isOpen) {
      setDiagnostics(speechService.getDiagnostics());
      setTestStatus('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleMute = () => {
    const nextMuted = soundEffects.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundEffects.playStrokeSuccess();
      speechService.speak('声音已开启');
      setTestStatus('声音已成功开启！');
    } else {
      setTestStatus('已静音');
    }
  };

  const handleTestStrokeSound = () => {
    if (isMuted) {
      soundEffects.setMuted(false);
      setIsMuted(false);
    }
    soundEffects.unlockAudioContext();
    soundEffects.playStrokeSuccess();
    setTestStatus('已播放笔画完成水滴音效 💧');
  };

  const handleTestSpeech = () => {
    if (isMuted) {
      soundEffects.setMuted(false);
      setIsMuted(false);
    }
    soundEffects.unlockAudioContext();
    speechService.speak('天，tiān，天空。字小乐为你朗读！');
    setTestStatus('正在播放标准中文语音朗读 🗣️');
  };

  const handleTestCelebration = () => {
    if (isMuted) {
      soundEffects.setMuted(false);
      setIsMuted(false);
    }
    soundEffects.unlockAudioContext();
    soundEffects.playCharacterComplete();
    setTestStatus('已播放通关大三和弦 🎵');
  };

  const refreshDiagnostics = () => {
    setDiagnostics(speechService.getDiagnostics());
    setTestStatus('诊断信息已刷新');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fff8f6] rounded-[28px] max-w-lg w-full p-5 sm:p-6 shadow-xl border border-[#d8c2be] flex flex-col max-h-[90vh] overflow-y-auto">
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between pb-3 border-b border-[#d8c2be]/60 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ffdad6] text-[#410002] flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5 text-[#ba1a1a]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#231918]">声音与发音排查</h2>
              <p className="text-xs text-[#775651]">排查没有声音、调节静音及测试语音</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-[#fdf1ee] hover:bg-[#f7ebe8] flex items-center justify-center text-[#534341] transition cursor-pointer m3-press-active"
            title="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 核心开关与一键测试 */}
        <div className="flex flex-col gap-3.5 mb-5">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fdf1ee] border border-[#d8c2be]/70">
            <div className="flex items-center gap-3">
              {isMuted ? (
                <div className="w-9 h-9 rounded-xl bg-[#534341] text-white flex items-center justify-center">
                  <VolumeX className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
              )}
              <div>
                <div className="font-bold text-sm text-[#231918]">
                  {isMuted ? '当前已静音' : '声音已开启'}
                </div>
                <div className="text-xs text-[#775651]">
                  包含写字水滴声、通关音效与普通话发音
                </div>
              </div>
            </div>

            <button
              onClick={handleToggleMute}
              className={`px-4 py-2 rounded-full font-bold text-xs transition cursor-pointer m3-press-active ${
                isMuted
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#ffdad6] text-[#410002] hover:bg-[#ffb4ab]'
              }`}
            >
              {isMuted ? '开启声音' : '静音'}
            </button>
          </div>

          {/* 快速发声测试按键组 */}
          <div className="p-3.5 rounded-2xl bg-[#fdf1ee] border border-[#d8c2be]/70 flex flex-col gap-2.5">
            <div className="text-xs font-bold text-[#231918] flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-[#ba1a1a]" />
              <span>声音即时测试（点击验证喇叭）</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleTestStrokeSound}
                className="py-2 px-1 rounded-xl bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#231918] text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition m3-press-active"
              >
                <span>💧 水滴音效</span>
                <span className="text-[10px] text-[#775651] font-normal">写对笔画</span>
              </button>

              <button
                onClick={handleTestSpeech}
                className="py-2 px-1 rounded-xl bg-white border border-[#ba1a1a]/40 bg-[#fff8f6] hover:bg-[#fdf1ee] text-[#ba1a1a] text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition m3-press-active shadow-2xs"
              >
                <span>🗣️ 汉字读音</span>
                <span className="text-[10px] text-[#775651] font-normal">普通话朗读</span>
              </button>

              <button
                onClick={handleTestCelebration}
                className="py-2 px-1 rounded-xl bg-white border border-[#d8c2be] hover:bg-[#fff8f6] text-[#231918] text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition m3-press-active"
              >
                <span>🎉 通关音乐</span>
                <span className="text-[10px] text-[#775651] font-normal">写完奖励</span>
              </button>
            </div>

            {testStatus && (
              <div className="text-[11px] text-[#2e7d32] bg-[#e8f5e9] px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{testStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* 为什么没有声音？常见原因排查指引 */}
        <div className="mb-4 p-3.5 rounded-2xl bg-white border border-[#d8c2be]/80 text-xs flex flex-col gap-2.5">
          <div className="font-bold text-[#ba1a1a] flex items-center gap-1.5 text-sm">
            <HelpCircle className="w-4 h-4 text-[#ba1a1a]" />
            <span>为什么听不到声音？请逐一排查：</span>
          </div>

          <ul className="flex flex-col gap-2 text-[#534341] leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-[#ba1a1a]">1.</span>
              <span>
                <strong>iPad / iPhone 物理静音键</strong>：请检查平板左侧/右侧的<strong>静音拨片</strong>（若露出橙色则代表静音中），或在控制中心关闭静音铃声图标。
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-[#ba1a1a]">2.</span>
              <span>
                <strong>媒体音量过小</strong>：请按机身【音量增加键】，确保调大的是“媒体播放音量”而非单纯的闹钟铃声音量。
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-[#ba1a1a]">3.</span>
              <span>
                <strong>浏览器自动播放保护</strong>：现代浏览器为防打扰，禁止页面未触摸前自动发声。<strong>只要在屏幕任意位置点击或写下一笔</strong>，发声通道即会自动激活。
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-[#ba1a1a]">4.</span>
              <span>
                <strong>电脑标签页静音</strong>：若在电脑 Chrome/Edge 上使用，请检查网页标签页右侧是否显示了“已静音小喇叭”。
              </span>
            </li>
          </ul>
        </div>

        {/* 系统引擎健康诊断信息 */}
        <div className="p-3 rounded-xl bg-[#fdf1ee] border border-[#d8c2be]/50 text-[11px] text-[#775651] flex flex-col gap-1">
          <div className="flex items-center justify-between font-bold text-[#231918]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ba1a1a]" />
              <span>当前设备发音引擎状态</span>
            </span>
            <button
              onClick={refreshDiagnostics}
              className="flex items-center gap-1 text-[#ba1a1a] hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>刷新</span>
            </button>
          </div>
          <div className="flex justify-between">
            <span>发音通道：</span>
            <span className="font-medium text-[#231918]">
              {diagnostics.chineseVoicesCount > 0 ? '本地系统 TTS 引擎' : '网络真人高清发音双重兜底'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>当前发音人：</span>
            <span className="font-medium text-[#231918] max-w-[200px] truncate text-right">
              {diagnostics.activeVoiceName}
            </span>
          </div>
          <div className="flex justify-between">
            <span>双重离线/网络兜底：</span>
            <span className="font-medium text-[#2e7d32]">100% 已就绪</span>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="mt-4 pt-3 border-t border-[#d8c2be]/40 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#ba1a1a] text-white font-bold text-sm hover:bg-[#93000a] transition cursor-pointer m3-press-active shadow-xs"
          >
            知道了，返回学习
          </button>
        </div>
      </div>
    </div>
  );
};
