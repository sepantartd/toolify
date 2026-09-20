import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { GitCompare, Trash2 } from 'lucide-react';

export const TextDiffTool: React.FC<ToolProps> = () => {
  const [text1, setText1] = useState<string>('line 1\nline 2\nline 3');
  const [text2, setText2] = useState<string>('line 1\nline two changed\nline 3\nline 4 added');

  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const maxLines = Math.max(lines1.length, lines2.length);

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* نوار ابزار */}
      <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <GitCompare className="w-4 h-4 text-indigo-400" />
          <span>مقایسه متن اصلی با متن جدید</span>
        </div>
        <button
          onClick={() => {
            setText1('');
            setText2('');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 text-xs font-medium rounded-md transition-colors border border-red-900/40"
        >
          <Trash2 className="w-3.5 h-3.5" />
          پاک‌سازی
        </button>
      </div>

      {/* ورودی‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">ORIGINAL TEXT</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full h-64 p-3 bg-slate-950 text-slate-200 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">MODIFIED TEXT</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full h-64 p-3 bg-slate-950 text-slate-200 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar"
          />
        </div>
      </div>

      {/* نتیجه مقایسه */}
      <div className="flex flex-col space-y-1.5" dir="ltr">
        <label className="text-xs font-semibold text-slate-400">DIFF RESULT</label>
        <div className="w-full h-64 p-3 bg-slate-950 font-mono text-xs rounded-lg border border-slate-800 overflow-y-auto custom-scrollbar space-y-1">
          {Array.from({ length: maxLines }).map((_, idx) => {
            const l1 = lines1[idx];
            const l2 = lines2[idx];

            if (l1 === l2) {
              return (
                <div key={idx} className="text-slate-500 px-2 py-0.5 rounded">
                  {l1 || ' '}
                </div>
              );
            }

            return (
              <div key={idx} className="space-y-0.5">
                {l1 !== undefined && (
                  <div className="bg-red-950/60 text-red-300 border-l-2 border-red-500 px-2 py-0.5 rounded">
                    - {l1}
                  </div>
                )}
                {l2 !== undefined && (
                  <div className="bg-emerald-950/60 text-emerald-300 border-l-2 border-emerald-500 px-2 py-0.5 rounded">
                    + {l2}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
      
