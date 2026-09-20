import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Copy, Check, Trash2, Type } from 'lucide-react';

export const TextCaseConverterTool: React.FC<ToolProps> = () => {
  const [text, setText] = useState<string>('Hello World example text');
  const [copied, setCopied] = useState<boolean>(false);

  const toCamelCase = (str: string) =>
    str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    ).replace(/\s+/g, '');

  const toPascalCase = (str: string) =>
    str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '');

  const toSnakeCase = (str: string) =>
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]+|[0-9]+/g)
      ?.map((x) => x.toLowerCase())
      .join('_') || '';

  const toKebabCase = (str: string) =>
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]+|[0-9]+/g)
      ?.map((x) => x.toLowerCase())
      .join('-') || '';

  const conversions = [
    { label: 'UPPERCASE', value: text.toUpperCase() },
    { label: 'lowercase', value: text.toLowerCase() },
    { label: 'camelCase', value: toCamelCase(text) },
    { label: 'PascalCase', value: toPascalCase(text) },
    { label: 'snake_case', value: toSnakeCase(text) },
    { label: 'kebab-case', value: toKebabCase(text) }
  ];

  const handleCopy = async (val: string) => {
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* آمار و نوار پاکسازی */}
      <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1">
            <Type className="w-3.5 h-3.5 text-indigo-400" />
            کلمات: <strong className="text-white">{wordCount}</strong>
          </span>
          <span>
            کاراکترها: <strong className="text-white">{charCount}</strong>
          </span>
        </div>
        <button
          onClick={() => setText('')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 font-medium rounded-md transition-colors border border-red-900/40"
        >
          <Trash2 className="w-3.5 h-3.5" />
          پاک‌سازی
        </button>
      </div>

      {/* ورودی متن */}
      <div className="flex flex-col space-y-1.5" dir="ltr">
        <label className="text-xs font-semibold text-slate-400">INPUT TEXT</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-28 p-3 bg-slate-950 text-slate-200 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar"
        />
      </div>

      {/* خروجی‌های مختلف */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="ltr">
        {conversions.map((item, idx) => (
          <div key={idx} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-400 font-mono">{item.label}</span>
              <button
                onClick={() => handleCopy(item.value)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-xs text-slate-200 break-all select-all">
              {item.value || <span className="text-slate-600 italic">No output...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
     
