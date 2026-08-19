import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { OrnamentDivider, HeritageBadge } from '@/components/ui/OrnamentDivider';

export const metadata: Metadata = {
  title: 'Contact & Location  Haji Babo Rabri | Hyderabad',
  description:
    'Visit Haji Babo Rabri at Salahuddin Road, Hyderabad. Open 24 hours. Call +92 312 2307882 or order via WhatsApp.',
};

const contactCards = [
  {
    icon: MapPin,
    title: 'Our Location',
    lines: [
      'Opposite Bombay Bakery,',
      'Cantt Board Office,',
      'Salahuddin Road,',
      'Hyderabad, Pakistan',
    ],
    action: {
      label: 'Get Directions',
      href: 'https://maps.google.com/?q=Salahuddin+Road+Hyderabad+Pakistan',
      external: true,
    },
  },
  {
    icon: Phone,
    title: 'Call / WhatsApp',
    lines: ['+92 312 2307882'],
    action: { label: 'Call Now', href: 'tel:+923122307882', external: false },
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['hajibaborabri@gmail.com'],
    action: {
      label: 'Send Email',
      href: 'mailto:hajibaborabri@gmail.com',
      external: false,
    },
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['Open 24 Hours', '7 Days a Week', 'Including Holidays'],
    action: null,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: '#041A12' }}>
      {/* Hero */}
      <section
        className="relative py-28 md:py-36 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #1A7A50 0%, #0D5C3A 40%, #041A12 100%)',
        }}
      >
        <div className="absolute inset-0 mughal-pattern opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#041A12] pointer-events-none" />
        <div className="relative section-container text-center">
          <HeritageBadge text="Find Us" className="mb-6 inline-flex" />
          <Reveal>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-brand-cream mb-4">
              Visit Us
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <OrnamentDivider className="max-w-xs mx-auto mb-6" />
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-cream/65 text-lg max-w-xl mx-auto leading-relaxed">
              Come experience the authentic taste in person, or order for delivery  we&apos;re
              here 24 hours, every day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section-container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={(i % 4) * 0.08}>
                <div
                  className="p-6 rounded-xl flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300 h-full"
                  style={{
                  background: 'linear-gradient(145deg, #0D5C3A, #072D1E)',
                  border: '1px solid rgba(212,166,42,0.2)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(212,166,42,0.12)',
                    border: '1px solid rgba(212,166,42,0.3)',
                  }}
                >
                  <Icon size={18} className="text-brand-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-brand-cream text-base mb-2">
                    {item.title}
                  </h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-brand-cream/60 text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
                {item.action && (
                  <a
                    href={item.action.href}
                    target={item.action.external ? '_blank' : undefined}
                    rel={item.action.external ? 'noopener noreferrer' : undefined}
                    className="btn-outline-gold text-xs py-2 px-4 text-center justify-center"
                  >
                    {item.action.label}
                  </a>
                )}
              </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="section-container pb-16">
        <Reveal>
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              border: '1px solid rgba(212,166,42,0.25)',
              height: '400px',
            }}
          >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            style={{ background: 'linear-gradient(145deg, #0D5C3A, #072D1E)' }}
          >
            <div className="absolute inset-0 heritage-pattern pointer-events-none" />
            <div className="relative z-10">
              <div className="text-6xl mb-4" aria-hidden="true">📍</div>
              <h3 className="font-serif font-bold text-brand-cream text-2xl mb-2">
                Haji Babo Rabri
              </h3>
              <p className="text-brand-cream/55 text-sm mb-1">
                Opposite Bombay Bakery, Cantt Board Office
              </p>
              <p className="text-brand-cream/55 text-sm mb-6">
                Salahuddin Road, Hyderabad, Pakistan
              </p>
              <a
                href="https://maps.google.com/?q=Salahuddin+Road+Hyderabad+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm px-6 py-2.5"
              >
                Open in Google Maps 
              </a>
            </div>
          </div>
          </div>
        </Reveal>
      </section>

      {/* WhatsApp CTA */}
      <section
        className="section-padding"
        style={{
          background: 'linear-gradient(135deg, #4A080B, #7A1015, #4A080B)',
          borderTop: '1px solid rgba(212,166,42,0.2)',
        }}
      >
        <div className="section-container text-center">
          <Reveal>
            <MessageCircle size={40} className="text-brand-gold mx-auto mb-4" />
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-cream mb-4">
              Order via WhatsApp
            </h2>
            <OrnamentDivider className="max-w-xs mx-auto mb-4" />
            <p className="text-brand-cream/65 mb-8 max-w-lg mx-auto">
              The fastest way to order. Message us on WhatsApp and we&apos;ll confirm your
              order within minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923122307882?text=Assalam+o+Alaikum!+I+would+like+to+place+an+order+from+Haji+Babo+Rabri."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-bold text-base transition-all hover:opacity-90"
              style={{
                backgroundColor: '#25D366',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us Now
            </a>
            <a href="tel:+923122307882" className="btn-outline-gold text-base px-8 py-3.5">
               Call +92 312 2307882
            </a>
          </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
