'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from './ProductGrid';
import { ProductCategory } from '@/types';
import { categories } from '@/data/products';

function MenuGridInner() {
  const searchParams = useSearchParams();
  const requested = searchParams.get('category');
  const initialCategory = categories.some((category) => category.id === requested)
    ? (requested as ProductCategory)
    : 'all';

  return <ProductGrid initialCategory={initialCategory} />;
}

export default function MenuGrid() {
  return (
    <Suspense fallback={<ProductGrid />}>
      <MenuGridInner />
    </Suspense>
  );
}