import { useState, useEffect, useMemo } from 'react';
import { ToolManifest } from '../types/tool';

const FAVORITES_KEY = 'vexora_favorite_tools';

export function useToolSearch(allTools: ToolManifest[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ذخیره تغییرات علاقه مندی ها در LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favoriteIds]);

  // اضافه / حذف از لیست علاقه‌مندی‌ها
  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // استخراج تمام دسته‌بندی‌های موجود
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allTools.forEach((tool) => {
      if (tool.category) cats.add(tool.category);
    });
    return Array.from(cats);
  }, [allTools]);

  // فیلتر هوشمند ابزارها بر اساس عبارت جستجو، دسته و علاقه‌مندی
  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      // فیلتر علاقه‌مندی‌ها
      if (favoritesOnly && !favoriteIds.includes(tool.id)) {
        return false;
      }

      // فیلتر دسته‌بندی
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // فیلتر عبارت جستجو (نام، توضیحات، دسته و شناسه)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = tool.name.toLowerCase().includes(query);
        const matchDesc = tool.description.toLowerCase().includes(query);
        const matchCat = tool.category.toLowerCase().includes(query);
        const matchId = tool.id.toLowerCase().includes(query);

        return matchName || matchDesc || matchCat || matchId;
      }

      return true;
    });
  }, [allTools, searchQuery, selectedCategory, favoritesOnly, favoriteIds]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    favoritesOnly,
    setFavoritesOnly,
    favoriteIds,
    toggleFavorite,
    categories,
    filteredTools,
  };
        }
