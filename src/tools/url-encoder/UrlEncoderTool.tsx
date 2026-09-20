import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Copy, Check, ArrowLeftRight, Trash2 } from 'lucide-react';

export const UrlEncoderTool: React.FC<ToolProps> = () => {
  const [input, setInput] = useState<string>('https://example.com/search?q=تست & Hello World!');
  const [copied, setCopied] = useState<boolean>(false);

  const encoded = encodeURIComponent(input);
  
  let decoded = '';
  try {
    decoded = decodeURIComponent(input);
  } catch (e) {
    decoded = 'رشته ورودی برای Decode معتبر نیست';
  }

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* نوار اکشن‌ها */}
      <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <ArrowLeftRight className="w-4 h-4 text-indigo-400" />
          <span>مبدل کدگذاری URL</span>
        </div>
        <button
          onClick={() => setInput('')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 font-medium rounded-md transition-colors border border-red-900/40"
        >
          <Trash2 className="w-3.5 h-3.5" />
          پاک‌سازی
        </button>
      </div>

      {/* ورودی */}
      <div className="flex flex-col space-y-1.5" dir="ltr">
        <label className="text-xs font-semibold text-slate-400">INPUT URL / STRING</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste URL here..."
          className="w-full h-24 p-3 bg-slate-950 text-slate-200 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar"
        />
      </div>

      {/* خروجی‌های Encode و Decode */}
      <div className="space-y-3" dir="ltr">
        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-400 font-mono">ENCODED URL</span>
            <button
              onClick={() => handleCopy(encoded)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              Copy
            </button>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-emerald-400 break-all select-all">
            {encoded || <span className="text-slate-600 italic">No output...</span>}
          </div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-400 font-mono">DECODED URL</span>
            <button
              onClick={() => handleCopy(decoded)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              Copy
            </button>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-cyan-400 break-all select-all">
            {decoded || <span className="text-slate-600 italic">No output...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
