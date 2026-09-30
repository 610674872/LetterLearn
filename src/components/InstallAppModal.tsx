import React, { useState, useEffect } from 'react';
import { X, Smartphone, Apple, CheckCircle2, Share2, PlusSquare, ArrowDownCircle, QrCode, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onTriggerInstall: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onTriggerInstall,
}) => {
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('android');
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'desktop'>('android');
  const [isStandalone, setIsStandalone] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || '';
      const isIosDevice = /(iPhone|iPad|iPod)/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isAndroidDevice = /Android/i.test(ua);
      const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;

      setIsStandalone(standalone);

      if (isIosDevice) {
        setDeviceType('ios');
        setActiveTab('ios');
      } else if (isAndroidDevice) {
        setDeviceType('android');
        setActiveTab('android');
      } else {
        setDeviceType('desktop');
        setActiveTab('desktop');
      }

      // Generate best accessible URL for QR code
      const origin = window.location.origin;
      setCurrentUrl(origin);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#fcf9f2] rounded-3xl border-2 border-amber-300 shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部标题栏 */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-4 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl font-black shadow-inner">
              📱
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold tracking-wide">
                  安装「字小乐」到手机桌面
                </h3>
                <span className="text-[10px] bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full font-black">
                  免商店 · 秒安装
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                独立全屏 App 体验，无地址栏干扰，专心练字
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 状态指示：若已是独立 App */}
        {isStandalone && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center gap-2 text-xs text-emerald-800 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>当前已通过桌面独立 App 运行，太棒啦！</span>
          </div>
        )}

        {/* 设备平台切换标签 */}
        <div className="flex items-center p-2 bg-amber-100/60 border-b border-amber-200 gap-1.5 text-xs font-bold">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'android'
                ? 'bg-white text-rose-700 shadow-xs border border-amber-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>安卓手机 / 鸿蒙</span>
            {deviceType === 'android' && (
              <span className="text-[9px] bg-rose-100 text-rose-600 px-1 rounded-sm">当前</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-white text-rose-700 shadow-xs border border-amber-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <Apple className="w-4 h-4 text-slate-800" />
            <span>苹果 iPhone / iPad</span>
            {deviceType === 'ios' && (
              <span className="text-[9px] bg-rose-100 text-rose-600 px-1 rounded-sm">当前</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'desktop'
                ? 'bg-white text-rose-700 shadow-xs border border-amber-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <QrCode className="w-4 h-4 text-amber-600" />
            <span>手机扫码秒开</span>
            {deviceType === 'desktop' && (
              <span className="text-[9px] bg-rose-100 text-rose-600 px-1 rounded-sm">当前</span>
            )}
          </button>
        </div>

        {/* 内容展示区 */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-700">
          {/* TAB 1: 安卓设备安装指引 */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              {/* 如果系统支持一键安装 */}
              {deferredPrompt ? (
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl text-white shadow-md flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-2">
                    ⚡
                  </div>
                  <h4 className="font-black text-base">检测到您的浏览器支持一键快捷安装！</h4>
                  <p className="text-xs text-emerald-100 mt-1 mb-3">
                    点击下方按钮，即可自动在手机桌面生成「字小乐」App 图标。
                  </p>
                  <button
                    onClick={() => {
                      onTriggerInstall();
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 bg-white text-emerald-800 hover:bg-emerald-50 font-black rounded-xl text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    立即一键安装到手机桌面
                  </button>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2.5">
                  <span className="text-xl">💡</span>
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <p className="font-bold">浏览器快捷添加（Chrome / 夸克 / Edge / 系统自带浏览器）：</p>
                    <p className="text-amber-800 mt-1">若没有自动弹出安装，可按照下面 3 步手动放到桌面，永久免费使用！</p>
                  </div>
                </div>
              )}

              {/* 手动 3 步图解 */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-xs leading-tight">
                    <p className="font-extrabold text-slate-800">点击浏览器菜单</p>
                    <p className="text-slate-500 mt-0.5">点击右上角或底部的菜单按钮（三个点 <span className="font-mono font-bold">⋮</span> 或 <span className="font-bold">三</span>）</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="text-xs leading-tight">
                    <p className="font-extrabold text-slate-800">选择「添加到主屏幕」或「安装应用」</p>
                    <p className="text-slate-500 mt-0.5">在弹出面板中点击 <span className="font-bold text-rose-600">「添加到桌面 / 安装」</span> 按钮</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="text-xs leading-tight">
                    <p className="font-extrabold text-slate-800">完成！从手机桌面启动</p>
                    <p className="text-slate-500 mt-0.5">手机桌面出现「字小乐」图标，点开即是纯净无干扰的全屏写字板！</p>
                  </div>
                </div>
              </div>

              {/* APK 安装包下载选项 */}
              <div className="mt-4 p-3 bg-rose-50/70 border border-rose-200 rounded-2xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📦</span>
                  <div className="text-xs">
                    <p className="font-bold text-rose-950">需要直接下载安卓 APK 安装包？</p>
                    <p className="text-[11px] text-rose-700">适用于不想通过浏览器添加、喜欢本地安装包的家长</p>
                  </div>
                </div>
                <a
                  href="/LetterLearn.apk"
                  download="LetterLearn.apk"
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1 shrink-0"
                >
                  <ArrowDownCircle className="w-3.5 h-3.5" />
                  下载 APK
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: 苹果 iOS Safari 安装指引 */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-start gap-2.5">
                <span className="text-xl">🍎</span>
                <div className="text-xs text-rose-900 leading-relaxed">
                  <p className="font-bold">苹果官方推荐安装方式（无需通过 App Store 审核，即点即用）：</p>
                  <p className="text-rose-700 mt-0.5">请确保使用苹果自带的 <strong>Safari 浏览器</strong> 打开当前网页。</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="text-xs leading-tight flex-1">
                    <p className="font-extrabold text-slate-800">点击 Safari 屏幕底部的「分享」图标</p>
                    <p className="text-slate-500 mt-0.5">（iPad 用户在浏览器右上角）</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1 font-bold text-xs">
                    <Share2 className="w-4 h-4 text-blue-500" />
                    <span>分享</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="text-xs leading-tight flex-1">
                    <p className="font-extrabold text-slate-800">在菜单向上滑动，点击「添加到主屏幕」</p>
                    <p className="text-slate-500 mt-0.5">若没看到，可向下滑动并点击「编辑操作」开启</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1 font-bold text-xs">
                    <PlusSquare className="w-4 h-4 text-slate-700" />
                    <span>添加到主屏幕</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="text-xs leading-tight flex-1">
                    <p className="font-extrabold text-slate-800">点击右上角「添加」，大功告成！</p>
                    <p className="text-slate-500 mt-0.5">回到 iPhone / iPad 桌面即可看到「字小乐」App 图标，全屏畅玩！</p>
                  </div>
                </div>
              </div>

              {/* 优势提示 */}
              <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <span>✨</span> 安装后拥有的专属体验：
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-amber-800">
                  <li>全屏沉浸，没有任何浏览器顶部网址栏和底部前进栏</li>
                  <li>支持 Apple Pencil 压感与手势防误触</li>
                  <li>每次打开自动继续上次写字进度，无需重复登录</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: 电脑扫码安装 */}
          {activeTab === 'desktop' && (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-white p-4 rounded-3xl border-2 border-amber-200 shadow-md">
                <QRCodeSVG
                  value={currentUrl || 'http://localhost:5173/'}
                  size={160}
                  level="M"
                  includeMargin={true}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-sm font-extrabold text-slate-900">
                  拿起手机相机或微信扫一扫 📸
                </p>
                <p className="text-xs text-slate-500 max-w-xs">
                  在手机或 iPad 上打开后，按提示选择「添加到主屏幕」，即可直接像原生 App 一样使用！
                </p>
              </div>

              <div className="w-full bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-mono break-all select-all">
                {currentUrl || 'http://localhost:5173/'}
              </div>
            </div>
          )}
        </div>

        {/* 底部按钮栏 */}
        <div className="p-3 bg-amber-100/50 border-t border-amber-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 pl-2">
            💡 支持离线使用 · 自动同步生字记录
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl shadow-xs transition cursor-pointer"
          >
            我知道啦
          </button>
        </div>
      </div>
    </div>
  );
};
