import React from 'react';
import { ShieldCheck, Lock, HardDrive, EyeOff, X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-indigo-400">
          <ShieldCheck className="w-6 h-6" />
          <h3 className="text-lg font-bold text-slate-100">سیاست حریم خصوصی و امنیت داده‌ها</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          تمام ابزارهای مجموعه **Vexora Tools** بر پایه معماری پردازش ۱۰۰٪ سمت کلاینت (Client-Side) پیاده‌سازی شده‌اند.
        </p>

        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-slate-200">عدم وابستگی به سرور (Zero Backend)</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">هیچ متنی، فایل، توکن یا کلید ساخته‌شده توسط شما به هیچ سرور خارجی منتقل نمی‌شود.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <HardDrive className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-slate-200">ذخیره‌سازی کاملاً محلی (Local Storage Only)</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">تنها لیست ابزارهای موردعلاقه شما به‌صورت محلی در حافظه مرورگر دستگاهتان ذخیره می‌شود.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <EyeOff className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-slate-200">بدون ردیابی و آنالیتیکس (Zero Trackers)</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">هیچ اسکریپت آنالیتیکس، تبلیغات یا کوکی شخص ثالثی در برنامه وجود ندارد.</p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
};
            
