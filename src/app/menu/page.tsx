import { Metadata } from 'next';
import ProductGrid from '@/components/products/ProductGrid';
import { ProductCategory } from '@/types';
import { categories } from '@/data/products';
import { HeritageBadge, OrnamentDivider } from '@/components/ui/OrnamentDivider';

export const metadata: Metadata = {
  title: 'Menu & Online Order',
  description:
    'Browse and order Haji Babo Rabri favorites including plain rabri, pista rabri, kheer, ras malai, khoya, and desi ghee.',
};

interface MenuPageProps {
  searchParams?: Promise<{ category?: string }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const requested = params?.category;
  const initialCategory = categories.some((category) => category.id === requested)
    ? (requested as ProductCategory)
    : 'all';

  return (
    <main className="min-h-screen pt-20" style={{ background: '#041A12' }}>
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #1A7A50 0%, #0D5C3A 42%, #041A12 100%)',
        }}
      >
        <div className="absolute inset-0 mughal-pattern opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#041A12] pointer-events-none" />
        <div className="relative section-container text-center">
          <HeritageBadge text="Fresh Daily" className="mb-6 inline-flex" />
          <h1 className="font-serif font-black text-4xl md:text-6xl text-brand-cream mb-4">
            Menu & Online Order
          </h1>
          <OrnamentDivider className="max-w-xs mx-auto mb-5" />
          <p className="text-brand-cream/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose your favorites, review your cart, and place the order by checkout or WhatsApp.
          </p>
        </div>
      </section>

      <section className="section-container pb-20">
        <ProductGrid initialCategory={initialCategory} />
      </section>
    </main>
  );
}
