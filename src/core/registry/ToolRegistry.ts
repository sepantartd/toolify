import { ToolModule } from '../types/tool';

class Registry {
  private tools: Map<string, ToolModule> = new Map();
  private initialized = false;

  private autoDiscoverTools(): void {
    if (this.initialized) return;

    // Vite Auto-Discovery: Automatically scans and loads all tool entrypoints under src/tools/*/index.ts
    const toolModules = import.meta.glob<{ default?: ToolModule; toolModule?: ToolModule }>(
      '/src/tools/*/index.ts',
      { eager: true }
    );

    Object.values(toolModules).forEach((module) => {
      const tool = module.default || module.toolModule;
      if (tool && tool.manifest && tool.component) {
        this.register(tool);
      }
    });

    this.initialized = true;
  }

  register(tool: ToolModule): void {
    if (this.tools.has(tool.manifest.id)) {
      console.warn(`Tool with ID ${tool.manifest.id} is already registered.`);
      return;
    }
    this.tools.set(tool.manifest.id, tool);
  }

  getTool(id: string): ToolModule | undefined {
    this.autoDiscoverTools();
    return this.tools.get(id);
  }

  getAllTools(): ToolModule[] {
    this.autoDiscoverTools();
    return Array.from(this.tools.values());
  }
}

export const ToolRegistry = new Registry();
