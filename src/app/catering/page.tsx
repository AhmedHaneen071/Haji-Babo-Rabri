'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, ChevronRight, Users, Wallet, UtensilsCrossed, MessageCircle, CheckCircle2 } from 'lucide-react';
import { OrnamentDivider, HeritageBadge } from '@/components/ui/OrnamentDivider';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

const eventTypes = [
  'Wedding / Nikkah',
  'Eid / Ramadan',
  'Corporate Event',
  'Family Gathering',
  'Birthday / Celebration',
  'Bulk Supply / Reseller',
  'Other',
];

const suggestedPlatters = [
  'Assorted Rabri Platter (5kg+)',
  'Kheer & Ras Malai Combo',
  'Gift Boxes for Guests',
  'Corporate hampers',
  'Custom wedding menu',
];

export default function CateringPage() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    eventType: eventTypes[0],
    eventDate: '',
    guests: '',
    platters: '',
    budget: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let message = ' *Bulk / Catering Order  Haji Babo Rabri*\n';
    message += '_Heritage in every spoon_\n\n';
    message += ` *Name:* ${form.fullName}\n`;
    message += ` *Phone:* ${form.phone}\n`;
    message += ` *Event Type:* ${form.eventType}\n`;
    if (form.eventDate) message += ` *Event Date:* ${form.eventDate}\n`;
    if (form.guests) message += ` *Guests:* ${form.guests}\n`;
    if (form.platters) message += ` *Items:* ${form.platters}\n`;
    if (form.budget) message += ` *Budget:* PKR ${form.budget}\n`;
    if (form.notes) message += `\n *Notes:* ${form.notes}\n`;
    message += `\n_Enquiry via hajibaborabri.com_`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-20 pb-20" style={{ background: '#041A12' }}>
      {/* Hero */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #7A1015 0%, #4A080B 42%, #041A12 100%)',
        }}
      >
        <div className="absolute inset-0 mughal-pattern opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#041A12] pointer-events-none" />
        <div className="relative section-container text-center">
          <HeritageBadge text="Weddings · Events · Bulk" className="mb-6 inline-flex" />
          <motion.h1
            className="font-serif font-black text-4xl md:text-6xl text-brand-cream mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bulk & Catering Orders
          </motion.h1>
          <OrnamentDivider className="max-w-xs mx-auto mb-5" />
          <motion.p
            className="text-brand-cream/65 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From wedding desserts to corporate gifting, our family kitchen prepares traditional
            Hyderabadi sweets at scale — same recipe, same quality, since 1974.
          </motion.p>
        </div>
      </section>

      <section className="section-container -mt-8 relative z-10">
        {submitted ? (
          <motion.div
            className="max-w-2xl mx-auto text-center rounded-xl p-10"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(145deg, #0D5C3A, #072D1E)',
              border: '1px solid rgba(212,166,42,0.25)',
            }}
          >
            <CheckCircle2 size={54} className="text-brand-gold mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-serif font-bold text-2xl text-brand-cream mb-3">
              Enquiry Ready!
            </h2>
            <p className="text-brand-cream/60 mb-6 leading-relaxed">
              Your catering details have been opened in WhatsApp. Send the message and our team
              will get back to you with a quote within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/menu" className="btn-gold justify-center">
                Browse Menu
              </Link>
              <Link href="/" className="btn-outline-gold justify-center">
                Back to Home
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="lg:col-span-2 rounded-xl p-6 md:p-8 space-y-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              style={{ background: 'linear-gradient(145deg, #0D5C3A, #072D1E)', border: '1px solid rgba(212,166,42,0.2)' }}
            >
              <h2 className="font-serif font-bold text-brand-cream text-xl mb-1">
                Request a Quote
              </h2>
              <p className="text-brand-cream/45 text-sm mb-4">
                Fill this out and we&apos;ll prepare a custom quote for your event.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => set('fullName', e.target.value)}
                    className="form-input"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    className="form-input"
                    placeholder="+92 3XX XXXXXXX"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Event Type *</label>
                  <select
                    value={form.eventType}
                    onChange={(e) => set('eventType', e.target.value)}
                    className="form-input"
                  >
                    {eventTypes.map((t) => (
                      <option key={t} value={t} style={{ background: '#072D1E' }}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Event Date</label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => set('eventDate', e.target.value)}
                    className="form-input [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Number of Guests</label>
                  <input
                    type="number"
                    min="10"
                    value={form.guests}
                    onChange={(e) => set('guests', e.target.value)}
                    className="form-input"
                    placeholder="e.g. 150"
                  />
                </div>
                <div>
                  <label className="form-label">Approx. Budget (PKR)</label>
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) => set('budget', e.target.value)}
                    className="form-input"
                    placeholder="e.g. 50,000"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Items You&apos;re Interested In</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestedPlatters.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() =>
                        set(
                          'platters',
                          form.platters.includes(p)
                            ? form.platters.split(', ').filter((x) => x !== p).join(', ')
                            : [form.platters, p].filter(Boolean).join(', ')
                        )
                      }
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        form.platters.includes(p)
                          ? 'bg-brand-gold/20 border-brand-gold/60 text-brand-gold'
                          : 'border-brand-gold/20 text-brand-cream/50 hover:border-brand-gold/40'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <textarea
                  value={form.platters}
                  onChange={(e) => set('platters', e.target.value)}
                  rows={2}
                  className="form-input resize-none"
                  placeholder="Or type your own requirements..."
                />
              </div>

              <div>
                <label className="form-label">Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  rows={2}
                  className="form-input resize-none"
                  placeholder="Delivery location, timing, packaging preferences..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-lg font-bold text-sm"
                style={{ backgroundColor: '#25D366', color: '#fff' }}
              >
                <MessageCircle size={18} aria-hidden="true" />
                Send Enquiry on WhatsApp
              </motion.button>
            </motion.form>

            {/* Side info */}
            <div className="space-y-4">
              {[
                { icon: Users, title: '50 to 5,000 guests', text: 'Weddings, mehndi, corporate and community events — we scale to any size.' },
                { icon: Calendar, title: 'Book in advance', text: 'For events, please give us 3–5 days notice for the freshest preparation.' },
                { icon: UtensilsCrossed, title: 'Custom menus', text: 'Mixed rabri platters, kheer combos, gift boxes and bespoke dessert menus.' },
                { icon: Wallet, title: 'Transparent quotes', text: 'Clear pricing per kg / per box. Delivery and setup arranged on request.' },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start gap-4 p-5 rounded-xl"
                    style={{ background: 'linear-gradient(145deg, #0D5C3A, #072D1E)', border: '1px solid rgba(212,166,42,0.15)' }}
                  >
                    <Icon size={22} className="text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-serif font-semibold text-brand-cream text-sm mb-1">{f.title}</h3>
                      <p className="text-brand-cream/50 text-xs leading-relaxed">{f.text}</p>
                    </div>
                  </motion.div>
                );
              })}

              <div className="p-5 rounded-xl" style={{ background: 'rgba(122,16,21,0.25)', border: '1px solid rgba(212,166,42,0.2)' }}>
                <p className="text-brand-cream/60 text-xs leading-relaxed mb-2">
                  Prefer to talk? Call us directly for urgent events.
                </p>
                <a
                  href="tel:+923122307882"
                  className="flex items-center gap-2 text-brand-gold text-sm font-bold hover:underline"
                >
                  +92 312 2307882 <ChevronRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}