import React, { useState, useEffect } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Laptop, RefreshCw } from 'lucide-react';

export const UserAgentParserTool: React.FC<ToolProps> = () => {
  const [uaString, setUaString] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUaString(navigator.userAgent);
    }
  }, []);

  const parseUA = (ua: string) => {
    let browser = 'نامشخص';
    let os = 'نامشخص';
    let device = 'Desktop / PC';

    // تشخیص مرورگر
    if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
    else if (ua.includes('Edg/')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome/')) browser = 'Google Chrome';
    else if (ua.includes('Safari/')) browser = 'Apple Safari';
    else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera';

    // تشخیص سیستم‌عامل
    if (ua.includes('Windows NT 10.0')) os = 'Windows 10 / 11';
    else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
    else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
    else if (ua.includes('Mac OS X')) os = 'macOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Linux')) os = 'Linux';

    // تشخیص دستگاه
    if (ua.includes('Mobi') || ua.includes('Android') || ua.includes('iPhone')) {
      device = 'Mobile Device';
    } else if (ua.includes('iPad') || ua.includes('Tablet')) {
      device = 'Tablet';
    }

    return { browser, os, device };
  };

  const parsed = parseUA(uaString);

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* ورودی User-Agent */}
      <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Laptop className="w-4 h-4 text-indigo-400" />
            رشته User-Agent:
          </label>
          <button
            onClick={() => setUaString(navigator.userAgent)}
            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            بارگذاری UA مرورگر کنونی
          </button>
        </div>

        <textarea
          value={uaString}
          onChange={(e) => setUaString(e.target.value)}
          placeholder="Paste User-Agent string here..."
          className="w-full h-20 p-2.5 bg-slate-900 text-slate-200 font-mono text-xs rounded border border-slate-700 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar"
          dir="ltr"
        />
      </div>

      {/* نتایج آنالیز */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" dir="ltr">
        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-indigo-400 font-mono">Browser</span>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-200">
            {parsed.browser}
          </div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-indigo-400 font-mono">Operating System</span>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-200">
            {parsed.os}
          </div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-indigo-400 font-mono">Device Type</span>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-200">
            {parsed.device}
          </div>
        </div>
      </div>
    </div>
  );
};
             
