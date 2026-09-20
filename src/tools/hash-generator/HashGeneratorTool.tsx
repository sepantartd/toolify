import React, { useState, useEffect } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Copy, Check, KeyRound } from 'lucide-react';

export const HashGeneratorTool: React.FC<ToolProps> = () => {
  const [input, setInput] = useState<string>('Open Tools Hub');
  const [hashes, setHashes] = useState<{ sha1: string; sha256: string; sha512: string }>({
    sha1: '',
    sha256: '',
    sha512: ''
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const computeHashes = async (text: string) => {
    if (!text) {
      setHashes({ sha1: '', sha256: '', sha512: '' });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBufferSha1 = await crypto.subtle.digest('SHA-1', data);
    const hashBufferSha256 = await crypto.subtle.digest('SHA-256', data);
    const hashBufferSha512 = await crypto.subtle.digest('SHA-512', data);

    const bufferToHex = (buffer: ArrayBuffer) =>
      Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    setHashes({
      sha1: bufferToHex(hashBufferSha1),
      sha256: bufferToHex(hashBufferSha256),
      sha512: bufferToHex(hashBufferSha512)
    });
  };

  useEffect(() => {
    computeHashes(input);
  }, [input]);

  const handleCopy = async (value: string, key: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('خطا در کپی کردن هش', err);
    }
  };

  return (
    <div className="space-y-5 text-right" dir="rtl">
      {/* ورودی متن */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
          متن ورودی جهت تولید هش:
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="متن خود را اینجا وارد کنید..."
          className="w-full h-24 p-3 bg-slate-950 text-slate-100 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none custom-scrollbar"
          dir="ltr"
        />
      </div>

      {/* خروجی هش‌ها */}
      <div className="space-y-3" dir="ltr">
        {[
          { label: 'SHA-1', key: 'sha1', val: hashes.sha1 },
          { label: 'SHA-256', key: 'sha256', val: hashes.sha256 },
          { label: 'SHA-512', key: 'sha512', val: hashes.sha512 }
        ].map((item) => (
          <div key={item.key} className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-400 font-mono">{item.label}</span>
              <button
                onClick={() => handleCopy(item.val, item.key)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copiedKey === item.key ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copiedKey === item.key ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-xs text-slate-300 break-all select-all">
              {item.val || <span className="text-slate-600 italic">Waiting for input...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
