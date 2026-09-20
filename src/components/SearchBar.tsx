import React from 'react';
import { Search, Star, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (showFavorites: boolean) => void;
  favoritesCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  favoritesOnly,
  onFavoritesOnlyChange,
  favoritesCount,
}) => {
  return (
    <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 shadow-lg" dir="rtl">
      <div className="relative flex items-center">
        <Search className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجوی ابزار بر اساس نام، توضیحات یا کلیدواژه..."
          className="w-full pr-10 pl-10 py-2.5 bg-slate-900/90 text-slate-100 text-sm rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute left-3 p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            همه ابزارها
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            {cat}
          </button>
          ))}
        </div>

        <button
          onClick={() => onFavoritesOnlyChange(!favoritesOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
            favoritesOnly
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
          <span>علاقه‌مندی‌ها</span>
          {favoritesCount > 0 && (
            <span className="bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded-full text-[10px] font-mono">
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
