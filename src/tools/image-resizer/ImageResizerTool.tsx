import React, { useState, useRef } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Image as ImageIcon, Download, Upload, RefreshCw } from 'lucide-react';

export const ImageResizerTool: React.FC<ToolProps> = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [keepAspect, setKeepAspect] = useState<boolean>(true);
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [quality, setQuality] = useState<number>(0.9);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImageSrc(event.target?.result as string);
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width / img.height);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (w: number) => {
    setWidth(w);
    if (keepAspect && aspectRatio) {
      setHeight(Math.round(w / aspectRatio));
    }
  };

  const handleHeightChange = (h: number) => {
    setHeight(h);
    if (keepAspect && aspectRatio) {
      setWidth(Math.round(h * aspectRatio));
    }
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);
      const ext = format.split('/')[1];
      const dataUrl = canvas.toDataURL(format, quality);

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `resized-image.${ext}`;
      a.click();
    };
    img.src = imageSrc;
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* دکمه آپلود */}
      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-8 text-center cursor-pointer transition-colors bg-slate-950/40 space-y-3"
        >
          <Upload className="w-10 h-10 text-indigo-400 mx-auto" />
          <div className="text-xs text-slate-300">
            برای انتخاب تصویر کلیک کنید یا آن را به اینجا بکشید
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* تنظیمات ابعاد و فرمت */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950/60 p-4 rounded-lg border border-slate-800 text-xs">
            <div className="space-y-1" dir="ltr">
              <label className="text-slate-400">Width (px):</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              />
            </div>

            <div className="space-y-1" dir="ltr">
              <label className="text-slate-400">Height (px):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              />
            </div>

            <div className="space-y-1" dir="ltr">
              <label className="text-slate-400">Format:</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WEBP</option>
              </select>
            </div>
          </div>

          {/* اکشن‌ها */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={keepAspect}
                onChange={(e) => setKeepAspect(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
              />
              حفظ نسبت ابعاد (Aspect Ratio)
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setImageSrc(null)}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                تصویر جدید
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                دانلود تصویر
              </button>
            </div>
          </div>

          {/* پیش‌نمایش تصویر */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-center items-center overflow-hidden max-h-96">
            <img src={imageSrc} alt="Preview" className="max-h-80 object-contain rounded" />
          </div>
        </div>
      )}
    </div>
  );
};
    
