import React, { ReactNode } from 'react';
import { LayoutTemplate, Settings, Info } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 overflow-hidden font-sans">
      {/* Sidebar - Mobile Friendly Design Coming in Phase 5 */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <LayoutTemplate className="w-6 h-6 text-indigo-400" />
          <span className="font-bold text-slate-100 text-lg">Open Tools Hub</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Available Tools
          </div>
          {sidebar}
        </div>
        
        <div className="p-4 border-t border-slate-800 flex justify-around text-slate-500">
          <button className="hover:text-indigo-400 transition-colors" title="Platform Settings">
            <Settings className="w-5 h-5" />
          </button>
          <button className="hover:text-indigo-400 transition-colors" title="About & Privacy">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8 custom-scrollbar">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
