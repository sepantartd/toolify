import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Calculator, Copy, Check, Trash2 } from 'lucide-react';

export const MathEvaluatorTool: React.FC<ToolProps> = () => {
  const [expression, setExpression] = useState<string>('2 * (3 + 5) / Math.sqrt(16)');
  const [copied, setCopied] = useState<boolean>(false);

  const evaluateExpression = (expr: string): { result: string; error: boolean } => {
    if (!expr.trim()) return { result: '', error: false };
    try {
      // استفاده ایمن از ساخت تابع برای ارزیابی عبارات ریاضی
      const sanitized = expr
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/pow\(/g, 'Math.pow(')
        .replace(/abs\(/g, 'Math.abs(')
        .replace(/PI/g, 'Math.PI')
        .replace(/E/g, 'Math.E');

      // اجرای محاسبه در فضای ایزوله شده پایه
      const func = new Function(`return (${sanitized});`);
      const val = func();

      if (typeof val === 'number' && !isNaN(val)) {
        return { result: String(val), error: false };
      }
      return { result: 'عبارت نامعتبر است', error: true };
    } catch {
      return { result: 'خطا در ارزیابی عبارت', error: true };
    }
  };

  const { result, error } = evaluateExpression(expression);

  const handleCopy = async () => {
    if (!result || error) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* نوار بالای ابزار */}
      <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Calculator className="w-4 h-4 text-indigo-400" />
          <span>محاسبه‌گر عبارات ریاضی</span>
        </div>
        <button
          onClick={() => setExpression('')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 font-medium rounded-md transition-colors border border-red-900/40"
        >
          <Trash2 className="w-3.5 h-3.5" />
          پاک‌سازی
        </button>
      </div>

      {/* ورودی عبارت */}
      <div className="flex flex-col space-y-1.5" dir="ltr">
        <label className="text-xs font-semibold text-slate-400">EXPRESSION (JS Math Syntax)</label>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="e.g. 5 * sin(PI / 2) + sqrt(144)"
          className="w-full p-3 bg-slate-950 text-slate-200 font-mono text-sm rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* نمایش نتیجه */}
      <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 space-y-2" dir="ltr">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-indigo-400 font-mono">RESULT</span>
          {result && !error && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              Copy Result
            </button>
          )}
        </div>
        <div className={`p-3 rounded border font-mono text-base break-all ${
          error ? 'bg-red-950/40 border-red-900/50 text-red-400' : 'bg-slate-900 border-slate-800 text-emerald-400'
        }`}>
          {result || <span className="text-slate-600 italic text-xs">Waiting for input...</span>}
        </div>
      </div>
    </div>
  );
};
        
