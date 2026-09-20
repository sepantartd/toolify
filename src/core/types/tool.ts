import { FC } from 'react';

export type ToolCategory = 'formatter' | 'converter' | 'generator' | 'crypto' | 'utility';

export interface ToolManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  category: ToolCategory;
  entrypoint: string;
  permissions: {
    clipboard: boolean;
    network: boolean;
    localStorage: boolean;
  };
  privacy: {
    localProcessingOnly: boolean;
    dataSentToServer: boolean;
  };
  license: string;
}

export interface ToolProps {
  toolId: string;
  isActive: boolean;
}

export interface ToolModule {
  manifest: ToolManifest;
  component: FC<ToolProps>;
}
