import React from 'react';

export interface ToolManifest {
  id: string;
  name: string;
  description: string;
  version?: string;
  category?: string;
  icon?: string;
}

export interface RegisteredTool {
  manifest: ToolManifest;
  component: React.ComponentType<any>;
}

class ToolRegistryClass {
  private tools: Map<string, RegisteredTool> = new Map();

  register(manifest: ToolManifest, component: any) {
    if (!manifest || !manifest.id) return;
    
    let Comp = component;
    if (typeof component === 'function' && !component.prototype?.isReactComponent) {
      try {
        const res = component();
        if (res && typeof res.then === 'function') {
          Comp = React.lazy(component);
        }
      } catch (e) {
        // Keep component as is
      }
    }

    this.tools.set(manifest.id, { manifest, component: Comp });
  }

  getTool(id: string): RegisteredTool | undefined {
    return this.tools.get(id);
  }

  getAllTools(): RegisteredTool[] {
    return Array.from(this.tools.values());
  }
}

// ساخت یک نمونه واحد (Singleton)
export const toolRegistry = new ToolRegistryClass();
export const ToolRegistry = toolRegistry;
export default toolRegistry;
            
