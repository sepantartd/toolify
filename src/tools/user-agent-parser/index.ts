import { ToolModule } from '../../core/types/tool';
import { UserAgentParserTool } from './UserAgentParserTool';
import manifestData from './manifest.json';

export const toolModule: ToolModule = {
  manifest: manifestData as ToolModule['manifest'],
  component: UserAgentParserTool
};

export default toolModule;
