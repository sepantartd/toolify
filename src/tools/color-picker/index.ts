import { ToolModule } from '../../core/types/tool';
import { ColorPickerTool } from './ColorPickerTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: ColorPickerTool
};

export default toolModule;
