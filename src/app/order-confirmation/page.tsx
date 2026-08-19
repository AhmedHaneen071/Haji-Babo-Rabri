'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CheckCircle2, Home, MessageCircle, ShoppingBag } from 'lucide-react';
import { CartItem, CheckoutForm } from '@/types';
import { GoldDivider, OrnamentDivider } from '@/components/ui/OrnamentDivider';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

interface StoredOrder {
  orderId: string;
  items: CartItem[];
  customer: CheckoutForm;
  cartTotal: number;
  deliveryCharge: number;
  orderTotal: number;
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('hbr-last-order');
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch {
        setOrder(null);
      }
    }
  }, []);

  const handleWhatsApp = () => {
    if (!order) return;
    window.open(generateWhatsAppMessage(order.items, order.customer), '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: '#041A12' }}>
      <div className="section-container max-w-4xl">
        <motion.div
          className="rounded-xl p-6 md:p-10 text-center"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(145deg, #0D5C3A, #072D1E)',
            border: '1px solid rgba(212,166,42,0.25)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <CheckCircle2 size={58} className="text-brand-gold mx-auto mb-5" aria-hidden="true" />
          </motion.div>
          <h1 className="font-serif font-black text-3xl md:text-5xl text-brand-cream mb-3">
            Order Received
          </h1>
          <OrnamentDivider className="max-w-xs mx-auto mb-5" />
          <p className="text-brand-cream/65 max-w-xl mx-auto leading-relaxed">
            Thank you. Your order has been saved locally and can be sent to our team on WhatsApp
            for the fastest confirmation.
          </p>

          {order ? (
            <div className="mt-8 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
                <div>
                  <p className="text-brand-cream/45 text-xs uppercase tracking-widest">Order ID</p>
                  <p className="font-serif font-bold text-brand-gold text-2xl">{order.orderId}</p>
                </div>
                <div className="text-sm text-brand-cream/60">
                  {order.customer.fullName} | {order.customer.phone}
                </div>
              </div>

              <GoldDivider className="mb-5" />

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-brand-cream font-semibold">{item.product.name}</p>
                      <p className="text-brand-cream/45 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-brand-gold font-bold">
                      {item.product.price
                        ? `PKR ${(item.product.price * item.quantity).toLocaleString()}`
                        : 'Price on request'}
                    </p>
                  </div>
                ))}
              </div>

              <GoldDivider className="my-5" />

              <div className="space-y-2 text-sm max-w-sm ml-auto">
                <div className="flex justify-between">
                  <span className="text-brand-cream/60">Subtotal</span>
                  <span className="text-brand-cream">PKR {order.cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-cream/60">Delivery</span>
                  <span className="text-brand-cream">PKR {order.deliveryCharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span className="text-brand-cream">Total</span>
                  <span className="text-brand-gold">PKR {order.orderTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={handleWhatsApp} className="btn-gold justify-center">
                  <MessageCircle size={18} aria-hidden="true" />
                  Send to WhatsApp
                </button>
                <Link href="/menu" className="btn-outline-gold justify-center">
                  <ShoppingBag size={18} aria-hidden="true" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 flex justify-center">
              <Link href="/menu" className="btn-gold">
                <Home size={18} aria-hidden="true" />
                Browse Menu
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
