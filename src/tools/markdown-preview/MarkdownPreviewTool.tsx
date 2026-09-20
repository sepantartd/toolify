import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Copy, Check, FileText } from 'lucide-react';

export const MarkdownPreviewTool: React.FC<ToolProps> = () => {
  const [markdown, setMarkdown] = useState<string>(
    '# Hello World\n\nThis is a **Markdown** preview tool.\n\n- Feature 1\n- Feature 2'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const simpleMarkdownToHtml = (md: string) => {
    let html = md
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/\n$/gim, '<br />');

    return html.trim();
  };

  const htmlOutput = simpleMarkdownToHtml(markdown);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput);
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
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>ویرایشگر مارک‌داون</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-md transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'کپی شد' : 'کپی کدهای HTML'}
        </button>
      </div>

      {/* ورودی و خروجی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">MARKDOWN INPUT</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-80 p-3 bg-slate-950 text-slate-200 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">HTML OUTPUT / PREVIEW</label>
          <div className="w-full h-80 p-3 bg-slate-950 text-cyan-400 font-mono text-xs rounded-lg border border-slate-800 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
            {htmlOutput}
          </div>
        </div>
      </div>
    </div>
  );
};
      
