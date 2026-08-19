'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star, ShoppingCart, ChevronLeft, Plus, Minus,
  Package, Thermometer, Info, Leaf
} from 'lucide-react';
import { Product, } from '@/types';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { OrnamentDivider, GoldDivider } from '@/components/ui/OrnamentDivider';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const categoryEmojis: Record<string, string> = {
  rabri: '🥛',
  kheer: '🍚',
  'milk-desserts': '🍮',
  'traditional-sweets': '🍬',
  'dairy-products': '🧈',
};

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const emoji = categoryEmojis[product.category] ?? '🍽️';

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: '#041A12' }}>
      <div className="section-container py-8 pt-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-cream/40 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/menu" className="hover:text-brand-gold transition-colors">Menu</Link>
          <span aria-hidden="true">/</span>
          <span className="text-brand-cream/70" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — image */}
          <div>
            <div
              className="relative rounded-2xl overflow-hidden aspect-square flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #0D5C3A, #1A7A50)',
                border: '1px solid rgba(212,166,42,0.3)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              }}
            >
              <div className="absolute inset-0 mughal-pattern" />
              <div className="relative text-center p-8">
                <div className="text-[120px] md:text-[160px] leading-none filter drop-shadow-2xl" aria-hidden="true">
                  {emoji}
                </div>
                <div
                  className="mt-4 text-sm font-semibold uppercase tracking-widest"
                  style={{ color: 'rgba(247,235,208,0.4)' }}
                >
                  {product.name}
                </div>
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #A87B18, #D4A62A)',
                      color: '#041A12',
                    }}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: '🌿', label: 'No Preservatives' },
                { icon: '🥛', label: 'Pure Dairy' },
                { icon: '✨', label: 'Made Fresh Daily' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg text-center"
                  style={{
                    background: 'rgba(13,92,58,0.4)',
                    border: '1px solid rgba(212,166,42,0.15)',
                  }}
                >
                  <span className="text-xl" aria-hidden="true">{b.icon}</span>
                  <span className="text-[10px] text-brand-cream/50 font-medium leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — details */}
          <div>
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-gold uppercase tracking-widest text-[10px]">
                {product.category.replace(/-/g, ' ')}
              </span>
              {product.rating && (
                <div className="flex items-center gap-1 ml-2" aria-label={`Rating: ${product.rating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      aria-hidden="true"
                      className={s <= Math.round(product.rating!) ? 'fill-brand-gold stroke-brand-gold' : 'stroke-brand-cream/20'}
                    />
                  ))}
                  <span className="text-brand-cream/50 text-xs ml-1">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Name */}
            <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-brand-cream mb-1 leading-tight">
              {product.name}
            </h1>
            {product.nameUrdu && (
              <p className="text-brand-gold/60 text-lg mb-4">{product.nameUrdu}</p>
            )}

            <OrnamentDivider className="my-5" />

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              {product.price ? (
                <>
                  <span
                    className="text-3xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #D4A62A, #E8C547)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    PKR {product.price.toLocaleString()}
                  </span>
                  <span className="text-brand-cream/40 text-sm">/ {product.unit}</span>
                </>
              ) : (
                <span className="text-brand-cream/50 text-xl font-serif italic">
                  Price on Request — call us to order
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-brand-cream/70 leading-relaxed text-base mb-6">
              {product.description}
            </p>

            {/* Quantity + Add to Cart */}
            {product.isAvailable && (
              <div className="flex items-center gap-3 mb-4">
                {/* Qty */}
                <div
                  className="flex items-center rounded-lg overflow-hidden"
                  style={{ border: '1px solid rgba(212,166,42,0.3)' }}
                  role="group"
                  aria-label="Quantity"
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center text-brand-cream/60 hover:text-brand-cream hover:bg-white/10 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-brand-cream font-bold text-lg" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 flex items-center justify-center text-brand-cream/60 hover:text-brand-cream hover:bg-white/10 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg font-bold text-sm transition-all duration-200"
                  style={
                    added
                      ? { background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#86efac' }
                      : { background: 'linear-gradient(135deg, #A87B18, #D4A62A)', color: '#041A12' }
                  }
                  aria-label={added ? 'Added to cart' : `Add ${product.name} to cart`}
                >
                  <ShoppingCart size={16} aria-hidden="true" />
                  {added ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            )}

            {/* WhatsApp order */}
            <WhatsAppButton variant="full" label="Order via WhatsApp" className="mb-6" />

            <GoldDivider className="my-6" />

            {/* Info tabs */}
            <div className="space-y-3">
              {product.ingredients && (
                <details className="group">
                  <summary
                    className="flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer list-none"
                    style={{ background: 'rgba(13,92,58,0.4)', border: '1px solid rgba(212,166,42,0.15)' }}
                  >
                    <Leaf size={15} className="text-brand-gold shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-brand-cream text-sm flex-1">Ingredients</span>
                    <span className="text-brand-gold/60 text-lg group-open:rotate-45 transition-transform select-none" aria-hidden="true">+</span>
                  </summary>
                  <div className="px-4 py-3">
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.ingredients.map((ing) => (
                        <span key={ing} className="badge-gold">{ing}</span>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {product.servingInfo && (
                <details className="group">
                  <summary
                    className="flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer list-none"
                    style={{ background: 'rgba(13,92,58,0.4)', border: '1px solid rgba(212,166,42,0.15)' }}
                  >
                    <Info size={15} className="text-brand-gold shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-brand-cream text-sm flex-1">Serving Suggestions</span>
                    <span className="text-brand-gold/60 text-lg group-open:rotate-45 transition-transform select-none" aria-hidden="true">+</span>
                  </summary>
                  <div className="px-4 py-3">
                    <p className="text-brand-cream/60 text-sm leading-relaxed">{product.servingInfo}</p>
                  </div>
                </details>
              )}

              {product.storageInfo && (
                <details className="group">
                  <summary
                    className="flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer list-none"
                    style={{ background: 'rgba(13,92,58,0.4)', border: '1px solid rgba(212,166,42,0.15)' }}
                  >
                    <Thermometer size={15} className="text-brand-gold shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-brand-cream text-sm flex-1">Storage</span>
                    <span className="text-brand-gold/60 text-lg group-open:rotate-45 transition-transform select-none" aria-hidden="true">+</span>
                  </summary>
                  <div className="px-4 py-3">
                    <p className="text-brand-cream/60 text-sm leading-relaxed">{product.storageInfo}</p>
                  </div>
                </details>
              )}

              <details className="group">
                <summary
                  className="flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer list-none"
                  style={{ background: 'rgba(13,92,58,0.4)', border: '1px solid rgba(212,166,42,0.15)' }}
                >
                  <Package size={15} className="text-brand-gold shrink-0" aria-hidden="true" />
                  <span className="font-semibold text-brand-cream text-sm flex-1">Delivery Information</span>
                  <span className="text-brand-gold/60 text-lg group-open:rotate-45 transition-transform select-none" aria-hidden="true">+</span>
                </summary>
                <div className="px-4 py-3">
                  <p className="text-brand-cream/60 text-sm leading-relaxed">
                    We deliver within Hyderabad. Delivery charge: PKR 200. Orders placed before 8 PM are
                    delivered same day. For large or bulk orders, please contact us via WhatsApp.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <OrnamentDivider className="mb-10" />
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-cream mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => {
                const relEmoji = categoryEmojis[p.category] ?? '🍽️';
                return (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl transition-all hover:-translate-y-1"
                    style={{
                      background: 'linear-gradient(145deg, #0D5C3A, #0a4a2e)',
                      border: '1px solid rgba(212,166,42,0.2)',
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center text-3xl shrink-0"
                      style={{ background: 'rgba(26,122,80,0.5)' }}
                      aria-hidden="true"
                    >
                      {relEmoji}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif font-semibold text-brand-cream text-sm group-hover:text-brand-gold transition-colors truncate">
                        {p.name}
                      </h3>
                      <p className="text-brand-gold text-xs font-bold mt-0.5">{p.priceDisplay}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
