import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';

export const TemplateTool: React.FC<ToolProps> = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="space-y-4 text-slate-200">
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
        <p className="text-sm text-slate-400 mb-2">Template Tool Input Example:</p>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
};
