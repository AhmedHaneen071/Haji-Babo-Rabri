'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItemComponent from './CartItem';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { GoldDivider } from '@/components/ui/OrnamentDivider';

export default function CartDrawer() {
  const {
    state,
    closeCart,
    clearCart,
    cartTotal,
    cartCount,
    deliveryCharge,
    orderTotal,
  } = useCart();

  const { isOpen, items } = state;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeCart]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cart-backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed top-0 right-0 h-full z-50 flex flex-col overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            style={{
              width: 'min(420px, 95vw)',
              background: 'linear-gradient(160deg, #0D5C3A, #072D1E 40%, #041A12)',
              borderLeft: '1px solid rgba(212,166,42,0.2)',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.6)',
            }}
          >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: '1px solid rgba(212,166,42,0.15)' }}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingCart size={18} className="text-brand-gold" />
            <h2 className="font-serif font-bold text-brand-cream text-lg">
              Your Order
            </h2>
            {cartCount > 0 && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #A87B18, #D4A62A)',
                  color: '#041A12',
                }}
              >
                {cartCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-brand-cream/30 hover:text-red-400 text-xs transition-colors px-2 py-1 rounded"
                aria-label="Clear cart"
              >
                <Trash2 size={12} />
                Clear
              </button>
            )}
            <button
              onClick={closeCart}
              className="w-8 h-8 flex items-center justify-center rounded-full text-brand-cream/60 hover:text-brand-cream hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="text-6xl mb-5">🛒</div>
              <h3 className="font-serif text-brand-cream text-xl font-semibold mb-2">
                Your cart is empty
              </h3>
              <p className="text-brand-cream/40 text-sm mb-6 leading-relaxed">
                Add some of our traditional delicacies to get started
              </p>
              <Link
                href="/menu"
                onClick={closeCart}
                className="btn-gold text-sm py-2.5 px-6"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <AnimatePresence key={item.product.id} initial={false}>
                  <CartItemComponent item={item} />
                </AnimatePresence>
              ))}
            </div>
          )}
        </div>

        {/* Footer summary */}
        {items.length > 0 && (
          <div
            className="px-5 py-5 shrink-0"
            style={{ borderTop: '1px solid rgba(212,166,42,0.15)' }}
          >
            {/* Order summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-brand-cream/60">Subtotal</span>
                <span className="text-brand-cream font-medium">
                  PKR {cartTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-cream/60">Delivery</span>
                <span className="text-brand-cream/60">
                  PKR {deliveryCharge.toLocaleString()}
                </span>
              </div>
              <GoldDivider className="my-2" />
              <div className="flex justify-between">
                <span className="font-semibold text-brand-cream">Total</span>
                <span
                  className="font-bold text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #D4A62A, #E8C547)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  PKR {orderTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-gold w-full justify-center text-sm py-3"
              >
                Proceed to Checkout 
              </Link>
              <WhatsAppButton variant="full" label="Order via WhatsApp" />
            </div>

            <p className="text-brand-cream/25 text-[10px] text-center mt-3">
              * Prices shown in PKR. Delivery charges may vary.
            </p>
          </div>
        )}
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
