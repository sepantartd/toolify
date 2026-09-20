import React, { useEffect, useState } from 'react';
import { toolRegistry, initToolRegistry } from './core/registry';
import { ToolManifest, ToolModule } from './core/types/tool';
import { ToolCatalog } from './components/ToolCatalog';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { Footer } from './components/Footer';
import { registerServiceWorker } from './core/pwa/registerSW';
import { usePerformanceAudit } from './core/hooks/usePerformanceAudit';
import { ArrowRight, Wrench, Loader2, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [manifests, setManifests] = useState<ToolManifest[]>([]);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [activeToolModule, setActiveToolModule] = useState<ToolModule | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // نظارت بر کارایی برنامه
  usePerformanceAudit();

  // مقداردهی اولیه ریجستری ابزارها و ثبت سرویس ورکر
  useEffect(() => {
    initToolRegistry();
    setManifests(toolRegistry.getAllManifests());
    registerServiceWorker();
  }, []);

  // بارگذاری دینامیک ابزار انتخابی (Lazy Loading)
  const handleSelectTool = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const module = await toolRegistry.loadTool(id);
      setActiveToolModule(module);
      setActiveToolId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to load tool:', err);
      setError('خطا در بارگذاری ابزار. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCatalog = () => {
    setActiveToolId(null);
    setActiveToolModule(null);
    setError(null);
  };

  const currentManifest = activeToolId ? toolRegistry.getManifest(activeToolId) : null;
  const ActiveComponent = activeToolModule ? activeToolModule.component : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white" dir="rtl">
      {/* هدر اصلی برنامه */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            onClick={handleBackToCatalog}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                Vexora Tools
              </h1>
              <p className="text-[10px] text-slate-400">مجموعه ابزارهای کاربردی و امنیتی کلاینت-ساید</p>
            </div>
          </div>

          {activeToolId && (
            <button
              onClick={handleBackToCatalog}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>بازگشت به لیست</span>
            </button>
          )}
        </div>
      </header>

      {/* بدنه اصلی */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {/* پیام بارگذاری */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-xs text-slate-400">در حال بارگذاری ماژول ابزار...</p>
          </div>
        )}

        {/* نمایش خطا */}
        {error && (
          <div className="p-4 bg-red-950/50 border border-red-900/50 rounded-xl text-red-300 text-xs text-center space-y-2 my-6">
            <p>{error}</p>
            <button
              onClick={handleBackToCatalog}
              className="px-3 py-1 bg-red-900/60 hover:bg-red-800/60 rounded text-[11px] transition-colors"
            >
              بازگشت به فهرست
            </button>
          </div>
        )}

        {/* نمای ابزار فعال */}
        {!loading && activeToolId && ActiveComponent && currentManifest && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-900/50 text-[10px] font-mono rounded capitalize">
                  {currentManifest.category}
                </span>
                <span className="text-xs font-mono text-slate-500">v{currentManifest.version}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{currentManifest.name}</h2>
              <p className="text-xs text-slate-400">{currentManifest.description}</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-xl">
              <ActiveComponent manifest={currentManifest} />
            </div>
          </div>
        )}

        {/* نمایه فهرست کامل ابزارها */}
        {!loading && !activeToolId && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900/50 to-slate-950/40 border border-indigo-500/20 p-6 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>۱۰۰٪ آفلاین و بدون سرور</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">ابزارهای محاسباتی، امنیتی و توسعه</h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                تمام پردازش‌ها مستقیماً روی دستگاه مرورگر شما انجام می‌شود. هیچ داده‌ای به هیچ سرور خارجی ارسال نخواهد شد.
              </p>
            </div>

            <ToolCatalog tools={manifests} onSelectTool={handleSelectTool} />
          </div>
        )}
      </main>

      {/* بنر نصب PWA و فوتر */}
      <PwaInstallPrompt />
      <Footer />
    </div>
  );
};

export default App;
            
