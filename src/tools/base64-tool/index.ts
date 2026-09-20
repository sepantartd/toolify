import { ToolModule } from '../../core/types/tool';
import { Base64Tool } from './Base64Tool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: Base64Tool
};

export default toolModule;
