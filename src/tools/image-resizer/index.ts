import { ToolModule } from '../../core/types/tool';
import { ImageResizerTool } from './ImageResizerTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: ImageResizerTool
};

export default toolModule;
