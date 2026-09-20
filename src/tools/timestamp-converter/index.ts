import { ToolModule } from '../../core/types/tool';
import { TimestampConverterTool } from './TimestampConverterTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: TimestampConverterTool
};

export default toolModule;
