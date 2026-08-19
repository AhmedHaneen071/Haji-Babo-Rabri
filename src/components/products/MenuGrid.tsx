'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import ProductGrid from './ProductGrid';
import { ProductCategory } from '@/types';
import { categories } from '@/data/products';

function MenuGridInner() {
  const searchParams = useSearchParams();
  const requested = searchParams.get('category');
  const initialCategory = categories.some((category) => category.id === requested)
    ? (requested as ProductCategory)
    : 'all';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <ProductGrid initialCategory={initialCategory} />
    </motion.div>
  );
}

export default function MenuGrid() {
  return (
    <Suspense fallback={<ProductGrid />}>
      <MenuGridInner />
    </Suspense>
  );
}