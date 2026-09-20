import React from 'react';
import { ToolProps } from '../../core/types/tool';

export const MyAwesomeTool: React.FC<ToolProps> = () => {
  return (
    <div className="p-4 text-slate-100">
      <h2 className="text-lg font-bold">Hello from My Awesome Tool!</h2>
    </div>
  );
};
