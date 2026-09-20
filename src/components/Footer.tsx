import React, { useState } from 'react';
import { ShieldCheck, Code2 } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

export const Footer: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-400 space-y-3" dir="rtl">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold">Vexora Tools</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">v1.0.0</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="flex items-center gap-1 hover:text-indigo-400 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>امنیت و حریم خصوصی</span>
          </button>
          <span>•</span>
          <span>پردازش ۱۰۰٪ محلی و امن</span>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
};
