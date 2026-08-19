'use client';

import { motion } from 'motion/react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const categoryEmojis: Record<string, string> = {
  rabri: '🥛',
  kheer: '🍚',
  'milk-desserts': '🍮',
  'traditional-sweets': '🍬',
  'dairy-products': '🧈',
};

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  const emoji = categoryEmojis[product.category] ?? '';
  const lineTotal =
    product.price !== null ? product.price * quantity : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex items-start gap-3 py-4"
      style={{ borderBottom: '1px solid rgba(212,166,42,0.12)' }}
    >
      {/* Product image placeholder */}
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 text-2xl"
        style={{
          background: 'linear-gradient(135deg, #0D5C3A, #1A7A50)',
          border: '1px solid rgba(212,166,42,0.2)',
        }}
      >
        {emoji}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-serif font-semibold text-brand-cream text-sm leading-tight truncate">
          {product.name}
        </h4>
        {product.nameUrdu && (
          <p className="text-brand-gold/50 text-xs mt-0.5">{product.nameUrdu}</p>
        )}
        <p className="text-brand-cream/40 text-xs mt-1 capitalize">
          {product.category.replace(/-/g, ' ')}  {product.unit}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center justify-between mt-2.5">
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(212,166,42,0.25)' }}
          >
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-brand-cream/60 hover:text-brand-cream hover:bg-white/10 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="w-8 inline-block text-center text-brand-cream text-xs font-semibold"
            >
              {quantity}
            </motion.span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-brand-cream/60 hover:text-brand-cream hover:bg-white/10 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {lineTotal !== null ? (
              <span
                className="text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, #D4A62A, #E8C547)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                PKR {lineTotal.toLocaleString()}
              </span>
            ) : (
              <span className="text-brand-cream/40 text-xs">On request</span>
            )}
            <button
              onClick={() => removeFromCart(product.id)}
              className="w-7 h-7 flex items-center justify-center text-brand-cream/30 hover:text-red-400 transition-colors rounded"
              aria-label={`Remove ${product.name} from cart`}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
