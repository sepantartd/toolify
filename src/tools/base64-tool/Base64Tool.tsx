import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Copy, Check, ArrowRightLeft, AlertCircle, Trash2 } from 'lucide-react';

export const Base64Tool: React.FC<ToolProps> = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState<string>('Hello World!');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const processText = (text: string, currentMode: 'encode' | 'decode') => {
    if (!text) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (currentMode === 'encode') {
        const encoded = btoa(
          encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
        setOutput(encoded);
        setError(null);
      } else {
        const decoded = decodeURIComponent(
          Array.from(atob(text.trim()))
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        setOutput(decoded);
        setError(null);
      }
    } catch (err) {
      if (currentMode === 'decode') {
        setError('Invalid Base64 string provided for decoding.');
      } else {
        setError('Failed to encode input text.');
      }
      setOutput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    processText(value, mode);
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    const newInput = output || input;
    setInput(newInput);
    processText(newInput, newMode);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  React.useEffect(() => {
    processText(input, mode);
  }, []);

  return (
    <div className="space-y-4">
      {/* Mode Switch & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode('encode');
              processText(input, 'encode');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === 'encode'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Encode Mode
          </button>
          <button
            onClick={() => {
              setMode('decode');
              processText(input, 'decode');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === 'decode'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Decode Mode
          </button>
          <button
            onClick={handleModeSwitch}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-md transition-colors ml-2"
            title="Swap input/output and switch mode"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Swap
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Output'}
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
            <span className="font-bold block mb-0.5">Error:</span>
            {error}
          </div>
        </div>
      )}

      {/* Input / Output Textareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 flex justify-between">
            <span>INPUT ({mode.toUpperCase()})</span>
            <span className="text-[10px] text-slate-500 font-normal">{input.length} chars</span>
          </label>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder={mode === 'encode' ? 'Enter plain text to encode...' : 'Enter Base64 string to decode...'}
            className="w-full h-72 p-3 bg-slate-950 text-slate-100 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none custom-scrollbar"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 flex justify-between">
            <span>RESULT</span>
            <span className="text-[10px] text-slate-500 font-normal">{output.length} chars</span>
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Result will automatically appear here..."
            className="w-full h-72 p-3 bg-slate-950/80 text-cyan-400 font-mono text-xs rounded-lg border border-slate-800 focus:outline-none resize-none custom-scrollbar"
          />
        </div>
      </div>
    </div>
  );
};
      
