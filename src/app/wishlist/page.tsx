'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, HeartCrack } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { OrnamentDivider, HeritageBadge } from '@/components/ui/OrnamentDivider';

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishlistedProducts = products.filter((p) => ids.includes(p.id));

  return (
    <main className="min-h-screen pt-20 pb-20" style={{ background: '#041A12' }}>
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #1A7A50 0%, #0D5C3A 42%, #041A12 100%)',
        }}
      >
        <div className="absolute inset-0 mughal-pattern opacity-60 pointer-events-none" />
        <div className="relative section-container text-center">
          <HeritageBadge text="Saved for Later" className="mb-6 inline-flex" />
          <motion.h1
            className="font-serif font-black text-4xl md:text-5xl text-brand-cream mb-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="fill-brand-gold stroke-brand-gold" size={34} aria-hidden="true" />
            Your Wishlist
          </motion.h1>
          <OrnamentDivider className="max-w-xs mx-auto" />
        </div>
      </section>

      <section className="section-container mt-10">
        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-20">
            <HeartCrack size={56} className="text-brand-gold/40 mx-auto mb-5" aria-hidden="true" />
            <h2 className="font-serif text-2xl text-brand-cream mb-3">Your wishlist is empty</h2>
            <p className="text-brand-cream/45 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Tap the heart icon on any product to save it here for quick ordering later.
            </p>
            <Link href="/menu" className="btn-gold px-8 py-3">
              Browse Our Menu
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-brand-cream/40 text-sm mb-8">
              {wishlistedProducts.length} item{wishlistedProducts.length !== 1 ? 's' : ''} saved
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {wishlistedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}