'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, ChevronRight, CreditCard, Truck, Smartphone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CheckoutForm } from '@/types';
import { GoldDivider, OrnamentDivider } from '@/components/ui/OrnamentDivider';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

const categoryEmojis: Record<string, string> = {
  rabri: '🥛', kheer: '🍚', 'milk-desserts': '🍮',
  'traditional-sweets': '🍬', 'dairy-products': '🧈',
};

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', icon: Truck, desc: 'Pay when your order arrives' },
  { id: 'bank-transfer', label: 'Bank Transfer', icon: CreditCard, desc: 'Transfer to our bank account' },
  { id: 'online', label: 'Online Payment', icon: Smartphone, desc: 'Coming soon - JazzCash / EasyPaisa', disabled: true },
] as const;

const cities = [
  'Hyderabad', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi',
  'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Other',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { state, cartTotal, deliveryCharge, orderTotal, clearCart } = useCart();
  const { items } = state;

  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Hyderabad',
    notes: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e: Partial<CheckoutForm> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^(\+92|0)[0-9]{10}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid Pakistani phone number';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    if (!form.city) e.city = 'Please select a city';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);

    // Simulate order processing
    await new Promise((r) => setTimeout(r, 800));

    // Generate order ID
    const orderId = `HBR-${Date.now().toString().slice(-6)}`;

    // Store order in sessionStorage for confirmation page
    sessionStorage.setItem(
      'hbr-last-order',
      JSON.stringify({ orderId, items, customer: form, cartTotal, deliveryCharge, orderTotal })
    );

    clearCart();
    router.push(`/order-confirmation?id=${orderId}`);
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppMessage(items, form);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4" style={{ background: '#041A12' }}>
        <ShoppingCart size={56} className="text-brand-gold/40" />
        <h1 className="font-serif text-2xl text-brand-cream">Your cart is empty</h1>
        <Link href="/menu" className="btn-gold px-8 py-3">Browse Our Menu</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16" style={{ background: '#041A12' }}>
      <div className="section-container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-cream/40 mb-8">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/menu" className="hover:text-brand-gold transition-colors">Menu</Link>
          <ChevronRight size={14} />
          <span className="text-brand-cream/70">Checkout</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-brand-cream mb-3">
            Complete Your Order
          </h1>
          <OrnamentDivider className="max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form  left 2 cols */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6" noValidate>
            {/* Personal info */}
            <div
              className="p-6 rounded-xl space-y-4"
              style={{ background: 'linear-gradient(145deg,#0D5C3A,#072D1E)', border: '1px solid rgba(212,166,42,0.2)' }}
            >
              <h2 className="font-serif font-bold text-brand-cream text-lg">
                Your Information
              </h2>
              <GoldDivider />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => set('fullName', e.target.value)}
                    placeholder="Your full name"
                    className="form-input"
                    autoComplete="name"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="+92 3XX XXXXXXX"
                    className="form-input"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="form-label">Email Address (optional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="your@email.com"
                  className="form-input"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Delivery address */}
            <div
              className="p-6 rounded-xl space-y-4"
              style={{ background: 'linear-gradient(145deg,#0D5C3A,#072D1E)', border: '1px solid rgba(212,166,42,0.2)' }}
            >
              <h2 className="font-serif font-bold text-brand-cream text-lg">
                Delivery Address
              </h2>
              <GoldDivider />

              <div>
                <label className="form-label">Street Address *</label>
                <textarea
                  value={form.address}
                  onChange={(e) => set('address', e.target.value)}
                  placeholder="House/flat number, street name, area..."
                  rows={3}
                  className="form-input resize-none"
                  autoComplete="street-address"
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="form-label">City *</label>
                <select
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  className="form-input"
                >
                  {cities.map((c) => (
                    <option key={c} value={c} style={{ background: '#072D1E' }}>{c}</option>
                  ))}
                </select>
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="form-label">Order Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Any special instructions or requests..."
                  rows={2}
                  className="form-input resize-none"
                />
              </div>
            </div>

            {/* Payment method */}
            <div
              className="p-6 rounded-xl space-y-4"
              style={{ background: 'linear-gradient(145deg,#0D5C3A,#072D1E)', border: '1px solid rgba(212,166,42,0.2)' }}
            >
              <h2 className="font-serif font-bold text-brand-cream text-lg">
                Payment Method
              </h2>
              <GoldDivider />

              <div className="space-y-3">
                {paymentMethods.map((pm) => {
                  const Icon = pm.icon;
                  const active = form.paymentMethod === pm.id;
                  const isDisabled = 'disabled' in pm && pm.disabled;
                  return (
                    <label
                      key={pm.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      style={{
                        background: active ? 'rgba(212,166,42,0.1)' : 'rgba(0,0,0,0.2)',
                        border: `1px solid ${active ? 'rgba(212,166,42,0.5)' : 'rgba(212,166,42,0.1)'}`,
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.id}
                        checked={active}
                        onChange={() => set('paymentMethod', pm.id)}
                        disabled={isDisabled}
                        className="accent-brand-gold"
                      />
                      <Icon size={18} className={active ? 'text-brand-gold' : 'text-brand-cream/40'} />
                      <div>
                        <div className={`font-semibold text-sm ${active ? 'text-brand-gold' : 'text-brand-cream/70'}`}>
                          {pm.label}
                        </div>
                        <div className="text-brand-cream/40 text-xs">{pm.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-brand-green-darker/40 border-t-brand-green-darker rounded-full animate-spin" />
                  Placing Order...
                </span>
              ) : (
                `Place Order  PKR ${orderTotal.toLocaleString()}`
              )}
            </button>

            <div className="text-center">
              <span className="text-brand-cream/30 text-xs">or</span>
            </div>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-lg font-bold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: '#25D366', color: '#fff' }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp Instead
            </button>
          </form>

          {/* Order summary  right col */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 p-6 rounded-xl"
              style={{ background: 'linear-gradient(145deg,#0D5C3A,#072D1E)', border: '1px solid rgba(212,166,42,0.2)' }}
            >
              <h2 className="font-serif font-bold text-brand-cream text-lg mb-1">
                Order Summary
              </h2>
              <p className="text-brand-cream/40 text-xs mb-4">{items.length} item{items.length !== 1 ? 's' : ''}</p>
              <GoldDivider className="mb-4" />

              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                      style={{ background: 'rgba(26,122,80,0.4)', border: '1px solid rgba(212,166,42,0.15)' }}
                    >
                      {categoryEmojis[item.product.category] ?? ''}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-cream text-xs font-semibold truncate">
                        {item.product.name}
                      </p>
                      <p className="text-brand-cream/40 text-[10px]">
                        × {item.quantity}
                      </p>
                    </div>
                    <div className="text-brand-gold text-xs font-bold shrink-0">
                      {item.product.price
                        ? `PKR ${(item.product.price * item.quantity).toLocaleString()}`
                        : ''}
                    </div>
                  </div>
                ))}
              </div>

              <GoldDivider className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-cream/60">Subtotal</span>
                  <span className="text-brand-cream">PKR {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-cream/60">Delivery</span>
                  <span className="text-brand-cream/60">PKR {deliveryCharge.toLocaleString()}</span>
                </div>
                <GoldDivider className="my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-brand-cream">Total</span>
                  <span
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

              <div className="mt-4 p-3 rounded-lg text-xs text-brand-cream/45 leading-relaxed"
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(212,166,42,0.1)' }}
              >
                 Delivery within Hyderabad. For other cities, delivery charges will be confirmed after order placement.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
