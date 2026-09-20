import { ToolModule } from '../types/tool';

class Registry {
  private tools: Map<string, ToolModule> = new Map();

  register(tool: ToolModule): void {
    if (this.tools.has(tool.manifest.id)) {
      console.warn(`Tool with ID ${tool.manifest.id} is already registered.`);
      return;
    }
    this.tools.set(tool.manifest.id, tool);
  }

  getTool(id: string): ToolModule | undefined {
    return this.tools.get(id);
  }

  getAllTools(): ToolModule[] {
    return Array.from(this.tools.values());
  }
}

export const ToolRegistry = new Registry();
