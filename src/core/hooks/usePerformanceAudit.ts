import { useEffect } from 'react';

export function usePerformanceAudit() {
  useEffect(() => {
    if (!import.meta.env.PROD && typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log(`[Vexora Audit] Page Load Time: ${Math.round(navEntry.loadEventEnd)}ms`);
          }
          if (entry.entryType === 'resource' && entry.duration > 500) {
            console.warn(`[Vexora Audit] Slow Resource Load: ${entry.name} (${Math.round(entry.duration)}ms)`);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['navigation', 'resource'] });
      } catch (e) {
        // پشتیبانی مرورگرهای قدیمی‌تر
      }

      return () => observer.disconnect();
    }
  }, []);
}
