import { Metadata } from 'next';
import Link from 'next/link';
import { OrnamentDivider, GoldDivider, HeritageBadge } from '@/components/ui/OrnamentDivider';

export const metadata: Metadata = {
  title: 'Our Story  Haji Babo Rabri | Heritage Since 1974',
  description:
    'Discover the story of Haji Babo Rabri  Hyderabad\'s most beloved traditional rabri and dairy dessert shop, serving authentic taste since 1974.',
};

const milestones = [
  {
    year: '1974',
    title: 'The Beginning',
    description:
      'Haji Babo Rabri was founded in Hyderabad with a simple promise  to serve the most authentic, traditional rabri using age-old family recipes passed down through generations.',
  },
  {
    year: '1990s',
    title: 'A Household Name',
    description:
      'Word spread through the city about the unmatched taste and quality. Families began making Haji Babo Rabri a ritual at every celebration, from weddings to Eid festivities.',
  },
  {
    year: '2000s',
    title: 'Expanding the Menu',
    description:
      'Responding to our loyal customers\' requests, we carefully expanded our offerings  Pista Rabri, Ras Malai, Signature Kheer  each crafted with the same devotion.',
  },
  {
    year: 'Today',
    title: 'Three Generations, One Taste',
    description:
      'Still family-run, still made fresh daily, still using the same recipes. Our mission remains unchanged: to deliver the authentic taste of Hyderabad to every doorstep.',
  },
];

const values = [
  { icon: '📜', title: 'Traditional Recipes', desc: 'Our recipes have never changed. The same proportions, the same methods, the same love.' },
  { icon: '🥛', title: 'Pure Ingredients', desc: 'We source only the finest full-fat milk, pure saffron, and premium nuts — never any shortcuts.' },
  { icon: '✨', title: 'Made Fresh Daily', desc: 'Every batch of rabri and kheer is prepared fresh each day. We never serve yesterday\'s product.' },
  { icon: '🕌', title: 'Hyderabadi Heritage', desc: 'Rooted in the culinary traditions of Hyderabad, our flavors are a love letter to this city.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Family Values', desc: 'Three generations of the same family continue to run and maintain the standards of this institution.' },
  { icon: '🌿', title: 'No Preservatives', desc: 'All products are made without artificial additives, preservatives, or artificial flavors.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: '#041A12' }}>
      {/* Hero */}
      <section
        className="relative py-28 md:py-40 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #1A7A50 0%, #0D5C3A 40%, #041A12 100%)',
        }}
      >
        <div className="absolute inset-0 mughal-pattern opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#041A12]" />
        <div className="relative section-container text-center">
          <HeritageBadge text="Since 1974" className="mb-6 inline-flex" />
          <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl text-brand-cream mb-4">
            Our Story
          </h1>
          <OrnamentDivider className="max-w-xs mx-auto mb-6" />
          <p className="text-brand-cream/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Half a century of tradition, taste, and trust  the story of Hyderabad&apos;s most beloved rabri house.
          </p>
        </div>
      </section>

      {/* Story intro */}
      <section className="section-container section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-gold mb-4 inline-block">The Foundation</span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-cream mb-5 leading-tight">
                Born from a passion for authentic Hyderabadi taste
              </h2>
              <GoldDivider className="mb-6 max-w-[80px]" />
              <div className="space-y-4 text-brand-cream/65 leading-relaxed">
                <p>
                  In 1974, Haji Babo set out to share the authentic taste of traditional Hyderabadi
                  rabri with the world. Using only the finest full-fat milk, slow-cooked for hours
                  over gentle flame, he created a rabri that captured everything beautiful about
                  this centuries-old dessert.
                </p>
                <p>
                  What began as a humble shop on Salahuddin Road quickly became a destination.
                  People came from across Hyderabad  and beyond  to experience the thick,
                  creamy, saffron-kissed rabri that could only come from Haji Babo&apos;s kitchen.
                </p>
                <p>
                  Today, three generations later, the recipes remain unchanged. The family continues
                  to uphold every tradition that made Haji Babo Rabri a household name across
                  Pakistan.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden aspect-square flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #0D5C3A, #1A7A50)',
                  border: '2px solid rgba(212,166,42,0.3)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div className="absolute inset-0 mughal-pattern" />
                <div className="relative text-center p-8">
                  <div className="text-[100px] leading-none mb-4" aria-hidden="true">🥛</div>
                  <div
                    className="font-serif font-bold text-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #A87B18, #D4A62A, #E8C547)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Since 1974
                  </div>
                  <div className="text-brand-cream/40 text-sm mt-1 uppercase tracking-widest">
                    Hyderabad, Pakistan
                  </div>
                </div>
              </div>
              {/* Decorative corner */}
              <div
                className="absolute -bottom-3 -right-3 w-24 h-24 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(122,16,21,0.5), rgba(74,8,11,0.3))',
                  border: '1px solid rgba(212,166,42,0.2)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(13,92,58,0.1), transparent)' }}
      >
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="badge-gold mb-4 inline-block">Our Journey</span>
            <h2 className="section-title">Fifty Years of Tradition</h2>
            <OrnamentDivider className="max-w-xs mx-auto mt-4" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(212,166,42,0.4), transparent)' }}
            />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 pl-14 md:pl-0 ${
                      i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <div
                      className="p-5 rounded-xl"
                      style={{
                        background: 'linear-gradient(145deg, #0D5C3A, #072D1E)',
                        border: '1px solid rgba(212,166,42,0.2)',
                      }}
                    >
                      <div
                        className="font-display font-bold text-2xl mb-1"
                        style={{
                          background: 'linear-gradient(135deg, #D4A62A, #E8C547)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {m.year}
                      </div>
                      <h3 className="font-serif font-bold text-brand-cream text-lg mb-2">{m.title}</h3>
                      <p className="text-brand-cream/60 text-sm leading-relaxed">{m.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-brand-gold bg-brand-green-darker" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-container section-padding">
        <div className="text-center mb-14">
          <span className="badge-gold mb-4 inline-block">What We Stand For</span>
          <h2 className="section-title">Our Promises to You</h2>
          <OrnamentDivider className="max-w-xs mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 rounded-xl group hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: 'linear-gradient(145deg, #0D5C3A, #072D1E)',
                border: '1px solid rgba(212,166,42,0.15)',
              }}
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-serif font-bold text-brand-cream text-lg mb-2 group-hover:text-brand-gold transition-colors">
                {v.title}
              </h3>
              <p className="text-brand-cream/55 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, #4A080B, #7A1015, #4A080B)' }}
      >
        <div className="section-container text-center">
          <div className="text-5xl mb-4" aria-hidden="true">🥣</div>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-cream mb-4">
            Taste the Heritage
          </h2>
          <OrnamentDivider className="max-w-xs mx-auto mb-4" />
          <p className="text-brand-cream/65 mb-8 max-w-xl mx-auto">
            Every spoon carries fifty years of tradition. Order now and experience what generations of Hyderabadis have loved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="btn-gold text-base px-8 py-3.5">
              Order Now
            </Link>
            <Link href="/contact" className="btn-outline-gold text-base px-8 py-3.5">
              Visit Our Shop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
