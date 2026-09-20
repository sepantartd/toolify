import { ToolModule } from '../../core/types/tool';
import { HashGeneratorTool } from './HashGeneratorTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: HashGeneratorTool
};

export default toolModule;
  
