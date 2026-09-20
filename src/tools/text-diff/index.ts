import { ToolModule } from '../../core/types/tool';
import { TextDiffTool } from './TextDiffTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: TextDiffTool
};

export default toolModule;
