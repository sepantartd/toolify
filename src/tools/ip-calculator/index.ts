import { ToolModule } from '../../core/types/tool';
import { IpCalculatorTool } from './IpCalculatorTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: IpCalculatorTool
};

export default toolModule;
