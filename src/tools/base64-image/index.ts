import { ToolModule } from '../../core/types/tool';
import { Base64ImageTool } from './Base64ImageTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: Base64ImageTool
};

export default toolModule;
