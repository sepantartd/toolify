import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Copy, Check, Trash2, Code2, Minimize2, AlertCircle, Sparkles } from 'lucide-react';

export const JSONFormatter: React.FC<ToolProps> = () => {
  const [input, setInput] = useState<string>('{\n  "name": "Open Tools Hub",\n  "status": "active",\n  "features": ["modular", "privacy-first", "client-side"]\n}');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [indentSize, setIndentSize] = useState<number>(2);

  const formatJSON = (indent: number = indentSize) => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON structure');
      }
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON structure');
      }
    }
  };

  const handleCopy = async () => {
    const textToCopy = output || input;
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  // Auto-format initial value on mount
  React.useEffect(() => {
    formatJSON(indentSize);
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => formatJSON(indentSize)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Format
          </button>
          <button
            onClick={minifyJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-md transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            Minify
          </button>
          
          <div className="flex items-center gap-1.5 ml-2 border-l border-slate-800 pl-3">
            <span className="text-xs text-slate-400">Tab Size:</span>
            <select
              value={indentSize}
              onChange={(e) => {
                const size = Number(e.target.value);
                setIndentSize(size);
                formatJSON(size);
              }}
              className="bg-slate-900 text-slate-200 border border-slate-700 text-xs rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Result'}
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 text-xs font-medium rounded-md transition-colors border border-red-900/40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-start gap-2.5 p-3 bg-red-950/80 border border-red-800/80 rounded-lg text-red-200 text-xs font-mono animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">JSON Syntax Error:</span>
            {error}
          </div>
        </div>
      )}

      {/* Code Editor Windows (Side-by-Side on Desktop, Stacked on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Window */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>RAW INPUT</span>
            <span className="text-[10px] text-slate-500 font-normal">{input.length} characters</span>
          </label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
            placeholder="Paste your unformatted JSON here..."
            className="w-full h-80 p-3 bg-slate-950 text-slate-100 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none custom-scrollbar"
          />
        </div>

        {/* Output Window */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>FORMATTED OUTPUT</span>
            <span className="text-[10px] text-slate-500 font-normal">{output.length} characters</span>
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted output will appear here..."
            className="w-full h-80 p-3 bg-slate-950/80 text-emerald-400 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none resize-none custom-scrollbar"
          />
        </div>
      </div>
    </div>
  );
};
    
