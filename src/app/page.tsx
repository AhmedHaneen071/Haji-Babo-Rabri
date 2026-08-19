import Link from 'next/link';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import HeritageStrip from '@/components/sections/HeritageStrip';
import ProductGrid from '@/components/products/ProductGrid';
import Reveal from '@/components/ui/Reveal';
import { SectionHeading, OrnamentDivider } from '@/components/ui/OrnamentDivider';

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: '#041A12' }}>
      <HeroSection />
      <HeritageStrip />

      <section className="section-container section-padding">
        <SectionHeading
          badge="Customer Favorites"
          title="Our Signature Menu"
          subtitle="Traditional rabri, kheer, ras malai, and pure dairy staples prepared fresh with the same care Hyderabad has trusted since 1974."
        />
        <ProductGrid showFilter={false} limit={4} />
        <div className="mt-10 flex justify-center">
          <Link href="/menu" className="btn-gold text-base px-8 py-3.5">
            View Full Menu
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, #4A080B, #7A1015, #4A080B)' }}
      >
        <div className="section-container">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="badge-gold mb-4 inline-block">Heritage Since 1974</span>
                <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-cream mb-5 leading-tight">
                  Slow-cooked dairy sweets made the traditional Hyderabadi way
                </h2>
                <OrnamentDivider className="max-w-xs mb-6" />
                <p className="text-brand-cream/65 leading-relaxed mb-6">
                  Every batch starts with full-fat milk and patient reduction over gentle heat.
                  The result is the thick malai texture, saffron aroma, and balanced sweetness
                  people come back for across generations.
                </p>
                <Link href="/about" className="btn-outline-gold text-base px-7 py-3">
                  Read Our Story
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 lg:mt-0">
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl p-5"
              style={{
                background: 'rgba(4,26,18,0.35)',
                border: '1px solid rgba(212,166,42,0.2)',
              }}
            >
              {[
                { icon: Clock, title: 'Open 24 Hours', text: 'Fresh batches served every day.' },
                { icon: MapPin, title: 'Hyderabad', text: 'Salahuddin Road, near Bombay Bakery.' },
                { icon: Phone, title: 'Easy Ordering', text: 'Call or WhatsApp for quick confirmation.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center px-3 py-5">
                    <Icon size={30} className="text-brand-gold mx-auto mb-3" aria-hidden="true" />
                    <h3 className="font-serif font-bold text-brand-cream mb-2">{item.title}</h3>
                    <p className="text-brand-cream/55 text-sm leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
