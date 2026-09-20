import { ToolModule } from '../../core/types/tool';
import { JSONFormatter } from './JSONFormatter';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: JSONFormatter
};

export default toolModule;
