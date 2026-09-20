import React from 'react';
import { ToolManifest } from '../core/types/tool';
import { Star, ArrowLeft, ShieldCheck } from 'lucide-react';

interface ToolCardProps {
  manifest: ToolManifest;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectTool: (id: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  manifest,
  isFavorite,
  onToggleFavorite,
  onSelectTool,
}) => {
  return (
    <div
      onClick={() => onSelectTool(manifest.id)}
      className="group relative bg-slate-950/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/50 p-4 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-indigo-500/5"
      dir="rtl"
    >
      {/* بخش بالای کارت: دسته‌بندی و نشان ستاره */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="px-2 py-0.5 bg-indigo-950/60 text-indigo-400 border border-indigo-900/40 text-[10px] font-mono rounded capitalize">
            {manifest.category}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(manifest.id);
            }}
            className="p-1 rounded-md hover:bg-slate-800 text-slate-500 hover:text-amber-400 transition-colors"
            title={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          >
            <Star
              className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                isFavorite ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
          </button>
        </div>

        {/* عنوان و توضیحات ابزار */}
        <h3 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors mb-1.5">
          {manifest.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {manifest.description}
        </p>
      </div>

      {/* بخش پایین کارت: دکمه اجرا و نشان پردازش محلی */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-800/60 text-[11px] text-slate-500">
        <div className="flex items-center gap-1 text-emerald-400/80">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>پردازش ۱۰۰٪ محلی</span>
        </div>

        <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-400 font-medium transition-colors">
          <span>اجرای ابزار</span>
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </div>
  );
};
