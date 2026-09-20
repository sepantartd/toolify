import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { FileSpreadsheet, Copy, Check, Trash2 } from 'lucide-react';

export const CsvToJsonTool: React.FC<ToolProps> = () => {
  const [csvInput, setCsvInput] = useState<string>('id,name,role\n1,Alex,Developer\n2,Sarah,Designer');
  const [copied, setCopied] = useState<boolean>(false);

  const convertCsvToJson = (csv: string): string => {
    if (!csv.trim()) return '';
    try {
      const lines = csv.trim().split('\n');
      if (lines.length < 1) return '';

      const headers = lines[0].split(',').map((h) => h.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const obj: Record<string, string> = {};
        const currentline = lines[i].split(',').map((item) => item.trim());

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j] || '';
        }
        result.push(obj);
      }

      return JSON.stringify(result, null, 2);
    } catch {
      return 'خطا در قالب‌بندی CSV';
    }
  };

  const jsonOutput = convertCsvToJson(csvInput);

  const handleCopy = async () => {
    if (!jsonOutput) return;
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* نوار ابزار */}
      <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
          <span>مبدل CSV به JSON</span>
        </div>
        <button
          onClick={() => setCsvInput('')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 font-medium rounded-md transition-colors border border-red-900/40"
        >
          <Trash2 className="w-3.5 h-3.5" />
          پاک‌سازی
        </button>
      </div>

      {/* ورودی و خروجی دو ستونه */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
        {/* بخش ورودی CSV */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">CSV INPUT</label>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="id,name,role..."
            className="w-full h-64 p-3 bg-slate-950 text-slate-200 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar"
          />
        </div>

        {/* بخش خروجی JSON */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-400">JSON OUTPUT</label>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              Copy JSON
            </button>
          </div>
          <pre className="w-full h-64 p-3 bg-slate-950 text-emerald-400 font-mono text-xs rounded-lg border border-slate-800 overflow-auto custom-scrollbar">
            {jsonOutput || <span className="text-slate-600 italic">No output...</span>}
          </pre>
        </div>
      </div>
    </div>
  );
};
      
