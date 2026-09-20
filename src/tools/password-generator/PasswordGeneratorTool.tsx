import React, { useState, useEffect } from 'react';
import { ToolProps } from '../../core/types/tool';
import { ShieldCheck, Copy, Check, RefreshCw } from 'lucide-react';

export const PasswordGeneratorTool: React.FC<ToolProps> = () => {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let chars = '';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* خروجی پسورد */}
      <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            رمز عبور تولید شده:
          </span>
          <button
            onClick={generatePassword}
            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            تولید مجدد
          </button>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          <input
            type="text"
            readOnly
            value={password || 'لطفاً حداقل یک گزینه را انتخاب کنید'}
            className="w-full p-2.5 bg-slate-900 text-emerald-400 font-mono text-sm rounded border border-slate-800 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'کپی شد' : 'کپی'}
          </button>
        </div>
      </div>

      {/* تنظیمات پارامترها */}
      <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs text-slate-300" dir="ltr">
            <span className="font-mono text-indigo-400 font-bold">{length} characters</span>
            <span>طول رمز عبور:</span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
          <label className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            حروف بزرگ (A-Z)
          </label>

          <label className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            حروف کوچک (a-z)
          </label>

          <label className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            اعداد (0-9)
          </label>

          <label className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            نمادها (!@#$)
          </label>
        </div>
      </div>
    </div>
  );
};
        
