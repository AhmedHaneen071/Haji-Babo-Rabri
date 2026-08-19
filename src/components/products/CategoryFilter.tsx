'use client';

import { ProductCategory, SortOption } from '@/types';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  totalCount,
}: CategoryFilterProps) {
  return (
    <div className="sticky top-16 md:top-[4.75rem] z-20 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
      style={{ background: 'rgba(4,26,18,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(212,166,42,0.12)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0',
                  activeCategory === cat.id
                    ? 'text-brand-green-darker'
                    : 'text-brand-cream/60 hover:text-brand-cream hover:bg-white/5 border border-transparent hover:border-brand-gold/20'
                )}
                style={
                  activeCategory === cat.id
                    ? {
                        background: 'linear-gradient(135deg, #A87B18, #D4A62A)',
                        border: '1px solid rgba(212,166,42,0.6)',
                      }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-brand-cream/40 text-xs hidden sm:block">
              {totalCount} item{totalCount !== 1 ? 's' : ''}
            </span>
            <div className="relative">
              <ArrowUpDown
                size={12}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-gold/60 pointer-events-none"
              />
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="pl-7 pr-3 py-2 text-xs font-medium text-brand-cream/80 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-brand-gold/50"
                style={{
                  background: 'rgba(13,92,58,0.6)',
                  border: '1px solid rgba(212,166,42,0.2)',
                }}
              >
                {sortOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    style={{ background: '#072D1E' }}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
