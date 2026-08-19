'use client';

import { useState, useMemo } from 'react';
import { Product, ProductCategory, SortOption } from '@/types';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';

function sortProducts(items: Product[], sort: SortOption): Product[] {
  switch (sort) {
    case 'price-asc':
      return [...items].sort((a, b) => {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      });
    case 'price-desc':
      return [...items].sort((a, b) => {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      });
    case 'popular':
    default:
      return [...items].sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
  }
}

interface ProductGridProps {
  initialCategory?: ProductCategory;
  showFilter?: boolean;
  limit?: number;
}

export default function ProductGrid({
  initialCategory = 'all',
  showFilter = true,
  limit,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [sortOption, setSortOption] = useState<SortOption>('popular');

  const filtered = useMemo(() => {
    let result =
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.category === activeCategory);
    result = sortProducts(result, sortOption);
    if (limit) result = result.slice(0, limit);
    return result;
  }, [activeCategory, sortOption, limit]);

  return (
    <div>
      {showFilter && (
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
          totalCount={filtered.length}
        />
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
          <p className="text-brand-cream/50 text-lg font-serif">No items found</p>
          <p className="text-brand-cream/30 text-sm mt-1">Try a different category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 mt-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
