import { ToolManifest, ToolModule } from '../types/tool';

// تعریف تایپ برای بارگذاری دینامیک (Lazy Loading)
export type ToolLoader = () => Promise<ToolModule>;

export interface RegisteredTool {
  manifest: ToolManifest;
  load: ToolLoader;
}

class ToolRegistry {
  private tools: Map<string, RegisteredTool> = new Map();

  // ثبت یک ابزار در ریجستری
  register(manifest: ToolManifest, load: ToolLoader) {
    this.tools.set(manifest.id, { manifest, load });
  }

  // دریافت مانیفست همه ابزارهای ثبت‌شده
  getAllManifests(): ToolManifest[] {
    return Array.from(this.tools.values()).map((t) => t.manifest);
  }

  // دریافت مانیفست یک ابزار خاص بر اساس ID
  getManifest(id: string): ToolManifest | undefined {
    return this.tools.get(id)?.manifest;
  }

  // بارگذاری دینامیک کامپوننت و ماژول ابزار
  async loadTool(id: string): Promise<ToolModule> {
    const tool = this.tools.get(id);
    if (!tool) {
      throw new Error(`Tool with id "${id}" not found in registry.`);
    }
    return await tool.load();
  }

  // فیلتر ابزارها بر اساس دسته‌بندی
  getToolsByCategory(category: string): ToolManifest[] {
    return this.getAllManifests().filter((m) => m.category === category);
  }
}

export const toolRegistry = new ToolRegistry();
