import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  React.useEffect(() => {
    console.log("Open Tools Hub Core Initialized Successfully.");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Open Tools Hub
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Phase 1: Project Bootstrap completed successfully. Core is ready.
        </p>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
