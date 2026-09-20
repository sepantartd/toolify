import React, { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { toolRegistry } from './registry/toolRegistry';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const tools = toolRegistry.getAllTools();
  const activeTool = activeToolId ? toolRegistry.getTool(activeToolId) : null;
  const ActiveComponent = activeTool ? activeTool.component : null;

  return (
    <AppLayout
      sidebar={
        <nav className="space-y-1">
          {tools.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">No tools registered yet.</p>
          ) : (
            tools.map((tool) => (
              <button
                key={tool.manifest.id}
                onClick={() => setActiveToolId(tool.manifest.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeToolId === tool.manifest.id
                    ? 'bg-indigo-500/15 text-indigo-400 font-medium border border-indigo-500/20'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {tool.manifest.name}
              </button>
            ))
          )}
        </nav>
      }
    >
      {activeTool && ActiveComponent ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <header className="border-b border-slate-800/60 pb-4">
            <h1 className="text-2xl font-bold text-slate-100">{activeTool.manifest.name}</h1>
            <p className="text-slate-400 text-sm mt-1.5">{activeTool.manifest.description}</p>
          </header>

          <main className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 shadow-sm">
            <ErrorBoundary toolName={activeTool.manifest.name}>
              <ActiveComponent toolId={activeTool.manifest.id} isActive={true} />
            </ErrorBoundary>
          </main>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-slate-900/50 rounded-3xl flex items-center justify-center mb-6 border border-slate-800/50 shadow-inner">
            <span className="text-3xl">🛠️</span>
          </div>
          <h2 className="text-xl font-medium text-slate-300">Welcome to Open Tools Hub</h2>
          <p className="mt-3 text-sm text-center max-w-md leading-relaxed text-slate-400">
            A modular, privacy-first platform for developer tools. 
            All processing happens locally in your browser.
          </p>
        </div>
      )}
    </AppLayout>
  );
};

export default App;
