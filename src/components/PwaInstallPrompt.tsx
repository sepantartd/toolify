import React, { useState, useEffect } from 'react';
import { Download, WifiOff, X } from 'lucide-react';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 flex flex-col gap-2 max-w-sm" dir="rtl">
      {/* پیام بنر وضعیت آفلاین */}
      {isOffline && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-3 rounded-lg text-xs flex items-center justify-between backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span>شما آفلاین هستید (تمام ابزارها بدون اینترنت فعالند)</span>
          </div>
        </div>
      )}

      {/* دکمه و بنر پیشنهاد نصب PWA */}
      {deferredPrompt && !dismissed && (
        <div className="bg-slate-900/95 border border-indigo-500/30 text-slate-100 p-4 rounded-xl shadow-xl backdrop-blur-md flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-indigo-400">نصب اپلیکیشن Vexora Tools</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              برای دسترسی سریع‌تر و کارکرد ۱۰۰٪ آفلاین، برنامه را روی دستگاه خود نصب کنید.
            </p>
            <button
              onClick={handleInstallClick}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>نصب مستقیم</span>
            </button>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
        
