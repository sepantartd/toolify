import { ToolModule } from '../../core/types/tool';
import { CsvToJsonTool } from './CsvToJsonTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: CsvToJsonTool
};

export default toolModule;
