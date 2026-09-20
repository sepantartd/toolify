import { ToolModule } from '../../core/types/tool';
import { PasswordGeneratorTool } from './PasswordGeneratorTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: PasswordGeneratorTool
};

export default toolModule;
