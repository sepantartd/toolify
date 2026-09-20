import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Palette, Copy, Check } from 'lucide-react';

export const ColorPickerTool: React.FC<ToolProps> = () => {
  const [color, setColor] = useState<string>('#6366f1');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgb = hexToRgb(color);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const handleCopy = async (val: string, key: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* انتخاب‌گر رنگ */}
      <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-indigo-400" />
            انتخاب رنگ:
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-8 bg-transparent cursor-pointer rounded border border-slate-700"
          />
        </div>

        {/* باکس نمایش رنگ بزرگ */}
        <div
          className="w-full h-24 rounded-lg border border-slate-700/80 transition-colors shadow-inner flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <span className="bg-slate-950/80 px-3 py-1 rounded text-white font-mono text-xs border border-slate-800">
            {color.toUpperCase()}
          </span>
        </div>
      </div>

      {/* خروجی‌های کد رنگ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="ltr">
        {[
          { label: 'HEX', key: 'hex', val: color.toUpperCase() },
          { label: 'RGB', key: 'rgb', val: rgbString }
        ].map((item) => (
          <div key={item.key} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-400 font-mono">{item.label}</span>
              <button
                onClick={() => handleCopy(item.val, item.key)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copiedKey === item.key ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-200">
              {item.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
          
