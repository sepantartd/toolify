import React, { useState, useEffect } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Clock, RefreshCw } from 'lucide-react';

export const TimestampConverterTool: React.FC<ToolProps> = () => {
  const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [isoDate, setIsoDate] = useState<string>('');
  const [localDate, setLocalDate] = useState<string>('');
  const [utcDate, setUtcDate] = useState<string>('');

  const updateFromTimestamp = (tsVal: string) => {
    const numeric = Number(tsVal);
    if (isNaN(numeric) || !tsVal.trim()) {
      setIsoDate('زمان نامعتبر');
      setLocalDate('زمان نامعتبر');
      setUtcDate('زمان نامعتبر');
      return;
    }

    // اگر ۱۰ رقمی باشد ثانیه است، اگر ۱۳ رقمی باشد میلی‌ثانیه
    const ms = tsVal.trim().length <= 10 ? numeric * 1000 : numeric;
    const date = new Date(ms);

    if (isNaN(date.getTime())) {
      setIsoDate('زمان نامعتبر');
      setLocalDate('زمان نامعتبر');
      setUtcDate('زمان نامعتبر');
      return;
    }

    setIsoDate(date.toISOString());
    setLocalDate(date.toString());
    setUtcDate(date.toUTCString());
  };

  useEffect(() => {
    updateFromTimestamp(timestamp);
  }, [timestamp]);

  const handleSetNow = () => {
    const now = Math.floor(Date.now() / 1000).toString();
    setTimestamp(now);
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* ورودی تایم‌استامپ */}
      <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-400" />
            زمان Unix Timestamp (برحسب ثانیه یا میلی‌ثانیه):
          </label>
          <button
            onClick={handleSetNow}
            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            زمان کنونی (Now)
          </button>
        </div>

        <input
          type="text"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="مثلاً 1700000000"
          className="w-full p-2.5 bg-slate-900 text-emerald-400 font-mono text-sm rounded border border-slate-700 focus:outline-none focus:border-indigo-500"
          dir="ltr"
        />
      </div>

      {/* خروجی‌های تبدیل شده */}
      <div className="space-y-3" dir="ltr">
        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-indigo-400 font-mono">ISO 8601</span>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-200">
            {isoDate}
          </div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-indigo-400 font-mono">UTC String</span>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-200">
            {utcDate}
          </div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-indigo-400 font-mono">Local Timezone String</span>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-200">
            {localDate}
          </div>
        </div>
      </div>
    </div>
  );
};
            
