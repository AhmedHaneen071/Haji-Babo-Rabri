'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

// Branded placeholder per product category
const categoryColors: Record<string, string> = {
  rabri: 'from-brand-green to-brand-green-dark',
  kheer: 'from-brand-maroon to-brand-maroon-dark',
  'milk-desserts': 'from-[#1A5C7A] to-[#0D3D52]',
  'traditional-sweets': 'from-[#7A4A1A] to-[#523010]',
  'dairy-products': 'from-[#3A1A7A] to-[#25105A]',
};

const categoryMarks: Record<string, string> = {
  rabri: 'R',
  kheer: 'K',
  'milk-desserts': 'M',
  'traditional-sweets': 'S',
  'dairy-products': 'D',
};

export default function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addToCart } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  const colorClass = categoryColors[product.category] ?? 'from-brand-green to-brand-green-dark';
  const mark = categoryMarks[product.category] ?? 'HBR';

  return (
    <Link href={`/product/${product.slug}`} className={cn('block group', className)}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
        whileHover={{ y: -6 }}
        className="relative rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-card-hover"
        style={{
          background: 'linear-gradient(145deg, #0D5C3A, #0a4a2e)',
          border: '1px solid rgba(212,166,42,0.2)',
        }}
      >
        {/* Image area */}
        <div className={`relative h-52 sm:h-56 bg-gradient-to-br ${colorClass} overflow-hidden`}>
          {/* Pattern overlay */}
          <div className="absolute inset-0 mughal-pattern opacity-100" />

          {/* Placeholder visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-serif text-6xl md:text-7xl mb-2 text-brand-gold filter drop-shadow-lg">
                {mark}
              </div>
              <div
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  color: 'rgba(247,235,208,0.5)',
                  border: '1px solid rgba(247,235,208,0.15)',
                }}
              >
                {product.name}
              </div>
            </div>
          </div>

          {/* Top gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #A87B18, #D4A62A)',
                  color: '#041A12',
                }}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(4,26,18,0.7)',
              border: '1px solid rgba(212,166,42,0.3)',
            }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={14}
              className={cn(
                'transition-colors',
                wishlisted ? 'fill-red-400 stroke-red-400' : 'stroke-brand-cream/60'
              )}
            />
          </button>

          {/* Quick view on hover */}
          <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(4,26,18,0.85)',
                border: '1px solid rgba(212,166,42,0.4)',
                color: '#D4A62A',
              }}
            >
              <Eye size={11} />
              Quick View
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category tag */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-brand-gold/60 font-semibold">
              {product.category.replace(/-/g, ' ')}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-brand-gold stroke-brand-gold" />
                <span className="text-[10px] text-brand-gold/70 font-medium">
                  {product.rating}
                  {product.reviews && (
                    <span className="text-brand-cream/30"> ({product.reviews})</span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Product name */}
          <h3 className="font-serif font-semibold text-brand-cream text-base md:text-lg leading-tight mb-1 group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>

          {/* Urdu name */}
          {product.nameUrdu && (
            <p className="text-brand-gold/50 text-xs mb-2 font-medium">{product.nameUrdu}</p>
          )}

          {/* Description */}
          <p className="text-brand-cream/50 text-xs leading-relaxed line-clamp-2 mb-3">
            {product.shortDescription}
          </p>

          {/* Divider */}
          <div
            className="h-px mb-3"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,166,42,0.25), transparent)' }}
          />

          {/* Price & CTA */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <div
                className="font-bold text-base"
                style={{
                  background: product.price
                    ? 'linear-gradient(135deg, #D4A62A, #E8C547)'
                    : undefined,
                  WebkitBackgroundClip: product.price ? 'text' : undefined,
                  WebkitTextFillColor: product.price ? 'transparent' : undefined,
                  backgroundClip: product.price ? 'text' : undefined,
                  color: product.price ? undefined : 'rgba(247,235,208,0.5)',
                }}
              >
                {product.priceDisplay}
              </div>
              {product.price && (
                <div className="text-[10px] text-brand-cream/35 uppercase tracking-wider">
                  {product.unit}
                </div>
              )}
            </div>
            <motion.button
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              whileHover={product.isAvailable ? { scale: 1.06 } : undefined}
              whileTap={product.isAvailable ? { scale: 0.94 } : undefined}
              animate={addedFeedback ? { scale: [1, 1.12, 1] } : undefined}
              transition={{ duration: 0.2 }}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors duration-200',
                addedFeedback
                  ? 'bg-green-600/20 border-green-500/40 text-green-400 border'
                  : 'hover:bg-brand-gold/10 border border-brand-gold/30 hover:border-brand-gold/60 text-brand-gold'
              )}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={12} />
              {addedFeedback ? 'Added!' : 'Add'}
            </motion.button>
          </div>
        </div>

        {/* Hover gold border animation */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ border: '1px solid rgba(212,166,42,0.5)' }}
        />
      </motion.article>
    </Link>
  );
}
