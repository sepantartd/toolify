import { ToolModule } from '../../core/types/tool';
import { UrlEncoderTool } from './UrlEncoderTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: UrlEncoderTool
};

export default toolModule;
