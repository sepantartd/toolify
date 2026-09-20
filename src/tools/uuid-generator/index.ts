import { ToolModule } from '../../core/types/tool';
import { UuidGeneratorTool } from './UuidGeneratorTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: UuidGeneratorTool
};

export default toolModule;
