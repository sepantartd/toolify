import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Copy, Check, RefreshCw, Trash2 } from 'lucide-react';

export const UuidGeneratorTool: React.FC<ToolProps> = () => {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [generated, setGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generateUuidV4 = (): string => {
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    if (!hyphens) {
      uuid = uuid.replace(/-/g, '');
    }
    if (uppercase) {
      uuid = uuid.toUpperCase();
    }
    return uuid;
  };

  const handleGenerate = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generateUuidV4());
    }
    setGenerated(list);
  };

  React.useEffect(() => {
    handleGenerate();
  }, [count, uppercase, hyphens]);

  const handleCopy = async () => {
    if (generated.length === 0) return;
    try {
      await navigator.clipboard.writeText(generated.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* نوار تنظیمات */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleGenerate}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            تولید مجدد
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-300" dir="ltr">
            <span>Count:</span>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
              className="w-16 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1 focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
            />
            حروف بزرگ (Uppercase)
          </label>

          <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
            />
            خط تیره (-)
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'کپی شد' : 'کپی همه'}
          </button>
        </div>
      </div>

      {/* خروجی */}
      <div className="flex flex-col space-y-1.5" dir="ltr">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>GENERATED UUIDs</span>
          <span className="text-[10px] text-slate-500">{generated.length} items</span>
        </div>
        <textarea
          readOnly
          value={generated.join('\n')}
          className="w-full h-80 p-3 bg-slate-950 text-cyan-400 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none resize-none custom-scrollbar"
        />
      </div>
    </div>
  );
};
        
