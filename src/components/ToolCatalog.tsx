import React from 'react';
import { ToolManifest } from '../core/types/tool';
import { useToolSearch } from '../core/hooks/useToolSearch';
import { SearchBar } from './SearchBar';
import { ToolCard } from './ToolCard';
import { Wrench } from 'lucide-react';

interface ToolCatalogProps {
  tools: ToolManifest[];
  onSelectTool: (id: string) => void;
}

export const ToolCatalog: React.FC<ToolCatalogProps> = ({ tools, onSelectTool }) => {
  const {
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
  } = useToolSearch(tools);

  return (
    <div className="space-y-6">
      {/* کامپوننت جستجو و فیلتر */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        favoritesOnly={favoritesOnly}
        onFavoritesOnlyChange={setFavoritesOnly}
        favoritesCount={favoriteIds.length}
      />

      {/* شبکه نمایش کارت‌های ابزار */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((manifest) => (
            <ToolCard
              key={manifest.id}
              manifest={manifest}
              isFavorite={favoriteIds.includes(manifest.id)}
              onToggleFavorite={toggleFavorite}
              onSelectTool={onSelectTool}
            />
          ))}
        </div>
      ) : (
        /* حالت خالی نبودن ابزار matching */
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-950/40 rounded-xl border border-slate-800/60 text-center space-y-3">
          <Wrench className="w-10 h-10 text-slate-600 stroke-1" />
          <p className="text-sm font-medium text-slate-300">هیچ ابزاری با مشخصات مورد نظر شما یافت نشد</p>
          <p className="text-xs text-slate-500">
            عبارت جستجو را تغییر دهید یا فیلتر دسته‌بندی را پاک کنید.
          </p>
        </div>
      )}
    </div>
  );
};
          
