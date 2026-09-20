import { ToolModule } from '../../core/types/tool';
import { TextCaseConverterTool } from './TextCaseConverterTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: TextCaseConverterTool
};

export default toolModule;
