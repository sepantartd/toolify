import { ToolModule } from '../../core/types/tool';
import { MathEvaluatorTool } from './MathEvaluatorTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: MathEvaluatorTool
};

export default toolModule;
