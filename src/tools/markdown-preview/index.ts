import { ToolModule } from '../../core/types/tool';
import { MarkdownPreviewTool } from './MarkdownPreviewTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: MarkdownPreviewTool
};

export default toolModule;
