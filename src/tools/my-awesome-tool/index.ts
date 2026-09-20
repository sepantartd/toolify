import { ToolModule } from '../../core/types/tool';
import { MyAwesomeTool } from './MyAwesomeTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: MyAwesomeTool
};

export default toolModule;
