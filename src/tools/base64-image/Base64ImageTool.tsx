import React, { useState, useRef } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Upload, Copy, Check, Image as ImageIcon, Trash2 } from 'lucide-react';

export const Base64ImageTool: React.FC<ToolProps> = () => {
  const [base64, setBase64] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setBase64(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    if (!base64) return;
    try {
      await navigator.clipboard.writeText(base64);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* بخش آپلود یا ورود دستی */}
      <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          انتخاب تصویر و تبدیل به Base64
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'کپی شد' : 'کپی Base64'}
          </button>
          <button
            onClick={() => setBase64('')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 font-medium rounded-md transition-colors border border-red-900/40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            پاک‌سازی
          </button>
        </div>
      </div>

      {/* ورودی/خروجی متنی Base64 */}
      <div className="flex flex-col space-y-1.5" dir="ltr">
        <label className="text-xs font-semibold text-slate-400">BASE64 STRING / DATA URL</label>
        <textarea
          value={base64}
          onChange={(e) => setBase64(e.target.value)}
          placeholder="data:image/png;base64,..."
          className="w-full h-36 p-3 bg-slate-950 text-emerald-400 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar break-all"
        />
      </div>

      {/* پیش‌نمایش تصویر */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center space-y-2 min-h-48">
        {base64 ? (
          <img src={base64} alt="Decoded Preview" className="max-h-64 object-contain rounded border border-slate-800" />
        ) : (
          <div className="text-slate-600 text-xs flex flex-col items-center gap-1">
            <ImageIcon className="w-8 h-8 stroke-1" />
            <span>پیش‌نمایش تصویر decoded شده در اینجا قرار می‌گیرد</span>
          </div>
        )}
      </div>
    </div>
  );
};
